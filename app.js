/**
 * Revolutionary War Interactive Map Application
 * Main orchestrator for the modular application
 *
 * This refactored version uses ES6 modules for better organization:
 * - Reduced from 1,173 lines to under 100 lines
 * - Separated concerns into focused modules
 * - Improved maintainability and testability
 */

import { BattleData } from './src/managers/BattleData.js';
import { MapManager } from './src/managers/MapManager.js';
import { MarkerManager } from './src/managers/MarkerManager.js';
import { TimelineManager } from './src/managers/TimelineManager.js';
import { UIManager } from './src/managers/UIManager.js';
import { DiscoveryManager } from './src/managers/DiscoveryManager.js';

class RevolutionaryWarMap {
    constructor() {
        // Initialize all managers
        this.battleData = new BattleData();
        this.mapManager = new MapManager('map');
        this.markerManager = new MarkerManager(this.mapManager);
        this.timelineManager = new TimelineManager();
        this.uiManager = new UIManager(this.battleData, this.mapManager);
        this.discoveryManager = new DiscoveryManager(this.battleData.getTotalCount());

        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize map
        this.mapManager.initialize();

        // Create all battle markers
        const battles = this.battleData.getAllBattles();
        this.markerManager.createAllMarkers(battles, (battle, marker) => {
            this.handleMarkerClick(battle, marker);
        });

        // Initialize timeline
        this.timelineManager.initialize();
        this.timelineManager.setOnTimelineChange((date) => {
            this.markerManager.updateVisibleMarkers(date);
        });

        // Initialize UI
        this.uiManager.initialize();
        this.uiManager.setOnBattleSelect((battleName) => {
            this.focusOnBattle(battleName);
        });
        this.uiManager.setOnRandomBattle(() => {
            this.showRandomBattle();
        });

        // Initialize discovery progress
        this.discoveryManager.updateProgress();
    }

    /**
     * Handle marker click event
     * @param {Object} battle - Battle data
     * @param {L.Marker} marker - Leaflet marker
     */
    handleMarkerClick(battle, marker) {
        // Mark as discovered
        this.discoveryManager.markAsDiscovered(battle.name);

        // Show battle details
        this.uiManager.showBattleDetails(battle);

        // Add sparkle effect
        this.markerManager.addSparkleEffect(marker);

        // Zoom to battle location
        const currentZoom = this.mapManager.getZoom();
        this.mapManager.setView(
            battle.latitude,
            battle.longitude,
            Math.max(currentZoom, 8),
            true
        );
    }

    /**
     * Focus map on specific battle
     * @param {string} battleName - Name of battle
     */
    focusOnBattle(battleName) {
        const battle = this.battleData.getBattleByName(battleName);
        if (!battle) return;

        this.mapManager.setView(battle.latitude, battle.longitude, 12, true);

        // Find and pulse the marker
        const marker = this.markerManager.findMarkerByBattleName(battleName);
        if (marker) {
            this.markerManager.pulseMarker(marker);
        }
    }

    /**
     * Show random battle
     */
    showRandomBattle() {
        const randomBattle = this.battleData.getRandomBattle();
        this.uiManager.showBattleDetails(randomBattle);
        this.mapManager.setView(randomBattle.latitude, randomBattle.longitude, 10, true);

        // Mark as discovered
        this.discoveryManager.markAsDiscovered(randomBattle.name);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RevolutionaryWarMap();
});
