
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpsledgerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpsledgerSDK.test()
    equal(testsdk instanceof OpsledgerSDK, true,
      'OpsledgerSDK.test() must return a client synchronously')
  })

})
