import { faker } from '@faker-js/faker';

export function generateBookingData() {

  const checkinDate = faker.date.soon({ days: 5 });
  const checkoutDate = faker.date.soon({ days: 10 });

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 500, max: 5000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: checkinDate.toISOString().split('T')[0],
      checkout: checkoutDate.toISOString().split('T')[0]
    },
    additionalneeds: faker.helpers.arrayElement([
      'Breakfast',
      'Lunch',
      'Dinner',
      'Extra Pillow'
    ])
  };
}