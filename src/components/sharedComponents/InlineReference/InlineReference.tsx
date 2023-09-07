import { Reference } from "../References/References";
import { Link } from "react-router-dom";
import "./InlineReference.scss";

interface Props {
    reference: Reference;
}

const InlineReference = ({ reference }: Props) => {
    return (
        <Link className="InlineReference" to={reference.source}>
            [{reference.author}]
        </Link>
    );
};

export default InlineReference;
