<?php

declare(strict_types=1);

/**
 * Front Controller untuk Aplikasi Standalone E-Learning Micro:bit
 */

// Aktifkan error reporting penuh untuk debugging di hosting
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Define Root Path
define('ROOT_PATH', dirname(__DIR__));

// Require Autoloader
require_once ROOT_PATH . '/app/autoload.php';

// Dispatch Router
$router = require_once ROOT_PATH . '/routes.php';
$router->dispatch();
