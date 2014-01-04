
var expect = require('expect.js')
  , utils = require('../lib/utils')

describe('linkProfiles', function () {
  it('should find a profile', function () {
    expect(utils.linkProfiles('@jaredly')).to.equal('<a href="https://github.com/jaredly">@jaredly</a>')
  })
  it('should ignore non-profiles', function () {
    var text = 'no profiles here or out@there.'
    expect(utils.linkProfiles(text)).to.equal(text)
  })
  it('should find one at the start of a pre', function () {
    expect(utils.linkProfiles('<p>@jaredly man')).to.equal('<p><a href="https://github.com/jaredly">@jaredly</a> man')
  })
})

