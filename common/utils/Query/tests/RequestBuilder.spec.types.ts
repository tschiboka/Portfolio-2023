import type { AxiosRequestConfig } from 'axios'
import type { MockInstance } from 'vitest'

/** An axios method stubbed by `vi.spyOn`, recording its `(url, config)` arguments. */
export type AxiosMethodMock = MockInstance<(url: string, config?: AxiosRequestConfig) => unknown>
