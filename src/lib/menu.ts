import { FileMode, ButtonRole, QMenuBar, QMenu, QAction, QFontDialog, QMessageBox, QPushButton, QInputDialog, QFont } from "@nodegui/nodegui";
import { readFileSync, writeFileSync } from "fs";
import callFileDialog from "./callFileDialog";
import { editor } from "..";
import inspector from "node:inspector";
import { runPlugin } from "./VM";

// TODO: Add support for submenus

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
            {
                title: "Inspect",
                exec: () => {
                    const messageBox = new QMessageBox();
                    const accept = new QPushButton();
                    accept.setText("Accept");
                    messageBox.addButton(accept, ButtonRole.AcceptRole);
                    messageBox.setWindowTitle("Debugger");

                    if (!inspector.url()) {
                        inspector.open();
                        messageBox.setText(`Debugger listening on\n${inspector.url()}\nFor help, see https://nodejs.org/en/docs/inspector`);
                        messageBox.exec();
                    } else {
                        inspector.close();
                        messageBox.setText("Debugger closed");
                        messageBox.exec();
                    }
                },
            },
            {
                title: "Evaluate plugin code",
                exec: async() => {
                    const dialog = new QInputDialog();
                    dialog.setWindowTitle("LISP formatter");
                    dialog.setLabelText("Enter plugin code (in LISP)");
                    dialog.exec();

                    const runResult = await runPlugin(dialog.textValue());
                    if (runResult?.error) {
                        const messageBox = new QMessageBox();
                        const evaluate = new QPushButton();
                        evaluate.setText("Evaluate");
                        messageBox.addButton(evaluate, ButtonRole.AcceptRole);
                        messageBox.setText(runResult.text);
                        messageBox.setWindowTitle("LISP formatter message");
                        messageBox.exec();
                    }
                }
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
    },
];

export default () => {
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