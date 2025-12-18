const XLSX = require('xlsx');
const fs = require('fs-extra');
const path = require('path');

// ---------------- CONFIG ----------------
const EXCEL_FILE = 'Setpoints.xlsx';
const TEMPLATE_FILE = 'template.xml';
const OUTPUT_DIR = 'output';

// ---------------------------------------
fs.ensureDirSync(OUTPUT_DIR);

// Load Excel
const workbook = XLSX.readFile(EXCEL_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

// Load template once
const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

rows.forEach((row, index) => {
    const bindName = row.BindName;
    const modeLabel = row.ModeLabel;

    if (!bindName || !modeLabel) {
        console.warn(`Row ${index + 2} skipped (missing data)`);
        return;
    }

    let output = template;

    // Replace Bind Name (ALL occurrences)
    output = output.replace(/RmTmpClgSpt/g, bindName);

    // Replace Label text
    output = output.replace(/>COOLING</g, `>${modeLabel}<`);

    const fileName = `zone_${index + 1}.xml`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), output);
});

console.log(`Generated ${rows.length} TGML components.`);
