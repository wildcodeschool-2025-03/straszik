import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react";
// src/components/AudioPlayer/AudioPlayer.tsx
import { useEffect, useRef, useState } from "react";
import vinylImg from "../../../public/vinyle.png";

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
    <div className="px-1 rounded-3xl mt-4 w-full lg:w-10/12 bg-block border-2 border-secondary dark-shadow shadow-[0px_4px_10px_rgba(0,0,0,0.1)] shadow-black">
      {/* Wrapper: mobile column, md row */}
      <div className="flex justify-center items-center p-2">
        {/* Vinyl + Progress in one row always */}
        <div className="flex items-center w-full">
          <img
            src={vinylImg}
            alt="Vinyle"
            className={`w-12 sm:w-14 flex-shrink-0 mr-2 ${playing ? "animate-spin" : ""}`}
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
        <div className="flex items-center justify-center ml-2">
          <button
            type="button"
            onClick={prev}
            className=" hover:text-secondary/70 text-secondary"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="w-8 h-8 p-2 flex items-center justify-center text-white bg-secondary hover:bg-secondary/70 focus:bg-secondary/70 border-2 rounded-full"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            onClick={next}
            className="hover:text-secondary/70 text-secondary"
          >
            <ChevronRightIcon className="w-5 h-5" />
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
