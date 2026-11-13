import React from "react";
import { Audio, Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SyncedSubtitles } from "../components/SyncedSubtitles";
import { THEME } from "../types";

export const Scene03_CulturalRoots: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const quoteGlow = Math.sin(frame / 10) * 0.2 + 0.8;

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
        <Audio src={staticFile("audio/scenes/scene_03.mp3")} volume={1.0} />
      </Sequence>

      {/* Header with Team Origin */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${entrance})`,
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: `1.5px solid ${THEME.green}`,
            borderRadius: "20px",
            padding: "5px 18px",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "16px" }}>🇧🇩</span>
          <span style={{ color: THEME.green, fontWeight: 800, fontSize: "13px", letterSpacing: "1px" }}>
            TEAM YOUNG SPARKS OF BANGLADESH × SCRIPT PAIR
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
          From Cultural Roots to <span style={{ color: THEME.cyan }}>Cosmic Curiosity</span>
        </h2>
        <p style={{ margin: "6px 0 0 0", color: THEME.muted, fontSize: "18px" }}>
          Bridging timeless literature and cutting-edge space exploration
        </p>
      </div>

      {/* Main 2-Column Content Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "28px",
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        {/* Left: Nazrul's Poetry Shonkolpo Tribute Card */}
        <div
          style={{
            backgroundColor: "rgba(15, 24, 60, 0.88)",
            border: `1.5px solid ${THEME.cyan}60`,
            borderRadius: "22px",
            padding: "30px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "18px",
            boxShadow: `0 15px 40px rgba(0,0,0,0.6)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "28px" }}>📜</span>
            <div>
              <div style={{ color: THEME.cyan, fontWeight: 800, fontSize: "14px", letterSpacing: "0.5px" }}>
                NATIONAL POET KAZI NAZRUL ISLAM
              </div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "18px" }}>
                From the Iconic Poem "Shonkolpo" (The Determination)
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(7, 11, 30, 0.75)",
              borderLeft: `4px solid ${THEME.gold}`,
              borderRadius: "8px",
              padding: "18px 24px",
              opacity: quoteGlow,
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.4,
                marginBottom: "8px",
              }}
            >
              "থাকব না কো বদ্ধ ঘরে, দেখব এবার জগৎটাকে..."
            </div>
            <div
              style={{
                fontSize: "17px",
                color: THEME.gold,
                fontWeight: 600,
                fontStyle: "italic",
              }}
            >
              "I will not stay confined within closed walls — I will set forth to explore the universe."
            </div>
          </div>

          <p style={{ margin: 0, color: THEME.textSecondary, fontSize: "15px", lineHeight: 1.5 }}>
            Every child holds that innate urge to discover what lies beyond. CrewReady channels that
            boundless Bangladeshi spirit into an authentic NASA mission.
          </p>
        </div>

        {/* Right: Addressing the Modern Child's Attention Span */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(20, 32, 77, 0.85)",
              border: `1px solid ${THEME.pink}50`,
              borderRadius: "18px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "rgba(232, 51, 139, 0.2)",
                border: `1.5px solid ${THEME.pink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
              }}
            >
              ⏱️
            </div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "17px" }}>
                Short Attention Spans
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px", lineHeight: 1.4 }}>
                Gen Alpha consumes micro-content. Long lectures lose them in under two minutes.
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(20, 32, 77, 0.85)",
              border: `1px solid ${THEME.green}50`,
              borderRadius: "18px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: `1.5px solid ${THEME.green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
              }}
            >
              🎮
            </div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "17px" }}>
                Action-Oriented Engagement
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px", lineHeight: 1.4 }}>
                Bite-sized choices, instant visual consequences, and immediate feedback loops.
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(20, 32, 77, 0.85)",
              border: `1px solid ${THEME.cyan}50`,
              borderRadius: "18px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <Img
              src={staticFile("art/orbit-thumbs.webp")}
              style={{ width: "50px", height: "50px", flexShrink: 0 }}
            />
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "17px" }}>
                Curiosity into True Learning
              </div>
              <div style={{ color: THEME.muted, fontSize: "13px", lineHeight: 1.4 }}>
                When kids fail a level, they ask <em>why</em>—unlocking real space science principles.
              </div>
            </div>
          </div>
        </div>
      </div>

      <SyncedSubtitles
        sceneId="scene_03"
        actTag="Act 3 · Cultural Roots & Team Inspiration"
        audioDelayFrames={15}
      />
    </div>
  );
};
