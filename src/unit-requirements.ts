type UnitRequirements = {
  name: string,
  min: number,
  max: number,
  alternativeValueMap: Record<string, number>
};

const cronUnitRequirements = {
  minutes: {
    name: 'minutes',
    min: 0,
    max: 59,
    alternativeValueMap: {},
  },
  hours: {
    name: 'hours',
    min: 0,
    max: 23,
    alternativeValueMap: {},
  },
  days: {
    name: 'days',
    min: 1,
    max: 31,
    alternativeValueMap: {},
  },
  months: {
    name: 'months',
    min: 1,
    max: 12,
    alternativeValueMap: {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    },
  },
  daysOfWeek: {
    name: 'daysOfWeek',
    min: 0,
    max: 6,
    alternativeValueMap: {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    },
  },
};

export { cronUnitRequirements };

export type { UnitRequirements };
