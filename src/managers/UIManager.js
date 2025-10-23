/**
 * UIManager
 * Handles UI interactions, panels, search, and battle details display
 */

import { formatDate, getOutcomeClass } from '../utils/helpers.js';

export class UIManager {
    constructor(battleData, mapManager) {
        this.battleData = battleData;
        this.mapManager = mapManager;
        this.onBattleSelect = null;
        this.onRandomBattle = null;
    }

    /**
     * Initialize UI event listeners
     */
    initialize() {
        // Close panel button
        const closeButton = document.getElementById('close-panel');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hideBattleDetails();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('battle-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Surprise Me button
        const surpriseButton = document.getElementById('surprise-me-btn');
        if (surpriseButton) {
            surpriseButton.addEventListener('click', () => {
                if (this.onRandomBattle) {
                    this.onRandomBattle();
                }
            });
        }

        // Layer controls
        const battlesLayer = document.getElementById('battles-layer');
        if (battlesLayer) {
            battlesLayer.addEventListener('change', (e) => {
                this.mapManager.toggleLayer('battles', e.target.checked);
            });
        }

        const territoriesLayer = document.getElementById('territories-layer');
        if (territoriesLayer) {
            territoriesLayer.addEventListener('change', (e) => {
                this.mapManager.toggleLayer('territories', e.target.checked);
            });
        }
    }

    /**
     * Set callback for battle selection
     * @param {Function} callback - Callback function
     */
    setOnBattleSelect(callback) {
        this.onBattleSelect = callback;
    }

    /**
     * Set callback for random battle
     * @param {Function} callback - Callback function
     */
    setOnRandomBattle(callback) {
        this.onRandomBattle = callback;
    }

    /**
     * Handle search input
     * @param {string} query - Search query
     */
    handleSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (!query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        const filteredBattles = this.battleData.searchBattles(query);
        resultsContainer.innerHTML = '';

        filteredBattles.forEach(battle => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">${battle.name}</div>
                <div class="search-result-date">${formatDate(battle.date)} - ${battle.location}</div>
            `;

            resultItem.addEventListener('click', () => {
                this.mapManager.setView(battle.latitude, battle.longitude, 10);
                this.showBattleDetails(battle);
                resultsContainer.innerHTML = '';
                const searchInput = document.getElementById('battle-search');
                if (searchInput) searchInput.value = '';
            });

            resultsContainer.appendChild(resultItem);
        });
    }

    /**
     * Show battle details panel
     * @param {Object} battle - Battle data
     */
    showBattleDetails(battle) {
        const panel = document.getElementById('battle-info-panel');
        const title = document.getElementById('battle-title');
        const details = document.getElementById('battle-details');

        if (!panel || !title || !details) return;

        title.textContent = battle.name;

        details.innerHTML = `
            <div class="battle-image-container">
                <img src="${battle.image}" alt="${battle.name}" class="battle-image" onerror="this.style.display='none'">
            </div>

            <div class="battle-quick-summary">
                <h4>📚 Quick Summary</h4>
                <p>${battle.quick_summary}</p>
            </div>

            <div class="fun-fact-section">
                <h4>🤔 Fun Fact</h4>
                <p>${battle.fun_fact}</p>
            </div>

            <div class="student-activity-section">
                <h4>🎯 Think About This</h4>
                <p>${battle.student_activity}</p>
            </div>

            <div class="battle-meta">
                <div class="battle-meta-item">
                    <span class="battle-meta-label">📅 Date</span>
                    <span class="battle-meta-value">${formatDate(battle.date)}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">📍 Location</span>
                    <span class="battle-meta-value">${battle.location}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">🏆 Outcome</span>
                    <span class="battle-meta-value outcome-badge ${getOutcomeClass(battle.outcome)}">${battle.outcome}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">⚔️ Theater</span>
                    <span class="battle-meta-value">${battle.theater}</span>
                </div>
            </div>

            <div class="battle-detail-section">
                <h4>💡 Why This Battle Mattered</h4>
                <p>${battle.significance}</p>
            </div>

            <div class="battle-detail-section">
                <h4>📖 What Happened</h4>
                <p>${battle.description}</p>
            </div>

            <div class="casualties-section">
                <h4>⚔️ Battle Cost (Human Lives)</h4>
                <div class="casualties-grid">
                    <div class="casualty-column american">
                        <h5>🇺🇸 American Forces</h5>
                        <p>${battle.casualties_american}</p>
                    </div>
                    <div class="casualty-column british">
                        <h5>🇬🇧 British Forces</h5>
                        <p>${battle.casualties_british}</p>
                    </div>
                </div>
            </div>

            <details class="sources-accordion">
                <summary>📚 Sources for Teachers & Advanced Students</summary>
                <div class="sources-content">
                    <div class="sources-section">
                        <h4>Academic Sources</h4>
                        <ul class="sources-list">
                            ${battle.sources.map(source => `<li>${source}</li>`).join('')}
                        </ul>

                        <h4>Primary Sources</h4>
                        <ul class="primary-sources-list">
                            ${battle.primary_sources.map(source => `<li>${source}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </details>

            <div class="battle-navigation">
                <button class="btn btn--secondary" data-action="random-battle">
                    🎲 Explore Random Battle
                </button>
                <button class="btn btn--primary" data-action="focus-battle" data-battle-name="${battle.name}">
                    🎯 Focus on Map
                </button>
            </div>
        `;

        // Add event listeners for navigation buttons
        const randomBtn = details.querySelector('[data-action="random-battle"]');
        const focusBtn = details.querySelector('[data-action="focus-battle"]');

        if (randomBtn && this.onRandomBattle) {
            randomBtn.addEventListener('click', () => this.onRandomBattle());
        }

        if (focusBtn && this.onBattleSelect) {
            focusBtn.addEventListener('click', () => this.onBattleSelect(battle.name));
        }

        panel.classList.remove('hidden');
        panel.scrollTop = 0; // Scroll to top when new battle is shown
    }

    /**
     * Hide battle details panel
     */
    hideBattleDetails() {
        const panel = document.getElementById('battle-info-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }

    /**
     * Show notification toast
     * @param {string} message - Notification message
     * @param {string} type - Notification type (info, success, error)
     */
    showNotification(message, type = 'info') {
        // Simple notification implementation
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: #333;
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}
