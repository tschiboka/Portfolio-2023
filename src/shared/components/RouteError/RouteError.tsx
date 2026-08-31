import { Heading, Paragraph, Link, Stack } from '@common-ux'
import './RouteError.styles.scss'

const RouteError = () => {
    return (
        <main className="route-error">
            <Stack align="center" gap="16">
                <Heading as="h1" align="center">
                    404 — Page not found
                </Heading>
                <Paragraph align="center">
                    The page you are looking for does not exist or has moved.
                </Paragraph>
                <Link to="/">Back to home</Link>
            </Stack>
        </main>
    )
}

export default RouteError
