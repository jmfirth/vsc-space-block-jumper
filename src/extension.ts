"use strict";

import * as readline from "readline";
import * as vscode from "vscode";

function nextPosition(document: vscode.TextDocument, position: vscode.Position, up: boolean = false): number {
    const step = up ? -1 : 1;
    const boundary = up ? 0 : document.lineCount - 1;
    if (position.line === boundary) return position.line;
    return afterBlock(document, step, boundary, position.line);
}

function afterBlock(document: vscode.TextDocument, step: number, boundary: number, index: number, startedBlock: boolean = false): number {
    const line = document.lineAt(index);
    return index === boundary || startedBlock && line.isEmptyOrWhitespace
        ? index
        : afterBlock(document, step, boundary, index + step, startedBlock || !line.isEmptyOrWhitespace);
}

function updateSelection(selection: vscode.Selection, next: number, anchor?: vscode.Position) {
        const active = selection.active.with(next, 0);
        return new vscode.Selection(anchor || active, active);
}

function jump(up: boolean = false, select: boolean = false) {
    const editor = vscode.window.activeTextEditor;
    const newSelections = []
    for (let index = 0; index < editor.selections.length; index++) {
        const selection = editor.selections[index];
        const anchor = select ? selection.anchor : undefined
        const updated = updateSelection(editor, nextPosition(editor.document, selection.active, up), anchor);
        newSelections.push(updated);
    }
    editor.selections = newSelections;
    const s0 = editor.selection;
    editor.revealRange(new vscode.Range(s0.active, s0.active));
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.moveUp", () => {
        jump(true, false);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.moveDown", () => {
        jump(false, false);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.selectUp", () => {
        jump(true, true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("spaceBlockJumper.selectDown", () => {
        jump(false, true);
    }));
}

export function deactivate() { }
