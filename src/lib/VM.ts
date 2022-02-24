import { QMessageBox } from "@nodegui/nodegui";
import { VM as CVM, run, libBasic } from "cumlisp";
import { installNodepad } from "./formatter/lib-nodepad";

interface PluginRunResult {
    error: boolean;
    text: string;
}

// This file serves as a wrapper to minimize the used API of the formatter.

export class VM extends CVM {
    public constructor() {
        super();
        libBasic.installBasic(this);
        installNodepad(this);
    }
}

export async function runPlugin(code: string): Promise<PluginRunResult | null> {
    // try {
    //     run(args[0], new VM());   
    // } catch(e) {
    //     console.error(`Error running plugin: ${args}`, e);
    //     const messageBox = new QMessageBox();
    //     messageBox.setDetailedText(`There was a problem while running a plugin: ${args}\n${e}`)
    // }

    let text: string;
    try {
        text = await run(code, new VM());
    } catch (ex) {
        return {
            error: true,
            text: `LISP formatter error: \`${ex}\` (was the code correct?)`,
        };
    }

    if (text != "")
        return {
            error: false,
            text,
    };

    return null;
}