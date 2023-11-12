import trait from '../src/index'

describe('InstanceOf Testings', () => {
  test('Should return TRUE on test one instance', () => {
    class BaseTrait {}
    class Parent {
      constructor() {
        trait.use(this, [BaseTrait])
      }
    }
    const parent = new Parent()

    expect(trait.instanceOf(parent, BaseTrait)).toBeTruthy()
  })

  test('Should return FALSE on test one instance', () => {
    class BaseTrait {}
    class OtherClass {}
    class Parent {
      constructor() {
        trait.use(this, [BaseTrait])
      }
    }
    const parent = new Parent()

    expect(trait.instanceOf(parent, OtherClass)).toBeFalsy()
  })
})
