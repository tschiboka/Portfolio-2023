import { Heading, Link, List } from '@common-ux'
import './References.scss'

export interface Reference {
    title: string
    author: string
    source: string
}

interface Props {
    references: Reference[]
}

const References = ({ references }: Props) => {
    if (references && references.length)
        return (
            <section className="References">
                <hr />
                <Heading as="h4">References</Heading>
                <List
                    items={references.map((reference, index) => ({
                        key: reference.title,
                        content: (
                            <>
                                <span className="left">
                                    <span className="References__index">[ {index + 1} ]</span>
                                    <span className="References__author">{reference.author}</span>
                                    <span className="References__title">{reference.title}</span>
                                </span>
                                {/^https?:\/\//.test(reference.source) ? (
                                    <Link href={reference.source}>{reference.source}</Link>
                                ) : (
                                    <Link to={reference.source}>{reference.source}</Link>
                                )}
                            </>
                        ),
                    }))}
                />
            </section>
        )
}

export default References
