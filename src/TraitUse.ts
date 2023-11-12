import { Constructor, Target } from './Types'
import { PROP_CONSTRUCTORS } from './bootstrep'

export default class TraitUse {
  constructor() {
    this.use = this.use.bind(this)
  }

  mergeProperties(target: Target, traits: Constructor<object>[]): void {
    for (const Trait of traits) {
      const trait = new Trait()
      const props = Object.getOwnPropertyNames(trait)

      for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(trait, prop)
        Object.defineProperty(target, prop, descriptor || {})
      }
    }
  }

  mergeFunctions(target: Target, traits: Constructor<object>[]): void {
    for (const Trait of traits) {
      const traitProto = Object.getPrototypeOf(new Trait())
      const props = Object.getOwnPropertyNames(traitProto)

      for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(traitProto, prop)
        Object.defineProperty(target, prop, descriptor || {})
      }
    }
  }

  defineConstructosProterty(target: Target, traits: Constructor<object>[]) {
    Object.defineProperty(Object.getPrototypeOf(target), PROP_CONSTRUCTORS, {
      value: traits,
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }

  use(target: Target, traits: Constructor<object>[]) {
    this.mergeProperties(target, traits)
    this.mergeFunctions(target, traits)
    this.defineConstructosProterty(target, traits)
  }
}
