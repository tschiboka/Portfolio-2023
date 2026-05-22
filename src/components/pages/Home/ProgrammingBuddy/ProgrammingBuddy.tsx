import { Link, Paragraph } from '@common/ux'
import { Box } from '@common/ux'
import './ProgrammingBuddy.scss'

const ProgrammingBuddy = () => {
    return (
        <>
            <Paragraph>
                I spend a lot of time on side projects and exploring different parts of software
                engineering — frontend architecture, TypeScript, testing strategies, and whatever
                else catches my attention.
            </Paragraph>
            <Paragraph>
                If you're into building things and occasionally want to pair, share ideas, or just
                compare approaches to problems, feel free to reach out. No formal agenda — just
                people who like writing code and improving how they do it.
            </Paragraph>
            <Paragraph>I also enjoy coding challenges. You can find me on codewars:</Paragraph>
            <Box className="codewars">
                <Link href="https://www.codewars.com/users/tschiboka">
                    <img
                        className="codewars-img"
                        src="https://www.codewars.com/users/tschiboka/badges/large"
                        alt="Codewars badge"
                    />
                </Link>
            </Box>
        </>
    )
}

export default ProgrammingBuddy
