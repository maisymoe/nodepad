import { mainWindow, editor } from "..";
import * as nodegui from "@nodegui/nodegui";

export default () => {
    (global as any).nodepad = {
        window: mainWindow,
        editor: editor,
        internal: nodegui,
    };
};