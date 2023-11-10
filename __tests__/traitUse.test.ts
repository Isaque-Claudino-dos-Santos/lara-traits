import trait from "../src/index";
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

  test("Should add only one function in object", () => {
    const name = faker.person.firstName();
    class A {
      name = name;

      getName() {
        return this.name;
      }
    }

    interface C extends A {}
    class C {
      constructor() {
        trait.use(this, [A]);
      }
    }

    const c = new C();

    expect("getName" in c).toBeTruthy();
    expect(c.getName()).toEqual(name);
  });
});
