<?php

declare(strict_types=1);

use App\Core\Router;
use Controllers\MicrobitController;

$router = new Router();

// Routes
$router->get('/',                 [MicrobitController::class, 'index']);
$router->get('/materi/:id',       [MicrobitController::class, 'index']);
$router->post('/materi/:id/complete', [MicrobitController::class, 'complete']);

return $router;
