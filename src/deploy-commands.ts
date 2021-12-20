const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('../settings.json')

const commands = [
	new SlashCommandBuilder().setName('랭킹').setDescription('엑조디아의 멤버들의 랭킹을 확인합니다.')
]
	.map(command => command.toJSON())

const rest = new REST({ version: '9' }).setToken(token)

export default function deploy_commands(): void {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error)
}
