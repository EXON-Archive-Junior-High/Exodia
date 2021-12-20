import { Client, Intents, MessageEmbed } from 'discord.js'

import getUser from './getUser'

const { users, token } = require('../settings.json')
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', async () => {
    console.log('[*] Ready')
    client.user?.setActivity('\"/랭킹\" 를 입력하세요', { type: 'LISTENING' })
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const { commandName } = interaction

	if (commandName === '랭킹') {
        await interaction.reply({ embeds: [new MessageEmbed({
            title: '불러오는 중',
            description: '조금만 기다려주세요.',
            color: 'RED'
        })] })
        const ranking = getUser(users)
        const embed = new MessageEmbed({
            title: '엑조디아 랭킹',
            color: 'PURPLE',
            description: '엑조디아 멤버들',
            timestamp: new Date(),
	        footer: { text: 'Exodia' },
        })
        let i: number = 1
        for (const user of await ranking) {
            embed.addField(`${i}등 ${user.name}`, user.tier)
            i++
        }
		await interaction.editReply({ embeds: [embed] })
	}
})

client.login(token)
