import * as vscode from 'vscode';
import * as fs from 'fs';

let blockStart: vscode.Position | null = null;
let blockEnd:   vscode.Position | null = null;

function showBlock()
{
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    if ( blockStart && blockEnd )
    {
      editor.selection = new vscode.Selection(blockStart, blockEnd);
      editor.revealRange(new vscode.Range(blockStart, blockEnd));
    }
}

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

    if (!fileUris || fileUris.length === 0) return;

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

  const markBlockStart = vscode.commands.registerCommand('extension.markBlockStart', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Not in editor.');
      return;
    }
    blockStart = editor.selection.active;
    showBlock();
    vscode.window.setStatusBarMessage('Block start marked.', 2000);
  });

  const markBlockEnd = vscode.commands.registerCommand('extension.markBlockEnd', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('Not in editor.');
      return;
    }
    blockEnd = editor.selection.active;
    showBlock();
    vscode.window.setStatusBarMessage('Block end marked.', 2000);
  });

  const clearBlockAnchor = vscode.commands.registerCommand('extension.clearBlockAnchor', () => {
    blockStart = null;
    blockEnd = null;
    vscode.window.setStatusBarMessage('Block anchor cleared.', 2000);
  });

  const moveBlockCommand = vscode.commands.registerCommand('extension.moveBlockHere', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !blockStart || !blockEnd) {
      vscode.window.showInformationMessage('No block marked.');
      return;
    }

    const blockRange = new vscode.Range(blockStart, blockEnd);
    const text = editor.document.getText(blockRange);

    await editor.edit(editBuilder => {
      editBuilder.delete(blockRange);
    });

    await editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, text);
    });

    blockStart = null;
    blockEnd = null;
    vscode.window.setStatusBarMessage('Block moved to cursor.', 2000);
  });

  const copyBlockCommand = vscode.commands.registerCommand('extension.copyBlockHere', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !blockStart || !blockEnd) {
      vscode.window.showInformationMessage('No block marked.');
      return;
    }

    const blockRange = new vscode.Range(blockStart, blockEnd);
    const text = editor.document.getText(blockRange);
    await editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, text);
    });
    await vscode.env.clipboard.writeText(text);
    vscode.window.setStatusBarMessage('Block copied.', 2000);
  });

  context.subscriptions.push(
    insertFileCommand,
    markBlockStart,
    markBlockEnd,
    clearBlockAnchor,
    moveBlockCommand,
    copyBlockCommand
  );
}

export function deactivate() {}
