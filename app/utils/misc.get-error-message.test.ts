import { beforeEach, expect, MockInstance, test, vi } from 'vitest'

import { getErrorMessage } from '~/utils/misc'

let consoleMock: MockInstance
beforeEach(() => {
  consoleMock = vi.spyOn(console, 'error').mockImplementation(() => {})
})

test('Should return the errors message', () => {
  expect(getErrorMessage(new Error('Testing Error'))).toBe('Testing Error')
})

test(`Should return the error argument when it's a string`, () => {
  expect(getErrorMessage('String Error')).toBe('String Error')
})

test('Should return unknown when the error argument is of any other type', () => {
  expect(getErrorMessage(false)).toBe('Unknown Error')
  expect(consoleMock).toHaveBeenCalledOnce()

  expect(getErrorMessage([])).toBe('Unknown Error')
  expect(consoleMock).toHaveBeenCalledTimes(2)

  expect(getErrorMessage(0)).toBe('Unknown Error')
  expect(consoleMock).toHaveBeenCalledTimes(3)
})

test('Should return unknown when no message property is present', () => {
  expect(getErrorMessage({ test: 'property' })).toBe('Unknown Error')
  expect(consoleMock).toHaveBeenCalledOnce()
})
