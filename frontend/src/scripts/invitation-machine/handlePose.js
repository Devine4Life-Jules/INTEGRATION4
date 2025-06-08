let video;

const handleVideo = () => {
  video = document.querySelector("video");

  navigator.mediaDevices
    .getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } } })
    .then((stream) => {
      const videoTrack = stream.getVideoTracks()[0];
      const { width, height } = videoTrack.getSettings();
      video.width = width;
      video.height = height;
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error("Webcam error:", err));
};

const handleBodyPose = (checker) => {
  handleVideo();
  // Initialize ml5.bodyPose with MoveNet model
  const bodyPose = ml5.bodyPose("MoveNet", () => {
    console.log("BodyPose model loaded!");
    // Start detecting poses
    bodyPose.detectStart(video, (poses) => {
      poses.forEach((pose) => {
        checker(pose);
      });
    });
  });
};

const handleHandPose = (checker) => {
  handleVideo();
  // Initialize ml5.bodyPose with MoveNet model
  const handPose = ml5.handPose({}, () => {
    console.log("BodyPose model loaded!");
    // Start detecting poses
    handPose.detectStart(video, (poses) => {
      poses.forEach((pose) => {
        checker(pose);
      });
    });
  });
};

export { handleBodyPose, handleHandPose, handleVideo };
