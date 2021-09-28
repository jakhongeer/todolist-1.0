module.exports = getDate

function getDate() {
  let today = new Date();
  currentDay = today.getDay();
  let day = "";

  let options = {
      weekday : "long",
      day : "numeric",
      month : "long",
  };
  
  day = today.toLocaleDateString("en-US", options);

  return day;
}
