
export const formatDate = () => {
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

export const formatTotalWorkingTime = (totalHours) => {
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const seconds = Math.floor(((totalHours - hours) * 60 - minutes) * 60);

    if (hours > 0) {
        return `${hours} Hrs ${minutes} Min`;
    } else if (minutes > 0) {
        return `${minutes} Min ${seconds > 0 ? seconds + ' Sec' : ''}`;
    } else {
        return `${seconds} Sec`;
    }
};

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
        return `${hours} Hrs ${minutes} Min`;
    }

    return `${minutes} Min`;
};