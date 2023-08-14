import { useEffect, useState } from "react";
import "./Breadcrumb.scss";
import { AiFillHome } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
    path: string;
}

const getBreadCrumbPath = (breadcrumbs: string[], index: number) => {
    return "/" + breadcrumbs.filter((_, i) => i <= index).join("/");
};

const Breadcrumb = ({ path }: Props) => {
    const [visits, setVisits] = useState(0);
    const noLeadingSlash = path.replace("/", "");
    const breadcrumbPaths = noLeadingSlash.split("/");

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
                console.log("Visit Recorded");
                setVisits(responseJSON.visits);
            } else console.log("Error While Sending Visit!", response);
        } catch (err) {
            console.log("Error While Sending Message!", err);
        }
    };

    useEffect(() => {
        getVisits(path);
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
