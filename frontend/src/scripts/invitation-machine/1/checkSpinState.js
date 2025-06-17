import { navigate } from "astro:transitions/client";
import nextSound from '../../../assets/sounds/openSound.mp3';

let spinState = 0;
let spinDirection = null;

const playSoundAndNavigate = (url) => {
  const audio = new Audio(nextSound);
  audio.play().then(() => {
    audio.addEventListener("ended", () => {
      navigate(url);
    });
  }).catch((err) => {
    console.error("Audio play failed, navigating anyway:", err);
    navigate(url);
  });
};

const checkSpinState = (pose) => {
  const nose = pose.nose;
  const leftShoulder = pose.left_shoulder;
  const rightShoulder = pose.right_shoulder;

  if (
    nose.confidence < 0.3 ||
    leftShoulder.confidence < 0.3 ||
    rightShoulder.confidence < 0.3
  ) return;

  const noseX = nose.x;
  const leftX = leftShoulder.x;
  const rightX = rightShoulder.x;

  let direction = "forward";
  if (noseX > leftX && noseX > rightX) direction = "right";
  else if (noseX < leftX && noseX < rightX) direction = "left";

  // Clockwise spin
  if (spinState === 0 && direction === "right") {
    spinState = 1;
    spinDirection = "cw";
  } else if (
    spinState === 1 && direction === "left" && spinDirection === "cw"
  ) {
    spinState = 2;
  } else if (
    spinState === 2 && direction === "forward" && spinDirection === "cw"
  ) {
    console.log("Spin Detected (Clockwise)!");
    resetSpin();
    playSoundAndNavigate("/invitation-machine/2");
  }

  // Counter-clockwise spin
  else if (spinState === 0 && direction === "left") {
    spinState = 1;
    spinDirection = "ccw";
  } else if (
    spinState === 1 && direction === "right" && spinDirection === "ccw"
  ) {
    spinState = 2;
  } else if (
    spinState === 2 && direction === "forward" && spinDirection === "ccw"
  ) {
    console.log("Spin Detected (Counter-Clockwise)!");
    resetSpin();
    playSoundAndNavigate("/invitation-machine/2");
  }
};

const resetSpin = () => {
  spinState = 0;
  spinDirection = null;
};

export default checkSpinState;
