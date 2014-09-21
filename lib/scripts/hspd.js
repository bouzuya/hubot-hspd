// Description
//   A Hubot script that list hubot-script-per-day
//
// Configuration:
//   None
//
// Commands:
//   hubot hspd - list hubot-script-per-day
//
// Author:
//   bouzuya <m@bouzuya.net>
//
var Table;

Table = (function() {
  function Table(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.widths = this.columns.map((function(_this) {
      return function(col, i) {
        return [_this.columns].concat(_this.rows).reduce(function(w, row) {
          return Math.max(w, _this._str(row[i]).length);
        }, 0);
      };
    })(this));
  }

  Table.prototype.toString = function() {
    if (!(this.rows.length > 0)) {
      return;
    }
    return this._header() + this._line() + this._body();
  };

  Table.prototype._header = function() {
    return ' ' + this.columns.map((function(_this) {
      return function(col, i) {
        return _this._rpad(col, _this.widths[i]);
      };
    })(this)).join(' | ') + ' \n';
  };

  Table.prototype._line = function() {
    return '-' + this.columns.map((function(_this) {
      return function(col, i) {
        return _this._rpad('', _this.widths[i], '-');
      };
    })(this)).join('-|-') + '-\n';
  };

  Table.prototype._body = function() {
    return this.rows.map((function(_this) {
      return function(row) {
        return ' ' + _this.columns.map(function(col, i) {
          return _this._rpad(_this._str(row[i]), _this.widths[i]);
        }).join(' | ');
      };
    })(this)).join(' \n');
  };

  Table.prototype._str = function(o) {
    return o.toString();
  };

  Table.prototype._rpad = function(s, l, p) {
    var _i, _ref, _results;
    if (p == null) {
      p = ' ';
    }
    return s + (function() {
      _results = [];
      for (var _i = 0, _ref = l - s.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function() {
      return p;
    }).join('');
  };

  return Table;

})();

module.exports = function(robot) {
  var fetch, filter, map;
  require('hubot-arm')(robot);
  fetch = function() {
    return robot.arm('request')({
      method: 'GET',
      url: 'http://blog.bouzuya.net/posts.json',
      json: true
    }).then(function(res) {
      return res.body;
    });
  };
  filter = function(posts) {
    return posts.filter(function(post) {
      return post.tags.some(function(tag) {
        return tag === 'hubot-script-per-day';
      });
    });
  };
  map = function(posts) {
    return posts.map(function(post, i) {
      var name;
      name = post.title.match(/(hubot-\S+)\sをつくった/)[1];
      return {
        no: i + 1,
        date: post.date,
        name: name,
        repo: "https://github.com/bouzuya/" + name
      };
    });
  };
  return robot.respond(/hspd$/i, function(res) {
    return fetch().then(filter).then(map).then(function(scripts) {
      return res.send(new Table(['no', 'date', 'name'], scripts.map(function(script) {
        return [script.no, script.date, script.name];
      })).toString());
    });
  });
};
