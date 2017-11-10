# Space Block Jumper

Space Block Jumper is a [Visual Studio Code](https://code.visualstudio.com/) extension that helps you navigate through space-delimited blocks of text.

![Demo](./demo.gif?raw=true "Demo")

## Features

* `spaceBlockJumper.moveUp`: Move up a space block (often `ctrl+up`)
* `spaceBlockJumper.moveDown`: Move down a space block (often `ctrl+down`)
* `spaceBlockJumper.selectUp`: Select up a space block (often `shift+ctrl+up`)
* `spaceBlockJumper.selectDown`: Select down a space block (often `shift+ctrl+down`)


## Getting started

This plugin will be automatically enabled after [installing](https://marketplace.visualstudio.com/items?itemName=jmfirth.vsc-space-block-jumper) it and reloading.

### Keyboard shortcuts

Changes to your key bindings can be made using the **Keyboard Shortcuts** editor by **Preferences** > **Keyboard Shortcuts**.  Open the **keybindings.json** user preferences document to edit your bindings using the below for reference. 

```
// Place your key bindings in this file to overwrite the defaults
[
    { "key": "ctrl+up",               "command": "spaceBlockJumper.moveUp",
        "when": "editorTextFocus" },
    { "key": "ctrl+down",             "command": "spaceBlockJumper.moveDown",
        "when": "editorTextFocus" },
    { "key": "shift+ctrl+up",         "command": "spaceBlockJumper.selectUp",
        "when": "editorTextFocus" },
    { "key": "shift+ctrl+down",       "command": "spaceBlockJumper.selectDown",
        "when": "editorTextFocus" }
]
```


## Known Issues

None at this time.

## Release Notes

### 1.2.0

Code cleanup

### 1.1.0

Minor

### 1.0.0

Initial release
