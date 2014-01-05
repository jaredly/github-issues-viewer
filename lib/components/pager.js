
var d = React.DOM

/*
 * Manages paging! Should be relatively intelligable
 */
module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      at: 0,
      max: 0,
      step: 25,
      maxPages: 9,
      onLoadMore: null,
      onPage: function () {
        console.error('onPage must be supppied by the parent component')
      }
    }
  },
  // TODO: these could be refactored
  somePages: function () {
    var pages = []
      , npages = Math.ceil(this.props.max / this.props.step)
      , currPage = parseInt(this.props.at / this.props.step)
      , disabled
      , half = parseInt((this.props.maxPages-1) / 2)
      , left = currPage - half

    if (left < 0) {
      left = 0
    } else if (left > npages - this.props.maxPages) {
      left = npages - this.props.maxPages
    }
    for (var i=left; i<left + this.props.maxPages; i++) {
      disabled = i === currPage
      pages.push(d.span({
        className: 'mypager__page' + (disabled ? ' disabled' : ''),
        onClick: disabled ? null : this.props.onPage.bind(null, i * this.props.step)
      }, i + 1 + ''))
    }
    return pages
  },
  pages: function () {
    var pages = []
      , npages = Math.ceil(this.props.max / this.props.step)
      , disabled
    if (npages > this.props.maxPages) {
      return this.somePages()
    }
    for (var i=0; i<npages; i++) {
      disabled = i === this.props.at / this.props.step
      pages.push(d.span({
        className: 'mypager__page' + (disabled ? ' disabled' : ''),
        onClick: disabled ? null : this.props.onPage.bind(null, i * this.props.step)
      }, i + 1 + ''))
    }
    return pages
  },
  render: function () {
    var canPrev = this.props.at !== 0
      , canNext = this.props.at < this.props.max - 1
      , lastPage = Math.ceil(this.props.max / this.props.step - 1) * this.props.step
      , prev = this.props.at - this.props.step
      , next = this.props.at + this.props.step
    if (prev < 0) prev = 0
    if (next >= this.props.max) canNext = false
    return d.div(
      { className: 'mypager' },
      d.button({
        className: 'mypager__button mypager__button--start' + (canPrev ? '' : ' disabled'),
        onClick: canPrev ? this.props.onPage.bind(null, 0) : null,
        disabled: !canPrev
      }),
      d.button({
        className: 'mypager__button mypager__button--prev' + (canPrev ? '' : ' disabled'),
        onClick: canPrev ? this.props.onPage.bind(null, prev) : null,
        disabled: !canPrev
      }),
      this.pages(),
      d.button({
        className: 'mypager__button mypager__button--next' + (canNext ? '' : ' disabled'),
        onClick: canNext ? this.props.onPage.bind(null, next) : null,
        disabled: !canNext
      }),
      d.button({
        className: 'mypager__button mypager__button--end' + (canNext ? '' : ' disabled'),
        onClick: canNext ? this.props.onPage.bind(null, lastPage) : null,
        disabled: !canNext
      }),
      this.props.onLoadMore ? d.button({
        className: 'mypager__load-more',
        onClick: this.props.onLoadMore
      }, 'Load more') : false
    )
  }
})

