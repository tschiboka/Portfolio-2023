// @ts-nocheck — skill example, outside the tsconfig include.

type ComponentFooProps = {
    prop1: string
}

export const ComponentFoo = ({ prop1 }: ComponentFooProps) => (
    <component aria-label="aria-label" role="role">
        {prop1}
    </component>
)
