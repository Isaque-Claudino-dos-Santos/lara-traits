import TraitInstanceOf from './TraitInstanceOf'
import TraitUse from './TraitUse'

namespace trait {
  export const use = new TraitUse().use
  export const instanceOf = new TraitInstanceOf().instanceOf
}

export default trait
