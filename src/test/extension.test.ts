import * as assert from 'assert';
import * as vscode from 'vscode';
import { areUrisEqual } from '../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('areUrisEqual - Identical URIs', () => {
		const uri1 = vscode.Uri.file('/path/to/file.ts');
		const uri2 = vscode.Uri.file('/path/to/file.ts');
		assert.strictEqual(areUrisEqual(uri1, uri2), true);
	});

	test('areUrisEqual - Different schemes', () => {
		const uri1 = vscode.Uri.file('/path/to/file.ts');
		const uri2 = vscode.Uri.parse('git://authority/path/to/file.ts');
		assert.strictEqual(areUrisEqual(uri1, uri2), false);
	});

	test('areUrisEqual - Different files', () => {
		const uri1 = vscode.Uri.file('/path/to/file1.ts');
		const uri2 = vscode.Uri.file('/path/to/file2.ts');
		assert.strictEqual(areUrisEqual(uri1, uri2), false);
	});

	test('areUrisEqual - Casing check based on OS', () => {
		const uri1 = vscode.Uri.file('/path/to/File.ts');
		const uri2 = vscode.Uri.file('/path/to/file.ts');
		if (process.platform === 'win32' || process.platform === 'darwin') {
			assert.strictEqual(areUrisEqual(uri1, uri2), true, 'Casing should match on case-insensitive OS (Windows/macOS)');
		} else {
			assert.strictEqual(areUrisEqual(uri1, uri2), false, 'Casing should not match on case-sensitive OS (Linux)');
		}
	});

	test('areUrisEqual - Undefined handling', () => {
		const uri = vscode.Uri.file('/path/to/file.ts');
		assert.strictEqual(areUrisEqual(undefined, undefined), true);
		assert.strictEqual(areUrisEqual(uri, undefined), false);
		assert.strictEqual(areUrisEqual(undefined, uri), false);
	});

	test('areUrisEqual - Path normalization with trailing slashes', () => {
		const uri1 = vscode.Uri.file('/path/to/dir/');
		const uri2 = vscode.Uri.file('/path/to/dir');
		assert.strictEqual(areUrisEqual(uri1, uri2), true);
	});
});

