import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
  await page.goto("https://demo.playwright.dev/todomvc/#/");

  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").fill("do the wishing");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page
    .getByPlaceholder("What needs to be done?")
    .fill("water the plants");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByRole("listitem").filter({ hasText: "do the washing" })
    .getByRole;
  await page.getByRole("link", { name: "Active" }).click();
  await page.getByRole("link", { name: "Completed" }).click();
  await page.getByRole("link", { name: "All" }).click();
  await page.getByRole("link", { name: "Delete" }).click();
});
