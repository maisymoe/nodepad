import { QMessageBox, QPushButton, ButtonRole, QFont } from "@nodegui/nodegui";
import { VM, Value, asString, falseValue, wrapFunc, asInteger } from "cumlisp";
import { editor } from "../..";

export function installNodepad(vm: VM): void {
    vm.install({
        "set-editor-content": wrapFunc("set-editor-content", 1, async (args: Value[]): Promise<Value> => {
            const res1 = asString(args[0]);
            editor.setPlainText(`${res1}`);

            return falseValue;
        }),
        "get-editor-content": wrapFunc("get-editor-content", 0, async (): Promise<Value> => {
            if (editor.toPlainText()) {
                return editor.toPlainText();
            }

            return falseValue;
        }),
        "set-editor-font": wrapFunc("set-editor-font", 2, async (args: Value[]): Promise<Value> => {
            const res1 = asString(args[0]);
            const res2 = asInteger(args[1]);
            editor.setFont(new QFont(res1, res2));

            return falseValue;
        }),
        "create-dialog": wrapFunc("create-dialog", 1, async (args: Value[]): Promise<Value> => {
            const res1 = asString(args[0]);

            const messageBox = new QMessageBox();
            const accept = new QPushButton();
            accept.setText("Accept");
            messageBox.addButton(accept, ButtonRole.AcceptRole);
            messageBox.setText(res1);
            messageBox.setWindowTitle("LISP plugin dialog");
            messageBox.exec();

            return falseValue;
        }),
    });
}