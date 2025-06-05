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
                primary_sources: ["Washington's field reports", "Hessian officer accounts", "Peter Salem testimony"],
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
            },
            {
                name: "Battle of Long Island",
                date: "1776-08-27",
                location: "New York",
                latitude: 40.6892,
                longitude: -73.9442,
                outcome: "British victory",
                significance: "Largest battle of the war; nearly destroyed Washington's army",
                casualties_american: "300 killed, 700 wounded, 1,079 captured",
                casualties_british: "63 killed, 314 wounded",
                description: "General Howe's massive assault nearly trapped Washington's entire army on Brooklyn Heights, but a miraculous nighttime evacuation saved the Continental Army from complete destruction.",
                theater: "New York Campaign",
                sources: ["Gallagher, John J. The Battle of Brooklyn", "McCullough, David. 1776"],
                primary_sources: ["Washington's dispatches", "Howe's battle reports", "Maryland Regiment accounts"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Battle_of_Long_Island.jpg/800px-Battle_of_Long_Island.jpg",
                fun_fact: "Washington's army escaped in fog so thick that British sentries couldn't see them rowing across the East River - Mother Nature helped save America!",
                quick_summary: "Britain's biggest victory almost ended the Revolution before it started, but Washington's daring escape kept hope alive.",
                student_activity: "Imagine planning an escape for 9,000 soldiers in complete silence. What problems would you face?"
            },
            {
                name: "Raid on Trenton",
                date: "1776-12-30",
                location: "New Jersey",
                latitude: 40.2206,
                longitude: -74.7556,
                outcome: "American victory",
                significance: "Second victory in the Ten Days Campaign, secured New Jersey",
                casualties_american: "1 killed, 6 wounded",
                casualties_british: "9 killed, 24 wounded, 200 captured",
                description: "Washington struck again at Trenton, defeating British reinforcements and completing his remarkable ten-day campaign that saved the Revolution.",
                theater: "New York and New Jersey Campaign",
                sources: ["Fischer, David Hackett. Washington's Crossing", "Stryker, William S. The Battles of Trenton and Princeton"],
                primary_sources: ["Continental Army orderly books", "British garrison reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Second_Battle_of_Trenton.jpg/800px-Second_Battle_of_Trenton.jpg",
                fun_fact: "This was Washington's 'encore performance' - proving Trenton wasn't just luck but brilliant strategy!",
                quick_summary: "Washington wasn't done with Trenton! This second victory showed America could win consistently.",
                student_activity: "Why might winning the same place twice be more demoralizing to your enemy than winning two different places?"
            },
            {
                name: "Battle of Oriskany",
                date: "1777-08-06",
                location: "New York",
                latitude: 43.1534,
                longitude: -75.3268,
                outcome: "Indecisive/American strategic victory",
                significance: "Bloodiest battle of the war; stopped British advance down Mohawk Valley",
                casualties_american: "150 killed, 50 wounded",
                casualties_british: "33 killed, 40 wounded",
                description: "General Nicholas Herkimer's militia and their Oneida allies fought a brutal ambush battle against British rangers and Iroquois warriors, preventing British control of the strategic Mohawk Valley.",
                theater: "Saratoga Campaign",
                sources: ["Watt, Gavin K. The Burning of the Valleys", "Graymont, Barbara. The Iroquois in the American Revolution"],
                primary_sources: ["Herkimer family accounts", "British Indian Department records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Battle_of_Oriskany.jpg/800px-Battle_of_Oriskany.jpg",
                fun_fact: "General Herkimer commanded while sitting against a tree with a shattered leg, smoking his pipe and refusing to retreat!",
                quick_summary: "The bloodiest battle of the war! Brave militia and Native American allies stopped a British invasion.",
                student_activity: "This battle had Americans fighting Americans (Loyalists vs Patriots) and Native Americans on both sides. How might civil wars be different from other wars?"
            },
            {
                name: "Siege of Savannah",
                date: "1779-10-09",
                location: "Georgia",
                latitude: 32.0835,
                longitude: -81.0998,
                outcome: "British victory",
                significance: "Failed Franco-American assault; kept Savannah in British hands",
                casualties_american: "244 killed and wounded",
                casualties_british: "40 killed, 63 wounded",
                description: "The failed siege marked the end of major French-American cooperation in the South, with Polish hero Casimir Pulaski among the fallen defending American liberty.",
                theater: "Southern Campaign",
                sources: ["Jones, Charles C. The Siege of Savannah", "Cashin, Edward J. The King's Ranger"],
                primary_sources: ["D'Estaing's reports", "Lincoln's correspondence", "Georgia Historical Society records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Siege_of_Savannah.jpg/800px-Siege_of_Savannah.jpg",
                fun_fact: "Casimir Pulaski, the 'Father of American Cavalry,' died fighting for American freedom even though he was from Poland!",
                quick_summary: "International heroes like Pulaski fought and died for American freedom in this failed but heroic assault.",
                student_activity: "Why would people from other countries risk their lives fighting for American independence?"
            },
            {
                name: "Battle of Camden",
                date: "1780-08-16",
                location: "South Carolina",
                latitude: 34.2465,
                longitude: -80.6073,
                outcome: "British victory",
                significance: "Devastating defeat that eliminated American resistance in South Carolina",
                casualties_american: "900 killed and wounded, 1,000 captured",
                casualties_british: "68 killed, 245 wounded",
                description: "Horatio Gates's disastrous defeat destroyed organized American resistance in the Deep South and nearly ended the war in Britain's favor.",
                theater: "Southern Campaign",
                sources: ["Pancake, John S. This Destructive War", "Lambert, Robert S. South Carolina Loyalists"],
                primary_sources: ["Gates's court martial records", "Cornwallis dispatches"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Battle_of_Camden.jpg/800px-Battle_of_Camden.jpg",
                fun_fact: "General Gates fled the battlefield so fast he rode 180 miles in one day - earning the nickname 'the hero of Saratoga who ran from Camden!'",
                quick_summary: "America's worst defeat in the South! But it taught valuable lessons about fighting in unfamiliar territory.",
                student_activity: "After disasters like this, how do you think Washington chose new generals? What qualities would you look for?"
            },
            {
                name: "Battle of Waxhaws",
                date: "1780-05-29",
                location: "South Carolina",
                latitude: 34.9485,
                longitude: -80.7473,
                outcome: "British victory",
                significance: "Massacre that inflamed Southern resistance; created the term 'Tarleton's Quarter'",
                casualties_american: "113 killed, 150 wounded, 53 captured",
                casualties_british: "5 killed, 14 wounded",
                description: "Banastre Tarleton's cavalry destroyed Abraham Buford's Virginia regiment, but reports of a massacre after surrender galvanized Southern resistance.",
                theater: "Southern Campaign",
                sources: ["Bass, Robert D. The Green Dragoon", "Pancake, John S. This Destructive War"],
                primary_sources: ["Buford's survivor accounts", "Tarleton's memoirs"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Waxhaws_Massacre.jpg/800px-Waxhaws_Massacre.jpg",
                fun_fact: "'Tarleton's Quarter' became the rallying cry meaning 'no mercy' - sometimes being too harsh backfires!",
                quick_summary: "British brutality created more enemies than friends - this 'victory' helped turn the South against Britain.",
                student_activity: "How might treating defeated enemies harshly actually hurt your cause in the long run?"
            },
            {
                name: "Battle of Fishing Creek",
                date: "1780-08-18",
                location: "South Carolina",
                latitude: 34.6834,
                longitude: -81.1101,
                outcome: "British victory",
                significance: "Eliminated Thomas Sumter's force; continued British dominance in the backcountry",
                casualties_american: "150 killed and wounded, 300 captured",
                casualties_british: "16 killed and wounded",
                description: "Tarleton surprised and destroyed Thomas Sumter's partisan force at their camp, nearly eliminating the 'Gamecock' and his fighters.",
                theater: "Southern Campaign",
                sources: ["Bass, Robert D. Gamecock", "Edgar, Walter. Partisans and Redcoats"],
                primary_sources: ["Sumter family papers", "British Legion reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Thomas_Sumter.jpg/800px-Thomas_Sumter.jpg",
                fun_fact: "Thomas Sumter got the nickname 'Gamecock' because he fought with the fierce spirit of a fighting rooster!",
                quick_summary: "The Gamecock's fighters were surprised at breakfast, but Sumter escaped to fight another day.",
                student_activity: "Why might surprise attacks be especially effective against partisan fighters who rely on mobility?"
            },
            {
                name: "Battle of Musgrove Mill",
                date: "1780-08-19",
                location: "South Carolina",
                latitude: 34.8579,
                longitude: -82.0343,
                outcome: "American victory",
                significance: "Patriot partisan victory that boosted morale after Camden disaster",
                casualties_american: "4 killed, 8 wounded",
                casualties_british: "63 killed, 90 wounded, 70 captured",
                description: "A brilliant tactical victory by Patriot partisans Isaac Shelby, Elijah Clarke, and James Williams against Loyalist forces, proving effective resistance was still possible.",
                theater: "Southern Campaign",
                sources: ["Draper, Lyman. King's Mountain and Its Heroes", "Edgar, Walter. Partisans and Redcoats"],
                primary_sources: ["Isaac Shelby memoir", "Clarke family papers"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Revolutionary_War_Partisan.jpg/800px-Revolutionary_War_Partisan.jpg",
                fun_fact: "The Patriots used a fake retreat to lure the Loyalists into a trap - the oldest trick in the military book, but it still worked!",
                quick_summary: "Just when things looked hopeless after Camden, partisan fighters proved Americans could still win!",
                student_activity: "How might small victories be just as important as big ones for keeping people's spirits up during a war?"
            },
            {
                name: "Battle of Hanging Rock",
                date: "1780-08-06",
                location: "South Carolina",
                latitude: 34.7054,
                longitude: -80.8573,
                outcome: "American tactical victory",
                significance: "Successful partisan raid that disrupted British supply lines",
                casualties_american: "12 killed, 41 wounded",
                casualties_british: "192 killed, wounded, and captured",
                description: "Thomas Sumter led a successful raid against a British outpost, demonstrating the effectiveness of partisan warfare in disrupting British control.",
                theater: "Southern Campaign",
                sources: ["Bass, Robert D. Gamecock", "McCrady, Edward. The History of South Carolina in the Revolution"],
                primary_sources: ["Sumter's battle reports", "British garrison correspondence"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Revolutionary_Partisan.jpg/800px-Revolutionary_Partisan.jpg",
                fun_fact: "Sumter's men were so successful they captured enough supplies to outfit their entire force with British equipment!",
                quick_summary: "The Gamecock strikes! This raid showed how partisans could hit British outposts and disappear like ghosts.",
                student_activity: "What advantages would local fighters have against foreign troops who don't know the area?"
            },
            {
                name: "Battle of Fort Moultrie",
                date: "1776-06-28",
                location: "South Carolina",
                latitude: 32.7610,
                longitude: -79.8747,
                outcome: "American victory",
                significance: "First major American victory in the South; saved Charleston",
                casualties_american: "12 killed, 25 wounded",
                casualties_british: "64 killed, 131 wounded",
                description: "Colonel William Moultrie's palmetto log fort withstood a massive British naval bombardment, saving Charleston and proving American fortifications could defeat the Royal Navy.",
                theater: "Southern Campaign",
                sources: ["Moultrie, William. Memoirs", "McCrady, Edward. The History of South Carolina in the Revolution"],
                primary_sources: ["Moultrie's official report", "British naval logs"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Fort_Moultrie_battle.jpg/800px-Fort_Moultrie_battle.jpg",
                fun_fact: "The soft palmetto logs absorbed British cannonballs instead of shattering - South Carolina's state tree saved the day!",
                quick_summary: "Spongy palmetto logs stopped British cannons cold! Sometimes local materials make the best defenses.",
                student_activity: "Why might soft, flexible materials sometimes be better protection than hard, rigid ones?"
            },
            {
                name: "Battle of Eutaw Springs",
                date: "1781-09-08",
                location: "South Carolina",
                latitude: 33.7901,
                longitude: -80.3420,
                outcome: "British tactical victory, American strategic victory",
                significance: "Last major battle in South Carolina; forced British to abandon the interior",
                casualties_american: "139 killed, 375 wounded",
                casualties_british: "85 killed, 351 wounded",
                description: "Nathanael Greene's attack on Alexander Stewart's force resulted in heavy casualties for both sides, but forced the British to withdraw to Charleston, effectively ending their control of South Carolina's interior.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "Lee, Henry. Memoirs of the War"],
                primary_sources: ["Greene's correspondence", "Stewart's battle report"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Battle_of_Eutaw_Springs.jpg/800px-Battle_of_Eutaw_Springs.jpg",
                fun_fact: "General Greene said 'We fight, get beat, rise, and fight again' - and this battle proved his strategy worked!",
                quick_summary: "Greene's final gamble! Though costly, this battle drove the British back to Charleston for good.",
                student_activity: "Greene lost most of his battles but won the campaign. How can you lose battles but still win a war?"
            },
            {
                name: "Battle of Hobkirk's Hill",
                date: "1781-04-25",
                location: "South Carolina",
                latitude: 34.2247,
                longitude: -80.5820,
                outcome: "British tactical victory",
                significance: "Despite British victory, they abandoned Camden afterward",
                casualties_american: "18 killed, 108 wounded, 136 captured",
                casualties_british: "38 killed, 220 wounded",
                description: "Lord Rawdon defeated Nathanael Greene near Camden, but the Pyrrhic victory forced British withdrawal from the interior, proving Greene's war of attrition was working.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "Bass, Robert D. The Green Dragoon"],
                primary_sources: ["Greene's letters to Washington", "Rawdon's dispatches"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Nathanael_Greene.jpg/800px-Nathanael_Greene.jpg",
                fun_fact: "This 'defeat' actually helped Greene's strategy - the British won the battle but had to give up Camden anyway!",
                quick_summary: "Another Greene 'defeat' that was really a victory - the British couldn't afford to win battles like this!",
                student_activity: "If you keep winning battles but losing territory and men, are you really winning? What matters most in war?"
            },
            {
                name: "Battle of Springfield",
                date: "1780-06-23",
                location: "New Jersey",
                latitude: 40.6990,
                longitude: -74.3171,
                outcome: "American victory",
                significance: "Last major British offensive in New Jersey; saved crucial supply depot",
                casualties_american: "13 killed, 62 wounded",
                casualties_british: "70 killed and wounded",
                description: "The last significant British attempt to control New Jersey was repulsed by militia and Continental troops, securing American supply lines in the crucial middle states.",
                theater: "Northern Theater",
                sources: ["Stryker, William S. The Battle of Springfield", "Martin, David G. The Philadelphia Campaign"],
                primary_sources: ["New Jersey militia records", "Knyphausen's reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Battle_of_Springfield_NJ.jpg/800px-Battle_of_Springfield_NJ.jpg",
                fun_fact: "Local minister James Caldwell tore pages from hymn books to use as wadding for muskets, shouting 'Give 'em Watts!' (Isaac Watts wrote the hymns)",
                quick_summary: "Even the preacher joined the fight! This victory ended British hopes of controlling New Jersey.",
                student_activity: "Why might controlling New Jersey be crucial for both armies? Look at a map and think about geography."
            },
            {
                name: "Battle of Paoli",
                date: "1777-09-21",
                location: "Pennsylvania",
                latitude: 40.0426,
                longitude: -75.4735,
                outcome: "British victory",
                significance: "Notorious night attack that inflamed anti-British sentiment",
                casualties_american: "53 killed, 113 wounded, 71 captured",
                casualties_british: "4 wounded",
                description: "A surprise British night attack on Anthony Wayne's camp became known as the 'Paoli Massacre,' though modern historians debate whether excessive force was actually used.",
                theater: "Philadelphia Campaign",
                sources: ["McGuire, Thomas J. The Surprise of Germantown", "Reed, John F. Campaign to Valley Forge"],
                primary_sources: ["Wayne's court martial testimony", "British light infantry accounts"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Paoli_Massacre.jpg/800px-Paoli_Massacre.jpg",
                fun_fact: "This battle earned Anthony Wayne the nickname 'Mad Anthony' for his aggressive fighting style!",
                quick_summary: "A surprise nighttime bayonet attack that shocked both armies and made 'Mad Anthony' Wayne famous.",
                student_activity: "Why might night attacks be both more effective and more controversial than daylight battles?"
            },
            {
                name: "Battle of Germantown",
                date: "1777-10-04",
                location: "Pennsylvania",
                latitude: 40.0379,
                longitude: -75.1756,
                outcome: "British victory",
                significance: "Bold American attack impressed European observers despite failure",
                casualties_american: "152 killed, 521 wounded, 438 captured",
                casualties_british: "71 killed, 450 wounded",
                description: "Washington's complex four-pronged attack on Germantown failed due to fog and confusion, but the audacity of attacking professional troops impressed potential European allies.",
                theater: "Philadelphia Campaign",
                sources: ["McGuire, Thomas J. The Surprise of Germantown", "Ward, Christopher. The War of the Revolution"],
                primary_sources: ["Washington's battle plan", "Howe's dispatches", "Lafayette's memoirs"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Battle_of_Germantown.jpg/800px-Battle_of_Germantown.jpg",
                fun_fact: "The attack was so bold that European military experts said only a confident army would dare such a complex operation!",
                quick_summary: "Washington's daring attack failed, but it showed Europe that Americans could take the offensive against Britain's best troops.",
                student_activity: "Sometimes a 'failed' attack can still help your cause. How might this defeat have actually helped America diplomatically?"
            },
            {
                name: "Siege of Fort Ninety-Six",
                date: "1781-05-22",
                location: "South Carolina",
                latitude: 34.1751,
                longitude: -82.0193,
                outcome: "British victory",
                significance: "Greene's failed siege but strategic success in clearing British outposts",
                casualties_american: "57 killed, 70 wounded",
                casualties_british: "27 killed, 58 wounded",
                description: "Nathanael Greene's 28-day siege failed to capture the fortified Loyalist stronghold, but the attempt forced British consolidation and abandonment of the backcountry.",
                theater: "Southern Campaign",
                sources: ["Buchanan, John. The Road to Guilford Courthouse", "McCrady, Edward. The History of South Carolina in the Revolution"],
                primary_sources: ["Greene's siege journal", "Cruger's defense reports"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Fort_Ninety_Six.jpg/800px-Fort_Ninety_Six.jpg",
                fun_fact: "The fort was named 'Ninety-Six' because it was supposedly 96 miles from the Cherokee town of Keowee - frontier GPS!",
                quick_summary: "Greene couldn't take this tough frontier fort, but the siege convinced Britain to abandon the backcountry anyway.",
                student_activity: "How can threatening a place be almost as effective as actually capturing it?"
            },
            {
                name: "Battle of Blue Licks",
                date: "1782-08-19",
                location: "Blue Licks, Kentucky",
                latitude: 38.4331,
                longitude: -84.0238,
                outcome: "British Victory",
                significance: "This devastating defeat was one of the last major battles of the Revolution and demonstrated that frontier warfare continued even as peace negotiations proceeded, highlighting ongoing tensions over western territories.",
                casualties_american: "77 killed, 7 captured, 84 total",
                casualties_british: "4 killed, 2 wounded, 6 total",
                description: "Kentucky militia under Colonels John Todd and Stephen Trigg were ambushed and decisively defeated by British-led Native American forces. The disaster shocked frontier communities and demonstrated continued British influence among western tribes.",
                theater: "Western Theater",
                sources: ["Harrison, Lowell H. Kentucky's Road to Statehood", "Bakeless, John. Background to Glory: The Life of George Rogers Clark"],
                primary_sources: ["Survivor accounts and depositions", "Kentucky territorial records", "British Indian Department correspondence"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Blue_Licks_Battlefield_Kentucky.jpg/800px-Blue_Licks_Battlefield_Kentucky.jpg",
                fun_fact: "This battle occurred almost a year after Yorktown, proving that the frontier war continued long after the 'main' Revolution was supposedly over!",
                quick_summary: "Even as diplomats negotiated peace, Kentucky frontiersmen learned the hard way that the war wasn't really over until it was completely over!",
                student_activity: "Examine why frontier warfare continued after major combat operations ended in the East. How did the Revolution's conclusion differ across various regions?"
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
        // Ensure the timeline slider range matches the generated dates
        const timelineSlider = document.getElementById('timeline-slider');
        if (timelineSlider) {
            timelineSlider.max = this.timelineDates.length - 1;
        }
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
            // Disable Leaflet's automatic panning to avoid conflicting
            // animations with our manual `setView` call in `handleMarkerClick`.
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
        
        // Single click handler for the marker
        marker.on('click', (e) => {
            e.originalEvent.stopPropagation(); // Prevent map click
            this.handleMarkerClick(battle, marker);
        });

        // Bind tooltip once during marker creation
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

            // Show tooltip
            marker.openTooltip();
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