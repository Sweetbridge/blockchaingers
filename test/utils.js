module.exports.assertException = async function (promise) {
  try {
    await promise
    assert.fail('Expected exception not received')
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0
    assert(revertFound, `Expected "revert", got ${error} instead`)
  }
}
