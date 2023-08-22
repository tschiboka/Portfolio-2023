import "./Figure.scss";

interface Props {
    image: string;
    className: string;
    alt: string;
    caption: string;
}

const Figure = ({ image, className, alt, caption }: Props) => {
    return (
        <figure>
            <img className={className} src={image} alt={alt} />
            <figcaption>{caption}</figcaption>
        </figure>
    );
};

export default Figure;
