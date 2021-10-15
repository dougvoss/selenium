import 'dotenv/config';
import { Builder, By, Key } from 'selenium-webdriver';
import login from './actions/login.js';
import ExtendStudyPermit from './roadMaps/ExtendStudyPermit.js';
import formData from './data/ExtendStudyPermitData.js';

const pause = 600;

const driver = await new Builder().forBrowser('chrome').build();
await driver.get(process.env.VIZPERT_URL);
await driver.sleep(pause * 5);

await login(driver);
await driver.sleep(pause * 6);

const ESP = new ExtendStudyPermit();
await ESP.createESP(driver);
await ESP.fillFields(driver);
