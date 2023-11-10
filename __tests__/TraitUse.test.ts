import TraitUse from '../src/TraitUse'
import { faker } from "@faker-js/faker";

const traitUse = new TraitUse()

describe("Testing method use", () => {
  test("Should add only one variable in object", () => {
    const keyName = "name";
    const nameValue = faker.person.firstName();

    class BaseTrait {
      [keyName] = nameValue;
    }

    interface Parent extends BaseTrait {}
    class Parent {
      constructor() {
        traitUse.mergeProperties(this, [BaseTrait]);
      }
    }

    const parent = new Parent();

    expect(keyName in parent).toBeTruthy();
    expect(parent[keyName]).toEqual(nameValue);
  });

  test("Should add only one function in object", () => {
    class BaseTrait {
      getSequence() {
        return 1234;
      }
    }

    interface Parent extends BaseTrait {}
    class Parent {
      constructor() {
        traitUse.mergeFunctions(this, [BaseTrait]);
      }
    }

    const parent = new Parent()

    expect('getSequence' in parent).toBeTruthy()
    expect(parent.getSequence()).toEqual(1234)
  });
});
