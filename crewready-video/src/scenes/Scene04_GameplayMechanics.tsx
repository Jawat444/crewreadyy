import React from "react";
import { Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { MeterBar } from "../components/MeterBar";
import { THEME } from "../types";

export const Scene04_GameplayMechanics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Highlight progression across the 6 levels over time
  const activeLevel = Math.min(5, Math.floor((frame / 1080) * 6));

  const levels = [
    { num: "01", title: "Pack Rocket", icon: "📦", desc: "Mass Budget & Cargo Trade" },
    { num: "02", title: "Solar Storm", icon: "☀️", desc: "Radiation Shelter & DONKI" },
    { num: "03", title: "Mars Landing", icon: "🔴", desc: "7-Minute Radio Comms Delay" },
    { num: "04", title: "Dust Storm", icon: "🌪️", desc: "Battery Sharing & Panels" },
    { num: "05", title: "Space Farm", icon: "🌱", desc: "OSDR Hydroponic Growth" },
    { num: "06", title: "Crew Rescue", icon: "🧑‍🚀", desc: "Specialist Teamwork Finale" },
  ];

  const powerVal = interpolate(frame, [0, 500, 1080], [70, 45, 62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waterVal = interpolate(frame, [0, 500, 1080], [80, 55, 68], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const foodVal = interpolate(frame, [0, 500, 1080], [85, 60, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shieldVal = interpolate(frame, [0, 500, 1080], [60, 35, 75], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        <Audio src={staticFile("audio/scenes/scene_04.mp3")} volume={1.0} />
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
            backgroundColor: "rgba(245, 183, 0, 0.15)",
            border: `1.5px solid ${THEME.gold}`,
            borderRadius: "20px",
            padding: "5px 16px",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: THEME.gold, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
            ACT 4 · SIX COUPLED MISSIONS & RESOURCE LEDGER
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
          Every Choice Costs <span style={{ color: THEME.cyan }}>Power, Air, Water, or Food</span>
        </h2>
      </div>

      {/* Top Banner: Cadet Selection + 4 Resource Meters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1340px",
          backgroundColor: "rgba(14, 22, 54, 0.85)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "18px",
          padding: "16px 28px",
          marginBottom: "22px",
        }}
      >
        {/* Avatars */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Img src={staticFile("art/orbit-stand.webp")} style={{ width: "42px", height: "42px" }} />
            <div>
              <div style={{ color: THEME.cyan, fontWeight: 800, fontSize: "14px" }}>Cadet Orbit</div>
              <div style={{ color: THEME.muted, fontSize: "11px" }}>Teal Spacesuit</div>
            </div>
          </div>
          <span style={{ color: THEME.muted, fontSize: "16px" }}>vs</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Img src={staticFile("art/nova-stand.webp")} style={{ width: "42px", height: "42px" }} />
            <div>
              <div style={{ color: THEME.pink, fontWeight: 800, fontSize: "14px" }}>Cadet Nova</div>
              <div style={{ color: THEME.muted, fontSize: "11px" }}>Pink Spacesuit</div>
            </div>
          </div>
        </div>

        {/* 4 Survival Meters */}
        <div style={{ display: "flex", gap: "16px" }}>
          <MeterBar label="Power" icon="⚡" value={powerVal} color={THEME.cyan} />
          <MeterBar label="Air & Water" icon="💧" value={waterVal} color="#38BDF8" />
          <MeterBar label="Food" icon="🥗" value={foodVal} color={THEME.green} />
          <MeterBar label="Shield" icon="🛡️" value={shieldVal} color={THEME.gold} />
        </div>
      </div>

      {/* 6 Mission Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "14px",
          width: "100%",
          maxWidth: "1340px",
        }}
      >
        {levels.map((lvl, idx) => {
          const isActive = idx === activeLevel;
          const cardSpring = spring({
            frame: frame - idx * 4,
            fps,
            config: { damping: 13, mass: 0.6, stiffness: 120 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${Math.max(0, cardSpring)})`,
                backgroundColor: isActive ? "rgba(34, 215, 230, 0.15)" : "rgba(20, 32, 77, 0.85)",
                border: isActive ? `2px solid ${THEME.cyan}` : "1.5px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
                boxShadow: isActive ? "0 10px 30px rgba(34, 215, 230, 0.3)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 900,
                  color: isActive ? THEME.cyan : THEME.muted,
                  letterSpacing: "1px",
                }}
              >
                LEVEL {lvl.num}
              </div>

              <div style={{ fontSize: "28px" }}>{lvl.icon}</div>

              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "14px", lineHeight: 1.2 }}>
                {lvl.title}
              </div>

              <div style={{ color: THEME.textSecondary, fontSize: "11px", lineHeight: 1.3 }}>
                {lvl.desc}
              </div>
            </div>
          );
        })}
      </div>

      <SyncedSubtitles
        sceneId="scene_04"
        actTag="Act 4 · Six Coupled Missions & Resource Ledger"
        audioDelayFrames={15}
      />
    </div>
  );
};
