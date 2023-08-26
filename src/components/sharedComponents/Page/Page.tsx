import { ReactNode, useEffect } from "react";
import { postVisit } from "../../../serverAPI/visits";
import { detectIncognito } from "detectincognitojs";
import Overlay from "../Overlay/Overlay";
import "./Page.scss";

interface Props {
    children: ReactNode;
    title: string;
    path: string;
}

const Page = ({ children, title, path }: Props) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);

        // Do Not Record Visits in Incognito Mode
        detectIncognito().then((result) => {
            if (!result.isPrivate) postVisit(path);
        });
    }, []);

    return (
        <>
            {children}
            <Overlay></Overlay>
        </>
    );
};

export default Page;
