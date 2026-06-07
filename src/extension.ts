// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * Compares two VS Code URIs to check if they point to the same file.
 * Handles file path normalization for file URIs.
 */
export function areUrisEqual(uri1: vscode.Uri | undefined, uri2: vscode.Uri | undefined): boolean {
	if (!uri1 || !uri2) {
		return uri1 === uri2;
	}

	if (uri1.scheme !== uri2.scheme) {
		return false;
	}

	if (uri1.scheme === 'file') {
		const isCaseInsensitiveFs = process.platform === 'win32' || process.platform === 'darwin';
		const normalizeFsPath = (fsPath: string): string => {
			let normalized = fsPath.replace(/\\/g, '/');
			while (normalized.endsWith('/') && normalized.length > 1) {
				normalized = normalized.slice(0, -1);
			}
			return isCaseInsensitiveFs ? normalized.toLowerCase() : normalized;
		};

		const path1 = normalizeFsPath(uri1.fsPath);
		const path2 = normalizeFsPath(uri2.fsPath);

		return path1 === path2;
	}

	return uri1.toString() === uri2.toString();
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "jumper" is now active!');

	const nextDisposable = vscode.commands.registerCommand('jumper.jumpToNextBreakpoint', () => {
		jumpToBreakpoint('next');
	});

	const prevDisposable = vscode.commands.registerCommand('jumper.jumpToPrevBreakpoint', () => {
		jumpToBreakpoint('prev');
	});

	context.subscriptions.push(nextDisposable, prevDisposable);
}

function jumpToBreakpoint(direction: 'next' | 'prev') {
	const activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	const document = activeEditor.document;

	// Filter breakpoints to source breakpoints matching the current file
	const fileBreakpoints = vscode.debug.breakpoints.filter(
		(bp): bp is vscode.SourceBreakpoint => {
			if (bp instanceof vscode.SourceBreakpoint) {
				return !!bp.location?.uri && areUrisEqual(bp.location.uri, document.uri);
			}
			const candidate = bp as any;
			return candidate &&
				typeof candidate === 'object' &&
				candidate.location &&
				candidate.location.uri &&
				areUrisEqual(candidate.location.uri, document.uri);
		}
	);

	if (fileBreakpoints.length === 0) {
		vscode.window.showInformationMessage('No breakpoints found in this file.');
		return;
	}

	// Extract, sort, and deduplicate line numbers (0-indexed)
	const lines = fileBreakpoints
		.map(bp => bp.location?.range?.start?.line)
		.filter((line): line is number => typeof line === 'number')
		.sort((a, b) => a - b);
	const uniqueLines = Array.from(new Set(lines));

	if (uniqueLines.length === 0) {
		vscode.window.showInformationMessage('No valid breakpoints found in this file.');
		return;
	}

	const currentLine = activeEditor.selection.active.line;
	let targetLine: number;

	if (direction === 'next') {
		const next = uniqueLines.find(line => line > currentLine);
		targetLine = next !== undefined ? next : uniqueLines[0];
	} else {
		const prev = uniqueLines.slice().reverse().find(line => line < currentLine);
		targetLine = prev !== undefined ? prev : uniqueLines[uniqueLines.length - 1];
	}

	// Move the cursor to the target line
	const position = new vscode.Position(targetLine, 0);
	activeEditor.selection = new vscode.Selection(position, position);

	// Reveal target line in center
	activeEditor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenterIfOutsideViewport);
}

// This method is called when your extension is deactivated
export function deactivate() {}

