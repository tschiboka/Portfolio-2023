import { ReactNode, useState } from "react";
import { useAppContext } from "../../../context/AppContext";

// Components
import Page from "../../sharedComponents/Page/Page";
import Menu from "../../sharedComponents/Menu/Menu";
import Nav from "../../sharedComponents/Nav/Nav";
import SubNav from "../../sharedComponents/SubNav/SubNav";
import Footer from "../../sharedComponents/Footer/Footer";
import LikeButton from "../../sharedComponents/LikeButton/LikeButton";
import BlogTimeStamp from "../../sharedComponents/BlogTimeStamp/BlogTimeStamp";
import References, {
    Reference,
} from "../../sharedComponents/References/References";
import { EmailShareButton } from "react-share";

// Icons
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { HiShare } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

// Other Assets
import { blogArticles } from "../../pages/Blog/blogs";

// Styles
import "./Articles.scss";
import ShareMenu from "../ShareMenu/ShareMenu";

// Functions
const scrollToTop = () => {
    console.log("Scroll");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

// References
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

interface Props {
    pageName: string;
    path: string;
    title: string;
    children: ReactNode;
}

const Article = ({ pageName, path, title, children }: Props) => {
    const article = blogArticles.find((article) => article.to === path);
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const [sideMenuVisible, setSideMenuVisible] = useState(true);
    const [shareMenuVisible, setShareMenuVisible] = useState(false);

    return (
        <Page title={"Tivadar Debnar | " + title} path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="js-date-validation" />}
            {subMenuVisible && <SubNav />}
            {sideMenuVisible && (
                <aside className="blog-component--article">
                    <HiShare
                        className={
                            "aside-icon " +
                            (shareMenuVisible ? "highlighted" : "")
                        }
                        title="Share"
                        onClick={() => setShareMenuVisible(!shareMenuVisible)}
                    />

                    <FaEye className="aside-icon" title="Times Visited" />
                    <AiFillHeart className="aside-icon" title="Likes" />
                    <BiSolidUpArrowSquare
                        className="aside-icon"
                        title="Go to the Top of the Page"
                        onClick={() => scrollToTop()}
                    />
                    <IoMdClose
                        className="aside-icon"
                        title="Close Menu"
                        onClick={() => setSideMenuVisible(false)}
                    />
                    <div className="line"></div>
                    {shareMenuVisible && <ShareMenu path={path} />}
                </aside>
            )}

            <main className="blog-component">
                <article>{children}</article>
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

export default Article;
