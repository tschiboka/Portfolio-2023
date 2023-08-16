import "./BlogTimeStamp.scss";

interface Props {
    created: string;
    updated?: string;
}

const BlogTimeStamp = ({ created, updated }: Props) => {
    const validateDate = (dateStr: string) => {
        // Check Date Format DD.MM.YYYY
        const dateRegex = /^\d\d\.\d\d\.\d\d\d\d$/;
        if (!dateRegex.test(dateStr)) return false;

        // Destruct Date
        const matchResults = dateStr.match(/\d+/g);
        if (matchResults) {
            const [dayStr, monthStr, yearStr] = matchResults;
            const [day, month, year] = [
                Number(dayStr),
                Number(monthStr),
                Number(yearStr),
            ];

            // Check Year
            if (year < 1970 || year > 2100) return false;
            // Check Month
            if (month < 1 || month > 12) return false;
            // Check If Day is Valid
            let lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // Check for LeapYears
            if (month === 2) {
                let leapYear = false;
                // If Leap Year
                if ((!(year % 4) && year % 100) || !(year % 400))
                    leapYear = true;
                if (leapYear === false && day >= 29) return false;
                else if (leapYear === true && day > 29) return false;
            } else if (day > lastDays[month - 1]) return false;
            if (day === 0) return false;
        }
        return true;
    };

    // Validate Created Date
    const createdIsValid = validateDate(created);
    if (!createdIsValid) throw Error("Invalid Date for Created: " + created);

    // Validate Updated Date
    if (updated) {
        const updatedIsValid = validateDate(updated);
        if (!updatedIsValid)
            throw Error("Invalid Date for Updated: " + updated);
    }

    const formatDate = (dateStr: string) => {
        const matchResults = dateStr.match(/\d+/g);
        if (matchResults) {
            const [dayStr, monthStr, yearStr] = matchResults;
            const [day, month, year] = [
                Number(dayStr),
                Number(monthStr),
                Number(yearStr),
            ];

            // Day Shorthand Text Format
            const date = new Date(year, month - 1, day);
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = days[date.getDay()];

            // Pad Days with Zero: 1 => 01
            const padZero = (num: number) => (num < 10 ? "0" : "") + num;

            // Month Shorthand Text Fromat
            const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            const monthName = months[month - 1];

            return `${dayOfWeek}, ${padZero(day)}. ${monthName}. ${year}`;
        }
    };

    if (updated)
        return (
            <div className="BlogTimeStamp">
                <hr />
                <p className="BlogTimeStamp__text">
                    This article was created on{" "}
                    <time dateTime={created}>{formatDate(created)}</time> and
                    last updated on{" "}
                    <time dateTime={updated}>{formatDate(updated)}</time>.
                </p>
            </div>
        );
    else
        return (
            <div className="BlogTimeStamp">
                <hr />
                <p className="BlogTimeStamp__text">
                    This article was created on{" "}
                    <time dateTime={created}>{formatDate(created)}</time>.
                </p>
            </div>
        );
};

export default BlogTimeStamp;
