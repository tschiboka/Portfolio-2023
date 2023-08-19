import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import BlogCard from "../BlogCard/BlogCard";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Nav from "../Nav/Nav";
import Page from "../Page/Page";
import SubNav from "../SubNav/SubNav";
import { blogArticles } from "./blogs";
import "./Blog.scss";

interface Props {
    pageName: string;
    path: string;
}

type VisitCount = { [path: string]: number };
export type LikeCount = { [path: string]: number };

const Blogs = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const [visits, setVisits] = useState<VisitCount | null>(null);
    const [visitsLoaded, setVisitsLoaded] = useState(false);
    const [likes, setLikes] = useState<LikeCount | null>(null);
    const [likesLoaded, setLikesLoaded] = useState(false);

    const getVisits = async () => {
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
            const response = await fetch(`${URL}`, options);
            const responseJSON = await response.json();
            if (responseJSON.success) {
                setVisitsLoaded(true);
                const visits: VisitCount = responseJSON.visits;
                setVisits(visits);
            } else console.log("Error While Getting Visits Data!", response);
        } catch (err) {
            console.log("Error While Getting Visits Data!", err);
        }
    };

    const getLikes = async () => {
        //const URLLocal = "http://localhost:5000/like";
        const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/like";
        const URL = URLLive;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch(`${URL}`, options);
            const responseJSON = await response.json();
            if (responseJSON.success) {
                setLikesLoaded(true);
                const likes: LikeCount = responseJSON.likes;
                setLikes(likes);
            } else console.log("Error While Getting Like Data!", response);
        } catch (err) {
            console.log("Error While Getting Like Data!", err);
        }
    };

    useEffect(() => {
        if (!visitsLoaded) getVisits();
        if (!likesLoaded) getLikes();
    }, [visits, likes]);

    return (
        <Page title="Tivadar Debnar | Blog" path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="blog" />}
            {subMenuVisible && <SubNav />}
            <main>
                <h1 className="Blog__title">Blog</h1>
                <p>
                    My blog is a way of giving back - and paying forward - all
                    the help I have been given through my programming learning
                    journey. Feel free to browse my articles that cover some of
                    my findings, solutions and tutorials on exciting and
                    relevant topics, such as programming languages, web
                    development and project walkthroughs. Happy Coding!
                </p>
                <div className="BlogList">
                    {blogArticles.map((article) => (
                        <BlogCard
                            key={article.title}
                            blogArticle={article}
                            visits={visits ? visits[article.to] : 0}
                            readingTime={article?.readingTime}
                            codeTime={article?.codeTime}
                            likes={likes ? likes[article.to] : 0}
                            path={article.to}
                        />
                    ))}
                </div>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default Blogs;
