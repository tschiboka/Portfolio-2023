import { render } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { Icon } from '..'
import type { IconName, IconProps } from '..'

const Set = {
    icon: (props: Partial<IconProps> & { name: IconName } = { name: 'chart' }) => {
        render(<Icon {...props} />)
        return Test.Icon(props.name)
    },
}

export const IconTestUtils = { Set }
