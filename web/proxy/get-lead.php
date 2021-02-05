<?php
/*
   GetLeadsByFilterType.php
   Marketo REST API Sample Code
   Copyright (C) 2016 Marketo, Inc.
   This software may be modified and distributed under the terms
   of the MIT license.  See the LICENSE file for details.
*/

// get cookie value from URL, if no value set request dies 
$cookieValue = isset($_GET['cookieValue']) ? $_GET['cookieValue'] : die();

$leads = new MultipleLeads();
$leads->filterType = "cookie";
$leads->filterValues = $cookieValue;
$leads->fields = array("email", "firstName", "lastName", "Phone", "currentCRM_account", "CompanySize", "emailProvider", "industry", "company");
echo ($leads->getData());
class MultipleLeads{
	private $host = "https://763-DVL-293.mktorest.com";//CHANGE ME
	private $clientId = "4021290e-bf6c-4866-b06c-f31b66611f6a";//CHANGE ME
	private $clientSecret = "x6K7RAFWG1pVVkInfULW5V42oISk0oge";//CHANGE ME
	public $filterType; //field to filter off of, required
	public $filterValues; //one or more values for filter, required
	public $fields;//one or more fields to return
	public $batchSize;
	public $nextPageToken;//token returned from previous call for paging1
	public function getData(){
		$url = $this->host . "/rest/v1/leads.json?access_token=" . $this->getToken()
						. "&filterType=" . $this->filterType . "&filterValues=" . urlencode($this->filterValues);
		if (isset($this->batchSize)){
			$url = $url . "&batchSize=" . $this->batchSize;
		}
		if (isset($this->nextPageToken)){
			$url = $url . "&nextPageToken=" . $this->nextPageToken;
		}
		if(isset($this->fields)){
			$url = $url . "&fields=" . $this::csvString($this->fields);
		}
		$ch = curl_init($url);
		curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('accept: application/json',));
		$response = curl_exec($ch);
		return $response;
	}
	private function getToken(){
		$ch = curl_init($this->host . "/identity/oauth/token?grant_type=client_credentials&client_id=" . $this->clientId . "&client_secret=" . $this->clientSecret);
		curl_setopt($ch,  CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('accept: application/json',));
		$response = json_decode(curl_exec($ch));
		curl_close($ch);
		$token = $response->access_token;
		return $token;
	}
	private static function csvString($fields){
		$csvString = implode(",", $fields);
		return $csvString;
	}
}