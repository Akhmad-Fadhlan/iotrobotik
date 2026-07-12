<?php

declare(strict_types=1);

/**
 * Konfigurasi Database MySQL
 */
return [
    'default' => 'mysql',

    'connections' => [
        'mysql' => [
            'host'     => 'localhost',
            'port'     => 3306,
            'database' => 'u378913818_lms',
            'username' => 'u378913818_lms',
            'password' => 'Akhmad90@',
            'charset'  => 'utf8mb4',
            'options'  => [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ],
        ],
    ],
];
