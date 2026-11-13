import React from "react";
import { Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { THEME } from "../types";

export const Scene06_NasaScienceData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const nasaDatasets = [
    {
      name: "NASA DONKI",
      tag: "SOLAR FLARES & CMES",
      desc: "Live coronal mass ejection alerts drive in-game space weather and radiation risk",
      color: THEME.gold,
      icon: "☀️",
    },
    {
      name: "NOAA SWPC",
      tag: "GEOMAGNETIC STORMS",
      desc: "Real-time Kp index monitor sets survival difficulty and shield decay rates",
      color: THEME.cyan,
      icon: "🛰️",
    },
    {
      name: "NASA NeoWs",
      tag: "NEAR-EARTH ASTEROIDS",
      desc: "Real close-approach radar tracking feeds the endless runner mini-game hazards",
      color: THEME.pink,
      icon: "☄️",
    },
    {
      name: "NASA OSDR",
      tag: "PLANT BIOLOGY (VEGGIE)",
      desc: "International Space Station plant growth experiments shape Martian hydroponic farming",
      color: THEME.green,
      icon: "🌱",
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
        <Audio src={staticFile("audio/scenes/scene_06.mp3")} volume={1.0} />
      </Sequence>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${entrance})`,
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: `1.5px solid ${THEME.green}`,
            borderRadius: "20px",
            padding: "5px 16px",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: THEME.green, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
            ACT 6 · 100% VERIFIED NASA OPEN DATA & MICRO-SKILLS
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
          Real Space Data · <span style={{ color: THEME.gold }}>Lifelong Human Skills</span>
        </h2>
        <p style={{ margin: "4px 0 0 0", color: THEME.muted, fontSize: "16px" }}>
          Learning to manage limited resources under pressure—like pocket money in a spacesuit
        </p>
      </div>

      {/* 2-Column Layout: NASA Datasets on Left, Game Features & Skills on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "24px",
          width: "100%",
          maxWidth: "1340px",
        }}
      >
        {/* Left: 4 Verified Open Datasets */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {nasaDatasets.map((d, idx) => {
            const cardPop = spring({
              frame: frame - idx * 4,
              fps,
              config: { damping: 13, mass: 0.6, stiffness: 120 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `scale(${Math.max(0, cardPop)})`,
                  backgroundColor: "rgba(16, 26, 62, 0.9)",
                  border: `1.5px solid ${d.color}60`,
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "22px" }}>{d.icon}</span>
                  <span
                    style={{
                      backgroundColor: `${d.color}20`,
                      color: d.color,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {d.tag}
                  </span>
                </div>

                <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "16px" }}>{d.name}</div>
                <div style={{ color: THEME.textSecondary, fontSize: "12px", lineHeight: 1.35 }}>
                  {d.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Gamification & Micro-Skills Card */}
        <div
          style={{
            backgroundColor: "rgba(12, 22, 54, 0.88)",
            border: `1.5px solid ${THEME.cyan}60`,
            borderRadius: "18px",
            padding: "22px 26px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Img
              src={staticFile("art/orbit-run.webp")}
              style={{ width: "48px", height: "48px", flexShrink: 0 }}
            />
            <div>
              <div style={{ color: THEME.cyan, fontWeight: 800, fontSize: "16px" }}>
                Endless Space Runner & Mini-Games
              </div>
              <div style={{ color: THEME.muted, fontSize: "12px" }}>
                Earn stardust, upgrade your rocket, and compete on the global leaderboard
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                backgroundColor: "rgba(7, 11, 30, 0.75)",
                borderLeft: `4px solid ${THEME.cyan}`,
                padding: "10px 14px",
                borderRadius: "6px",
              }}
            >
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "14px" }}>
                Critical Decision-Making Under Pressure
              </div>
              <div style={{ color: THEME.muted, fontSize: "12px" }}>
                Children weigh immediate survival against long-term mission success.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(7, 11, 30, 0.75)",
                borderLeft: `4px solid ${THEME.gold}`,
                padding: "10px 14px",
                borderRadius: "6px",
              }}
            >
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "14px" }}>
                Resource Budgeting & Systems Thinking
              </div>
              <div style={{ color: THEME.muted, fontSize: "12px" }}>
                Understanding that energy, oxygen, and food are coupled finite commodities.
              </div>
            </div>
          </div>
        </div>
      </div>

      <SyncedSubtitles
        sceneId="scene_06"
        actTag="Act 6 · Verified NASA Open Data & Micro-Skills"
        audioDelayFrames={15}
      />
    </div>
  );
};
