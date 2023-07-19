import { ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
    title: string;
}

const Page = ({ children, title }: Props) => {
    useEffect(() => {
        document.title = title;
    });
    return <>{children}</>;
};

export default Page;
