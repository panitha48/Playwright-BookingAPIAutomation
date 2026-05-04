import { test as base, expect } from '@playwright/test';

type Fixtures = {
  authHeaders: {
    Cookie: string;
  };
};

export const test = base.extend<Fixtures>({
  authHeaders: async ({ request }, use) => {

    const response = await request.post('/auth', {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });
    const body = await response.json();
    await use({
      Cookie: `token=${body.token}`
    });
  }
});

export { expect }