import use from "../src/traitUse";
import { faker } from "@faker-js/faker";

describe("Testing method use", () => {
  test("Should add variable in object", () => {
    const key1 = "name1";
    const value1 = faker.person.firstName();
    const key2 = "name1";
    const value2 = faker.person.firstName();
    class A {
      [key1] = value1;
    }

    class B {
      [key2] = value2;
    }

    interface C extends A, B {}
    class C {
      constructor() {
        use(this, [A, B]);
      }
    }

    const c = new C();

    expect(key1 in c).toBeTruthy();
    expect(c[key1]).toEqual(value1);

    expect(key2 in c).toBeTruthy();
    expect(c[key2]).toEqual(value2);
  });
});
