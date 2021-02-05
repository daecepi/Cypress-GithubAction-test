<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        'generateTransformsBeforePageLoad' => true,
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Enable CSRF Protection (recommended)
        'enableCsrfProtection' => true,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',
        
        'useProjectConfigFile' => false,

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Global Login URL
        'loginUrl' => 'https://app.prosperworks.com/users/sign_in',
        
        // Global Sign Up URL
        'signUpUrl' => 'https://www.copper.com/signup',
        'environmentVariables' => array(
            'staticAssetsVersion' => 367,
            /*
            Old amplitude crendentials
             'amplitudeAppID' => '329bcb248c48c7fa8690002479dbd07f',
             'amplitudeProjectID' => '242524',
            */
        ),        
    ],

    // Dev environment settings
    'dev' => [
        // Global Sign Up URL
        'signUpUrl' => 'https://003.ali-integration.com/users/sign_up',
        // Base site URL

        //'siteUrl' => 'https://copper.local',
        'siteUrl' => getenv('ROOT_URL'),

        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
        'environmentVariables' => array(
            'staticAssetsVersion' => time(),
            /*
            Old amplitude crendentials
            'amplitudeAppID' => 'a2df66dd7c6f26df905929b9b8e69fc4',
            'amplitudeProjectID' => '242523',
            */
        ),
        'maxInvalidLogins' => 5,
        'cooldownDuration' => 'PT1H',   
    ],

    // Staging environment settings
    'staging' => [
        // Global Sign Up URL
        'signUpUrl' => 'https://003.ali-integration.com/users/sign_up',
        // Base site URL
        'siteUrl' => 'https://copper-staging.frb.io/',
        'devMode' => true,        
    ],

    // Production environment settings
    'production' => [
        // Base site URL
        'siteUrl' => 'https://www.copper.com',
        'devMode' => false,
        'maxInvalidLogins' => 5,
        'cooldownDuration' => 'PT1H',  
    ],
];
