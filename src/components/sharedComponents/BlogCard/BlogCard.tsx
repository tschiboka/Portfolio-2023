import { BlogArticle } from '../../../articles/articles'
import { getColourName } from '../../pages/Projects/Projects.selectors'
import { useNavigate } from 'react-router-dom'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { BiSolidTimeFive } from 'react-icons/bi'
import { FaEye, FaCode } from 'react-icons/fa'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { useState } from 'react'
import { usePostLike } from '@common/queries'
import { Card, Pill, Heading, Paragraph, Stack, Inline, Box, Text } from '@common/ux'
import './BlogCard.scss'

interface Props {
    blogArticle: BlogArticle
    visits: number
    readingTime?: string | undefined
    codeTime?: string | undefined
    likes: number
    path: string
    upcoming?: boolean
    newest: boolean
}

const pillColorMap: Record<
    string,
    'accent' | 'error' | 'success' | 'yellow' | 'orange' | 'purple' | 'gray'
> = {
    yellow: 'yellow',
    orange: 'orange',
    purple: 'purple',
    pink: 'error',
    'light-green': 'success',
    'light-blue': 'accent',
    white: 'gray',
    accent: 'accent',
    success: 'success',
    error: 'error',
}

const toPillColor = (badge: string) => pillColorMap[getColourName(badge)] ?? 'gray'

const BlogCard = ({ blogArticle, visits, readingTime, codeTime, likes, path, newest }: Props) => {
    const navigate = useNavigate()
    const [articleLiked, setArticleLiked] = useState(false)
    const { mutate: doPostLike } = usePostLike()

    return (
        <Card
            ariaLabel={blogArticle.title}
            className="BlogCard"
            onClick={() => navigate(blogArticle.to)}
        >
            <Box className="BlogCard__inner">
                <Box className="BlogCard__img-wrapper">
                    <Box className="BlogCard__img-box" display="flex">
                        {blogArticle.upcoming && (
                            <Inline className="BlogCard__upcoming-overlay" align="center">
                                <BsFillCalendar2DateFill className="BlogCard__overlay-icon" />
                                <Text className="BlogCard__upcoming-date">
                                    {blogArticle.upcomingDate}
                                </Text>
                            </Inline>
                        )}
                        {newest && (
                            <Inline className="BlogCard__new-overlay" align="center">
                                <AiFillStar className="BlogCard__overlay-icon--new" />
                                <Text className="BlogCard__new-text">New</Text>
                            </Inline>
                        )}
                        <Inline className="BlogCard__badge-box" wrap gap="4">
                            {blogArticle.badges.map((badge, index) => (
                                <Pill
                                    key={`${badge}-${index}`}
                                    label={badge}
                                    color={toPillColor(badge)}
                                    variant="solid"
                                />
                            ))}
                        </Inline>
                        <img src={blogArticle.image} alt={blogArticle.imageAlt} />
                    </Box>
                </Box>
                <Stack className="BlogCard__text-wrapper">
                    <Stack as="header" className="BlogCard__title">
                        <Heading
                            as="h3"
                            size="lg"
                            className="BlogCard__title-text"
                            includeInTableOfContents={false}
                        >
                            {blogArticle.title}
                        </Heading>
                        <Inline className="BlogCard__info" wrap gap="4">
                            <Inline gap="4">
                                <Inline className="BlogCard__info-datablock" align="center">
                                    <BiSolidTimeFive className="BlogCard__info-icon" />
                                    <Text className="BlogCard__info-text">
                                        {readingTime || '-'}
                                    </Text>
                                    <Text className="BlogCard__hint-text">Reading&nbsp;Time</Text>
                                </Inline>
                                <Inline className="BlogCard__info-datablock" align="center">
                                    <FaCode className="BlogCard__info-icon" />
                                    <Text className="BlogCard__info-text">{codeTime || '-'}</Text>
                                    <Text className="BlogCard__hint-text">Code&nbsp;Time</Text>
                                </Inline>
                            </Inline>
                            <Inline gap="4">
                                <Text
                                    className="BlogCard__info-datablock like"
                                    onClick={(event: React.MouseEvent) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        if (!articleLiked)
                                            doPostLike(
                                                { path },
                                                { onSuccess: () => setArticleLiked(true) },
                                            )
                                        return false
                                    }}
                                >
                                    <AiFillHeart
                                        className={
                                            'BlogCard__info-icon ' +
                                            (articleLiked ? 'disabled' : '')
                                        }
                                    />
                                    <Text className="BlogCard__info-text">
                                        {(!articleLiked ? likes : (likes || 0) + 1) || '-'}
                                    </Text>
                                    <Text className="BlogCard__hint-text">Likes&nbsp;Given</Text>
                                </Text>
                                <Inline className="BlogCard__info-datablock" align="center">
                                    <FaEye className="BlogCard__info-icon" />
                                    <Text className="BlogCard__info-text">{visits || '-'}</Text>
                                    <Text className="BlogCard__hint-text">Times&nbsp;Read</Text>
                                </Inline>
                            </Inline>

                            <Text className="BlogCard__created">{blogArticle.created}</Text>
                        </Inline>
                        <Text className="BlogCard__created">{blogArticle.created}</Text>
                    </Stack>
                    <Paragraph className="BlogCard__abstract">{blogArticle.abstract}</Paragraph>
                </Stack>
            </Box>
        </Card>
    )
}

export default BlogCard
