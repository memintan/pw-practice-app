import {test, expect} from '@playwright/test'
import{NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form Page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.toolTipPage()
})

test('Parametrized Methods', async({page}) =>{
    const navigateTo = new NavigationPage(page)
    const onFormLayoutPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutPage.submitInlineFormWithNameAndCheckbox('John Smith', "john@test.com", true)
})
