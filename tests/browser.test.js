const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});

test('The pop removes what is on the top of the stack', async () => {
	let pop = await driver.findElement(By.id('pop'));
	let stackPrePop = await driver.findElement(By.id('top_of_stack')).getText();
	console.log(stackPrePop);
	await pop.click();
	let alert = await driver.switchTo().alert();
	await alert.accept();
	let peek = await driver.findElement(By.id('peek'));
	await peek.click();
	let stackPostPop = await driver.findElement(By.id('top_of_stack')).getText();
	console.log(stackPostPop);
	expect(stackPostPop).not.toContain("Bananer");
	expect(stackPostPop).not.toEqual(stackPrePop);
});