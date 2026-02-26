import nodemailer from 'nodemailer'
import { Like } from '../models/like'
import { Visit } from '../models/visit'

interface PathBreakdownItem {
    path: string
    count: number
}

interface Breakdown {
    visits: {
        today: PathBreakdownItem[]
        total: PathBreakdownItem[]
        totalCount: number
        todayCount: number
    }
    likes: {
        today: PathBreakdownItem[]
        total: PathBreakdownItem[]
        totalCount: number
        todayCount: number
    }
}

async function dailyEmail() {
    const todaysDate = new Date(getDateString())

    // Get Visit Statistics
    const totalVisits = await Visit.find()
    const todayVisits = await Visit.find({
        visitDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)),
        },
    })

    // Get Like Statistics
    const totalLikes = await Like.find()
    const todayLikes = await Like.find({
        likeDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)),
        },
    })

    // Breakdown
    const breakdown: Breakdown = {
        visits: {
            today: getPathBreakdown(todayVisits),
            total: getPathBreakdown(totalVisits),
            totalCount: totalVisits.length,
            todayCount: todayVisits.length,
        },
        likes: {
            today: getPathBreakdown(todayLikes),
            total: getPathBreakdown(totalLikes),
            totalCount: totalLikes.length,
            todayCount: todayLikes.length,
        },
    }

    const message = createMessage(breakdown)
    try {
        await sendEmail(message)
        return { success: true }
    } catch (err) {
        return { success: false, error: err }
    }
}

const getDateString = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const zeroPad = (num: number) => (num < 10 ? '0' + num : num)
    return `${year}-${zeroPad(month)}-${zeroPad(day)}`
}

const getPathBreakdown = (records: any[]): PathBreakdownItem[] => {
    if (!records) throw Error('Parameter missing')

    const breakdown: PathBreakdownItem[] = []
    const paths: string[] = []
    records.forEach((record: any) => {
        if (!record.path) return
        const path = record.path
        if (paths.indexOf(path) === -1) {
            paths.push(path)
            breakdown.push({ path, count: 0 })
        }
    })

    records.forEach((record: any) => {
        breakdown.forEach((breakdownItem: PathBreakdownItem) => {
            if (breakdownItem.path === record.path) breakdownItem.count++
        })
    })
    return breakdown.sort((a: PathBreakdownItem, b: PathBreakdownItem) => b.count - a.count)
}

const createMessage = (breakdown: Breakdown) => {
    const visitBreakdown = !breakdown.visits.today.length
        ? ''
        : `${breakdown.visits.today
              .map(
                  (visit: PathBreakdownItem) =>
                      visit.path +
                      ' ' +
                      visit.count +
                      ' of ' +
                      (
                          breakdown.visits.total.find(
                              (visitTot: PathBreakdownItem) => visitTot.path === visit.path,
                          ) || { count: 0 }
                      ).count,
              )
              .join('<br />')}`

    const likeBreakdown = !breakdown.likes.today.length
        ? ''
        : `${breakdown.likes.today
              .map(
                  (like: PathBreakdownItem) =>
                      like.path +
                      ' ' +
                      like.count +
                      ' of ' +
                      (
                          breakdown.likes.total.find(
                              (likeTot: PathBreakdownItem) => likeTot.path === like.path,
                          ) || { count: 0 }
                      ).count,
              )
              .join('<br />')}`

    const message = `
        <h2>VISITS</h2>
        <p>
            Today Visit Count: ${breakdown.visits?.todayCount}
            Total Visit Count: ${breakdown.visits?.totalCount}
        </p>
        <span>${visitBreakdown}</span>
                        
        <h2>LIKES</h2>
        <p>
            Today Like Count: ${breakdown.likes?.todayCount}
            Total Like Count: ${breakdown.likes?.totalCount}
        </p>
        <span>${likeBreakdown}</span>
    `
    return message
}

const sendEmail = async (message: string) => {
    const fromEmailAddress = 'tibi.aki.tivadar@gmail.com'
    const toEmailAddress = 'tibi.aki.tivadar@gmail.com'
    const emailPassword = process.env.EMAIL_PASSWORD

    const mailOptions = {
        from: fromEmailAddress,
        to: [fromEmailAddress, toEmailAddress],
        subject: 'Breakdown Report | tschiboka.com',
        html: message,
    }

    const transporter = nodemailer.createTransport({
        auth: {
            user: fromEmailAddress,
            pass: emailPassword,
        },
        secure: true,
        port: 465,
        tls: { rejectUnauthorized: false },
        host: 'smtp.gmail.com',
    })
    try {
        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (err) {
        return err
    }
}

export default dailyEmail
