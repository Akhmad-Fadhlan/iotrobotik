<?php

declare(strict_types=1);

namespace App\Core;

use PDO;
use PDOException;
use RuntimeException;

/**
 * Singleton Database Wrapper untuk MySQL
 */
final class Database
{
    private static ?self $instance = null;
    private PDO $pdo;

    private function __construct()
    {
        $config = require dirname(__DIR__, 2) . '/config/database.php';
        $conn = $config['connections']['mysql'];

        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $conn['host'],
            $conn['port'],
            $conn['database'],
            $conn['charset']
        );

        try {
            $this->pdo = new PDO(
                $dsn,
                $conn['username'],
                $conn['password'],
                $conn['options']
            );
            $this->createTableIfNotExist();
        } catch (PDOException $e) {
            throw new RuntimeException('Koneksi Database MySQL Gagal: ' . $e->getMessage());
        }
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function pdo(): PDO
    {
        return $this->pdo;
    }

    /**
     * Membuat tabel progress otomatis jika belum ada
     */
    private function createTableIfNotExist(): void
    {
        $sql = "CREATE TABLE IF NOT EXISTS `microbit_progress` (
            `id` varchar(36) NOT NULL,
            `materi_id` varchar(36) NOT NULL,
            `siswa_nama` varchar(100) NOT NULL,
            `completed_at` datetime NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `idx_materi_siswa` (`materi_id`, `siswa_nama`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

        try {
            $this->pdo->exec($sql);
        } catch (PDOException $e) {
            // Silently fail if table creation fails (e.g. permission issues),
            // but log or handle it.
            error_log('Gagal membuat tabel microbit_progress: ' . $e->getMessage());
        }
    }

    /**
     * Fetch all rows
     */
    public function fetchAll(string $sql, array $params = []): array
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    /**
     * Fetch single row
     */
    public function fetchOne(string $sql, array $params = []): ?array
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $row = $stmt->fetch();
        return $row !== false ? $row : null;
    }
}
