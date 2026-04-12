import { ReactNode } from 'react'
import './Renderers.styles.css'

type TooltipRendererProps = {
    children: ReactNode
    text: string
}

export const TooltipRenderer = ({ children, text }: TooltipRendererProps) => (
    <div aria-disabled="true" title={text} className="access-guard-tooltip">
        <div className="access-guard-tooltip__content">{children}</div>
    </div>
)
