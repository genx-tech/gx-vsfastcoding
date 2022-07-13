const vscode = require("vscode");
const getSelectedUri_ = require("./lib/getSelectedUri_");
const isDir = require("./lib/isDir");
const { glob, fs } = require("@genx/sys");
const { eachAsync_, text } = require('@genx/july');
const path = require("path");

async function changeExtName_(uri) {
    if (!uri) {
        uri = await getSelectedUri_();
    }

    if (!isDir(uri.path)) {
        vscode.window.showWarningMessage("Please select a folder to operate from the explorer.");
        return;
    }

    let from = await vscode.window.showInputBox({ title: 'Select from what extension name, e.g. .js' });

    if (!from) {
        vscode.window.showWarningMessage("Invalid \"from\" extension name.");
        return;
    }

    let to = await vscode.window.showInputBox({ title: 'Change to what extension name, e.g. .mjs' });

    if (!to) {
        vscode.window.showWarningMessage("Invalid \"to\" extension name.");
        return;
    }

    from = text.ensureStartsWith(from, '.');
    to = text.ensureStartsWith(to, '.');

    const files = await glob(`**/*${from}`, {
        cwd: uri.path,
    });

    await eachAsync_(files, async (file) => {
        const lastDot = file.lastIndexOf(".");
        const baseName = file.substring(0, lastDot);

        const srcPath = path.join(uri.path, file);
        const destPath = path.join(uri.path, baseName + to);

        await fs.rename(srcPath, destPath);
    });

    vscode.window.showInformationMessage('Done.');
}

module.exports = changeExtName_;
