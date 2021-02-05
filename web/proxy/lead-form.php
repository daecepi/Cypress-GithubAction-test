<?php 
// 327095078

$json = json_decode( file_get_contents('php://input') );

$googleSecret = ( $json->google_key == '327095078' ) ? $json->google_key : die();
// $googleSecret = ( $_GET['google_key'] == 327095078 ) ? $_GET['google_key'] : die();

function getJSONData($json, $term){
  foreach ( $json->user_column_data as $item )
    if ($item->column_name == $term ) {
      return $item->string_value;
    }
}

$email = getJSONData($json, 'Work Email');
$firstName = getJSONData($json, 'First Name');
$lastName = getJSONData($json, 'Last Name');
$phone = getJSONData($json, 'Work Phone');
$company = getJSONData($json, 'Company Name');

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://app-sj17.marketo.com/index.php/leadCapture/save",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"munchkinId\"\r\n\r\n763-DVL-293\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"formid\"\r\n\r\n2038\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"Email\"\r\n\r\n" . $email . "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"FirstName\"\r\n\r\n". $firstName ."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"LastName\"\r\n\r\n". $lastName ."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"Company\"\r\n\r\n". $company ."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"Phone\"\r\n\r\n". $phone . "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
  //CURLOPT_POSTFIELDS => http_build_query($post_data),
  CURLOPT_HTTPHEADER => array(
    "Accept: */*",
    "Accept-Encoding: gzip, deflate",
    "Cache-Control: no-cache",
    "Connection: keep-alive",
    //"Referer: https://app-sj17.marketo.com/index.php/leadCapture/save",
    "User-Agent: copper-site",
    "cache-control: no-cache",
    "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  //print_r( $post_data );
  echo $response;
  // header("HTTP/1.1 204 OK");
}

