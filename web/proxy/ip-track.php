<?php

$access_key = '9e04c39a95439676a4b3f90bd2de722b';
$ip = $_SERVER['REMOTE_ADDR'];

// Initialize CURL:
$ch = curl_init('http://api.ipstack.com/'.$ip.'?access_key='.$access_key.'');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Output the "capital" object inside "location"
echo $json;