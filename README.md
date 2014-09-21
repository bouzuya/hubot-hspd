# hubot-hspd

A Hubot script that list hubot-script-per-day

![](http://img.f.hatena.ne.jp/images/fotolife/b/bouzuya/20140922/20140922000404.gif)

## Installation

    $ npm install git://github.com/bouzuya/hubot-hspd.git

or

    $ # TAG is the package version you need.
    $ npm install 'git://github.com/bouzuya/hubot-hspd.git#TAG'

## Example

    bouzuya> hubot help hspd
      hubot> hubot hspd - list hubot-script-per-day

    bouzuya> hubot hspd
      hubot>  no | date       | name
             ----|------------|---------------------------
              1  | 2014-07-14 | hubot-gengo
              2  | 2014-07-15 | hubot-lgtm
              3  | 2014-07-16 | hubot-retweet
              4  | 2014-07-17 | hubot-merge-pr
              5  | 2014-07-18 | hubot-omikuji
              6  | 2014-07-19 | hubot-tweet
              7  | 2014-07-20 | hubot-fav
              8  | 2014-07-21 | hubot-list-pr
              9  | 2014-07-22 | hubot-friday13th
              10 | 2014-07-23 | hubot-watch-message-count

## Configuration

See [`src/scripts/hspd.coffee`](src/scripts/hspd.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-hspd
[travis-badge]: https://travis-ci.org/bouzuya/hubot-hspd.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-hspd
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-hspd.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-hspd
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-hspd.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
