// @ts-nocheck — skill example, outside the tsconfig include.

import { useState } from 'react'
import type { ReactNode } from 'react'
import { FeatureContext } from './Feature.context'
import type { FeatureContextValues } from './Feature.types'

type FeatureProviderProps = {
    children: ReactNode
}

// Holds the state and the effects, and wraps the feature root. The component
// never reaches the context directly — it reads it through the `Use` that
// `ContextBuilder` returns.
export const FeatureProvider = ({ children }: FeatureProviderProps) => {
    const [step, setStep] = useState<number>(0)

    const value: FeatureContextValues = {
        step,
        isLoading: false,
        setStep,
    }

    return <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>
}
