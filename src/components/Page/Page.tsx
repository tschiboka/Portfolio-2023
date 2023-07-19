import { ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
    title: string;
}

const Page = ({ children, title }: Props) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    });
    return <>{children}</>;
};

export default Page;
