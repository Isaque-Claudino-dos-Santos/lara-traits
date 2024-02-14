import AccessModifiers from './AccessModifiers'
import { UseOptions, useOptionsDefaultValues } from './Models/UseOptions'
import { Constructor, Target, TraitInstance } from './Types'
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

  defineConstructosProterty(
    target: Target,
    traits: Constructor<TraitInstance>[]
  ) {
    Object.defineProperty(target, PROP_CONSTRUCTORS, {
      value: traits,
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }

  merge(target: Target, trait: object, props: string[], options: UseOptions) {
    for (const prop of props) {
      if (!options.overrite && prop in target && prop in trait) return

      const descriptor = Object.getOwnPropertyDescriptor(trait, prop)
      this.defineProperty(target, prop, descriptor)
    }
  }

  mergeProperties(
    target: Target,
    traitInstances: TraitInstance[],
    options: UseOptions = useOptionsDefaultValues
  ): void {
    for (const trait of traitInstances) {
      const props = Object.getOwnPropertyNames(trait)

      this.merge(target, trait, props, options)
    }
  }

  mergeFunctions(
    target: Target,
    traitInstances: TraitInstance[],
    options: UseOptions = useOptionsDefaultValues
  ): void {
    for (const trait of traitInstances) {
      const traitProto = Object.getPrototypeOf(trait)
      const props = Object.getOwnPropertyNames(traitProto)

      this.merge(target, traitProto, props, options)
    }
  }

  use(
    target: Target,
    traits: Constructor<object>[],
    options: UseOptions = useOptionsDefaultValues
  ) {
    const traitInstances = traits.map((Trait) => new Trait())
    this.mergeProperties(target, traitInstances, options)
    this.mergeFunctions(target, traitInstances, options)
    this.defineConstructosProterty(target, traits)
  }
}
