const vscode = require("vscode");
const { text } = require('@genx/july');
const path = require("path");

async function objectToJSON_() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage("No open text editor.");
        return; // No open text editor
    }

    const selection = editor.selection;
    let selectedCode = editor.document.getText(selection);

    if (!selectedCode) {
        vscode.window.showWarningMessage("No selected code.");
        return;        
    }

    selectedCode = text.dropIfEndsWith(selectedCode, ',');

    let converted;

    try {
        let obj;
        eval(`obj = ${selectedCode}`);

        converted = JSON.stringify(obj, null, 4);
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
        return;
    }

    await editor.edit(builder => {
        builder.replace(selection, converted);
    });
}

module.exports = objectToJSON_;