import { Link } from "react-router-dom";
import "./References.scss";

export interface Reference {
    title: string;
    author: string;
    source: string;
}

interface Props {
    references: Reference[];
}

const References = ({ references }: Props) => {
    if (references && references.length)
        return (
            <section className="References">
                <hr />
                <h4>References</h4>
                <ul>
                    {references.map((reference, index) => (
                        <li key={index}>
                            <span className="left">
                                <span className="References__index">
                                    [ {index + 1} ]
                                </span>
                                <span className="References__author">
                                    {reference.author}
                                </span>
                                <span className="References__title">
                                    {reference.title}
                                </span>
                            </span>
                            <Link to={reference.source}>
                                {reference.source}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        );
};

export default References;
