import { useCallback, useEffect, useRef, useState } from 'react'
import { DateTime, Functions } from '@common-utils'
import type { Nullable } from '@common-utils'
import type { GetVersionResponse } from '../../types'

const useVersionCheck = () => {
    const [isStale, setIsStale] = useState(false)
    const [build, setBuild] = useState<Nullable<GetVersionResponse>>(null)
    const [checkedAt, setCheckedAt] = useState<Nullable<string>>(null)
    const initialVersion = useRef<Nullable<string>>(null)
    const hasStarted = useRef(false)

    const checkVersion = useCallback(async () => {
        const res = await fetch('/version.json', { cache: 'no-store' })
        if (!res.ok) return

        const payload = await (res.json() as Promise<GetVersionResponse>)
        const { sha, message, date } = payload

        if (!sha || !/^[a-f0-9]{40}$/i.test(sha)) return

        const checked = DateTime.Format.toIso(new Date())
        const checkedLabel = DateTime.Format.to('DisplayTimeStamp', checked) ?? checked
        const dateLabel = DateTime.Format.to('DisplayTimeStamp', date) ?? date

        setBuild(payload)
        setCheckedAt(checked)
        console.log('🕒 Last version check ran at:', checkedLabel)

        if (!initialVersion.current) {
            initialVersion.current = sha
            console.log('✅ App is up to date.')
            console.log('📌 Version:', sha)
            console.log('📝 Message:', message)
            console.log('📅 Date:', dateLabel)
            return
        }

        if (sha !== initialVersion.current) {
            console.warn('🔄 New version available!')
            console.log('❌ Current version:', initialVersion.current)
            console.log('📌 Version:', sha)
            console.log('📝 Message:', message)
            console.log('📅 Date:', dateLabel)
            console.info('Please refresh the page to update.')
            setIsStale(true)
        }
    }, [])

    useEffect(() => {
        // A failed poll is not worth a console error — the badge simply has no build to show.
        const poll = () => void checkVersion().catch(Functions.noop)

        // StrictMode mounts twice in development; the first check already ran, so do not repeat it.
        if (!hasStarted.current) {
            hasStarted.current = true
            poll()
        }

        const id = setInterval(poll, DateTime.Units.Ms.fromMin(10))
        return () => clearInterval(id)
    }, [checkVersion])

    return { isStale, build, checkedAt, refresh: checkVersion }
}

export const VersionHooks = { useVersionCheck }
