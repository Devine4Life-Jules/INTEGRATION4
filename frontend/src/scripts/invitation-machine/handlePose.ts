let video: HTMLVideoElement;
let lastDetection: number;
// let cameraLoaded = false;

export const setLastDetection = (value: number) => (lastDetection = value);

const handleVideo = () => {
  // cameraLoaded = false;
  video = document.querySelector("video") as HTMLVideoElement;

  navigator.mediaDevices
    .getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } })
    .then((stream) => {
      const videoTrack = stream.getVideoTracks()[0];
      const { width, height } = videoTrack.getSettings();
      if (width && height) {
        video.width = width;
        video.height = height;
      } else {
        console.error("width and height not defined");
      }
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error("Webcam error:", err));
};

const handleBodyPose = (checker: (pose: any) => void) => {
  handleVideo();
  // Initialize ml5.bodyPose with MoveNet model
  const bodyPose = ml5.bodyPose("MoveNet", () => {
    console.log("BodyPose model loaded!");
    // Start detecting poses
    bodyPose.detectStart(video, (poses: any[]) => {
      poses.forEach((pose: any) => {
        checker(pose);
      });
    });
  });
};

const handleHandPose = (checker) => {
  handleVideo();
  // Initialize ml5.bodyPose with MoveNet model
  const handPose = ml5.handPose({}, () => {
    console.log("HandPose model loaded!");
    // cameraLoaded = true;
    // Start detecting poses
    handPose.detectStart(video, (poses: any[]) => {
      console.log(new URL(location.href).pathname);
      // if (!cameraLoaded) return;
      // console.log(new URL(location.href).pathname);
      if (new URL(location.href).pathname === "/invitation-machine/no-action") {
        // const $video = document.querySelector("video") as HTMLVideoElement;
        const $canvas = document.createElement("canvas");
        $canvas.width = video.width;
        $canvas.height = video.height;
        const ctx = $canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0);
        // const $canvas = document.querySelector("canvas") as HTMLCanvasElement;
        const $a = document.createElement("a");
        $a.href = $canvas.toDataURL();
        $a.download = "download.png";
        $a.click();
      }
      if (lastDetection && Date.now() - lastDetection < 1000) {
        console.log("detection skipped");
        return;
      }
      poses.forEach((pose: any) => {
        checker(pose);
      });
    });
  });
};

export { handleBodyPose, handleHandPose, handleVideo };
