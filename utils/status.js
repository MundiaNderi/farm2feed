const allowedTransitions = {
  pending: ["processing", "cancelled"],
  processing: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

function canTransition(currentStatus, newStatus) {
  if (!allowedTransitions[currentStatus]) {
    return false;
  }

  return allowedTransitions[currentStatus].includes(newStatus);
}

module.exports = {
  canTransition,
};
