import { API_URL } from "../../../consts";
import QRCode from "qrcode";

const res = await fetch(`${API_URL}/jsonapi/node/activities`);
const { data } = await res.json();
const activities = data.map(
  ({ attributes }: { attributes: any }) => attributes.title
);
let currentIndex = -1;
let lastChange: number;

const changeActivity = () => {
  if (lastChange && Date.now() - lastChange < 2000) return;

  lastChange = Date.now();
  currentIndex++;
  if (currentIndex >= activities.length) currentIndex = 0;
  const $qr = document.querySelector("#qr");
  const host = new URL(location.href).host;
  QRCode.toCanvas(
    $qr,
    `https://${host}/5?activity=${encodeURI(activities[currentIndex])}`
  );
  const $activity = document.querySelector("#activity") as HTMLSpanElement;
  $activity.textContent = activities[currentIndex];
};

export default changeActivity;
