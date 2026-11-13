import React from "react";
import { Audio, Series, staticFile, interpolate } from "remotion";
import { Starfield } from "./components/Starfield";

import { Scene01_Hook } from "./scenes/Scene01_Hook";
import { Scene02_CoreChallenge } from "./scenes/Scene02_CoreChallenge";
import { Scene03_CulturalRoots } from "./scenes/Scene03_CulturalRoots";
import { Scene04_GameplayMechanics } from "./scenes/Scene04_GameplayMechanics";
import { Scene05_TeamRoster } from "./scenes/Scene05_TeamRoster";
import { Scene06_NasaScienceData } from "./scenes/Scene06_NasaScienceData";
import { Scene07_VisionOutro } from "./scenes/Scene07_VisionOutro";

// EXACTLY 235.0 SECONDS @ 30 FPS = 7,050 FRAMES
// Safely under the 240-second (4-minute) NASA Space Apps hard cutoff limit
export const TOTAL_FRAMES = 7050;

export const MyComposition: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", backgroundColor: "#070b1e" }}>
      {/* Background Starfield across all scenes */}
      <Starfield density={80} />

      {/* Cinematic Royalty-Free Background Music with gentle ducking under voiceover */}
      <Audio
        src={staticFile("audio/music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 45, 6990, 7050], [0, 0.08, 0.08, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* 7 Acts / Scenes Sequenced Precisely to 235.0 seconds */}
      <Series>
        {/* ACT 1: URGENT HOOK & AI COMPANION (20.0s · 600 frames) */}
        <Series.Sequence durationInFrames={600}>
          <Scene01_Hook />
        </Series.Sequence>

        {/* ACT 2: CORE CHALLENGE & GEN ALPHA VOICE (30.0s · 900 frames) */}
        <Series.Sequence durationInFrames={900}>
          <Scene02_CoreChallenge />
        </Series.Sequence>

        {/* ACT 3: CULTURAL ROOTS & TEAM INSPIRATION (35.0s · 1050 frames) */}
        <Series.Sequence durationInFrames={1050}>
          <Scene03_CulturalRoots />
        </Series.Sequence>

        {/* ACT 4: SIX COUPLED MISSIONS & RESOURCE LEDGER (40.0s · 1200 frames) */}
        <Series.Sequence durationInFrames={1200}>
          <Scene04_GameplayMechanics />
        </Series.Sequence>

        {/* ACT 5: ENGINEERING ROSTER SHOWCASE (28.0s · 840 frames) */}
        <Series.Sequence durationInFrames={840}>
          <Scene05_TeamRoster />
        </Series.Sequence>

        {/* ACT 6: 100% VERIFIED NASA OPEN DATA & MICRO-SKILLS (46.0s · 1380 frames) */}
        <Series.Sequence durationInFrames={1380}>
          <Scene06_NasaScienceData />
        </Series.Sequence>

        {/* ACT 7: FUTURE VISION & CALL TO ACTION (36.0s · 1080 frames) */}
        <Series.Sequence durationInFrames={1080}>
          <Scene07_VisionOutro />
        </Series.Sequence>
      </Series>
    </div>
  );
};
