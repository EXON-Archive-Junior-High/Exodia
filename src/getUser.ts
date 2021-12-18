import fetch from 'node-fetch'

interface IDictionary<TValue> {
    [id: string]: TValue;
}

interface IUser {
    name: string,
    value: number,
    tier: string
}

const { api_key } = require('../settings.json')

const rank2int: IDictionary<number> = {'I': 303, 'II': 202, 'III': 101, 'IV': 0}
const tier2int: IDictionary<number> = {'IRON': 0, 'BRONZE': 1000, 'SILVER': 2000, 'GOLD': 3000, 'PLATINUM': 4000, 'DIAMOND': 5000, 'MASTER': 6000, 'GRANDMASTER': 7000, 'CHALLENGER': 8000}

export default async function getUser(users: string[]) {
    const ranking: IUser[] = []
    for (const user of users) {
        const { id } = await (await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(user)}?api_key=${api_key}`)).json()
        let profiles = await (await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)).json()

        let points = 0
        let tier = '배치 안봄'
        if (profiles.length) {
            for (const profile of profiles) {
                if (profile.queueType === 'RANKED_SOLO_5x5') {
                    points = ~profile.leaguePoints + rank2int[profile.rank] + tier2int[profile.tier]
                    tier = `${profile.tier} ${profile.rank} ${profile.leaguePoints}`
                    break
                }
            }
        }
        ranking.push({ name: user, value: points, tier: tier})
    }
    ranking.sort((a: IUser, b: IUser): number => b.value - a.value)
    return ranking
}