import { useEffect, useState } from "react";
import "./Breadcrumb.scss";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getVisits } from "../../../serverAPI/visits";

interface Props {
    path: string;
    visitsPreLoaded?: boolean;
    visitCount?: number;
}

const getBreadCrumbPath = (breadcrumbs: string[], index: number) => {
    return "/" + breadcrumbs.filter((_, i) => i <= index).join("/");
};

const Breadcrumb = ({ path, visitsPreLoaded, visitCount }: Props) => {
    const [visits, setVisits] = useState(visitCount || 0);
    const noLeadingSlash = path.replace("/", "");
    const breadcrumbPaths = noLeadingSlash.split("/");

    useEffect(() => {
        if (!visitsPreLoaded) {
            getVisits(path, (visits) => {
                setVisits(visits);
                console.log("FOOTER VISIT GET");
            });
        }
    }, [visits]);

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
            <span className="Breadcrumb__visits">{visits || "-"}</span>
        </div>
    );
};

export default Breadcrumb;
