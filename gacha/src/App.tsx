import { useState } from "react";
import "./App.css";
import Modal from "./Modal";

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
  const [pullCountLegendary, setPullCountLegendary] = useState(0);
  const [pullCountRare, setPullCountRare] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pulledTask, setPulledTask] = useState<TaskEvent | null>(null); // State to hold the pulled task
  const [pulledRarity, setPulledRarity] = useState<'normal' | 'rare' | 'legendary'>('normal');
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [modalReady, setModalReady] = useState<boolean>(false);

  function toggleModal() {
    setShowModal(!showModal);
    setModalReady(false);
    setModalVideo(null);
  }

  const pullTask = () => {
    let pulledLegendary: TaskEvent | null = null;
    let pulledRare: TaskEvent | null = null;
    let pulledNormal: TaskEvent | null = null;
    let video: string = "";

    // Legendary logic
    if (pullCountLegendary === 89) {
      pulledLegendary = legendaryChillTasks[Math.floor(Math.random() * legendaryChillTasks.length)];
      setPullCountLegendary(0);
      video = "/genshin-pulls/5 star, 1 pull.mp4";
    } else if (Math.random() < 0.01) {
      pulledLegendary = legendaryChillTasks[Math.floor(Math.random() * legendaryChillTasks.length)];
      setPullCountLegendary(0);
      video = "/genshin-pulls/5 star, 1 pull.mp4";
    } else {
      setPullCountLegendary((prev) => prev + 1);
    }

    // Rare logic (only if not legendary)
    if (!pulledLegendary) {
      if (pullCountRare === 9) {
        pulledRare = rareChillTasks[Math.floor(Math.random() * rareChillTasks.length)];
        setPullCountRare(0);
        video = "/genshin-pulls/4 star, 1 pull.mp4";
      } else if (Math.random() < 0.05) {
        pulledRare = rareChillTasks[Math.floor(Math.random() * rareChillTasks.length)];
        setPullCountRare(0);
        video = "/genshin-pulls/4 star, 1 pull.mp4";
      } else {
        setPullCountRare((prev) => prev + 1);
      }
    } else {
      setPullCountRare(0);
    }

    // Normal pull if neither legendary nor rare
    if (!pulledLegendary && !pulledRare) {
      pulledNormal = tasks[Math.floor(Math.random() * tasks.length)];
      video = "/genshin-pulls/3 star pull.mp4";
    }

    // Set rarity based on what was pulled
    if (pulledLegendary) {
      setPulledRarity('legendary');
    } else if (pulledRare) {
      setPulledRarity('rare');
    } else {
      setPulledRarity('normal');
    }

    setPulledTask(pulledLegendary ?? pulledRare ?? pulledNormal);
    setModalVideo(video);
    setShowModal(true);
    setModalReady(false);
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
        <button className="btn" style={{position: "absolute", bottom: 32, right:64, background: "#ffffff", border: "2px solid #b3a47f"}} onClick={pullTask}>
            Pull Task x1
        </button>
        </div>
      </div>

      {/* Modal to display the pulled task */}
      {showModal && (
        <Modal
          open={showModal}
          onClose={toggleModal}
          videoSrc={modalVideo ?? undefined}
          onVideoEnd={() => setModalReady(true)}
          rarity={pulledRarity}
        >
          {modalReady ? (
            <p>{pulledTask ? pulledTask.name : "No task pulled."}</p>
          ) : (
            <></>
          )}
        </Modal>
      )}
    </>
  );
}

export default App;
