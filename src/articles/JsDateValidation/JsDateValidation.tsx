// Components
import Article from '../../components/sharedComponents/Article/Article'
import Figure from '../../components/sharedComponents/Figure/Figure'

// Images
import calendarImg from '../../assets/images/blog/js_date_validation/calendar.jpg'

// Other Assets
import codeSnippets from './codeSnippets'
import { getReferenceList } from '../references'

// Styles
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'
import { Code, Heading, Paragraph, Section } from '@common/ux'

interface Props {
    pageName: string
    path: string
}

const JsDateValidation = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article pageName={pageName} path={path} title="JS Date Validation">
            <Heading as="h1">Validating Dates with JavaScript</Heading>
            <Section>
                <Figure
                    image={calendarImg}
                    size="md"
                    bgColor="white"
                    alt={'Calendar'}
                    zoomAllowed={false}
                />
                <Paragraph>
                    Date validation forms a cornerstone of programming tasks beyond just JavaScript
                    applications, and JavaScript provides seemingly uncomplicated means for
                    conducting elementary Date object validations. However, it's crucial to
                    spotlight certain nuances that require attention. The fundamental approach that
                    may resonate with some:
                </Paragraph>
                <Code
                    fileName="validateDate.tsx"
                    language="arduino"
                    content={codeSnippets.basicDateValidation}
                />
                <Paragraph>
                    The getTime function returns a date object or Not a Number (NaN) according to
                    the date string. One interesting property of NaN is that it is not equal to
                    itself, even when using the strict equality operator (===), hence the false
                    return for invalid dates. Unfortunately, the date overflows on leap years, which
                    may be problematic when validating date strings.
                </Paragraph>
                <Code
                    fileName="validateDate.tsx"
                    language="arduino"
                    content={codeSnippets.dateOverFlow}
                />
                <Paragraph>
                    As it turns out, according to MDN, "If you specify a number outside the expected
                    range, the date information in the Date object is updated accordingly. For
                    example, if the Date object holds June 1st, a dateValue of 40 changes the date
                    to July 10th, while a dateValue of 0 changes the date to the last day of the
                    previous month, May 31st".
                    <InlineReference reference={references[0]} />
                    This feature is bad news and means that we may just as well validate our date
                    strings ourselves.
                </Paragraph>
            </Section>
            <Section>
                <Paragraph>
                    Let's consider in this scenario that we only accept dates in the English date
                    format, which is [DD.MM.YYYY]. We can match our string with a simple RegEx and
                    extract the day, month and year information as numbers.
                </Paragraph>
                <Code fileName="validateDate.tsx" language="arduino" content={codeSnippets.regex} />
                <Paragraph>
                    The last day of each month can be assigned using an array of numbers:
                </Paragraph>
                <Code
                    fileName="validateDate.tsx"
                    language="arduino"
                    content={codeSnippets.daysArray}
                />
                <Paragraph>
                    However, we must consider leap years for February (the second item of the array
                    day[1]). To check if a year is a leap year, divide the year by 4. If it is fully
                    divisible by 4, it is a leap year. For example, 2016 is divisible by 4, a leap
                    year, whereas 2015 is not. However, century years like 300, 700, 1900, and 2000
                    need to be divided by 400 to check whether they are leap years.{' '}
                    <InlineReference reference={references[1]} />
                </Paragraph>
            </Section>
            <Section>
                <Paragraph>
                    So, let's extend our code with some additional validation for leap years; also,
                    we can restrict the minimum and maximum for the accepted years if applicable to
                    our scenario.
                </Paragraph>
                <Code
                    fileName="validateDate.tsx"
                    language="arduino"
                    content={codeSnippets.finalSolution}
                />
                <Paragraph>
                    Our date validation does not accept date strings with day overflow and returns
                    false for all invalid dates.
                </Paragraph>
            </Section>
        </Article>
    )
}

export default JsDateValidation
