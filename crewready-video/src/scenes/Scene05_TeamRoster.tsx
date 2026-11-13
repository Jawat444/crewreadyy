import React from "react";
import { Audio, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { THEME } from "../types";

export const Scene05_TeamRoster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titlePop = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const team = [
    {
      name: "Ahnaf",
      role: "Gamification & Engagement",
      contribution: "Researched what keeps young gamers engaged & designed reward loops",
      icon: "🎯",
      color: THEME.gold,
    },
    {
      name: "Tasfi",
      role: "NASA Open Data Verification",
      contribution: "Gathered real NASA DONKI/NOAA data so every in-game fact is accurate",
      icon: "🛰️",
      color: THEME.pink,
    },
    {
      name: "Riyad",
      role: "Lead Developer & Engine",
      contribution: "Built the core simulation engine, decision math & state management",
      icon: "⚡",
      color: THEME.cyan,
    },
    {
      name: "Ormi",
      role: "3D Environments & Scene Design",
      contribution: "Designed atmospheric Mars environments, 3D scenes & user interfaces",
      icon: "🎨",
      color: THEME.green,
    },
    {
      name: "Jawat",
      role: "Data Architecture & Backend",
      contribution: "Managed simulation datasets, offline caching & test suites",
      icon: "💻",
      color: "#38BDF8",
    },
    {
      name: "Wasima",
      role: "Narrative & Scriptwriting",
      contribution: "Adapted space science into child-friendly prose and wrote the script",
      icon: "✍️",
      color: "#A855F7",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "45px 80px 140px 80px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Sequence from={15}>
        <Audio src={staticFile("audio/scenes/scene_05.mp3")} volume={1.0} />
      </Sequence>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${titlePop})`,
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(34, 215, 230, 0.15)",
            border: `1.5px solid ${THEME.cyan}`,
            borderRadius: "20px",
            padding: "5px 16px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "14px" }}>🇧🇩</span>
          <span style={{ color: THEME.cyan, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
            ACT 5 · MULTIDISCIPLINARY ENGINEERING ROSTER
          </span>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "Nunito, system-ui",
          }}
        >
          Meet the Crew Behind <span style={{ color: THEME.cyan }}>CrewReady</span>
        </h2>
        <p style={{ margin: "4px 0 0 0", color: THEME.muted, fontSize: "16px" }}>
          Six multidisciplinary creators turning complex aerospace science into accessible play
        </p>
      </div>

      {/* 6 Team Member Cards Grid (3x2 Bento) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          width: "100%",
          maxWidth: "1320px",
        }}
      >
        {team.map((m, idx) => {
          const cardSpring = spring({
            frame: frame - idx * 5,
            fps,
            config: { damping: 13, mass: 0.6, stiffness: 120 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${Math.max(0, cardSpring)})`,
                backgroundColor: "rgba(16, 26, 62, 0.9)",
                border: `1.5px solid ${m.color}75`,
                borderRadius: "18px",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: "18px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: `${m.color}20`,
                  border: `2px solid ${m.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  flexShrink: 0,
                  boxShadow: `0 0 15px ${m.color}35`,
                }}
              >
                {m.icon}
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    fontFamily: "Nunito, system-ui",
                  }}
                >
                  {m.name}
                </h4>
                <div
                  style={{
                    margin: "2px 0 4px 0",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: m.color,
                  }}
                >
                  {m.role}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: THEME.textSecondary,
                    lineHeight: 1.35,
                  }}
                >
                  {m.contribution}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <SyncedSubtitles
        sceneId="scene_05"
        actTag="Act 5 · Engineering Roster Showcase"
        audioDelayFrames={15}
      />
    </div>
  );
};
