<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Helper untuk response render view & JSON
 */
final class Response
{
    /**
     * Render view dengan data
     */
    public static function view(string $view, array $data = []): void
    {
        extract($data, EXTR_SKIP);

        $viewFile = dirname(__DIR__, 2) . '/views/' . $view . '.php';
        $layoutFile = dirname(__DIR__, 2) . '/views/layout.php';

        if (!file_exists($viewFile)) {
            http_response_code(500);
            echo "View file tidak ditemukan: {$viewFile}";
            return;
        }

        // Buffer view content untuk di-inject ke layout
        ob_start();
        require $viewFile;
        $content = ob_get_clean();

        if (file_exists($layoutFile)) {
            require $layoutFile;
        } else {
            echo $content;
        }
    }

    /**
     * Mengirimkan output JSON
     */
    public static function json(array $data, int $statusCode = 200): never
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }
}
