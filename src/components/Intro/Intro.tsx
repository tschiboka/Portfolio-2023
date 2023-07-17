import { useState, ReactNode } from "react";
import ExtendableSection from "../ExtendableSection/ExtendableSection";
import HireIntro from "../HireIntro/HireIntro";
import ProgrammingBuddy from "../ProgrammingBuddy/ProgrammingBuddy";
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
            content: <ProgrammingBuddy />,
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
            <h2 className="left">Hello there!</h2>
            <p className="left">
                I'm pleased that you've found your way here. Whether you share
                my passion for coding and design or need a supporting hand with
                web development, you've come to the right place.
            </p>
            <h2 className="right">Who is Tivadar?</h2>
            <p className="right">
                I'm a dedicated web developer with a deep love for crafting
                beautiful and functional websites and web applications. I strive
                to create impressive digital experiences that leave an impact
                and projects I'm proud of.
            </p>
            <hr></hr>
            <h2>How can I help you?</h2>

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
