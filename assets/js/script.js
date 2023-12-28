const dateActuelle = new Date();
const dateSpan = document.getElementById("currentDate");
const hourSpan1 = document.getElementById("currentHour1");
const hourSpan2 = document.getElementById("currentHour2");
const hour = {
  hour: "numeric",
  minute: "numeric",
};
const dateFormate = dateActuelle.toLocaleDateString("fr-FR", hour);

dateSpan.innerText = dateFormate.slice(0, 10);
hourSpan1.innerText = dateFormate.slice(11, 13);
hourSpan2.innerText = dateFormate.slice(14, 16);

console.log(dateFormate.slice(11, 13), dateFormate.slice(14, 16));
