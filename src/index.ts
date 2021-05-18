import { calculateValuesForCronString } from "./parser";

const main = () => {
  const { minutes, hours, day, month, dayOfWeek, command } = calculateValuesForCronString(process.argv[2])

  return `
    minute        ${minutes}
    hour          ${hours}
    day of month  ${day}
    month         ${month}
    day of week   ${dayOfWeek}
    command       ${command}
  `;
}

console.log(main());
