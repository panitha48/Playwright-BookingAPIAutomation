import { test, expect } from '../../fixtures/apiFixtures';
import {validateSchema} from '../../utils/schemaValidator';
import {bookingSchema} from '../../schemas/bookingResponse.schema'
import { generateBookingData } from '../../utils/dataGenerator';
import { BookingAPI } from '../api/BookingAPI';



test('[@smoke] Full API flow', async ({ request, authHeaders }) => {

  const api = new BookingAPI(request, authHeaders);

  // Create
  const postRes = await api.createBooking(generateBookingData());
  const postBody = await postRes.json();
  const bookingId = postBody.bookingid;

  // Get
  const getRes = await api.getBooking(bookingId);
  const getBody = await getRes.json();

  // Schema validation
  validateSchema(bookingSchema, getBody);

  // Delete
  const deleteRes = await api.deleteBooking(bookingId);
  expect(deleteRes.status()).toBe(201);

});