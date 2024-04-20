import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form Page', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTipPage()
    await pm.navigateTo().formLayoutsPage()
})

test('Parametrized Methods', async({page}) =>{
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutPage().submitInlineFormWithNameAndCheckbox('John Smith', "john@test.com", true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromPicker(5)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(10,15)
})
