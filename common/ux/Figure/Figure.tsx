import type { CSSProperties } from 'react'
import type { FigureProps, FigureSource } from './Figure.types'
import { Caption } from '../Typography'
import './Figure.styles.css'

const buildMedia = (source: FigureSource): string | undefined => {
    const { minWidth, maxWidth } = source
    const conditions: string[] = []
    if (minWidth) conditions.push(`(min-width: ${minWidth})`)
    if (maxWidth) conditions.push(`(max-width: ${maxWidth})`)
    return conditions.join(' and ') || undefined
}

export const Figure = ({
    src,
    alt,
    caption,
    size = 'full',
    sources,
    onZoom,
    ariaLabel,
    className,
    style,
    bgColor,
}: FigureProps) => {
    const cls = `figure figure--${size}${onZoom ? ' figure--zoomable' : ''}${className ? ` ${className}` : ''}`

    const image = sources ? (
        <picture>
            {sources.map((source) => (
                <source
                    key={source.src}
                    srcSet={source.src}
                    media={buildMedia(source)}
                    type={source.type}
                />
            ))}
            <img src={src} alt={alt} />
        </picture>
    ) : (
        <img src={src} alt={alt} />
    )

    const wrapperStyle: CSSProperties | undefined = bgColor
        ? { backgroundColor: bgColor }
        : undefined

    return (
        <figure className={cls} aria-label={ariaLabel} style={style} onClick={onZoom}>
            <div className="figure__image-wrapper" style={wrapperStyle}>
                {image}
            </div>
            {caption && (
                <Caption as="figcaption" className="figure__caption">
                    {caption}
                </Caption>
            )}
        </figure>
    )
}
