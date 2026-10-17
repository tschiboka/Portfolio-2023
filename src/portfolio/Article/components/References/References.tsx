import { Heading, Link, List } from '@common-ux'
import type { ReferencesProps } from './References.types'
import './References.scss'

export const References = ({ references }: ReferencesProps) => {
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
