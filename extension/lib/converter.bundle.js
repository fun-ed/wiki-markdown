var JiraMdConverter = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/marked/lib/marked.cjs
  var require_marked = __commonJS({
    "node_modules/marked/lib/marked.cjs"(exports) {
      "use strict";
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _createForOfIteratorHelperLoose(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (it) return (it = it.call(o)).next.bind(it);
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function getDefaults() {
        return {
          async: false,
          baseUrl: null,
          breaks: false,
          extensions: null,
          gfm: true,
          headerIds: true,
          headerPrefix: "",
          highlight: null,
          hooks: null,
          langPrefix: "language-",
          mangle: true,
          pedantic: false,
          renderer: null,
          sanitize: false,
          sanitizer: null,
          silent: false,
          smartypants: false,
          tokenizer: null,
          walkTokens: null,
          xhtml: false
        };
      }
      exports.defaults = getDefaults();
      function changeDefaults(newDefaults) {
        exports.defaults = newDefaults;
      }
      var escapeTest = /[&<>"']/;
      var escapeReplace = new RegExp(escapeTest.source, "g");
      var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
      var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
      var escapeReplacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var getEscapeReplacement = function getEscapeReplacement2(ch) {
        return escapeReplacements[ch];
      };
      function escape(html, encode) {
        if (encode) {
          if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement);
          }
        } else {
          if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
          }
        }
        return html;
      }
      var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
      function unescape(html) {
        return html.replace(unescapeTest, function(_, n) {
          n = n.toLowerCase();
          if (n === "colon") return ":";
          if (n.charAt(0) === "#") {
            return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
          }
          return "";
        });
      }
      var caret = /(^|[^\[])\^/g;
      function edit(regex, opt) {
        regex = typeof regex === "string" ? regex : regex.source;
        opt = opt || "";
        var obj = {
          replace: function replace(name, val) {
            val = val.source || val;
            val = val.replace(caret, "$1");
            regex = regex.replace(name, val);
            return obj;
          },
          getRegex: function getRegex() {
            return new RegExp(regex, opt);
          }
        };
        return obj;
      }
      var nonWordAndColonTest = /[^\w:]/g;
      var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
      function cleanUrl(sanitize, base, href) {
        if (sanitize) {
          var prot;
          try {
            prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
          } catch (e) {
            return null;
          }
          if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
            return null;
          }
        }
        if (base && !originIndependentUrl.test(href)) {
          href = resolveUrl(base, href);
        }
        try {
          href = encodeURI(href).replace(/%25/g, "%");
        } catch (e) {
          return null;
        }
        return href;
      }
      var baseUrls = {};
      var justDomain = /^[^:]+:\/*[^/]*$/;
      var protocol = /^([^:]+:)[\s\S]*$/;
      var domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
      function resolveUrl(base, href) {
        if (!baseUrls[" " + base]) {
          if (justDomain.test(base)) {
            baseUrls[" " + base] = base + "/";
          } else {
            baseUrls[" " + base] = rtrim(base, "/", true);
          }
        }
        base = baseUrls[" " + base];
        var relativeBase = base.indexOf(":") === -1;
        if (href.substring(0, 2) === "//") {
          if (relativeBase) {
            return href;
          }
          return base.replace(protocol, "$1") + href;
        } else if (href.charAt(0) === "/") {
          if (relativeBase) {
            return href;
          }
          return base.replace(domain, "$1") + href;
        } else {
          return base + href;
        }
      }
      var noopTest = {
        exec: function noopTest2() {
        }
      };
      function splitCells(tableRow, count) {
        var row = tableRow.replace(/\|/g, function(match, offset, str) {
          var escaped = false, curr = offset;
          while (--curr >= 0 && str[curr] === "\\") {
            escaped = !escaped;
          }
          if (escaped) {
            return "|";
          } else {
            return " |";
          }
        }), cells = row.split(/ \|/);
        var i = 0;
        if (!cells[0].trim()) {
          cells.shift();
        }
        if (cells.length > 0 && !cells[cells.length - 1].trim()) {
          cells.pop();
        }
        if (cells.length > count) {
          cells.splice(count);
        } else {
          while (cells.length < count) {
            cells.push("");
          }
        }
        for (; i < cells.length; i++) {
          cells[i] = cells[i].trim().replace(/\\\|/g, "|");
        }
        return cells;
      }
      function rtrim(str, c, invert) {
        var l = str.length;
        if (l === 0) {
          return "";
        }
        var suffLen = 0;
        while (suffLen < l) {
          var currChar = str.charAt(l - suffLen - 1);
          if (currChar === c && !invert) {
            suffLen++;
          } else if (currChar !== c && invert) {
            suffLen++;
          } else {
            break;
          }
        }
        return str.slice(0, l - suffLen);
      }
      function findClosingBracket(str, b) {
        if (str.indexOf(b[1]) === -1) {
          return -1;
        }
        var l = str.length;
        var level = 0, i = 0;
        for (; i < l; i++) {
          if (str[i] === "\\") {
            i++;
          } else if (str[i] === b[0]) {
            level++;
          } else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
              return i;
            }
          }
        }
        return -1;
      }
      function checkSanitizeDeprecation(opt) {
        if (opt && opt.sanitize && !opt.silent) {
          console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
        }
      }
      function repeatString(pattern, count) {
        if (count < 1) {
          return "";
        }
        var result = "";
        while (count > 1) {
          if (count & 1) {
            result += pattern;
          }
          count >>= 1;
          pattern += pattern;
        }
        return result + pattern;
      }
      function outputLink(cap, link, raw, lexer2) {
        var href = link.href;
        var title = link.title ? escape(link.title) : null;
        var text = cap[1].replace(/\\([\[\]])/g, "$1");
        if (cap[0].charAt(0) !== "!") {
          lexer2.state.inLink = true;
          var token = {
            type: "link",
            raw,
            href,
            title,
            text,
            tokens: lexer2.inlineTokens(text)
          };
          lexer2.state.inLink = false;
          return token;
        }
        return {
          type: "image",
          raw,
          href,
          title,
          text: escape(text)
        };
      }
      function indentCodeCompensation(raw, text) {
        var matchIndentToCode = raw.match(/^(\s+)(?:```)/);
        if (matchIndentToCode === null) {
          return text;
        }
        var indentToCode = matchIndentToCode[1];
        return text.split("\n").map(function(node) {
          var matchIndentInNode = node.match(/^\s+/);
          if (matchIndentInNode === null) {
            return node;
          }
          var indentInNode = matchIndentInNode[0];
          if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
          }
          return node;
        }).join("\n");
      }
      var Tokenizer = /* @__PURE__ */ (function() {
        function Tokenizer2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Tokenizer2.prototype;
        _proto.space = function space(src) {
          var cap = this.rules.block.newline.exec(src);
          if (cap && cap[0].length > 0) {
            return {
              type: "space",
              raw: cap[0]
            };
          }
        };
        _proto.code = function code(src) {
          var cap = this.rules.block.code.exec(src);
          if (cap) {
            var text = cap[0].replace(/^ {1,4}/gm, "");
            return {
              type: "code",
              raw: cap[0],
              codeBlockStyle: "indented",
              text: !this.options.pedantic ? rtrim(text, "\n") : text
            };
          }
        };
        _proto.fences = function fences(src) {
          var cap = this.rules.block.fences.exec(src);
          if (cap) {
            var raw = cap[0];
            var text = indentCodeCompensation(raw, cap[3] || "");
            return {
              type: "code",
              raw,
              lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
              text
            };
          }
        };
        _proto.heading = function heading(src) {
          var cap = this.rules.block.heading.exec(src);
          if (cap) {
            var text = cap[2].trim();
            if (/#$/.test(text)) {
              var trimmed = rtrim(text, "#");
              if (this.options.pedantic) {
                text = trimmed.trim();
              } else if (!trimmed || / $/.test(trimmed)) {
                text = trimmed.trim();
              }
            }
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[1].length,
              text,
              tokens: this.lexer.inline(text)
            };
          }
        };
        _proto.hr = function hr(src) {
          var cap = this.rules.block.hr.exec(src);
          if (cap) {
            return {
              type: "hr",
              raw: cap[0]
            };
          }
        };
        _proto.blockquote = function blockquote(src) {
          var cap = this.rules.block.blockquote.exec(src);
          if (cap) {
            var text = cap[0].replace(/^ *>[ \t]?/gm, "");
            var top = this.lexer.state.top;
            this.lexer.state.top = true;
            var tokens = this.lexer.blockTokens(text);
            this.lexer.state.top = top;
            return {
              type: "blockquote",
              raw: cap[0],
              tokens,
              text
            };
          }
        };
        _proto.list = function list(src) {
          var cap = this.rules.block.list.exec(src);
          if (cap) {
            var raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
            var bull = cap[1].trim();
            var isordered = bull.length > 1;
            var list2 = {
              type: "list",
              raw: "",
              ordered: isordered,
              start: isordered ? +bull.slice(0, -1) : "",
              loose: false,
              items: []
            };
            bull = isordered ? "\\d{1,9}\\" + bull.slice(-1) : "\\" + bull;
            if (this.options.pedantic) {
              bull = isordered ? bull : "[*+-]";
            }
            var itemRegex = new RegExp("^( {0,3}" + bull + ")((?:[	 ][^\\n]*)?(?:\\n|$))");
            while (src) {
              endEarly = false;
              if (!(cap = itemRegex.exec(src))) {
                break;
              }
              if (this.rules.block.hr.test(src)) {
                break;
              }
              raw = cap[0];
              src = src.substring(raw.length);
              line = cap[2].split("\n", 1)[0].replace(/^\t+/, function(t) {
                return " ".repeat(3 * t.length);
              });
              nextLine = src.split("\n", 1)[0];
              if (this.options.pedantic) {
                indent = 2;
                itemContents = line.trimLeft();
              } else {
                indent = cap[2].search(/[^ ]/);
                indent = indent > 4 ? 1 : indent;
                itemContents = line.slice(indent);
                indent += cap[1].length;
              }
              blankLine = false;
              if (!line && /^ *$/.test(nextLine)) {
                raw += nextLine + "\n";
                src = src.substring(nextLine.length + 1);
                endEarly = true;
              }
              if (!endEarly) {
                var nextBulletRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))");
                var hrRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)");
                var fencesBeginRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}(?:```|~~~)");
                var headingBeginRegex = new RegExp("^ {0," + Math.min(3, indent - 1) + "}#");
                while (src) {
                  rawLine = src.split("\n", 1)[0];
                  nextLine = rawLine;
                  if (this.options.pedantic) {
                    nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
                  }
                  if (fencesBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (headingBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (nextBulletRegex.test(nextLine)) {
                    break;
                  }
                  if (hrRegex.test(src)) {
                    break;
                  }
                  if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                    itemContents += "\n" + nextLine.slice(indent);
                  } else {
                    if (blankLine) {
                      break;
                    }
                    if (line.search(/[^ ]/) >= 4) {
                      break;
                    }
                    if (fencesBeginRegex.test(line)) {
                      break;
                    }
                    if (headingBeginRegex.test(line)) {
                      break;
                    }
                    if (hrRegex.test(line)) {
                      break;
                    }
                    itemContents += "\n" + nextLine;
                  }
                  if (!blankLine && !nextLine.trim()) {
                    blankLine = true;
                  }
                  raw += rawLine + "\n";
                  src = src.substring(rawLine.length + 1);
                  line = nextLine.slice(indent);
                }
              }
              if (!list2.loose) {
                if (endsWithBlankLine) {
                  list2.loose = true;
                } else if (/\n *\n *$/.test(raw)) {
                  endsWithBlankLine = true;
                }
              }
              if (this.options.gfm) {
                istask = /^\[[ xX]\] /.exec(itemContents);
                if (istask) {
                  ischecked = istask[0] !== "[ ] ";
                  itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
                }
              }
              list2.items.push({
                type: "list_item",
                raw,
                task: !!istask,
                checked: ischecked,
                loose: false,
                text: itemContents
              });
              list2.raw += raw;
            }
            list2.items[list2.items.length - 1].raw = raw.trimRight();
            list2.items[list2.items.length - 1].text = itemContents.trimRight();
            list2.raw = list2.raw.trimRight();
            var l = list2.items.length;
            for (i = 0; i < l; i++) {
              this.lexer.state.top = false;
              list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
              if (!list2.loose) {
                var spacers = list2.items[i].tokens.filter(function(t) {
                  return t.type === "space";
                });
                var hasMultipleLineBreaks = spacers.length > 0 && spacers.some(function(t) {
                  return /\n.*\n/.test(t.raw);
                });
                list2.loose = hasMultipleLineBreaks;
              }
            }
            if (list2.loose) {
              for (i = 0; i < l; i++) {
                list2.items[i].loose = true;
              }
            }
            return list2;
          }
        };
        _proto.html = function html(src) {
          var cap = this.rules.block.html.exec(src);
          if (cap) {
            var token = {
              type: "html",
              raw: cap[0],
              pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
              text: cap[0]
            };
            if (this.options.sanitize) {
              var text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
              token.type = "paragraph";
              token.text = text;
              token.tokens = this.lexer.inline(text);
            }
            return token;
          }
        };
        _proto.def = function def(src) {
          var cap = this.rules.block.def.exec(src);
          if (cap) {
            var tag = cap[1].toLowerCase().replace(/\s+/g, " ");
            var href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
            var title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
            return {
              type: "def",
              tag,
              raw: cap[0],
              href,
              title
            };
          }
        };
        _proto.table = function table(src) {
          var cap = this.rules.block.table.exec(src);
          if (cap) {
            var item = {
              type: "table",
              header: splitCells(cap[1]).map(function(c) {
                return {
                  text: c
                };
              }),
              align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
            };
            if (item.header.length === item.align.length) {
              item.raw = cap[0];
              var l = item.align.length;
              var i, j, k, row;
              for (i = 0; i < l; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = "right";
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = "center";
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = "left";
                } else {
                  item.align[i] = null;
                }
              }
              l = item.rows.length;
              for (i = 0; i < l; i++) {
                item.rows[i] = splitCells(item.rows[i], item.header.length).map(function(c) {
                  return {
                    text: c
                  };
                });
              }
              l = item.header.length;
              for (j = 0; j < l; j++) {
                item.header[j].tokens = this.lexer.inline(item.header[j].text);
              }
              l = item.rows.length;
              for (j = 0; j < l; j++) {
                row = item.rows[j];
                for (k = 0; k < row.length; k++) {
                  row[k].tokens = this.lexer.inline(row[k].text);
                }
              }
              return item;
            }
          }
        };
        _proto.lheading = function lheading(src) {
          var cap = this.rules.block.lheading.exec(src);
          if (cap) {
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[2].charAt(0) === "=" ? 1 : 2,
              text: cap[1],
              tokens: this.lexer.inline(cap[1])
            };
          }
        };
        _proto.paragraph = function paragraph(src) {
          var cap = this.rules.block.paragraph.exec(src);
          if (cap) {
            var text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
            return {
              type: "paragraph",
              raw: cap[0],
              text,
              tokens: this.lexer.inline(text)
            };
          }
        };
        _proto.text = function text(src) {
          var cap = this.rules.block.text.exec(src);
          if (cap) {
            return {
              type: "text",
              raw: cap[0],
              text: cap[0],
              tokens: this.lexer.inline(cap[0])
            };
          }
        };
        _proto.escape = function escape$1(src) {
          var cap = this.rules.inline.escape.exec(src);
          if (cap) {
            return {
              type: "escape",
              raw: cap[0],
              text: escape(cap[1])
            };
          }
        };
        _proto.tag = function tag(src) {
          var cap = this.rules.inline.tag.exec(src);
          if (cap) {
            if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
              this.lexer.state.inLink = true;
            } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
              this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.lexer.state.inRawBlock = true;
            } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.lexer.state.inRawBlock = false;
            }
            return {
              type: this.options.sanitize ? "text" : "html",
              raw: cap[0],
              inLink: this.lexer.state.inLink,
              inRawBlock: this.lexer.state.inRawBlock,
              text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
            };
          }
        };
        _proto.link = function link(src) {
          var cap = this.rules.inline.link.exec(src);
          if (cap) {
            var trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && /^</.test(trimmedUrl)) {
              if (!/>$/.test(trimmedUrl)) {
                return;
              }
              var rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
              if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                return;
              }
            } else {
              var lastParenIndex = findClosingBracket(cap[2], "()");
              if (lastParenIndex > -1) {
                var start = cap[0].indexOf("!") === 0 ? 5 : 4;
                var linkLen = start + cap[1].length + lastParenIndex;
                cap[2] = cap[2].substring(0, lastParenIndex);
                cap[0] = cap[0].substring(0, linkLen).trim();
                cap[3] = "";
              }
            }
            var href = cap[2];
            var title = "";
            if (this.options.pedantic) {
              var link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
              if (link2) {
                href = link2[1];
                title = link2[3];
              }
            } else {
              title = cap[3] ? cap[3].slice(1, -1) : "";
            }
            href = href.trim();
            if (/^</.test(href)) {
              if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
                href = href.slice(1);
              } else {
                href = href.slice(1, -1);
              }
            }
            return outputLink(cap, {
              href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
              title: title ? title.replace(this.rules.inline._escapes, "$1") : title
            }, cap[0], this.lexer);
          }
        };
        _proto.reflink = function reflink(src, links) {
          var cap;
          if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
            var link = (cap[2] || cap[1]).replace(/\s+/g, " ");
            link = links[link.toLowerCase()];
            if (!link) {
              var text = cap[0].charAt(0);
              return {
                type: "text",
                raw: text,
                text
              };
            }
            return outputLink(cap, link, cap[0], this.lexer);
          }
        };
        _proto.emStrong = function emStrong(src, maskedSrc, prevChar) {
          if (prevChar === void 0) {
            prevChar = "";
          }
          var match = this.rules.inline.emStrong.lDelim.exec(src);
          if (!match) return;
          if (match[3] && prevChar.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/)) return;
          var nextChar = match[1] || match[2] || "";
          if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
            var lLength = match[0].length - 1;
            var rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            var endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            endReg.lastIndex = 0;
            maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
            while ((match = endReg.exec(maskedSrc)) != null) {
              rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
              if (!rDelim) continue;
              rLength = rDelim.length;
              if (match[3] || match[4]) {
                delimTotal += rLength;
                continue;
              } else if (match[5] || match[6]) {
                if (lLength % 3 && !((lLength + rLength) % 3)) {
                  midDelimTotal += rLength;
                  continue;
                }
              }
              delimTotal -= rLength;
              if (delimTotal > 0) continue;
              rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
              var raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
              if (Math.min(lLength, rLength) % 2) {
                var _text = raw.slice(1, -1);
                return {
                  type: "em",
                  raw,
                  text: _text,
                  tokens: this.lexer.inlineTokens(_text)
                };
              }
              var text = raw.slice(2, -2);
              return {
                type: "strong",
                raw,
                text,
                tokens: this.lexer.inlineTokens(text)
              };
            }
          }
        };
        _proto.codespan = function codespan(src) {
          var cap = this.rules.inline.code.exec(src);
          if (cap) {
            var text = cap[2].replace(/\n/g, " ");
            var hasNonSpaceChars = /[^ ]/.test(text);
            var hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
              text = text.substring(1, text.length - 1);
            }
            text = escape(text, true);
            return {
              type: "codespan",
              raw: cap[0],
              text
            };
          }
        };
        _proto.br = function br(src) {
          var cap = this.rules.inline.br.exec(src);
          if (cap) {
            return {
              type: "br",
              raw: cap[0]
            };
          }
        };
        _proto.del = function del(src) {
          var cap = this.rules.inline.del.exec(src);
          if (cap) {
            return {
              type: "del",
              raw: cap[0],
              text: cap[2],
              tokens: this.lexer.inlineTokens(cap[2])
            };
          }
        };
        _proto.autolink = function autolink(src, mangle2) {
          var cap = this.rules.inline.autolink.exec(src);
          if (cap) {
            var text, href;
            if (cap[2] === "@") {
              text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
              href = "mailto:" + text;
            } else {
              text = escape(cap[1]);
              href = text;
            }
            return {
              type: "link",
              raw: cap[0],
              text,
              href,
              tokens: [{
                type: "text",
                raw: text,
                text
              }]
            };
          }
        };
        _proto.url = function url(src, mangle2) {
          var cap;
          if (cap = this.rules.inline.url.exec(src)) {
            var text, href;
            if (cap[2] === "@") {
              text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
              href = "mailto:" + text;
            } else {
              var prevCapZero;
              do {
                prevCapZero = cap[0];
                cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
              } while (prevCapZero !== cap[0]);
              text = escape(cap[0]);
              if (cap[1] === "www.") {
                href = "http://" + cap[0];
              } else {
                href = cap[0];
              }
            }
            return {
              type: "link",
              raw: cap[0],
              text,
              href,
              tokens: [{
                type: "text",
                raw: text,
                text
              }]
            };
          }
        };
        _proto.inlineText = function inlineText(src, smartypants2) {
          var cap = this.rules.inline.text.exec(src);
          if (cap) {
            var text;
            if (this.lexer.state.inRawBlock) {
              text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
            } else {
              text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
            }
            return {
              type: "text",
              raw: cap[0],
              text
            };
          }
        };
        return Tokenizer2;
      })();
      var block = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: noopTest,
        lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        // regex template, placeholders will be replaced according to different paragraph
        // interruption rules of commonmark and the original markdown spec:
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/
      };
      block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
      block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
      block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
      block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
      block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
      block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
      block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
      block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
      block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
      block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
      block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
      block.normal = _extends({}, block);
      block.gfm = _extends({}, block.normal, {
        table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
        // Cells
      });
      block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
      block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
      block.pedantic = _extends({}, block.normal, {
        html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: noopTest,
        // fences not supported
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
      });
      var inline = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: noopTest,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        // CDATA section
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
          lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
          //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
          //          () Skip orphan inside strong                                      () Consume to delim     (1) #***                (2) a***#, a***                             (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
          rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
          rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
          // ^- Not allowed for _
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: noopTest,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/
      };
      inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
      inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
      inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
      inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
      inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
      inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
      inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
      inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
      inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
      inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
      inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
      inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
      inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
      inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
      inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
      inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
      inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
      inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
      inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
      inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
      inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
      inline.normal = _extends({}, inline);
      inline.pedantic = _extends({}, inline.normal, {
        strong: {
          start: /^__|\*\*/,
          middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          endAst: /\*\*(?!\*)/g,
          endUnd: /__(?!_)/g
        },
        em: {
          start: /^_|\*/,
          middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
          endAst: /\*(?!\*)/g,
          endUnd: /_(?!_)/g
        },
        link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
        reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
      });
      inline.gfm = _extends({}, inline.normal, {
        escape: edit(inline.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
      });
      inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
      inline.breaks = _extends({}, inline.gfm, {
        br: edit(inline.br).replace("{2,}", "*").getRegex(),
        text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
      });
      function smartypants(text) {
        return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
      }
      function mangle(text) {
        var out = "", i, ch;
        var l = text.length;
        for (i = 0; i < l; i++) {
          ch = text.charCodeAt(i);
          if (Math.random() > 0.5) {
            ch = "x" + ch.toString(16);
          }
          out += "&#" + ch + ";";
        }
        return out;
      }
      var Lexer = /* @__PURE__ */ (function() {
        function Lexer2(options2) {
          this.tokens = [];
          this.tokens.links = /* @__PURE__ */ Object.create(null);
          this.options = options2 || exports.defaults;
          this.options.tokenizer = this.options.tokenizer || new Tokenizer();
          this.tokenizer = this.options.tokenizer;
          this.tokenizer.options = this.options;
          this.tokenizer.lexer = this;
          this.inlineQueue = [];
          this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
          };
          var rules3 = {
            block: block.normal,
            inline: inline.normal
          };
          if (this.options.pedantic) {
            rules3.block = block.pedantic;
            rules3.inline = inline.pedantic;
          } else if (this.options.gfm) {
            rules3.block = block.gfm;
            if (this.options.breaks) {
              rules3.inline = inline.breaks;
            } else {
              rules3.inline = inline.gfm;
            }
          }
          this.tokenizer.rules = rules3;
        }
        Lexer2.lex = function lex(src, options2) {
          var lexer2 = new Lexer2(options2);
          return lexer2.lex(src);
        };
        Lexer2.lexInline = function lexInline(src, options2) {
          var lexer2 = new Lexer2(options2);
          return lexer2.inlineTokens(src);
        };
        var _proto = Lexer2.prototype;
        _proto.lex = function lex(src) {
          src = src.replace(/\r\n|\r/g, "\n");
          this.blockTokens(src, this.tokens);
          var next2;
          while (next2 = this.inlineQueue.shift()) {
            this.inlineTokens(next2.src, next2.tokens);
          }
          return this.tokens;
        };
        _proto.blockTokens = function blockTokens(src, tokens) {
          var _this = this;
          if (tokens === void 0) {
            tokens = [];
          }
          if (this.options.pedantic) {
            src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
          } else {
            src = src.replace(/^( *)(\t+)/gm, function(_, leading, tabs) {
              return leading + "    ".repeat(tabs.length);
            });
          }
          var token, lastToken, cutSrc, lastParagraphClipped;
          while (src) {
            if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(function(extTokenizer) {
              if (token = extTokenizer.call({
                lexer: _this
              }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
              continue;
            }
            if (token = this.tokenizer.space(src)) {
              src = src.substring(token.raw.length);
              if (token.raw.length === 1 && tokens.length > 0) {
                tokens[tokens.length - 1].raw += "\n";
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.code(src)) {
              src = src.substring(token.raw.length);
              lastToken = tokens[tokens.length - 1];
              if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.fences(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.heading(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.hr(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.blockquote(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.list(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.html(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.def(src)) {
              src = src.substring(token.raw.length);
              lastToken = tokens[tokens.length - 1];
              if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.raw;
                this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
              } else if (!this.tokens.links[token.tag]) {
                this.tokens.links[token.tag] = {
                  href: token.href,
                  title: token.title
                };
              }
              continue;
            }
            if (token = this.tokenizer.table(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.lheading(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startBlock) {
              (function() {
                var startIndex = Infinity;
                var tempSrc = src.slice(1);
                var tempStart = void 0;
                _this.options.extensions.startBlock.forEach(function(getStartIndex) {
                  tempStart = getStartIndex.call({
                    lexer: this
                  }, tempSrc);
                  if (typeof tempStart === "number" && tempStart >= 0) {
                    startIndex = Math.min(startIndex, tempStart);
                  }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                  cutSrc = src.substring(0, startIndex + 1);
                }
              })();
            }
            if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
              lastToken = tokens[tokens.length - 1];
              if (lastParagraphClipped && lastToken.type === "paragraph") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue.pop();
                this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
              } else {
                tokens.push(token);
              }
              lastParagraphClipped = cutSrc.length !== src.length;
              src = src.substring(token.raw.length);
              continue;
            }
            if (token = this.tokenizer.text(src)) {
              src = src.substring(token.raw.length);
              lastToken = tokens[tokens.length - 1];
              if (lastToken && lastToken.type === "text") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue.pop();
                this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (src) {
              var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
              if (this.options.silent) {
                console.error(errMsg);
                break;
              } else {
                throw new Error(errMsg);
              }
            }
          }
          this.state.top = true;
          return tokens;
        };
        _proto.inline = function inline2(src, tokens) {
          if (tokens === void 0) {
            tokens = [];
          }
          this.inlineQueue.push({
            src,
            tokens
          });
          return tokens;
        };
        _proto.inlineTokens = function inlineTokens(src, tokens) {
          var _this2 = this;
          if (tokens === void 0) {
            tokens = [];
          }
          var token, lastToken, cutSrc;
          var maskedSrc = src;
          var match;
          var keepPrevChar, prevChar;
          if (this.tokens.links) {
            var links = Object.keys(this.tokens.links);
            if (links.length > 0) {
              while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
                if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                  maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                }
              }
            }
          }
          while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
          }
          while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
            this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
          }
          while (src) {
            if (!keepPrevChar) {
              prevChar = "";
            }
            keepPrevChar = false;
            if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(function(extTokenizer) {
              if (token = extTokenizer.call({
                lexer: _this2
              }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
              continue;
            }
            if (token = this.tokenizer.escape(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.tag(src)) {
              src = src.substring(token.raw.length);
              lastToken = tokens[tokens.length - 1];
              if (lastToken && token.type === "text" && lastToken.type === "text") {
                lastToken.raw += token.raw;
                lastToken.text += token.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.link(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.reflink(src, this.tokens.links)) {
              src = src.substring(token.raw.length);
              lastToken = tokens[tokens.length - 1];
              if (lastToken && token.type === "text" && lastToken.type === "text") {
                lastToken.raw += token.raw;
                lastToken.text += token.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.codespan(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.br(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.del(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.autolink(src, mangle)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startInline) {
              (function() {
                var startIndex = Infinity;
                var tempSrc = src.slice(1);
                var tempStart = void 0;
                _this2.options.extensions.startInline.forEach(function(getStartIndex) {
                  tempStart = getStartIndex.call({
                    lexer: this
                  }, tempSrc);
                  if (typeof tempStart === "number" && tempStart >= 0) {
                    startIndex = Math.min(startIndex, tempStart);
                  }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                  cutSrc = src.substring(0, startIndex + 1);
                }
              })();
            }
            if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
              src = src.substring(token.raw.length);
              if (token.raw.slice(-1) !== "_") {
                prevChar = token.raw.slice(-1);
              }
              keepPrevChar = true;
              lastToken = tokens[tokens.length - 1];
              if (lastToken && lastToken.type === "text") {
                lastToken.raw += token.raw;
                lastToken.text += token.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (src) {
              var errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
              if (this.options.silent) {
                console.error(errMsg);
                break;
              } else {
                throw new Error(errMsg);
              }
            }
          }
          return tokens;
        };
        _createClass(Lexer2, null, [{
          key: "rules",
          get: function get() {
            return {
              block,
              inline
            };
          }
        }]);
        return Lexer2;
      })();
      var Renderer = /* @__PURE__ */ (function() {
        function Renderer2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Renderer2.prototype;
        _proto.code = function code(_code, infostring, escaped) {
          var lang = (infostring || "").match(/\S*/)[0];
          if (this.options.highlight) {
            var out = this.options.highlight(_code, lang);
            if (out != null && out !== _code) {
              escaped = true;
              _code = out;
            }
          }
          _code = _code.replace(/\n$/, "") + "\n";
          if (!lang) {
            return "<pre><code>" + (escaped ? _code : escape(_code, true)) + "</code></pre>\n";
          }
          return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? _code : escape(_code, true)) + "</code></pre>\n";
        };
        _proto.blockquote = function blockquote(quote) {
          return "<blockquote>\n" + quote + "</blockquote>\n";
        };
        _proto.html = function html(_html) {
          return _html;
        };
        _proto.heading = function heading(text, level, raw, slugger) {
          if (this.options.headerIds) {
            var id = this.options.headerPrefix + slugger.slug(raw);
            return "<h" + level + ' id="' + id + '">' + text + "</h" + level + ">\n";
          }
          return "<h" + level + ">" + text + "</h" + level + ">\n";
        };
        _proto.hr = function hr() {
          return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
        };
        _proto.list = function list(body, ordered, start) {
          var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
          return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
        };
        _proto.listitem = function listitem(text) {
          return "<li>" + text + "</li>\n";
        };
        _proto.checkbox = function checkbox(checked) {
          return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
        };
        _proto.paragraph = function paragraph(text) {
          return "<p>" + text + "</p>\n";
        };
        _proto.table = function table(header, body) {
          if (body) body = "<tbody>" + body + "</tbody>";
          return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
        };
        _proto.tablerow = function tablerow(content) {
          return "<tr>\n" + content + "</tr>\n";
        };
        _proto.tablecell = function tablecell(content, flags) {
          var type = flags.header ? "th" : "td";
          var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
          return tag + content + ("</" + type + ">\n");
        };
        _proto.strong = function strong(text) {
          return "<strong>" + text + "</strong>";
        };
        _proto.em = function em(text) {
          return "<em>" + text + "</em>";
        };
        _proto.codespan = function codespan(text) {
          return "<code>" + text + "</code>";
        };
        _proto.br = function br() {
          return this.options.xhtml ? "<br/>" : "<br>";
        };
        _proto.del = function del(text) {
          return "<del>" + text + "</del>";
        };
        _proto.link = function link(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<a href="' + href + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += ">" + text + "</a>";
          return out;
        };
        _proto.image = function image(href, title, text) {
          href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
          if (href === null) {
            return text;
          }
          var out = '<img src="' + href + '" alt="' + text + '"';
          if (title) {
            out += ' title="' + title + '"';
          }
          out += this.options.xhtml ? "/>" : ">";
          return out;
        };
        _proto.text = function text(_text) {
          return _text;
        };
        return Renderer2;
      })();
      var TextRenderer = /* @__PURE__ */ (function() {
        function TextRenderer2() {
        }
        var _proto = TextRenderer2.prototype;
        _proto.strong = function strong(text) {
          return text;
        };
        _proto.em = function em(text) {
          return text;
        };
        _proto.codespan = function codespan(text) {
          return text;
        };
        _proto.del = function del(text) {
          return text;
        };
        _proto.html = function html(text) {
          return text;
        };
        _proto.text = function text(_text) {
          return _text;
        };
        _proto.link = function link(href, title, text) {
          return "" + text;
        };
        _proto.image = function image(href, title, text) {
          return "" + text;
        };
        _proto.br = function br() {
          return "";
        };
        return TextRenderer2;
      })();
      var Slugger = /* @__PURE__ */ (function() {
        function Slugger2() {
          this.seen = {};
        }
        var _proto = Slugger2.prototype;
        _proto.serialize = function serialize(value) {
          return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
        };
        _proto.getNextSafeSlug = function getNextSafeSlug(originalSlug, isDryRun) {
          var slug = originalSlug;
          var occurenceAccumulator = 0;
          if (this.seen.hasOwnProperty(slug)) {
            occurenceAccumulator = this.seen[originalSlug];
            do {
              occurenceAccumulator++;
              slug = originalSlug + "-" + occurenceAccumulator;
            } while (this.seen.hasOwnProperty(slug));
          }
          if (!isDryRun) {
            this.seen[originalSlug] = occurenceAccumulator;
            this.seen[slug] = 0;
          }
          return slug;
        };
        _proto.slug = function slug(value, options2) {
          if (options2 === void 0) {
            options2 = {};
          }
          var slug2 = this.serialize(value);
          return this.getNextSafeSlug(slug2, options2.dryrun);
        };
        return Slugger2;
      })();
      var Parser = /* @__PURE__ */ (function() {
        function Parser2(options2) {
          this.options = options2 || exports.defaults;
          this.options.renderer = this.options.renderer || new Renderer();
          this.renderer = this.options.renderer;
          this.renderer.options = this.options;
          this.textRenderer = new TextRenderer();
          this.slugger = new Slugger();
        }
        Parser2.parse = function parse3(tokens, options2) {
          var parser2 = new Parser2(options2);
          return parser2.parse(tokens);
        };
        Parser2.parseInline = function parseInline3(tokens, options2) {
          var parser2 = new Parser2(options2);
          return parser2.parseInline(tokens);
        };
        var _proto = Parser2.prototype;
        _proto.parse = function parse3(tokens, top) {
          if (top === void 0) {
            top = true;
          }
          var out = "", i, j, k, l2, l3, row, cell2, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
          var l = tokens.length;
          for (i = 0; i < l; i++) {
            token = tokens[i];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
              ret = this.options.extensions.renderers[token.type].call({
                parser: this
              }, token);
              if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
                out += ret || "";
                continue;
              }
            }
            switch (token.type) {
              case "space": {
                continue;
              }
              case "hr": {
                out += this.renderer.hr();
                continue;
              }
              case "heading": {
                out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
                continue;
              }
              case "code": {
                out += this.renderer.code(token.text, token.lang, token.escaped);
                continue;
              }
              case "table": {
                header = "";
                cell2 = "";
                l2 = token.header.length;
                for (j = 0; j < l2; j++) {
                  cell2 += this.renderer.tablecell(this.parseInline(token.header[j].tokens), {
                    header: true,
                    align: token.align[j]
                  });
                }
                header += this.renderer.tablerow(cell2);
                body = "";
                l2 = token.rows.length;
                for (j = 0; j < l2; j++) {
                  row = token.rows[j];
                  cell2 = "";
                  l3 = row.length;
                  for (k = 0; k < l3; k++) {
                    cell2 += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                      header: false,
                      align: token.align[k]
                    });
                  }
                  body += this.renderer.tablerow(cell2);
                }
                out += this.renderer.table(header, body);
                continue;
              }
              case "blockquote": {
                body = this.parse(token.tokens);
                out += this.renderer.blockquote(body);
                continue;
              }
              case "list": {
                ordered = token.ordered;
                start = token.start;
                loose = token.loose;
                l2 = token.items.length;
                body = "";
                for (j = 0; j < l2; j++) {
                  item = token.items[j];
                  checked = item.checked;
                  task = item.task;
                  itemBody = "";
                  if (item.task) {
                    checkbox = this.renderer.checkbox(checked);
                    if (loose) {
                      if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                        item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                          item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                        }
                      } else {
                        item.tokens.unshift({
                          type: "text",
                          text: checkbox
                        });
                      }
                    } else {
                      itemBody += checkbox;
                    }
                  }
                  itemBody += this.parse(item.tokens, loose);
                  body += this.renderer.listitem(itemBody, task, checked);
                }
                out += this.renderer.list(body, ordered, start);
                continue;
              }
              case "html": {
                out += this.renderer.html(token.text);
                continue;
              }
              case "paragraph": {
                out += this.renderer.paragraph(this.parseInline(token.tokens));
                continue;
              }
              case "text": {
                body = token.tokens ? this.parseInline(token.tokens) : token.text;
                while (i + 1 < l && tokens[i + 1].type === "text") {
                  token = tokens[++i];
                  body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
                }
                out += top ? this.renderer.paragraph(body) : body;
                continue;
              }
              default: {
                var errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
            }
          }
          return out;
        };
        _proto.parseInline = function parseInline3(tokens, renderer) {
          renderer = renderer || this.renderer;
          var out = "", i, token, ret;
          var l = tokens.length;
          for (i = 0; i < l; i++) {
            token = tokens[i];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
              ret = this.options.extensions.renderers[token.type].call({
                parser: this
              }, token);
              if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
                out += ret || "";
                continue;
              }
            }
            switch (token.type) {
              case "escape": {
                out += renderer.text(token.text);
                break;
              }
              case "html": {
                out += renderer.html(token.text);
                break;
              }
              case "link": {
                out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
                break;
              }
              case "image": {
                out += renderer.image(token.href, token.title, token.text);
                break;
              }
              case "strong": {
                out += renderer.strong(this.parseInline(token.tokens, renderer));
                break;
              }
              case "em": {
                out += renderer.em(this.parseInline(token.tokens, renderer));
                break;
              }
              case "codespan": {
                out += renderer.codespan(token.text);
                break;
              }
              case "br": {
                out += renderer.br();
                break;
              }
              case "del": {
                out += renderer.del(this.parseInline(token.tokens, renderer));
                break;
              }
              case "text": {
                out += renderer.text(token.text);
                break;
              }
              default: {
                var errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return;
                } else {
                  throw new Error(errMsg);
                }
              }
            }
          }
          return out;
        };
        return Parser2;
      })();
      var Hooks = /* @__PURE__ */ (function() {
        function Hooks2(options2) {
          this.options = options2 || exports.defaults;
        }
        var _proto = Hooks2.prototype;
        _proto.preprocess = function preprocess(markdown) {
          return markdown;
        };
        _proto.postprocess = function postprocess(html) {
          return html;
        };
        return Hooks2;
      })();
      Hooks.passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess"]);
      function onError(silent, async, callback) {
        return function(e) {
          e.message += "\nPlease report this to https://github.com/markedjs/marked.";
          if (silent) {
            var msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
            if (async) {
              return Promise.resolve(msg);
            }
            if (callback) {
              callback(null, msg);
              return;
            }
            return msg;
          }
          if (async) {
            return Promise.reject(e);
          }
          if (callback) {
            callback(e);
            return;
          }
          throw e;
        };
      }
      function parseMarkdown(lexer2, parser2) {
        return function(src, opt, callback) {
          if (typeof opt === "function") {
            callback = opt;
            opt = null;
          }
          var origOpt = _extends({}, opt);
          opt = _extends({}, marked.defaults, origOpt);
          var throwError = onError(opt.silent, opt.async, callback);
          if (typeof src === "undefined" || src === null) {
            return throwError(new Error("marked(): input parameter is undefined or null"));
          }
          if (typeof src !== "string") {
            return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
          }
          checkSanitizeDeprecation(opt);
          if (opt.hooks) {
            opt.hooks.options = opt;
          }
          if (callback) {
            var highlight = opt.highlight;
            var tokens;
            try {
              if (opt.hooks) {
                src = opt.hooks.preprocess(src);
              }
              tokens = lexer2(src, opt);
            } catch (e) {
              return throwError(e);
            }
            var done = function done2(err) {
              var out;
              if (!err) {
                try {
                  if (opt.walkTokens) {
                    marked.walkTokens(tokens, opt.walkTokens);
                  }
                  out = parser2(tokens, opt);
                  if (opt.hooks) {
                    out = opt.hooks.postprocess(out);
                  }
                } catch (e) {
                  err = e;
                }
              }
              opt.highlight = highlight;
              return err ? throwError(err) : callback(null, out);
            };
            if (!highlight || highlight.length < 3) {
              return done();
            }
            delete opt.highlight;
            if (!tokens.length) return done();
            var pending = 0;
            marked.walkTokens(tokens, function(token) {
              if (token.type === "code") {
                pending++;
                setTimeout(function() {
                  highlight(token.text, token.lang, function(err, code) {
                    if (err) {
                      return done(err);
                    }
                    if (code != null && code !== token.text) {
                      token.text = code;
                      token.escaped = true;
                    }
                    pending--;
                    if (pending === 0) {
                      done();
                    }
                  });
                }, 0);
              }
            });
            if (pending === 0) {
              done();
            }
            return;
          }
          if (opt.async) {
            return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then(function(src2) {
              return lexer2(src2, opt);
            }).then(function(tokens2) {
              return opt.walkTokens ? Promise.all(marked.walkTokens(tokens2, opt.walkTokens)).then(function() {
                return tokens2;
              }) : tokens2;
            }).then(function(tokens2) {
              return parser2(tokens2, opt);
            }).then(function(html2) {
              return opt.hooks ? opt.hooks.postprocess(html2) : html2;
            })["catch"](throwError);
          }
          try {
            if (opt.hooks) {
              src = opt.hooks.preprocess(src);
            }
            var _tokens = lexer2(src, opt);
            if (opt.walkTokens) {
              marked.walkTokens(_tokens, opt.walkTokens);
            }
            var html = parser2(_tokens, opt);
            if (opt.hooks) {
              html = opt.hooks.postprocess(html);
            }
            return html;
          } catch (e) {
            return throwError(e);
          }
        };
      }
      function marked(src, opt, callback) {
        return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
      }
      marked.options = marked.setOptions = function(opt) {
        marked.defaults = _extends({}, marked.defaults, opt);
        changeDefaults(marked.defaults);
        return marked;
      };
      marked.getDefaults = getDefaults;
      marked.defaults = exports.defaults;
      marked.use = function() {
        var extensions = marked.defaults.extensions || {
          renderers: {},
          childTokens: {}
        };
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        args.forEach(function(pack) {
          var opts = _extends({}, pack);
          opts.async = marked.defaults.async || opts.async || false;
          if (pack.extensions) {
            pack.extensions.forEach(function(ext) {
              if (!ext.name) {
                throw new Error("extension name required");
              }
              if (ext.renderer) {
                var prevRenderer = extensions.renderers[ext.name];
                if (prevRenderer) {
                  extensions.renderers[ext.name] = function() {
                    for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      args2[_key2] = arguments[_key2];
                    }
                    var ret = ext.renderer.apply(this, args2);
                    if (ret === false) {
                      ret = prevRenderer.apply(this, args2);
                    }
                    return ret;
                  };
                } else {
                  extensions.renderers[ext.name] = ext.renderer;
                }
              }
              if (ext.tokenizer) {
                if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                  throw new Error("extension level must be 'block' or 'inline'");
                }
                if (extensions[ext.level]) {
                  extensions[ext.level].unshift(ext.tokenizer);
                } else {
                  extensions[ext.level] = [ext.tokenizer];
                }
                if (ext.start) {
                  if (ext.level === "block") {
                    if (extensions.startBlock) {
                      extensions.startBlock.push(ext.start);
                    } else {
                      extensions.startBlock = [ext.start];
                    }
                  } else if (ext.level === "inline") {
                    if (extensions.startInline) {
                      extensions.startInline.push(ext.start);
                    } else {
                      extensions.startInline = [ext.start];
                    }
                  }
                }
              }
              if (ext.childTokens) {
                extensions.childTokens[ext.name] = ext.childTokens;
              }
            });
            opts.extensions = extensions;
          }
          if (pack.renderer) {
            (function() {
              var renderer = marked.defaults.renderer || new Renderer();
              var _loop = function _loop2(prop2) {
                var prevRenderer = renderer[prop2];
                renderer[prop2] = function() {
                  for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args2[_key3] = arguments[_key3];
                  }
                  var ret = pack.renderer[prop2].apply(renderer, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(renderer, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.renderer) {
                _loop(prop);
              }
              opts.renderer = renderer;
            })();
          }
          if (pack.tokenizer) {
            (function() {
              var tokenizer = marked.defaults.tokenizer || new Tokenizer();
              var _loop2 = function _loop22(prop2) {
                var prevTokenizer = tokenizer[prop2];
                tokenizer[prop2] = function() {
                  for (var _len4 = arguments.length, args2 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args2[_key4] = arguments[_key4];
                  }
                  var ret = pack.tokenizer[prop2].apply(tokenizer, args2);
                  if (ret === false) {
                    ret = prevTokenizer.apply(tokenizer, args2);
                  }
                  return ret;
                };
              };
              for (var prop in pack.tokenizer) {
                _loop2(prop);
              }
              opts.tokenizer = tokenizer;
            })();
          }
          if (pack.hooks) {
            (function() {
              var hooks = marked.defaults.hooks || new Hooks();
              var _loop3 = function _loop32(prop2) {
                var prevHook = hooks[prop2];
                if (Hooks.passThroughHooks.has(prop2)) {
                  hooks[prop2] = function(arg) {
                    if (marked.defaults.async) {
                      return Promise.resolve(pack.hooks[prop2].call(hooks, arg)).then(function(ret2) {
                        return prevHook.call(hooks, ret2);
                      });
                    }
                    var ret = pack.hooks[prop2].call(hooks, arg);
                    return prevHook.call(hooks, ret);
                  };
                } else {
                  hooks[prop2] = function() {
                    for (var _len5 = arguments.length, args2 = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                      args2[_key5] = arguments[_key5];
                    }
                    var ret = pack.hooks[prop2].apply(hooks, args2);
                    if (ret === false) {
                      ret = prevHook.apply(hooks, args2);
                    }
                    return ret;
                  };
                }
              };
              for (var prop in pack.hooks) {
                _loop3(prop);
              }
              opts.hooks = hooks;
            })();
          }
          if (pack.walkTokens) {
            var _walkTokens = marked.defaults.walkTokens;
            opts.walkTokens = function(token) {
              var values = [];
              values.push(pack.walkTokens.call(this, token));
              if (_walkTokens) {
                values = values.concat(_walkTokens.call(this, token));
              }
              return values;
            };
          }
          marked.setOptions(opts);
        });
      };
      marked.walkTokens = function(tokens, callback) {
        var values = [];
        var _loop4 = function _loop42() {
          var token = _step.value;
          values = values.concat(callback.call(marked, token));
          switch (token.type) {
            case "table": {
              for (var _iterator2 = _createForOfIteratorHelperLoose(token.header), _step2; !(_step2 = _iterator2()).done; ) {
                var cell2 = _step2.value;
                values = values.concat(marked.walkTokens(cell2.tokens, callback));
              }
              for (var _iterator3 = _createForOfIteratorHelperLoose(token.rows), _step3; !(_step3 = _iterator3()).done; ) {
                var row = _step3.value;
                for (var _iterator4 = _createForOfIteratorHelperLoose(row), _step4; !(_step4 = _iterator4()).done; ) {
                  var _cell = _step4.value;
                  values = values.concat(marked.walkTokens(_cell.tokens, callback));
                }
              }
              break;
            }
            case "list": {
              values = values.concat(marked.walkTokens(token.items, callback));
              break;
            }
            default: {
              if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
                marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                  values = values.concat(marked.walkTokens(token[childTokens], callback));
                });
              } else if (token.tokens) {
                values = values.concat(marked.walkTokens(token.tokens, callback));
              }
            }
          }
        };
        for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done; ) {
          _loop4();
        }
        return values;
      };
      marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
      marked.Parser = Parser;
      marked.parser = Parser.parse;
      marked.Renderer = Renderer;
      marked.TextRenderer = TextRenderer;
      marked.Lexer = Lexer;
      marked.lexer = Lexer.lex;
      marked.Tokenizer = Tokenizer;
      marked.Slugger = Slugger;
      marked.Hooks = Hooks;
      marked.parse = marked;
      var options = marked.options;
      var setOptions = marked.setOptions;
      var use = marked.use;
      var walkTokens = marked.walkTokens;
      var parseInline2 = marked.parseInline;
      var parse2 = marked;
      var parser = Parser.parse;
      var lexer = Lexer.lex;
      exports.Hooks = Hooks;
      exports.Lexer = Lexer;
      exports.Parser = Parser;
      exports.Renderer = Renderer;
      exports.Slugger = Slugger;
      exports.TextRenderer = TextRenderer;
      exports.Tokenizer = Tokenizer;
      exports.getDefaults = getDefaults;
      exports.lexer = lexer;
      exports.marked = marked;
      exports.options = options;
      exports.parse = parse2;
      exports.parseInline = parseInline2;
      exports.parser = parser;
      exports.setOptions = setOptions;
      exports.use = use;
      exports.walkTokens = walkTokens;
    }
  });

  // node_modules/jira2md/index.js
  var require_jira2md = __commonJS({
    "node_modules/jira2md/index.js"(exports, module) {
      var { marked } = require_marked();
      marked.setOptions({ breaks: true, smartyPants: true });
      var J2M3 = class _J2M {
        /**
         * Converts a Markdown string into HTML (just a wrapper to Marked's parse method).
         *
         * @static
         * @param {string} str - String to convert from Markdown to HTML
         * @returns {string} The HTML result
         */
        static md_to_html(str) {
          return marked.parse(str);
        }
        /**
         * Converts a Jira Wiki string into HTML.
         *
         * @static
         * @param {string} str - String to convert from Jira Wiki syntax to HTML
         * @returns {string} The HTML result
         */
        static jira_to_html(str) {
          return marked.parse(_J2M.to_markdown(str));
        }
        /**
         * Converts a Jira Wiki string into Markdown.
         *
         * @static
         * @param {string} str - Jira Wiki string to convert to Markdown
         * @returns {string} The Markdown result
         */
        static to_markdown(str) {
          return str.replace(/^[ \t]*(\*+)\s+/gm, (match, stars) => {
            return `${Array(stars.length).join("  ")}* `;
          }).replace(/^[ \t]*(#+)\s+/gm, (match, nums) => {
            return `${Array(nums.length).join("   ")}1. `;
          }).replace(/^h([0-6])\.(.*)$/gm, (match, level, content) => {
            return Array(parseInt(level, 10) + 1).join("#") + content;
          }).replace(/\*(\S.*)\*/g, "**$1**").replace(/_(\S.*)_/g, "*$1*").replace(/\{\{([^}]+)\}\}/g, "`$1`").replace(/\+([^+]*)\+/g, "<ins>$1</ins>").replace(/\^([^^]*)\^/g, "<sup>$1</sup>").replace(/~([^~]*)~/g, "<sub>$1</sub>").replace(/(\s+)-(\S+.*?\S)-(\s+)/g, "$1~~$2~~$3").replace(
            /\{code(:([a-z]+))?([:|]?(title|borderStyle|borderColor|borderWidth|bgColor|titleBGColor)=.+?)*\}([^]*?)\n?\{code\}/gm,
            "```$2$5\n```"
          ).replace(/{noformat}/g, "```").replace(/\[([^|]+?)\]/g, "<$1>").replace(/!(.+)!/g, "![]($1)").replace(/\[(.+?)\|(.+?)\]/g, "[$1]($2)").replace(/^bq\.\s+/gm, "> ").replace(/\{color:[^}]+\}([^]*?)\{color\}/gm, "$1").replace(/\{panel:title=([^}]*)\}\n?([^]*?)\n?\{panel\}/gm, "\n| $1 |\n| --- |\n| $2 |").replace(/^[ \t]*((?:\|\|.*?)+\|\|)[ \t]*$/gm, (match, headers) => {
            const singleBarred = headers.replace(/\|\|/g, "|");
            return `
${singleBarred}
${singleBarred.replace(/\|[^|]+/g, "| --- ")}`;
          }).replace(/^[ \t]*\|/gm, "|");
        }
        /**
         * Converts a Markdown string into Jira Wiki syntax.
         *
         * @static
         * @param {string} str - Markdown string to convert to Jira Wiki syntax
         * @returns {string} The Jira Wiki syntax result
         */
        static to_jira(str) {
          const map = {
            // cite: '??',
            del: "-",
            ins: "+",
            sup: "^",
            sub: "~"
          };
          return str.replace(
            /^\n((?:\|.*?)+\|)[ \t]*\n((?:\|\s*?-{3,}\s*?)+\|)[ \t]*\n((?:(?:\|.*?)+\|[ \t]*\n)*)$/gm,
            (match, headerLine, separatorLine, rowstr) => {
              const headers = headerLine.match(/[^|]+(?=\|)/g);
              const separators = separatorLine.match(/[^|]+(?=\|)/g);
              if (headers.length !== separators.length) return match;
              const rows = rowstr.split("\n");
              if (rows.length === 2 && headers.length === 1)
                return `{panel:title=${headers[0].trim()}}
${rowstr.replace(/^\|(.*)[ \t]*\|/, "$1").trim()}
{panel}
`;
              return `||${headers.join("||")}||
${rowstr}`;
            }
          ).replace(/([*_]+)(\S.*?)\1/g, (match, wrapper, content) => {
            switch (wrapper.length) {
              case 1:
                return `_${content}_`;
              case 2:
                return `*${content}*`;
              case 3:
                return `_*${content}*_`;
              default:
                return wrapper + content + wrapper;
            }
          }).replace(/^([#]+)(.*?)$/gm, (match, level, content) => {
            return `h${level.length}.${content}`;
          }).replace(/^(.*?)\n([=-]+)$/gm, (match, content, level) => {
            return `h${level[0] === "=" ? 1 : 2}. ${content}`;
          }).replace(/^([ \t]*)\d+\.\s+/gm, (match, spaces) => {
            return `${Array(Math.floor(spaces.length / 3) + 1).fill("#").join("")} `;
          }).replace(/^([ \t]*)\*\s+/gm, (match, spaces) => {
            return `${Array(Math.floor(spaces.length / 2 + 1)).fill("*").join("")} `;
          }).replace(new RegExp(`<(${Object.keys(map).join("|")})>(.*?)</\\1>`, "g"), (match, from, content) => {
            const to = map[from];
            return to + content + to;
          }).replace(/(\s+)~~(.*?)~~(\s+)/g, "$1-$2-$3").replace(/```(.+\n)?((?:.|\n)*?)```/g, (match, synt, content) => {
            let code = "{code}";
            if (synt) {
              code = `{code:${synt.replace(/\n/g, "")}}
`;
            }
            return `${code}${content}{code}`;
          }).replace(/`([^`]+)`/g, "{{$1}}").replace(/!\[[^\]]*\]\(([^)]+)\)/g, "!$1!").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "[$1|$2]").replace(/<([^>]+)>/g, "[$1]").replace(/^>/gm, "bq.");
        }
      };
      module.exports = J2M3;
    }
  });

  // src/converter/index.js
  var index_exports = {};
  __export(index_exports, {
    J2M: () => J2M2,
    htmlToMarkdown: () => htmlToMarkdown,
    jiraToMarkdown: () => jiraToMarkdown,
    markdownToJira: () => markdownToJira
  });

  // node_modules/turndown/lib/turndown.browser.es.js
  function extend(destination) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) destination[key] = source[key];
      }
    }
    return destination;
  }
  function repeat(character, count) {
    return Array(count + 1).join(character);
  }
  function trimLeadingNewlines(string) {
    return string.replace(/^\n*/, "");
  }
  function trimTrailingNewlines(string) {
    var indexEnd = string.length;
    while (indexEnd > 0 && string[indexEnd - 1] === "\n") indexEnd--;
    return string.substring(0, indexEnd);
  }
  function trimNewlines(string) {
    return trimTrailingNewlines(trimLeadingNewlines(string));
  }
  var blockElements = ["ADDRESS", "ARTICLE", "ASIDE", "AUDIO", "BLOCKQUOTE", "BODY", "CANVAS", "CENTER", "DD", "DIR", "DIV", "DL", "DT", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "HGROUP", "HR", "HTML", "ISINDEX", "LI", "MAIN", "MENU", "NAV", "NOFRAMES", "NOSCRIPT", "OL", "OUTPUT", "P", "PRE", "SECTION", "TABLE", "TBODY", "TD", "TFOOT", "TH", "THEAD", "TR", "UL"];
  function isBlock(node) {
    return is(node, blockElements);
  }
  var voidElements = ["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "META", "PARAM", "SOURCE", "TRACK", "WBR"];
  function isVoid(node) {
    return is(node, voidElements);
  }
  function hasVoid(node) {
    return has(node, voidElements);
  }
  var meaningfulWhenBlankElements = ["A", "TABLE", "THEAD", "TBODY", "TFOOT", "TH", "TD", "IFRAME", "SCRIPT", "AUDIO", "VIDEO"];
  function isMeaningfulWhenBlank(node) {
    return is(node, meaningfulWhenBlankElements);
  }
  function hasMeaningfulWhenBlank(node) {
    return has(node, meaningfulWhenBlankElements);
  }
  function is(node, tagNames) {
    return tagNames.indexOf(node.nodeName) >= 0;
  }
  function has(node, tagNames) {
    return node.getElementsByTagName && tagNames.some(function(tagName) {
      return node.getElementsByTagName(tagName).length;
    });
  }
  var markdownEscapes = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
  function escapeMarkdown(string) {
    return markdownEscapes.reduce(function(accumulator, escape) {
      return accumulator.replace(escape[0], escape[1]);
    }, string);
  }
  var rules = {};
  rules.paragraph = {
    filter: "p",
    replacement: function(content) {
      return "\n\n" + content + "\n\n";
    }
  };
  rules.lineBreak = {
    filter: "br",
    replacement: function(content, node, options) {
      return options.br + "\n";
    }
  };
  rules.heading = {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    replacement: function(content, node, options) {
      var hLevel = Number(node.nodeName.charAt(1));
      if (options.headingStyle === "setext" && hLevel < 3) {
        var underline = repeat(hLevel === 1 ? "=" : "-", content.length);
        return "\n\n" + content + "\n" + underline + "\n\n";
      } else {
        return "\n\n" + repeat("#", hLevel) + " " + content + "\n\n";
      }
    }
  };
  rules.blockquote = {
    filter: "blockquote",
    replacement: function(content) {
      content = trimNewlines(content).replace(/^/gm, "> ");
      return "\n\n" + content + "\n\n";
    }
  };
  rules.list = {
    filter: ["ul", "ol"],
    replacement: function(content, node) {
      var parent = node.parentNode;
      if (parent.nodeName === "LI" && parent.lastElementChild === node) {
        return "\n" + content;
      } else {
        return "\n\n" + content + "\n\n";
      }
    }
  };
  rules.listItem = {
    filter: "li",
    replacement: function(content, node, options) {
      var prefix = options.bulletListMarker + "   ";
      var parent = node.parentNode;
      if (parent.nodeName === "OL") {
        var start = parent.getAttribute("start");
        var index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + ".  ";
      }
      var isParagraph = /\n$/.test(content);
      content = trimNewlines(content) + (isParagraph ? "\n" : "");
      content = content.replace(/\n/gm, "\n" + " ".repeat(prefix.length));
      return prefix + content + (node.nextSibling ? "\n" : "");
    }
  };
  rules.indentedCodeBlock = {
    filter: function(node, options) {
      return options.codeBlockStyle === "indented" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
    },
    replacement: function(content, node, options) {
      return "\n\n    " + node.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
    }
  };
  rules.fencedCodeBlock = {
    filter: function(node, options) {
      return options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE";
    },
    replacement: function(content, node, options) {
      var className = node.firstChild.getAttribute("class") || "";
      var language = (className.match(/language-(\S+)/) || [null, ""])[1];
      var code = node.firstChild.textContent;
      var fenceChar = options.fence.charAt(0);
      var fenceSize = 3;
      var fenceInCodeRegex = new RegExp("^" + fenceChar + "{3,}", "gm");
      var match;
      while (match = fenceInCodeRegex.exec(code)) {
        if (match[0].length >= fenceSize) {
          fenceSize = match[0].length + 1;
        }
      }
      var fence = repeat(fenceChar, fenceSize);
      return "\n\n" + fence + language + "\n" + code.replace(/\n$/, "") + "\n" + fence + "\n\n";
    }
  };
  rules.horizontalRule = {
    filter: "hr",
    replacement: function(content, node, options) {
      return "\n\n" + options.hr + "\n\n";
    }
  };
  rules.inlineLink = {
    filter: function(node, options) {
      return options.linkStyle === "inlined" && node.nodeName === "A" && node.getAttribute("href");
    },
    replacement: function(content, node) {
      var href = escapeLinkDestination(node.getAttribute("href"));
      var title = escapeLinkTitle(cleanAttribute(node.getAttribute("title")));
      var titlePart = title ? ' "' + title + '"' : "";
      return "[" + content + "](" + href + titlePart + ")";
    }
  };
  rules.referenceLink = {
    filter: function(node, options) {
      return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
    },
    replacement: function(content, node, options) {
      var href = escapeLinkDestination(node.getAttribute("href"));
      var title = cleanAttribute(node.getAttribute("title"));
      if (title) title = ' "' + escapeLinkTitle(title) + '"';
      var replacement;
      var reference;
      switch (options.linkReferenceStyle) {
        case "collapsed":
          replacement = "[" + content + "][]";
          reference = "[" + content + "]: " + href + title;
          break;
        case "shortcut":
          replacement = "[" + content + "]";
          reference = "[" + content + "]: " + href + title;
          break;
        default:
          var id = this.references.length + 1;
          replacement = "[" + content + "][" + id + "]";
          reference = "[" + id + "]: " + href + title;
      }
      this.references.push(reference);
      return replacement;
    },
    references: [],
    append: function(options) {
      var references = "";
      if (this.references.length) {
        references = "\n\n" + this.references.join("\n") + "\n\n";
        this.references = [];
      }
      return references;
    }
  };
  rules.emphasis = {
    filter: ["em", "i"],
    replacement: function(content, node, options) {
      if (!content.trim()) return "";
      return options.emDelimiter + content + options.emDelimiter;
    }
  };
  rules.strong = {
    filter: ["strong", "b"],
    replacement: function(content, node, options) {
      if (!content.trim()) return "";
      return options.strongDelimiter + content + options.strongDelimiter;
    }
  };
  rules.code = {
    filter: function(node) {
      var hasSiblings = node.previousSibling || node.nextSibling;
      var isCodeBlock = node.parentNode.nodeName === "PRE" && !hasSiblings;
      return node.nodeName === "CODE" && !isCodeBlock;
    },
    replacement: function(content) {
      if (!content) return "";
      content = content.replace(/\r?\n|\r/g, " ");
      var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? " " : "";
      var delimiter = "`";
      var matches = content.match(/`+/gm) || [];
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + "`";
      return delimiter + extraSpace + content + extraSpace + delimiter;
    }
  };
  rules.image = {
    filter: "img",
    replacement: function(content, node) {
      var alt = escapeMarkdown(cleanAttribute(node.getAttribute("alt")));
      var src = escapeLinkDestination(node.getAttribute("src") || "");
      var title = cleanAttribute(node.getAttribute("title"));
      var titlePart = title ? ' "' + escapeLinkTitle(title) + '"' : "";
      return src ? "![" + alt + "](" + src + titlePart + ")" : "";
    }
  };
  function cleanAttribute(attribute) {
    return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
  }
  function escapeLinkDestination(destination) {
    var escaped = destination.replace(/([<>()])/g, "\\$1");
    return escaped.indexOf(" ") >= 0 ? "<" + escaped + ">" : escaped;
  }
  function escapeLinkTitle(title) {
    return title.replace(/"/g, '\\"');
  }
  function Rules(options) {
    this.options = options;
    this._keep = [];
    this._remove = [];
    this.blankRule = {
      replacement: options.blankReplacement
    };
    this.keepReplacement = options.keepReplacement;
    this.defaultRule = {
      replacement: options.defaultReplacement
    };
    this.array = [];
    for (var key in options.rules) this.array.push(options.rules[key]);
  }
  Rules.prototype = {
    add: function(key, rule) {
      this.array.unshift(rule);
    },
    keep: function(filter) {
      this._keep.unshift({
        filter,
        replacement: this.keepReplacement
      });
    },
    remove: function(filter) {
      this._remove.unshift({
        filter,
        replacement: function() {
          return "";
        }
      });
    },
    forNode: function(node) {
      if (node.isBlank) return this.blankRule;
      var rule;
      if (rule = findRule(this.array, node, this.options)) return rule;
      if (rule = findRule(this._keep, node, this.options)) return rule;
      if (rule = findRule(this._remove, node, this.options)) return rule;
      return this.defaultRule;
    },
    forEach: function(fn) {
      for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
    }
  };
  function findRule(rules3, node, options) {
    for (var i = 0; i < rules3.length; i++) {
      var rule = rules3[i];
      if (filterValue(rule, node, options)) return rule;
    }
    return void 0;
  }
  function filterValue(rule, node, options) {
    var filter = rule.filter;
    if (typeof filter === "string") {
      if (filter === node.nodeName.toLowerCase()) return true;
    } else if (Array.isArray(filter)) {
      if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true;
    } else if (typeof filter === "function") {
      if (filter.call(rule, node, options)) return true;
    } else {
      throw new TypeError("`filter` needs to be a string, array, or function");
    }
  }
  function collapseWhitespace(options) {
    var element = options.element;
    var isBlock2 = options.isBlock;
    var isVoid2 = options.isVoid;
    var isPre = options.isPre || function(node2) {
      return node2.nodeName === "PRE";
    };
    if (!element.firstChild || isPre(element)) return;
    var prevText = null;
    var keepLeadingWs = false;
    var prev = null;
    var node = next(prev, element, isPre);
    while (node !== element) {
      if (node.nodeType === 3 || node.nodeType === 4) {
        var text = node.data.replace(/[ \r\n\t]+/g, " ");
        if ((!prevText || / $/.test(prevText.data)) && !keepLeadingWs && text[0] === " ") {
          text = text.substr(1);
        }
        if (!text) {
          node = remove(node);
          continue;
        }
        node.data = text;
        prevText = node;
      } else if (node.nodeType === 1) {
        if (isBlock2(node) || node.nodeName === "BR") {
          if (prevText) {
            prevText.data = prevText.data.replace(/ $/, "");
          }
          prevText = null;
          keepLeadingWs = false;
        } else if (isVoid2(node) || isPre(node)) {
          prevText = null;
          keepLeadingWs = true;
        } else if (prevText) {
          keepLeadingWs = false;
        }
      } else {
        node = remove(node);
        continue;
      }
      var nextNode = next(prev, node, isPre);
      prev = node;
      node = nextNode;
    }
    if (prevText) {
      prevText.data = prevText.data.replace(/ $/, "");
      if (!prevText.data) {
        remove(prevText);
      }
    }
  }
  function remove(node) {
    var next2 = node.nextSibling || node.parentNode;
    node.parentNode.removeChild(node);
    return next2;
  }
  function next(prev, current, isPre) {
    if (prev && prev.parentNode === current || isPre(current)) {
      return current.nextSibling || current.parentNode;
    }
    return current.firstChild || current.nextSibling || current.parentNode;
  }
  var root = typeof window !== "undefined" ? window : {};
  function canParseHTMLNatively() {
    var Parser = root.DOMParser;
    var canParse = false;
    try {
      if (new Parser().parseFromString("", "text/html")) {
        canParse = true;
      }
    } catch (e) {
    }
    return canParse;
  }
  function createHTMLParser() {
    var Parser = function() {
    };
    {
      if (shouldUseActiveX()) {
        Parser.prototype.parseFromString = function(string) {
          var doc = new window.ActiveXObject("htmlfile");
          doc.designMode = "on";
          doc.open();
          doc.write(string);
          doc.close();
          return doc;
        };
      } else {
        Parser.prototype.parseFromString = function(string) {
          var doc = document.implementation.createHTMLDocument("");
          doc.open();
          doc.write(string);
          doc.close();
          return doc;
        };
      }
    }
    return Parser;
  }
  function shouldUseActiveX() {
    var useActiveX = false;
    try {
      document.implementation.createHTMLDocument("").open();
    } catch (e) {
      if (root.ActiveXObject) useActiveX = true;
    }
    return useActiveX;
  }
  var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();
  function RootNode(input, options) {
    var root2;
    if (typeof input === "string") {
      var doc = htmlParser().parseFromString(
        // DOM parsers arrange elements in the <head> and <body>.
        // Wrapping in a custom element ensures elements are reliably arranged in
        // a single element.
        '<x-turndown id="turndown-root">' + input + "</x-turndown>",
        "text/html"
      );
      root2 = doc.getElementById("turndown-root");
    } else {
      root2 = input.cloneNode(true);
    }
    collapseWhitespace({
      element: root2,
      isBlock,
      isVoid,
      isPre: options.preformattedCode ? isPreOrCode : null
    });
    return root2;
  }
  var _htmlParser;
  function htmlParser() {
    _htmlParser = _htmlParser || new HTMLParser();
    return _htmlParser;
  }
  function isPreOrCode(node) {
    return node.nodeName === "PRE" || node.nodeName === "CODE";
  }
  function Node(node, options) {
    node.isBlock = isBlock(node);
    node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;
    node.isBlank = isBlank(node);
    node.flankingWhitespace = flankingWhitespace(node, options);
    return node;
  }
  function isBlank(node) {
    return !isVoid(node) && !isMeaningfulWhenBlank(node) && /^\s*$/i.test(node.textContent) && !hasVoid(node) && !hasMeaningfulWhenBlank(node);
  }
  function flankingWhitespace(node, options) {
    if (node.isBlock || options.preformattedCode && node.isCode) {
      return {
        leading: "",
        trailing: ""
      };
    }
    var edges = edgeWhitespace(node.textContent);
    if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
      edges.leading = edges.leadingNonAscii;
    }
    if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
      edges.trailing = edges.trailingNonAscii;
    }
    return {
      leading: edges.leading,
      trailing: edges.trailing
    };
  }
  function edgeWhitespace(string) {
    var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
    return {
      leading: m[1],
      // whole string for whitespace-only strings
      leadingAscii: m[2],
      leadingNonAscii: m[3],
      trailing: m[4],
      // empty for whitespace-only strings
      trailingNonAscii: m[5],
      trailingAscii: m[6]
    };
  }
  function isFlankedByWhitespace(side, node, options) {
    var sibling;
    var regExp;
    var isFlanked;
    if (side === "left") {
      sibling = node.previousSibling;
      regExp = / $/;
    } else {
      sibling = node.nextSibling;
      regExp = /^ /;
    }
    if (sibling) {
      if (sibling.nodeType === 3) {
        isFlanked = regExp.test(sibling.nodeValue);
      } else if (options.preformattedCode && sibling.nodeName === "CODE") {
        isFlanked = false;
      } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
        isFlanked = regExp.test(sibling.textContent);
      }
    }
    return isFlanked;
  }
  var reduce = Array.prototype.reduce;
  function TurndownService(options) {
    if (!(this instanceof TurndownService)) return new TurndownService(options);
    var defaults = {
      rules,
      headingStyle: "setext",
      hr: "* * *",
      bulletListMarker: "*",
      codeBlockStyle: "indented",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
      linkReferenceStyle: "full",
      br: "  ",
      preformattedCode: false,
      blankReplacement: function(content, node) {
        return node.isBlock ? "\n\n" : "";
      },
      keepReplacement: function(content, node) {
        return node.isBlock ? "\n\n" + node.outerHTML + "\n\n" : node.outerHTML;
      },
      defaultReplacement: function(content, node) {
        return node.isBlock ? "\n\n" + content + "\n\n" : content;
      }
    };
    this.options = extend({}, defaults, options);
    this.rules = new Rules(this.options);
  }
  TurndownService.prototype = {
    /**
     * The entry point for converting a string or DOM node to Markdown
     * @public
     * @param {String|HTMLElement} input The string or DOM node to convert
     * @returns A Markdown representation of the input
     * @type String
     */
    turndown: function(input) {
      if (!canConvert(input)) {
        throw new TypeError(input + " is not a string, or an element/document/fragment node.");
      }
      if (input === "") return "";
      var output = process.call(this, new RootNode(input, this.options));
      return postProcess.call(this, output);
    },
    /**
     * Add one or more plugins
     * @public
     * @param {Function|Array} plugin The plugin or array of plugins to add
     * @returns The Turndown instance for chaining
     * @type Object
     */
    use: function(plugin) {
      if (Array.isArray(plugin)) {
        for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
      } else if (typeof plugin === "function") {
        plugin(this);
      } else {
        throw new TypeError("plugin must be a Function or an Array of Functions");
      }
      return this;
    },
    /**
     * Adds a rule
     * @public
     * @param {String} key The unique key of the rule
     * @param {Object} rule The rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    addRule: function(key, rule) {
      this.rules.add(key, rule);
      return this;
    },
    /**
     * Keep a node (as HTML) that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    keep: function(filter) {
      this.rules.keep(filter);
      return this;
    },
    /**
     * Remove a node that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */
    remove: function(filter) {
      this.rules.remove(filter);
      return this;
    },
    /**
     * Escapes Markdown syntax
     * @public
     * @param {String} string The string to escape
     * @returns A string with Markdown syntax escaped
     * @type String
     */
    escape: function(string) {
      return escapeMarkdown(string);
    }
  };
  function process(parentNode) {
    var self = this;
    return reduce.call(parentNode.childNodes, function(output, node) {
      node = new Node(node, self.options);
      var replacement = "";
      if (node.nodeType === 3) {
        replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
      } else if (node.nodeType === 1) {
        replacement = replacementForNode.call(self, node);
      }
      return join(output, replacement);
    }, "");
  }
  function postProcess(output) {
    var self = this;
    this.rules.forEach(function(rule) {
      if (typeof rule.append === "function") {
        output = join(output, rule.append(self.options));
      }
    });
    return output.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
  }
  function replacementForNode(node) {
    var rule = this.rules.forNode(node);
    var content = process.call(this, node);
    var whitespace = node.flankingWhitespace;
    if (whitespace.leading || whitespace.trailing) content = content.trim();
    return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
  }
  function join(output, replacement) {
    var s1 = trimTrailingNewlines(output);
    var s2 = trimLeadingNewlines(replacement);
    var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
    var separator = "\n\n".substring(0, nls);
    return s1 + separator + s2;
  }
  function canConvert(input) {
    return input != null && (typeof input === "string" || input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11));
  }

  // node_modules/@truto/turndown-plugin-gfm/lib/index.js
  var highlightRegExp = /highlight-(?:(?:text|source)-)?([a-z0-9]+)/;
  function highlightedCodeBlock(turndownService) {
    turndownService.addRule("highlightedCodeBlock", {
      filter: function(node) {
        var firstChild = node.firstChild;
        return node.nodeName === "DIV" && highlightRegExp.test(node.className) && firstChild && firstChild.nodeName === "PRE";
      },
      replacement: function(content, node, options) {
        var className = node.className || "";
        var language = (className.match(highlightRegExp) || [null, ""])[1];
        return "\n\n" + options.fence + language + "\n" + node.firstChild.textContent + "\n" + options.fence + "\n\n";
      }
    });
  }
  function strikethrough(turndownService) {
    turndownService.addRule("strikethrough", {
      filter: ["del", "s", "strike"],
      replacement: function(content) {
        return "~~" + content + "~~";
      }
    });
  }
  var rules2 = {};
  function cleanCellContent(content) {
    if (!content) return "   ";
    let cleaned = content.trim().replace(/\s+/g, " ").replace(/\|/g, "\\|").replace(/\\/g, "\\\\").replace(/\n+/g, " ").replace(/\r+/g, " ");
    if (!cleaned || cleaned.match(/^\s*$/)) {
      return "   ";
    }
    if (cleaned.length < 3) {
      cleaned += " ".repeat(3 - cleaned.length);
    }
    return cleaned;
  }
  function cell(content, node, index) {
    if (index === null && node && node.parentNode) {
      index = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    }
    if (index === null) index = 0;
    var prefix = " ";
    if (index === 0) prefix = "| ";
    let cellContent = cleanCellContent(content);
    let colspan = 1;
    if (node && node.getAttribute) {
      colspan = parseInt(node.getAttribute("colspan") || "1", 10);
      if (isNaN(colspan) || colspan < 1) colspan = 1;
    }
    let result = prefix + cellContent + " |";
    for (let i = 1; i < colspan; i++) {
      result += "   |";
    }
    return result;
  }
  function isHeadingRow(tr) {
    if (!tr || !tr.parentNode) return false;
    var parentNode = tr.parentNode;
    if (parentNode.nodeName === "THEAD") return true;
    if (parentNode.firstChild === tr && (parentNode.nodeName === "TABLE" || parentNode.nodeName === "TBODY")) {
      var cellNodes = Array.prototype.filter.call(tr.childNodes, function(n) {
        return n.nodeType === 1;
      });
      if (cellNodes.length === 0) return false;
      return Array.prototype.every.call(cellNodes, function(n) {
        return n.nodeName === "TH";
      });
    }
    return false;
  }
  function getTableColCount(table) {
    if (!table || !table.rows) return 0;
    let maxCols = 0;
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      if (!row || !row.childNodes) continue;
      let colCount = 0;
      for (let j = 0; j < row.childNodes.length; j++) {
        const cell2 = row.childNodes[j];
        if (cell2.nodeType === 1 && (cell2.nodeName === "TD" || cell2.nodeName === "TH")) {
          const colspan = parseInt(cell2.getAttribute("colspan") || "1", 10);
          colCount += isNaN(colspan) ? 1 : Math.max(1, colspan);
        }
      }
      if (colCount > maxCols) maxCols = colCount;
    }
    return maxCols;
  }
  function shouldSkipTable(table) {
    if (!table) return true;
    if (!table.rows || table.rows.length === 0) return true;
    let contentCells = 0;
    let totalCells = 0;
    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      if (!row || !row.childNodes) continue;
      for (let j = 0; j < row.childNodes.length; j++) {
        const cell2 = row.childNodes[j];
        if (cell2.nodeType === 1 && (cell2.nodeName === "TD" || cell2.nodeName === "TH")) {
          totalCells++;
          if (cell2.textContent && cell2.textContent.trim()) {
            contentCells++;
          }
        }
      }
    }
    if (totalCells === 0) return true;
    if (totalCells === 1 && contentCells === 0) return true;
    return false;
  }
  rules2.tableCell = {
    filter: ["th", "td"],
    replacement: function(content, node) {
      return cell(content, node, null);
    }
  };
  rules2.tableRow = {
    filter: "tr",
    replacement: function(content, node) {
      if (!content || !content.trim()) return "";
      var borderCells = "";
      if (isHeadingRow(node)) {
        const table = node.closest("table");
        if (table) {
          const colCount = getTableColCount(table);
          if (colCount > 0) {
            for (var i = 0; i < colCount; i++) {
              const prefix = i === 0 ? "| " : " ";
              borderCells += prefix + "--- |";
            }
          }
        }
      }
      return "\n" + content + (borderCells ? "\n" + borderCells : "");
    }
  };
  rules2.table = {
    filter: "table",
    replacement: function(content, node) {
      if (shouldSkipTable(node)) {
        return "";
      }
      content = content.replace(/\n+/g, "\n").trim();
      if (!content) return "";
      const lines = content.split("\n").filter((line) => line.trim());
      if (lines.length === 0) return "";
      const hasHeaderSeparator = lines.length >= 2 && /\|\s*-+/.test(lines[1]);
      let result = lines.join("\n");
      if (!hasHeaderSeparator && lines.length >= 1) {
        const firstLine = lines[0];
        const colCount = (firstLine.match(/\|/g) || []).length - 1;
        if (colCount > 0) {
          let separator = "|";
          for (let i = 0; i < colCount; i++) {
            separator += " --- |";
          }
          const resultLines = [lines[0], separator, ...lines.slice(1)];
          result = resultLines.join("\n");
        }
      }
      return "\n\n" + result + "\n\n";
    }
  };
  rules2.tableSection = {
    filter: ["thead", "tbody", "tfoot"],
    replacement: function(content) {
      return content;
    }
  };
  rules2.tableCaption = {
    filter: ["caption"],
    replacement: function() {
      return "";
    }
  };
  rules2.tableColgroup = {
    filter: ["colgroup", "col"],
    replacement: function() {
      return "";
    }
  };
  function tables(turndownService) {
    for (var key in rules2) {
      turndownService.addRule(key, rules2[key]);
    }
  }
  function taskListItems(turndownService) {
    turndownService.addRule("taskListItems", {
      filter: function(node) {
        return node.type === "checkbox" && node.parentNode.nodeName === "LI";
      },
      replacement: function(content, node) {
        return (node.checked ? "[x]" : "[ ]") + " ";
      }
    });
  }
  function gfm(turndownService) {
    turndownService.use([
      highlightedCodeBlock,
      strikethrough,
      tables,
      taskListItems
    ]);
  }

  // src/converter/plugins/confluence-panels.js
  function confluencePanelsPlugin(turndownService) {
    turndownService.addRule("confluencePanel", {
      filter(node) {
        if (node.nodeName !== "DIV") return false;
        const cl = node.classList;
        return cl.contains("confluence-information-macro") || cl.contains("panel") || cl.contains("confluence-information-macro-information") || cl.contains("confluence-information-macro-warning") || cl.contains("confluence-information-macro-note") || cl.contains("confluence-information-macro-tip");
      },
      replacement(content, node) {
        const macroName = node.dataset?.macroName || node.getAttribute("data-macro-name") || detectPanelType(node);
        const label = macroName.toUpperCase();
        const body = content.trim().replace(/\n/g, "\n> ");
        return `
> **${label}:** ${body}

`;
      }
    });
  }
  function detectPanelType(node) {
    const cl = node.classList;
    if (cl.contains("confluence-information-macro-warning")) return "warning";
    if (cl.contains("confluence-information-macro-note")) return "note";
    if (cl.contains("confluence-information-macro-tip")) return "tip";
    return "info";
  }

  // src/converter/plugins/confluence-code.js
  function confluenceCodePlugin(turndownService) {
    turndownService.addRule("confluenceCodePanel", {
      filter(node) {
        return node.nodeName === "DIV" && node.classList.contains("code") && node.classList.contains("panel");
      },
      replacement(_content, node) {
        const paramStr = node.querySelector(".code")?.dataset?.syntaxhighlighterParams || "";
        const lang = extractLang(paramStr);
        const codeEl = node.querySelector("pre");
        const code = codeEl ? codeEl.textContent : _content.trim();
        return `
\`\`\`${lang}
${code}
\`\`\`
`;
      }
    });
    turndownService.addRule("confluenceCloudCodeBlock", {
      filter(node) {
        return node.nodeName === "DIV" && (node.getAttribute("data-node-type") === "codeBlock" || node.classList.contains("code-block"));
      },
      replacement(_content, node) {
        const lang = node.getAttribute("data-language") || node.dataset?.language || "";
        const code = extractCodeText(node);
        return `
\`\`\`${lang}
${code}
\`\`\`
`;
      }
    });
    turndownService.addRule("confluenceCodeMacroTable", {
      filter(node) {
        if (node.nodeName !== "TABLE") return false;
        return node.getAttribute("data-macro-name") === "code" || node.classList.contains("wysiwyg-macro") && node.querySelector("pre");
      },
      replacement(_content, node) {
        const paramStr = node.getAttribute("data-macro-parameters") || node.getAttribute("data-syntaxhighlighter-params") || "";
        const lang = extractLang(paramStr);
        const pre = node.querySelector("pre");
        const code = pre ? pre.textContent : _content.trim();
        return `
\`\`\`${lang}
${code}
\`\`\`
`;
      }
    });
    turndownService.addRule("confluencePreBlock", {
      filter(node) {
        if (node.nodeName !== "PRE") return false;
        return !!(node.getAttribute("data-syntaxhighlighter-params") || node.className.match(/syntaxhighlighter/) || // Confluence Cloud: <pre> inside codeBlock wrapper (already handled by rule 2,
        // but catch standalone ones)
        node.parentElement?.getAttribute("data-node-type") === "codeBlock");
      },
      replacement(_content, node) {
        if (node.parentElement?.getAttribute("data-node-type") === "codeBlock") {
          return false;
        }
        const paramStr = node.getAttribute("data-syntaxhighlighter-params") || "";
        const lang = extractLang(paramStr);
        const code = node.textContent;
        return `
\`\`\`${lang}
${code}
\`\`\`
`;
      }
    });
    turndownService.addRule("preCodeWithSpans", {
      filter(node) {
        if (node.nodeName !== "PRE") return false;
        const code = node.querySelector("code");
        if (!code) return false;
        return code.children.length > 0;
      },
      replacement(_content, node) {
        const codeEl = node.querySelector("code");
        const lang = extractLangFromClass(codeEl.className) || extractLangFromClass(node.className) || "";
        const code = extractCodeText(node);
        return `
\`\`\`${lang}
${code}
\`\`\`
`;
      }
    });
  }
  function extractLang(paramStr) {
    const match = paramStr.match(/brush:\s*(\w+)/);
    return match ? normalizeLanguage(match[1]) : "";
  }
  function extractLangFromClass(className) {
    if (!className) return "";
    const match = className.match(/(?:language|lang|brush)-(\w+)/);
    return match ? normalizeLanguage(match[1]) : "";
  }
  function normalizeLanguage(lang) {
    const aliases = {
      js: "javascript",
      ts: "typescript",
      py: "python",
      rb: "ruby",
      sh: "bash",
      shell: "bash",
      yml: "yaml"
    };
    return aliases[lang.toLowerCase()] || lang.toLowerCase();
  }
  function extractCodeText(node) {
    const codeEl = node.querySelector("code") || node.querySelector("pre") || node;
    if (codeEl.children.length > 0) {
      let text = "";
      for (const child of codeEl.childNodes) {
        if (child.nodeType === 3) {
          text += child.textContent;
        } else if (child.nodeName === "BR") {
          text += "\n";
        } else if (child.nodeName === "SPAN" || child.nodeName === "DIV") {
          text += child.textContent;
          if (child.nodeName === "DIV") {
            text += "\n";
          }
        } else {
          text += child.textContent;
        }
      }
      return text.replace(/\n$/, "");
    }
    return codeEl.textContent;
  }

  // src/converter/plugins/confluence-tables.js
  function confluenceTablesPlugin(turndownService) {
    turndownService.addRule("confluenceTable", {
      filter(node) {
        if (node.nodeName !== "TABLE") return false;
        if (!node.rows || node.rows.length === 0) return false;
        const wrapper = node.closest(".pm-table-sticky-wrapper");
        if (wrapper) return false;
        return true;
      },
      replacement(_content, node) {
        const rows = extractRows(node);
        if (rows.length === 0) return "";
        let headerRow = null;
        let bodyRows = rows;
        if (rows.length > 0 && rows[0].isHeader) {
          headerRow = rows[0];
          bodyRows = rows.slice(1);
        }
        if (!headerRow && bodyRows.length > 0) {
          headerRow = bodyRows[0];
          bodyRows = bodyRows.slice(1);
        }
        if (!headerRow) return "";
        const colCount = Math.max(
          headerRow.cells.length,
          ...bodyRows.map((r) => r.cells.length)
        );
        if (colCount === 0) return "";
        const padRow = (cells) => {
          while (cells.length < colCount) cells.push("");
          return cells;
        };
        const lines = [];
        const hCells = padRow([...headerRow.cells]);
        lines.push("| " + hCells.join(" | ") + " |");
        lines.push("| " + hCells.map(() => "---").join(" | ") + " |");
        for (const row of bodyRows) {
          const bCells = padRow([...row.cells]);
          lines.push("| " + bCells.join(" | ") + " |");
        }
        return "\n\n" + lines.join("\n") + "\n\n";
      }
    });
    turndownService.addRule("confluenceTableSection", {
      filter: ["thead", "tbody", "tfoot"],
      replacement(content) {
        return content;
      }
    });
    turndownService.addRule("confluenceStickyHeader", {
      filter(node) {
        if (node.nodeName !== "DIV") return false;
        return node.classList?.contains("pm-table-sticky-wrapper") || node.classList?.contains("pm-table-container") && node.classList?.contains("is-sticky");
      },
      replacement() {
        return "";
      }
    });
  }
  function extractRows(table) {
    const rows = [];
    for (const tr of table.rows) {
      const cells = [];
      let isHeader = false;
      let thCount = 0;
      let cellCount = 0;
      for (const child of tr.childNodes) {
        if (child.nodeType !== 1) continue;
        if (child.nodeName !== "TD" && child.nodeName !== "TH") continue;
        cellCount++;
        if (child.nodeName === "TH") thCount++;
        const text = cleanCellContent2(child);
        cells.push(text);
      }
      if (cellCount > 0 && thCount === cellCount) isHeader = true;
      if (tr.parentNode?.nodeName === "THEAD") isHeader = true;
      if (cells.length > 0) {
        rows.push({ cells, isHeader });
      }
    }
    return rows;
  }
  function cleanCellContent2(cell2) {
    const imgs = cell2.querySelectorAll("img");
    if (imgs.length > 0) {
      const parts = [];
      for (const img of imgs) {
        const alt = img.getAttribute("alt") || "";
        const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
        if (src) parts.push(`![${alt}](${src})`);
      }
      const textOnly = extractNonImageText(cell2);
      if (textOnly) parts.unshift(textOnly);
      return parts.join(" ").replace(/\n/g, " ").replace(/\s+/g, " ").trim().replace(/\|/g, "\\|");
    }
    let text = "";
    for (const child of cell2.childNodes) {
      text += processNode(child);
    }
    return text.replace(/\n/g, " ").replace(/\s+/g, " ").trim().replace(/\|/g, "\\|");
  }
  function extractNonImageText(cell2) {
    const clone = cell2.cloneNode(true);
    const removeSelectors = [
      "img",
      '[data-node-type="mediaSingle"]',
      '[data-node-type="media"]',
      "figure",
      // sorting icons in headers
      "button",
      // "Open image-xxx" fallback buttons
      ".ak-renderer-tableHeader-sorting-icon",
      // sorting icon wrappers
      '[data-testid="media-badges"]'
      // media badge overlays
    ].join(", ");
    for (const el of clone.querySelectorAll(removeSelectors)) {
      el.remove();
    }
    const text = clone.textContent.replace(/Open (image|Screenshot)[^\n]*/g, "").trim();
    return text;
  }
  function processNode(child) {
    if (child.nodeType === 3) {
      return child.textContent;
    }
    if (child.nodeName === "FIGURE") return "";
    if (child.nodeName === "BUTTON") return "";
    if (child.getAttribute?.("data-testid") === "media-badges") return "";
    if (child.nodeName === "P") {
      return " " + cleanInlineContent(child);
    }
    if (child.nodeName === "BR") {
      return " ";
    }
    if (child.nodeName === "CODE") {
      return "`" + child.textContent + "`";
    }
    if (child.nodeName === "PRE") {
      return "`" + child.textContent.trim() + "`";
    }
    if (child.nodeName === "A") {
      const img = child.querySelector("img");
      if (img) {
        const alt = img.getAttribute("alt") || "";
        const src = img.getAttribute("src") || img.getAttribute("data-src") || "";
        return src ? `![${alt}](${src})` : "";
      }
      const href = child.getAttribute("href") || "";
      const linkText = child.textContent.trim();
      return href ? `[${linkText}](${href})` : linkText;
    }
    if (child.nodeName === "STRONG" || child.nodeName === "B") {
      return "**" + child.textContent + "**";
    }
    if (child.nodeName === "EM" || child.nodeName === "I") {
      return "*" + child.textContent + "*";
    }
    if (child.nodeName === "IMG") {
      const alt = child.getAttribute("alt") || "";
      const src = child.getAttribute("src") || child.getAttribute("data-src") || "";
      return `![${alt}](${src})`;
    }
    return cleanInlineContent(child);
  }
  function cleanInlineContent(el) {
    let text = "";
    for (const child of el.childNodes) {
      if (child.nodeType === 3) {
        text += child.textContent;
      } else if (child.nodeName === "CODE") {
        text += "`" + child.textContent + "`";
      } else if (child.nodeName === "A") {
        const href = child.getAttribute("href") || "";
        const linkText = child.textContent.trim();
        text += href ? `[${linkText}](${href})` : linkText;
      } else if (child.nodeName === "STRONG" || child.nodeName === "B") {
        text += "**" + child.textContent + "**";
      } else if (child.nodeName === "EM" || child.nodeName === "I") {
        text += "*" + child.textContent + "*";
      } else if (child.nodeName === "BR") {
        text += " ";
      } else if (child.nodeName === "IMG") {
        const alt = child.getAttribute("alt") || "";
        const src = child.getAttribute("src") || "";
        text += `![${alt}](${src})`;
      } else {
        text += child.textContent;
      }
    }
    return text;
  }

  // src/converter/plugins/confluence-mentions.js
  function confluenceMentionsPlugin(turndownService) {
    turndownService.addRule("confluenceMention", {
      filter(node) {
        return node.nodeName === "A" && (node.classList.contains("confluence-userlink") || node.dataset?.username != null);
      },
      replacement(_content, node) {
        const name = node.textContent.trim();
        return `@${name}`;
      }
    });
    turndownService.addRule("confluenceStatus", {
      filter(node) {
        return node.nodeName === "SPAN" && node.classList.contains("status-macro");
      },
      replacement(_content, node) {
        return `\`${node.textContent.trim()}\``;
      }
    });
  }

  // src/converter/plugins/jira-issues.js
  function jiraIssuesPlugin(turndownService) {
    turndownService.addRule("jiraIssueLink", {
      filter(node) {
        return node.nodeName === "A" && node.classList.contains("issue-link");
      },
      replacement(_content, node) {
        const key = node.dataset?.issueKey || node.textContent.trim();
        const href = node.getAttribute("href") || "";
        return `[${key}](${href})`;
      }
    });
    turndownService.addRule("jiraEmoticon", {
      filter(node) {
        return node.nodeName === "IMG" && node.classList.contains("emoticon");
      },
      replacement(_content, node) {
        return node.getAttribute("alt") || "";
      }
    });
  }

  // src/converter/plugins/base64-images.js
  function createBase64ImagesPlugin(imageBase64Map) {
    return function base64ImagesPlugin(turndownService) {
      turndownService.addRule("base64Images", {
        filter: "img",
        replacement(_content, node) {
          const src = node.getAttribute("src") || "";
          const alt = node.getAttribute("alt") || "";
          const resolvedSrc = imageBase64Map.get(src) || src;
          return `![${alt}](${resolvedSrc})`;
        }
      });
    };
  }

  // src/converter/strategies/markdown.js
  var MarkdownStrategy = class {
    /** @type {string} */
    get name() {
      return "markdown";
    }
    /**
     * Convert HTML to Markdown.
     * @param {string} html
     * @param {Object} [options]
     * @param {Map<string,string>} [options.imageBase64Map]
     * @param {Object} [options.metadata]
     * @returns {string}
     */
    convert(html, options = {}) {
      const { imageBase64Map, metadata } = options;
      const service = this._createService(imageBase64Map);
      let md = service.turndown(html);
      if (metadata && Object.keys(metadata).length > 0) {
        md = this._buildFrontMatter(metadata) + md;
      }
      return md;
    }
    /**
     * Create and configure a Turndown instance with all plugins.
     * @private
     */
    _createService(imageBase64Map) {
      const service = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
        emDelimiter: "*"
      });
      service.use(gfm);
      service.use(confluencePanelsPlugin);
      service.use(confluenceCodePlugin);
      service.use(confluenceTablesPlugin);
      service.use(confluenceMentionsPlugin);
      service.use(jiraIssuesPlugin);
      if (imageBase64Map && imageBase64Map.size > 0) {
        service.use(createBase64ImagesPlugin(imageBase64Map));
      }
      return service;
    }
    /**
     * Build YAML front matter from metadata object.
     * @private
     */
    _buildFrontMatter(metadata) {
      const entries = Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n");
      return `---
${entries}
---

`;
    }
  };

  // src/converter/strategies/jira.js
  var import_jira2md = __toESM(require_jira2md());

  // src/converter/pipeline/parser.js
  function parse(source) {
    const lines = source.replace(/\r\n/g, "\n").split("\n");
    const root2 = { type: "document", children: [] };
    let cursor = 0;
    while (cursor < lines.length) {
      const result = parseBlock(lines, cursor);
      if (result.node) root2.children.push(result.node);
      cursor = result.next;
    }
    return root2;
  }
  function parseBlock(lines, cursor) {
    const line = lines[cursor];
    if (line.trim() === "") {
      return { node: null, next: cursor + 1 };
    }
    if (/^```(\w*)/.test(line)) {
      return parseFencedCode(lines, cursor);
    }
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      return {
        node: {
          type: "heading",
          props: { level: headingMatch[1].length },
          children: parseInline(headingMatch[2])
        },
        next: cursor + 1
      };
    }
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      return { node: { type: "hr" }, next: cursor + 1 };
    }
    if (/^>\s?/.test(line)) {
      return parseBlockquote(lines, cursor);
    }
    if (cursor + 1 < lines.length && /^\|.*\|$/.test(line.trim()) && /^\|[\s:]*-{3,}/.test(lines[cursor + 1].trim())) {
      return parseTable(lines, cursor);
    }
    if (/^\s*(?:[-*+]|\d+\.)\s/.test(line)) {
      return parseList(lines, cursor);
    }
    return parseParagraph(lines, cursor);
  }
  function parseFencedCode(lines, cursor) {
    const openMatch = lines[cursor].match(/^```(\w*)/);
    const lang = openMatch ? openMatch[1] : "";
    const codeLines = [];
    let i = cursor + 1;
    while (i < lines.length && !lines[i].startsWith("```")) {
      codeLines.push(lines[i]);
      i++;
    }
    if (i < lines.length) i++;
    return {
      node: {
        type: "codeBlock",
        props: { lang },
        value: codeLines.join("\n")
      },
      next: i
    };
  }
  function parseBlockquote(lines, cursor) {
    const quoteLines = [];
    let i = cursor;
    while (i < lines.length && /^>\s?/.test(lines[i])) {
      quoteLines.push(lines[i].replace(/^>\s?/, ""));
      i++;
    }
    const innerSource = quoteLines.join("\n");
    const innerAst = parse(innerSource);
    return {
      node: { type: "blockquote", children: innerAst.children },
      next: i
    };
  }
  function parseTable(lines, cursor) {
    const headerCells = splitTableRow(lines[cursor]);
    let i = cursor + 2;
    const bodyRows = [];
    while (i < lines.length && /^\|/.test(lines[i].trim())) {
      bodyRows.push(splitTableRow(lines[i]));
      i++;
    }
    return {
      node: {
        type: "table",
        props: { headers: headerCells },
        children: bodyRows.map((cells) => ({ type: "tableRow", props: { cells } }))
      },
      next: i
    };
  }
  function splitTableRow(line) {
    return line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  }
  function parseList(lines, cursor) {
    const items = [];
    let i = cursor;
    while (i < lines.length) {
      const itemMatch = lines[i].match(/^(\s*)([-*+]|\d+\.)\s+(.*)/);
      if (!itemMatch) break;
      const indent = itemMatch[1].replace(/\t/g, "    ").length;
      const marker = itemMatch[2];
      const ordered = /^\d+\.$/.test(marker);
      const content = itemMatch[3];
      const subLines = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextMatch = lines[j].match(/^(\s*)([-*+]|\d+\.)\s/);
        if (nextMatch) {
          const nextIndent = nextMatch[1].replace(/\t/g, "    ").length;
          if (nextIndent > indent) {
            subLines.push(lines[j]);
            j++;
            continue;
          }
          break;
        }
        if (lines[j].trim() === "" || /^\s{2,}/.test(lines[j])) {
          subLines.push(lines[j]);
          j++;
          continue;
        }
        break;
      }
      const item = {
        type: "listItem",
        props: { ordered, depth: Math.floor(indent / 2) },
        children: parseInline(content)
      };
      if (subLines.length > 0) {
        const dedented = subLines.map((l) => l.replace(new RegExp(`^\\s{${indent + 2}}`), ""));
        const subAst = parse(dedented.join("\n"));
        if (subAst.children.length > 0) {
          item.children = [...item.children, ...subAst.children];
        }
      }
      items.push(item);
      i = j;
    }
    const firstOrdered = items[0]?.props?.ordered;
    return {
      node: {
        type: "list",
        props: { ordered: firstOrdered },
        children: items
      },
      next: i
    };
  }
  function parseParagraph(lines, cursor) {
    const paraLines = [];
    let i = cursor;
    while (i < lines.length && lines[i].trim() !== "" && !isBlockStart(lines, i)) {
      paraLines.push(lines[i]);
      i++;
    }
    return {
      node: {
        type: "paragraph",
        children: parseInline(paraLines.join("\n"))
      },
      next: i
    };
  }
  function isBlockStart(lines, i) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) return true;
    if (/^```/.test(line)) return true;
    if (/^>\s/.test(line)) return true;
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) return true;
    if (/^\s*(?:[-*+]|\d+\.)\s/.test(line)) return true;
    if (/^\|.*\|$/.test(line.trim()) && i + 1 < lines.length && /^\|[\s:]*-{3,}/.test(lines[i + 1])) return true;
    return false;
  }
  function parseInline(text) {
    const nodes = [];
    let remaining = text;
    while (remaining.length > 0) {
      let matched = false;
      const boldItalic = remaining.match(/^\*{3}(.+?)\*{3}/);
      if (boldItalic) {
        nodes.push({ type: "boldItalic", children: parseInline(boldItalic[1]) });
        remaining = remaining.slice(boldItalic[0].length);
        matched = true;
        continue;
      }
      const bold = remaining.match(/^\*{2}(.+?)\*{2}/);
      if (bold) {
        nodes.push({ type: "bold", children: parseInline(bold[1]) });
        remaining = remaining.slice(bold[0].length);
        matched = true;
        continue;
      }
      const italic = remaining.match(/^\*([^*]+?)\*/);
      if (italic) {
        nodes.push({ type: "italic", children: parseInline(italic[1]) });
        remaining = remaining.slice(italic[0].length);
        matched = true;
        continue;
      }
      const strike = remaining.match(/^~~(.+?)~~/);
      if (strike) {
        nodes.push({ type: "strikethrough", value: strike[1] });
        remaining = remaining.slice(strike[0].length);
        matched = true;
        continue;
      }
      const inlineCode = remaining.match(/^`([^`]+)`/);
      if (inlineCode) {
        nodes.push({ type: "inlineCode", value: inlineCode[1] });
        remaining = remaining.slice(inlineCode[0].length);
        matched = true;
        continue;
      }
      const image = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (image) {
        nodes.push({ type: "image", props: { alt: image[1], src: image[2] } });
        remaining = remaining.slice(image[0].length);
        matched = true;
        continue;
      }
      const link = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (link) {
        nodes.push({ type: "link", props: { url: link[2] }, children: parseInline(link[1]) });
        remaining = remaining.slice(link[0].length);
        matched = true;
        continue;
      }
      if (!matched) {
        const nextSpecial = remaining.slice(1).search(/[*~`!\[]/);
        const end = nextSpecial === -1 ? remaining.length : nextSpecial + 1;
        nodes.push({ type: "text", value: remaining.slice(0, end) });
        remaining = remaining.slice(end);
      }
    }
    return nodes;
  }

  // src/converter/pipeline/transformer.js
  function walkAndTransform(ast, visitor) {
    const result = visitor(ast);
    if (!result) return null;
    if (result.children && Array.isArray(result.children)) {
      result.children = result.children.map((child) => walkAndTransform(child, visitor)).filter(Boolean);
    }
    return result;
  }
  function collapseBlankLines(node) {
    if (node.type === "document" && node.children) {
      const collapsed = [];
      let prevBlank = false;
      for (const child of node.children) {
        const isBlank2 = child.type === "paragraph" && child.children?.length === 1 && child.children[0].type === "text" && child.children[0].value?.trim() === "";
        if (isBlank2) {
          if (!prevBlank) collapsed.push(child);
          prevBlank = true;
        } else {
          collapsed.push(child);
          prevBlank = false;
        }
      }
      return { ...node, children: collapsed };
    }
    return node;
  }
  function normalizeListDepth(node, _parent, depth = 0) {
    if (node.type === "listItem") {
      return { ...node, props: { ...node.props, resolvedDepth: depth } };
    }
    if (node.type === "list" && node.children) {
      return {
        ...node,
        children: node.children.map((child) => normalizeListDepth(child, node, depth + 1))
      };
    }
    return node;
  }

  // src/converter/pipeline/emitter.js
  var emitters = {};
  function registerEmitter(nodeType, fn) {
    emitters[nodeType] = fn;
  }
  function emit(node, ctx = { listStack: [] }) {
    const fn = emitters[node.type];
    if (!fn) {
      if (node.children) return emitChildren(node, ctx);
      return node.value || "";
    }
    return fn(node, ctx);
  }
  function emitChildren(node, ctx) {
    if (!node.children) return "";
    return node.children.map((child) => emit(child, ctx)).join("");
  }
  registerEmitter("document", (node, ctx) => {
    return node.children.map((child) => emit(child, ctx)).join("\n");
  });
  registerEmitter("heading", (node, ctx) => {
    const level = node.props?.level || 1;
    const content = emitChildren(node, ctx);
    return `h${level}. ${content}
`;
  });
  registerEmitter("paragraph", (node, ctx) => {
    return emitChildren(node, ctx) + "\n";
  });
  registerEmitter("hr", () => "----\n");
  registerEmitter("codeBlock", (node) => {
    const lang = node.props?.lang;
    const tag = lang ? `{code:${lang}}` : "{code}";
    return `${tag}
${node.value}
{code}
`;
  });
  registerEmitter("blockquote", (node, ctx) => {
    const inner = node.children.map((child) => emit(child, ctx)).join("\n").trim();
    const lines = inner.split("\n");
    if (lines.length === 1) {
      return `bq. ${inner}
`;
    }
    return `{quote}
${inner}
{quote}
`;
  });
  registerEmitter("table", (node, ctx) => {
    const headers = node.props?.headers || [];
    const headerRow = `||${headers.join("||")}||`;
    const bodyRows = node.children.map((row) => {
      const cells = row.props?.cells || [];
      return `|${cells.join("|")}|`;
    }).join("\n");
    return `${headerRow}
${bodyRows}
`;
  });
  registerEmitter("list", (node, ctx) => {
    return node.children.map((child) => emit(child, ctx)).join("");
  });
  registerEmitter("listItem", (node, ctx) => {
    const ordered = node.props?.ordered;
    const depth = (node.props?.resolvedDepth || node.props?.depth || 0) + 1;
    const marker = ordered ? "#" : "*";
    const prefix = marker.repeat(depth);
    const inlineNodes = [];
    const blockNodes = [];
    for (const child of node.children || []) {
      if (child.type === "list") {
        blockNodes.push(child);
      } else {
        inlineNodes.push(child);
      }
    }
    const content = inlineNodes.map((c) => emit(c, ctx)).join("");
    let result = `${prefix} ${content}
`;
    for (const block of blockNodes) {
      result += emit(block, ctx);
    }
    return result;
  });
  registerEmitter("text", (node) => node.value || "");
  registerEmitter("bold", (node, ctx) => {
    return `*${emitChildren(node, ctx)}*`;
  });
  registerEmitter("italic", (node, ctx) => {
    return `_${emitChildren(node, ctx)}_`;
  });
  registerEmitter("boldItalic", (node, ctx) => {
    return `_*${emitChildren(node, ctx)}*_`;
  });
  registerEmitter("strikethrough", (node) => {
    return `-${node.value}-`;
  });
  registerEmitter("inlineCode", (node) => {
    return `{{${node.value}}}`;
  });
  registerEmitter("link", (node, ctx) => {
    const text = emitChildren(node, ctx);
    const url = node.props?.url || "";
    return `[${text}|${url}]`;
  });
  registerEmitter("image", (node) => {
    const src = node.props?.src || "";
    return `!${src}!`;
  });

  // src/converter/strategies/jira.js
  var JiraStrategy = class {
    /** @type {string} */
    get name() {
      return "jira";
    }
    /**
     * Convert Markdown to Jira wiki markup via AST pipeline.
     * Pipeline: parse → transform → emit
     * @param {string} markdown
     * @returns {string}
     */
    fromMarkdown(markdown) {
      let ast = parse(markdown);
      ast = walkAndTransform(ast, collapseBlankLines);
      ast = normalizeListDepth(ast);
      let result = emit(ast);
      result = this._postProcess(result);
      return result;
    }
    /**
     * Convert Jira wiki markup to Markdown.
     * Uses jira2md core with post-processing fixes.
     * @param {string} jiraMarkup
     * @returns {string}
     */
    toMarkdown(jiraMarkup) {
      let md = import_jira2md.default.to_markdown(jiraMarkup);
      md = md.replace(/^(#{1,6})(\S)/gm, "$1 $2");
      md = md.replace(/\|([^|\n]+)/g, (_match, cell2) => {
        return `| ${cell2.trim()} `;
      });
      return md;
    }
    /**
     * Access to J2M for HTML generation (used by Fill Jira feature).
     */
    get j2m() {
      return import_jira2md.default;
    }
    /** @private */
    _postProcess(jira) {
      jira = jira.replace(/^(h[1-6]\.)\s*(\S)/gm, "$1 $2");
      jira = jira.replace(/\n{3,}/g, "\n\n");
      jira = jira.replace(/[ \t]+$/gm, "");
      return jira.trim();
    }
  };

  // src/converter/index.js
  var markdownStrategy = new MarkdownStrategy();
  var jiraStrategy = new JiraStrategy();
  function htmlToMarkdown(html, options = {}) {
    return markdownStrategy.convert(html, options);
  }
  function jiraToMarkdown(jiraMarkup) {
    return jiraStrategy.toMarkdown(jiraMarkup);
  }
  function markdownToJira(markdown) {
    return jiraStrategy.fromMarkdown(markdown);
  }
  var J2M2 = jiraStrategy.j2m;
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmNqcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvamlyYTJtZC9pbmRleC5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90dXJuZG93bi9saWIvdHVybmRvd24uYnJvd3Nlci5lcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHRydXRvL3R1cm5kb3duLXBsdWdpbi1nZm0vc3JjL2hpZ2hsaWdodGVkLWNvZGUtYmxvY2suanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0B0cnV0by90dXJuZG93bi1wbHVnaW4tZ2ZtL3NyYy9zdHJpa2V0aHJvdWdoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFibGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFzay1saXN0LWl0ZW1zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvaW5kZXguanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtcGFuZWxzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLWNvZGUuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtdGFibGVzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLW1lbnRpb25zLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9qaXJhLWlzc3Vlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BsdWdpbnMvYmFzZTY0LWltYWdlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3N0cmF0ZWdpZXMvbWFya2Rvd24uanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9zdHJhdGVnaWVzL2ppcmEuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS9wYXJzZXIuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS90cmFuc2Zvcm1lci5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BpcGVsaW5lL2VtaXR0ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogbWFya2VkIHY0LjMuMCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAyMywgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZWRqcy9tYXJrZWRcbiAqL1xuXG4vKipcbiAqIERPIE5PVCBFRElUIFRISVMgRklMRVxuICogVGhlIGNvZGUgaW4gdGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBmcm9tIGZpbGVzIGluIC4vc3JjL1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7XG4gIHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAoaXQpIHJldHVybiAoaXQgPSBpdC5jYWxsKG8pKS5uZXh0LmJpbmQoaXQpO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKGl0KSBvID0gaXQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICB9O1xuICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdHMoKSB7XG4gIHJldHVybiB7XG4gICAgYXN5bmM6IGZhbHNlLFxuICAgIGJhc2VVcmw6IG51bGwsXG4gICAgYnJlYWtzOiBmYWxzZSxcbiAgICBleHRlbnNpb25zOiBudWxsLFxuICAgIGdmbTogdHJ1ZSxcbiAgICBoZWFkZXJJZHM6IHRydWUsXG4gICAgaGVhZGVyUHJlZml4OiAnJyxcbiAgICBoaWdobGlnaHQ6IG51bGwsXG4gICAgaG9va3M6IG51bGwsXG4gICAgbGFuZ1ByZWZpeDogJ2xhbmd1YWdlLScsXG4gICAgbWFuZ2xlOiB0cnVlLFxuICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICByZW5kZXJlcjogbnVsbCxcbiAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgc2FuaXRpemVyOiBudWxsLFxuICAgIHNpbGVudDogZmFsc2UsXG4gICAgc21hcnR5cGFudHM6IGZhbHNlLFxuICAgIHRva2VuaXplcjogbnVsbCxcbiAgICB3YWxrVG9rZW5zOiBudWxsLFxuICAgIHhodG1sOiBmYWxzZVxuICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0cyA9IGdldERlZmF1bHRzKCk7XG5mdW5jdGlvbiBjaGFuZ2VEZWZhdWx0cyhuZXdEZWZhdWx0cykge1xuICBleHBvcnRzLmRlZmF1bHRzID0gbmV3RGVmYXVsdHM7XG59XG5cbi8qKlxuICogSGVscGVyc1xuICovXG52YXIgZXNjYXBlVGVzdCA9IC9bJjw+XCInXS87XG52YXIgZXNjYXBlUmVwbGFjZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdC5zb3VyY2UsICdnJyk7XG52YXIgZXNjYXBlVGVzdE5vRW5jb2RlID0gL1s8PlwiJ118Jig/ISgjXFxkezEsN318I1tYeF1bYS1mQS1GMC05XXsxLDZ9fFxcdyspOykvO1xudmFyIGVzY2FwZVJlcGxhY2VOb0VuY29kZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdE5vRW5jb2RlLnNvdXJjZSwgJ2cnKTtcbnZhciBlc2NhcGVSZXBsYWNlbWVudHMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG52YXIgZ2V0RXNjYXBlUmVwbGFjZW1lbnQgPSBmdW5jdGlvbiBnZXRFc2NhcGVSZXBsYWNlbWVudChjaCkge1xuICByZXR1cm4gZXNjYXBlUmVwbGFjZW1lbnRzW2NoXTtcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIGlmIChlbmNvZGUpIHtcbiAgICBpZiAoZXNjYXBlVGVzdC50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2UsIGdldEVzY2FwZVJlcGxhY2VtZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGVzY2FwZVRlc3ROb0VuY29kZS50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2VOb0VuY29kZSwgZ2V0RXNjYXBlUmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaHRtbDtcbn1cbnZhciB1bmVzY2FwZVRlc3QgPSAvJigjKD86XFxkKyl8KD86I3hbMC05QS1GYS1mXSspfCg/OlxcdyspKTs/L2lnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgLy8gZXhwbGljaXRseSBtYXRjaCBkZWNpbWFsLCBoZXgsIGFuZCBuYW1lZCBIVE1MIGVudGl0aWVzXG4gIHJldHVybiBodG1sLnJlcGxhY2UodW5lc2NhcGVUZXN0LCBmdW5jdGlvbiAoXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKSA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cbnZhciBjYXJldCA9IC8oXnxbXlxcW10pXFxeL2c7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmcgfCBSZWdFeHB9IHJlZ2V4XG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0XG4gKi9cbmZ1bmN0aW9uIGVkaXQocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHR5cGVvZiByZWdleCA9PT0gJ3N0cmluZycgPyByZWdleCA6IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICB2YXIgb2JqID0ge1xuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UobmFtZSwgdmFsKSB7XG4gICAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKGNhcmV0LCAnJDEnKTtcbiAgICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIGdldFJlZ2V4OiBmdW5jdGlvbiBnZXRSZWdleCgpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIG9iajtcbn1cbnZhciBub25Xb3JkQW5kQ29sb25UZXN0ID0gL1teXFx3Ol0vZztcbnZhciBvcmlnaW5JbmRlcGVuZGVudFVybCA9IC9eJHxeW2Etel1bYS16MC05Ky4tXSo6fF5bPyNdL2k7XG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFufSBzYW5pdGl6ZVxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXJsKHNhbml0aXplLCBiYXNlLCBocmVmKSB7XG4gIGlmIChzYW5pdGl6ZSkge1xuICAgIHZhciBwcm90O1xuICAgIHRyeSB7XG4gICAgICBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKS5yZXBsYWNlKG5vbldvcmRBbmRDb2xvblRlc3QsICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCdkYXRhOicpID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYgKGJhc2UgJiYgIW9yaWdpbkluZGVwZW5kZW50VXJsLnRlc3QoaHJlZikpIHtcbiAgICBocmVmID0gcmVzb2x2ZVVybChiYXNlLCBocmVmKTtcbiAgfVxuICB0cnkge1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJTI1L2csICclJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cbnZhciBiYXNlVXJscyA9IHt9O1xudmFyIGp1c3REb21haW4gPSAvXlteOl0rOlxcLypbXi9dKiQvO1xudmFyIHByb3RvY29sID0gL14oW146XSs6KVtcXHNcXFNdKiQvO1xudmFyIGRvbWFpbiA9IC9eKFteOl0rOlxcLypbXi9dKilbXFxzXFxTXSokLztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVVybChiYXNlLCBocmVmKSB7XG4gIGlmICghYmFzZVVybHNbJyAnICsgYmFzZV0pIHtcbiAgICAvLyB3ZSBjYW4gaWdub3JlIGV2ZXJ5dGhpbmcgaW4gYmFzZSBhZnRlciB0aGUgbGFzdCBzbGFzaCBvZiBpdHMgcGF0aCBjb21wb25lbnQsXG4gICAgLy8gYnV0IHdlIG1pZ2h0IG5lZWQgdG8gYWRkIF90aGF0X1xuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tM1xuICAgIGlmIChqdXN0RG9tYWluLnRlc3QoYmFzZSkpIHtcbiAgICAgIGJhc2VVcmxzWycgJyArIGJhc2VdID0gYmFzZSArICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZVVybHNbJyAnICsgYmFzZV0gPSBydHJpbShiYXNlLCAnLycsIHRydWUpO1xuICAgIH1cbiAgfVxuICBiYXNlID0gYmFzZVVybHNbJyAnICsgYmFzZV07XG4gIHZhciByZWxhdGl2ZUJhc2UgPSBiYXNlLmluZGV4T2YoJzonKSA9PT0gLTE7XG4gIGlmIChocmVmLnN1YnN0cmluZygwLCAyKSA9PT0gJy8vJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKHByb3RvY29sLCAnJDEnKSArIGhyZWY7XG4gIH0gZWxzZSBpZiAoaHJlZi5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKGRvbWFpbiwgJyQxJykgKyBocmVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlICsgaHJlZjtcbiAgfVxufVxudmFyIG5vb3BUZXN0ID0ge1xuICBleGVjOiBmdW5jdGlvbiBub29wVGVzdCgpIHt9XG59O1xuZnVuY3Rpb24gc3BsaXRDZWxscyh0YWJsZVJvdywgY291bnQpIHtcbiAgLy8gZW5zdXJlIHRoYXQgZXZlcnkgY2VsbC1kZWxpbWl0aW5nIHBpcGUgaGFzIGEgc3BhY2VcbiAgLy8gYmVmb3JlIGl0IHRvIGRpc3Rpbmd1aXNoIGl0IGZyb20gYW4gZXNjYXBlZCBwaXBlXG4gIHZhciByb3cgPSB0YWJsZVJvdy5yZXBsYWNlKC9cXHwvZywgZnVuY3Rpb24gKG1hdGNoLCBvZmZzZXQsIHN0cikge1xuICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSxcbiAgICAgICAgY3VyciA9IG9mZnNldDtcbiAgICAgIHdoaWxlICgtLWN1cnIgPj0gMCAmJiBzdHJbY3Vycl0gPT09ICdcXFxcJykge1xuICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICAvLyBvZGQgbnVtYmVyIG9mIHNsYXNoZXMgbWVhbnMgfCBpcyBlc2NhcGVkXG4gICAgICAgIC8vIHNvIHdlIGxlYXZlIGl0IGFsb25lXG4gICAgICAgIHJldHVybiAnfCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgc3BhY2UgYmVmb3JlIHVuZXNjYXBlZCB8XG4gICAgICAgIHJldHVybiAnIHwnO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGNlbGxzID0gcm93LnNwbGl0KC8gXFx8Lyk7XG4gIHZhciBpID0gMDtcblxuICAvLyBGaXJzdC9sYXN0IGNlbGwgaW4gYSByb3cgY2Fubm90IGJlIGVtcHR5IGlmIGl0IGhhcyBubyBsZWFkaW5nL3RyYWlsaW5nIHBpcGVcbiAgaWYgKCFjZWxsc1swXS50cmltKCkpIHtcbiAgICBjZWxscy5zaGlmdCgpO1xuICB9XG4gIGlmIChjZWxscy5sZW5ndGggPiAwICYmICFjZWxsc1tjZWxscy5sZW5ndGggLSAxXS50cmltKCkpIHtcbiAgICBjZWxscy5wb3AoKTtcbiAgfVxuICBpZiAoY2VsbHMubGVuZ3RoID4gY291bnQpIHtcbiAgICBjZWxscy5zcGxpY2UoY291bnQpO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjZWxscy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgY2VsbHMucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGZvciAoOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBsZWFkaW5nIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgaXMgaWdub3JlZCBwZXIgdGhlIGdmbSBzcGVjXG4gICAgY2VsbHNbaV0gPSBjZWxsc1tpXS50cmltKCkucmVwbGFjZSgvXFxcXFxcfC9nLCAnfCcpO1xuICB9XG4gIHJldHVybiBjZWxscztcbn1cblxuLyoqXG4gKiBSZW1vdmUgdHJhaWxpbmcgJ2Mncy4gRXF1aXZhbGVudCB0byBzdHIucmVwbGFjZSgvYyokLywgJycpLlxuICogL2MqJC8gaXMgdnVsbmVyYWJsZSB0byBSRURPUy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge3N0cmluZ30gY1xuICogQHBhcmFtIHtib29sZWFufSBpbnZlcnQgUmVtb3ZlIHN1ZmZpeCBvZiBub24tYyBjaGFycyBpbnN0ZWFkLiBEZWZhdWx0IGZhbHNleS5cbiAqL1xuZnVuY3Rpb24gcnRyaW0oc3RyLCBjLCBpbnZlcnQpIHtcbiAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICBpZiAobCA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8vIExlbmd0aCBvZiBzdWZmaXggbWF0Y2hpbmcgdGhlIGludmVydCBjb25kaXRpb24uXG4gIHZhciBzdWZmTGVuID0gMDtcblxuICAvLyBTdGVwIGxlZnQgdW50aWwgd2UgZmFpbCB0byBtYXRjaCB0aGUgaW52ZXJ0IGNvbmRpdGlvbi5cbiAgd2hpbGUgKHN1ZmZMZW4gPCBsKSB7XG4gICAgdmFyIGN1cnJDaGFyID0gc3RyLmNoYXJBdChsIC0gc3VmZkxlbiAtIDEpO1xuICAgIGlmIChjdXJyQ2hhciA9PT0gYyAmJiAhaW52ZXJ0KSB7XG4gICAgICBzdWZmTGVuKys7XG4gICAgfSBlbHNlIGlmIChjdXJyQ2hhciAhPT0gYyAmJiBpbnZlcnQpIHtcbiAgICAgIHN1ZmZMZW4rKztcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgbCAtIHN1ZmZMZW4pO1xufVxuZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0KHN0ciwgYikge1xuICBpZiAoc3RyLmluZGV4T2YoYlsxXSkgPT09IC0xKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgdmFyIGxldmVsID0gMCxcbiAgICBpID0gMDtcbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxcXCcpIHtcbiAgICAgIGkrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlswXSkge1xuICAgICAgbGV2ZWwrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlsxXSkge1xuICAgICAgbGV2ZWwtLTtcbiAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbihvcHQpIHtcbiAgaWYgKG9wdCAmJiBvcHQuc2FuaXRpemUgJiYgIW9wdC5zaWxlbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ21hcmtlZCgpOiBzYW5pdGl6ZSBhbmQgc2FuaXRpemVyIHBhcmFtZXRlcnMgYXJlIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAwLjcuMCwgc2hvdWxkIG5vdCBiZSB1c2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS4gUmVhZCBtb3JlIGhlcmU6IGh0dHBzOi8vbWFya2VkLmpzLm9yZy8jL1VTSU5HX0FEVkFOQ0VELm1kI29wdGlvbnMnKTtcbiAgfVxufVxuXG4vLyBjb3BpZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTQ1MDExMy84MDY3Nzdcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICovXG5mdW5jdGlvbiByZXBlYXRTdHJpbmcocGF0dGVybiwgY291bnQpIHtcbiAgaWYgKGNvdW50IDwgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHdoaWxlIChjb3VudCA+IDEpIHtcbiAgICBpZiAoY291bnQgJiAxKSB7XG4gICAgICByZXN1bHQgKz0gcGF0dGVybjtcbiAgICB9XG4gICAgY291bnQgPj49IDE7XG4gICAgcGF0dGVybiArPSBwYXR0ZXJuO1xuICB9XG4gIHJldHVybiByZXN1bHQgKyBwYXR0ZXJuO1xufVxuXG5mdW5jdGlvbiBvdXRwdXRMaW5rKGNhcCwgbGluaywgcmF3LCBsZXhlcikge1xuICB2YXIgaHJlZiA9IGxpbmsuaHJlZjtcbiAgdmFyIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG4gIHZhciB0ZXh0ID0gY2FwWzFdLnJlcGxhY2UoL1xcXFwoW1xcW1xcXV0pL2csICckMScpO1xuICBpZiAoY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnKSB7XG4gICAgbGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICB2YXIgdG9rZW4gPSB7XG4gICAgICB0eXBlOiAnbGluaycsXG4gICAgICByYXc6IHJhdyxcbiAgICAgIGhyZWY6IGhyZWYsXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgdG9rZW5zOiBsZXhlci5pbmxpbmVUb2tlbnModGV4dClcbiAgICB9O1xuICAgIGxleGVyLnN0YXRlLmluTGluayA9IGZhbHNlO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbWFnZScsXG4gICAgcmF3OiByYXcsXG4gICAgaHJlZjogaHJlZixcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgdGV4dDogZXNjYXBlKHRleHQpXG4gIH07XG59XG5mdW5jdGlvbiBpbmRlbnRDb2RlQ29tcGVuc2F0aW9uKHJhdywgdGV4dCkge1xuICB2YXIgbWF0Y2hJbmRlbnRUb0NvZGUgPSByYXcubWF0Y2goL14oXFxzKykoPzpgYGApLyk7XG4gIGlmIChtYXRjaEluZGVudFRvQ29kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIHZhciBpbmRlbnRUb0NvZGUgPSBtYXRjaEluZGVudFRvQ29kZVsxXTtcbiAgcmV0dXJuIHRleHQuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBtYXRjaEluZGVudEluTm9kZSA9IG5vZGUubWF0Y2goL15cXHMrLyk7XG4gICAgaWYgKG1hdGNoSW5kZW50SW5Ob2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdmFyIGluZGVudEluTm9kZSA9IG1hdGNoSW5kZW50SW5Ob2RlWzBdO1xuICAgIGlmIChpbmRlbnRJbk5vZGUubGVuZ3RoID49IGluZGVudFRvQ29kZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBub2RlLnNsaWNlKGluZGVudFRvQ29kZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSkuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogVG9rZW5pemVyXG4gKi9cbnZhciBUb2tlbml6ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgZXhwb3J0cy5kZWZhdWx0cztcbiAgfVxuICB2YXIgX3Byb3RvID0gVG9rZW5pemVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNwYWNlID0gZnVuY3Rpb24gc3BhY2Uoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2submV3bGluZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCAmJiBjYXBbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3NwYWNlJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uY29kZSA9IGZ1bmN0aW9uIGNvZGUoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suY29kZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQgPSBjYXBbMF0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgY29kZUJsb2NrU3R5bGU6ICdpbmRlbnRlZCcsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWMgPyBydHJpbSh0ZXh0LCAnXFxuJykgOiB0ZXh0XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmZlbmNlcyA9IGZ1bmN0aW9uIGZlbmNlcyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5mZW5jZXMuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciByYXcgPSBjYXBbMF07XG4gICAgICB2YXIgdGV4dCA9IGluZGVudENvZGVDb21wZW5zYXRpb24ocmF3LCBjYXBbM10gfHwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgbGFuZzogY2FwWzJdID8gY2FwWzJdLnRyaW0oKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5oZWFkaW5nID0gZnVuY3Rpb24gaGVhZGluZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5oZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGV4dCA9IGNhcFsyXS50cmltKCk7XG5cbiAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyAjc1xuICAgICAgaWYgKC8jJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICB2YXIgdHJpbW1lZCA9IHJ0cmltKHRleHQsICcjJyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRyaW1tZWQgfHwgLyAkLy50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgLy8gQ29tbW9uTWFyayByZXF1aXJlcyBzcGFjZSBiZWZvcmUgdHJhaWxpbmcgI3NcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lKHRleHQpXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmhyID0gZnVuY3Rpb24gaHIoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suaHIuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdocicsXG4gICAgICAgIHJhdzogY2FwWzBdXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmJsb2NrcXVvdGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzBdLnJlcGxhY2UoL14gKj5bIFxcdF0/L2dtLCAnJyk7XG4gICAgICB2YXIgdG9wID0gdGhpcy5sZXhlci5zdGF0ZS50b3A7XG4gICAgICB0aGlzLmxleGVyLnN0YXRlLnRvcCA9IHRydWU7XG4gICAgICB2YXIgdG9rZW5zID0gdGhpcy5sZXhlci5ibG9ja1Rva2Vucyh0ZXh0KTtcbiAgICAgIHRoaXMubGV4ZXIuc3RhdGUudG9wID0gdG9wO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdG9rZW5zOiB0b2tlbnMsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3Qoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2subGlzdC5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHJhdywgaXN0YXNrLCBpc2NoZWNrZWQsIGluZGVudCwgaSwgYmxhbmtMaW5lLCBlbmRzV2l0aEJsYW5rTGluZSwgbGluZSwgbmV4dExpbmUsIHJhd0xpbmUsIGl0ZW1Db250ZW50cywgZW5kRWFybHk7XG4gICAgICB2YXIgYnVsbCA9IGNhcFsxXS50cmltKCk7XG4gICAgICB2YXIgaXNvcmRlcmVkID0gYnVsbC5sZW5ndGggPiAxO1xuICAgICAgdmFyIGxpc3QgPSB7XG4gICAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgICAgcmF3OiAnJyxcbiAgICAgICAgb3JkZXJlZDogaXNvcmRlcmVkLFxuICAgICAgICBzdGFydDogaXNvcmRlcmVkID8gK2J1bGwuc2xpY2UoMCwgLTEpIDogJycsXG4gICAgICAgIGxvb3NlOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgICB9O1xuICAgICAgYnVsbCA9IGlzb3JkZXJlZCA/IFwiXFxcXGR7MSw5fVxcXFxcIiArIGJ1bGwuc2xpY2UoLTEpIDogXCJcXFxcXCIgKyBidWxsO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICBidWxsID0gaXNvcmRlcmVkID8gYnVsbCA6ICdbKistXSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBuZXh0IGxpc3QgaXRlbVxuICAgICAgdmFyIGl0ZW1SZWdleCA9IG5ldyBSZWdFeHAoXCJeKCB7MCwzfVwiICsgYnVsbCArIFwiKSgoPzpbXFx0IF1bXlxcXFxuXSopPyg/OlxcXFxufCQpKVwiKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBidWxsZXQgcG9pbnQgY2FuIHN0YXJ0IGEgbmV3IExpc3QgSXRlbVxuICAgICAgd2hpbGUgKHNyYykge1xuICAgICAgICBlbmRFYXJseSA9IGZhbHNlO1xuICAgICAgICBpZiAoIShjYXAgPSBpdGVtUmVnZXguZXhlYyhzcmMpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJ1bGVzLmJsb2NrLmhyLnRlc3Qoc3JjKSkge1xuICAgICAgICAgIC8vIEVuZCBsaXN0IGlmIGJ1bGxldCB3YXMgYWN0dWFsbHkgSFIgKHBvc3NpYmx5IG1vdmUgaW50byBpdGVtUmVnZXg/KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJhdyA9IGNhcFswXTtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXcubGVuZ3RoKTtcbiAgICAgICAgbGluZSA9IGNhcFsyXS5zcGxpdCgnXFxuJywgMSlbMF0ucmVwbGFjZSgvXlxcdCsvLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiAnICcucmVwZWF0KDMgKiB0Lmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXh0TGluZSA9IHNyYy5zcGxpdCgnXFxuJywgMSlbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICBpbmRlbnQgPSAyO1xuICAgICAgICAgIGl0ZW1Db250ZW50cyA9IGxpbmUudHJpbUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRlbnQgPSBjYXBbMl0uc2VhcmNoKC9bXiBdLyk7IC8vIEZpbmQgZmlyc3Qgbm9uLXNwYWNlIGNoYXJcbiAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgPiA0ID8gMSA6IGluZGVudDsgLy8gVHJlYXQgaW5kZW50ZWQgY29kZSBibG9ja3MgKD4gNCBzcGFjZXMpIGFzIGhhdmluZyBvbmx5IDEgaW5kZW50XG4gICAgICAgICAgaXRlbUNvbnRlbnRzID0gbGluZS5zbGljZShpbmRlbnQpO1xuICAgICAgICAgIGluZGVudCArPSBjYXBbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJsYW5rTGluZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWxpbmUgJiYgL14gKiQvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgLy8gSXRlbXMgYmVnaW4gd2l0aCBhdCBtb3N0IG9uZSBibGFuayBsaW5lXG4gICAgICAgICAgcmF3ICs9IG5leHRMaW5lICsgJ1xcbic7XG4gICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhuZXh0TGluZS5sZW5ndGggKyAxKTtcbiAgICAgICAgICBlbmRFYXJseSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbmRFYXJseSkge1xuICAgICAgICAgIHZhciBuZXh0QnVsbGV0UmVnZXggPSBuZXcgUmVnRXhwKFwiXiB7MCxcIiArIE1hdGgubWluKDMsIGluZGVudCAtIDEpICsgXCJ9KD86WyorLV18XFxcXGR7MSw5fVsuKV0pKCg/OlsgXFx0XVteXFxcXG5dKik/KD86XFxcXG58JCkpXCIpO1xuICAgICAgICAgIHZhciBoclJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSgoPzotICopezMsfXwoPzpfICopezMsfXwoPzpcXFxcKiAqKXszLH0pKD86XFxcXG4rfCQpXCIpO1xuICAgICAgICAgIHZhciBmZW5jZXNCZWdpblJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSg/OmBgYHx+fn4pXCIpO1xuICAgICAgICAgIHZhciBoZWFkaW5nQmVnaW5SZWdleCA9IG5ldyBSZWdFeHAoXCJeIHswLFwiICsgTWF0aC5taW4oMywgaW5kZW50IC0gMSkgKyBcIn0jXCIpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgZm9sbG93aW5nIGxpbmVzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBMaXN0IEl0ZW1cbiAgICAgICAgICB3aGlsZSAoc3JjKSB7XG4gICAgICAgICAgICByYXdMaW5lID0gc3JjLnNwbGl0KCdcXG4nLCAxKVswXTtcbiAgICAgICAgICAgIG5leHRMaW5lID0gcmF3TGluZTtcblxuICAgICAgICAgICAgLy8gUmUtYWxpZ24gdG8gZm9sbG93IGNvbW1vbm1hcmsgbmVzdGluZyBydWxlc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAgICAgICBuZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL14gezEsNH0oPz0oIHs0fSkqW14gXSkvZywgJyAgJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgY29kZSBmZW5jZXNcbiAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbmQgbGlzdCBpdGVtIGlmIGZvdW5kIHN0YXJ0IG9mIG5ldyBoZWFkaW5nXG4gICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgc3RhcnQgb2YgbmV3IGJ1bGxldFxuICAgICAgICAgICAgaWYgKG5leHRCdWxsZXRSZWdleC50ZXN0KG5leHRMaW5lKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSG9yaXpvbnRhbCBydWxlIGZvdW5kXG4gICAgICAgICAgICBpZiAoaHJSZWdleC50ZXN0KHNyYykpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dExpbmUuc2VhcmNoKC9bXiBdLykgPj0gaW5kZW50IHx8ICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gRGVkZW50IGlmIHBvc3NpYmxlXG4gICAgICAgICAgICAgIGl0ZW1Db250ZW50cyArPSAnXFxuJyArIG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBub3QgZW5vdWdoIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgIGlmIChibGFua0xpbmUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIHBhcmFncmFwaCBjb250aW51YXRpb24gdW5sZXNzIGxhc3QgbGluZSB3YXMgYSBkaWZmZXJlbnQgYmxvY2sgbGV2ZWwgZWxlbWVudFxuICAgICAgICAgICAgICBpZiAobGluZS5zZWFyY2goL1teIF0vKSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gaW5kZW50ZWQgY29kZSBibG9ja1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChoclJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpdGVtQ29udGVudHMgKz0gJ1xcbicgKyBuZXh0TGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmxhbmtMaW5lICYmICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBsaW5lIGlzIGJsYW5rXG4gICAgICAgICAgICAgIGJsYW5rTGluZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXcgKz0gcmF3TGluZSArICdcXG4nO1xuICAgICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXdMaW5lLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgbGluZSA9IG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbGlzdC5sb29zZSkge1xuICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyBpdGVtIGVuZGVkIHdpdGggYSBibGFuayBsaW5lLCB0aGUgbGlzdCBpcyBsb29zZVxuICAgICAgICAgIGlmIChlbmRzV2l0aEJsYW5rTGluZSkge1xuICAgICAgICAgICAgbGlzdC5sb29zZSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXFxuICpcXG4gKiQvLnRlc3QocmF3KSkge1xuICAgICAgICAgICAgZW5kc1dpdGhCbGFua0xpbmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciB0YXNrIGxpc3QgaXRlbXNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICAgICAgICBpc3Rhc2sgPSAvXlxcW1sgeFhdXFxdIC8uZXhlYyhpdGVtQ29udGVudHMpO1xuICAgICAgICAgIGlmIChpc3Rhc2spIHtcbiAgICAgICAgICAgIGlzY2hlY2tlZCA9IGlzdGFza1swXSAhPT0gJ1sgXSAnO1xuICAgICAgICAgICAgaXRlbUNvbnRlbnRzID0gaXRlbUNvbnRlbnRzLnJlcGxhY2UoL15cXFtbIHhYXVxcXSArLywgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW0nLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRhc2s6ICEhaXN0YXNrLFxuICAgICAgICAgIGNoZWNrZWQ6IGlzY2hlY2tlZCxcbiAgICAgICAgICBsb29zZTogZmFsc2UsXG4gICAgICAgICAgdGV4dDogaXRlbUNvbnRlbnRzXG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0LnJhdyArPSByYXc7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIG5vdCBjb25zdW1lIG5ld2xpbmVzIGF0IGVuZCBvZiBmaW5hbCBpdGVtLiBBbHRlcm5hdGl2ZWx5LCBtYWtlIGl0ZW1SZWdleCAqc3RhcnQqIHdpdGggYW55IG5ld2xpbmVzIHRvIHNpbXBsaWZ5L3NwZWVkIHVwIGVuZHNXaXRoQmxhbmtMaW5lIGxvZ2ljXG4gICAgICBsaXN0Lml0ZW1zW2xpc3QuaXRlbXMubGVuZ3RoIC0gMV0ucmF3ID0gcmF3LnRyaW1SaWdodCgpO1xuICAgICAgbGlzdC5pdGVtc1tsaXN0Lml0ZW1zLmxlbmd0aCAtIDFdLnRleHQgPSBpdGVtQ29udGVudHMudHJpbVJpZ2h0KCk7XG4gICAgICBsaXN0LnJhdyA9IGxpc3QucmF3LnRyaW1SaWdodCgpO1xuICAgICAgdmFyIGwgPSBsaXN0Lml0ZW1zLmxlbmd0aDtcblxuICAgICAgLy8gSXRlbSBjaGlsZCB0b2tlbnMgaGFuZGxlZCBoZXJlIGF0IGVuZCBiZWNhdXNlIHdlIG5lZWRlZCB0byBoYXZlIHRoZSBmaW5hbCBpdGVtIHRvIHRyaW0gaXQgZmlyc3RcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS50b3AgPSBmYWxzZTtcbiAgICAgICAgbGlzdC5pdGVtc1tpXS50b2tlbnMgPSB0aGlzLmxleGVyLmJsb2NrVG9rZW5zKGxpc3QuaXRlbXNbaV0udGV4dCwgW10pO1xuICAgICAgICBpZiAoIWxpc3QubG9vc2UpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiBsaXN0IHNob3VsZCBiZSBsb29zZVxuICAgICAgICAgIHZhciBzcGFjZXJzID0gbGlzdC5pdGVtc1tpXS50b2tlbnMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC50eXBlID09PSAnc3BhY2UnO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBoYXNNdWx0aXBsZUxpbmVCcmVha3MgPSBzcGFjZXJzLmxlbmd0aCA+IDAgJiYgc3BhY2Vycy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gL1xcbi4qXFxuLy50ZXN0KHQucmF3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0Lmxvb3NlID0gaGFzTXVsdGlwbGVMaW5lQnJlYWtzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBhbGwgaXRlbXMgdG8gbG9vc2UgaWYgbGlzdCBpcyBsb29zZVxuICAgICAgaWYgKGxpc3QubG9vc2UpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGxpc3QuaXRlbXNbaV0ubG9vc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5odG1sLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6ICdodG1sJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHByZTogIXRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgJiYgKGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScpLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pO1xuICAgICAgICB0b2tlbi50eXBlID0gJ3BhcmFncmFwaCc7XG4gICAgICAgIHRva2VuLnRleHQgPSB0ZXh0O1xuICAgICAgICB0b2tlbi50b2tlbnMgPSB0aGlzLmxleGVyLmlubGluZSh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH07XG4gIF9wcm90by5kZWYgPSBmdW5jdGlvbiBkZWYoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suZGVmLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGFnID0gY2FwWzFdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgdmFyIGhyZWYgPSBjYXBbMl0gPyBjYXBbMl0ucmVwbGFjZSgvXjwoLiopPiQvLCAnJDEnKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6ICcnO1xuICAgICAgdmFyIHRpdGxlID0gY2FwWzNdID8gY2FwWzNdLnN1YnN0cmluZygxLCBjYXBbM10ubGVuZ3RoIC0gMSkucmVwbGFjZSh0aGlzLnJ1bGVzLmlubGluZS5fZXNjYXBlcywgJyQxJykgOiBjYXBbM107XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZGVmJyxcbiAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8udGFibGUgPSBmdW5jdGlvbiB0YWJsZShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50YWJsZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogc3BsaXRDZWxscyhjYXBbMV0pLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBjXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgcm93czogY2FwWzNdICYmIGNhcFszXS50cmltKCkgPyBjYXBbM10ucmVwbGFjZSgvXFxuWyBcXHRdKiQvLCAnJykuc3BsaXQoJ1xcbicpIDogW11cbiAgICAgIH07XG4gICAgICBpZiAoaXRlbS5oZWFkZXIubGVuZ3RoID09PSBpdGVtLmFsaWduLmxlbmd0aCkge1xuICAgICAgICBpdGVtLnJhdyA9IGNhcFswXTtcbiAgICAgICAgdmFyIGwgPSBpdGVtLmFsaWduLmxlbmd0aDtcbiAgICAgICAgdmFyIGksIGosIGssIHJvdztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbCA9IGl0ZW0ucm93cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpdGVtLnJvd3NbaV0gPSBzcGxpdENlbGxzKGl0ZW0ucm93c1tpXSwgaXRlbS5oZWFkZXIubGVuZ3RoKS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRleHQ6IGNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYXJzZSBjaGlsZCB0b2tlbnMgaW5zaWRlIGhlYWRlcnMgYW5kIGNlbGxzXG5cbiAgICAgICAgLy8gaGVhZGVyIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5oZWFkZXIubGVuZ3RoO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgaXRlbS5oZWFkZXJbal0udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUoaXRlbS5oZWFkZXJbal0udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjZWxsIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5yb3dzLmxlbmd0aDtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgIHJvdyA9IGl0ZW0ucm93c1tqXTtcbiAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcm93Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICByb3dba10udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUocm93W2tdLnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5saGVhZGluZyA9IGZ1bmN0aW9uIGxoZWFkaW5nKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmxoZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBkZXB0aDogY2FwWzJdLmNoYXJBdCgwKSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXSxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5wYXJhZ3JhcGguZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzFdLmNoYXJBdChjYXBbMV0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nID8gY2FwWzFdLnNsaWNlKDAsIC0xKSA6IGNhcFsxXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZSh0ZXh0KVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50ZXh0LmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMF0sXG4gICAgICAgIHRva2VuczogdGhpcy5sZXhlci5pbmxpbmUoY2FwWzBdKVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUkMShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUuZXNjYXBlLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXNjYXBlJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IGVzY2FwZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRhZyA9IGZ1bmN0aW9uIHRhZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUudGFnLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBpZiAoIXRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePChwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePFxcLyhwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemUgPyAndGV4dCcgOiAnaHRtbCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBpbkxpbms6IHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rLFxuICAgICAgICBpblJhd0Jsb2NrOiB0aGlzLmxleGVyLnN0YXRlLmluUmF3QmxvY2ssXG4gICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZSA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgPyB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKGNhcFswXSkgOiBlc2NhcGUoY2FwWzBdKSA6IGNhcFswXVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5saW5rID0gZnVuY3Rpb24gbGluayhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUubGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRyaW1tZWRVcmwgPSBjYXBbMl0udHJpbSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgL148Ly50ZXN0KHRyaW1tZWRVcmwpKSB7XG4gICAgICAgIC8vIGNvbW1vbm1hcmsgcmVxdWlyZXMgbWF0Y2hpbmcgYW5nbGUgYnJhY2tldHNcbiAgICAgICAgaWYgKCEvPiQvLnRlc3QodHJpbW1lZFVybCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmRpbmcgYW5nbGUgYnJhY2tldCBjYW5ub3QgYmUgZXNjYXBlZFxuICAgICAgICB2YXIgcnRyaW1TbGFzaCA9IHJ0cmltKHRyaW1tZWRVcmwuc2xpY2UoMCwgLTEpLCAnXFxcXCcpO1xuICAgICAgICBpZiAoKHRyaW1tZWRVcmwubGVuZ3RoIC0gcnRyaW1TbGFzaC5sZW5ndGgpICUgMiA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmluZCBjbG9zaW5nIHBhcmVudGhlc2lzXG4gICAgICAgIHZhciBsYXN0UGFyZW5JbmRleCA9IGZpbmRDbG9zaW5nQnJhY2tldChjYXBbMl0sICcoKScpO1xuICAgICAgICBpZiAobGFzdFBhcmVuSW5kZXggPiAtMSkge1xuICAgICAgICAgIHZhciBzdGFydCA9IGNhcFswXS5pbmRleE9mKCchJykgPT09IDAgPyA1IDogNDtcbiAgICAgICAgICB2YXIgbGlua0xlbiA9IHN0YXJ0ICsgY2FwWzFdLmxlbmd0aCArIGxhc3RQYXJlbkluZGV4O1xuICAgICAgICAgIGNhcFsyXSA9IGNhcFsyXS5zdWJzdHJpbmcoMCwgbGFzdFBhcmVuSW5kZXgpO1xuICAgICAgICAgIGNhcFswXSA9IGNhcFswXS5zdWJzdHJpbmcoMCwgbGlua0xlbikudHJpbSgpO1xuICAgICAgICAgIGNhcFszXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgaHJlZiA9IGNhcFsyXTtcbiAgICAgIHZhciB0aXRsZSA9ICcnO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAvLyBzcGxpdCBwZWRhbnRpYyBocmVmIGFuZCB0aXRsZVxuICAgICAgICB2YXIgbGluayA9IC9eKFteJ1wiXSpbXlxcc10pXFxzKyhbJ1wiXSkoLiopXFwyLy5leGVjKGhyZWYpO1xuICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgIGhyZWYgPSBsaW5rWzFdO1xuICAgICAgICAgIHRpdGxlID0gbGlua1szXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGl0bGUgPSBjYXBbM10gPyBjYXBbM10uc2xpY2UoMSwgLTEpIDogJyc7XG4gICAgICB9XG4gICAgICBocmVmID0gaHJlZi50cmltKCk7XG4gICAgICBpZiAoL148Ly50ZXN0KGhyZWYpKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgIS8+JC8udGVzdCh0cmltbWVkVXJsKSkge1xuICAgICAgICAgIC8vIHBlZGFudGljIGFsbG93cyBzdGFydGluZyBhbmdsZSBicmFja2V0IHdpdGhvdXQgZW5kaW5nIGFuZ2xlIGJyYWNrZXRcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBocmVmID8gaHJlZi5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGhyZWYsXG4gICAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlLnJlcGxhY2UodGhpcy5ydWxlcy5pbmxpbmUuX2VzY2FwZXMsICckMScpIDogdGl0bGVcbiAgICAgIH0sIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ucmVmbGluayA9IGZ1bmN0aW9uIHJlZmxpbmsoc3JjLCBsaW5rcykge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5yZWZsaW5rLmV4ZWMoc3JjKSkgfHwgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICB2YXIgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gbGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluaykge1xuICAgICAgICB2YXIgdGV4dCA9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0TGluayhjYXAsIGxpbmssIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZW1TdHJvbmcgPSBmdW5jdGlvbiBlbVN0cm9uZyhzcmMsIG1hc2tlZFNyYywgcHJldkNoYXIpIHtcbiAgICBpZiAocHJldkNoYXIgPT09IHZvaWQgMCkge1xuICAgICAgcHJldkNoYXIgPSAnJztcbiAgICB9XG4gICAgdmFyIG1hdGNoID0gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcubERlbGltLmV4ZWMoc3JjKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAvLyBfIGNhbid0IGJlIGJldHdlZW4gdHdvIGFscGhhbnVtZXJpY3MuIFxccHtMfVxccHtOfSBpbmNsdWRlcyBub24tZW5nbGlzaCBhbHBoYWJldC9udW1iZXJzIGFzIHdlbGxcbiAgICBpZiAobWF0Y2hbM10gJiYgcHJldkNoYXIubWF0Y2goLyg/OlswLTlBLVphLXpcXHhBQVxceEIyXFx4QjNcXHhCNVxceEI5XFx4QkFcXHhCQy1cXHhCRVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYwLVxcdTA1ODhcXHUwNUQwLVxcdTA1RUFcXHUwNUVGLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjYwLVxcdTA2NjlcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUUtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3QzAtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4NjAtXFx1MDg2QVxcdTA4NzAtXFx1MDg4N1xcdTA4ODktXFx1MDg4RVxcdTA4QTAtXFx1MDhDOVxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk2Ni1cXHUwOTZGXFx1MDk3MS1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RTYtXFx1MDlGMVxcdTA5RjQtXFx1MDlGOVxcdTA5RkNcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTY2LVxcdTBBNkZcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQUU2LVxcdTBBRUZcXHUwQUY5XFx1MEIwNS1cXHUwQjBDXFx1MEIwRlxcdTBCMTBcXHUwQjEzLVxcdTBCMjhcXHUwQjJBLVxcdTBCMzBcXHUwQjMyXFx1MEIzM1xcdTBCMzUtXFx1MEIzOVxcdTBCM0RcXHUwQjVDXFx1MEI1RFxcdTBCNUYtXFx1MEI2MVxcdTBCNjYtXFx1MEI2RlxcdTBCNzEtXFx1MEI3N1xcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBCRTYtXFx1MEJGMlxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4LVxcdTBDNUFcXHUwQzVEXFx1MEM2MFxcdTBDNjFcXHUwQzY2LVxcdTBDNkZcXHUwQzc4LVxcdTBDN0VcXHUwQzgwXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDRERcXHUwQ0RFXFx1MENFMFxcdTBDRTFcXHUwQ0U2LVxcdTBDRUZcXHUwQ0YxXFx1MENGMlxcdTBEMDQtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0RcXHUwRDRFXFx1MEQ1NC1cXHUwRDU2XFx1MEQ1OC1cXHUwRDYxXFx1MEQ2Ni1cXHUwRDc4XFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBERTYtXFx1MERFRlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ2XFx1MEU1MC1cXHUwRTU5XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4Ni1cXHUwRThBXFx1MEU4Qy1cXHUwRUEzXFx1MEVBNVxcdTBFQTctXFx1MEVCMFxcdTBFQjJcXHUwRUIzXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYyMC1cXHUwRjMzXFx1MEY0MC1cXHUwRjQ3XFx1MEY0OS1cXHUwRjZDXFx1MEY4OC1cXHUwRjhDXFx1MTAwMC1cXHUxMDJBXFx1MTAzRi1cXHUxMDQ5XFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwOTAtXFx1MTA5OVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzY5LVxcdTEzN0NcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MTFcXHUxNzFGLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE3RTAtXFx1MTdFOVxcdTE3RjAtXFx1MTdGOVxcdTE4MTAtXFx1MTgxOVxcdTE4MjAtXFx1MTg3OFxcdTE4ODAtXFx1MTg4NFxcdTE4ODctXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTQ2LVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxOUQwLVxcdTE5REFcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQTgwLVxcdTFBODlcXHUxQTkwLVxcdTFBOTlcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRDXFx1MUI1MC1cXHUxQjU5XFx1MUI4My1cXHUxQkEwXFx1MUJBRS1cXHUxQkU1XFx1MUMwMC1cXHUxQzIzXFx1MUM0MC1cXHUxQzQ5XFx1MUM0RC1cXHUxQzdEXFx1MUM4MC1cXHUxQzg4XFx1MUM5MC1cXHUxQ0JBXFx1MUNCRC1cXHUxQ0JGXFx1MUNFOS1cXHUxQ0VDXFx1MUNFRS1cXHUxQ0YzXFx1MUNGNVxcdTFDRjZcXHUxQ0ZBXFx1MUQwMC1cXHUxREJGXFx1MUUwMC1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwNzBcXHUyMDcxXFx1MjA3NC1cXHUyMDc5XFx1MjA3Ri1cXHUyMDg5XFx1MjA5MC1cXHUyMDlDXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNTAtXFx1MjE4OVxcdTI0NjAtXFx1MjQ5QlxcdTI0RUEtXFx1MjRGRlxcdTI3NzYtXFx1Mjc5M1xcdTJDMDAtXFx1MkNFNFxcdTJDRUItXFx1MkNFRVxcdTJDRjJcXHUyQ0YzXFx1MkNGRFxcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJFMkZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMjlcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDlELVxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZDLVxcdTMwRkZcXHUzMTA1LVxcdTMxMkZcXHUzMTMxLVxcdTMxOEVcXHUzMTkyLVxcdTMxOTVcXHUzMUEwLVxcdTMxQkZcXHUzMUYwLVxcdTMxRkZcXHUzMjIwLVxcdTMyMjlcXHUzMjQ4LVxcdTMyNEZcXHUzMjUxLVxcdTMyNUZcXHUzMjgwLVxcdTMyODlcXHUzMkIxLVxcdTMyQkZcXHUzNDAwLVxcdTREQkZcXHU0RTAwLVxcdUE0OENcXHVBNEQwLVxcdUE0RkRcXHVBNTAwLVxcdUE2MENcXHVBNjEwLVxcdUE2MkJcXHVBNjQwLVxcdUE2NkVcXHVBNjdGLVxcdUE2OURcXHVBNkEwLVxcdUE2RUZcXHVBNzE3LVxcdUE3MUZcXHVBNzIyLVxcdUE3ODhcXHVBNzhCLVxcdUE3Q0FcXHVBN0QwXFx1QTdEMVxcdUE3RDNcXHVBN0Q1LVxcdUE3RDlcXHVBN0YyLVxcdUE4MDFcXHVBODAzLVxcdUE4MDVcXHVBODA3LVxcdUE4MEFcXHVBODBDLVxcdUE4MjJcXHVBODMwLVxcdUE4MzVcXHVBODQwLVxcdUE4NzNcXHVBODgyLVxcdUE4QjNcXHVBOEQwLVxcdUE4RDlcXHVBOEYyLVxcdUE4RjdcXHVBOEZCXFx1QThGRFxcdUE4RkVcXHVBOTAwLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGLVxcdUE5RDlcXHVBOUUwLVxcdUE5RTRcXHVBOUU2LVxcdUE5RkVcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTUwLVxcdUFBNTlcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE3RS1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNjlcXHVBQjcwLVxcdUFCRTJcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGQjM2XFx1RkIzOC1cXHVGQjNDXFx1RkIzRVxcdUZCNDBcXHVGQjQxXFx1RkI0M1xcdUZCNDRcXHVGQjQ2LVxcdUZCQjFcXHVGQkQzLVxcdUZEM0RcXHVGRDUwLVxcdUZEOEZcXHVGRDkyLVxcdUZEQzdcXHVGREYwLVxcdUZERkJcXHVGRTcwLVxcdUZFNzRcXHVGRTc2LVxcdUZFRkNcXHVGRjEwLVxcdUZGMTlcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcXHVGRjY2LVxcdUZGQkVcXHVGRkMyLVxcdUZGQzdcXHVGRkNBLVxcdUZGQ0ZcXHVGRkQyLVxcdUZGRDdcXHVGRkRBLVxcdUZGRENdfFxcdUQ4MDBbXFx1REMwMC1cXHVEQzBCXFx1REMwRC1cXHVEQzI2XFx1REMyOC1cXHVEQzNBXFx1REMzQ1xcdURDM0RcXHVEQzNGLVxcdURDNERcXHVEQzUwLVxcdURDNURcXHVEQzgwLVxcdURDRkFcXHVERDA3LVxcdUREMzNcXHVERDQwLVxcdURENzhcXHVERDhBXFx1REQ4QlxcdURFODAtXFx1REU5Q1xcdURFQTAtXFx1REVEMFxcdURFRTEtXFx1REVGQlxcdURGMDAtXFx1REYyM1xcdURGMkQtXFx1REY0QVxcdURGNTAtXFx1REY3NVxcdURGODAtXFx1REY5RFxcdURGQTAtXFx1REZDM1xcdURGQzgtXFx1REZDRlxcdURGRDEtXFx1REZENV18XFx1RDgwMVtcXHVEQzAwLVxcdURDOURcXHVEQ0EwLVxcdURDQTlcXHVEQ0IwLVxcdURDRDNcXHVEQ0Q4LVxcdURDRkJcXHVERDAwLVxcdUREMjdcXHVERDMwLVxcdURENjNcXHVERDcwLVxcdUREN0FcXHVERDdDLVxcdUREOEFcXHVERDhDLVxcdUREOTJcXHVERDk0XFx1REQ5NVxcdUREOTctXFx1RERBMVxcdUREQTMtXFx1RERCMVxcdUREQjMtXFx1RERCOVxcdUREQkJcXHVEREJDXFx1REUwMC1cXHVERjM2XFx1REY0MC1cXHVERjU1XFx1REY2MC1cXHVERjY3XFx1REY4MC1cXHVERjg1XFx1REY4Ny1cXHVERkIwXFx1REZCMi1cXHVERkJBXXxcXHVEODAyW1xcdURDMDAtXFx1REMwNVxcdURDMDhcXHVEQzBBLVxcdURDMzVcXHVEQzM3XFx1REMzOFxcdURDM0NcXHVEQzNGLVxcdURDNTVcXHVEQzU4LVxcdURDNzZcXHVEQzc5LVxcdURDOUVcXHVEQ0E3LVxcdURDQUZcXHVEQ0UwLVxcdURDRjJcXHVEQ0Y0XFx1RENGNVxcdURDRkItXFx1REQxQlxcdUREMjAtXFx1REQzOVxcdUREODAtXFx1RERCN1xcdUREQkMtXFx1RERDRlxcdURERDItXFx1REUwMFxcdURFMTAtXFx1REUxM1xcdURFMTUtXFx1REUxN1xcdURFMTktXFx1REUzNVxcdURFNDAtXFx1REU0OFxcdURFNjAtXFx1REU3RVxcdURFODAtXFx1REU5RlxcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNFxcdURFRUItXFx1REVFRlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNTgtXFx1REY3MlxcdURGNzgtXFx1REY5MVxcdURGQTktXFx1REZBRl18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJcXHVEQ0ZBLVxcdUREMjNcXHVERDMwLVxcdUREMzlcXHVERTYwLVxcdURFN0VcXHVERTgwLVxcdURFQTlcXHVERUIwXFx1REVCMVxcdURGMDAtXFx1REYyN1xcdURGMzAtXFx1REY0NVxcdURGNTEtXFx1REY1NFxcdURGNzAtXFx1REY4MVxcdURGQjAtXFx1REZDQlxcdURGRTAtXFx1REZGNl18XFx1RDgwNFtcXHVEQzAzLVxcdURDMzdcXHVEQzUyLVxcdURDNkZcXHVEQzcxXFx1REM3MlxcdURDNzVcXHVEQzgzLVxcdURDQUZcXHVEQ0QwLVxcdURDRThcXHVEQ0YwLVxcdURDRjlcXHVERDAzLVxcdUREMjZcXHVERDM2LVxcdUREM0ZcXHVERDQ0XFx1REQ0N1xcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVEREQwLVxcdUREREFcXHVERERDXFx1RERFMS1cXHVEREY0XFx1REUwMC1cXHVERTExXFx1REUxMy1cXHVERTJCXFx1REU4MC1cXHVERTg2XFx1REU4OFxcdURFOEEtXFx1REU4RFxcdURFOEYtXFx1REU5RFxcdURFOUYtXFx1REVBOFxcdURFQjAtXFx1REVERVxcdURFRjAtXFx1REVGOVxcdURGMDUtXFx1REYwQ1xcdURGMEZcXHVERjEwXFx1REYxMy1cXHVERjI4XFx1REYyQS1cXHVERjMwXFx1REYzMlxcdURGMzNcXHVERjM1LVxcdURGMzlcXHVERjNEXFx1REY1MFxcdURGNUQtXFx1REY2MV18XFx1RDgwNVtcXHVEQzAwLVxcdURDMzRcXHVEQzQ3LVxcdURDNEFcXHVEQzUwLVxcdURDNTlcXHVEQzVGLVxcdURDNjFcXHVEQzgwLVxcdURDQUZcXHVEQ0M0XFx1RENDNVxcdURDQzdcXHVEQ0QwLVxcdURDRDlcXHVERDgwLVxcdUREQUVcXHVEREQ4LVxcdUREREJcXHVERTAwLVxcdURFMkZcXHVERTQ0XFx1REU1MC1cXHVERTU5XFx1REU4MC1cXHVERUFBXFx1REVCOFxcdURFQzAtXFx1REVDOVxcdURGMDAtXFx1REYxQVxcdURGMzAtXFx1REYzQlxcdURGNDAtXFx1REY0Nl18XFx1RDgwNltcXHVEQzAwLVxcdURDMkJcXHVEQ0EwLVxcdURDRjJcXHVEQ0ZGLVxcdUREMDZcXHVERDA5XFx1REQwQy1cXHVERDEzXFx1REQxNVxcdUREMTZcXHVERDE4LVxcdUREMkZcXHVERDNGXFx1REQ0MVxcdURENTAtXFx1REQ1OVxcdUREQTAtXFx1RERBN1xcdUREQUEtXFx1REREMFxcdURERTFcXHVEREUzXFx1REUwMFxcdURFMEItXFx1REUzMlxcdURFM0FcXHVERTUwXFx1REU1Qy1cXHVERTg5XFx1REU5RFxcdURFQjAtXFx1REVGOF18XFx1RDgwN1tcXHVEQzAwLVxcdURDMDhcXHVEQzBBLVxcdURDMkVcXHVEQzQwXFx1REM1MC1cXHVEQzZDXFx1REM3Mi1cXHVEQzhGXFx1REQwMC1cXHVERDA2XFx1REQwOFxcdUREMDlcXHVERDBCLVxcdUREMzBcXHVERDQ2XFx1REQ1MC1cXHVERDU5XFx1REQ2MC1cXHVERDY1XFx1REQ2N1xcdURENjhcXHVERDZBLVxcdUREODlcXHVERDk4XFx1RERBMC1cXHVEREE5XFx1REVFMC1cXHVERUYyXFx1REZCMFxcdURGQzAtXFx1REZENF18XFx1RDgwOFtcXHVEQzAwLVxcdURGOTldfFxcdUQ4MDlbXFx1REMwMC1cXHVEQzZFXFx1REM4MC1cXHVERDQzXXxcXHVEODBCW1xcdURGOTAtXFx1REZGMF18W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODIyXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXFx1RDg3NC1cXHVEODc5XFx1RDg4MC1cXHVEODgzXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERTYwLVxcdURFNjlcXHVERTcwLVxcdURFQkVcXHVERUMwLVxcdURFQzlcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjQwLVxcdURGNDNcXHVERjUwLVxcdURGNTlcXHVERjVCLVxcdURGNjFcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REU0MC1cXHVERTk2XFx1REYwMC1cXHVERjRBXFx1REY1MFxcdURGOTMtXFx1REY5RlxcdURGRTBcXHVERkUxXFx1REZFM118XFx1RDgyMVtcXHVEQzAwLVxcdURGRjddfFxcdUQ4MjNbXFx1REMwMC1cXHVEQ0Q1XFx1REQwMC1cXHVERDA4XXxcXHVEODJCW1xcdURGRjAtXFx1REZGM1xcdURGRjUtXFx1REZGQlxcdURGRkRcXHVERkZFXXxcXHVEODJDW1xcdURDMDAtXFx1REQyMlxcdURENTAtXFx1REQ1MlxcdURENjQtXFx1REQ2N1xcdURENzAtXFx1REVGQl18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTldfFxcdUQ4MzRbXFx1REVFMC1cXHVERUYzXFx1REY2MC1cXHVERjc4XXxcXHVEODM1W1xcdURDMDAtXFx1REM1NFxcdURDNTYtXFx1REM5Q1xcdURDOUVcXHVEQzlGXFx1RENBMlxcdURDQTVcXHVEQ0E2XFx1RENBOS1cXHVEQ0FDXFx1RENBRS1cXHVEQ0I5XFx1RENCQlxcdURDQkQtXFx1RENDM1xcdURDQzUtXFx1REQwNVxcdUREMDctXFx1REQwQVxcdUREMEQtXFx1REQxNFxcdUREMTYtXFx1REQxQ1xcdUREMUUtXFx1REQzOVxcdUREM0ItXFx1REQzRVxcdURENDAtXFx1REQ0NFxcdURENDZcXHVERDRBLVxcdURENTBcXHVERDUyLVxcdURFQTVcXHVERUE4LVxcdURFQzBcXHVERUMyLVxcdURFREFcXHVERURDLVxcdURFRkFcXHVERUZDLVxcdURGMTRcXHVERjE2LVxcdURGMzRcXHVERjM2LVxcdURGNEVcXHVERjUwLVxcdURGNkVcXHVERjcwLVxcdURGODhcXHVERjhBLVxcdURGQThcXHVERkFBLVxcdURGQzJcXHVERkM0LVxcdURGQ0JcXHVERkNFLVxcdURGRkZdfFxcdUQ4MzdbXFx1REYwMC1cXHVERjFFXXxcXHVEODM4W1xcdUREMDAtXFx1REQyQ1xcdUREMzctXFx1REQzRFxcdURENDAtXFx1REQ0OVxcdURENEVcXHVERTkwLVxcdURFQURcXHVERUMwLVxcdURFRUJcXHVERUYwLVxcdURFRjldfFxcdUQ4MzlbXFx1REZFMC1cXHVERkU2XFx1REZFOC1cXHVERkVCXFx1REZFRFxcdURGRUVcXHVERkYwLVxcdURGRkVdfFxcdUQ4M0FbXFx1REMwMC1cXHVEQ0M0XFx1RENDNy1cXHVEQ0NGXFx1REQwMC1cXHVERDQzXFx1REQ0QlxcdURENTAtXFx1REQ1OV18XFx1RDgzQltcXHVEQzcxLVxcdURDQUJcXHVEQ0FELVxcdURDQUZcXHVEQ0IxLVxcdURDQjRcXHVERDAxLVxcdUREMkRcXHVERDJGLVxcdUREM0RcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODNDW1xcdUREMDAtXFx1REQwQ118XFx1RDgzRVtcXHVERkYwLVxcdURGRjldfFxcdUQ4NjlbXFx1REMwMC1cXHVERURGXFx1REYwMC1cXHVERkZGXXxcXHVEODZEW1xcdURDMDAtXFx1REYzOFxcdURGNDAtXFx1REZGRl18XFx1RDg2RVtcXHVEQzAwLVxcdURDMURcXHVEQzIwLVxcdURGRkZdfFxcdUQ4NzNbXFx1REMwMC1cXHVERUExXFx1REVCMC1cXHVERkZGXXxcXHVEODdBW1xcdURDMDAtXFx1REZFMF18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdfFxcdUQ4ODRbXFx1REMwMC1cXHVERjRBXSkvKSkgcmV0dXJuO1xuICAgIHZhciBuZXh0Q2hhciA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8ICcnO1xuICAgIGlmICghbmV4dENoYXIgfHwgbmV4dENoYXIgJiYgKHByZXZDaGFyID09PSAnJyB8fCB0aGlzLnJ1bGVzLmlubGluZS5wdW5jdHVhdGlvbi5leGVjKHByZXZDaGFyKSkpIHtcbiAgICAgIHZhciBsTGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoIC0gMTtcbiAgICAgIHZhciByRGVsaW0sXG4gICAgICAgIHJMZW5ndGgsXG4gICAgICAgIGRlbGltVG90YWwgPSBsTGVuZ3RoLFxuICAgICAgICBtaWREZWxpbVRvdGFsID0gMDtcbiAgICAgIHZhciBlbmRSZWcgPSBtYXRjaFswXVswXSA9PT0gJyonID8gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltQXN0IDogdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltVW5kO1xuICAgICAgZW5kUmVnLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgIC8vIENsaXAgbWFza2VkU3JjIHRvIHNhbWUgc2VjdGlvbiBvZiBzdHJpbmcgYXMgc3JjIChtb3ZlIHRvIGxleGVyPylcbiAgICAgIG1hc2tlZFNyYyA9IG1hc2tlZFNyYy5zbGljZSgtMSAqIHNyYy5sZW5ndGggKyBsTGVuZ3RoKTtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSBlbmRSZWcuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgIHJEZWxpbSA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8IG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IG1hdGNoWzZdO1xuICAgICAgICBpZiAoIXJEZWxpbSkgY29udGludWU7IC8vIHNraXAgc2luZ2xlICogaW4gX19hYmMqYWJjX19cblxuICAgICAgICByTGVuZ3RoID0gckRlbGltLmxlbmd0aDtcbiAgICAgICAgaWYgKG1hdGNoWzNdIHx8IG1hdGNoWzRdKSB7XG4gICAgICAgICAgLy8gZm91bmQgYW5vdGhlciBMZWZ0IERlbGltXG4gICAgICAgICAgZGVsaW1Ub3RhbCArPSByTGVuZ3RoO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzVdIHx8IG1hdGNoWzZdKSB7XG4gICAgICAgICAgLy8gZWl0aGVyIExlZnQgb3IgUmlnaHQgRGVsaW1cbiAgICAgICAgICBpZiAobExlbmd0aCAlIDMgJiYgISgobExlbmd0aCArIHJMZW5ndGgpICUgMykpIHtcbiAgICAgICAgICAgIG1pZERlbGltVG90YWwgKz0gckxlbmd0aDtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDb21tb25NYXJrIEVtcGhhc2lzIFJ1bGVzIDktMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkZWxpbVRvdGFsIC09IHJMZW5ndGg7XG4gICAgICAgIGlmIChkZWxpbVRvdGFsID4gMCkgY29udGludWU7IC8vIEhhdmVuJ3QgZm91bmQgZW5vdWdoIGNsb3NpbmcgZGVsaW1pdGVyc1xuXG4gICAgICAgIC8vIFJlbW92ZSBleHRyYSBjaGFyYWN0ZXJzLiAqYSoqKiAtPiAqYSpcbiAgICAgICAgckxlbmd0aCA9IE1hdGgubWluKHJMZW5ndGgsIHJMZW5ndGggKyBkZWxpbVRvdGFsICsgbWlkRGVsaW1Ub3RhbCk7XG4gICAgICAgIHZhciByYXcgPSBzcmMuc2xpY2UoMCwgbExlbmd0aCArIG1hdGNoLmluZGV4ICsgKG1hdGNoWzBdLmxlbmd0aCAtIHJEZWxpbS5sZW5ndGgpICsgckxlbmd0aCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGBlbWAgaWYgc21hbGxlc3QgZGVsaW1pdGVyIGhhcyBvZGQgY2hhciBjb3VudC4gKmEqKipcbiAgICAgICAgaWYgKE1hdGgubWluKGxMZW5ndGgsIHJMZW5ndGgpICUgMikge1xuICAgICAgICAgIHZhciBfdGV4dCA9IHJhdy5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdlbScsXG4gICAgICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgICAgIHRleHQ6IF90ZXh0LFxuICAgICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2VucyhfdGV4dClcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlICdzdHJvbmcnIGlmIHNtYWxsZXN0IGRlbGltaXRlciBoYXMgZXZlbiBjaGFyIGNvdW50LiAqKmEqKipcbiAgICAgICAgdmFyIHRleHQgPSByYXcuc2xpY2UoMiwgLTIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6ICdzdHJvbmcnLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2Vucyh0ZXh0KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmNvZGVzcGFuID0gZnVuY3Rpb24gY29kZXNwYW4oc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLmNvZGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzJdLnJlcGxhY2UoL1xcbi9nLCAnICcpO1xuICAgICAgdmFyIGhhc05vblNwYWNlQ2hhcnMgPSAvW14gXS8udGVzdCh0ZXh0KTtcbiAgICAgIHZhciBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcyA9IC9eIC8udGVzdCh0ZXh0KSAmJiAvICQvLnRlc3QodGV4dCk7XG4gICAgICBpZiAoaGFzTm9uU3BhY2VDaGFycyAmJiBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMSwgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICAgIHRleHQgPSBlc2NhcGUodGV4dCwgdHJ1ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZXNwYW4nLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5iciA9IGZ1bmN0aW9uIGJyKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5ici5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2JyJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5kZWwuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdkZWwnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogY2FwWzJdLFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lVG9rZW5zKGNhcFsyXSlcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYXV0b2xpbmsgPSBmdW5jdGlvbiBhdXRvbGluayhzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5hdXRvbGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQsIGhyZWY7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMubWFuZ2xlID8gbWFuZ2xlKGNhcFsxXSkgOiBjYXBbMV0pO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnbGluaycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0b2tlbnM6IFt7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnVybCA9IGZ1bmN0aW9uIHVybChzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnVybC5leGVjKHNyYykpIHtcbiAgICAgIHZhciB0ZXh0LCBocmVmO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUodGhpcy5vcHRpb25zLm1hbmdsZSA/IG1hbmdsZShjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgICAgaHJlZiA9ICdtYWlsdG86JyArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkbyBleHRlbmRlZCBhdXRvbGluayBwYXRoIHZhbGlkYXRpb25cbiAgICAgICAgdmFyIHByZXZDYXBaZXJvO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgcHJldkNhcFplcm8gPSBjYXBbMF07XG4gICAgICAgICAgY2FwWzBdID0gdGhpcy5ydWxlcy5pbmxpbmUuX2JhY2twZWRhbC5leGVjKGNhcFswXSlbMF07XG4gICAgICAgIH0gd2hpbGUgKHByZXZDYXBaZXJvICE9PSBjYXBbMF0pO1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFswXSk7XG4gICAgICAgIGlmIChjYXBbMV0gPT09ICd3d3cuJykge1xuICAgICAgICAgIGhyZWYgPSAnaHR0cDovLycgKyBjYXBbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IGNhcFswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgdG9rZW5zOiBbe1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICByYXc6IHRleHQsXG4gICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5pbmxpbmVUZXh0ID0gZnVuY3Rpb24gaW5saW5lVGV4dChzcmMsIHNtYXJ0eXBhbnRzKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnRleHQuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0O1xuICAgICAgaWYgKHRoaXMubGV4ZXIuc3RhdGUuaW5SYXdCbG9jaykge1xuICAgICAgICB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplID8gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pIDogY2FwWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMgPyBzbWFydHlwYW50cyhjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICByZXR1cm4gVG9rZW5pemVyO1xufSgpO1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXig/OiAqKD86XFxufCQpKSsvLFxuICBjb2RlOiAvXiggezR9W15cXG5dKyg/Olxcbig/OiAqKD86XFxufCQpKSopPykrLyxcbiAgZmVuY2VzOiAvXiB7MCwzfShgezMsfSg/PVteYFxcbl0qKD86XFxufCQpKXx+ezMsfSkoW15cXG5dKikoPzpcXG58JCkoPzp8KFtcXHNcXFNdKj8pKD86XFxufCQpKSg/OiB7MCwzfVxcMVt+YF0qICooPz1cXG58JCl8JCkvLFxuICBocjogL14gezAsM30oKD86LVtcXHQgXSopezMsfXwoPzpfWyBcXHRdKil7Myx9fCg/OlxcKlsgXFx0XSopezMsfSkoPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gezAsM30oI3sxLDZ9KSg/PVxcc3wkKSguKikoPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oIHswLDN9PiA/KHBhcmFncmFwaHxbXlxcbl0qKSg/OlxcbnwkKSkrLyxcbiAgbGlzdDogL14oIHswLDN9YnVsbCkoWyBcXHRdW15cXG5dKz8pPyg/OlxcbnwkKS8sXG4gIGh0bWw6ICdeIHswLDN9KD86JyAvLyBvcHRpb25hbCBpbmRlbnRhdGlvblxuICArICc8KHNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW1xcXFxzPl1bXFxcXHNcXFxcU10qPyg/OjwvXFxcXDE+W15cXFxcbl0qXFxcXG4rfCQpJyAvLyAoMSlcbiAgKyAnfGNvbW1lbnRbXlxcXFxuXSooXFxcXG4rfCQpJyAvLyAoMilcbiAgKyAnfDxcXFxcP1tcXFxcc1xcXFxTXSo/KD86XFxcXD8+XFxcXG4qfCQpJyAvLyAoMylcbiAgKyAnfDwhW0EtWl1bXFxcXHNcXFxcU10qPyg/Oj5cXFxcbip8JCknIC8vICg0KVxuICArICd8PCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qPyg/OlxcXFxdXFxcXF0+XFxcXG4qfCQpJyAvLyAoNSlcbiAgKyAnfDwvPyh0YWcpKD86ICt8XFxcXG58Lz8+KVtcXFxcc1xcXFxTXSo/KD86KD86XFxcXG4gKikrXFxcXG58JCknIC8vICg2KVxuICArICd8PCg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpKFthLXpdW1xcXFx3LV0qKSg/OmF0dHJpYnV0ZSkqPyAqLz8+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIG9wZW4gdGFnXG4gICsgJ3w8Lyg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW2Etel1bXFxcXHctXSpcXFxccyo+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIGNsb3NpbmcgdGFnXG4gICsgJyknLFxuICBkZWY6IC9eIHswLDN9XFxbKGxhYmVsKVxcXTogKig/OlxcbiAqKT8oW148XFxzXVteXFxzXSp8PC4qPz4pKD86KD86ICsoPzpcXG4gKik/fCAqXFxuICopKHRpdGxlKSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3BUZXN0LFxuICBsaGVhZGluZzogL14oKD86LnxcXG4oPyFcXG4pKSs/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICAvLyByZWdleCB0ZW1wbGF0ZSwgcGxhY2Vob2xkZXJzIHdpbGwgYmUgcmVwbGFjZWQgYWNjb3JkaW5nIHRvIGRpZmZlcmVudCBwYXJhZ3JhcGhcbiAgLy8gaW50ZXJydXB0aW9uIHJ1bGVzIG9mIGNvbW1vbm1hcmsgYW5kIHRoZSBvcmlnaW5hbCBtYXJrZG93biBzcGVjOlxuICBfcGFyYWdyYXBoOiAvXihbXlxcbl0rKD86XFxuKD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfGZlbmNlc3xsaXN0fGh0bWx8dGFibGV8ICtcXG4pW15cXG5dKykqKS8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5ibG9jay5fbGFiZWwgPSAvKD8hXFxzKlxcXSkoPzpcXFxcLnxbXlxcW1xcXVxcXFxdKSsvO1xuYmxvY2suX3RpdGxlID0gLyg/OlwiKD86XFxcXFwiP3xbXlwiXFxcXF0pKlwifCdbXidcXG5dKig/OlxcblteJ1xcbl0rKSpcXG4/J3xcXChbXigpXSpcXCkpLztcbmJsb2NrLmRlZiA9IGVkaXQoYmxvY2suZGVmKS5yZXBsYWNlKCdsYWJlbCcsIGJsb2NrLl9sYWJlbCkucmVwbGFjZSgndGl0bGUnLCBibG9jay5fdGl0bGUpLmdldFJlZ2V4KCk7XG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkezEsOX1bLildKS87XG5ibG9jay5saXN0SXRlbVN0YXJ0ID0gZWRpdCgvXiggKikoYnVsbCkgKi8pLnJlcGxhY2UoJ2J1bGwnLCBibG9jay5idWxsZXQpLmdldFJlZ2V4KCk7XG5ibG9jay5saXN0ID0gZWRpdChibG9jay5saXN0KS5yZXBsYWNlKC9idWxsL2csIGJsb2NrLmJ1bGxldCkucmVwbGFjZSgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86KD86LSAqKXszLH18KD86XyAqKXszLH18KD86XFxcXCogKil7Myx9KSg/OlxcXFxuK3wkKSknKS5yZXBsYWNlKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpLmdldFJlZ2V4KCk7XG5ibG9jay5fdGFnID0gJ2FkZHJlc3N8YXJ0aWNsZXxhc2lkZXxiYXNlfGJhc2Vmb250fGJsb2NrcXVvdGV8Ym9keXxjYXB0aW9uJyArICd8Y2VudGVyfGNvbHxjb2xncm91cHxkZHxkZXRhaWxzfGRpYWxvZ3xkaXJ8ZGl2fGRsfGR0fGZpZWxkc2V0fGZpZ2NhcHRpb24nICsgJ3xmaWd1cmV8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aFsxLTZdfGhlYWR8aGVhZGVyfGhyfGh0bWx8aWZyYW1lJyArICd8bGVnZW5kfGxpfGxpbmt8bWFpbnxtZW51fG1lbnVpdGVtfG1ldGF8bmF2fG5vZnJhbWVzfG9sfG9wdGdyb3VwfG9wdGlvbicgKyAnfHB8cGFyYW18c2VjdGlvbnxzb3VyY2V8c3VtbWFyeXx0YWJsZXx0Ym9keXx0ZHx0Zm9vdHx0aHx0aGVhZHx0aXRsZXx0cicgKyAnfHRyYWNrfHVsJztcbmJsb2NrLl9jb21tZW50ID0gLzwhLS0oPyEtPz4pW1xcc1xcU10qPyg/Oi0tPnwkKS87XG5ibG9jay5odG1sID0gZWRpdChibG9jay5odG1sLCAnaScpLnJlcGxhY2UoJ2NvbW1lbnQnLCBibG9jay5fY29tbWVudCkucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykucmVwbGFjZSgnYXR0cmlidXRlJywgLyArW2EtekEtWjpfXVtcXHcuOi1dKig/OiAqPSAqXCJbXlwiXFxuXSpcInwgKj0gKidbXidcXG5dKid8ICo9ICpbXlxcc1wiJz08PmBdKyk/LykuZ2V0UmVnZXgoKTtcbmJsb2NrLnBhcmFncmFwaCA9IGVkaXQoYmxvY2suX3BhcmFncmFwaCkucmVwbGFjZSgnaHInLCBibG9jay5ocikucmVwbGFjZSgnaGVhZGluZycsICcgezAsM30jezEsNn0gJykucmVwbGFjZSgnfGxoZWFkaW5nJywgJycpIC8vIHNldGV4IGhlYWRpbmdzIGRvbid0IGludGVycnVwdCBjb21tb25tYXJrIHBhcmFncmFwaHNcbi5yZXBsYWNlKCd8dGFibGUnLCAnJykucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5ibG9ja3F1b3RlID0gZWRpdChibG9jay5ibG9ja3F1b3RlKS5yZXBsYWNlKCdwYXJhZ3JhcGgnLCBibG9jay5wYXJhZ3JhcGgpLmdldFJlZ2V4KCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBfZXh0ZW5kcyh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gX2V4dGVuZHMoe30sIGJsb2NrLm5vcm1hbCwge1xuICB0YWJsZTogJ14gKihbXlxcXFxuIF0uKlxcXFx8LiopXFxcXG4nIC8vIEhlYWRlclxuICArICcgezAsM30oPzpcXFxcfCAqKT8oOj8tKzo/ICooPzpcXFxcfCAqOj8tKzo/ICopKikoPzpcXFxcfCAqKT8nIC8vIEFsaWduXG4gICsgJyg/OlxcXFxuKCg/Oig/ISAqXFxcXG58aHJ8aGVhZGluZ3xibG9ja3F1b3RlfGNvZGV8ZmVuY2VzfGxpc3R8aHRtbCkuKig/OlxcXFxufCQpKSopXFxcXG4qfCQpJyAvLyBDZWxsc1xufSk7XG5cbmJsb2NrLmdmbS50YWJsZSA9IGVkaXQoYmxvY2suZ2ZtLnRhYmxlKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCdibG9ja3F1b3RlJywgJyB7MCwzfT4nKS5yZXBsYWNlKCdjb2RlJywgJyB7NH1bXlxcXFxuXScpLnJlcGxhY2UoJ2ZlbmNlcycsICcgezAsM30oPzpgezMsfSg/PVteYFxcXFxuXSpcXFxcbil8fnszLH0pW15cXFxcbl0qXFxcXG4nKS5yZXBsYWNlKCdsaXN0JywgJyB7MCwzfSg/OlsqKy1dfDFbLildKSAnKSAvLyBvbmx5IGxpc3RzIHN0YXJ0aW5nIGZyb20gMSBjYW4gaW50ZXJydXB0XG4ucmVwbGFjZSgnaHRtbCcsICc8Lz8oPzp0YWcpKD86ICt8XFxcXG58Lz8+KXw8KD86c2NyaXB0fHByZXxzdHlsZXx0ZXh0YXJlYXwhLS0pJykucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykgLy8gdGFibGVzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5nZm0ucGFyYWdyYXBoID0gZWRpdChibG9jay5fcGFyYWdyYXBoKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCd8bGhlYWRpbmcnLCAnJykgLy8gc2V0ZXggaGVhZGluZ3MgZG9uJ3QgaW50ZXJydXB0IGNvbW1vbm1hcmsgcGFyYWdyYXBoc1xuLnJlcGxhY2UoJ3RhYmxlJywgYmxvY2suZ2ZtLnRhYmxlKSAvLyBpbnRlcnJ1cHQgcGFyYWdyYXBocyB3aXRoIHRhYmxlXG4ucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG4vKipcbiAqIFBlZGFudGljIGdyYW1tYXIgKG9yaWdpbmFsIEpvaG4gR3J1YmVyJ3MgbG9vc2UgbWFya2Rvd24gc3BlY2lmaWNhdGlvbilcbiAqL1xuXG5ibG9jay5wZWRhbnRpYyA9IF9leHRlbmRzKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgaHRtbDogZWRpdCgnXiAqKD86Y29tbWVudCAqKD86XFxcXG58XFxcXHMqJCknICsgJ3w8KHRhZylbXFxcXHNcXFxcU10rPzwvXFxcXDE+ICooPzpcXFxcbnsyLH18XFxcXHMqJCknIC8vIGNsb3NlZCB0YWdcbiAgKyAnfDx0YWcoPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8XFxcXHNbXlxcJ1wiLz5cXFxcc10qKSo/Lz8+ICooPzpcXFxcbnsyLH18XFxcXHMqJCkpJykucmVwbGFjZSgnY29tbWVudCcsIGJsb2NrLl9jb21tZW50KS5yZXBsYWNlKC90YWcvZywgJyg/ISg/OicgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGV8dmFyfHNhbXB8a2JkfHN1YicgKyAnfHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkb3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZyknICsgJ1xcXFxiKVxcXFx3Kyg/ITp8W15cXFxcd1xcXFxzQF0qQClcXFxcYicpLmdldFJlZ2V4KCksXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICsoW1wiKF1bXlxcbl0rW1wiKV0pKT8gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXigjezEsNn0pKC4qKSg/Olxcbit8JCkvLFxuICBmZW5jZXM6IG5vb3BUZXN0LFxuICAvLyBmZW5jZXMgbm90IHN1cHBvcnRlZFxuICBsaGVhZGluZzogL14oLis/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IGVkaXQoYmxvY2subm9ybWFsLl9wYXJhZ3JhcGgpLnJlcGxhY2UoJ2hyJywgYmxvY2suaHIpLnJlcGxhY2UoJ2hlYWRpbmcnLCAnICojezEsNn0gKlteXFxuXScpLnJlcGxhY2UoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpLnJlcGxhY2UoJ2Jsb2NrcXVvdGUnLCAnIHswLDN9PicpLnJlcGxhY2UoJ3xmZW5jZXMnLCAnJykucmVwbGFjZSgnfGxpc3QnLCAnJykucmVwbGFjZSgnfGh0bWwnLCAnJykuZ2V0UmVnZXgoKVxufSk7XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pLyxcbiAgYXV0b2xpbms6IC9ePChzY2hlbWU6W15cXHNcXHgwMC1cXHgxZjw+XSp8ZW1haWwpPi8sXG4gIHVybDogbm9vcFRlc3QsXG4gIHRhZzogJ15jb21tZW50JyArICd8XjwvW2EtekEtWl1bXFxcXHc6LV0qXFxcXHMqPicgLy8gc2VsZi1jbG9zaW5nIHRhZ1xuICArICd8XjxbYS16QS1aXVtcXFxcdy1dKig/OmF0dHJpYnV0ZSkqP1xcXFxzKi8/PicgLy8gb3BlbiB0YWdcbiAgKyAnfF48XFxcXD9bXFxcXHNcXFxcU10qP1xcXFw/PicgLy8gcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiwgZS5nLiA8P3BocCA/PlxuICArICd8XjwhW2EtekEtWl0rXFxcXHNbXFxcXHNcXFxcU10qPz4nIC8vIGRlY2xhcmF0aW9uLCBlLmcuIDwhRE9DVFlQRSBodG1sPlxuICArICd8XjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPicsXG4gIC8vIENEQVRBIHNlY3Rpb25cbiAgbGluazogL14hP1xcWyhsYWJlbClcXF1cXChcXHMqKGhyZWYpKD86XFxzKyh0aXRsZSkpP1xccypcXCkvLFxuICByZWZsaW5rOiAvXiE/XFxbKGxhYmVsKVxcXVxcWyhyZWYpXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKHJlZilcXF0oPzpcXFtcXF0pPy8sXG4gIHJlZmxpbmtTZWFyY2g6ICdyZWZsaW5rfG5vbGluayg/IVxcXFwoKScsXG4gIGVtU3Ryb25nOiB7XG4gICAgbERlbGltOiAvXig/OlxcKisoPzooW3B1bmN0X10pfFteXFxzKl0pKXxeXysoPzooW3B1bmN0Kl0pfChbXlxcc19dKSkvLFxuICAgIC8vICAgICAgICAoMSkgYW5kICgyKSBjYW4gb25seSBiZSBhIFJpZ2h0IERlbGltaXRlci4gKDMpIGFuZCAoNCkgY2FuIG9ubHkgYmUgTGVmdC4gICg1KSBhbmQgKDYpIGNhbiBiZSBlaXRoZXIgTGVmdCBvciBSaWdodC5cbiAgICAvLyAgICAgICAgICAoKSBTa2lwIG9ycGhhbiBpbnNpZGUgc3Ryb25nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSBDb25zdW1lIHRvIGRlbGltICAgICAoMSkgIyoqKiAgICAgICAgICAgICAgICAoMikgYSoqKiMsIGEqKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICgzKSAjKioqYSwgKioqYSAgICAgICAgICAgICAgICAgKDQpICoqKiMgICAgICAgICAgICAgICg1KSAjKioqIyAgICAgICAgICAgICAgICAgKDYpIGEqKiphXG4gICAgckRlbGltQXN0OiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcX1xcXyg/OlteXypcXFxcXXxcXFxcLikqP1xcKig/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcX1xcXyl8KD86W14qXFxcXF18XFxcXC4pKyg/PVteKl0pfFtwdW5jdF9dKFxcKispKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcKispKD89W3B1bmN0X1xcc118JCl8W3B1bmN0X1xcc10oXFwqKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXCorKSg/PVtwdW5jdF9dKXxbcHVuY3RfXShcXCorKSg/PVtwdW5jdF9dKXwoPzpbXnB1bmN0Kl9cXHNcXFxcXXxcXFxcLikoXFwqKykoPz1bXnB1bmN0Kl9cXHNdKS8sXG4gICAgckRlbGltVW5kOiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcKlxcKig/OlteXypcXFxcXXxcXFxcLikqP1xcXyg/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcKlxcKil8KD86W15fXFxcXF18XFxcXC4pKyg/PVteX10pfFtwdW5jdCpdKFxcXyspKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcXyspKD89W3B1bmN0Klxcc118JCl8W3B1bmN0Klxcc10oXFxfKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXF8rKSg/PVtwdW5jdCpdKXxbcHVuY3QqXShcXF8rKSg/PVtwdW5jdCpdKS8gLy8gXi0gTm90IGFsbG93ZWQgZm9yIF9cbiAgfSxcblxuICBjb2RlOiAvXihgKykoW15gXXxbXmBdW1xcc1xcU10qP1teYF0pXFwxKD8hYCkvLFxuICBicjogL14oIHsyLH18XFxcXClcXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3BUZXN0LFxuICB0ZXh0OiAvXihgK3xbXmBdKSg/Oig/PSB7Mix9XFxuKXxbXFxzXFxTXSo/KD86KD89W1xcXFw8IVxcW2AqX118XFxiX3wkKXxbXiBdKD89IHsyLH1cXG4pKSkvLFxuICBwdW5jdHVhdGlvbjogL14oW1xcc3B1bmN0dWF0aW9uXSkvXG59O1xuXG4vLyBsaXN0IG9mIHB1bmN0dWF0aW9uIG1hcmtzIGZyb20gQ29tbW9uTWFyayBzcGVjXG4vLyB3aXRob3V0ICogYW5kIF8gdG8gaGFuZGxlIHRoZSBkaWZmZXJlbnQgZW1waGFzaXMgbWFya2VycyAqIGFuZCBfXG5pbmxpbmUuX3B1bmN0dWF0aW9uID0gJyFcIiMkJSZcXCcoKStcXFxcLS4sLzo7PD0+P0BcXFxcW1xcXFxdYF57fH1+JztcbmlubGluZS5wdW5jdHVhdGlvbiA9IGVkaXQoaW5saW5lLnB1bmN0dWF0aW9uKS5yZXBsYWNlKC9wdW5jdHVhdGlvbi9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuXG4vLyBzZXF1ZW5jZXMgZW0gc2hvdWxkIHNraXAgb3ZlciBbdGl0bGVdKGxpbmspLCBgY29kZWAsIDxodG1sPlxuaW5saW5lLmJsb2NrU2tpcCA9IC9cXFtbXlxcXV0qP1xcXVxcKFteXFwpXSo/XFwpfGBbXmBdKj9gfDxbXj5dKj8+L2c7XG4vLyBsb29rYmVoaW5kIGlzIG5vdCBhdmFpbGFibGUgb24gU2FmYXJpIGFzIG9mIHZlcnNpb24gMTZcbi8vIGlubGluZS5lc2NhcGVkRW1TdCA9IC8oPzw9KD86XnxbXlxcXFwpKD86XFxcXFteXSkqKVxcXFxbKl9dL2c7XG5pbmxpbmUuZXNjYXBlZEVtU3QgPSAvKD86XnxbXlxcXFxdKSg/OlxcXFxcXFxcKSpcXFxcWypfXS9nO1xuaW5saW5lLl9jb21tZW50ID0gZWRpdChibG9jay5fY29tbWVudCkucmVwbGFjZSgnKD86LS0+fCQpJywgJy0tPicpLmdldFJlZ2V4KCk7XG5pbmxpbmUuZW1TdHJvbmcubERlbGltID0gZWRpdChpbmxpbmUuZW1TdHJvbmcubERlbGltKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLl9lc2NhcGVzID0gL1xcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pL2c7XG5pbmxpbmUuX3NjaGVtZSA9IC9bYS16QS1aXVthLXpBLVowLTkrLi1dezEsMzF9LztcbmlubGluZS5fZW1haWwgPSAvW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXSsoQClbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKyg/IVstX10pLztcbmlubGluZS5hdXRvbGluayA9IGVkaXQoaW5saW5lLmF1dG9saW5rKS5yZXBsYWNlKCdzY2hlbWUnLCBpbmxpbmUuX3NjaGVtZSkucmVwbGFjZSgnZW1haWwnLCBpbmxpbmUuX2VtYWlsKS5nZXRSZWdleCgpO1xuaW5saW5lLl9hdHRyaWJ1dGUgPSAvXFxzK1thLXpBLVo6X11bXFx3LjotXSooPzpcXHMqPVxccypcIlteXCJdKlwifFxccyo9XFxzKidbXiddKid8XFxzKj1cXHMqW15cXHNcIic9PD5gXSspPy87XG5pbmxpbmUudGFnID0gZWRpdChpbmxpbmUudGFnKS5yZXBsYWNlKCdjb21tZW50JywgaW5saW5lLl9jb21tZW50KS5yZXBsYWNlKCdhdHRyaWJ1dGUnLCBpbmxpbmUuX2F0dHJpYnV0ZSkuZ2V0UmVnZXgoKTtcbmlubGluZS5fbGFiZWwgPSAvKD86XFxbKD86XFxcXC58W15cXFtcXF1cXFxcXSkqXFxdfFxcXFwufGBbXmBdKmB8W15cXFtcXF1cXFxcYF0pKj8vO1xuaW5saW5lLl9ocmVmID0gLzwoPzpcXFxcLnxbXlxcbjw+XFxcXF0pKz58W15cXHNcXHgwMC1cXHgxZl0qLztcbmlubGluZS5fdGl0bGUgPSAvXCIoPzpcXFxcXCI/fFteXCJcXFxcXSkqXCJ8Jyg/OlxcXFwnP3xbXidcXFxcXSkqJ3xcXCgoPzpcXFxcXFwpP3xbXilcXFxcXSkqXFwpLztcbmlubGluZS5saW5rID0gZWRpdChpbmxpbmUubGluaykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5yZXBsYWNlKCdocmVmJywgaW5saW5lLl9ocmVmKS5yZXBsYWNlKCd0aXRsZScsIGlubGluZS5fdGl0bGUpLmdldFJlZ2V4KCk7XG5pbmxpbmUucmVmbGluayA9IGVkaXQoaW5saW5lLnJlZmxpbmspLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lLl9sYWJlbCkucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLm5vbGluayA9IGVkaXQoaW5saW5lLm5vbGluaykucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLnJlZmxpbmtTZWFyY2ggPSBlZGl0KGlubGluZS5yZWZsaW5rU2VhcmNoLCAnZycpLnJlcGxhY2UoJ3JlZmxpbmsnLCBpbmxpbmUucmVmbGluaykucmVwbGFjZSgnbm9saW5rJywgaW5saW5lLm5vbGluaykuZ2V0UmVnZXgoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gX2V4dGVuZHMoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IHtcbiAgICBzdGFydDogL15fX3xcXCpcXCovLFxuICAgIG1pZGRsZTogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gICAgZW5kQXN0OiAvXFwqXFwqKD8hXFwqKS9nLFxuICAgIGVuZFVuZDogL19fKD8hXykvZ1xuICB9LFxuICBlbToge1xuICAgIHN0YXJ0OiAvXl98XFwqLyxcbiAgICBtaWRkbGU6IC9eKClcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKXxeXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXykvLFxuICAgIGVuZEFzdDogL1xcKig/IVxcKikvZyxcbiAgICBlbmRVbmQ6IC9fKD8hXykvZ1xuICB9LFxuICBsaW5rOiBlZGl0KC9eIT9cXFsobGFiZWwpXFxdXFwoKC4qPylcXCkvKS5yZXBsYWNlKCdsYWJlbCcsIGlubGluZS5fbGFiZWwpLmdldFJlZ2V4KCksXG4gIHJlZmxpbms6IGVkaXQoL14hP1xcWyhsYWJlbClcXF1cXHMqXFxbKFteXFxdXSopXFxdLykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gX2V4dGVuZHMoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiBlZGl0KGlubGluZS5lc2NhcGUpLnJlcGxhY2UoJ10pJywgJ358XSknKS5nZXRSZWdleCgpLFxuICBfZXh0ZW5kZWRfZW1haWw6IC9bQS1aYS16MC05Ll8rLV0rKEApW2EtekEtWjAtOS1fXSsoPzpcXC5bYS16QS1aMC05LV9dKlthLXpBLVowLTldKSsoPyFbLV9dKS8sXG4gIHVybDogL14oKD86ZnRwfGh0dHBzPyk6XFwvXFwvfHd3d1xcLikoPzpbYS16QS1aMC05XFwtXStcXC4/KStbXlxcczxdKnxeZW1haWwvLFxuICBfYmFja3BlZGFsOiAvKD86W14/IS4sOjsqXydcIn4oKSZdK3xcXChbXildKlxcKXwmKD8hW2EtekEtWjAtOV0rOyQpfFs/IS4sOjsqXydcIn4pXSsoPyEkKSkrLyxcbiAgZGVsOiAvXih+fj8pKD89W15cXHN+XSkoW1xcc1xcU10qP1teXFxzfl0pXFwxKD89W15+XXwkKS8sXG4gIHRleHQ6IC9eKFtgfl0rfFteYH5dKSg/Oig/PSB7Mix9XFxuKXwoPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApfFtcXHNcXFNdKj8oPzooPz1bXFxcXDwhXFxbYCp+X118XFxiX3xodHRwcz86XFwvXFwvfGZ0cDpcXC9cXC98d3d3XFwufCQpfFteIF0oPz0gezIsfVxcbil8W15hLXpBLVowLTkuISMkJSYnKitcXC89P19ge1xcfH1+LV0oPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApKSkvXG59KTtcbmlubGluZS5nZm0udXJsID0gZWRpdChpbmxpbmUuZ2ZtLnVybCwgJ2knKS5yZXBsYWNlKCdlbWFpbCcsIGlubGluZS5nZm0uX2V4dGVuZGVkX2VtYWlsKS5nZXRSZWdleCgpO1xuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLmdmbSwge1xuICBicjogZWRpdChpbmxpbmUuYnIpLnJlcGxhY2UoJ3syLH0nLCAnKicpLmdldFJlZ2V4KCksXG4gIHRleHQ6IGVkaXQoaW5saW5lLmdmbS50ZXh0KS5yZXBsYWNlKCdcXFxcYl8nLCAnXFxcXGJffCB7Mix9XFxcXG4nKS5yZXBsYWNlKC9cXHsyLFxcfS9nLCAnKicpLmdldFJlZ2V4KClcbn0pO1xuXG4vKipcbiAqIHNtYXJ0eXBhbnRzIHRleHQgcmVwbGFjZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKi9cbmZ1bmN0aW9uIHNtYXJ0eXBhbnRzKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgLy8gZW0tZGFzaGVzXG4gIC5yZXBsYWNlKC8tLS0vZywgXCJcXHUyMDE0XCIpXG4gIC8vIGVuLWRhc2hlc1xuICAucmVwbGFjZSgvLS0vZywgXCJcXHUyMDEzXCIpXG4gIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgXCIkMVxcdTIwMThcIilcbiAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgLnJlcGxhY2UoLycvZywgXCJcXHUyMDE5XCIpXG4gIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgXCIkMVxcdTIwMUNcIilcbiAgLy8gY2xvc2luZyBkb3VibGVzXG4gIC5yZXBsYWNlKC9cIi9nLCBcIlxcdTIwMURcIilcbiAgLy8gZWxsaXBzZXNcbiAgLnJlcGxhY2UoL1xcLnszfS9nLCBcIlxcdTIwMjZcIik7XG59XG5cbi8qKlxuICogbWFuZ2xlIGVtYWlsIGFkZHJlc3Nlc1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqL1xuZnVuY3Rpb24gbWFuZ2xlKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnLFxuICAgIGksXG4gICAgY2g7XG4gIHZhciBsID0gdGV4dC5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG52YXIgTGV4ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2Vucy5saW5rcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbml6ZXIgPSB0aGlzLm9wdGlvbnMudG9rZW5pemVyIHx8IG5ldyBUb2tlbml6ZXIoKTtcbiAgICB0aGlzLnRva2VuaXplciA9IHRoaXMub3B0aW9ucy50b2tlbml6ZXI7XG4gICAgdGhpcy50b2tlbml6ZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLnRva2VuaXplci5sZXhlciA9IHRoaXM7XG4gICAgdGhpcy5pbmxpbmVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbkxpbms6IGZhbHNlLFxuICAgICAgaW5SYXdCbG9jazogZmFsc2UsXG4gICAgICB0b3A6IHRydWVcbiAgICB9O1xuICAgIHZhciBydWxlcyA9IHtcbiAgICAgIGJsb2NrOiBibG9jay5ub3JtYWwsXG4gICAgICBpbmxpbmU6IGlubGluZS5ub3JtYWxcbiAgICB9O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgIHJ1bGVzLmJsb2NrID0gYmxvY2sucGVkYW50aWM7XG4gICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUucGVkYW50aWM7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgICBydWxlcy5ibG9jayA9IGJsb2NrLmdmbTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICAgIHJ1bGVzLmlubGluZSA9IGlubGluZS5icmVha3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUuZ2ZtO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VuaXplci5ydWxlcyA9IHJ1bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBSdWxlc1xuICAgKi9cbiAgLyoqXG4gICAqIFN0YXRpYyBMZXggTWV0aG9kXG4gICAqL1xuICBMZXhlci5sZXggPSBmdW5jdGlvbiBsZXgoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgTGV4IElubGluZSBNZXRob2RcbiAgICovO1xuICBMZXhlci5sZXhJbmxpbmUgPSBmdW5jdGlvbiBsZXhJbmxpbmUoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5pbmxpbmVUb2tlbnMoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwcm9jZXNzaW5nXG4gICAqLztcbiAgdmFyIF9wcm90byA9IExleGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmxleCA9IGZ1bmN0aW9uIGxleChzcmMpIHtcbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJyk7XG4gICAgdGhpcy5ibG9ja1Rva2VucyhzcmMsIHRoaXMudG9rZW5zKTtcbiAgICB2YXIgbmV4dDtcbiAgICB3aGlsZSAobmV4dCA9IHRoaXMuaW5saW5lUXVldWUuc2hpZnQoKSkge1xuICAgICAgdGhpcy5pbmxpbmVUb2tlbnMobmV4dC5zcmMsIG5leHQudG9rZW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIExleGluZ1xuICAgKi87XG4gIF9wcm90by5ibG9ja1Rva2VucyA9IGZ1bmN0aW9uIGJsb2NrVG9rZW5zKHNyYywgdG9rZW5zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFx0L2csICcgICAgJykucmVwbGFjZSgvXiArJC9nbSwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXiggKikoXFx0KykvZ20sIGZ1bmN0aW9uIChfLCBsZWFkaW5nLCB0YWJzKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nICsgJyAgICAnLnJlcGVhdCh0YWJzLmxlbmd0aCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW4sIGN1dFNyYywgbGFzdFBhcmFncmFwaENsaXBwZWQ7XG4gICAgd2hpbGUgKHNyYykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrLnNvbWUoZnVuY3Rpb24gKGV4dFRva2VuaXplcikge1xuICAgICAgICBpZiAodG9rZW4gPSBleHRUb2tlbml6ZXIuY2FsbCh7XG4gICAgICAgICAgbGV4ZXI6IF90aGlzXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBuZXdsaW5lXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5zcGFjZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGlmICh0b2tlbi5yYXcubGVuZ3RoID09PSAxICYmIHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUncyBhIHNpbmdsZSBcXG4gYXMgYSBzcGFjZXIsIGl0J3MgdGVybWluYXRpbmcgdGhlIGxhc3QgbGluZSxcbiAgICAgICAgICAvLyBzbyBtb3ZlIGl0IHRoZXJlIHNvIHRoYXQgd2UgZG9uJ3QgZ2V0IHVuZWNlc3NhcnkgcGFyYWdyYXBoIHRhZ3NcbiAgICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnJhdyArPSAnXFxuJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvZGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmNvZGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBBbiBpbmRlbnRlZCBjb2RlIGJsb2NrIGNhbm5vdCBpbnRlcnJ1cHQgYSBwYXJhZ3JhcGguXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgKGxhc3RUb2tlbi50eXBlID09PSAncGFyYWdyYXBoJyB8fCBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSkge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGZlbmNlc1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZmVuY2VzKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaGVhZGluZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGhyXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5ocihzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGJsb2NrcXVvdGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmJsb2NrcXVvdGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaXN0XG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saXN0KHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHRtbFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaHRtbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlZlxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZGVmKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiAobGFzdFRva2VuLnR5cGUgPT09ICdwYXJhZ3JhcGgnIHx8IGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlW3RoaXMuaW5saW5lUXVldWUubGVuZ3RoIC0gMV0uc3JjID0gbGFzdFRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudG9rZW5zLmxpbmtzW3Rva2VuLnRhZ10pIHtcbiAgICAgICAgICB0aGlzLnRva2Vucy5saW5rc1t0b2tlbi50YWddID0ge1xuICAgICAgICAgICAgaHJlZjogdG9rZW4uaHJlZixcbiAgICAgICAgICAgIHRpdGxlOiB0b2tlbi50aXRsZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYmxlIChnZm0pXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci50YWJsZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGxoZWFkaW5nXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICAgIC8vIHByZXZlbnQgcGFyYWdyYXBoIGNvbnN1bWluZyBleHRlbnNpb25zIGJ5IGNsaXBwaW5nICdzcmMnIHRvIGV4dGVuc2lvbiBzdGFydFxuICAgICAgY3V0U3JjID0gc3JjO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2spIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IEluZmluaXR5O1xuICAgICAgICAgIHZhciB0ZW1wU3JjID0gc3JjLnNsaWNlKDEpO1xuICAgICAgICAgIHZhciB0ZW1wU3RhcnQgPSB2b2lkIDA7XG4gICAgICAgICAgX3RoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2suZm9yRWFjaChmdW5jdGlvbiAoZ2V0U3RhcnRJbmRleCkge1xuICAgICAgICAgICAgdGVtcFN0YXJ0ID0gZ2V0U3RhcnRJbmRleC5jYWxsKHtcbiAgICAgICAgICAgICAgbGV4ZXI6IHRoaXNcbiAgICAgICAgICAgIH0sIHRlbXBTcmMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZW1wU3RhcnQgPT09ICdudW1iZXInICYmIHRlbXBTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4LCB0ZW1wU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzdGFydEluZGV4IDwgSW5maW5pdHkgJiYgc3RhcnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjdXRTcmMgPSBzcmMuc3Vic3RyaW5nKDAsIHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGF0ZS50b3AgJiYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIucGFyYWdyYXBoKGN1dFNyYykpKSB7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0UGFyYWdyYXBoQ2xpcHBlZCAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9ICdcXG4nICsgdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9ICdcXG4nICsgdG9rZW4udGV4dDtcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlLnBvcCgpO1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFBhcmFncmFwaENsaXBwZWQgPSBjdXRTcmMubGVuZ3RoICE9PSBzcmMubGVuZ3RoO1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGV4dFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGV4dChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWUucG9wKCk7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZVt0aGlzLmlubGluZVF1ZXVlLmxlbmd0aCAtIDFdLnNyYyA9IGxhc3RUb2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgdmFyIGVyck1zZyA9ICdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGF0ZS50b3AgPSB0cnVlO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9wcm90by5pbmxpbmUgPSBmdW5jdGlvbiBpbmxpbmUoc3JjLCB0b2tlbnMpIHtcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmlubGluZVF1ZXVlLnB1c2goe1xuICAgICAgc3JjOiBzcmMsXG4gICAgICB0b2tlbnM6IHRva2Vuc1xuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogTGV4aW5nL0NvbXBpbGluZ1xuICAgKi87XG4gIF9wcm90by5pbmxpbmVUb2tlbnMgPSBmdW5jdGlvbiBpbmxpbmVUb2tlbnMoc3JjLCB0b2tlbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbiwgY3V0U3JjO1xuXG4gICAgLy8gU3RyaW5nIHdpdGggbGlua3MgbWFza2VkIHRvIGF2b2lkIGludGVyZmVyZW5jZSB3aXRoIGVtIGFuZCBzdHJvbmdcbiAgICB2YXIgbWFza2VkU3JjID0gc3JjO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIga2VlcFByZXZDaGFyLCBwcmV2Q2hhcjtcblxuICAgIC8vIE1hc2sgb3V0IHJlZmxpbmtzXG4gICAgaWYgKHRoaXMudG9rZW5zLmxpbmtzKSB7XG4gICAgICB2YXIgbGlua3MgPSBPYmplY3Qua2V5cyh0aGlzLnRva2Vucy5saW5rcyk7XG4gICAgICBpZiAobGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gdGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2guZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxpbmtzLmluY2x1ZGVzKG1hdGNoWzBdLnNsaWNlKG1hdGNoWzBdLmxhc3RJbmRleE9mKCdbJykgKyAxLCAtMSkpKSB7XG4gICAgICAgICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2gubGFzdEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWFzayBvdXQgb3RoZXIgYmxvY2tzXG4gICAgd2hpbGUgKChtYXRjaCA9IHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5ibG9ja1NraXAuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmJsb2NrU2tpcC5sYXN0SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIE1hc2sgb3V0IGVzY2FwZWQgZW0gJiBzdHJvbmcgZGVsaW1pdGVyc1xuICAgIHdoaWxlICgobWF0Y2ggPSB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSAyKSArICcrKycgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmVzY2FwZWRFbVN0Lmxhc3RJbmRleCk7XG4gICAgICB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QubGFzdEluZGV4LS07XG4gICAgfVxuICAgIHdoaWxlIChzcmMpIHtcbiAgICAgIGlmICgha2VlcFByZXZDaGFyKSB7XG4gICAgICAgIHByZXZDaGFyID0gJyc7XG4gICAgICB9XG4gICAgICBrZWVwUHJldkNoYXIgPSBmYWxzZTtcblxuICAgICAgLy8gZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmlubGluZSAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5pbmxpbmUuc29tZShmdW5jdGlvbiAoZXh0VG9rZW5pemVyKSB7XG4gICAgICAgIGlmICh0b2tlbiA9IGV4dFRva2VuaXplci5jYWxsKHtcbiAgICAgICAgICBsZXhlcjogX3RoaXMyXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVzY2FwZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGFnKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiB0b2tlbi50eXBlID09PSAndGV4dCcgJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saW5rKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5yZWZsaW5rKHNyYywgdGhpcy50b2tlbnMubGlua3MpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9IHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZW0gJiBzdHJvbmdcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVtU3Ryb25nKHNyYywgbWFza2VkU3JjLCBwcmV2Q2hhcikpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29kZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuY29kZXNwYW4oc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBiclxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuYnIoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWwgKGdmbSlcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmRlbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5hdXRvbGluayhzcmMsIG1hbmdsZSkpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXJsIChnZm0pXG4gICAgICBpZiAoIXRoaXMuc3RhdGUuaW5MaW5rICYmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnVybChzcmMsIG1hbmdsZSkpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRcbiAgICAgIC8vIHByZXZlbnQgaW5saW5lVGV4dCBjb25zdW1pbmcgZXh0ZW5zaW9ucyBieSBjbGlwcGluZyAnc3JjJyB0byBleHRlbnNpb24gc3RhcnRcbiAgICAgIGN1dFNyYyA9IHNyYztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBzdGFydEluZGV4ID0gSW5maW5pdHk7XG4gICAgICAgICAgdmFyIHRlbXBTcmMgPSBzcmMuc2xpY2UoMSk7XG4gICAgICAgICAgdmFyIHRlbXBTdGFydCA9IHZvaWQgMDtcbiAgICAgICAgICBfdGhpczIub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0SW5saW5lLmZvckVhY2goZnVuY3Rpb24gKGdldFN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHRlbXBTdGFydCA9IGdldFN0YXJ0SW5kZXguY2FsbCh7XG4gICAgICAgICAgICAgIGxleGVyOiB0aGlzXG4gICAgICAgICAgICB9LCB0ZW1wU3JjKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGVtcFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0ZW1wU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgICBzdGFydEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCwgdGVtcFN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc3RhcnRJbmRleCA8IEluZmluaXR5ICYmIHN0YXJ0SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY3V0U3JjID0gc3JjLnN1YnN0cmluZygwLCBzdGFydEluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaW5saW5lVGV4dChjdXRTcmMsIHNtYXJ0eXBhbnRzKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBpZiAodG9rZW4ucmF3LnNsaWNlKC0xKSAhPT0gJ18nKSB7XG4gICAgICAgICAgLy8gVHJhY2sgcHJldkNoYXIgYmVmb3JlIHN0cmluZyBvZiBfX19fIHN0YXJ0ZWRcbiAgICAgICAgICBwcmV2Q2hhciA9IHRva2VuLnJhdy5zbGljZSgtMSk7XG4gICAgICAgIH1cbiAgICAgICAga2VlcFByZXZDaGFyID0gdHJ1ZTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIHZhciBlcnJNc2cgPSAnSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhMZXhlciwgbnVsbCwgW3tcbiAgICBrZXk6IFwicnVsZXNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJsb2NrOiBibG9jayxcbiAgICAgICAgaW5saW5lOiBpbmxpbmVcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMZXhlcjtcbn0oKTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG52YXIgUmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBSZW5kZXJlci5wcm90b3R5cGU7XG4gIF9wcm90by5jb2RlID0gZnVuY3Rpb24gY29kZShfY29kZSwgaW5mb3N0cmluZywgZXNjYXBlZCkge1xuICAgIHZhciBsYW5nID0gKGluZm9zdHJpbmcgfHwgJycpLm1hdGNoKC9cXFMqLylbMF07XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KF9jb2RlLCBsYW5nKTtcbiAgICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IF9jb2RlKSB7XG4gICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICBfY29kZSA9IG91dDtcbiAgICAgIH1cbiAgICB9XG4gICAgX2NvZGUgPSBfY29kZS5yZXBsYWNlKC9cXG4kLywgJycpICsgJ1xcbic7XG4gICAgaWYgKCFsYW5nKSB7XG4gICAgICByZXR1cm4gJzxwcmU+PGNvZGU+JyArIChlc2NhcGVkID8gX2NvZGUgOiBlc2NhcGUoX2NvZGUsIHRydWUpKSArICc8L2NvZGU+PC9wcmU+XFxuJztcbiAgICB9XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4ICsgZXNjYXBlKGxhbmcpICsgJ1wiPicgKyAoZXNjYXBlZCA/IF9jb2RlIDogZXNjYXBlKF9jb2RlLCB0cnVlKSkgKyAnPC9jb2RlPjwvcHJlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1b3RlXG4gICAqLztcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHF1b3RlKSB7XG4gICAgcmV0dXJuIFwiPGJsb2NrcXVvdGU+XFxuXCIgKyBxdW90ZSArIFwiPC9ibG9ja3F1b3RlPlxcblwiO1xuICB9O1xuICBfcHJvdG8uaHRtbCA9IGZ1bmN0aW9uIGh0bWwoX2h0bWwpIHtcbiAgICByZXR1cm4gX2h0bWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxldmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByYXdcbiAgICogQHBhcmFtIHthbnl9IHNsdWdnZXJcbiAgICovO1xuICBfcHJvdG8uaGVhZGluZyA9IGZ1bmN0aW9uIGhlYWRpbmcodGV4dCwgbGV2ZWwsIHJhdywgc2x1Z2dlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVySWRzKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4ICsgc2x1Z2dlci5zbHVnKHJhdyk7XG4gICAgICByZXR1cm4gXCI8aFwiICsgbGV2ZWwgKyBcIiBpZD1cXFwiXCIgKyBpZCArIFwiXFxcIj5cIiArIHRleHQgKyBcIjwvaFwiICsgbGV2ZWwgKyBcIj5cXG5cIjtcbiAgICB9XG5cbiAgICAvLyBpZ25vcmUgSURzXG4gICAgcmV0dXJuIFwiPGhcIiArIGxldmVsICsgXCI+XCIgKyB0ZXh0ICsgXCI8L2hcIiArIGxldmVsICsgXCI+XFxuXCI7XG4gIH07XG4gIF9wcm90by5ociA9IGZ1bmN0aW9uIGhyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3QoYm9keSwgb3JkZXJlZCwgc3RhcnQpIHtcbiAgICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJyxcbiAgICAgIHN0YXJ0YXR0ID0gb3JkZXJlZCAmJiBzdGFydCAhPT0gMSA/ICcgc3RhcnQ9XCInICsgc3RhcnQgKyAnXCInIDogJyc7XG4gICAgcmV0dXJuICc8JyArIHR5cGUgKyBzdGFydGF0dCArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5saXN0aXRlbSA9IGZ1bmN0aW9uIGxpc3RpdGVtKHRleHQpIHtcbiAgICByZXR1cm4gXCI8bGk+XCIgKyB0ZXh0ICsgXCI8L2xpPlxcblwiO1xuICB9O1xuICBfcHJvdG8uY2hlY2tib3ggPSBmdW5jdGlvbiBjaGVja2JveChjaGVja2VkKSB7XG4gICAgcmV0dXJuICc8aW5wdXQgJyArIChjaGVja2VkID8gJ2NoZWNrZWQ9XCJcIiAnIDogJycpICsgJ2Rpc2FibGVkPVwiXCIgdHlwZT1cImNoZWNrYm94XCInICsgKHRoaXMub3B0aW9ucy54aHRtbCA/ICcgLycgOiAnJykgKyAnPiAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaCh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPHA+XCIgKyB0ZXh0ICsgXCI8L3A+XFxuXCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuICAgKi87XG4gIF9wcm90by50YWJsZSA9IGZ1bmN0aW9uIHRhYmxlKGhlYWRlciwgYm9keSkge1xuICAgIGlmIChib2R5KSBib2R5ID0gXCI8dGJvZHk+XCIgKyBib2R5ICsgXCI8L3Rib2R5PlwiO1xuICAgIHJldHVybiAnPHRhYmxlPlxcbicgKyAnPHRoZWFkPlxcbicgKyBoZWFkZXIgKyAnPC90aGVhZD5cXG4nICsgYm9keSArICc8L3RhYmxlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovO1xuICBfcHJvdG8udGFibGVyb3cgPSBmdW5jdGlvbiB0YWJsZXJvdyhjb250ZW50KSB7XG4gICAgcmV0dXJuIFwiPHRyPlxcblwiICsgY29udGVudCArIFwiPC90cj5cXG5cIjtcbiAgfTtcbiAgX3Byb3RvLnRhYmxlY2VsbCA9IGZ1bmN0aW9uIHRhYmxlY2VsbChjb250ZW50LCBmbGFncykge1xuICAgIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gICAgdmFyIHRhZyA9IGZsYWdzLmFsaWduID8gXCI8XCIgKyB0eXBlICsgXCIgYWxpZ249XFxcIlwiICsgZmxhZ3MuYWxpZ24gKyBcIlxcXCI+XCIgOiBcIjxcIiArIHR5cGUgKyBcIj5cIjtcbiAgICByZXR1cm4gdGFnICsgY29udGVudCArIChcIjwvXCIgKyB0eXBlICsgXCI+XFxuXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNwYW4gbGV2ZWwgcmVuZGVyZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uc3Ryb25nID0gZnVuY3Rpb24gc3Ryb25nKHRleHQpIHtcbiAgICByZXR1cm4gXCI8c3Ryb25nPlwiICsgdGV4dCArIFwiPC9zdHJvbmc+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPGVtPlwiICsgdGV4dCArIFwiPC9lbT5cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gXCI8Y29kZT5cIiArIHRleHQgKyBcIjwvY29kZT5cIjtcbiAgfTtcbiAgX3Byb3RvLmJyID0gZnVuY3Rpb24gYnIoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHRleHQpIHtcbiAgICByZXR1cm4gXCI8ZGVsPlwiICsgdGV4dCArIFwiPC9kZWw+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5pbWFnZSA9IGZ1bmN0aW9uIGltYWdlKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9IFwiPGltZyBzcmM9XFxcIlwiICsgaHJlZiArIFwiXFxcIiBhbHQ9XFxcIlwiICsgdGV4dCArIFwiXFxcIlwiO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9IFwiIHRpdGxlPVxcXCJcIiArIHRpdGxlICsgXCJcXFwiXCI7XG4gICAgfVxuICAgIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgcmV0dXJuIFJlbmRlcmVyO1xufSgpO1xuXG4vKipcbiAqIFRleHRSZW5kZXJlclxuICogcmV0dXJucyBvbmx5IHRoZSB0ZXh0dWFsIHBhcnQgb2YgdGhlIHRva2VuXG4gKi9cbnZhciBUZXh0UmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUZXh0UmVuZGVyZXIoKSB7fVxuICB2YXIgX3Byb3RvID0gVGV4dFJlbmRlcmVyLnByb3RvdHlwZTtcbiAgLy8gbm8gbmVlZCBmb3IgYmxvY2sgbGV2ZWwgcmVuZGVyZXJzXG4gIF9wcm90by5zdHJvbmcgPSBmdW5jdGlvbiBzdHJvbmcodGV4dCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmRlbCA9IGZ1bmN0aW9uIGRlbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgcmV0dXJuICcnICsgdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmltYWdlID0gZnVuY3Rpb24gaW1hZ2UoaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgICByZXR1cm4gJycgKyB0ZXh0O1xuICB9O1xuICBfcHJvdG8uYnIgPSBmdW5jdGlvbiBicigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH07XG4gIHJldHVybiBUZXh0UmVuZGVyZXI7XG59KCk7XG5cbi8qKlxuICogU2x1Z2dlciBnZW5lcmF0ZXMgaGVhZGVyIGlkXG4gKi9cbnZhciBTbHVnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2x1Z2dlcigpIHtcbiAgICB0aGlzLnNlZW4gPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHZhciBfcHJvdG8gPSBTbHVnZ2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKVxuICAgIC8vIHJlbW92ZSBodG1sIHRhZ3NcbiAgICAucmVwbGFjZSgvPFshXFwvYS16XS4qPz4vaWcsICcnKVxuICAgIC8vIHJlbW92ZSB1bndhbnRlZCBjaGFyc1xuICAgIC5yZXBsYWNlKC9bXFx1MjAwMC1cXHUyMDZGXFx1MkUwMC1cXHUyRTdGXFxcXCchXCIjJCUmKCkqKywuLzo7PD0+P0BbXFxdXmB7fH1+XS9nLCAnJykucmVwbGFjZSgvXFxzL2csICctJyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG5leHQgc2FmZSAodW5pcXVlKSBzbHVnIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxTbHVnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEcnlSdW5cbiAgICovO1xuICBfcHJvdG8uZ2V0TmV4dFNhZmVTbHVnID0gZnVuY3Rpb24gZ2V0TmV4dFNhZmVTbHVnKG9yaWdpbmFsU2x1ZywgaXNEcnlSdW4pIHtcbiAgICB2YXIgc2x1ZyA9IG9yaWdpbmFsU2x1ZztcbiAgICB2YXIgb2NjdXJlbmNlQWNjdW11bGF0b3IgPSAwO1xuICAgIGlmICh0aGlzLnNlZW4uaGFzT3duUHJvcGVydHkoc2x1ZykpIHtcbiAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yID0gdGhpcy5zZWVuW29yaWdpbmFsU2x1Z107XG4gICAgICBkbyB7XG4gICAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yKys7XG4gICAgICAgIHNsdWcgPSBvcmlnaW5hbFNsdWcgKyAnLScgKyBvY2N1cmVuY2VBY2N1bXVsYXRvcjtcbiAgICAgIH0gd2hpbGUgKHRoaXMuc2Vlbi5oYXNPd25Qcm9wZXJ0eShzbHVnKSk7XG4gICAgfVxuICAgIGlmICghaXNEcnlSdW4pIHtcbiAgICAgIHRoaXMuc2VlbltvcmlnaW5hbFNsdWddID0gb2NjdXJlbmNlQWNjdW11bGF0b3I7XG4gICAgICB0aGlzLnNlZW5bc2x1Z10gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gc2x1ZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHN0cmluZyB0byB1bmlxdWUgaWRcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRyeXJ1bl0gR2VuZXJhdGVzIHRoZSBuZXh0IHVuaXF1ZSBzbHVnIHdpdGhvdXRcbiAgICogdXBkYXRpbmcgdGhlIGludGVybmFsIGFjY3VtdWxhdG9yLlxuICAgKi87XG4gIF9wcm90by5zbHVnID0gZnVuY3Rpb24gc2x1Zyh2YWx1ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdmFyIHNsdWcgPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFNhZmVTbHVnKHNsdWcsIG9wdGlvbnMuZHJ5cnVuKTtcbiAgfTtcbiAgcmV0dXJuIFNsdWdnZXI7XG59KCk7XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG52YXIgUGFyc2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcigpO1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gICAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMudGV4dFJlbmRlcmVyID0gbmV3IFRleHRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2x1Z2dlciA9IG5ldyBTbHVnZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICAgKi9cbiAgUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBQYXJzZSBJbmxpbmUgTWV0aG9kXG4gICAqLztcbiAgUGFyc2VyLnBhcnNlSW5saW5lID0gZnVuY3Rpb24gcGFyc2VJbmxpbmUodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZUlubGluZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIExvb3BcbiAgICovO1xuICB2YXIgX3Byb3RvID0gUGFyc2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCB0b3ApIHtcbiAgICBpZiAodG9wID09PSB2b2lkIDApIHtcbiAgICAgIHRvcCA9IHRydWU7XG4gICAgfVxuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgayxcbiAgICAgIGwyLFxuICAgICAgbDMsXG4gICAgICByb3csXG4gICAgICBjZWxsLFxuICAgICAgaGVhZGVyLFxuICAgICAgYm9keSxcbiAgICAgIHRva2VuLFxuICAgICAgb3JkZXJlZCxcbiAgICAgIHN0YXJ0LFxuICAgICAgbG9vc2UsXG4gICAgICBpdGVtQm9keSxcbiAgICAgIGl0ZW0sXG4gICAgICBjaGVja2VkLFxuICAgICAgdGFzayxcbiAgICAgIGNoZWNrYm94LFxuICAgICAgcmV0O1xuICAgIHZhciBsID0gdG9rZW5zLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gUnVuIGFueSByZW5kZXJlciBleHRlbnNpb25zXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVyc1t0b2tlbi50eXBlXSkge1xuICAgICAgICByZXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0uY2FsbCh7XG4gICAgICAgICAgcGFyc2VyOiB0aGlzXG4gICAgICAgIH0sIHRva2VuKTtcbiAgICAgICAgaWYgKHJldCAhPT0gZmFsc2UgfHwgIVsnc3BhY2UnLCAnaHInLCAnaGVhZGluZycsICdjb2RlJywgJ3RhYmxlJywgJ2Jsb2NrcXVvdGUnLCAnbGlzdCcsICdodG1sJywgJ3BhcmFncmFwaCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhlYWRpbmcodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMpLCB0b2tlbi5kZXB0aCwgdW5lc2NhcGUodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHRoaXMudGV4dFJlbmRlcmVyKSksIHRoaXMuc2x1Z2dlcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGUodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgdG9rZW4uZXNjYXBlZCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBoZWFkZXIgPSAnJztcblxuICAgICAgICAgICAgLy8gaGVhZGVyXG4gICAgICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLmhlYWRlci5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDI7IGorKykge1xuICAgICAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKHRoaXMucGFyc2VJbmxpbmUodG9rZW4uaGVhZGVyW2pdLnRva2VucyksIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2pdXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICAgICAgICBib2R5ID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGwyOyBqKyspIHtcbiAgICAgICAgICAgICAgcm93ID0gdG9rZW4ucm93c1tqXTtcbiAgICAgICAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICAgICAgICBsMyA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBsMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbCh0aGlzLnBhcnNlSW5saW5lKHJvd1trXS50b2tlbnMpLCB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2tdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYmxvY2txdW90ZSc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgYm9keSA9IHRoaXMucGFyc2UodG9rZW4udG9rZW5zKTtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9yZGVyZWQgPSB0b2tlbi5vcmRlcmVkO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgIGxvb3NlID0gdG9rZW4ubG9vc2U7XG4gICAgICAgICAgICBsMiA9IHRva2VuLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJvZHkgPSAnJztcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsMjsgaisrKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSB0b2tlbi5pdGVtc1tqXTtcbiAgICAgICAgICAgICAgY2hlY2tlZCA9IGl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgdGFzayA9IGl0ZW0udGFzaztcbiAgICAgICAgICAgICAgaXRlbUJvZHkgPSAnJztcbiAgICAgICAgICAgICAgaWYgKGl0ZW0udGFzaykge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94ID0gdGhpcy5yZW5kZXJlci5jaGVja2JveChjaGVja2VkKTtcbiAgICAgICAgICAgICAgICBpZiAobG9vc2UpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vucy5sZW5ndGggPiAwICYmIGl0ZW0udG9rZW5zWzBdLnR5cGUgPT09ICdwYXJhZ3JhcGgnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRleHQgPSBjaGVja2JveCArICcgJyArIGl0ZW0udG9rZW5zWzBdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vuc1swXS50b2tlbnMgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zLmxlbmd0aCA+IDAgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zWzBdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRva2Vuc1swXS50ZXh0ID0gY2hlY2tib3ggKyAnICcgKyBpdGVtLnRva2Vuc1swXS50b2tlbnNbMF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50b2tlbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpdGVtQm9keSArPSBjaGVja2JveDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaXRlbUJvZHkgKz0gdGhpcy5wYXJzZShpdGVtLnRva2VucywgbG9vc2UpO1xuICAgICAgICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oaXRlbUJvZHksIHRhc2ssIGNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkLCBzdGFydCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRPRE8gcGFyc2UgaW5saW5lIGNvbnRlbnQgaWYgcGFyYW1ldGVyIG1hcmtkb3duPTFcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJvZHkgPSB0b2tlbi50b2tlbnMgPyB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucykgOiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgd2hpbGUgKGkgKyAxIDwgbCAmJiB0b2tlbnNbaSArIDFdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgICBib2R5ICs9ICdcXG4nICsgKHRva2VuLnRva2VucyA/IHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSA6IHRva2VuLnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRvcCA/IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKGJvZHkpIDogYm9keTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyTXNnID0gJ1Rva2VuIHdpdGggXCInICsgdG9rZW4udHlwZSArICdcIiB0eXBlIHdhcyBub3QgZm91bmQuJztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIElubGluZSBUb2tlbnNcbiAgICovO1xuICBfcHJvdG8ucGFyc2VJbmxpbmUgPSBmdW5jdGlvbiBwYXJzZUlubGluZSh0b2tlbnMsIHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIgPSByZW5kZXJlciB8fCB0aGlzLnJlbmRlcmVyO1xuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICB0b2tlbixcbiAgICAgIHJldDtcbiAgICB2YXIgbCA9IHRva2Vucy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIC8vIFJ1biBhbnkgcmVuZGVyZXIgZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVycyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgcmV0ID0gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzW3Rva2VuLnR5cGVdLmNhbGwoe1xuICAgICAgICAgIHBhcnNlcjogdGhpc1xuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIGlmIChyZXQgIT09IGZhbHNlIHx8ICFbJ2VzY2FwZScsICdodG1sJywgJ2xpbmsnLCAnaW1hZ2UnLCAnc3Ryb25nJywgJ2VtJywgJ2NvZGVzcGFuJywgJ2JyJywgJ2RlbCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZXNjYXBlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIudGV4dCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5saW5rKHRva2VuLmhyZWYsIHRva2VuLnRpdGxlLCB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5pbWFnZSh0b2tlbi5ocmVmLCB0b2tlbi50aXRsZSwgdG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N0cm9uZyc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLnN0cm9uZyh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnZW0nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5lbSh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29kZXNwYW4nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5jb2Rlc3Bhbih0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYnInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5icigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdkZWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5kZWwodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHJlbmRlcmVyKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci50ZXh0KHRva2VuLnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJNc2cgPSAnVG9rZW4gd2l0aCBcIicgKyB0b2tlbi50eXBlICsgJ1wiIHR5cGUgd2FzIG5vdCBmb3VuZC4nO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIHJldHVybiBQYXJzZXI7XG59KCk7XG5cbnZhciBIb29rcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEhvb2tzKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gIH1cbiAgdmFyIF9wcm90byA9IEhvb2tzLnByb3RvdHlwZTtcbiAgLyoqXG4gICAqIFByb2Nlc3MgbWFya2Rvd24gYmVmb3JlIG1hcmtlZFxuICAgKi9cbiAgX3Byb3RvLnByZXByb2Nlc3MgPSBmdW5jdGlvbiBwcmVwcm9jZXNzKG1hcmtkb3duKSB7XG4gICAgcmV0dXJuIG1hcmtkb3duO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgSFRNTCBhZnRlciBtYXJrZWQgaXMgZmluaXNoZWRcbiAgICovO1xuICBfcHJvdG8ucG9zdHByb2Nlc3MgPSBmdW5jdGlvbiBwb3N0cHJvY2VzcyhodG1sKSB7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG4gIHJldHVybiBIb29rcztcbn0oKTtcbkhvb2tzLnBhc3NUaHJvdWdoSG9va3MgPSBuZXcgU2V0KFsncHJlcHJvY2VzcycsICdwb3N0cHJvY2VzcyddKTtcblxuZnVuY3Rpb24gb25FcnJvcihzaWxlbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWFya2VkanMvbWFya2VkLic7XG4gICAgaWYgKHNpbGVudCkge1xuICAgICAgdmFyIG1zZyA9ICc8cD5BbiBlcnJvciBvY2N1cnJlZDo8L3A+PHByZT4nICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKSArICc8L3ByZT4nO1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobXNnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBtc2cpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlTWFya2Rvd24obGV4ZXIsIHBhcnNlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuICAgIHZhciBvcmlnT3B0ID0gX2V4dGVuZHMoe30sIG9wdCk7XG4gICAgb3B0ID0gX2V4dGVuZHMoe30sIG1hcmtlZC5kZWZhdWx0cywgb3JpZ09wdCk7XG4gICAgdmFyIHRocm93RXJyb3IgPSBvbkVycm9yKG9wdC5zaWxlbnQsIG9wdC5hc3luYywgY2FsbGJhY2spO1xuXG4gICAgLy8gdGhyb3cgZXJyb3IgaW4gY2FzZSBvZiBub24gc3RyaW5nIGlucHV0XG4gICAgaWYgKHR5cGVvZiBzcmMgPT09ICd1bmRlZmluZWQnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdtYXJrZWQoKTogaW5wdXQgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZCBvciBudWxsJykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyBvZiB0eXBlICcgKyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3JjKSArICcsIHN0cmluZyBleHBlY3RlZCcpKTtcbiAgICB9XG4gICAgY2hlY2tTYW5pdGl6ZURlcHJlY2F0aW9uKG9wdCk7XG4gICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgb3B0Lmhvb2tzLm9wdGlvbnMgPSBvcHQ7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHQ7XG4gICAgICB2YXIgdG9rZW5zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgICAgIHNyYyA9IG9wdC5ob29rcy5wcmVwcm9jZXNzKHNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH1cbiAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgdmFyIG91dDtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKHRva2Vucywgb3B0LndhbGtUb2tlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ID0gcGFyc2VyKHRva2Vucywgb3B0KTtcbiAgICAgICAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgICAgICAgb3V0ID0gb3B0Lmhvb2tzLnBvc3Rwcm9jZXNzKG91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGVyciA/IHRocm93RXJyb3IoZXJyKSA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgICB9O1xuICAgICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuICAgICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4gZG9uZSgpO1xuICAgICAgdmFyIHBlbmRpbmcgPSAwO1xuICAgICAgbWFya2VkLndhbGtUb2tlbnModG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgIHBlbmRpbmcrKztcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbiAoZXJyLCBjb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjb2RlICE9IG51bGwgJiYgY29kZSAhPT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgICAgICAgaWYgKHBlbmRpbmcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChwZW5kaW5nID09PSAwKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdC5hc3luYykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvcHQuaG9va3MgPyBvcHQuaG9va3MucHJlcHJvY2VzcyhzcmMpIDogc3JjKS50aGVuKGZ1bmN0aW9uIChzcmMpIHtcbiAgICAgICAgcmV0dXJuIGxleGVyKHNyYywgb3B0KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICByZXR1cm4gb3B0LndhbGtUb2tlbnMgPyBQcm9taXNlLmFsbChtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbnMsIG9wdC53YWxrVG9rZW5zKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfSkgOiB0b2tlbnM7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlcih0b2tlbnMsIG9wdCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgIHJldHVybiBvcHQuaG9va3MgPyBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCkgOiBodG1sO1xuICAgICAgfSlbXCJjYXRjaFwiXSh0aHJvd0Vycm9yKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgc3JjID0gb3B0Lmhvb2tzLnByZXByb2Nlc3Moc3JjKTtcbiAgICAgIH1cbiAgICAgIHZhciBfdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKF90b2tlbnMsIG9wdC53YWxrVG9rZW5zKTtcbiAgICAgIH1cbiAgICAgIHZhciBodG1sID0gcGFyc2VyKF90b2tlbnMsIG9wdCk7XG4gICAgICBpZiAob3B0Lmhvb2tzKSB7XG4gICAgICAgIGh0bWwgPSBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogTWFya2VkXG4gKi9cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHBhcnNlTWFya2Rvd24oTGV4ZXIubGV4LCBQYXJzZXIucGFyc2UpKHNyYywgb3B0LCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID0gbWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0KSB7XG4gIG1hcmtlZC5kZWZhdWx0cyA9IF9leHRlbmRzKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIGNoYW5nZURlZmF1bHRzKG1hcmtlZC5kZWZhdWx0cyk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xubWFya2VkLmdldERlZmF1bHRzID0gZ2V0RGVmYXVsdHM7XG5tYXJrZWQuZGVmYXVsdHMgPSBleHBvcnRzLmRlZmF1bHRzO1xuXG4vKipcbiAqIFVzZSBFeHRlbnNpb25cbiAqL1xuXG5tYXJrZWQudXNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZXh0ZW5zaW9ucyA9IG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zIHx8IHtcbiAgICByZW5kZXJlcnM6IHt9LFxuICAgIGNoaWxkVG9rZW5zOiB7fVxuICB9O1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAocGFjaykge1xuICAgIC8vIGNvcHkgb3B0aW9ucyB0byBuZXcgb2JqZWN0XG4gICAgdmFyIG9wdHMgPSBfZXh0ZW5kcyh7fSwgcGFjayk7XG5cbiAgICAvLyBzZXQgYXN5bmMgdG8gdHJ1ZSBpZiBpdCB3YXMgc2V0IHRvIHRydWUgYmVmb3JlXG4gICAgb3B0cy5hc3luYyA9IG1hcmtlZC5kZWZhdWx0cy5hc3luYyB8fCBvcHRzLmFzeW5jIHx8IGZhbHNlO1xuXG4gICAgLy8gPT0tLSBQYXJzZSBcImFkZG9uXCIgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2suZXh0ZW5zaW9ucykge1xuICAgICAgcGFjay5leHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dCkge1xuICAgICAgICBpZiAoIWV4dC5uYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHRlbnNpb24gbmFtZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHQucmVuZGVyZXIpIHtcbiAgICAgICAgICAvLyBSZW5kZXJlciBleHRlbnNpb25zXG4gICAgICAgICAgdmFyIHByZXZSZW5kZXJlciA9IGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXTtcbiAgICAgICAgICBpZiAocHJldlJlbmRlcmVyKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGV4dGVuc2lvbiB3aXRoIGZ1bmMgdG8gcnVuIG5ldyBleHRlbnNpb24gYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgICAgZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IGV4dC5yZW5kZXJlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2UmVuZGVyZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXSA9IGV4dC5yZW5kZXJlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dC50b2tlbml6ZXIpIHtcbiAgICAgICAgICAvLyBUb2tlbml6ZXIgRXh0ZW5zaW9uc1xuICAgICAgICAgIGlmICghZXh0LmxldmVsIHx8IGV4dC5sZXZlbCAhPT0gJ2Jsb2NrJyAmJiBleHQubGV2ZWwgIT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleHRlbnNpb24gbGV2ZWwgbXVzdCBiZSAnYmxvY2snIG9yICdpbmxpbmUnXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uc1tleHQubGV2ZWxdKSB7XG4gICAgICAgICAgICBleHRlbnNpb25zW2V4dC5sZXZlbF0udW5zaGlmdChleHQudG9rZW5pemVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5zaW9uc1tleHQubGV2ZWxdID0gW2V4dC50b2tlbml6ZXJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0LnN0YXJ0KSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbiB0byBjaGVjayBmb3Igc3RhcnQgb2YgdG9rZW5cbiAgICAgICAgICAgIGlmIChleHQubGV2ZWwgPT09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuc3RhcnRCbG9jaykge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRCbG9jay5wdXNoKGV4dC5zdGFydCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9ucy5zdGFydEJsb2NrID0gW2V4dC5zdGFydF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXh0LmxldmVsID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUucHVzaChleHQuc3RhcnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUgPSBbZXh0LnN0YXJ0XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0LmNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgLy8gQ2hpbGQgdG9rZW5zIHRvIGJlIHZpc2l0ZWQgYnkgd2Fsa1Rva2Vuc1xuICAgICAgICAgIGV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbZXh0Lm5hbWVdID0gZXh0LmNoaWxkVG9rZW5zO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9wdHMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBcIm92ZXJ3cml0ZVwiIGV4dGVuc2lvbnMgLS09PSAvL1xuICAgIGlmIChwYWNrLnJlbmRlcmVyKSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSBtYXJrZWQuZGVmYXVsdHMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyKCk7XG4gICAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlJlbmRlcmVyID0gcmVuZGVyZXJbcHJvcF07XG4gICAgICAgICAgLy8gUmVwbGFjZSByZW5kZXJlciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHJlbmRlcmVyW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLnJlbmRlcmVyW3Byb3BdLmFwcGx5KHJlbmRlcmVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZSZW5kZXJlci5hcHBseShyZW5kZXJlciwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFjay5yZW5kZXJlcikge1xuICAgICAgICAgIF9sb29wKHByb3ApO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGlmIChwYWNrLnRva2VuaXplcikge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuaXplciA9IG1hcmtlZC5kZWZhdWx0cy50b2tlbml6ZXIgfHwgbmV3IFRva2VuaXplcigpO1xuICAgICAgICB2YXIgX2xvb3AyID0gZnVuY3Rpb24gX2xvb3AyKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlRva2VuaXplciA9IHRva2VuaXplcltwcm9wXTtcbiAgICAgICAgICAvLyBSZXBsYWNlIHRva2VuaXplciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHRva2VuaXplcltwcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmV0ID0gcGFjay50b2tlbml6ZXJbcHJvcF0uYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZUb2tlbml6ZXIuYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwYWNrLnRva2VuaXplcikge1xuICAgICAgICAgIF9sb29wMihwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLnRva2VuaXplciA9IHRva2VuaXplcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBIb29rcyBleHRlbnNpb25zIC0tPT0gLy9cbiAgICBpZiAocGFjay5ob29rcykge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhvb2tzID0gbWFya2VkLmRlZmF1bHRzLmhvb2tzIHx8IG5ldyBIb29rcygpO1xuICAgICAgICB2YXIgX2xvb3AzID0gZnVuY3Rpb24gX2xvb3AzKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldkhvb2sgPSBob29rc1twcm9wXTtcbiAgICAgICAgICBpZiAoSG9va3MucGFzc1Rocm91Z2hIb29rcy5oYXMocHJvcCkpIHtcbiAgICAgICAgICAgIGhvb2tzW3Byb3BdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYWNrLmhvb2tzW3Byb3BdLmNhbGwoaG9va3MsIGFyZykpLnRoZW4oZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IHBhY2suaG9va3NbcHJvcF0uY2FsbChob29rcywgYXJnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob29rc1twcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLmhvb2tzW3Byb3BdLmFwcGx5KGhvb2tzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2SG9vay5hcHBseShob29rcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhY2suaG9va3MpIHtcbiAgICAgICAgICBfbG9vcDMocHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cy5ob29rcyA9IGhvb2tzO1xuICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICAvLyA9PS0tIFBhcnNlIFdhbGtUb2tlbnMgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2sud2Fsa1Rva2Vucykge1xuICAgICAgdmFyIF93YWxrVG9rZW5zID0gbWFya2VkLmRlZmF1bHRzLndhbGtUb2tlbnM7XG4gICAgICBvcHRzLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICB2YWx1ZXMucHVzaChwYWNrLndhbGtUb2tlbnMuY2FsbCh0aGlzLCB0b2tlbikpO1xuICAgICAgICBpZiAoX3dhbGtUb2tlbnMpIHtcbiAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KF93YWxrVG9rZW5zLmNhbGwodGhpcywgdG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfTtcbiAgICB9XG4gICAgbWFya2VkLnNldE9wdGlvbnMob3B0cyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSdW4gY2FsbGJhY2sgZm9yIGV2ZXJ5IHRva2VuXG4gKi9cblxubWFya2VkLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCBjYWxsYmFjaykge1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBfbG9vcDQgPSBmdW5jdGlvbiBfbG9vcDQoKSB7XG4gICAgdmFyIHRva2VuID0gX3N0ZXAudmFsdWU7XG4gICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChjYWxsYmFjay5jYWxsKG1hcmtlZCwgdG9rZW4pKTtcbiAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLmhlYWRlciksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnMoY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLnJvd3MpLCBfc3RlcDM7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMygpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHJvdyA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHJvdyksIF9zdGVwNDsgIShfc3RlcDQgPSBfaXRlcmF0b3I0KCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBfY2VsbCA9IF9zdGVwNC52YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChtYXJrZWQud2Fsa1Rva2VucyhfY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdsaXN0JzpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4uaXRlbXMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgICAgIC8vIFdhbGsgYW55IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zLmNoaWxkVG9rZW5zW3Rva2VuLnR5cGVdLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW5bY2hpbGRUb2tlbnNdLCBjYWxsYmFjaykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50b2tlbnMpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4udG9rZW5zLCBjYWxsYmFjaykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSh0b2tlbnMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgIF9sb29wNCgpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59O1xuXG4vKipcbiAqIFBhcnNlIElubGluZVxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICovXG5tYXJrZWQucGFyc2VJbmxpbmUgPSBwYXJzZU1hcmtkb3duKExleGVyLmxleElubGluZSwgUGFyc2VyLnBhcnNlSW5saW5lKTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcbm1hcmtlZC5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcbm1hcmtlZC5Ub2tlbml6ZXIgPSBUb2tlbml6ZXI7XG5tYXJrZWQuU2x1Z2dlciA9IFNsdWdnZXI7XG5tYXJrZWQuSG9va3MgPSBIb29rcztcbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcbnZhciBvcHRpb25zID0gbWFya2VkLm9wdGlvbnM7XG52YXIgc2V0T3B0aW9ucyA9IG1hcmtlZC5zZXRPcHRpb25zO1xudmFyIHVzZSA9IG1hcmtlZC51c2U7XG52YXIgd2Fsa1Rva2VucyA9IG1hcmtlZC53YWxrVG9rZW5zO1xudmFyIHBhcnNlSW5saW5lID0gbWFya2VkLnBhcnNlSW5saW5lO1xudmFyIHBhcnNlID0gbWFya2VkO1xudmFyIHBhcnNlciA9IFBhcnNlci5wYXJzZTtcbnZhciBsZXhlciA9IExleGVyLmxleDtcblxuZXhwb3J0cy5Ib29rcyA9IEhvb2tzO1xuZXhwb3J0cy5MZXhlciA9IExleGVyO1xuZXhwb3J0cy5QYXJzZXIgPSBQYXJzZXI7XG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5leHBvcnRzLlNsdWdnZXIgPSBTbHVnZ2VyO1xuZXhwb3J0cy5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5leHBvcnRzLlRva2VuaXplciA9IFRva2VuaXplcjtcbmV4cG9ydHMuZ2V0RGVmYXVsdHMgPSBnZXREZWZhdWx0cztcbmV4cG9ydHMubGV4ZXIgPSBsZXhlcjtcbmV4cG9ydHMubWFya2VkID0gbWFya2VkO1xuZXhwb3J0cy5vcHRpb25zID0gb3B0aW9ucztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMucGFyc2VJbmxpbmUgPSBwYXJzZUlubGluZTtcbmV4cG9ydHMucGFyc2VyID0gcGFyc2VyO1xuZXhwb3J0cy5zZXRPcHRpb25zID0gc2V0T3B0aW9ucztcbmV4cG9ydHMudXNlID0gdXNlO1xuZXhwb3J0cy53YWxrVG9rZW5zID0gd2Fsa1Rva2VucztcbiIsICJjb25zdCB7IG1hcmtlZCB9ID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbm1hcmtlZC5zZXRPcHRpb25zKHsgYnJlYWtzOiB0cnVlLCBzbWFydHlQYW50czogdHJ1ZSB9KTtcblxuY2xhc3MgSjJNIHtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEhUTUwgKGp1c3QgYSB3cmFwcGVyIHRvIE1hcmtlZCdzIHBhcnNlIG1ldGhvZCkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFN0cmluZyB0byBjb252ZXJ0IGZyb20gTWFya2Rvd24gdG8gSFRNTFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyBtZF90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKHN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBKaXJhIFdpa2kgc3RyaW5nIGludG8gSFRNTC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gU3RyaW5nIHRvIGNvbnZlcnQgZnJvbSBKaXJhIFdpa2kgc3ludGF4IHRvIEhUTUxcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgamlyYV90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKEoyTS50b19tYXJrZG93bihzdHIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEppcmEgV2lraSBzdHJpbmcgaW50byBNYXJrZG93bi5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gSmlyYSBXaWtpIHN0cmluZyB0byBjb252ZXJ0IHRvIE1hcmtkb3duXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIE1hcmtkb3duIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyB0b19tYXJrZG93bihzdHIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHN0clxuICAgICAgICAgICAgICAgIC8vIFVuLU9yZGVyZWQgTGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlsgXFx0XSooXFwqKylcXHMrL2dtLCAobWF0Y2gsIHN0YXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtBcnJheShzdGFycy5sZW5ndGgpLmpvaW4oJyAgJyl9KiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3JkZXJlZCBsaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigjKylcXHMrL2dtLCAobWF0Y2gsIG51bXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KG51bXMubGVuZ3RoKS5qb2luKCcgICAnKX0xLiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gSGVhZGVycyAxLTZcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXmgoWzAtNl0pXFwuKC4qKSQvZ20sIChtYXRjaCwgbGV2ZWwsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHBhcnNlSW50KGxldmVsLCAxMCkgKyAxKS5qb2luKCcjJykgKyBjb250ZW50O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gQm9sZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCooXFxTLiopXFwqL2csICcqKiQxKionKVxuICAgICAgICAgICAgICAgIC8vIEl0YWxpY1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fKFxcUy4qKV8vZywgJyokMSonKVxuICAgICAgICAgICAgICAgIC8vIE1vbm9zcGFjZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtcXHsoW159XSspXFx9XFx9L2csICdgJDFgJylcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMgKGJ1Z2d5KVxuICAgICAgICAgICAgICAgIC8vIC5yZXBsYWNlKC9cXD9cXD8oKD86LlteP118W14/XS4pKylcXD9cXD8vZywgJzxjaXRlPiQxPC9jaXRlPicpXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsoW14rXSopXFwrL2csICc8aW5zPiQxPC9pbnM+JylcbiAgICAgICAgICAgICAgICAvLyBTdXBlcnNjcmlwdFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXF4oW15eXSopXFxeL2csICc8c3VwPiQxPC9zdXA+JylcbiAgICAgICAgICAgICAgICAvLyBTdWJzY3JpcHRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvfihbXn5dKil+L2csICc8c3ViPiQxPC9zdWI+JylcbiAgICAgICAgICAgICAgICAvLyBTdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKS0oXFxTKy4qP1xcUyktKFxccyspL2csICckMX5+JDJ+fiQzJylcbiAgICAgICAgICAgICAgICAvLyBDb2RlIEJsb2NrXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXHtjb2RlKDooW2Etel0rKSk/KFs6fF0/KHRpdGxlfGJvcmRlclN0eWxlfGJvcmRlckNvbG9yfGJvcmRlcldpZHRofGJnQ29sb3J8dGl0bGVCR0NvbG9yKT0uKz8pKlxcfShbXl0qPylcXG4/XFx7Y29kZVxcfS9nbSxcbiAgICAgICAgICAgICAgICAgICAgJ2BgYCQyJDVcXG5gYGAnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC8vIFByZS1mb3JtYXR0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97bm9mb3JtYXR9L2csICdgYGAnKVxuICAgICAgICAgICAgICAgIC8vIFVuLW5hbWVkIExpbmtzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcWyhbXnxdKz8pXFxdL2csICc8JDE+JylcbiAgICAgICAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvISguKykhL2csICchW10oJDEpJylcbiAgICAgICAgICAgICAgICAvLyBOYW1lZCBMaW5rc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoLis/KVxcfCguKz8pXFxdL2csICdbJDFdKCQyKScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15icVxcLlxccysvZ20sICc+ICcpXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNvbG9yOiB1bnN1cHBvcnRlZCBpbiBtZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtjb2xvcjpbXn1dK1xcfShbXl0qPylcXHtjb2xvclxcfS9nbSwgJyQxJylcbiAgICAgICAgICAgICAgICAvLyBwYW5lbCBpbnRvIHRhYmxlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xce3BhbmVsOnRpdGxlPShbXn1dKilcXH1cXG4/KFteXSo/KVxcbj9cXHtwYW5lbFxcfS9nbSwgJ1xcbnwgJDEgfFxcbnwgLS0tIHxcXG58ICQyIHwnKVxuICAgICAgICAgICAgICAgIC8vIHRhYmxlIGhlYWRlclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigoPzpcXHxcXHwuKj8pK1xcfFxcfClbIFxcdF0qJC9nbSwgKG1hdGNoLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpbmdsZUJhcnJlZCA9IGhlYWRlcnMucmVwbGFjZSgvXFx8XFx8L2csICd8Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXFxuJHtzaW5nbGVCYXJyZWR9XFxuJHtzaW5nbGVCYXJyZWQucmVwbGFjZSgvXFx8W158XSsvZywgJ3wgLS0tICcpfWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZy1zcGFjZSBvZiB0YWJsZSBoZWFkZXJzIGFuZCByb3dzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15bIFxcdF0qXFx8L2dtLCAnfCcpXG4gICAgICAgICk7XG4gICAgICAgIC8vIC8vIHJlbW92ZSB1bnRlcm1pbmF0ZWQgaW5zZXJ0cyBhY3Jvc3MgdGFibGUgY2VsbHNcbiAgICAgICAgLy8gLnJlcGxhY2UoL1xcfChbXjxdKik8aW5zPig/IVtefF0qPFxcL2lucz4pKFtefF0qKVxcfC9nLCAoXywgcHJlY2VkaW5nLCBmb2xsb3dpbmcpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiBgfCR7cHJlY2VkaW5nfSske2ZvbGxvd2luZ318YDtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gcmVtb3ZlIHVub3BlbmVkIGluc2VydHMgYWNyb3NzIHRhYmxlIGNlbGxzXG4gICAgICAgIC8vIC5yZXBsYWNlKC9cXHwoPzwhW158XSo8aW5zPikoW148XSopPFxcL2lucz4oW158XSopXFx8L2csIChfLCBwcmVjZWRpbmcsIGZvbGxvd2luZykgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGB8JHtwcmVjZWRpbmd9KyR7Zm9sbG93aW5nfXxgO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEppcmEgV2lraSBzeW50YXguXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIE1hcmtkb3duIHN0cmluZyB0byBjb252ZXJ0IHRvIEppcmEgV2lraSBzeW50YXhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSmlyYSBXaWtpIHN5bnRheCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9famlyYShzdHIpIHtcbiAgICAgICAgY29uc3QgbWFwID0ge1xuICAgICAgICAgICAgLy8gY2l0ZTogJz8/JyxcbiAgICAgICAgICAgIGRlbDogJy0nLFxuICAgICAgICAgICAgaW5zOiAnKycsXG4gICAgICAgICAgICBzdXA6ICdeJyxcbiAgICAgICAgICAgIHN1YjogJ34nLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICAgICAgICAvLyBUYWJsZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgL15cXG4oKD86XFx8Lio/KStcXHwpWyBcXHRdKlxcbigoPzpcXHxcXHMqPy17Myx9XFxzKj8pK1xcfClbIFxcdF0qXFxuKCg/Oig/OlxcfC4qPykrXFx8WyBcXHRdKlxcbikqKSQvZ20sXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaCwgaGVhZGVyTGluZSwgc2VwYXJhdG9yTGluZSwgcm93c3RyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gaGVhZGVyTGluZS5tYXRjaCgvW158XSsoPz1cXHwpL2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9ycyA9IHNlcGFyYXRvckxpbmUubWF0Y2goL1tefF0rKD89XFx8KS9nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzLmxlbmd0aCAhPT0gc2VwYXJhdG9ycy5sZW5ndGgpIHJldHVybiBtYXRjaDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IHJvd3N0ci5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT09IDIgJiYgaGVhZGVycy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHtwYW5lbDp0aXRsZT0ke2hlYWRlcnNbMF0udHJpbSgpfX1cXG4ke3Jvd3N0clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcfCguKilbIFxcdF0qXFx8LywgJyQxJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKX1cXG57cGFuZWx9XFxuYDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGB8fCR7aGVhZGVycy5qb2luKCd8fCcpfXx8XFxuJHtyb3dzdHJ9YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvLyBCb2xkLCBJdGFsaWMsIGFuZCBDb21iaW5lZCAoYm9sZCtpdGFsaWMpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbKl9dKykoXFxTLio/KVxcMS9nLCAobWF0Y2gsIHdyYXBwZXIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXyR7Y29udGVudH1fYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCoke2NvbnRlbnR9KmA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBfKiR7Y29udGVudH0qX2A7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVyICsgY29udGVudCArIHdyYXBwZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEFsbCBIZWFkZXJzICgjIGZvcm1hdClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbI10rKSguKj8pJC9nbSwgKG1hdGNoLCBsZXZlbCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGgke2xldmVsLmxlbmd0aH0uJHtjb250ZW50fWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBIZWFkZXJzIChIMSBhbmQgSDIgdW5kZXJsaW5lcylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXiguKj8pXFxuKFs9LV0rKSQvZ20sIChtYXRjaCwgY29udGVudCwgbGV2ZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBoJHtsZXZlbFswXSA9PT0gJz0nID8gMSA6IDJ9LiAke2NvbnRlbnR9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIE9yZGVyZWQgbGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbIFxcdF0qKVxcZCtcXC5cXHMrL2dtLCAobWF0Y2gsIHNwYWNlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7QXJyYXkoTWF0aC5mbG9vcihzcGFjZXMubGVuZ3RoIC8gMykgKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbGwoJyMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpfSBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gVW4tT3JkZXJlZCBMaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsgXFx0XSopXFwqXFxzKy9nbSwgKG1hdGNoLCBzcGFjZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KE1hdGguZmxvb3Ioc3BhY2VzLmxlbmd0aCAvIDIgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWxsKCcqJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKX0gYDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEhlYWRlcnMgKGgxIG9yIGgyKSAobGluZXMgXCJ1bmRlcmxpbmVkXCIgYnkgLS0tLSBvciA9PT09PSlcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMsIEluc2VydHMsIFN1YnNjcmlwdHMsIFN1cGVyc2NyaXB0cywgYW5kIFN0cmlrZXRocm91Z2hzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgPCgke09iamVjdC5rZXlzKG1hcCkuam9pbignfCcpfSk+KC4qPyk8L1xcXFwxPmAsICdnJyksIChtYXRjaCwgZnJvbSwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0byA9IG1hcFtmcm9tXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvICsgY29udGVudCArIHRvO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3RoZXIga2luZCBvZiBzdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKX5+KC4qPyl+fihcXHMrKS9nLCAnJDEtJDItJDMnKVxuICAgICAgICAgICAgICAgIC8vIE5hbWVkL1VuLU5hbWVkIENvZGUgQmxvY2tcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvYGBgKC4rXFxuKT8oKD86LnxcXG4pKj8pYGBgL2csIChtYXRjaCwgc3ludCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9ICd7Y29kZX0nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IGB7Y29kZToke3N5bnQucmVwbGFjZSgvXFxuL2csICcnKX19XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29kZX0ke2NvbnRlbnR9e2NvZGV9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIElubGluZS1QcmVmb3JtYXR0ZWQgVGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9gKFteYF0rKWAvZywgJ3t7JDF9fScpXG4gICAgICAgICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyFcXFtbXlxcXV0qXFxdXFwoKFteKV0rKVxcKS9nLCAnISQxIScpXG4gICAgICAgICAgICAgICAgLy8gTmFtZWQgTGlua1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF1cXCgoW14pXSspXFwpL2csICdbJDF8JDJdJylcbiAgICAgICAgICAgICAgICAvLyBVbi1OYW1lZCBMaW5rXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLzwoW14+XSspPi9nLCAnWyQxXScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14+L2dtLCAnYnEuJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSjJNO1xuIiwgIi8qKlxuICogQ29udmVydGVyIEZhY2FkZVxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBjb252ZXJzaW9uIG9wZXJhdGlvbnMuXG4gKiBVc2VzIFN0cmF0ZWd5IFBhdHRlcm4gXHUyMDE0IGVhY2ggY29udmVyc2lvbiBkaXJlY3Rpb24gaXMgYSBzZXBhcmF0ZSBzdHJhdGVneS5cbiAqIE5ldyBmb3JtYXRzIGNhbiBiZSBhZGRlZCBieSByZWdpc3RlcmluZyBuZXcgc3RyYXRlZ2llcyAoT3Blbi1DbG9zZWQgUHJpbmNpcGxlKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgaHRtbFRvTWFya2Rvd24sIG1hcmtkb3duVG9KaXJhLCBqaXJhVG9NYXJrZG93biB9IGZyb20gJy4vY29udmVydGVyJztcbiAqL1xuaW1wb3J0IHsgTWFya2Rvd25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9tYXJrZG93bi5qcyc7XG5pbXBvcnQgeyBKaXJhU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvamlyYS5qcyc7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBTdHJhdGVneSBpbnN0YW5jZXMgKFNpbmdsZXRvbiBwZXIgc3RyYXRlZ3kpIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuY29uc3QgbWFya2Rvd25TdHJhdGVneSA9IG5ldyBNYXJrZG93blN0cmF0ZWd5KCk7XG5jb25zdCBqaXJhU3RyYXRlZ3kgPSBuZXcgSmlyYVN0cmF0ZWd5KCk7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQdWJsaWMgQVBJIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIENvbnZlcnQgcmVuZGVyZWQgSFRNTCB0byBNYXJrZG93bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge01hcDxzdHJpbmcsc3RyaW5nPn0gW29wdGlvbnMuaW1hZ2VCYXNlNjRNYXBdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWV0YWRhdGFdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHRtbFRvTWFya2Rvd24oaHRtbCwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBtYXJrZG93blN0cmF0ZWd5LmNvbnZlcnQoaHRtbCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ29udmVydCBKaXJhIHdpa2kgbWFya3VwIHRvIE1hcmtkb3duLlxuICogQHBhcmFtIHtzdHJpbmd9IGppcmFNYXJrdXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqaXJhVG9NYXJrZG93bihqaXJhTWFya3VwKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kudG9NYXJrZG93bihqaXJhTWFya3VwKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IE1hcmtkb3duIHRvIEppcmEgd2lraSBtYXJrdXAgdmlhIEFTVCBwaXBlbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZG93blxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtkb3duVG9KaXJhKG1hcmtkb3duKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kuZnJvbU1hcmtkb3duKG1hcmtkb3duKTtcbn1cblxuLyoqXG4gKiBSZS1leHBvcnQgSjJNIGZvciBIVE1MIGdlbmVyYXRpb24gKHVzZWQgYnkgcG9wdXAncyBGaWxsIEppcmEgZmVhdHVyZSkuXG4gKi9cbmV4cG9ydCBjb25zdCBKMk0gPSBqaXJhU3RyYXRlZ3kuajJtO1xuIiwgImZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbikge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIGRlc3RpbmF0aW9uW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuZnVuY3Rpb24gcmVwZWF0KGNoYXJhY3RlciwgY291bnQpIHtcbiAgcmV0dXJuIEFycmF5KGNvdW50ICsgMSkuam9pbihjaGFyYWN0ZXIpO1xufVxuZnVuY3Rpb24gdHJpbUxlYWRpbmdOZXdsaW5lcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxuKi8sICcnKTtcbn1cbmZ1bmN0aW9uIHRyaW1UcmFpbGluZ05ld2xpbmVzKHN0cmluZykge1xuICAvLyBhdm9pZCBtYXRjaC1hdC1lbmQgcmVnZXhwIGJvdHRsZW5lY2ssIHNlZSAjMzcwXG4gIHZhciBpbmRleEVuZCA9IHN0cmluZy5sZW5ndGg7XG4gIHdoaWxlIChpbmRleEVuZCA+IDAgJiYgc3RyaW5nW2luZGV4RW5kIC0gMV0gPT09ICdcXG4nKSBpbmRleEVuZC0tO1xuICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRleEVuZCk7XG59XG5mdW5jdGlvbiB0cmltTmV3bGluZXMoc3RyaW5nKSB7XG4gIHJldHVybiB0cmltVHJhaWxpbmdOZXdsaW5lcyh0cmltTGVhZGluZ05ld2xpbmVzKHN0cmluZykpO1xufVxudmFyIGJsb2NrRWxlbWVudHMgPSBbJ0FERFJFU1MnLCAnQVJUSUNMRScsICdBU0lERScsICdBVURJTycsICdCTE9DS1FVT1RFJywgJ0JPRFknLCAnQ0FOVkFTJywgJ0NFTlRFUicsICdERCcsICdESVInLCAnRElWJywgJ0RMJywgJ0RUJywgJ0ZJRUxEU0VUJywgJ0ZJR0NBUFRJT04nLCAnRklHVVJFJywgJ0ZPT1RFUicsICdGT1JNJywgJ0ZSQU1FU0VUJywgJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2JywgJ0hFQURFUicsICdIR1JPVVAnLCAnSFInLCAnSFRNTCcsICdJU0lOREVYJywgJ0xJJywgJ01BSU4nLCAnTUVOVScsICdOQVYnLCAnTk9GUkFNRVMnLCAnTk9TQ1JJUFQnLCAnT0wnLCAnT1VUUFVUJywgJ1AnLCAnUFJFJywgJ1NFQ1RJT04nLCAnVEFCTEUnLCAnVEJPRFknLCAnVEQnLCAnVEZPT1QnLCAnVEgnLCAnVEhFQUQnLCAnVFInLCAnVUwnXTtcbmZ1bmN0aW9uIGlzQmxvY2sobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgYmxvY2tFbGVtZW50cyk7XG59XG52YXIgdm9pZEVsZW1lbnRzID0gWydBUkVBJywgJ0JBU0UnLCAnQlInLCAnQ09MJywgJ0NPTU1BTkQnLCAnRU1CRUQnLCAnSFInLCAnSU1HJywgJ0lOUFVUJywgJ0tFWUdFTicsICdMSU5LJywgJ01FVEEnLCAnUEFSQU0nLCAnU09VUkNFJywgJ1RSQUNLJywgJ1dCUiddO1xuZnVuY3Rpb24gaXNWb2lkKG5vZGUpIHtcbiAgcmV0dXJuIGlzKG5vZGUsIHZvaWRFbGVtZW50cyk7XG59XG5mdW5jdGlvbiBoYXNWb2lkKG5vZGUpIHtcbiAgcmV0dXJuIGhhcyhub2RlLCB2b2lkRWxlbWVudHMpO1xufVxudmFyIG1lYW5pbmdmdWxXaGVuQmxhbmtFbGVtZW50cyA9IFsnQScsICdUQUJMRScsICdUSEVBRCcsICdUQk9EWScsICdURk9PVCcsICdUSCcsICdURCcsICdJRlJBTUUnLCAnU0NSSVBUJywgJ0FVRElPJywgJ1ZJREVPJ107XG5mdW5jdGlvbiBpc01lYW5pbmdmdWxXaGVuQmxhbmsobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzKTtcbn1cbmZ1bmN0aW9uIGhhc01lYW5pbmdmdWxXaGVuQmxhbmsobm9kZSkge1xuICByZXR1cm4gaGFzKG5vZGUsIG1lYW5pbmdmdWxXaGVuQmxhbmtFbGVtZW50cyk7XG59XG5mdW5jdGlvbiBpcyhub2RlLCB0YWdOYW1lcykge1xuICByZXR1cm4gdGFnTmFtZXMuaW5kZXhPZihub2RlLm5vZGVOYW1lKSA+PSAwO1xufVxuZnVuY3Rpb24gaGFzKG5vZGUsIHRhZ05hbWVzKSB7XG4gIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lICYmIHRhZ05hbWVzLnNvbWUoZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKS5sZW5ndGg7XG4gIH0pO1xufVxudmFyIG1hcmtkb3duRXNjYXBlcyA9IFtbL1xcXFwvZywgJ1xcXFxcXFxcJ10sIFsvXFwqL2csICdcXFxcKiddLCBbL14tL2csICdcXFxcLSddLCBbL15cXCsgL2csICdcXFxcKyAnXSwgWy9eKD0rKS9nLCAnXFxcXCQxJ10sIFsvXigjezEsNn0pIC9nLCAnXFxcXCQxICddLCBbL2AvZywgJ1xcXFxgJ10sIFsvXn5+fi9nLCAnXFxcXH5+fiddLCBbL1xcWy9nLCAnXFxcXFsnXSwgWy9cXF0vZywgJ1xcXFxdJ10sIFsvXj4vZywgJ1xcXFw+J10sIFsvXy9nLCAnXFxcXF8nXSwgWy9eKFxcZCspXFwuIC9nLCAnJDFcXFxcLiAnXV07XG5mdW5jdGlvbiBlc2NhcGVNYXJrZG93bihzdHJpbmcpIHtcbiAgcmV0dXJuIG1hcmtkb3duRXNjYXBlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBlc2NhcGUpIHtcbiAgICByZXR1cm4gYWNjdW11bGF0b3IucmVwbGFjZShlc2NhcGVbMF0sIGVzY2FwZVsxXSk7XG4gIH0sIHN0cmluZyk7XG59XG5cbnZhciBydWxlcyA9IHt9O1xucnVsZXMucGFyYWdyYXBoID0ge1xuICBmaWx0ZXI6ICdwJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICB9XG59O1xucnVsZXMubGluZUJyZWFrID0ge1xuICBmaWx0ZXI6ICdicicsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmJyICsgJ1xcbic7XG4gIH1cbn07XG5ydWxlcy5oZWFkaW5nID0ge1xuICBmaWx0ZXI6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIGhMZXZlbCA9IE51bWJlcihub2RlLm5vZGVOYW1lLmNoYXJBdCgxKSk7XG4gICAgaWYgKG9wdGlvbnMuaGVhZGluZ1N0eWxlID09PSAnc2V0ZXh0JyAmJiBoTGV2ZWwgPCAzKSB7XG4gICAgICB2YXIgdW5kZXJsaW5lID0gcmVwZWF0KGhMZXZlbCA9PT0gMSA/ICc9JyA6ICctJywgY29udGVudC5sZW5ndGgpO1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG4nICsgdW5kZXJsaW5lICsgJ1xcblxcbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnXFxuXFxuJyArIHJlcGVhdCgnIycsIGhMZXZlbCkgKyAnICcgKyBjb250ZW50ICsgJ1xcblxcbic7XG4gICAgfVxuICB9XG59O1xucnVsZXMuYmxvY2txdW90ZSA9IHtcbiAgZmlsdGVyOiAnYmxvY2txdW90ZScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIGNvbnRlbnQgPSB0cmltTmV3bGluZXMoY29udGVudCkucmVwbGFjZSgvXi9nbSwgJz4gJyk7XG4gICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICB9XG59O1xucnVsZXMubGlzdCA9IHtcbiAgZmlsdGVyOiBbJ3VsJywgJ29sJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gJ0xJJyAmJiBwYXJlbnQubGFzdEVsZW1lbnRDaGlsZCA9PT0gbm9kZSkge1xuICAgICAgcmV0dXJuICdcXG4nICsgY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICAgIH1cbiAgfVxufTtcbnJ1bGVzLmxpc3RJdGVtID0ge1xuICBmaWx0ZXI6ICdsaScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmJ1bGxldExpc3RNYXJrZXIgKyAnICAgJztcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQubm9kZU5hbWUgPT09ICdPTCcpIHtcbiAgICAgIHZhciBzdGFydCA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ3N0YXJ0Jyk7XG4gICAgICB2YXIgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHBhcmVudC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICBwcmVmaXggPSAoc3RhcnQgPyBOdW1iZXIoc3RhcnQpICsgaW5kZXggOiBpbmRleCArIDEpICsgJy4gICc7XG4gICAgfVxuICAgIHZhciBpc1BhcmFncmFwaCA9IC9cXG4kLy50ZXN0KGNvbnRlbnQpO1xuICAgIGNvbnRlbnQgPSB0cmltTmV3bGluZXMoY29udGVudCkgKyAoaXNQYXJhZ3JhcGggPyAnXFxuJyA6ICcnKTtcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4vZ20sICdcXG4nICsgJyAnLnJlcGVhdChwcmVmaXgubGVuZ3RoKSk7IC8vIGluZGVudFxuICAgIHJldHVybiBwcmVmaXggKyBjb250ZW50ICsgKG5vZGUubmV4dFNpYmxpbmcgPyAnXFxuJyA6ICcnKTtcbiAgfVxufTtcbnJ1bGVzLmluZGVudGVkQ29kZUJsb2NrID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuY29kZUJsb2NrU3R5bGUgPT09ICdpbmRlbnRlZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgbm9kZS5maXJzdENoaWxkICYmIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gJ1xcblxcbiAgICAnICsgbm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCAnXFxuICAgICcpICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5mZW5jZWRDb2RlQmxvY2sgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5jb2RlQmxvY2tTdHlsZSA9PT0gJ2ZlbmNlZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgbm9kZS5maXJzdENoaWxkICYmIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gbm9kZS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgICB2YXIgbGFuZ3VhZ2UgPSAoY2xhc3NOYW1lLm1hdGNoKC9sYW5ndWFnZS0oXFxTKykvKSB8fCBbbnVsbCwgJyddKVsxXTtcbiAgICB2YXIgY29kZSA9IG5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICB2YXIgZmVuY2VDaGFyID0gb3B0aW9ucy5mZW5jZS5jaGFyQXQoMCk7XG4gICAgdmFyIGZlbmNlU2l6ZSA9IDM7XG4gICAgdmFyIGZlbmNlSW5Db2RlUmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIGZlbmNlQ2hhciArICd7Myx9JywgJ2dtJyk7XG4gICAgdmFyIG1hdGNoO1xuICAgIHdoaWxlIChtYXRjaCA9IGZlbmNlSW5Db2RlUmVnZXguZXhlYyhjb2RlKSkge1xuICAgICAgaWYgKG1hdGNoWzBdLmxlbmd0aCA+PSBmZW5jZVNpemUpIHtcbiAgICAgICAgZmVuY2VTaXplID0gbWF0Y2hbMF0ubGVuZ3RoICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZlbmNlID0gcmVwZWF0KGZlbmNlQ2hhciwgZmVuY2VTaXplKTtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBmZW5jZSArIGxhbmd1YWdlICsgJ1xcbicgKyBjb2RlLnJlcGxhY2UoL1xcbiQvLCAnJykgKyAnXFxuJyArIGZlbmNlICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5ob3Jpem9udGFsUnVsZSA9IHtcbiAgZmlsdGVyOiAnaHInLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBvcHRpb25zLmhyICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5pbmxpbmVMaW5rID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubGlua1N0eWxlID09PSAnaW5saW5lZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ0EnICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gIH0sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBocmVmID0gZXNjYXBlTGlua0Rlc3RpbmF0aW9uKG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIHZhciB0aXRsZSA9IGVzY2FwZUxpbmtUaXRsZShjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSkpO1xuICAgIHZhciB0aXRsZVBhcnQgPSB0aXRsZSA/ICcgXCInICsgdGl0bGUgKyAnXCInIDogJyc7XG4gICAgcmV0dXJuICdbJyArIGNvbnRlbnQgKyAnXSgnICsgaHJlZiArIHRpdGxlUGFydCArICcpJztcbiAgfVxufTtcbnJ1bGVzLnJlZmVyZW5jZUxpbmsgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5saW5rU3R5bGUgPT09ICdyZWZlcmVuY2VkJyAmJiBub2RlLm5vZGVOYW1lID09PSAnQScgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgfSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIGhyZWYgPSBlc2NhcGVMaW5rRGVzdGluYXRpb24obm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgdmFyIHRpdGxlID0gY2xlYW5BdHRyaWJ1dGUobm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuICAgIGlmICh0aXRsZSkgdGl0bGUgPSAnIFwiJyArIGVzY2FwZUxpbmtUaXRsZSh0aXRsZSkgKyAnXCInO1xuICAgIHZhciByZXBsYWNlbWVudDtcbiAgICB2YXIgcmVmZXJlbmNlO1xuICAgIHN3aXRjaCAob3B0aW9ucy5saW5rUmVmZXJlbmNlU3R5bGUpIHtcbiAgICAgIGNhc2UgJ2NvbGxhcHNlZCc6XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddW10nO1xuICAgICAgICByZWZlcmVuY2UgPSAnWycgKyBjb250ZW50ICsgJ106ICcgKyBocmVmICsgdGl0bGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2hvcnRjdXQnOlxuICAgICAgICByZXBsYWNlbWVudCA9ICdbJyArIGNvbnRlbnQgKyAnXSc7XG4gICAgICAgIHJlZmVyZW5jZSA9ICdbJyArIGNvbnRlbnQgKyAnXTogJyArIGhyZWYgKyB0aXRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgaWQgPSB0aGlzLnJlZmVyZW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgcmVwbGFjZW1lbnQgPSAnWycgKyBjb250ZW50ICsgJ11bJyArIGlkICsgJ10nO1xuICAgICAgICByZWZlcmVuY2UgPSAnWycgKyBpZCArICddOiAnICsgaHJlZiArIHRpdGxlO1xuICAgIH1cbiAgICB0aGlzLnJlZmVyZW5jZXMucHVzaChyZWZlcmVuY2UpO1xuICAgIHJldHVybiByZXBsYWNlbWVudDtcbiAgfSxcbiAgcmVmZXJlbmNlczogW10sXG4gIGFwcGVuZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmZXJlbmNlcyA9ICcnO1xuICAgIGlmICh0aGlzLnJlZmVyZW5jZXMubGVuZ3RoKSB7XG4gICAgICByZWZlcmVuY2VzID0gJ1xcblxcbicgKyB0aGlzLnJlZmVyZW5jZXMuam9pbignXFxuJykgKyAnXFxuXFxuJztcbiAgICAgIHRoaXMucmVmZXJlbmNlcyA9IFtdOyAvLyBSZXNldCByZWZlcmVuY2VzXG4gICAgfVxuICAgIHJldHVybiByZWZlcmVuY2VzO1xuICB9XG59O1xucnVsZXMuZW1waGFzaXMgPSB7XG4gIGZpbHRlcjogWydlbScsICdpJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghY29udGVudC50cmltKCkpIHJldHVybiAnJztcbiAgICByZXR1cm4gb3B0aW9ucy5lbURlbGltaXRlciArIGNvbnRlbnQgKyBvcHRpb25zLmVtRGVsaW1pdGVyO1xuICB9XG59O1xucnVsZXMuc3Ryb25nID0ge1xuICBmaWx0ZXI6IFsnc3Ryb25nJywgJ2InXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb250ZW50LnRyaW0oKSkgcmV0dXJuICcnO1xuICAgIHJldHVybiBvcHRpb25zLnN0cm9uZ0RlbGltaXRlciArIGNvbnRlbnQgKyBvcHRpb25zLnN0cm9uZ0RlbGltaXRlcjtcbiAgfVxufTtcbnJ1bGVzLmNvZGUgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgaGFzU2libGluZ3MgPSBub2RlLnByZXZpb3VzU2libGluZyB8fCBub2RlLm5leHRTaWJsaW5nO1xuICAgIHZhciBpc0NvZGVCbG9jayA9IG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgIWhhc1NpYmxpbmdzO1xuICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnQ09ERScgJiYgIWlzQ29kZUJsb2NrO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiAnJztcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCAnICcpO1xuICAgIHZhciBleHRyYVNwYWNlID0gL15gfF4gLio/W14gXS4qICR8YCQvLnRlc3QoY29udGVudCkgPyAnICcgOiAnJztcbiAgICB2YXIgZGVsaW1pdGVyID0gJ2AnO1xuICAgIHZhciBtYXRjaGVzID0gY29udGVudC5tYXRjaCgvYCsvZ20pIHx8IFtdO1xuICAgIHdoaWxlIChtYXRjaGVzLmluZGV4T2YoZGVsaW1pdGVyKSAhPT0gLTEpIGRlbGltaXRlciA9IGRlbGltaXRlciArICdgJztcbiAgICByZXR1cm4gZGVsaW1pdGVyICsgZXh0cmFTcGFjZSArIGNvbnRlbnQgKyBleHRyYVNwYWNlICsgZGVsaW1pdGVyO1xuICB9XG59O1xucnVsZXMuaW1hZ2UgPSB7XG4gIGZpbHRlcjogJ2ltZycsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBhbHQgPSBlc2NhcGVNYXJrZG93bihjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgnYWx0JykpKTtcbiAgICB2YXIgc3JjID0gZXNjYXBlTGlua0Rlc3RpbmF0aW9uKG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJyk7XG4gICAgdmFyIHRpdGxlID0gY2xlYW5BdHRyaWJ1dGUobm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuICAgIHZhciB0aXRsZVBhcnQgPSB0aXRsZSA/ICcgXCInICsgZXNjYXBlTGlua1RpdGxlKHRpdGxlKSArICdcIicgOiAnJztcbiAgICByZXR1cm4gc3JjID8gJyFbJyArIGFsdCArICddJyArICcoJyArIHNyYyArIHRpdGxlUGFydCArICcpJyA6ICcnO1xuICB9XG59O1xuZnVuY3Rpb24gY2xlYW5BdHRyaWJ1dGUoYXR0cmlidXRlKSB7XG4gIHJldHVybiBhdHRyaWJ1dGUgPyBhdHRyaWJ1dGUucmVwbGFjZSgvKFxcbitcXHMqKSsvZywgJ1xcbicpIDogJyc7XG59XG5mdW5jdGlvbiBlc2NhcGVMaW5rRGVzdGluYXRpb24oZGVzdGluYXRpb24pIHtcbiAgdmFyIGVzY2FwZWQgPSBkZXN0aW5hdGlvbi5yZXBsYWNlKC8oWzw+KCldKS9nLCAnXFxcXCQxJyk7XG4gIHJldHVybiBlc2NhcGVkLmluZGV4T2YoJyAnKSA+PSAwID8gJzwnICsgZXNjYXBlZCArICc+JyA6IGVzY2FwZWQ7XG59XG5mdW5jdGlvbiBlc2NhcGVMaW5rVGl0bGUodGl0bGUpIHtcbiAgcmV0dXJuIHRpdGxlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKTtcbn1cblxuLyoqXG4gKiBNYW5hZ2VzIGEgY29sbGVjdGlvbiBvZiBydWxlcyB1c2VkIHRvIGNvbnZlcnQgSFRNTCB0byBNYXJrZG93blxuICovXG5cbmZ1bmN0aW9uIFJ1bGVzKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fa2VlcCA9IFtdO1xuICB0aGlzLl9yZW1vdmUgPSBbXTtcbiAgdGhpcy5ibGFua1J1bGUgPSB7XG4gICAgcmVwbGFjZW1lbnQ6IG9wdGlvbnMuYmxhbmtSZXBsYWNlbWVudFxuICB9O1xuICB0aGlzLmtlZXBSZXBsYWNlbWVudCA9IG9wdGlvbnMua2VlcFJlcGxhY2VtZW50O1xuICB0aGlzLmRlZmF1bHRSdWxlID0ge1xuICAgIHJlcGxhY2VtZW50OiBvcHRpb25zLmRlZmF1bHRSZXBsYWNlbWVudFxuICB9O1xuICB0aGlzLmFycmF5ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnJ1bGVzKSB0aGlzLmFycmF5LnB1c2gob3B0aW9ucy5ydWxlc1trZXldKTtcbn1cblJ1bGVzLnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbiAoa2V5LCBydWxlKSB7XG4gICAgdGhpcy5hcnJheS51bnNoaWZ0KHJ1bGUpO1xuICB9LFxuICBrZWVwOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5fa2VlcC51bnNoaWZ0KHtcbiAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgcmVwbGFjZW1lbnQ6IHRoaXMua2VlcFJlcGxhY2VtZW50XG4gICAgfSk7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIHRoaXMuX3JlbW92ZS51bnNoaWZ0KHtcbiAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmb3JOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlLmlzQmxhbmspIHJldHVybiB0aGlzLmJsYW5rUnVsZTtcbiAgICB2YXIgcnVsZTtcbiAgICBpZiAocnVsZSA9IGZpbmRSdWxlKHRoaXMuYXJyYXksIG5vZGUsIHRoaXMub3B0aW9ucykpIHJldHVybiBydWxlO1xuICAgIGlmIChydWxlID0gZmluZFJ1bGUodGhpcy5fa2VlcCwgbm9kZSwgdGhpcy5vcHRpb25zKSkgcmV0dXJuIHJ1bGU7XG4gICAgaWYgKHJ1bGUgPSBmaW5kUnVsZSh0aGlzLl9yZW1vdmUsIG5vZGUsIHRoaXMub3B0aW9ucykpIHJldHVybiBydWxlO1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRSdWxlO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbiAoZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXJyYXkubGVuZ3RoOyBpKyspIGZuKHRoaXMuYXJyYXlbaV0sIGkpO1xuICB9XG59O1xuZnVuY3Rpb24gZmluZFJ1bGUocnVsZXMsIG5vZGUsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBydWxlID0gcnVsZXNbaV07XG4gICAgaWYgKGZpbHRlclZhbHVlKHJ1bGUsIG5vZGUsIG9wdGlvbnMpKSByZXR1cm4gcnVsZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZmlsdGVyVmFsdWUocnVsZSwgbm9kZSwgb3B0aW9ucykge1xuICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGlmIChmaWx0ZXIgPT09IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgaWYgKGZpbHRlci5pbmRleE9mKG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmaWx0ZXIuY2FsbChydWxlLCBub2RlLCBvcHRpb25zKSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGZpbHRlcmAgbmVlZHMgdG8gYmUgYSBzdHJpbmcsIGFycmF5LCBvciBmdW5jdGlvbicpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGNvbGxhcHNlV2hpdGVzcGFjZSBmdW5jdGlvbiBpcyBhZGFwdGVkIGZyb20gY29sbGFwc2Utd2hpdGVzcGFjZVxuICogYnkgTHVjIFRoZXZlbmFyZC5cbiAqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgTHVjIFRoZXZlbmFyZCA8bHVjdGhldmVuYXJkQGdtYWlsLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogY29sbGFwc2VXaGl0ZXNwYWNlKG9wdGlvbnMpIHJlbW92ZXMgZXh0cmFuZW91cyB3aGl0ZXNwYWNlIGZyb20gYW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gY29sbGFwc2VXaGl0ZXNwYWNlKG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQ7XG4gIHZhciBpc0Jsb2NrID0gb3B0aW9ucy5pc0Jsb2NrO1xuICB2YXIgaXNWb2lkID0gb3B0aW9ucy5pc1ZvaWQ7XG4gIHZhciBpc1ByZSA9IG9wdGlvbnMuaXNQcmUgfHwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRSc7XG4gIH07XG4gIGlmICghZWxlbWVudC5maXJzdENoaWxkIHx8IGlzUHJlKGVsZW1lbnQpKSByZXR1cm47XG4gIHZhciBwcmV2VGV4dCA9IG51bGw7XG4gIHZhciBrZWVwTGVhZGluZ1dzID0gZmFsc2U7XG4gIHZhciBwcmV2ID0gbnVsbDtcbiAgdmFyIG5vZGUgPSBuZXh0KHByZXYsIGVsZW1lbnQsIGlzUHJlKTtcbiAgd2hpbGUgKG5vZGUgIT09IGVsZW1lbnQpIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyB8fCBub2RlLm5vZGVUeXBlID09PSA0KSB7XG4gICAgICAvLyBOb2RlLlRFWFRfTk9ERSBvciBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERVxuICAgICAgdmFyIHRleHQgPSBub2RlLmRhdGEucmVwbGFjZSgvWyBcXHJcXG5cXHRdKy9nLCAnICcpO1xuICAgICAgaWYgKCghcHJldlRleHQgfHwgLyAkLy50ZXN0KHByZXZUZXh0LmRhdGEpKSAmJiAha2VlcExlYWRpbmdXcyAmJiB0ZXh0WzBdID09PSAnICcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBgdGV4dGAgbWlnaHQgYmUgZW1wdHkgYXQgdGhpcyBwb2ludC5cbiAgICAgIGlmICghdGV4dCkge1xuICAgICAgICBub2RlID0gcmVtb3ZlKG5vZGUpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUuZGF0YSA9IHRleHQ7XG4gICAgICBwcmV2VGV4dCA9IG5vZGU7XG4gICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAvLyBOb2RlLkVMRU1FTlRfTk9ERVxuICAgICAgaWYgKGlzQmxvY2sobm9kZSkgfHwgbm9kZS5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgICAgICBpZiAocHJldlRleHQpIHtcbiAgICAgICAgICBwcmV2VGV4dC5kYXRhID0gcHJldlRleHQuZGF0YS5yZXBsYWNlKC8gJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWb2lkKG5vZGUpIHx8IGlzUHJlKG5vZGUpKSB7XG4gICAgICAgIC8vIEF2b2lkIHRyaW1taW5nIHNwYWNlIGFyb3VuZCBub24tYmxvY2ssIG5vbi1CUiB2b2lkIGVsZW1lbnRzIGFuZCBpbmxpbmUgUFJFLlxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwcmV2VGV4dCkge1xuICAgICAgICAvLyBEcm9wIHByb3RlY3Rpb24gaWYgc2V0IHByZXZpb3VzbHkuXG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHJlbW92ZShub2RlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgbmV4dE5vZGUgPSBuZXh0KHByZXYsIG5vZGUsIGlzUHJlKTtcbiAgICBwcmV2ID0gbm9kZTtcbiAgICBub2RlID0gbmV4dE5vZGU7XG4gIH1cbiAgaWYgKHByZXZUZXh0KSB7XG4gICAgcHJldlRleHQuZGF0YSA9IHByZXZUZXh0LmRhdGEucmVwbGFjZSgvICQvLCAnJyk7XG4gICAgaWYgKCFwcmV2VGV4dC5kYXRhKSB7XG4gICAgICByZW1vdmUocHJldlRleHQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIHJlbW92ZShub2RlKSByZW1vdmVzIHRoZSBnaXZlbiBub2RlIGZyb20gdGhlIERPTSBhbmQgcmV0dXJucyB0aGVcbiAqIG5leHQgbm9kZSBpbiB0aGUgc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtOb2RlfSBub2RlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gIHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZyB8fCBub2RlLnBhcmVudE5vZGU7XG4gIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgcmV0dXJuIG5leHQ7XG59XG5cbi8qKlxuICogbmV4dChwcmV2LCBjdXJyZW50LCBpc1ByZSkgcmV0dXJucyB0aGUgbmV4dCBub2RlIGluIHRoZSBzZXF1ZW5jZSwgZ2l2ZW4gdGhlXG4gKiBjdXJyZW50IGFuZCBwcmV2aW91cyBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHByZXZcbiAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXNQcmVcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmZ1bmN0aW9uIG5leHQocHJldiwgY3VycmVudCwgaXNQcmUpIHtcbiAgaWYgKHByZXYgJiYgcHJldi5wYXJlbnROb2RlID09PSBjdXJyZW50IHx8IGlzUHJlKGN1cnJlbnQpKSB7XG4gICAgcmV0dXJuIGN1cnJlbnQubmV4dFNpYmxpbmcgfHwgY3VycmVudC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBjdXJyZW50LmZpcnN0Q2hpbGQgfHwgY3VycmVudC5uZXh0U2libGluZyB8fCBjdXJyZW50LnBhcmVudE5vZGU7XG59XG5cbi8qXG4gKiBTZXQgdXAgd2luZG93IGZvciBOb2RlLmpzXG4gKi9cblxudmFyIHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9O1xuXG4vKlxuICogUGFyc2luZyBIVE1MIHN0cmluZ3NcbiAqL1xuXG5mdW5jdGlvbiBjYW5QYXJzZUhUTUxOYXRpdmVseSgpIHtcbiAgdmFyIFBhcnNlciA9IHJvb3QuRE9NUGFyc2VyO1xuICB2YXIgY2FuUGFyc2UgPSBmYWxzZTtcblxuICAvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vMTEyOTAzMVxuICAvLyBGaXJlZm94L09wZXJhL0lFIHRocm93IGVycm9ycyBvbiB1bnN1cHBvcnRlZCB0eXBlc1xuICB0cnkge1xuICAgIC8vIFdlYktpdCByZXR1cm5zIG51bGwgb24gdW5zdXBwb3J0ZWQgdHlwZXNcbiAgICBpZiAobmV3IFBhcnNlcigpLnBhcnNlRnJvbVN0cmluZygnJywgJ3RleHQvaHRtbCcpKSB7XG4gICAgICBjYW5QYXJzZSA9IHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICByZXR1cm4gY2FuUGFyc2U7XG59XG5mdW5jdGlvbiBjcmVhdGVIVE1MUGFyc2VyKCkge1xuICB2YXIgUGFyc2VyID0gZnVuY3Rpb24gKCkge307XG4gIHtcbiAgICBpZiAoc2hvdWxkVXNlQWN0aXZlWCgpKSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgICAgICAgZG9jLmRlc2lnbk1vZGUgPSAnb24nOyAvLyBkaXNhYmxlIG9uLXBhZ2Ugc2NyaXB0c1xuICAgICAgICBkb2Mub3BlbigpO1xuICAgICAgICBkb2Mud3JpdGUoc3RyaW5nKTtcbiAgICAgICAgZG9jLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBkb2M7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGRvYy5vcGVuKCk7XG4gICAgICAgIGRvYy53cml0ZShzdHJpbmcpO1xuICAgICAgICBkb2MuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHJldHVybiBQYXJzZXI7XG59XG5mdW5jdGlvbiBzaG91bGRVc2VBY3RpdmVYKCkge1xuICB2YXIgdXNlQWN0aXZlWCA9IGZhbHNlO1xuICB0cnkge1xuICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJykub3BlbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHJvb3QuQWN0aXZlWE9iamVjdCkgdXNlQWN0aXZlWCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHVzZUFjdGl2ZVg7XG59XG52YXIgSFRNTFBhcnNlciA9IGNhblBhcnNlSFRNTE5hdGl2ZWx5KCkgPyByb290LkRPTVBhcnNlciA6IGNyZWF0ZUhUTUxQYXJzZXIoKTtcblxuZnVuY3Rpb24gUm9vdE5vZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIGRvYyA9IGh0bWxQYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoXG4gICAgLy8gRE9NIHBhcnNlcnMgYXJyYW5nZSBlbGVtZW50cyBpbiB0aGUgPGhlYWQ+IGFuZCA8Ym9keT4uXG4gICAgLy8gV3JhcHBpbmcgaW4gYSBjdXN0b20gZWxlbWVudCBlbnN1cmVzIGVsZW1lbnRzIGFyZSByZWxpYWJseSBhcnJhbmdlZCBpblxuICAgIC8vIGEgc2luZ2xlIGVsZW1lbnQuXG4gICAgJzx4LXR1cm5kb3duIGlkPVwidHVybmRvd24tcm9vdFwiPicgKyBpbnB1dCArICc8L3gtdHVybmRvd24+JywgJ3RleHQvaHRtbCcpO1xuICAgIHJvb3QgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3R1cm5kb3duLXJvb3QnKTtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gaW5wdXQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGNvbGxhcHNlV2hpdGVzcGFjZSh7XG4gICAgZWxlbWVudDogcm9vdCxcbiAgICBpc0Jsb2NrOiBpc0Jsb2NrLFxuICAgIGlzVm9pZDogaXNWb2lkLFxuICAgIGlzUHJlOiBvcHRpb25zLnByZWZvcm1hdHRlZENvZGUgPyBpc1ByZU9yQ29kZSA6IG51bGxcbiAgfSk7XG4gIHJldHVybiByb290O1xufVxudmFyIF9odG1sUGFyc2VyO1xuZnVuY3Rpb24gaHRtbFBhcnNlcigpIHtcbiAgX2h0bWxQYXJzZXIgPSBfaHRtbFBhcnNlciB8fCBuZXcgSFRNTFBhcnNlcigpO1xuICByZXR1cm4gX2h0bWxQYXJzZXI7XG59XG5mdW5jdGlvbiBpc1ByZU9yQ29kZShub2RlKSB7XG4gIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnUFJFJyB8fCBub2RlLm5vZGVOYW1lID09PSAnQ09ERSc7XG59XG5cbmZ1bmN0aW9uIE5vZGUobm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlzQmxvY2sgPSBpc0Jsb2NrKG5vZGUpO1xuICBub2RlLmlzQ29kZSA9IG5vZGUubm9kZU5hbWUgPT09ICdDT0RFJyB8fCBub2RlLnBhcmVudE5vZGUuaXNDb2RlO1xuICBub2RlLmlzQmxhbmsgPSBpc0JsYW5rKG5vZGUpO1xuICBub2RlLmZsYW5raW5nV2hpdGVzcGFjZSA9IGZsYW5raW5nV2hpdGVzcGFjZShub2RlLCBvcHRpb25zKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBpc0JsYW5rKG5vZGUpIHtcbiAgcmV0dXJuICFpc1ZvaWQobm9kZSkgJiYgIWlzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKSAmJiAvXlxccyokL2kudGVzdChub2RlLnRleHRDb250ZW50KSAmJiAhaGFzVm9pZChub2RlKSAmJiAhaGFzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKTtcbn1cbmZ1bmN0aW9uIGZsYW5raW5nV2hpdGVzcGFjZShub2RlLCBvcHRpb25zKSB7XG4gIGlmIChub2RlLmlzQmxvY2sgfHwgb3B0aW9ucy5wcmVmb3JtYXR0ZWRDb2RlICYmIG5vZGUuaXNDb2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlYWRpbmc6ICcnLFxuICAgICAgdHJhaWxpbmc6ICcnXG4gICAgfTtcbiAgfVxuICB2YXIgZWRnZXMgPSBlZGdlV2hpdGVzcGFjZShub2RlLnRleHRDb250ZW50KTtcblxuICAvLyBhYmFuZG9uIGxlYWRpbmcgQVNDSUkgV1MgaWYgbGVmdC1mbGFua2VkIGJ5IEFTQ0lJIFdTXG4gIGlmIChlZGdlcy5sZWFkaW5nQXNjaWkgJiYgaXNGbGFua2VkQnlXaGl0ZXNwYWNlKCdsZWZ0Jywgbm9kZSwgb3B0aW9ucykpIHtcbiAgICBlZGdlcy5sZWFkaW5nID0gZWRnZXMubGVhZGluZ05vbkFzY2lpO1xuICB9XG5cbiAgLy8gYWJhbmRvbiB0cmFpbGluZyBBU0NJSSBXUyBpZiByaWdodC1mbGFua2VkIGJ5IEFTQ0lJIFdTXG4gIGlmIChlZGdlcy50cmFpbGluZ0FzY2lpICYmIGlzRmxhbmtlZEJ5V2hpdGVzcGFjZSgncmlnaHQnLCBub2RlLCBvcHRpb25zKSkge1xuICAgIGVkZ2VzLnRyYWlsaW5nID0gZWRnZXMudHJhaWxpbmdOb25Bc2NpaTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGxlYWRpbmc6IGVkZ2VzLmxlYWRpbmcsXG4gICAgdHJhaWxpbmc6IGVkZ2VzLnRyYWlsaW5nXG4gIH07XG59XG5mdW5jdGlvbiBlZGdlV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgdmFyIG0gPSBzdHJpbmcubWF0Y2goL14oKFsgXFx0XFxyXFxuXSopKFxccyopKSg/Oig/PVxcUylbXFxzXFxTXSpcXFMpPygoXFxzKj8pKFsgXFx0XFxyXFxuXSopKSQvKTtcbiAgcmV0dXJuIHtcbiAgICBsZWFkaW5nOiBtWzFdLFxuICAgIC8vIHdob2xlIHN0cmluZyBmb3Igd2hpdGVzcGFjZS1vbmx5IHN0cmluZ3NcbiAgICBsZWFkaW5nQXNjaWk6IG1bMl0sXG4gICAgbGVhZGluZ05vbkFzY2lpOiBtWzNdLFxuICAgIHRyYWlsaW5nOiBtWzRdLFxuICAgIC8vIGVtcHR5IGZvciB3aGl0ZXNwYWNlLW9ubHkgc3RyaW5nc1xuICAgIHRyYWlsaW5nTm9uQXNjaWk6IG1bNV0sXG4gICAgdHJhaWxpbmdBc2NpaTogbVs2XVxuICB9O1xufVxuZnVuY3Rpb24gaXNGbGFua2VkQnlXaGl0ZXNwYWNlKHNpZGUsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdmFyIHNpYmxpbmc7XG4gIHZhciByZWdFeHA7XG4gIHZhciBpc0ZsYW5rZWQ7XG4gIGlmIChzaWRlID09PSAnbGVmdCcpIHtcbiAgICBzaWJsaW5nID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgcmVnRXhwID0gLyAkLztcbiAgfSBlbHNlIHtcbiAgICBzaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcbiAgICByZWdFeHAgPSAvXiAvO1xuICB9XG4gIGlmIChzaWJsaW5nKSB7XG4gICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIGlzRmxhbmtlZCA9IHJlZ0V4cC50ZXN0KHNpYmxpbmcubm9kZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucHJlZm9ybWF0dGVkQ29kZSAmJiBzaWJsaW5nLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICAgIGlzRmxhbmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiAhaXNCbG9jayhzaWJsaW5nKSkge1xuICAgICAgaXNGbGFua2VkID0gcmVnRXhwLnRlc3Qoc2libGluZy50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpc0ZsYW5rZWQ7XG59XG5cbnZhciByZWR1Y2UgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlO1xuZnVuY3Rpb24gVHVybmRvd25TZXJ2aWNlKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFR1cm5kb3duU2VydmljZSkpIHJldHVybiBuZXcgVHVybmRvd25TZXJ2aWNlKG9wdGlvbnMpO1xuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgcnVsZXM6IHJ1bGVzLFxuICAgIGhlYWRpbmdTdHlsZTogJ3NldGV4dCcsXG4gICAgaHI6ICcqICogKicsXG4gICAgYnVsbGV0TGlzdE1hcmtlcjogJyonLFxuICAgIGNvZGVCbG9ja1N0eWxlOiAnaW5kZW50ZWQnLFxuICAgIGZlbmNlOiAnYGBgJyxcbiAgICBlbURlbGltaXRlcjogJ18nLFxuICAgIHN0cm9uZ0RlbGltaXRlcjogJyoqJyxcbiAgICBsaW5rU3R5bGU6ICdpbmxpbmVkJyxcbiAgICBsaW5rUmVmZXJlbmNlU3R5bGU6ICdmdWxsJyxcbiAgICBicjogJyAgJyxcbiAgICBwcmVmb3JtYXR0ZWRDb2RlOiBmYWxzZSxcbiAgICBibGFua1JlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuaXNCbG9jayA/ICdcXG5cXG4nIDogJyc7XG4gICAgfSxcbiAgICBrZWVwUmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgKyBub2RlLm91dGVySFRNTCArICdcXG5cXG4nIDogbm9kZS5vdXRlckhUTUw7XG4gICAgfSxcbiAgICBkZWZhdWx0UmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbicgOiBjb250ZW50O1xuICAgIH1cbiAgfTtcbiAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gIHRoaXMucnVsZXMgPSBuZXcgUnVsZXModGhpcy5vcHRpb25zKTtcbn1cblR1cm5kb3duU2VydmljZS5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBUaGUgZW50cnkgcG9pbnQgZm9yIGNvbnZlcnRpbmcgYSBzdHJpbmcgb3IgRE9NIG5vZGUgdG8gTWFya2Rvd25cbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXQgVGhlIHN0cmluZyBvciBET00gbm9kZSB0byBjb252ZXJ0XG4gICAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIGlucHV0XG4gICAqIEB0eXBlIFN0cmluZ1xuICAgKi9cblxuICB0dXJuZG93bjogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKCFjYW5Db252ZXJ0KGlucHV0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnB1dCArICcgaXMgbm90IGEgc3RyaW5nLCBvciBhbiBlbGVtZW50L2RvY3VtZW50L2ZyYWdtZW50IG5vZGUuJyk7XG4gICAgfVxuICAgIGlmIChpbnB1dCA9PT0gJycpIHJldHVybiAnJztcbiAgICB2YXIgb3V0cHV0ID0gcHJvY2Vzcy5jYWxsKHRoaXMsIG5ldyBSb290Tm9kZShpbnB1dCwgdGhpcy5vcHRpb25zKSk7XG4gICAgcmV0dXJuIHBvc3RQcm9jZXNzLmNhbGwodGhpcywgb3V0cHV0KTtcbiAgfSxcbiAgLyoqXG4gICAqIEFkZCBvbmUgb3IgbW9yZSBwbHVnaW5zXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtGdW5jdGlvbnxBcnJheX0gcGx1Z2luIFRoZSBwbHVnaW4gb3IgYXJyYXkgb2YgcGx1Z2lucyB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIFR1cm5kb3duIGluc3RhbmNlIGZvciBjaGFpbmluZ1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG5cbiAgdXNlOiBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbHVnaW4ubGVuZ3RoOyBpKyspIHRoaXMudXNlKHBsdWdpbltpXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4odGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BsdWdpbiBtdXN0IGJlIGEgRnVuY3Rpb24gb3IgYW4gQXJyYXkgb2YgRnVuY3Rpb25zJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogQWRkcyBhIHJ1bGVcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlIFRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIGFkZFJ1bGU6IGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICB0aGlzLnJ1bGVzLmFkZChrZXksIHJ1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogS2VlcCBhIG5vZGUgKGFzIEhUTUwpIHRoYXQgbWF0Y2hlcyB0aGUgZmlsdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259IGZpbHRlciBUaGUgdW5pcXVlIGtleSBvZiB0aGUgcnVsZVxuICAgKiBAcmV0dXJucyBUaGUgVHVybmRvd24gaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cblxuICBrZWVwOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5ydWxlcy5rZWVwKGZpbHRlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBub2RlIHRoYXQgbWF0Y2hlcyB0aGUgZmlsdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259IGZpbHRlciBUaGUgdW5pcXVlIGtleSBvZiB0aGUgcnVsZVxuICAgKiBAcmV0dXJucyBUaGUgVHVybmRvd24gaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cblxuICByZW1vdmU6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICB0aGlzLnJ1bGVzLnJlbW92ZShmaWx0ZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogRXNjYXBlcyBNYXJrZG93biBzeW50YXhcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZXNjYXBlXG4gICAqIEByZXR1cm5zIEEgc3RyaW5nIHdpdGggTWFya2Rvd24gc3ludGF4IGVzY2FwZWRcbiAgICogQHR5cGUgU3RyaW5nXG4gICAqL1xuXG4gIGVzY2FwZTogZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHJldHVybiBlc2NhcGVNYXJrZG93bihzdHJpbmcpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlZHVjZXMgYSBET00gbm9kZSBkb3duIHRvIGl0cyBNYXJrZG93biBzdHJpbmcgZXF1aXZhbGVudFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudE5vZGUgVGhlIG5vZGUgdG8gY29udmVydFxuICogQHJldHVybnMgQSBNYXJrZG93biByZXByZXNlbnRhdGlvbiBvZiB0aGUgbm9kZVxuICogQHR5cGUgU3RyaW5nXG4gKi9cblxuZnVuY3Rpb24gcHJvY2VzcyhwYXJlbnROb2RlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmV0dXJuIHJlZHVjZS5jYWxsKHBhcmVudE5vZGUuY2hpbGROb2RlcywgZnVuY3Rpb24gKG91dHB1dCwgbm9kZSkge1xuICAgIG5vZGUgPSBuZXcgTm9kZShub2RlLCBzZWxmLm9wdGlvbnMpO1xuICAgIHZhciByZXBsYWNlbWVudCA9ICcnO1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICByZXBsYWNlbWVudCA9IG5vZGUuaXNDb2RlID8gbm9kZS5ub2RlVmFsdWUgOiBzZWxmLmVzY2FwZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICByZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50Rm9yTm9kZS5jYWxsKHNlbGYsIG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gam9pbihvdXRwdXQsIHJlcGxhY2VtZW50KTtcbiAgfSwgJycpO1xufVxuXG4vKipcbiAqIEFwcGVuZHMgc3RyaW5ncyBhcyBlYWNoIHJ1bGUgcmVxdWlyZXMgYW5kIHRyaW1zIHRoZSBvdXRwdXRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBjb252ZXJzaW9uIG91dHB1dFxuICogQHJldHVybnMgQSB0cmltbWVkIHZlcnNpb24gb2YgdGhlIG91cHV0XG4gKiBAdHlwZSBTdHJpbmdcbiAqL1xuXG5mdW5jdGlvbiBwb3N0UHJvY2VzcyhvdXRwdXQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICBpZiAodHlwZW9mIHJ1bGUuYXBwZW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvdXRwdXQgPSBqb2luKG91dHB1dCwgcnVsZS5hcHBlbmQoc2VsZi5vcHRpb25zKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dC5yZXBsYWNlKC9eW1xcdFxcclxcbl0rLywgJycpLnJlcGxhY2UoL1tcXHRcXHJcXG5cXHNdKyQvLCAnJyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gZWxlbWVudCBub2RlIHRvIGl0cyBNYXJrZG93biBlcXVpdmFsZW50XG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUaGUgbm9kZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyBBIE1hcmtkb3duIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBub2RlXG4gKiBAdHlwZSBTdHJpbmdcbiAqL1xuXG5mdW5jdGlvbiByZXBsYWNlbWVudEZvck5vZGUobm9kZSkge1xuICB2YXIgcnVsZSA9IHRoaXMucnVsZXMuZm9yTm9kZShub2RlKTtcbiAgdmFyIGNvbnRlbnQgPSBwcm9jZXNzLmNhbGwodGhpcywgbm9kZSk7XG4gIHZhciB3aGl0ZXNwYWNlID0gbm9kZS5mbGFua2luZ1doaXRlc3BhY2U7XG4gIGlmICh3aGl0ZXNwYWNlLmxlYWRpbmcgfHwgd2hpdGVzcGFjZS50cmFpbGluZykgY29udGVudCA9IGNvbnRlbnQudHJpbSgpO1xuICByZXR1cm4gd2hpdGVzcGFjZS5sZWFkaW5nICsgcnVsZS5yZXBsYWNlbWVudChjb250ZW50LCBub2RlLCB0aGlzLm9wdGlvbnMpICsgd2hpdGVzcGFjZS50cmFpbGluZztcbn1cblxuLyoqXG4gKiBKb2lucyByZXBsYWNlbWVudCB0byB0aGUgY3VycmVudCBvdXRwdXQgd2l0aCBhcHByb3ByaWF0ZSBudW1iZXIgb2YgbmV3IGxpbmVzXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgY3VycmVudCBjb252ZXJzaW9uIG91dHB1dFxuICogQHBhcmFtIHtTdHJpbmd9IHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gYXBwZW5kIHRvIHRoZSBvdXRwdXRcbiAqIEByZXR1cm5zIEpvaW5lZCBvdXRwdXRcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIGpvaW4ob3V0cHV0LCByZXBsYWNlbWVudCkge1xuICB2YXIgczEgPSB0cmltVHJhaWxpbmdOZXdsaW5lcyhvdXRwdXQpO1xuICB2YXIgczIgPSB0cmltTGVhZGluZ05ld2xpbmVzKHJlcGxhY2VtZW50KTtcbiAgdmFyIG5scyA9IE1hdGgubWF4KG91dHB1dC5sZW5ndGggLSBzMS5sZW5ndGgsIHJlcGxhY2VtZW50Lmxlbmd0aCAtIHMyLmxlbmd0aCk7XG4gIHZhciBzZXBhcmF0b3IgPSAnXFxuXFxuJy5zdWJzdHJpbmcoMCwgbmxzKTtcbiAgcmV0dXJuIHMxICsgc2VwYXJhdG9yICsgczI7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGFuIGlucHV0IGNhbiBiZSBjb252ZXJ0ZWRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXQgRGVzY3JpYmUgdGhpcyBwYXJhbWV0ZXJcbiAqIEByZXR1cm5zIERlc2NyaWJlIHdoYXQgaXQgcmV0dXJuc1xuICogQHR5cGUgU3RyaW5nfE9iamVjdHxBcnJheXxCb29sZWFufE51bWJlclxuICovXG5cbmZ1bmN0aW9uIGNhbkNvbnZlcnQoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0ICE9IG51bGwgJiYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgaW5wdXQubm9kZVR5cGUgJiYgKGlucHV0Lm5vZGVUeXBlID09PSAxIHx8IGlucHV0Lm5vZGVUeXBlID09PSA5IHx8IGlucHV0Lm5vZGVUeXBlID09PSAxMSkpO1xufVxuXG5leHBvcnQgeyBUdXJuZG93blNlcnZpY2UgYXMgZGVmYXVsdCB9O1xuIiwgInZhciBoaWdobGlnaHRSZWdFeHAgPSAvaGlnaGxpZ2h0LSg/Oig/OnRleHR8c291cmNlKS0pPyhbYS16MC05XSspL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoaWdobGlnaHRlZENvZGVCbG9jayAodHVybmRvd25TZXJ2aWNlKSB7XG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdoaWdobGlnaHRlZENvZGVCbG9jaycsIHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgZmlyc3RDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0RJVicgJiZcbiAgICAgICAgaGlnaGxpZ2h0UmVnRXhwLnRlc3Qobm9kZS5jbGFzc05hbWUpICYmXG4gICAgICAgIGZpcnN0Q2hpbGQgJiZcbiAgICAgICAgZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ1BSRSdcbiAgICAgIClcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IG5vZGUuY2xhc3NOYW1lIHx8ICcnXG4gICAgICB2YXIgbGFuZ3VhZ2UgPSAoY2xhc3NOYW1lLm1hdGNoKGhpZ2hsaWdodFJlZ0V4cCkgfHwgW251bGwsICcnXSlbMV1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgJ1xcblxcbicgKyBvcHRpb25zLmZlbmNlICsgbGFuZ3VhZ2UgKyAnXFxuJyArXG4gICAgICAgIG5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCArXG4gICAgICAgICdcXG4nICsgb3B0aW9ucy5mZW5jZSArICdcXG5cXG4nXG4gICAgICApXG4gICAgfVxuICB9KVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlrZXRocm91Z2ggKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnc3RyaWtldGhyb3VnaCcsIHtcbiAgICBmaWx0ZXI6IFsnZGVsJywgJ3MnLCAnc3RyaWtlJ10sXG4gICAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICByZXR1cm4gJ35+JyArIGNvbnRlbnQgKyAnfn4nXG4gICAgfVxuICB9KVxufVxuIiwgInZhciBydWxlcyA9IHt9XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBzYWZlbHkgZ2V0IHRleHQgY29udGVudCBhbmQgY2xlYW4gaXRcbmZ1bmN0aW9uIGNsZWFuQ2VsbENvbnRlbnQoY29udGVudCkge1xuICBpZiAoIWNvbnRlbnQpIHJldHVybiAnICAgJyAvLyBEZWZhdWx0IGVtcHR5IGNlbGwgY29udGVudFxuICBcbiAgLy8gQ2xlYW4gYW5kIG5vcm1hbGl6ZSBjb250ZW50XG4gIGxldCBjbGVhbmVkID0gY29udGVudFxuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIE5vcm1hbGl6ZSB3aGl0ZXNwYWNlXG4gICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKSAvLyBFc2NhcGUgcGlwZXNcbiAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSAvLyBFc2NhcGUgYmFja3NsYXNoZXNcbiAgICAucmVwbGFjZSgvXFxuKy9nLCAnICcpIC8vIENvbnZlcnQgbmV3bGluZXMgdG8gc3BhY2VzXG4gICAgLnJlcGxhY2UoL1xccisvZywgJyAnKSAvLyBDb252ZXJ0IGNhcnJpYWdlIHJldHVybnMgdG8gc3BhY2VzXG4gIFxuICAvLyBJZiBjb250ZW50IGlzIHN0aWxsIGVtcHR5IG9yIG9ubHkgd2hpdGVzcGFjZSwgcHJvdmlkZSBkZWZhdWx0XG4gIGlmICghY2xlYW5lZCB8fCBjbGVhbmVkLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgIHJldHVybiAnICAgJ1xuICB9XG4gIFxuICAvLyBFbnN1cmUgbWluaW11bSB3aWR0aCBmb3IgdGFibGUgcmVhZGFiaWxpdHlcbiAgaWYgKGNsZWFuZWQubGVuZ3RoIDwgMykge1xuICAgIGNsZWFuZWQgKz0gJyAnLnJlcGVhdCgzIC0gY2xlYW5lZC5sZW5ndGgpXG4gIH1cbiAgXG4gIHJldHVybiBjbGVhbmVkXG59XG5cbi8vIEVuaGFuY2VkIGNlbGwgcmVwbGFjZW1lbnQgd2l0aCBjb2xzcGFuIHN1cHBvcnRcbmZ1bmN0aW9uIGNlbGwoY29udGVudCwgbm9kZSwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSBudWxsICYmIG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKG5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBub2RlKVxuICB9XG4gIGlmIChpbmRleCA9PT0gbnVsbCkgaW5kZXggPSAwXG4gIFxuICB2YXIgcHJlZml4ID0gJyAnXG4gIGlmIChpbmRleCA9PT0gMCkgcHJlZml4ID0gJ3wgJ1xuICBcbiAgbGV0IGNlbGxDb250ZW50ID0gY2xlYW5DZWxsQ29udGVudChjb250ZW50KVxuICBcbiAgLy8gSGFuZGxlIGNvbHNwYW4gYnkgYWRkaW5nIGV4dHJhIGVtcHR5IGNlbGxzXG4gIGxldCBjb2xzcGFuID0gMVxuICBpZiAobm9kZSAmJiBub2RlLmdldEF0dHJpYnV0ZSkge1xuICAgIGNvbHNwYW4gPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpIHx8ICcxJywgMTApXG4gICAgaWYgKGlzTmFOKGNvbHNwYW4pIHx8IGNvbHNwYW4gPCAxKSBjb2xzcGFuID0gMVxuICB9XG4gIFxuICBsZXQgcmVzdWx0ID0gcHJlZml4ICsgY2VsbENvbnRlbnQgKyAnIHwnXG4gIFxuICAvLyBBZGQgZW1wdHkgY2VsbHMgZm9yIGNvbHNwYW5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb2xzcGFuOyBpKyspIHtcbiAgICByZXN1bHQgKz0gJyAgIHwnXG4gIH1cbiAgXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIGhlYWRpbmcgcm93IChlbmhhbmNlZCBmb3IgZWRnZSBjYXNlcylcbmZ1bmN0aW9uIGlzSGVhZGluZ1Jvdyh0cikge1xuICBpZiAoIXRyIHx8ICF0ci5wYXJlbnROb2RlKSByZXR1cm4gZmFsc2VcbiAgXG4gIHZhciBwYXJlbnROb2RlID0gdHIucGFyZW50Tm9kZVxuICBcbiAgLy8gQ2hlY2sgaWYgcGFyZW50IGlzIFRIRUFEXG4gIGlmIChwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnVEhFQUQnKSByZXR1cm4gdHJ1ZVxuICBcbiAgLy8gQ2hlY2sgaWYgaXQncyB0aGUgZmlyc3Qgcm93IGFuZCBjb250YWlucyBUSCBlbGVtZW50c1xuICBpZiAocGFyZW50Tm9kZS5maXJzdENoaWxkID09PSB0ciAmJiBcbiAgICAgIChwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnVEFCTEUnIHx8IHBhcmVudE5vZGUubm9kZU5hbWUgPT09ICdUQk9EWScpKSB7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgYWxsIGNoaWxkIG5vZGVzIGFyZSBUSCAoaWdub3JlIHRleHQgbm9kZXMpXG4gICAgdmFyIGNlbGxOb2RlcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCh0ci5jaGlsZE5vZGVzLCBmdW5jdGlvbihuKSB7XG4gICAgICByZXR1cm4gbi5ub2RlVHlwZSA9PT0gMSAvLyBFbGVtZW50IG5vZGVzIG9ubHlcbiAgICB9KVxuICAgIFxuICAgIGlmIChjZWxsTm9kZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2VcbiAgICBcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwoY2VsbE5vZGVzLCBmdW5jdGlvbiAobikgeyBcbiAgICAgIHJldHVybiBuLm5vZGVOYW1lID09PSAnVEgnIFxuICAgIH0pXG4gIH1cbiAgXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBHZXQgdGFibGUgY29sdW1uIGNvdW50IChoYW5kbGVzIGVkZ2UgY2FzZXMpXG5mdW5jdGlvbiBnZXRUYWJsZUNvbENvdW50KHRhYmxlKSB7XG4gIGlmICghdGFibGUgfHwgIXRhYmxlLnJvd3MpIHJldHVybiAwXG4gIFxuICBsZXQgbWF4Q29scyA9IDBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gdGFibGUucm93c1tpXVxuICAgIGlmICghcm93IHx8ICFyb3cuY2hpbGROb2RlcykgY29udGludWVcbiAgICBcbiAgICBsZXQgY29sQ291bnQgPSAwXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHJvdy5jaGlsZE5vZGVzW2pdXG4gICAgICBpZiAoY2VsbC5ub2RlVHlwZSA9PT0gMSAmJiAoY2VsbC5ub2RlTmFtZSA9PT0gJ1REJyB8fCBjZWxsLm5vZGVOYW1lID09PSAnVEgnKSkge1xuICAgICAgICBjb25zdCBjb2xzcGFuID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSB8fCAnMScsIDEwKVxuICAgICAgICBjb2xDb3VudCArPSBpc05hTihjb2xzcGFuKSA/IDEgOiBNYXRoLm1heCgxLCBjb2xzcGFuKVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAoY29sQ291bnQgPiBtYXhDb2xzKSBtYXhDb2xzID0gY29sQ291bnRcbiAgfVxuICBcbiAgcmV0dXJuIG1heENvbHNcbn1cblxuLy8gQ2hlY2sgaWYgdGFibGUgc2hvdWxkIGJlIHNraXBwZWQgKHRvbyBzaW1wbGUgb3IgbWFsZm9ybWVkKVxuZnVuY3Rpb24gc2hvdWxkU2tpcFRhYmxlKHRhYmxlKSB7XG4gIGlmICghdGFibGUpIHJldHVybiB0cnVlXG4gIFxuICAvLyBTa2lwIGNvbXBsZXRlbHkgZW1wdHkgdGFibGVzXG4gIGlmICghdGFibGUucm93cyB8fCB0YWJsZS5yb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcbiAgXG4gIC8vIENvdW50IGFjdHVhbCBjb250ZW50IGNlbGxzXG4gIGxldCBjb250ZW50Q2VsbHMgPSAwXG4gIGxldCB0b3RhbENlbGxzID0gMFxuICBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gdGFibGUucm93c1tpXVxuICAgIGlmICghcm93IHx8ICFyb3cuY2hpbGROb2RlcykgY29udGludWVcbiAgICBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5jaGlsZE5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gcm93LmNoaWxkTm9kZXNbal1cbiAgICAgIGlmIChjZWxsLm5vZGVUeXBlID09PSAxICYmIChjZWxsLm5vZGVOYW1lID09PSAnVEQnIHx8IGNlbGwubm9kZU5hbWUgPT09ICdUSCcpKSB7XG4gICAgICAgIHRvdGFsQ2VsbHMrK1xuICAgICAgICBpZiAoY2VsbC50ZXh0Q29udGVudCAmJiBjZWxsLnRleHRDb250ZW50LnRyaW0oKSkge1xuICAgICAgICAgIGNvbnRlbnRDZWxscysrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNraXAgaWYgbm8gY2VsbHMgb3Igb25seSBvbmUgY2VsbCB3aXRoIG5vIG1lYW5pbmdmdWwgY29udGVudFxuICBpZiAodG90YWxDZWxscyA9PT0gMCkgcmV0dXJuIHRydWVcbiAgaWYgKHRvdGFsQ2VsbHMgPT09IDEgJiYgY29udGVudENlbGxzID09PSAwKSByZXR1cm4gdHJ1ZVxuICBcbiAgcmV0dXJuIGZhbHNlXG59XG5cbnJ1bGVzLnRhYmxlQ2VsbCA9IHtcbiAgZmlsdGVyOiBbJ3RoJywgJ3RkJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHJldHVybiBjZWxsKGNvbnRlbnQsIG5vZGUsIG51bGwpXG4gIH1cbn1cblxucnVsZXMudGFibGVSb3cgPSB7XG4gIGZpbHRlcjogJ3RyJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgLy8gU2tpcCBlbXB0eSByb3dzXG4gICAgaWYgKCFjb250ZW50IHx8ICFjb250ZW50LnRyaW0oKSkgcmV0dXJuICcnXG4gICAgXG4gICAgdmFyIGJvcmRlckNlbGxzID0gJydcbiAgICBcbiAgICAvLyBBZGQgc2VwYXJhdG9yIHJvdyBmb3IgaGVhZGluZ1xuICAgIGlmIChpc0hlYWRpbmdSb3cobm9kZSkpIHtcbiAgICAgIGNvbnN0IHRhYmxlID0gbm9kZS5jbG9zZXN0KCd0YWJsZScpXG4gICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgY29uc3QgY29sQ291bnQgPSBnZXRUYWJsZUNvbENvdW50KHRhYmxlKVxuICAgICAgICBcbiAgICAgICAgaWYgKGNvbENvdW50ID4gMCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gaSA9PT0gMCA/ICd8ICcgOiAnICdcbiAgICAgICAgICAgIGJvcmRlckNlbGxzICs9IHByZWZpeCArICctLS0nICsgJyB8J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gJ1xcbicgKyBjb250ZW50ICsgKGJvcmRlckNlbGxzID8gJ1xcbicgKyBib3JkZXJDZWxscyA6ICcnKVxuICB9XG59XG5cbnJ1bGVzLnRhYmxlID0ge1xuICBmaWx0ZXI6ICd0YWJsZScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIC8vIENoZWNrIGlmIHRhYmxlIHNob3VsZCBiZSBza2lwcGVkXG4gICAgaWYgKHNob3VsZFNraXBUYWJsZShub2RlKSkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIFxuICAgIC8vIENsZWFuIHVwIGNvbnRlbnQgKHJlbW92ZSBleHRyYSBuZXdsaW5lcylcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4rL2csICdcXG4nKS50cmltKClcbiAgICBcbiAgICAvLyBJZiBubyBjb250ZW50IGFmdGVyIGNsZWFuaW5nLCByZXR1cm4gZW1wdHlcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiAnJ1xuICAgIFxuICAgIC8vIFNwbGl0IGludG8gbGluZXMgYW5kIGZpbHRlciBvdXQgZW1wdHkgbGluZXNcbiAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpLmZpbHRlcihsaW5lID0+IGxpbmUudHJpbSgpKVxuICAgIFxuICAgIGlmIChsaW5lcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIFxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gYWRkIGEgaGVhZGVyIHJvd1xuICAgIGNvbnN0IGhhc0hlYWRlclNlcGFyYXRvciA9IGxpbmVzLmxlbmd0aCA+PSAyICYmIC9cXHxcXHMqLSsvLnRlc3QobGluZXNbMV0pXG4gICAgXG4gICAgbGV0IHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpXG4gICAgXG4gICAgLy8gSWYgbm8gaGVhZGVyIHNlcGFyYXRvciBleGlzdHMsIGFkZCBhIHNpbXBsZSBvbmVcbiAgICBpZiAoIWhhc0hlYWRlclNlcGFyYXRvciAmJiBsaW5lcy5sZW5ndGggPj0gMSkge1xuICAgICAgY29uc3QgZmlyc3RMaW5lID0gbGluZXNbMF1cbiAgICAgIGNvbnN0IGNvbENvdW50ID0gKGZpcnN0TGluZS5tYXRjaCgvXFx8L2cpIHx8IFtdKS5sZW5ndGggLSAxXG4gICAgICBcbiAgICAgIGlmIChjb2xDb3VudCA+IDApIHtcbiAgICAgICAgbGV0IHNlcGFyYXRvciA9ICd8J1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbENvdW50OyBpKyspIHtcbiAgICAgICAgICBzZXBhcmF0b3IgKz0gJyAtLS0gfCdcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gSW5zZXJ0IHNlcGFyYXRvciBhZnRlciBmaXJzdCBsaW5lXG4gICAgICAgIGNvbnN0IHJlc3VsdExpbmVzID0gW2xpbmVzWzBdLCBzZXBhcmF0b3IsIC4uLmxpbmVzLnNsaWNlKDEpXVxuICAgICAgICByZXN1bHQgPSByZXN1bHRMaW5lcy5qb2luKCdcXG4nKVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gJ1xcblxcbicgKyByZXN1bHQgKyAnXFxuXFxuJ1xuICB9XG59XG5cbi8vIFJlbW92ZSB0YWJsZSBzZWN0aW9ucyBidXQga2VlcCBjb250ZW50XG5ydWxlcy50YWJsZVNlY3Rpb24gPSB7XG4gIGZpbHRlcjogWyd0aGVhZCcsICd0Ym9keScsICd0Zm9vdCddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudFxuICB9XG59XG5cbi8vIFJlbW92ZSBjYXB0aW9ucyBhbmQgY29sZ3JvdXBzXG5ydWxlcy50YWJsZUNhcHRpb24gPSB7XG4gIGZpbHRlcjogWydjYXB0aW9uJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbigpIHsgcmV0dXJuICcnIH1cbn1cblxucnVsZXMudGFibGVDb2xncm91cCA9IHtcbiAgZmlsdGVyOiBbJ2NvbGdyb3VwJywgJ2NvbCddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24oKSB7IHJldHVybiAnJyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhYmxlcyh0dXJuZG93blNlcnZpY2UpIHtcbiAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoa2V5LCBydWxlc1trZXldKVxuICB9XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza0xpc3RJdGVtcyAodHVybmRvd25TZXJ2aWNlKSB7XG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCd0YXNrTGlzdEl0ZW1zJywge1xuICAgIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLnR5cGUgPT09ICdjaGVja2JveCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnTEknXG4gICAgfSxcbiAgICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiAobm9kZS5jaGVja2VkID8gJ1t4XScgOiAnWyBdJykgKyAnICdcbiAgICB9XG4gIH0pXG59XG4iLCAiaW1wb3J0IGhpZ2hsaWdodGVkQ29kZUJsb2NrIGZyb20gJy4vaGlnaGxpZ2h0ZWQtY29kZS1ibG9jay5qcydcbmltcG9ydCBzdHJpa2V0aHJvdWdoIGZyb20gJy4vc3RyaWtldGhyb3VnaC5qcydcbmltcG9ydCB0YWJsZXMgZnJvbSAnLi90YWJsZXMuanMnXG5pbXBvcnQgdGFza0xpc3RJdGVtcyBmcm9tICcuL3Rhc2stbGlzdC1pdGVtcy5qcydcblxuZnVuY3Rpb24gZ2ZtICh0dXJuZG93blNlcnZpY2UpIHtcbiAgdHVybmRvd25TZXJ2aWNlLnVzZShbXG4gICAgaGlnaGxpZ2h0ZWRDb2RlQmxvY2ssXG4gICAgc3RyaWtldGhyb3VnaCxcbiAgICB0YWJsZXMsXG4gICAgdGFza0xpc3RJdGVtc1xuICBdKVxufVxuXG5leHBvcnQgeyBnZm0sIGhpZ2hsaWdodGVkQ29kZUJsb2NrLCBzdHJpa2V0aHJvdWdoLCB0YWJsZXMsIHRhc2tMaXN0SXRlbXMgfVxuZXhwb3J0IGRlZmF1bHQgZ2ZtICIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBQYW5lbCBNYWNyb3NcbiAqIENvbnZlcnRzIGluZm8vd2FybmluZy9ub3RlL3RpcCBwYW5lbHMgdG8gYmxvY2txdW90ZSBmb3JtYXQuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlUGFuZWxzUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVBhbmVsJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ0RJVicpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IGNsID0gbm9kZS5jbGFzc0xpc3Q7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNybycpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdwYW5lbCcpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLWluZm9ybWF0aW9uJykgfHxcbiAgICAgICAgY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8td2FybmluZycpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLW5vdGUnKSB8fFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNyby10aXAnKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IG1hY3JvTmFtZSA9XG4gICAgICAgIG5vZGUuZGF0YXNldD8ubWFjcm9OYW1lIHx8XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1hY3JvLW5hbWUnKSB8fFxuICAgICAgICBkZXRlY3RQYW5lbFR5cGUobm9kZSk7XG4gICAgICBjb25zdCBsYWJlbCA9IG1hY3JvTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgYm9keSA9IGNvbnRlbnQudHJpbSgpLnJlcGxhY2UoL1xcbi9nLCAnXFxuPiAnKTtcbiAgICAgIHJldHVybiBgXFxuPiAqKiR7bGFiZWx9OioqICR7Ym9keX1cXG5cXG5gO1xuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RQYW5lbFR5cGUobm9kZSkge1xuICBjb25zdCBjbCA9IG5vZGUuY2xhc3NMaXN0O1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8td2FybmluZycpKSByZXR1cm4gJ3dhcm5pbmcnO1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8tbm90ZScpKSByZXR1cm4gJ25vdGUnO1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8tdGlwJykpIHJldHVybiAndGlwJztcbiAgcmV0dXJuICdpbmZvJztcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBDb2RlIEJsb2Nrc1xuICogQ29udmVydHMgQ29uZmx1ZW5jZSBjb2RlIHBhbmVscy9ibG9ja3MgdG8gZmVuY2VkIGNvZGUgYmxvY2tzIChgYGApLlxuICogU3VwcG9ydHMgYm90aCBTZXJ2ZXIvREMgYW5kIENsb3VkIEhUTUwgc3RydWN0dXJlcy5cbiAqIEBpbXBsZW1lbnRzIHtUdXJuZG93blBsdWdpbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZsdWVuY2VDb2RlUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSAxOiBDb25mbHVlbmNlIFNlcnZlci9EQyBcdTIwMTQgZGl2LmNvZGUucGFuZWwgXHUyNTAwXHUyNTAwXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlQ29kZVBhbmVsJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnRElWJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29kZScpICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbCcpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IHBhcmFtU3RyID1cbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCcuY29kZScpPy5kYXRhc2V0Py5zeW50YXhoaWdobGlnaHRlclBhcmFtcyB8fCAnJztcbiAgICAgIGNvbnN0IGxhbmcgPSBleHRyYWN0TGFuZyhwYXJhbVN0cik7XG4gICAgICBjb25zdCBjb2RlRWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ3ByZScpO1xuICAgICAgY29uc3QgY29kZSA9IGNvZGVFbCA/IGNvZGVFbC50ZXh0Q29udGVudCA6IF9jb250ZW50LnRyaW0oKTtcbiAgICAgIHJldHVybiBgXFxuXFxgXFxgXFxgJHtsYW5nfVxcbiR7Y29kZX1cXG5cXGBcXGBcXGBcXG5gO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFx1MjUwMFx1MjUwMCBSdWxlIDI6IENvbmZsdWVuY2UgQ2xvdWQgXHUyMDE0IGRpdltkYXRhLW5vZGUtdHlwZT1cImNvZGVCbG9ja1wiXSBcdTI1MDBcdTI1MDBcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VDbG91ZENvZGVCbG9jaycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0RJVicgJiZcbiAgICAgICAgKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW5vZGUtdHlwZScpID09PSAnY29kZUJsb2NrJyB8fFxuICAgICAgICAgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvZGUtYmxvY2snKSlcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3QgbGFuZyA9XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWxhbmd1YWdlJykgfHxcbiAgICAgICAgbm9kZS5kYXRhc2V0Py5sYW5ndWFnZSB8fFxuICAgICAgICAnJztcbiAgICAgIGNvbnN0IGNvZGUgPSBleHRyYWN0Q29kZVRleHQobm9kZSk7XG4gICAgICByZXR1cm4gYFxcblxcYFxcYFxcYCR7bGFuZ31cXG4ke2NvZGV9XFxuXFxgXFxgXFxgXFxuYDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSAzOiBDb25mbHVlbmNlIG1hY3JvIHRhYmxlLWJhc2VkIGNvZGUgYmxvY2tzIFx1MjUwMFx1MjUwMFxuICAvLyA8dGFibGUgZGF0YS1tYWNyby1uYW1lPVwiY29kZVwiPiBvciB3aXRoIGNsYXNzIFwid3lzaXd5Zy1tYWNyb1wiXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlQ29kZU1hY3JvVGFibGUnLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSAnVEFCTEUnKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tYWNyby1uYW1lJykgPT09ICdjb2RlJyB8fFxuICAgICAgICAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3d5c2l3eWctbWFjcm8nKSAmJlxuICAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKSlcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3QgcGFyYW1TdHIgPVxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tYWNyby1wYXJhbWV0ZXJzJykgfHxcbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ludGF4aGlnaGxpZ2h0ZXItcGFyYW1zJykgfHwgJyc7XG4gICAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmcocGFyYW1TdHIpO1xuICAgICAgY29uc3QgcHJlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBwcmUgPyBwcmUudGV4dENvbnRlbnQgOiBfY29udGVudC50cmltKCk7XG4gICAgICByZXR1cm4gYFxcblxcYFxcYFxcYCR7bGFuZ31cXG4ke2NvZGV9XFxuXFxgXFxgXFxgXFxuYDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSA0OiBwcmUgd2l0aCBDb25mbHVlbmNlLXNwZWNpZmljIGF0dHJpYnV0ZXMgXHUyNTAwXHUyNTAwXG4gIC8vIENhdGNoZXMgPHByZT4gd2l0aCBkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcyBvciBjbGFzcz1cInN5bnRheGhpZ2hsaWdodGVyLSpcIlxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVByZUJsb2NrJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ1BSRScpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiAhIShcbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ludGF4aGlnaGxpZ2h0ZXItcGFyYW1zJykgfHxcbiAgICAgICAgbm9kZS5jbGFzc05hbWUubWF0Y2goL3N5bnRheGhpZ2hsaWdodGVyLykgfHxcbiAgICAgICAgLy8gQ29uZmx1ZW5jZSBDbG91ZDogPHByZT4gaW5zaWRlIGNvZGVCbG9jayB3cmFwcGVyIChhbHJlYWR5IGhhbmRsZWQgYnkgcnVsZSAyLFxuICAgICAgICAvLyBidXQgY2F0Y2ggc3RhbmRhbG9uZSBvbmVzKVxuICAgICAgICBub2RlLnBhcmVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnZGF0YS1ub2RlLXR5cGUnKSA9PT0gJ2NvZGVCbG9jaydcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgLy8gU2tpcCBpZiBwYXJlbnQgaXMgYWxyZWFkeSBoYW5kbGVkIGJ5IHJ1bGUgMlxuICAgICAgaWYgKG5vZGUucGFyZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCdkYXRhLW5vZGUtdHlwZScpID09PSAnY29kZUJsb2NrJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGxldCBydWxlIDIgaGFuZGxlIGl0XG4gICAgICB9XG4gICAgICBjb25zdCBwYXJhbVN0ciA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcycpIHx8ICcnO1xuICAgICAgY29uc3QgbGFuZyA9IGV4dHJhY3RMYW5nKHBhcmFtU3RyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBub2RlLnRleHRDb250ZW50O1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJ1bGUgNTogR2VuZXJpYyA8cHJlPjxjb2RlPiBcdTIwMTQgaW1wcm92ZSBUdXJuZG93bidzIGRlZmF1bHQgXHUyNTAwXHUyNTAwXG4gIC8vIFR1cm5kb3duIGhhbmRsZXMgdGhpcyBuYXRpdmVseSwgYnV0IHNvbWV0aW1lcyBsb3NlcyBuZXdsaW5lc1xuICAvLyB3aGVuIDxjb2RlPiBjb250YWlucyA8c3Bhbj4gd3JhcHBlcnMgKHN5bnRheCBoaWdobGlnaHRpbmcpLlxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgncHJlQ29kZVdpdGhTcGFucycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdQUkUnKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBjb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG4gICAgICBpZiAoIWNvZGUpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIE9ubHkgaW50ZXJjZXB0IGlmIGNvZGUgY29udGFpbnMgY2hpbGQgZWxlbWVudHMgKHNwYW5zIGZvciBzeW50YXggaGlnaGxpZ2h0KVxuICAgICAgcmV0dXJuIGNvZGUuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCBjb2RlRWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcbiAgICAgIGNvbnN0IGxhbmcgPVxuICAgICAgICBleHRyYWN0TGFuZ0Zyb21DbGFzcyhjb2RlRWwuY2xhc3NOYW1lKSB8fFxuICAgICAgICBleHRyYWN0TGFuZ0Zyb21DbGFzcyhub2RlLmNsYXNzTmFtZSkgfHxcbiAgICAgICAgJyc7XG4gICAgICBjb25zdCBjb2RlID0gZXh0cmFjdENvZGVUZXh0KG5vZGUpO1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogRXh0cmFjdCBsYW5ndWFnZSBmcm9tIENvbmZsdWVuY2Ugc3ludGF4aGlnaGxpZ2h0ZXIgcGFyYW1zIHN0cmluZy5cbiAqIGUuZy4gXCJicnVzaDogYmFzaDsgZ3V0dGVyOiB0cnVlXCIgXHUyMTkyIFwiYmFzaFwiXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYW5nKHBhcmFtU3RyKSB7XG4gIGNvbnN0IG1hdGNoID0gcGFyYW1TdHIubWF0Y2goL2JydXNoOlxccyooXFx3KykvKTtcbiAgcmV0dXJuIG1hdGNoID8gbm9ybWFsaXplTGFuZ3VhZ2UobWF0Y2hbMV0pIDogJyc7XG59XG5cbi8qKlxuICogRXh0cmFjdCBsYW5ndWFnZSBmcm9tIENTUyBjbGFzcyBuYW1lcy5cbiAqIGUuZy4gXCJsYW5ndWFnZS1iYXNoXCIsIFwibGFuZy1qc1wiLCBcImJydXNoLXB5dGhvblwiXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYW5nRnJvbUNsYXNzKGNsYXNzTmFtZSkge1xuICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuICcnO1xuICBjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaCgvKD86bGFuZ3VhZ2V8bGFuZ3xicnVzaCktKFxcdyspLyk7XG4gIHJldHVybiBtYXRjaCA/IG5vcm1hbGl6ZUxhbmd1YWdlKG1hdGNoWzFdKSA6ICcnO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBjb21tb24gbGFuZ3VhZ2UgYWxpYXNlcyB0byBzdGFuZGFyZCBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplTGFuZ3VhZ2UobGFuZykge1xuICBjb25zdCBhbGlhc2VzID0ge1xuICAgIGpzOiAnamF2YXNjcmlwdCcsXG4gICAgdHM6ICd0eXBlc2NyaXB0JyxcbiAgICBweTogJ3B5dGhvbicsXG4gICAgcmI6ICdydWJ5JyxcbiAgICBzaDogJ2Jhc2gnLFxuICAgIHNoZWxsOiAnYmFzaCcsXG4gICAgeW1sOiAneWFtbCcsXG4gIH07XG4gIHJldHVybiBhbGlhc2VzW2xhbmcudG9Mb3dlckNhc2UoKV0gfHwgbGFuZy50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgcGxhaW4gdGV4dCBjb2RlIGZyb20gYSBub2RlLCBwcmVzZXJ2aW5nIGxpbmUgYnJlYWtzLlxuICogSGFuZGxlcyA8c3Bhbj4td3JhcHBlZCBsaW5lcywgPGJyPiB0YWdzLCBhbmQgcGxhaW4gdGV4dC5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvZGVUZXh0KG5vZGUpIHtcbiAgY29uc3QgY29kZUVsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdjb2RlJykgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKSB8fCBub2RlO1xuXG4gIC8vIElmIGl0IGhhcyBjaGlsZCBlbGVtZW50cyAoc3BhbnMgZm9yIHN5bnRheCBoaWdobGlnaHRpbmcpLCB3YWxrIHRoZSBET01cbiAgaWYgKGNvZGVFbC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNvZGVFbC5jaGlsZE5vZGVzKSB7XG4gICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLy8gVGV4dCBub2RlXG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQlInKSB7XG4gICAgICAgIHRleHQgKz0gJ1xcbic7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnU1BBTicgfHwgY2hpbGQubm9kZU5hbWUgPT09ICdESVYnKSB7XG4gICAgICAgIC8vIFNwYW4td3JhcHBlZCBsaW5lIG9yIGRpdiBsaW5lXG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vIEFkZCBuZXdsaW5lIGFmdGVyIGJsb2NrLWxldmVsIGVsZW1lbnRzIG9yIGlmIG5leHQgc2libGluZyBpc24ndCBpbmxpbmVcbiAgICAgICAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRElWJykge1xuICAgICAgICAgIHRleHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcbiQvLCAnJyk7IC8vIHRyaW0gdHJhaWxpbmcgbmV3bGluZVxuICB9XG5cbiAgcmV0dXJuIGNvZGVFbC50ZXh0Q29udGVudDtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBUYWJsZXNcbiAqIEhhbmRsZXMgQ29uZmx1ZW5jZSBDbG91ZCB0YWJsZXMgd2hlcmU6XG4gKiAtIEhlYWRlciByb3cgKDx0aD4pIGlzIGluc2lkZSA8dGJvZHk+IChubyA8dGhlYWQ+KVxuICogLSBDZWxscyBjb250YWluIDxwPiwgPGRpdj4sIG9yIG90aGVyIGJsb2NrLWxldmVsIHdyYXBwZXJzXG4gKiAtIFRhYmxlIG1heSBiZSBuZXN0ZWQgaW5zaWRlIGNvbnRhaW5lciBkaXZzXG4gKlxuICogVGhpcyBydWxlIHRha2VzIHByaW9yaXR5IG92ZXIgdGhlIEdGTSB0YWJsZSBydWxlcyBieSBwcm9jZXNzaW5nXG4gKiB0aGUgPHRhYmxlPiBlbGVtZW50IGRpcmVjdGx5IGFuZCBleHRyYWN0aW5nIGNsZWFuIGNvbnRlbnQuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlVGFibGVzUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVRhYmxlJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ1RBQkxFJykgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFub2RlLnJvd3MgfHwgbm9kZS5yb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gU2tpcCBkdXBsaWNhdGUgc3RpY2t5IGhlYWRlciB0YWJsZXMgKENvbmZsdWVuY2UgcmVuZGVycyAyIGNvcGllcylcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBub2RlLmNsb3Nlc3QoJy5wbS10YWJsZS1zdGlja3ktd3JhcHBlcicpO1xuICAgICAgaWYgKHdyYXBwZXIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IHJvd3MgPSBleHRyYWN0Um93cyhub2RlKTtcbiAgICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuXG4gICAgICAvLyBEZXRlY3QgaGVhZGVyIHJvdzogZmlyc3Qgcm93IHdpdGggYWxsIDx0aD4gY2VsbHMsIG9yIDx0aGVhZD4gcm93XG4gICAgICBsZXQgaGVhZGVyUm93ID0gbnVsbDtcbiAgICAgIGxldCBib2R5Um93cyA9IHJvd3M7XG5cbiAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDAgJiYgcm93c1swXS5pc0hlYWRlcikge1xuICAgICAgICBoZWFkZXJSb3cgPSByb3dzWzBdO1xuICAgICAgICBib2R5Um93cyA9IHJvd3Muc2xpY2UoMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5vIGhlYWRlciBkZXRlY3RlZCBidXQgdGFibGUgaGFzIHJvd3MsIHVzZSBmaXJzdCByb3cgYXMgaGVhZGVyXG4gICAgICAvLyAoTWFya2Rvd24gcmVxdWlyZXMgYSBoZWFkZXIgcm93KVxuICAgICAgaWYgKCFoZWFkZXJSb3cgJiYgYm9keVJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgICBoZWFkZXJSb3cgPSBib2R5Um93c1swXTtcbiAgICAgICAgYm9keVJvd3MgPSBib2R5Um93cy5zbGljZSgxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoZWFkZXJSb3cpIHJldHVybiAnJztcblxuICAgICAgLy8gRGV0ZXJtaW5lIGNvbHVtbiBjb3VudCBmcm9tIHRoZSB3aWRlc3Qgcm93XG4gICAgICBjb25zdCBjb2xDb3VudCA9IE1hdGgubWF4KFxuICAgICAgICBoZWFkZXJSb3cuY2VsbHMubGVuZ3RoLFxuICAgICAgICAuLi5ib2R5Um93cy5tYXAoKHIpID0+IHIuY2VsbHMubGVuZ3RoKVxuICAgICAgKTtcblxuICAgICAgaWYgKGNvbENvdW50ID09PSAwKSByZXR1cm4gJyc7XG5cbiAgICAgIC8vIFBhZCByb3dzIHRvIGNvbnNpc3RlbnQgY29sdW1uIGNvdW50XG4gICAgICBjb25zdCBwYWRSb3cgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgd2hpbGUgKGNlbGxzLmxlbmd0aCA8IGNvbENvdW50KSBjZWxscy5wdXNoKCcnKTtcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgICAgfTtcblxuICAgICAgLy8gQnVpbGQgbWFya2Rvd24gdGFibGVcbiAgICAgIGNvbnN0IGxpbmVzID0gW107XG5cbiAgICAgIC8vIEhlYWRlclxuICAgICAgY29uc3QgaENlbGxzID0gcGFkUm93KFsuLi5oZWFkZXJSb3cuY2VsbHNdKTtcbiAgICAgIGxpbmVzLnB1c2goJ3wgJyArIGhDZWxscy5qb2luKCcgfCAnKSArICcgfCcpO1xuXG4gICAgICAvLyBTZXBhcmF0b3JcbiAgICAgIGxpbmVzLnB1c2goJ3wgJyArIGhDZWxscy5tYXAoKCkgPT4gJy0tLScpLmpvaW4oJyB8ICcpICsgJyB8Jyk7XG5cbiAgICAgIC8vIEJvZHkgcm93c1xuICAgICAgZm9yIChjb25zdCByb3cgb2YgYm9keVJvd3MpIHtcbiAgICAgICAgY29uc3QgYkNlbGxzID0gcGFkUm93KFsuLi5yb3cuY2VsbHNdKTtcbiAgICAgICAgbGluZXMucHVzaCgnfCAnICsgYkNlbGxzLmpvaW4oJyB8ICcpICsgJyB8Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnXFxuXFxuJyArIGxpbmVzLmpvaW4oJ1xcbicpICsgJ1xcblxcbic7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gUHJldmVudCBHRk0gdGFibGUgcnVsZXMgZnJvbSBhbHNvIHByb2Nlc3NpbmcgdGFibGUgcGFydHNcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VUYWJsZVNlY3Rpb24nLCB7XG4gICAgZmlsdGVyOiBbJ3RoZWFkJywgJ3Rib2R5JywgJ3Rmb290J10sXG4gICAgcmVwbGFjZW1lbnQoY29udGVudCkge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gU3RyaXAgZHVwbGljYXRlIHN0aWNreSBoZWFkZXIgdGFibGVzIChDb25mbHVlbmNlIHJlbmRlcnMgaGVhZGVyIHR3aWNlKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVN0aWNreUhlYWRlcicsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdESVYnKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gbm9kZS5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdwbS10YWJsZS1zdGlja3ktd3JhcHBlcicpIHx8XG4gICAgICAgIChub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ3BtLXRhYmxlLWNvbnRhaW5lcicpICYmIG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygnaXMtc3RpY2t5JykpO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoKSB7XG4gICAgICByZXR1cm4gJyc7IC8vIGRpc2NhcmQgZW50aXJlbHkgXHUyMDE0IHRoZSByZWFsIHRhYmxlIGlzIGluIHBtLXRhYmxlLXdyYXBwZXJcbiAgICB9LFxuICB9KTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHJvd3MgZnJvbSBhIHRhYmxlIGVsZW1lbnQsIHByZXNlcnZpbmcgaGVhZGVyL2JvZHkgZGlzdGluY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RSb3dzKHRhYmxlKSB7XG4gIGNvbnN0IHJvd3MgPSBbXTtcblxuICBmb3IgKGNvbnN0IHRyIG9mIHRhYmxlLnJvd3MpIHtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgIGxldCBpc0hlYWRlciA9IGZhbHNlO1xuICAgIGxldCB0aENvdW50ID0gMDtcbiAgICBsZXQgY2VsbENvdW50ID0gMDtcblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdHIuY2hpbGROb2Rlcykge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlICE9PSAxKSBjb250aW51ZTsgLy8gc2tpcCB0ZXh0IG5vZGVzXG4gICAgICBpZiAoY2hpbGQubm9kZU5hbWUgIT09ICdURCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICdUSCcpIGNvbnRpbnVlO1xuXG4gICAgICBjZWxsQ291bnQrKztcbiAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ1RIJykgdGhDb3VudCsrO1xuXG4gICAgICBjb25zdCB0ZXh0ID0gY2xlYW5DZWxsQ29udGVudChjaGlsZCk7XG4gICAgICBjZWxscy5wdXNoKHRleHQpO1xuICAgIH1cblxuICAgIC8vIEEgaGVhZGVyIHJvdyA9IGFsbCBjZWxscyBhcmUgPHRoPiwgb3Igcm93IGlzIGluc2lkZSA8dGhlYWQ+XG4gICAgaWYgKGNlbGxDb3VudCA+IDAgJiYgdGhDb3VudCA9PT0gY2VsbENvdW50KSBpc0hlYWRlciA9IHRydWU7XG4gICAgaWYgKHRyLnBhcmVudE5vZGU/Lm5vZGVOYW1lID09PSAnVEhFQUQnKSBpc0hlYWRlciA9IHRydWU7XG5cbiAgICBpZiAoY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgcm93cy5wdXNoKHsgY2VsbHMsIGlzSGVhZGVyIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByb3dzO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgY2xlYW4gdGV4dCBmcm9tIGEgdGFibGUgY2VsbC5cbiAqIEhhbmRsZXMgPHA+LCA8ZGl2PiwgPHNwYW4+LCBpbmxpbmUgY29kZSwgbGlua3MsIGltYWdlcywgYW5kIENvbmZsdWVuY2UgbWVkaWEgd3JhcHBlcnMuXG4gKi9cbmZ1bmN0aW9uIGNsZWFuQ2VsbENvbnRlbnQoY2VsbCkge1xuICAvLyBQcmlvcml0eTogY2hlY2sgZm9yIGFueSA8aW1nPiBhbnl3aGVyZSBpbiB0aGUgY2VsbCBmaXJzdC5cbiAgLy8gQ29uZmx1ZW5jZSB3cmFwcyBpbWFnZXMgaW4gZGVlcCBzdHJ1Y3R1cmVzIChtZWRpYVNpbmdsZSA+IGEgPiBkaXYgPiAuLi4pLFxuICAvLyBhbmQgdGhlIHZpc2libGUgdGV4dCBpcyBqdXN0IFwiT3BlbiBpbWFnZS14eHgucG5nXCIgd2hpY2ggaXMgdXNlbGVzcy5cbiAgY29uc3QgaW1ncyA9IGNlbGwucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG4gIGlmIChpbWdzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBwYXJ0cyA9IFtdO1xuICAgIC8vIENvbGxlY3QgYWxsIGltYWdlc1xuICAgIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICAgIGNvbnN0IGFsdCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fCAnJztcbiAgICAgIGlmIChzcmMpIHBhcnRzLnB1c2goYCFbJHthbHR9XSgke3NyY30pYCk7XG4gICAgfVxuICAgIC8vIEFsc28gY29sbGVjdCBub24taW1hZ2UgdGV4dCBmcm9tIHRoZSBjZWxsICh0aGVyZSBtYXkgYmUgbWl4ZWQgY29udGVudClcbiAgICBjb25zdCB0ZXh0T25seSA9IGV4dHJhY3ROb25JbWFnZVRleHQoY2VsbCk7XG4gICAgaWYgKHRleHRPbmx5KSBwYXJ0cy51bnNoaWZ0KHRleHRPbmx5KTtcbiAgICByZXR1cm4gcGFydHMuam9pbignICcpXG4gICAgICAucmVwbGFjZSgvXFxuL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgIC50cmltKClcbiAgICAgIC5yZXBsYWNlKC9cXHwvZywgJ1xcXFx8Jyk7XG4gIH1cblxuICAvLyBObyBpbWFnZXMgXHUyMDE0IHByb2Nlc3MgY2hpbGRyZW4gbm9ybWFsbHlcbiAgbGV0IHRleHQgPSAnJztcblxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNlbGwuY2hpbGROb2Rlcykge1xuICAgIHRleHQgKz0gcHJvY2Vzc05vZGUoY2hpbGQpO1xuICB9XG5cbiAgLy8gQ2xlYW4gdXA6IGNvbGxhcHNlIHdoaXRlc3BhY2UsIHRyaW0sIGVzY2FwZSBwaXBlc1xuICByZXR1cm4gdGV4dFxuICAgIC5yZXBsYWNlKC9cXG4vZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRleHQgY29udGVudCBmcm9tIGEgY2VsbCwgZXhjbHVkaW5nIGFueSA8aW1nPiBlbGVtZW50cyxcbiAqIENvbmZsdWVuY2UgbWVkaWEgd3JhcHBlcnMsIHNvcnRpbmcgaWNvbnMsIGFuZCBmYWxsYmFjayBidXR0b25zLlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9uSW1hZ2VUZXh0KGNlbGwpIHtcbiAgY29uc3QgY2xvbmUgPSBjZWxsLmNsb25lTm9kZSh0cnVlKTtcbiAgLy8gUmVtb3ZlIGltYWdlcywgbWVkaWEgd3JhcHBlcnMsIHNvcnRpbmcgaWNvbnMsIGFuZCBmYWxsYmFjayBidXR0b25zXG4gIGNvbnN0IHJlbW92ZVNlbGVjdG9ycyA9IFtcbiAgICAnaW1nJyxcbiAgICAnW2RhdGEtbm9kZS10eXBlPVwibWVkaWFTaW5nbGVcIl0nLFxuICAgICdbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVwiXScsXG4gICAgJ2ZpZ3VyZScsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc29ydGluZyBpY29ucyBpbiBoZWFkZXJzXG4gICAgJ2J1dHRvbicsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJPcGVuIGltYWdlLXh4eFwiIGZhbGxiYWNrIGJ1dHRvbnNcbiAgICAnLmFrLXJlbmRlcmVyLXRhYmxlSGVhZGVyLXNvcnRpbmctaWNvbicsICAgICAvLyBzb3J0aW5nIGljb24gd3JhcHBlcnNcbiAgICAnW2RhdGEtdGVzdGlkPVwibWVkaWEtYmFkZ2VzXCJdJywgICAgICAgICAgICAgIC8vIG1lZGlhIGJhZGdlIG92ZXJsYXlzXG4gIF0uam9pbignLCAnKTtcbiAgZm9yIChjb25zdCBlbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKHJlbW92ZVNlbGVjdG9ycykpIHtcbiAgICBlbC5yZW1vdmUoKTtcbiAgfVxuICAvLyBSZW1vdmUgXCJPcGVuIGltYWdlLS4uLlwiIG9yIFwiT3BlbiBTY3JlZW5zaG90Li4uXCIgdGV4dCBsZWZ0IGJ5IENvbmZsdWVuY2VcbiAgY29uc3QgdGV4dCA9IGNsb25lLnRleHRDb250ZW50XG4gICAgLnJlcGxhY2UoL09wZW4gKGltYWdlfFNjcmVlbnNob3QpW15cXG5dKi9nLCAnJylcbiAgICAudHJpbSgpO1xuICByZXR1cm4gdGV4dDtcbn1cblxuLyoqXG4gKiBQcm9jZXNzIGEgc2luZ2xlIERPTSBub2RlIGludG8gbWFya2Rvd24gdGV4dC5cbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc05vZGUoY2hpbGQpIHtcbiAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAzKSB7XG4gICAgcmV0dXJuIGNoaWxkLnRleHRDb250ZW50O1xuICB9XG4gIC8vIFNraXAgQ29uZmx1ZW5jZSBVSSBlbGVtZW50cyAoc29ydGluZyBpY29ucywgZmFsbGJhY2sgYnV0dG9ucywgbWVkaWEgYmFkZ2VzKVxuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdGSUdVUkUnKSByZXR1cm4gJyc7XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHJldHVybiAnJztcbiAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZT8uKCdkYXRhLXRlc3RpZCcpID09PSAnbWVkaWEtYmFkZ2VzJykgcmV0dXJuICcnO1xuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdQJykge1xuICAgIHJldHVybiAnICcgKyBjbGVhbklubGluZUNvbnRlbnQoY2hpbGQpO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgIHJldHVybiAnICc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICByZXR1cm4gJ2AnICsgY2hpbGQudGV4dENvbnRlbnQgKyAnYCc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnUFJFJykge1xuICAgIHJldHVybiAnYCcgKyBjaGlsZC50ZXh0Q29udGVudC50cmltKCkgKyAnYCc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQScpIHtcbiAgICAvLyBDaGVjayBpZiBsaW5rIHdyYXBzIGFuIGltYWdlXG4gICAgY29uc3QgaW1nID0gY2hpbGQucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYWx0ID0gaW1nLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIHx8ICcnO1xuICAgICAgcmV0dXJuIHNyYyA/IGAhWyR7YWx0fV0oJHtzcmN9KWAgOiAnJztcbiAgICB9XG4gICAgY29uc3QgaHJlZiA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgIGNvbnN0IGxpbmtUZXh0ID0gY2hpbGQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIHJldHVybiBocmVmID8gYFske2xpbmtUZXh0fV0oJHtocmVmfSlgIDogbGlua1RleHQ7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnU1RST05HJyB8fCBjaGlsZC5ub2RlTmFtZSA9PT0gJ0InKSB7XG4gICAgcmV0dXJuICcqKicgKyBjaGlsZC50ZXh0Q29udGVudCArICcqKic7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRU0nIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnSScpIHtcbiAgICByZXR1cm4gJyonICsgY2hpbGQudGV4dENvbnRlbnQgKyAnKic7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnSU1HJykge1xuICAgIGNvbnN0IGFsdCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgY29uc3Qgc3JjID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHwgJyc7XG4gICAgcmV0dXJuIGAhWyR7YWx0fV0oJHtzcmN9KWA7XG4gIH1cbiAgLy8gR2VuZXJpYzogcmVjdXJzZVxuICByZXR1cm4gY2xlYW5JbmxpbmVDb250ZW50KGNoaWxkKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IGlubGluZSBjb250ZW50IGZyb20gYW4gZWxlbWVudCwgaGFuZGxpbmcgYmFzaWMgZm9ybWF0dGluZy5cbiAqL1xuZnVuY3Rpb24gY2xlYW5JbmxpbmVDb250ZW50KGVsKSB7XG4gIGxldCB0ZXh0ID0gJyc7XG4gIGZvciAoY29uc3QgY2hpbGQgb2YgZWwuY2hpbGROb2Rlcykge1xuICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgdGV4dCArPSBjaGlsZC50ZXh0Q29udGVudDtcbiAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICAgIHRleHQgKz0gJ2AnICsgY2hpbGQudGV4dENvbnRlbnQgKyAnYCc7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0EnKSB7XG4gICAgICBjb25zdCBocmVmID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICBjb25zdCBsaW5rVGV4dCA9IGNoaWxkLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHRleHQgKz0gaHJlZiA/IGBbJHtsaW5rVGV4dH1dKCR7aHJlZn0pYCA6IGxpbmtUZXh0O1xuICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdTVFJPTkcnIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnQicpIHtcbiAgICAgIHRleHQgKz0gJyoqJyArIGNoaWxkLnRleHRDb250ZW50ICsgJyoqJztcbiAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRU0nIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnSScpIHtcbiAgICAgIHRleHQgKz0gJyonICsgY2hpbGQudGV4dENvbnRlbnQgKyAnKic7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgICAgdGV4dCArPSAnICc7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcbiAgICAgIGNvbnN0IGFsdCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgICBjb25zdCBzcmMgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnO1xuICAgICAgdGV4dCArPSBgIVske2FsdH1dKCR7c3JjfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0ICs9IGNoaWxkLnRleHRDb250ZW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dDtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBVc2VyIE1lbnRpb25zICYgU3RhdHVzIE1hY3Jvc1xuICogQ29udmVydHMgdXNlciBsaW5rcyB0byBAbWVudGlvbnMgYW5kIHN0YXR1cyBiYWRnZXMgdG8gaW5saW5lIGNvZGUuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlTWVudGlvbnNQbHVnaW4odHVybmRvd25TZXJ2aWNlKSB7XG4gIC8vIFVzZXIgbWVudGlvbnNcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VNZW50aW9uJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnQScgJiZcbiAgICAgICAgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25mbHVlbmNlLXVzZXJsaW5rJykgfHxcbiAgICAgICAgICBub2RlLmRhdGFzZXQ/LnVzZXJuYW1lICE9IG51bGwpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHJldHVybiBgQCR7bmFtZX1gO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFN0YXR1cyBtYWNybyAoY29sb3JlZCBsYWJlbHMgbGlrZSBcIklOIFBST0dSRVNTXCIsIFwiRE9ORVwiKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVN0YXR1cycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ1NQQU4nICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGF0dXMtbWFjcm8nKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gYFxcYCR7bm9kZS50ZXh0Q29udGVudC50cmltKCl9XFxgYDtcbiAgICB9LFxuICB9KTtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogSmlyYSBJc3N1ZSBMaW5rcyAmIEVtb3RpY29uc1xuICogQ29udmVydHMgaXNzdWUtbGluayBhbmNob3JzIHRvIFtLRVldKHVybCkgYW5kIGVtb3RpY29uIGltYWdlcyB0byB0ZXh0LlxuICogQGltcGxlbWVudHMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gamlyYUlzc3Vlc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgLy8gSXNzdWUga2V5IGxpbmtzIChlLmcuIFBST0otMTIzKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnamlyYUlzc3VlTGluaycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0EnICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpc3N1ZS1saW5rJylcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3Qga2V5ID0gbm9kZS5kYXRhc2V0Py5pc3N1ZUtleSB8fCBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIGNvbnN0IGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgICAgcmV0dXJuIGBbJHtrZXl9XSgke2hyZWZ9KWA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gRW1vdGljb24gaW1hZ2VzIFx1MjE5MiBhbHQgdGV4dFxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnamlyYUVtb3RpY29uJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnSU1HJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnZW1vdGljb24nKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgIH0sXG4gIH0pO1xufVxuIiwgIi8qKlxuICogUGx1Z2luOiBCYXNlNjQgSW1hZ2UgSW5saW5pbmdcbiAqIFJlcGxhY2VzIDxpbWc+IHNyYyB3aXRoIGRhdGEgVVJJcyBmcm9tIGEgcHJlLWZldGNoZWQgbWFwLlxuICogRmFjdG9yeSBmdW5jdGlvbjogY3JlYXRlcyBhIHBsdWdpbiBib3VuZCB0byBhIHNwZWNpZmljIFVSTFx1MjE5MmRhdGFVUkkgbWFwLlxuICogQHBhcmFtIHtNYXA8c3RyaW5nLHN0cmluZz59IGltYWdlQmFzZTY0TWFwIC0gVVJMIFx1MjE5MiBkYXRhIFVSSSBtYXBwaW5nXG4gKiBAcmV0dXJucyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXNlNjRJbWFnZXNQbHVnaW4oaW1hZ2VCYXNlNjRNYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJhc2U2NEltYWdlc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnYmFzZTY0SW1hZ2VzJywge1xuICAgICAgZmlsdGVyOiAnaW1nJyxcbiAgICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJztcbiAgICAgICAgY29uc3QgYWx0ID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgICBjb25zdCByZXNvbHZlZFNyYyA9IGltYWdlQmFzZTY0TWFwLmdldChzcmMpIHx8IHNyYztcbiAgICAgICAgcmV0dXJuIGAhWyR7YWx0fV0oJHtyZXNvbHZlZFNyY30pYDtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBNYXJrZG93biBTdHJhdGVneVxuICogQ29udmVydHMgSFRNTCAoZnJvbSBKaXJhL0NvbmZsdWVuY2UgRE9NKSB0byBNYXJrZG93bi5cbiAqIFVzZXMgVHVybmRvd24gYXMgdGhlIGNvcmUgZW5naW5lIHdpdGggYSBwbHVnaW4gYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBpbXBsZW1lbnRzIHtDb252ZXJzaW9uU3RyYXRlZ3l9XG4gKi9cbmltcG9ydCBUdXJuZG93blNlcnZpY2UgZnJvbSAndHVybmRvd24nO1xuaW1wb3J0IHsgZ2ZtIH0gZnJvbSAnQHRydXRvL3R1cm5kb3duLXBsdWdpbi1nZm0nO1xuaW1wb3J0IHtcbiAgY29uZmx1ZW5jZVBhbmVsc1BsdWdpbixcbiAgY29uZmx1ZW5jZUNvZGVQbHVnaW4sXG4gIGNvbmZsdWVuY2VUYWJsZXNQbHVnaW4sXG4gIGNvbmZsdWVuY2VNZW50aW9uc1BsdWdpbixcbiAgamlyYUlzc3Vlc1BsdWdpbixcbiAgY3JlYXRlQmFzZTY0SW1hZ2VzUGx1Z2luLFxufSBmcm9tICcuLi9wbHVnaW5zL2luZGV4LmpzJztcblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duU3RyYXRlZ3kge1xuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdtYXJrZG93bic7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBIVE1MIHRvIE1hcmtkb3duLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZyxzdHJpbmc+fSBbb3B0aW9ucy5pbWFnZUJhc2U2NE1hcF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm1ldGFkYXRhXVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29udmVydChodG1sLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGltYWdlQmFzZTY0TWFwLCBtZXRhZGF0YSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5fY3JlYXRlU2VydmljZShpbWFnZUJhc2U2NE1hcCk7XG4gICAgbGV0IG1kID0gc2VydmljZS50dXJuZG93bihodG1sKTtcblxuICAgIGlmIChtZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhtZXRhZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgbWQgPSB0aGlzLl9idWlsZEZyb250TWF0dGVyKG1ldGFkYXRhKSArIG1kO1xuICAgIH1cblxuICAgIHJldHVybiBtZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW5kIGNvbmZpZ3VyZSBhIFR1cm5kb3duIGluc3RhbmNlIHdpdGggYWxsIHBsdWdpbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlU2VydmljZShpbWFnZUJhc2U2NE1hcCkge1xuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgVHVybmRvd25TZXJ2aWNlKHtcbiAgICAgIGhlYWRpbmdTdHlsZTogJ2F0eCcsXG4gICAgICBjb2RlQmxvY2tTdHlsZTogJ2ZlbmNlZCcsXG4gICAgICBidWxsZXRMaXN0TWFya2VyOiAnLScsXG4gICAgICBlbURlbGltaXRlcjogJyonLFxuICAgIH0pO1xuXG4gICAgLy8gQ29yZSBHRk0gc3VwcG9ydFxuICAgIHNlcnZpY2UudXNlKGdmbSk7XG5cbiAgICAvLyBDb25mbHVlbmNlIHBsdWdpbnNcbiAgICBzZXJ2aWNlLnVzZShjb25mbHVlbmNlUGFuZWxzUGx1Z2luKTtcbiAgICBzZXJ2aWNlLnVzZShjb25mbHVlbmNlQ29kZVBsdWdpbik7XG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZVRhYmxlc1BsdWdpbik7XG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZU1lbnRpb25zUGx1Z2luKTtcblxuICAgIC8vIEppcmEgcGx1Z2luc1xuICAgIHNlcnZpY2UudXNlKGppcmFJc3N1ZXNQbHVnaW4pO1xuXG4gICAgLy8gQmFzZTY0IGltYWdlIGlubGluaW5nIChjb25kaXRpb25hbClcbiAgICBpZiAoaW1hZ2VCYXNlNjRNYXAgJiYgaW1hZ2VCYXNlNjRNYXAuc2l6ZSA+IDApIHtcbiAgICAgIHNlcnZpY2UudXNlKGNyZWF0ZUJhc2U2NEltYWdlc1BsdWdpbihpbWFnZUJhc2U2NE1hcCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIFlBTUwgZnJvbnQgbWF0dGVyIGZyb20gbWV0YWRhdGEgb2JqZWN0LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2J1aWxkRnJvbnRNYXR0ZXIobWV0YWRhdGEpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMobWV0YWRhdGEpXG4gICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApXG4gICAgICAuam9pbignXFxuJyk7XG4gICAgcmV0dXJuIGAtLS1cXG4ke2VudHJpZXN9XFxuLS0tXFxuXFxuYDtcbiAgfVxufVxuIiwgIi8qKlxuICogSmlyYSBTdHJhdGVneVxuICogQmlkaXJlY3Rpb25hbCBjb252ZXJzaW9uIGJldHdlZW4gSmlyYSB3aWtpIG1hcmt1cCBhbmQgTWFya2Rvd24uXG4gKiBVc2VzIEFTVCBwaXBlbGluZSBmb3IgTURcdTIxOTJKaXJhIChvcmlnaW5hbCBpbXBsZW1lbnRhdGlvbikuXG4gKiBVc2VzIGppcmEybWQgZm9yIEppcmFcdTIxOTJNRCBkaXJlY3Rpb24gKHdpdGggcG9zdC1wcm9jZXNzaW5nIGZpeGVzKS5cbiAqXG4gKiBAaW1wbGVtZW50cyB7Q29udmVyc2lvblN0cmF0ZWd5fVxuICovXG5pbXBvcnQgSjJNIGZyb20gJ2ppcmEybWQnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuLi9waXBlbGluZS9wYXJzZXIuanMnO1xuaW1wb3J0IHsgd2Fsa0FuZFRyYW5zZm9ybSwgY29sbGFwc2VCbGFua0xpbmVzLCBub3JtYWxpemVMaXN0RGVwdGggfSBmcm9tICcuLi9waXBlbGluZS90cmFuc2Zvcm1lci5qcyc7XG5pbXBvcnQgeyBlbWl0IH0gZnJvbSAnLi4vcGlwZWxpbmUvZW1pdHRlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKaXJhU3RyYXRlZ3kge1xuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdqaXJhJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IE1hcmtkb3duIHRvIEppcmEgd2lraSBtYXJrdXAgdmlhIEFTVCBwaXBlbGluZS5cbiAgICogUGlwZWxpbmU6IHBhcnNlIFx1MjE5MiB0cmFuc2Zvcm0gXHUyMTkyIGVtaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hcmtkb3duXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmcm9tTWFya2Rvd24obWFya2Rvd24pIHtcbiAgICAvLyBQaGFzZSAxOiBQYXJzZSB0byBBU1RcbiAgICBsZXQgYXN0ID0gcGFyc2UobWFya2Rvd24pO1xuXG4gICAgLy8gUGhhc2UgMjogQXBwbHkgdHJhbnNmb3JtZXJzXG4gICAgYXN0ID0gd2Fsa0FuZFRyYW5zZm9ybShhc3QsIGNvbGxhcHNlQmxhbmtMaW5lcyk7XG4gICAgYXN0ID0gbm9ybWFsaXplTGlzdERlcHRoKGFzdCk7XG5cbiAgICAvLyBQaGFzZSAzOiBFbWl0IEppcmEgbWFya3VwXG4gICAgbGV0IHJlc3VsdCA9IGVtaXQoYXN0KTtcblxuICAgIC8vIFBoYXNlIDQ6IEZpbmFsIGNsZWFudXBcbiAgICByZXN1bHQgPSB0aGlzLl9wb3N0UHJvY2VzcyhyZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IEppcmEgd2lraSBtYXJrdXAgdG8gTWFya2Rvd24uXG4gICAqIFVzZXMgamlyYTJtZCBjb3JlIHdpdGggcG9zdC1wcm9jZXNzaW5nIGZpeGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gamlyYU1hcmt1cFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdG9NYXJrZG93bihqaXJhTWFya3VwKSB7XG4gICAgbGV0IG1kID0gSjJNLnRvX21hcmtkb3duKGppcmFNYXJrdXApO1xuXG4gICAgLy8gRml4OiBoZWFkaW5nIHNob3VsZCBoYXZlIHNwYWNlIGFmdGVyICNcbiAgICBtZCA9IG1kLnJlcGxhY2UoL14oI3sxLDZ9KShcXFMpL2dtLCAnJDEgJDInKTtcblxuICAgIC8vIEZpeDogdGFibGUgY2VsbCBzcGFjaW5nXG4gICAgbWQgPSBtZC5yZXBsYWNlKC9cXHwoW158XFxuXSspL2csIChfbWF0Y2gsIGNlbGwpID0+IHtcbiAgICAgIHJldHVybiBgfCAke2NlbGwudHJpbSgpfSBgO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1kO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VzcyB0byBKMk0gZm9yIEhUTUwgZ2VuZXJhdGlvbiAodXNlZCBieSBGaWxsIEppcmEgZmVhdHVyZSkuXG4gICAqL1xuICBnZXQgajJtKCkge1xuICAgIHJldHVybiBKMk07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX3Bvc3RQcm9jZXNzKGppcmEpIHtcbiAgICAvLyBFbnN1cmUgaGVhZGluZ3MgaGF2ZSBzcGFjZSBhZnRlciBkb3RcbiAgICBqaXJhID0gamlyYS5yZXBsYWNlKC9eKGhbMS02XVxcLilcXHMqKFxcUykvZ20sICckMSAkMicpO1xuXG4gICAgLy8gUmVtb3ZlIHRyaXBsZSsgYmxhbmsgbGluZXNcbiAgICBqaXJhID0gamlyYS5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKTtcblxuICAgIC8vIFRyaW0gdHJhaWxpbmcgd2hpdGVzcGFjZSBwZXIgbGluZVxuICAgIGppcmEgPSBqaXJhLnJlcGxhY2UoL1sgXFx0XSskL2dtLCAnJyk7XG5cbiAgICByZXR1cm4gamlyYS50cmltKCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIE1hcmtkb3duIEFTVCBQYXJzZXJcbiAqIENvbnZlcnRzIHJhdyBNYXJrZG93biB0ZXh0IGludG8gYW4gYWJzdHJhY3Qgc3ludGF4IHRyZWUuXG4gKiBFYWNoIG5vZGUgaGFzOiB7IHR5cGUsIGNoaWxkcmVuPywgdmFsdWU/LCBwcm9wcz8gfVxuICpcbiAqIFRoaXMgaXMgYSBjdXN0b20gcmVjdXJzaXZlLWRlc2NlbnQgcGFyc2VyIFx1MjAxNCBub3QgYmFzZWQgb24gYW55IGV4aXN0aW5nIGxpYnJhcnkuXG4gKiBJdCBoYW5kbGVzOiBoZWFkaW5ncywgcGFyYWdyYXBocywgbGlzdHMgKG5lc3RlZC9taXhlZCksIGNvZGUgYmxvY2tzLFxuICogaW5saW5lIGNvZGUsIHRhYmxlcywgYmxvY2txdW90ZXMsIGJvbGQsIGl0YWxpYywgbGlua3MsIGltYWdlcywgaHIuXG4gKi9cblxuLyoqIEB0eXBlZGVmIHt7IHR5cGU6IHN0cmluZywgY2hpbGRyZW4/OiBBU1ROb2RlW10sIHZhbHVlPzogc3RyaW5nLCBwcm9wcz86IFJlY29yZDxzdHJpbmcsYW55PiB9fSBBU1ROb2RlICovXG5cbi8qKlxuICogUGFyc2UgTWFya2Rvd24gc291cmNlIGludG8gYW4gQVNULlxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxuICogQHJldHVybnMge0FTVE5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzb3VyY2UpIHtcbiAgY29uc3QgbGluZXMgPSBzb3VyY2UucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKS5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IHJvb3QgPSB7IHR5cGU6ICdkb2N1bWVudCcsIGNoaWxkcmVuOiBbXSB9O1xuICBsZXQgY3Vyc29yID0gMDtcblxuICB3aGlsZSAoY3Vyc29yIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VCbG9jayhsaW5lcywgY3Vyc29yKTtcbiAgICBpZiAocmVzdWx0Lm5vZGUpIHJvb3QuY2hpbGRyZW4ucHVzaChyZXN1bHQubm9kZSk7XG4gICAgY3Vyc29yID0gcmVzdWx0Lm5leHQ7XG4gIH1cblxuICByZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gcGFyc2VCbG9jayhsaW5lcywgY3Vyc29yKSB7XG4gIGNvbnN0IGxpbmUgPSBsaW5lc1tjdXJzb3JdO1xuXG4gIC8vIEJsYW5rIGxpbmUgXHUyMTkyIHNraXBcbiAgaWYgKGxpbmUudHJpbSgpID09PSAnJykge1xuICAgIHJldHVybiB7IG5vZGU6IG51bGwsIG5leHQ6IGN1cnNvciArIDEgfTtcbiAgfVxuXG4gIC8vIEZlbmNlZCBjb2RlIGJsb2NrXG4gIGlmICgvXmBgYChcXHcqKS8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiBwYXJzZUZlbmNlZENvZGUobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBIZWFkaW5nIChBVFggc3R5bGUpXG4gIGNvbnN0IGhlYWRpbmdNYXRjaCA9IGxpbmUubWF0Y2goL14oI3sxLDZ9KVxccysoLispLyk7XG4gIGlmIChoZWFkaW5nTWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9kZToge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHByb3BzOiB7IGxldmVsOiBoZWFkaW5nTWF0Y2hbMV0ubGVuZ3RoIH0sXG4gICAgICAgIGNoaWxkcmVuOiBwYXJzZUlubGluZShoZWFkaW5nTWF0Y2hbMl0pLFxuICAgICAgfSxcbiAgICAgIG5leHQ6IGN1cnNvciArIDEsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEhvcml6b250YWwgcnVsZVxuICBpZiAoL14oLXszLH18XFwqezMsfXxfezMsfSlcXHMqJC8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiB7IG5vZGU6IHsgdHlwZTogJ2hyJyB9LCBuZXh0OiBjdXJzb3IgKyAxIH07XG4gIH1cblxuICAvLyBCbG9ja3F1b3RlXG4gIGlmICgvXj5cXHM/Ly50ZXN0KGxpbmUpKSB7XG4gICAgcmV0dXJuIHBhcnNlQmxvY2txdW90ZShsaW5lcywgY3Vyc29yKTtcbiAgfVxuXG4gIC8vIFRhYmxlIChwaXBlIHN5bnRheCB3aXRoIHNlcGFyYXRvciBsaW5lKVxuICBpZiAoXG4gICAgY3Vyc29yICsgMSA8IGxpbmVzLmxlbmd0aCAmJlxuICAgIC9eXFx8LipcXHwkLy50ZXN0KGxpbmUudHJpbSgpKSAmJlxuICAgIC9eXFx8W1xcczpdKi17Myx9Ly50ZXN0KGxpbmVzW2N1cnNvciArIDFdLnRyaW0oKSlcbiAgKSB7XG4gICAgcmV0dXJuIHBhcnNlVGFibGUobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBMaXN0IGl0ZW0gKHVub3JkZXJlZDogLSwgKiwgKyBvciBvcmRlcmVkOiAxLilcbiAgaWYgKC9eXFxzKig/OlstKitdfFxcZCtcXC4pXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgcmV0dXJuIHBhcnNlTGlzdChsaW5lcywgY3Vyc29yKTtcbiAgfVxuXG4gIC8vIFBhcmFncmFwaCAoZGVmYXVsdClcbiAgcmV0dXJuIHBhcnNlUGFyYWdyYXBoKGxpbmVzLCBjdXJzb3IpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUZlbmNlZENvZGUobGluZXMsIGN1cnNvcikge1xuICBjb25zdCBvcGVuTWF0Y2ggPSBsaW5lc1tjdXJzb3JdLm1hdGNoKC9eYGBgKFxcdyopLyk7XG4gIGNvbnN0IGxhbmcgPSBvcGVuTWF0Y2ggPyBvcGVuTWF0Y2hbMV0gOiAnJztcbiAgY29uc3QgY29kZUxpbmVzID0gW107XG4gIGxldCBpID0gY3Vyc29yICsgMTtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoJ2BgYCcpKSB7XG4gICAgY29kZUxpbmVzLnB1c2gobGluZXNbaV0pO1xuICAgIGkrKztcbiAgfVxuICAvLyBTa2lwIGNsb3NpbmcgYGBgXG4gIGlmIChpIDwgbGluZXMubGVuZ3RoKSBpKys7XG4gIHJldHVybiB7XG4gICAgbm9kZToge1xuICAgICAgdHlwZTogJ2NvZGVCbG9jaycsXG4gICAgICBwcm9wczogeyBsYW5nIH0sXG4gICAgICB2YWx1ZTogY29kZUxpbmVzLmpvaW4oJ1xcbicpLFxuICAgIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VCbG9ja3F1b3RlKGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgcXVvdGVMaW5lcyA9IFtdO1xuICBsZXQgaSA9IGN1cnNvcjtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgL14+XFxzPy8udGVzdChsaW5lc1tpXSkpIHtcbiAgICBxdW90ZUxpbmVzLnB1c2gobGluZXNbaV0ucmVwbGFjZSgvXj5cXHM/LywgJycpKTtcbiAgICBpKys7XG4gIH1cbiAgY29uc3QgaW5uZXJTb3VyY2UgPSBxdW90ZUxpbmVzLmpvaW4oJ1xcbicpO1xuICBjb25zdCBpbm5lckFzdCA9IHBhcnNlKGlubmVyU291cmNlKTtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiB7IHR5cGU6ICdibG9ja3F1b3RlJywgY2hpbGRyZW46IGlubmVyQXN0LmNoaWxkcmVuIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUYWJsZShsaW5lcywgY3Vyc29yKSB7XG4gIC8vIEhlYWRlciByb3dcbiAgY29uc3QgaGVhZGVyQ2VsbHMgPSBzcGxpdFRhYmxlUm93KGxpbmVzW2N1cnNvcl0pO1xuICAvLyBTa2lwIHNlcGFyYXRvclxuICBsZXQgaSA9IGN1cnNvciArIDI7XG4gIC8vIEJvZHkgcm93c1xuICBjb25zdCBib2R5Um93cyA9IFtdO1xuICB3aGlsZSAoaSA8IGxpbmVzLmxlbmd0aCAmJiAvXlxcfC8udGVzdChsaW5lc1tpXS50cmltKCkpKSB7XG4gICAgYm9keVJvd3MucHVzaChzcGxpdFRhYmxlUm93KGxpbmVzW2ldKSk7XG4gICAgaSsrO1xuICB9XG4gIHJldHVybiB7XG4gICAgbm9kZToge1xuICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgIHByb3BzOiB7IGhlYWRlcnM6IGhlYWRlckNlbGxzIH0sXG4gICAgICBjaGlsZHJlbjogYm9keVJvd3MubWFwKChjZWxscykgPT4gKHsgdHlwZTogJ3RhYmxlUm93JywgcHJvcHM6IHsgY2VsbHMgfSB9KSksXG4gICAgfSxcbiAgICBuZXh0OiBpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzcGxpdFRhYmxlUm93KGxpbmUpIHtcbiAgcmV0dXJuIGxpbmVcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL15cXHx8XFx8JC9nLCAnJylcbiAgICAuc3BsaXQoJ3wnKVxuICAgIC5tYXAoKGMpID0+IGMudHJpbSgpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaXN0KGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgaXRlbXMgPSBbXTtcbiAgbGV0IGkgPSBjdXJzb3I7XG5cbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGgpIHtcbiAgICBjb25zdCBpdGVtTWF0Y2ggPSBsaW5lc1tpXS5tYXRjaCgvXihcXHMqKShbLSorXXxcXGQrXFwuKVxccysoLiopLyk7XG4gICAgaWYgKCFpdGVtTWF0Y2gpIGJyZWFrO1xuXG4gICAgY29uc3QgaW5kZW50ID0gaXRlbU1hdGNoWzFdLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpLmxlbmd0aDtcbiAgICBjb25zdCBtYXJrZXIgPSBpdGVtTWF0Y2hbMl07XG4gICAgY29uc3Qgb3JkZXJlZCA9IC9eXFxkK1xcLiQvLnRlc3QobWFya2VyKTtcbiAgICBjb25zdCBjb250ZW50ID0gaXRlbU1hdGNoWzNdO1xuXG4gICAgLy8gQ29sbGVjdCBjb250aW51YXRpb24gLyBzdWItaXRlbXNcbiAgICBjb25zdCBzdWJMaW5lcyA9IFtdO1xuICAgIGxldCBqID0gaSArIDE7XG4gICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG5leHRNYXRjaCA9IGxpbmVzW2pdLm1hdGNoKC9eKFxccyopKFstKitdfFxcZCtcXC4pXFxzLyk7XG4gICAgICBpZiAobmV4dE1hdGNoKSB7XG4gICAgICAgIGNvbnN0IG5leHRJbmRlbnQgPSBuZXh0TWF0Y2hbMV0ucmVwbGFjZSgvXFx0L2csICcgICAgJykubGVuZ3RoO1xuICAgICAgICBpZiAobmV4dEluZGVudCA+IGluZGVudCkge1xuICAgICAgICAgIHN1YkxpbmVzLnB1c2gobGluZXNbal0pO1xuICAgICAgICAgIGorKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIENvbnRpbnVhdGlvbiBsaW5lIChpbmRlbnRlZCB0ZXh0KVxuICAgICAgaWYgKGxpbmVzW2pdLnRyaW0oKSA9PT0gJycgfHwgL15cXHN7Mix9Ly50ZXN0KGxpbmVzW2pdKSkge1xuICAgICAgICBzdWJMaW5lcy5wdXNoKGxpbmVzW2pdKTtcbiAgICAgICAgaisrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICB0eXBlOiAnbGlzdEl0ZW0nLFxuICAgICAgcHJvcHM6IHsgb3JkZXJlZCwgZGVwdGg6IE1hdGguZmxvb3IoaW5kZW50IC8gMikgfSxcbiAgICAgIGNoaWxkcmVuOiBwYXJzZUlubGluZShjb250ZW50KSxcbiAgICB9O1xuXG4gICAgLy8gUGFyc2UgbmVzdGVkIGxpc3QgZnJvbSBzdWItbGluZXNcbiAgICBpZiAoc3ViTGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVkZW50ZWQgPSBzdWJMaW5lcy5tYXAoKGwpID0+IGwucmVwbGFjZShuZXcgUmVnRXhwKGBeXFxcXHN7JHtpbmRlbnQgKyAyfX1gKSwgJycpKTtcbiAgICAgIGNvbnN0IHN1YkFzdCA9IHBhcnNlKGRlZGVudGVkLmpvaW4oJ1xcbicpKTtcbiAgICAgIGlmIChzdWJBc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBpdGVtLmNoaWxkcmVuID0gWy4uLml0ZW0uY2hpbGRyZW4sIC4uLnN1YkFzdC5jaGlsZHJlbl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICBpID0gajtcbiAgfVxuXG4gIGNvbnN0IGZpcnN0T3JkZXJlZCA9IGl0ZW1zWzBdPy5wcm9wcz8ub3JkZXJlZDtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiB7XG4gICAgICB0eXBlOiAnbGlzdCcsXG4gICAgICBwcm9wczogeyBvcmRlcmVkOiBmaXJzdE9yZGVyZWQgfSxcbiAgICAgIGNoaWxkcmVuOiBpdGVtcyxcbiAgICB9LFxuICAgIG5leHQ6IGksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYWdyYXBoKGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgcGFyYUxpbmVzID0gW107XG4gIGxldCBpID0gY3Vyc29yO1xuICB3aGlsZSAoaSA8IGxpbmVzLmxlbmd0aCAmJiBsaW5lc1tpXS50cmltKCkgIT09ICcnICYmICFpc0Jsb2NrU3RhcnQobGluZXMsIGkpKSB7XG4gICAgcGFyYUxpbmVzLnB1c2gobGluZXNbaV0pO1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4ge1xuICAgIG5vZGU6IHtcbiAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgY2hpbGRyZW46IHBhcnNlSW5saW5lKHBhcmFMaW5lcy5qb2luKCdcXG4nKSksXG4gICAgfSxcbiAgICBuZXh0OiBpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0Jsb2NrU3RhcnQobGluZXMsIGkpIHtcbiAgY29uc3QgbGluZSA9IGxpbmVzW2ldO1xuICBpZiAoL14jezEsNn1cXHMvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15gYGAvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL14+XFxzLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9eKC17Myx9fFxcKnszLH18X3szLH0pXFxzKiQvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15cXHMqKD86Wy0qK118XFxkK1xcLilcXHMvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15cXHwuKlxcfCQvLnRlc3QobGluZS50cmltKCkpICYmIGkgKyAxIDwgbGluZXMubGVuZ3RoICYmIC9eXFx8W1xcczpdKi17Myx9Ly50ZXN0KGxpbmVzW2kgKyAxXSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBJbmxpbmUgUGFyc2VyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIFBhcnNlIGlubGluZSBNYXJrZG93biBlbGVtZW50cy5cbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgaW5saW5lIEFTVCBub2Rlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7QVNUTm9kZVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbmxpbmUodGV4dCkge1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBsZXQgcmVtYWluaW5nID0gdGV4dDtcblxuICB3aGlsZSAocmVtYWluaW5nLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gQm9sZCtJdGFsaWMgKioqdGV4dCoqKlxuICAgIGNvbnN0IGJvbGRJdGFsaWMgPSByZW1haW5pbmcubWF0Y2goL15cXCp7M30oLis/KVxcKnszfS8pO1xuICAgIGlmIChib2xkSXRhbGljKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2JvbGRJdGFsaWMnLCBjaGlsZHJlbjogcGFyc2VJbmxpbmUoYm9sZEl0YWxpY1sxXSkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoYm9sZEl0YWxpY1swXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBCb2xkICoqdGV4dCoqXG4gICAgY29uc3QgYm9sZCA9IHJlbWFpbmluZy5tYXRjaCgvXlxcKnsyfSguKz8pXFwqezJ9Lyk7XG4gICAgaWYgKGJvbGQpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnYm9sZCcsIGNoaWxkcmVuOiBwYXJzZUlubGluZShib2xkWzFdKSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShib2xkWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEl0YWxpYyAqdGV4dCpcbiAgICBjb25zdCBpdGFsaWMgPSByZW1haW5pbmcubWF0Y2goL15cXCooW14qXSs/KVxcKi8pO1xuICAgIGlmIChpdGFsaWMpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnaXRhbGljJywgY2hpbGRyZW46IHBhcnNlSW5saW5lKGl0YWxpY1sxXSkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoaXRhbGljWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFN0cmlrZXRocm91Z2ggfn50ZXh0fn5cbiAgICBjb25zdCBzdHJpa2UgPSByZW1haW5pbmcubWF0Y2goL15+figuKz8pfn4vKTtcbiAgICBpZiAoc3RyaWtlKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ3N0cmlrZXRocm91Z2gnLCB2YWx1ZTogc3RyaWtlWzFdIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKHN0cmlrZVswXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBJbmxpbmUgY29kZSBgdGV4dGBcbiAgICBjb25zdCBpbmxpbmVDb2RlID0gcmVtYWluaW5nLm1hdGNoKC9eYChbXmBdKylgLyk7XG4gICAgaWYgKGlubGluZUNvZGUpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnaW5saW5lQ29kZScsIHZhbHVlOiBpbmxpbmVDb2RlWzFdIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGlubGluZUNvZGVbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2UgIVthbHRdKHNyYylcbiAgICBjb25zdCBpbWFnZSA9IHJlbWFpbmluZy5tYXRjaCgvXiFcXFsoW15cXF1dKilcXF1cXCgoW14pXSspXFwpLyk7XG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2ltYWdlJywgcHJvcHM6IHsgYWx0OiBpbWFnZVsxXSwgc3JjOiBpbWFnZVsyXSB9IH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGltYWdlWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIExpbmsgW3RleHRdKHVybClcbiAgICBjb25zdCBsaW5rID0gcmVtYWluaW5nLm1hdGNoKC9eXFxbKFteXFxdXSspXFxdXFwoKFteKV0rKVxcKS8pO1xuICAgIGlmIChsaW5rKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2xpbmsnLCBwcm9wczogeyB1cmw6IGxpbmtbMl0gfSwgY2hpbGRyZW46IHBhcnNlSW5saW5lKGxpbmtbMV0pIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGxpbmtbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gUGxhaW4gdGV4dCAoY29uc3VtZSBvbmUgY2hhciBhdCBhIHRpbWUgdW50aWwgbmV4dCBzcGVjaWFsIGNoYXIpXG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICBjb25zdCBuZXh0U3BlY2lhbCA9IHJlbWFpbmluZy5zbGljZSgxKS5zZWFyY2goL1sqfmAhXFxbXS8pO1xuICAgICAgY29uc3QgZW5kID0gbmV4dFNwZWNpYWwgPT09IC0xID8gcmVtYWluaW5nLmxlbmd0aCA6IG5leHRTcGVjaWFsICsgMTtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlOiByZW1haW5pbmcuc2xpY2UoMCwgZW5kKSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShlbmQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub2Rlcztcbn1cbiIsICIvKipcbiAqIEFTVCBUcmFuc2Zvcm1lclxuICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbnMgdG8gdGhlIHBhcnNlZCBBU1QgYmVmb3JlIGVtaXNzaW9uLlxuICogRWFjaCB0cmFuc2Zvcm1lciBpcyBhIHZpc2l0b3IgZnVuY3Rpb24gdGhhdCBjYW4gbW9kaWZ5IG5vZGVzIGluLXBsYWNlLlxuICpcbiAqIEZvbGxvd3MgdGhlIFZpc2l0b3IgUGF0dGVybiBcdTIwMTQgbmV3IHRyYW5zZm9ybWF0aW9ucyBjYW4gYmUgYWRkZWRcbiAqIHdpdGhvdXQgbW9kaWZ5aW5nIGV4aXN0aW5nIGNvZGUgKE9wZW4tQ2xvc2VkIFByaW5jaXBsZSkuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7KG5vZGU6IEFTVE5vZGUsIHBhcmVudD86IEFTVE5vZGUpID0+IEFTVE5vZGV8bnVsbH0gVHJhbnNmb3JtVmlzaXRvclxuICovXG5cbi8qKlxuICogV2FsayBhbiBBU1QgdHJlZSBhbmQgYXBwbHkgdmlzaXRvciB0byBlYWNoIG5vZGUgKGRlcHRoLWZpcnN0KS5cbiAqIElmIHZpc2l0b3IgcmV0dXJucyBudWxsLCB0aGUgbm9kZSBpcyByZW1vdmVkLlxuICogQHBhcmFtIHtBU1ROb2RlfSBhc3RcbiAqIEBwYXJhbSB7VHJhbnNmb3JtVmlzaXRvcn0gdmlzaXRvclxuICogQHJldHVybnMge0FTVE5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxrQW5kVHJhbnNmb3JtKGFzdCwgdmlzaXRvcikge1xuICBjb25zdCByZXN1bHQgPSB2aXNpdG9yKGFzdCk7XG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcblxuICBpZiAocmVzdWx0LmNoaWxkcmVuICYmIEFycmF5LmlzQXJyYXkocmVzdWx0LmNoaWxkcmVuKSkge1xuICAgIHJlc3VsdC5jaGlsZHJlbiA9IHJlc3VsdC5jaGlsZHJlblxuICAgICAgLm1hcCgoY2hpbGQpID0+IHdhbGtBbmRUcmFuc2Zvcm0oY2hpbGQsIHZpc2l0b3IpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29tcG9zZSBtdWx0aXBsZSB2aXNpdG9ycyBpbnRvIGEgc2luZ2xlIHZpc2l0b3IuXG4gKiBWaXNpdG9ycyBhcmUgYXBwbGllZCBpbiBvcmRlci5cbiAqIEBwYXJhbSB7VHJhbnNmb3JtVmlzaXRvcltdfSB2aXNpdG9yc1xuICogQHJldHVybnMge1RyYW5zZm9ybVZpc2l0b3J9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlVmlzaXRvcnMoLi4udmlzaXRvcnMpIHtcbiAgcmV0dXJuIChub2RlLCBwYXJlbnQpID0+IHtcbiAgICBsZXQgY3VycmVudCA9IG5vZGU7XG4gICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICBjdXJyZW50ID0gdmlzaXRvcihjdXJyZW50LCBwYXJlbnQpO1xuICAgICAgaWYgKCFjdXJyZW50KSByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBCdWlsdC1pbiBUcmFuc2Zvcm1lcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbi8qKlxuICogQ29sbGFwc2UgY29uc2VjdXRpdmUgYmxhbmsgcGFyYWdyYXBocyBpbnRvIGEgc2luZ2xlIGJyZWFrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29sbGFwc2VCbGFua0xpbmVzKG5vZGUpIHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2RvY3VtZW50JyAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gW107XG4gICAgbGV0IHByZXZCbGFuayA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgaXNCbGFuayA9IGNoaWxkLnR5cGUgPT09ICdwYXJhZ3JhcGgnICYmXG4gICAgICAgIGNoaWxkLmNoaWxkcmVuPy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgY2hpbGQuY2hpbGRyZW5bMF0udHlwZSA9PT0gJ3RleHQnICYmXG4gICAgICAgIGNoaWxkLmNoaWxkcmVuWzBdLnZhbHVlPy50cmltKCkgPT09ICcnO1xuICAgICAgaWYgKGlzQmxhbmspIHtcbiAgICAgICAgaWYgKCFwcmV2QmxhbmspIGNvbGxhcHNlZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgcHJldkJsYW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxhcHNlZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgcHJldkJsYW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IC4uLm5vZGUsIGNoaWxkcmVuOiBjb2xsYXBzZWQgfTtcbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgbGlzdCBpdGVtIGRlcHRoIGJhc2VkIG9uIGFjdHVhbCBuZXN0aW5nIGxldmVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTGlzdERlcHRoKG5vZGUsIF9wYXJlbnQsIGRlcHRoID0gMCkge1xuICBpZiAobm9kZS50eXBlID09PSAnbGlzdEl0ZW0nKSB7XG4gICAgcmV0dXJuIHsgLi4ubm9kZSwgcHJvcHM6IHsgLi4ubm9kZS5wcm9wcywgcmVzb2x2ZWREZXB0aDogZGVwdGggfSB9O1xuICB9XG4gIGlmIChub2RlLnR5cGUgPT09ICdsaXN0JyAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm5vZGUsXG4gICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBub3JtYWxpemVMaXN0RGVwdGgoY2hpbGQsIG5vZGUsIGRlcHRoICsgMSkpLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG4iLCAiLyoqXG4gKiBKaXJhIFdpa2kgTWFya3VwIEVtaXR0ZXJcbiAqIENvbnZlcnRzIGFuIEFTVCBpbnRvIEppcmEgd2lraSBtYXJrdXAgc3RyaW5nLlxuICpcbiAqIEVhY2ggbm9kZSB0eXBlIGhhcyBpdHMgb3duIGVtaXQgZnVuY3Rpb24gXHUyMDE0IGZvbGxvd3MgdGhlIFN0cmF0ZWd5IFBhdHRlcm5cbiAqIHBlciBub2RlIHR5cGUuIE5ldyBub2RlIHR5cGVzIGNhbiBiZSBhZGRlZCB3aXRob3V0IG1vZGlmeWluZyBleGlzdGluZyBlbWl0dGVycy5cbiAqL1xuXG4vKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIChub2RlOiBBU1ROb2RlLCBjdHg6IEVtaXRDb250ZXh0KSA9PiBzdHJpbmc+fSAqL1xuY29uc3QgZW1pdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBSZWdpc3RlciBhbiBlbWl0dGVyIGZvciBhIG5vZGUgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBub2RlVHlwZVxuICogQHBhcmFtIHsobm9kZTogQVNUTm9kZSwgY3R4OiBFbWl0Q29udGV4dCkgPT4gc3RyaW5nfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbWl0dGVyKG5vZGVUeXBlLCBmbikge1xuICBlbWl0dGVyc1tub2RlVHlwZV0gPSBmbjtcbn1cblxuLyoqXG4gKiBFbWl0IGFuIEFTVCBub2RlIHRvIEppcmEgd2lraSBtYXJrdXAuXG4gKiBAcGFyYW0ge0FTVE5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7RW1pdENvbnRleHR9IFtjdHhdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1pdChub2RlLCBjdHggPSB7IGxpc3RTdGFjazogW10gfSkge1xuICBjb25zdCBmbiA9IGVtaXR0ZXJzW25vZGUudHlwZV07XG4gIGlmICghZm4pIHtcbiAgICAvLyBGYWxsYmFjazogZW1pdCBjaGlsZHJlbiBvciB2YWx1ZVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSByZXR1cm4gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gICAgcmV0dXJuIG5vZGUudmFsdWUgfHwgJyc7XG4gIH1cbiAgcmV0dXJuIGZuKG5vZGUsIGN0eCk7XG59XG5cbmZ1bmN0aW9uIGVtaXRDaGlsZHJlbihub2RlLCBjdHgpIHtcbiAgaWYgKCFub2RlLmNoaWxkcmVuKSByZXR1cm4gJyc7XG4gIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJycpO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgUmVnaXN0ZXIgQnVpbHQtaW4gRW1pdHRlcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbnJlZ2lzdGVyRW1pdHRlcignZG9jdW1lbnQnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJ1xcbicpO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignaGVhZGluZycsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3QgbGV2ZWwgPSBub2RlLnByb3BzPy5sZXZlbCB8fCAxO1xuICBjb25zdCBjb250ZW50ID0gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gIHJldHVybiBgaCR7bGV2ZWx9LiAke2NvbnRlbnR9XFxuYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ3BhcmFncmFwaCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGVtaXRDaGlsZHJlbihub2RlLCBjdHgpICsgJ1xcbic7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdocicsICgpID0+ICctLS0tXFxuJyk7XG5cbnJlZ2lzdGVyRW1pdHRlcignY29kZUJsb2NrJywgKG5vZGUpID0+IHtcbiAgY29uc3QgbGFuZyA9IG5vZGUucHJvcHM/Lmxhbmc7XG4gIGNvbnN0IHRhZyA9IGxhbmcgPyBge2NvZGU6JHtsYW5nfX1gIDogJ3tjb2RlfSc7XG4gIHJldHVybiBgJHt0YWd9XFxuJHtub2RlLnZhbHVlfVxcbntjb2RlfVxcbmA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdibG9ja3F1b3RlJywgKG5vZGUsIGN0eCkgPT4ge1xuICBjb25zdCBpbm5lciA9IG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gZW1pdChjaGlsZCwgY3R4KSkuam9pbignXFxuJykudHJpbSgpO1xuICBjb25zdCBsaW5lcyA9IGlubmVyLnNwbGl0KCdcXG4nKTtcbiAgaWYgKGxpbmVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBgYnEuICR7aW5uZXJ9XFxuYDtcbiAgfVxuICByZXR1cm4gYHtxdW90ZX1cXG4ke2lubmVyfVxcbntxdW90ZX1cXG5gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcigndGFibGUnLCAobm9kZSwgY3R4KSA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBub2RlLnByb3BzPy5oZWFkZXJzIHx8IFtdO1xuICBjb25zdCBoZWFkZXJSb3cgPSBgfHwke2hlYWRlcnMuam9pbignfHwnKX18fGA7XG4gIGNvbnN0IGJvZHlSb3dzID0gbm9kZS5jaGlsZHJlblxuICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgY29uc3QgY2VsbHMgPSByb3cucHJvcHM/LmNlbGxzIHx8IFtdO1xuICAgICAgcmV0dXJuIGB8JHtjZWxscy5qb2luKCd8Jyl9fGA7XG4gICAgfSlcbiAgICAuam9pbignXFxuJyk7XG4gIHJldHVybiBgJHtoZWFkZXJSb3d9XFxuJHtib2R5Um93c31cXG5gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignbGlzdCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gZW1pdChjaGlsZCwgY3R4KSkuam9pbignJyk7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdsaXN0SXRlbScsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3Qgb3JkZXJlZCA9IG5vZGUucHJvcHM/Lm9yZGVyZWQ7XG4gIGNvbnN0IGRlcHRoID0gKG5vZGUucHJvcHM/LnJlc29sdmVkRGVwdGggfHwgbm9kZS5wcm9wcz8uZGVwdGggfHwgMCkgKyAxO1xuICBjb25zdCBtYXJrZXIgPSBvcmRlcmVkID8gJyMnIDogJyonO1xuICBjb25zdCBwcmVmaXggPSBtYXJrZXIucmVwZWF0KGRlcHRoKTtcblxuICAvLyBTZXBhcmF0ZSBpbmxpbmUgY2hpbGRyZW4gZnJvbSBuZXN0ZWQgYmxvY2sgY2hpbGRyZW5cbiAgY29uc3QgaW5saW5lTm9kZXMgPSBbXTtcbiAgY29uc3QgYmxvY2tOb2RlcyA9IFtdO1xuICBmb3IgKGNvbnN0IGNoaWxkIG9mIChub2RlLmNoaWxkcmVuIHx8IFtdKSkge1xuICAgIGlmIChjaGlsZC50eXBlID09PSAnbGlzdCcpIHtcbiAgICAgIGJsb2NrTm9kZXMucHVzaChjaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlubGluZU5vZGVzLnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnQgPSBpbmxpbmVOb2Rlcy5tYXAoKGMpID0+IGVtaXQoYywgY3R4KSkuam9pbignJyk7XG4gIGxldCByZXN1bHQgPSBgJHtwcmVmaXh9ICR7Y29udGVudH1cXG5gO1xuXG4gIC8vIEVtaXQgbmVzdGVkIGxpc3RzXG4gIGZvciAoY29uc3QgYmxvY2sgb2YgYmxvY2tOb2Rlcykge1xuICAgIHJlc3VsdCArPSBlbWl0KGJsb2NrLCBjdHgpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgSW5saW5lIEVtaXR0ZXJzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG5yZWdpc3RlckVtaXR0ZXIoJ3RleHQnLCAobm9kZSkgPT4gbm9kZS52YWx1ZSB8fCAnJyk7XG5cbnJlZ2lzdGVyRW1pdHRlcignYm9sZCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGAqJHtlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KX0qYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2l0YWxpYycsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGBfJHtlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KX1fYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2JvbGRJdGFsaWMnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBgXyoke2VtaXRDaGlsZHJlbihub2RlLCBjdHgpfSpfYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ3N0cmlrZXRocm91Z2gnLCAobm9kZSkgPT4ge1xuICByZXR1cm4gYC0ke25vZGUudmFsdWV9LWA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdpbmxpbmVDb2RlJywgKG5vZGUpID0+IHtcbiAgcmV0dXJuIGB7eyR7bm9kZS52YWx1ZX19fWA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdsaW5rJywgKG5vZGUsIGN0eCkgPT4ge1xuICBjb25zdCB0ZXh0ID0gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gIGNvbnN0IHVybCA9IG5vZGUucHJvcHM/LnVybCB8fCAnJztcbiAgcmV0dXJuIGBbJHt0ZXh0fXwke3VybH1dYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2ltYWdlJywgKG5vZGUpID0+IHtcbiAgY29uc3Qgc3JjID0gbm9kZS5wcm9wcz8uc3JjIHx8ICcnO1xuICByZXR1cm4gYCEke3NyY30hYDtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQWFBLGVBQVMsa0JBQWtCLFFBQVEsT0FBTztBQUN4QyxpQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxjQUFJLGFBQWEsTUFBTSxDQUFDO0FBQ3hCLHFCQUFXLGFBQWEsV0FBVyxjQUFjO0FBQ2pELHFCQUFXLGVBQWU7QUFDMUIsY0FBSSxXQUFXLFdBQVksWUFBVyxXQUFXO0FBQ2pELGlCQUFPLGVBQWUsUUFBUSxlQUFlLFdBQVcsR0FBRyxHQUFHLFVBQVU7QUFBQSxRQUMxRTtBQUFBLE1BQ0Y7QUFD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LE9BQU87QUFHMUMsV0FBSyxHQUFHLFFBQVEsZ0JBQWdCLENBQUMsUUFBUUMsVUFBUztBQUNoRCxlQUFPLEtBQUtBLE1BQUssS0FBSyxDQUFDO0FBQUEsTUFDekIsQ0FBQztBQUVELGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQSxJQUFJLE1BQU07QUFDUixhQUFPLGVBQUFEO0FBQUEsSUFDVDtBQUFBO0FBQUEsSUFHQSxhQUFhLE1BQU07QUFFakIsYUFBTyxLQUFLLFFBQVEsd0JBQXdCLE9BQU87QUFHbkQsYUFBTyxLQUFLLFFBQVEsV0FBVyxNQUFNO0FBR3JDLGFBQU8sS0FBSyxRQUFRLGFBQWEsRUFBRTtBQUVuQyxhQUFPLEtBQUssS0FBSztBQUFBLElBQ25CO0FBQUEsRUFDRjs7O0FkckVBLE1BQU0sbUJBQW1CLElBQUksaUJBQWlCO0FBQzlDLE1BQU0sZUFBZSxJQUFJLGFBQWE7QUFZL0IsV0FBUyxlQUFlLE1BQU0sVUFBVSxDQUFDLEdBQUc7QUFDakQsV0FBTyxpQkFBaUIsUUFBUSxNQUFNLE9BQU87QUFBQSxFQUMvQztBQU9PLFdBQVMsZUFBZSxZQUFZO0FBQ3pDLFdBQU8sYUFBYSxXQUFXLFVBQVU7QUFBQSxFQUMzQztBQU9PLFdBQVMsZUFBZSxVQUFVO0FBQ3ZDLFdBQU8sYUFBYSxhQUFhLFFBQVE7QUFBQSxFQUMzQztBQUtPLE1BQU1FLE9BQU0sYUFBYTsiLAogICJuYW1lcyI6IFsiZ2V0RXNjYXBlUmVwbGFjZW1lbnQiLCAibm9vcFRlc3QiLCAibGV4ZXIiLCAiVG9rZW5pemVyIiwgIm9wdGlvbnMiLCAibGlzdCIsICJsaW5rIiwgIm1hbmdsZSIsICJzbWFydHlwYW50cyIsICJMZXhlciIsICJydWxlcyIsICJuZXh0IiwgImlubGluZSIsICJSZW5kZXJlciIsICJUZXh0UmVuZGVyZXIiLCAiU2x1Z2dlciIsICJzbHVnIiwgIlBhcnNlciIsICJwYXJzZSIsICJwYXJzZXIiLCAicGFyc2VJbmxpbmUiLCAiY2VsbCIsICJIb29rcyIsICJkb25lIiwgInNyYyIsICJ0b2tlbnMiLCAiaHRtbCIsICJhcmdzIiwgIl9sb29wIiwgInByb3AiLCAiX2xvb3AyIiwgIl9sb29wMyIsICJyZXQiLCAiX2xvb3A0IiwgIkoyTSIsICJKMk0iLCAicnVsZXMiLCAiaXNCbG9jayIsICJpc1ZvaWQiLCAibm9kZSIsICJuZXh0IiwgInJvb3QiLCAicnVsZXMiLCAiY2VsbCIsICJjbGVhbkNlbGxDb250ZW50IiwgImNlbGwiLCAicm9vdCIsICJpc0JsYW5rIiwgIkoyTSIsICJjZWxsIiwgIkoyTSJdCn0K
