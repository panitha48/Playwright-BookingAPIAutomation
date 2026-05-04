import { test, expect } from '../../fixtures/apiFixtures';
import { generateBookingData } from '../../utils/dataGenerator';

test(' [@regression] Update booking details via PUT', async ({ request, bookingId, authHeaders}) => {
   
    const dynamicData = generateBookingData();
    const updatedData = {
    firstname: dynamicData.firstname,
    lastname: dynamicData.lastname,
    totalprice: dynamicData.totalprice,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-06-01',
      checkout: '2026-06-05'
    },
    additionalneeds: dynamicData.additionalneeds
  };
  //PUT call for update the booking details
  const response = await request.put(`/booking/${bookingId}`,{
    headers: authHeaders,
    data: updatedData 
  });
  expect(response.status()).toBe(200);
  const getBody = await response.json();
  console.log('PUT Response:', getBody);
  expect(getBody.firstname).toBe(updatedData.firstname);
});