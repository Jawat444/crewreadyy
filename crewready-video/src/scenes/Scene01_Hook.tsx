import React from "react";
import { Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { MeterBar } from "../components/MeterBar";
import { THEME } from "../types";

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const mockupEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 90 },
  });

  const twinkleFloat = Math.sin(frame / 8) * 8;

  // Power meter gradual drain to emphasize urgency
  const powerDrain = interpolate(frame, [0, 400], [88, 42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 100px 140px 100px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Voiceover Audio delayed by 15 frames (0.5s) */}
      <Sequence from={15}>
        <Audio src={staticFile("audio/scenes/scene_01.mp3")} volume={1.0} />
      </Sequence>

      {/* Left Column: Hook Headline, NASA Badge, Emergency Dilemma */}
      <div
        style={{
          flex: 1,
          maxWidth: "760px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          transform: `scale(${titlePop})`,
          zIndex: 10,
        }}
      >
        {/* Top Challenge Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div
            style={{
              backgroundColor: "rgba(34, 215, 230, 0.15)",
              border: `1.5px solid ${THEME.cyan}`,
              borderRadius: "20px",
              padding: "6px 16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🚀</span>
            <span style={{ color: THEME.cyan, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
              NASA SPACE APPS CHALLENGE 2026
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(245, 183, 0, 0.15)",
              border: `1px solid ${THEME.gold}`,
              borderRadius: "20px",
              padding: "6px 14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ color: THEME.gold, fontWeight: 700, fontSize: "12px" }}>
              DONKI & NOAA INTEGRATED
            </span>
          </div>
        </div>

        {/* Main Title Lockup */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "58px",
              fontWeight: 900,
              color: "#FFFFFF",
              fontFamily: "Nunito, system-ui",
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            CrewReady: <span style={{ color: THEME.cyan }}>Beyond Us</span>
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              color: THEME.textSecondary,
              fontFamily: "Nunito, system-ui",
              fontWeight: 600,
            }}
          >
            Junior Astronaut Space Mission Trainer
          </p>
        </div>

        {/* Core Premise Box */}
        <div
          style={{
            backgroundColor: "rgba(20, 32, 77, 0.85)",
            border: `1.5px solid rgba(34, 215, 230, 0.35)`,
            borderRadius: "18px",
            padding: "20px 24px",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Img
              src={staticFile("art/twinkle-wink.webp")}
              style={{
                width: "48px",
                height: "48px",
                transform: `translateY(${twinkleFloat}px)`,
                filter: "drop-shadow(0 0 10px rgba(34,215,230,0.5))",
              }}
            />
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "16px" }}>
                Meet Twinkle — Your AI Copilot
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px" }}>
                Teaming up with junior astronauts to find humanity's next home
              </div>
            </div>
          </div>

          {/* 4 Live Mission Meters */}
          <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
            <MeterBar label="Power" icon="⚡" value={powerDrain} color={THEME.cyan} />
            <MeterBar label="Air & Water" icon="💧" value={76} color="#38BDF8" />
            <MeterBar label="Food" icon="🥗" value={82} color={THEME.green} />
            <MeterBar label="Shield" icon="🛡️" value={60} color={THEME.gold} />
          </div>
        </div>
      </div>

      {/* Right Column: Hero Device Mockup showing real game screen */}
      <div
        style={{
          flex: 1,
          maxWidth: "800px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${Math.max(0, mockupEntrance)})`,
          zIndex: 5,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(34, 215, 230, 0.2)",
            border: "2px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <Img
            src={staticFile("images/mockup_realistic.jpg")}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Synced Subtitles */}
      <SyncedSubtitles
        sceneId="scene_01"
        actTag="Act 1 · Urgent Hook & AI Companion"
        audioDelayFrames={15}
      />
    </div>
  );
};
