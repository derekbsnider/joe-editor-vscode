import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.insertFileAtCursor', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active editor.');
      return;
    }

    const fileUris = await vscode.window.showOpenDialog({
      canSelectMany: false,
      openLabel: 'Insert File at Cursor'
    });

    if (!fileUris || fileUris.length === 0) {
      return; // No file selected
    }

    const filePath = fileUris[0].fsPath;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        vscode.window.showErrorMessage(`Failed to read file: ${err.message}`);
        return;
      }

      editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, data);
      });
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
