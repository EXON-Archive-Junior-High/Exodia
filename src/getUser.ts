import fetch from 'node-fetch'
import { readJSONSync } from 'fs-extra'

const get = async (url: string) => await (await fetch(url)).json()

