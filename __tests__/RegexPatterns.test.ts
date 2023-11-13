import { PREFIX_PRIVATE_PATTERN } from '../src/bootstrep'

describe('Testings All Patterns', () => {
  test('Testing Truthfulness private pattern', () => {
      expect(PREFIX_PRIVATE_PATTERN.test('_test')).toBeTruthy()
      expect(PREFIX_PRIVATE_PATTERN.test('_test_test')).toBeTruthy()
      expect(PREFIX_PRIVATE_PATTERN.test('__test_test')).toBeTruthy()
      expect(PREFIX_PRIVATE_PATTERN.test('__test_test_')).toBeTruthy()
      expect(PREFIX_PRIVATE_PATTERN.test('__$test_$test')).toBeTruthy()
      expect(PREFIX_PRIVATE_PATTERN.test('test')).toBeFalsy()
      expect(PREFIX_PRIVATE_PATTERN.test('test_')).toBeFalsy()
      expect(PREFIX_PRIVATE_PATTERN.test('test_test_')).toBeFalsy()
      expect(PREFIX_PRIVATE_PATTERN.test('test_test_')).toBeFalsy()
  })
})
