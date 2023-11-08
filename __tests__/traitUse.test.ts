import use from "../src/traitUse";
import { faker } from "@faker-js/faker";

describe("Testing method use", () => {
  test("Should add variable in object", () => {
    const keyName = "name";
    const nameValue = faker.person.firstName();
    const keyAge = "age";
    const ageValue = faker.number.int({ max: 3 });
    class A {
      [keyName] = nameValue;
    }

    class B {
      [keyAge] = ageValue;
    }

    interface C extends A, B {}
    class C {
      constructor() {
        use(this, [A, B]);
      }
    }

    const c = new C();

    expect(keyName in c).toBeTruthy();
    expect(c[keyName]).toEqual(nameValue);

    expect(keyAge in c).toBeTruthy();
    expect(c[keyAge]).toEqual(ageValue);
  });
});
