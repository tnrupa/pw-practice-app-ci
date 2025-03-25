import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

export default defineConfig<TestOptions>({

  timeout: 40000,
//  globalTimeout: 80000,

  expect:{
    timeout:10000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },

 
  retries: 1,
  reporter: [
    // ['json',{outputFile: 'test-results/jsonReport.json'}],
    // ['junit',{outputFile: 'test-results/junitReport.xml'}],
   // ['allure-playwright']
   ['html']

],
  
  use: {
     globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL: process.env.DEV == '1' ? 'http://localhost:4200/'
            : process.env.STAGING == '1' ? 'http://localhost:4200/'
            : 'http://localhost:4200/',
    viewport:{width: 720, height:1280},
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 80000
    // video: {
    //   mode:'on',
    //   size: {width: 1920, height:1080}
    // }
  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'] ,
        baseURL: 'http://localhost:4200/'
      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' }
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport:{width: 1920, height:1080}
      }

    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
     //   ...devices['iPhone 13 Pro'],
        viewport:{width: 414, height:800}
      }

    }
  ],

  webServer: {
  command: 'npm run start',
  url: 'http://localhost:4200/'
  }

});
