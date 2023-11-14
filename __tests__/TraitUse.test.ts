import TraitUse from '../src/TraitUse'
import { faker } from '@faker-js/faker'

const traitUse = new TraitUse()

describe('Use Method Testings', () => {
  test('Should add only one propertie in object', () => {
    const keyName = 'name'
    const nameValue = faker.person.firstName()

    class BaseTrait {
      [keyName] = nameValue
    }

    interface Parent extends BaseTrait {}
    class Parent {
      constructor() {
        traitUse.mergeProperties(this, [new BaseTrait()])
      }
    }

    const parent = new Parent()

    expect(keyName in parent).toBeTruthy()
    expect(parent[keyName]).toEqual(nameValue)
  })

  test('Should add only one function in object', () => {
    class BaseTrait {
      getSequence() {
        return 1234
      }
    }

    interface Parent extends BaseTrait {}
    class Parent {
      constructor() {
        traitUse.mergeFunctions(this, [new BaseTrait()])
      }
    }

    const parent = new Parent()

    expect('getSequence' in parent).toBeTruthy()
    expect(parent.getSequence()).toEqual(1234)
  })

  test('Should ignore the propertie with prefix underscore on merge', () => {
    const keyName = '_name' // means private variable
    const valueName = faker.person.firstName()

    class BaseTrait {
      [keyName] = valueName
    }

    class Parent {
      constructor() {
        traitUse.mergeProperties(this, [new BaseTrait()])
      }
    }

    const parent = new Parent()

    expect(keyName in parent).toBeFalsy()
  })

  test('Should ignore the function with prefix underscore on merge', () => {
    class BaseTrait {
      _getSequence() {
        return 1234
      }
    }

    class Parent {
      constructor() {
        traitUse.mergeFunctions(this, [new BaseTrait()])
      }
    }

    const parent = new Parent()

    expect('_getSequence' in parent).toBeFalsy()
  })

  test('Should return value overwrite of method', () => {
    class BaseTrait {
      getSequence(): number {
        return 123
      }
    }

    class Parent {
      constructor() {
        traitUse.mergeFunctions(this, [new BaseTrait()])
      }

      getSequence(): number {
        return 456
      }
    }

    const parent = new Parent()

    expect(parent.getSequence()).toEqual(456)
  })

  test('Should return value overwrite of propertie', () => {
    const newName = faker.person.firstName()

    class BaseTrait {
      name = faker.person.firstName()
    }

    class Parent {
      name = newName

      constructor() {
        traitUse.mergeFunctions(this, [new BaseTrait()])
      }
    }

    const parent = new Parent()

    expect(parent.name).toEqual(newName)
  })

  test('Should show the value proving that the trais has once instance', () => {
    class GenID {
      static ID = 0
      id = 0

      constructor() {
        GenID.ID++
        this.id = GenID.ID
      }
    }

    interface Parent extends GenID {}
    class Parent {
      constructor() {
        traitUse.use(this, [GenID])
      }
    }

    const parent1 = new Parent()
    const parent2 = new Parent()

    expect(parent1.id).toEqual(1)
    expect(parent2.id).toEqual(2)
  })
})
