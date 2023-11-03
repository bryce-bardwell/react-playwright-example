import { TestCase, TestResult } from "playwright/types/testReporter";
import { TestToSend } from ".";

const packageJson = require('../../package.json');

export const makeTest = (test: TestCase, result: TestResult): TestToSend => {

  return {
    name: test.title,
    appName: packageJson.name,
    repo: packageJson.repository,
    runs: [
      {
        timestamp: result.startTime.getTime(),
        duration: result.duration,
        status: result.status.toUpperCase(),
      },
    ],
  } as TestToSend;
}

export const makeJson = (tests: TestToSend[]) => {
  return JSON.stringify(tests, null, 2);
}