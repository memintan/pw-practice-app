import {Page, expect} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class DatePickerPage extends HelperBase{

    constructor(page:Page){
        super(page)
    } 

    async selectCommonDatePickerDateFromPicker(numberOfDatesFromToday: number){
        const calenderInputField = this.page.getByPlaceholder('Form Picker')
        await calenderInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDatesFromToday)
        await expect(calenderInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, enddDayFromToday: number){
        const calenderInputField = this.page.getByPlaceholder('Range Picker')
        await calenderInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(enddDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calenderInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDatesFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDatesFromToday )
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month:'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month:'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact: true}).click()
        return dateToAssert
    }


}