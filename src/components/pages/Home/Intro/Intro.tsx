import { Heading, Paragraph, Section } from '@common/ux'
import HireIntro from '../HireIntro/HireIntro'
import ProgrammingBuddy from '../ProgrammingBuddy/ProgrammingBuddy'
import GetToKnowMe from '../GetToKnowMe/GetToKnowMe'
import { FaGlasses, FaCode } from 'react-icons/fa'
import { IoMdHand } from 'react-icons/io'
import './Intro.scss'

const Intro = () => {
    return (
        <>
            <Heading as="h2" className="left">
                Hello, I'm Tivadar!
            </Heading>
            <Paragraph className="left">
                I'm a software developer based in London, focused on building frontend systems with
                TypeScript and React. My work revolves around creating maintainable, well-structured
                web applications with attention to long-term code quality and developer experience.
            </Paragraph>
            <Heading as="h2" className="right">
                Who is Tivadar?
            </Heading>
            <Paragraph className="right">
                I enjoy working on both the user-facing side of applications and the underlying
                architecture that keeps them scalable and predictable. Over time, I've become
                particularly interested in testing strategies, system design in frontend
                applications, and reducing complexity in larger codebases.
            </Paragraph>
            <hr />
            <Heading as="h2">How can I help you?</Heading>

            <Section title="How I work" icon={<FaGlasses />} expandable defaultOpen={false}>
                <HireIntro />
            </Section>
            <Section
                title="Looking for a programming buddy?"
                icon={<FaCode />}
                expandable
                defaultOpen={false}
            >
                <ProgrammingBuddy />
            </Section>
            <Section
                title="Just here to get to know me?"
                icon={<IoMdHand />}
                expandable
                defaultOpen={false}
            >
                <GetToKnowMe />
            </Section>
        </>
    )
}

export default Intro
