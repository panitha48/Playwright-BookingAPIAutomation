import { test, expect } from '@playwright/test'
import postAPIrequest from '../../test-data/api_requests/POST_API_Request.json'

// test.use({
//     baseURL:process.env.BASE_API_URL
// })
test("POST API Request with static test data", async ({ request }, testInfo) => {
     
    await test.step('Create booking API call', async () => {
        const startTime = Date.now();
        //Create POST API Response
        const response = await request.post(`/booking`, { data: postAPIrequest });

        const responseTime = Date.now() - startTime;
        const responseBody = await response.json();
        await testInfo.attach('response-time', {
            body: `Response Time: ${responseTime} ms`,
            contentType: 'text/plain'
        });
         console.log('POST API Response: ', JSON.stringify(responseBody, null, 2))
         //Printing the API Resonse
       
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
            firstname: "Playwright TestScript",
            lastname: "JavaScript",
            totalprice: 1000,
            depositpaid: true,
            additionalneeds: "super bowls",
        });
        //validate booking dates (nested json object)
        expect(booking.bookingdates).toMatchObject({
            checkin: "2026-05-01",
            checkout: "2026-05-03"
        });

    });

})