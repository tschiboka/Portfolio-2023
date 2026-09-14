import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { router } from './router'
import './main.styles.scss'
import { AppContextProvider, Session } from '@shared-context'
import { VersionChecker } from '@shared-components/VersionChecker/VersionChecker'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <Session.Provider>
                <AppContextProvider>
                    <VersionChecker />
                    <RouterProvider router={router} />
                </AppContextProvider>
            </Session.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)
