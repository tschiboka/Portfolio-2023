import { useEffect, useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { CodeText, Form, Overlay, Stack, Table } from '@common-ux'
import { Browser, BrowserHooks, DateTime } from '@common-utils'
import { Version } from '@shared-context'
import { StatusIcon } from '@shared-components/StatusIcon'
import { VersionBadgeConstants } from './VersionBadge.constants'
import type { ReactNode } from 'react'
import type { TableColumns } from '@common-ux'

type VersionRow = {
    prop: string
    value: ReactNode
}

const versionColumns: TableColumns<VersionRow> = [
    { header: '', accessor: 'prop' },
    { header: '', accessor: 'value' },
]

export const VersionBadge = () => {
    const { isStale, build, checkedAt, refresh } = Version.useContext()
    const { isMobile } = BrowserHooks.useOrientation()
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!copied) return
        const id = window.setTimeout(() => setCopied(false), VersionBadgeConstants.copyFeedbackMs)
        return () => window.clearTimeout(id)
    }, [copied])

    if (!build) return null

    const copySha = () => {
        void Browser.copyToClipboard(build.sha)
        setCopied(true)
    }

    const rows: VersionRow[] = [
        { prop: 'Version', value: build.version ?? 'unknown' },
        { prop: 'Date', value: DateTime.Format.to('DisplayTimeStamp', build.date) ?? build.date },
        { prop: 'Message', value: build.message },
        {
            prop: 'SHA',
            value: (
                <Stack.Horizontal align="center" gap="8">
                    <CodeText>{build.sha.toUpperCase()}</CodeText>
                    <Form.Button
                        ariaLabel={copied ? 'Copied' : 'Copy commit SHA'}
                        className="link VersionBadge-copy"
                        onClick={copySha}
                    >
                        {copied ? <StatusIcon status="success" /> : <MdContentCopy />}
                    </Form.Button>
                </Stack.Horizontal>
            ),
        },
        {
            prop: 'Up to date',
            value: (
                <StatusIcon
                    status={isStale ? 'error' : 'success'}
                    ariaLabel={isStale ? 'Not up to date' : 'Up to date'}
                />
            ),
        },
        {
            prop: 'Last checked',
            value: checkedAt ? (DateTime.Format.to('DisplayTimeStamp', checkedAt) ?? checkedAt) : '—',
        },
    ]

    const open = () => {
        refresh()
        setIsOpen(true)
    }

    return (
        <>
            <Form.Button className="link Footer__version" onClick={open}>
                {`v${build.version ?? 'unknown'}`}
            </Form.Button>
            {isOpen && (
                <Overlay.Modal
                    title="App deployment info"
                    size={isMobile ? 'sm' : 'md'}
                    actions={[{ label: 'Refresh', onClick: refresh }]}
                    onClose={() => setIsOpen(false)}
                >
                    <Table
                        ariaLabel="Build version"
                        className="VersionBadge-table"
                        columns={versionColumns}
                        data={rows}
                    />
                </Overlay.Modal>
            )}
        </>
    )
}
