// import 'dotenv/config';
import { Builder, By, Key } from 'selenium-webdriver';

const pause = 300;

export default async function login(driver) {
   await driver.findElement(By.id('email')).sendKeys(process.env.LOGIN_USER);
   await driver.sleep(pause);
   await driver.findElement(By.id('password')).sendKeys(process.env.LOGIN_PASS, Key.ENTER);
   await driver.sleep(pause);
}