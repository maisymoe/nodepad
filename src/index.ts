import { QMainWindow, QWidget, QPlainTextEdit, FlexLayout } from "@nodegui/nodegui";
import menuBar from "./lib/menu";

export const mainWindow = new QMainWindow();
mainWindow.setWindowTitle("nodepad");

const mainWidget = new QWidget();
mainWidget.setObjectName("app-root");
mainWindow.setCentralWidget(mainWidget);

const rootLayout = new FlexLayout();
mainWidget.setLayout(rootLayout);

export const editor = new QPlainTextEdit();
editor.setObjectName("editor")
rootLayout.addWidget(editor);

mainWindow.setStyleSheet(`
    #editor {
        height: '100%';
        width: '100%';
    }
`);

mainWindow.setMenuBar(menuBar());
mainWindow.show();