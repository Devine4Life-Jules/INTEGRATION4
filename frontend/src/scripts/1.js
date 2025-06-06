// https://grok.com/share/bGVnYWN5_64c8fa41-65df-4d95-8527-3d21fb55c88b + ChatGPT from Jules !TODO describe in PR
// https://grok.com/chat/3a6e5c93-60de-433f-ba55-ddc7341d867d
import checkSpinState from "./1/checkSpinState";
import handleBodyPose from "./handleBodyPose";

const init = () => {
  const width = window.innerWidth;

  // mobile
  if (width < 700) {
    // handleMobile();
  } else {
    handleBodyPose(checkSpinState);
  }
};

window.addEventListener("resize", () => {
  init();
});

init();
