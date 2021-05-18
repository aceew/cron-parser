import { cronUnitRequirements, UnitRequirements } from './unit-requirements'
import { ParserValidationError } from './validation-error'

const DELIMITER = ','
const ANY = '*'
const RANGE_DELIMITER = '-'
const EXPRESSION_DELIMITER = ' '
const STEP_VALUE = '*/'

const requirementsByUnit = [
  cronUnitRequirements.minutes,
  cronUnitRequirements.hours,
  cronUnitRequirements.days,
  cronUnitRequirements.months,
  cronUnitRequirements.daysOfWeek,
];

/**
 * Builds possible values for a cron expression based on a set of requirements for the unit.
 */
const buildAvailableValues = (range: UnitRequirements): number[] => {
  const availableValues = []
  for (let i = range.min; i <= range.max; i++) {
    availableValues.push(i)
  }

  return availableValues
}

/**
 * Take a single expression and the possible values and returns an array of the possible times it could run.
 * @param expression Cron expression, this does not support lists. For lists use calculateValuesForExpression
 * @param availableValues The possible values that could be returned for the current expression
 * @returns a list of the possible values
 */
const calculateExpression = (incomingExpression: string, requirements: UnitRequirements): number[] => {
  // We could use a regex for validation but this is more secure and more readable
  // General rule: You can write regular expressions, but you can't read them tomorrow
  let expression = incomingExpression.toLowerCase();

  const error = new ParserValidationError(expression, requirements)
  const availableValues = buildAvailableValues(requirements);

  if (expression === ANY) {
    return availableValues;
  }

  Object.keys(requirements.alternativeValueMap).forEach((alternativeKey) => {
    const searchKey = new RegExp(alternativeKey, 'g')
    expression = expression.replace(searchKey, String(requirements.alternativeValueMap[alternativeKey]))
  })

  // Step values are for numbers that divide equally, e.g running every 5th minute
  if (expression.includes(STEP_VALUE)) {
    const [_, divisible] = expression.split(STEP_VALUE)
    return availableValues.filter(minute => minute % Number(divisible) === 0)
  }

  if (expression.includes(RANGE_DELIMITER)) {
    const [minString, maxString] = expression.split(RANGE_DELIMITER);
    const min = Number(minString)
    const max = Number(maxString)
    if (min < requirements.min || max > requirements.max || minString === '' || maxString === '') {
      throw error;
    }

    const minIndex = availableValues.findIndex(value => min === value)
    const maxIndex = availableValues.findIndex(value => max === value)
    return availableValues.slice(minIndex, maxIndex + 1)
  }

  const absoluteNumber = Number(expression)

  if (Number.isNaN(absoluteNumber)) {
    throw error;
  }

  return [absoluteNumber];
}

/**
 * Calculates possible values for a given expresion.
 * @param expression Any valid cron expression for the given available values
 * @param availableValues The list of possible values
 */
const calculateValuesForExpression = (expression: string, requirements: UnitRequirements): number[] => {
  const multipleExpressions = expression.split(DELIMITER)
  let possibleTimes = []
  multipleExpressions.forEach((individualExpression) => {
    possibleTimes = possibleTimes.concat(calculateExpression(individualExpression, requirements))
  })

  // Remove any duplicates
  return possibleTimes.filter((item, index) => possibleTimes.indexOf(item) === index)
}

type StructuredCron = {
  minutes: string,
  hours: string,
  days: string,
  months: string,
  daysOfWeek: string,
  command: string,
}

/**
 * Builds a structure of the crontab where the possible values are returned separated by spaces
 * @param cron Incoming cron expression
 */
const calculateValuesForCronString = (cron: string): StructuredCron => {
  const [minutesExpression, hoursExpression, dayExpression, monthExpression, dayOfWeekExpression, command] = cron.split(' ')

  if (!command) {
    throw new ParserValidationError('', { name: 'command' })
  }

  const [minutes, hours, days, months, daysOfWeek] =
    [minutesExpression, hoursExpression, dayExpression, monthExpression, dayOfWeekExpression]
      .map((expression: string, index) => {
        const availableValues = calculateValuesForExpression(expression, requirementsByUnit[index])
        return availableValues.join(EXPRESSION_DELIMITER)
      })

  return {
    minutes,
    hours,
    days,
    months,
    daysOfWeek,
    command
  }
}

export { calculateValuesForCronString, calculateExpression, calculateValuesForExpression, buildAvailableValues }
