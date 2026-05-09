import { Accessor } from '../Accessor/Accessor'

export class LoadingIndicatorAccessor extends Accessor {
    get Get() {
        return { ...super.Get, isLoading: () => true as const }
    }
}

export const LoadingIndicator = Object.assign(
    (label = 'Loading'): LoadingIndicatorAccessor => {
        const element = Accessor.screen.getByRole('progressbar', { name: label })
        return new LoadingIndicatorAccessor(element, `LoadingIndicator('${label}')`)
    },
    {
        Has: {
            isLoading: (label = 'Loading') =>
                Accessor.screen.queryByRole('progressbar', { name: label }) !== null,
        },
    },
)
