import AccessModifiers from './AccessModifiers'
import { UseOptions, useOptionsDefaultValues } from './Models/UseOptions'
import { Constructor } from './Types'
import { IGNORE_CONSTRUCTOR_PROPS, PROP_CONSTRUCTORS } from './bootstrep'

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

  defineConstructosProterty<
    Target extends object,
    Traits extends Constructor[]
  >(target: Target, traits: Traits) {
    Object.defineProperty(target, PROP_CONSTRUCTORS, {
      value: traits,
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }

  merge(target: object, trait: object, props: string[], options: UseOptions) {
    for (const prop of props) {
      if (!options.overrite && prop in target && prop in trait) return

      const descriptor = Object.getOwnPropertyDescriptor(trait, prop)
      this.defineProperty(target, prop, descriptor)
    }
  }

  mergeProperties<Target extends object, Traits extends object[]>(
    target: Target,
    traitInstances: Traits,
    options: UseOptions = useOptionsDefaultValues
  ) {
    for (const trait of traitInstances) {
      const props = Object.getOwnPropertyNames(trait)

      this.merge(target, trait, props, options)
    }
  }

  mergeFunctions<Target extends object, Traits extends object[]>(
    target: Target,
    traitInstances: Traits,
    options: UseOptions = useOptionsDefaultValues
  ): void {
    for (const trait of traitInstances) {
      const traitProto = Object.getPrototypeOf(trait)
      const props = Object.getOwnPropertyNames(traitProto)

      this.merge(target, traitProto, props, options)
    }
  }

  mergeStatic<Target extends object, Traits extends Constructor[]>(
    target: Target,
    traits: Traits,
    options: UseOptions = useOptionsDefaultValues
  ): void {
    for (const trait of traits) {
      const props = Object.getOwnPropertyNames(trait)

      for (const prop of props) {
        if (IGNORE_CONSTRUCTOR_PROPS.some((v) => v === prop)) continue

        this.merge(target['constructor'], trait, props, options)
      }
    }
  }

  use<Target extends object, Traits extends Constructor[]>(
    target: Target,
    traits: Traits,
    options: UseOptions = useOptionsDefaultValues
  ) {
    const traitInstances = traits.map((Trait) => new Trait())
    this.mergeProperties(target, traitInstances, options)
    this.mergeFunctions(target, traitInstances, options)
    this.mergeStatic(target, traits, options)
    this.defineConstructosProterty(target, traits)
  }
}
