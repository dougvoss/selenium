// import 'dotenv/config';
import { By, Key } from 'selenium-webdriver';
import formData from '../data/ExtendStudyPermitData.js';

const pause = 600;

export default class ExtendStudyPermit {
   async createESP(driver) {
      // abre a lista de cases
      await driver.findElement(By.id('casesList')).click();
      await driver.sleep(pause * 2);

      // create new client
      await driver.findElement(By.css('.header-actions .ant-btn')).click();
      await driver.sleep(pause);

      // select type of case
      await driver.findElement(By.css('.form-field .ant-select-selector .ant-select-selection-search .ant-select-selection-search-input')).click();
      await driver.sleep(pause);
      await driver.findElement(By.css('.rc-virtual-list .rc-virtual-list-holder .rc-virtual-list-holder-inner  div[title="Extend Study Permit"]')).click();
      await driver.sleep(pause);

      // set email client
      await driver.findElement(By.css('textarea[placeholder="Client email"]')).sendKeys(process.env.EMAIL_NEW_CASE);
      await driver.sleep(pause);

      // select representative
      await driver.findElement(By.css('.case-representative-container .case-representative-option')).click();
      await driver.sleep(pause);

      // create case
      await driver.findElement(By.id('create-case')).click();
      await driver.sleep(pause * 5);
   }

   async fillFields(driver) {
      await driver.sleep(pause);

      // clientIDOrUCI
      await fillInputText('clientIDOrUCI', formData.clientIDOrUCI);

      // lastName
      await fillInputText('lastName', formData.lastName);

      // firstName
      await fillInputText('firstName', formData.firstName);

      // sex
      await fillSelectInput(`sex`, formData.sex);

      // birthDate
      await fillInputText('birthDate', formData.birthDate);

      // birthPlaceCityId
      await fillInputText('birthPlaceCityId', formData.birthPlaceCityId);

      // country
      await fillSelectInput(`birthPlaceCountryId`, formData.birthPlaceCountryId);

      // serviceLang
      await fillSelectInput(`serviceLang`, formData.serviceLang);

      // otherName
      await fillCheckbox('otherName', formData.hasOtherNames)

      // citizenship
      // await fillSelectInput(`citizenship`, formData.citizenship);
      await driver.findElement(By.id(`citizenship`)).findElement(By.xpath('./../../..'));
      await driver.sleep(pause * 4);
      await driver.findElement(By.css(`div[title="${formData.citizenship}"]`)).click();
      await driver.sleep(pause);


      async function fillInputText(field, data) {
         console.log(field, data);
         const webField = await driver.findElement(By.id(field));
         await driver.actions().click(webField).keyDown(Key.CONTROL).sendKeys('a').perform();
         await webField.sendKeys(Key.DELETE);
         await webField.sendKeys(data);
         await driver.sleep(pause);
      }

      async function fillSelectInput(field, data) {
         console.log(field, data);
         await driver.findElement(By.id(field)).findElement(By.xpath('./../../..')).click();
         await driver.sleep(pause);
         await driver.findElement(By.css(`div[title="${data}"]`)).click();
         await driver.sleep(pause);
      }

      async function fillCheckbox(field, data) {
         console.log(field, data);
         const hasOtherNamesOptions = await driver.findElements(By.css(`div[id="${field}"] .ant-radio-button-wrapper`));
         hasOtherNamesOptions[data ? 0 : 1].click();
         await driver.sleep(pause);
      }

   }

}

