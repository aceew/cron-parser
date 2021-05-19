import { calculateValuesForExpression, buildAvailableValues } from './parser';
import { cronUnitRequirements } from './unit-requirements';

const availableMinutes = buildAvailableValues(cronUnitRequirements.minutes);
const availableHours = buildAvailableValues(cronUnitRequirements.hours);
const minutesDivisibleBy5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const minutesUpTo10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const hoursDivisibleBy5 = [0, 5, 10, 15, 20];

describe('cron parser', () => {
  describe('parse minutes', () => {
    it('returns the minutes for step values', () => {
      expect(calculateValuesForExpression('*/5', cronUnitRequirements.minutes)).toEqual(minutesDivisibleBy5);
    });

    it('returns the minutes for the any expression', () => {
      expect(calculateValuesForExpression('*', cronUnitRequirements.minutes)).toEqual(availableMinutes);
    });

    it('returns the minutes for list expressions', () => {
      expect(calculateValuesForExpression('1,2', cronUnitRequirements.minutes)).toEqual([1, 2]);
    });

    it('returns the minutes for a given range', () => {
      expect(calculateValuesForExpression('0-10', cronUnitRequirements.minutes)).toEqual(minutesUpTo10);
    });

    it('throws an error when the minutes passed is invalid', () => {
      expect(() => calculateValuesForExpression('-1', cronUnitRequirements.minutes)).toThrow();
    });

    it('returns absolute minutes', () => {
      expect(calculateValuesForExpression('3', cronUnitRequirements.minutes)).toEqual([3]);
    });
  });

  describe('parse hours', () => {
    it('returns the hours for step values', () => {
      expect(calculateValuesForExpression('*/5', cronUnitRequirements.hours)).toEqual(hoursDivisibleBy5);
    });

    it('returns the hours for the any expression', () => {
      expect(calculateValuesForExpression('*', cronUnitRequirements.hours)).toEqual(availableHours);
    });

    it('returns the hours for list expressions', () => {
      expect(calculateValuesForExpression('1,2', cronUnitRequirements.hours)).toEqual([1, 2]);
    });

    it('returns the hours for a given range', () => {
      expect(calculateValuesForExpression('1-3', cronUnitRequirements.hours)).toEqual([1, 2, 3]);
    });

    it('throws an error when the hours passed is invalid', () => {
      expect(() => calculateValuesForExpression('-1', cronUnitRequirements.hours)).toThrow();
    });
  });
});
