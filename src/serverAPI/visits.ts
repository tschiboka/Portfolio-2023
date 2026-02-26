import { getURL } from './getURL'
import {
    GetVisitByPathQuery,
    GetVisitResponse,
    GetVisitSummaryResponse,
    PostVisitResponse,
    VisitSummary,
} from '@common/types'

export const getVisits = async (
    path: GetVisitByPathQuery['path'],
    callback: (visits: number) => void,
) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await fetch(`${getURL()}/visit?path=${path}`, options)
        const responseJSON = (await response.json()) as GetVisitResponse
        if (responseJSON.success) callback(responseJSON.visits)
    } catch (err) {
        console.log('Error While Sending Message!', err)
    }
}

export const getVisitSummary = async (callback: (visits: VisitSummary) => void) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await fetch(`${getURL()}/visit`, options)
        const responseJSON = (await response.json()) as GetVisitSummaryResponse
        if (responseJSON.success) callback(responseJSON.visits)
    } catch (err) {
        console.log('Error While Getting Visits Data!', err)
    }
}

export const postVisit = async (path: string) => {
    // Skip Posting Localhost Visits
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') return

    const URLLive = 'https://portfolio-2023-nf5z.onrender.com/visit'
    const URL = URLLive
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: path }),
    }

    try {
        const response = await fetch(URL, options)
        const responseJSON = (await response.json()) as PostVisitResponse
        if (responseJSON.success) console.log('Visit Recorded')
    } catch (err) {
        console.log('Error While Sending Message!', err)
    }
}
