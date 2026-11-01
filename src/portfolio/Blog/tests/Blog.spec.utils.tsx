import { Test } from '@shared-components/Screen/tests'
import { BlogMockHandlers } from './Blog.mockHandlers'
import { Blog } from '../Blog'

export const BlogTestUtils = {
    render: () =>
        Test.Screen.Do.render({
            path: '/blog',
            children: <Blog pageName="blog" path="/blog" />,
            handlers: BlogMockHandlers.Defaults,
        }),
}
