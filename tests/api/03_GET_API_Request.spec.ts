import { test, expect } from '../../fixtures/apiFixtures';
import {validateSchema} from '../../utils/schemaValidator';
import {bookingSchema} from '../../schemas/bookingResponse.schema'

test('[@regression] Create booking and validate via GET', async ({ request, bookingId}) => {
  
  //GET call using bookingId
  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  console.log('GET Response:', getBody);
  validateSchema(bookingSchema, getBody);
});