'use client';

import { useState } from 'react';
import SplashScreen from "@/components/SplashScreen";
import LandingPage from "@/components/LandingPage";
import StorySection1 from "@/components/StorySection1";
import BillyStory from "@/components/BillyStory";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {!showSplash && (
        <>
          <LandingPage />
          <StorySection1 />
          <BillyStory />
        </>
      )}
    </>
  );
}
