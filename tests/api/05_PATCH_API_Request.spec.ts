import { test, expect } from '../../fixtures/apiFixtures';
import { generateBookingData } from '../../utils/dataGenerator';

test('[@regression] Update booking details via PUT', async ({ request, bookingId, authHeaders}) => {

    const randomData=generateBookingData();
  
  //GET call using bookingId
  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse.status()).toBe(200);
  const body = await getResponse.json();
  console.log('GET Response:', body);
   
    const updatedData = {
    firstname: randomData.firstname,
    };
  //PATCH call for update only firstname
  const response = await request.patch(`/booking/${bookingId}`,{
    headers: authHeaders,
    data:  updatedData
  });
  expect(response.status()).toBe(200);
  const getBody = await response.json();
  console.log('PATCH Response:', getBody);
  expect(getBody.firstname).toBe(updatedData.firstname);
});