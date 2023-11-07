import use from "../src/use";
import { faker } from "@faker-js/faker";

describe("Testing method use", () => {
  test("Should add variable in object", () => {
    const key = "name";
    const value = faker.person.firstName();

    class A {
      [key] = value;
    }

    interface B extends A {}
    class B {
      constructor() {
        use(this, [A]);
      }
    }

    const b = new B();   
    
    expect(key in b).toBeTruthy();
    expect(b[key]).toEqual(value);
  });
});
