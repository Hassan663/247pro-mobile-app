
// export const formatDate = () => {
//     const now = new Date();
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     const year = now.getFullYear();
//     return `${month}/${day}/${year}`;
// };

import moment from "moment";

export const formatDate = (currentTimesheet) => {
    if (currentTimesheet) {
        const transaction = currentTimesheet.timesheetTransactions.find(
            (t) => t.transactionType === 1
        );

        if (transaction) {
            const transactionDate = new Date(transaction.transactionDateTime);
            const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
            const day = String(transactionDate.getDate()).padStart(2, '0');
            const year = transactionDate.getFullYear();
            return `${month}/${day}/${year}`;
        }
    }

    // Default to today's date if no transactionType 1 exists or currentTimesheet is null
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}/${day}/${year}`;
};
export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export const formatClockInTime = (timesheet: any): string | null => {
    if (!timesheet || !timesheet.timesheetTransactions) {
      // If timesheet or timesheetTransactions is null or undefined, return null
      return null;
    }
  
    // Find the transaction with transactionType 1 (clock-in transaction)
    const clockInTransaction = timesheet.timesheetTransactions.find(
      (transaction: any) => transaction.transactionType === 1
    );
  
    if (!clockInTransaction) {
      // If no matching transaction is found, return null
      return null;
    }
  
    // Extract transactionDateTime
    const transactionDateTime = clockInTransaction.transactionDateTime;
    
    // Extract the timezone string from timesheetTimezone field
    const timesheetTimezone = timesheet.timesheetTimezone;
    let timezone = null;
    
    if (timesheetTimezone) {
      // Decode the URL-encoded string and extract the timezone information
      const decodedTimezone = decodeURIComponent(timesheetTimezone);
      const match = decodedTimezone.match(/timeZone=(.+)/);
      if (match && match[1]) {
        timezone = match[1]; // Extract the timezone from the string
      }
    }
  
    if (!timezone) {
      // If no timezone is found, return null or use a default timezone
      return null;
    }
  
    // Convert transactionDateTime to a Date object
    const date = new Date(transactionDateTime);
  
    // Use Moment.js to handle timezone conversion
    const momentDate = moment(date).tz(timezone);
  
    // Format the time in HH:mm:ss format considering the timezone
    const hours = String(momentDate.hours()).padStart(2, '0');
    const minutes = String(momentDate.minutes()).padStart(2, '0');
    const seconds = String(momentDate.seconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };

export const formatTotalWorkingTime = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const seconds = Math.floor(((totalHours - hours) * 60 - minutes) * 60);

    if (hours > 0) {
        return `${hours} Hr ${minutes} Min`;
    } else if (minutes > 0) {
        return `${minutes} Min ${seconds > 0 ? seconds + ' Sec' : ''}`;
    } else {
        return `${seconds} Sec`;
    }
};



// export const formatTotalWorkingTime = (totalHours) => {






//     const totalSeconds = Math.round(totalHours * 3600); // Convert total hours to total seconds
//     const hours = Math.floor(totalSeconds / 3600); // Calculate total hours
//     const remainingSecondsAfterHours = totalSeconds % 3600; // Remaining seconds after hours
//     const minutes = Math.floor(remainingSecondsAfterHours / 60); // Calculate minutes
//     const seconds = remainingSecondsAfterHours % 60; // Remaining seconds

//     // Adjust minutes if seconds ≥ 30
//     const adjustedMinutes = seconds >= 30 ? minutes + 1 : minutes;
//     const adjustedHours = adjustedMinutes === 60 ? hours + 1 : hours; // Increment hours if adjustedMinutes = 60
//     const displayMinutes = adjustedMinutes % 60; // Ensure minutes don't exceed 59

//     console.log("Input Total Hours:", totalHours);
//     console.log("Calculated -> Hours:", hours, ", Minutes:", minutes, ", Seconds:", seconds);
//     console.log("Adjusted -> Hours:", totalSeconds, adjustedHours, ", Minutes:", displayMinutes);

//     if (adjustedHours > 0) {
//         // If time is in hours, show hours and minutes
//         return `${adjustedHours} Hr ${displayMinutes} Min`;
//     } else if (adjustedMinutes > 0) {
//         // If time is in minutes, show minutes and seconds
//         return `${adjustedMinutes} Min ${seconds > 0 ? `${seconds} Sec` : ''}`;
//     } else {
//         // If time is only in seconds
//         return `${seconds} Sec`;
//     }
// };


export const formatReportTransactionTime = (totalMinutes) => {
    const totalSeconds = Math.round(totalMinutes * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = totalSeconds % 60;

    if (totalSeconds < 60) {
        return `${totalSeconds} Sec`;
    }

    if (hours === 0 && minutes > 0 && seconds > 0) {
        return `${minutes} Min ${seconds} Sec`;
    }

    if (hours > 0) {
        return `${hours} Hr ${minutes} Min`;
    }

    return `${minutes} Min`;
};


// export const formatReportTransactionTime = (totalMinutes) => {
//     const totalSeconds = Math.round(totalMinutes * 60); // Convert totalMinutes to totalSeconds
//     const hours = Math.floor(totalSeconds / 3600); // Extract hours
//     const remainingSecondsAfterHours = totalSeconds % 3600; // Remaining seconds after extracting hours
//     const minutes = Math.floor(remainingSecondsAfterHours / 60); // Extract minutes
//     const seconds = remainingSecondsAfterHours % 60; // Extract seconds

//     console.log("Input Total Minutes:", totalMinutes);
//     console.log("Calculated -> Total Seconds:", totalSeconds, "Hours:", hours, "Minutes:", minutes, "Seconds:", seconds);
//     // Adjust minutes if seconds ≥ 30
//     const adjustedMinutes = seconds >= 30 ? minutes + 1 : minutes;
//     const adjustedHours = adjustedMinutes === 60 ? hours + 1 : hours; // Increment hours if adjustedMinutes = 60
//     const displayMinutes = adjustedMinutes % 60; // Ensure minutes don't exceed 59

//     if (adjustedHours > 0) {
//         // If time is in hours, show hours and minutes
//         return `${adjustedHours} Hr ${displayMinutes} Min`;
//     } else if (adjustedMinutes > 0) {
//         // If time is in minutes, show minutes and seconds
//         return `${adjustedMinutes} Min ${seconds > 0 ? `${seconds} Sec` : ''}`;
//     } else {
//         // If time is only in seconds
//         return `${seconds} Sec`;
//     }

//     // // Case: Time only in seconds
//     // console.log("Formatted Time (Seconds): ", `${seconds} Sec`);
//     // return `${seconds} Sec`;
// };

// export const formatReportTransactionTime = (totalMinutes) => {
//     const totalSeconds = Math.round(totalMinutes * 60);
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = Math.floor(totalMinutes % 60);
//     const seconds = totalSeconds % 60;

//     // Adjust minutes if seconds ≥ 30
//     const adjustedMinutes = seconds >= 30 ? minutes + 1 : minutes;
//     const adjustedHours = adjustedMinutes === 60 ? hours + 1 : hours;

//     // Correct minutes to not exceed 60 after rounding
//     const displayMinutes = adjustedMinutes % 60;

//     if (totalSeconds < 60) {
//         // Case: Only seconds (less than 1 minute)
//         return `${totalSeconds} Sec`;
//     }

//     if (adjustedHours === 0 && displayMinutes > 0) {
//         // Case: Only minutes and seconds
//         return `${displayMinutes} Min ${seconds > 0 ? `${seconds} Sec` : ''}`;
//     }

//     if (adjustedHours > 0) {
//         // Case: Hours and minutes
//         return `${adjustedHours} Hrs ${displayMinutes} Min`;
//     }

//     // Default: Return minutes if no other case applies
//     return `${displayMinutes} Min`;
// };