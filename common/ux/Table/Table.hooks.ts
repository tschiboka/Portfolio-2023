import { useEffect, useState } from 'react'
import type { TableBreakpoint } from './Table.types'
import { Const } from '@common/ux/Const'
import { isEmpty } from '@common/utils'

export const useHiddenBreakpoints = (breakpoints: TableBreakpoint[]) => {
    const isHidden = (bp: TableBreakpoint) => window.innerWidth < Const.Breakpoint[bp]
    const getHidden = () => new Set(breakpoints.filter(isHidden))
    const [hidden, setHidden] = useState(getHidden())

    useEffect(() => {
        if (isEmpty(breakpoints)) return

        const mediaQueries = breakpoints.map((bp) =>
            window.matchMedia(`(min-width: ${Const.Breakpoint[bp]}px)`),
        )

        const update = () => setHidden(getHidden())
        mediaQueries.forEach((mediaQuery) => mediaQuery.addEventListener('change', update))
        return () =>
            mediaQueries.forEach((mediaQuery) => mediaQuery.removeEventListener('change', update))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // columns are static — listeners set up once on mount

    return Array.from(hidden)
}
