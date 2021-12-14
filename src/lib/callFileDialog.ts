import { QFileDialog, FileMode } from "@nodegui/nodegui";

export default function(fileMode: FileMode) {
    const fileDialog = new QFileDialog();

    fileDialog.setFileMode(fileMode);
    fileDialog.setNameFilter("Text Files (*.txt), All Files (*.*)");
    fileDialog.exec();

    return fileDialog.selectedFiles();
}