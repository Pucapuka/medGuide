const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/medicamentos.json');

function readAll() {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeAll(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readAll, writeAll };