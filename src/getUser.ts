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

const rank2int: IDictionary<number> = { 'I': 4, 'II': 3, 'III': 2, 'IV': 1 }
const tier2int: IDictionary<number> = { 'IRON': 1, 'BRONZE': 2, 'SILVER': 3, 'GOLD': 4, 'PLATINUM': 5, 'DIAMOND': 6, 'MASTER': 7, 'GRANDMASTER': 8, 'CHALLENGER': 9 }
const tier2emoji: IDictionary<string> = { 'IRON': '922473813533417503', 'BRONZE': '922473813583745074', 'SILVER': '922473813608910908', 'GOLD': '922473813516615701', 'PLATINUM': '922473813747322880', 'DIAMOND': ':922473813537611817', 'MASTER': '922474278136475678', 'GRANDMASTER': '922473813827014706', 'CHALLENGER': '922473813550174209' }

export default async function getUser(users: string[]) {
    const ranking: IUser[] = []
    for (const user of users) {
        const { id } = await (await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(user)}?api_key=${api_key}`)).json()
        let profiles = await (await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`)).json()

        let points: number = 0
        let tier: string = 'Unranked'
        for (const profile of profiles) {
            if (profile.queueType === 'RANKED_SOLO_5x5') {
                points = +profile.leaguePoints + (rank2int[profile.rank] * 1000) + (tier2int[profile.tier] * 10000)
                tier = `<:${profile.tier.toLowerCase()}:${tier2emoji[profile.tier]}> ${profile.tier} ${profile.rank} ${profile.leaguePoints}`
                break
            }
        }
        ranking.push({ name: user, value: points, tier: tier})
    }
    ranking.sort((a: IUser, b: IUser): number => b.value - a.value)
    return ranking
}