import { ContextBuilder } from '../index'
import type { TestContext } from './Context.spec.types'

const initial: TestContext = { name: 'default', count: 0 }

const { Provider, Use } = ContextBuilder.CreateContext<TestContext>('Test', initial)

const Consumer = () => {
    const context = Use()
    return (
        <div>
            <span data-testid="name">{context.name}</span>
            <span data-testid="count">{context.count}</span>
        </div>
    )
}

export const ContextTestUtils = { Provider, Consumer }
