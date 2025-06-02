// https://grok.com/share/bGVnYWN5_64c8fa41-65df-4d95-8527-3d21fb55c88b + ChatGPT from Jules !TODO describe in PR
// https://grok.com/chat/3a6e5c93-60de-433f-ba55-ddc7341d867d
import { navigate } from "astro:transitions/client";

let video;
let bodyPose;
let canvas;
// let ctx;
let spinState = 0;
let spinDirection = null; // "cw" or "ccw"

window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;

  // mobile
  if (width < 700) {
    handleMobile();
  } else {
    handleDesktop();
  }
});

const handleDesktop = () => {
  video = document.querySelector("video");
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error("Webcam error:", err));

  // Initialize ml5.bodyPose with MoveNet model
  bodyPose = ml5.bodyPose("MoveNet", () => {
    console.log("BodyPose model loaded!");
    // Start detecting poses
    bodyPose.detectStart(video, (poses) => {
      poses.forEach((pose) => {
        checkSpinState(pose);
      });
    });
  });
};

function checkSpinState(pose) {
  let nose = pose.nose;
  let leftShoulder = pose.left_shoulder;
  let rightShoulder = pose.right_shoulder;

  if (
    nose.confidence < 0.3 ||
    leftShoulder.confidence < 0.3 ||
    rightShoulder.confidence < 0.3
  )
    return;
  let noseX = nose.x;
  let leftX = leftShoulder.x;
  let rightX = rightShoulder.x;

  let direction = "forward";
  if (noseX > leftX && noseX > rightX) direction = "right";
  else if (noseX < leftX && noseX < rightX) direction = "left";

  // Clockwise spin: forward → right → left → forward
  if (spinState === 0 && direction === "right") {
    spinState = 1;
    spinDirection = "cw";
  } else if (
    spinState === 1 &&
    direction === "left" &&
    spinDirection === "cw"
  ) {
    spinState = 2;
  } else if (
    spinState === 2 &&
    direction === "forward" &&
    spinDirection === "cw"
  ) {
    console.log("Spin Detected (Clockwise)!");
    resetSpin();

    navigate("/2");
  }

  // Counter-clockwise spin: forward → left → right → forward
  else if (spinState === 0 && direction === "left") {
    spinState = 1;
    spinDirection = "ccw";
  } else if (
    spinState === 1 &&
    direction === "right" &&
    spinDirection === "ccw"
  ) {
    spinState = 2;
  } else if (
    spinState === 2 &&
    direction === "forward" &&
    spinDirection === "ccw"
  ) {
    console.log("Spin Detected (Counter-Clockwise)!");
    resetSpin();

    navigate("/2");
  }
}

function resetSpin() {
  spinState = 0;
  spinDirection = null;
}

// mobile
function handleMobile() {
  // Check if API is supported
  if (window.DeviceOrientationEvent) {
    // For iOS 13+ permission

    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            document.body.textContent = "jest";
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older browsers
      window.addEventListener("deviceorientation", handleOrientation);
    }
  } else {
    console.log("DeviceOrientation API not supported");
  }
}

function handleOrientation(event) {
  const { alpha, beta, gamma } = event;
  document.body.textContent = `Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`;
  // Use values to detect rotation/tilt
}
