import json
import os

def format_time_vtt(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"

def format_time_srt(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

with open("crewready-video/src/voiceover_timings.json", "r", encoding="utf-8") as f:
    timings = json.load(f)

# Scene start offsets in the 235s composition
scene_offsets = {
    "scene_01": 0.0 + 0.5,    # 0s scene start + 0.5s audio delay
    "scene_02": 20.0 + 0.5,   # 20s scene start + 0.5s audio delay
    "scene_03": 50.0 + 0.5,   # 50s scene start + 0.5s audio delay
    "scene_04": 85.0 + 0.5,   # 85s scene start + 0.5s audio delay
    "scene_05": 125.0 + 0.5,  # 125s scene start + 0.5s audio delay
    "scene_06": 153.0 + 0.5,  # 153s scene start + 0.5s audio delay
    "scene_07": 199.0 + 0.5,  # 199s scene start + 0.5s audio delay
}

vtt_lines = ["WEBVTT - Crew Ready: Beyond Us (235s Local Judging Pitch)\n"]
srt_lines = []

cue_idx = 1
for scene in timings:
    sid = scene["id"]
    base_t = scene_offsets[sid]
    for sent in scene["sentences"]:
        start_t = base_t + sent["start_sec"]
        end_t = base_t + sent["end_sec"]
        text = sent["text"]

        # VTT format
        vtt_lines.append(f"{cue_idx}")
        vtt_lines.append(f"{format_time_vtt(start_t)} --> {format_time_vtt(end_t)}")
        vtt_lines.append(f"{text}\n")

        # SRT format
        srt_lines.append(f"{cue_idx}")
        srt_lines.append(f"{format_time_srt(start_t)} --> {format_time_srt(end_t)}")
        srt_lines.append(f"{text}\n")

        cue_idx += 1

os.makedirs("crewready-video/out", exist_ok=True)

with open("crewready-video/out/CrewReady_subtitles_235s.vtt", "w", encoding="utf-8") as f:
    f.write("\n".join(vtt_lines))

with open("crewready-video/out/CrewReady_subtitles_235s.srt", "w", encoding="utf-8") as f:
    f.write("\n".join(srt_lines))

print(f"Generated {cue_idx - 1} subtitle cues!")
print("Saved out/CrewReady_subtitles_235s.vtt and out/CrewReady_subtitles_235s.srt")
