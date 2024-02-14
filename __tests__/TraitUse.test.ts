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

  it('should not overrite properties', () => {
    const traitPropValue = faker.person.firstName()
    const basePropValue = faker.person.firstName()

    class MyTrait {
      name = traitPropValue
    }

    class Base {
      name = basePropValue

      constructor() {
        traitUse.mergeProperties(this, [MyTrait], {
          overrite: false,
        })
      }
    }

    const base = new Base()

    expect(base.name).not.toBe(traitPropValue)
    expect(base.name).toBe(basePropValue)
  })

  it('should not overrite functions', () => {
    const traitReturnValue = faker.person.firstName()
    const baseReturnValue = faker.person.firstName()

    class MyTrait {
      getName() {
        return traitReturnValue
      }
    }

    class Base {
      constructor() {
        traitUse.mergeFunctions(this, [MyTrait], {
          overrite: false,
        })
      }

      getName() {
        return baseReturnValue
      }
    }

    const base = new Base()

    expect(base.getName()).not.toBe(traitReturnValue)
    expect(base.getName()).toBe(baseReturnValue)
  })
  it('should define static propertie in class', () => {
    const key = 'staticPropKey'
    const value = faker.animal.dog()

    class BaseTrait {
      static [key] = value
    }

    class Main {
      constructor() {
        traitUse.use(this, [BaseTrait])
      }
    }

    expect(key in new Main()).toBeFalsy()
    expect(key in Main).toBeTruthy()
    expect(Main[key]).toBe(value)
    expect(BaseTrait[key]).toBe(value)
  })

  it('should update static propertie value', () => {
    const key = 'staticPropKey'
    const initValue = faker.animal.cat()
    const newValue = faker.animal.bird()

    class BaseTrait {
      static [key] = initValue
    }

    class Main {
      constructor() {
        traitUse.use(this, [BaseTrait])
      }
    }

    expect(key in new Main()).toBeFalsy()
    expect(Main[key]).toBe(initValue)
    expect(BaseTrait[key]).toBe(initValue)

    Main[key] = newValue

    expect(Main[key]).toBe(newValue)
    expect(BaseTrait[key]).toBe(initValue)
  })

  it('should add static method', () => {
    const methodName = 'staticMethod'
    const methodReturn = faker.number.int()
    const methodParam = faker.number.int()
    const expectedMethodReturn = methodReturn + methodParam

    class BaseTrait {
      static [methodName](n: number) {
        return methodReturn + n
      }
    }

    class Main {
      constructor() {
        traitUse.use(this, [BaseTrait])
      }
    }

    expect(methodName in new Main()).toBeFalsy()
    expect(methodName in Main).toBeTruthy()
    expect(Main[methodName](methodParam)).toBe(expectedMethodReturn)
  })
})
