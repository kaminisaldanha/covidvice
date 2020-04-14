export function getTimestamp(milliseconds) {
  const curDate = new Date();
  const createdDate = new Date(parseInt(milliseconds));

  if (curDate.getDay() - createdDate.getDay() > 0)
    return getText("day", curDate.getDay() - createdDate.getDay());
  else if (curDate.getHours() - createdDate.getHours() > 0)
    return getText("hour", curDate.getHours() - createdDate.getHours());
  else if (curDate.getMinutes() - createdDate.getMinutes() > 0)
    return getText("minute", curDate.getMinutes() - createdDate.getMinutes());
  else
    return getText("second", curDate.getSeconds() - createdDate.getSeconds());
}

function getText(type, diff) {
  let text = type;
  if (diff > 1) text += "s";
  return diff + " " + text + " ago";
}
