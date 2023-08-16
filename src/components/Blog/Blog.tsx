import { useAppContext } from "../../context/AppContext";
import BlogCard from "../BlogCard/BlogCard";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Nav from "../Nav/Nav";
import Page from "../Page/Page";
import SubNav from "../SubNav/SubNav";
import "./Blog.scss";

interface Props {
    pageName: string;
    path: string;
}

const Blogs = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    return (
        <Page title="Tivadar Debnar | Blog" path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="blog" />}
            {subMenuVisible && <SubNav />}
            <main>
                <h1>Blog</h1>
                <p>
                    My blog is a way of giving back - and paying forward - all
                    the help I have been given through my programming learning
                    journey. Feel free to browse my articles that cover some of
                    my findings, solutions and tutorials on exciting and
                    relevant topics, such as programming languages, web
                    development and project walkthroughs. Happy Coding!
                </p>
                <div className="BlogList">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default Blogs;
