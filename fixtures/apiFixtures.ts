import { test as base, expect } from '@playwright/test';
import { generateBookingData } from '../utils/dataGenerator';

type ApiFixtures = {
  authHeaders: {
    Cookie: string;
  };
  bookingId: number;
};

export const test = base.extend<ApiFixtures>({
  
  // 🔐 Auth Fixture
  authHeaders: async ({ request }, use) => {
    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    await use({
      Cookie: `token=${body.token}`
    });
  },

  // 🆔 Booking ID Fixture
  bookingId: async ({ request }, use) => {
    const response = await request.post('/booking', {
      data: generateBookingData()
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    await use(body.bookingid);
  }

});

export { expect };