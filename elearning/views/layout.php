<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Belajar Micro:bit — Standalone</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    
    <!-- CSS Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom Futuristic CSS -->
    <link rel="stylesheet" href="/assets/css/futuristic.css?v=<?= time() ?>">
</head>
<body class="cyber-body">

    <!-- ── GRID LAYOUT UTAMA ── -->
    <div class="cyber-container" id="cyber-container">
        
        <!-- ── 1. DESKTOP SIDEBAR (>1200px) ── -->
        <aside class="mb-desktop-sidebar">
            <div class="sidebar-header">
                <div class="cyber-logo">
                    <span class="glow-dot"></span>
                    <i class="fa-solid fa-microchip"></i>
                    <span>MICRO:BIT</span>
                </div>
                <div class="logo-sub">Space Academy</div>
            </div>
            
            <!-- Student Selector -->
            <div class="student-selector-box">
                <label class="input-label"><i class="fa-solid fa-user-astronaut"></i> Nama Siswa:</label>
                <div class="input-action-group">
                    <input type="text" id="siswa-nama-input" value="<?= htmlspecialchars($siswaNama) ?>" placeholder="Masukkan nama..." onkeydown="handleNameKeydown(event)" onblur="changeStudentName(this.value)">
                </div>
            </div>
            
            <div class="progress-panel">
                <div class="progress-title">
                    <span>Progress Belajar</span>
                    <span class="progress-val" id="progress-val-text"><?= $progressPercent ?>%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="progress-bar-fill" style="width: <?= $progressPercent ?>%"></div>
                </div>
                <div class="progress-status">
                    <span id="progress-materi-count"><?= $completedCount ?></span> dari <?= $totalMateri ?> materi selesai
                </div>
            </div>

            <nav class="sidebar-menu">
                <?php
                $groupedMateri = [];
                foreach ($materiList as $materi) {
                    $k = isset($materi['kategori']) ? $materi['kategori'] : 'General';
                    $groupedMateri[$k][] = $materi;
                }
                foreach ($groupedMateri as $kategori => $items):
                ?>
                    <div class="menu-label" style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-top: 20px; margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;"><?= htmlspecialchars($kategori) ?></div>
                    <ul class="materi-list" style="margin-bottom: 15px;">
                        <?php foreach ($items as $materi): ?>
                            <?php 
                            $isCompleted = in_array($materi['id'], $completedIds, true);
                            $isActive = $materi['id'] === $activeMateri['id'];
                            ?>
                            <li class="materi-item <?= $isActive ? 'active' : '' ?> <?= $isCompleted ? 'completed' : '' ?>">
                                <a href="/materi/<?= $materi['id'] ?>?siswa_nama=<?= urlencode($siswaNama) ?>" class="materi-link">
                                    <span class="completion-indicator">
                                        <i class="fa-solid <?= $isCompleted ? 'fa-check-double' : 'fa-circle-notch' ?>"></i>
                                    </span>
                                    <span class="materi-title-text"><?= htmlspecialchars($materi['judul']) ?></span>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endforeach; ?>
            </nav>
            
            <div class="sidebar-footer">
                <?php if ($dbConnected): ?>
                    <div class="db-badge success">
                        <i class="fa-solid fa-database text-success"></i> Connected to MySQL
                    </div>
                <?php else: ?>
                    <div class="db-badge warning" title="MySQL Offline: <?= htmlspecialchars($dbError) ?>">
                        <i class="fa-solid fa-triangle-exclamation text-warning"></i> DB Offline (Sesi Aktif)
                    </div>
                <?php endif; ?>
            </div>
        </aside>

        <!-- ── 2. TABLET NAVIGATION RAIL (768px - 1199px) ── -->
        <nav class="mb-tablet-rail">
            <div class="rail-logo" title="Microbit Space Academy">
                <i class="fa-solid fa-microchip text-primary"></i>
            </div>
            
            <div class="rail-menu">
                <a href="/?siswa_nama=<?= urlencode($siswaNama) ?>" class="rail-item active" title="Belajar Microbit">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <span>Belajar</span>
                </a>
                <a href="#" class="rail-item" onclick="toggleStudentInputModal(event)" title="Ganti Nama Siswa">
                    <i class="fa-solid fa-user-astronaut"></i>
                    <span>Siswa</span>
                </a>
            </div>
            
            <div class="rail-footer">
                <?php if ($dbConnected): ?>
                    <i class="fa-solid fa-server text-success" title="Connected to MySQL"></i>
                <?php else: ?>
                    <i class="fa-solid fa-triangle-exclamation text-warning" title="MySQL Offline: <?= htmlspecialchars($dbError) ?>"></i>
                <?php endif; ?>
            </div>
        </nav>

        <!-- ── 3. MOBILE APP BAR (<768px) ── -->
        <header class="mb-mobile-appbar">
            <div class="appbar-left">
                <span class="appbar-logo"><i class="fa-solid fa-microchip"></i></span>
                <span class="appbar-title">Materi: <?= htmlspecialchars($activeMateri['judul']) ?></span>
            </div>
            <div class="appbar-right">
                <span class="mobile-progress-badge"><?= $progressPercent ?>%</span>
            </div>
        </header>

        <!-- ── 4. CONTENT AREA (DINAMIS SIBER) ── -->
        <main class="mb-main-content">
            <?= $content ?>
        </main>

        <!-- ── 5. MOBILE BOTTOM NAVIGATION (<768px) ── -->
        <nav class="mb-mobile-bottom-nav">
            <a href="/?siswa_nama=<?= urlencode($siswaNama) ?>" class="bottom-nav-item active">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>Belajar</span>
            </a>
            <a href="#materi-list-modal" class="bottom-nav-item" onclick="toggleMobileMateriModal(event)">
                <i class="fa-solid fa-list-ul"></i>
                <span>Materi</span>
            </a>
            <a href="#" class="bottom-nav-item" onclick="toggleStudentInputModal(event)">
                <i class="fa-solid fa-user-astronaut"></i>
                <span>Siswa</span>
            </a>
        </nav>
        
        <!-- Mobile Materi Modal List -->
        <div class="mobile-materi-modal" id="mobile-materi-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Daftar Materi</h3>
                    <button class="btn-close-modal" onclick="closeMobileMateriModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <?php
                    $groupedMateri = [];
                    foreach ($materiList as $materi) {
                        $k = isset($materi['kategori']) ? $materi['kategori'] : 'General';
                        $groupedMateri[$k][] = $materi;
                    }
                    foreach ($groupedMateri as $kategori => $items):
                    ?>
                        <div class="menu-label-mobile" style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-top: 15px; margin-bottom: 5px; font-weight: 700; letter-spacing: 1px; padding-left: 10px;"><?= htmlspecialchars($kategori) ?></div>
                        <ul class="materi-list" style="margin-bottom: 15px;">
                            <?php foreach ($items as $materi): ?>
                                <?php 
                                $isCompleted = in_array($materi['id'], $completedIds, true);
                                $isActive = $materi['id'] === $activeMateri['id'];
                                ?>
                                <li class="materi-item <?= $isActive ? 'active' : '' ?> <?= $isCompleted ? 'completed' : '' ?>">
                                    <a href="/materi/<?= $materi['id'] ?>?siswa_nama=<?= urlencode($siswaNama) ?>" class="materi-link" onclick="closeMobileMateriModal()">
                                        <span class="completion-indicator">
                                            <i class="fa-solid <?= $isCompleted ? 'fa-check-double' : 'fa-circle-notch' ?>"></i>
                                        </span>
                                        <span class="materi-title-text"><?= htmlspecialchars($materi['judul']) ?></span>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Student Name Input Modal for Tablet/Mobile -->
        <div class="mobile-materi-modal" id="student-name-modal">
            <div class="modal-content" style="max-height: 40vh; border-radius: 20px 20px 0 0;">
                <div class="modal-header">
                    <h3>Ganti Nama Siswa</h3>
                    <button class="btn-close-modal" onclick="closeStudentInputModal()"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body" style="padding: 20px 10px;">
                    <div class="student-selector-box" style="margin-bottom: 20px;">
                        <input type="text" id="modal-siswa-nama-input" value="<?= htmlspecialchars($siswaNama) ?>" placeholder="Masukkan nama..." style="width: 100%; box-sizing: border-box;">
                    </div>
                    <button class="btn-complete-materi" onclick="saveStudentFromModal()">Ganti Nama & Muat Ulang</button>
                </div>
            </div>
        </div>

    </div>

    <!-- ── CORE SCRIPTS ── -->
    <!-- Load Google Blockly dari CDN resmi (Compressed versions) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blockly/10.4.3/blockly_compressed.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blockly/10.4.3/blocks_compressed.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blockly/10.4.3/javascript_compressed.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blockly/10.4.3/msg/id.js"></script>
    
    <!-- JS Simulator Utama -->
    <script src="/assets/js/simulator.js?v=<?= time() ?>" defer></script>
    
    <!-- Global Helper Scripts -->
    <script>
        function handleNameKeydown(e) {
            if (e.key === 'Enter') {
                changeStudentName(e.target.value);
            }
        }
        
        function changeStudentName(name) {
            const cleanName = name.trim();
            if (cleanName && cleanName !== "<?= htmlspecialchars($siswaNama) ?>") {
                const currentMateriId = "<?= $activeMateri['id'] ?>";
                window.location.href = '/materi/' + currentMateriId + '?siswa_nama=' + encodeURIComponent(cleanName);
            }
        }
        
        function toggleStudentInputModal(e) {
            if (e) e.preventDefault();
            document.getElementById('student-name-modal').classList.add('active');
        }
        
        function closeStudentInputModal() {
            document.getElementById('student-name-modal').classList.remove('active');
        }
        
        function saveStudentFromModal() {
            const input = document.getElementById('modal-siswa-nama-input');
            changeStudentName(input.value);
        }
    </script>
</body>
</html>
