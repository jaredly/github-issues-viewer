
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

describe('teaser', function () {
  it('should work for a simple case', function () {
    var line = 'here is a sentence that goes for a little while. But then it gets longer and longer. And eventually we get past 140 characters. It kind of takes a while.'
      , shorter = 'here is a sentence that goes for a little while. But then it gets longer and longer. And eventually we get past 140 characters. It kind of…'
    expect(utils.teaser(line)).to.equal(shorter);
  })
})

/*
describe('fixTrailingMarkdown', function () {
  it('should preserve valid markdown', function () {
    var samples = [
      '*one*',
      '**two**',
      '_three_ *four* something*here.',
      'some `url`s'
    ]
  })
})
*/

