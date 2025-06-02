# UI Changes Testing Checklist

## 1. Battle Marker Hover/Click Glitch Fix

**Objective:** Ensure battle marker interactions are smooth, reliable, and free of glitches.

| Test Case ID | Description                                                                                                | Expected Result                                                                                                   | Status (Pass/Fail) | Notes                                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------- | :------------------------------------------------------------------ |
| BM-001       | Hover over a battle marker.                                                                                | Tooltip with battle name appears. Marker style changes (increased size, shadow). No visual glitches.            |                    |                                                                     |
| BM-002       | Move the mouse off the battle marker.                                                                      | Tooltip disappears. Marker style reverts to normal. No visual glitches.                                           |                    |                                                                     |
| BM-003       | Click on a battle marker.                                                                                  | Popup opens displaying battle summary and "Explore This Battle!" button. No other panels open. No glitches.       |                    |                                                                     |
| BM-004       | Click the "Explore This Battle!" button within the popup.                                                  | Battle Info Panel opens with the correct battle's details. Popup closes. No visual glitches.                      |                    |                                                                     |
| BM-005       | Rapidly hover on and off a marker multiple times.                                                          | Tooltip and hover styles should appear/disappear cleanly without flickering or sticking.                            |                    |                                                                     |
| BM-006       | Click a marker, then click another marker before interacting with the first popup's "Explore" button.      | First popup should close (or be replaced), new popup for second marker should open. Behavior should be consistent. |                    |                                                                     |
| BM-007       | Test interactions (hover, click, explore) on at least 5 different battle markers across the map.           | All interactions are consistent and correct for each marker.                                                      |                    | List markers tested if issues found.                                |
| BM-008       | **(Manual)** Test BM-001 to BM-004 on different browsers (e.g., Chrome, Firefox, Safari, Edge).             | Functionality is consistent across supported browsers.                                                            |                    | Note browser versions and any discrepancies.                        |
| BM-009       | **(Manual)** Test BM-001 to BM-004 on different screen sizes (desktop, tablet, mobile). Use tap for clicks. | Interactions work correctly on touch devices. Tap targets are adequate. No visual glitches.                       |                    | Note device/emulator used and any discrepancies.                    |
| BM-010       | Click map outside of any marker or popup.                                                                  | Any open marker popup should close. Battle Info Panel should remain if open.                                      |                    |                                                                     |
| BM-011       | Open Battle Info Panel, then click a new marker and its "Explore" button.                                  | Panel updates with new battle details smoothly.                                                                   |                    |                                                                     |

## 2. Battle Info Panel Visibility Fix

**Objective:** Ensure the Battle Info Panel displays all content correctly, with scrolling for overflow, and is responsive.

| Test Case ID | Description                                                                                                   | Expected Result                                                                                                     | Status (Pass/Fail) | Notes                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ | :----------------- | :-------------------------------------------------------------------- |
| BIP-001      | Open a battle with a short description and minimal casualty data in the Battle Info Panel.                      | All content, including casualties, is fully visible without scrolling (if it fits). Panel layout is correct.        |                    | E.g., Capture of Fort Ticonderoga                                     |
| BIP-002      | Open a battle with a long description and detailed casualty data in the Battle Info Panel.                      | All content, including the "Battle Costs" (casualties) section, is accessible.                                      |                    | E.g., Siege of Charleston, Battle of Saratoga                         |
| BIP-003      | If content in BIP-002 overflows the panel's visible height:                                                   | A vertical scrollbar appears for the `.panel-content` area. The panel header remains fixed.                         |                    |                                                                       |
| BIP-004      | Scroll the content within the Battle Info Panel using the scrollbar (if present).                               | Content scrolls smoothly. All parts of the battle details, including the bottom, are reachable.                     |                    |                                                                       |
| BIP-005      | **(Manual)** Resize the browser window (or switch to smaller device view) while the Battle Info Panel is open. | Panel width/height adjusts responsively. Content remains accessible, scrolling works if needed. No layout breaks.   |                    | Test down to mobile width (e.g., 360px).                              |
| BIP-006      | Close and reopen the Battle Info Panel for the same battle.                                                     | Panel visibility and scroll state (if any) are consistent / reset appropriately. Content is still fully accessible. |                    |                                                                       |
| BIP-007      | Check the padding and spacing within the panel content.                                                         | Content is well-spaced and readable. No elements overlap or are cut off internally.                                 |                    |                                                                       |

## 3. Top Banner Visual Enhancement

**Objective:** Verify the updated visual styles of the `.app-header` are applied correctly and look professional.

| Test Case ID | Description                                                                                                 | Expected Result                                                                                                        | Status (Pass/Fail) | Notes                               |
| :----------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------- | :---------------------------------- |
| TB-001       | Observe the background of the `.app-header`.                                                                | New gradient (`var(--color-primary)` to `#1e3c72`) is displayed correctly.                                              |                    |                                     |
| TB-002       | Examine the subtlety of the SVG background pattern in the header.                                           | SVG pattern is present but very subtle (due to `opacity: 0.05` on `::before` and `opacity="0.1"` in SVG fill).         |                    | Might be hard to see, which is intended. |
| TB-003       | Inspect the main title (`h1`) in the header.                                                                | Font weight is `var(--font-weight-bold)` (600). Text shadow is `1px 1px 3px rgba(0, 0, 0, 0.4)`. Color is white.     |                    |                                     |
| TB-004       | Inspect the subtitle (`p`) in the header.                                                                   | Opacity is `0.85`. Color is white. Line height is `var(--line-height-tight)`.                                          |                    |                                     |
| TB-005       | Check the bottom edge of the header.                                                                        | A subtle `border-bottom: 1px solid rgba(255, 255, 255, 0.1);` is visible and creates a clean separation.               |                    |                                     |
| TB-006       | **(Manual)** Assess overall visual appeal on different screen sizes (desktop, tablet, mobile).              | Header looks polished, professional, and text is legible. Enhancements are consistent across screen sizes.             |                    |                                     |
| TB-007       | Ensure header text (`h1`, `p`) is properly centered or aligned as intended within the header container.       | Text alignment and spacing within the header are correct and visually balanced.                                        |                    |                                     |

## 4. General Functionality (Regression Testing)

**Objective:** Ensure that recent UI changes have not negatively impacted other core application features.

| Test Case ID | Feature Area          | Action                                                                      | Expected Result                                                              | Status (Pass/Fail) | Notes                                       |
| :----------- | :-------------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :----------------- | :------------------------------------------ |
| GEN-001      | Timeline Slider       | Drag the timeline slider. Click the play/pause button.                      | Map updates visible battles correctly. Play function animates the timeline.  |                    |                                             |
| GEN-002      | Layer Controls        | Toggle "Battle Markers" and "Territorial Control" checkboxes.             | Corresponding layers appear/disappear from the map.                          |                    |                                             |
| GEN-003      | Battle Search         | Type a known battle name in the search input. Click a search result.        | Relevant results appear. Clicking a result pans/zooms to and opens the B.I.P. |                    |                                             |
| GEN-004      | 'Surprise Me!' Button | Click the "Surprise Me!" button.                                            | A random battle's details are shown in the Battle Info Panel. Map focuses.   |                    |                                             |
| GEN-005      | Discovery Tracker     | Explore a new battle (if any undiscovered).                                 | Progress bar and text update correctly.                                      |                    | Requires undiscovered battles for full test. |
| GEN-006      | Achievement Alerts    | Trigger conditions for an achievement (e.g., first discovery, 5 discoveries). | Achievement notification appears if conditions are met.                      |                    | May need to reset local storage to test.    |

---
**General Testing Notes:**
*   Clear browser cache and cookies before starting a new testing session to ensure fresh assets are loaded.
*   Keep the developer console open to check for any JavaScript errors or warnings during interactions.
*   Note down any specific battle names, browser versions, or screen sizes if issues are encountered.
*   "Visual glitches" include any unexpected jumps, flickering, overlapping elements, or elements not rendering correctly.
---
