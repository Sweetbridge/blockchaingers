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

var {assertException} = require('./utils')
var Certifiers = artifacts.require('Certifiers')

contract('Certifiers', function (accounts) {
  let ctr

  before(async () => {
    ctr = await Certifiers.deployed()
  })

  it('can add certifier', async () => {
    let addr = '0x8fb41d5c04bd641e616fd3ac932d205665b8e7ec'
    let url = 'ipfs://dfajhobjhkj32nm324'
    let addrLicense = 'http://c1.com/license'
    await ctr.addCertifier(addr, url, 'c1', addrLicense)
    let c = await ctr.certifiers(addr)
    c[3] = c[3].toNumber()
    assert.deepEqual(c,
                     [url, 'c1', addrLicense, 1])
  })

  it('can not add new certifier with same address', async () => {
    let addr = '0x8fb41d5c04bd641e616fd3ac932d205665b8e7ec'
    let url = 'ipfs://dfajhobjhkj32nm324'
    let addrLicense = 'http://c1.com/license'
    await ctr.addCertifier(addr, url, 'c2', addrLicense)
    let c = await ctr.certifiers(addr)
    assert.equal(c[1], 'c1',
                 'should return old certifier')
  })

  it('can deactivate active certifier', async () => {
    let addr = '0x8fb41d5c04bd641e616fd3ac932d205665b8e7ec'
    await ctr.deactivateCertifier(addr)
    let c = await ctr.certifiers(addr)
    assert.equal(c[3].toNumber(), 2,
                 'should have inactive state')
  })

  it('can deactivate inactivate certifier', async () => {
    let addr = '0x8fb41d5c04bd641e616fd3ac932d205665b8e7ec'
    await ctr.deactivateCertifier(addr)
    let c = await ctr.certifiers(addr)
    assert.equal(c[3].toNumber(), 2,
                 'should have inactive state')
  })

  it('can not deactivate not existing certifier', async () => {
    let addr = '0x8fb41d5c04bd641e616fd3ac932d205665b8e000'
    assertException(ctr.deactivateCertifier(addr))
  })
})
