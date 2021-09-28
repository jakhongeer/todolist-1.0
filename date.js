//jshint esversion:6

exports.getDate = function() {
  const today = new Date();
  currentDay = today.getDay();
  const day = "";

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
  const today = new Date();
  currentDay = today.getDay();
  const day = "";

  const options = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
}
