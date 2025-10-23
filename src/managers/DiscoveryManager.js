/**
 * DiscoveryManager
 * Handles battle discovery tracking and achievements
 */

export class DiscoveryManager {
    constructor(totalBattles) {
        this.discoveredBattles = new Set();
        this.totalBattles = totalBattles;
    }

    /**
     * Mark a battle as discovered
     * @param {string} battleName - Name of the battle
     * @returns {boolean} Whether this is a new discovery
     */
    markAsDiscovered(battleName) {
        const isNewDiscovery = !this.discoveredBattles.has(battleName);

        if (isNewDiscovery) {
            this.discoveredBattles.add(battleName);
            this.updateProgress();
            this.checkAchievements();
        }

        return isNewDiscovery;
    }

    /**
     * Check if a battle has been discovered
     * @param {string} battleName - Name of the battle
     * @returns {boolean} Whether battle is discovered
     */
    isDiscovered(battleName) {
        return this.discoveredBattles.has(battleName);
    }

    /**
     * Get number of discovered battles
     * @returns {number} Count of discovered battles
     */
    getDiscoveredCount() {
        return this.discoveredBattles.size;
    }

    /**
     * Get discovery percentage
     * @returns {number} Percentage (0-100)
     */
    getDiscoveryPercentage() {
        return (this.discoveredBattles.size / this.totalBattles) * 100;
    }

    /**
     * Update progress display
     */
    updateProgress() {
        const progressBar = document.getElementById('discovery-progress');
        const progressText = document.getElementById('discovery-text');

        if (progressBar && progressText) {
            const percentage = this.getDiscoveryPercentage();
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `Discovered: ${this.discoveredBattles.size}/${this.totalBattles} battles`;
        }
    }

    /**
     * Check for achievements and show notifications
     */
    checkAchievements() {
        const count = this.discoveredBattles.size;

        if (count === 1) {
            this.showAchievement("First Discovery!", "You've found your first battle! Keep exploring to learn more.");
        } else if (count === 5) {
            this.showAchievement("Battle Historian!", "You've discovered 5 battles. You're becoming a real expert!");
        } else if (count === 10) {
            this.showAchievement("Revolutionary Scholar!", "10 battles discovered! You know your history!");
        } else if (count === 20) {
            this.showAchievement("History Expert!", "20 battles! You're a true Revolutionary War expert!");
        } else if (count === this.totalBattles) {
            this.showAchievement("Revolutionary War Master!", "Amazing! You've explored every battle in the war!");
        }
    }

    /**
     * Show achievement notification
     * @param {string} title - Achievement title
     * @param {string} message - Achievement message
     */
    showAchievement(title, message) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-notification';
        achievement.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">${title}</div>
                <div class="achievement-message">${message}</div>
            </div>
        `;

        document.body.appendChild(achievement);

        setTimeout(() => {
            achievement.classList.add('show');
        }, 100);

        setTimeout(() => {
            achievement.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(achievement)) {
                    document.body.removeChild(achievement);
                }
            }, 300);
        }, 4000);
    }

    /**
     * Reset all progress
     */
    reset() {
        this.discoveredBattles.clear();
        this.updateProgress();
    }

    /**
     * Get all discovered battles
     * @returns {Set} Set of discovered battle names
     */
    getAllDiscovered() {
        return new Set(this.discoveredBattles);
    }

    /**
     * Load progress from storage (if implementing persistence)
     * @param {Array} discoveredNames - Array of discovered battle names
     */
    loadProgress(discoveredNames) {
        this.discoveredBattles = new Set(discoveredNames);
        this.updateProgress();
    }

    /**
     * Save progress to storage (returns data to save)
     * @returns {Array} Array of discovered battle names
     */
    saveProgress() {
        return Array.from(this.discoveredBattles);
    }
}
