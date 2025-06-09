import { navigate } from "astro:transitions/client";
import { POPUP_RESET_TIME } from "../consts";

let lastResetTimeoutId: ReturnType<typeof setTimeout>;

const handleReset = () => {
  clearTimeout(lastResetTimeoutId);
  lastResetTimeoutId = setTimeout(() => {
    navigate("/invitation-machine/no-action", {
      history: "push",
      state: { previous: new URL(location.href).pathname },
    });
  }, POPUP_RESET_TIME);
};

export default handleReset;
