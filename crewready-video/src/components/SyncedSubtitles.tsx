import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import timingsData from "../voiceover_timings.json";
import { THEME } from "../types";

interface SyncedSubtitlesProps {
  sceneId: string;
  actTag: string;
  audioDelayFrames?: number;
}

export const SyncedSubtitles: React.FC<SyncedSubtitlesProps> = ({
  sceneId,
  actTag,
  audioDelayFrames = 15, // 0.5s visual pause before speech starts
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find timings for this scene
  const sceneData = timingsData.find((s) => s.id === sceneId);
  if (!sceneData || !sceneData.sentences.length) {
    return null;
  }

  // Calculate current elapsed time for audio in seconds
  const audioTimeSec = Math.max(0, (frame - audioDelayFrames) / fps);

  // Find the sentence currently active
  const activeSentence = sceneData.sentences.find(
    (s) => audioTimeSec >= s.start_sec - 0.1 && audioTimeSec <= s.end_sec + 0.35
  );

  // If no speech is currently active (e.g. initial silence or outro pause)
  if (!activeSentence && audioTimeSec > sceneData.duration_sec + 0.3) {
    return null;
  }

  const displayText = activeSentence ? activeSentence.text : "";

  // Smooth fade-in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "1380px",
        opacity: fadeIn,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Act Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(10, 18, 48, 0.9)",
          border: `1px solid ${THEME.cyan}60`,
          borderRadius: "14px",
          padding: "3px 14px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            color: THEME.cyan,
            fontWeight: 800,
            fontSize: "12px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {actTag}
        </span>
      </div>

      {/* Main Subtitle Box */}
      <div
        style={{
          minHeight: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(7, 11, 30, 0.92)",
          border: `1.5px solid rgba(255, 255, 255, 0.15)`,
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.75)",
          padding: "12px 32px",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "100%",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#FFFFFF",
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: 1.35,
            fontFamily: "Nunito, system-ui, sans-serif",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.9)",
          }}
        >
          {displayText}
        </p>
      </div>
    </div>
  );
};
