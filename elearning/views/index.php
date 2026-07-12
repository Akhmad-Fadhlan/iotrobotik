<!-- Mobile Tab Header -->
<style>
@media (min-width: 768px) {
    .panels-grid {
        grid-template-columns: var(--materi-panel-width, minmax(280px, 1.1fr)) 8px var(--editor-panel-width, minmax(360px, 1.3fr)) 8px minmax(280px, 1.1fr);
        position: relative;
    }

    .panels-grid.materi-hidden {
        grid-template-columns: 0 0 var(--editor-panel-width, minmax(420px, 1.35fr)) 8px minmax(280px, 1fr);
    }

    .panels-grid.editor-hidden {
        grid-template-columns: var(--materi-panel-width, minmax(280px, 1.1fr)) 8px 0 0 minmax(420px, 1.2fr);
    }

    .panels-grid.materi-hidden.editor-hidden {
        grid-template-columns: 0 0 0 0 minmax(420px, 1fr);
    }

    .panels-grid.materi-hidden .materi-panel,
    .panels-grid.materi-hidden #materi-resize-handle,
    .panels-grid.editor-hidden .editor-panel,
    .panels-grid.editor-hidden #editor-resize-handle {
        display: none;
    }

    .panels-grid.materi-hidden #restore-materi-panel,
    .panels-grid.editor-hidden #restore-editor-panel {
        display: inline-flex;
    }

    .panel-resize-handle {
        width: 8px;
        height: 100%;
        background: rgba(42, 193, 188, 0.08);
        border-right: 1px solid var(--border-cyber);
        cursor: col-resize;
        position: relative;
        transition: background-color 0.2s ease;
        z-index: 5;
    }

    .panel-resize-handle::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 46px;
        border-radius: 99px;
        background: rgba(42, 193, 188, 0.55);
        box-shadow: 0 0 8px rgba(42, 193, 188, 0.35);
        transform: translate(-50%, -50%);
    }

    .panel-resize-handle:hover,
    .panel-resize-handle:focus-visible,
    body.panel-resizing .panel-resize-handle {
        background: rgba(42, 193, 188, 0.18);
        outline: none;
    }

    body.panel-resizing {
        cursor: col-resize;
        user-select: none;
    }
}

.panel-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
}

.materi-panel .panel-header h2 {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.panel-icon-btn,
.panel-restore-btn {
    border: 1px solid var(--border-cyber);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-primary);
    font-family: var(--font-cyber);
    cursor: pointer;
    transition: all 0.2s ease;
}

.panel-icon-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
}

.panel-icon-btn:hover,
.panel-restore-btn:hover {
    border-color: var(--mint-primary);
    color: var(--mint-primary);
    background: rgba(42, 193, 188, 0.1);
}

.panel-restore-btn {
    display: none;
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 12;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
}

#restore-editor-panel {
    left: 106px;
}

.editor-header-tabs .editor-tab + .btn-hide-editor-panel {
    margin-left: auto;
}

.editor-header-tabs .btn-unduh + .btn-hide-editor-panel {
    margin-left: 8px;
}

@media (max-width: 767px) {
    .panel-resize-handle,
    .panel-restore-btn,
    .panel-icon-btn {
        display: none !important;
    }
}
</style>

<div class="mobile-tabs-header">
    <button class="mobile-tab-btn active" data-target="materi-panel">
        <i class="fa-solid fa-book"></i> Bacaan
    </button>
    <button class="mobile-tab-btn" data-target="editor-panel">
        <i class="fa-solid fa-puzzle-piece"></i> Blok
    </button>
    <button class="mobile-tab-btn" data-target="sim-panel">
        <i class="fa-solid fa-microchip"></i> Sim
    </button>
</div>

<div class="panels-grid">
    <button class="panel-restore-btn" id="restore-materi-panel" type="button" title="Tampilkan materi">
        <i class="fa-solid fa-book-open"></i>
        <span>Materi</span>
    </button>
    <button class="panel-restore-btn" id="restore-editor-panel" type="button" title="Tampilkan Blockly">
        <i class="fa-solid fa-puzzle-piece"></i>
        <span>Blockly</span>
    </button>
    
    <!-- PANEL KIRI: Materi Bacaan (Glassmorphism Card) -->
    <section class="panel-card materi-panel active" id="materi-panel">
        <div class="panel-header">
            <span class="glow-decor"></span>
            <h2><?= htmlspecialchars($activeMateri['judul']) ?></h2>
            <div class="panel-header-actions">
                <span class="category-tag"><i class="fa-solid fa-tag"></i> Micro:bit IoT</span>
                <button class="panel-icon-btn" id="hide-materi-panel" type="button" title="Sembunyikan materi">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
            </div>
        </div>
        <div class="panel-body font-readable">
            <div class="materi-body-text">
                <?= nl2br($activeMateri['deskripsi']) ?>
            </div>
            
            <div class="code-example-box">
                <div class="code-header">
                    <span><i class="fa-solid fa-code"></i> Kode Contoh</span>
                    <button class="btn-copy-code" onclick="copyExampleCode()"><i class="fa-regular fa-copy"></i> Salin</button>
                </div>
                <pre><code id="example-code-text"><?= htmlspecialchars($activeMateri['contoh_kode']) ?></code></pre>
            </div>
            
            <div class="alert-info-box">
                <i class="fa-solid fa-circle-info text-primary"></i>
                <div>
                    <strong>Tantangan Mandiri:</strong> Tarik blok program di sebelah kanan agar menyusun logika kode contoh di atas, lalu klik <strong>Play</strong> untuk melihat hasilnya pada simulator!
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <button class="btn-complete-materi <?= in_array($activeMateri['id'], $completedIds, true) ? 'completed' : '' ?>" id="btn-complete" onclick="markMateriComplete('<?= $activeMateri['id'] ?>')">
                <i class="fa-solid <?= in_array($activeMateri['id'], $completedIds, true) ? 'fa-circle-check' : 'fa-check' ?>"></i>
                <span id="btn-complete-text"><?= in_array($activeMateri['id'], $completedIds, true) ? 'Selesai Belajar' : 'Tandai Selesai' ?></span>
            </button>
        </div>
    </section>
    <div class="panel-resize-handle" id="materi-resize-handle" role="separator" aria-orientation="vertical" aria-label="Ubah lebar materi" tabindex="0"></div>

    <!-- PANEL TENGAH & KANAN: Editor Workspace & Simulator -->
    <section class="panel-card editor-panel" id="editor-panel">
        <?php if ($activeMateri['id'] === 'hw-intro'): ?>
            <!-- Mode Pengenalan Hardware -->
            <style>
            .hardware-inspector-card {
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid var(--mint-primary);
                box-shadow: 0 0 15px var(--mint-glow);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 20px;
            }
            .inspector-header {
                font-size: 16px;
                font-weight: 700;
                color: var(--mint-primary);
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 8px;
            }
            .inspector-body {
                font-size: 14px;
                line-height: 1.6;
                color: var(--text-muted);
            }
            .inspector-body h3 {
                color: #fff;
                margin-top: 0;
                margin-bottom: 8px;
                font-size: 15px;
            }
            .inspector-body ul {
                margin: 8px 0 0 0;
                padding-left: 20px;
            }
            .inspector-body li {
                margin-bottom: 6px;
            }
            .btn-hw-doc {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--text-muted);
                padding: 10px;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-size: 12px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.2s ease-in-out;
            }
            .btn-hw-doc:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border-color: rgba(255, 255, 255, 0.2);
            }
            .btn-hw-doc.active {
                background: rgba(42, 193, 188, 0.15);
                border-color: var(--mint-primary);
                color: var(--mint-primary);
                box-shadow: 0 0 10px rgba(42, 193, 188, 0.2);
            }
            </style>
            <div class="editor-header-tabs">
                <div class="editor-tab active"><i class="fa-solid fa-microchip"></i> Inspektur Hardware</div>
                <button class="panel-icon-btn btn-hide-editor-panel" type="button" title="Sembunyikan panel editor">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
            <div class="editor-body" style="padding: 20px;">
                <div class="hardware-inspector-card">
                    <div class="inspector-header">
                        <span id="inspector-comp-name"><i class="fa-solid fa-microchip text-primary"></i> Eksplorasi Board micro:bit</span>
                    </div>
                    <div class="inspector-body" id="inspector-comp-desc">
                        Arahkan kursor mouse atau ketuk pada bagian-bagian papan micro:bit di simulator sebelah kanan untuk melihat informasi lengkap tentang komponen hardware tersebut secara interaktif.
                    </div>
                </div>
                
                <div class="hardware-file-browser" style="margin-top: 20px;">
                    <div class="browser-title" style="font-size: 12px; font-weight: 700; color: #fff; margin-bottom: 10px;"><i class="fa-solid fa-folder-open text-warning"></i> Brosur Dokumen Hardware (Folder)</div>
                    <div class="browser-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 10px;">
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('display')"><i class="fa-solid fa-table-cells"></i> LED Matrix</button>
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('buttons')"><i class="fa-solid fa-gamepad"></i> Tombol A/B</button>
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('pins')"><i class="fa-solid fa-ellipsis"></i> Pin GPIO</button>
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('processor')"><i class="fa-solid fa-microchip"></i> CPU & Suhu</button>
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('antenna')"><i class="fa-solid fa-wifi"></i> Antena Radio</button>
                        <button class="btn-hw-doc" onclick="loadHardwareDoc('sensors')"><i class="fa-solid fa-compass"></i> Akselerometer</button>
                    </div>
                </div>
            </div>
        <?php elseif (isset($activeMateri['kategori']) && $activeMateri['kategori'] === 'Pemrograman Python'): ?>
            <!-- Mode Pemrograman Python -->
            <div class="editor-header-tabs">
                <div class="editor-tab active" data-tab="python"><i class="fa-brands fa-python text-success"></i> Editor Python (MicroPython)</div>
                <button class="btn-unduh" onclick="downloadPythonCode()"><i class="fa-solid fa-download"></i> Unduh .py</button>
                <button class="panel-icon-btn btn-hide-editor-panel" type="button" title="Sembunyikan panel editor">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
            <div class="editor-body">
                <div id="python-container" class="editor-sub-panel active" style="height: 100%; display: flex; flex-direction: column;">
                    <div class="editor-sub-header" style="background: rgba(0,0,0,0.3); padding: 5px 15px; font-size: 11px; font-family: monospace; color: var(--text-muted); border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <span>main.py</span>
                    </div>
                    <textarea id="python-code-editor" style="flex: 1; width: 100%; height: 350px; background: #070c14; color: #a5f3fc; border: none; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.5; padding: 15px; box-sizing: border-box; resize: none; outline: none; border-radius: 0 0 12px 12px;"><?= htmlspecialchars($activeMateri['contoh_kode']) ?></textarea>
                </div>
            </div>
        <?php else: ?>
            <!-- Mode Standar Blockly -->
            <div class="editor-header-tabs">
                <div class="editor-tab active" data-tab="block"><i class="fa-solid fa-puzzle-piece"></i> Blok Blockly</div>
                <div class="editor-tab" data-tab="js"><i class="fa-solid fa-code"></i> Kode JavaScript</div>
                <button class="btn-unduh" onclick="downloadCode()"><i class="fa-solid fa-download"></i> Unduh</button>
                <button class="panel-icon-btn btn-hide-editor-panel" type="button" title="Sembunyikan Blockly">
                    <i class="fa-solid fa-angles-right"></i>
                </button>
            </div>
            
            <div class="editor-body">
                <!-- Blockly Area -->
                <div id="blockly-container" class="editor-sub-panel active">
                    <div id="blockly-div"></div>
                </div>
                
                <!-- JavaScript Text Area -->
                <div id="js-code-container" class="editor-sub-panel">
                    <div class="code-view-wrapper">
                        <pre><code class="language-js" id="js-code-output">// Kode JavaScript akan dihasilkan secara otomatis dari Blok...</code></pre>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </section>
    <div class="panel-resize-handle" id="editor-resize-handle" role="separator" aria-orientation="vertical" aria-label="Ubah lebar Blockly" tabindex="0"></div>
    
    <!-- PANEL SIMULATOR -->
    <section class="panel-card sim-panel" id="sim-panel">
        <div class="panel-header">
            <span class="glow-decor"></span>
            <h2>Simulator BBC micro:bit</h2>
        </div>
        <div class="panel-body sim-layout">
            <!-- Micro:bit SVG Container -->
            <div class="microbit-svg-wrapper">
                <?= $microbitSvg ?>
            </div>
            
            <!-- Controls -->
            <div class="sim-controls-panel">
                <button class="btn-sim-control btn-play" id="btn-play-sim" onclick="toggleSimulator()" title="Jalankan Program">
                    <i class="fa-solid fa-play"></i> Play
                </button>
                <button class="btn-sim-control btn-reset" id="btn-reset-sim" onclick="resetSimulator()" title="Reset Simulator">
                    <i class="fa-solid fa-rotate-left"></i> Reset
                </button>
            </div>
            
            <!-- Virtual Inputs / Sensors Panel -->
            <div class="sim-inputs-panel">
                <div class="input-panel-title"><i class="fa-solid fa-sliders"></i> Sensor Virtual</div>
                
                <!-- Temperature Slider -->
                <div class="sensor-slider-group">
                    <div class="slider-label">
                        <span>Suhu Ambient:</span>
                        <span id="temp-val">25 °C</span>
                    </div>
                    <input type="range" min="-5" max="50" value="25" class="sensor-slider" id="temp-slider" oninput="updateTemperature(this.value)">
                </div>

                <!-- Light Level Slider -->
                <div class="sensor-slider-group">
                    <div class="slider-label">
                        <span>Tingkat Cahaya:</span>
                        <span id="light-val">128</span>
                    </div>
                    <input type="range" min="0" max="255" value="128" class="sensor-slider" id="light-slider" oninput="updateLightLevel(this.value)">
                </div>
                
                <!-- A/B Physical click info -->
                <div class="button-hint-group">
                    <span class="hint-title">Kontrol Tombol:</span>
                    <div class="hints">
                        <span class="badge-hint" onclick="clickVirtualButton('A')">Klik Tombol A</span>
                        <span class="badge-hint" onclick="clickVirtualButton('B')">Klik Tombol B</span>
                        <span class="badge-hint" onclick="shakeVirtualBoard()">Goyang Board (Shake)</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>

<!-- ── XML TOOLBOX BLOCKLY LENGKAP (SESUAI MAKECODE) ── -->
<xml id="toolbox" style="display: none">
    <category name="Basic" colour="#2AC1BC">
        <block type="basic_on_start"></block>
        <block type="basic_forever"></block>
        <block type="basic_show_string">
            <value name="TEXT">
                <block type="text">
                    <field name="TEXT">Hello!</field>
                </block>
            </value>
        </block>
        <block type="basic_show_number">
            <value name="NUMBER">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
        <block type="basic_show_leds"></block>
        <block type="basic_show_icon"></block>
        <block type="basic_clear_screen"></block>
        <block type="basic_pause">
            <value name="MS">
                <block type="math_number">
                    <field name="NUM">500</field>
                </block>
            </value>
        </block>
    </category>
    <category name="Input" colour="#12B886">
        <block type="input_on_button_pressed"></block>
        <block type="input_button_is_pressed"></block>
        <block type="input_on_gesture"></block>
        <block type="input_temperature"></block>
        <block type="input_light_level"></block>
        <block type="input_compass_heading"></block>
    </category>
    <category name="Musik" colour="#E286F2">
        <block type="music_play_tone">
            <value name="NOTE">
                <block type="math_number">
                    <field name="NUM">440</field>
                </block>
            </value>
            <value name="DURATION">
                <block type="math_number">
                    <field name="NUM">500</field>
                </block>
            </value>
        </block>
    </category>
    <category name="Radio" colour="#74C0FC">
        <block type="radio_send_number">
            <value name="NUM">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
        </block>
    </category>
    <category name="Pins" colour="#4a90e2">
        <block type="pins_digital_write">
            <field name="PIN">P0</field>
            <value name="VALUE">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
        </block>
        <block type="pins_analog_write">
            <field name="PIN">P0</field>
            <value name="VALUE">
                <block type="math_number">
                    <field name="NUM">512</field>
                </block>
            </value>
        </block>
        <block type="pins_servo_write">
            <field name="PIN">P0</field>
            <value name="VALUE">
                <block type="math_number">
                    <field name="NUM">180</field>
                </block>
            </value>
        </block>
        <block type="pins_digital_read"></block>
        <block type="pins_analog_read"></block>
    </category>
    <category name="Logic" colour="#FFB347">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_boolean"></block>
        <block type="logic_negate"></block>
    </category>
    <category name="Loops" colour="#FF6B6B">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <block type="math_number">
                    <field name="NUM">4</field>
                </block>
            </value>
        </block>
        <block type="controls_whileUntil"></block>
    </category>
    <category name="Math" colour="#4a5568">
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="math_random_int">
            <value name="FROM">
                <block type="math_number">
                    <field name="NUM">0</field>
                </block>
            </value>
            <value name="TO">
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
            </value>
        </block>
    </category>
    <category name="Variables" custom="VARIABLE" colour="#a0aec0"></category>
    <category name="Lanjut (Advanced)" colour="#5b67a5">
        <category name="Fungsi" custom="PROCEDURE" colour="#995ba5"></category>
        <category name="Array" colour="#745ba5">
            <block type="lists_create_empty"></block>
            <block type="lists_create_with"></block>
            <block type="lists_repeat">
                <value name="NUM">
                    <block type="math_number">
                        <field name="NUM">5</field>
                    </block>
                </value>
            </block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
        </category>
        <category name="Teks" colour="#5ba58c">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_length">
                <value name="VALUE">
                    <block type="text">
                        <field name="TEXT">abc</field>
                    </block>
                </value>
            </block>
            <block type="text_isEmpty">
                <value name="VALUE">
                    <block type="text">
                        <field name="TEXT"></field>
                    </block>
                </value>
            </block>
        </category>
    </category>
</xml>

<!-- Simpan XML blok awal secara aman agar dapat diload JS -->
<div id="materi-initial-xml" style="display:none;"><?= htmlspecialchars($activeMateri['kode_blok']) ?></div>
<script>
    // Global parameters for simulation sync
    window.ACTIVE_MATERI_ID = "<?= $activeMateri['id'] ?>";
    window.SISWA_NAMA = "<?= htmlspecialchars($siswaNama) ?>";

    document.addEventListener('DOMContentLoaded', function () {
        const grid = document.querySelector('.panels-grid');
        const handle = document.getElementById('materi-resize-handle');
        const editorHandle = document.getElementById('editor-resize-handle');
        const hideBtn = document.getElementById('hide-materi-panel');
        const hideEditorBtns = document.querySelectorAll('.btn-hide-editor-panel');
        const restoreBtn = document.getElementById('restore-materi-panel');
        const restoreEditorBtn = document.getElementById('restore-editor-panel');

        if (!grid || !handle || !editorHandle || !hideBtn || !restoreBtn || !restoreEditorBtn) return;

        const widthKey = 'microbitMateriPanelWidth';
        const hiddenKey = 'microbitMateriPanelHidden';
        const editorWidthKey = 'microbitEditorPanelWidth';
        const editorHiddenKey = 'microbitEditorPanelHidden';
        const wideLayout = () => window.matchMedia('(min-width: 768px)').matches;
        const resizeBlockly = () => {
            if (!window.Blockly || !Blockly.getMainWorkspace) return;
            const workspace = Blockly.getMainWorkspace();
            if (!workspace) return;
            window.requestAnimationFrame(() => Blockly.svgResize(workspace));
            window.setTimeout(() => Blockly.svgResize(workspace), 120);
        };
        const clampWidth = (width) => {
            const gridWidth = grid.getBoundingClientRect().width || window.innerWidth;
            const minWidth = gridWidth < 980 ? 240 : 280;
            const maxWidth = Math.max(minWidth, Math.min(620, gridWidth - 640, gridWidth * 0.52));
            return Math.round(Math.min(Math.max(width, minWidth), maxWidth));
        };
        const clampEditorWidth = (width) => {
            const gridWidth = grid.getBoundingClientRect().width || window.innerWidth;
            const minWidth = gridWidth < 980 ? 300 : 360;
            const maxWidth = Math.max(minWidth, Math.min(820, gridWidth - 360, gridWidth * 0.66));
            return Math.round(Math.min(Math.max(width, minWidth), maxWidth));
        };
        const applyWidth = (width, save = true) => {
            const nextWidth = clampWidth(width);
            grid.style.setProperty('--materi-panel-width', `${nextWidth}px`);
            if (save) localStorage.setItem(widthKey, String(nextWidth));
            resizeBlockly();
            return nextWidth;
        };
        const applyEditorWidth = (width, save = true) => {
            const nextWidth = clampEditorWidth(width);
            grid.style.setProperty('--editor-panel-width', `${nextWidth}px`);
            if (save) localStorage.setItem(editorWidthKey, String(nextWidth));
            resizeBlockly();
            return nextWidth;
        };
        const setHidden = (hidden) => {
            grid.classList.toggle('materi-hidden', hidden && wideLayout());
            localStorage.setItem(hiddenKey, hidden ? '1' : '0');
            resizeBlockly();
        };
        const setEditorHidden = (hidden) => {
            grid.classList.toggle('editor-hidden', hidden && wideLayout());
            localStorage.setItem(editorHiddenKey, hidden ? '1' : '0');
            resizeBlockly();
        };

        const savedWidth = Number(localStorage.getItem(widthKey));
        if (Number.isFinite(savedWidth) && savedWidth > 0) {
            applyWidth(savedWidth, false);
        }
        const savedEditorWidth = Number(localStorage.getItem(editorWidthKey));
        if (Number.isFinite(savedEditorWidth) && savedEditorWidth > 0) {
            applyEditorWidth(savedEditorWidth, false);
        }
        setHidden(localStorage.getItem(hiddenKey) === '1');
        setEditorHidden(localStorage.getItem(editorHiddenKey) === '1');

        let dragging = false;
        let editorDragging = false;

        handle.addEventListener('pointerdown', (event) => {
            if (!wideLayout()) return;
            dragging = true;
            document.body.classList.add('panel-resizing');
            handle.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        handle.addEventListener('pointermove', (event) => {
            if (!dragging) return;
            const gridLeft = grid.getBoundingClientRect().left;
            applyWidth(event.clientX - gridLeft);
        });

        const stopDragging = (event) => {
            if (!dragging) return;
            dragging = false;
            document.body.classList.remove('panel-resizing');
            if (handle.hasPointerCapture(event.pointerId)) {
                handle.releasePointerCapture(event.pointerId);
            }
        };

        handle.addEventListener('pointerup', stopDragging);
        handle.addEventListener('pointercancel', stopDragging);
        handle.addEventListener('keydown', (event) => {
            if (!wideLayout()) return;
            const materiPanel = document.getElementById('materi-panel');
            const currentWidth = Number(localStorage.getItem(widthKey)) || (materiPanel ? materiPanel.getBoundingClientRect().width : 320);

            if (event.key === 'ArrowLeft') {
                applyWidth(currentWidth - 24);
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                applyWidth(currentWidth + 24);
                event.preventDefault();
            } else if (event.key === 'Home') {
                applyWidth(240);
                event.preventDefault();
            } else if (event.key === 'End') {
                applyWidth(9999);
                event.preventDefault();
            }
        });

        editorHandle.addEventListener('pointerdown', (event) => {
            if (!wideLayout()) return;
            editorDragging = true;
            document.body.classList.add('panel-resizing');
            editorHandle.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        editorHandle.addEventListener('pointermove', (event) => {
            if (!editorDragging) return;
            const editorPanel = document.getElementById('editor-panel');
            if (!editorPanel) return;
            const editorLeft = editorPanel.getBoundingClientRect().left;
            applyEditorWidth(event.clientX - editorLeft);
        });

        const stopEditorDragging = (event) => {
            if (!editorDragging) return;
            editorDragging = false;
            document.body.classList.remove('panel-resizing');
            if (editorHandle.hasPointerCapture(event.pointerId)) {
                editorHandle.releasePointerCapture(event.pointerId);
            }
        };

        editorHandle.addEventListener('pointerup', stopEditorDragging);
        editorHandle.addEventListener('pointercancel', stopEditorDragging);
        editorHandle.addEventListener('keydown', (event) => {
            if (!wideLayout()) return;
            const editorPanel = document.getElementById('editor-panel');
            const currentWidth = Number(localStorage.getItem(editorWidthKey)) || (editorPanel ? editorPanel.getBoundingClientRect().width : 420);

            if (event.key === 'ArrowLeft') {
                applyEditorWidth(currentWidth - 24);
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                applyEditorWidth(currentWidth + 24);
                event.preventDefault();
            } else if (event.key === 'Home') {
                applyEditorWidth(300);
                event.preventDefault();
            } else if (event.key === 'End') {
                applyEditorWidth(9999);
                event.preventDefault();
            }
        });

        hideBtn.addEventListener('click', () => setHidden(true));
        restoreBtn.addEventListener('click', () => setHidden(false));
        hideEditorBtns.forEach((btn) => btn.addEventListener('click', () => setEditorHidden(true)));
        restoreEditorBtn.addEventListener('click', () => setEditorHidden(false));

        window.addEventListener('resize', () => {
            if (!wideLayout()) {
                grid.classList.remove('materi-hidden');
                grid.classList.remove('editor-hidden');
                resizeBlockly();
                return;
            }

            if (localStorage.getItem(hiddenKey) === '1') {
                setHidden(true);
            } else {
                const materiPanel = document.getElementById('materi-panel');
                const currentWidth = Number(localStorage.getItem(widthKey)) || (materiPanel ? materiPanel.getBoundingClientRect().width : 320);
                applyWidth(currentWidth, false);
            }

            if (localStorage.getItem(editorHiddenKey) === '1') {
                setEditorHidden(true);
            } else {
                const editorPanel = document.getElementById('editor-panel');
                const currentWidth = Number(localStorage.getItem(editorWidthKey)) || (editorPanel ? editorPanel.getBoundingClientRect().width : 420);
                applyEditorWidth(currentWidth, false);
            }
        });
    });
</script>
