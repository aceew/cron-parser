import { calculateValuesForExpression } from './parser'

const availableMinutes = Array.from(Array(60).keys())
const minutesDivisibleBy5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
const minutesUpTo10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

describe('cron parser', () => {
  describe('parse minutes', () => {
    it('returns the minutes for step values', () => {
      expect(calculateValuesForExpression('*/5', availableMinutes)).toEqual(minutesDivisibleBy5)
    });

    it('returns the minutes for the any expression', () => {
      expect(calculateValuesForExpression('*', availableMinutes)).toEqual(availableMinutes)
    });

    it('returns the minutes for list expressions', () => {
      expect(calculateValuesForExpression('1,2', availableMinutes)).toEqual([1,2])
    });

    it('returns the minutes for a given range', () => {
      expect(calculateValuesForExpression('0-10', availableMinutes)).toEqual(minutesUpTo10)
    });

    // it('throws an error when the minutes passed is invalid', () => {

    // });

    it('returns absolute minutes', () => {
      expect(calculateValuesForExpression('3', availableMinutes)).toEqual([3])
    });
  })
})
