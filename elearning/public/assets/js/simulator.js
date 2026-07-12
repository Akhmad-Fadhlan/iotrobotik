/**
 * simulator.js
 * Logika Editor Drag-and-Drop (Blockly) dan Simulator Micro:bit Standalone
 * Berjalan sepenuhnya di sisi klien, menyimpan progress ke MySQL via AJAX
 */

(function () {
    'use strict';

    // Global states
    let workspace = null;
    let isPlaying = false;
    let runId = 0; // execution task ID to avoid race conditions
    let activeTab = 'block';
    
    // Sensor values
    let currentTemp = 25;
    let currentLightLevel = 128;
    let currentHeading = 90;
    
    // Physical button states
    let buttonState = {
        A: false,
        B: false
    };
    
    // Callback registers for event handlers (A/B, Gestures)
    let eventCallbacks = {
        buttonPressed: {},
        gesture: {}
    };
    
    // Active loops registry (for runForever)
    let activeLoops = [];

    // Font 5x5 Map for scroll text representation
    const font5x5 = {
        ' ': [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        'A': [
            [0,1,1,0,0],
            [1,0,0,1,0],
            [1,1,1,1,0],
            [1,0,0,1,0],
            [1,0,0,1,0]
        ],
        'B': [
            [1,1,1,0,0],
            [1,0,0,1,0],
            [1,1,1,0,0],
            [1,0,0,1,0],
            [1,1,1,0,0]
        ],
        'C': [
            [0,1,1,1,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [0,1,1,1,0]
        ],
        'D': [
            [1,1,1,0,0],
            [1,0,0,1,0],
            [1,0,0,1,0],
            [1,0,0,1,0],
            [1,1,1,0,0]
        ],
        'E': [
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,1,1,1,0],
            [1,0,0,0,0],
            [1,1,1,1,1]
        ],
        'F': [
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,1,1,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ],
        'G': [
            [0,1,1,1,0],
            [1,0,0,0,0],
            [1,0,1,1,1],
            [1,0,0,1,0],
            [0,1,1,1,0]
        ],
        'H': [
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ],
        'I': [
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,1,1,1,0]
        ],
        'J': [
            [0,0,1,1,1],
            [0,0,0,1,0],
            [0,0,0,1,0],
            [1,0,0,1,0],
            [0,1,1,0,0]
        ],
        'K': [
            [1,0,0,0,1],
            [1,0,0,1,0],
            [1,1,1,0,0],
            [1,0,0,1,0],
            [1,0,0,0,1]
        ],
        'L': [
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,0,0,0,0],
            [1,1,1,1,1]
        ],
        'M': [
            [1,0,0,0,1],
            [1,1,0,1,1],
            [1,0,1,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
        ],
        'N': [
            [1,0,0,0,1],
            [1,1,0,0,1],
            [1,0,1,0,1],
            [1,0,0,1,1],
            [1,0,0,0,1]
        ],
        'O': [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        'P': [
            [1,1,1,1,0],
            [1,0,0,0,1],
            [1,1,1,1,0],
            [1,0,0,0,0],
            [1,0,0,0,0]
        ],
        'Q': [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [1,0,1,0,1],
            [1,0,0,1,0],
            [0,1,1,0,1]
        ],
        'R': [
            [1,1,1,1,0],
            [1,0,0,0,1],
            [1,1,1,1,0],
            [1,0,0,1,0],
            [1,0,0,0,1]
        ],
        'S': [
            [0,1,1,1,1],
            [1,0,0,0,0],
            [0,1,1,1,0],
            [0,0,0,0,1],
            [1,1,1,1,0]
        ],
        'T': [
            [1,1,1,1,1],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0]
        ],
        'U': [
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        'V': [
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [0,1,0,1,0],
            [0,0,1,0,0]
        ],
        'W': [
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,1,0,1],
            [1,1,0,1,1],
            [1,0,0,0,1]
        ],
        'X': [
            [1,0,0,0,1],
            [0,1,0,1,0],
            [0,0,1,0,0],
            [0,1,0,1,0],
            [1,0,0,0,1]
        ],
        'Y': [
            [1,0,0,0,1],
            [0,1,0,1,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0]
        ],
        'Z': [
            [1,1,1,1,1],
            [0,0,0,1,0],
            [0,0,1,0,0],
            [0,1,0,0,0],
            [1,1,1,1,1]
        ],
        '!': [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,1,0,0]
        ],
        '0': [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        '1': [
            [0,0,1,0,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,1,1,1,0]
        ],
        '2': [
            [0,1,1,1,0],
            [0,0,0,0,1],
            [0,1,1,1,0],
            [1,0,0,0,0],
            [1,1,1,1,1]
        ],
        '3': [
            [1,1,1,1,0],
            [0,0,0,0,1],
            [0,1,1,1,0],
            [0,0,0,0,1],
            [1,1,1,1,0]
        ],
        '4': [
            [1,0,0,0,1],
            [1,0,0,0,1],
            [1,1,1,1,1],
            [0,0,0,0,1],
            [0,0,0,0,1]
        ],
        '5': [
            [1,1,1,1,1],
            [1,0,0,0,0],
            [1,1,1,1,0],
            [0,0,0,0,1],
            [1,1,1,1,0]
        ],
        '6': [
            [0,1,1,1,0],
            [1,0,0,0,0],
            [1,1,1,1,0],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        '7': [
            [1,1,1,1,1],
            [0,0,0,0,1],
            [0,0,0,1,0],
            [0,0,1,0,0],
            [0,1,0,0,0]
        ],
        '8': [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [0,1,1,1,0],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        '9': [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [0,1,1,1,1],
            [0,0,0,0,1],
            [0,1,1,1,0]
        ]
    };

    const icons5x5 = {
        'Heart': [
            [0,1,0,1,0],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [0,1,1,1,0],
            [0,0,1,0,0]
        ],
        'Smile': [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,0,0,0],
            [1,0,0,0,1],
            [0,1,1,1,0]
        ],
        'Sad': [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,0,0,0],
            [0,1,1,1,0],
            [1,0,0,0,1]
        ],
        'Confused': [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,0,0,0],
            [0,1,0,1,0],
            [1,0,1,0,1]
        ],
        'Yes': [
            [0,0,0,0,0],
            [0,0,0,0,1],
            [0,0,0,1,0],
            [1,0,1,0,0],
            [0,1,0,0,0]
        ],
        'No': [
            [1,0,0,0,1],
            [0,1,0,1,0],
            [0,0,1,0,0],
            [0,1,0,1,0],
            [1,0,0,0,1]
        ]
    };

    // ── INISIALISASI BLOCKLY CUSTOM BLOCKS ──
    function defineCustomBlocks() {
        // A. Basic Category
        // 1. basic_on_start
        Blockly.Blocks['basic_on_start'] = {
            init: function() {
                this.appendDummyInput().appendField("saat mulai");
                this.appendStatementInput("HANDLER").setCheck(null);
                this.setColour('#2AC1BC');
                this.setTooltip("Dijalankan sekali di awal program");
            }
        };
        javascript.javascriptGenerator.forBlock['basic_on_start'] = function(block, generator) {
            const branch = generator.statementToCode(block, 'HANDLER');
            return `// saat mulai\n${branch}`;
        };

        // 2. basic_forever
        Blockly.Blocks['basic_forever'] = {
            init: function() {
                this.appendDummyInput().appendField("selamanya");
                this.appendStatementInput("HANDLER").setCheck(null);
                this.setColour('#2AC1BC');
                this.setTooltip("Dijalankan terus-menerus berulang");
            }
        };
        javascript.javascriptGenerator.forBlock['basic_forever'] = function(block, generator) {
            const branch = generator.statementToCode(block, 'HANDLER');
            return `await input.runForever(async () => {\n${branch}});\n`;
        };

        // 3. basic_show_string
        Blockly.Blocks['basic_show_string'] = {
            init: function () {
                this.appendValueInput("TEXT")
                    .setCheck("String")
                    .appendField("tampilkan string");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_show_string'] = function (block, generator) {
            const value_text = generator.valueToCode(block, 'TEXT', javascript.Order.ATOMIC) || "''";
            return `await basic.showString(${value_text});\n`;
        };

        // 4. basic_show_number
        Blockly.Blocks['basic_show_number'] = {
            init: function () {
                this.appendValueInput("NUMBER")
                    .setCheck("Number")
                    .appendField("tampilkan angka");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_show_number'] = function (block, generator) {
            const value_number = generator.valueToCode(block, 'NUMBER', javascript.Order.ATOMIC) || "0";
            return `await basic.showNumber(${value_number});\n`;
        };

        // 5. basic_show_leds (5x5 Grid Checkbox)
        Blockly.Blocks['basic_show_leds'] = {
            init: function () {
                this.appendDummyInput().appendField("tampilkan LED");
                for (let r = 0; r < 5; r++) {
                    const input = this.appendDummyInput();
                    for (let c = 0; c < 5; c++) {
                        input.appendField(new Blockly.FieldCheckbox("FALSE"), `LED${c}${r}`);
                    }
                }
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_show_leds'] = function (block, generator) {
            const grid = [];
            for (let r = 0; r < 5; r++) {
                const row = [];
                for (let c = 0; c < 5; c++) {
                    row.push(block.getFieldValue(`LED${c}${r}`) === "TRUE" ? 1 : 0);
                }
                grid.push(`[${row.join(",")}]`);
            }
            return `await basic.showLeds([${grid.join(",")}]);\n`;
        };

        // 6. basic_show_icon
        Blockly.Blocks['basic_show_icon'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("tampilkan ikon")
                    .appendField(new Blockly.FieldDropdown([
                        ["Heart", "Heart"],
                        ["Smile", "Smile"],
                        ["Sad", "Sad"],
                        ["Confused", "Confused"],
                        ["Yes", "Yes"],
                        ["No", "No"]
                    ]), "ICON");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_show_icon'] = function (block, generator) {
            const dropdown_icon = block.getFieldValue('ICON');
            return `await basic.showIcon("${dropdown_icon}");\n`;
        };

        // 7. basic_clear_screen
        Blockly.Blocks['basic_clear_screen'] = {
            init: function () {
                this.appendDummyInput().appendField("bersihkan layar");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_clear_screen'] = function (block, generator) {
            return `await basic.clearScreen();\n`;
        };

        // 8. basic_pause
        Blockly.Blocks['basic_pause'] = {
            init: function () {
                this.appendValueInput("MS")
                    .setCheck("Number")
                    .appendField("jeda (ms)");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#2AC1BC');
            }
        };
        javascript.javascriptGenerator.forBlock['basic_pause'] = function (block, generator) {
            const value_ms = generator.valueToCode(block, 'MS', javascript.Order.ATOMIC) || "500";
            return `await basic.pause(${value_ms});\n`;
        };

        // B. Input Category
        // 9. input_on_button_pressed
        Blockly.Blocks['input_on_button_pressed'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("ketika tombol")
                    .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"]]), "BUTTON")
                    .appendField("ditekan");
                this.appendStatementInput("HANDLER").setCheck(null);
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_on_button_pressed'] = function (block, generator) {
            const dropdown_button = block.getFieldValue('BUTTON');
            const statements_handler = generator.statementToCode(block, 'HANDLER');
            return `input.onButtonPressed("${dropdown_button}", async () => {\n${statements_handler}});\n`;
        };

        // 10. input_button_is_pressed
        Blockly.Blocks['input_button_is_pressed'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("tombol")
                    .appendField(new Blockly.FieldDropdown([["A", "A"], ["B", "B"]]), "BUTTON")
                    .appendField("ditekan");
                this.setOutput(true, "Boolean");
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_button_is_pressed'] = function(block, generator) {
            const dropdown_button = block.getFieldValue('BUTTON');
            return [`input.buttonIsPressed("${dropdown_button}")`, javascript.Order.ATOMIC];
        };

        // 11. input_temperature
        Blockly.Blocks['input_temperature'] = {
            init: function () {
                this.appendDummyInput().appendField("suhu (°C)");
                this.setOutput(true, "Number");
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_temperature'] = function (block, generator) {
            return [`input.temperature()`, javascript.Order.ATOMIC];
        };

        // 12. input_light_level
        Blockly.Blocks['input_light_level'] = {
            init: function() {
                this.appendDummyInput().appendField("tingkat cahaya");
                this.setOutput(true, "Number");
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_light_level'] = function(block, generator) {
            return [`input.lightLevel()`, javascript.Order.ATOMIC];
        };

        // 13. input_compass_heading
        Blockly.Blocks['input_compass_heading'] = {
            init: function () {
                this.appendDummyInput().appendField("arah kompas (°)");
                this.setOutput(true, "Number");
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_compass_heading'] = function (block, generator) {
            return [`input.compassHeading()`, javascript.Order.ATOMIC];
        };

        // 14. input_on_gesture
        Blockly.Blocks['input_on_gesture'] = {
            init: function () {
                this.appendDummyInput()
                    .appendField("ketika")
                    .appendField(new Blockly.FieldDropdown([["digoyang (shake)", "shake"]]), "GESTURE");
                this.appendStatementInput("HANDLER").setCheck(null);
                this.setColour('#12B886');
            }
        };
        javascript.javascriptGenerator.forBlock['input_on_gesture'] = function (block, generator) {
            const dropdown_gesture = block.getFieldValue('GESTURE');
            const statements_handler = generator.statementToCode(block, 'HANDLER');
            return `input.onGesture("${dropdown_gesture}", async () => {\n${statements_handler}});\n`;
        };

        // C. Musik Category
        // 15. music_play_tone
        Blockly.Blocks['music_play_tone'] = {
            init: function () {
                this.appendValueInput("NOTE")
                    .setCheck("Number")
                    .appendField("bunyikan nada");
                this.appendValueInput("DURATION")
                    .setCheck("Number")
                    .appendField("selama (ms)");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#E286F2');
            }
        };
        javascript.javascriptGenerator.forBlock['music_play_tone'] = function (block, generator) {
            const val_note = generator.valueToCode(block, 'NOTE', javascript.Order.ATOMIC) || "440";
            const val_duration = generator.valueToCode(block, 'DURATION', javascript.Order.ATOMIC) || "500";
            return `await music.playTone(${val_note}, ${val_duration});\n`;
        };

        // D. Radio Category
        // 16. radio_send_number
        Blockly.Blocks['radio_send_number'] = {
            init: function () {
                this.appendValueInput("NUM")
                    .setCheck("Number")
                    .appendField("kirim angka radio");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#74C0FC');
            }
        };
        javascript.javascriptGenerator.forBlock['radio_send_number'] = function (block, generator) {
            const value_num = generator.valueToCode(block, 'NUM', javascript.Order.ATOMIC) || "0";
            return `await radio.sendNumber(${value_num});\n`;
        };

        // E. Pins Category
        // 17. pins_digital_write
        Blockly.Blocks['pins_digital_write'] = {
            init: function () {
                this.appendValueInput("VALUE")
                    .setCheck("Number")
                    .appendField("tulis pin digital")
                    .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"], ["P2", "P2"]]), "PIN")
                    .appendField("ke");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#4a90e2');
            }
        };
        javascript.javascriptGenerator.forBlock['pins_digital_write'] = function (block, generator) {
            const dropdown_pin = block.getFieldValue('PIN');
            const value_val = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || "0";
            return `await pins.digitalWrite("${dropdown_pin}", ${value_val});\n`;
        };

        // 18. pins_analog_write
        Blockly.Blocks['pins_analog_write'] = {
            init: function () {
                this.appendValueInput("VALUE")
                    .setCheck("Number")
                    .appendField("tulis pin analog")
                    .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"], ["P2", "P2"]]), "PIN")
                    .appendField("ke");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#4a90e2');
            }
        };
        javascript.javascriptGenerator.forBlock['pins_analog_write'] = function (block, generator) {
            const dropdown_pin = block.getFieldValue('PIN');
            const value_val = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || "0";
            return `await pins.analogWrite("${dropdown_pin}", ${value_val});\n`;
        };

        // 19. pins_digital_read
        Blockly.Blocks['pins_digital_read'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("baca pin digital")
                    .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"], ["P2", "P2"]]), "PIN");
                this.setOutput(true, "Number");
                this.setColour('#4a90e2');
            }
        };
        javascript.javascriptGenerator.forBlock['pins_digital_read'] = function(block, generator) {
            const dropdown_pin = block.getFieldValue('PIN');
            return [`pins.digitalRead("${dropdown_pin}")`, javascript.Order.ATOMIC];
        };

        // 20. pins_analog_read
        Blockly.Blocks['pins_analog_read'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("baca pin analog")
                    .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"], ["P2", "P2"]]), "PIN");
                this.setOutput(true, "Number");
                this.setColour('#4a90e2');
            }
        };
        javascript.javascriptGenerator.forBlock['pins_analog_read'] = function(block, generator) {
            const dropdown_pin = block.getFieldValue('PIN');
            return [`pins.analogRead("${dropdown_pin}")`, javascript.Order.ATOMIC];
        };

        // 21. pins_servo_write
        Blockly.Blocks['pins_servo_write'] = {
            init: function () {
                this.appendValueInput("VALUE")
                    .setCheck("Number")
                    .appendField("tulis pin servo")
                    .appendField(new Blockly.FieldDropdown([["P0", "P0"], ["P1", "P1"], ["P2", "P2"]]), "PIN")
                    .appendField("ke");
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour('#4a90e2');
            }
        };
        javascript.javascriptGenerator.forBlock['pins_servo_write'] = function (block, generator) {
            const dropdown_pin = block.getFieldValue('PIN');
            const value_val = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || "0";
            return `await pins.servoWrite("${dropdown_pin}", ${value_val});\n`;
        };
    }

    // Call block definitions immediately upon load to ensure they are registered in Blockly.Blocks
    defineCustomBlocks();

    // ── LOGIKA MOCK RUNTIME INTERPRETER SIMULATOR ──
    
    // Inisialisasi peta element LED pada SVG agar memiliki ID "led-x-y"
    // Serta men-generate sisa LED yang tidak ada di SVG agar menjadi grid 5x5 lengkap secara dinamis
    function setupSvgLedIDs() {
        const svg = document.querySelector('.microbit-svg-wrapper svg');
        if (!svg) return;

        // Parent element untuk menggambar rects
        const displayParent = svg.querySelector('.sim-display')?.parentNode || svg;

        const xCoords = [154, 200, 246, 292, 338];
        const yCoords = [113, 157, 201, 245, 289];

        // Pertama, beri ID pada rect.sim-led yang sudah ada di SVG
        svg.querySelectorAll('rect.sim-led').forEach(rect => {
            const title = rect.querySelector('title') || rect.parentNode.querySelector('title');
            if (title) {
                const coords = title.textContent.trim().replace(/[()]/g, '').split(',');
                if (coords.length === 2) {
                    const c = coords[0].trim();
                    const r = coords[1].trim();
                    rect.setAttribute('id', `led-${c}-${r}`);
                }
            }
        });

        // Kedua, loop 5x5 untuk memeriksa apakah semua ID led-c-r terpasang, jika tidak ada generate secara dinamis
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                const ledId = `led-${c}-${r}`;
                let led = svg.getElementById(ledId);

                if (!led) {
                    const backX = xCoords[c];
                    const backY = yCoords[r];
                    const foreX = backX - 2;
                    const foreY = backY - 2;

                    // Buat background rect jika belum ada
                    let backRect = svg.querySelector(`rect.sim-led-back[x="${backX}"][y="${backY}"]`);
                    if (!backRect) {
                        backRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        backRect.setAttribute('width', '10');
                        backRect.setAttribute('height', '20');
                        backRect.setAttribute('x', backX);
                        backRect.setAttribute('y', backY);
                        backRect.setAttribute('fill', '#202020');
                        backRect.setAttribute('class', 'sim-led-back');
                        backRect.setAttribute('rx', '2');
                        backRect.setAttribute('ry', '2');
                        displayParent.appendChild(backRect);
                    }

                    // Buat foreground LED rect (aktif)
                    led = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    led.setAttribute('id', ledId);
                    led.setAttribute('width', '14');
                    led.setAttribute('height', '24');
                    led.setAttribute('x', foreX);
                    led.setAttribute('y', foreY);
                    led.setAttribute('fill', '#202020');
                    led.setAttribute('class', 'sim-led');
                    led.setAttribute('rx', '3');
                    led.setAttribute('ry', '3');

                    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                    title.textContent = `(${c},${r})`;
                    led.appendChild(title);

                    displayParent.appendChild(led);
                }

                // Reset state & style awal
                led.setAttribute('fill', '#202020');
                led.style.filter = 'none';
                led.style.cursor = 'pointer';
            }
        }

        // Setup klik tombol fisik di SVG
        document.querySelectorAll('.sim-button-outer').forEach(btn => {
            const title = btn.querySelector('title') || btn.parentNode.querySelector('title');
            if (title) {
                const label = title.textContent.trim().toUpperCase();
                btn.style.pointerEvents = 'all';
                btn.style.cursor = 'pointer';
                
                // Mousedown / Mouseup listeners untuk buttonState real-time
                btn.addEventListener('mousedown', () => {
                    btn.classList.add('pressed');
                    buttonState[label] = true;
                    triggerButtonPress(label);
                });
                btn.addEventListener('mouseup', () => {
                    btn.classList.remove('pressed');
                    buttonState[label] = false;
                });
                btn.addEventListener('mouseleave', () => {
                    btn.classList.remove('pressed');
                    buttonState[label] = false;
                });
            }
        });
    }

    // Tampilkan pola LED manual
    async function simShowLeds(grid) {
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                const led = document.getElementById(`led-${c}-${r}`);
                if (led) {
                    if (grid[r][c] === 1) {
                        led.setAttribute('fill', '#FF3A54');
                        led.style.filter = 'drop-shadow(0 0 6px #FF3A54)';
                    } else {
                        led.setAttribute('fill', '#202020');
                        led.style.filter = 'none';
                    }
                }
            }
        }
    }

    // Bersihkan layar
    function simClearScreen() {
        const offGrid = Array(5).fill().map(() => Array(5).fill(0));
        simShowLeds(offGrid);
    }

    // Animasi menggulirkan teks siber pada LED
    async function simScrollText(text, currentRunId) {
        const cleanText = text.toUpperCase();
        for (let i = 0; i < cleanText.length; i++) {
            if (runId !== currentRunId || !isPlaying) return;

            const char = cleanText[i];
            const pattern = font5x5[char] || font5x5[' '];
            
            await simShowLeds(pattern);
            await new Promise(resolve => setTimeout(resolve, 600));
            
            if (runId !== currentRunId || !isPlaying) return;
            simClearScreen();
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Pemicu tombol siber ditekan
    function triggerButtonPress(btnName) {
        if (eventCallbacks.buttonPressed[btnName]) {
            eventCallbacks.buttonPressed[btnName]();
        }
    }

    // Pemicu board digoyang (shake)
    function triggerGesture(gestureName) {
        const svg = document.querySelector('.microbit-svg-wrapper svg');
        if (svg) {
            svg.style.transition = 'transform 0.1s ease-in-out';
            svg.style.transform = 'translate(10px, 10px) rotate(5deg)';
            setTimeout(() => {
                svg.style.transform = 'translate(-10px, -10px) rotate(-5deg)';
                setTimeout(() => {
                    svg.style.transform = 'translate(8px, -5px) rotate(3deg)';
                    setTimeout(() => {
                        svg.style.transform = 'none';
                    }, 80);
                }, 80);
            }, 80);
        }

        if (eventCallbacks.gesture[gestureName]) {
            eventCallbacks.gesture[gestureName]();
        }
    }

    // ── PLAY / RESET KONTROL SIMULATOR ──
    window.toggleSimulator = async function () {
        const btn = document.getElementById('btn-play-sim');
        if (isPlaying) {
            resetSimulator();
        } else {
            isPlaying = true;
            runId++;
            
            btn.innerHTML = '<i class="fa-solid fa-square"></i> Stop';
            btn.className = 'btn-sim-control btn-play playing';
            
            let code = "";
            const pyEditor = document.getElementById('python-code-editor');
            if (pyEditor) {
                code = translatePythonToJS(pyEditor.value);
            } else if (workspace) {
                code = javascript.javascriptGenerator.workspaceToCode(workspace);
            }
            
            simClearScreen();
            eventCallbacks = { buttonPressed: {}, gesture: {} };
            activeLoops = [];
            
            const currentRunId = runId;
            const basic = {
                showString: async (str) => {
                    await simScrollText(String(str), currentRunId);
                },
                showNumber: async (num) => {
                    await simScrollText(String(num), currentRunId);
                },
                showLeds: async (grid) => {
                    if (runId === currentRunId) {
                        await simShowLeds(grid);
                    }
                },
                showIcon: async (iconName) => {
                    if (runId === currentRunId) {
                        const grid = icons5x5[iconName] || icons5x5['Heart'];
                        await simShowLeds(grid);
                    }
                },
                clearScreen: async () => {
                    if (runId === currentRunId) {
                        simClearScreen();
                    }
                },
                pause: async (ms) => {
                    if (runId === currentRunId) {
                        await new Promise(resolve => setTimeout(resolve, ms));
                    }
                }
            };

            const input = {
                onButtonPressed: (btn, callback) => {
                    eventCallbacks.buttonPressed[btn] = callback;
                },
                buttonIsPressed: (btn) => {
                    return buttonState[btn] || false;
                },
                onGesture: (gesture, callback) => {
                    eventCallbacks.gesture[gesture] = callback;
                },
                temperature: () => currentTemp,
                lightLevel: () => currentLightLevel,
                compassHeading: () => currentHeading,
                runForever: async (loopCallback) => {
                    activeLoops.push(true);
                    const loopIndex = activeLoops.length - 1;
                    
                    (async () => {
                        while (isPlaying && runId === currentRunId && activeLoops[loopIndex]) {
                            await loopCallback();
                            await new Promise(resolve => setTimeout(resolve, 50));
                        }
                    })();
                }
            };

            const radio = {
                sendNumber: async (num) => {
                    console.log(`[Radio TX] Mengirim angka: ${num}`);
                    showToastNotification(`Radio terkirim: "${num}"`);
                }
            };

            const pins = {
                digitalWrite: async (pin, val) => {
                    console.log(`[GPIO] Pin ${pin} ditulis ke ${val}`);
                    showToastNotification(`Pin ${pin} ditulis ke ${val}`);
                },
                analogWrite: async (pin, val) => {
                    console.log(`[GPIO] Pin ${pin} ditulis analog ke ${val}`);
                    showToastNotification(`Pin ${pin} ditulis analog ke ${val}`);
                },
                servoWrite: async (pin, val) => {
                    console.log(`[GPIO] Servo Pin ${pin} diputar ke ${val}°`);
                    showToastNotification(`Servo Pin ${pin} diputar ke ${val}°`);
                },
                digitalRead: (pin) => {
                    // Mock read
                    const val = Math.random() > 0.5 ? 1 : 0;
                    showToastNotification(`Pin ${pin} dibaca digital: ${val}`);
                    return val;
                },
                analogRead: (pin) => {
                    // Mock read 0-1023
                    const val = Math.floor(Math.random() * 1024);
                    showToastNotification(`Pin ${pin} dibaca analog: ${val}`);
                    return val;
                }
            };

            const music = {
                playTone: async (note, duration) => {
                    console.log(`[Buzzer] Bunyikan nada ${note}Hz selama ${duration}ms`);
                    try {
                        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        
                        osc.type = 'sine';
                        osc.frequency.value = note;
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);
                        
                        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                        
                        osc.start();
                        osc.stop(audioCtx.currentTime + (duration / 1000));
                    } catch(e) {
                        console.error('Audio API tidak didukung.', e);
                    }
                    await new Promise(resolve => setTimeout(resolve, duration));
                }
            };

            try {
                const runner = new Function('basic', 'input', 'radio', 'pins', 'music', `
                    return (async () => {
                        try {
                            ${code}
                        } catch (e) {
                            console.error('Runtime error:', e);
                        }
                    })();
                `);
                
                await runner(basic, input, radio, pins, music);
            } catch (err) {
                console.error('Compile error:', err);
                showToastNotification('Kesalahan program! Periksa susunan blok Anda.');
            }
        }
    };

    window.resetSimulator = function () {
        isPlaying = false;
        runId++;
        activeLoops = [];
        simClearScreen();
        
        const btn = document.getElementById('btn-play-sim');
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
        btn.className = 'btn-sim-control btn-play';
        
        eventCallbacks = { buttonPressed: {}, gesture: {} };
    };

    // Sensor updates
    window.updateTemperature = function (val) {
        currentTemp = parseInt(val);
        document.getElementById('temp-val').innerText = `${val} °C`;
    };

    window.updateLightLevel = function (val) {
        currentLightLevel = parseInt(val);
        document.getElementById('light-val').innerText = `${val}`;
    };

    // Virtual interaction helpers
    window.clickVirtualButton = function (btnName) {
        // Simulasikan trigger button click
        triggerButtonPress(btnName);
        showToastNotification(`Tombol ${btnName} virtual diklik`);
    };

    window.shakeVirtualBoard = function () {
        triggerGesture('shake');
        showToastNotification('Simulator digoyang (Shake)!');
    };

    // ── PROGRESS PEMBELAJARAN (AJAX SYNC KE MYSQL) ──
    window.markMateriComplete = function (materiId) {
        const btn = document.getElementById('btn-complete');
        if (btn.classList.contains('completed')) return;

        fetch(`/materi/${materiId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                siswa_nama: window.SISWA_NAMA
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                btn.classList.add('completed');
                document.getElementById('btn-complete-text').innerText = 'Selesai Belajar';
                btn.querySelector('i').className = 'fa-solid fa-circle-check';
                
                showToastNotification(data.message || 'Progress belajar disimpan ke MySQL.');
                updateProgressUI(materiId);
            } else {
                showToastNotification(data.message || 'Gagal menyimpan progress.');
            }
        })
        .catch(err => {
            console.error('Error completing materi:', err);
            showToastNotification('Gagal menghubungkan ke MySQL server.');
        });
    };

    function updateProgressUI(newCompletedId) {
        const listItems = document.querySelectorAll('.materi-list .materi-item');
        let completedCount = 0;
        
        listItems.forEach(item => {
            const link = item.querySelector('.materi-link');
            const href = link.getAttribute('href');
            const url = new URL(href, window.location.origin);
            const pathParts = url.pathname.split('/');
            const id = pathParts[pathParts.length - 1];
            
            if (id === newCompletedId) {
                item.classList.add('completed');
                item.querySelector('.completion-indicator i').className = 'fa-solid fa-check-double';
            }
            
            if (item.classList.contains('completed')) {
                completedCount++;
            }
        });
        
        const total = listItems.length;
        const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        
        const bar = document.getElementById('progress-bar-fill');
        if (bar) bar.style.width = `${percent}%`;
        
        const valText = document.getElementById('progress-val-text');
        if (valText) valText.innerText = `${percent}%`;
        
        const countText = document.getElementById('progress-materi-count');
        if (countText) countText.innerText = completedCount;
        
        const badge = document.querySelector('.mobile-progress-badge');
        if (badge) badge.innerText = `${percent}%`;
    }

    // ── TABS NAVIGATION UTAMA ──
    
    // Editor Tabs (Blok vs JS)
    document.querySelectorAll('.editor-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.editor-sub-panel').forEach(p => p.classList.remove('active'));
            
            if (target === 'block') {
                document.getElementById('blockly-container').classList.add('active');
                activeTab = 'block';
            } else {
                document.getElementById('js-code-container').classList.add('active');
                activeTab = 'js';
                
                const code = Blockly.JavaScript.workspaceToCode(workspace);
                document.getElementById('js-code-output').innerText = code || '// Canvas kosong. Tarik blok untuk menghasilkan kode.';
            }
        });
    });

    // Mobile Navigation Panels Tab switching
    document.querySelectorAll('.mobile-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            document.querySelectorAll('.mobile-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.panel-card').forEach(p => p.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
            
            if (targetId === 'editor-panel' && workspace) {
                Blockly.svgResize(workspace);
            }
        });
    });

    // ── HELPER UTAMA LAINNYA ──
    window.copyExampleCode = function () {
        const text = document.getElementById('example-code-text').innerText;
        navigator.clipboard.writeText(text)
            .then(() => showToastNotification('Contoh kode disalin!'))
            .catch(() => showToastNotification('Gagal menyalin kode.'));
    };

    window.downloadCode = function () {
        const code = javascript.javascriptGenerator.workspaceToCode(workspace);
        const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `microbit_program.js`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToastNotification('Program JavaScript diunduh!');
    };

    // Mobile Modals
    window.toggleMobileMateriModal = function (e) {
        e.preventDefault();
        document.getElementById('mobile-materi-modal').classList.add('active');
    };
    
    window.closeMobileMateriModal = function () {
        document.getElementById('mobile-materi-modal').classList.remove('active');
    };

    // Notifikasi Toast Siber
    function showToastNotification(msg) {
        const oldToast = document.getElementById('cyber-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.id = 'cyber-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(10, 18, 30, 0.95)';
        toast.style.border = '1px solid var(--mint-primary)';
        toast.style.boxShadow = '0 0 15px var(--mint-glow)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.fontSize = '13px';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '1000';
        toast.style.transition = 'opacity 0.3s';
        toast.innerHTML = `<i class="fa-solid fa-bell text-primary" style="margin-right: 8px;"></i> ${msg}`;

        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ── INITIALIZATION ──
    document.addEventListener('DOMContentLoaded', () => {
        setupSvgLedIDs();
        if (window.ACTIVE_MATERI_ID === 'hw-intro') {
            setupInteractiveHardware();
        }

        // Inisialisasi Google Blockly
        const blocklyDiv = document.getElementById('blockly-div');
        const toolboxXml = document.getElementById('toolbox');
        
        if (blocklyDiv && toolboxXml) {
            workspace = Blockly.inject(blocklyDiv, {
                toolbox: toolboxXml,
                scrollbars: true,
                trashcan: true,
                zoom: {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                },
                theme: {
                    'componentStyles': {
                        'workspaceBackgroundColour': '#0c121e',
                        'toolboxBackgroundColour': '#070c14',
                        'flyoutBackgroundColour': '#090f19',
                        'scrollbarColour': '#2AC1BC',
                        'scrollbarOpacity': 0.15
                    }
                }
            });

            // Sizing fix for Grid/Flex layouts
            Blockly.svgResize(workspace);
            setTimeout(() => { Blockly.svgResize(workspace); }, 100);
            setTimeout(() => { Blockly.svgResize(workspace); }, 500);

            // Load initial blocks
            const initialXmlText = document.getElementById('materi-initial-xml').innerText;
            if (initialXmlText) {
                try {
                    const xml = Blockly.utils.xml.textToDom(initialXmlText);
                    Blockly.Xml.domToWorkspace(xml, workspace);
                } catch(e) {
                    console.error('Gagal meload blok materi awal.', e);
                }
            }

            workspace.addChangeListener(() => {
                if (activeTab === 'js') {
                    const code = javascript.javascriptGenerator.workspaceToCode(workspace);
                    document.getElementById('js-code-output').innerText = code;
                }
            });
            
            window.addEventListener('resize', () => {
                Blockly.svgResize(workspace);
            });
        }
    });

    // ── PROGRAM TRANSPILER PYTHON-TO-JS UNTUK SIMULATOR MICRO:BIT ──
    function translatePythonToJS(pythonCode) {
        let jsCode = "";
        const lines = pythonCode.split('\n');
        const stack = [{ indent: 0, type: 'root' }];
        let pendingBlockType = 'normal';
        
        // Cari semua nama fungsi kustom
        const customFuncs = [];
        lines.forEach(l => {
            const m = l.trim().match(/^def\s+(\w+)\(/);
            if (m) {
                customFuncs.push(m[1]);
            }
        });
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const trimmed = line.trim();
            
            // Abaikan import dan komentar penuh/baris kosong
            if (trimmed.startsWith("from microbit import") || trimmed.startsWith("import ") || trimmed === "") {
                continue;
            }
            if (trimmed.startsWith("#")) {
                jsCode += "// " + trimmed.substring(1) + "\n";
                continue;
            }
            
            const matchIndent = line.match(/^(\s*)/);
            const indent = matchIndent ? matchIndent[0].length : 0;
            
            // Pop stack jika indentasi berkurang
            while (stack.length > 1 && stack[stack.length - 1].indent > indent) {
                const popped = stack.pop();
                if (popped.type === 'while') {
                    jsCode += " ".repeat(popped.indent - 4) + "});\n";
                } else {
                    jsCode += " ".repeat(popped.indent - 4) + "}\n";
                }
            }
            
            // Push stack jika indentasi bertambah
            const currentIndent = stack[stack.length - 1].indent;
            if (indent > currentIndent) {
                stack.push({ indent: indent, type: pendingBlockType });
            }
            
            // Tentukan block type untuk block berikutnya jika baris ini berakhiran dengan ':'
            if (trimmed.endsWith(":")) {
                if (trimmed.startsWith("while True:")) {
                    pendingBlockType = 'while';
                } else {
                    pendingBlockType = 'normal';
                }
            } else {
                pendingBlockType = 'normal';
            }
            
            let jsLine = trimmed;
            
            // Ubah komentar inline # menjadi //
            jsLine = jsLine.replace(/#\s*(.*)$/, '// $1');
            
            // Pencabangan & Loop
            if (trimmed.startsWith("while True:")) {
                jsLine = "await input.runForever(async () => {";
            } else if (trimmed.startsWith("while ") && trimmed.endsWith(":")) {
                const cond = trimmed.substring(6, trimmed.length - 1)
                                   .replace(/button_a\.is_pressed\(\)/g, 'input.buttonIsPressed("A")')
                                   .replace(/button_b\.is_pressed\(\)/g, 'input.buttonIsPressed("B")');
                jsLine = `while (${cond}) {`;
            } else if (trimmed.startsWith("if ") && trimmed.endsWith(":")) {
                const cond = trimmed.substring(3, trimmed.length - 1)
                                   .replace(/button_a\.is_pressed\(\)/g, 'input.buttonIsPressed("A")')
                                   .replace(/button_b\.is_pressed\(\)/g, 'input.buttonIsPressed("B")')
                                   .replace(/temperature\(\)/g, 'input.temperature()')
                                   .replace(/compass\.heading\(\)/g, 'input.compassHeading()');
                jsLine = `if (${cond}) {`;
            } else if (trimmed.startsWith("elif ") && trimmed.endsWith(":")) {
                const cond = trimmed.substring(5, trimmed.length - 1)
                                   .replace(/button_a\.is_pressed\(\)/g, 'input.buttonIsPressed("A")')
                                   .replace(/button_b\.is_pressed\(\)/g, 'input.buttonIsPressed("B")')
                                   .replace(/temperature\(\)/g, 'input.temperature()')
                                   .replace(/compass\.heading\(\)/g, 'input.compassHeading()');
                jsLine = `else if (${cond}) {`;
            } else if (trimmed === "else:") {
                jsLine = "else {";
            } else if (trimmed.startsWith("for ") && trimmed.endsWith(":")) {
                const loopMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\((.*?)\):$/);
                if (loopMatch) {
                    jsLine = `for (let ${loopMatch[1]} = 0; ${loopMatch[1]} < ${loopMatch[2]}; ${loopMatch[1]}++) {`;
                } else {
                    const listMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(.*?):$/);
                    if (listMatch) {
                        jsLine = `for (let ${listMatch[1]} of ${listMatch[2]}) {`;
                    }
                }
            } else if (trimmed.startsWith("def ") && trimmed.endsWith(":")) {
                const defMatch = trimmed.match(/^def\s+(\w+)\((.*?)\):$/);
                if (defMatch) {
                    jsLine = `async function ${defMatch[1]}(${defMatch[2]}) {`;
                }
            }
            
            // Pemetaan Metode List dan String
            jsLine = jsLine
                .replace(/\.append\(/g, '.push(')
                .replace(/len\((.*?)\)/g, '($1).length')
                .replace(/\.upper\(\)/g, '.toUpperCase()')
                .replace(/\.lower\(\)/g, '.toLowerCase()')
                .replace(/\.find\((.*?)\)/g, '.indexOf($1)');
            
            // Pemetaan Fungsi MicroPython ke runtime simulator JS
            jsLine = jsLine
                .replace(/display\.scroll\((.*?)\)/g, 'await basic.showString($1)')
                .replace(/display\.show\((.*?)\)/g, (match, p1) => {
                    if (p1.startsWith("Image.")) {
                        const iconName = p1.replace("Image.", "").toUpperCase();
                        const iconMap = {
                            'HEART': 'Heart',
                            'HAPPY': 'Smile',
                            'SAD': 'Sad',
                            'CONFUSED': 'Confused',
                            'YES': 'Yes',
                            'NO': 'No'
                        };
                        const mapped = iconMap[iconName] || 'Heart';
                        return `await basic.showIcon("${mapped}")`;
                    }
                    return `await basic.showString(String(${p1}))`;
                })
                .replace(/display\.clear\(\)/g, 'await basic.clearScreen()')
                .replace(/sleep\((.*?)\)/g, 'await basic.pause($1)')
                .replace(/button_a\.is_pressed\(\)/g, 'input.buttonIsPressed("A")')
                .replace(/button_b\.is_pressed\(\)/g, 'input.buttonIsPressed("B")')
                .replace(/temperature\(\)/g, 'input.temperature()')
                .replace(/compass\.heading\(\)/g, 'input.compassHeading()')
                .replace(/pin0\.write_digital\((.*?)\)/g, 'await pins.digitalWrite("P0", $1)')
                .replace(/pin1\.write_digital\((.*?)\)/g, 'await pins.digitalWrite("P1", $1)')
                .replace(/pin2\.write_digital\((.*?)\)/g, 'await pins.digitalWrite("P2", $1)')
                .replace(/pin0\.write_analog\((.*?)\)/g, 'await pins.analogWrite("P0", $1)')
                .replace(/pin1\.write_analog\((.*?)\)/g, 'await pins.analogWrite("P1", $1)')
                .replace(/pin2\.write_analog\((.*?)\)/g, 'await pins.analogWrite("P2", $1)')
                .replace(/music\.play_tone\((.*?),\s*(.*?)\)/g, 'await music.playTone($1, $2)')
                .replace(/radio\.on\(\)/g, '')
                .replace(/radio\.send\((.*?)\)/g, 'await radio.sendNumber($1)');
            
            // Tambahkan await untuk pemanggilan fungsi kustom
            customFuncs.forEach(funcName => {
                const regex = new RegExp(`\\b${funcName}\\((.*?)\\)`, 'g');
                if (!jsLine.includes(`async function ${funcName}`) && !jsLine.includes(`await ${funcName}`)) {
                    jsLine = jsLine.replace(regex, `await ${funcName}($1)`);
                }
            });
            
            jsCode += " ".repeat(indent) + jsLine + "\n";
        }
        
        // Pop sisa stack di akhir file
        while (stack.length > 1) {
            const popped = stack.pop();
            if (popped.type === 'while') {
                jsCode += " ".repeat(popped.indent - 4) + "});\n";
            } else {
                jsCode += " ".repeat(popped.indent - 4) + "}\n";
            }
        }
        
        return jsCode;
    }

    // ── INTEGRASI INTERAKTIF HARDWARE EXPLORER ──
    window.loadHardwareDoc = function(docName) {
        document.querySelectorAll('.btn-hw-doc').forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.querySelector(`.btn-hw-doc[onclick*="'${docName}'"]`);
        if (targetBtn) targetBtn.classList.add('active');

        fetch(`/views/hardware/${docName}.html`)
            .then(res => {
                if (!res.ok) throw new Error('File not found');
                return res.text();
            })
            .then(html => {
                document.getElementById('inspector-comp-name').innerHTML = `<i class="fa-solid fa-microchip text-primary"></i> Informasi Komponen`;
                document.getElementById('inspector-comp-desc').innerHTML = html;
            })
            .catch(err => {
                const fallbacks = {
                    display: `<h3>LED Matrix 5x5 Display</h3><p>micro:bit memiliki layar tampilan LED 5x5 berwarna merah (total 25 LED) di bagian depannya.</p><ul><li><strong>Output Teks & Gambar</strong>: Mampu menampilkan teks berjalan, angka, atau ikon bawaan.</li><li><strong>Sensor Cahaya</strong>: Layar LED ini juga berfungsi sebagai sensor cahaya ambient dengan mengukur arus balik listrik.</li></ul>`,
                    buttons: `<h3>Tombol Fisik A & B</h3><p>Terdapat dua tombol input taktil fisik berlabel A dan B di bagian depan micro:bit.</p><ul><li><strong>Tombol A</strong>: Terhubung ke GPIO Pin 5.</li><li><strong>Tombol B</strong>: Terhubung ke GPIO Pin 11.</li><li><strong>Event</strong>: Mendeteksi klik untuk memicu aksi di program Anda.</li></ul>`,
                    pins: `<h3>Edge Connector & Pin GPIO</h3><p>Konektor tepi di bagian bawah papan micro:bit menyediakan pin ekspansi.</p><ul><li><strong>Pin Besar (0, 1, 2)</strong>: Pin input/output analog dan digital utama.</li><li><strong>Daya & Ground (3V & GND)</strong>: Menyediakan daya 3.3V dan ground negatif.</li><li><strong>Pin Kecil</strong>: Komunikasi I2C, SPI, dan ekspansi lanjut.</li></ul>`,
                    processor: `<h3>Prosesor (CPU) & Sensor Suhu</h3><p>Prosesor utama terletak di bagian belakang papan micro:bit.</p><ul><li><strong>Mikrokontroler</strong>: Menggunakan Nordic ARM Cortex-M0/M4.</li><li><strong>Sensor Suhu</strong>: Mendeteksi suhu silikon chip untuk perkiraan suhu ruangan.</li></ul>`,
                    antenna: `<h3>Antena BLE & Radio Nirkabel</h3><p>micro:bit memiliki antena internal untuk komunikasi nirkabel.</p><ul><li><strong>Bluetooth (BLE)</strong>: Menghubungkan board ke smartphone/komputer nirkabel.</li><li><strong>Radio RF (2.4 GHz)</strong>: Mengirim pesan nirkabel antar board micro:bit terdekat.</li></ul>`,
                    sensors: `<h3>Akselerometer & Kompas</h3><p>micro:bit dilengkapi sensor gerak dan arah navigasi bawaan.</p><ul><li><strong>Akselerometer</strong>: Mengukur kemiringan, gerakan goyang (shake), atau jatuh bebas.</li><li><strong>Kompas</strong>: Mendeteksi arah medan magnet bumi (kompas digital 0-359°).</li></ul>`
                };
                document.getElementById('inspector-comp-name').innerHTML = `<i class="fa-solid fa-microchip text-primary"></i> Informasi Komponen`;
                document.getElementById('inspector-comp-desc').innerHTML = fallbacks[docName] || err.message;
            });
    };

    function setupInteractiveHardware() {
        const svg = document.querySelector('.microbit-svg-wrapper svg');
        if (!svg) return;

        // Display
        const display = svg.querySelector('.sim-display');
        if (display) {
            display.style.cursor = 'pointer';
            display.style.pointerEvents = 'all';
            display.addEventListener('click', () => loadHardwareDoc('display'));
        }
        svg.querySelectorAll('rect.sim-led, rect.sim-led-back').forEach(led => {
            led.style.cursor = 'pointer';
            led.addEventListener('click', (e) => {
                e.stopPropagation();
                loadHardwareDoc('display');
            });
        });

        // Buttons
        svg.querySelectorAll('.sim-button-outer').forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                loadHardwareDoc('buttons');
            });
        });

        // Pins
        svg.querySelectorAll('.sim-pin').forEach(pin => {
            pin.style.cursor = 'pointer';
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                loadHardwareDoc('pins');
            });
        });
        
        // Papan microbit / Board background -> CPU/Processor
        const board = svg.querySelector('.sim-board');
        if (board) {
            board.style.cursor = 'pointer';
            board.addEventListener('click', (e) => {
                e.stopPropagation();
                loadHardwareDoc('processor');
            });
        }
        
        // Load default doc display
        loadHardwareDoc('display');
    }

    // ── UNDUH KODE PYTHON ──
    window.downloadPythonCode = function () {
        const editor = document.getElementById('python-code-editor');
        if (!editor) return;
        const code = editor.value;
        const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `microbit_program.py`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToastNotification('Program Python diunduh!');
    };

})();
