import { useParams } from 'react-router-dom'
import { LoadingIndicator, Section, Heading } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { EmailVerificationQueries } from './EmailVerification.queries'
import './EmailVerification.styles.scss'

type EmailVerificationProps = {
    path: string
}

export const EmailVerification = ({ path }: EmailVerificationProps) => {
    const { verificationToken = '' } = useParams()
    const { message, isPending } = EmailVerificationQueries.Verify.usePost(verificationToken)

    return (
        <Screen className="EmailVerification" title={'tschiboka | Email Verification'} path={path}>
            <LoadingIndicator show={isPending} />
            <Section>
                <Heading as="h1">Verifying your email address</Heading>
                {message && <Heading as="h2">{message}</Heading>}
            </Section>
        </Screen>
    )
}
