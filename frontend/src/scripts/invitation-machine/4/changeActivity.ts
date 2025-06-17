import { API_URL } from "../../../consts";

const res = await fetch(`${API_URL}/drupal/jsonapi/node/activitiy`);
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
  QRCode.toCanvas(
    $qr,
    `${API_URL}/5?activity=${encodeURI(activities[currentIndex])}`
  );
  const $activity = document.querySelector("#activity") as HTMLSpanElement;
  $activity.textContent = activities[currentIndex];
};

export default changeActivity;
