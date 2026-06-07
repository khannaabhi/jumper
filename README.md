# Breakpoint Jumper for VS Code

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/your-publisher-placeholder.jumper.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-publisher-placeholder.jumper)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-publisher-placeholder.jumper.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-publisher-placeholder.jumper)
[![License](https://img.shields.io/github/license/khannaabhi/jumper.svg?style=flat-square)](https://github.com/khannaabhi/jumper/blob/main/LICENSE)

Streamline your debugging flow in Visual Studio Code. **Breakpoint Jumper** allows you to navigate effortlessly between your active debug breakpoints in a file with simple, fast keyboard shortcuts and intuitive editor menu buttons. 

No more scrolling up and down searching for that next breakpoint—just jump straight to it.

---

## Features

- **Bidirectional Navigation**: Jump instantly to the next or previous breakpoint in your active document.
- **Looping Navigation**: Jumps wrap around automatically (jumping next from the last breakpoint brings you to the first, and vice versa).
- **Editor Title Buttons**: Integrates clean Up/Down buttons in the editor title bar for quick mouse navigation.
- **Cross-Platform Compatibility**: Fully tested and optimized to work seamlessly on **macOS**, **Windows**, and **Linux** (handling path casing differences natively).

---

## Keyboard Shortcuts

Breakpoint Jumper works out of the box with these standard, easy-to-use keybindings:

| Action | Windows & Linux | macOS |
| :--- | :--- | :--- |
| **Jump to Next Breakpoint** | `Alt + F9` | `Option + F9` (or `fn + Option + F9`) |
| **Jump to Previous Breakpoint** | `Shift + Alt + F9` | `Shift + Option + F9` (or `fn + Shift + Option + F9`) |

*Note: You can easily customize these hotkeys in VS Code's Keyboard Shortcuts editor by searching for `jumper.jumpToNextBreakpoint` and `jumper.jumpToPrevBreakpoint`.*

---

## Editor Menu Controls

If you prefer mouse navigation, use the dedicated buttons added to your editor title bar:

* Look for the **Up Arrow** (`$(arrow-up)`) and **Down Arrow** (`$(arrow-down)`) icons in the top-right corner of your active editor window.
* Hovering over them reveals **Jump to Previous Breakpoint** and **Jump to Next Breakpoint**.

---

## Requirements & Settings

- **Requirements**: None! The extension relies entirely on the native VS Code Debug API.
- **Settings**: No configuration required. It works automatically out of the box.

---

## Known Issues

- The extension only jumps between **source code breakpoints** (lines of code with red dots). Breakpoints set in virtual documents or unsupported debug targets may not be resolved.
- If there are no breakpoints in the active file, a friendly notification will be shown.

---

## Release Notes

See the [CHANGELOG.md](CHANGELOG.md) for full release history.

### 1.0.0
- Production-ready release.
- Added platform-specific path comparisons for reliable Windows & macOS support.
- Streamlined repository footprint and removed template boilerplate files.
- Added clean editor title toolbar buttons.

---

## License

This project is licensed under the [MIT License](LICENSE).
