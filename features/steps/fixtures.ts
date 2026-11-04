import { test } from 'playwright-bdd'
import { createBdd } from 'playwright-bdd'

export const { Given, When, Then } = createBdd(test)
