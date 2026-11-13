# CrewReady: 30-Second Video (Final Draft)

**Hard limit:** 30.0 s. **Voiceover:** about 75 words, so read it fast and energetic.
**Rules:** English subtitles burned in · hosted publicly, no login · not uploaded to the NASA site.

---

## 1. Voiceover, shots and on-screen text

### 0:00 – 0:04 | HOOK

**VO:** "No one knows when Earth could become uninhabitable. Is our next gen ready?"

**Shots (fast cuts, about 0.5 s each):** wildfire · flood · polluted city · crowded street · empty shelves · solar flare · asteroid · glitching robot. End on a kid looking up at the stars.

### 0:04 – 0:07 | WHO WE ARE

**VO:** "So we built CrewReady, to make them READY!"

**On screen (team card, hold it until 0:08):**

> **Young Sparks of Bangladesh × ScriptySphere** · Cumilla, Bangladesh
> Ahnaf Bin Ashraf Nabil, Team Lead & Gamification Research
> Barkat Ullah Shah Riyad, Lead Developer & Player Retention Research
> Tasfia Zaman Totiny, NASA Open Data Verification & Narrative
> Imtiaj Ahmed Ormi, 3D Environments & Scene Design (UI)
> Jawat Hossain Rian, Data Architecture & Backend
> Wasima Hoque Syeda, Scriptwriting & Video Editing

Six names can't be read in 3 seconds as a list. Use six small photo tiles, each with name and role, popping in one after another.

### 0:07 – 0:12 | PROBLEM

**VO:** "Gen Alpha: short attention, huge potential, and no game that keeps their space curiosity alive."

**On screen:** `NASA Space Apps 2026 · Build a Junior Astronaut Mission Trainer`
**Shot:** a kid swiping away a boring space quiz, or scrolling and then stopping on a star photo.

### 0:12 – 0:22 | THE THING WORKING

**VO:** "Twinkle, who speaks fluent Gen Alpha, leads every mission. Kids pack, land and ration power, and the difficulty runs on live NASA data, like today's real Sun storms."

Every shot carries two tags in the corner: **You learn:** and **Data:**.

| Time | Screen | You learn | Data |
|---|---|---|---|
| 0:12–0:13.5 | Twinkle's help card ("Bestie, what's this asking?"), then a result heading like "Big W, Commander!" | Ask, think, then choose | — |
| 0:13.5–0:15 | Level 1: drag crates into the 4 meters | Budgeting with too little | Rocket mass vs fuel |
| 0:15–0:16.5 | Level 3: tap the landing steps in order | How a Mars landing works | NASA landing sequence |
| 0:16.5–0:18 | Level 4: battery sliders | What can wait, what can't | NASA InSight Mars weather |
| 0:18–0:20.5 | **Level 2 storm card** showing the **NASA LIVE** badge and "Kp 6", then meters drop | Sun storms damage spacecraft | **NASA DONKI · live storm strength** |
| 0:20.5–0:22 | Fly: ship dodging obstacles | Quick, calm choices | **NOAA SWPC · today's Kp sets the speed** |

Bonus mini-games: if you have half a second spare, slip in one arcade game between Level 4 and Level 2.

### 0:22 – 0:30 | IMPACT

**VO:** "Kids stay curious about space, and learn to manage what they have in real life. Next: crew missions, new planets, more languages. CrewReady!"

**Shots:** a kid smiling at the Success screen → **flash the বাংলা toggle** (Mission Settings → 🇧🇩 বাংলা) and show the screen switching language.

**End card (0:27–0:30):**

> **CrewReady**
> [game link]
> Coming soon: multiplayer crews · more planets · astronaut simulation training · more languages
> Data: NASA DONKI · NOAA SWPC · NASA InSight · NASA OSDR

---

## 2. Subtitles (fix the times after recording the voice)

```srt
1
00:00:00,000 --> 00:00:04,000
No one knows when Earth could become uninhabitable.
Is our next gen ready?

2
00:00:04,000 --> 00:00:07,000
So we built CrewReady, to make them READY!

3
00:00:07,000 --> 00:00:12,000
Gen Alpha: short attention, huge potential,
and no game that keeps their space curiosity alive.

4
00:00:12,000 --> 00:00:16,500
Twinkle, who speaks fluent Gen Alpha, leads every mission.
Kids pack, land and ration power,

5
00:00:16,500 --> 00:00:22,000
and the difficulty runs on live NASA data,
like today's real Sun storms.

6
00:00:22,000 --> 00:00:26,000
Kids stay curious about space, and learn
to manage what they have in real life.

7
00:00:26,000 --> 00:00:30,000
Next: crew missions, new planets, more languages.
CrewReady!
```

---

## 3. Facts behind the claims (checked in the code)

- **Level 2 storm:** `src/services/nasa.ts` reads NASA DONKI storms from the last 30 days. `src/engine/storm.ts` turns the strongest one into a Small, Medium or Large storm (10, 20 or 30 damage).
  - On 14 Nov 2026, DONKI showed one storm, on 31 Oct, at **Kp 6**. That gives a **Medium** storm and the **NASA LIVE** badge.
  - If no storm falls inside the 30 days, the game uses the May 2024 archive storm and the badge says **NASA ARCHIVE**.
  - Record before **30 Nov**, or check the badge again on the day you record.
- **Fly:** `src/fly/engine.ts` uses today's NOAA Kp to set the speed: Kp 0–3 is slow, 4–6 is medium, 7+ is fast. On 14 Nov, Kp was about 0.7, so Fly is on **slow**. That is still true, so it's fine to show.
- **Twinkle:** Twinkle now uses Gen Alpha lines in the game (`src/components/Twinkle.tsx`), in English and Bangla:
  - The help card opens with "Bestie, what's this asking?"
  - After each choice, the result heading says lines like "Big W, Commander!", "No cap, smart move!", "Lowkey costly. Okay!" or "Oof, that's an L."
  - The same step always gets the same line, so a retake looks identical. Level 1 packing shows "Big W, Commander!".
