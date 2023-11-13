import { PREFIX_PRIVATE_PATTERN } from './bootstrep'

export type ModifiersPrefix = {
  readonly private: RegExp
}

export default class AccessModifiers {
  private readonly prefix: ModifiersPrefix = {
    private: PREFIX_PRIVATE_PATTERN,
  }

  contentPrivateModifier(str: string): boolean {
    return this.prefix.private.test(str)
  }
}
