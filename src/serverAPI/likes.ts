import { getURL } from './getURL'
import {
    GetLikeByPathQuery,
    GetLikeResponse,
    GetLikeSummaryResponse,
    LikeSummary,
    PostLikeResponse,
} from '@common/types'

export const getLikes = async (
    path: GetLikeByPathQuery['path'],
    callback: (likes: number) => void,
) => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }

    try {
        const response = await fetch(`${getURL()}/like?path=${path}`, options)
        const responseJSON = (await response.json()) as GetLikeResponse
        if (responseJSON.success) {
            callback(responseJSON.likes)
        }
    } catch (err) {
        console.log('Error While Getting Like Data!', err)
    }
}

export const getLikeSummary = async (callback: (likes: LikeSummary) => void) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await fetch(`${getURL()}/like`, options)
        const responseJSON = (await response.json()) as GetLikeSummaryResponse

        if (responseJSON.success) {
            callback(responseJSON.likes)
        } else console.log('Error While Getting Like Data!', response)
    } catch (err) {
        console.log('Error While Getting Like Data!', err)
    }
}

export const postLike = async (path: string, callback: () => void) => {
    //const URLLocal = "http://localhost:5000/like";
    const URLLive = 'https://portfolio-2023-nf5z.onrender.com/like'
    const URL = URLLive
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: path }),
    }

    try {
        const response = await fetch(`${URL}`, options)
        const responseJSON = (await response.json()) as PostLikeResponse
        if (responseJSON.success) callback()
    } catch (err) {
        console.log('Error While Getting Like Data!', err)
    }
}
