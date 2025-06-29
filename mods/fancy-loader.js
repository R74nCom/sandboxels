"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/utility-types/dist/aliases-and-guards.js
  var require_aliases_and_guards = __commonJS({
    "node_modules/utility-types/dist/aliases-and-guards.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.isPrimitive = function(val) {
        if (val === null || val === void 0) {
          return true;
        }
        switch (typeof val) {
          case "string":
          case "number":
          case "bigint":
          case "boolean":
          case "symbol": {
            return true;
          }
          default:
            return false;
        }
      };
      exports2.isFalsy = function(val) {
        return !val;
      };
      exports2.isNullish = function(val) {
        return val == null;
      };
    }
  });

  // node_modules/utility-types/dist/functional-helpers.js
  var require_functional_helpers = __commonJS({
    "node_modules/utility-types/dist/functional-helpers.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      function getReturnOfExpression(expression) {
        return void 0;
      }
      exports2.getReturnOfExpression = getReturnOfExpression;
    }
  });

  // node_modules/utility-types/dist/index.js
  var require_dist = __commonJS({
    "node_modules/utility-types/dist/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      var aliases_and_guards_1 = require_aliases_and_guards();
      exports2.isFalsy = aliases_and_guards_1.isFalsy;
      exports2.isNullish = aliases_and_guards_1.isNullish;
      exports2.isPrimitive = aliases_and_guards_1.isPrimitive;
      var functional_helpers_1 = require_functional_helpers();
      exports2.getReturnOfExpression = functional_helpers_1.getReturnOfExpression;
    }
  });

  // node_modules/@iarna/toml/lib/parser.js
  var require_parser = __commonJS({
    "node_modules/@iarna/toml/lib/parser.js"(exports2, module2) {
      "use strict";
      var ParserEND = 1114112;
      var ParserError = class _ParserError extends Error {
        /* istanbul ignore next */
        constructor(msg, filename, linenumber) {
          super("[ParserError] " + msg, filename, linenumber);
          this.name = "ParserError";
          this.code = "ParserError";
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, _ParserError);
        }
      };
      var State = class {
        constructor(parser) {
          this.parser = parser;
          this.buf = "";
          this.returned = null;
          this.result = null;
          this.resultTable = null;
          this.resultArr = null;
        }
      };
      var Parser = class {
        constructor() {
          this.pos = 0;
          this.col = 0;
          this.line = 0;
          this.obj = {};
          this.ctx = this.obj;
          this.stack = [];
          this._buf = "";
          this.char = null;
          this.ii = 0;
          this.state = new State(this.parseStart);
        }
        parse(str) {
          if (str.length === 0 || str.length == null)
            return;
          this._buf = String(str);
          this.ii = -1;
          this.char = -1;
          let getNext;
          while (getNext === false || this.nextChar()) {
            getNext = this.runOne();
          }
          this._buf = null;
        }
        nextChar() {
          if (this.char === 10) {
            ++this.line;
            this.col = -1;
          }
          ++this.ii;
          this.char = this._buf.codePointAt(this.ii);
          ++this.pos;
          ++this.col;
          return this.haveBuffer();
        }
        haveBuffer() {
          return this.ii < this._buf.length;
        }
        runOne() {
          return this.state.parser.call(this, this.state.returned);
        }
        finish() {
          this.char = ParserEND;
          let last;
          do {
            last = this.state.parser;
            this.runOne();
          } while (this.state.parser !== last);
          this.ctx = null;
          this.state = null;
          this._buf = null;
          return this.obj;
        }
        next(fn) {
          if (typeof fn !== "function")
            throw new ParserError("Tried to set state to non-existent state: " + JSON.stringify(fn));
          this.state.parser = fn;
        }
        goto(fn) {
          this.next(fn);
          return this.runOne();
        }
        call(fn, returnWith) {
          if (returnWith)
            this.next(returnWith);
          this.stack.push(this.state);
          this.state = new State(fn);
        }
        callNow(fn, returnWith) {
          this.call(fn, returnWith);
          return this.runOne();
        }
        return(value) {
          if (this.stack.length === 0)
            throw this.error(new ParserError("Stack underflow"));
          if (value === void 0)
            value = this.state.buf;
          this.state = this.stack.pop();
          this.state.returned = value;
        }
        returnNow(value) {
          this.return(value);
          return this.runOne();
        }
        consume() {
          if (this.char === ParserEND)
            throw this.error(new ParserError("Unexpected end-of-buffer"));
          this.state.buf += this._buf[this.ii];
        }
        error(err) {
          err.line = this.line;
          err.col = this.col;
          err.pos = this.pos;
          return err;
        }
        /* istanbul ignore next */
        parseStart() {
          throw new ParserError("Must declare a parseStart method");
        }
      };
      Parser.END = ParserEND;
      Parser.Error = ParserError;
      module2.exports = Parser;
    }
  });

  // node_modules/@iarna/toml/lib/create-datetime.js
  var require_create_datetime = __commonJS({
    "node_modules/@iarna/toml/lib/create-datetime.js"(exports2, module2) {
      "use strict";
      module2.exports = (value) => {
        const date = new Date(value);
        if (isNaN(date)) {
          throw new TypeError("Invalid Datetime");
        } else {
          return date;
        }
      };
    }
  });

  // node_modules/@iarna/toml/lib/format-num.js
  var require_format_num = __commonJS({
    "node_modules/@iarna/toml/lib/format-num.js"(exports2, module2) {
      "use strict";
      module2.exports = (d, num) => {
        num = String(num);
        while (num.length < d)
          num = "0" + num;
        return num;
      };
    }
  });

  // node_modules/@iarna/toml/lib/create-datetime-float.js
  var require_create_datetime_float = __commonJS({
    "node_modules/@iarna/toml/lib/create-datetime-float.js"(exports2, module2) {
      "use strict";
      var f = require_format_num();
      var FloatingDateTime = class extends Date {
        constructor(value) {
          super(value + "Z");
          this.isFloating = true;
        }
        toISOString() {
          const date = `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`;
          const time = `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
          return `${date}T${time}`;
        }
      };
      module2.exports = (value) => {
        const date = new FloatingDateTime(value);
        if (isNaN(date)) {
          throw new TypeError("Invalid Datetime");
        } else {
          return date;
        }
      };
    }
  });

  // node_modules/@iarna/toml/lib/create-date.js
  var require_create_date = __commonJS({
    "node_modules/@iarna/toml/lib/create-date.js"(exports2, module2) {
      "use strict";
      var f = require_format_num();
      var DateTime = globalThis.Date;
      var Date2 = class extends DateTime {
        constructor(value) {
          super(value);
          this.isDate = true;
        }
        toISOString() {
          return `${this.getUTCFullYear()}-${f(2, this.getUTCMonth() + 1)}-${f(2, this.getUTCDate())}`;
        }
      };
      module2.exports = (value) => {
        const date = new Date2(value);
        if (isNaN(date)) {
          throw new TypeError("Invalid Datetime");
        } else {
          return date;
        }
      };
    }
  });

  // node_modules/@iarna/toml/lib/create-time.js
  var require_create_time = __commonJS({
    "node_modules/@iarna/toml/lib/create-time.js"(exports2, module2) {
      "use strict";
      var f = require_format_num();
      var Time = class extends Date {
        constructor(value) {
          super(`0000-01-01T${value}Z`);
          this.isTime = true;
        }
        toISOString() {
          return `${f(2, this.getUTCHours())}:${f(2, this.getUTCMinutes())}:${f(2, this.getUTCSeconds())}.${f(3, this.getUTCMilliseconds())}`;
        }
      };
      module2.exports = (value) => {
        const date = new Time(value);
        if (isNaN(date)) {
          throw new TypeError("Invalid Datetime");
        } else {
          return date;
        }
      };
    }
  });

  // node_modules/@iarna/toml/lib/toml-parser.js
  var require_toml_parser = __commonJS({
    "node_modules/@iarna/toml/lib/toml-parser.js"(exports, module) {
      "use strict";
      module.exports = makeParserClass(require_parser());
      module.exports.makeParserClass = makeParserClass;
      var TomlError = class _TomlError extends Error {
        constructor(msg) {
          super(msg);
          this.name = "TomlError";
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, _TomlError);
          this.fromTOML = true;
          this.wrapped = null;
        }
      };
      TomlError.wrap = (err) => {
        const terr = new TomlError(err.message);
        terr.code = err.code;
        terr.wrapped = err;
        return terr;
      };
      module.exports.TomlError = TomlError;
      var createDateTime = require_create_datetime();
      var createDateTimeFloat = require_create_datetime_float();
      var createDate = require_create_date();
      var createTime = require_create_time();
      var CTRL_I = 9;
      var CTRL_J = 10;
      var CTRL_M = 13;
      var CTRL_CHAR_BOUNDARY = 31;
      var CHAR_SP = 32;
      var CHAR_QUOT = 34;
      var CHAR_NUM = 35;
      var CHAR_APOS = 39;
      var CHAR_PLUS = 43;
      var CHAR_COMMA = 44;
      var CHAR_HYPHEN = 45;
      var CHAR_PERIOD = 46;
      var CHAR_0 = 48;
      var CHAR_1 = 49;
      var CHAR_7 = 55;
      var CHAR_9 = 57;
      var CHAR_COLON = 58;
      var CHAR_EQUALS = 61;
      var CHAR_A = 65;
      var CHAR_E = 69;
      var CHAR_F = 70;
      var CHAR_T = 84;
      var CHAR_U = 85;
      var CHAR_Z = 90;
      var CHAR_LOWBAR = 95;
      var CHAR_a = 97;
      var CHAR_b = 98;
      var CHAR_e = 101;
      var CHAR_f = 102;
      var CHAR_i = 105;
      var CHAR_l = 108;
      var CHAR_n = 110;
      var CHAR_o = 111;
      var CHAR_r = 114;
      var CHAR_s = 115;
      var CHAR_t = 116;
      var CHAR_u = 117;
      var CHAR_x = 120;
      var CHAR_z = 122;
      var CHAR_LCUB = 123;
      var CHAR_RCUB = 125;
      var CHAR_LSQB = 91;
      var CHAR_BSOL = 92;
      var CHAR_RSQB = 93;
      var CHAR_DEL = 127;
      var SURROGATE_FIRST = 55296;
      var SURROGATE_LAST = 57343;
      var escapes = {
        [CHAR_b]: "\b",
        [CHAR_t]: "	",
        [CHAR_n]: "\n",
        [CHAR_f]: "\f",
        [CHAR_r]: "\r",
        [CHAR_QUOT]: '"',
        [CHAR_BSOL]: "\\"
      };
      function isDigit(cp) {
        return cp >= CHAR_0 && cp <= CHAR_9;
      }
      function isHexit(cp) {
        return cp >= CHAR_A && cp <= CHAR_F || cp >= CHAR_a && cp <= CHAR_f || cp >= CHAR_0 && cp <= CHAR_9;
      }
      function isBit(cp) {
        return cp === CHAR_1 || cp === CHAR_0;
      }
      function isOctit(cp) {
        return cp >= CHAR_0 && cp <= CHAR_7;
      }
      function isAlphaNumQuoteHyphen(cp) {
        return cp >= CHAR_A && cp <= CHAR_Z || cp >= CHAR_a && cp <= CHAR_z || cp >= CHAR_0 && cp <= CHAR_9 || cp === CHAR_APOS || cp === CHAR_QUOT || cp === CHAR_LOWBAR || cp === CHAR_HYPHEN;
      }
      function isAlphaNumHyphen(cp) {
        return cp >= CHAR_A && cp <= CHAR_Z || cp >= CHAR_a && cp <= CHAR_z || cp >= CHAR_0 && cp <= CHAR_9 || cp === CHAR_LOWBAR || cp === CHAR_HYPHEN;
      }
      var _type = Symbol("type");
      var _declared = Symbol("declared");
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var defineProperty = Object.defineProperty;
      var descriptor = { configurable: true, enumerable: true, writable: true, value: void 0 };
      function hasKey(obj, key) {
        if (hasOwnProperty.call(obj, key))
          return true;
        if (key === "__proto__")
          defineProperty(obj, "__proto__", descriptor);
        return false;
      }
      var INLINE_TABLE = Symbol("inline-table");
      function InlineTable() {
        return Object.defineProperties({}, {
          [_type]: { value: INLINE_TABLE }
        });
      }
      function isInlineTable(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === INLINE_TABLE;
      }
      var TABLE = Symbol("table");
      function Table() {
        return Object.defineProperties({}, {
          [_type]: { value: TABLE },
          [_declared]: { value: false, writable: true }
        });
      }
      function isTable(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === TABLE;
      }
      var _contentType = Symbol("content-type");
      var INLINE_LIST = Symbol("inline-list");
      function InlineList(type) {
        return Object.defineProperties([], {
          [_type]: { value: INLINE_LIST },
          [_contentType]: { value: type }
        });
      }
      function isInlineList(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === INLINE_LIST;
      }
      var LIST = Symbol("list");
      function List() {
        return Object.defineProperties([], {
          [_type]: { value: LIST }
        });
      }
      function isList(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === LIST;
      }
      var _custom;
      try {
        const utilInspect = eval("require('util').inspect");
        _custom = utilInspect.custom;
      } catch (_) {
      }
      var _inspect = _custom || "inspect";
      var BoxedBigInt = class {
        constructor(value) {
          try {
            this.value = globalThis.BigInt.asIntN(64, value);
          } catch (_) {
            this.value = null;
          }
          Object.defineProperty(this, _type, { value: INTEGER });
        }
        isNaN() {
          return this.value === null;
        }
        /* istanbul ignore next */
        toString() {
          return String(this.value);
        }
        /* istanbul ignore next */
        [_inspect]() {
          return `[BigInt: ${this.toString()}]}`;
        }
        valueOf() {
          return this.value;
        }
      };
      var INTEGER = Symbol("integer");
      function Integer(value) {
        let num = Number(value);
        if (Object.is(num, -0))
          num = 0;
        if (globalThis.BigInt && !Number.isSafeInteger(num)) {
          return new BoxedBigInt(value);
        } else {
          return Object.defineProperties(new Number(num), {
            isNaN: { value: function() {
              return isNaN(this);
            } },
            [_type]: { value: INTEGER },
            [_inspect]: { value: () => `[Integer: ${value}]` }
          });
        }
      }
      function isInteger(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === INTEGER;
      }
      var FLOAT = Symbol("float");
      function Float(value) {
        return Object.defineProperties(new Number(value), {
          [_type]: { value: FLOAT },
          [_inspect]: { value: () => `[Float: ${value}]` }
        });
      }
      function isFloat(obj) {
        if (obj === null || typeof obj !== "object")
          return false;
        return obj[_type] === FLOAT;
      }
      function tomlType(value) {
        const type = typeof value;
        if (type === "object") {
          if (value === null)
            return "null";
          if (value instanceof Date)
            return "datetime";
          if (_type in value) {
            switch (value[_type]) {
              case INLINE_TABLE:
                return "inline-table";
              case INLINE_LIST:
                return "inline-list";
              case TABLE:
                return "table";
              case LIST:
                return "list";
              case FLOAT:
                return "float";
              case INTEGER:
                return "integer";
            }
          }
        }
        return type;
      }
      function makeParserClass(Parser) {
        class TOMLParser extends Parser {
          constructor() {
            super();
            this.ctx = this.obj = Table();
          }
          /* MATCH HELPER */
          atEndOfWord() {
            return this.char === CHAR_NUM || this.char === CTRL_I || this.char === CHAR_SP || this.atEndOfLine();
          }
          atEndOfLine() {
            return this.char === Parser.END || this.char === CTRL_J || this.char === CTRL_M;
          }
          parseStart() {
            if (this.char === Parser.END) {
              return null;
            } else if (this.char === CHAR_LSQB) {
              return this.call(this.parseTableOrList);
            } else if (this.char === CHAR_NUM) {
              return this.call(this.parseComment);
            } else if (this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
              return null;
            } else if (isAlphaNumQuoteHyphen(this.char)) {
              return this.callNow(this.parseAssignStatement);
            } else {
              throw this.error(new TomlError(`Unknown character "${this.char}"`));
            }
          }
          // HELPER, this strips any whitespace and comments to the end of the line
          // then RETURNS. Last state in a production.
          parseWhitespaceToEOL() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
              return null;
            } else if (this.char === CHAR_NUM) {
              return this.goto(this.parseComment);
            } else if (this.char === Parser.END || this.char === CTRL_J) {
              return this.return();
            } else {
              throw this.error(new TomlError("Unexpected character, expected only whitespace or comments till end of line"));
            }
          }
          /* ASSIGNMENT: key = value */
          parseAssignStatement() {
            return this.callNow(this.parseAssign, this.recordAssignStatement);
          }
          recordAssignStatement(kv) {
            let target = this.ctx;
            let finalKey = kv.key.pop();
            for (let kw of kv.key) {
              if (hasKey(target, kw) && (!isTable(target[kw]) || target[kw][_declared])) {
                throw this.error(new TomlError("Can't redefine existing key"));
              }
              target = target[kw] = target[kw] || Table();
            }
            if (hasKey(target, finalKey)) {
              throw this.error(new TomlError("Can't redefine existing key"));
            }
            if (isInteger(kv.value) || isFloat(kv.value)) {
              target[finalKey] = kv.value.valueOf();
            } else {
              target[finalKey] = kv.value;
            }
            return this.goto(this.parseWhitespaceToEOL);
          }
          /* ASSSIGNMENT expression, key = value possibly inside an inline table */
          parseAssign() {
            return this.callNow(this.parseKeyword, this.recordAssignKeyword);
          }
          recordAssignKeyword(key) {
            if (this.state.resultTable) {
              this.state.resultTable.push(key);
            } else {
              this.state.resultTable = [key];
            }
            return this.goto(this.parseAssignKeywordPreDot);
          }
          parseAssignKeywordPreDot() {
            if (this.char === CHAR_PERIOD) {
              return this.next(this.parseAssignKeywordPostDot);
            } else if (this.char !== CHAR_SP && this.char !== CTRL_I) {
              return this.goto(this.parseAssignEqual);
            }
          }
          parseAssignKeywordPostDot() {
            if (this.char !== CHAR_SP && this.char !== CTRL_I) {
              return this.callNow(this.parseKeyword, this.recordAssignKeyword);
            }
          }
          parseAssignEqual() {
            if (this.char === CHAR_EQUALS) {
              return this.next(this.parseAssignPreValue);
            } else {
              throw this.error(new TomlError('Invalid character, expected "="'));
            }
          }
          parseAssignPreValue() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else {
              return this.callNow(this.parseValue, this.recordAssignValue);
            }
          }
          recordAssignValue(value) {
            return this.returnNow({ key: this.state.resultTable, value });
          }
          /* COMMENTS: #...eol */
          parseComment() {
            do {
              if (this.char === Parser.END || this.char === CTRL_J) {
                return this.return();
              }
            } while (this.nextChar());
          }
          /* TABLES AND LISTS, [foo] and [[foo]] */
          parseTableOrList() {
            if (this.char === CHAR_LSQB) {
              this.next(this.parseList);
            } else {
              return this.goto(this.parseTable);
            }
          }
          /* TABLE [foo.bar.baz] */
          parseTable() {
            this.ctx = this.obj;
            return this.goto(this.parseTableNext);
          }
          parseTableNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else {
              return this.callNow(this.parseKeyword, this.parseTableMore);
            }
          }
          parseTableMore(keyword) {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else if (this.char === CHAR_RSQB) {
              if (hasKey(this.ctx, keyword) && (!isTable(this.ctx[keyword]) || this.ctx[keyword][_declared])) {
                throw this.error(new TomlError("Can't redefine existing key"));
              } else {
                this.ctx = this.ctx[keyword] = this.ctx[keyword] || Table();
                this.ctx[_declared] = true;
              }
              return this.next(this.parseWhitespaceToEOL);
            } else if (this.char === CHAR_PERIOD) {
              if (!hasKey(this.ctx, keyword)) {
                this.ctx = this.ctx[keyword] = Table();
              } else if (isTable(this.ctx[keyword])) {
                this.ctx = this.ctx[keyword];
              } else if (isList(this.ctx[keyword])) {
                this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1];
              } else {
                throw this.error(new TomlError("Can't redefine existing key"));
              }
              return this.next(this.parseTableNext);
            } else {
              throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
            }
          }
          /* LIST [[a.b.c]] */
          parseList() {
            this.ctx = this.obj;
            return this.goto(this.parseListNext);
          }
          parseListNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else {
              return this.callNow(this.parseKeyword, this.parseListMore);
            }
          }
          parseListMore(keyword) {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else if (this.char === CHAR_RSQB) {
              if (!hasKey(this.ctx, keyword)) {
                this.ctx[keyword] = List();
              }
              if (isInlineList(this.ctx[keyword])) {
                throw this.error(new TomlError("Can't extend an inline array"));
              } else if (isList(this.ctx[keyword])) {
                const next = Table();
                this.ctx[keyword].push(next);
                this.ctx = next;
              } else {
                throw this.error(new TomlError("Can't redefine an existing key"));
              }
              return this.next(this.parseListEnd);
            } else if (this.char === CHAR_PERIOD) {
              if (!hasKey(this.ctx, keyword)) {
                this.ctx = this.ctx[keyword] = Table();
              } else if (isInlineList(this.ctx[keyword])) {
                throw this.error(new TomlError("Can't extend an inline array"));
              } else if (isInlineTable(this.ctx[keyword])) {
                throw this.error(new TomlError("Can't extend an inline table"));
              } else if (isList(this.ctx[keyword])) {
                this.ctx = this.ctx[keyword][this.ctx[keyword].length - 1];
              } else if (isTable(this.ctx[keyword])) {
                this.ctx = this.ctx[keyword];
              } else {
                throw this.error(new TomlError("Can't redefine an existing key"));
              }
              return this.next(this.parseListNext);
            } else {
              throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
            }
          }
          parseListEnd(keyword) {
            if (this.char === CHAR_RSQB) {
              return this.next(this.parseWhitespaceToEOL);
            } else {
              throw this.error(new TomlError("Unexpected character, expected whitespace, . or ]"));
            }
          }
          /* VALUE string, number, boolean, inline list, inline object */
          parseValue() {
            if (this.char === Parser.END) {
              throw this.error(new TomlError("Key without value"));
            } else if (this.char === CHAR_QUOT) {
              return this.next(this.parseDoubleString);
            }
            if (this.char === CHAR_APOS) {
              return this.next(this.parseSingleString);
            } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
              return this.goto(this.parseNumberSign);
            } else if (this.char === CHAR_i) {
              return this.next(this.parseInf);
            } else if (this.char === CHAR_n) {
              return this.next(this.parseNan);
            } else if (isDigit(this.char)) {
              return this.goto(this.parseNumberOrDateTime);
            } else if (this.char === CHAR_t || this.char === CHAR_f) {
              return this.goto(this.parseBoolean);
            } else if (this.char === CHAR_LSQB) {
              return this.call(this.parseInlineList, this.recordValue);
            } else if (this.char === CHAR_LCUB) {
              return this.call(this.parseInlineTable, this.recordValue);
            } else {
              throw this.error(new TomlError("Unexpected character, expecting string, number, datetime, boolean, inline array or inline table"));
            }
          }
          recordValue(value) {
            return this.returnNow(value);
          }
          parseInf() {
            if (this.char === CHAR_n) {
              return this.next(this.parseInf2);
            } else {
              throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'));
            }
          }
          parseInf2() {
            if (this.char === CHAR_f) {
              if (this.state.buf === "-") {
                return this.return(-Infinity);
              } else {
                return this.return(Infinity);
              }
            } else {
              throw this.error(new TomlError('Unexpected character, expected "inf", "+inf" or "-inf"'));
            }
          }
          parseNan() {
            if (this.char === CHAR_a) {
              return this.next(this.parseNan2);
            } else {
              throw this.error(new TomlError('Unexpected character, expected "nan"'));
            }
          }
          parseNan2() {
            if (this.char === CHAR_n) {
              return this.return(NaN);
            } else {
              throw this.error(new TomlError('Unexpected character, expected "nan"'));
            }
          }
          /* KEYS, barewords or basic, literal, or dotted */
          parseKeyword() {
            if (this.char === CHAR_QUOT) {
              return this.next(this.parseBasicString);
            } else if (this.char === CHAR_APOS) {
              return this.next(this.parseLiteralString);
            } else {
              return this.goto(this.parseBareKey);
            }
          }
          /* KEYS: barewords */
          parseBareKey() {
            do {
              if (this.char === Parser.END) {
                throw this.error(new TomlError("Key ended without value"));
              } else if (isAlphaNumHyphen(this.char)) {
                this.consume();
              } else if (this.state.buf.length === 0) {
                throw this.error(new TomlError("Empty bare keys are not allowed"));
              } else {
                return this.returnNow();
              }
            } while (this.nextChar());
          }
          /* STRINGS, single quoted (literal) */
          parseSingleString() {
            if (this.char === CHAR_APOS) {
              return this.next(this.parseLiteralMultiStringMaybe);
            } else {
              return this.goto(this.parseLiteralString);
            }
          }
          parseLiteralString() {
            do {
              if (this.char === CHAR_APOS) {
                return this.return();
              } else if (this.atEndOfLine()) {
                throw this.error(new TomlError("Unterminated string"));
              } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) {
                throw this.errorControlCharInString();
              } else {
                this.consume();
              }
            } while (this.nextChar());
          }
          parseLiteralMultiStringMaybe() {
            if (this.char === CHAR_APOS) {
              return this.next(this.parseLiteralMultiString);
            } else {
              return this.returnNow();
            }
          }
          parseLiteralMultiString() {
            if (this.char === CTRL_M) {
              return null;
            } else if (this.char === CTRL_J) {
              return this.next(this.parseLiteralMultiStringContent);
            } else {
              return this.goto(this.parseLiteralMultiStringContent);
            }
          }
          parseLiteralMultiStringContent() {
            do {
              if (this.char === CHAR_APOS) {
                return this.next(this.parseLiteralMultiEnd);
              } else if (this.char === Parser.END) {
                throw this.error(new TomlError("Unterminated multi-line string"));
              } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) {
                throw this.errorControlCharInString();
              } else {
                this.consume();
              }
            } while (this.nextChar());
          }
          parseLiteralMultiEnd() {
            if (this.char === CHAR_APOS) {
              return this.next(this.parseLiteralMultiEnd2);
            } else {
              this.state.buf += "'";
              return this.goto(this.parseLiteralMultiStringContent);
            }
          }
          parseLiteralMultiEnd2() {
            if (this.char === CHAR_APOS) {
              return this.return();
            } else {
              this.state.buf += "''";
              return this.goto(this.parseLiteralMultiStringContent);
            }
          }
          /* STRINGS double quoted */
          parseDoubleString() {
            if (this.char === CHAR_QUOT) {
              return this.next(this.parseMultiStringMaybe);
            } else {
              return this.goto(this.parseBasicString);
            }
          }
          parseBasicString() {
            do {
              if (this.char === CHAR_BSOL) {
                return this.call(this.parseEscape, this.recordEscapeReplacement);
              } else if (this.char === CHAR_QUOT) {
                return this.return();
              } else if (this.atEndOfLine()) {
                throw this.error(new TomlError("Unterminated string"));
              } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I) {
                throw this.errorControlCharInString();
              } else {
                this.consume();
              }
            } while (this.nextChar());
          }
          recordEscapeReplacement(replacement) {
            this.state.buf += replacement;
            return this.goto(this.parseBasicString);
          }
          parseMultiStringMaybe() {
            if (this.char === CHAR_QUOT) {
              return this.next(this.parseMultiString);
            } else {
              return this.returnNow();
            }
          }
          parseMultiString() {
            if (this.char === CTRL_M) {
              return null;
            } else if (this.char === CTRL_J) {
              return this.next(this.parseMultiStringContent);
            } else {
              return this.goto(this.parseMultiStringContent);
            }
          }
          parseMultiStringContent() {
            do {
              if (this.char === CHAR_BSOL) {
                return this.call(this.parseMultiEscape, this.recordMultiEscapeReplacement);
              } else if (this.char === CHAR_QUOT) {
                return this.next(this.parseMultiEnd);
              } else if (this.char === Parser.END) {
                throw this.error(new TomlError("Unterminated multi-line string"));
              } else if (this.char === CHAR_DEL || this.char <= CTRL_CHAR_BOUNDARY && this.char !== CTRL_I && this.char !== CTRL_J && this.char !== CTRL_M) {
                throw this.errorControlCharInString();
              } else {
                this.consume();
              }
            } while (this.nextChar());
          }
          errorControlCharInString() {
            let displayCode = "\\u00";
            if (this.char < 16) {
              displayCode += "0";
            }
            displayCode += this.char.toString(16);
            return this.error(new TomlError(`Control characters (codes < 0x1f and 0x7f) are not allowed in strings, use ${displayCode} instead`));
          }
          recordMultiEscapeReplacement(replacement) {
            this.state.buf += replacement;
            return this.goto(this.parseMultiStringContent);
          }
          parseMultiEnd() {
            if (this.char === CHAR_QUOT) {
              return this.next(this.parseMultiEnd2);
            } else {
              this.state.buf += '"';
              return this.goto(this.parseMultiStringContent);
            }
          }
          parseMultiEnd2() {
            if (this.char === CHAR_QUOT) {
              return this.return();
            } else {
              this.state.buf += '""';
              return this.goto(this.parseMultiStringContent);
            }
          }
          parseMultiEscape() {
            if (this.char === CTRL_M || this.char === CTRL_J) {
              return this.next(this.parseMultiTrim);
            } else if (this.char === CHAR_SP || this.char === CTRL_I) {
              return this.next(this.parsePreMultiTrim);
            } else {
              return this.goto(this.parseEscape);
            }
          }
          parsePreMultiTrim() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else if (this.char === CTRL_M || this.char === CTRL_J) {
              return this.next(this.parseMultiTrim);
            } else {
              throw this.error(new TomlError("Can't escape whitespace"));
            }
          }
          parseMultiTrim() {
            if (this.char === CTRL_J || this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M) {
              return null;
            } else {
              return this.returnNow();
            }
          }
          parseEscape() {
            if (this.char in escapes) {
              return this.return(escapes[this.char]);
            } else if (this.char === CHAR_u) {
              return this.call(this.parseSmallUnicode, this.parseUnicodeReturn);
            } else if (this.char === CHAR_U) {
              return this.call(this.parseLargeUnicode, this.parseUnicodeReturn);
            } else {
              throw this.error(new TomlError("Unknown escape character: " + this.char));
            }
          }
          parseUnicodeReturn(char) {
            try {
              const codePoint = parseInt(char, 16);
              if (codePoint >= SURROGATE_FIRST && codePoint <= SURROGATE_LAST) {
                throw this.error(new TomlError("Invalid unicode, character in range 0xD800 - 0xDFFF is reserved"));
              }
              return this.returnNow(String.fromCodePoint(codePoint));
            } catch (err) {
              throw this.error(TomlError.wrap(err));
            }
          }
          parseSmallUnicode() {
            if (!isHexit(this.char)) {
              throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"));
            } else {
              this.consume();
              if (this.state.buf.length >= 4)
                return this.return();
            }
          }
          parseLargeUnicode() {
            if (!isHexit(this.char)) {
              throw this.error(new TomlError("Invalid character in unicode sequence, expected hex"));
            } else {
              this.consume();
              if (this.state.buf.length >= 8)
                return this.return();
            }
          }
          /* NUMBERS */
          parseNumberSign() {
            this.consume();
            return this.next(this.parseMaybeSignedInfOrNan);
          }
          parseMaybeSignedInfOrNan() {
            if (this.char === CHAR_i) {
              return this.next(this.parseInf);
            } else if (this.char === CHAR_n) {
              return this.next(this.parseNan);
            } else {
              return this.callNow(this.parseNoUnder, this.parseNumberIntegerStart);
            }
          }
          parseNumberIntegerStart() {
            if (this.char === CHAR_0) {
              this.consume();
              return this.next(this.parseNumberIntegerExponentOrDecimal);
            } else {
              return this.goto(this.parseNumberInteger);
            }
          }
          parseNumberIntegerExponentOrDecimal() {
            if (this.char === CHAR_PERIOD) {
              this.consume();
              return this.call(this.parseNoUnder, this.parseNumberFloat);
            } else if (this.char === CHAR_E || this.char === CHAR_e) {
              this.consume();
              return this.next(this.parseNumberExponentSign);
            } else {
              return this.returnNow(Integer(this.state.buf));
            }
          }
          parseNumberInteger() {
            if (isDigit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnder);
            } else if (this.char === CHAR_E || this.char === CHAR_e) {
              this.consume();
              return this.next(this.parseNumberExponentSign);
            } else if (this.char === CHAR_PERIOD) {
              this.consume();
              return this.call(this.parseNoUnder, this.parseNumberFloat);
            } else {
              const result = Integer(this.state.buf);
              if (result.isNaN()) {
                throw this.error(new TomlError("Invalid number"));
              } else {
                return this.returnNow(result);
              }
            }
          }
          parseNoUnder() {
            if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD || this.char === CHAR_E || this.char === CHAR_e) {
              throw this.error(new TomlError("Unexpected character, expected digit"));
            } else if (this.atEndOfWord()) {
              throw this.error(new TomlError("Incomplete number"));
            }
            return this.returnNow();
          }
          parseNoUnderHexOctBinLiteral() {
            if (this.char === CHAR_LOWBAR || this.char === CHAR_PERIOD) {
              throw this.error(new TomlError("Unexpected character, expected digit"));
            } else if (this.atEndOfWord()) {
              throw this.error(new TomlError("Incomplete number"));
            }
            return this.returnNow();
          }
          parseNumberFloat() {
            if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnder, this.parseNumberFloat);
            } else if (isDigit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_E || this.char === CHAR_e) {
              this.consume();
              return this.next(this.parseNumberExponentSign);
            } else {
              return this.returnNow(Float(this.state.buf));
            }
          }
          parseNumberExponentSign() {
            if (isDigit(this.char)) {
              return this.goto(this.parseNumberExponent);
            } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
              this.consume();
              this.call(this.parseNoUnder, this.parseNumberExponent);
            } else {
              throw this.error(new TomlError("Unexpected character, expected -, + or digit"));
            }
          }
          parseNumberExponent() {
            if (isDigit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnder);
            } else {
              return this.returnNow(Float(this.state.buf));
            }
          }
          /* NUMBERS or DATETIMES  */
          parseNumberOrDateTime() {
            if (this.char === CHAR_0) {
              this.consume();
              return this.next(this.parseNumberBaseOrDateTime);
            } else {
              return this.goto(this.parseNumberOrDateTimeOnly);
            }
          }
          parseNumberOrDateTimeOnly() {
            if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnder, this.parseNumberInteger);
            } else if (isDigit(this.char)) {
              this.consume();
              if (this.state.buf.length > 4)
                this.next(this.parseNumberInteger);
            } else if (this.char === CHAR_E || this.char === CHAR_e) {
              this.consume();
              return this.next(this.parseNumberExponentSign);
            } else if (this.char === CHAR_PERIOD) {
              this.consume();
              return this.call(this.parseNoUnder, this.parseNumberFloat);
            } else if (this.char === CHAR_HYPHEN) {
              return this.goto(this.parseDateTime);
            } else if (this.char === CHAR_COLON) {
              return this.goto(this.parseOnlyTimeHour);
            } else {
              return this.returnNow(Integer(this.state.buf));
            }
          }
          parseDateTimeOnly() {
            if (this.state.buf.length < 4) {
              if (isDigit(this.char)) {
                return this.consume();
              } else if (this.char === CHAR_COLON) {
                return this.goto(this.parseOnlyTimeHour);
              } else {
                throw this.error(new TomlError("Expected digit while parsing year part of a date"));
              }
            } else {
              if (this.char === CHAR_HYPHEN) {
                return this.goto(this.parseDateTime);
              } else {
                throw this.error(new TomlError("Expected hyphen (-) while parsing year part of date"));
              }
            }
          }
          parseNumberBaseOrDateTime() {
            if (this.char === CHAR_b) {
              this.consume();
              return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerBin);
            } else if (this.char === CHAR_o) {
              this.consume();
              return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerOct);
            } else if (this.char === CHAR_x) {
              this.consume();
              return this.call(this.parseNoUnderHexOctBinLiteral, this.parseIntegerHex);
            } else if (this.char === CHAR_PERIOD) {
              return this.goto(this.parseNumberInteger);
            } else if (isDigit(this.char)) {
              return this.goto(this.parseDateTimeOnly);
            } else {
              return this.returnNow(Integer(this.state.buf));
            }
          }
          parseIntegerHex() {
            if (isHexit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnderHexOctBinLiteral);
            } else {
              const result = Integer(this.state.buf);
              if (result.isNaN()) {
                throw this.error(new TomlError("Invalid number"));
              } else {
                return this.returnNow(result);
              }
            }
          }
          parseIntegerOct() {
            if (isOctit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnderHexOctBinLiteral);
            } else {
              const result = Integer(this.state.buf);
              if (result.isNaN()) {
                throw this.error(new TomlError("Invalid number"));
              } else {
                return this.returnNow(result);
              }
            }
          }
          parseIntegerBin() {
            if (isBit(this.char)) {
              this.consume();
            } else if (this.char === CHAR_LOWBAR) {
              return this.call(this.parseNoUnderHexOctBinLiteral);
            } else {
              const result = Integer(this.state.buf);
              if (result.isNaN()) {
                throw this.error(new TomlError("Invalid number"));
              } else {
                return this.returnNow(result);
              }
            }
          }
          /* DATETIME */
          parseDateTime() {
            if (this.state.buf.length < 4) {
              throw this.error(new TomlError("Years less than 1000 must be zero padded to four characters"));
            }
            this.state.result = this.state.buf;
            this.state.buf = "";
            return this.next(this.parseDateMonth);
          }
          parseDateMonth() {
            if (this.char === CHAR_HYPHEN) {
              if (this.state.buf.length < 2) {
                throw this.error(new TomlError("Months less than 10 must be zero padded to two characters"));
              }
              this.state.result += "-" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseDateDay);
            } else if (isDigit(this.char)) {
              this.consume();
            } else {
              throw this.error(new TomlError("Incomplete datetime"));
            }
          }
          parseDateDay() {
            if (this.char === CHAR_T || this.char === CHAR_SP) {
              if (this.state.buf.length < 2) {
                throw this.error(new TomlError("Days less than 10 must be zero padded to two characters"));
              }
              this.state.result += "-" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseStartTimeHour);
            } else if (this.atEndOfWord()) {
              return this.returnNow(createDate(this.state.result + "-" + this.state.buf));
            } else if (isDigit(this.char)) {
              this.consume();
            } else {
              throw this.error(new TomlError("Incomplete datetime"));
            }
          }
          parseStartTimeHour() {
            if (this.atEndOfWord()) {
              return this.returnNow(createDate(this.state.result));
            } else {
              return this.goto(this.parseTimeHour);
            }
          }
          parseTimeHour() {
            if (this.char === CHAR_COLON) {
              if (this.state.buf.length < 2) {
                throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
              }
              this.state.result += "T" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseTimeMin);
            } else if (isDigit(this.char)) {
              this.consume();
            } else {
              throw this.error(new TomlError("Incomplete datetime"));
            }
          }
          parseTimeMin() {
            if (this.state.buf.length < 2 && isDigit(this.char)) {
              this.consume();
            } else if (this.state.buf.length === 2 && this.char === CHAR_COLON) {
              this.state.result += ":" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseTimeSec);
            } else {
              throw this.error(new TomlError("Incomplete datetime"));
            }
          }
          parseTimeSec() {
            if (isDigit(this.char)) {
              this.consume();
              if (this.state.buf.length === 2) {
                this.state.result += ":" + this.state.buf;
                this.state.buf = "";
                return this.next(this.parseTimeZoneOrFraction);
              }
            } else {
              throw this.error(new TomlError("Incomplete datetime"));
            }
          }
          parseOnlyTimeHour() {
            if (this.char === CHAR_COLON) {
              if (this.state.buf.length < 2) {
                throw this.error(new TomlError("Hours less than 10 must be zero padded to two characters"));
              }
              this.state.result = this.state.buf;
              this.state.buf = "";
              return this.next(this.parseOnlyTimeMin);
            } else {
              throw this.error(new TomlError("Incomplete time"));
            }
          }
          parseOnlyTimeMin() {
            if (this.state.buf.length < 2 && isDigit(this.char)) {
              this.consume();
            } else if (this.state.buf.length === 2 && this.char === CHAR_COLON) {
              this.state.result += ":" + this.state.buf;
              this.state.buf = "";
              return this.next(this.parseOnlyTimeSec);
            } else {
              throw this.error(new TomlError("Incomplete time"));
            }
          }
          parseOnlyTimeSec() {
            if (isDigit(this.char)) {
              this.consume();
              if (this.state.buf.length === 2) {
                return this.next(this.parseOnlyTimeFractionMaybe);
              }
            } else {
              throw this.error(new TomlError("Incomplete time"));
            }
          }
          parseOnlyTimeFractionMaybe() {
            this.state.result += ":" + this.state.buf;
            if (this.char === CHAR_PERIOD) {
              this.state.buf = "";
              this.next(this.parseOnlyTimeFraction);
            } else {
              return this.return(createTime(this.state.result));
            }
          }
          parseOnlyTimeFraction() {
            if (isDigit(this.char)) {
              this.consume();
            } else if (this.atEndOfWord()) {
              if (this.state.buf.length === 0)
                throw this.error(new TomlError("Expected digit in milliseconds"));
              return this.returnNow(createTime(this.state.result + "." + this.state.buf));
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
            }
          }
          parseTimeZoneOrFraction() {
            if (this.char === CHAR_PERIOD) {
              this.consume();
              this.next(this.parseDateTimeFraction);
            } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
              this.consume();
              this.next(this.parseTimeZoneHour);
            } else if (this.char === CHAR_Z) {
              this.consume();
              return this.return(createDateTime(this.state.result + this.state.buf));
            } else if (this.atEndOfWord()) {
              return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
            }
          }
          parseDateTimeFraction() {
            if (isDigit(this.char)) {
              this.consume();
            } else if (this.state.buf.length === 1) {
              throw this.error(new TomlError("Expected digit in milliseconds"));
            } else if (this.char === CHAR_HYPHEN || this.char === CHAR_PLUS) {
              this.consume();
              this.next(this.parseTimeZoneHour);
            } else if (this.char === CHAR_Z) {
              this.consume();
              return this.return(createDateTime(this.state.result + this.state.buf));
            } else if (this.atEndOfWord()) {
              return this.returnNow(createDateTimeFloat(this.state.result + this.state.buf));
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected period (.), minus (-), plus (+) or Z"));
            }
          }
          parseTimeZoneHour() {
            if (isDigit(this.char)) {
              this.consume();
              if (/\d\d$/.test(this.state.buf))
                return this.next(this.parseTimeZoneSep);
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected digit"));
            }
          }
          parseTimeZoneSep() {
            if (this.char === CHAR_COLON) {
              this.consume();
              this.next(this.parseTimeZoneMin);
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected colon"));
            }
          }
          parseTimeZoneMin() {
            if (isDigit(this.char)) {
              this.consume();
              if (/\d\d$/.test(this.state.buf))
                return this.return(createDateTime(this.state.result + this.state.buf));
            } else {
              throw this.error(new TomlError("Unexpected character in datetime, expected digit"));
            }
          }
          /* BOOLEAN */
          parseBoolean() {
            if (this.char === CHAR_t) {
              this.consume();
              return this.next(this.parseTrue_r);
            } else if (this.char === CHAR_f) {
              this.consume();
              return this.next(this.parseFalse_a);
            }
          }
          parseTrue_r() {
            if (this.char === CHAR_r) {
              this.consume();
              return this.next(this.parseTrue_u);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseTrue_u() {
            if (this.char === CHAR_u) {
              this.consume();
              return this.next(this.parseTrue_e);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseTrue_e() {
            if (this.char === CHAR_e) {
              return this.return(true);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseFalse_a() {
            if (this.char === CHAR_a) {
              this.consume();
              return this.next(this.parseFalse_l);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseFalse_l() {
            if (this.char === CHAR_l) {
              this.consume();
              return this.next(this.parseFalse_s);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseFalse_s() {
            if (this.char === CHAR_s) {
              this.consume();
              return this.next(this.parseFalse_e);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          parseFalse_e() {
            if (this.char === CHAR_e) {
              return this.return(false);
            } else {
              throw this.error(new TomlError("Invalid boolean, expected true or false"));
            }
          }
          /* INLINE LISTS */
          parseInlineList() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) {
              return null;
            } else if (this.char === Parser.END) {
              throw this.error(new TomlError("Unterminated inline array"));
            } else if (this.char === CHAR_NUM) {
              return this.call(this.parseComment);
            } else if (this.char === CHAR_RSQB) {
              return this.return(this.state.resultArr || InlineList());
            } else {
              return this.callNow(this.parseValue, this.recordInlineListValue);
            }
          }
          recordInlineListValue(value) {
            if (this.state.resultArr) {
              const listType = this.state.resultArr[_contentType];
              const valueType = tomlType(value);
              if (listType !== valueType) {
                throw this.error(new TomlError(`Inline lists must be a single type, not a mix of ${listType} and ${valueType}`));
              }
            } else {
              this.state.resultArr = InlineList(tomlType(value));
            }
            if (isFloat(value) || isInteger(value)) {
              this.state.resultArr.push(value.valueOf());
            } else {
              this.state.resultArr.push(value);
            }
            return this.goto(this.parseInlineListNext);
          }
          parseInlineListNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I || this.char === CTRL_M || this.char === CTRL_J) {
              return null;
            } else if (this.char === CHAR_NUM) {
              return this.call(this.parseComment);
            } else if (this.char === CHAR_COMMA) {
              return this.next(this.parseInlineList);
            } else if (this.char === CHAR_RSQB) {
              return this.goto(this.parseInlineList);
            } else {
              throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"));
            }
          }
          /* INLINE TABLE */
          parseInlineTable() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else if (this.char === Parser.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) {
              throw this.error(new TomlError("Unterminated inline array"));
            } else if (this.char === CHAR_RCUB) {
              return this.return(this.state.resultTable || InlineTable());
            } else {
              if (!this.state.resultTable)
                this.state.resultTable = InlineTable();
              return this.callNow(this.parseAssign, this.recordInlineTableValue);
            }
          }
          recordInlineTableValue(kv) {
            let target = this.state.resultTable;
            let finalKey = kv.key.pop();
            for (let kw of kv.key) {
              if (hasKey(target, kw) && (!isTable(target[kw]) || target[kw][_declared])) {
                throw this.error(new TomlError("Can't redefine existing key"));
              }
              target = target[kw] = target[kw] || Table();
            }
            if (hasKey(target, finalKey)) {
              throw this.error(new TomlError("Can't redefine existing key"));
            }
            if (isInteger(kv.value) || isFloat(kv.value)) {
              target[finalKey] = kv.value.valueOf();
            } else {
              target[finalKey] = kv.value;
            }
            return this.goto(this.parseInlineTableNext);
          }
          parseInlineTableNext() {
            if (this.char === CHAR_SP || this.char === CTRL_I) {
              return null;
            } else if (this.char === Parser.END || this.char === CHAR_NUM || this.char === CTRL_J || this.char === CTRL_M) {
              throw this.error(new TomlError("Unterminated inline array"));
            } else if (this.char === CHAR_COMMA) {
              return this.next(this.parseInlineTable);
            } else if (this.char === CHAR_RCUB) {
              return this.goto(this.parseInlineTable);
            } else {
              throw this.error(new TomlError("Invalid character, expected whitespace, comma (,) or close bracket (])"));
            }
          }
        }
        return TOMLParser;
      }
    }
  });

  // node_modules/@iarna/toml/parse-pretty-error.js
  var require_parse_pretty_error = __commonJS({
    "node_modules/@iarna/toml/parse-pretty-error.js"(exports2, module2) {
      "use strict";
      module2.exports = prettyError;
      function prettyError(err, buf) {
        if (err.pos == null || err.line == null)
          return err;
        let msg = err.message;
        msg += ` at row ${err.line + 1}, col ${err.col + 1}, pos ${err.pos}:
`;
        if (buf && buf.split) {
          const lines = buf.split(/\n/);
          const lineNumWidth = String(Math.min(lines.length, err.line + 3)).length;
          let linePadding = " ";
          while (linePadding.length < lineNumWidth)
            linePadding += " ";
          for (let ii = Math.max(0, err.line - 1); ii < Math.min(lines.length, err.line + 2); ++ii) {
            let lineNum = String(ii + 1);
            if (lineNum.length < lineNumWidth)
              lineNum = " " + lineNum;
            if (err.line === ii) {
              msg += lineNum + "> " + lines[ii] + "\n";
              msg += linePadding + "  ";
              for (let hh = 0; hh < err.col; ++hh) {
                msg += " ";
              }
              msg += "^\n";
            } else {
              msg += lineNum + ": " + lines[ii] + "\n";
            }
          }
        }
        err.message = msg + "\n";
        return err;
      }
    }
  });

  // node_modules/@iarna/toml/parse-string.js
  var require_parse_string = __commonJS({
    "node_modules/@iarna/toml/parse-string.js"(exports2, module2) {
      "use strict";
      module2.exports = parseString;
      var TOMLParser = require_toml_parser();
      var prettyError = require_parse_pretty_error();
      function parseString(str) {
        if (globalThis.Buffer && globalThis.Buffer.isBuffer(str)) {
          str = str.toString("utf8");
        }
        const parser = new TOMLParser();
        try {
          parser.parse(str);
          return parser.finish();
        } catch (err) {
          throw prettyError(err, str);
        }
      }
    }
  });

  // node_modules/@iarna/toml/parse-async.js
  var require_parse_async = __commonJS({
    "node_modules/@iarna/toml/parse-async.js"(exports2, module2) {
      "use strict";
      module2.exports = parseAsync;
      var TOMLParser = require_toml_parser();
      var prettyError = require_parse_pretty_error();
      function parseAsync(str, opts) {
        if (!opts)
          opts = {};
        const index = 0;
        const blocksize = opts.blocksize || 40960;
        const parser = new TOMLParser();
        return new Promise((resolve, reject) => {
          setImmediate(parseAsyncNext, index, blocksize, resolve, reject);
        });
        function parseAsyncNext(index2, blocksize2, resolve, reject) {
          if (index2 >= str.length) {
            try {
              return resolve(parser.finish());
            } catch (err) {
              return reject(prettyError(err, str));
            }
          }
          try {
            parser.parse(str.slice(index2, index2 + blocksize2));
            setImmediate(parseAsyncNext, index2 + blocksize2, blocksize2, resolve, reject);
          } catch (err) {
            reject(prettyError(err, str));
          }
        }
      }
    }
  });

  // node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/component-emitter/index.js"(exports2, module2) {
      function Emitter(object) {
        if (object) {
          return mixin(object);
        }
        this._callbacks = /* @__PURE__ */ new Map();
      }
      function mixin(object) {
        Object.assign(object, Emitter.prototype);
        object._callbacks = /* @__PURE__ */ new Map();
        return object;
      }
      Emitter.prototype.on = function(event, listener) {
        const callbacks = this._callbacks.get(event) ?? [];
        callbacks.push(listener);
        this._callbacks.set(event, callbacks);
        return this;
      };
      Emitter.prototype.once = function(event, listener) {
        const on = (...arguments_) => {
          this.off(event, on);
          listener.apply(this, arguments_);
        };
        on.fn = listener;
        this.on(event, on);
        return this;
      };
      Emitter.prototype.off = function(event, listener) {
        if (event === void 0 && listener === void 0) {
          this._callbacks.clear();
          return this;
        }
        if (listener === void 0) {
          this._callbacks.delete(event);
          return this;
        }
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          for (const [index, callback] of callbacks.entries()) {
            if (callback === listener || callback.fn === listener) {
              callbacks.splice(index, 1);
              break;
            }
          }
          if (callbacks.length === 0) {
            this._callbacks.delete(event);
          } else {
            this._callbacks.set(event, callbacks);
          }
        }
        return this;
      };
      Emitter.prototype.emit = function(event, ...arguments_) {
        const callbacks = this._callbacks.get(event);
        if (callbacks) {
          const callbacksCopy = [...callbacks];
          for (const callback of callbacksCopy) {
            callback.apply(this, arguments_);
          }
        }
        return this;
      };
      Emitter.prototype.listeners = function(event) {
        return this._callbacks.get(event) ?? [];
      };
      Emitter.prototype.listenerCount = function(event) {
        if (event) {
          return this.listeners(event).length;
        }
        let totalCount = 0;
        for (const callbacks of this._callbacks.values()) {
          totalCount += callbacks.length;
        }
        return totalCount;
      };
      Emitter.prototype.hasListeners = function(event) {
        return this.listenerCount(event) > 0;
      };
      Emitter.prototype.addEventListener = Emitter.prototype.on;
      Emitter.prototype.removeListener = Emitter.prototype.off;
      Emitter.prototype.removeEventListener = Emitter.prototype.off;
      Emitter.prototype.removeAllListeners = Emitter.prototype.off;
      if (typeof module2 !== "undefined") {
        module2.exports = Emitter;
      }
    }
  });

  // node_modules/stream/index.js
  var require_stream = __commonJS({
    "node_modules/stream/index.js"(exports2, module2) {
      var Emitter = require_component_emitter();
      function Stream() {
        Emitter.call(this);
      }
      Stream.prototype = new Emitter();
      module2.exports = Stream;
      Stream.Stream = Stream;
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          if (typeof dest.destroy === "function")
            dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (!this.hasListeners("error")) {
            throw er;
          }
        }
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.off("data", ondata);
          dest.off("drain", ondrain);
          source.off("end", onend);
          source.off("close", onclose);
          source.off("error", onerror);
          dest.off("error", onerror);
          source.off("end", cleanup);
          source.off("close", cleanup);
          dest.off("end", cleanup);
          dest.off("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("end", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
    }
  });

  // node_modules/@iarna/toml/parse-stream.js
  var require_parse_stream = __commonJS({
    "node_modules/@iarna/toml/parse-stream.js"(exports2, module2) {
      "use strict";
      module2.exports = parseStream;
      var stream = require_stream();
      var TOMLParser = require_toml_parser();
      function parseStream(stm) {
        if (stm) {
          return parseReadable(stm);
        } else {
          return parseTransform(stm);
        }
      }
      function parseReadable(stm) {
        const parser = new TOMLParser();
        stm.setEncoding("utf8");
        return new Promise((resolve, reject) => {
          let readable;
          let ended = false;
          let errored = false;
          function finish() {
            ended = true;
            if (readable)
              return;
            try {
              resolve(parser.finish());
            } catch (err) {
              reject(err);
            }
          }
          function error(err) {
            errored = true;
            reject(err);
          }
          stm.once("end", finish);
          stm.once("error", error);
          readNext();
          function readNext() {
            readable = true;
            let data;
            while ((data = stm.read()) !== null) {
              try {
                parser.parse(data);
              } catch (err) {
                return error(err);
              }
            }
            readable = false;
            if (ended)
              return finish();
            if (errored)
              return;
            stm.once("readable", readNext);
          }
        });
      }
      function parseTransform() {
        const parser = new TOMLParser();
        return new stream.Transform({
          objectMode: true,
          transform(chunk, encoding, cb) {
            try {
              parser.parse(chunk.toString(encoding));
            } catch (err) {
              this.emit("error", err);
            }
            cb();
          },
          flush(cb) {
            try {
              this.push(parser.finish());
            } catch (err) {
              this.emit("error", err);
            }
            cb();
          }
        });
      }
    }
  });

  // node_modules/@iarna/toml/parse.js
  var require_parse = __commonJS({
    "node_modules/@iarna/toml/parse.js"(exports2, module2) {
      "use strict";
      module2.exports = require_parse_string();
      module2.exports.async = require_parse_async();
      module2.exports.stream = require_parse_stream();
      module2.exports.prettyError = require_parse_pretty_error();
    }
  });

  // node_modules/@iarna/toml/stringify.js
  var require_stringify = __commonJS({
    "node_modules/@iarna/toml/stringify.js"(exports2, module2) {
      "use strict";
      module2.exports = stringify;
      module2.exports.value = stringifyInline;
      function stringify(obj) {
        if (obj === null)
          throw typeError("null");
        if (obj === void 0)
          throw typeError("undefined");
        if (typeof obj !== "object")
          throw typeError(typeof obj);
        if (typeof obj.toJSON === "function")
          obj = obj.toJSON();
        if (obj == null)
          return null;
        const type = tomlType2(obj);
        if (type !== "table")
          throw typeError(type);
        return stringifyObject("", "", obj);
      }
      function typeError(type) {
        return new Error("Can only stringify objects, not " + type);
      }
      function arrayOneTypeError() {
        return new Error("Array values can't have mixed types");
      }
      function getInlineKeys(obj) {
        return Object.keys(obj).filter((key) => isInline(obj[key]));
      }
      function getComplexKeys(obj) {
        return Object.keys(obj).filter((key) => !isInline(obj[key]));
      }
      function toJSON(obj) {
        let nobj = Array.isArray(obj) ? [] : Object.prototype.hasOwnProperty.call(obj, "__proto__") ? { ["__proto__"]: void 0 } : {};
        for (let prop of Object.keys(obj)) {
          if (obj[prop] && typeof obj[prop].toJSON === "function" && !("toISOString" in obj[prop])) {
            nobj[prop] = obj[prop].toJSON();
          } else {
            nobj[prop] = obj[prop];
          }
        }
        return nobj;
      }
      function stringifyObject(prefix, indent, obj) {
        obj = toJSON(obj);
        var inlineKeys;
        var complexKeys;
        inlineKeys = getInlineKeys(obj);
        complexKeys = getComplexKeys(obj);
        var result = [];
        var inlineIndent = indent || "";
        inlineKeys.forEach((key) => {
          var type = tomlType2(obj[key]);
          if (type !== "undefined" && type !== "null") {
            result.push(inlineIndent + stringifyKey(key) + " = " + stringifyAnyInline(obj[key], true));
          }
        });
        if (result.length > 0)
          result.push("");
        var complexIndent = prefix && inlineKeys.length > 0 ? indent + "  " : "";
        complexKeys.forEach((key) => {
          result.push(stringifyComplex(prefix, complexIndent, key, obj[key]));
        });
        return result.join("\n");
      }
      function isInline(value) {
        switch (tomlType2(value)) {
          case "undefined":
          case "null":
          case "integer":
          case "nan":
          case "float":
          case "boolean":
          case "string":
          case "datetime":
            return true;
          case "array":
            return value.length === 0 || tomlType2(value[0]) !== "table";
          case "table":
            return Object.keys(value).length === 0;
          default:
            return false;
        }
      }
      function tomlType2(value) {
        if (value === void 0) {
          return "undefined";
        } else if (value === null) {
          return "null";
        } else if (typeof value === "bigint" || Number.isInteger(value) && !Object.is(value, -0)) {
          return "integer";
        } else if (typeof value === "number") {
          return "float";
        } else if (typeof value === "boolean") {
          return "boolean";
        } else if (typeof value === "string") {
          return "string";
        } else if ("toISOString" in value) {
          return isNaN(value) ? "undefined" : "datetime";
        } else if (Array.isArray(value)) {
          return "array";
        } else {
          return "table";
        }
      }
      function stringifyKey(key) {
        var keyStr = String(key);
        if (/^[-A-Za-z0-9_]+$/.test(keyStr)) {
          return keyStr;
        } else {
          return stringifyBasicString(keyStr);
        }
      }
      function stringifyBasicString(str) {
        return '"' + escapeString(str).replace(/"/g, '\\"') + '"';
      }
      function stringifyLiteralString(str) {
        return "'" + str + "'";
      }
      function numpad(num, str) {
        while (str.length < num)
          str = "0" + str;
        return str;
      }
      function escapeString(str) {
        return str.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/([\u0000-\u001f\u007f])/, (c) => "\\u" + numpad(4, c.codePointAt(0).toString(16)));
      }
      function stringifyMultilineString(str) {
        let escaped = str.split(/\n/).map((str2) => {
          return escapeString(str2).replace(/"(?="")/g, '\\"');
        }).join("\n");
        if (escaped.slice(-1) === '"')
          escaped += "\\\n";
        return '"""\n' + escaped + '"""';
      }
      function stringifyAnyInline(value, multilineOk) {
        let type = tomlType2(value);
        if (type === "string") {
          if (multilineOk && /\n/.test(value)) {
            type = "string-multiline";
          } else if (!/[\b\t\n\f\r']/.test(value) && /"/.test(value)) {
            type = "string-literal";
          }
        }
        return stringifyInline(value, type);
      }
      function stringifyInline(value, type) {
        if (!type)
          type = tomlType2(value);
        switch (type) {
          case "string-multiline":
            return stringifyMultilineString(value);
          case "string":
            return stringifyBasicString(value);
          case "string-literal":
            return stringifyLiteralString(value);
          case "integer":
            return stringifyInteger(value);
          case "float":
            return stringifyFloat(value);
          case "boolean":
            return stringifyBoolean(value);
          case "datetime":
            return stringifyDatetime(value);
          case "array":
            return stringifyInlineArray(value.filter((_) => tomlType2(_) !== "null" && tomlType2(_) !== "undefined" && tomlType2(_) !== "nan"));
          case "table":
            return stringifyInlineTable(value);
          default:
            throw typeError(type);
        }
      }
      function stringifyInteger(value) {
        return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "_");
      }
      function stringifyFloat(value) {
        if (value === Infinity) {
          return "inf";
        } else if (value === -Infinity) {
          return "-inf";
        } else if (Object.is(value, NaN)) {
          return "nan";
        } else if (Object.is(value, -0)) {
          return "-0.0";
        }
        var chunks = String(value).split(".");
        var int = chunks[0];
        var dec = chunks[1] || 0;
        return stringifyInteger(int) + "." + dec;
      }
      function stringifyBoolean(value) {
        return String(value);
      }
      function stringifyDatetime(value) {
        return value.toISOString();
      }
      function isNumber(type) {
        return type === "float" || type === "integer";
      }
      function arrayType(values) {
        var contentType = tomlType2(values[0]);
        if (values.every((_) => tomlType2(_) === contentType))
          return contentType;
        if (values.every((_) => isNumber(tomlType2(_))))
          return "float";
        return "mixed";
      }
      function validateArray(values) {
        const type = arrayType(values);
        if (type === "mixed") {
          throw arrayOneTypeError();
        }
        return type;
      }
      function stringifyInlineArray(values) {
        values = toJSON(values);
        const type = validateArray(values);
        var result = "[";
        var stringified = values.map((_) => stringifyInline(_, type));
        if (stringified.join(", ").length > 60 || /\n/.test(stringified)) {
          result += "\n  " + stringified.join(",\n  ") + "\n";
        } else {
          result += " " + stringified.join(", ") + (stringified.length > 0 ? " " : "");
        }
        return result + "]";
      }
      function stringifyInlineTable(value) {
        value = toJSON(value);
        var result = [];
        Object.keys(value).forEach((key) => {
          result.push(stringifyKey(key) + " = " + stringifyAnyInline(value[key], false));
        });
        return "{ " + result.join(", ") + (result.length > 0 ? " " : "") + "}";
      }
      function stringifyComplex(prefix, indent, key, value) {
        var valueType = tomlType2(value);
        if (valueType === "array") {
          return stringifyArrayOfTables(prefix, indent, key, value);
        } else if (valueType === "table") {
          return stringifyComplexTable(prefix, indent, key, value);
        } else {
          throw typeError(valueType);
        }
      }
      function stringifyArrayOfTables(prefix, indent, key, values) {
        values = toJSON(values);
        validateArray(values);
        var firstValueType = tomlType2(values[0]);
        if (firstValueType !== "table")
          throw typeError(firstValueType);
        var fullKey = prefix + stringifyKey(key);
        var result = "";
        values.forEach((table) => {
          if (result.length > 0)
            result += "\n";
          result += indent + "[[" + fullKey + "]]\n";
          result += stringifyObject(fullKey + ".", indent, table);
        });
        return result;
      }
      function stringifyComplexTable(prefix, indent, key, value) {
        var fullKey = prefix + stringifyKey(key);
        var result = "";
        if (getInlineKeys(value).length > 0) {
          result += indent + "[" + fullKey + "]\n";
        }
        return result + stringifyObject(fullKey + ".", indent, value);
      }
    }
  });

  // node_modules/@iarna/toml/toml.js
  var require_toml = __commonJS({
    "node_modules/@iarna/toml/toml.js"(exports2) {
      "use strict";
      exports2.parse = require_parse();
      exports2.stringify = require_stringify();
    }
  });

  // code/elemtoml.ts
  var import_utility_types = __toESM(require_dist());
  function register_element(name, elem) {
    window.elements[name] = elem;
  }

  // code/cfg_loader.ts
  var import_toml = __toESM(require_toml());
  var Package = class {
    constructor(config) {
      this.loaded_elems = [];
      this.cfg = config;
      console.log(this);
    }
    async load_elems() {
      for (const i of this.cfg.mod.external_elements) {
        console.log(i);
        try {
          let resp = await fetch(i.path);
          const parsed = (0, import_toml.parse)(await resp.text());
          console.log(parsed);
          register_element(i.name, parsed);
        } catch (err) {
          console.error(err);
        }
      }
    }
    get_loaded_elems() {
      return this.loaded_elems;
    }
    run() {
      fetch(this.cfg.mod.entry_point).then((resp) => {
        resp.text().then((x) => Function(x)());
      });
    }
  };
  function load(object) {
    return object;
  }

  // code/mod.ts
  var import_toml2 = __toESM(require_toml());

  // code/mod_finder.ts
  function find_mod(name, onfind) {
    console.log(name, `mods/${name}/mod.toml`);
    fetch(`mods/${name}/mod.toml`).then(async (x) => {
      console.log(x.url);
      if (x.ok) {
        onfind(await x.text());
      } else {
        window.queuedMods.push(name);
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  // code/mod.ts
  find_mod("loader_test", (text) => {
    const parsed = import_toml2.default.parse(text);
    console.log(import_toml2.default.parse(text));
    let pkg = new Package(load(parsed));
    pkg.load_elems().then(() => {
      console.log(pkg);
      console.log(pkg.get_loaded_elems());
    });
  });
})();
/*! Bundled license information:

utility-types/dist/index.js:
  (**
   * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
   * @copyright Copyright (c) 2016 Piotr Witek
   * @license MIT
   *)
*/
