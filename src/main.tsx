import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppProvider, Session } from '@shared-context'
import { VersionChecker } from '@shared-components/VersionChecker'
import { router } from './routes'
import './main.styles.scss'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <Session.Provider>
                <AppProvider>
                    <VersionChecker />
                    <RouterProvider router={router} />
                </AppProvider>
            </Session.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)
