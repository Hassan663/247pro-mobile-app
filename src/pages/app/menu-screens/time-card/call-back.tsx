
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
export const formatBreakInDate = (currentTimesheet) => {
  if (currentTimesheet) {
      // Filter transactions with transactionType 3
      const breakInTransactions = currentTimesheet.timesheetTransactions.filter(
          (t) => t.transactionType === 3
      );

      if (breakInTransactions.length > 0) {
          // Find the latest transaction based on transactionDateTime
          const latestTransaction = breakInTransactions.reduce((latest, transaction) => {
              return new Date(transaction.transactionDateTime) > new Date(latest.transactionDateTime)
                  ? transaction
                  : latest;
          });

          // Log the latest transaction date and time
          console.log(
              'Latest transaction date and time picked:',
              latestTransaction.transactionDateTime
          );

          // Extract the date from the latest transaction
          const transactionDate = new Date(latestTransaction.transactionDateTime);
          const month = String(transactionDate.getMonth() + 1).padStart(2, '0');
          const day = String(transactionDate.getDate()).padStart(2, '0');
          const year = transactionDate.getFullYear();
          return `${month}/${day}/${year}`;
      }
  }

  // Default to today's date if no transactionType 3 exists or currentTimesheet is null
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

export const formatBreakInTime = (timesheet: any): string | null => {
  if (!timesheet || !timesheet.timesheetTransactions) {
      // If timesheet or timesheetTransactions is null or undefined, return null
      return null;
  }

  // Filter transactions with transactionType 3
  const breakInTransactions = timesheet.timesheetTransactions.filter(
      (transaction: any) => transaction.transactionType === 3
  );

  if (breakInTransactions.length === 0) {
      // If no transaction with transactionType 3 exists, return null
      return null;
  }

  // Find the latest transaction of type 3
  const latestTransaction = breakInTransactions.reduce((latest: any, transaction: any) => {
      return new Date(transaction.transactionDateTime) > new Date(latest.transactionDateTime)
          ? transaction
          : latest;
  });

  // Extract transactionDateTime
  const transactionDateTime = latestTransaction.transactionDateTime;

  // Log the transaction date and time being used as break-in time
  console.log('Break-In Transaction DateTime:', transactionDateTime);

  // Convert transactionDateTime to a Date object
  const date = new Date(transactionDateTime);

  // Extract the time in HH:mm:ss format
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Log the extracted break-in time
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  console.log('Extracted Break-In Time:', formattedTime);

  return formattedTime;
};
export const formatClockInTime = (timesheet: any): string | null => {
  if (!timesheet || !timesheet.timesheetTransactions) {
    // If timesheet or timesheetTransactions is null or undefined, return null
    return null;
  }

  const transactions = timesheet.timesheetTransactions;

  // If there are multiple transactions other than type 1
  const nonClockInTransactions = transactions.filter(
    (transaction: any) => transaction.transactionType !== 1
  );

  if (nonClockInTransactions.length > 0) {
    // Get the latest transaction among non-clock-in transactions
    const latestTransaction = nonClockInTransactions.reduce(
      (latest: any, transaction: any) =>
        new Date(transaction.transactionDateTime) > new Date(latest.transactionDateTime)
          ? transaction
          : latest
    );

    console.log("Using latest non-clock-in transaction:", latestTransaction);

    return extractTime(latestTransaction.transactionDateTime);
  }

  // If only one transaction exists and it's type 1, use it
  const clockInTransaction = transactions.find(
    (transaction: any) => transaction.transactionType === 1
  );

  if (clockInTransaction) {
    console.log("Using clock-in transaction:", clockInTransaction);
    return extractTime(clockInTransaction.transactionDateTime);
  }

  // If no valid transactions are found, return null
  return null;
};

/**
 * Helper function to extract time in HH:mm:ss format from a datetime string.
 */
const extractTime = (dateTime: string): string => {
  const date = new Date(dateTime);

  // Extract the time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  console.log("Extracted Time:", formattedTime);

  return formattedTime;
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