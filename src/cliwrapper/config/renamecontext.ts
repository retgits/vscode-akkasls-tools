'use strict'

import * as wrapper from '../wrapper';

export async function fromCLI() {
    let command = new wrapper.Command('config rename-context')
    command.addArgument({name: 'context', description: 'new name of the current context'})
    await command.runCommand()
}

export async function fromUI() {
    let command = new wrapper.Command('config rename-context')
    command.addArgument({name: 'context', description: 'new name of the current context'})
    await command.runCommand()
}