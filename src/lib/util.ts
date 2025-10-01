

export function formatTimeAgo(timestampInMs: number) {
    // 1. Calculate the difference in seconds
    const nowInMs = Date.now();
    const seconds = Math.floor(Math.abs((nowInMs - timestampInMs) / 1000));

    let value;
    let unit;

    const SEC_IN_MIN = 60;
    const SEC_IN_HOUR = 3600;
    const SEC_IN_DAY = 86400;
    const SEC_IN_MONTH = 2592000; // Approx. 30 days
    const SEC_IN_YEAR = 31536000; // Approx. 365 days

    // 2. Determine the appropriate unit
    if (seconds < 5) {
        return "just now";
    } else if (seconds < SEC_IN_MIN) {
        value = seconds;
        unit = 'second';
    } else if (seconds < SEC_IN_HOUR) {
        value = Math.round(seconds / SEC_IN_MIN);
        unit = 'minute';
    } else if (seconds < SEC_IN_DAY) {
        value = Math.round(seconds / SEC_IN_HOUR);
        unit = 'hour';
    } else if (seconds < SEC_IN_MONTH) {
        value = Math.round(seconds / SEC_IN_DAY);
        unit = 'day';
    } else if (seconds < SEC_IN_YEAR) {
        value = Math.round(seconds / SEC_IN_MONTH);
        unit = 'month';
    } else {
        value = Math.round(seconds / SEC_IN_YEAR);
        unit = 'year';
    }

    const plural = value === 1 ? '' : 's';

    // 3. Determine if it was "ago" (past) or "from now" (future)
    const suffix = (nowInMs - timestampInMs) > 0 ? ' ago' : ' from now';

    return `${value} ${unit}${plural}${suffix}`;
}