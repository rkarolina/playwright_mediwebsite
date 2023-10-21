import { test, expect } from "@playwright/test";

test.setTimeout(120000);

test("has title2", async ({ page }) => {
  // go to website
  await page.goto("https://****medi.com/pl/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lekarz Online/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://****medi.com/pl/");

  // accept cookie
  await page.getByRole("button", { name: "Zezwól na wszystkie" }).click();
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*****medi/);
});

test("has title login page", async ({ page }) => {
  // go to website
  await page.goto("https://panel.****medi.com/pl/login");

  await expect(page).toHaveTitle("Konto pacjenta");
});

test("login", async ({ page }) => {
  await page.goto("https://****medi.com/pl/");
  await page.getByRole("button", { name: "Zezwól na wszystkie" }).click();
  // await page.goto("https://panel.****medi.com/pl/login");
  await page.getByRole("link", { name: "Zaloguj się" }).click();
  // logowanie
  await page.getByPlaceholder("E-mail, PESEL lub identyfikator").click();
  await page
    .getByPlaceholder("E-mail, PESEL lub identyfikator")
    .fill("test@test.com");
  await page.getByPlaceholder("Hasło").click();
  await page.getByPlaceholder("Hasło").fill("tutaj_jakies_haslo123!");
  // Zaloguj się button located using xpath
  await page.locator("xpath=//div[3]/button").click();
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);
});

test("has title make consultation page", async ({ page }) => {
  // go to website
  await page.goto("https://panel.****medi.com/pl");

  await expect(page).toHaveTitle("Konto pacjenta");
});

test("makeConsultation", async ({ page }) => {
  await page.goto("https://panel.****medi.com/pl");
  await page.getByRole("button", { name: "Umów się" }).click();
  await page
    .getByRole("button", { name: "Recepta Konsultacja z ankietą medyczną" })
    .click();
  await expect(page).toHaveURL(/.*make-consultation/);
});
//---------------------

test("zadanie calosc", async ({ page }) => {
  // Przejście na adres: https://****medi.com/pl/
  await page.goto("https://****medi.com/pl/");

  const LogIn = await page.getByRole("link", { name: "Zaloguj się" });
  const cookies = await page.getByRole("button", {
    name: "Zezwól na wszystkie",
  });

  await cookies.waitFor({ state: "visible", timeout: 3000 });

  if (await cookies.isVisible())
    await page.getByRole("button", { name: "Zezwól na wszystkie" }).click();
  await LogIn.click();

  // logowanie
  await page.getByPlaceholder("E-mail, PESEL lub identyfikator").click();
  await page
    .getByPlaceholder("E-mail, PESEL lub identyfikator")
    .fill("****meditest@gmail.com");
  await page.getByPlaceholder("Hasło").click();
  await page.getByPlaceholder("Hasło").fill("****meditest12!");

  // Zaloguj się button located using xpath
  await page.locator("xpath=//div[3]/button").click();

  //Przejście do sekcji ‘Umów się’ -> ‘Recepta’
  await page.getByRole("button", { name: "Umów się" }).click();

  const prescriptionsButton = await page.locator(
    "[id='consultationNestedMenu:prescriptionHeader']"
  );

  await page.waitForTimeout(2000); // not the best solution, but doesn't work other way

  await prescriptionsButton.click();
  await expect(page).toHaveURL(/.*make-consultation/);

  //Wyszukanie i wybranie leku ‘Afastural’
  await page.locator("div.css-yk16xz-control").click();
  await page.locator('[id="react-select-2-input"]').fill("Afastural");

  const drugElement = page.locator("[id='react-select-2-option-0']");
  await drugElement.click();

  await expect(page).toHaveURL(/.*order_perscription/);

  //Wybranie opcji ‘1 sasz. 8 g’ jako wielkość opakowania
  const sizeDropdown = await page.locator("div.select-no-value"); // skrócenie "div.select-react select-no-value"
  await sizeDropdown.click();

  const optionOne = await page.locator("[id='react-select-3-option-0']");
  await optionOne.click();

  //mark checkbox
  const checkboxAccept = await page.locator("div.prescription-checkbox");
  await checkboxAccept.click();
  //click button "Wybierz"
  await page.getByRole("button", { name: "Wybierz" }).click();

  //waiting until Checkbox section is visible
  const checkbox****mediGO = await page.locator("div.****medi-go");
  await checkbox****mediGO.click();
  const label = await page.locator("[for='checkAll']");
  await label.click();

  //click button "Wybierz"
  await page.getByRole("button", { name: /PLN$/ }).click();
  await expect(page).toHaveURL(/.*order_perscription/);

  //go to payu
  await expect(page).toHaveURL(/^https:\/\/secure.payu.com\/pay\//, {
    timeout: 120000,
  });
});
