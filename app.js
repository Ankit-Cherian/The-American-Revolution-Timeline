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
                name: "First Siege of Ninety-Six",
                date: "1775-11-21",
                location: "South Carolina",
                latitude: 34.1751,
                longitude: -82.0237,
                outcome: "Inconclusive",
                significance: "It starkly illustrated the deep divisions between Patriots and Loyalists in the backcountry and set the stage for escalating conflict in the Southern colonies.",
                casualties_american: "1 killed, 12 wounded, 13 total",
                casualties_british: "4 killed, 20 wounded, 24 total (Loyalists)",
                description: "In November 1775, Patriot forces under Major Andrew Williamson established a defensive position at Savage's Old Field. They were soon besieged by a larger Loyalist force. Despite being outnumbered, the Patriot defenders successfully repelled assaults and the engagement ended in a truce.",
                theater: "Southern Theater",
                sources: ["Cann, Marvin L. 'Prelude to War: The First Battle of Ninety Six'", "Edgar, Walter B. South Carolina: A History"],
                primary_sources: ["Eyewitness accounts from the period", "South Carolina and American General Gazette"],
                image: "https://www.carolana.com/SC/Revolution/Ninety_Six_Nov_19_1775_Williamson_Fort.jpg",
                fun_fact: "The makeshift Patriot 'fort' was primarily constructed from fence rails and built around a barn, highlighting the improvised nature of early defenses.",
                quick_summary: "The first significant land battle in the South, where outnumbered Patriots defended a makeshift fort against Loyalists, ending in a truce.",
                student_activity: "Research and create a visual representation (e.g., diorama) of Williamson's Fort based on historical descriptions."
            },
            {
                name: "Battle of Great Bridge",
                date: "1775-12-09",
                location: "Great Bridge, Virginia",
                latitude: 36.7235,
                longitude: -76.2441,
                outcome: "American Victory",
                significance: "This decisive victory effectively ended British control of Virginia and forced Lord Dunmore to retreat to naval vessels, marking a crucial early Patriot success in the South.",
                casualties_american: "1 killed, 1 wounded, 2 total",
                casualties_british: "17 killed, 45 wounded, 62 total",
                description: "Virginia militia under Colonel William Woodford decisively defeated British regulars and Loyalist forces attempting to cross the Great Bridge. The victory led to the British evacuation of Norfolk and established firm Patriot control over Virginia.",
                theater: "Virginia Theater",
                sources: ["Selby, John E. The Revolution in Virginia, 1775-1783", "McDonnell, Michael A. The Politics of War: Race, Class, and Conflict in Revolutionary Virginia"],
                primary_sources: ["Woodford's official battle report", "Virginia Convention proceedings", "Lord Dunmore's correspondence with London"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Great_Bridge_Battlefield_Virginia.jpg/800px-Great_Bridge_Battlefield_Virginia.jpg",
                fun_fact: "The British were so confident of victory that Lord Dunmore had promised his officers they would dine in Norfolk that evening. Instead, they retreated in defeat!",
                quick_summary: "Virginians turned a strategic bridge crossing into a killing field, driving British forces from the colony in a stunning early victory.",
                student_activity: "Analyze how geographical features like bridges and river crossings became critical tactical advantages in 18th-century warfare."
            },
            {
                name: "Burning of Falmouth",
                date: "1775-10-18",
                location: "Falmouth, Massachusetts (now Portland, Maine)",
                latitude: 43.6591,
                longitude: -70.2568,
                outcome: "British Victory",
                significance: "This brutal act of destroying a civilian town shocked colonists throughout America and provided powerful propaganda for the Patriot cause, demonstrating British willingness to wage war on non-combatants.",
                casualties_american: "Few military casualties, approximately 160 homes and buildings destroyed, 1,000+ civilians displaced",
                casualties_british: "No casualties",
                description: "Captain Henry Mowat systematically bombarded and burned most of Falmouth following direct orders from the Admiralty to 'chastise' rebellious New England seaports. The destruction was so complete that the town was nearly uninhabitable.",
                theater: "Northern Theater",
                sources: ["Leamon, James S. Revolution Downeast: The War for American Independence in Maine", "Willis, William. The History of Portland"],
                primary_sources: ["Captain Mowat's official naval logs", "Survivor testimonies collected by Massachusetts Provincial Congress", "Admiralty orders from London"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Destruction_of_Falmouth_1775.jpg/800px-Destruction_of_Falmouth_1775.jpg",
                fun_fact: "The destruction was so shocking that it was specifically mentioned in the Declaration of Independence as evidence of British tyranny against American civilians!",
                quick_summary: "British warships reduced a peaceful New England town to ashes in a calculated act of terror that backfired spectacularly.",
                student_activity: "Examine how the burning of Falmouth was used in Patriot propaganda and compare it to modern concepts of total warfare."
            },
            {
                name: "Siege of Fort St. Jean",
                date: "1775-11-03",
                location: "Fort St. Jean, Quebec",
                latitude: 45.3075,
                longitude: -73.2806,
                outcome: "American Victory",
                significance: "The capture of this strategic fortress opened the route to Montreal and demonstrated American capability to conduct complex siege operations, marking a high point of the failed Canadian invasion.",
                casualties_american: "25 killed, 34 wounded, 59 total",
                casualties_british: "7 killed, 15 wounded, 692 captured, 714 total",
                description: "After a grueling 55-day siege, American forces under Brigadier General Richard Montgomery successfully captured the heavily fortified British position. The victory provided crucial artillery and supplies while opening the path to Montreal.",
                theater: "Canadian Theater",
                sources: ["Stanley, George F.G. Canada Invaded, 1775-1776", "Smith, Justin H. Our Struggle for the Fourteenth Colony"],
                primary_sources: ["Montgomery's detailed siege reports to Continental Congress", "British garrison surrender terms", "Quebec Governor Guy Carleton's correspondence"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Fort_Saint_Jean_Quebec_1775.jpg/800px-Fort_Saint_Jean_Quebec_1775.jpg",
                fun_fact: "The siege lasted so long that soldiers on both sides reportedly became quite friendly during frequent truces, with some even sharing meals!",
                quick_summary: "Americans proved they could mount European-style siege warfare, starving out a British fortress after nearly two months of patient investment.",
                student_activity: "Compare the siege tactics used at Fort St. Jean with famous European sieges of the same period. What made 18th-century siege warfare so time-consuming?"
            },
            {
                name: "Battle of Moore's Creek Bridge",
                date: "1776-02-27",
                location: "Currie, North Carolina",
                latitude: 34.4615,
                longitude: -78.2958,
                outcome: "American Victory",
                significance: "This crushing defeat of Loyalist forces ended the Scottish Highland uprising in North Carolina and delayed British southern strategy by years, proving that Loyalist support was not as strong as hoped.",
                casualties_american: "2 killed, 1 wounded, 3 total",
                casualties_british: "50 killed and wounded, 850 captured, 900+ total",
                description: "North Carolina Patriots under Colonel James Moore and Colonel Alexander Lillington decisively defeated a large force of Highland Scots Loyalists attempting to reach the coast and link up with British forces. The Patriots removed planks from the bridge, creating a deadly trap.",
                theater: "Southern Theater",
                sources: ["Rankin, Hugh F. The North Carolina Continentals", "Meyer, Duane G. The Highland Scots of North Carolina, 1732-1776"],
                primary_sources: ["Colonel Moore's official battle dispatches", "North Carolina Provincial Congress records", "Loyalist prisoner testimonies and parole documents"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Moores_Creek_Bridge_North_Carolina.jpg/800px-Moores_Creek_Bridge_North_Carolina.jpg",
                fun_fact: "The Loyalists charged across the bridge shouting traditional Highland war cries and wielding claymores, but the Patriots had removed the bridge planks, sending attackers into the icy creek!",
                quick_summary: "Scottish Loyalists learned that ancient Highland tactics don't work well against hidden American riflemen at strategically sabotaged bridges!",
                student_activity: "Investigate how ethnic and cultural loyalties (Scottish Highland traditions) influenced political allegiances during the American Revolution."
            },
            {
                name: "Battle of The Cedars",
                date: "1776-05-20",
                location: "Les Cèdres, Quebec",
                latitude: 45.3000,
                longitude: -74.0667,
                outcome: "British Victory",
                significance: "This defeat effectively ended American hopes of holding Quebec and forced the complete withdrawal from Canada, marking the failure of the ambitious plan to make Canada the 14th colony.",
                casualties_american: "30 killed, 390 captured, 420 total",
                casualties_british: "Few casualties",
                description: "British forces and Native American allies under Captain George Forster overwhelmed the American garrison commanded by Major Isaac Butterfield. The defeat completed the collapse of American forces in Canada and dashed hopes of Canadian support for independence.",
                theater: "Canadian Theater",
                sources: ["Stanley, George F.G. Canada Invaded, 1775-1776", "Hatch, Robert McConnell. Thrust for Canada: The American Attempt on Quebec in 1775-1776"],
                primary_sources: ["Captain Forster's detailed military reports", "American prisoner accounts and parole records", "Native American oral histories recorded later"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/The_Cedars_Quebec_Battle_1776.jpg/800px-The_Cedars_Quebec_Battle_1776.jpg",
                fun_fact: "This defeat convinced Benedict Arnold that the Canadian campaign was utterly doomed—one of his first major military disappointments that may have contributed to his later betrayal!",
                quick_summary: "Americans learned the hard way that conquering Canada was much more difficult than they imagined when this isolated garrison was overwhelmed.",
                student_activity: "Analyze why the American invasion of Canada failed. What assumptions about Canadian support proved incorrect?"
            },
            {
                name: "Battle of Three Rivers",
                date: "1776-06-08",
                location: "Trois-Rivières, Quebec",
                latitude: 46.3432,
                longitude: -72.5477,
                outcome: "British Victory",
                significance: "This disastrous American defeat was the final nail in the coffin of the Canadian invasion, forcing complete American withdrawal and ending dreams of a fourteenth colony joining the rebellion.",
                casualties_american: "50 killed and wounded, 236 captured, 286 total",
                casualties_british: "20 killed and wounded, 20 total",
                description: "American forces under Brigadier General William Thompson attempted a desperate attack on British positions at Trois-Rivières but were decisively defeated. The loss forced the final American evacuation from Canadian soil.",
                theater: "Canadian Theater",
                sources: ["Stanley, George F.G. Canada Invaded, 1775-1776", "Gabriel, Michael P. Major General Richard Montgomery: The Making of a Founding Father"],
                primary_sources: ["Thompson's defeat reports to Congress", "British victory dispatches to London", "Canadian militia muster rolls and records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Three_Rivers_Quebec_Battle_1776.jpg/800px-Three_Rivers_Quebec_Battle_1776.jpg",
                fun_fact: "The Americans got so completely lost in the Canadian wilderness during their night approach that they attacked entirely wrong positions, alerting the British to their presence!",
                quick_summary: "America's final desperate attempt to conquer Canada ended in confusion, capture, and the complete collapse of northern ambitions.",
                student_activity: "Examine the strategic implications of the failed Canadian campaign. How might American independence have differed if Canada had joined the rebellion?"
            },
            {
                name: "Battle of Kip's Bay",
                date: "1776-09-15",
                location: "Manhattan, New York",
                latitude: 40.7464,
                longitude: -73.9700,
                outcome: "British Victory",
                significance: "This successful British amphibious assault demonstrated the devastating effectiveness of naval power against inexperienced American forces and secured British control of Manhattan Island.",
                casualties_american: "60 killed, wounded, and captured",
                casualties_british: "Minimal casualties",
                description: "British forces under General William Howe executed a textbook amphibious landing at Kip's Bay on Manhattan's east side. The operation caused mass panic among American militia, who fled despite Washington's furious attempts to rally them.",
                theater: "New York Campaign",
                sources: ["Schecter, Barnet. The Battle for New York: The City at the Heart of the American Revolution", "McCullough, David. 1776"],
                primary_sources: ["Washington's angry letters about militia cowardice", "British amphibious assault reports", "Eyewitness accounts from New York civilians"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kips_Bay_Landing_New_York_1776.jpg/800px-Kips_Bay_Landing_New_York_1776.jpg",
                fun_fact: "George Washington was so furious at his fleeing troops that he threw his hat on the ground, struck fleeing soldiers with his riding crop, and reportedly cursed like a sailor!",
                quick_summary: "British naval power and professional assault tactics scared American militia so badly that even Washington's personal presence couldn't stop the rout!",
                student_activity: "Research the psychological effects of amphibious assaults on defenders. Why were these operations particularly effective against inexperienced troops?"
            },
            {
                name: "Battle of Valcour Island",
                date: "1776-10-11",
                location: "Lake Champlain, New York",
                latitude: 44.6953,
                longitude: -73.4328,
                outcome: "British Victory",
                significance: "Despite tactical defeat, this delaying action bought Americans a crucial year to prepare defenses and prevented British linkup with Howe's forces, potentially saving the Revolution.",
                casualties_american: "60 killed and wounded, 110 captured, 170 total",
                casualties_british: "40 killed and wounded, 40 total",
                description: "Benedict Arnold's hastily constructed fleet fought a desperate delaying action against a superior British naval force. Though defeated, the battle prevented British invasion for a year, buying precious time for American preparations.",
                theater: "Northern Theater",
                sources: ["Nelson, James L. Benedict Arnold's Navy: The Ragtag Fleet That Lost the Battle of Lake Champlain but Won the American Revolution", "Fowler, William M. Rebels Under Sail: The American Navy During the Revolution"],
                primary_sources: ["Arnold's detailed naval combat reports", "British Admiral Thomas Pringle's fleet logs", "Shipyard construction records from Skenesborough"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Valcour_Island_Naval_Battle_1776.jpg/800px-Valcour_Island_Naval_Battle_1776.jpg",
                fun_fact: "Arnold's sailors were mostly soldiers who had never seen the ocean, yet they built an entire fleet from scratch in the wilderness and fought like seasoned naval veterans!",
                quick_summary: "Arnold's ragtag navy got thoroughly beaten but proved that sometimes losing a battle spectacularly can still win you the war!",
                student_activity: "Analyze how a military defeat can achieve strategic objectives. What makes a 'strategic victory' despite tactical defeat?"
            },
            {
                name: "Battle of Bennington",
                date: "1777-08-16",
                location: "Bennington, Vermont",
                latitude: 42.8781,
                longitude: -73.1962,
                outcome: "American Victory",
                significance: "This stunning victory significantly weakened Burgoyne's invasion force and encouraged widespread American resistance in Vermont and New Hampshire, contributing directly to the Saratoga campaign's ultimate failure.",
                casualties_american: "80 killed and wounded, 80 total",
                casualties_british: "207 killed and wounded, 700 captured, 907 total",
                description: "New Hampshire militia under Brigadier General John Stark decisively defeated German mercenaries and British forces sent by Burgoyne to capture badly needed supplies. The victory deprived Burgoyne of crucial resources and manpower before Saratoga.",
                theater: "Saratoga Campaign",
                sources: ["Ketchum, Richard M. Saratoga: Turning Point of America's Revolutionary War", "Morrissey, Brendan. Saratoga 1777: Turning Point of a Revolution"],
                primary_sources: ["Stark's victory reports to New Hampshire authorities", "German mercenary accounts and letters home", "Vermont and New Hampshire militia muster rolls"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Battle_of_Bennington_1777_Stark.jpg/800px-Battle_of_Bennington_1777_Stark.jpg",
                fun_fact: "John Stark famously told his men 'We'll beat the enemy or Molly Stark sleeps a widow tonight!' His wife Molly did not become a widow that day!",
                quick_summary: "New Hampshire farmers proved that American citizen-soldiers could decisively defeat German professionals when fighting to defend their homes!",
                student_activity: "Examine how this local victory affected the larger Saratoga campaign. How do small battles influence major strategic operations?"
            },
            {
                name: "Battle of Red Bank",
                date: "1777-10-22",
                location: "Red Bank, New Jersey",
                latitude: 39.8680,
                longitude: -75.0641,
                outcome: "American Victory",
                significance: "This successful defense of Fort Mercer significantly delayed British efforts to open supply lines up the Delaware River to occupied Philadelphia, forcing them to maintain expensive overland logistics.",
                casualties_american: "50 killed and wounded, 50 total",
                casualties_british: "377 killed and wounded, 377 total",
                description: "The American garrison under Colonel Christopher Greene successfully repelled a massive Hessian assault on Fort Mercer. The victory helped maintain American control of the Delaware River and severely hindered British supply efforts to Philadelphia.",
                theater: "Philadelphia Campaign",
                sources: ["Jackson, John W. The Pennsylvania Navy, 1775-1781: The Forgotten Fleet of the American Revolution", "Bodle, Wayne K. The Valley Forge Winter: Civilians and Soldiers in War"],
                primary_sources: ["Colonel Greene's detailed defense reports", "Hessian casualty lists and regiment records", "Fort construction and engineering records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Fort_Mercer_Red_Bank_New_Jersey.jpg/800px-Fort_Mercer_Red_Bank_New_Jersey.jpg",
                fun_fact: "The attacking Hessians were so confident of victory that they brought scaling ladders that turned out to be too short for the fort's walls—a fatal miscalculation!",
                quick_summary: "Americans proved that well-designed fortifications and determined defenders could stop even the most professional European assault troops cold!",
                student_activity: "Research 18th-century siege warfare and fortification design. Why were river forts strategically crucial for controlling supply lines to major cities?"
            },
            {
                name: "Siege of Fort Mifflin",
                date: "1777-11-15",
                location: "Fort Mifflin, Pennsylvania",
                latitude: 39.8651,
                longitude: -75.2208,
                outcome: "British Victory",
                significance: "The fall of Fort Mifflin finally opened the Delaware River supply route to British-occupied Philadelphia, though the prolonged defense had delayed this crucial logistics victory for months.",
                casualties_american: "250 killed, wounded, and captured, 250 total",
                casualties_british: "13 killed and wounded, 13 total",
                description: "After weeks of devastating artillery bombardment, the American garrison finally abandoned the pulverized remains of Fort Mifflin. The fort's fall opened British supply lines to Philadelphia, though the stubborn defense had significantly delayed this strategic objective.",
                theater: "Philadelphia Campaign",
                sources: ["Jackson, John W. The Pennsylvania Navy, 1775-1781", "Martin, David G. The Philadelphia Campaign: June 1777-July 1778"],
                primary_sources: ["Garrison abandonment reports and evacuation orders", "British artillery bombardment logs", "Engineering assessments of fortification damage"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Fort_Mifflin_Ruins_Pennsylvania.jpg/800px-Fort_Mifflin_Ruins_Pennsylvania.jpg",
                fun_fact: "The British bombardment was so intense and prolonged that soldiers said the fort looked like 'the surface of the moon' when they finally abandoned it!",
                quick_summary: "After taking a pounding that would make modern military engineers jealous, the Americans finally had to abandon this battered river fortress!",
                student_activity: "Calculate the cost-benefit of the Fort Mifflin defense. Was the delay worth the casualties and resources expended?"
            },
            {
                name: "Battle of White Marsh",
                date: "1777-12-08",
                location: "White Marsh, Pennsylvania",
                latitude: 40.1587,
                longitude: -75.0760,
                outcome: "Inconclusive",
                significance: "This final major engagement of 1777 demonstrated the Continental Army's dramatically improved discipline and defensive capabilities following their experiences earlier in the Philadelphia Campaign.",
                casualties_american: "Few casualties",
                casualties_british: "Few casualties",
                description: "British forces under General Howe advanced from Philadelphia to attack Washington's well-positioned camp at White Marsh but withdrew after limited skirmishing. The engagement showcased the American army's improved discipline and strong defensive positioning.",
                theater: "Philadelphia Campaign",
                sources: ["Bodle, Wayne K. The Valley Forge Winter: Civilians and Soldiers in War", "Martin, David G. The Philadelphia Campaign: June 1777-July 1778"],
                primary_sources: ["Washington's defensive preparations and position reports", "British reconnaissance reports and withdrawal orders", "Weather records and supply situation assessments"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/White_Marsh_Pennsylvania_Encampment.jpg/800px-White_Marsh_Pennsylvania_Encampment.jpg",
                fun_fact: "Both armies were so exhausted from the long campaign and harsh winter weather that they essentially stared at each other across the lines and decided to call it a year!",
                quick_summary: "Two professional armies faced off in the bitter cold, took each other's measure, and wisely decided that discretion was the better part of valor!",
                student_activity: "Analyze how winter weather and supply shortages affected military decision-making in 18th-century warfare. What factors beyond combat influenced strategic choices?"
            },
            {
                name: "Battle of Barren Hill",
                date: "1778-05-20",
                location: "Barren Hill, Pennsylvania",
                latitude: 40.0912,
                longitude: -75.2743,
                outcome: "American Victory",
                significance: "This skillful tactical withdrawal demonstrated Lafayette's growing military competence and the Continental Army's improved mobility and discipline after Valley Forge training.",
                casualties_american: "Few casualties",
                casualties_british: "Few casualties",
                description: "Young Marquis de Lafayette masterfully extricated his 2,200-man detachment from an elaborate British trap near Valley Forge. His tactical success enhanced his military reputation and demonstrated the Continental Army's improved professional capabilities.",
                theater: "Philadelphia Campaign",
                sources: ["Gottschalk, Louis R. Lafayette in America, 1777-1783", "Clary, David A. Adopted Son: Washington, Lafayette, and the Friendship that Saved the Revolution"],
                primary_sources: ["Lafayette's detailed escape reports to Washington", "British encirclement plans and orders", "Continental Army morning reports and troop movements"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lafayette_Barren_Hill_Pennsylvania.jpg/800px-Lafayette_Barren_Hill_Pennsylvania.jpg",
                fun_fact: "Lafayette was only 20 years old when he outwitted experienced British generals in this escape, proving that youth and energy could triumph over age and treachery!",
                quick_summary: "Young Lafayette proved that sometimes the greatest military victory is knowing exactly when and how to run away with style and purpose!",
                student_activity: "Research the military education and background that foreign volunteers like Lafayette brought to the Continental Army. How did international expertise improve American military effectiveness?"
            },
            {
                name: "Battle of Rhode Island",
                date: "1778-08-29",
                location: "Newport, Rhode Island",
                latitude: 41.4901,
                longitude: -71.3128,
                outcome: "British Victory",
                significance: "Though unsuccessful, this first major Franco-American combined operation provided valuable lessons for future cooperation and notably featured the first African American regiment in U.S. military history.",
                casualties_american: "211 killed and wounded, 211 total",
                casualties_british: "260 killed and wounded, 260 total",
                description: "Combined American and French forces attempted to retake British-occupied Newport but failed when the French fleet withdrew due to storm damage. Despite the failure, the operation demonstrated the potential of Franco-American military cooperation.",
                theater: "Northern Theater",
                sources: ["Syrett, David. The Royal Navy in American Waters, 1775-1783", "Rider, Hope S. Valour Fore & Aft: Being the Adventures of the Continental Sloop Providence"],
                primary_sources: ["Franco-American operational planning documents", "1st Rhode Island Regiment muster rolls and service records", "French naval reports and storm damage assessments"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Battle_of_Rhode_Island_1778_Newport.jpg/800px-Battle_of_Rhode_Island_1778_Newport.jpg",
                fun_fact: "This battle featured the first African American regiment in U.S. military history fighting alongside French allies—a truly international force for freedom!",
                quick_summary: "America's first team-up with France didn't go perfectly, but they learned valuable lessons about international cooperation while making military history!",
                student_activity: "Research the 1st Rhode Island Regiment and the role of African Americans in the Revolution. How did military service relate to questions of freedom and citizenship?"
            },
            {
                name: "Capture of Savannah",
                date: "1778-12-29",
                location: "Savannah, Georgia",
                latitude: 32.0835,
                longitude: -81.0998,
                outcome: "British Victory",
                significance: "This easy victory launched the British Southern Strategy and established a crucial base for operations throughout Georgia, fundamentally shifting the war's geographic focus southward.",
                casualties_american: "83 killed and wounded, 453 captured, 536 total",
                casualties_british: "7 killed, 19 wounded, 26 total",
                description: "British forces under Lieutenant Colonel Archibald Campbell captured Savannah with surprising ease, meeting minimal resistance. This swift victory encouraged British confidence in their Southern Strategy and provided a secure base for further operations.",
                theater: "Southern Theater",
                sources: ["Coleman, Kenneth. The American Revolution in Georgia, 1763-1789", "Cashin, Edward J. The King's Ranger: Thomas Brown and the American Revolution on the Southern Frontier"],
                primary_sources: ["Campbell's victory reports to Clinton", "Georgia Loyalist testimonies and petitions", "Savannah defense records and surrender terms"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Capture_of_Savannah_Georgia_1778.jpg/800px-Capture_of_Savannah_Georgia_1778.jpg",
                fun_fact: "The capture was so easy that British officers complained they didn't get enough action to write exciting letters home to impress their families and friends!",
                quick_summary: "British forces waltzed into Savannah so effortlessly that they became convinced conquering the entire South would be an easy victory march!",
                student_activity: "Analyze why the British believed their Southern Strategy would be more successful than their Northern campaigns. What assumptions proved correct or incorrect?"
            },
            {
                name: "Battle of Kettle Creek",
                date: "1779-02-14",
                location: "Wilkes County, Georgia",
                latitude: 33.8651,
                longitude: -82.8304,
                outcome: "American Victory",
                significance: "This morale-boosting Patriot victory restored American confidence in Georgia and demonstrated that British control of the backcountry was far from complete, encouraging continued resistance.",
                casualties_american: "9 killed and wounded, 9 total",
                casualties_british: "40 killed, 75 captured, 115 total",
                description: "Georgia militia under Colonel Elijah Clarke surprised and defeated a force of Loyalists gathering cattle and supplies. The victory significantly boosted Patriot morale in Georgia and proved that organized resistance could still succeed.",
                theater: "Southern Theater",
                sources: ["Coleman, Kenneth. The American Revolution in Georgia, 1763-1789", "Cashin, Edward J. The King's Ranger: Thomas Brown and the American Revolution on the Southern Frontier"],
                primary_sources: ["Clarke's detailed battle reports", "Georgia militia muster rolls and service records", "Loyalist prisoner testimonies and parole documents"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Kettle_Creek_Battlefield_Georgia.jpg/800px-Kettle_Creek_Battlefield_Georgia.jpg",
                fun_fact: "The Loyalists were literally roasting cattle for dinner when the Patriots attacked—some never got to finish their last meal as free men!",
                quick_summary: "Georgia Patriots crashed a Loyalist barbecue and served up a decisive victory that proved the fight for independence was far from over!",
                student_activity: "Examine how small-scale victories like Kettle Creek affected civilian morale and military recruitment in occupied territories."
            },
            {
                name: "Battle of Brier Creek",
                date: "1779-03-03",
                location: "Screven County, Georgia",
                latitude: 32.7168,
                longitude: -81.4290,
                outcome: "British Victory",
                significance: "This crushing defeat secured complete British control of Georgia and eliminated organized American resistance in the state, validating British confidence in their Southern Strategy.",
                casualties_american: "150 killed and wounded, 227 captured, 377 total",
                casualties_british: "16 killed and wounded, 16 total",
                description: "British forces under Lieutenant Colonel John Boyd completely surprised and routed American forces under Brigadier General John Ashe. The devastating defeat eliminated organized American resistance in Georgia and secured British control.",
                theater: "Southern Theater",
                sources: ["Coleman, Kenneth. The American Revolution in Georgia, 1763-1789", "Pancake, John S. This Destructive War: The British Campaign in the Carolinas, 1780-1782"],
                primary_sources: ["Boyd's surprise attack reports and tactical analysis", "Ashe's defeat acknowledgments and court-martial records", "British occupation administration records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Brier_Creek_Georgia_Battle_1779.jpg/800px-Brier_Creek_Georgia_Battle_1779.jpg",
                fun_fact: "The American force was so completely surprised that many soldiers fled without their weapons, boots, or any shred of military dignity!",
                quick_summary: "British forces caught Americans completely off guard and scattered them like autumn leaves in a hurricane of musket fire and bayonets!",
                student_activity: "Analyze how surprise attacks and poor intelligence gathering affected military outcomes in wilderness warfare. What lessons does this defeat teach about military preparedness?"
            },
            {
                name: "Battle of Stono Ferry",
                date: "1779-06-20",
                location: "Johns Island, South Carolina",
                latitude: 32.7335,
                longitude: -80.0782,
                outcome: "British Victory",
                significance: "This failed American assault demonstrated British strength in the Charleston area and highlighted ongoing American difficulties in coordinating complex attacks against prepared positions.",
                casualties_american: "146 killed and wounded, 146 total",
                casualties_british: "129 killed and wounded, 129 total",
                description: "American forces under Major General Benjamin Lincoln attacked fortified British positions at Stono Ferry but were repulsed with heavy casualties. The failed assault demonstrated continued British strength in the Charleston region.",
                theater: "Southern Theater",
                sources: ["McCrady, Edward. The History of South Carolina in the Revolution, 1775-1780", "Pancake, John S. This Destructive War: The British Campaign in the Carolinas, 1780-1782"],
                primary_sources: ["Lincoln's attack reports and casualty assessments", "British defensive preparations and fortification records", "South Carolina militia accounts and pension applications"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stono_Ferry_Battle_Site_South_Carolina.jpg/800px-Stono_Ferry_Battle_Site_South_Carolina.jpg",
                fun_fact: "Both sides fought so fiercely in the sweltering South Carolina heat that more men collapsed from heat stroke than from enemy fire!",
                quick_summary: "Americans tried to storm British positions in brutal summer heat and learned that fighting in South Carolina's climate was almost as dangerous as the enemy!",
                student_activity: "Research how climate and terrain affected military operations in the Southern colonies. What advantages did local knowledge provide to defenders?"
            },
            {
                name: "Battle of Newtown",
                date: "1779-08-29",
                location: "Elmira, New York",
                latitude: 42.0898,
                longitude: -76.8077,
                outcome: "American Victory",
                significance: "This decisive victory in Sullivan's Expedition broke Iroquois military power and ended the Native American threat on the New York frontier, opening vast territories for American settlement.",
                casualties_american: "5 killed, 32 wounded, 37 total",
                casualties_british: "Unknown but significant casualties",
                description: "American forces under Major General John Sullivan decisively defeated a combined British-Iroquois force in the largest battle of Sullivan's punitive expedition. The victory broke Iroquois resistance and opened western New York to settlement.",
                theater: "Northern Theater",
                sources: ["Graymont, Barbara. The Iroquois in the American Revolution", "Williams, Glenn F. Year of the Hangman: George Washington's Campaign Against the Iroquois"],
                primary_sources: ["Sullivan's detailed expedition reports to Congress", "Iroquois oral histories collected in later periods", "Frontier settlement records and land grants"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sullivan_Expedition_Battle_Newtown.jpg/800px-Sullivan_Expedition_Battle_Newtown.jpg",
                fun_fact: "Sullivan's army was so massive that when they marched through the wilderness in single file, the column stretched for miles and took hours to pass any given point!",
                quick_summary: "Americans unleashed overwhelming force that crushed Iroquois resistance and opened western New York for waves of post-war settlement!",
                student_activity: "Examine the long-term consequences of Sullivan's Expedition for Native American communities and westward expansion. How did military campaigns affect post-war territorial development?"
            },
            {
                name: "Battle of Ramsour's Mill",
                date: "1780-06-20",
                location: "Lincolnton, North Carolina",
                latitude: 35.4735,
                longitude: -81.2456,
                outcome: "American Victory",
                significance: "This crucial Patriot victory disrupted British efforts to recruit Loyalists in western North Carolina and demonstrated continued Patriot strength in the backcountry despite Charleston's fall.",
                casualties_american: "56 killed and wounded, 56 total",
                casualties_british: "150 killed and wounded, 50 captured, 200 total",
                description: "North Carolina Patriots under Captain Francis Locke defeated a gathering of Loyalist militia attempting to organize for British service. The victory significantly disrupted British recruitment efforts in the Carolina backcountry.",
                theater: "Southern Theater",
                sources: ["Rankin, Hugh F. The North Carolina Continentals", "Pancake, John S. This Destructive War: The British Campaign in the Carolinas, 1780-1782"],
                primary_sources: ["Locke's victory reports to state authorities", "Loyalist recruitment records and muster attempts", "North Carolina militia pension applications and service records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ramsours_Mill_Battlefield_North_Carolina.jpg/800px-Ramsours_Mill_Battlefield_North_Carolina.jpg",
                fun_fact: "Many fighters on both sides were neighbors who knew each other personally—imagine the awkwardness of shooting at your former friend over politics!",
                quick_summary: "Patriots and Loyalists who were literally neighbors and former friends fought a vicious battle that proved the Revolution had created true civil war conditions!",
                student_activity: "Investigate how the Revolution created civil war conditions within local communities. What factors determined whether neighbors became enemies?"
            },
            {
                name: "Siege of Pensacola",
                date: "1781-05-08",
                location: "Pensacola, Florida",
                latitude: 30.4518,
                longitude: -87.2071,
                outcome: "Spanish Victory",
                significance: "This Spanish victory secured West Florida and eliminated British naval bases in the Gulf of Mexico, demonstrating that Britain faced enemies on multiple fronts throughout North America.",
                casualties_american: "Minimal (Spanish-led operation with limited American involvement)",
                casualties_british: "105 killed and wounded, 1,113 captured, 1,218 total",
                description: "Spanish forces under Brigadier General Bernardo de Gálvez besieged and captured the heavily fortified British stronghold of Pensacola. This victory gave Spain control of West Florida and eliminated crucial British naval bases.",
                theater: "Gulf Coast Theater",
                sources: ["Caughey, John W. Bernardo de Gálvez in Louisiana, 1776-1783", "Starr, J. Barton. Tories, Dons, and Rebels: The American Revolution in British West Florida"],
                primary_sources: ["Gálvez's detailed siege reports to Spanish Crown", "British surrender documents and garrison records", "Spanish colonial administrative records"],
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Galvez_at_Pensacola_Florida_1781.jpg/800px-Galvez_at_Pensacola_Florida_1781.jpg",
                fun_fact: "Gálvez was seriously wounded during the siege but continued commanding while wrapped in bandages like a determined Spanish mummy leading his troops to victory!",
                quick_summary: "Spanish forces proved that Britain had dangerous enemies everywhere by capturing this crucial Gulf Coast stronghold and naval base!",
                student_activity: "Analyze how Spanish participation in the American Revolution affected British strategic planning and resource allocation. Why did Britain struggle with multiple-front warfare?"
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