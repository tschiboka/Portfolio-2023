import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AppProvider, Session, Version } from '@shared-context'
import { router } from './routes'
import './main.styles.scss'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <Session.Provider>
                <AppProvider>
                    <Version.Provider>
                        <RouterProvider router={router} />
                    </Version.Provider>
                </AppProvider>
            </Session.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
)
