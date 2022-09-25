// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { _ } = require("@genx/july");
const exportJs_ = require("./cmd/exportJs_");
const objectToJSON_ = require("./cmd/objectToJSON_");
const changeExtName_ = require("./cmd/changeExtName_");
const codeToString_ = require("./cmd/codeToString_");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const cmdMap = {
    "genx-vs-helper.exportJs": exportJs_,
    "genx-vs-helper.changeExtName": changeExtName_,
	"genx-vs-helper.objectToJSON": objectToJSON_,
    "genx-vs-helper.codeToString": codeToString_,
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    _.each(cmdMap, (fn, cmdName) => context.subscriptions.push(vscode.commands.registerCommand(cmdName, fn)));
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
