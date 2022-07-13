const vscode = require("vscode");

async function getSelectedUri_() {
    const originalClipboard = await vscode.env.clipboard.readText();

    await vscode.commands.executeCommand("copyFilePath");
    const folder = await vscode.env.clipboard.readText();

    await vscode.env.clipboard.writeText(originalClipboard);
    // make it a Uri
    return await vscode.Uri.file(folder);
}

module.exports = getSelectedUri_;
