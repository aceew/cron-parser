class ParserValidationError extends Error {
  constructor(expression: string, requirements: { name: string }) {
    const message = `You passed "${expression}" for "${requirements.name}"`;
    super(message);
    this.name = 'ParserValidationError';
  }
}

const parserValidationErrorName = 'ParserValidationError';

export { ParserValidationError, parserValidationErrorName };
