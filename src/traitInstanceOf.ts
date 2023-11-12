import { Constructor } from './Types'
import { PROP_CONSTRUCTORS } from './bootstrep'

export default function traitInstanceOf(
  target: object,
  cls: Constructor<object>
): boolean {
  if (!(PROP_CONSTRUCTORS in target)) return false
  const constructors = target[PROP_CONSTRUCTORS] as Constructor<object>[]

  for (const constructor of constructors) {
    if (cls === constructor) return true
  }
  return false
}
