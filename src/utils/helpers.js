/**
 * Utility helper functions
 * Shared utilities used across the application
 */

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get marker color based on battle outcome
 * @param {string} outcome - Battle outcome string
 * @returns {string} Color hex code
 */
export function getMarkerColor(outcome) {
    if (outcome.toLowerCase().includes('american')) return '#1FB8CD';
    if (outcome.toLowerCase().includes('british')) return '#B4413C';
    return '#D2BA4C'; // Draw or other outcomes
}

/**
 * Get CSS class for battle outcome
 * @param {string} outcome - Battle outcome string
 * @returns {string} CSS class name
 */
export function getOutcomeClass(outcome) {
    if (outcome.toLowerCase().includes('american')) return 'american-victory';
    if (outcome.toLowerCase().includes('british')) return 'british-victory';
    return 'draw';
}

/**
 * Generate timeline dates from start to end
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Date[]} Array of monthly dates
 */
export function generateTimelineDates(startDate = new Date(1775, 3, 1), endDate = new Date(1783, 9, 31)) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dates;
}

/**
 * Get month name from date
 * @param {Date} date - Date object
 * @returns {string} Month name
 */
export function getMonthName(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[date.getMonth()];
}

/**
 * Format date for timeline display
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export function formatTimelineDate(date) {
    return `${getMonthName(date)} ${date.getFullYear()}`;
}

/**
 * Create HTML element from string
 * @param {string} html - HTML string
 * @returns {Element} DOM element
 */
export function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
