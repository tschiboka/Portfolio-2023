/**
 * Signature
 *
 * React component for the email signature preview.
 * Mirrors the server-side template in:
 *   server/cron/emails/signature/Signature.ts
 *
 * Any changes to the email signature must be reflected in BOTH places.
 */

import { FaFacebookF } from 'react-icons/fa'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { TfiLinkedin } from 'react-icons/tfi'
import { FiGlobe, FiPhone } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'
import { DateTime } from '@common-utils'
import faceImg from '@portfolio/assets/home/headshot_placeholder_grayscale.png'
import { BreakdownPreviewStyles } from './BreakdownPreview.styles'
import { Link } from '@common-ux'

const S = BreakdownPreviewStyles.signature

export type SignatureProps = {
    /** Timestamp rendered in the signature; defaults to now (inject for determinism). */
    sentAt?: Date
}

export const Signature = ({ sentAt = new Date() }: SignatureProps) => (
    <div style={S.container}>
        <style>{`
            @media (max-width: 600px) {
                .bp-signature-row { flex-direction: column !important; align-items: flex-start !important; }
                .bp-signature-links { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
            }
        `}</style>
        {/* Top row: avatar column + info column */}
        <div style={S.row} className="bp-signature-row">
            <div style={S.avatarCol}>
                <img src={faceImg} alt="Tivadar Debnar" width={56} height={56} style={S.avatar} />
                <div style={S.avatarSpacer} />
            </div>
            <div style={S.info}>
                <div style={S.nameBlock}>
                    <div style={S.name}>Tivadar Debnar</div>
                    <div style={S.small}>
                        Frontend Developer <span style={S.degree}>(BSc)</span>
                    </div>
                    <div style={{ ...S.small, ...S.stamp }}>
                        London, UK &mdash; {DateTime.Format.to('DisplayDateTime', sentAt)}
                    </div>
                </div>
                <div style={S.linksBlock}>
                    <div style={S.links} className="bp-signature-links">
                        <span style={S.linkItem}>
                            <FiGlobe size={12} style={S.linkIcon} />
                            <Link href="https://tschiboka.com" style={S.linkUnderline}>
                                tschiboka.com
                            </Link>
                        </span>
                        <span style={S.linkItem}>
                            <FiPhone size={12} style={S.linkIcon} />
                            <Link href="tel:+447474999334" style={S.linkUnderline}>
                                +44 7474 999 334
                            </Link>
                        </span>
                        <span style={S.linkItem}>
                            <MdEmail size={12} style={S.linkIcon} />
                            <Link href="mailto:tibi.aki.tivadar@gmail.com" style={S.linkUnderline}>
                                tibi.aki.tivadar@gmail.com
                            </Link>
                        </span>
                        <div style={S.linksGap} />
                        <div style={S.socials}>
                            <Link href="https://github.com/tschiboka" style={S.link}>
                                <TbBrandGithubFilled size={12} style={{ display: 'block' }} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/tivadar-debnar/" style={S.link}>
                                <TfiLinkedin size={12} style={{ display: 'block' }} />
                            </Link>
                            <Link href="https://www.facebook.com/tschiboka/" style={S.link}>
                                <FaFacebookF size={12} style={{ display: 'block' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style={S.disclaimer}>
            This is an automated email sent from a no-reply address. If you received this in error,
            please ignore this message. No action is required on your part.
        </div>
    </div>
)
