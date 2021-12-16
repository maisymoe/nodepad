import { QMenuBar, QMenu, QAction, QFontDialog, FileMode } from "@nodegui/nodegui";
import { readFileSync, writeFileSync } from "fs";
import callFileDialog from "./callFileDialog";
import { editor } from "..";

// TODO: Add support for submenus
// TODO: Why am I trying to implement a React-like system?

const menuItems = [
    {
        title: "File",
        items: [
            {
                title: "Open",
                exec: () => {
                    const selectedFiles = callFileDialog(FileMode.ExistingFile);
                    if (selectedFiles.length > 0) { editor.setPlainText(readFileSync(selectedFiles[0], "utf-8")); }
                },
            },
            {
                title: "Save As",
                exec: () => {
                    const selectedFiles = callFileDialog(FileMode.AnyFile);
                    if (selectedFiles.length > 0) { writeFileSync(selectedFiles[0], editor.toPlainText(), "utf-8"); }
                },
            },
        ]
    },
    {
        title: "Edit",
        items: [
            {
                title: "Font",
                exec: () => {
                    const fontDialog = new QFontDialog();
                    fontDialog.exec();
        
                    const font = fontDialog.currentFont();
                    if (font) {
                        editor.setFont(font);
                    };
                },
            },
        ]
    }
];

export default function() {
    const menuBar = new QMenuBar();

    for (const item of menuItems) {
        const menu = new QMenu();
        menu.setTitle(item.title);

        for (const subItem of item.items) {
            const action = new QAction();
            action.setText(subItem.title);
            action.addEventListener("triggered", subItem.exec);
            menu.addAction(action);
        }

        menuBar.addMenu(menu);
    }

    return menuBar;
}