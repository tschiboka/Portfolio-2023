import { AccessibleProps } from '../../index.types'

export type SpacerSize =
    | '2'
    | '4'
    | '8'
    | '12'
    | '16'
    | '20'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64'
export type SpacerAxis = 'vertical' | 'horizontal'

export type SpacerProps = Pick<AccessibleProps, 'ariaLabel'> & {
    size: SpacerSize
    axis?: SpacerAxis
}
