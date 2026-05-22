import type { SpacerProps } from './Spacer.types'

/** Explicit spacing primitive for non-Stack contexts. Prefer Stack gap where possible. */
export const Spacer = ({ size, axis = 'vertical', ariaLabel }: SpacerProps) => (
    <div
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        style={{
            width: axis === 'horizontal' ? `${size}px` : undefined,
            height: axis === 'vertical' ? `${size}px` : undefined,
            flexShrink: 0,
        }}
    />
)
