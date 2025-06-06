const handleBodyPose = (checker) => {
  const video = document.querySelector("video");

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => console.error("Webcam error:", err));

  // Initialize ml5.bodyPose with MoveNet model
  const bodyPose = ml5.bodyPose("MoveNet", () => {
    console.log("BodyPose model loaded!");
    // Start detecting poses
    bodyPose.detectStart(video, (poses) => {
      poses.forEach((pose) => {
        checker();
      });
    });
  });
};

export default handleBodyPose;
