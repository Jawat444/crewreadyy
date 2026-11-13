import asyncio
import edge_tts
import os
import subprocess
import json

scenes = [
    {
        "id": "scene_01",
        "title": "Act 1: The Urgent Hook & AI Companion",
        "text": "What if your decision could save humanity? Are you ready? Don't worry. Crew Ready will make you ready. It is a space survival game where kids become junior astronauts, team up with an AI buddy named Twinkle, and race to find a new home for humans. All powered by real NASA data."
    },
    {
        "id": "scene_02",
        "title": "Act 2: The Core Challenge & Gen Alpha Voice",
        "text": "We agree with the challenge statement. Most space games are either way too hard or have zero real science. Crew Ready fixes that. The game gets harder based on live space weather because real space has no easy mode. Twinkle talks like kids today using Gen Alpha terms, so learning never feels boring like homework. Plus, the game works in both Bangla and English, making space science easy to access for kids across Bangladesh and impacts locally."
    },
    {
        "id": "scene_03",
        "title": "Act 3: Cultural Roots & Team Young Sparks",
        "text": "Hi, we are Team Young Sparks of Bangladesh x Script Pair, a group of young creators from Bangladesh with one shared dream: exploring the universe. For many of us, it started with Twinkle, Twinkle, Little Star and Bangladesh's national poet Kazi Nazrul Islam's poem Shonkolpo, referring to the curiosity to know the unknown. Kids today have this exact same curiosity, but their attention spans are very short. We built Crew Ready so their curiosity stays alive and turns into real learning."
    },
    {
        "id": "scene_04",
        "title": "Act 4: Six Coupled Missions & Resource Ledger",
        "text": "Earth is in many trouble, getting out of living conditions, and running out of resources. Young gamers take command as Orbit or Nova to find a new safe planet. Every choice costs power, air, water, or food. Choose wisely and your crew survives. Run out and the mission fails. Across six levels built on NASA data: you pack your rocket carefully, dodge solar storms, land safely on Mars, survive a dust storm, and grow food in space. Finally, you rescue your crewmates, because nobody saves humanity alone."
    },
    {
        "id": "scene_05",
        "title": "Act 5: Engineering Roster Showcase",
        "text": "Speaking of crewmates, meet ours: Ahnaf researched what keeps young gamers engaged. Tasfi gathered real NASA data so every fact is accurate. Riyad built the core game engine and led the development. Ormi designed the scenes. Jawat managed the data and backend. And Wasima wrote the script. Together, we brought Crew Ready to life."
    },
    {
        "id": "scene_06",
        "title": "Act 6: Verified NASA Open Data & Micro-Skills",
        "text": "To keep kids playing, we added fun mini-games like an endless space runner to earn rewards. There is a resources tab to manage supplies, a leaderboard for friendly competition, and a profile to track progress. And the science is 100% real: we use NASA's DONKI data for solar storms, NOAA for space weather, NeoWS for asteroids, and OSDR for growing plants in space. Behind the fun, kids build real-life skills: making smart choices under pressure, planning ahead, and managing limited resources. It is like learning to manage pocket money—just in a spacesuit. They learn real science, practice teamwork, and keep asking what is out there."
    },
    {
        "id": "scene_07",
        "title": "Act 7: Future Vision & Call to Action",
        "text": "This is just the beginning. Next, we want to add a training tab with focus and memory games and a reels tab where kids can watch and share short space facts. After level six, we plan to add multiplayer rooms so friends can play together on different phones, plus a new planet and more languages. Our goal is simple: spark curiosity and give it room to grow. Just like staring at the stars in the sky amazed our childhood, as poet Nazrul wrote. So, are you ready? No worries. We are. Thank you!"
    }
]

out_dir = os.path.abspath("crewready-video/public/audio/scenes")
os.makedirs(out_dir, exist_ok=True)

async def generate():
    total_audio_sec = 0
    results = []
    # Test rate +28% to +30% for natural, crisp, energetic cadence
    for s in scenes:
        audio_path = os.path.join(out_dir, f"{s['id']}.mp3")
        c = edge_tts.Communicate(s['text'], 'en-US-ChristopherNeural', rate='+28%')
        
        # Collect sentence boundaries for subtitle timings
        sentences = []
        with open(audio_path, 'wb') as f:
            async for chunk in c.stream():
                if chunk['type'] == 'audio':
                    f.write(chunk['data'])
                elif chunk['type'] == 'SentenceBoundary':
                    # offset and duration in 100ns units (divide by 10,000,000 for seconds)
                    sentences.append({
                        'start_sec': chunk['offset'] / 10_000_000,
                        'end_sec': (chunk['offset'] + chunk['duration']) / 10_000_000,
                        'text': chunk['text']
                    })
        
        res = subprocess.check_output(['ffprobe', '-i', audio_path, '-show_entries', 'format=duration', '-v', 'quiet', '-of', 'csv=p=0'])
        dur = float(res.decode().strip())
        print(f"{s['id']}: {dur:.2f}s, {len(sentences)} sentences")
        total_audio_sec += dur
        results.append({
            'id': s['id'],
            'title': s['title'],
            'duration_sec': dur,
            'sentences': sentences,
            'full_text': s['text']
        })
        
    print(f"\nTOTAL AUDIO DURATION: {total_audio_sec:.2f} seconds ({total_audio_sec/60:.2f} min)")
    
    with open("crewready-video/src/voiceover_timings.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("Saved crewready-video/src/voiceover_timings.json")

if __name__ == '__main__':
    asyncio.run(generate())
