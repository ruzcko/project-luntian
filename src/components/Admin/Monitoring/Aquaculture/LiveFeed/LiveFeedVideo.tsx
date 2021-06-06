import React, { useEffect, useState } from "react";

const formatTime = (time: Date) => {
  const h = time.getHours().toString();
  const m = time.getMinutes().toString();
  const s = time.getSeconds().toString();

  const rh = h.length > 1 ? h : `0${h}`;
  const rm = m.length > 1 ? m : `0${m}`;
  const rs = s.length > 1 ? s : `0${s}`;

  return `${rh}:${rm}:${rs}`;
};

const LiveFeedVideo: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 left-2">
        <p className="font-mono text-sm font-bold text-white">
          {formatTime(time)}
        </p>
      </div>

      <div className="absolute top-2 right-2">
        <div className="flex items-center space-x-1 animate-pulse">
          <p className="font-mono text-sm font-bold text-gray-700">LIVE</p>
          <div className="w-2 h-2 bg-red-500 rounded-full" />
        </div>
      </div>

      <video
        controls={false}
        src="/live_feed.mp4"
        autoPlay
        loop
        className="object-cover w-full h-full rounded"
      />
    </div>
  );
};

export default LiveFeedVideo;
