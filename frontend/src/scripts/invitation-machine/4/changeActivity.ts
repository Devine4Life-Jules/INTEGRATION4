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
  const $qr = document.querySelector("#qr");
  QRCode.toCanvas(
    $qr,
    `${location.href}/continuation?activity=${encodeURI(
      activities[currentIndex]
    )}`
  );
};

export default changeActivity;
