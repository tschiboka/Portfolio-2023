/**
 * Signature
 *
 * Email signature template used in automated email footers.
 * Renders a small avatar, name, title, and links — matching the
 * brand identity of tschiboka.com.
 *
 * Usage in an email template:
 *   import { renderSignature } from '../signature/Signature'
 *   ...
 *   ${renderSignature()}
 */

export const renderSignature = () => `
    <table style="width:100%; margin-top:24px; border-top:1px solid #333; padding-top:16px;">
        <tr>
            <td style="width:84px; vertical-align:middle; text-align:center; padding:0; white-space:nowrap;">
                <img
                    src="https://tschiboka.com/assets/headshot_placeholder_grayscale.png"
                    alt="Tivadar Debnar"
                    width="56"
                    height="56"
                    style="border-radius:50%; display:inline-block; border:2px solid #333; box-shadow:2px 2px 4px rgba(0,0,0,0.6), -2px -2px 4px rgba(255,255,255,0.04), inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.4);"
                />
                <div style="margin-top:8px; text-align:center; white-space:nowrap;">
                    <a href="https://github.com/tschiboka" style="color:#007676; text-decoration:none; display:inline-block; margin:0 4px;">
                        <img src="https://tschiboka.com/assets/icons/icon-github.svg" alt="GitHub" width="16" height="16" style="display:block;" />
                    </a>
                    <a href="https://www.linkedin.com/in/tivadar-debnar/" style="color:#007676; text-decoration:none; display:inline-block; margin:0 4px;">
                        <img src="https://tschiboka.com/assets/icons/icon-linkedin.svg" alt="LinkedIn" width="16" height="16" style="display:block;" />
                    </a>
                    <a href="https://www.facebook.com/tschiboka/" style="color:#007676; text-decoration:none; display:inline-block; margin:0 4px;">
                        <img src="https://tschiboka.com/assets/icons/icon-facebook.svg" alt="Facebook" width="16" height="16" style="display:block;" />
                    </a>
                </div>
            </td>
            <td style="vertical-align:top; padding-left:12px;">
                <table style="width:100%;">
                    <tr>
                        <td style="vertical-align:top; font-size:0.74rem; color:#a8a8a8; font-weight:300; line-height:1.5; padding-right:16px;">
                                <div style="color:#007676; font-weight:700; font-size:0.83rem;">Tivadar Debnar</div>
                            <div style="font-size:0.58rem; color:#888; line-height:1.3;">Frontend Developer <span style="font-size:0.52rem;">(BSc)</span></div>
                            <div style="font-size:0.58rem; color:#888; font-style:italic; line-height:1.3;">London, UK &mdash; ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' })}</div>
                        </td>
                        <td style="vertical-align:top; font-family:'Fira Code',monospace; font-size:0.5rem; line-height:1.6;">
                            <a href="https://tschiboka.com" style="color:#888; text-decoration:none;">
                                <img src="https://tschiboka.com/assets/icons/icon-globe.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />tschiboka.com</a><br />
                            <a href="tel:+447474999334" style="color:#888; text-decoration:none;">
                                <img src="https://tschiboka.com/assets/icons/icon-phone.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />+44 7474 999 334</a><br />
                            <a href="mailto:tibi.aki.tivadar@gmail.com" style="color:#888; text-decoration:none;">
                                <img src="https://tschiboka.com/assets/icons/icon-email.svg" alt="" width="12" height="12" style="vertical-align:middle; margin-right:2px;" />tibi.aki.tivadar@gmail.com</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top:12px; border-top:1px solid #333; font-size:0.58rem; color:#888;">
                This is an automated email sent from a no-reply address.
                If you received this in error, please ignore this message.
                No action is required on your part.
            </td>
        </tr>
    </table>
`
