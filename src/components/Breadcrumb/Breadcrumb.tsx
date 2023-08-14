import { useState } from "react";
import "./Breadcrumb.scss";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
    path: string;
}

const getVisits = (path: string) => {
    console.log("VISITS ", path, 0);
    return 0;
};

const getBreadCrumbPath = (breadcrumbs: string[], index: number) => {
    return "/" + breadcrumbs.filter((_, i) => i <= index).join("/");
};

const Breadcrumb = ({ path }: Props) => {
    const [visits, setVisits] = useState(0);
    const noLeadingSlash = path.replace("/", "");
    const breadcrumbPaths = noLeadingSlash.split("/");
    console.log("HERE", breadcrumbPaths);

    return (
        <div className="Breadcrumb">
            <Link to="/" className="Breadcrumb__icon" title="Home">
                <AiFillHome className="Breadcrumb__icon--house" />
            </Link>
            <span>
                {breadcrumbPaths.map((breadcrumb, index) => (
                    <Link
                        to={getBreadCrumbPath(breadcrumbPaths, index)}
                        key={breadcrumb}
                        className="Breadcrumb__path"
                    >
                        /{breadcrumb}
                    </Link>
                ))}
            </span>
            <FaEye className="Breadcrumb__icon" />
            <span className="Breadcrumb__visits">{getVisits(path)}</span>
        </div>
    );
};

export default Breadcrumb;
