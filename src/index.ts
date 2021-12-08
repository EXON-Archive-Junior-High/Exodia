import path from 'path'
import { readJSONSync } from 'fs-extra'
import { Client, Intents } from 'discord.js'

import getUser from './getUser'

const PATH = path.resolve()

const { users }: any = readJSONSync(PATH + '/settings.json')
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', async () => {
    console.log('[*] Ready')
    client.user?.setActivity('\"!랭킹\" 를 입력하세요', { type: 'LISTENING' })
    getUser(users)
})

client.on('message', async (msg) => {
    if (msg.content === '!랭킹') {
        // console.log(users)
        // getUser(users)
        msg.channel.send('d')
    }
})

client.login(process.env.Token)
