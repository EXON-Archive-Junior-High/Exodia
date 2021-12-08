import path from 'path'
import { Client, Intents } from 'discord.js'
import { readJSONSync } from 'fs-extra'

const PATH = path.resolve()
const { bot_token : token } = readJSONSync(PATH + '/settings.json')
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', async () => console.log('[*] Ready'))

client.on('message', async (msg) => {
    if (msg.content === 'ㅎㅇ') msg.channel.send('d')
})

client.login(token)
