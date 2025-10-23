/**
 * MarkerManager
 * Handles battle marker creation, styling, and interactions
 */

import { getMarkerColor, getOutcomeClass, formatDate } from '../utils/helpers.js';

export class MarkerManager {
    constructor(mapManager) {
        this.mapManager = mapManager;
        this.markers = [];
    }

    /**
     * Create a battle marker
     * @param {Object} battle - Battle data
     * @param {Function} onMarkerClick - Click handler
     * @returns {L.CircleMarker} Leaflet marker
     */
    createBattleMarker(battle, onMarkerClick) {
        const color = getMarkerColor(battle.outcome);

        const marker = L.circleMarker([battle.latitude, battle.longitude], {
            radius: 12,
            fillColor: color,
            color: '#ffffff',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.85,
            className: 'battle-marker',
            pane: 'markerPane'
        });

        // Create popup content
        const popupContent = `
            <div class="popup-title">${battle.name}</div>
            <div class="popup-date">${formatDate(battle.date)}</div>
            <div class="popup-outcome ${getOutcomeClass(battle.outcome)}">${battle.outcome}</div>
            <div class="popup-quick-summary">${battle.quick_summary}</div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup',
            closeButton: true
        });

        // Single click handler for the marker
        marker.on('click', (e) => {
            e.originalEvent.stopPropagation();
            if (onMarkerClick) {
                onMarkerClick(battle, marker);
            }
        });

        // Bind tooltip
        marker.bindTooltip(battle.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -10],
            className: 'battle-tooltip'
        });

        // Enhanced hover effects
        marker.on('mouseover', (e) => {
            e.originalEvent.stopPropagation();
            marker.setStyle({
                radius: 15,
                weight: 5,
                fillOpacity: 1,
                className: 'battle-marker battle-marker-hover'
            });
            marker.openTooltip();
        });

        marker.on('mouseout', () => {
            marker.setStyle({
                radius: 12,
                weight: 4,
                fillOpacity: 0.85,
                className: 'battle-marker'
            });
            marker.closeTooltip();
        });

        // Store battle data with marker
        marker.battleData = battle;
        marker.battleDate = new Date(battle.date);

        return marker;
    }

    /**
     * Create markers for all battles
     * @param {Array} battles - Array of battle data
     * @param {Function} onMarkerClick - Click handler
     */
    createAllMarkers(battles, onMarkerClick) {
        this.markers = battles.map(battle => {
            const marker = this.createBattleMarker(battle, onMarkerClick);
            this.mapManager.addBattleMarker(marker);
            return marker;
        });
    }

    /**
     * Get all markers
     * @returns {Array} Array of markers
     */
    getAllMarkers() {
        return this.markers;
    }

    /**
     * Find marker by battle name
     * @param {string} battleName - Battle name
     * @returns {L.Marker|undefined} Marker object
     */
    findMarkerByBattleName(battleName) {
        return this.markers.find(m => m.battleData.name === battleName);
    }

    /**
     * Pulse marker animation
     * @param {L.Marker} marker - Marker to pulse
     */
    pulseMarker(marker) {
        let pulseCount = 0;
        const originalRadius = marker.options.radius;

        const pulse = () => {
            if (pulseCount < 6) {
                marker.setStyle({
                    radius: pulseCount % 2 === 0 ? originalRadius + 5 : originalRadius
                });
                pulseCount++;
                setTimeout(pulse, 300);
            } else {
                marker.setStyle({ radius: originalRadius });
            }
        };

        pulse();
    }

    /**
     * Add sparkle effect to marker
     * @param {L.Marker} marker - Marker to sparkle
     */
    addSparkleEffect(marker) {
        const sparkle = L.circleMarker(marker.getLatLng(), {
            radius: 15,
            fillColor: '#FFD700',
            color: '#FFA500',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.6,
            className: 'sparkle-effect'
        });

        this.mapManager.getBattleLayer().addLayer(sparkle);

        setTimeout(() => {
            this.mapManager.getBattleLayer().removeLayer(sparkle);
        }, 1000);
    }

    /**
     * Update visible markers based on timeline
     * @param {Date} currentDate - Current timeline date
     */
    updateVisibleMarkers(currentDate) {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        this.markers.forEach(marker => {
            const battleMonth = marker.battleDate.getMonth();
            const battleYear = marker.battleDate.getFullYear();

            // Show marker if its date is in or before the current timeline month/year
            if (battleYear < currentYear || (battleYear === currentYear && battleMonth <= currentMonth)) {
                if (!this.mapManager.getBattleLayer().hasLayer(marker)) {
                    this.mapManager.addBattleMarker(marker);
                }
            } else {
                if (this.mapManager.getBattleLayer().hasLayer(marker)) {
                    this.mapManager.removeBattleMarker(marker);
                }
            }
        });
    }
}
