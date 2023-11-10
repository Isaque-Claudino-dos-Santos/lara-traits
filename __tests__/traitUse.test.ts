import trait from "../src/index.ts";
import { faker } from "@faker-js/faker";

describe("Testing method use", () => {
  test("Should add only one variable in object", () => {
    const keyName = "name";
    const nameValue = faker.person.firstName();

    class A {
      [keyName] = nameValue;
    }

    interface C extends A {}
    class C {
      constructor() {
        trait.use(this, [A]);
      }
    }

    const c = new C();

    expect(keyName in c).toBeTruthy();
    expect(c[keyName]).toEqual(nameValue);
  });
});
