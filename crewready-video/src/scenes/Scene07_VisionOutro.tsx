import React from "react";
import { Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { THEME } from "../types";

export const Scene07_VisionOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const twinkleBounce = Math.sin(frame / 6) * 6;

  const roadmapItems = [
    { title: "Multiplayer Co-Op", icon: "🎮", desc: "Collaborative rooms across phones" },
    { title: "Space Science Reels", icon: "📱", desc: "Short video facts for kids" },
    { title: "Exoplanets & Moon", icon: "🪐", desc: "New missions beyond Mars" },
    { title: "10+ Global Languages", icon: "🌍", desc: "Free access worldwide" },
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
        <Audio src={staticFile("audio/scenes/scene_07.mp3")} volume={1.0} />
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
            ACT 7 · FUTURE ROADMAP & CALL TO ACTION
          </span>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "44px",
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "Nunito, system-ui",
          }}
        >
          Spark Curiosity. <span style={{ color: THEME.cyan }}>Give It Room to Grow.</span>
        </h2>
      </div>

      {/* 4 Roadmap Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          width: "100%",
          maxWidth: "1280px",
          marginBottom: "24px",
        }}
      >
        {roadmapItems.map((item, idx) => {
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
                backgroundColor: "rgba(16, 26, 62, 0.85)",
                border: "1.5px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "28px" }}>{item.icon}</span>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "15px" }}>{item.title}</div>
              <div style={{ color: THEME.muted, fontSize: "12px", lineHeight: 1.3 }}>{item.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Final Hero Lockup Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1280px",
          backgroundColor: "rgba(10, 18, 48, 0.95)",
          border: `2px solid ${THEME.cyan}70`,
          borderRadius: "22px",
          padding: "18px 36px",
          boxShadow: `0 15px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(34, 215, 230, 0.25)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Img
            src={staticFile("art/orbit-wave.webp")}
            style={{ width: "54px", height: "54px" }}
          />
          <Img
            src={staticFile("art/twinkle-stars.webp")}
            style={{
              width: "50px",
              height: "50px",
              transform: `translateY(${twinkleBounce}px)`,
            }}
          />
          <Img
            src={staticFile("art/nova-wave.webp")}
            style={{ width: "54px", height: "54px" }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: "24px", color: "#ffffff", fontWeight: 900 }}>
              CREWREADY: BEYOND US
            </h3>
            <p style={{ margin: "2px 0 0 0", color: THEME.textSecondary, fontSize: "13px" }}>
              NASA Space Apps Challenge 2026 · Team Young Sparks of Bangladesh × Script Pair
            </p>
          </div>
        </div>

        {/* URL Pill */}
        <div
          style={{
            backgroundColor: THEME.cyan,
            color: "#070b1e",
            padding: "12px 28px",
            borderRadius: "30px",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "0.5px",
            fontFamily: "Nunito, system-ui",
            boxShadow: `0 0 20px ${THEME.cyanGlow}`,
          }}
        >
          crewready.space
        </div>
      </div>

      <SyncedSubtitles
        sceneId="scene_07"
        actTag="Act 7 · Future Vision & Call to Action"
        audioDelayFrames={15}
      />
    </div>
  );
};
