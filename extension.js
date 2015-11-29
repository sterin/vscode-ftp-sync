// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

global.STATUS_TIMEOUT = 3000;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
	
	var initCommand = vscode.commands.registerCommand('extension.ftpsyncinit', require('./modules/init-command'));
	var syncCommand = vscode.commands.registerCommand('extension.ftpsyncupload', function() { require('./modules/sync-command')(true) });
	var downloadCommand = vscode.commands.registerCommand('extension.ftpsyncdownload', function() { require('./modules/sync-command')(false) });
	var commitCommand = vscode.commands.registerCommand('extension.ftpsynccommit', function() { require('./modules/commit-command')() });
	
	
	vscode.workspace.onDidSaveTextDocument(require('./modules/on-save'));
	
	process.on('uncaughtExcepion', function (err) { vscode.window.showErrorMessage("Ftp-sync: unexpected error: " + err) });
	
	context.subscriptions.push(initCommand);
	context.subscriptions.push(syncCommand);
	context.subscriptions.push(downloadCommand);
	context.subscriptions.push(commitCommand);
}

exports.activate = activate;