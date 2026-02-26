import { useEffect, useRef, useState } from 'react'
import { GetVersionResponse } from '../../common/types'
import { MINUTE_IN_MILLIS } from './dateTime'

export const useVersionCheck = () => {
    const [isStale, setIsStale] = useState(false)
    const initialVersion = useRef<string | null>(null)

    useEffect(() => {
        const checkVersion = async () => {
            const res = await fetch('/version.json', { cache: 'no-store' })
            if (!res.ok) return

            const { sha, message, date } = await (res.json() as Promise<GetVersionResponse>)

            if (!sha || !/^[a-f0-9]{40}$/i.test(sha)) return

            if (!initialVersion.current) {
                initialVersion.current = sha
                console.log('✅ App is up to date.')
                console.log('📌 Version:', sha)
                console.log('📝 Message:', message)
                console.log('📅 Date:', date)
                return
            }

            if (sha !== initialVersion.current) {
                console.warn('🔄 New version available!')
                console.log('❌ Current version:', initialVersion.current)
                console.log('📌 Version:', sha)
                console.log('📝 Message:', message)
                console.log('📅 Date:', date)
                console.info('Please refresh the page to update.')
                setIsStale(true)
            }
        }

        checkVersion().catch((error: unknown) =>
            console.error('Error checking app version:', error),
        )
        const id = setInterval(() => {
            checkVersion().catch((error: unknown) =>
                console.error('Error checking app version:', error),
            )
        }, MINUTE_IN_MILLIS * 10)
        return () => clearInterval(id)
    }, [])

    return { isStale }
}
