"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Home() {
  const videoFullRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const vulRef = useRef<SVGTextElement>(null);
  const gusRef = useRef<SVGTextElement>(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 5 });

    tl.to(revealRef.current, { opacity: 1, duration: 0.05 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.05 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.08 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.04 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.06 });

    tl.to(revealRef.current, { opacity: 0, duration: 0.35 });

    tl.to(revealRef.current, { opacity: 1, duration: 0.04 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.06 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.05 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.07 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.04 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.08 });

    tl.to(revealRef.current, { opacity: 0, duration: 0.2 });

    tl.to(revealRef.current, { opacity: 1, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.04 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.02 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.04 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.02 });

    tl.to(revealRef.current, { opacity: 0, duration: 0.15 });

    tl.to(revealRef.current, { opacity: 1, duration: 0.03 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.05 });
    tl.to(revealRef.current, { opacity: 1, duration: 0.02 });
    tl.to(revealRef.current, { opacity: 0, duration: 0.03 });

    tl.to(revealRef.current, { opacity: 1, duration: 0.05 });
    tl.to(videoFullRef.current, { opacity: 0, duration: 0.05 }, "<");

    tl.call(() => setLoaderDone(true));
  }, []);

  // Détecte le scroll après le loader
  useEffect(() => {
    if (!loaderDone) return;
  
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !shrunk) {
        setShrunk(true);
  
        gsap.to(vulRef.current, {
          x: -800,
          duration: 1,
          ease: "power3.inOut",
        });
  
        gsap.to(gusRef.current, {
          x: 800,
          duration: 1,
          ease: "power3.inOut",
        });
  
        gsap.to(".bg-video", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
  
      if (e.deltaY < 0 && shrunk) {
        setShrunk(false);
  
        gsap.to(vulRef.current, {
          x: 0,
          duration: 1,
          ease: "power3.inOut",
        });
  
        gsap.to(gusRef.current, {
          x: 0,
          duration: 1,
          ease: "power3.inOut",
        });
  
        gsap.to(".bg-video", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    };
  
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [loaderDone, shrunk]);
  
  return (
    <main className="h-screen w-screen overflow-hidden relative bg-white">
      {/* Vidéo background */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="bg-video absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Vidéo plein écran initiale */}
      <div ref={videoFullRef} className="absolute inset-0 z-10">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* SVG mask avec VUL et GUS séparés */}
      <div ref={revealRef} className="absolute inset-0 z-20 opacity-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="title-mask">
              <rect width="1440" height="900" fill="white" />
              <text
                ref={vulRef}
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="end"
                fill="black"
                fontSize="280"
                fontWeight="700"
                fontFamily="Oswald, sans-serif"
              >
                VUL
              </text>
              <text
                ref={gusRef}
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="start"
                fill="black"
                fontSize="280"
                fontWeight="700"
                fontFamily="Oswald, sans-serif"
              >
                GUS
              </text>
            </mask>
          </defs>
          <rect
            width="1440"
            height="900"
            fill="white"
            mask="url(#title-mask)"
          />
        </svg>
      </div>
    </main>
  );
}