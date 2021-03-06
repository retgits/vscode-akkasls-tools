// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { isExperimentalEnabled } from '../../experimental';
import { getCurrentCommandConfig } from '../cli/commands';
import { logger } from '../../logger';
import { dirSync } from 'tmp';
import * as path from 'path';

// Internal dependencies
import { generateMavenJava } from '../cli/entities';
import { shell } from '../../shell';

export async function maven() {
    if (!isExperimentalEnabled()) {
        vscode.window.showErrorMessage('In order to use this feature, you\'ll need to enable the experimental features flag');
        return;
    }

    const artifactID = await vscode.window.showInputBox({
        prompt: 'The artifactID of your new service',
        ignoreFocusOut: true,
        password: false,
    });

    if (artifactID === undefined) {
        return;
    }

    const groupID = await vscode.window.showInputBox({
        prompt: 'The groupID of your new service',
        ignoreFocusOut: true,
        password: false,
    });

    if (groupID === undefined) {
        return;
    }

    const packageName = await vscode.window.showInputBox({
        prompt: 'The package name of your new service',
        ignoreFocusOut: true,
        password: false,
    });

    if (packageName === undefined) {
        return;
    }

    const version = await vscode.window.showInputBox({
        prompt: 'The version of your new service',
        ignoreFocusOut: true,
        password: false,
    });

    if (version === undefined) {
        return;
    }

    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Select',
        canSelectFiles: false,
        canSelectFolders: true,
        title: 'Select folder to save project to'
    };

    const folder = await vscode.window.showOpenDialog(options);

    if (folder === undefined) {
        return;
    }

    const tempFolder = dirSync();
    const outputFile = path.join(tempFolder.name, 'svc.zip');

    try {
        const result = await generateMavenJava(outputFile, artifactID, groupID, packageName, version, getCurrentCommandConfig());
        logger.log(result!.stdout);
        logger.log(result!.stderr);
        if (shell.isUnix()) {
            await shell.exec(`unzip ${outputFile} -d ${folder[0].fsPath}`);
        }
        if (shell.isWindows()) {
            await shell.exec(`powershell Expand-Archive -Path ${outputFile} -DestinationPath ${folder[0].fsPath}`);
        }
        tempFolder.removeCallback();
        return result;
    } catch (ex) {
        vscode.window.showErrorMessage(ex);
        return;
    }
}