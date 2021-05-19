# Cron Parser

A tool to print out the definitions of cron schedule expressions. A bit like crontab.guru but for your command line.

> Note: The implementation is not feature complete, please see the Development TODOs for new features.

## Usage

Call the application by passing a cron expression followed by a command. Make sure the cron is wrapped in quotes so it does not get run separately

```bash
npm run test-run "*/3 0 1,15 * 1-5 /usr/bin/find"
```

For examples of a valid cron expression, [crontab.guru](https://crontab.guru/) is a great resource.

## Getting started

```bash
# Quick start
npm i
npm run test-run "*/3 0 1,15 * 1-5 /usr/bin/find"
```

### Dependencies

* [Node 14.x](https://nodejs.org/en/) with npm
* The depencies in this repo (`npm i`)
* We recommend installing [editorconfig](https://editorconfig.org/) for your IDE to follow the same indentation rules for the project.

### Testing

We write unit tests using [jest](https://jestjs.io/). Try write tests for the units of code that are important to the application.

For each file you need to write tests for, create a .test.ts file to contain the tests. See `src/parser.test.ts` for example.

```bash
# Running tests
npm test
```

Before committing, make sure your code passes the linting rules by running `npm run lint`

## Development TODOs

* [ ] Write missing test cases. In the interest of keeping to the 3 hours, I stopped writing tests for the fine tuning
* [ ] CICD
* [ ] Compile binary so users don't need to install dependencies etc to run the application
