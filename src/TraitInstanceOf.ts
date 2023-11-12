import { Constructor, Target } from './Types'
import { PROP_CONSTRUCTORS } from './bootstrep'

export default class TraitInstanceOf {
  instanceOf(
    target: Target,
    trait: Constructor<object>
  ): target is typeof trait {
    if (!(PROP_CONSTRUCTORS in target)) return false
    const constructors = target[PROP_CONSTRUCTORS] as Constructor<object>[]

    for (const constructor of constructors) {
      if (trait === constructor) return true
    }
    return false
  }
}
