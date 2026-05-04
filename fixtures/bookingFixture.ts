// fixtures/bookingFixture.ts
import { test as base, expect} from '@playwright/test';
import { generateBookingData } from '../utils/dataGenerator';

export const test = base.extend<{
  bookingId: number;
}>({
  bookingId: async ({ request }, use) => {
    const response = await request.post('/booking', {
      data: generateBookingData()
    });

    const body = await response.json();

    await use(body.bookingid);
  }
});

export {expect}