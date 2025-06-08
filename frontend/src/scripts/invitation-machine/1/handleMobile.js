const handleMobile = () => {
  // Check if API is supported
  if (window.DeviceOrientationEvent) {
    // For iOS 13+ permission
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            document.body.textContent = "jest";
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older browsers
      window.addEventListener("deviceorientation", handleOrientation);
    }
  } else {
    console.log("DeviceOrientation API not supported");
  }
};

function handleOrientation(event) {
  const { alpha, beta, gamma } = event;
  document.body.textContent = `Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`;
  // Use values to detect rotation/tilt
}

export default handleMobile;
