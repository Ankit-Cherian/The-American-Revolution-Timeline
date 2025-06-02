// Revolutionary War Interactive Map Application
class RevolutionaryWarMap {
    constructor() {
        this.map = null;
        this.battleMarkers = [];
        this.territoryLayers = [];
        this.currentTimelineIndex = 0;
        this.isPlaying = false;
        this.playInterval = null;
        
        // Battle data from research
        this.battles = [
            {
                name: "Battles of Lexington and Concord",
                date: "1775-04-19",
                location: "Massachusetts",
                latitude: 42.4431,
                longitude: -71.2252,
                outcome: "American victory",
                significance: "First battles of the Revolutionary War",
                casualties_american: "49 killed, 39 wounded, 5 missing",
                casualties_british: "73 killed, 174 wounded, 53 missing",
                description: "British forces raiding Concord driven back into Boston with heavy losses. This engagement marked the beginning of armed conflict between British troops and colonial militiamen.",
                theater: "Boston Campaign",
                sources: ["Peckham, Howard H. The Toll of Independence", "Fischer, David Hackett. Paul Revere's Ride"],
                primary_sources: ["Massachusetts Historical Society Archives", "Letter from General Gage to Lord Dartmouth"]
            },
            {
                name: "Capture of Fort Ticonderoga",
                date: "1775-05-10",
                location: "New York",
                latitude: 43.8370,
                longitude: -73.3934,
                outcome: "American victory",
                significance: "First offensive American action; captured crucial artillery",
                casualties_american: "No casualties",
                casualties_british: "1 wounded, 48 captured",
                description: "Ethan Allen's Green Mountain Boys and Benedict Arnold captured this strategic fort, providing the Continental Army with much-needed artillery.",
                theater: "Northern Campaign",
                sources: ["Randall, Willard Sterne. Ethan Allen", "Martin, James Kirby. Benedict Arnold"],
                primary_sources: ["Ethan Allen's narrative", "Continental Congress records"]
            },
            {
                name: "Battle of Bunker Hill",
                date: "1775-06-17",
                location: "Massachusetts",
                latitude: 42.3758,
                longitude: -71.0616,
                outcome: "British victory",
                significance: "Demonstrated American ability to stand against regular troops despite ultimate retreat",
                casualties_american: "115 killed, 305 wounded, 30 captured",
                casualties_british: "226 killed, 828 wounded",
                description: "British forces eventually captured Breed's Hill and Bunker Hill but suffered devastating casualties, proving American militia could inflict serious damage on professional British troops.",
                theater: "Boston Campaign",
                sources: ["Philbrick, Nathaniel. Bunker Hill", "Ketchum, Richard M. Decisive Day"],
                primary_sources: ["John Adams letters", "British Army dispatches", "Peter Salem testimony"]
            },
            {
                name: "Battle of Trenton",
                date: "1776-12-26",
                location: "New Jersey",
                latitude: 40.2180,
                longitude: -74.7550,
                outcome: "American victory",
                significance: "Restored American morale after defeats in New York",
                casualties_american: "2 killed, 5 wounded",
                casualties_british: "22 killed, 83 wounded, 896 captured",
                description: "Washington's surprise attack across the Delaware River captured the Hessian garrison and revitalized the American cause during its darkest hour.",
                theater: "New York and New Jersey Campaign",
                sources: ["Fischer, David Hackett. Washington's Crossing", "McCullough, David. 1776"],
                primary_sources: ["Washington's field reports", "Hessian officer accounts", "Pennsylvania Evening Post"]
            },
            {
                name: "Battle of Princeton",
                date: "1777-01-03",
                location: "New Jersey",
                latitude: 40.3573,
                longitude: -74.6519,
                outcome: "American victory",
                significance: "Confirmed American resurgence after Trenton",
                casualties_american: "25 killed, 40 wounded",
                casualties_british: "28 killed, 58 wounded, 323 captured",
                description: "Following up on the Trenton victory, Washington defeated British forces at Princeton, forcing them to abandon most of New Jersey.",
                theater: "New York and New Jersey Campaign",
                sources: ["Stryker, William S. The Battles of Trenton and Princeton", "Wood, Gordon S. The American Revolution"],
                primary_sources: ["Washington's correspondence", "Continental Army orderly books"]
            },
            {
                name: "Battle of Brandywine",
                date: "1777-09-11",
                location: "Pennsylvania",
                latitude: 39.9342,
                longitude: -75.5637,
                outcome: "British victory",
                significance: "Opened the path to Philadelphia for British forces",
                casualties_american: "200 killed, 500 wounded, 400 captured",
                casualties_british: "90 killed, 480 wounded",
                description: "General Howe outflanked Washington's army, leading to American retreat and eventual British occupation of Philadelphia.",
                theater: "Philadelphia Campaign",
                sources: ["McGuire, Thomas J. The Philadelphia Campaign", "Taafe, Stephen R. The Philadelphia Campaign"],
                primary_sources: ["Marquis de Lafayette memoirs", "British Army reports"]
            },
            {
                name: "Battle of Saratoga",
                date: "1777-10-07",
                location: "New York",
                latitude: 43.0642,
                longitude: -73.6370,
                outcome: "American victory",
                significance: "Convinced France to formally enter the war as American ally",
                casualties_american: "150 killed and wounded",
                casualties_british: "440 killed and wounded, 6,222 surrendered",
                description: "General Burgoyne's surrender marked the turning point of the war, bringing France into the conflict and internationalizing the struggle.",
                theater: "Saratoga Campaign",
                sources: ["Ketchum, Richard M. Saratoga", "Mintz, Max M. The Generals of Saratoga"],
                primary_sources: ["Burgoyne's surrender terms", "Gates correspondence", "French diplomatic archives"]
            },
            {
                name: "Battle of Monmouth",
                date: "1778-06-28",
                location: "New Jersey",
                latitude: 40.2968,
                longitude: -74.3171,
                outcome: "Tactical draw, strategic American victory",
                significance: "Demonstrated improved Continental Army training from Valley Forge",
                casualties_american: "106 killed, 161 wounded",
                casualties_british: "147 killed, 170 wounded",
                description: "The Continental Army's performance showed the effectiveness of Baron von Steuben's training during the winter at Valley Forge.",
                theater: "Northern Theater",
                sources: ["Stryker, William S. The Battle of Monmouth", "Spring, Matthew H. With Zeal and With Bayonets Only"],
                primary_sources: ["Court martial records", "Washington's general orders", "Molly Pitcher legend accounts"]
            },
            {
                name: "Siege of Charleston",
                date: "1780-05-12",
                location: "South Carolina",
                latitude: 32.7767,
                longitude: -79.9311,
                outcome: "British victory",
                significance: "Largest American surrender until the Civil War",
                casualties_american: "89 killed, 138 wounded, 5,266 captured",
                casualties_british: "76 killed, 182 wounded",
                description: "General Lincoln's surrender of Charleston gave the British control of the largest port in the South and thousands of Continental soldiers.",
                theater: "Southern Campaign",
                sources: ["Pancake, John S. This Destructive War", "Edgar, Walter. South Carolina"],
                primary_sources: ["Clinton's dispatches", "Siege diary of Johann Ewald"]
            },
            {
                name: "Battle of Kings Mountain",
                date: "1780-10-07",
                location: "South Carolina",
                latitude: 35.1398,
                longitude: -81.3851,
                outcome: "American victory",
                significance: "Destroyed Loyalist militia and halted British advance into North Carolina",
                casualties_american: "28 killed, 62 wounded",
                casualties_british: "157 killed, 163 wounded, 698 captured",
                description: "Overmountain Men defeated Major Patrick Ferguson's Loyalist force, eliminating organized Loyalist resistance in the backcountry.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "Draper, Lyman. King's Mountain and Its Heroes"],
                primary_sources: ["Isaac Shelby accounts", "William Campbell reports"]
            },
            {
                name: "Battle of Cowpens",
                date: "1781-01-17",
                location: "South Carolina",
                latitude: 35.1320,
                longitude: -81.8101,
                outcome: "American victory",
                significance: "Tactical masterpiece that crippled British light infantry",
                casualties_american: "25 killed, 124 wounded",
                casualties_british: "110 killed, 229 wounded, 525 captured",
                description: "Daniel Morgan's tactical brilliance destroyed Banastre Tarleton's elite force and demonstrated American military maturity.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "Babits, Lawrence E. A Devil of a Whipping"],
                primary_sources: ["Morgan's battle report", "Tarleton's memoirs"]
            },
            {
                name: "Battle of Guilford Courthouse",
                date: "1781-03-15",
                location: "North Carolina",
                latitude: 36.1349,
                longitude: -79.8414,
                outcome: "British tactical victory, American strategic victory",
                significance: "Pyrrhic British victory that weakened Cornwallis's army",
                casualties_american: "79 killed, 185 wounded",
                casualties_british: "93 killed, 413 wounded",
                description: "Though Cornwallis held the field, his heavy casualties forced him to abandon the Carolinas and march to Virginia.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "Goldsborough, Robert. The Carolina Backcountry"],
                primary_sources: ["Cornwallis correspondence", "Nathanael Greene reports"]
            },
            {
                name: "Siege of Yorktown",
                date: "1781-10-19",
                location: "Virginia",
                latitude: 37.2393,
                longitude: -76.5107,
                outcome: "Franco-American victory",
                significance: "Final major battle that effectively ended the war",
                casualties_american: "88 killed and wounded",
                casualties_british: "156 killed, 326 wounded, 7,416 surrendered",
                description: "Combined Franco-American forces besieged Cornwallis at Yorktown. His surrender effectively ended major combat operations and led to British negotiations for peace.",
                theater: "Yorktown Campaign",
                sources: ["Ketchum, Richard M. Victory at Yorktown", "Fleming, Thomas. The Perils of Peace"],
                primary_sources: ["Articles of Capitulation", "Washington's dispatches", "French naval records", "Cornwallis surrender speech"]
            }
        ];

        // Generate timeline dates (monthly from April 1775 to October 1783)
        this.timelineDates = this.generateTimelineDates();
        
        this.init();
    }

    generateTimelineDates() {
        const dates = [];
        const startDate = new Date(1775, 3, 1); // April 1775
        const endDate = new Date(1783, 9, 31);  // October 1783
        
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return dates;
    }

    init() {
        this.initializeMap();
        this.loadBattleMarkers();
        this.setupEventListeners();
        this.updateTimelineDisplay();
    }

    initializeMap() {
        // Initialize map centered on colonial America
        this.map = L.map('map').setView([39.5, -76.0], 6);

        // Add base tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Create layer groups
        this.battleLayerGroup = L.layerGroup().addTo(this.map);
        this.territoryLayerGroup = L.layerGroup().addTo(this.map);
    }

    getMarkerColor(outcome) {
        if (outcome.toLowerCase().includes('american')) return '#1FB8CD';
        if (outcome.toLowerCase().includes('british')) return '#B4413C';
        return '#D2BA4C'; // Draw or other outcomes
    }

    getOutcomeClass(outcome) {
        if (outcome.toLowerCase().includes('american')) return 'american-victory';
        if (outcome.toLowerCase().includes('british')) return 'british-victory';
        return 'draw';
    }

    createBattleMarker(battle) {
        const color = this.getMarkerColor(battle.outcome);
        
        const marker = L.circleMarker([battle.latitude, battle.longitude], {
            radius: 8,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });

        const popupContent = `
            <div class="popup-title">${battle.name}</div>
            <div class="popup-date">${this.formatDate(battle.date)}</div>
            <div class="popup-outcome ${this.getOutcomeClass(battle.outcome)}">${battle.outcome}</div>
        `;

        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
            this.showBattleDetails(battle);
        });

        // Store battle data with marker
        marker.battleData = battle;
        marker.battleDate = new Date(battle.date);

        return marker;
    }

    loadBattleMarkers() {
        this.battles.forEach(battle => {
            const marker = this.createBattleMarker(battle);
            this.battleMarkers.push(marker);
            this.battleLayerGroup.addLayer(marker);
        });
    }

    updateVisibleBattles() {
        const currentDate = this.timelineDates[this.currentTimelineIndex];
        
        this.battleMarkers.forEach(marker => {
            if (marker.battleDate <= currentDate) {
                if (!this.battleLayerGroup.hasLayer(marker)) {
                    this.battleLayerGroup.addLayer(marker);
                }
            } else {
                if (this.battleLayerGroup.hasLayer(marker)) {
                    this.battleLayerGroup.removeLayer(marker);
                }
            }
        });
    }

    setupEventListeners() {
        // Timeline slider
        const timelineSlider = document.getElementById('timeline-slider');
        timelineSlider.addEventListener('input', (e) => {
            this.currentTimelineIndex = parseInt(e.target.value);
            this.updateTimelineDisplay();
            this.updateVisibleBattles();
        });

        // Play/pause timeline
        const playButton = document.getElementById('play-timeline');
        playButton.addEventListener('click', () => {
            this.toggleTimelinePlay();
        });

        // Layer controls
        document.getElementById('battles-layer').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.addLayer(this.battleLayerGroup);
            } else {
                this.map.removeLayer(this.battleLayerGroup);
            }
        });

        document.getElementById('territories-layer').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.map.addLayer(this.territoryLayerGroup);
            } else {
                this.map.removeLayer(this.territoryLayerGroup);
            }
        });

        // Search functionality
        const searchInput = document.getElementById('battle-search');
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Close battle info panel
        document.getElementById('close-panel').addEventListener('click', () => {
            this.hideBattleDetails();
        });
    }

    updateTimelineDisplay() {
        const currentDate = this.timelineDates[this.currentTimelineIndex];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dateString = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        document.getElementById('current-date').textContent = dateString;
    }

    toggleTimelinePlay() {
        const playButton = document.getElementById('play-timeline');
        
        if (this.isPlaying) {
            clearInterval(this.playInterval);
            this.isPlaying = false;
            playButton.textContent = '▶ Play Timeline';
        } else {
            this.isPlaying = true;
            playButton.textContent = '⏸ Pause Timeline';
            
            this.playInterval = setInterval(() => {
                if (this.currentTimelineIndex < this.timelineDates.length - 1) {
                    this.currentTimelineIndex++;
                    document.getElementById('timeline-slider').value = this.currentTimelineIndex;
                    this.updateTimelineDisplay();
                    this.updateVisibleBattles();
                } else {
                    this.toggleTimelinePlay(); // Stop at end
                }
            }, 500); // Advance every 500ms
        }
    }

    performSearch(query) {
        const resultsContainer = document.getElementById('search-results');
        
        if (!query.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        const filteredBattles = this.battles.filter(battle => 
            battle.name.toLowerCase().includes(query.toLowerCase()) ||
            battle.location.toLowerCase().includes(query.toLowerCase()) ||
            battle.theater.toLowerCase().includes(query.toLowerCase())
        );

        resultsContainer.innerHTML = '';
        
        filteredBattles.forEach(battle => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">${battle.name}</div>
                <div class="search-result-date">${this.formatDate(battle.date)} - ${battle.location}</div>
            `;
            
            resultItem.addEventListener('click', () => {
                this.map.setView([battle.latitude, battle.longitude], 10);
                this.showBattleDetails(battle);
                resultsContainer.innerHTML = '';
                document.getElementById('battle-search').value = '';
            });
            
            resultsContainer.appendChild(resultItem);
        });
    }

    showBattleDetails(battle) {
        const panel = document.getElementById('battle-info-panel');
        const title = document.getElementById('battle-title');
        const details = document.getElementById('battle-details');

        title.textContent = battle.name;

        details.innerHTML = `
            <div class="battle-meta">
                <div class="battle-meta-item">
                    <span class="battle-meta-label">Date</span>
                    <span class="battle-meta-value">${this.formatDate(battle.date)}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">Location</span>
                    <span class="battle-meta-value">${battle.location}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">Outcome</span>
                    <span class="battle-meta-value">${battle.outcome}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">Theater</span>
                    <span class="battle-meta-value">${battle.theater}</span>
                </div>
            </div>

            <div class="battle-detail-section">
                <h4>Significance</h4>
                <p>${battle.significance}</p>
            </div>

            <div class="battle-detail-section">
                <h4>Description</h4>
                <p>${battle.description}</p>
            </div>

            <div class="casualties-section">
                <h4>Casualties</h4>
                <div class="casualties-grid">
                    <div class="casualty-column">
                        <h5>American Forces</h5>
                        <p>${battle.casualties_american}</p>
                    </div>
                    <div class="casualty-column">
                        <h5>British Forces</h5>
                        <p>${battle.casualties_british}</p>
                    </div>
                </div>
            </div>

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
        `;

        panel.classList.remove('hidden');
    }

    hideBattleDetails() {
        document.getElementById('battle-info-panel').classList.add('hidden');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RevolutionaryWarMap();
});