import { useState } from "react";
import ExtendableSection from "../ExtendableSection/ExtendableSection";
import HireIntro from "../HireIntro/HireIntro";
import "./Intro.scss";

const Intro = () => {
    const [extendedSection, setExtendedSection] = useState(-1);
    const extendedItems = [
        {
            title: "Looking for a developer to join your team?",
            content: <HireIntro />,
        },
        { title: "Looking for a programming buddy?", content: <HireIntro /> },
        { title: "Looking for like-minded friends?", content: <HireIntro /> },
        { title: "Just here to get to know me?", content: <HireIntro /> },
    ];
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
                    index={index}
                    title={item.title}
                    extended={extendedSection}
                    setExtendedSection={setExtendedSection}
                >
                    {item.content}
                </ExtendableSection>
            ))}
        </>
    );
};

export default Intro;
