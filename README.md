# Visual Studio Code Akka Serverless Tools 

Manage the stateful serverless applications you build on [Akka Serverless](https://akkaserverless.com), without leaving your favorite IDE!

With this VS Code extension you don't have to remember all the flags to deploy services, add docker credentials, remove that one hostname from your service because you can do it all through VS Code.

## Key features

### Insight into your projects

From the projects explorer you can see all the projects that you have access to and you can drill into services, members, and container registry credentials. You can find the ones you need to edit, you can add new ones, or even remove entries you no longer need with a few clicks rather than typing commands. Invite developers to your project? just click... Deploy a service to Akka Serverless? just click... Add a new HTTP route to your service? just click!

### Easier deployments

Through the extension you can deploy services to Akka Serverless, following the same type of wizard as in the [Akka Serverless Console](https://console.akkaserverless.com). From the same plugin, you can also get the logs of your service and tail them as you try out your service.

**What's new in this version?**  See the [change log](CHANGELOG.md) to find out!

## Getting started with the extension

### Install

[Download the latest available release](https://github.com/lightbend-labs/vscode-akkasls-tools/releases)

### Dependencies

The Akka Serverless extension may need to invoke the following command line tools, depending on which features you use. You will need `akkasls` at minimum, and `docker` if you plan to use the extension to build applications rather than only browse.

## Commands and features

`vscode-akkasls-tools` supports a number of commands for interacting with Akka Serverless; these are accessible via the command menu (`Ctrl+Shift+P`) and may be bound to keys in the normal way.

### General commands

* `Log in`: Open the Akka Serverless Console to log in and authenticate the CLI
* `Open console`: Open the Akka Serverless Console in a browser window
* `Open docs`: Open the Akka Serverless documentation in a browser window
* `Open forum`: Open the Akka Serverless forum in a browser window
* `Open ideas portal`: Open the Akka Serverless ideas portal in a browser window
* `Open status page`: Open the Akka Serverless status page in a browser window
* `Generate new Javascript service (npx) - experimental`: Generate a new Javascript based service using npx
* `Generate new Javascript service (npm) - experimental`: Generate a new Javascript based service using npm
* `Generate new Java service (Maven) - experimental`: Generate a new Java based service using Maven

### Projects

* `Refresh`: Refresh the project explorer
* `Show details`: Show the details of the current selected item
* `Logs`: Show the logs of a service based on selected parameters
* `Create a new project`: Create a new project
* `Deploy service`: Deploy a new service
* `Delete service`: Delete an existing service
* `Expose service`: Expose an existing service to the Internet
* `Unexpose service`: Remove a hostname from a service
* `Add registry credentials`: Add new credentials for a container registry
* `Delete registry credentials`: Remove credentials for a container registry
* `Invite user`: Invite a new user to your project
* `Delete invitation`: Delete a previously sent invitation

### Accounts & Tokens

* `Refresh`: Refresh the account explorer
* `Show details`: Show the details of the authentication token
* `Revoke`: Revoke a selected authentication token
* `Create a new token`: Create a new authentication token

### Status

* `Refresh`: Refresh the status explorer
* `Get info`: Open the Akka Serverless status page in your browser

### Tools

* `Refresh`: Refresh the tools explorer
* `Get info`: Open the info page for a tool in a browser window

## Extension Settings

* `akkaserverless.dryrun`: Whether commands will be printed in the logs rather than execute them
* `akkaserverless.logOutput`: Whether the result of the akkasls command is shown in the logs
* `akkaserverless.configFile`: Location of the config file to use (default ~/.akkaserverless/config.yaml)
* `akkaserverless.context`: The context to use
* `akkaserverless.enableExperimentalFeatures`: Whether experimental features should be enabled

## Release notes

See the [change log](CHANGELOG.md).
