import { expect, type Page } from '@playwright/test'
import { Given, Then, When } from './fixtures'

// このファイルが決めている「画面の約束」（実装はこれを満たせば緑になる）
// - シナリオ名は見出し（h1〜h6 のどれか）で表示する
// - ステップ選択は <select aria-label="ステップ選択">
//   - 段階ごとに <optgroup label="DNS"> などでまとめる
//   - 小ステップは <option>TCP：コネクション確立</option> のように「段階：小ステップ」と書く
// - 図は <figure>（role=figure）、説明は aria-label="説明" を付けた <section>（role=region）

const stepSelect = (page: Page) => page.getByRole('combobox', { name: 'ステップ選択' })

// 段階（optgroup）の中の小ステップ（option）を取り出す
const stepsInStage = (page: Page, stage: string) =>
  stepSelect(page).locator(`optgroup[label="${stage}"] option`)

Given('「{}」シナリオを表示している', async ({ page }, scenario: string) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: scenario })).toBeVisible()
})

When('ステップ選択で「{}」を選ぶ', async ({ page }, step: string) => {
  await stepSelect(page).selectOption({ label: step })
})

When('ステップ選択で「{}」段階の最後のステップを選ぶ', async ({ page }, stage: string) => {
  const last = stepsInStage(page, stage).last()
  await stepSelect(page).selectOption({ label: (await last.textContent()) ?? '' })
})

When('「{}」を押す', async ({ page }, name: string) => {
  await page.getByRole('button', { name }).click()
})

Then('「{}」段階の最初のステップの図と説明が表示されている', async ({ page }, stage: string) => {
  const first = await stepsInStage(page, stage).first().textContent()
  await expect(stepSelect(page).locator('option:checked')).toHaveText(first ?? '')
  await expect(page.getByRole('figure')).toBeVisible()
  await expect(page.getByRole('region', { name: '説明' })).not.toBeEmpty()
})

Then('「{}」ボタンが非活性である', async ({ page }, name: string) => {
  await expect(page.getByRole('button', { name })).toBeDisabled()
})
