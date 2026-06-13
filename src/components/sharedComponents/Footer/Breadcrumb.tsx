import { AiFillHome } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { Link } from '@common/ux'
import { useGetVisits } from '@common/queries'
import './Breadcrumb.css'

interface Props {
    path: string
    visitsPreLoaded?: boolean
    visitCount?: number
}

const getBreadCrumbPath = (breadcrumbs: string[], index: number) => {
    return '/' + breadcrumbs.filter((_, i) => i <= index).join('/')
}

const Breadcrumb = ({ path, visitsPreLoaded, visitCount }: Props) => {
    const { data: visitsData } = useGetVisits(path)
    const visits = visitsPreLoaded ? (visitCount ?? 0) : (visitsData?.visits ?? 0)
    const noLeadingSlash = path.replace('/', '')
    const breadcrumbPaths = noLeadingSlash.split('/')

    return (
        <div className="Breadcrumb">
            <Link to="/" className="Breadcrumb__icon" title="Home">
                <AiFillHome className="Breadcrumb__icon--house" />
            </Link>
            <span>
                {breadcrumbPaths.map((breadcrumb, index) => (
                    <Link
                        to={getBreadCrumbPath(breadcrumbPaths, index)}
                        key={breadcrumb}
                        className="Breadcrumb__path"
                    >
                        /{breadcrumb}
                    </Link>
                ))}
            </span>
            <FaEye className="Breadcrumb__icon" />
            <span className="Breadcrumb__visits">{visits || '-'}</span>
        </div>
    )
}

export default Breadcrumb
