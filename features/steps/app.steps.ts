import { expect } from '@playwright/test'
import { Then, When } from './fixtures'

When('トップページを開く', async ({ page }) => {
  await page.goto('/')
})

Then('見出し「{}」が表示される', async ({ page }, name: string) => {
  await expect(page.getByRole('heading', { name })).toBeVisible()
})
