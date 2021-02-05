<?php
/**
 * Craft web bootstrap file
 */

$httpHost = $_SERVER["HTTP_HOST"];
$requestUri = $_SERVER["REQUEST_URI"];

  if ($httpHost == "copper.local"){
    define('CRAFT_ENVIRONMENT', 'dev');
  } 
  elseif ($httpHost == "copper-staging.frb.io") {
    define('CRAFT_ENVIRONMENT', 'staging');
    // $AUTH_USER = 'qa';
    // $AUTH_PASS = 'besmarter';
    // header('Cache-Control: no-cache, must-revalidate, max-age=0');
    // $has_supplied_credentials = !(empty($_SERVER['PHP_AUTH_USER']) && empty($_SERVER['PHP_AUTH_PW']));
    // $is_not_authenticated = (
    //   !$has_supplied_credentials ||
    //   $_SERVER['PHP_AUTH_USER'] != $AUTH_USER ||
    //   $_SERVER['PHP_AUTH_PW']   != $AUTH_PASS
    // );
    // if ($is_not_authenticated) {
    //   header('HTTP/1.1 401 Authorization Required');
    //   header('WWW-Authenticate: Basic realm="Access denied"');
    //   exit;
    // }
  }

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv?
if (file_exists(CRAFT_BASE_PATH.'/.env')) {
    (new Dotenv\Dotenv(CRAFT_BASE_PATH))->load();
}

// Load and run Craft
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
$app = require CRAFT_VENDOR_PATH.'/craftcms/cms/bootstrap/web.php';
$app->run();
