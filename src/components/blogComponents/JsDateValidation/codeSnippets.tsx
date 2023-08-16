const codeSnippets = {
    basicDateValidation: `const isValidDate = (date) =>  {
    const d = new Date(date);
    console.log(d.getTime())
    return d.getTime() === d.getTime();  // Return Date Object or NaN
}
  
isValidDate("2023/2/30");                // => true
isValidDate("Not a valid date.");        // => NaN`,
    dateOverFlow: `// Valid Date
    new Date("2023/2/28");               // => Date Tue Feb 28 2023 00:00:00 GMT+0000 (Greenwich Mean Time)
    // Should be Invalid
    new Date("2023/2/30");               // => Date Thu Mar 02 2023 00:00:00 GMT+0000 (Greenwich Mean Time)
    new Date("2023/2/31");               // => Date Fri Mar 03 2023 00:00:00 GMT+0000 (Greenwich Mean Time)
    // How about this?
    new Date("2023/2/32");               // => Date Invalid`,
    regex: `// Check Date Format DD.MM.YYYY
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
    `,
    daysArray: `let lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];`,
    finalSolution: `const validateDate = (dateStr: string) => {
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
    };`,
};

export default codeSnippets;
