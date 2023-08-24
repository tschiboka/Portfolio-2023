import { ReactNode, useEffect } from "react";
import { postVisit } from "../../../serverAPI/visits";
import "./Page.scss";
import Overlay from "../Overlay/Overlay";

interface Props {
    children: ReactNode;
    title: string;
    path: string;
}

const Page = ({ children, title, path }: Props) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
        postVisit(path);
    }, []);
    return (
        <>
            {children}
            <Overlay></Overlay>
        </>
    );
};

export default Page;
