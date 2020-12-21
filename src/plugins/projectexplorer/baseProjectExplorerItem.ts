import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export abstract class BaseProjectExplorerItem extends TreeItem {
    public readonly type: string;
    public readonly parentProjectID: string;

    constructor(label: string, collapsibleState: TreeItemCollapsibleState, type: string, parentProjectID?: string) {
        super(label, collapsibleState);
        this.type = type;
        this.parentProjectID = (parentProjectID) ? parentProjectID : 'none';
    }

    abstract printDetails(): void;
}