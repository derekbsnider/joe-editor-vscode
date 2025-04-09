# Joe Editor Emulation for VSCode

This VSCode extension emulates the keybindings and syntax highlighting style of [Joe's Own Editor (JOE)](https://joe-editor.sourceforge.net/).

## ✨ Features

- JOE-style keybindings including multi-key chords like `Ctrl+K C`, `Ctrl+K X`, etc.
- Syntax highlighting theme "Joe Classic" that mimics JOE’s default color scheme.
- Custom command `Insert File at Cursor` mapped to `Ctrl+K R`.

## 🧰 Keybindings

| Keybinding         | Action                            |
|--------------------|-----------------------------------|
| `Ctrl+U`           | Page up                           |
| `Ctrl+V`           | Page down                         |
| `Ctrl+A`           | Start of line                     |
| `Ctrl+E`           | End of line                       |
| `Ctrl+Z`           | Previous word                     |
| `Ctrl+X`           | Next word                         |
| `Ctrl+G`           | Go to matching bracket            |
| `Ctrl+Y`           | Delete line                       |
| `Ctrl+D`           | Delete character                  |
| `Ctrl+W`           | Delete next word                  |
| `Ctrl+O`           | Delete previous word              |
| `Ctrl+K U`         | Top of file                       |
| `Ctrl+K V`         | Bottom of file                    |
| `Ctrl+K B`         | Mark block start                  |
| `Ctrl+K K`         | Mark block end                    |
| `Ctrl+K C`         | Copy block                        |
| `Ctrl+K M`         | Move (cut) block                  |
| `Ctrl+K Y`         | Delete (yank out) block           |
| `Ctrl+K L`         | Go to line                        |
| `Ctrl+K F`         | Find                              |
| `Ctrl+K S`         | Save                              |
| `Ctrl+K R`         | Insert file at cursor             |
| `Ctrl+L`           | Find next                         |
| `Ctrl+_`           | Undo                              |
| `Ctrl+^`           | Redo                              |
| `Ctrl+Shift+V`     | Paste                             |

> Note: Default `Ctrl+V` for paste is remapped to `Ctrl+Shift+V` to match Joe's paging behavior.

## 🎨 Joe Classic Theme

Mimics JOE's default syntax colors:

- `#include` → Blue
- `<header.h>` / escapes → Light Cyan
- Strings / Numbers / Constants → Light Blue
- Keywords → White
- Plain Text → Light Gray
- Comments → Green
- Braces `{}` → Magenta

## 📦 Build and Install

```bash
npm install
npx tsc
vsce package
```

Then install the generated `.vsix` in VSCode:

1. Open Command Palette → `Extensions: Install from VSIX`
2. Select the generated `.vsix` file

## 📁 Repository

[https://github.com/derekbsnider/joe-editor-vscode](https://github.com/dderekbsnider/joe-editor-vscode)

## 🪪 License

MIT — see [LICENSE.md](LICENSE.md)
