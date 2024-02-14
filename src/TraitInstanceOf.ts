import { Constructor } from './Types'
import { PROP_CONSTRUCTORS } from './bootstrep'

export default class TraitInstanceOf {
  instanceOf(target: object, trait: Constructor): target is typeof trait {
    if (!(PROP_CONSTRUCTORS in target)) return false
    const constructors = target[PROP_CONSTRUCTORS] as Constructor[]

    for (const constructor of constructors) {
      if (trait === constructor) return true
    }
    return false
  }
}
