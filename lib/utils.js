
var marked = require('marked')

module.exports = {
  linkProfiles: linkProfiles,
  teaserProcessed: teaserProcessed,
  processBody: processBody,
  teaser: teaser
}

/*
 * Convert to markdown, link @mentions to their user profiles.
 */
function processBody(text) {
  return React.DOM.span({
    dangerouslySetInnerHTML: {
      __html: linkProfiles(marked(text, {gfm: true}))
    }
  })
}

function linkProfiles(text) {
  var rep = '$1<a href="https://github.com/$2">@$2</a>'
  return text.replace(/(^|\s|>)@([a-zA-Z_-]{2,})/g, rep)
}

function teaserProcessed(text, maxlen) {
  return processBody(teaser(text, maxlen))
}

/**
 * Get a teaser, of max length maxlen (default 140) characters.
 */
function teaser(text, maxlen) {
  var end = 0
    , white = /\s/
    , match = text.slice(end).match(white)
    , next
  maxlen = maxlen || 140
  if (text.length <= maxlen) return text
  if (!match) {
    return text.slice(0, maxlen) // give up
  }
  next = {start: match.index, end: match.index + match[0].length}
  while (end + next.start < maxlen) {
    end += next.end;
    match = text.slice(end).match(white)
    if (!match) {
      next = {start: text.length - end, end: text.length - end}
    } else {
      next = {start: match.index, end: match.index + match[0].length}
    }
  }
  // TODO: return fixTrailingMarkdown(text.slice(0, end).trim())
  return text.slice(0, end).trim() + '…'
}

/*
 * Not going to bother with this for the moment. It's an interesting problem
 * to solve, definitely. But it probably makes most sense to actually parse
 * the markdown to a syntax tree or something, and death with things on a
 * higher level. regex-style is dirty here.
 */
/*
function startsMarkdownExpression(text, index, len) {
  len = len || 1
  if (index === 0 || index === -1 || index >= text.length - len) {
    return false
  }
  // XXX: maybe use \B instead of \S? or \w?
  return text[index - 1].match(/\s/) && text[index + len].match(/\S/)
}

function fixTrailingMarkdownEx(text, ex) {
  var index = text.lastIndexOf(ex)
  if (startsMarkdownExpression(text, index, ex.length)) {
    return text.slice(0, index).trim()
  }
  return text
}

function fixTrailingMarkdown(text) {
  var exs = ['`', '**', '__', '*', '_']
  for (var i=0; i<exs.length; i++) {
    text = fixTrailingMarkdownEx(text, exs[i])
  }
  return text
}
*/
