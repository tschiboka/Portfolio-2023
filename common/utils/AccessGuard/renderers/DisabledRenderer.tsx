import { ReactNode } from 'react'
import './Renderers.styles.css'

type DisabledRendererProps = {
    children: ReactNode
    reason?: string
}

export const DisabledRenderer = ({ children, reason }: DisabledRendererProps) => (
    <div aria-disabled="true" title={reason} className="access-guard-disabled">
        {children}
    </div>
)
