import { Constructor } from "./Types";
import { PROP_CONSTRUCTORS } from "./bootstrep";

export default function traitUse(
  target: object,
  traits: Constructor<object>[]
): void {
  for (const trait of traits) {
    Object.assign(target, { ...new trait() });

    const props = Object.getOwnPropertyNames(trait);

    for (const prop of props) {
      const descriptor = Object.getOwnPropertyDescriptor(trait, prop);

      Object.defineProperty(
        Object.getPrototypeOf(target),
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
