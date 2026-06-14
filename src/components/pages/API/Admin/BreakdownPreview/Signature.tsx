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
import faceImg from '../../../../../assets/images/headshot_placeholder_grayscale.png'

const iconLinkStyle: React.CSSProperties = {
    color: '#007676',
    textDecoration: 'none',
    verticalAlign: 'middle',
}

const iconStyle: React.CSSProperties = {
    verticalAlign: 'middle',
    display: 'inline-block',
}

const smallStyle: React.CSSProperties = {
    fontSize: '0.58rem',
    color: '#888',
    lineHeight: 1.6,
}

const Signature = () => (
    <div
        style={{
            marginTop: '24px',
            borderTop: '1px solid #333',
            paddingTop: '16px',
        }}
    >
        {/* Top row: avatar column + info column */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'stretch' }}>
            {/* Avatar + socials column */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    flexShrink: 0,
                    justifyContent: 'center',
                    width: '84px',
                }}
            >
                <img
                    src={faceImg}
                    alt="Tivadar Debnar"
                    width={56}
                    height={56}
                    style={{
                        borderRadius: '50%',
                        display: 'inline-block',
                        border: '2px solid #333',
                        boxShadow:
                            '2px 2px 4px rgba(0,0,0,0.6), -2px -2px 4px rgba(255,255,255,0.04), inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.4)',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <a
                        href="https://www.linkedin.com/in/tivadar-debnar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={iconLinkStyle}
                    >
                        <TfiLinkedin size={14} style={iconStyle} title="LinkedIn" />
                    </a>
                    <a
                        href="https://github.com/tschiboka"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={iconLinkStyle}
                    >
                        <TbBrandGithubFilled size={14} style={iconStyle} title="GitHub" />
                    </a>
                    <a
                        href="https://www.facebook.com/tschiboka/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={iconLinkStyle}
                    >
                        <FaFacebookF size={14} style={iconStyle} title="Facebook" />
                    </a>
                </div>
            </div>

            {/* Info column */}
            <div
                style={{
                    flex: 1,
                    minWidth: '200px',
                    fontSize: '0.74rem',
                    color: '#a8a8a8',
                    fontWeight: 300,
                    lineHeight: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}
            >
                {/* Name + role grouped at top */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ color: '#007676', fontWeight: 700, fontSize: '0.83rem' }}>
                        Tivadar Debnar
                    </div>
                    <div style={smallStyle}>
                        Frontend Developer <span style={{ fontSize: '0.52rem' }}>(BSc)</span>
                    </div>
                    <div style={{ ...smallStyle, fontStyle: 'italic' }}>
                        London, UK &mdash;{' '}
                        {new Date().toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}{' '}
                        {new Date().toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                            timeZone: 'Europe/London',
                        })}
                    </div>
                </div>

                {/* Links + contact pushed to bottom */}
                <div
                    style={{
                        marginTop: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}
                >
                    <div
                        style={{
                            ...smallStyle,
                            fontSize: '0.5rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            alignItems: 'center',
                            fontFamily: 'Fira Code, monospace',
                            lineHeight: '18px',
                        }}
                        className="bp-signature-links"
                    >
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '2px',
                                height: '18px',
                            }}
                        >
                            <FiGlobe size={12} style={{ color: '#00b5b5', flexShrink: 0 }} />
                            <a
                                href="https://tschiboka.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#888',
                                    textDecoration: 'underline',
                                    fontFamily: 'Fira Code, monospace',
                                }}
                            >
                                tschiboka.com
                            </a>
                        </span>
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '2px',
                                height: '18px',
                            }}
                        >
                            <FiPhone size={12} style={{ color: '#00b5b5', flexShrink: 0 }} />
                            <a
                                href="tel:+447474999334"
                                style={{
                                    color: '#888',
                                    textDecoration: 'underline',
                                    fontFamily: 'Fira Code, monospace',
                                }}
                            >
                                +44 7474 999 334
                            </a>
                        </span>
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '2px',
                                height: '18px',
                            }}
                        >
                            <MdEmail size={12} style={{ color: '#00b5b5', flexShrink: 0 }} />
                            <a
                                href="mailto:tibi.aki.tivadar@gmail.com"
                                style={{
                                    color: '#888',
                                    textDecoration: 'underline',
                                    fontFamily: 'Fira Code, monospace',
                                }}
                            >
                                tibi.aki.tivadar@gmail.com
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Disclaimer — full width below both columns */}
        <div
            style={{
                borderTop: '1px solid #333',
                paddingTop: '12px',
                marginTop: '12px',
                fontSize: '0.58rem',
                color: '#888',
            }}
        >
            This is an automated email sent from a no-reply address. If you received this in error,
            please ignore this message. No action is required on your part.
        </div>
    </div>
)

export default Signature
