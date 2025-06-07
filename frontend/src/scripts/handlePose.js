let video;

const handleVideo = () => {
  video = document.querySelector("video");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
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
  console.log(video);
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

export { handleBodyPose, handleHandPose };
