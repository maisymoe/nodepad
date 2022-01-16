import { FlexLayout, QMainWindow, QWidget, QPlainTextEdit } from "@nodegui/nodegui";
import menuBar from "./lib/menu";
import exposeWindowObject from "./lib/exposeWindowObject";

export const mainWindow = new QMainWindow();
mainWindow.setWindowTitle("nodepad");

const mainWidget = new QWidget();
mainWidget.setLayout(new FlexLayout());
mainWidget.setObjectName("app-root");
mainWindow.setCentralWidget(mainWidget);

export const editor = new QPlainTextEdit();
editor.setObjectName("editor")
mainWidget.layout?.addWidget(editor);

mainWindow.setStyleSheet(`
    #app-root {
        flex-direction: 'row';
        height: '100%';
        width: '100%';
    }

    #editor {
        width: '100%';
        height: '100%';
    }
`);

mainWindow.setMenuBar(menuBar());
exposeWindowObject();
mainWindow.show();