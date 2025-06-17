import { API_URL } from "../../../consts";

const res = await fetch(`${API_URL}/drupal/jsonapi/node/activitiy`);
const { data } = await res.json();
const activities = data.map(({ attributes }: { attributes: any }) => ({
  name: attributes.field_name,
  location: attributes.field_location,
}));
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
  $activity.textContent = activities[currentIndex].name;
  const $label = document.querySelector(".label") as HTMLSpanElement;
  $label.textContent = activities[currentIndex].location;
};

export default changeActivity;
