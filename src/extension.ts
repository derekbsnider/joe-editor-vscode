import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const insertFileCommand = vscode.commands.registerCommand('extension.insertFileAtCursor', async () => {
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

  const moveBlockCommand = vscode.commands.registerCommand('extension.moveBlockHere', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (selection.isEmpty) {
      vscode.window.showInformationMessage('No block selected.');
      return;
    }

    // First, delete the selected text
    await editor.edit(editBuilder => {
      editBuilder.delete(selection);
    });

    // Then insert at new position
    const newPosition = editor.selection.active;
    await editor.edit(editBuilder => {
      editBuilder.insert(newPosition, selectedText);
    });
  });

  context.subscriptions.push(insertFileCommand);
  context.subscriptions.push(moveBlockCommand);
}

export function deactivate() {}
