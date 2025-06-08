import { navigate } from "astro:transitions/client";
import { POPUP_RESET_TIME } from "../consts";

const handleReset = () => {
  setTimeout(() => {
    navigate("/invitation-machine/no-action", {
      history: "push",
      state: { previous: new URL(location.href).pathname },
    });
  }, POPUP_RESET_TIME);
};

export default handleReset;
