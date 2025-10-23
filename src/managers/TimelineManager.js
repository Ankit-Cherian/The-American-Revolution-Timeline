/**
 * TimelineManager
 * Handles timeline controls and playback
 */

import { generateTimelineDates, formatTimelineDate } from '../utils/helpers.js';

export class TimelineManager {
    constructor() {
        this.timelineDates = generateTimelineDates();
        this.currentIndex = 0;
        this.isPlaying = false;
        this.playInterval = null;
        this.onTimelineChange = null;
    }

    /**
     * Initialize timeline UI
     */
    initialize() {
        const slider = document.getElementById('timeline-slider');
        if (slider) {
            slider.max = this.timelineDates.length - 1;
            slider.value = 0;

            slider.addEventListener('input', (e) => {
                this.setCurrentIndex(parseInt(e.target.value));
            });
        }

        const playButton = document.getElementById('play-timeline');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.togglePlay();
            });
        }

        this.updateDisplay();
    }

    /**
     * Set callback for timeline changes
     * @param {Function} callback - Callback function
     */
    setOnTimelineChange(callback) {
        this.onTimelineChange = callback;
    }

    /**
     * Get current timeline date
     * @returns {Date} Current date
     */
    getCurrentDate() {
        return this.timelineDates[this.currentIndex];
    }

    /**
     * Set current timeline index
     * @param {number} index - New index
     */
    setCurrentIndex(index) {
        this.currentIndex = index;
        this.updateDisplay();

        if (this.onTimelineChange) {
            this.onTimelineChange(this.getCurrentDate());
        }
    }

    /**
     * Update timeline display
     */
    updateDisplay() {
        const currentDate = this.getCurrentDate();
        const dateElement = document.getElementById('current-date');

        if (dateElement) {
            dateElement.textContent = formatTimelineDate(currentDate);
        }
    }

    /**
     * Toggle timeline playback
     */
    togglePlay() {
        const playButton = document.getElementById('play-timeline');

        if (this.isPlaying) {
            this.stop();
            if (playButton) {
                playButton.textContent = '▶ Play Timeline';
            }
        } else {
            this.play();
            if (playButton) {
                playButton.textContent = '⏸ Pause Timeline';
            }
        }
    }

    /**
     * Start timeline playback
     */
    play() {
        this.isPlaying = true;

        this.playInterval = setInterval(() => {
            if (this.currentIndex < this.timelineDates.length - 1) {
                this.currentIndex++;
                const slider = document.getElementById('timeline-slider');
                if (slider) {
                    slider.value = this.currentIndex;
                }
                this.updateDisplay();

                if (this.onTimelineChange) {
                    this.onTimelineChange(this.getCurrentDate());
                }
            } else {
                this.togglePlay(); // Stop at end
            }
        }, 500); // Advance every 500ms
    }

    /**
     * Stop timeline playback
     */
    stop() {
        this.isPlaying = false;
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    /**
     * Reset timeline to start
     */
    reset() {
        this.stop();
        this.setCurrentIndex(0);
        const slider = document.getElementById('timeline-slider');
        if (slider) {
            slider.value = 0;
        }
    }

    /**
     * Get all timeline dates
     * @returns {Date[]} Array of dates
     */
    getAllDates() {
        return this.timelineDates;
    }

    /**
     * Get current index
     * @returns {number} Current index
     */
    getCurrentIndex() {
        return this.currentIndex;
    }
}
