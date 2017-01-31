'use strict';
import * as readline from 'readline';
import * as vscode from 'vscode';

function findNextPosition(document: vscode.TextDocument, position: vscode.Position, up: boolean = false) {
  const step = up ? -1 : 1;
  const boundary = up ? 0 : document.lineCount - 1;

  let inBlock = false;
  let throughBlock = false;
  let index = position.line + step;
  while (!throughBlock) {
    const line = document.lineAt(index);
    inBlock = inBlock || !line.isEmptyOrWhitespace;
    throughBlock = inBlock && line.isEmptyOrWhitespace;
    if (throughBlock || index === boundary) return index;
    index += step;
  }
  return position.line;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.moveUp", () => {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    if (position.line === 0) return;
    const next = findNextPosition(editor.document, position, true);
    const newPosition = position.with(next, 0);
    editor.selection = new vscode.Selection(newPosition, newPosition);
    editor.revealRange(new vscode.Range(newPosition, newPosition));
  }));

  context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.moveDown", () => {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    if (position.line === editor.document.lineCount - 1) return;
    const next = findNextPosition(editor.document, position, false);
    const newPosition = position.with(next, 0);
    editor.selection = new vscode.Selection(newPosition, newPosition);
    editor.revealRange(new vscode.Range(newPosition, newPosition));
  }));

  context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.selectUp", () => {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    if (position.line === 0) return;
    const next = findNextPosition(editor.document, position, true);
    const newPosition = position.with(next, 0);
    editor.selection = new vscode.Selection(
      editor.selection.active.line === editor.selection.end.line ? editor.selection.start : editor.selection.end,
      newPosition
    );
    editor.revealRange(new vscode.Range(newPosition, newPosition));
  }));

  context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.selectDown", () => {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    if (position.line === editor.document.lineCount - 1) return;
    const next = findNextPosition(editor.document, position, false);
    const newPosition = position.with(next, 0);
    editor.selection = new vscode.Selection(
      editor.selection.active.line === editor.selection.end.line ? editor.selection.start : editor.selection.end,
      newPosition
    );
    editor.revealRange(new vscode.Range(newPosition, newPosition));
  }));
}

export function deactivate() {}