import React from "react";
import { Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { THEME } from "../types";

export const Scene02_CoreChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Bilingual switch toggle animation back and forth
  const isBangla = Math.floor(frame / 120) % 2 === 1;

  // Space weather Kp index animated dial
  const kpIndex = interpolate(frame, [0, 450, 900], [1.2, 7.8, 4.5], {
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "50px 90px 140px 90px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Sequence from={15}>
        <Audio src={staticFile("audio/scenes/scene_02.mp3")} volume={1.0} />
      </Sequence>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${entrance})`,
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(232, 51, 139, 0.15)",
            border: `1.5px solid ${THEME.pink}`,
            borderRadius: "20px",
            padding: "5px 16px",
            marginBottom: "10px",
          }}
        >
          <span style={{ color: THEME.pink, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
            ACT 2 · THE CORE CHALLENGE & GEN ALPHA VOICE
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
          Real Space Has <span style={{ color: THEME.gold }}>No Easy Mode</span>
        </h2>
        <p style={{ margin: "6px 0 0 0", color: THEME.muted, fontSize: "18px" }}>
          Moving beyond boring multiple-choice quizzes into living, scientific simulations
        </p>
      </div>

      {/* 2-Column Comparison Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px",
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        {/* Left Card: The Problem */}
        <div
          style={{
            backgroundColor: "rgba(20, 24, 45, 0.85)",
            border: `1.5px solid rgba(239, 68, 68, 0.4)`,
            borderRadius: "20px",
            padding: "26px 30px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>❌</span>
            <h3 style={{ margin: 0, fontSize: "22px", color: THEME.red, fontWeight: 800 }}>
              The Space Education Dilemma
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderLeft: `4px solid ${THEME.red}`,
                padding: "10px 14px",
                borderRadius: "4px",
              }}
            >
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "15px" }}>
                Zero Real Science in Games
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px" }}>
                Most mobile space games use fantasy mechanics with disconnected arcade physics.
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderLeft: `4px solid ${THEME.red}`,
                padding: "10px 14px",
                borderRadius: "4px",
              }}
            >
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "15px" }}>
                Classroom Quizzes Feel Like Homework
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px" }}>
                Static multiple-choice tests fail to engage children whose attention spans require agency.
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: CrewReady's Breakthrough Fix */}
        <div
          style={{
            backgroundColor: "rgba(14, 30, 68, 0.85)",
            border: `1.5px solid ${THEME.cyan}70`,
            borderRadius: "20px",
            padding: "26px 30px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(34, 215, 230, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>✨</span>
              <h3 style={{ margin: 0, fontSize: "22px", color: THEME.cyan, fontWeight: 800 }}>
                CrewReady's Dual Innovation
              </h3>
            </div>

            {/* Language Switcher Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.4)",
                border: `1px solid ${THEME.cyan}`,
                borderRadius: "16px",
                padding: "4px 10px",
                gap: "8px",
              }}
            >
              <span
                style={{
                  color: isBangla ? THEME.muted : THEME.cyan,
                  fontWeight: 800,
                  fontSize: "12px",
                }}
              >
                EN
              </span>
              <span style={{ color: THEME.muted, fontSize: "10px" }}>|</span>
              <span
                style={{
                  color: isBangla ? THEME.cyan : THEME.muted,
                  fontWeight: 800,
                  fontSize: "12px",
                }}
              >
                বাংলা
              </span>
            </div>
          </div>

          {/* Live Space Weather Widget */}
          <div
            style={{
              backgroundColor: "rgba(7, 14, 38, 0.8)",
              border: `1px solid ${THEME.gold}60`,
              borderRadius: "14px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ color: THEME.gold, fontWeight: 800, fontSize: "13px" }}>
                LIVE SPACE WEATHER (NOAA SWPC)
              </div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "16px" }}>
                Kp Index: {kpIndex.toFixed(1)} · {kpIndex > 5 ? "SOLAR STORM ACTIVE" : "QUIET MAGNETOSPHERE"}
              </div>
              <div style={{ color: THEME.muted, fontSize: "12px" }}>
                Difficulty dynamically scales with today's real Sun!
              </div>
            </div>

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: kpIndex > 5 ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)",
                border: `2px solid ${kpIndex > 5 ? THEME.red : THEME.green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {kpIndex.toFixed(0)}
            </div>
          </div>

          {/* Bilingual & Gen Alpha Copilot */}
          <div
            style={{
              backgroundColor: "rgba(7, 14, 38, 0.8)",
              border: `1px solid ${THEME.pink}60`,
              borderRadius: "14px",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <Img
              src={staticFile("art/twinkle-happy.webp")}
              style={{ width: "42px", height: "42px", flexShrink: 0 }}
            />
            <div>
              <div style={{ color: THEME.pink, fontWeight: 800, fontSize: "13px" }}>
                GEN ALPHA SPEECH & BILINGUAL ACCESSIBILITY
              </div>
              <div style={{ color: "#ffffff", fontSize: "13px", lineHeight: 1.35 }}>
                {isBangla
                  ? "বাংলা ও ইংরেজি উভয় ভাষায় খেলা যায়—সারা বাংলাদেশের শিশুদের জন্য উন্মুক্ত।"
                  : "Accessible in Bangla & English for every child across Bangladesh & globally."}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SyncedSubtitles
        sceneId="scene_02"
        actTag="Act 2 · Core Challenge & Gen Alpha Voice"
        audioDelayFrames={15}
      />
    </div>
  );
};
