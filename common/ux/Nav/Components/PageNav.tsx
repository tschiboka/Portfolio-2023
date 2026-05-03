import { useState } from 'react'
import { PortfolioNav } from './PortfolioNav'
import { ApiNav } from './ApiNav'
import { SubmenuState, PageVariant } from '../Nav.types'
import SubmenuPanel from '../Submenu/SubmenuPanel'

type PageNavProps = {
    variant: PageVariant
    pageName: string
}

export const PageNav = ({ variant, pageName }: PageNavProps) => {
    const [submenuStack, setSubmenuStack] = useState<SubmenuState[]>([])

    if (variant === 'portfolio') return <PortfolioNav pageName={pageName} />

    return (
        <>
            <ApiNav
                pageName={pageName}
                submenuStack={submenuStack}
                setSubmenuStack={setSubmenuStack}
            />
            {Boolean(submenuStack.length) && (
                <SubmenuPanel
                    key={submenuStack[0].parentLabel}
                    submenu={submenuStack[0]}
                    submenuStack={submenuStack}
                    setSubmenuStack={setSubmenuStack}
                    pageName={pageName}
                />
            )}
        </>
    )
}
