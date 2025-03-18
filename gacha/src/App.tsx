import { useState } from "react";
import "./App.css";

interface TaskEvent {
  name: string;
  description: string;
}

const legendaryChillTasks: TaskEvent[] = [
  {
    name: "Zen Master Retreat",
    description: "A legendary experience of complete relaxation.",
  },
  {
    name: "Enlightenment Journey",
    description: "A path to true peace and self-discovery.",
  },
  {
    name: "Astral Projection",
    description: "Experience the universe beyond physical limits.",
  },
  {
    name: "Deep Meditation Cave",
    description: "A secluded place for the ultimate mindfulness retreat.",
  },
];

const rareChillTasks: TaskEvent[] = [
  {
    name: "Forest Bathing",
    description: "A soothing walk among ancient trees.",
  },
  {
    name: "Hot Springs Relaxation",
    description: "Soaking away stress in a rare hot spring.",
  },
  {
    name: "Mindfulness Workshop",
    description: "Learn the art of mindfulness in a peaceful setting.",
  },
  { name: "Yoga Retreat", description: "A weekend of yoga and relaxation." },
  {
    name: "Sound Therapy",
    description: "Healing vibrations for a stress-free mind.",
  },
  {
    name: "Painting Meditation",
    description: "Express mindfulness through art.",
  },
];

const tasks: TaskEvent[] = [
  {
    name: "Meditation Break",
    description: "A short meditation session to refresh your mind.",
  },
  {
    name: "Evening Walk",
    description: "A casual stroll to unwind from the day.",
  },
  {
    name: "Tea Ceremony",
    description: "Enjoying a moment of calm with traditional tea rituals.",
  },
  { name: "Reading Session", description: "Lose yourself in a good book." },
  {
    name: "Stretching Routine",
    description: "A quick stretching exercise for relaxation.",
  },
  {
    name: "Music Listening",
    description: "Enjoy calming tunes for inner peace.",
  },
];

function App() {
  const [selectedLegendary, setSelectedLegendary] = useState<TaskEvent | null>(
    null,
  );
  const [selectedRare, setSelectedRare] = useState<TaskEvent[]>([]);
  const [pullCountLegendary, setPullCountLegendary] = useState(0);
  const [pullCountRare, setPullCountRare] = useState(0);

  const pullTask = () => {
    let pulledLegendary: TaskEvent | null = null;
    let pulledRare: TaskEvent | null = null;
    let pulledTask: TaskEvent | null = null;

    const legendaryChance = pullCountLegendary === 89 ? 1 : 0.0001; // 90th pull guaranteed legendary
    const rareChance = pullCountRare === 9 ? 1 : 0.05; // 10th pull guaranteed rare

    // console.log(`Pull Count - Legendary: ${pullCountLegendary}, Rare: ${pullCountRare}`);
    // console.log(`Legendary Chance: ${legendaryChance}, Rare Chance: ${rareChance}`);

    if (Math.random() < legendaryChance) {
      pulledLegendary =
        selectedLegendary ??
        legendaryChillTasks[
          Math.floor(Math.random() * legendaryChillTasks.length)
        ];
      setPullCountLegendary(0);
      // console.log(`Pulled Legendary: ${pulledLegendary.name}`);
    } else {
      setPullCountLegendary((prev) => prev + 1);
    }

    if (!pulledLegendary && Math.random() < rareChance) {
      const pool = [
        ...selectedRare,
        ...rareChillTasks.filter((r) => !selectedRare.includes(r)),
      ];
      pulledRare = pool[Math.floor(Math.random() * pool.length)];
      setPullCountRare(0);
      // console.log(`Pulled Rare: ${pulledRare.name}`);
    } else {
      setPullCountRare((prev) => prev + 1);
    }

    if (!pulledLegendary && !pulledRare) {
      pulledTask = tasks[Math.floor(Math.random() * tasks.length)];
      // console.log(`Pulled Normal Task: ${pulledTask.name}`);
    }

    confirm(
      `Pulled: ${pulledLegendary ? pulledLegendary.name : pulledRare ? pulledRare.name : pulledTask?.name}`,
    );
  };

  return (
    <>
      <div className="card">
        <img src="/background.svg" alt="Background" />
        <div className="banner">
          <div className="title">
            <p>
              Get Your <span className="secondary">Shit</span>
            </p>
            <p>Together</p>
          </div>
          <div className="description">
            <p>Probability increased!</p>
            <div className="block">
              <p>✦</p>
              <p>
                Every 10 wishes is guaranteed to include at least one chill
                event.
              </p>
            </div>
            <p style={{ width: "40%" }}>
              Legendary chill event is guaranteed every 90 wishes. View details
              for more.
            </p>
          </div>
          <button type="button" onClick={pullTask}>
            Pull Task x1
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
