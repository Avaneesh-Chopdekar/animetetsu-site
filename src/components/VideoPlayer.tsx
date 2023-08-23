import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      const hls = new Hls();
      hls.loadSource(src);
      new Plyr(video, {
        keyboard: { global: true },
        tooltips: { controls: true },
        ratio: "16:9",
        controls: [
          "play-large",
          "rewind",
          "play",
          "fast-forward",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "settings",
          // "download",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });
      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }

    return () => {
      video.src = "";
    };
  }, [videoRef, src]);

  setTimeout(() => {
    if (videoRef.current) {
      new Plyr(videoRef.current, {
        keyboard: { global: true },
        tooltips: { controls: true },
        ratio: "16:9",
        controls: [
          "play-large",
          // "rewind",
          "play",
          // "fast-forward",
          "progress",
          "current-time",
          "duration",
          "settings",
          // "download",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });
    }
  }, 500);

  return (
    <video
      key={src}
      data-displaymaxtap
      className="aspect-video h-[180px] sm:h-[225px] md:h-[340px]"
      ref={videoRef}
    />
  );
}
