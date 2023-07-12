import { ReactNode } from "react";
import "./ExtendableSection.scss";

interface Props {
    index: number;
    title: string;
    extended: number;
    setExtendedSection: (sectionIndex: number) => void;
    children: ReactNode;
}
const ExtendableSection = ({
    index,
    title,
    extended,
    setExtendedSection,
    children,
}: Props) => {
    return (
        <section className="ExtendableSection">
            <button
                onClick={() =>
                    index === extended
                        ? setExtendedSection(-1)
                        : setExtendedSection(index)
                }
            >
                {title}
            </button>
            {extended === index && children}
        </section>
    );
};

export default ExtendableSection;
