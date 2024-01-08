import Page from '../../../sharedComponents/Page/Page'

interface IndexProps {
    path: string
}

const Index = ({ path }: IndexProps) => {
    return (
        <Page title={'Tivadar Debnar | Index'} path={path}>
            HERE
        </Page>
    )
}

export default Index
