import path from 'path'
import { readJSONSync } from 'fs-extra'
import { Client, Intents } from 'discord.js'

import getUser from './getUser'

const PATH = path.resolve()

const { users }: any = readJSONSync(PATH + '/settings.json')
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', async () => {
    console.log('[*] Ready')
    client.user?.setActivity('\"!랭킹\" 를 입력하세요', { type: 'LISTENING' })
    getUser(users)
})

client.once('messageCreate', async (msg) => {
    if (msg.content === '!랭킹') {
        const ranking = getUser(users)
        console.log(ranking)
        msg.channel.send('d')
    }
})

client.login(process.env.Token)
