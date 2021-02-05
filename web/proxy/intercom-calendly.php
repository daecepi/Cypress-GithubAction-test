<?php 

$json = json_decode( file_get_contents('php://input') );
function getJSONData($json, $term){
  foreach ( $json as $key => $item )
    if ($key == $term ) {
      return $item;
    }
}

$intercomKey = 'dYh3hHaKfA5Zd5NS3kLmKqa88C_a0kpeJ8uL9Nw8';

$email = getJSONData($json, 'email');

$hash = hash_hmac('sha256', $email, $intercomKey);

echo $hash;