/**
 * MapManager
 * Handles Leaflet map initialization and operations
 */

export class MapManager {
    constructor(mapElementId = 'map') {
        this.mapElementId = mapElementId;
        this.map = null;
        this.battleLayerGroup = null;
        this.territoryLayerGroup = null;
    }

    /**
     * Initialize the Leaflet map
     */
    initialize() {
        // Initialize map centered on colonial America
        this.map = L.map(this.mapElementId, {
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            touchZoom: true,
            boxZoom: true,
            keyboard: true,
            dragging: true,
            tap: true,
            tapTolerance: 15, // Increase tap tolerance for better mobile experience
            zoomSnap: 0.5,
            zoomDelta: 0.5
        }).setView([39.5, -76.0], 6);

        // Add base tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Create layer groups
        this.battleLayerGroup = L.layerGroup().addTo(this.map);
        this.territoryLayerGroup = L.layerGroup().addTo(this.map);

        return this.map;
    }

    /**
     * Get the map instance
     * @returns {L.Map} Leaflet map instance
     */
    getMap() {
        return this.map;
    }

    /**
     * Get battle layer group
     * @returns {L.LayerGroup} Battle markers layer
     */
    getBattleLayer() {
        return this.battleLayerGroup;
    }

    /**
     * Get territory layer group
     * @returns {L.LayerGroup} Territory layer
     */
    getTerritoryLayer() {
        return this.territoryLayerGroup;
    }

    /**
     * Set map view to specific location
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @param {number} zoom - Zoom level
     * @param {boolean} animate - Whether to animate
     */
    setView(lat, lng, zoom, animate = true) {
        const options = animate ? { animate: true, duration: 0.5 } : {};
        this.map.setView([lat, lng], zoom, options);
    }

    /**
     * Toggle layer visibility
     * @param {string} layerType - 'battles' or 'territories'
     * @param {boolean} visible - Show or hide
     */
    toggleLayer(layerType, visible) {
        const layer = layerType === 'battles' ? this.battleLayerGroup : this.territoryLayerGroup;

        if (visible) {
            this.map.addLayer(layer);
        } else {
            this.map.removeLayer(layer);
        }
    }

    /**
     * Add marker to battle layer
     * @param {L.Marker} marker - Leaflet marker
     */
    addBattleMarker(marker) {
        this.battleLayerGroup.addLayer(marker);
    }

    /**
     * Remove marker from battle layer
     * @param {L.Marker} marker - Leaflet marker
     */
    removeBattleMarker(marker) {
        this.battleLayerGroup.removeLayer(marker);
    }

    /**
     * Close all popups
     */
    closePopups() {
        this.map.closePopup();
    }

    /**
     * Get current zoom level
     * @returns {number} Current zoom
     */
    getZoom() {
        return this.map.getZoom();
    }
}
