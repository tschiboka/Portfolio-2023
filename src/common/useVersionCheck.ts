import { useEffect, useRef, useState } from 'react'
import { MINUTE_IN_MILLIS } from './dateTime'

export const useVersionCheck = () => {
    const [isStale, setIsStale] = useState(false)
    const initialVersion = useRef<string | null>(null)

    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch('/version.json', { cache: 'no-store' })
                if (!res.ok) return

                const data = await res.json()
                const sha = data.sha

                if (!sha || !/^[a-f0-9]{40}$/i.test(sha)) return

                if (!initialVersion.current) {
                    initialVersion.current = sha
                    console.log('✅ App is up to date.')
                    console.log('📌 Version:', sha)
                    console.log('📝 Message:', data.message)
                    console.log('📅 Date:', data.date)
                    return
                }

                if (sha !== initialVersion.current) {
                    console.warn('🔄 New version available!')
                    console.log('❌ Current version:', initialVersion.current)
                    console.log('📌 Version:', sha)
                    console.log('📝 Message:', data.message)
                    console.log('📅 Date:', data.date)
                    console.info('Please refresh the page to update.')
                    setIsStale(true)
                }
            } catch (error) {
                console.error('Error checking app version:', error)
            }
        }

        check()
        const id = setInterval(check, MINUTE_IN_MILLIS * 10)
        return () => clearInterval(id)
    }, [])

    return { isStale }
}
