import { test, expect } from '@playwright/test'
import { generateBookingData } from '../../utils/dataGenerator';

test("[@regression] POST API Request with static test data", async ({ request }, testInfo) => {

    const dynamicData = generateBookingData();
    await test.step('Create booking API call', async () => {
        const startTime = Date.now();
        //Create POST API Response
        const response = await request.post(`/booking`, { data: dynamicData });
        const responseTime = Date.now() - startTime;
        const responseBody = await response.json();
        await testInfo.attach('response-time', {
            body: `Response Time: ${responseTime} ms`,
            contentType: 'text/plain'
        });
        // console.log('Request Data:', dynamicData);
        // console.log('POST API Response: ', JSON.stringify(responseBody, null, 2))
        //Printing the API Resonse
        await testInfo.attach('request-data', {
            body: JSON.stringify(dynamicData, null, 2),
            contentType: 'application/json'
        });
        await testInfo.attach('request', {
            body: JSON.stringify(dynamicData, null, 2),
            contentType: 'application/json'
        });

        //Validating the API Response
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        expect(response.ok()).toBeTruthy();
        expect(response.headers()['content-type']).toContain('application/json');
        expect(responseTime).toBeLessThan(2000);

        //Validate the API Response Body attributes
        expect(responseBody).toHaveProperty("bookingid")
        expect(responseBody).toHaveProperty("booking")
        expect(responseBody).toHaveProperty("booking.additionalneeds")

        //validate booking details
        const booking = responseBody.booking;
        expect(booking).toMatchObject({
            firstname: dynamicData.firstname,
            lastname: dynamicData.lastname,
            totalprice: dynamicData.totalprice,
            depositpaid: dynamicData.depositpaid,
            additionalneeds: dynamicData.additionalneeds,
        });
        //validate booking dates (nested json object)
        expect(booking.bookingdates).toMatchObject({
            checkin: dynamicData.bookingdates.checkin,
            checkout: dynamicData.bookingdates.checkout
        });

    });

})