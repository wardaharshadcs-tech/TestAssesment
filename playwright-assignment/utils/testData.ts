import { faker } from "@faker-js/faker";

export const TestData = {
  validUser: {
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!,
  },

  fakeUser: () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
  }),

  randomUser: () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }),

  lockoutUser: {
    email: process.env.LOCKOUT_TEST_EMAIL!,
    password: process.env.LOCKOUT_TEST_PASSWORD!,
  },
};
