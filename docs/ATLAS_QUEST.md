# Atlas Quest — discovery island

Added 25 October 2026, Asia/Kuala_Lumpur. Open `/atlas/?module=quest`, choose **Atlas Quest** in the sidebar, or use the highlighted invitation on the landing page and overview. The profile avatar in the top bar also opens the explorer passport.

## Purpose and play

Atlas Quest is a short, code-generated low-poly 3D exploration game. A player moves a synthetic explorer around a floating island to five landmarks. Click a landmark or the island to walk, or focus the scene and use WASD / arrow keys. The five checkpoint buttons provide equivalent play without WebGL or movement. Each checkpoint offers a multiple-choice question, an explanation and a link to the related atlas module.

The challenges cover reviewing resume mentions, geographical granularity, scenario uncertainty, prerequisite ordering and intended SDG contributions. They explain how to use the prototype responsibly. They do not assess occupational proficiency. The question bank is authored content in `src/lib/quest.ts`, with links to the existing intake/learning methods, OpenDOSM, ILO and UN goals. No new external dataset, question-generation service or runtime AI model is introduced.

## Explorer profile and achievements

Each unique correct checkpoint awards 100 exploration XP and its badge, up to 500 XP and five badges. Repeating a solved checkpoint cannot farm more XP. The passport displays the current synthetic profile's first name, an exploration rank, progress and badge collection. Earned badges can be equipped as a title. The player can choose a cobalt, coral or emerald outfit and an orb or cube companion. These choices affect presentation only.

The ordinary atlas also records visited worlds and shows its exploration milestones. Atlas Quest and the other milestones are demonstration activity records. They never raise a skill level, change a match score, award a credential or claim real learning outcomes. Testing with learners is needed before claiming that the game improves engagement or retention.

## Storage, motion and access

Quest progress and cosmetics use `shiftatlas-quest-v1` in browser localStorage. Unknown versions, invalid IDs, duplicate completions and unearned equipped badges are sanitised. Ordinary world visits use `shiftatlas-visited-v1`; the existing synthetic profile and learning completion store remains separate. No account, analytics, public leaderboard or server profile is added. **Reset quest** clears only the quest progress and cosmetics.

Pause, reduced-motion settings, offscreen visibility and browser-tab visibility govern animation. The scene accepts movement keys only while focused and releases held keys when it loses focus. Text mode and checkpoint buttons preserve the questions, badges and source links without WebGL. All structures, avatar, companion, crystals and decorative trees are procedural geometry; no external 3D model is downloaded.

## Demo highlight (about 45 seconds)

1. Open Atlas Quest from the landing-page highlight.
2. Click the Evidence Observatory and let the explorer walk there. Open its challenge.
3. Choose the answer that reviews the original excerpt and self-assesses the level.
4. Show the 100 XP award, unlocked **Evidence scout** badge and equipped title.
5. Change the explorer colour or companion, then follow the linked skill-profile module.
6. Return to the quest to show saved progress. Keep the evidence-to-role-matching demonstration as the core hackathon proof.

See `VERIFICATION.md` for actual executed checks and outstanding device/browser acceptance. This document describes intended and implemented controls, rather than claiming user-study results.
