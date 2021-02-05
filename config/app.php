<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */


if (getenv('MEMCACHE_COUNT'))
{ 
    $handlers = []; 
	foreach(range(1, getenv('MEMCACHE_COUNT')) as $num)
	{ 
        $handlers[] = getenv('MEMCACHE_HOST' . $num) . ':' . getenv('MEMCACHE_PORT' . $num); 
    }  
    ini_set('session.save_handler', 'memcached'); ini_set('session.save_path', implode(',', $handlers));
}

 return [
    'modules' => [
        'my-module' => \modules\Module::class,
    ],
    //'bootstrap' => ['my-module'],
];
