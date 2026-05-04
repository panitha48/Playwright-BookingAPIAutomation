import { test, expect } from '../../fixtures/apiFixtures';

test('[@regression] DELETE Booking details', async ({ request, bookingId, authHeaders},testInfo) => {
    // Booking
    console.log('Booking Id', bookingId)
   
    //Delete call for delete the booking details
    const deleteAPIResponse = await request.delete(`/booking/${bookingId}`, { headers: authHeaders });
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe('Created');
    
    const text = await deleteAPIResponse.text();
    console.log('Delete API Response:', text);
    
    await testInfo.attach('response', {
        body: await deleteAPIResponse.text(),
        contentType: 'text/plain'
    });

    //Get call after deletion of the booking details
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
});