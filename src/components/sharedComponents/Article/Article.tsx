import { ReactNode, useEffect, useState } from "react";
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
import { getLikes, postLike } from "../../../serverAPI/likes";

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
    const getVisits = async (path: string) => {
        //const URLLocal = "http://localhost:5000/visit";
        const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/visit";
        const URL = URLLive;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch(`${URL}?path=${path}`, options);
            const responseJSON = await response.json();
            if (responseJSON.success) {
                setVisits(responseJSON.visits);
            } else console.log("Error While Sending Visit!", response);
        } catch (err) {
            console.log("Error While Sending Message!", err);
        }
    };

    const article = blogArticles.find((article) => article.to === path);
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const [sideMenuVisible, setSideMenuVisible] = useState(true);
    const [shareMenuVisible, setShareMenuVisible] = useState(false);
    const [visits, setVisits] = useState(0);
    const [articleLiked, setArticleLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likesLoaded, setLikesLoaded] = useState(false);

    useEffect(() => {
        if (!likesLoaded)
            getLikes(path, (likes: number) => {
                setLikesLoaded(true);
                setLikes(likes);
            });
    }, [likes]);

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

                    <div
                        className="Article__icon-box"
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (!articleLiked)
                                postLike(path, () => setArticleLiked(true));
                            return false;
                        }}
                    >
                        <AiFillHeart
                            className={
                                "aside-icon " +
                                (articleLiked ? "highlighted" : "")
                            }
                            title="Likes"
                        />
                        <span>
                            {(!articleLiked ? likes : likes + 1) || "-"}
                        </span>
                    </div>
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
                <LikeButton
                    path={path}
                    likes={likes}
                    articleLiked={articleLiked}
                    setArticleLiked={setArticleLiked}
                />
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