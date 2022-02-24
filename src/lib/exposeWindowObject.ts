import { mainWindow, editor } from "..";
import * as nodegui from "@nodegui/nodegui";
import { VM, runPlugin } from "./VM";

export default () => {
    (global as any).nodepad = {
        window: mainWindow,
        plugins: {
            runPlugin: runPlugin,
        },
        editor: editor,
        internal: nodegui,
    };
};