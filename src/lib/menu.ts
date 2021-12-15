import { QMenuBar, QMenu, QAction, QFontDialog, FileMode } from "@nodegui/nodegui";
import { readFileSync, writeFileSync } from "fs";
import callFileDialog from "./callFileDialog";
import { editor } from "..";

// TODO: Temporary system - improve with better support for other menu item types

const fileItems = [
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

const editItems = [
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

export default function() {
    const menuBar = new QMenuBar();
    const fileMenu = new QMenu();
    const editMenu = new QMenu();

    for (const item of fileItems) {
        const action = new QAction();
        action.setText(item.title);
        action.addEventListener("triggered", item.exec);
        fileMenu.addAction(action);
    }

    for (const item of editItems) {
        const action = new QAction();
        action.setText(item.title);
        action.addEventListener("triggered", item.exec);
        editMenu.addAction(action);
    }

    fileMenu.setTitle("File");
    editMenu.setTitle("Edit");
    menuBar.addMenu(fileMenu);
    menuBar.addMenu(editMenu);

    return menuBar;
}