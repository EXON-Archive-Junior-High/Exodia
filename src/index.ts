import { Client, Intents } from 'discord.js'

export const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', async () => console.log('[*] Ready'))

client.on('message', async (msg) => {
    if (msg.content === 'ㅎㅇ') msg.channel.send('d')
})

client.login(process.env.Token)
