const vscode = require("vscode");
const { text } = require('@genx/july');

async function codeToJSON_() {
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

    const converted = selectedCode.split(',').map(p => text.quote(p.trim())).join(',')

    await editor.edit(builder => {
        builder.replace(selection, converted);
    });
}

module.exports = codeToJSON_;