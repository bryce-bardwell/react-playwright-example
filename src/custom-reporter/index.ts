import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import { makeJson, makeTest } from './data-manipulation';

export interface TestToSend {
  name: string;
  appName: string;
  repo: string | undefined;
  runs: {
    timestamp: EpochTimeStamp;
    duration: number | null | undefined;
    status: string;
  }[];
}

class DtToaPlaywright implements Reporter {

  private testsToSend: TestToSend[];

  constructor() {
    this.testsToSend = [];
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const currentTest: TestToSend = makeTest(test, result);
    this.testsToSend.push(currentTest);
  }

  onEnd(): void {
    const customReportPath = 'custom-report.json';
    const testsJson = makeJson(this.testsToSend);
    
    fs.writeFileSync(customReportPath, testsJson);
  }
} 

export default DtToaPlaywright;