import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppProvider, Session, Version } from '@shared-context'
import { router } from './routes'
import './main.styles.scss'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <Session.Provider>
                <AppProvider>
                    <Version.Provider>
                        <RouterProvider router={router} />
                    </Version.Provider>
                </AppProvider>
            </Session.Provider>
        </QueryClientProvider>
    </StrictMode>,
)
