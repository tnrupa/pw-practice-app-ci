import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();


  export default defineConfig<TestOptions>({

    timeout: 40000,
    globalTimeout: 80000,
  
    expect:{
      timeout:10000
    },
  
  use: {
     globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
     baseURL: 'http://localhost:4200/'
   
  },

  projects: [
    {
      name: 'chromium'
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }

    }

  ]
});
