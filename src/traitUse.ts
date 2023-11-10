import { Constructor } from "./Types";
import { PROP_CONSTRUCTORS } from "./bootstrep";

export default function traitUse(
  target: object,
  traits: Constructor<object>[]
): void {
  for (const Trait of traits) {
    const trait = new Trait();
  
    Object.assign(target, { ...trait });

    const props = Object.getOwnPropertyNames(Object.getPrototypeOf(trait));

    for (const prop of props) {
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(trait), prop);
      
      Object.defineProperty(
        target,
        prop,
        descriptor || {}
      );
    }
  }

  Object.defineProperty(Object.getPrototypeOf(target), PROP_CONSTRUCTORS, {
    value: traits,
    writable: false,
    configurable: false,
    enumerable: false,
  });
}
