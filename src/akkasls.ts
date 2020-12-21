import { login, logout, currentLogin, listAuthTokens, revokeAuthToken, addDockerCredentials, deleteDockerCredentials, listDockerCredentials, listProjects, newProject, deleteInvite, addInvite, listInvites, listMembers, deployService, exposeService, listServices, undeployService, unexposeService, CurrentLogin, Token, Credential, Project, Invite, Member, Service, ShellResult } from '@retgits/akkasls-nodewrapper';
import { ASLocal } from './plugins/local/plugin';
import { DOCKER_ITEM_TYPE } from './plugins/projectexplorer/dockerCredentialItem';
import { SERVICE_ITEM_TYPE } from './plugins/projectexplorer/serviceItem';
import { window, workspace } from 'vscode';
import { projectPicker } from './plugins/wizards/projectPicker';
import { inputBox } from './plugins/wizards/inputBox';
import { dockerCredentialsPicker } from './plugins/wizards/dockerCredentialsPicker';
import { servicePicker } from './plugins/wizards/servicePicker';
import { invitePicker } from './plugins/wizards/invitePicker';
import { tokenPicker } from './plugins/wizards/tokenPicker';
import { ProjectExplorer } from './plugins/projectexplorer/projectExplorer';
import { ConfigExplorer } from './plugins/configexplorer/configExplorer';
import { logger } from './utils/logger';

export class AkkaServerless {
    private _projectExplorer: ProjectExplorer;
    private _configExplorer: ConfigExplorer;

    // TODO: Add the CommandInput as exported type on akkasls-nodewrapper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _getCommandInput(): any {
        return {
            dryrun: workspace.getConfiguration('akkaserverless').get<boolean>('dryrun'),
            silent: workspace.getConfiguration('akkaserverless').get<boolean>('logOutput'),
            configFile: workspace.getConfiguration('akkaserverless').get<string>('configFile'),
            context: workspace.getConfiguration('akkaserverless').get<string>('context')
        };
    }

    registerProjectExplorer(pe: ProjectExplorer): void {
        this._projectExplorer = pe;
    }

    registerConfigExplorer(ce: ConfigExplorer): void {
        this._configExplorer = ce;
    }

    async login(): Promise<void> {
        const result = await login(this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
    }

    async logout(): Promise<void> {
        const result = await logout(this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
    }

    async getCurrentLogin(): Promise<CurrentLogin> {
        const res = await currentLogin(this._getCommandInput());
        return res.response as CurrentLogin;
    }

    async listAuthTokens(): Promise<Token[]> {
        const res = await listAuthTokens(this._getCommandInput());
        return res.response as Token[];
    }

    async revokeAuthToken(tokenID: string): Promise<ShellResult> {
        const result = await revokeAuthToken(tokenID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._configExplorer.refresh();
        return result;
    }

    async addDockerCredentials(projectID: string, credentials: string): Promise<ShellResult> {
        const result = await addDockerCredentials(projectID, credentials, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async deleteDockerCredentials(projectID: string, credentialID: string): Promise<void> {
        if (credentialID === DOCKER_ITEM_TYPE) {
            return;
        }

        const result = await deleteDockerCredentials(projectID, credentialID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
    }

    async listDockerCredentials(projectID: string): Promise<Credential[]> {
        const res = await listDockerCredentials(projectID, this._getCommandInput());
        return res.response as Credential[];
    }

    async createNewProject(name: string, description: string): Promise<ShellResult> {
        const result = await newProject(name, description, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async listProjects(): Promise<Project[]> {
        const res = await listProjects(this._getCommandInput());
        return res.response as Project[];
    }

    async deleteInvite(projectID: string, emailAddress: string): Promise<ShellResult> {
        const result = await deleteInvite(projectID, emailAddress, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async addInvite(projectID: string, emailAddress: string): Promise<ShellResult> {
        const result = await addInvite(projectID, emailAddress, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async listInvites(projectID: string): Promise<Invite[]> {
        const res = await listInvites(projectID, this._getCommandInput());
        return res.response as Invite[];
    }

    async listMembers(projectID: string): Promise<Member[]> {
        const res = await listMembers(projectID, this._getCommandInput());
        return res.response as Member[];
    }

    async deployService(service: string, image: string, projectID: string): Promise<ShellResult> {
        const result = await deployService(service, image, projectID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async exposeService(service: string, flags: string, projectID: string): Promise<ShellResult> {
        const result = await exposeService(service, flags, projectID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        return result;
    }

    async listServices(projectID: string): Promise<Service[]> {
        const res = await listServices(projectID, this._getCommandInput());
        return res.response as Service[];
    }

    async undeployService(service: string, projectID: string): Promise<ShellResult> {
        const result = await undeployService(service, projectID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        this._projectExplorer.refresh();
        return result;
    }

    async unexposeService(service: string, hostname: string, projectID: string): Promise<ShellResult> {
        const result = await unexposeService(service, hostname, projectID, this._getCommandInput());
        if (result.code !== 0) {
            window.showErrorMessage(result.stderr);
        }
        return result;
    }

    async startLocalProxy(configfile: string): Promise<void> {
        // TODO: Update this
        const asLocal = new ASLocal(configfile);
        asLocal.startLocalProxy('');
    }

    async stopLocalProxy(configfile: string): Promise<void> {
        // TODO: Update this
        const asLocal = new ASLocal(configfile);
        asLocal.stopLocalProxy('');
    }

    async addDockerCredentialsWizard(projectID?: string): Promise<void> {
        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to add credentials to...', await this.listProjects());
                const credentials = await inputBox('--docker-server <> --docker-username <>> --docker-password <>', 'enter your credential string...');
                this.addDockerCredentials(projectID, credentials);
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
            }
        }
    }

    async deleteDockerCredentialsWizard(projectID?: string, credentialID?: string): Promise<void> {
        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to remove credentials from...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        if (!credentialID) {
            try {
                credentialID = await dockerCredentialsPicker(await this.listDockerCredentials(projectID));
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        this.deleteDockerCredentials(projectID, credentialID);
    }

    async deployServiceWizard(projectID?: string): Promise<void> {
        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to deploy your service to...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        try {
            const service = await inputBox('', 'type your service name...');
            const image = await inputBox('', 'type your docker image url...');
            this.deployService(service, image, projectID);
        } catch (e) {
            window.showErrorMessage(e);
            logger.error(e);
            return;
        }
    }

    async undeployServiceWizard(projectID?: string, service?: string): Promise<void> {
        if (service === SERVICE_ITEM_TYPE) {
            return;
        }

        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to undeploy your service from...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        if (!service) {
            try {
                service = await servicePicker('pick the service to undeploy...', await this.listServices(projectID));
                this.undeployService(service, projectID);
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
            }

        }
    }

    async exposeServiceWizard(projectID?: string, service?: string): Promise<void> {
        if (service === SERVICE_ITEM_TYPE) {
            return;
        }

        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to expose your service from...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        if (!service) {
            try {
                service = await servicePicker('pick the service to expose...', await this.listServices(projectID));
                const flags = await inputBox('--enable-cors', 'type any additional flags you might want...');
                this.exposeService(service, flags, projectID);
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
            }

        }
    }

    async unexposeServiceWizard(projectID?: string, service?: string): Promise<void> {
        if (service === SERVICE_ITEM_TYPE) {
            return;
        }

        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to unexpose your service from...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        if (!service) {
            try {
                service = await servicePicker('pick the service to unexpose...', await this.listServices(projectID));
                const hostname = await inputBox('', 'type the hostname you want to remove...');
                this.unexposeService(service, hostname, projectID);
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
            }

        }
    }

    async inviteUserWizard(projectID?: string): Promise<void> {
        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to invite a new person to...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        try {
            const emailAddress = await inputBox('', 'type the email address of the person you want to invite...');
            this.addInvite(projectID, emailAddress);
        } catch (e) {
            window.showErrorMessage(e);
            logger.error(e);
            return;
        }
    }

    async deleteInviteWizard(projectID?: string, emailAddress?: string): Promise<void> {
        if (!projectID) {
            try {
                projectID = await projectPicker('pick a project to invite a new person to...', await this.listProjects());
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        if (!emailAddress) {
            try {
                emailAddress = await invitePicker('pick the email address to uninvite...', await this.listInvites(projectID));
            } catch (e) {
                window.showErrorMessage(e);
                logger.error(e);
                return;
            }
        }

        this.deleteInvite(projectID, emailAddress);
    }

    async newProjectWizard(): Promise<void> {
        try {
            const name = await inputBox('', 'type the name of the project you want to create...');
            const description = await inputBox('', 'type the description of the project you want to create...');
            this.createNewProject(name, description);
        } catch (e) {
            window.showErrorMessage(e);
            logger.error(e);
        }
    }

    async revokeAuthTokenWizard(): Promise<void> {
        try {
            const tokenID = await tokenPicker('pick the token you want to revoke...', await this.listAuthTokens());
            this.revokeAuthToken(tokenID);
        } catch (e) {
            window.showErrorMessage(e);
            logger.error(e);
        }
    }
}