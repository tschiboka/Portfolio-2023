import { ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
    title: string;
    path: string;
}

const Page = ({ children, title, path }: Props) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
        console.log("PATH :", path);
    });
    return <>{children}</>;
};

export default Page;
