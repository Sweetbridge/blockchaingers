// Copyright (c) 2017 Sweetbridge Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global web3 */

var {assertException, assertRevert} = require('./utils')
var IdSilo = artifacts.require('IdSilo')

contract('IdSilo', function (accounts) {
  let ctr
  let eid = web3.sha3('e1')

  before(async () => {
    ctr = await IdSilo.deployed()
  })

  it('only owner can add data entry', async () => {
    await ctr.addDataEntry('e1', 'driving license', '0x001')
    let de = await ctr.dataEntries(eid)
    assert.deepEqual(de,
      ['driving license', 'e1',
        '0x0010000000000000000000000000000000000000000000000000000000000000'])

    assertRevert(ctr.addDataEntry('e2', 'driving license', '0x002',
                                     {from: accounts[2]}))
  })

  it('can reupload data entry', async () => {
    await ctr.addDataEntry('e1', 'driving license', '0x002')
    let de = await ctr.dataEntries(eid)
    assert.deepEqual(de,
      ['driving license', 'e1',
        '0x0020000000000000000000000000000000000000000000000000000000000000'])
    assert.equal(eid, await ctr.entryIds(0))
    assertException(ctr.entryIds(1), 'should have only one data entry')
  })

  it('can\'t request certification of not exsisting data entry', async () => {
    assertRevert(ctr.requestCertification(accounts[2], 'unknown'))
  })

  it('can\'t request certification from not recognised cert authority', async () => {
    assertRevert(ctr.requestCertification(accounts[3], 'unknown'))
  })

  it('request and get certification', async () => {
    await ctr.requestCertification(accounts[2], 'e1')
    let c = await ctr.getCertification(eid, accounts[2])
    c = c.map(n => n.toNumber())
    assert.deepEqual(c, [3, 0, 0])
  })

  it('can\'t set invalid state into claim', async () => {
    assertRevert(ctr.certifyClaim('e1', 0, 2000, 9000, {from: accounts[2]}))
  })

  it('be able certify claim', async () => {
    await ctr.certifyClaim('e1', 1, 2000, 9000, {from: accounts[2]})
    let c = await ctr.getCertification(eid, accounts[2])
    c = c.map(n => n.toNumber())
    assert.deepEqual(c, [1, 2000, 9000])
  })

  it('can\'t certify not requested claim', async () => {
    assertRevert(ctr.certifyClaim('e1', 1, 2000, 9000, {from: accounts[3]}))
  })

  it('can\'t change claim', async () => {
    assertRevert(ctr.certifyClaim('e1', 1, 2000, 9000, {from: accounts[2]}))
  })
})
