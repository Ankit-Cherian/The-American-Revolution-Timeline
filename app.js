// Revolutionary War Interactive Map Application - V2.0 Enhanced for Students
class RevolutionaryWarMap {
    constructor() {
        this.map = null;
        this.battleMarkers = [];
        this.territoryLayers = [];
        this.currentTimelineIndex = 0;
        this.isPlaying = false;
        this.playInterval = null;
        this.discoveredBattles = new Set(); // Track which battles students have explored
        
        // Battle data from research - Enhanced with images and fun facts
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
                primary_sources: ["Massachusetts Historical Society Archives", "Letter from General Gage to Lord Dartmouth"],
                image: "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B71F36729B9C9D5.jpg",
                fun_fact: "Paul Revere never actually shouted 'The British are coming!' He would have said 'The regulars are coming out!' to avoid detection.",
                quick_summary: "The shot heard 'round the world! British soldiers marched to seize weapons, but colonial minutemen were ready and waiting.",
                student_activity: "Imagine you're a minuteman hearing the church bells ring at midnight - what would you grab before running to fight?"
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
                primary_sources: ["Ethan Allen's narrative", "Continental Congress records"],
                image: "https://www.nps.gov/common/uploads/structured_data/3C822B1B-1DD8-B71B-0BA4F3B5A2F2F5E6.jpg",
                fun_fact: "Ethan Allen demanded the fort surrender 'In the name of the Great Jehovah and the Continental Congress!' - quite dramatic for 5 AM!",
                quick_summary: "A surprise dawn attack! The Green Mountain Boys captured a fort full of cannons without firing a shot.",
                student_activity: "These cannons were dragged 300 miles through snow to Boston. How long do you think that took?"
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
                primary_sources: ["John Adams letters", "British Army dispatches", "Peter Salem testimony"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/The_Death_of_General_Warren_at_the_Battle_of_Bunker_Hill%2C_June_17%2C_1775_MET_DP-13747-037.jpg/800px-The_Death_of_General_Warren_at_the_Battle_of_Bunker_Hill%2C_June_17%2C_1775_MET_DP-13747-037.jpg",
                fun_fact: "The famous order 'Don't fire until you see the whites of their eyes!' helped save precious ammunition.",
                quick_summary: "British won the hill but lost over 1,000 soldiers! Americans proved they could fight the world's best army.",
                student_activity: "Why would waiting to see 'whites of their eyes' be a smart military strategy?"
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
                primary_sources: ["Washington's field reports", "Hessian officer accounts", "Pennsylvania Evening Post"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Washington_Crossing_the_Delaware_by_Emanuel_Leutze%2C_MMA-NYC%2C_1851.jpg/800px-Washington_Crossing_the_Delaware_by_Emanuel_Leutze%2C_MMA-NYC%2C_1851.jpg",
                fun_fact: "Washington crossed the icy Delaware on Christmas night while Hessian soldiers were celebrating and off guard!",
                quick_summary: "The ultimate Christmas surprise! Washington's daring river crossing saved the Revolution from total defeat.",
                student_activity: "The famous painting shows Washington standing in the boat - but he probably sat down for safety. What else might be wrong with the painting?"
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
                primary_sources: ["Washington's correspondence", "Continental Army orderly books"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/The_Death_of_General_Mercer_at_the_Battle_of_Princeton%2C_January_3%2C_1777_MET_DP827710.jpg/800px-The_Death_of_General_Mercer_at_the_Battle_of_Princeton%2C_January_3%2C_1777_MET_DP827710.jpg",
                fun_fact: "This victory was so important that people started calling Washington the 'American Hannibal' after the famous ancient general!",
                quick_summary: "One-two punch! Just a week after Trenton, Washington struck again and proved America could win this war.",
                student_activity: "Why might winning two battles in a row be more important than winning just one big battle?"
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
                primary_sources: ["Marquis de Lafayette memoirs", "British Army reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Battle_of_Brandywine.jpg/800px-Battle_of_Brandywine.jpg",
                fun_fact: "Young Marquis de Lafayette, only 19 years old, was wounded in this battle but kept fighting! He became like a son to Washington.",
                quick_summary: "British clever tactics outfoxed Washington, but the Continental Army lived to fight another day.",
                student_activity: "Lafayette was a teenager fighting for American freedom. What would motivate a foreign teenager to risk his life for another country?"
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
                primary_sources: ["Burgoyne's surrender terms", "Gates correspondence", "French diplomatic archives"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Surrender_of_General_Burgoyne.jpg/800px-Surrender_of_General_Burgoyne.jpg",
                fun_fact: "This victory convinced France to join the war! Benjamin Franklin was in Paris and helped seal the deal with his charm and wit.",
                quick_summary: "The turning point! This victory brought France (and their powerful navy) into the war as America's ally.",
                student_activity: "Why would France want to help America fight against Britain? Think about European politics and rivalries."
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
                primary_sources: ["Court martial records", "Washington's general orders", "Molly Pitcher legend accounts"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Molly_Pitcher_Currier_and_Ives_1876.jpg/800px-Molly_Pitcher_Currier_and_Ives_1876.jpg",
                fun_fact: "Molly Pitcher carried water to thirsty soldiers and may have even fired a cannon when her husband was wounded! Talk about teamwork!",
                quick_summary: "After the harsh winter at Valley Forge, American soldiers showed they could fight like European professionals.",
                student_activity: "The legend says Molly Pitcher took her husband's place at the cannon. What does this tell us about women's roles in the Revolution?"
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
                primary_sources: ["Clinton's dispatches", "Siege diary of Johann Ewald"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Siege_of_Charleston.jpg/800px-Siege_of_Charleston.jpg",
                fun_fact: "This was America's worst defeat of the war! But it made southern colonists so angry they fought even harder afterward.",
                quick_summary: "Britain's biggest victory in the South, but it backfired by making more colonists join the fight for independence.",
                student_activity: "Sometimes losing a battle can help win a war. How might this defeat have actually helped the American cause?"
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
                primary_sources: ["Isaac Shelby accounts", "William Campbell reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Kings_Mountain_monument.jpg/800px-Kings_Mountain_monument.jpg",
                fun_fact: "The 'Overmountain Men' were frontier fighters who lived beyond the Appalachian Mountains - they were tough as nails!",
                quick_summary: "Mountain men proved that frontier fighters could beat trained soldiers when they knew the terrain.",
                student_activity: "Why would living on the frontier make someone a better soldier? Think about the skills needed for survival."
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
                primary_sources: ["Morgan's battle report", "Tarleton's memoirs"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Battle_of_Cowpens15.jpg/800px-Battle_of_Cowpens15.jpg",
                fun_fact: "Daniel Morgan used a brilliant double envelopment - the same tactic Hannibal used 2,000 years earlier at Cannae!",
                quick_summary: "A perfect tactical trap! American general Daniel Morgan used psychology and terrain to destroy an elite British force.",
                student_activity: "Morgan told his militia they could retreat after two shots. Why would telling soldiers they could run away actually make them fight better?"
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
                primary_sources: ["Cornwallis correspondence", "Nathanael Greene reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Guilford_Courthouse.jpg/800px-Guilford_Courthouse.jpg",
                fun_fact: "A British politician said 'Another such victory would ruin the British Army!' This is where we get the term 'Pyrrhic victory.'",
                quick_summary: "British won the battle but lost so many soldiers they had to give up the South. Sometimes winning can be losing!",
                student_activity: "General Greene said 'We fight, get beat, rise, and fight again.' How can this strategy eventually win a war?"
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
                primary_sources: ["Articles of Capitulation", "Washington's dispatches", "French naval records", "Cornwallis surrender speech"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Surrender_of_Lord_Cornwallis.jpg/800px-Surrender_of_Lord_Cornwallis.jpg",
                fun_fact: "When Cornwallis surrendered, the British band played 'The World Turned Upside Down' - how fitting for the end of the war!",
                quick_summary: "The grand finale! French ships blocked escape by sea while American and French armies surrounded Yorktown. Game over!",
                student_activity: "This victory required perfect timing between armies and navies from different countries. What could have gone wrong with this plan?"
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
        this.setupPopupEventHandlers(); // Add popup event handling
    }

    initializeMap() {
        // Initialize map centered on colonial America
        this.map = L.map('map', {
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
            radius: 12, // Increased from 10 for better hit detection
            fillColor: color,
            color: '#ffffff',
            weight: 4, // Increased border for better visibility
            opacity: 1,
            fillOpacity: 0.85,
            className: 'battle-marker',
            pane: 'markerPane' // Ensure proper layering
        });

        // Create popup content without onclick handler
        const popupContent = `
            <div class="popup-title">${battle.name}</div>
            <div class="popup-date">${this.formatDate(battle.date)}</div>
            <div class="popup-outcome ${this.getOutcomeClass(battle.outcome)}">${battle.outcome}</div>
            <div class="popup-quick-summary">${battle.quick_summary}</div>
        `;

        marker.bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup',
            closeButton: true,
            autoPan: true,
            keepInView: true
        });
        
        // Single click handler for the marker
        marker.on('click', (e) => {
            e.originalEvent.stopPropagation(); // Prevent map click
            this.handleMarkerClick(battle, marker);
        });

        // Enhanced hover effects
        marker.on('mouseover', (e) => {
            e.originalEvent.stopPropagation();
            marker.setStyle({
                radius: 16,
                weight: 5,
                fillOpacity: 1,
                className: 'battle-marker battle-marker-hover'
            });
            
            // Show tooltip
            marker.bindTooltip(battle.name, {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                className: 'battle-tooltip'
            }).openTooltip();
        });

        marker.on('mouseout', (e) => {
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

    handleMarkerClick(battle, marker) {
        // Mark as discovered
        this.markBattleAsDiscovered(battle.name);
        
        // Show battle details panel immediately
        this.showBattleDetails(battle);

        // Add sparkle effect
        this.addSparkleEffect(marker);
        
        // Zoom to battle location for better focus
        this.map.setView([battle.latitude, battle.longitude], Math.max(this.map.getZoom(), 8), {
            animate: true,
            duration: 0.5
        });
    }

    loadBattleMarkers() {
        this.battles.forEach(battle => {
            const marker = this.createBattleMarker(battle);
            this.battleMarkers.push(marker);
            this.battleLayerGroup.addLayer(marker);
        });
    }

    updateVisibleBattles() {
        // Determine the current month and year from the timeline slider
        const currentDate = this.timelineDates[this.currentTimelineIndex];
        const currentTimelineMonth = currentDate.getMonth();
        const currentTimelineYear = currentDate.getFullYear();
        
        this.battleMarkers.forEach(marker => {
            const battleMonth = marker.battleDate.getMonth();
            const battleYear = marker.battleDate.getFullYear();

            // Show marker if its date is in or before the current timeline month/year
            if (battleYear < currentTimelineYear || (battleYear === currentTimelineYear && battleMonth <= currentTimelineMonth)) {
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

        // Surprise Me button
        document.getElementById('surprise-me-btn').addEventListener('click', () => {
            this.showRandomBattle();
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
        // Mark as discovered when details are shown
        this.markBattleAsDiscovered(battle.name);
        
        const panel = document.getElementById('battle-info-panel');
        const title = document.getElementById('battle-title');
        const details = document.getElementById('battle-details');

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
                    <span class="battle-meta-value">${this.formatDate(battle.date)}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">📍 Location</span>
                    <span class="battle-meta-value">${battle.location}</span>
                </div>
                <div class="battle-meta-item">
                    <span class="battle-meta-label">🏆 Outcome</span>
                    <span class="battle-meta-value outcome-badge ${this.getOutcomeClass(battle.outcome)}">${battle.outcome}</span>
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

        // Add event listeners for the navigation buttons
        const randomBtn = details.querySelector('[data-action="random-battle"]');
        const focusBtn = details.querySelector('[data-action="focus-battle"]');
        
        if (randomBtn) {
            randomBtn.addEventListener('click', () => this.showRandomBattle());
        }
        
        if (focusBtn) {
            focusBtn.addEventListener('click', () => this.zoomToBattle(battle.name));
        }

        panel.classList.remove('hidden');
        panel.scrollTop = 0; // Scroll to top when new battle is shown
    }

    hideBattleDetails() {
        document.getElementById('battle-info-panel').classList.add('hidden');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    markBattleAsDiscovered(battleName) {
        this.discoveredBattles.add(battleName);
        this.updateDiscoveryProgress();
        
        // Show achievement notification
        if (this.discoveredBattles.size === 1) {
            this.showAchievement("First Discovery!", "You've found your first battle! Keep exploring to learn more.");
        } else if (this.discoveredBattles.size === 5) {
            this.showAchievement("Battle Historian!", "You've discovered 5 battles. You're becoming a real expert!");
        } else if (this.discoveredBattles.size === this.battles.length) {
            this.showAchievement("Revolutionary War Master!", "Amazing! You've explored every battle in the war!");
        }
    }

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
                document.body.removeChild(achievement);
            }, 300);
        }, 4000);
    }

    updateDiscoveryProgress() {
        const progressBar = document.getElementById('discovery-progress');
        const progressText = document.getElementById('discovery-text');
        
        if (progressBar && progressText) {
            const percentage = (this.discoveredBattles.size / this.battles.length) * 100;
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `Discovered: ${this.discoveredBattles.size}/${this.battles.length} battles`;
        }
    }

    showRandomBattle() {
        const randomBattle = this.battles[Math.floor(Math.random() * this.battles.length)];
        this.showBattleDetails(randomBattle);
        this.map.setView([randomBattle.latitude, randomBattle.longitude], 10);
    }

    zoomToBattle(battleName) {
        const battle = this.battles.find(b => b.name === battleName);
        if (battle) {
            this.map.setView([battle.latitude, battle.longitude], 12);
            // Find and pulse the marker
            const marker = this.battleMarkers.find(m => m.battleData.name === battleName);
            if (marker) {
                this.pulseMarker(marker);
            }
        }
    }

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

    addSparkleEffect(marker) {
        // Add a temporary sparkle effect when battle is clicked
        const sparkle = L.circleMarker(marker.getLatLng(), {
            radius: 15,
            fillColor: '#FFD700',
            color: '#FFA500',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.6,
            className: 'sparkle-effect'
        });
        
        this.battleLayerGroup.addLayer(sparkle);
        
        setTimeout(() => {
            this.battleLayerGroup.removeLayer(sparkle);
        }, 1000);
    }

    setupPopupEventHandlers() {
        // Use event delegation for popup buttons
        this.map.on('popupopen', (e) => {
            const popup = e.popup;
            // const content = popup.getContent(); // Unused variable
            
            // Find and handle explore button
            // A small delay is used to ensure the popup's DOM content is fully rendered and queryable,
            // especially for attaching event listeners to elements within the popup.
            // setTimeout(() => {
            //     const exploreBtn = popup._contentNode.querySelector('.popup-explore-btn');
            //     if (exploreBtn) {
            //         exploreBtn.addEventListener('click', (event) => {
            //             event.stopPropagation(); // Prevent click from propagating to map or other layers
            //             const battleName = exploreBtn.getAttribute('data-battle-name');
            //             const battle = this.battles.find(b => b.name === battleName);
            //             if (battle) {
            //                 this.showBattleDetails(battle);
            //                 this.map.closePopup(); // Close popup after exploring
            //             }
            //         });
            //     }
            // }, 50);
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RevolutionaryWarMap();
});