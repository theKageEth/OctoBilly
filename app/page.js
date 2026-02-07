'use client';

import LandingPage from "@/components/LandingPage";
import OctoProfile from "@/components/OctoProfile";
import StorySection1 from "@/components/StorySection1";
import StorySection2 from "@/components/StorySection2";
import StorySection3 from "@/components/StorySection3";
import StorySection4 from "@/components/StorySection4";

export default function Home() {
  return (
    <>
      <LandingPage />
      <StorySection1 />
      <StorySection2 />
      <StorySection3 />
      <StorySection4 />
    </>
  );
}
