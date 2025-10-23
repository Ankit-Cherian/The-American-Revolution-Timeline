/**
 * BattleData Manager
 * Handles loading and filtering of battle data
 */

import { battles } from '../../data/battles.js';

export class BattleData {
    constructor() {
        this.battles = battles;
    }

    /**
     * Get all battles
     * @returns {Array} All battle objects
     */
    getAllBattles() {
        return this.battles;
    }

    /**
     * Get battle by name
     * @param {string} name - Battle name
     * @returns {Object|undefined} Battle object
     */
    getBattleByName(name) {
        return this.battles.find(b => b.name === name);
    }

    /**
     * Search battles by query
     * @param {string} query - Search query
     * @returns {Array} Filtered battles
     */
    searchBattles(query) {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        return this.battles.filter(battle =>
            battle.name.toLowerCase().includes(lowerQuery) ||
            battle.location.toLowerCase().includes(lowerQuery) ||
            battle.theater.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get battles within date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Array} Battles within range
     */
    getBattlesByDateRange(startDate, endDate) {
        return this.battles.filter(battle => {
            const battleDate = new Date(battle.date);
            return battleDate >= startDate && battleDate <= endDate;
        });
    }

    /**
     * Get battles by theater
     * @param {string} theater - Theater name
     * @returns {Array} Battles in theater
     */
    getBattlesByTheater(theater) {
        return this.battles.filter(battle =>
            battle.theater.toLowerCase().includes(theater.toLowerCase())
        );
    }

    /**
     * Get random battle
     * @returns {Object} Random battle object
     */
    getRandomBattle() {
        return this.battles[Math.floor(Math.random() * this.battles.length)];
    }

    /**
     * Get total battle count
     * @returns {number} Number of battles
     */
    getTotalCount() {
        return this.battles.length;
    }

    /**
     * Get battles sorted by date
     * @returns {Array} Sorted battles
     */
    getBattlesSortedByDate() {
        return [...this.battles].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}
