import { QMainWindow, QWidget, QPlainTextEdit, QFileDialog, QMenuBar, QAction, QMenu, FileMode, FlexLayout } from "@nodegui/nodegui";
import menuBar from "./lib/menu";

// Create the main window
const mainWindow = new QMainWindow();
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
        font-size: 14px;
        height: '100%';
        width: '100%';
    }
`);

mainWindow.setMenuBar(menuBar());
mainWindow.show();