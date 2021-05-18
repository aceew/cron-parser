const DELIMITER = ','
const ANY = '*'
const RANGE_DELIMITER = '-'
const EXPRESSION_DELIMITER = ' '
const STEP_VALUE = '*/'
const MINUTES_IN_HOUR = 60
const HOURS_IN_DAY = 24
const DAYS_IN_MONTH = 31
const MONTHS_IN_YEAR = 12
const DAYS_IN_WEEK = 7

const buildAvailableValues = (max: number) => {
  // TODO make this work for days 1-31 instead of 0-30
  return Array.from(Array(max).keys())
}

const availableValuesByUnit = [
  buildAvailableValues(MINUTES_IN_HOUR),
  buildAvailableValues(HOURS_IN_DAY),
  buildAvailableValues(DAYS_IN_MONTH),
  buildAvailableValues(MONTHS_IN_YEAR),
  buildAvailableValues(DAYS_IN_WEEK),
]

/**
 * Take a single expression and the possible values and returns the d
 * @param expression Cron expression, this does not support lists. For lists use calculateValuesForExpression
 * @param availableValues The possible values that could be returned for the current expression
 * @returns a list of the possible values
 */
const calculateExpression = (expression: string, availableValues: number[]): number[] => {
  // TODO validate expression
  if (expression === ANY) {
    return availableValues;
  }

  // Step values are for numbers that divide equally, e.g running every 5th minute
  if (expression.includes(STEP_VALUE)) {
    const [_, divisible] = expression.split(STEP_VALUE)
    return availableValues.filter(minute => minute % Number(divisible) === 0)
  }

  if (expression.includes(RANGE_DELIMITER)) {
    const [min, max] = expression.split(RANGE_DELIMITER)
    // We could use a regex here but this is more secure and more readable
    return availableValues.slice(Number(min), Number(max) + 1)
  }

  return [Number(expression)]
}

/**
 * Calculates possible values for a given expresion.
 * @param expression Any valid cron expression for the given available values
 * @param availableValues The list of possible values
 */
const calculateValuesForExpression = (expression: string, availableValues: number[]): number[] => {
  const multipleExpressions = expression.split(DELIMITER)
  let possibleTimes = []
  multipleExpressions.forEach((individualExpression) => {
    possibleTimes = possibleTimes.concat(calculateExpression(individualExpression, availableValues))
  })

  // Remove any duplicates
  return possibleTimes.filter((item, index) => possibleTimes.indexOf(item) === index)
}

type StructuredCron = {
  minutes: string,
  hours: string,
  day: string,
  month: string,
  dayOfWeek: string,
  command: string,
}

/**
 * Builds a structure of the crontab where the possible values are returned separated by spaces
 * @param cron Incoming cron expression
 */
const calculateValuesForCronString = (cron: string): StructuredCron => {
  const [minutesExpression, hoursExpression, dayExpression, monthExpression, dayOfWeekExpression, command] = cron.split(' ')

  const [minutes, hours, day, month, dayOfWeek] =
    [minutesExpression, hoursExpression, dayExpression, monthExpression, dayOfWeekExpression]
      .map((expression: string, index) => {
        const availableValues = calculateValuesForExpression(expression, availableValuesByUnit[index])
        return availableValues.join(EXPRESSION_DELIMITER)
      })

  return {
    minutes,
    hours,
    day,
    month,
    dayOfWeek,
    command
  }
}

export { calculateValuesForCronString, calculateExpression, calculateValuesForExpression }
