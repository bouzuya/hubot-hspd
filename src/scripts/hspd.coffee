# Description
#   A Hubot script that list hubot-script-per-day
#
# Configuration:
#   None
#
# Commands:
#   hubot hspd - list hubot-script-per-day
#
# Author:
#   bouzuya <m@bouzuya.net>
#
class Table
  constructor: (@columns, @rows) ->
    @widths = @columns.map (col, i) =>
      [@columns].concat(@rows).reduce (w, row) =>
        Math.max(w, @_str(row[i]).length)
      , 0

  toString: ->
    return unless @rows.length > 0
    @_header() + @_line() + @_body()

  _header: ->
    ' ' + @columns.map (col, i) =>
      @_rpad(col, @widths[i])
    .join(' | ') + ' \n'

  _line: ->
    '-' + @columns.map (col, i) =>
      @_rpad('', @widths[i], '-')
    .join('-|-') + '-\n'

  _body: ->
    @rows.map (row) =>
      ' ' + @columns
        .map (col, i) =>
          @_rpad(@_str(row[i]), @widths[i])
        .join ' | '
    .join ' \n'

  _str: (o) ->
    o.toString()

  _rpad: (s, l, p = ' ') ->
    s + [0...(l - s.length)].map(-> p).join('')

module.exports = (robot) ->
  require('hubot-arm') robot

  fetch = ->
    robot.arm('request')
      method: 'GET'
      url: 'http://blog.bouzuya.net/posts.json'
      json: true
    .then (res) ->
      res.body

  filter = (posts) ->
    posts.filter (post) ->
      post.tags.some (tag) ->
        tag is 'hubot-script-per-day'

  map = (posts) ->
    posts.map (post, i) ->
      name = post.title.match(/(hubot-\S+)\sをつくった/)[1]
      no: i + 1
      date: post.date
      name: name
      repo: "https://github.com/bouzuya/#{name}"

  robot.respond /hspd$/i, (res) ->
    fetch()
      .then filter
      .then map
      .then (scripts) ->
        res.send new Table([
          'no'
          'date'
          'name'
        ], scripts.map (script) ->
          [
            script.no
            script.date
            script.name
          ]
        ).toString()
