import traitInstanceOf from './traitInstanceOf'
import TraitUse from './TraitUse'

namespace trait {
  export const use = new TraitUse().use
  export const instanceOf = traitInstanceOf
}

export default trait
