import fetch from 'node-fetch'

interface IDictionary<TValue> {
    [id: string]: TValue;
}

//const get = async (url: string) => await (await fetch(url)).json()
const rank2int: IDictionary<number> = {'I': 303, 'II': 202, 'III': 101, 'IV': 0}
const tier2int: IDictionary<number> = {'IRON': 0, 'BRONZE': 1000, 'SILVER': 2000, 'GOLD': 3000, 'PLATINUM': 4000, 'DIAMOND': 5000, 'MASTER': 6000, 'GRANDMASTER': 7000, 'CHALLENGER': 8000}

export default async function getUser(users: string[]) {
    for (const user of users) {
        const { id } = await (await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(user)}?api_key=${process.env.api_key}`)).json()
        let profiles = await (await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.api_key}`)).json()

        let point = 0
        if (profiles.length) point = ~profiles[0].leaguePoints + rank2int[profiles[0].rank] + tier2int[profiles[0].tier]
        console.log(user, point)
    }
}