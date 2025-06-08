const checkDislike = (hand: any, action: () => void) => {
  // The algorithm is not 100% reliable, but for the sake of the installation it is functional

  // Check if thumb is extended upward (y-coordinate of thumb tip is lower than thumb IP)
  const isThumbDown = hand.thumb_tip.y > hand.thumb_ip.y;

  // Check if other fingers are folded (tips below their respective PIP joints)
  let isIndexFolded, isMiddleFolded, isRingFolded, isPinkyFolded;

  if (hand.handedness === "Right") {
    isIndexFolded = hand.index_finger_tip.x > hand.index_finger_pip.x; // Compare to index PIP
    isMiddleFolded = hand.middle_finger_tip.x > hand.middle_finger_pip.x; // Compare to middle PIP
    isRingFolded = hand.ring_finger_tip.x > hand.ring_finger_pip.x; // Compare to ring PIP
    isPinkyFolded = hand.pinky_finger_tip.x > hand.pinky_finger_pip.x; // Compare to pinky PIP
  } else {
    isIndexFolded = hand.index_finger_tip.x < hand.index_finger_pip.x; // Compare to index PIP
    isMiddleFolded = hand.middle_finger_tip.x < hand.middle_finger_pip.x; // Compare to middle PIP
    isRingFolded = hand.ring_finger_tip.x < hand.ring_finger_pip.x; // Compare to ring PIP
    isPinkyFolded = hand.pinky_finger_tip.x < hand.pinky_finger_pip.x; // Compare to pinky PIP
  }

  // Ensure thumb is above wrist to confirm upward orientation
  const isThumbBeneathWrist = hand.thumb_tip.y > hand.wrist.y;

  if (
    isThumbDown &&
    isIndexFolded &&
    isMiddleFolded &&
    isRingFolded &&
    isPinkyFolded &&
    isThumbBeneathWrist
  ) {
    action();
  }
};

export default checkDislike;
