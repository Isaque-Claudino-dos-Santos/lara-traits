import AccessModifiers from './AccessModifiers'
import { Constructor, Target } from './Types'
import { PROP_CONSTRUCTORS } from './bootstrep'

export default class TraitUse {
  private readonly accessModifier = new AccessModifiers()

  constructor() {
    this.use = this.use.bind(this)
  }

  ignoreProp(prop: string): boolean {
    return this.accessModifier.contentPrivateModifier(prop)
  }

  defineProperty(
    context: object,
    prop: string,
    descriptor: PropertyDescriptor | undefined
  ) {
    if (this.ignoreProp(prop) || prop in context) return
    Object.defineProperty(context, prop, descriptor || {})
  }
  
  defineConstructosProterty(target: Target, traits: Constructor<object>[]) {
    Object.defineProperty(target, PROP_CONSTRUCTORS, {
      value: traits,
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }

  mergeProperties(target: Target, traits: Constructor<object>[]): void {
    for (const Trait of traits) {
      const trait = new Trait()
      const props = Object.getOwnPropertyNames(trait)

      for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(trait, prop)
        this.defineProperty(target, prop, descriptor)
      }
    }
  }

  mergeFunctions(target: Target, traits: Constructor<object>[]): void {
    for (const Trait of traits) {
      const traitProto = Object.getPrototypeOf(new Trait())
      const props = Object.getOwnPropertyNames(traitProto)

      for (const prop of props) {
        const descriptor = Object.getOwnPropertyDescriptor(traitProto, prop)
        this.defineProperty(target, prop, descriptor)
      }
    }
  }

  use(target: Target, traits: Constructor<object>[]) {
    this.mergeProperties(target, traits)
    this.mergeFunctions(target, traits)
    this.defineConstructosProterty(target, traits)
  }
}
