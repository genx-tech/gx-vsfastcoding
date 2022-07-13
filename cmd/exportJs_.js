const vscode = require("vscode");
const getSelectedUri_ = require("./lib/getSelectedUri_");
const isDir = require("./lib/isDir");
const { glob, fs } = require("@genx/sys");
const { naming } = require('@genx/july');
const path = require("path");

async function exportJs_(uri) {
    if (!uri) {
        uri = await getSelectedUri_();
    }

    if (!isDir(uri.path)) {
        vscode.window.showWarningMessage("Please select a folder to operate from the explorer.");
        return;
    }

    const indexFile = path.join(uri.path, "index.js");

    if (await fs.pathExists(indexFile)) {
        vscode.window.showErrorMessage(
            'Generation aborted. The selected folder has already contained an "index.js".'
        );
        return;
    }

    const files = await glob("*.{js,jsx}", {
        cwd: uri.path,
    });

    const lines = files.map((file) => {
        const lastDot = file.lastIndexOf(".");
        const baseName = file.substring(0, lastDot);

        let exportedName;

        if (baseName[0] === baseName[0].toUpperCase()) {
            exportedName = naming.pascalCase(baseName);
        } else {
            exportedName = naming.camelCase(baseName);
        }

        return `export { default as ${exportedName} } from '${baseName}';`;
    });

    await fs.writeFile(indexFile, lines.join("\n") + "\n");

    vscode.window.showInformationMessage(`Generated ${indexFile}`);
}

module.exports = exportJs_;
