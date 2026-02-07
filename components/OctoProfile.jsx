"use client";

import blueOctopi from "./octopus/body/blue-octopi.png";
import greenOctopi from "./octopus/body/green-octopi.png";
import pinkOctopi from "./octopus/body/pink-octopi.png";
import orangeOctopi from "./octopus/body/orange-octopi.png";

import neutral from "./octopus/face/neutral.png";
import neutral2 from "./octopus/face/neutral2.png";
import neutral3 from "./octopus/face/neutral3.png";
import neutral4 from "./octopus/face/neutral4.png";
import neutral5 from "./octopus/face/neutral5.png";
import neutral6 from "./octopus/face/neautral6.png";
import neutral7 from "./octopus/face/neautral7.png";
import cry from "./octopus/face/cry.png";
import laugh from "./octopus/face/laugh.png";
import love from "./octopus/face/Love.png";
import pout from "./octopus/face/pout.png";
import shock from "./octopus/face/shock.png";
import shock2 from "./octopus/face/shock2.png";

const bodyImages = {
  "blue-octopi": blueOctopi,
  "green-octopi": greenOctopi,
  "pink-octopi": pinkOctopi,
  "orange-octopi": orangeOctopi,
};

const faceImages = {
  neutral,
  neutral2,
  neutral3,
  neutral4,
  neutral5,
  neutral6,
  neutral7,
  cry,
  laugh,
  love,
  pout,
  shock,
  shock2,
};

export default function OctopusProfile({
  body,
  face,
  
}) {
  const bodyImage = bodyImages[body];
  const faceImage = faceImages[face];

  return (
    <div className="relative w-40 h-40 ">
      {/* body */}
      {bodyImage && (
        <img
          src={bodyImage.src}
          className="absolute inset-0 w-full h-full"
          style={{ transform: "scale(2.5)", transformOrigin: "center" }}
          alt="octopus body"
        />
      )}

      {/* face */}
      {faceImage && (
        <img
          src={faceImage.src}
          className="absolute inset-0 w-full h-full"
          style={{ transform: "scale(0.4) translateY(-30px)" }}
          alt="octopus face"
        />
      )}
    </div>
  );
}