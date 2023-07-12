import { ReactNode } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ExtendedItem } from "../Intro/Intro";
import "./ExtendableSection.scss";

interface Props {
    item: ExtendedItem;
    extendedSection: ExtendedItem[];
    setExtendedSection: (sectionIndex: ExtendedItem[]) => void;
    children: ReactNode;
}

const ExtendableSection = ({
    item,
    extendedSection,
    setExtendedSection,
    children,
}: Props) => {
    const handleClick = () => {
        const newExtendedSections = extendedSection.map((s) =>
            s.title === item.title ? { ...s, extended: !item.extended } : s
        );

        setExtendedSection([...newExtendedSections]);
    };
    return (
        <section className="ExtendableSection">
            <button onClick={() => handleClick()}>
                <div className="extendable__button-content">
                    {item.title}
                    {item.extended ? (
                        <FiChevronUp className="chevron" />
                    ) : (
                        <FiChevronDown className="chevron" />
                    )}
                </div>
            </button>
            {item.extended && children}
        </section>
    );
};

export default ExtendableSection;
