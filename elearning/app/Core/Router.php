<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Router HTTP sederhana dengan parameter URL regex
 */
final class Router
{
    private array $routes = [];

    public function get(string $path, array $handler): void
    {
        $this->routes[] = ['method' => 'GET', 'pattern' => $path, 'handler' => $handler];
    }

    public function post(string $path, array $handler): void
    {
        $this->routes[] = ['method' => 'POST', 'pattern' => $path, 'handler' => $handler];
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        
        // Strip query string (?foo=bar)
        if (($pos = strpos($uri, '?')) !== false) {
            $uri = substr($uri, 0, $pos);
        }
        $uri = '/' . trim($uri, '/');

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            // Ganti :param dengan regex group
            $pattern = preg_replace('/:([a-zA-Z0-9_]+)/', '(?P<$1>[^/]+)', $route['pattern']);
            $pattern = '#^/' . trim($pattern, '/') . '$#';

            if (preg_match($pattern, $uri, $matches)) {
                // Ambil parameter yang cocok
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                [$controllerClass, $action] = $route['handler'];

                if (!class_exists($controllerClass)) {
                    http_response_code(500);
                    echo "Controller {$controllerClass} tidak ditemukan.";
                    return;
                }

                $controller = new $controllerClass();
                if (!method_exists($controller, $action)) {
                    http_response_code(500);
                    echo "Method {$action} tidak ditemukan di {$controllerClass}.";
                    return;
                }

                // Panggil action dengan parameter
                call_user_func_array([$controller, $action], $params);
                return;
            }
        }

        // Halaman Tidak Ditemukan
        http_response_code(404);
        echo "<h1>404 Halaman Tidak Ditemukan</h1><p>Alamat URL tidak terdaftar di sistem.</p>";
    }
}
