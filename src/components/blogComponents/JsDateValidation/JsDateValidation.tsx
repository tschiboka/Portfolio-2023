import { useAppContext } from "../../../context/AppContext";
import Footer from "../../Footer/Footer";
import Menu from "../../Menu/Menu";
import Nav from "../../Nav/Nav";
import Page from "../../Page/Page";
import References, { Reference } from "../../References/References";
import { Link } from "react-router-dom";
import SubNav from "../../SubNav/SubNav";
import BlogTimeStamp from "../../BlogTimeStamp/BlogTimeStamp";
import codeSnippets from "./codeSnippets";
import calendarImg from "../../../assets/images/blog/js_date_validation/calendar.jpg";
import "../../References/References.scss";
import "../blogComponents.scss";
import "./JsDateValidation.scss";
import Figure from "../../Figure/Figure";
import Code from "../../Code/Code";
import LikeButton from "../../LikeButton/LikeButton";
import { blogArticles } from "../../Blog/blogs";

interface Props {
    pageName: string;
    path: string;
}

const JsDateValidation = ({ pageName, path }: Props) => {
    const article = blogArticles.find((article) => article.to === path);
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const references: Reference[] = [
        {
            title: "Set Date Property Values",
            author: "MND",
            source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#syntax",
        },
        {
            title: "Calculating Leap Years",
            author: "CueMath",
            source: "https://www.cuemath.com/calculators/leap-year-calculator/",
        },
    ];
    return (
        <Page title="Tivadar Debnar | About" path="/blog/js-date-validation">
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="js-date-validation" />}
            {subMenuVisible && <SubNav />}
            <main className="blog-component">
                <article>
                    <h1>Validating Dates with JavaScript</h1>
                    <Figure
                        image={calendarImg}
                        className={"image--med bg--white"}
                        alt={"Calendar"}
                        caption={"Date Validation"}
                    />
                    <p>
                        Date validation forms a cornerstone of programming tasks
                        beyond just JavaScript applications, and JavaScript
                        provides seemingly uncomplicated means for conducting
                        elementary Date object validations. However, it's
                        crucial to spotlight certain nuances that require
                        attention. The fundamental approach that may resonate
                        with some:
                    </p>
                    <Code
                        fileName="validateDate.tsx"
                        language="arduino"
                        content={codeSnippets.basicDateValidation}
                    />
                    <p>
                        The getTime function returns a date object or Not a
                        Number (NaN) according to the date string. One
                        interesting property of NaN is that it is not equal to
                        itself, even when using the strict equality operator
                        (===), hence the false return for invalid dates.
                        Unfortunately, the date overflows on leap years, which
                        may be problematic when validating date strings.
                    </p>
                    <Code
                        fileName="validateDate.tsx"
                        language="arduino"
                        content={codeSnippets.dateOverFlow}
                    />
                    <p>
                        As it turns out, according to MDN, "If you specify a
                        number outside the expected range, the date information
                        in the Date object is updated accordingly. For example,
                        if the Date object holds June 1st, a dateValue of 40
                        changes the date to July 10th, while a dateValue of 0
                        changes the date to the last day of the previous month,
                        May 31st".
                        <Link
                            className="Reference__Link"
                            to={references[0].source}
                        >
                            [ {references[0].author} ]
                        </Link>
                        This feature is bad news and means that we may just as
                        well validate our date strings ourselves.
                    </p>
                    <p>
                        Let's consider in this scenario that we only accept
                        dates in the English date format, which is [DD.MM.YYYY].
                        We can match our string with a simple RegEx and extract
                        the day, month and year information as numbers.
                    </p>
                    <Code
                        fileName="validateDate.tsx"
                        language="arduino"
                        content={codeSnippets.regex}
                    />
                    <p>
                        The last day of each month can be assigned using an
                        array of numbers:
                    </p>
                    <Code
                        fileName="validateDate.tsx"
                        language="arduino"
                        content={codeSnippets.daysArray}
                    />
                    <p>
                        However, we must consider leap years for February (the
                        second item of the array day[1]). To check if a year is
                        a leap year, divide the year by 4. If it is fully
                        divisible by 4, it is a leap year. For example, 2016 is
                        divisible by 4, a leap year, whereas 2015 is not.
                        However, century years like 300, 700, 1900, and 2000
                        need to be divided by 400 to check whether they are leap
                        years.{" "}
                        <Link
                            className="Reference__Link"
                            to={references[1].source}
                        >
                            [ {references[1].author} ]
                        </Link>
                    </p>
                    <p>
                        So, let's extend our code with some additional
                        validation for leap years; also, we can restrict the
                        minimum and maximum for the accepted years if applicable
                        to our scenario.
                    </p>
                    <Code
                        fileName="validateDate.tsx"
                        language="arduino"
                        content={codeSnippets.finalSolution}
                    />

                    <p>
                        Our date validation does not accept date strings with
                        day overflow and returns false for all invalid dates.
                    </p>
                </article>
                <LikeButton path={path} />
                <References references={references} />
                {article && article.created && (
                    <BlogTimeStamp
                        created={article.created}
                        updated={article.updated}
                    />
                )}
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default JsDateValidation;
