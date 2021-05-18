import { calculateValuesForCronString } from "./parser";
import { parserValidationErrorName } from "./validation-error";

const getUsage = (error: Error) => {
  return `
    You must pass a valid cron expression followed by a command to run.

    ${error.message}.

    Example "*/5 * 1-10 * * /bin/find "`
}

const getErrorMessage = (error: Error) => {
  return `Oops something went wrong ${error.message}`
}

const main = () => {
  let result;
  try {
    result = calculateValuesForCronString(process.argv[2])
  } catch (error) {
    if (error.name === parserValidationErrorName) {
      return getUsage(error)
    }

    return getErrorMessage(error)
  }

  const { minutes, hours, days, months, daysOfWeek, command } = result

  return `
    minute        ${minutes}
    hour          ${hours}
    day of month  ${days}
    month         ${months}
    day of week   ${daysOfWeek}
    command       ${command}
  `;
}

console.log(main());
