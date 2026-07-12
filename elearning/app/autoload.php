<?php

declare(strict_types=1);

/**
 * Autoloader PSR-4 sederhana
 */
spl_autoload_register(function (string $class): void {
    $prefixes = [
        'App\\' => __DIR__ . '/',
        'Controllers\\' => dirname(__DIR__) . '/controllers/',
    ];

    foreach ($prefixes as $prefix => $baseDir) {
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) {
            continue;
        }

        $relativeClass = substr($class, $len);
        $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

        if (file_exists($file)) {
            require $file;
            return;
        }
    }
});
