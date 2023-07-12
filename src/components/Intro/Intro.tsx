import { useState, ReactNode } from "react";
import ExtendableSection from "../ExtendableSection/ExtendableSection";
import HireIntro from "../HireIntro/HireIntro";
import "./Intro.scss";

export interface ExtendedItem {
    title: string;
    content: ReactNode;
    extended: boolean;
}

const Intro = () => {
    const extendedItems: ExtendedItem[] = [
        {
            title: "Looking for a developer to join your team?",
            content: <HireIntro />,
            extended: false,
        },
        {
            title: "Looking for a programming buddy?",
            content: <HireIntro />,
            extended: false,
        },
        {
            title: "Looking for like-minded friends?",
            content: <HireIntro />,
            extended: false,
        },
        {
            title: "Just here to get to know me?",
            content: <HireIntro />,
            extended: false,
        },
    ];
    const [extendedSection, setExtendedSection] =
        useState<ExtendedItem[]>(extendedItems);

    return (
        <>
            <h1>Hello there!&nbsp;</h1>
            <br />
            <p>
                I'm pleased that you've found your way here. Whether you share
                my passion for coding and design or need a supporting hand with
                web development, you've come to the right place.
            </p>
            <br />
            <p>
                I'm a dedicated web developer with a deep love for crafting
                beautiful and functional websites and web applications. I strive
                to create impressive digital experiences that leave an impact
                and projects I'm proud of.
            </p>
            <br />
            <hr></hr>
            <br />
            <h2>How can I help you?</h2>
            <br />

            {extendedItems.map((item, index) => (
                <ExtendableSection
                    key={index}
                    item={extendedSection[index]}
                    setExtendedSection={setExtendedSection}
                    extendedSection={extendedSection}
                >
                    {item.content}
                </ExtendableSection>
            ))}
        </>
    );
};

export default Intro;
