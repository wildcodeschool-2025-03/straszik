import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
// src/components/AudioPlayer/AudioPlayer.tsx
import { useEffect, useRef, useState } from "react";
import vinylImg from "../../assets/images/vinyle.png";

interface Track {
  id: number;
  title: string;
  sound: string;
}

interface AudioPlayerProps {
  tracks: Track[];
  currentTrackIndex?: number;
  onTrackChange?: (idx: number) => void;
}

export default function AudioPlayer({
  tracks,
  currentTrackIndex,
  onTrackChange,
}: AudioPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync when prop currentTrackIndex changes
  useEffect(() => {
    if (
      typeof currentTrackIndex === "number" &&
      currentTrackIndex !== current
    ) {
      setCurrent(currentTrackIndex);
      setCurrentTime(0);
      setPlaying(true);
    }
  }, [currentTrackIndex, current]);

  // Play / pause
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!audioRef.current) return;
    playing ? audioRef.current.play() : audioRef.current.pause();
    onTrackChange?.(current);
  }, [playing, current]);

  // Metadata loaded
  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  // Time update
  const onTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  // Scrub
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  // Change track
  const changeTrack = (newIdx: number) => {
    setCurrent(newIdx);
    setCurrentTime(0);
    setPlaying(true);
    onTrackChange?.(newIdx);
  };

  const prev = () =>
    changeTrack(current === 0 ? tracks.length - 1 : current - 1);
  const next = () =>
    changeTrack(current === tracks.length - 1 ? 0 : current + 1);
  const togglePlay = () => setPlaying((p) => !p);

  if (!tracks.length) return null;

  return (
    <div className="p-1 rounded-3xl mt-8 w-full">
      {/* Wrapper: mobile column, md row */}
      <div className="flex flex-col lg:flex-row md:items-center">
        {/* Vinyl + Progress in one row always */}
        <div className="flex items-center w-full">
          <img
            src={vinylImg}
            alt="Vinyle"
            className={`w-30 flex-shrink-0 mr-4 ${
              playing ? "animate-spin" : ""
            }`}
            style={playing ? { animationDuration: "4s" } : undefined}
          />
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={onScrub}
            onMouseUp={() => playing && audioRef.current?.play()}
            className="flex-1 h-1 accent-secondary"
          />
        </div>

        {/* Controls: under on mobile, inline on md+ */}
        <div className="mt-4 flex justify-center space-x-4 md:mt-2 md:ml-6">
          <button
            type="button"
            onClick={prev}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/70"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="p-3 bg-secondary hover:bg-secondary/70 rounded-full shadow-md"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={next}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/70"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={tracks[current].sound}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      >
        <track
          kind="captions"
          src="path/to/captions.vtt"
          srcLang="en"
          label="English"
        />
      </audio>
    </div>
  );
}
