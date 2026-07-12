<?php

declare(strict_types=1);

/**
 * Root index.php
 * Redirect otomatis ke folder public untuk kompatibilitas server hosting lokal
 */
header('Location: /public/');
exit;
