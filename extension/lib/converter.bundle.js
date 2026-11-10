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
      join(output, replacement);
      return output;
    }, []);
  }
  function postProcess(output) {
    var self = this;
    this.rules.forEach(function(rule) {
      if (typeof rule.append === "function") {
        join(output, rule.append(self.options));
      }
    });
    return output.join("").replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
  }
  function replacementForNode(node) {
    var rule = this.rules.forNode(node);
    var content = process.call(this, node).join("");
    var whitespace = node.flankingWhitespace;
    if (whitespace.leading || whitespace.trailing) content = content.trim();
    return whitespace.leading + rule.replacement(content, node, this.options) + whitespace.trailing;
  }
  function join(output, replacement) {
    var tail = output.pop() || "";
    var s1 = trimTrailingNewlines(tail);
    var s2 = trimLeadingNewlines(replacement);
    var nls = Math.max(tail.length - s1.length, replacement.length - s2.length);
    var separator = "\n\n".substring(0, nls);
    if (s1) output.push(s1);
    if (separator) output.push(separator);
    if (s2) output.push(s2);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmNqcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvamlyYTJtZC9pbmRleC5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90dXJuZG93bi9saWIvdHVybmRvd24uYnJvd3Nlci5lcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHRydXRvL3R1cm5kb3duLXBsdWdpbi1nZm0vc3JjL2hpZ2hsaWdodGVkLWNvZGUtYmxvY2suanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0B0cnV0by90dXJuZG93bi1wbHVnaW4tZ2ZtL3NyYy9zdHJpa2V0aHJvdWdoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFibGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFzay1saXN0LWl0ZW1zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvaW5kZXguanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtcGFuZWxzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLWNvZGUuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtdGFibGVzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLW1lbnRpb25zLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9qaXJhLWlzc3Vlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BsdWdpbnMvYmFzZTY0LWltYWdlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3N0cmF0ZWdpZXMvbWFya2Rvd24uanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9zdHJhdGVnaWVzL2ppcmEuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS9wYXJzZXIuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS90cmFuc2Zvcm1lci5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BpcGVsaW5lL2VtaXR0ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogbWFya2VkIHY0LjMuMCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAyMywgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZWRqcy9tYXJrZWRcbiAqL1xuXG4vKipcbiAqIERPIE5PVCBFRElUIFRISVMgRklMRVxuICogVGhlIGNvZGUgaW4gdGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBmcm9tIGZpbGVzIGluIC4vc3JjL1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7XG4gIHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAoaXQpIHJldHVybiAoaXQgPSBpdC5jYWxsKG8pKS5uZXh0LmJpbmQoaXQpO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKGl0KSBvID0gaXQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICB9O1xuICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdHMoKSB7XG4gIHJldHVybiB7XG4gICAgYXN5bmM6IGZhbHNlLFxuICAgIGJhc2VVcmw6IG51bGwsXG4gICAgYnJlYWtzOiBmYWxzZSxcbiAgICBleHRlbnNpb25zOiBudWxsLFxuICAgIGdmbTogdHJ1ZSxcbiAgICBoZWFkZXJJZHM6IHRydWUsXG4gICAgaGVhZGVyUHJlZml4OiAnJyxcbiAgICBoaWdobGlnaHQ6IG51bGwsXG4gICAgaG9va3M6IG51bGwsXG4gICAgbGFuZ1ByZWZpeDogJ2xhbmd1YWdlLScsXG4gICAgbWFuZ2xlOiB0cnVlLFxuICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICByZW5kZXJlcjogbnVsbCxcbiAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgc2FuaXRpemVyOiBudWxsLFxuICAgIHNpbGVudDogZmFsc2UsXG4gICAgc21hcnR5cGFudHM6IGZhbHNlLFxuICAgIHRva2VuaXplcjogbnVsbCxcbiAgICB3YWxrVG9rZW5zOiBudWxsLFxuICAgIHhodG1sOiBmYWxzZVxuICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0cyA9IGdldERlZmF1bHRzKCk7XG5mdW5jdGlvbiBjaGFuZ2VEZWZhdWx0cyhuZXdEZWZhdWx0cykge1xuICBleHBvcnRzLmRlZmF1bHRzID0gbmV3RGVmYXVsdHM7XG59XG5cbi8qKlxuICogSGVscGVyc1xuICovXG52YXIgZXNjYXBlVGVzdCA9IC9bJjw+XCInXS87XG52YXIgZXNjYXBlUmVwbGFjZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdC5zb3VyY2UsICdnJyk7XG52YXIgZXNjYXBlVGVzdE5vRW5jb2RlID0gL1s8PlwiJ118Jig/ISgjXFxkezEsN318I1tYeF1bYS1mQS1GMC05XXsxLDZ9fFxcdyspOykvO1xudmFyIGVzY2FwZVJlcGxhY2VOb0VuY29kZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdE5vRW5jb2RlLnNvdXJjZSwgJ2cnKTtcbnZhciBlc2NhcGVSZXBsYWNlbWVudHMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG52YXIgZ2V0RXNjYXBlUmVwbGFjZW1lbnQgPSBmdW5jdGlvbiBnZXRFc2NhcGVSZXBsYWNlbWVudChjaCkge1xuICByZXR1cm4gZXNjYXBlUmVwbGFjZW1lbnRzW2NoXTtcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIGlmIChlbmNvZGUpIHtcbiAgICBpZiAoZXNjYXBlVGVzdC50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2UsIGdldEVzY2FwZVJlcGxhY2VtZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGVzY2FwZVRlc3ROb0VuY29kZS50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2VOb0VuY29kZSwgZ2V0RXNjYXBlUmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaHRtbDtcbn1cbnZhciB1bmVzY2FwZVRlc3QgPSAvJigjKD86XFxkKyl8KD86I3hbMC05QS1GYS1mXSspfCg/OlxcdyspKTs/L2lnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgLy8gZXhwbGljaXRseSBtYXRjaCBkZWNpbWFsLCBoZXgsIGFuZCBuYW1lZCBIVE1MIGVudGl0aWVzXG4gIHJldHVybiBodG1sLnJlcGxhY2UodW5lc2NhcGVUZXN0LCBmdW5jdGlvbiAoXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKSA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cbnZhciBjYXJldCA9IC8oXnxbXlxcW10pXFxeL2c7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmcgfCBSZWdFeHB9IHJlZ2V4XG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0XG4gKi9cbmZ1bmN0aW9uIGVkaXQocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHR5cGVvZiByZWdleCA9PT0gJ3N0cmluZycgPyByZWdleCA6IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICB2YXIgb2JqID0ge1xuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UobmFtZSwgdmFsKSB7XG4gICAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKGNhcmV0LCAnJDEnKTtcbiAgICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIGdldFJlZ2V4OiBmdW5jdGlvbiBnZXRSZWdleCgpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIG9iajtcbn1cbnZhciBub25Xb3JkQW5kQ29sb25UZXN0ID0gL1teXFx3Ol0vZztcbnZhciBvcmlnaW5JbmRlcGVuZGVudFVybCA9IC9eJHxeW2Etel1bYS16MC05Ky4tXSo6fF5bPyNdL2k7XG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFufSBzYW5pdGl6ZVxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXJsKHNhbml0aXplLCBiYXNlLCBocmVmKSB7XG4gIGlmIChzYW5pdGl6ZSkge1xuICAgIHZhciBwcm90O1xuICAgIHRyeSB7XG4gICAgICBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKS5yZXBsYWNlKG5vbldvcmRBbmRDb2xvblRlc3QsICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCdkYXRhOicpID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYgKGJhc2UgJiYgIW9yaWdpbkluZGVwZW5kZW50VXJsLnRlc3QoaHJlZikpIHtcbiAgICBocmVmID0gcmVzb2x2ZVVybChiYXNlLCBocmVmKTtcbiAgfVxuICB0cnkge1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJTI1L2csICclJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cbnZhciBiYXNlVXJscyA9IHt9O1xudmFyIGp1c3REb21haW4gPSAvXlteOl0rOlxcLypbXi9dKiQvO1xudmFyIHByb3RvY29sID0gL14oW146XSs6KVtcXHNcXFNdKiQvO1xudmFyIGRvbWFpbiA9IC9eKFteOl0rOlxcLypbXi9dKilbXFxzXFxTXSokLztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVVybChiYXNlLCBocmVmKSB7XG4gIGlmICghYmFzZVVybHNbJyAnICsgYmFzZV0pIHtcbiAgICAvLyB3ZSBjYW4gaWdub3JlIGV2ZXJ5dGhpbmcgaW4gYmFzZSBhZnRlciB0aGUgbGFzdCBzbGFzaCBvZiBpdHMgcGF0aCBjb21wb25lbnQsXG4gICAgLy8gYnV0IHdlIG1pZ2h0IG5lZWQgdG8gYWRkIF90aGF0X1xuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tM1xuICAgIGlmIChqdXN0RG9tYWluLnRlc3QoYmFzZSkpIHtcbiAgICAgIGJhc2VVcmxzWycgJyArIGJhc2VdID0gYmFzZSArICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZVVybHNbJyAnICsgYmFzZV0gPSBydHJpbShiYXNlLCAnLycsIHRydWUpO1xuICAgIH1cbiAgfVxuICBiYXNlID0gYmFzZVVybHNbJyAnICsgYmFzZV07XG4gIHZhciByZWxhdGl2ZUJhc2UgPSBiYXNlLmluZGV4T2YoJzonKSA9PT0gLTE7XG4gIGlmIChocmVmLnN1YnN0cmluZygwLCAyKSA9PT0gJy8vJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKHByb3RvY29sLCAnJDEnKSArIGhyZWY7XG4gIH0gZWxzZSBpZiAoaHJlZi5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKGRvbWFpbiwgJyQxJykgKyBocmVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlICsgaHJlZjtcbiAgfVxufVxudmFyIG5vb3BUZXN0ID0ge1xuICBleGVjOiBmdW5jdGlvbiBub29wVGVzdCgpIHt9XG59O1xuZnVuY3Rpb24gc3BsaXRDZWxscyh0YWJsZVJvdywgY291bnQpIHtcbiAgLy8gZW5zdXJlIHRoYXQgZXZlcnkgY2VsbC1kZWxpbWl0aW5nIHBpcGUgaGFzIGEgc3BhY2VcbiAgLy8gYmVmb3JlIGl0IHRvIGRpc3Rpbmd1aXNoIGl0IGZyb20gYW4gZXNjYXBlZCBwaXBlXG4gIHZhciByb3cgPSB0YWJsZVJvdy5yZXBsYWNlKC9cXHwvZywgZnVuY3Rpb24gKG1hdGNoLCBvZmZzZXQsIHN0cikge1xuICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSxcbiAgICAgICAgY3VyciA9IG9mZnNldDtcbiAgICAgIHdoaWxlICgtLWN1cnIgPj0gMCAmJiBzdHJbY3Vycl0gPT09ICdcXFxcJykge1xuICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICAvLyBvZGQgbnVtYmVyIG9mIHNsYXNoZXMgbWVhbnMgfCBpcyBlc2NhcGVkXG4gICAgICAgIC8vIHNvIHdlIGxlYXZlIGl0IGFsb25lXG4gICAgICAgIHJldHVybiAnfCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgc3BhY2UgYmVmb3JlIHVuZXNjYXBlZCB8XG4gICAgICAgIHJldHVybiAnIHwnO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGNlbGxzID0gcm93LnNwbGl0KC8gXFx8Lyk7XG4gIHZhciBpID0gMDtcblxuICAvLyBGaXJzdC9sYXN0IGNlbGwgaW4gYSByb3cgY2Fubm90IGJlIGVtcHR5IGlmIGl0IGhhcyBubyBsZWFkaW5nL3RyYWlsaW5nIHBpcGVcbiAgaWYgKCFjZWxsc1swXS50cmltKCkpIHtcbiAgICBjZWxscy5zaGlmdCgpO1xuICB9XG4gIGlmIChjZWxscy5sZW5ndGggPiAwICYmICFjZWxsc1tjZWxscy5sZW5ndGggLSAxXS50cmltKCkpIHtcbiAgICBjZWxscy5wb3AoKTtcbiAgfVxuICBpZiAoY2VsbHMubGVuZ3RoID4gY291bnQpIHtcbiAgICBjZWxscy5zcGxpY2UoY291bnQpO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjZWxscy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgY2VsbHMucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGZvciAoOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBsZWFkaW5nIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgaXMgaWdub3JlZCBwZXIgdGhlIGdmbSBzcGVjXG4gICAgY2VsbHNbaV0gPSBjZWxsc1tpXS50cmltKCkucmVwbGFjZSgvXFxcXFxcfC9nLCAnfCcpO1xuICB9XG4gIHJldHVybiBjZWxscztcbn1cblxuLyoqXG4gKiBSZW1vdmUgdHJhaWxpbmcgJ2Mncy4gRXF1aXZhbGVudCB0byBzdHIucmVwbGFjZSgvYyokLywgJycpLlxuICogL2MqJC8gaXMgdnVsbmVyYWJsZSB0byBSRURPUy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge3N0cmluZ30gY1xuICogQHBhcmFtIHtib29sZWFufSBpbnZlcnQgUmVtb3ZlIHN1ZmZpeCBvZiBub24tYyBjaGFycyBpbnN0ZWFkLiBEZWZhdWx0IGZhbHNleS5cbiAqL1xuZnVuY3Rpb24gcnRyaW0oc3RyLCBjLCBpbnZlcnQpIHtcbiAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICBpZiAobCA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8vIExlbmd0aCBvZiBzdWZmaXggbWF0Y2hpbmcgdGhlIGludmVydCBjb25kaXRpb24uXG4gIHZhciBzdWZmTGVuID0gMDtcblxuICAvLyBTdGVwIGxlZnQgdW50aWwgd2UgZmFpbCB0byBtYXRjaCB0aGUgaW52ZXJ0IGNvbmRpdGlvbi5cbiAgd2hpbGUgKHN1ZmZMZW4gPCBsKSB7XG4gICAgdmFyIGN1cnJDaGFyID0gc3RyLmNoYXJBdChsIC0gc3VmZkxlbiAtIDEpO1xuICAgIGlmIChjdXJyQ2hhciA9PT0gYyAmJiAhaW52ZXJ0KSB7XG4gICAgICBzdWZmTGVuKys7XG4gICAgfSBlbHNlIGlmIChjdXJyQ2hhciAhPT0gYyAmJiBpbnZlcnQpIHtcbiAgICAgIHN1ZmZMZW4rKztcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgbCAtIHN1ZmZMZW4pO1xufVxuZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0KHN0ciwgYikge1xuICBpZiAoc3RyLmluZGV4T2YoYlsxXSkgPT09IC0xKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgdmFyIGxldmVsID0gMCxcbiAgICBpID0gMDtcbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxcXCcpIHtcbiAgICAgIGkrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlswXSkge1xuICAgICAgbGV2ZWwrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlsxXSkge1xuICAgICAgbGV2ZWwtLTtcbiAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbihvcHQpIHtcbiAgaWYgKG9wdCAmJiBvcHQuc2FuaXRpemUgJiYgIW9wdC5zaWxlbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ21hcmtlZCgpOiBzYW5pdGl6ZSBhbmQgc2FuaXRpemVyIHBhcmFtZXRlcnMgYXJlIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAwLjcuMCwgc2hvdWxkIG5vdCBiZSB1c2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS4gUmVhZCBtb3JlIGhlcmU6IGh0dHBzOi8vbWFya2VkLmpzLm9yZy8jL1VTSU5HX0FEVkFOQ0VELm1kI29wdGlvbnMnKTtcbiAgfVxufVxuXG4vLyBjb3BpZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTQ1MDExMy84MDY3Nzdcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICovXG5mdW5jdGlvbiByZXBlYXRTdHJpbmcocGF0dGVybiwgY291bnQpIHtcbiAgaWYgKGNvdW50IDwgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHdoaWxlIChjb3VudCA+IDEpIHtcbiAgICBpZiAoY291bnQgJiAxKSB7XG4gICAgICByZXN1bHQgKz0gcGF0dGVybjtcbiAgICB9XG4gICAgY291bnQgPj49IDE7XG4gICAgcGF0dGVybiArPSBwYXR0ZXJuO1xuICB9XG4gIHJldHVybiByZXN1bHQgKyBwYXR0ZXJuO1xufVxuXG5mdW5jdGlvbiBvdXRwdXRMaW5rKGNhcCwgbGluaywgcmF3LCBsZXhlcikge1xuICB2YXIgaHJlZiA9IGxpbmsuaHJlZjtcbiAgdmFyIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG4gIHZhciB0ZXh0ID0gY2FwWzFdLnJlcGxhY2UoL1xcXFwoW1xcW1xcXV0pL2csICckMScpO1xuICBpZiAoY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnKSB7XG4gICAgbGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICB2YXIgdG9rZW4gPSB7XG4gICAgICB0eXBlOiAnbGluaycsXG4gICAgICByYXc6IHJhdyxcbiAgICAgIGhyZWY6IGhyZWYsXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgdG9rZW5zOiBsZXhlci5pbmxpbmVUb2tlbnModGV4dClcbiAgICB9O1xuICAgIGxleGVyLnN0YXRlLmluTGluayA9IGZhbHNlO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbWFnZScsXG4gICAgcmF3OiByYXcsXG4gICAgaHJlZjogaHJlZixcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgdGV4dDogZXNjYXBlKHRleHQpXG4gIH07XG59XG5mdW5jdGlvbiBpbmRlbnRDb2RlQ29tcGVuc2F0aW9uKHJhdywgdGV4dCkge1xuICB2YXIgbWF0Y2hJbmRlbnRUb0NvZGUgPSByYXcubWF0Y2goL14oXFxzKykoPzpgYGApLyk7XG4gIGlmIChtYXRjaEluZGVudFRvQ29kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIHZhciBpbmRlbnRUb0NvZGUgPSBtYXRjaEluZGVudFRvQ29kZVsxXTtcbiAgcmV0dXJuIHRleHQuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBtYXRjaEluZGVudEluTm9kZSA9IG5vZGUubWF0Y2goL15cXHMrLyk7XG4gICAgaWYgKG1hdGNoSW5kZW50SW5Ob2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdmFyIGluZGVudEluTm9kZSA9IG1hdGNoSW5kZW50SW5Ob2RlWzBdO1xuICAgIGlmIChpbmRlbnRJbk5vZGUubGVuZ3RoID49IGluZGVudFRvQ29kZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBub2RlLnNsaWNlKGluZGVudFRvQ29kZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSkuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogVG9rZW5pemVyXG4gKi9cbnZhciBUb2tlbml6ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgZXhwb3J0cy5kZWZhdWx0cztcbiAgfVxuICB2YXIgX3Byb3RvID0gVG9rZW5pemVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNwYWNlID0gZnVuY3Rpb24gc3BhY2Uoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2submV3bGluZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCAmJiBjYXBbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3NwYWNlJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uY29kZSA9IGZ1bmN0aW9uIGNvZGUoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suY29kZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQgPSBjYXBbMF0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgY29kZUJsb2NrU3R5bGU6ICdpbmRlbnRlZCcsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWMgPyBydHJpbSh0ZXh0LCAnXFxuJykgOiB0ZXh0XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmZlbmNlcyA9IGZ1bmN0aW9uIGZlbmNlcyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5mZW5jZXMuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciByYXcgPSBjYXBbMF07XG4gICAgICB2YXIgdGV4dCA9IGluZGVudENvZGVDb21wZW5zYXRpb24ocmF3LCBjYXBbM10gfHwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgbGFuZzogY2FwWzJdID8gY2FwWzJdLnRyaW0oKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5oZWFkaW5nID0gZnVuY3Rpb24gaGVhZGluZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5oZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGV4dCA9IGNhcFsyXS50cmltKCk7XG5cbiAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyAjc1xuICAgICAgaWYgKC8jJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICB2YXIgdHJpbW1lZCA9IHJ0cmltKHRleHQsICcjJyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRyaW1tZWQgfHwgLyAkLy50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgLy8gQ29tbW9uTWFyayByZXF1aXJlcyBzcGFjZSBiZWZvcmUgdHJhaWxpbmcgI3NcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lKHRleHQpXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmhyID0gZnVuY3Rpb24gaHIoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suaHIuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdocicsXG4gICAgICAgIHJhdzogY2FwWzBdXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmJsb2NrcXVvdGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzBdLnJlcGxhY2UoL14gKj5bIFxcdF0/L2dtLCAnJyk7XG4gICAgICB2YXIgdG9wID0gdGhpcy5sZXhlci5zdGF0ZS50b3A7XG4gICAgICB0aGlzLmxleGVyLnN0YXRlLnRvcCA9IHRydWU7XG4gICAgICB2YXIgdG9rZW5zID0gdGhpcy5sZXhlci5ibG9ja1Rva2Vucyh0ZXh0KTtcbiAgICAgIHRoaXMubGV4ZXIuc3RhdGUudG9wID0gdG9wO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdG9rZW5zOiB0b2tlbnMsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3Qoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2subGlzdC5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHJhdywgaXN0YXNrLCBpc2NoZWNrZWQsIGluZGVudCwgaSwgYmxhbmtMaW5lLCBlbmRzV2l0aEJsYW5rTGluZSwgbGluZSwgbmV4dExpbmUsIHJhd0xpbmUsIGl0ZW1Db250ZW50cywgZW5kRWFybHk7XG4gICAgICB2YXIgYnVsbCA9IGNhcFsxXS50cmltKCk7XG4gICAgICB2YXIgaXNvcmRlcmVkID0gYnVsbC5sZW5ndGggPiAxO1xuICAgICAgdmFyIGxpc3QgPSB7XG4gICAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgICAgcmF3OiAnJyxcbiAgICAgICAgb3JkZXJlZDogaXNvcmRlcmVkLFxuICAgICAgICBzdGFydDogaXNvcmRlcmVkID8gK2J1bGwuc2xpY2UoMCwgLTEpIDogJycsXG4gICAgICAgIGxvb3NlOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgICB9O1xuICAgICAgYnVsbCA9IGlzb3JkZXJlZCA/IFwiXFxcXGR7MSw5fVxcXFxcIiArIGJ1bGwuc2xpY2UoLTEpIDogXCJcXFxcXCIgKyBidWxsO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICBidWxsID0gaXNvcmRlcmVkID8gYnVsbCA6ICdbKistXSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBuZXh0IGxpc3QgaXRlbVxuICAgICAgdmFyIGl0ZW1SZWdleCA9IG5ldyBSZWdFeHAoXCJeKCB7MCwzfVwiICsgYnVsbCArIFwiKSgoPzpbXFx0IF1bXlxcXFxuXSopPyg/OlxcXFxufCQpKVwiKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBidWxsZXQgcG9pbnQgY2FuIHN0YXJ0IGEgbmV3IExpc3QgSXRlbVxuICAgICAgd2hpbGUgKHNyYykge1xuICAgICAgICBlbmRFYXJseSA9IGZhbHNlO1xuICAgICAgICBpZiAoIShjYXAgPSBpdGVtUmVnZXguZXhlYyhzcmMpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJ1bGVzLmJsb2NrLmhyLnRlc3Qoc3JjKSkge1xuICAgICAgICAgIC8vIEVuZCBsaXN0IGlmIGJ1bGxldCB3YXMgYWN0dWFsbHkgSFIgKHBvc3NpYmx5IG1vdmUgaW50byBpdGVtUmVnZXg/KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJhdyA9IGNhcFswXTtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXcubGVuZ3RoKTtcbiAgICAgICAgbGluZSA9IGNhcFsyXS5zcGxpdCgnXFxuJywgMSlbMF0ucmVwbGFjZSgvXlxcdCsvLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiAnICcucmVwZWF0KDMgKiB0Lmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXh0TGluZSA9IHNyYy5zcGxpdCgnXFxuJywgMSlbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICBpbmRlbnQgPSAyO1xuICAgICAgICAgIGl0ZW1Db250ZW50cyA9IGxpbmUudHJpbUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRlbnQgPSBjYXBbMl0uc2VhcmNoKC9bXiBdLyk7IC8vIEZpbmQgZmlyc3Qgbm9uLXNwYWNlIGNoYXJcbiAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgPiA0ID8gMSA6IGluZGVudDsgLy8gVHJlYXQgaW5kZW50ZWQgY29kZSBibG9ja3MgKD4gNCBzcGFjZXMpIGFzIGhhdmluZyBvbmx5IDEgaW5kZW50XG4gICAgICAgICAgaXRlbUNvbnRlbnRzID0gbGluZS5zbGljZShpbmRlbnQpO1xuICAgICAgICAgIGluZGVudCArPSBjYXBbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJsYW5rTGluZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWxpbmUgJiYgL14gKiQvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgLy8gSXRlbXMgYmVnaW4gd2l0aCBhdCBtb3N0IG9uZSBibGFuayBsaW5lXG4gICAgICAgICAgcmF3ICs9IG5leHRMaW5lICsgJ1xcbic7XG4gICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhuZXh0TGluZS5sZW5ndGggKyAxKTtcbiAgICAgICAgICBlbmRFYXJseSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbmRFYXJseSkge1xuICAgICAgICAgIHZhciBuZXh0QnVsbGV0UmVnZXggPSBuZXcgUmVnRXhwKFwiXiB7MCxcIiArIE1hdGgubWluKDMsIGluZGVudCAtIDEpICsgXCJ9KD86WyorLV18XFxcXGR7MSw5fVsuKV0pKCg/OlsgXFx0XVteXFxcXG5dKik/KD86XFxcXG58JCkpXCIpO1xuICAgICAgICAgIHZhciBoclJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSgoPzotICopezMsfXwoPzpfICopezMsfXwoPzpcXFxcKiAqKXszLH0pKD86XFxcXG4rfCQpXCIpO1xuICAgICAgICAgIHZhciBmZW5jZXNCZWdpblJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSg/OmBgYHx+fn4pXCIpO1xuICAgICAgICAgIHZhciBoZWFkaW5nQmVnaW5SZWdleCA9IG5ldyBSZWdFeHAoXCJeIHswLFwiICsgTWF0aC5taW4oMywgaW5kZW50IC0gMSkgKyBcIn0jXCIpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgZm9sbG93aW5nIGxpbmVzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBMaXN0IEl0ZW1cbiAgICAgICAgICB3aGlsZSAoc3JjKSB7XG4gICAgICAgICAgICByYXdMaW5lID0gc3JjLnNwbGl0KCdcXG4nLCAxKVswXTtcbiAgICAgICAgICAgIG5leHRMaW5lID0gcmF3TGluZTtcblxuICAgICAgICAgICAgLy8gUmUtYWxpZ24gdG8gZm9sbG93IGNvbW1vbm1hcmsgbmVzdGluZyBydWxlc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAgICAgICBuZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL14gezEsNH0oPz0oIHs0fSkqW14gXSkvZywgJyAgJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgY29kZSBmZW5jZXNcbiAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbmQgbGlzdCBpdGVtIGlmIGZvdW5kIHN0YXJ0IG9mIG5ldyBoZWFkaW5nXG4gICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgc3RhcnQgb2YgbmV3IGJ1bGxldFxuICAgICAgICAgICAgaWYgKG5leHRCdWxsZXRSZWdleC50ZXN0KG5leHRMaW5lKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSG9yaXpvbnRhbCBydWxlIGZvdW5kXG4gICAgICAgICAgICBpZiAoaHJSZWdleC50ZXN0KHNyYykpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dExpbmUuc2VhcmNoKC9bXiBdLykgPj0gaW5kZW50IHx8ICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gRGVkZW50IGlmIHBvc3NpYmxlXG4gICAgICAgICAgICAgIGl0ZW1Db250ZW50cyArPSAnXFxuJyArIG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBub3QgZW5vdWdoIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgIGlmIChibGFua0xpbmUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIHBhcmFncmFwaCBjb250aW51YXRpb24gdW5sZXNzIGxhc3QgbGluZSB3YXMgYSBkaWZmZXJlbnQgYmxvY2sgbGV2ZWwgZWxlbWVudFxuICAgICAgICAgICAgICBpZiAobGluZS5zZWFyY2goL1teIF0vKSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gaW5kZW50ZWQgY29kZSBibG9ja1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChoclJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpdGVtQ29udGVudHMgKz0gJ1xcbicgKyBuZXh0TGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmxhbmtMaW5lICYmICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBsaW5lIGlzIGJsYW5rXG4gICAgICAgICAgICAgIGJsYW5rTGluZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXcgKz0gcmF3TGluZSArICdcXG4nO1xuICAgICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXdMaW5lLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgbGluZSA9IG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbGlzdC5sb29zZSkge1xuICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyBpdGVtIGVuZGVkIHdpdGggYSBibGFuayBsaW5lLCB0aGUgbGlzdCBpcyBsb29zZVxuICAgICAgICAgIGlmIChlbmRzV2l0aEJsYW5rTGluZSkge1xuICAgICAgICAgICAgbGlzdC5sb29zZSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXFxuICpcXG4gKiQvLnRlc3QocmF3KSkge1xuICAgICAgICAgICAgZW5kc1dpdGhCbGFua0xpbmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciB0YXNrIGxpc3QgaXRlbXNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICAgICAgICBpc3Rhc2sgPSAvXlxcW1sgeFhdXFxdIC8uZXhlYyhpdGVtQ29udGVudHMpO1xuICAgICAgICAgIGlmIChpc3Rhc2spIHtcbiAgICAgICAgICAgIGlzY2hlY2tlZCA9IGlzdGFza1swXSAhPT0gJ1sgXSAnO1xuICAgICAgICAgICAgaXRlbUNvbnRlbnRzID0gaXRlbUNvbnRlbnRzLnJlcGxhY2UoL15cXFtbIHhYXVxcXSArLywgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW0nLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRhc2s6ICEhaXN0YXNrLFxuICAgICAgICAgIGNoZWNrZWQ6IGlzY2hlY2tlZCxcbiAgICAgICAgICBsb29zZTogZmFsc2UsXG4gICAgICAgICAgdGV4dDogaXRlbUNvbnRlbnRzXG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0LnJhdyArPSByYXc7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIG5vdCBjb25zdW1lIG5ld2xpbmVzIGF0IGVuZCBvZiBmaW5hbCBpdGVtLiBBbHRlcm5hdGl2ZWx5LCBtYWtlIGl0ZW1SZWdleCAqc3RhcnQqIHdpdGggYW55IG5ld2xpbmVzIHRvIHNpbXBsaWZ5L3NwZWVkIHVwIGVuZHNXaXRoQmxhbmtMaW5lIGxvZ2ljXG4gICAgICBsaXN0Lml0ZW1zW2xpc3QuaXRlbXMubGVuZ3RoIC0gMV0ucmF3ID0gcmF3LnRyaW1SaWdodCgpO1xuICAgICAgbGlzdC5pdGVtc1tsaXN0Lml0ZW1zLmxlbmd0aCAtIDFdLnRleHQgPSBpdGVtQ29udGVudHMudHJpbVJpZ2h0KCk7XG4gICAgICBsaXN0LnJhdyA9IGxpc3QucmF3LnRyaW1SaWdodCgpO1xuICAgICAgdmFyIGwgPSBsaXN0Lml0ZW1zLmxlbmd0aDtcblxuICAgICAgLy8gSXRlbSBjaGlsZCB0b2tlbnMgaGFuZGxlZCBoZXJlIGF0IGVuZCBiZWNhdXNlIHdlIG5lZWRlZCB0byBoYXZlIHRoZSBmaW5hbCBpdGVtIHRvIHRyaW0gaXQgZmlyc3RcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS50b3AgPSBmYWxzZTtcbiAgICAgICAgbGlzdC5pdGVtc1tpXS50b2tlbnMgPSB0aGlzLmxleGVyLmJsb2NrVG9rZW5zKGxpc3QuaXRlbXNbaV0udGV4dCwgW10pO1xuICAgICAgICBpZiAoIWxpc3QubG9vc2UpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiBsaXN0IHNob3VsZCBiZSBsb29zZVxuICAgICAgICAgIHZhciBzcGFjZXJzID0gbGlzdC5pdGVtc1tpXS50b2tlbnMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC50eXBlID09PSAnc3BhY2UnO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBoYXNNdWx0aXBsZUxpbmVCcmVha3MgPSBzcGFjZXJzLmxlbmd0aCA+IDAgJiYgc3BhY2Vycy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gL1xcbi4qXFxuLy50ZXN0KHQucmF3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0Lmxvb3NlID0gaGFzTXVsdGlwbGVMaW5lQnJlYWtzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBhbGwgaXRlbXMgdG8gbG9vc2UgaWYgbGlzdCBpcyBsb29zZVxuICAgICAgaWYgKGxpc3QubG9vc2UpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGxpc3QuaXRlbXNbaV0ubG9vc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5odG1sLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6ICdodG1sJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHByZTogIXRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgJiYgKGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScpLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pO1xuICAgICAgICB0b2tlbi50eXBlID0gJ3BhcmFncmFwaCc7XG4gICAgICAgIHRva2VuLnRleHQgPSB0ZXh0O1xuICAgICAgICB0b2tlbi50b2tlbnMgPSB0aGlzLmxleGVyLmlubGluZSh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH07XG4gIF9wcm90by5kZWYgPSBmdW5jdGlvbiBkZWYoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suZGVmLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGFnID0gY2FwWzFdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgdmFyIGhyZWYgPSBjYXBbMl0gPyBjYXBbMl0ucmVwbGFjZSgvXjwoLiopPiQvLCAnJDEnKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6ICcnO1xuICAgICAgdmFyIHRpdGxlID0gY2FwWzNdID8gY2FwWzNdLnN1YnN0cmluZygxLCBjYXBbM10ubGVuZ3RoIC0gMSkucmVwbGFjZSh0aGlzLnJ1bGVzLmlubGluZS5fZXNjYXBlcywgJyQxJykgOiBjYXBbM107XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZGVmJyxcbiAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8udGFibGUgPSBmdW5jdGlvbiB0YWJsZShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50YWJsZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogc3BsaXRDZWxscyhjYXBbMV0pLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBjXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgcm93czogY2FwWzNdICYmIGNhcFszXS50cmltKCkgPyBjYXBbM10ucmVwbGFjZSgvXFxuWyBcXHRdKiQvLCAnJykuc3BsaXQoJ1xcbicpIDogW11cbiAgICAgIH07XG4gICAgICBpZiAoaXRlbS5oZWFkZXIubGVuZ3RoID09PSBpdGVtLmFsaWduLmxlbmd0aCkge1xuICAgICAgICBpdGVtLnJhdyA9IGNhcFswXTtcbiAgICAgICAgdmFyIGwgPSBpdGVtLmFsaWduLmxlbmd0aDtcbiAgICAgICAgdmFyIGksIGosIGssIHJvdztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbCA9IGl0ZW0ucm93cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpdGVtLnJvd3NbaV0gPSBzcGxpdENlbGxzKGl0ZW0ucm93c1tpXSwgaXRlbS5oZWFkZXIubGVuZ3RoKS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRleHQ6IGNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYXJzZSBjaGlsZCB0b2tlbnMgaW5zaWRlIGhlYWRlcnMgYW5kIGNlbGxzXG5cbiAgICAgICAgLy8gaGVhZGVyIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5oZWFkZXIubGVuZ3RoO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgaXRlbS5oZWFkZXJbal0udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUoaXRlbS5oZWFkZXJbal0udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjZWxsIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5yb3dzLmxlbmd0aDtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgIHJvdyA9IGl0ZW0ucm93c1tqXTtcbiAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcm93Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICByb3dba10udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUocm93W2tdLnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5saGVhZGluZyA9IGZ1bmN0aW9uIGxoZWFkaW5nKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmxoZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBkZXB0aDogY2FwWzJdLmNoYXJBdCgwKSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXSxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5wYXJhZ3JhcGguZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzFdLmNoYXJBdChjYXBbMV0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nID8gY2FwWzFdLnNsaWNlKDAsIC0xKSA6IGNhcFsxXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZSh0ZXh0KVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50ZXh0LmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMF0sXG4gICAgICAgIHRva2VuczogdGhpcy5sZXhlci5pbmxpbmUoY2FwWzBdKVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUkMShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUuZXNjYXBlLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXNjYXBlJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IGVzY2FwZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRhZyA9IGZ1bmN0aW9uIHRhZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUudGFnLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBpZiAoIXRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePChwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePFxcLyhwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemUgPyAndGV4dCcgOiAnaHRtbCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBpbkxpbms6IHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rLFxuICAgICAgICBpblJhd0Jsb2NrOiB0aGlzLmxleGVyLnN0YXRlLmluUmF3QmxvY2ssXG4gICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZSA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgPyB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKGNhcFswXSkgOiBlc2NhcGUoY2FwWzBdKSA6IGNhcFswXVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5saW5rID0gZnVuY3Rpb24gbGluayhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUubGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRyaW1tZWRVcmwgPSBjYXBbMl0udHJpbSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgL148Ly50ZXN0KHRyaW1tZWRVcmwpKSB7XG4gICAgICAgIC8vIGNvbW1vbm1hcmsgcmVxdWlyZXMgbWF0Y2hpbmcgYW5nbGUgYnJhY2tldHNcbiAgICAgICAgaWYgKCEvPiQvLnRlc3QodHJpbW1lZFVybCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmRpbmcgYW5nbGUgYnJhY2tldCBjYW5ub3QgYmUgZXNjYXBlZFxuICAgICAgICB2YXIgcnRyaW1TbGFzaCA9IHJ0cmltKHRyaW1tZWRVcmwuc2xpY2UoMCwgLTEpLCAnXFxcXCcpO1xuICAgICAgICBpZiAoKHRyaW1tZWRVcmwubGVuZ3RoIC0gcnRyaW1TbGFzaC5sZW5ndGgpICUgMiA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmluZCBjbG9zaW5nIHBhcmVudGhlc2lzXG4gICAgICAgIHZhciBsYXN0UGFyZW5JbmRleCA9IGZpbmRDbG9zaW5nQnJhY2tldChjYXBbMl0sICcoKScpO1xuICAgICAgICBpZiAobGFzdFBhcmVuSW5kZXggPiAtMSkge1xuICAgICAgICAgIHZhciBzdGFydCA9IGNhcFswXS5pbmRleE9mKCchJykgPT09IDAgPyA1IDogNDtcbiAgICAgICAgICB2YXIgbGlua0xlbiA9IHN0YXJ0ICsgY2FwWzFdLmxlbmd0aCArIGxhc3RQYXJlbkluZGV4O1xuICAgICAgICAgIGNhcFsyXSA9IGNhcFsyXS5zdWJzdHJpbmcoMCwgbGFzdFBhcmVuSW5kZXgpO1xuICAgICAgICAgIGNhcFswXSA9IGNhcFswXS5zdWJzdHJpbmcoMCwgbGlua0xlbikudHJpbSgpO1xuICAgICAgICAgIGNhcFszXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgaHJlZiA9IGNhcFsyXTtcbiAgICAgIHZhciB0aXRsZSA9ICcnO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAvLyBzcGxpdCBwZWRhbnRpYyBocmVmIGFuZCB0aXRsZVxuICAgICAgICB2YXIgbGluayA9IC9eKFteJ1wiXSpbXlxcc10pXFxzKyhbJ1wiXSkoLiopXFwyLy5leGVjKGhyZWYpO1xuICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgIGhyZWYgPSBsaW5rWzFdO1xuICAgICAgICAgIHRpdGxlID0gbGlua1szXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGl0bGUgPSBjYXBbM10gPyBjYXBbM10uc2xpY2UoMSwgLTEpIDogJyc7XG4gICAgICB9XG4gICAgICBocmVmID0gaHJlZi50cmltKCk7XG4gICAgICBpZiAoL148Ly50ZXN0KGhyZWYpKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgIS8+JC8udGVzdCh0cmltbWVkVXJsKSkge1xuICAgICAgICAgIC8vIHBlZGFudGljIGFsbG93cyBzdGFydGluZyBhbmdsZSBicmFja2V0IHdpdGhvdXQgZW5kaW5nIGFuZ2xlIGJyYWNrZXRcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBocmVmID8gaHJlZi5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGhyZWYsXG4gICAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlLnJlcGxhY2UodGhpcy5ydWxlcy5pbmxpbmUuX2VzY2FwZXMsICckMScpIDogdGl0bGVcbiAgICAgIH0sIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ucmVmbGluayA9IGZ1bmN0aW9uIHJlZmxpbmsoc3JjLCBsaW5rcykge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5yZWZsaW5rLmV4ZWMoc3JjKSkgfHwgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICB2YXIgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gbGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluaykge1xuICAgICAgICB2YXIgdGV4dCA9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0TGluayhjYXAsIGxpbmssIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZW1TdHJvbmcgPSBmdW5jdGlvbiBlbVN0cm9uZyhzcmMsIG1hc2tlZFNyYywgcHJldkNoYXIpIHtcbiAgICBpZiAocHJldkNoYXIgPT09IHZvaWQgMCkge1xuICAgICAgcHJldkNoYXIgPSAnJztcbiAgICB9XG4gICAgdmFyIG1hdGNoID0gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcubERlbGltLmV4ZWMoc3JjKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAvLyBfIGNhbid0IGJlIGJldHdlZW4gdHdvIGFscGhhbnVtZXJpY3MuIFxccHtMfVxccHtOfSBpbmNsdWRlcyBub24tZW5nbGlzaCBhbHBoYWJldC9udW1iZXJzIGFzIHdlbGxcbiAgICBpZiAobWF0Y2hbM10gJiYgcHJldkNoYXIubWF0Y2goLyg/OlswLTlBLVphLXpcXHhBQVxceEIyXFx4QjNcXHhCNVxceEI5XFx4QkFcXHhCQy1cXHhCRVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYwLVxcdTA1ODhcXHUwNUQwLVxcdTA1RUFcXHUwNUVGLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjYwLVxcdTA2NjlcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUUtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3QzAtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4NjAtXFx1MDg2QVxcdTA4NzAtXFx1MDg4N1xcdTA4ODktXFx1MDg4RVxcdTA4QTAtXFx1MDhDOVxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk2Ni1cXHUwOTZGXFx1MDk3MS1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RTYtXFx1MDlGMVxcdTA5RjQtXFx1MDlGOVxcdTA5RkNcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTY2LVxcdTBBNkZcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQUU2LVxcdTBBRUZcXHUwQUY5XFx1MEIwNS1cXHUwQjBDXFx1MEIwRlxcdTBCMTBcXHUwQjEzLVxcdTBCMjhcXHUwQjJBLVxcdTBCMzBcXHUwQjMyXFx1MEIzM1xcdTBCMzUtXFx1MEIzOVxcdTBCM0RcXHUwQjVDXFx1MEI1RFxcdTBCNUYtXFx1MEI2MVxcdTBCNjYtXFx1MEI2RlxcdTBCNzEtXFx1MEI3N1xcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBCRTYtXFx1MEJGMlxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4LVxcdTBDNUFcXHUwQzVEXFx1MEM2MFxcdTBDNjFcXHUwQzY2LVxcdTBDNkZcXHUwQzc4LVxcdTBDN0VcXHUwQzgwXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDRERcXHUwQ0RFXFx1MENFMFxcdTBDRTFcXHUwQ0U2LVxcdTBDRUZcXHUwQ0YxXFx1MENGMlxcdTBEMDQtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0RcXHUwRDRFXFx1MEQ1NC1cXHUwRDU2XFx1MEQ1OC1cXHUwRDYxXFx1MEQ2Ni1cXHUwRDc4XFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBERTYtXFx1MERFRlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ2XFx1MEU1MC1cXHUwRTU5XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4Ni1cXHUwRThBXFx1MEU4Qy1cXHUwRUEzXFx1MEVBNVxcdTBFQTctXFx1MEVCMFxcdTBFQjJcXHUwRUIzXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYyMC1cXHUwRjMzXFx1MEY0MC1cXHUwRjQ3XFx1MEY0OS1cXHUwRjZDXFx1MEY4OC1cXHUwRjhDXFx1MTAwMC1cXHUxMDJBXFx1MTAzRi1cXHUxMDQ5XFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwOTAtXFx1MTA5OVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzY5LVxcdTEzN0NcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MTFcXHUxNzFGLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE3RTAtXFx1MTdFOVxcdTE3RjAtXFx1MTdGOVxcdTE4MTAtXFx1MTgxOVxcdTE4MjAtXFx1MTg3OFxcdTE4ODAtXFx1MTg4NFxcdTE4ODctXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTQ2LVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxOUQwLVxcdTE5REFcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQTgwLVxcdTFBODlcXHUxQTkwLVxcdTFBOTlcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRDXFx1MUI1MC1cXHUxQjU5XFx1MUI4My1cXHUxQkEwXFx1MUJBRS1cXHUxQkU1XFx1MUMwMC1cXHUxQzIzXFx1MUM0MC1cXHUxQzQ5XFx1MUM0RC1cXHUxQzdEXFx1MUM4MC1cXHUxQzg4XFx1MUM5MC1cXHUxQ0JBXFx1MUNCRC1cXHUxQ0JGXFx1MUNFOS1cXHUxQ0VDXFx1MUNFRS1cXHUxQ0YzXFx1MUNGNVxcdTFDRjZcXHUxQ0ZBXFx1MUQwMC1cXHUxREJGXFx1MUUwMC1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwNzBcXHUyMDcxXFx1MjA3NC1cXHUyMDc5XFx1MjA3Ri1cXHUyMDg5XFx1MjA5MC1cXHUyMDlDXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNTAtXFx1MjE4OVxcdTI0NjAtXFx1MjQ5QlxcdTI0RUEtXFx1MjRGRlxcdTI3NzYtXFx1Mjc5M1xcdTJDMDAtXFx1MkNFNFxcdTJDRUItXFx1MkNFRVxcdTJDRjJcXHUyQ0YzXFx1MkNGRFxcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJFMkZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMjlcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDlELVxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZDLVxcdTMwRkZcXHUzMTA1LVxcdTMxMkZcXHUzMTMxLVxcdTMxOEVcXHUzMTkyLVxcdTMxOTVcXHUzMUEwLVxcdTMxQkZcXHUzMUYwLVxcdTMxRkZcXHUzMjIwLVxcdTMyMjlcXHUzMjQ4LVxcdTMyNEZcXHUzMjUxLVxcdTMyNUZcXHUzMjgwLVxcdTMyODlcXHUzMkIxLVxcdTMyQkZcXHUzNDAwLVxcdTREQkZcXHU0RTAwLVxcdUE0OENcXHVBNEQwLVxcdUE0RkRcXHVBNTAwLVxcdUE2MENcXHVBNjEwLVxcdUE2MkJcXHVBNjQwLVxcdUE2NkVcXHVBNjdGLVxcdUE2OURcXHVBNkEwLVxcdUE2RUZcXHVBNzE3LVxcdUE3MUZcXHVBNzIyLVxcdUE3ODhcXHVBNzhCLVxcdUE3Q0FcXHVBN0QwXFx1QTdEMVxcdUE3RDNcXHVBN0Q1LVxcdUE3RDlcXHVBN0YyLVxcdUE4MDFcXHVBODAzLVxcdUE4MDVcXHVBODA3LVxcdUE4MEFcXHVBODBDLVxcdUE4MjJcXHVBODMwLVxcdUE4MzVcXHVBODQwLVxcdUE4NzNcXHVBODgyLVxcdUE4QjNcXHVBOEQwLVxcdUE4RDlcXHVBOEYyLVxcdUE4RjdcXHVBOEZCXFx1QThGRFxcdUE4RkVcXHVBOTAwLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGLVxcdUE5RDlcXHVBOUUwLVxcdUE5RTRcXHVBOUU2LVxcdUE5RkVcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTUwLVxcdUFBNTlcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE3RS1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNjlcXHVBQjcwLVxcdUFCRTJcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGQjM2XFx1RkIzOC1cXHVGQjNDXFx1RkIzRVxcdUZCNDBcXHVGQjQxXFx1RkI0M1xcdUZCNDRcXHVGQjQ2LVxcdUZCQjFcXHVGQkQzLVxcdUZEM0RcXHVGRDUwLVxcdUZEOEZcXHVGRDkyLVxcdUZEQzdcXHVGREYwLVxcdUZERkJcXHVGRTcwLVxcdUZFNzRcXHVGRTc2LVxcdUZFRkNcXHVGRjEwLVxcdUZGMTlcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcXHVGRjY2LVxcdUZGQkVcXHVGRkMyLVxcdUZGQzdcXHVGRkNBLVxcdUZGQ0ZcXHVGRkQyLVxcdUZGRDdcXHVGRkRBLVxcdUZGRENdfFxcdUQ4MDBbXFx1REMwMC1cXHVEQzBCXFx1REMwRC1cXHVEQzI2XFx1REMyOC1cXHVEQzNBXFx1REMzQ1xcdURDM0RcXHVEQzNGLVxcdURDNERcXHVEQzUwLVxcdURDNURcXHVEQzgwLVxcdURDRkFcXHVERDA3LVxcdUREMzNcXHVERDQwLVxcdURENzhcXHVERDhBXFx1REQ4QlxcdURFODAtXFx1REU5Q1xcdURFQTAtXFx1REVEMFxcdURFRTEtXFx1REVGQlxcdURGMDAtXFx1REYyM1xcdURGMkQtXFx1REY0QVxcdURGNTAtXFx1REY3NVxcdURGODAtXFx1REY5RFxcdURGQTAtXFx1REZDM1xcdURGQzgtXFx1REZDRlxcdURGRDEtXFx1REZENV18XFx1RDgwMVtcXHVEQzAwLVxcdURDOURcXHVEQ0EwLVxcdURDQTlcXHVEQ0IwLVxcdURDRDNcXHVEQ0Q4LVxcdURDRkJcXHVERDAwLVxcdUREMjdcXHVERDMwLVxcdURENjNcXHVERDcwLVxcdUREN0FcXHVERDdDLVxcdUREOEFcXHVERDhDLVxcdUREOTJcXHVERDk0XFx1REQ5NVxcdUREOTctXFx1RERBMVxcdUREQTMtXFx1RERCMVxcdUREQjMtXFx1RERCOVxcdUREQkJcXHVEREJDXFx1REUwMC1cXHVERjM2XFx1REY0MC1cXHVERjU1XFx1REY2MC1cXHVERjY3XFx1REY4MC1cXHVERjg1XFx1REY4Ny1cXHVERkIwXFx1REZCMi1cXHVERkJBXXxcXHVEODAyW1xcdURDMDAtXFx1REMwNVxcdURDMDhcXHVEQzBBLVxcdURDMzVcXHVEQzM3XFx1REMzOFxcdURDM0NcXHVEQzNGLVxcdURDNTVcXHVEQzU4LVxcdURDNzZcXHVEQzc5LVxcdURDOUVcXHVEQ0E3LVxcdURDQUZcXHVEQ0UwLVxcdURDRjJcXHVEQ0Y0XFx1RENGNVxcdURDRkItXFx1REQxQlxcdUREMjAtXFx1REQzOVxcdUREODAtXFx1RERCN1xcdUREQkMtXFx1RERDRlxcdURERDItXFx1REUwMFxcdURFMTAtXFx1REUxM1xcdURFMTUtXFx1REUxN1xcdURFMTktXFx1REUzNVxcdURFNDAtXFx1REU0OFxcdURFNjAtXFx1REU3RVxcdURFODAtXFx1REU5RlxcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNFxcdURFRUItXFx1REVFRlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNTgtXFx1REY3MlxcdURGNzgtXFx1REY5MVxcdURGQTktXFx1REZBRl18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJcXHVEQ0ZBLVxcdUREMjNcXHVERDMwLVxcdUREMzlcXHVERTYwLVxcdURFN0VcXHVERTgwLVxcdURFQTlcXHVERUIwXFx1REVCMVxcdURGMDAtXFx1REYyN1xcdURGMzAtXFx1REY0NVxcdURGNTEtXFx1REY1NFxcdURGNzAtXFx1REY4MVxcdURGQjAtXFx1REZDQlxcdURGRTAtXFx1REZGNl18XFx1RDgwNFtcXHVEQzAzLVxcdURDMzdcXHVEQzUyLVxcdURDNkZcXHVEQzcxXFx1REM3MlxcdURDNzVcXHVEQzgzLVxcdURDQUZcXHVEQ0QwLVxcdURDRThcXHVEQ0YwLVxcdURDRjlcXHVERDAzLVxcdUREMjZcXHVERDM2LVxcdUREM0ZcXHVERDQ0XFx1REQ0N1xcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVEREQwLVxcdUREREFcXHVERERDXFx1RERFMS1cXHVEREY0XFx1REUwMC1cXHVERTExXFx1REUxMy1cXHVERTJCXFx1REU4MC1cXHVERTg2XFx1REU4OFxcdURFOEEtXFx1REU4RFxcdURFOEYtXFx1REU5RFxcdURFOUYtXFx1REVBOFxcdURFQjAtXFx1REVERVxcdURFRjAtXFx1REVGOVxcdURGMDUtXFx1REYwQ1xcdURGMEZcXHVERjEwXFx1REYxMy1cXHVERjI4XFx1REYyQS1cXHVERjMwXFx1REYzMlxcdURGMzNcXHVERjM1LVxcdURGMzlcXHVERjNEXFx1REY1MFxcdURGNUQtXFx1REY2MV18XFx1RDgwNVtcXHVEQzAwLVxcdURDMzRcXHVEQzQ3LVxcdURDNEFcXHVEQzUwLVxcdURDNTlcXHVEQzVGLVxcdURDNjFcXHVEQzgwLVxcdURDQUZcXHVEQ0M0XFx1RENDNVxcdURDQzdcXHVEQ0QwLVxcdURDRDlcXHVERDgwLVxcdUREQUVcXHVEREQ4LVxcdUREREJcXHVERTAwLVxcdURFMkZcXHVERTQ0XFx1REU1MC1cXHVERTU5XFx1REU4MC1cXHVERUFBXFx1REVCOFxcdURFQzAtXFx1REVDOVxcdURGMDAtXFx1REYxQVxcdURGMzAtXFx1REYzQlxcdURGNDAtXFx1REY0Nl18XFx1RDgwNltcXHVEQzAwLVxcdURDMkJcXHVEQ0EwLVxcdURDRjJcXHVEQ0ZGLVxcdUREMDZcXHVERDA5XFx1REQwQy1cXHVERDEzXFx1REQxNVxcdUREMTZcXHVERDE4LVxcdUREMkZcXHVERDNGXFx1REQ0MVxcdURENTAtXFx1REQ1OVxcdUREQTAtXFx1RERBN1xcdUREQUEtXFx1REREMFxcdURERTFcXHVEREUzXFx1REUwMFxcdURFMEItXFx1REUzMlxcdURFM0FcXHVERTUwXFx1REU1Qy1cXHVERTg5XFx1REU5RFxcdURFQjAtXFx1REVGOF18XFx1RDgwN1tcXHVEQzAwLVxcdURDMDhcXHVEQzBBLVxcdURDMkVcXHVEQzQwXFx1REM1MC1cXHVEQzZDXFx1REM3Mi1cXHVEQzhGXFx1REQwMC1cXHVERDA2XFx1REQwOFxcdUREMDlcXHVERDBCLVxcdUREMzBcXHVERDQ2XFx1REQ1MC1cXHVERDU5XFx1REQ2MC1cXHVERDY1XFx1REQ2N1xcdURENjhcXHVERDZBLVxcdUREODlcXHVERDk4XFx1RERBMC1cXHVEREE5XFx1REVFMC1cXHVERUYyXFx1REZCMFxcdURGQzAtXFx1REZENF18XFx1RDgwOFtcXHVEQzAwLVxcdURGOTldfFxcdUQ4MDlbXFx1REMwMC1cXHVEQzZFXFx1REM4MC1cXHVERDQzXXxcXHVEODBCW1xcdURGOTAtXFx1REZGMF18W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODIyXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXFx1RDg3NC1cXHVEODc5XFx1RDg4MC1cXHVEODgzXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERTYwLVxcdURFNjlcXHVERTcwLVxcdURFQkVcXHVERUMwLVxcdURFQzlcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjQwLVxcdURGNDNcXHVERjUwLVxcdURGNTlcXHVERjVCLVxcdURGNjFcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REU0MC1cXHVERTk2XFx1REYwMC1cXHVERjRBXFx1REY1MFxcdURGOTMtXFx1REY5RlxcdURGRTBcXHVERkUxXFx1REZFM118XFx1RDgyMVtcXHVEQzAwLVxcdURGRjddfFxcdUQ4MjNbXFx1REMwMC1cXHVEQ0Q1XFx1REQwMC1cXHVERDA4XXxcXHVEODJCW1xcdURGRjAtXFx1REZGM1xcdURGRjUtXFx1REZGQlxcdURGRkRcXHVERkZFXXxcXHVEODJDW1xcdURDMDAtXFx1REQyMlxcdURENTAtXFx1REQ1MlxcdURENjQtXFx1REQ2N1xcdURENzAtXFx1REVGQl18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTldfFxcdUQ4MzRbXFx1REVFMC1cXHVERUYzXFx1REY2MC1cXHVERjc4XXxcXHVEODM1W1xcdURDMDAtXFx1REM1NFxcdURDNTYtXFx1REM5Q1xcdURDOUVcXHVEQzlGXFx1RENBMlxcdURDQTVcXHVEQ0E2XFx1RENBOS1cXHVEQ0FDXFx1RENBRS1cXHVEQ0I5XFx1RENCQlxcdURDQkQtXFx1RENDM1xcdURDQzUtXFx1REQwNVxcdUREMDctXFx1REQwQVxcdUREMEQtXFx1REQxNFxcdUREMTYtXFx1REQxQ1xcdUREMUUtXFx1REQzOVxcdUREM0ItXFx1REQzRVxcdURENDAtXFx1REQ0NFxcdURENDZcXHVERDRBLVxcdURENTBcXHVERDUyLVxcdURFQTVcXHVERUE4LVxcdURFQzBcXHVERUMyLVxcdURFREFcXHVERURDLVxcdURFRkFcXHVERUZDLVxcdURGMTRcXHVERjE2LVxcdURGMzRcXHVERjM2LVxcdURGNEVcXHVERjUwLVxcdURGNkVcXHVERjcwLVxcdURGODhcXHVERjhBLVxcdURGQThcXHVERkFBLVxcdURGQzJcXHVERkM0LVxcdURGQ0JcXHVERkNFLVxcdURGRkZdfFxcdUQ4MzdbXFx1REYwMC1cXHVERjFFXXxcXHVEODM4W1xcdUREMDAtXFx1REQyQ1xcdUREMzctXFx1REQzRFxcdURENDAtXFx1REQ0OVxcdURENEVcXHVERTkwLVxcdURFQURcXHVERUMwLVxcdURFRUJcXHVERUYwLVxcdURFRjldfFxcdUQ4MzlbXFx1REZFMC1cXHVERkU2XFx1REZFOC1cXHVERkVCXFx1REZFRFxcdURGRUVcXHVERkYwLVxcdURGRkVdfFxcdUQ4M0FbXFx1REMwMC1cXHVEQ0M0XFx1RENDNy1cXHVEQ0NGXFx1REQwMC1cXHVERDQzXFx1REQ0QlxcdURENTAtXFx1REQ1OV18XFx1RDgzQltcXHVEQzcxLVxcdURDQUJcXHVEQ0FELVxcdURDQUZcXHVEQ0IxLVxcdURDQjRcXHVERDAxLVxcdUREMkRcXHVERDJGLVxcdUREM0RcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODNDW1xcdUREMDAtXFx1REQwQ118XFx1RDgzRVtcXHVERkYwLVxcdURGRjldfFxcdUQ4NjlbXFx1REMwMC1cXHVERURGXFx1REYwMC1cXHVERkZGXXxcXHVEODZEW1xcdURDMDAtXFx1REYzOFxcdURGNDAtXFx1REZGRl18XFx1RDg2RVtcXHVEQzAwLVxcdURDMURcXHVEQzIwLVxcdURGRkZdfFxcdUQ4NzNbXFx1REMwMC1cXHVERUExXFx1REVCMC1cXHVERkZGXXxcXHVEODdBW1xcdURDMDAtXFx1REZFMF18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdfFxcdUQ4ODRbXFx1REMwMC1cXHVERjRBXSkvKSkgcmV0dXJuO1xuICAgIHZhciBuZXh0Q2hhciA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8ICcnO1xuICAgIGlmICghbmV4dENoYXIgfHwgbmV4dENoYXIgJiYgKHByZXZDaGFyID09PSAnJyB8fCB0aGlzLnJ1bGVzLmlubGluZS5wdW5jdHVhdGlvbi5leGVjKHByZXZDaGFyKSkpIHtcbiAgICAgIHZhciBsTGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoIC0gMTtcbiAgICAgIHZhciByRGVsaW0sXG4gICAgICAgIHJMZW5ndGgsXG4gICAgICAgIGRlbGltVG90YWwgPSBsTGVuZ3RoLFxuICAgICAgICBtaWREZWxpbVRvdGFsID0gMDtcbiAgICAgIHZhciBlbmRSZWcgPSBtYXRjaFswXVswXSA9PT0gJyonID8gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltQXN0IDogdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltVW5kO1xuICAgICAgZW5kUmVnLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgIC8vIENsaXAgbWFza2VkU3JjIHRvIHNhbWUgc2VjdGlvbiBvZiBzdHJpbmcgYXMgc3JjIChtb3ZlIHRvIGxleGVyPylcbiAgICAgIG1hc2tlZFNyYyA9IG1hc2tlZFNyYy5zbGljZSgtMSAqIHNyYy5sZW5ndGggKyBsTGVuZ3RoKTtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSBlbmRSZWcuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgIHJEZWxpbSA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8IG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IG1hdGNoWzZdO1xuICAgICAgICBpZiAoIXJEZWxpbSkgY29udGludWU7IC8vIHNraXAgc2luZ2xlICogaW4gX19hYmMqYWJjX19cblxuICAgICAgICByTGVuZ3RoID0gckRlbGltLmxlbmd0aDtcbiAgICAgICAgaWYgKG1hdGNoWzNdIHx8IG1hdGNoWzRdKSB7XG4gICAgICAgICAgLy8gZm91bmQgYW5vdGhlciBMZWZ0IERlbGltXG4gICAgICAgICAgZGVsaW1Ub3RhbCArPSByTGVuZ3RoO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzVdIHx8IG1hdGNoWzZdKSB7XG4gICAgICAgICAgLy8gZWl0aGVyIExlZnQgb3IgUmlnaHQgRGVsaW1cbiAgICAgICAgICBpZiAobExlbmd0aCAlIDMgJiYgISgobExlbmd0aCArIHJMZW5ndGgpICUgMykpIHtcbiAgICAgICAgICAgIG1pZERlbGltVG90YWwgKz0gckxlbmd0aDtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDb21tb25NYXJrIEVtcGhhc2lzIFJ1bGVzIDktMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkZWxpbVRvdGFsIC09IHJMZW5ndGg7XG4gICAgICAgIGlmIChkZWxpbVRvdGFsID4gMCkgY29udGludWU7IC8vIEhhdmVuJ3QgZm91bmQgZW5vdWdoIGNsb3NpbmcgZGVsaW1pdGVyc1xuXG4gICAgICAgIC8vIFJlbW92ZSBleHRyYSBjaGFyYWN0ZXJzLiAqYSoqKiAtPiAqYSpcbiAgICAgICAgckxlbmd0aCA9IE1hdGgubWluKHJMZW5ndGgsIHJMZW5ndGggKyBkZWxpbVRvdGFsICsgbWlkRGVsaW1Ub3RhbCk7XG4gICAgICAgIHZhciByYXcgPSBzcmMuc2xpY2UoMCwgbExlbmd0aCArIG1hdGNoLmluZGV4ICsgKG1hdGNoWzBdLmxlbmd0aCAtIHJEZWxpbS5sZW5ndGgpICsgckxlbmd0aCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGBlbWAgaWYgc21hbGxlc3QgZGVsaW1pdGVyIGhhcyBvZGQgY2hhciBjb3VudC4gKmEqKipcbiAgICAgICAgaWYgKE1hdGgubWluKGxMZW5ndGgsIHJMZW5ndGgpICUgMikge1xuICAgICAgICAgIHZhciBfdGV4dCA9IHJhdy5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdlbScsXG4gICAgICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgICAgIHRleHQ6IF90ZXh0LFxuICAgICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2VucyhfdGV4dClcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlICdzdHJvbmcnIGlmIHNtYWxsZXN0IGRlbGltaXRlciBoYXMgZXZlbiBjaGFyIGNvdW50LiAqKmEqKipcbiAgICAgICAgdmFyIHRleHQgPSByYXcuc2xpY2UoMiwgLTIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6ICdzdHJvbmcnLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2Vucyh0ZXh0KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmNvZGVzcGFuID0gZnVuY3Rpb24gY29kZXNwYW4oc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLmNvZGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzJdLnJlcGxhY2UoL1xcbi9nLCAnICcpO1xuICAgICAgdmFyIGhhc05vblNwYWNlQ2hhcnMgPSAvW14gXS8udGVzdCh0ZXh0KTtcbiAgICAgIHZhciBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcyA9IC9eIC8udGVzdCh0ZXh0KSAmJiAvICQvLnRlc3QodGV4dCk7XG4gICAgICBpZiAoaGFzTm9uU3BhY2VDaGFycyAmJiBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMSwgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICAgIHRleHQgPSBlc2NhcGUodGV4dCwgdHJ1ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZXNwYW4nLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5iciA9IGZ1bmN0aW9uIGJyKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5ici5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2JyJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5kZWwuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdkZWwnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogY2FwWzJdLFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lVG9rZW5zKGNhcFsyXSlcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYXV0b2xpbmsgPSBmdW5jdGlvbiBhdXRvbGluayhzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5hdXRvbGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQsIGhyZWY7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMubWFuZ2xlID8gbWFuZ2xlKGNhcFsxXSkgOiBjYXBbMV0pO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnbGluaycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0b2tlbnM6IFt7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnVybCA9IGZ1bmN0aW9uIHVybChzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnVybC5leGVjKHNyYykpIHtcbiAgICAgIHZhciB0ZXh0LCBocmVmO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUodGhpcy5vcHRpb25zLm1hbmdsZSA/IG1hbmdsZShjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgICAgaHJlZiA9ICdtYWlsdG86JyArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkbyBleHRlbmRlZCBhdXRvbGluayBwYXRoIHZhbGlkYXRpb25cbiAgICAgICAgdmFyIHByZXZDYXBaZXJvO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgcHJldkNhcFplcm8gPSBjYXBbMF07XG4gICAgICAgICAgY2FwWzBdID0gdGhpcy5ydWxlcy5pbmxpbmUuX2JhY2twZWRhbC5leGVjKGNhcFswXSlbMF07XG4gICAgICAgIH0gd2hpbGUgKHByZXZDYXBaZXJvICE9PSBjYXBbMF0pO1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFswXSk7XG4gICAgICAgIGlmIChjYXBbMV0gPT09ICd3d3cuJykge1xuICAgICAgICAgIGhyZWYgPSAnaHR0cDovLycgKyBjYXBbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IGNhcFswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgdG9rZW5zOiBbe1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICByYXc6IHRleHQsXG4gICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5pbmxpbmVUZXh0ID0gZnVuY3Rpb24gaW5saW5lVGV4dChzcmMsIHNtYXJ0eXBhbnRzKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnRleHQuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0O1xuICAgICAgaWYgKHRoaXMubGV4ZXIuc3RhdGUuaW5SYXdCbG9jaykge1xuICAgICAgICB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplID8gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pIDogY2FwWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMgPyBzbWFydHlwYW50cyhjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICByZXR1cm4gVG9rZW5pemVyO1xufSgpO1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXig/OiAqKD86XFxufCQpKSsvLFxuICBjb2RlOiAvXiggezR9W15cXG5dKyg/Olxcbig/OiAqKD86XFxufCQpKSopPykrLyxcbiAgZmVuY2VzOiAvXiB7MCwzfShgezMsfSg/PVteYFxcbl0qKD86XFxufCQpKXx+ezMsfSkoW15cXG5dKikoPzpcXG58JCkoPzp8KFtcXHNcXFNdKj8pKD86XFxufCQpKSg/OiB7MCwzfVxcMVt+YF0qICooPz1cXG58JCl8JCkvLFxuICBocjogL14gezAsM30oKD86LVtcXHQgXSopezMsfXwoPzpfWyBcXHRdKil7Myx9fCg/OlxcKlsgXFx0XSopezMsfSkoPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gezAsM30oI3sxLDZ9KSg/PVxcc3wkKSguKikoPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oIHswLDN9PiA/KHBhcmFncmFwaHxbXlxcbl0qKSg/OlxcbnwkKSkrLyxcbiAgbGlzdDogL14oIHswLDN9YnVsbCkoWyBcXHRdW15cXG5dKz8pPyg/OlxcbnwkKS8sXG4gIGh0bWw6ICdeIHswLDN9KD86JyAvLyBvcHRpb25hbCBpbmRlbnRhdGlvblxuICArICc8KHNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW1xcXFxzPl1bXFxcXHNcXFxcU10qPyg/OjwvXFxcXDE+W15cXFxcbl0qXFxcXG4rfCQpJyAvLyAoMSlcbiAgKyAnfGNvbW1lbnRbXlxcXFxuXSooXFxcXG4rfCQpJyAvLyAoMilcbiAgKyAnfDxcXFxcP1tcXFxcc1xcXFxTXSo/KD86XFxcXD8+XFxcXG4qfCQpJyAvLyAoMylcbiAgKyAnfDwhW0EtWl1bXFxcXHNcXFxcU10qPyg/Oj5cXFxcbip8JCknIC8vICg0KVxuICArICd8PCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qPyg/OlxcXFxdXFxcXF0+XFxcXG4qfCQpJyAvLyAoNSlcbiAgKyAnfDwvPyh0YWcpKD86ICt8XFxcXG58Lz8+KVtcXFxcc1xcXFxTXSo/KD86KD86XFxcXG4gKikrXFxcXG58JCknIC8vICg2KVxuICArICd8PCg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpKFthLXpdW1xcXFx3LV0qKSg/OmF0dHJpYnV0ZSkqPyAqLz8+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIG9wZW4gdGFnXG4gICsgJ3w8Lyg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW2Etel1bXFxcXHctXSpcXFxccyo+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIGNsb3NpbmcgdGFnXG4gICsgJyknLFxuICBkZWY6IC9eIHswLDN9XFxbKGxhYmVsKVxcXTogKig/OlxcbiAqKT8oW148XFxzXVteXFxzXSp8PC4qPz4pKD86KD86ICsoPzpcXG4gKik/fCAqXFxuICopKHRpdGxlKSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3BUZXN0LFxuICBsaGVhZGluZzogL14oKD86LnxcXG4oPyFcXG4pKSs/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICAvLyByZWdleCB0ZW1wbGF0ZSwgcGxhY2Vob2xkZXJzIHdpbGwgYmUgcmVwbGFjZWQgYWNjb3JkaW5nIHRvIGRpZmZlcmVudCBwYXJhZ3JhcGhcbiAgLy8gaW50ZXJydXB0aW9uIHJ1bGVzIG9mIGNvbW1vbm1hcmsgYW5kIHRoZSBvcmlnaW5hbCBtYXJrZG93biBzcGVjOlxuICBfcGFyYWdyYXBoOiAvXihbXlxcbl0rKD86XFxuKD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfGZlbmNlc3xsaXN0fGh0bWx8dGFibGV8ICtcXG4pW15cXG5dKykqKS8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5ibG9jay5fbGFiZWwgPSAvKD8hXFxzKlxcXSkoPzpcXFxcLnxbXlxcW1xcXVxcXFxdKSsvO1xuYmxvY2suX3RpdGxlID0gLyg/OlwiKD86XFxcXFwiP3xbXlwiXFxcXF0pKlwifCdbXidcXG5dKig/OlxcblteJ1xcbl0rKSpcXG4/J3xcXChbXigpXSpcXCkpLztcbmJsb2NrLmRlZiA9IGVkaXQoYmxvY2suZGVmKS5yZXBsYWNlKCdsYWJlbCcsIGJsb2NrLl9sYWJlbCkucmVwbGFjZSgndGl0bGUnLCBibG9jay5fdGl0bGUpLmdldFJlZ2V4KCk7XG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkezEsOX1bLildKS87XG5ibG9jay5saXN0SXRlbVN0YXJ0ID0gZWRpdCgvXiggKikoYnVsbCkgKi8pLnJlcGxhY2UoJ2J1bGwnLCBibG9jay5idWxsZXQpLmdldFJlZ2V4KCk7XG5ibG9jay5saXN0ID0gZWRpdChibG9jay5saXN0KS5yZXBsYWNlKC9idWxsL2csIGJsb2NrLmJ1bGxldCkucmVwbGFjZSgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86KD86LSAqKXszLH18KD86XyAqKXszLH18KD86XFxcXCogKil7Myx9KSg/OlxcXFxuK3wkKSknKS5yZXBsYWNlKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpLmdldFJlZ2V4KCk7XG5ibG9jay5fdGFnID0gJ2FkZHJlc3N8YXJ0aWNsZXxhc2lkZXxiYXNlfGJhc2Vmb250fGJsb2NrcXVvdGV8Ym9keXxjYXB0aW9uJyArICd8Y2VudGVyfGNvbHxjb2xncm91cHxkZHxkZXRhaWxzfGRpYWxvZ3xkaXJ8ZGl2fGRsfGR0fGZpZWxkc2V0fGZpZ2NhcHRpb24nICsgJ3xmaWd1cmV8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aFsxLTZdfGhlYWR8aGVhZGVyfGhyfGh0bWx8aWZyYW1lJyArICd8bGVnZW5kfGxpfGxpbmt8bWFpbnxtZW51fG1lbnVpdGVtfG1ldGF8bmF2fG5vZnJhbWVzfG9sfG9wdGdyb3VwfG9wdGlvbicgKyAnfHB8cGFyYW18c2VjdGlvbnxzb3VyY2V8c3VtbWFyeXx0YWJsZXx0Ym9keXx0ZHx0Zm9vdHx0aHx0aGVhZHx0aXRsZXx0cicgKyAnfHRyYWNrfHVsJztcbmJsb2NrLl9jb21tZW50ID0gLzwhLS0oPyEtPz4pW1xcc1xcU10qPyg/Oi0tPnwkKS87XG5ibG9jay5odG1sID0gZWRpdChibG9jay5odG1sLCAnaScpLnJlcGxhY2UoJ2NvbW1lbnQnLCBibG9jay5fY29tbWVudCkucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykucmVwbGFjZSgnYXR0cmlidXRlJywgLyArW2EtekEtWjpfXVtcXHcuOi1dKig/OiAqPSAqXCJbXlwiXFxuXSpcInwgKj0gKidbXidcXG5dKid8ICo9ICpbXlxcc1wiJz08PmBdKyk/LykuZ2V0UmVnZXgoKTtcbmJsb2NrLnBhcmFncmFwaCA9IGVkaXQoYmxvY2suX3BhcmFncmFwaCkucmVwbGFjZSgnaHInLCBibG9jay5ocikucmVwbGFjZSgnaGVhZGluZycsICcgezAsM30jezEsNn0gJykucmVwbGFjZSgnfGxoZWFkaW5nJywgJycpIC8vIHNldGV4IGhlYWRpbmdzIGRvbid0IGludGVycnVwdCBjb21tb25tYXJrIHBhcmFncmFwaHNcbi5yZXBsYWNlKCd8dGFibGUnLCAnJykucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5ibG9ja3F1b3RlID0gZWRpdChibG9jay5ibG9ja3F1b3RlKS5yZXBsYWNlKCdwYXJhZ3JhcGgnLCBibG9jay5wYXJhZ3JhcGgpLmdldFJlZ2V4KCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBfZXh0ZW5kcyh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gX2V4dGVuZHMoe30sIGJsb2NrLm5vcm1hbCwge1xuICB0YWJsZTogJ14gKihbXlxcXFxuIF0uKlxcXFx8LiopXFxcXG4nIC8vIEhlYWRlclxuICArICcgezAsM30oPzpcXFxcfCAqKT8oOj8tKzo/ICooPzpcXFxcfCAqOj8tKzo/ICopKikoPzpcXFxcfCAqKT8nIC8vIEFsaWduXG4gICsgJyg/OlxcXFxuKCg/Oig/ISAqXFxcXG58aHJ8aGVhZGluZ3xibG9ja3F1b3RlfGNvZGV8ZmVuY2VzfGxpc3R8aHRtbCkuKig/OlxcXFxufCQpKSopXFxcXG4qfCQpJyAvLyBDZWxsc1xufSk7XG5cbmJsb2NrLmdmbS50YWJsZSA9IGVkaXQoYmxvY2suZ2ZtLnRhYmxlKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCdibG9ja3F1b3RlJywgJyB7MCwzfT4nKS5yZXBsYWNlKCdjb2RlJywgJyB7NH1bXlxcXFxuXScpLnJlcGxhY2UoJ2ZlbmNlcycsICcgezAsM30oPzpgezMsfSg/PVteYFxcXFxuXSpcXFxcbil8fnszLH0pW15cXFxcbl0qXFxcXG4nKS5yZXBsYWNlKCdsaXN0JywgJyB7MCwzfSg/OlsqKy1dfDFbLildKSAnKSAvLyBvbmx5IGxpc3RzIHN0YXJ0aW5nIGZyb20gMSBjYW4gaW50ZXJydXB0XG4ucmVwbGFjZSgnaHRtbCcsICc8Lz8oPzp0YWcpKD86ICt8XFxcXG58Lz8+KXw8KD86c2NyaXB0fHByZXxzdHlsZXx0ZXh0YXJlYXwhLS0pJykucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykgLy8gdGFibGVzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5nZm0ucGFyYWdyYXBoID0gZWRpdChibG9jay5fcGFyYWdyYXBoKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCd8bGhlYWRpbmcnLCAnJykgLy8gc2V0ZXggaGVhZGluZ3MgZG9uJ3QgaW50ZXJydXB0IGNvbW1vbm1hcmsgcGFyYWdyYXBoc1xuLnJlcGxhY2UoJ3RhYmxlJywgYmxvY2suZ2ZtLnRhYmxlKSAvLyBpbnRlcnJ1cHQgcGFyYWdyYXBocyB3aXRoIHRhYmxlXG4ucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG4vKipcbiAqIFBlZGFudGljIGdyYW1tYXIgKG9yaWdpbmFsIEpvaG4gR3J1YmVyJ3MgbG9vc2UgbWFya2Rvd24gc3BlY2lmaWNhdGlvbilcbiAqL1xuXG5ibG9jay5wZWRhbnRpYyA9IF9leHRlbmRzKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgaHRtbDogZWRpdCgnXiAqKD86Y29tbWVudCAqKD86XFxcXG58XFxcXHMqJCknICsgJ3w8KHRhZylbXFxcXHNcXFxcU10rPzwvXFxcXDE+ICooPzpcXFxcbnsyLH18XFxcXHMqJCknIC8vIGNsb3NlZCB0YWdcbiAgKyAnfDx0YWcoPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8XFxcXHNbXlxcJ1wiLz5cXFxcc10qKSo/Lz8+ICooPzpcXFxcbnsyLH18XFxcXHMqJCkpJykucmVwbGFjZSgnY29tbWVudCcsIGJsb2NrLl9jb21tZW50KS5yZXBsYWNlKC90YWcvZywgJyg/ISg/OicgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGV8dmFyfHNhbXB8a2JkfHN1YicgKyAnfHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkb3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZyknICsgJ1xcXFxiKVxcXFx3Kyg/ITp8W15cXFxcd1xcXFxzQF0qQClcXFxcYicpLmdldFJlZ2V4KCksXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICsoW1wiKF1bXlxcbl0rW1wiKV0pKT8gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXigjezEsNn0pKC4qKSg/Olxcbit8JCkvLFxuICBmZW5jZXM6IG5vb3BUZXN0LFxuICAvLyBmZW5jZXMgbm90IHN1cHBvcnRlZFxuICBsaGVhZGluZzogL14oLis/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IGVkaXQoYmxvY2subm9ybWFsLl9wYXJhZ3JhcGgpLnJlcGxhY2UoJ2hyJywgYmxvY2suaHIpLnJlcGxhY2UoJ2hlYWRpbmcnLCAnICojezEsNn0gKlteXFxuXScpLnJlcGxhY2UoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpLnJlcGxhY2UoJ2Jsb2NrcXVvdGUnLCAnIHswLDN9PicpLnJlcGxhY2UoJ3xmZW5jZXMnLCAnJykucmVwbGFjZSgnfGxpc3QnLCAnJykucmVwbGFjZSgnfGh0bWwnLCAnJykuZ2V0UmVnZXgoKVxufSk7XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pLyxcbiAgYXV0b2xpbms6IC9ePChzY2hlbWU6W15cXHNcXHgwMC1cXHgxZjw+XSp8ZW1haWwpPi8sXG4gIHVybDogbm9vcFRlc3QsXG4gIHRhZzogJ15jb21tZW50JyArICd8XjwvW2EtekEtWl1bXFxcXHc6LV0qXFxcXHMqPicgLy8gc2VsZi1jbG9zaW5nIHRhZ1xuICArICd8XjxbYS16QS1aXVtcXFxcdy1dKig/OmF0dHJpYnV0ZSkqP1xcXFxzKi8/PicgLy8gb3BlbiB0YWdcbiAgKyAnfF48XFxcXD9bXFxcXHNcXFxcU10qP1xcXFw/PicgLy8gcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiwgZS5nLiA8P3BocCA/PlxuICArICd8XjwhW2EtekEtWl0rXFxcXHNbXFxcXHNcXFxcU10qPz4nIC8vIGRlY2xhcmF0aW9uLCBlLmcuIDwhRE9DVFlQRSBodG1sPlxuICArICd8XjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPicsXG4gIC8vIENEQVRBIHNlY3Rpb25cbiAgbGluazogL14hP1xcWyhsYWJlbClcXF1cXChcXHMqKGhyZWYpKD86XFxzKyh0aXRsZSkpP1xccypcXCkvLFxuICByZWZsaW5rOiAvXiE/XFxbKGxhYmVsKVxcXVxcWyhyZWYpXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKHJlZilcXF0oPzpcXFtcXF0pPy8sXG4gIHJlZmxpbmtTZWFyY2g6ICdyZWZsaW5rfG5vbGluayg/IVxcXFwoKScsXG4gIGVtU3Ryb25nOiB7XG4gICAgbERlbGltOiAvXig/OlxcKisoPzooW3B1bmN0X10pfFteXFxzKl0pKXxeXysoPzooW3B1bmN0Kl0pfChbXlxcc19dKSkvLFxuICAgIC8vICAgICAgICAoMSkgYW5kICgyKSBjYW4gb25seSBiZSBhIFJpZ2h0IERlbGltaXRlci4gKDMpIGFuZCAoNCkgY2FuIG9ubHkgYmUgTGVmdC4gICg1KSBhbmQgKDYpIGNhbiBiZSBlaXRoZXIgTGVmdCBvciBSaWdodC5cbiAgICAvLyAgICAgICAgICAoKSBTa2lwIG9ycGhhbiBpbnNpZGUgc3Ryb25nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSBDb25zdW1lIHRvIGRlbGltICAgICAoMSkgIyoqKiAgICAgICAgICAgICAgICAoMikgYSoqKiMsIGEqKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICgzKSAjKioqYSwgKioqYSAgICAgICAgICAgICAgICAgKDQpICoqKiMgICAgICAgICAgICAgICg1KSAjKioqIyAgICAgICAgICAgICAgICAgKDYpIGEqKiphXG4gICAgckRlbGltQXN0OiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcX1xcXyg/OlteXypcXFxcXXxcXFxcLikqP1xcKig/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcX1xcXyl8KD86W14qXFxcXF18XFxcXC4pKyg/PVteKl0pfFtwdW5jdF9dKFxcKispKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcKispKD89W3B1bmN0X1xcc118JCl8W3B1bmN0X1xcc10oXFwqKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXCorKSg/PVtwdW5jdF9dKXxbcHVuY3RfXShcXCorKSg/PVtwdW5jdF9dKXwoPzpbXnB1bmN0Kl9cXHNcXFxcXXxcXFxcLikoXFwqKykoPz1bXnB1bmN0Kl9cXHNdKS8sXG4gICAgckRlbGltVW5kOiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcKlxcKig/OlteXypcXFxcXXxcXFxcLikqP1xcXyg/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcKlxcKil8KD86W15fXFxcXF18XFxcXC4pKyg/PVteX10pfFtwdW5jdCpdKFxcXyspKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcXyspKD89W3B1bmN0Klxcc118JCl8W3B1bmN0Klxcc10oXFxfKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXF8rKSg/PVtwdW5jdCpdKXxbcHVuY3QqXShcXF8rKSg/PVtwdW5jdCpdKS8gLy8gXi0gTm90IGFsbG93ZWQgZm9yIF9cbiAgfSxcblxuICBjb2RlOiAvXihgKykoW15gXXxbXmBdW1xcc1xcU10qP1teYF0pXFwxKD8hYCkvLFxuICBicjogL14oIHsyLH18XFxcXClcXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3BUZXN0LFxuICB0ZXh0OiAvXihgK3xbXmBdKSg/Oig/PSB7Mix9XFxuKXxbXFxzXFxTXSo/KD86KD89W1xcXFw8IVxcW2AqX118XFxiX3wkKXxbXiBdKD89IHsyLH1cXG4pKSkvLFxuICBwdW5jdHVhdGlvbjogL14oW1xcc3B1bmN0dWF0aW9uXSkvXG59O1xuXG4vLyBsaXN0IG9mIHB1bmN0dWF0aW9uIG1hcmtzIGZyb20gQ29tbW9uTWFyayBzcGVjXG4vLyB3aXRob3V0ICogYW5kIF8gdG8gaGFuZGxlIHRoZSBkaWZmZXJlbnQgZW1waGFzaXMgbWFya2VycyAqIGFuZCBfXG5pbmxpbmUuX3B1bmN0dWF0aW9uID0gJyFcIiMkJSZcXCcoKStcXFxcLS4sLzo7PD0+P0BcXFxcW1xcXFxdYF57fH1+JztcbmlubGluZS5wdW5jdHVhdGlvbiA9IGVkaXQoaW5saW5lLnB1bmN0dWF0aW9uKS5yZXBsYWNlKC9wdW5jdHVhdGlvbi9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuXG4vLyBzZXF1ZW5jZXMgZW0gc2hvdWxkIHNraXAgb3ZlciBbdGl0bGVdKGxpbmspLCBgY29kZWAsIDxodG1sPlxuaW5saW5lLmJsb2NrU2tpcCA9IC9cXFtbXlxcXV0qP1xcXVxcKFteXFwpXSo/XFwpfGBbXmBdKj9gfDxbXj5dKj8+L2c7XG4vLyBsb29rYmVoaW5kIGlzIG5vdCBhdmFpbGFibGUgb24gU2FmYXJpIGFzIG9mIHZlcnNpb24gMTZcbi8vIGlubGluZS5lc2NhcGVkRW1TdCA9IC8oPzw9KD86XnxbXlxcXFwpKD86XFxcXFteXSkqKVxcXFxbKl9dL2c7XG5pbmxpbmUuZXNjYXBlZEVtU3QgPSAvKD86XnxbXlxcXFxdKSg/OlxcXFxcXFxcKSpcXFxcWypfXS9nO1xuaW5saW5lLl9jb21tZW50ID0gZWRpdChibG9jay5fY29tbWVudCkucmVwbGFjZSgnKD86LS0+fCQpJywgJy0tPicpLmdldFJlZ2V4KCk7XG5pbmxpbmUuZW1TdHJvbmcubERlbGltID0gZWRpdChpbmxpbmUuZW1TdHJvbmcubERlbGltKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLl9lc2NhcGVzID0gL1xcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pL2c7XG5pbmxpbmUuX3NjaGVtZSA9IC9bYS16QS1aXVthLXpBLVowLTkrLi1dezEsMzF9LztcbmlubGluZS5fZW1haWwgPSAvW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXSsoQClbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKyg/IVstX10pLztcbmlubGluZS5hdXRvbGluayA9IGVkaXQoaW5saW5lLmF1dG9saW5rKS5yZXBsYWNlKCdzY2hlbWUnLCBpbmxpbmUuX3NjaGVtZSkucmVwbGFjZSgnZW1haWwnLCBpbmxpbmUuX2VtYWlsKS5nZXRSZWdleCgpO1xuaW5saW5lLl9hdHRyaWJ1dGUgPSAvXFxzK1thLXpBLVo6X11bXFx3LjotXSooPzpcXHMqPVxccypcIlteXCJdKlwifFxccyo9XFxzKidbXiddKid8XFxzKj1cXHMqW15cXHNcIic9PD5gXSspPy87XG5pbmxpbmUudGFnID0gZWRpdChpbmxpbmUudGFnKS5yZXBsYWNlKCdjb21tZW50JywgaW5saW5lLl9jb21tZW50KS5yZXBsYWNlKCdhdHRyaWJ1dGUnLCBpbmxpbmUuX2F0dHJpYnV0ZSkuZ2V0UmVnZXgoKTtcbmlubGluZS5fbGFiZWwgPSAvKD86XFxbKD86XFxcXC58W15cXFtcXF1cXFxcXSkqXFxdfFxcXFwufGBbXmBdKmB8W15cXFtcXF1cXFxcYF0pKj8vO1xuaW5saW5lLl9ocmVmID0gLzwoPzpcXFxcLnxbXlxcbjw+XFxcXF0pKz58W15cXHNcXHgwMC1cXHgxZl0qLztcbmlubGluZS5fdGl0bGUgPSAvXCIoPzpcXFxcXCI/fFteXCJcXFxcXSkqXCJ8Jyg/OlxcXFwnP3xbXidcXFxcXSkqJ3xcXCgoPzpcXFxcXFwpP3xbXilcXFxcXSkqXFwpLztcbmlubGluZS5saW5rID0gZWRpdChpbmxpbmUubGluaykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5yZXBsYWNlKCdocmVmJywgaW5saW5lLl9ocmVmKS5yZXBsYWNlKCd0aXRsZScsIGlubGluZS5fdGl0bGUpLmdldFJlZ2V4KCk7XG5pbmxpbmUucmVmbGluayA9IGVkaXQoaW5saW5lLnJlZmxpbmspLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lLl9sYWJlbCkucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLm5vbGluayA9IGVkaXQoaW5saW5lLm5vbGluaykucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLnJlZmxpbmtTZWFyY2ggPSBlZGl0KGlubGluZS5yZWZsaW5rU2VhcmNoLCAnZycpLnJlcGxhY2UoJ3JlZmxpbmsnLCBpbmxpbmUucmVmbGluaykucmVwbGFjZSgnbm9saW5rJywgaW5saW5lLm5vbGluaykuZ2V0UmVnZXgoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gX2V4dGVuZHMoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IHtcbiAgICBzdGFydDogL15fX3xcXCpcXCovLFxuICAgIG1pZGRsZTogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gICAgZW5kQXN0OiAvXFwqXFwqKD8hXFwqKS9nLFxuICAgIGVuZFVuZDogL19fKD8hXykvZ1xuICB9LFxuICBlbToge1xuICAgIHN0YXJ0OiAvXl98XFwqLyxcbiAgICBtaWRkbGU6IC9eKClcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKXxeXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXykvLFxuICAgIGVuZEFzdDogL1xcKig/IVxcKikvZyxcbiAgICBlbmRVbmQ6IC9fKD8hXykvZ1xuICB9LFxuICBsaW5rOiBlZGl0KC9eIT9cXFsobGFiZWwpXFxdXFwoKC4qPylcXCkvKS5yZXBsYWNlKCdsYWJlbCcsIGlubGluZS5fbGFiZWwpLmdldFJlZ2V4KCksXG4gIHJlZmxpbms6IGVkaXQoL14hP1xcWyhsYWJlbClcXF1cXHMqXFxbKFteXFxdXSopXFxdLykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gX2V4dGVuZHMoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiBlZGl0KGlubGluZS5lc2NhcGUpLnJlcGxhY2UoJ10pJywgJ358XSknKS5nZXRSZWdleCgpLFxuICBfZXh0ZW5kZWRfZW1haWw6IC9bQS1aYS16MC05Ll8rLV0rKEApW2EtekEtWjAtOS1fXSsoPzpcXC5bYS16QS1aMC05LV9dKlthLXpBLVowLTldKSsoPyFbLV9dKS8sXG4gIHVybDogL14oKD86ZnRwfGh0dHBzPyk6XFwvXFwvfHd3d1xcLikoPzpbYS16QS1aMC05XFwtXStcXC4/KStbXlxcczxdKnxeZW1haWwvLFxuICBfYmFja3BlZGFsOiAvKD86W14/IS4sOjsqXydcIn4oKSZdK3xcXChbXildKlxcKXwmKD8hW2EtekEtWjAtOV0rOyQpfFs/IS4sOjsqXydcIn4pXSsoPyEkKSkrLyxcbiAgZGVsOiAvXih+fj8pKD89W15cXHN+XSkoW1xcc1xcU10qP1teXFxzfl0pXFwxKD89W15+XXwkKS8sXG4gIHRleHQ6IC9eKFtgfl0rfFteYH5dKSg/Oig/PSB7Mix9XFxuKXwoPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApfFtcXHNcXFNdKj8oPzooPz1bXFxcXDwhXFxbYCp+X118XFxiX3xodHRwcz86XFwvXFwvfGZ0cDpcXC9cXC98d3d3XFwufCQpfFteIF0oPz0gezIsfVxcbil8W15hLXpBLVowLTkuISMkJSYnKitcXC89P19ge1xcfH1+LV0oPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApKSkvXG59KTtcbmlubGluZS5nZm0udXJsID0gZWRpdChpbmxpbmUuZ2ZtLnVybCwgJ2knKS5yZXBsYWNlKCdlbWFpbCcsIGlubGluZS5nZm0uX2V4dGVuZGVkX2VtYWlsKS5nZXRSZWdleCgpO1xuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLmdmbSwge1xuICBicjogZWRpdChpbmxpbmUuYnIpLnJlcGxhY2UoJ3syLH0nLCAnKicpLmdldFJlZ2V4KCksXG4gIHRleHQ6IGVkaXQoaW5saW5lLmdmbS50ZXh0KS5yZXBsYWNlKCdcXFxcYl8nLCAnXFxcXGJffCB7Mix9XFxcXG4nKS5yZXBsYWNlKC9cXHsyLFxcfS9nLCAnKicpLmdldFJlZ2V4KClcbn0pO1xuXG4vKipcbiAqIHNtYXJ0eXBhbnRzIHRleHQgcmVwbGFjZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKi9cbmZ1bmN0aW9uIHNtYXJ0eXBhbnRzKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgLy8gZW0tZGFzaGVzXG4gIC5yZXBsYWNlKC8tLS0vZywgXCJcXHUyMDE0XCIpXG4gIC8vIGVuLWRhc2hlc1xuICAucmVwbGFjZSgvLS0vZywgXCJcXHUyMDEzXCIpXG4gIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgXCIkMVxcdTIwMThcIilcbiAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgLnJlcGxhY2UoLycvZywgXCJcXHUyMDE5XCIpXG4gIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgXCIkMVxcdTIwMUNcIilcbiAgLy8gY2xvc2luZyBkb3VibGVzXG4gIC5yZXBsYWNlKC9cIi9nLCBcIlxcdTIwMURcIilcbiAgLy8gZWxsaXBzZXNcbiAgLnJlcGxhY2UoL1xcLnszfS9nLCBcIlxcdTIwMjZcIik7XG59XG5cbi8qKlxuICogbWFuZ2xlIGVtYWlsIGFkZHJlc3Nlc1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqL1xuZnVuY3Rpb24gbWFuZ2xlKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnLFxuICAgIGksXG4gICAgY2g7XG4gIHZhciBsID0gdGV4dC5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG52YXIgTGV4ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2Vucy5saW5rcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbml6ZXIgPSB0aGlzLm9wdGlvbnMudG9rZW5pemVyIHx8IG5ldyBUb2tlbml6ZXIoKTtcbiAgICB0aGlzLnRva2VuaXplciA9IHRoaXMub3B0aW9ucy50b2tlbml6ZXI7XG4gICAgdGhpcy50b2tlbml6ZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLnRva2VuaXplci5sZXhlciA9IHRoaXM7XG4gICAgdGhpcy5pbmxpbmVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbkxpbms6IGZhbHNlLFxuICAgICAgaW5SYXdCbG9jazogZmFsc2UsXG4gICAgICB0b3A6IHRydWVcbiAgICB9O1xuICAgIHZhciBydWxlcyA9IHtcbiAgICAgIGJsb2NrOiBibG9jay5ub3JtYWwsXG4gICAgICBpbmxpbmU6IGlubGluZS5ub3JtYWxcbiAgICB9O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgIHJ1bGVzLmJsb2NrID0gYmxvY2sucGVkYW50aWM7XG4gICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUucGVkYW50aWM7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgICBydWxlcy5ibG9jayA9IGJsb2NrLmdmbTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICAgIHJ1bGVzLmlubGluZSA9IGlubGluZS5icmVha3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUuZ2ZtO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VuaXplci5ydWxlcyA9IHJ1bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBSdWxlc1xuICAgKi9cbiAgLyoqXG4gICAqIFN0YXRpYyBMZXggTWV0aG9kXG4gICAqL1xuICBMZXhlci5sZXggPSBmdW5jdGlvbiBsZXgoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgTGV4IElubGluZSBNZXRob2RcbiAgICovO1xuICBMZXhlci5sZXhJbmxpbmUgPSBmdW5jdGlvbiBsZXhJbmxpbmUoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5pbmxpbmVUb2tlbnMoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwcm9jZXNzaW5nXG4gICAqLztcbiAgdmFyIF9wcm90byA9IExleGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmxleCA9IGZ1bmN0aW9uIGxleChzcmMpIHtcbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJyk7XG4gICAgdGhpcy5ibG9ja1Rva2VucyhzcmMsIHRoaXMudG9rZW5zKTtcbiAgICB2YXIgbmV4dDtcbiAgICB3aGlsZSAobmV4dCA9IHRoaXMuaW5saW5lUXVldWUuc2hpZnQoKSkge1xuICAgICAgdGhpcy5pbmxpbmVUb2tlbnMobmV4dC5zcmMsIG5leHQudG9rZW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIExleGluZ1xuICAgKi87XG4gIF9wcm90by5ibG9ja1Rva2VucyA9IGZ1bmN0aW9uIGJsb2NrVG9rZW5zKHNyYywgdG9rZW5zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFx0L2csICcgICAgJykucmVwbGFjZSgvXiArJC9nbSwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXiggKikoXFx0KykvZ20sIGZ1bmN0aW9uIChfLCBsZWFkaW5nLCB0YWJzKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nICsgJyAgICAnLnJlcGVhdCh0YWJzLmxlbmd0aCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW4sIGN1dFNyYywgbGFzdFBhcmFncmFwaENsaXBwZWQ7XG4gICAgd2hpbGUgKHNyYykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrLnNvbWUoZnVuY3Rpb24gKGV4dFRva2VuaXplcikge1xuICAgICAgICBpZiAodG9rZW4gPSBleHRUb2tlbml6ZXIuY2FsbCh7XG4gICAgICAgICAgbGV4ZXI6IF90aGlzXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBuZXdsaW5lXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5zcGFjZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGlmICh0b2tlbi5yYXcubGVuZ3RoID09PSAxICYmIHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUncyBhIHNpbmdsZSBcXG4gYXMgYSBzcGFjZXIsIGl0J3MgdGVybWluYXRpbmcgdGhlIGxhc3QgbGluZSxcbiAgICAgICAgICAvLyBzbyBtb3ZlIGl0IHRoZXJlIHNvIHRoYXQgd2UgZG9uJ3QgZ2V0IHVuZWNlc3NhcnkgcGFyYWdyYXBoIHRhZ3NcbiAgICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnJhdyArPSAnXFxuJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvZGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmNvZGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBBbiBpbmRlbnRlZCBjb2RlIGJsb2NrIGNhbm5vdCBpbnRlcnJ1cHQgYSBwYXJhZ3JhcGguXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgKGxhc3RUb2tlbi50eXBlID09PSAncGFyYWdyYXBoJyB8fCBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSkge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGZlbmNlc1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZmVuY2VzKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaGVhZGluZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGhyXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5ocihzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGJsb2NrcXVvdGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmJsb2NrcXVvdGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaXN0XG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saXN0KHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHRtbFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaHRtbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlZlxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZGVmKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiAobGFzdFRva2VuLnR5cGUgPT09ICdwYXJhZ3JhcGgnIHx8IGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlW3RoaXMuaW5saW5lUXVldWUubGVuZ3RoIC0gMV0uc3JjID0gbGFzdFRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudG9rZW5zLmxpbmtzW3Rva2VuLnRhZ10pIHtcbiAgICAgICAgICB0aGlzLnRva2Vucy5saW5rc1t0b2tlbi50YWddID0ge1xuICAgICAgICAgICAgaHJlZjogdG9rZW4uaHJlZixcbiAgICAgICAgICAgIHRpdGxlOiB0b2tlbi50aXRsZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYmxlIChnZm0pXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci50YWJsZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGxoZWFkaW5nXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICAgIC8vIHByZXZlbnQgcGFyYWdyYXBoIGNvbnN1bWluZyBleHRlbnNpb25zIGJ5IGNsaXBwaW5nICdzcmMnIHRvIGV4dGVuc2lvbiBzdGFydFxuICAgICAgY3V0U3JjID0gc3JjO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2spIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IEluZmluaXR5O1xuICAgICAgICAgIHZhciB0ZW1wU3JjID0gc3JjLnNsaWNlKDEpO1xuICAgICAgICAgIHZhciB0ZW1wU3RhcnQgPSB2b2lkIDA7XG4gICAgICAgICAgX3RoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2suZm9yRWFjaChmdW5jdGlvbiAoZ2V0U3RhcnRJbmRleCkge1xuICAgICAgICAgICAgdGVtcFN0YXJ0ID0gZ2V0U3RhcnRJbmRleC5jYWxsKHtcbiAgICAgICAgICAgICAgbGV4ZXI6IHRoaXNcbiAgICAgICAgICAgIH0sIHRlbXBTcmMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZW1wU3RhcnQgPT09ICdudW1iZXInICYmIHRlbXBTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4LCB0ZW1wU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzdGFydEluZGV4IDwgSW5maW5pdHkgJiYgc3RhcnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjdXRTcmMgPSBzcmMuc3Vic3RyaW5nKDAsIHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGF0ZS50b3AgJiYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIucGFyYWdyYXBoKGN1dFNyYykpKSB7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0UGFyYWdyYXBoQ2xpcHBlZCAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9ICdcXG4nICsgdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9ICdcXG4nICsgdG9rZW4udGV4dDtcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlLnBvcCgpO1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFBhcmFncmFwaENsaXBwZWQgPSBjdXRTcmMubGVuZ3RoICE9PSBzcmMubGVuZ3RoO1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGV4dFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGV4dChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWUucG9wKCk7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZVt0aGlzLmlubGluZVF1ZXVlLmxlbmd0aCAtIDFdLnNyYyA9IGxhc3RUb2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgdmFyIGVyck1zZyA9ICdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGF0ZS50b3AgPSB0cnVlO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9wcm90by5pbmxpbmUgPSBmdW5jdGlvbiBpbmxpbmUoc3JjLCB0b2tlbnMpIHtcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmlubGluZVF1ZXVlLnB1c2goe1xuICAgICAgc3JjOiBzcmMsXG4gICAgICB0b2tlbnM6IHRva2Vuc1xuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogTGV4aW5nL0NvbXBpbGluZ1xuICAgKi87XG4gIF9wcm90by5pbmxpbmVUb2tlbnMgPSBmdW5jdGlvbiBpbmxpbmVUb2tlbnMoc3JjLCB0b2tlbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbiwgY3V0U3JjO1xuXG4gICAgLy8gU3RyaW5nIHdpdGggbGlua3MgbWFza2VkIHRvIGF2b2lkIGludGVyZmVyZW5jZSB3aXRoIGVtIGFuZCBzdHJvbmdcbiAgICB2YXIgbWFza2VkU3JjID0gc3JjO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIga2VlcFByZXZDaGFyLCBwcmV2Q2hhcjtcblxuICAgIC8vIE1hc2sgb3V0IHJlZmxpbmtzXG4gICAgaWYgKHRoaXMudG9rZW5zLmxpbmtzKSB7XG4gICAgICB2YXIgbGlua3MgPSBPYmplY3Qua2V5cyh0aGlzLnRva2Vucy5saW5rcyk7XG4gICAgICBpZiAobGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gdGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2guZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxpbmtzLmluY2x1ZGVzKG1hdGNoWzBdLnNsaWNlKG1hdGNoWzBdLmxhc3RJbmRleE9mKCdbJykgKyAxLCAtMSkpKSB7XG4gICAgICAgICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2gubGFzdEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWFzayBvdXQgb3RoZXIgYmxvY2tzXG4gICAgd2hpbGUgKChtYXRjaCA9IHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5ibG9ja1NraXAuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmJsb2NrU2tpcC5sYXN0SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIE1hc2sgb3V0IGVzY2FwZWQgZW0gJiBzdHJvbmcgZGVsaW1pdGVyc1xuICAgIHdoaWxlICgobWF0Y2ggPSB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSAyKSArICcrKycgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmVzY2FwZWRFbVN0Lmxhc3RJbmRleCk7XG4gICAgICB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QubGFzdEluZGV4LS07XG4gICAgfVxuICAgIHdoaWxlIChzcmMpIHtcbiAgICAgIGlmICgha2VlcFByZXZDaGFyKSB7XG4gICAgICAgIHByZXZDaGFyID0gJyc7XG4gICAgICB9XG4gICAgICBrZWVwUHJldkNoYXIgPSBmYWxzZTtcblxuICAgICAgLy8gZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmlubGluZSAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5pbmxpbmUuc29tZShmdW5jdGlvbiAoZXh0VG9rZW5pemVyKSB7XG4gICAgICAgIGlmICh0b2tlbiA9IGV4dFRva2VuaXplci5jYWxsKHtcbiAgICAgICAgICBsZXhlcjogX3RoaXMyXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVzY2FwZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGFnKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiB0b2tlbi50eXBlID09PSAndGV4dCcgJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saW5rKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5yZWZsaW5rKHNyYywgdGhpcy50b2tlbnMubGlua3MpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9IHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZW0gJiBzdHJvbmdcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVtU3Ryb25nKHNyYywgbWFza2VkU3JjLCBwcmV2Q2hhcikpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29kZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuY29kZXNwYW4oc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBiclxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuYnIoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWwgKGdmbSlcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmRlbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5hdXRvbGluayhzcmMsIG1hbmdsZSkpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXJsIChnZm0pXG4gICAgICBpZiAoIXRoaXMuc3RhdGUuaW5MaW5rICYmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnVybChzcmMsIG1hbmdsZSkpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRcbiAgICAgIC8vIHByZXZlbnQgaW5saW5lVGV4dCBjb25zdW1pbmcgZXh0ZW5zaW9ucyBieSBjbGlwcGluZyAnc3JjJyB0byBleHRlbnNpb24gc3RhcnRcbiAgICAgIGN1dFNyYyA9IHNyYztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBzdGFydEluZGV4ID0gSW5maW5pdHk7XG4gICAgICAgICAgdmFyIHRlbXBTcmMgPSBzcmMuc2xpY2UoMSk7XG4gICAgICAgICAgdmFyIHRlbXBTdGFydCA9IHZvaWQgMDtcbiAgICAgICAgICBfdGhpczIub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0SW5saW5lLmZvckVhY2goZnVuY3Rpb24gKGdldFN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHRlbXBTdGFydCA9IGdldFN0YXJ0SW5kZXguY2FsbCh7XG4gICAgICAgICAgICAgIGxleGVyOiB0aGlzXG4gICAgICAgICAgICB9LCB0ZW1wU3JjKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGVtcFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0ZW1wU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgICBzdGFydEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCwgdGVtcFN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc3RhcnRJbmRleCA8IEluZmluaXR5ICYmIHN0YXJ0SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY3V0U3JjID0gc3JjLnN1YnN0cmluZygwLCBzdGFydEluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaW5saW5lVGV4dChjdXRTcmMsIHNtYXJ0eXBhbnRzKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBpZiAodG9rZW4ucmF3LnNsaWNlKC0xKSAhPT0gJ18nKSB7XG4gICAgICAgICAgLy8gVHJhY2sgcHJldkNoYXIgYmVmb3JlIHN0cmluZyBvZiBfX19fIHN0YXJ0ZWRcbiAgICAgICAgICBwcmV2Q2hhciA9IHRva2VuLnJhdy5zbGljZSgtMSk7XG4gICAgICAgIH1cbiAgICAgICAga2VlcFByZXZDaGFyID0gdHJ1ZTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIHZhciBlcnJNc2cgPSAnSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhMZXhlciwgbnVsbCwgW3tcbiAgICBrZXk6IFwicnVsZXNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJsb2NrOiBibG9jayxcbiAgICAgICAgaW5saW5lOiBpbmxpbmVcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMZXhlcjtcbn0oKTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG52YXIgUmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBSZW5kZXJlci5wcm90b3R5cGU7XG4gIF9wcm90by5jb2RlID0gZnVuY3Rpb24gY29kZShfY29kZSwgaW5mb3N0cmluZywgZXNjYXBlZCkge1xuICAgIHZhciBsYW5nID0gKGluZm9zdHJpbmcgfHwgJycpLm1hdGNoKC9cXFMqLylbMF07XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KF9jb2RlLCBsYW5nKTtcbiAgICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IF9jb2RlKSB7XG4gICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICBfY29kZSA9IG91dDtcbiAgICAgIH1cbiAgICB9XG4gICAgX2NvZGUgPSBfY29kZS5yZXBsYWNlKC9cXG4kLywgJycpICsgJ1xcbic7XG4gICAgaWYgKCFsYW5nKSB7XG4gICAgICByZXR1cm4gJzxwcmU+PGNvZGU+JyArIChlc2NhcGVkID8gX2NvZGUgOiBlc2NhcGUoX2NvZGUsIHRydWUpKSArICc8L2NvZGU+PC9wcmU+XFxuJztcbiAgICB9XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4ICsgZXNjYXBlKGxhbmcpICsgJ1wiPicgKyAoZXNjYXBlZCA/IF9jb2RlIDogZXNjYXBlKF9jb2RlLCB0cnVlKSkgKyAnPC9jb2RlPjwvcHJlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1b3RlXG4gICAqLztcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHF1b3RlKSB7XG4gICAgcmV0dXJuIFwiPGJsb2NrcXVvdGU+XFxuXCIgKyBxdW90ZSArIFwiPC9ibG9ja3F1b3RlPlxcblwiO1xuICB9O1xuICBfcHJvdG8uaHRtbCA9IGZ1bmN0aW9uIGh0bWwoX2h0bWwpIHtcbiAgICByZXR1cm4gX2h0bWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxldmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByYXdcbiAgICogQHBhcmFtIHthbnl9IHNsdWdnZXJcbiAgICovO1xuICBfcHJvdG8uaGVhZGluZyA9IGZ1bmN0aW9uIGhlYWRpbmcodGV4dCwgbGV2ZWwsIHJhdywgc2x1Z2dlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVySWRzKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4ICsgc2x1Z2dlci5zbHVnKHJhdyk7XG4gICAgICByZXR1cm4gXCI8aFwiICsgbGV2ZWwgKyBcIiBpZD1cXFwiXCIgKyBpZCArIFwiXFxcIj5cIiArIHRleHQgKyBcIjwvaFwiICsgbGV2ZWwgKyBcIj5cXG5cIjtcbiAgICB9XG5cbiAgICAvLyBpZ25vcmUgSURzXG4gICAgcmV0dXJuIFwiPGhcIiArIGxldmVsICsgXCI+XCIgKyB0ZXh0ICsgXCI8L2hcIiArIGxldmVsICsgXCI+XFxuXCI7XG4gIH07XG4gIF9wcm90by5ociA9IGZ1bmN0aW9uIGhyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3QoYm9keSwgb3JkZXJlZCwgc3RhcnQpIHtcbiAgICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJyxcbiAgICAgIHN0YXJ0YXR0ID0gb3JkZXJlZCAmJiBzdGFydCAhPT0gMSA/ICcgc3RhcnQ9XCInICsgc3RhcnQgKyAnXCInIDogJyc7XG4gICAgcmV0dXJuICc8JyArIHR5cGUgKyBzdGFydGF0dCArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5saXN0aXRlbSA9IGZ1bmN0aW9uIGxpc3RpdGVtKHRleHQpIHtcbiAgICByZXR1cm4gXCI8bGk+XCIgKyB0ZXh0ICsgXCI8L2xpPlxcblwiO1xuICB9O1xuICBfcHJvdG8uY2hlY2tib3ggPSBmdW5jdGlvbiBjaGVja2JveChjaGVja2VkKSB7XG4gICAgcmV0dXJuICc8aW5wdXQgJyArIChjaGVja2VkID8gJ2NoZWNrZWQ9XCJcIiAnIDogJycpICsgJ2Rpc2FibGVkPVwiXCIgdHlwZT1cImNoZWNrYm94XCInICsgKHRoaXMub3B0aW9ucy54aHRtbCA/ICcgLycgOiAnJykgKyAnPiAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaCh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPHA+XCIgKyB0ZXh0ICsgXCI8L3A+XFxuXCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuICAgKi87XG4gIF9wcm90by50YWJsZSA9IGZ1bmN0aW9uIHRhYmxlKGhlYWRlciwgYm9keSkge1xuICAgIGlmIChib2R5KSBib2R5ID0gXCI8dGJvZHk+XCIgKyBib2R5ICsgXCI8L3Rib2R5PlwiO1xuICAgIHJldHVybiAnPHRhYmxlPlxcbicgKyAnPHRoZWFkPlxcbicgKyBoZWFkZXIgKyAnPC90aGVhZD5cXG4nICsgYm9keSArICc8L3RhYmxlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovO1xuICBfcHJvdG8udGFibGVyb3cgPSBmdW5jdGlvbiB0YWJsZXJvdyhjb250ZW50KSB7XG4gICAgcmV0dXJuIFwiPHRyPlxcblwiICsgY29udGVudCArIFwiPC90cj5cXG5cIjtcbiAgfTtcbiAgX3Byb3RvLnRhYmxlY2VsbCA9IGZ1bmN0aW9uIHRhYmxlY2VsbChjb250ZW50LCBmbGFncykge1xuICAgIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gICAgdmFyIHRhZyA9IGZsYWdzLmFsaWduID8gXCI8XCIgKyB0eXBlICsgXCIgYWxpZ249XFxcIlwiICsgZmxhZ3MuYWxpZ24gKyBcIlxcXCI+XCIgOiBcIjxcIiArIHR5cGUgKyBcIj5cIjtcbiAgICByZXR1cm4gdGFnICsgY29udGVudCArIChcIjwvXCIgKyB0eXBlICsgXCI+XFxuXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNwYW4gbGV2ZWwgcmVuZGVyZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uc3Ryb25nID0gZnVuY3Rpb24gc3Ryb25nKHRleHQpIHtcbiAgICByZXR1cm4gXCI8c3Ryb25nPlwiICsgdGV4dCArIFwiPC9zdHJvbmc+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPGVtPlwiICsgdGV4dCArIFwiPC9lbT5cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gXCI8Y29kZT5cIiArIHRleHQgKyBcIjwvY29kZT5cIjtcbiAgfTtcbiAgX3Byb3RvLmJyID0gZnVuY3Rpb24gYnIoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHRleHQpIHtcbiAgICByZXR1cm4gXCI8ZGVsPlwiICsgdGV4dCArIFwiPC9kZWw+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5pbWFnZSA9IGZ1bmN0aW9uIGltYWdlKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9IFwiPGltZyBzcmM9XFxcIlwiICsgaHJlZiArIFwiXFxcIiBhbHQ9XFxcIlwiICsgdGV4dCArIFwiXFxcIlwiO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9IFwiIHRpdGxlPVxcXCJcIiArIHRpdGxlICsgXCJcXFwiXCI7XG4gICAgfVxuICAgIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgcmV0dXJuIFJlbmRlcmVyO1xufSgpO1xuXG4vKipcbiAqIFRleHRSZW5kZXJlclxuICogcmV0dXJucyBvbmx5IHRoZSB0ZXh0dWFsIHBhcnQgb2YgdGhlIHRva2VuXG4gKi9cbnZhciBUZXh0UmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUZXh0UmVuZGVyZXIoKSB7fVxuICB2YXIgX3Byb3RvID0gVGV4dFJlbmRlcmVyLnByb3RvdHlwZTtcbiAgLy8gbm8gbmVlZCBmb3IgYmxvY2sgbGV2ZWwgcmVuZGVyZXJzXG4gIF9wcm90by5zdHJvbmcgPSBmdW5jdGlvbiBzdHJvbmcodGV4dCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmRlbCA9IGZ1bmN0aW9uIGRlbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgcmV0dXJuICcnICsgdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmltYWdlID0gZnVuY3Rpb24gaW1hZ2UoaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgICByZXR1cm4gJycgKyB0ZXh0O1xuICB9O1xuICBfcHJvdG8uYnIgPSBmdW5jdGlvbiBicigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH07XG4gIHJldHVybiBUZXh0UmVuZGVyZXI7XG59KCk7XG5cbi8qKlxuICogU2x1Z2dlciBnZW5lcmF0ZXMgaGVhZGVyIGlkXG4gKi9cbnZhciBTbHVnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2x1Z2dlcigpIHtcbiAgICB0aGlzLnNlZW4gPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHZhciBfcHJvdG8gPSBTbHVnZ2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKVxuICAgIC8vIHJlbW92ZSBodG1sIHRhZ3NcbiAgICAucmVwbGFjZSgvPFshXFwvYS16XS4qPz4vaWcsICcnKVxuICAgIC8vIHJlbW92ZSB1bndhbnRlZCBjaGFyc1xuICAgIC5yZXBsYWNlKC9bXFx1MjAwMC1cXHUyMDZGXFx1MkUwMC1cXHUyRTdGXFxcXCchXCIjJCUmKCkqKywuLzo7PD0+P0BbXFxdXmB7fH1+XS9nLCAnJykucmVwbGFjZSgvXFxzL2csICctJyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG5leHQgc2FmZSAodW5pcXVlKSBzbHVnIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxTbHVnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEcnlSdW5cbiAgICovO1xuICBfcHJvdG8uZ2V0TmV4dFNhZmVTbHVnID0gZnVuY3Rpb24gZ2V0TmV4dFNhZmVTbHVnKG9yaWdpbmFsU2x1ZywgaXNEcnlSdW4pIHtcbiAgICB2YXIgc2x1ZyA9IG9yaWdpbmFsU2x1ZztcbiAgICB2YXIgb2NjdXJlbmNlQWNjdW11bGF0b3IgPSAwO1xuICAgIGlmICh0aGlzLnNlZW4uaGFzT3duUHJvcGVydHkoc2x1ZykpIHtcbiAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yID0gdGhpcy5zZWVuW29yaWdpbmFsU2x1Z107XG4gICAgICBkbyB7XG4gICAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yKys7XG4gICAgICAgIHNsdWcgPSBvcmlnaW5hbFNsdWcgKyAnLScgKyBvY2N1cmVuY2VBY2N1bXVsYXRvcjtcbiAgICAgIH0gd2hpbGUgKHRoaXMuc2Vlbi5oYXNPd25Qcm9wZXJ0eShzbHVnKSk7XG4gICAgfVxuICAgIGlmICghaXNEcnlSdW4pIHtcbiAgICAgIHRoaXMuc2VlbltvcmlnaW5hbFNsdWddID0gb2NjdXJlbmNlQWNjdW11bGF0b3I7XG4gICAgICB0aGlzLnNlZW5bc2x1Z10gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gc2x1ZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHN0cmluZyB0byB1bmlxdWUgaWRcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRyeXJ1bl0gR2VuZXJhdGVzIHRoZSBuZXh0IHVuaXF1ZSBzbHVnIHdpdGhvdXRcbiAgICogdXBkYXRpbmcgdGhlIGludGVybmFsIGFjY3VtdWxhdG9yLlxuICAgKi87XG4gIF9wcm90by5zbHVnID0gZnVuY3Rpb24gc2x1Zyh2YWx1ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdmFyIHNsdWcgPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFNhZmVTbHVnKHNsdWcsIG9wdGlvbnMuZHJ5cnVuKTtcbiAgfTtcbiAgcmV0dXJuIFNsdWdnZXI7XG59KCk7XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG52YXIgUGFyc2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcigpO1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gICAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMudGV4dFJlbmRlcmVyID0gbmV3IFRleHRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2x1Z2dlciA9IG5ldyBTbHVnZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICAgKi9cbiAgUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBQYXJzZSBJbmxpbmUgTWV0aG9kXG4gICAqLztcbiAgUGFyc2VyLnBhcnNlSW5saW5lID0gZnVuY3Rpb24gcGFyc2VJbmxpbmUodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZUlubGluZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIExvb3BcbiAgICovO1xuICB2YXIgX3Byb3RvID0gUGFyc2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCB0b3ApIHtcbiAgICBpZiAodG9wID09PSB2b2lkIDApIHtcbiAgICAgIHRvcCA9IHRydWU7XG4gICAgfVxuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgayxcbiAgICAgIGwyLFxuICAgICAgbDMsXG4gICAgICByb3csXG4gICAgICBjZWxsLFxuICAgICAgaGVhZGVyLFxuICAgICAgYm9keSxcbiAgICAgIHRva2VuLFxuICAgICAgb3JkZXJlZCxcbiAgICAgIHN0YXJ0LFxuICAgICAgbG9vc2UsXG4gICAgICBpdGVtQm9keSxcbiAgICAgIGl0ZW0sXG4gICAgICBjaGVja2VkLFxuICAgICAgdGFzayxcbiAgICAgIGNoZWNrYm94LFxuICAgICAgcmV0O1xuICAgIHZhciBsID0gdG9rZW5zLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gUnVuIGFueSByZW5kZXJlciBleHRlbnNpb25zXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVyc1t0b2tlbi50eXBlXSkge1xuICAgICAgICByZXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0uY2FsbCh7XG4gICAgICAgICAgcGFyc2VyOiB0aGlzXG4gICAgICAgIH0sIHRva2VuKTtcbiAgICAgICAgaWYgKHJldCAhPT0gZmFsc2UgfHwgIVsnc3BhY2UnLCAnaHInLCAnaGVhZGluZycsICdjb2RlJywgJ3RhYmxlJywgJ2Jsb2NrcXVvdGUnLCAnbGlzdCcsICdodG1sJywgJ3BhcmFncmFwaCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhlYWRpbmcodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMpLCB0b2tlbi5kZXB0aCwgdW5lc2NhcGUodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHRoaXMudGV4dFJlbmRlcmVyKSksIHRoaXMuc2x1Z2dlcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGUodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgdG9rZW4uZXNjYXBlZCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBoZWFkZXIgPSAnJztcblxuICAgICAgICAgICAgLy8gaGVhZGVyXG4gICAgICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLmhlYWRlci5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDI7IGorKykge1xuICAgICAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKHRoaXMucGFyc2VJbmxpbmUodG9rZW4uaGVhZGVyW2pdLnRva2VucyksIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2pdXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICAgICAgICBib2R5ID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGwyOyBqKyspIHtcbiAgICAgICAgICAgICAgcm93ID0gdG9rZW4ucm93c1tqXTtcbiAgICAgICAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICAgICAgICBsMyA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBsMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbCh0aGlzLnBhcnNlSW5saW5lKHJvd1trXS50b2tlbnMpLCB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2tdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYmxvY2txdW90ZSc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgYm9keSA9IHRoaXMucGFyc2UodG9rZW4udG9rZW5zKTtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9yZGVyZWQgPSB0b2tlbi5vcmRlcmVkO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgIGxvb3NlID0gdG9rZW4ubG9vc2U7XG4gICAgICAgICAgICBsMiA9IHRva2VuLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJvZHkgPSAnJztcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsMjsgaisrKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSB0b2tlbi5pdGVtc1tqXTtcbiAgICAgICAgICAgICAgY2hlY2tlZCA9IGl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgdGFzayA9IGl0ZW0udGFzaztcbiAgICAgICAgICAgICAgaXRlbUJvZHkgPSAnJztcbiAgICAgICAgICAgICAgaWYgKGl0ZW0udGFzaykge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94ID0gdGhpcy5yZW5kZXJlci5jaGVja2JveChjaGVja2VkKTtcbiAgICAgICAgICAgICAgICBpZiAobG9vc2UpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vucy5sZW5ndGggPiAwICYmIGl0ZW0udG9rZW5zWzBdLnR5cGUgPT09ICdwYXJhZ3JhcGgnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRleHQgPSBjaGVja2JveCArICcgJyArIGl0ZW0udG9rZW5zWzBdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vuc1swXS50b2tlbnMgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zLmxlbmd0aCA+IDAgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zWzBdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRva2Vuc1swXS50ZXh0ID0gY2hlY2tib3ggKyAnICcgKyBpdGVtLnRva2Vuc1swXS50b2tlbnNbMF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50b2tlbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpdGVtQm9keSArPSBjaGVja2JveDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaXRlbUJvZHkgKz0gdGhpcy5wYXJzZShpdGVtLnRva2VucywgbG9vc2UpO1xuICAgICAgICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oaXRlbUJvZHksIHRhc2ssIGNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkLCBzdGFydCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRPRE8gcGFyc2UgaW5saW5lIGNvbnRlbnQgaWYgcGFyYW1ldGVyIG1hcmtkb3duPTFcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJvZHkgPSB0b2tlbi50b2tlbnMgPyB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucykgOiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgd2hpbGUgKGkgKyAxIDwgbCAmJiB0b2tlbnNbaSArIDFdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgICBib2R5ICs9ICdcXG4nICsgKHRva2VuLnRva2VucyA/IHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSA6IHRva2VuLnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRvcCA/IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKGJvZHkpIDogYm9keTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyTXNnID0gJ1Rva2VuIHdpdGggXCInICsgdG9rZW4udHlwZSArICdcIiB0eXBlIHdhcyBub3QgZm91bmQuJztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIElubGluZSBUb2tlbnNcbiAgICovO1xuICBfcHJvdG8ucGFyc2VJbmxpbmUgPSBmdW5jdGlvbiBwYXJzZUlubGluZSh0b2tlbnMsIHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIgPSByZW5kZXJlciB8fCB0aGlzLnJlbmRlcmVyO1xuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICB0b2tlbixcbiAgICAgIHJldDtcbiAgICB2YXIgbCA9IHRva2Vucy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIC8vIFJ1biBhbnkgcmVuZGVyZXIgZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVycyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgcmV0ID0gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzW3Rva2VuLnR5cGVdLmNhbGwoe1xuICAgICAgICAgIHBhcnNlcjogdGhpc1xuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIGlmIChyZXQgIT09IGZhbHNlIHx8ICFbJ2VzY2FwZScsICdodG1sJywgJ2xpbmsnLCAnaW1hZ2UnLCAnc3Ryb25nJywgJ2VtJywgJ2NvZGVzcGFuJywgJ2JyJywgJ2RlbCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZXNjYXBlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIudGV4dCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5saW5rKHRva2VuLmhyZWYsIHRva2VuLnRpdGxlLCB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5pbWFnZSh0b2tlbi5ocmVmLCB0b2tlbi50aXRsZSwgdG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N0cm9uZyc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLnN0cm9uZyh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnZW0nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5lbSh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29kZXNwYW4nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5jb2Rlc3Bhbih0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYnInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5icigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdkZWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5kZWwodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHJlbmRlcmVyKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci50ZXh0KHRva2VuLnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJNc2cgPSAnVG9rZW4gd2l0aCBcIicgKyB0b2tlbi50eXBlICsgJ1wiIHR5cGUgd2FzIG5vdCBmb3VuZC4nO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIHJldHVybiBQYXJzZXI7XG59KCk7XG5cbnZhciBIb29rcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEhvb2tzKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gIH1cbiAgdmFyIF9wcm90byA9IEhvb2tzLnByb3RvdHlwZTtcbiAgLyoqXG4gICAqIFByb2Nlc3MgbWFya2Rvd24gYmVmb3JlIG1hcmtlZFxuICAgKi9cbiAgX3Byb3RvLnByZXByb2Nlc3MgPSBmdW5jdGlvbiBwcmVwcm9jZXNzKG1hcmtkb3duKSB7XG4gICAgcmV0dXJuIG1hcmtkb3duO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgSFRNTCBhZnRlciBtYXJrZWQgaXMgZmluaXNoZWRcbiAgICovO1xuICBfcHJvdG8ucG9zdHByb2Nlc3MgPSBmdW5jdGlvbiBwb3N0cHJvY2VzcyhodG1sKSB7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG4gIHJldHVybiBIb29rcztcbn0oKTtcbkhvb2tzLnBhc3NUaHJvdWdoSG9va3MgPSBuZXcgU2V0KFsncHJlcHJvY2VzcycsICdwb3N0cHJvY2VzcyddKTtcblxuZnVuY3Rpb24gb25FcnJvcihzaWxlbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWFya2VkanMvbWFya2VkLic7XG4gICAgaWYgKHNpbGVudCkge1xuICAgICAgdmFyIG1zZyA9ICc8cD5BbiBlcnJvciBvY2N1cnJlZDo8L3A+PHByZT4nICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKSArICc8L3ByZT4nO1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobXNnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBtc2cpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlTWFya2Rvd24obGV4ZXIsIHBhcnNlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuICAgIHZhciBvcmlnT3B0ID0gX2V4dGVuZHMoe30sIG9wdCk7XG4gICAgb3B0ID0gX2V4dGVuZHMoe30sIG1hcmtlZC5kZWZhdWx0cywgb3JpZ09wdCk7XG4gICAgdmFyIHRocm93RXJyb3IgPSBvbkVycm9yKG9wdC5zaWxlbnQsIG9wdC5hc3luYywgY2FsbGJhY2spO1xuXG4gICAgLy8gdGhyb3cgZXJyb3IgaW4gY2FzZSBvZiBub24gc3RyaW5nIGlucHV0XG4gICAgaWYgKHR5cGVvZiBzcmMgPT09ICd1bmRlZmluZWQnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdtYXJrZWQoKTogaW5wdXQgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZCBvciBudWxsJykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyBvZiB0eXBlICcgKyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3JjKSArICcsIHN0cmluZyBleHBlY3RlZCcpKTtcbiAgICB9XG4gICAgY2hlY2tTYW5pdGl6ZURlcHJlY2F0aW9uKG9wdCk7XG4gICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgb3B0Lmhvb2tzLm9wdGlvbnMgPSBvcHQ7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHQ7XG4gICAgICB2YXIgdG9rZW5zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgICAgIHNyYyA9IG9wdC5ob29rcy5wcmVwcm9jZXNzKHNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH1cbiAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgdmFyIG91dDtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKHRva2Vucywgb3B0LndhbGtUb2tlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ID0gcGFyc2VyKHRva2Vucywgb3B0KTtcbiAgICAgICAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgICAgICAgb3V0ID0gb3B0Lmhvb2tzLnBvc3Rwcm9jZXNzKG91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGVyciA/IHRocm93RXJyb3IoZXJyKSA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgICB9O1xuICAgICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuICAgICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4gZG9uZSgpO1xuICAgICAgdmFyIHBlbmRpbmcgPSAwO1xuICAgICAgbWFya2VkLndhbGtUb2tlbnModG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgIHBlbmRpbmcrKztcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbiAoZXJyLCBjb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjb2RlICE9IG51bGwgJiYgY29kZSAhPT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgICAgICAgaWYgKHBlbmRpbmcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChwZW5kaW5nID09PSAwKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdC5hc3luYykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvcHQuaG9va3MgPyBvcHQuaG9va3MucHJlcHJvY2VzcyhzcmMpIDogc3JjKS50aGVuKGZ1bmN0aW9uIChzcmMpIHtcbiAgICAgICAgcmV0dXJuIGxleGVyKHNyYywgb3B0KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICByZXR1cm4gb3B0LndhbGtUb2tlbnMgPyBQcm9taXNlLmFsbChtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbnMsIG9wdC53YWxrVG9rZW5zKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfSkgOiB0b2tlbnM7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlcih0b2tlbnMsIG9wdCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgIHJldHVybiBvcHQuaG9va3MgPyBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCkgOiBodG1sO1xuICAgICAgfSlbXCJjYXRjaFwiXSh0aHJvd0Vycm9yKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgc3JjID0gb3B0Lmhvb2tzLnByZXByb2Nlc3Moc3JjKTtcbiAgICAgIH1cbiAgICAgIHZhciBfdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKF90b2tlbnMsIG9wdC53YWxrVG9rZW5zKTtcbiAgICAgIH1cbiAgICAgIHZhciBodG1sID0gcGFyc2VyKF90b2tlbnMsIG9wdCk7XG4gICAgICBpZiAob3B0Lmhvb2tzKSB7XG4gICAgICAgIGh0bWwgPSBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogTWFya2VkXG4gKi9cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHBhcnNlTWFya2Rvd24oTGV4ZXIubGV4LCBQYXJzZXIucGFyc2UpKHNyYywgb3B0LCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID0gbWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0KSB7XG4gIG1hcmtlZC5kZWZhdWx0cyA9IF9leHRlbmRzKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIGNoYW5nZURlZmF1bHRzKG1hcmtlZC5kZWZhdWx0cyk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xubWFya2VkLmdldERlZmF1bHRzID0gZ2V0RGVmYXVsdHM7XG5tYXJrZWQuZGVmYXVsdHMgPSBleHBvcnRzLmRlZmF1bHRzO1xuXG4vKipcbiAqIFVzZSBFeHRlbnNpb25cbiAqL1xuXG5tYXJrZWQudXNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZXh0ZW5zaW9ucyA9IG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zIHx8IHtcbiAgICByZW5kZXJlcnM6IHt9LFxuICAgIGNoaWxkVG9rZW5zOiB7fVxuICB9O1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAocGFjaykge1xuICAgIC8vIGNvcHkgb3B0aW9ucyB0byBuZXcgb2JqZWN0XG4gICAgdmFyIG9wdHMgPSBfZXh0ZW5kcyh7fSwgcGFjayk7XG5cbiAgICAvLyBzZXQgYXN5bmMgdG8gdHJ1ZSBpZiBpdCB3YXMgc2V0IHRvIHRydWUgYmVmb3JlXG4gICAgb3B0cy5hc3luYyA9IG1hcmtlZC5kZWZhdWx0cy5hc3luYyB8fCBvcHRzLmFzeW5jIHx8IGZhbHNlO1xuXG4gICAgLy8gPT0tLSBQYXJzZSBcImFkZG9uXCIgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2suZXh0ZW5zaW9ucykge1xuICAgICAgcGFjay5leHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dCkge1xuICAgICAgICBpZiAoIWV4dC5uYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHRlbnNpb24gbmFtZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHQucmVuZGVyZXIpIHtcbiAgICAgICAgICAvLyBSZW5kZXJlciBleHRlbnNpb25zXG4gICAgICAgICAgdmFyIHByZXZSZW5kZXJlciA9IGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXTtcbiAgICAgICAgICBpZiAocHJldlJlbmRlcmVyKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGV4dGVuc2lvbiB3aXRoIGZ1bmMgdG8gcnVuIG5ldyBleHRlbnNpb24gYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgICAgZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IGV4dC5yZW5kZXJlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2UmVuZGVyZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXSA9IGV4dC5yZW5kZXJlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dC50b2tlbml6ZXIpIHtcbiAgICAgICAgICAvLyBUb2tlbml6ZXIgRXh0ZW5zaW9uc1xuICAgICAgICAgIGlmICghZXh0LmxldmVsIHx8IGV4dC5sZXZlbCAhPT0gJ2Jsb2NrJyAmJiBleHQubGV2ZWwgIT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleHRlbnNpb24gbGV2ZWwgbXVzdCBiZSAnYmxvY2snIG9yICdpbmxpbmUnXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uc1tleHQubGV2ZWxdKSB7XG4gICAgICAgICAgICBleHRlbnNpb25zW2V4dC5sZXZlbF0udW5zaGlmdChleHQudG9rZW5pemVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5zaW9uc1tleHQubGV2ZWxdID0gW2V4dC50b2tlbml6ZXJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0LnN0YXJ0KSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbiB0byBjaGVjayBmb3Igc3RhcnQgb2YgdG9rZW5cbiAgICAgICAgICAgIGlmIChleHQubGV2ZWwgPT09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuc3RhcnRCbG9jaykge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRCbG9jay5wdXNoKGV4dC5zdGFydCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9ucy5zdGFydEJsb2NrID0gW2V4dC5zdGFydF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXh0LmxldmVsID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUucHVzaChleHQuc3RhcnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUgPSBbZXh0LnN0YXJ0XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0LmNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgLy8gQ2hpbGQgdG9rZW5zIHRvIGJlIHZpc2l0ZWQgYnkgd2Fsa1Rva2Vuc1xuICAgICAgICAgIGV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbZXh0Lm5hbWVdID0gZXh0LmNoaWxkVG9rZW5zO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9wdHMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBcIm92ZXJ3cml0ZVwiIGV4dGVuc2lvbnMgLS09PSAvL1xuICAgIGlmIChwYWNrLnJlbmRlcmVyKSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSBtYXJrZWQuZGVmYXVsdHMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyKCk7XG4gICAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlJlbmRlcmVyID0gcmVuZGVyZXJbcHJvcF07XG4gICAgICAgICAgLy8gUmVwbGFjZSByZW5kZXJlciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHJlbmRlcmVyW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLnJlbmRlcmVyW3Byb3BdLmFwcGx5KHJlbmRlcmVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZSZW5kZXJlci5hcHBseShyZW5kZXJlciwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFjay5yZW5kZXJlcikge1xuICAgICAgICAgIF9sb29wKHByb3ApO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGlmIChwYWNrLnRva2VuaXplcikge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuaXplciA9IG1hcmtlZC5kZWZhdWx0cy50b2tlbml6ZXIgfHwgbmV3IFRva2VuaXplcigpO1xuICAgICAgICB2YXIgX2xvb3AyID0gZnVuY3Rpb24gX2xvb3AyKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlRva2VuaXplciA9IHRva2VuaXplcltwcm9wXTtcbiAgICAgICAgICAvLyBSZXBsYWNlIHRva2VuaXplciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHRva2VuaXplcltwcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmV0ID0gcGFjay50b2tlbml6ZXJbcHJvcF0uYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZUb2tlbml6ZXIuYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwYWNrLnRva2VuaXplcikge1xuICAgICAgICAgIF9sb29wMihwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLnRva2VuaXplciA9IHRva2VuaXplcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBIb29rcyBleHRlbnNpb25zIC0tPT0gLy9cbiAgICBpZiAocGFjay5ob29rcykge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhvb2tzID0gbWFya2VkLmRlZmF1bHRzLmhvb2tzIHx8IG5ldyBIb29rcygpO1xuICAgICAgICB2YXIgX2xvb3AzID0gZnVuY3Rpb24gX2xvb3AzKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldkhvb2sgPSBob29rc1twcm9wXTtcbiAgICAgICAgICBpZiAoSG9va3MucGFzc1Rocm91Z2hIb29rcy5oYXMocHJvcCkpIHtcbiAgICAgICAgICAgIGhvb2tzW3Byb3BdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYWNrLmhvb2tzW3Byb3BdLmNhbGwoaG9va3MsIGFyZykpLnRoZW4oZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IHBhY2suaG9va3NbcHJvcF0uY2FsbChob29rcywgYXJnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob29rc1twcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLmhvb2tzW3Byb3BdLmFwcGx5KGhvb2tzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2SG9vay5hcHBseShob29rcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhY2suaG9va3MpIHtcbiAgICAgICAgICBfbG9vcDMocHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cy5ob29rcyA9IGhvb2tzO1xuICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICAvLyA9PS0tIFBhcnNlIFdhbGtUb2tlbnMgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2sud2Fsa1Rva2Vucykge1xuICAgICAgdmFyIF93YWxrVG9rZW5zID0gbWFya2VkLmRlZmF1bHRzLndhbGtUb2tlbnM7XG4gICAgICBvcHRzLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICB2YWx1ZXMucHVzaChwYWNrLndhbGtUb2tlbnMuY2FsbCh0aGlzLCB0b2tlbikpO1xuICAgICAgICBpZiAoX3dhbGtUb2tlbnMpIHtcbiAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KF93YWxrVG9rZW5zLmNhbGwodGhpcywgdG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfTtcbiAgICB9XG4gICAgbWFya2VkLnNldE9wdGlvbnMob3B0cyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSdW4gY2FsbGJhY2sgZm9yIGV2ZXJ5IHRva2VuXG4gKi9cblxubWFya2VkLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCBjYWxsYmFjaykge1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBfbG9vcDQgPSBmdW5jdGlvbiBfbG9vcDQoKSB7XG4gICAgdmFyIHRva2VuID0gX3N0ZXAudmFsdWU7XG4gICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChjYWxsYmFjay5jYWxsKG1hcmtlZCwgdG9rZW4pKTtcbiAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLmhlYWRlciksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnMoY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLnJvd3MpLCBfc3RlcDM7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMygpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHJvdyA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHJvdyksIF9zdGVwNDsgIShfc3RlcDQgPSBfaXRlcmF0b3I0KCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBfY2VsbCA9IF9zdGVwNC52YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChtYXJrZWQud2Fsa1Rva2VucyhfY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdsaXN0JzpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4uaXRlbXMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgICAgIC8vIFdhbGsgYW55IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zLmNoaWxkVG9rZW5zW3Rva2VuLnR5cGVdLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW5bY2hpbGRUb2tlbnNdLCBjYWxsYmFjaykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50b2tlbnMpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4udG9rZW5zLCBjYWxsYmFjaykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSh0b2tlbnMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgIF9sb29wNCgpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59O1xuXG4vKipcbiAqIFBhcnNlIElubGluZVxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICovXG5tYXJrZWQucGFyc2VJbmxpbmUgPSBwYXJzZU1hcmtkb3duKExleGVyLmxleElubGluZSwgUGFyc2VyLnBhcnNlSW5saW5lKTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcbm1hcmtlZC5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcbm1hcmtlZC5Ub2tlbml6ZXIgPSBUb2tlbml6ZXI7XG5tYXJrZWQuU2x1Z2dlciA9IFNsdWdnZXI7XG5tYXJrZWQuSG9va3MgPSBIb29rcztcbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcbnZhciBvcHRpb25zID0gbWFya2VkLm9wdGlvbnM7XG52YXIgc2V0T3B0aW9ucyA9IG1hcmtlZC5zZXRPcHRpb25zO1xudmFyIHVzZSA9IG1hcmtlZC51c2U7XG52YXIgd2Fsa1Rva2VucyA9IG1hcmtlZC53YWxrVG9rZW5zO1xudmFyIHBhcnNlSW5saW5lID0gbWFya2VkLnBhcnNlSW5saW5lO1xudmFyIHBhcnNlID0gbWFya2VkO1xudmFyIHBhcnNlciA9IFBhcnNlci5wYXJzZTtcbnZhciBsZXhlciA9IExleGVyLmxleDtcblxuZXhwb3J0cy5Ib29rcyA9IEhvb2tzO1xuZXhwb3J0cy5MZXhlciA9IExleGVyO1xuZXhwb3J0cy5QYXJzZXIgPSBQYXJzZXI7XG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5leHBvcnRzLlNsdWdnZXIgPSBTbHVnZ2VyO1xuZXhwb3J0cy5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5leHBvcnRzLlRva2VuaXplciA9IFRva2VuaXplcjtcbmV4cG9ydHMuZ2V0RGVmYXVsdHMgPSBnZXREZWZhdWx0cztcbmV4cG9ydHMubGV4ZXIgPSBsZXhlcjtcbmV4cG9ydHMubWFya2VkID0gbWFya2VkO1xuZXhwb3J0cy5vcHRpb25zID0gb3B0aW9ucztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMucGFyc2VJbmxpbmUgPSBwYXJzZUlubGluZTtcbmV4cG9ydHMucGFyc2VyID0gcGFyc2VyO1xuZXhwb3J0cy5zZXRPcHRpb25zID0gc2V0T3B0aW9ucztcbmV4cG9ydHMudXNlID0gdXNlO1xuZXhwb3J0cy53YWxrVG9rZW5zID0gd2Fsa1Rva2VucztcbiIsICJjb25zdCB7IG1hcmtlZCB9ID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbm1hcmtlZC5zZXRPcHRpb25zKHsgYnJlYWtzOiB0cnVlLCBzbWFydHlQYW50czogdHJ1ZSB9KTtcblxuY2xhc3MgSjJNIHtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEhUTUwgKGp1c3QgYSB3cmFwcGVyIHRvIE1hcmtlZCdzIHBhcnNlIG1ldGhvZCkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFN0cmluZyB0byBjb252ZXJ0IGZyb20gTWFya2Rvd24gdG8gSFRNTFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyBtZF90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKHN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBKaXJhIFdpa2kgc3RyaW5nIGludG8gSFRNTC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gU3RyaW5nIHRvIGNvbnZlcnQgZnJvbSBKaXJhIFdpa2kgc3ludGF4IHRvIEhUTUxcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgamlyYV90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKEoyTS50b19tYXJrZG93bihzdHIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEppcmEgV2lraSBzdHJpbmcgaW50byBNYXJrZG93bi5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gSmlyYSBXaWtpIHN0cmluZyB0byBjb252ZXJ0IHRvIE1hcmtkb3duXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIE1hcmtkb3duIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyB0b19tYXJrZG93bihzdHIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHN0clxuICAgICAgICAgICAgICAgIC8vIFVuLU9yZGVyZWQgTGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlsgXFx0XSooXFwqKylcXHMrL2dtLCAobWF0Y2gsIHN0YXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtBcnJheShzdGFycy5sZW5ndGgpLmpvaW4oJyAgJyl9KiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3JkZXJlZCBsaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigjKylcXHMrL2dtLCAobWF0Y2gsIG51bXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KG51bXMubGVuZ3RoKS5qb2luKCcgICAnKX0xLiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gSGVhZGVycyAxLTZcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXmgoWzAtNl0pXFwuKC4qKSQvZ20sIChtYXRjaCwgbGV2ZWwsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHBhcnNlSW50KGxldmVsLCAxMCkgKyAxKS5qb2luKCcjJykgKyBjb250ZW50O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gQm9sZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCooXFxTLiopXFwqL2csICcqKiQxKionKVxuICAgICAgICAgICAgICAgIC8vIEl0YWxpY1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fKFxcUy4qKV8vZywgJyokMSonKVxuICAgICAgICAgICAgICAgIC8vIE1vbm9zcGFjZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtcXHsoW159XSspXFx9XFx9L2csICdgJDFgJylcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMgKGJ1Z2d5KVxuICAgICAgICAgICAgICAgIC8vIC5yZXBsYWNlKC9cXD9cXD8oKD86LlteP118W14/XS4pKylcXD9cXD8vZywgJzxjaXRlPiQxPC9jaXRlPicpXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsoW14rXSopXFwrL2csICc8aW5zPiQxPC9pbnM+JylcbiAgICAgICAgICAgICAgICAvLyBTdXBlcnNjcmlwdFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXF4oW15eXSopXFxeL2csICc8c3VwPiQxPC9zdXA+JylcbiAgICAgICAgICAgICAgICAvLyBTdWJzY3JpcHRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvfihbXn5dKil+L2csICc8c3ViPiQxPC9zdWI+JylcbiAgICAgICAgICAgICAgICAvLyBTdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKS0oXFxTKy4qP1xcUyktKFxccyspL2csICckMX5+JDJ+fiQzJylcbiAgICAgICAgICAgICAgICAvLyBDb2RlIEJsb2NrXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXHtjb2RlKDooW2Etel0rKSk/KFs6fF0/KHRpdGxlfGJvcmRlclN0eWxlfGJvcmRlckNvbG9yfGJvcmRlcldpZHRofGJnQ29sb3J8dGl0bGVCR0NvbG9yKT0uKz8pKlxcfShbXl0qPylcXG4/XFx7Y29kZVxcfS9nbSxcbiAgICAgICAgICAgICAgICAgICAgJ2BgYCQyJDVcXG5gYGAnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC8vIFByZS1mb3JtYXR0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97bm9mb3JtYXR9L2csICdgYGAnKVxuICAgICAgICAgICAgICAgIC8vIFVuLW5hbWVkIExpbmtzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcWyhbXnxdKz8pXFxdL2csICc8JDE+JylcbiAgICAgICAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvISguKykhL2csICchW10oJDEpJylcbiAgICAgICAgICAgICAgICAvLyBOYW1lZCBMaW5rc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoLis/KVxcfCguKz8pXFxdL2csICdbJDFdKCQyKScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15icVxcLlxccysvZ20sICc+ICcpXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNvbG9yOiB1bnN1cHBvcnRlZCBpbiBtZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtjb2xvcjpbXn1dK1xcfShbXl0qPylcXHtjb2xvclxcfS9nbSwgJyQxJylcbiAgICAgICAgICAgICAgICAvLyBwYW5lbCBpbnRvIHRhYmxlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xce3BhbmVsOnRpdGxlPShbXn1dKilcXH1cXG4/KFteXSo/KVxcbj9cXHtwYW5lbFxcfS9nbSwgJ1xcbnwgJDEgfFxcbnwgLS0tIHxcXG58ICQyIHwnKVxuICAgICAgICAgICAgICAgIC8vIHRhYmxlIGhlYWRlclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigoPzpcXHxcXHwuKj8pK1xcfFxcfClbIFxcdF0qJC9nbSwgKG1hdGNoLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpbmdsZUJhcnJlZCA9IGhlYWRlcnMucmVwbGFjZSgvXFx8XFx8L2csICd8Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXFxuJHtzaW5nbGVCYXJyZWR9XFxuJHtzaW5nbGVCYXJyZWQucmVwbGFjZSgvXFx8W158XSsvZywgJ3wgLS0tICcpfWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZy1zcGFjZSBvZiB0YWJsZSBoZWFkZXJzIGFuZCByb3dzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15bIFxcdF0qXFx8L2dtLCAnfCcpXG4gICAgICAgICk7XG4gICAgICAgIC8vIC8vIHJlbW92ZSB1bnRlcm1pbmF0ZWQgaW5zZXJ0cyBhY3Jvc3MgdGFibGUgY2VsbHNcbiAgICAgICAgLy8gLnJlcGxhY2UoL1xcfChbXjxdKik8aW5zPig/IVtefF0qPFxcL2lucz4pKFtefF0qKVxcfC9nLCAoXywgcHJlY2VkaW5nLCBmb2xsb3dpbmcpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiBgfCR7cHJlY2VkaW5nfSske2ZvbGxvd2luZ318YDtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gcmVtb3ZlIHVub3BlbmVkIGluc2VydHMgYWNyb3NzIHRhYmxlIGNlbGxzXG4gICAgICAgIC8vIC5yZXBsYWNlKC9cXHwoPzwhW158XSo8aW5zPikoW148XSopPFxcL2lucz4oW158XSopXFx8L2csIChfLCBwcmVjZWRpbmcsIGZvbGxvd2luZykgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGB8JHtwcmVjZWRpbmd9KyR7Zm9sbG93aW5nfXxgO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEppcmEgV2lraSBzeW50YXguXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIE1hcmtkb3duIHN0cmluZyB0byBjb252ZXJ0IHRvIEppcmEgV2lraSBzeW50YXhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSmlyYSBXaWtpIHN5bnRheCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9famlyYShzdHIpIHtcbiAgICAgICAgY29uc3QgbWFwID0ge1xuICAgICAgICAgICAgLy8gY2l0ZTogJz8/JyxcbiAgICAgICAgICAgIGRlbDogJy0nLFxuICAgICAgICAgICAgaW5zOiAnKycsXG4gICAgICAgICAgICBzdXA6ICdeJyxcbiAgICAgICAgICAgIHN1YjogJ34nLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICAgICAgICAvLyBUYWJsZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgL15cXG4oKD86XFx8Lio/KStcXHwpWyBcXHRdKlxcbigoPzpcXHxcXHMqPy17Myx9XFxzKj8pK1xcfClbIFxcdF0qXFxuKCg/Oig/OlxcfC4qPykrXFx8WyBcXHRdKlxcbikqKSQvZ20sXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaCwgaGVhZGVyTGluZSwgc2VwYXJhdG9yTGluZSwgcm93c3RyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gaGVhZGVyTGluZS5tYXRjaCgvW158XSsoPz1cXHwpL2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9ycyA9IHNlcGFyYXRvckxpbmUubWF0Y2goL1tefF0rKD89XFx8KS9nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzLmxlbmd0aCAhPT0gc2VwYXJhdG9ycy5sZW5ndGgpIHJldHVybiBtYXRjaDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IHJvd3N0ci5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT09IDIgJiYgaGVhZGVycy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHtwYW5lbDp0aXRsZT0ke2hlYWRlcnNbMF0udHJpbSgpfX1cXG4ke3Jvd3N0clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcfCguKilbIFxcdF0qXFx8LywgJyQxJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKX1cXG57cGFuZWx9XFxuYDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGB8fCR7aGVhZGVycy5qb2luKCd8fCcpfXx8XFxuJHtyb3dzdHJ9YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvLyBCb2xkLCBJdGFsaWMsIGFuZCBDb21iaW5lZCAoYm9sZCtpdGFsaWMpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbKl9dKykoXFxTLio/KVxcMS9nLCAobWF0Y2gsIHdyYXBwZXIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXyR7Y29udGVudH1fYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCoke2NvbnRlbnR9KmA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBfKiR7Y29udGVudH0qX2A7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVyICsgY29udGVudCArIHdyYXBwZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEFsbCBIZWFkZXJzICgjIGZvcm1hdClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbI10rKSguKj8pJC9nbSwgKG1hdGNoLCBsZXZlbCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGgke2xldmVsLmxlbmd0aH0uJHtjb250ZW50fWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBIZWFkZXJzIChIMSBhbmQgSDIgdW5kZXJsaW5lcylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXiguKj8pXFxuKFs9LV0rKSQvZ20sIChtYXRjaCwgY29udGVudCwgbGV2ZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBoJHtsZXZlbFswXSA9PT0gJz0nID8gMSA6IDJ9LiAke2NvbnRlbnR9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIE9yZGVyZWQgbGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbIFxcdF0qKVxcZCtcXC5cXHMrL2dtLCAobWF0Y2gsIHNwYWNlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7QXJyYXkoTWF0aC5mbG9vcihzcGFjZXMubGVuZ3RoIC8gMykgKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbGwoJyMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpfSBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gVW4tT3JkZXJlZCBMaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsgXFx0XSopXFwqXFxzKy9nbSwgKG1hdGNoLCBzcGFjZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KE1hdGguZmxvb3Ioc3BhY2VzLmxlbmd0aCAvIDIgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWxsKCcqJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKX0gYDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEhlYWRlcnMgKGgxIG9yIGgyKSAobGluZXMgXCJ1bmRlcmxpbmVkXCIgYnkgLS0tLSBvciA9PT09PSlcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMsIEluc2VydHMsIFN1YnNjcmlwdHMsIFN1cGVyc2NyaXB0cywgYW5kIFN0cmlrZXRocm91Z2hzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgPCgke09iamVjdC5rZXlzKG1hcCkuam9pbignfCcpfSk+KC4qPyk8L1xcXFwxPmAsICdnJyksIChtYXRjaCwgZnJvbSwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0byA9IG1hcFtmcm9tXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvICsgY29udGVudCArIHRvO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3RoZXIga2luZCBvZiBzdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKX5+KC4qPyl+fihcXHMrKS9nLCAnJDEtJDItJDMnKVxuICAgICAgICAgICAgICAgIC8vIE5hbWVkL1VuLU5hbWVkIENvZGUgQmxvY2tcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvYGBgKC4rXFxuKT8oKD86LnxcXG4pKj8pYGBgL2csIChtYXRjaCwgc3ludCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9ICd7Y29kZX0nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IGB7Y29kZToke3N5bnQucmVwbGFjZSgvXFxuL2csICcnKX19XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29kZX0ke2NvbnRlbnR9e2NvZGV9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIElubGluZS1QcmVmb3JtYXR0ZWQgVGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9gKFteYF0rKWAvZywgJ3t7JDF9fScpXG4gICAgICAgICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyFcXFtbXlxcXV0qXFxdXFwoKFteKV0rKVxcKS9nLCAnISQxIScpXG4gICAgICAgICAgICAgICAgLy8gTmFtZWQgTGlua1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF1cXCgoW14pXSspXFwpL2csICdbJDF8JDJdJylcbiAgICAgICAgICAgICAgICAvLyBVbi1OYW1lZCBMaW5rXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLzwoW14+XSspPi9nLCAnWyQxXScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14+L2dtLCAnYnEuJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSjJNO1xuIiwgIi8qKlxuICogQ29udmVydGVyIEZhY2FkZVxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBjb252ZXJzaW9uIG9wZXJhdGlvbnMuXG4gKiBVc2VzIFN0cmF0ZWd5IFBhdHRlcm4gXHUyMDE0IGVhY2ggY29udmVyc2lvbiBkaXJlY3Rpb24gaXMgYSBzZXBhcmF0ZSBzdHJhdGVneS5cbiAqIE5ldyBmb3JtYXRzIGNhbiBiZSBhZGRlZCBieSByZWdpc3RlcmluZyBuZXcgc3RyYXRlZ2llcyAoT3Blbi1DbG9zZWQgUHJpbmNpcGxlKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgaHRtbFRvTWFya2Rvd24sIG1hcmtkb3duVG9KaXJhLCBqaXJhVG9NYXJrZG93biB9IGZyb20gJy4vY29udmVydGVyJztcbiAqL1xuaW1wb3J0IHsgTWFya2Rvd25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9tYXJrZG93bi5qcyc7XG5pbXBvcnQgeyBKaXJhU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvamlyYS5qcyc7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBTdHJhdGVneSBpbnN0YW5jZXMgKFNpbmdsZXRvbiBwZXIgc3RyYXRlZ3kpIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuY29uc3QgbWFya2Rvd25TdHJhdGVneSA9IG5ldyBNYXJrZG93blN0cmF0ZWd5KCk7XG5jb25zdCBqaXJhU3RyYXRlZ3kgPSBuZXcgSmlyYVN0cmF0ZWd5KCk7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQdWJsaWMgQVBJIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIENvbnZlcnQgcmVuZGVyZWQgSFRNTCB0byBNYXJrZG93bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge01hcDxzdHJpbmcsc3RyaW5nPn0gW29wdGlvbnMuaW1hZ2VCYXNlNjRNYXBdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWV0YWRhdGFdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHRtbFRvTWFya2Rvd24oaHRtbCwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBtYXJrZG93blN0cmF0ZWd5LmNvbnZlcnQoaHRtbCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ29udmVydCBKaXJhIHdpa2kgbWFya3VwIHRvIE1hcmtkb3duLlxuICogQHBhcmFtIHtzdHJpbmd9IGppcmFNYXJrdXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqaXJhVG9NYXJrZG93bihqaXJhTWFya3VwKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kudG9NYXJrZG93bihqaXJhTWFya3VwKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IE1hcmtkb3duIHRvIEppcmEgd2lraSBtYXJrdXAgdmlhIEFTVCBwaXBlbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZG93blxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtkb3duVG9KaXJhKG1hcmtkb3duKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kuZnJvbU1hcmtkb3duKG1hcmtkb3duKTtcbn1cblxuLyoqXG4gKiBSZS1leHBvcnQgSjJNIGZvciBIVE1MIGdlbmVyYXRpb24gKHVzZWQgYnkgcG9wdXAncyBGaWxsIEppcmEgZmVhdHVyZSkuXG4gKi9cbmV4cG9ydCBjb25zdCBKMk0gPSBqaXJhU3RyYXRlZ3kuajJtO1xuIiwgImZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbikge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIGRlc3RpbmF0aW9uW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuZnVuY3Rpb24gcmVwZWF0KGNoYXJhY3RlciwgY291bnQpIHtcbiAgcmV0dXJuIEFycmF5KGNvdW50ICsgMSkuam9pbihjaGFyYWN0ZXIpO1xufVxuZnVuY3Rpb24gdHJpbUxlYWRpbmdOZXdsaW5lcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxuKi8sICcnKTtcbn1cbmZ1bmN0aW9uIHRyaW1UcmFpbGluZ05ld2xpbmVzKHN0cmluZykge1xuICAvLyBhdm9pZCBtYXRjaC1hdC1lbmQgcmVnZXhwIGJvdHRsZW5lY2ssIHNlZSAjMzcwXG4gIHZhciBpbmRleEVuZCA9IHN0cmluZy5sZW5ndGg7XG4gIHdoaWxlIChpbmRleEVuZCA+IDAgJiYgc3RyaW5nW2luZGV4RW5kIC0gMV0gPT09ICdcXG4nKSBpbmRleEVuZC0tO1xuICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRleEVuZCk7XG59XG5mdW5jdGlvbiB0cmltTmV3bGluZXMoc3RyaW5nKSB7XG4gIHJldHVybiB0cmltVHJhaWxpbmdOZXdsaW5lcyh0cmltTGVhZGluZ05ld2xpbmVzKHN0cmluZykpO1xufVxudmFyIGJsb2NrRWxlbWVudHMgPSBbJ0FERFJFU1MnLCAnQVJUSUNMRScsICdBU0lERScsICdBVURJTycsICdCTE9DS1FVT1RFJywgJ0JPRFknLCAnQ0FOVkFTJywgJ0NFTlRFUicsICdERCcsICdESVInLCAnRElWJywgJ0RMJywgJ0RUJywgJ0ZJRUxEU0VUJywgJ0ZJR0NBUFRJT04nLCAnRklHVVJFJywgJ0ZPT1RFUicsICdGT1JNJywgJ0ZSQU1FU0VUJywgJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2JywgJ0hFQURFUicsICdIR1JPVVAnLCAnSFInLCAnSFRNTCcsICdJU0lOREVYJywgJ0xJJywgJ01BSU4nLCAnTUVOVScsICdOQVYnLCAnTk9GUkFNRVMnLCAnTk9TQ1JJUFQnLCAnT0wnLCAnT1VUUFVUJywgJ1AnLCAnUFJFJywgJ1NFQ1RJT04nLCAnVEFCTEUnLCAnVEJPRFknLCAnVEQnLCAnVEZPT1QnLCAnVEgnLCAnVEhFQUQnLCAnVFInLCAnVUwnXTtcbmZ1bmN0aW9uIGlzQmxvY2sobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgYmxvY2tFbGVtZW50cyk7XG59XG52YXIgdm9pZEVsZW1lbnRzID0gWydBUkVBJywgJ0JBU0UnLCAnQlInLCAnQ09MJywgJ0NPTU1BTkQnLCAnRU1CRUQnLCAnSFInLCAnSU1HJywgJ0lOUFVUJywgJ0tFWUdFTicsICdMSU5LJywgJ01FVEEnLCAnUEFSQU0nLCAnU09VUkNFJywgJ1RSQUNLJywgJ1dCUiddO1xuZnVuY3Rpb24gaXNWb2lkKG5vZGUpIHtcbiAgcmV0dXJuIGlzKG5vZGUsIHZvaWRFbGVtZW50cyk7XG59XG5mdW5jdGlvbiBoYXNWb2lkKG5vZGUpIHtcbiAgcmV0dXJuIGhhcyhub2RlLCB2b2lkRWxlbWVudHMpO1xufVxudmFyIG1lYW5pbmdmdWxXaGVuQmxhbmtFbGVtZW50cyA9IFsnQScsICdUQUJMRScsICdUSEVBRCcsICdUQk9EWScsICdURk9PVCcsICdUSCcsICdURCcsICdJRlJBTUUnLCAnU0NSSVBUJywgJ0FVRElPJywgJ1ZJREVPJ107XG5mdW5jdGlvbiBpc01lYW5pbmdmdWxXaGVuQmxhbmsobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzKTtcbn1cbmZ1bmN0aW9uIGhhc01lYW5pbmdmdWxXaGVuQmxhbmsobm9kZSkge1xuICByZXR1cm4gaGFzKG5vZGUsIG1lYW5pbmdmdWxXaGVuQmxhbmtFbGVtZW50cyk7XG59XG5mdW5jdGlvbiBpcyhub2RlLCB0YWdOYW1lcykge1xuICByZXR1cm4gdGFnTmFtZXMuaW5kZXhPZihub2RlLm5vZGVOYW1lKSA+PSAwO1xufVxuZnVuY3Rpb24gaGFzKG5vZGUsIHRhZ05hbWVzKSB7XG4gIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lICYmIHRhZ05hbWVzLnNvbWUoZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKS5sZW5ndGg7XG4gIH0pO1xufVxudmFyIG1hcmtkb3duRXNjYXBlcyA9IFtbL1xcXFwvZywgJ1xcXFxcXFxcJ10sIFsvXFwqL2csICdcXFxcKiddLCBbL14tL2csICdcXFxcLSddLCBbL15cXCsgL2csICdcXFxcKyAnXSwgWy9eKD0rKS9nLCAnXFxcXCQxJ10sIFsvXigjezEsNn0pIC9nLCAnXFxcXCQxICddLCBbL2AvZywgJ1xcXFxgJ10sIFsvXn5+fi9nLCAnXFxcXH5+fiddLCBbL1xcWy9nLCAnXFxcXFsnXSwgWy9cXF0vZywgJ1xcXFxdJ10sIFsvXj4vZywgJ1xcXFw+J10sIFsvXy9nLCAnXFxcXF8nXSwgWy9eKFxcZCspXFwuIC9nLCAnJDFcXFxcLiAnXV07XG5mdW5jdGlvbiBlc2NhcGVNYXJrZG93bihzdHJpbmcpIHtcbiAgcmV0dXJuIG1hcmtkb3duRXNjYXBlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBlc2NhcGUpIHtcbiAgICByZXR1cm4gYWNjdW11bGF0b3IucmVwbGFjZShlc2NhcGVbMF0sIGVzY2FwZVsxXSk7XG4gIH0sIHN0cmluZyk7XG59XG5cbnZhciBydWxlcyA9IHt9O1xucnVsZXMucGFyYWdyYXBoID0ge1xuICBmaWx0ZXI6ICdwJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICB9XG59O1xucnVsZXMubGluZUJyZWFrID0ge1xuICBmaWx0ZXI6ICdicicsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmJyICsgJ1xcbic7XG4gIH1cbn07XG5ydWxlcy5oZWFkaW5nID0ge1xuICBmaWx0ZXI6IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIGhMZXZlbCA9IE51bWJlcihub2RlLm5vZGVOYW1lLmNoYXJBdCgxKSk7XG4gICAgaWYgKG9wdGlvbnMuaGVhZGluZ1N0eWxlID09PSAnc2V0ZXh0JyAmJiBoTGV2ZWwgPCAzKSB7XG4gICAgICB2YXIgdW5kZXJsaW5lID0gcmVwZWF0KGhMZXZlbCA9PT0gMSA/ICc9JyA6ICctJywgY29udGVudC5sZW5ndGgpO1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG4nICsgdW5kZXJsaW5lICsgJ1xcblxcbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnXFxuXFxuJyArIHJlcGVhdCgnIycsIGhMZXZlbCkgKyAnICcgKyBjb250ZW50ICsgJ1xcblxcbic7XG4gICAgfVxuICB9XG59O1xucnVsZXMuYmxvY2txdW90ZSA9IHtcbiAgZmlsdGVyOiAnYmxvY2txdW90ZScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIGNvbnRlbnQgPSB0cmltTmV3bGluZXMoY29udGVudCkucmVwbGFjZSgvXi9nbSwgJz4gJyk7XG4gICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICB9XG59O1xucnVsZXMubGlzdCA9IHtcbiAgZmlsdGVyOiBbJ3VsJywgJ29sJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudC5ub2RlTmFtZSA9PT0gJ0xJJyAmJiBwYXJlbnQubGFzdEVsZW1lbnRDaGlsZCA9PT0gbm9kZSkge1xuICAgICAgcmV0dXJuICdcXG4nICsgY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nO1xuICAgIH1cbiAgfVxufTtcbnJ1bGVzLmxpc3RJdGVtID0ge1xuICBmaWx0ZXI6ICdsaScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmJ1bGxldExpc3RNYXJrZXIgKyAnICAgJztcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQubm9kZU5hbWUgPT09ICdPTCcpIHtcbiAgICAgIHZhciBzdGFydCA9IHBhcmVudC5nZXRBdHRyaWJ1dGUoJ3N0YXJ0Jyk7XG4gICAgICB2YXIgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHBhcmVudC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICBwcmVmaXggPSAoc3RhcnQgPyBOdW1iZXIoc3RhcnQpICsgaW5kZXggOiBpbmRleCArIDEpICsgJy4gICc7XG4gICAgfVxuICAgIHZhciBpc1BhcmFncmFwaCA9IC9cXG4kLy50ZXN0KGNvbnRlbnQpO1xuICAgIGNvbnRlbnQgPSB0cmltTmV3bGluZXMoY29udGVudCkgKyAoaXNQYXJhZ3JhcGggPyAnXFxuJyA6ICcnKTtcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4vZ20sICdcXG4nICsgJyAnLnJlcGVhdChwcmVmaXgubGVuZ3RoKSk7IC8vIGluZGVudFxuICAgIHJldHVybiBwcmVmaXggKyBjb250ZW50ICsgKG5vZGUubmV4dFNpYmxpbmcgPyAnXFxuJyA6ICcnKTtcbiAgfVxufTtcbnJ1bGVzLmluZGVudGVkQ29kZUJsb2NrID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuY29kZUJsb2NrU3R5bGUgPT09ICdpbmRlbnRlZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgbm9kZS5maXJzdENoaWxkICYmIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gJ1xcblxcbiAgICAnICsgbm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCAnXFxuICAgICcpICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5mZW5jZWRDb2RlQmxvY2sgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5jb2RlQmxvY2tTdHlsZSA9PT0gJ2ZlbmNlZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgbm9kZS5maXJzdENoaWxkICYmIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gbm9kZS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgICB2YXIgbGFuZ3VhZ2UgPSAoY2xhc3NOYW1lLm1hdGNoKC9sYW5ndWFnZS0oXFxTKykvKSB8fCBbbnVsbCwgJyddKVsxXTtcbiAgICB2YXIgY29kZSA9IG5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICB2YXIgZmVuY2VDaGFyID0gb3B0aW9ucy5mZW5jZS5jaGFyQXQoMCk7XG4gICAgdmFyIGZlbmNlU2l6ZSA9IDM7XG4gICAgdmFyIGZlbmNlSW5Db2RlUmVnZXggPSBuZXcgUmVnRXhwKCdeJyArIGZlbmNlQ2hhciArICd7Myx9JywgJ2dtJyk7XG4gICAgdmFyIG1hdGNoO1xuICAgIHdoaWxlIChtYXRjaCA9IGZlbmNlSW5Db2RlUmVnZXguZXhlYyhjb2RlKSkge1xuICAgICAgaWYgKG1hdGNoWzBdLmxlbmd0aCA+PSBmZW5jZVNpemUpIHtcbiAgICAgICAgZmVuY2VTaXplID0gbWF0Y2hbMF0ubGVuZ3RoICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZlbmNlID0gcmVwZWF0KGZlbmNlQ2hhciwgZmVuY2VTaXplKTtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBmZW5jZSArIGxhbmd1YWdlICsgJ1xcbicgKyBjb2RlLnJlcGxhY2UoL1xcbiQvLCAnJykgKyAnXFxuJyArIGZlbmNlICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5ob3Jpem9udGFsUnVsZSA9IHtcbiAgZmlsdGVyOiAnaHInLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBvcHRpb25zLmhyICsgJ1xcblxcbic7XG4gIH1cbn07XG5ydWxlcy5pbmxpbmVMaW5rID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubGlua1N0eWxlID09PSAnaW5saW5lZCcgJiYgbm9kZS5ub2RlTmFtZSA9PT0gJ0EnICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gIH0sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBocmVmID0gZXNjYXBlTGlua0Rlc3RpbmF0aW9uKG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xuICAgIHZhciB0aXRsZSA9IGVzY2FwZUxpbmtUaXRsZShjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSkpO1xuICAgIHZhciB0aXRsZVBhcnQgPSB0aXRsZSA/ICcgXCInICsgdGl0bGUgKyAnXCInIDogJyc7XG4gICAgcmV0dXJuICdbJyArIGNvbnRlbnQgKyAnXSgnICsgaHJlZiArIHRpdGxlUGFydCArICcpJztcbiAgfVxufTtcbnJ1bGVzLnJlZmVyZW5jZUxpbmsgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5saW5rU3R5bGUgPT09ICdyZWZlcmVuY2VkJyAmJiBub2RlLm5vZGVOYW1lID09PSAnQScgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgfSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIGhyZWYgPSBlc2NhcGVMaW5rRGVzdGluYXRpb24obm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XG4gICAgdmFyIHRpdGxlID0gY2xlYW5BdHRyaWJ1dGUobm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuICAgIGlmICh0aXRsZSkgdGl0bGUgPSAnIFwiJyArIGVzY2FwZUxpbmtUaXRsZSh0aXRsZSkgKyAnXCInO1xuICAgIHZhciByZXBsYWNlbWVudDtcbiAgICB2YXIgcmVmZXJlbmNlO1xuICAgIHN3aXRjaCAob3B0aW9ucy5saW5rUmVmZXJlbmNlU3R5bGUpIHtcbiAgICAgIGNhc2UgJ2NvbGxhcHNlZCc6XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddW10nO1xuICAgICAgICByZWZlcmVuY2UgPSAnWycgKyBjb250ZW50ICsgJ106ICcgKyBocmVmICsgdGl0bGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2hvcnRjdXQnOlxuICAgICAgICByZXBsYWNlbWVudCA9ICdbJyArIGNvbnRlbnQgKyAnXSc7XG4gICAgICAgIHJlZmVyZW5jZSA9ICdbJyArIGNvbnRlbnQgKyAnXTogJyArIGhyZWYgKyB0aXRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgaWQgPSB0aGlzLnJlZmVyZW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgcmVwbGFjZW1lbnQgPSAnWycgKyBjb250ZW50ICsgJ11bJyArIGlkICsgJ10nO1xuICAgICAgICByZWZlcmVuY2UgPSAnWycgKyBpZCArICddOiAnICsgaHJlZiArIHRpdGxlO1xuICAgIH1cbiAgICB0aGlzLnJlZmVyZW5jZXMucHVzaChyZWZlcmVuY2UpO1xuICAgIHJldHVybiByZXBsYWNlbWVudDtcbiAgfSxcbiAgcmVmZXJlbmNlczogW10sXG4gIGFwcGVuZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmZXJlbmNlcyA9ICcnO1xuICAgIGlmICh0aGlzLnJlZmVyZW5jZXMubGVuZ3RoKSB7XG4gICAgICByZWZlcmVuY2VzID0gJ1xcblxcbicgKyB0aGlzLnJlZmVyZW5jZXMuam9pbignXFxuJykgKyAnXFxuXFxuJztcbiAgICAgIHRoaXMucmVmZXJlbmNlcyA9IFtdOyAvLyBSZXNldCByZWZlcmVuY2VzXG4gICAgfVxuICAgIHJldHVybiByZWZlcmVuY2VzO1xuICB9XG59O1xucnVsZXMuZW1waGFzaXMgPSB7XG4gIGZpbHRlcjogWydlbScsICdpJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghY29udGVudC50cmltKCkpIHJldHVybiAnJztcbiAgICByZXR1cm4gb3B0aW9ucy5lbURlbGltaXRlciArIGNvbnRlbnQgKyBvcHRpb25zLmVtRGVsaW1pdGVyO1xuICB9XG59O1xucnVsZXMuc3Ryb25nID0ge1xuICBmaWx0ZXI6IFsnc3Ryb25nJywgJ2InXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb250ZW50LnRyaW0oKSkgcmV0dXJuICcnO1xuICAgIHJldHVybiBvcHRpb25zLnN0cm9uZ0RlbGltaXRlciArIGNvbnRlbnQgKyBvcHRpb25zLnN0cm9uZ0RlbGltaXRlcjtcbiAgfVxufTtcbnJ1bGVzLmNvZGUgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgaGFzU2libGluZ3MgPSBub2RlLnByZXZpb3VzU2libGluZyB8fCBub2RlLm5leHRTaWJsaW5nO1xuICAgIHZhciBpc0NvZGVCbG9jayA9IG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgIWhhc1NpYmxpbmdzO1xuICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnQ09ERScgJiYgIWlzQ29kZUJsb2NrO1xuICB9LFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiAnJztcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCAnICcpO1xuICAgIHZhciBleHRyYVNwYWNlID0gL15gfF4gLio/W14gXS4qICR8YCQvLnRlc3QoY29udGVudCkgPyAnICcgOiAnJztcbiAgICB2YXIgZGVsaW1pdGVyID0gJ2AnO1xuICAgIHZhciBtYXRjaGVzID0gY29udGVudC5tYXRjaCgvYCsvZ20pIHx8IFtdO1xuICAgIHdoaWxlIChtYXRjaGVzLmluZGV4T2YoZGVsaW1pdGVyKSAhPT0gLTEpIGRlbGltaXRlciA9IGRlbGltaXRlciArICdgJztcbiAgICByZXR1cm4gZGVsaW1pdGVyICsgZXh0cmFTcGFjZSArIGNvbnRlbnQgKyBleHRyYVNwYWNlICsgZGVsaW1pdGVyO1xuICB9XG59O1xucnVsZXMuaW1hZ2UgPSB7XG4gIGZpbHRlcjogJ2ltZycsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHZhciBhbHQgPSBlc2NhcGVNYXJrZG93bihjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgnYWx0JykpKTtcbiAgICB2YXIgc3JjID0gZXNjYXBlTGlua0Rlc3RpbmF0aW9uKG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJyk7XG4gICAgdmFyIHRpdGxlID0gY2xlYW5BdHRyaWJ1dGUobm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuICAgIHZhciB0aXRsZVBhcnQgPSB0aXRsZSA/ICcgXCInICsgZXNjYXBlTGlua1RpdGxlKHRpdGxlKSArICdcIicgOiAnJztcbiAgICByZXR1cm4gc3JjID8gJyFbJyArIGFsdCArICddJyArICcoJyArIHNyYyArIHRpdGxlUGFydCArICcpJyA6ICcnO1xuICB9XG59O1xuZnVuY3Rpb24gY2xlYW5BdHRyaWJ1dGUoYXR0cmlidXRlKSB7XG4gIHJldHVybiBhdHRyaWJ1dGUgPyBhdHRyaWJ1dGUucmVwbGFjZSgvKFxcbitcXHMqKSsvZywgJ1xcbicpIDogJyc7XG59XG5mdW5jdGlvbiBlc2NhcGVMaW5rRGVzdGluYXRpb24oZGVzdGluYXRpb24pIHtcbiAgdmFyIGVzY2FwZWQgPSBkZXN0aW5hdGlvbi5yZXBsYWNlKC8oWzw+KCldKS9nLCAnXFxcXCQxJyk7XG4gIHJldHVybiBlc2NhcGVkLmluZGV4T2YoJyAnKSA+PSAwID8gJzwnICsgZXNjYXBlZCArICc+JyA6IGVzY2FwZWQ7XG59XG5mdW5jdGlvbiBlc2NhcGVMaW5rVGl0bGUodGl0bGUpIHtcbiAgcmV0dXJuIHRpdGxlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKTtcbn1cblxuLyoqXG4gKiBNYW5hZ2VzIGEgY29sbGVjdGlvbiBvZiBydWxlcyB1c2VkIHRvIGNvbnZlcnQgSFRNTCB0byBNYXJrZG93blxuICovXG5cbmZ1bmN0aW9uIFJ1bGVzKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fa2VlcCA9IFtdO1xuICB0aGlzLl9yZW1vdmUgPSBbXTtcbiAgdGhpcy5ibGFua1J1bGUgPSB7XG4gICAgcmVwbGFjZW1lbnQ6IG9wdGlvbnMuYmxhbmtSZXBsYWNlbWVudFxuICB9O1xuICB0aGlzLmtlZXBSZXBsYWNlbWVudCA9IG9wdGlvbnMua2VlcFJlcGxhY2VtZW50O1xuICB0aGlzLmRlZmF1bHRSdWxlID0ge1xuICAgIHJlcGxhY2VtZW50OiBvcHRpb25zLmRlZmF1bHRSZXBsYWNlbWVudFxuICB9O1xuICB0aGlzLmFycmF5ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zLnJ1bGVzKSB0aGlzLmFycmF5LnB1c2gob3B0aW9ucy5ydWxlc1trZXldKTtcbn1cblJ1bGVzLnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbiAoa2V5LCBydWxlKSB7XG4gICAgdGhpcy5hcnJheS51bnNoaWZ0KHJ1bGUpO1xuICB9LFxuICBrZWVwOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5fa2VlcC51bnNoaWZ0KHtcbiAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgcmVwbGFjZW1lbnQ6IHRoaXMua2VlcFJlcGxhY2VtZW50XG4gICAgfSk7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIHRoaXMuX3JlbW92ZS51bnNoaWZ0KHtcbiAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmb3JOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlLmlzQmxhbmspIHJldHVybiB0aGlzLmJsYW5rUnVsZTtcbiAgICB2YXIgcnVsZTtcbiAgICBpZiAocnVsZSA9IGZpbmRSdWxlKHRoaXMuYXJyYXksIG5vZGUsIHRoaXMub3B0aW9ucykpIHJldHVybiBydWxlO1xuICAgIGlmIChydWxlID0gZmluZFJ1bGUodGhpcy5fa2VlcCwgbm9kZSwgdGhpcy5vcHRpb25zKSkgcmV0dXJuIHJ1bGU7XG4gICAgaWYgKHJ1bGUgPSBmaW5kUnVsZSh0aGlzLl9yZW1vdmUsIG5vZGUsIHRoaXMub3B0aW9ucykpIHJldHVybiBydWxlO1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRSdWxlO1xuICB9LFxuICBmb3JFYWNoOiBmdW5jdGlvbiAoZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXJyYXkubGVuZ3RoOyBpKyspIGZuKHRoaXMuYXJyYXlbaV0sIGkpO1xuICB9XG59O1xuZnVuY3Rpb24gZmluZFJ1bGUocnVsZXMsIG5vZGUsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBydWxlID0gcnVsZXNbaV07XG4gICAgaWYgKGZpbHRlclZhbHVlKHJ1bGUsIG5vZGUsIG9wdGlvbnMpKSByZXR1cm4gcnVsZTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZmlsdGVyVmFsdWUocnVsZSwgbm9kZSwgb3B0aW9ucykge1xuICB2YXIgZmlsdGVyID0gcnVsZS5maWx0ZXI7XG4gIGlmICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJykge1xuICAgIGlmIChmaWx0ZXIgPT09IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgaWYgKGZpbHRlci5pbmRleE9mKG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmaWx0ZXIuY2FsbChydWxlLCBub2RlLCBvcHRpb25zKSkgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGZpbHRlcmAgbmVlZHMgdG8gYmUgYSBzdHJpbmcsIGFycmF5LCBvciBmdW5jdGlvbicpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGNvbGxhcHNlV2hpdGVzcGFjZSBmdW5jdGlvbiBpcyBhZGFwdGVkIGZyb20gY29sbGFwc2Utd2hpdGVzcGFjZVxuICogYnkgTHVjIFRoZXZlbmFyZC5cbiAqXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgTHVjIFRoZXZlbmFyZCA8bHVjdGhldmVuYXJkQGdtYWlsLmNvbT5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogY29sbGFwc2VXaGl0ZXNwYWNlKG9wdGlvbnMpIHJlbW92ZXMgZXh0cmFuZW91cyB3aGl0ZXNwYWNlIGZyb20gYW4gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gY29sbGFwc2VXaGl0ZXNwYWNlKG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnQ7XG4gIHZhciBpc0Jsb2NrID0gb3B0aW9ucy5pc0Jsb2NrO1xuICB2YXIgaXNWb2lkID0gb3B0aW9ucy5pc1ZvaWQ7XG4gIHZhciBpc1ByZSA9IG9wdGlvbnMuaXNQcmUgfHwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlTmFtZSA9PT0gJ1BSRSc7XG4gIH07XG4gIGlmICghZWxlbWVudC5maXJzdENoaWxkIHx8IGlzUHJlKGVsZW1lbnQpKSByZXR1cm47XG4gIHZhciBwcmV2VGV4dCA9IG51bGw7XG4gIHZhciBrZWVwTGVhZGluZ1dzID0gZmFsc2U7XG4gIHZhciBwcmV2ID0gbnVsbDtcbiAgdmFyIG5vZGUgPSBuZXh0KHByZXYsIGVsZW1lbnQsIGlzUHJlKTtcbiAgd2hpbGUgKG5vZGUgIT09IGVsZW1lbnQpIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyB8fCBub2RlLm5vZGVUeXBlID09PSA0KSB7XG4gICAgICAvLyBOb2RlLlRFWFRfTk9ERSBvciBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERVxuICAgICAgdmFyIHRleHQgPSBub2RlLmRhdGEucmVwbGFjZSgvWyBcXHJcXG5cXHRdKy9nLCAnICcpO1xuICAgICAgaWYgKCghcHJldlRleHQgfHwgLyAkLy50ZXN0KHByZXZUZXh0LmRhdGEpKSAmJiAha2VlcExlYWRpbmdXcyAmJiB0ZXh0WzBdID09PSAnICcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBgdGV4dGAgbWlnaHQgYmUgZW1wdHkgYXQgdGhpcyBwb2ludC5cbiAgICAgIGlmICghdGV4dCkge1xuICAgICAgICBub2RlID0gcmVtb3ZlKG5vZGUpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUuZGF0YSA9IHRleHQ7XG4gICAgICBwcmV2VGV4dCA9IG5vZGU7XG4gICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAvLyBOb2RlLkVMRU1FTlRfTk9ERVxuICAgICAgaWYgKGlzQmxvY2sobm9kZSkgfHwgbm9kZS5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgICAgICBpZiAocHJldlRleHQpIHtcbiAgICAgICAgICBwcmV2VGV4dC5kYXRhID0gcHJldlRleHQuZGF0YS5yZXBsYWNlKC8gJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWb2lkKG5vZGUpIHx8IGlzUHJlKG5vZGUpKSB7XG4gICAgICAgIC8vIEF2b2lkIHRyaW1taW5nIHNwYWNlIGFyb3VuZCBub24tYmxvY2ssIG5vbi1CUiB2b2lkIGVsZW1lbnRzIGFuZCBpbmxpbmUgUFJFLlxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwcmV2VGV4dCkge1xuICAgICAgICAvLyBEcm9wIHByb3RlY3Rpb24gaWYgc2V0IHByZXZpb3VzbHkuXG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHJlbW92ZShub2RlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgbmV4dE5vZGUgPSBuZXh0KHByZXYsIG5vZGUsIGlzUHJlKTtcbiAgICBwcmV2ID0gbm9kZTtcbiAgICBub2RlID0gbmV4dE5vZGU7XG4gIH1cbiAgaWYgKHByZXZUZXh0KSB7XG4gICAgcHJldlRleHQuZGF0YSA9IHByZXZUZXh0LmRhdGEucmVwbGFjZSgvICQvLCAnJyk7XG4gICAgaWYgKCFwcmV2VGV4dC5kYXRhKSB7XG4gICAgICByZW1vdmUocHJldlRleHQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIHJlbW92ZShub2RlKSByZW1vdmVzIHRoZSBnaXZlbiBub2RlIGZyb20gdGhlIERPTSBhbmQgcmV0dXJucyB0aGVcbiAqIG5leHQgbm9kZSBpbiB0aGUgc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtOb2RlfSBub2RlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gIHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZyB8fCBub2RlLnBhcmVudE5vZGU7XG4gIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgcmV0dXJuIG5leHQ7XG59XG5cbi8qKlxuICogbmV4dChwcmV2LCBjdXJyZW50LCBpc1ByZSkgcmV0dXJucyB0aGUgbmV4dCBub2RlIGluIHRoZSBzZXF1ZW5jZSwgZ2l2ZW4gdGhlXG4gKiBjdXJyZW50IGFuZCBwcmV2aW91cyBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IHByZXZcbiAqIEBwYXJhbSB7Tm9kZX0gY3VycmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXNQcmVcbiAqIEByZXR1cm4ge05vZGV9XG4gKi9cbmZ1bmN0aW9uIG5leHQocHJldiwgY3VycmVudCwgaXNQcmUpIHtcbiAgaWYgKHByZXYgJiYgcHJldi5wYXJlbnROb2RlID09PSBjdXJyZW50IHx8IGlzUHJlKGN1cnJlbnQpKSB7XG4gICAgcmV0dXJuIGN1cnJlbnQubmV4dFNpYmxpbmcgfHwgY3VycmVudC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBjdXJyZW50LmZpcnN0Q2hpbGQgfHwgY3VycmVudC5uZXh0U2libGluZyB8fCBjdXJyZW50LnBhcmVudE5vZGU7XG59XG5cbi8qXG4gKiBTZXQgdXAgd2luZG93IGZvciBOb2RlLmpzXG4gKi9cblxudmFyIHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9O1xuXG4vKlxuICogUGFyc2luZyBIVE1MIHN0cmluZ3NcbiAqL1xuXG5mdW5jdGlvbiBjYW5QYXJzZUhUTUxOYXRpdmVseSgpIHtcbiAgdmFyIFBhcnNlciA9IHJvb3QuRE9NUGFyc2VyO1xuICB2YXIgY2FuUGFyc2UgPSBmYWxzZTtcblxuICAvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vMTEyOTAzMVxuICAvLyBGaXJlZm94L09wZXJhL0lFIHRocm93IGVycm9ycyBvbiB1bnN1cHBvcnRlZCB0eXBlc1xuICB0cnkge1xuICAgIC8vIFdlYktpdCByZXR1cm5zIG51bGwgb24gdW5zdXBwb3J0ZWQgdHlwZXNcbiAgICBpZiAobmV3IFBhcnNlcigpLnBhcnNlRnJvbVN0cmluZygnJywgJ3RleHQvaHRtbCcpKSB7XG4gICAgICBjYW5QYXJzZSA9IHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICByZXR1cm4gY2FuUGFyc2U7XG59XG5mdW5jdGlvbiBjcmVhdGVIVE1MUGFyc2VyKCkge1xuICB2YXIgUGFyc2VyID0gZnVuY3Rpb24gKCkge307XG4gIHtcbiAgICBpZiAoc2hvdWxkVXNlQWN0aXZlWCgpKSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRvYyA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgICAgICAgZG9jLmRlc2lnbk1vZGUgPSAnb24nOyAvLyBkaXNhYmxlIG9uLXBhZ2Ugc2NyaXB0c1xuICAgICAgICBkb2Mub3BlbigpO1xuICAgICAgICBkb2Mud3JpdGUoc3RyaW5nKTtcbiAgICAgICAgZG9jLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiBkb2M7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGRvYy5vcGVuKCk7XG4gICAgICAgIGRvYy53cml0ZShzdHJpbmcpO1xuICAgICAgICBkb2MuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIHJldHVybiBQYXJzZXI7XG59XG5mdW5jdGlvbiBzaG91bGRVc2VBY3RpdmVYKCkge1xuICB2YXIgdXNlQWN0aXZlWCA9IGZhbHNlO1xuICB0cnkge1xuICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJykub3BlbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHJvb3QuQWN0aXZlWE9iamVjdCkgdXNlQWN0aXZlWCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHVzZUFjdGl2ZVg7XG59XG52YXIgSFRNTFBhcnNlciA9IGNhblBhcnNlSFRNTE5hdGl2ZWx5KCkgPyByb290LkRPTVBhcnNlciA6IGNyZWF0ZUhUTUxQYXJzZXIoKTtcblxuZnVuY3Rpb24gUm9vdE5vZGUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIGRvYyA9IGh0bWxQYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoXG4gICAgLy8gRE9NIHBhcnNlcnMgYXJyYW5nZSBlbGVtZW50cyBpbiB0aGUgPGhlYWQ+IGFuZCA8Ym9keT4uXG4gICAgLy8gV3JhcHBpbmcgaW4gYSBjdXN0b20gZWxlbWVudCBlbnN1cmVzIGVsZW1lbnRzIGFyZSByZWxpYWJseSBhcnJhbmdlZCBpblxuICAgIC8vIGEgc2luZ2xlIGVsZW1lbnQuXG4gICAgJzx4LXR1cm5kb3duIGlkPVwidHVybmRvd24tcm9vdFwiPicgKyBpbnB1dCArICc8L3gtdHVybmRvd24+JywgJ3RleHQvaHRtbCcpO1xuICAgIHJvb3QgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3R1cm5kb3duLXJvb3QnKTtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gaW5wdXQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGNvbGxhcHNlV2hpdGVzcGFjZSh7XG4gICAgZWxlbWVudDogcm9vdCxcbiAgICBpc0Jsb2NrOiBpc0Jsb2NrLFxuICAgIGlzVm9pZDogaXNWb2lkLFxuICAgIGlzUHJlOiBvcHRpb25zLnByZWZvcm1hdHRlZENvZGUgPyBpc1ByZU9yQ29kZSA6IG51bGxcbiAgfSk7XG4gIHJldHVybiByb290O1xufVxudmFyIF9odG1sUGFyc2VyO1xuZnVuY3Rpb24gaHRtbFBhcnNlcigpIHtcbiAgX2h0bWxQYXJzZXIgPSBfaHRtbFBhcnNlciB8fCBuZXcgSFRNTFBhcnNlcigpO1xuICByZXR1cm4gX2h0bWxQYXJzZXI7XG59XG5mdW5jdGlvbiBpc1ByZU9yQ29kZShub2RlKSB7XG4gIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnUFJFJyB8fCBub2RlLm5vZGVOYW1lID09PSAnQ09ERSc7XG59XG5cbmZ1bmN0aW9uIE5vZGUobm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlzQmxvY2sgPSBpc0Jsb2NrKG5vZGUpO1xuICBub2RlLmlzQ29kZSA9IG5vZGUubm9kZU5hbWUgPT09ICdDT0RFJyB8fCBub2RlLnBhcmVudE5vZGUuaXNDb2RlO1xuICBub2RlLmlzQmxhbmsgPSBpc0JsYW5rKG5vZGUpO1xuICBub2RlLmZsYW5raW5nV2hpdGVzcGFjZSA9IGZsYW5raW5nV2hpdGVzcGFjZShub2RlLCBvcHRpb25zKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5mdW5jdGlvbiBpc0JsYW5rKG5vZGUpIHtcbiAgcmV0dXJuICFpc1ZvaWQobm9kZSkgJiYgIWlzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKSAmJiAvXlxccyokL2kudGVzdChub2RlLnRleHRDb250ZW50KSAmJiAhaGFzVm9pZChub2RlKSAmJiAhaGFzTWVhbmluZ2Z1bFdoZW5CbGFuayhub2RlKTtcbn1cbmZ1bmN0aW9uIGZsYW5raW5nV2hpdGVzcGFjZShub2RlLCBvcHRpb25zKSB7XG4gIGlmIChub2RlLmlzQmxvY2sgfHwgb3B0aW9ucy5wcmVmb3JtYXR0ZWRDb2RlICYmIG5vZGUuaXNDb2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlYWRpbmc6ICcnLFxuICAgICAgdHJhaWxpbmc6ICcnXG4gICAgfTtcbiAgfVxuICB2YXIgZWRnZXMgPSBlZGdlV2hpdGVzcGFjZShub2RlLnRleHRDb250ZW50KTtcblxuICAvLyBhYmFuZG9uIGxlYWRpbmcgQVNDSUkgV1MgaWYgbGVmdC1mbGFua2VkIGJ5IEFTQ0lJIFdTXG4gIGlmIChlZGdlcy5sZWFkaW5nQXNjaWkgJiYgaXNGbGFua2VkQnlXaGl0ZXNwYWNlKCdsZWZ0Jywgbm9kZSwgb3B0aW9ucykpIHtcbiAgICBlZGdlcy5sZWFkaW5nID0gZWRnZXMubGVhZGluZ05vbkFzY2lpO1xuICB9XG5cbiAgLy8gYWJhbmRvbiB0cmFpbGluZyBBU0NJSSBXUyBpZiByaWdodC1mbGFua2VkIGJ5IEFTQ0lJIFdTXG4gIGlmIChlZGdlcy50cmFpbGluZ0FzY2lpICYmIGlzRmxhbmtlZEJ5V2hpdGVzcGFjZSgncmlnaHQnLCBub2RlLCBvcHRpb25zKSkge1xuICAgIGVkZ2VzLnRyYWlsaW5nID0gZWRnZXMudHJhaWxpbmdOb25Bc2NpaTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGxlYWRpbmc6IGVkZ2VzLmxlYWRpbmcsXG4gICAgdHJhaWxpbmc6IGVkZ2VzLnRyYWlsaW5nXG4gIH07XG59XG5mdW5jdGlvbiBlZGdlV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgdmFyIG0gPSBzdHJpbmcubWF0Y2goL14oKFsgXFx0XFxyXFxuXSopKFxccyopKSg/Oig/PVxcUylbXFxzXFxTXSpcXFMpPygoXFxzKj8pKFsgXFx0XFxyXFxuXSopKSQvKTtcbiAgcmV0dXJuIHtcbiAgICBsZWFkaW5nOiBtWzFdLFxuICAgIC8vIHdob2xlIHN0cmluZyBmb3Igd2hpdGVzcGFjZS1vbmx5IHN0cmluZ3NcbiAgICBsZWFkaW5nQXNjaWk6IG1bMl0sXG4gICAgbGVhZGluZ05vbkFzY2lpOiBtWzNdLFxuICAgIHRyYWlsaW5nOiBtWzRdLFxuICAgIC8vIGVtcHR5IGZvciB3aGl0ZXNwYWNlLW9ubHkgc3RyaW5nc1xuICAgIHRyYWlsaW5nTm9uQXNjaWk6IG1bNV0sXG4gICAgdHJhaWxpbmdBc2NpaTogbVs2XVxuICB9O1xufVxuZnVuY3Rpb24gaXNGbGFua2VkQnlXaGl0ZXNwYWNlKHNpZGUsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdmFyIHNpYmxpbmc7XG4gIHZhciByZWdFeHA7XG4gIHZhciBpc0ZsYW5rZWQ7XG4gIGlmIChzaWRlID09PSAnbGVmdCcpIHtcbiAgICBzaWJsaW5nID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgcmVnRXhwID0gLyAkLztcbiAgfSBlbHNlIHtcbiAgICBzaWJsaW5nID0gbm9kZS5uZXh0U2libGluZztcbiAgICByZWdFeHAgPSAvXiAvO1xuICB9XG4gIGlmIChzaWJsaW5nKSB7XG4gICAgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIGlzRmxhbmtlZCA9IHJlZ0V4cC50ZXN0KHNpYmxpbmcubm9kZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucHJlZm9ybWF0dGVkQ29kZSAmJiBzaWJsaW5nLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICAgIGlzRmxhbmtlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiAhaXNCbG9jayhzaWJsaW5nKSkge1xuICAgICAgaXNGbGFua2VkID0gcmVnRXhwLnRlc3Qoc2libGluZy50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpc0ZsYW5rZWQ7XG59XG5cbnZhciByZWR1Y2UgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlO1xuZnVuY3Rpb24gVHVybmRvd25TZXJ2aWNlKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFR1cm5kb3duU2VydmljZSkpIHJldHVybiBuZXcgVHVybmRvd25TZXJ2aWNlKG9wdGlvbnMpO1xuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgcnVsZXM6IHJ1bGVzLFxuICAgIGhlYWRpbmdTdHlsZTogJ3NldGV4dCcsXG4gICAgaHI6ICcqICogKicsXG4gICAgYnVsbGV0TGlzdE1hcmtlcjogJyonLFxuICAgIGNvZGVCbG9ja1N0eWxlOiAnaW5kZW50ZWQnLFxuICAgIGZlbmNlOiAnYGBgJyxcbiAgICBlbURlbGltaXRlcjogJ18nLFxuICAgIHN0cm9uZ0RlbGltaXRlcjogJyoqJyxcbiAgICBsaW5rU3R5bGU6ICdpbmxpbmVkJyxcbiAgICBsaW5rUmVmZXJlbmNlU3R5bGU6ICdmdWxsJyxcbiAgICBicjogJyAgJyxcbiAgICBwcmVmb3JtYXR0ZWRDb2RlOiBmYWxzZSxcbiAgICBibGFua1JlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuaXNCbG9jayA/ICdcXG5cXG4nIDogJyc7XG4gICAgfSxcbiAgICBrZWVwUmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgKyBub2RlLm91dGVySFRNTCArICdcXG5cXG4nIDogbm9kZS5vdXRlckhUTUw7XG4gICAgfSxcbiAgICBkZWZhdWx0UmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbicgOiBjb250ZW50O1xuICAgIH1cbiAgfTtcbiAgdGhpcy5vcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gIHRoaXMucnVsZXMgPSBuZXcgUnVsZXModGhpcy5vcHRpb25zKTtcbn1cblR1cm5kb3duU2VydmljZS5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBUaGUgZW50cnkgcG9pbnQgZm9yIGNvbnZlcnRpbmcgYSBzdHJpbmcgb3IgRE9NIG5vZGUgdG8gTWFya2Rvd25cbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXQgVGhlIHN0cmluZyBvciBET00gbm9kZSB0byBjb252ZXJ0XG4gICAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIGlucHV0XG4gICAqIEB0eXBlIFN0cmluZ1xuICAgKi9cblxuICB0dXJuZG93bjogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKCFjYW5Db252ZXJ0KGlucHV0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnB1dCArICcgaXMgbm90IGEgc3RyaW5nLCBvciBhbiBlbGVtZW50L2RvY3VtZW50L2ZyYWdtZW50IG5vZGUuJyk7XG4gICAgfVxuICAgIGlmIChpbnB1dCA9PT0gJycpIHJldHVybiAnJztcbiAgICB2YXIgb3V0cHV0ID0gcHJvY2Vzcy5jYWxsKHRoaXMsIG5ldyBSb290Tm9kZShpbnB1dCwgdGhpcy5vcHRpb25zKSk7XG4gICAgcmV0dXJuIHBvc3RQcm9jZXNzLmNhbGwodGhpcywgb3V0cHV0KTtcbiAgfSxcbiAgLyoqXG4gICAqIEFkZCBvbmUgb3IgbW9yZSBwbHVnaW5zXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtGdW5jdGlvbnxBcnJheX0gcGx1Z2luIFRoZSBwbHVnaW4gb3IgYXJyYXkgb2YgcGx1Z2lucyB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIFR1cm5kb3duIGluc3RhbmNlIGZvciBjaGFpbmluZ1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG5cbiAgdXNlOiBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbHVnaW4ubGVuZ3RoOyBpKyspIHRoaXMudXNlKHBsdWdpbltpXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4odGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BsdWdpbiBtdXN0IGJlIGEgRnVuY3Rpb24gb3IgYW4gQXJyYXkgb2YgRnVuY3Rpb25zJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogQWRkcyBhIHJ1bGVcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlIFRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIGFkZFJ1bGU6IGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICB0aGlzLnJ1bGVzLmFkZChrZXksIHJ1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogS2VlcCBhIG5vZGUgKGFzIEhUTUwpIHRoYXQgbWF0Y2hlcyB0aGUgZmlsdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259IGZpbHRlciBUaGUgdW5pcXVlIGtleSBvZiB0aGUgcnVsZVxuICAgKiBAcmV0dXJucyBUaGUgVHVybmRvd24gaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cblxuICBrZWVwOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5ydWxlcy5rZWVwKGZpbHRlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBub2RlIHRoYXQgbWF0Y2hlcyB0aGUgZmlsdGVyXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8RnVuY3Rpb259IGZpbHRlciBUaGUgdW5pcXVlIGtleSBvZiB0aGUgcnVsZVxuICAgKiBAcmV0dXJucyBUaGUgVHVybmRvd24gaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cblxuICByZW1vdmU6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICB0aGlzLnJ1bGVzLnJlbW92ZShmaWx0ZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvKipcbiAgICogRXNjYXBlcyBNYXJrZG93biBzeW50YXhcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZXNjYXBlXG4gICAqIEByZXR1cm5zIEEgc3RyaW5nIHdpdGggTWFya2Rvd24gc3ludGF4IGVzY2FwZWRcbiAgICogQHR5cGUgU3RyaW5nXG4gICAqL1xuXG4gIGVzY2FwZTogZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHJldHVybiBlc2NhcGVNYXJrZG93bihzdHJpbmcpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlZHVjZXMgYSBET00gbm9kZSBkb3duIHRvIGl0cyBNYXJrZG93biBzdHJpbmcgZXF1aXZhbGVudFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudE5vZGUgVGhlIG5vZGUgdG8gY29udmVydFxuICogQHJldHVybnMgQWNjdW11bGF0b3Igd2l0aCBNYXJrZG93biByZXByZXNlbnRhdGlvbiBwYXJ0cyBvZiB0aGUgbm9kZVxuICogQHR5cGUgQXJyYXlcbiAqL1xuXG5mdW5jdGlvbiBwcm9jZXNzKHBhcmVudE5vZGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXR1cm4gcmVkdWNlLmNhbGwocGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBmdW5jdGlvbiAob3V0cHV0LCBub2RlKSB7XG4gICAgbm9kZSA9IG5ldyBOb2RlKG5vZGUsIHNlbGYub3B0aW9ucyk7XG4gICAgdmFyIHJlcGxhY2VtZW50ID0gJyc7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gbm9kZS5pc0NvZGUgPyBub2RlLm5vZGVWYWx1ZSA6IHNlbGYuZXNjYXBlKG5vZGUubm9kZVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gcmVwbGFjZW1lbnRGb3JOb2RlLmNhbGwoc2VsZiwgbm9kZSk7XG4gICAgfVxuICAgIGpvaW4ob3V0cHV0LCByZXBsYWNlbWVudCk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSwgW10pO1xufVxuXG4vKipcbiAqIEFwcGVuZHMgc3RyaW5ncyBhcyBlYWNoIHJ1bGUgcmVxdWlyZXMgYW5kIHRyaW1zIHRoZSBvdXRwdXRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBvdXRwdXQgVGhlIGNvbnZlcnNpb24gb3V0cHV0IGFjY3VtdWxhdG9yXG4gKiBAcmV0dXJucyBBIHRyaW1tZWQgdmVyc2lvbiBvZiB0aGUgb3VwdXRcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHBvc3RQcm9jZXNzKG91dHB1dCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIGlmICh0eXBlb2YgcnVsZS5hcHBlbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGpvaW4ob3V0cHV0LCBydWxlLmFwcGVuZChzZWxmLm9wdGlvbnMpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpLnJlcGxhY2UoL15bXFx0XFxyXFxuXSsvLCAnJykucmVwbGFjZSgvW1xcdFxcclxcblxcc10rJC8sICcnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBlbGVtZW50IG5vZGUgdG8gaXRzIE1hcmtkb3duIGVxdWl2YWxlbnRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRoZSBub2RlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIG5vZGVcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHJlcGxhY2VtZW50Rm9yTm9kZShub2RlKSB7XG4gIHZhciBydWxlID0gdGhpcy5ydWxlcy5mb3JOb2RlKG5vZGUpO1xuICB2YXIgY29udGVudCA9IHByb2Nlc3MuY2FsbCh0aGlzLCBub2RlKS5qb2luKCcnKTtcbiAgdmFyIHdoaXRlc3BhY2UgPSBub2RlLmZsYW5raW5nV2hpdGVzcGFjZTtcbiAgaWYgKHdoaXRlc3BhY2UubGVhZGluZyB8fCB3aGl0ZXNwYWNlLnRyYWlsaW5nKSBjb250ZW50ID0gY29udGVudC50cmltKCk7XG4gIHJldHVybiB3aGl0ZXNwYWNlLmxlYWRpbmcgKyBydWxlLnJlcGxhY2VtZW50KGNvbnRlbnQsIG5vZGUsIHRoaXMub3B0aW9ucykgKyB3aGl0ZXNwYWNlLnRyYWlsaW5nO1xufVxuXG4vKipcbiAqIEpvaW5zIHJlcGxhY2VtZW50IHdpdGggdGhlIGN1cnJlbnQgb3V0cHV0IGFjY3VtdWxhdG9yIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBudW1iZXIgb2YgbmV3IGxpbmVzXG4gKiAobWFrZXMgc3VyZSB0aGUgb25seSB0cmFpbGluZyB3aGl0ZXNwYWNlIHdpbGwgYmUgaW4gdGhlIGxhc3QgYXJyYXkgZWxlbWVudClcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBjdXJyZW50IGNvbnZlcnNpb24gb3V0cHV0IGFjY3VtdWxhdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byBhcHBlbmQgdG8gdGhlIG91dHB1dFxuICovXG5cbmZ1bmN0aW9uIGpvaW4ob3V0cHV0LCByZXBsYWNlbWVudCkge1xuICB2YXIgdGFpbCA9IG91dHB1dC5wb3AoKSB8fCAnJztcbiAgdmFyIHMxID0gdHJpbVRyYWlsaW5nTmV3bGluZXModGFpbCk7XG4gIHZhciBzMiA9IHRyaW1MZWFkaW5nTmV3bGluZXMocmVwbGFjZW1lbnQpO1xuICB2YXIgbmxzID0gTWF0aC5tYXgodGFpbC5sZW5ndGggLSBzMS5sZW5ndGgsIHJlcGxhY2VtZW50Lmxlbmd0aCAtIHMyLmxlbmd0aCk7XG4gIHZhciBzZXBhcmF0b3IgPSAnXFxuXFxuJy5zdWJzdHJpbmcoMCwgbmxzKTtcbiAgaWYgKHMxKSBvdXRwdXQucHVzaChzMSk7XG4gIGlmIChzZXBhcmF0b3IpIG91dHB1dC5wdXNoKHNlcGFyYXRvcik7XG4gIGlmIChzMikgb3V0cHV0LnB1c2goczIpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhbiBpbnB1dCBjYW4gYmUgY29udmVydGVkXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IGlucHV0IERlc2NyaWJlIHRoaXMgcGFyYW1ldGVyXG4gKiBAcmV0dXJucyBEZXNjcmliZSB3aGF0IGl0IHJldHVybnNcbiAqIEB0eXBlIFN0cmluZ3xPYmplY3R8QXJyYXl8Qm9vbGVhbnxOdW1iZXJcbiAqL1xuXG5mdW5jdGlvbiBjYW5Db252ZXJ0KGlucHV0KSB7XG4gIHJldHVybiBpbnB1dCAhPSBudWxsICYmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8IGlucHV0Lm5vZGVUeXBlICYmIChpbnB1dC5ub2RlVHlwZSA9PT0gMSB8fCBpbnB1dC5ub2RlVHlwZSA9PT0gOSB8fCBpbnB1dC5ub2RlVHlwZSA9PT0gMTEpKTtcbn1cblxuZXhwb3J0IHsgVHVybmRvd25TZXJ2aWNlIGFzIGRlZmF1bHQgfTtcbiIsICJ2YXIgaGlnaGxpZ2h0UmVnRXhwID0gL2hpZ2hsaWdodC0oPzooPzp0ZXh0fHNvdXJjZSktKT8oW2EtejAtOV0rKS9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGlnaGxpZ2h0ZWRDb2RlQmxvY2sgKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnaGlnaGxpZ2h0ZWRDb2RlQmxvY2snLCB7XG4gICAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBub2RlLmZpcnN0Q2hpbGRcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdESVYnICYmXG4gICAgICAgIGhpZ2hsaWdodFJlZ0V4cC50ZXN0KG5vZGUuY2xhc3NOYW1lKSAmJlxuICAgICAgICBmaXJzdENoaWxkICYmXG4gICAgICAgIGZpcnN0Q2hpbGQubm9kZU5hbWUgPT09ICdQUkUnXG4gICAgICApXG4gICAgfSxcbiAgICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBub2RlLmNsYXNzTmFtZSB8fCAnJ1xuICAgICAgdmFyIGxhbmd1YWdlID0gKGNsYXNzTmFtZS5tYXRjaChoaWdobGlnaHRSZWdFeHApIHx8IFtudWxsLCAnJ10pWzFdXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgICdcXG5cXG4nICsgb3B0aW9ucy5mZW5jZSArIGxhbmd1YWdlICsgJ1xcbicgK1xuICAgICAgICBub2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgK1xuICAgICAgICAnXFxuJyArIG9wdGlvbnMuZmVuY2UgKyAnXFxuXFxuJ1xuICAgICAgKVxuICAgIH1cbiAgfSlcbn1cbiIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpa2V0aHJvdWdoICh0dXJuZG93blNlcnZpY2UpIHtcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ3N0cmlrZXRocm91Z2gnLCB7XG4gICAgZmlsdGVyOiBbJ2RlbCcsICdzJywgJ3N0cmlrZSddLFxuICAgIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgcmV0dXJuICd+ficgKyBjb250ZW50ICsgJ35+J1xuICAgIH1cbiAgfSlcbn1cbiIsICJ2YXIgcnVsZXMgPSB7fVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gc2FmZWx5IGdldCB0ZXh0IGNvbnRlbnQgYW5kIGNsZWFuIGl0XG5mdW5jdGlvbiBjbGVhbkNlbGxDb250ZW50KGNvbnRlbnQpIHtcbiAgaWYgKCFjb250ZW50KSByZXR1cm4gJyAgICcgLy8gRGVmYXVsdCBlbXB0eSBjZWxsIGNvbnRlbnRcbiAgXG4gIC8vIENsZWFuIGFuZCBub3JtYWxpemUgY29udGVudFxuICBsZXQgY2xlYW5lZCA9IGNvbnRlbnRcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJyAnKSAvLyBOb3JtYWxpemUgd2hpdGVzcGFjZVxuICAgIC5yZXBsYWNlKC9cXHwvZywgJ1xcXFx8JykgLy8gRXNjYXBlIHBpcGVzXG4gICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykgLy8gRXNjYXBlIGJhY2tzbGFzaGVzXG4gICAgLnJlcGxhY2UoL1xcbisvZywgJyAnKSAvLyBDb252ZXJ0IG5ld2xpbmVzIHRvIHNwYWNlc1xuICAgIC5yZXBsYWNlKC9cXHIrL2csICcgJykgLy8gQ29udmVydCBjYXJyaWFnZSByZXR1cm5zIHRvIHNwYWNlc1xuICBcbiAgLy8gSWYgY29udGVudCBpcyBzdGlsbCBlbXB0eSBvciBvbmx5IHdoaXRlc3BhY2UsIHByb3ZpZGUgZGVmYXVsdFxuICBpZiAoIWNsZWFuZWQgfHwgY2xlYW5lZC5tYXRjaCgvXlxccyokLykpIHtcbiAgICByZXR1cm4gJyAgICdcbiAgfVxuICBcbiAgLy8gRW5zdXJlIG1pbmltdW0gd2lkdGggZm9yIHRhYmxlIHJlYWRhYmlsaXR5XG4gIGlmIChjbGVhbmVkLmxlbmd0aCA8IDMpIHtcbiAgICBjbGVhbmVkICs9ICcgJy5yZXBlYXQoMyAtIGNsZWFuZWQubGVuZ3RoKVxuICB9XG4gIFxuICByZXR1cm4gY2xlYW5lZFxufVxuXG4vLyBFbmhhbmNlZCBjZWxsIHJlcGxhY2VtZW50IHdpdGggY29sc3BhbiBzdXBwb3J0XG5mdW5jdGlvbiBjZWxsKGNvbnRlbnQsIG5vZGUsIGluZGV4KSB7XG4gIGlmIChpbmRleCA9PT0gbnVsbCAmJiBub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChub2RlLnBhcmVudE5vZGUuY2hpbGROb2Rlcywgbm9kZSlcbiAgfVxuICBpZiAoaW5kZXggPT09IG51bGwpIGluZGV4ID0gMFxuICBcbiAgdmFyIHByZWZpeCA9ICcgJ1xuICBpZiAoaW5kZXggPT09IDApIHByZWZpeCA9ICd8ICdcbiAgXG4gIGxldCBjZWxsQ29udGVudCA9IGNsZWFuQ2VsbENvbnRlbnQoY29udGVudClcbiAgXG4gIC8vIEhhbmRsZSBjb2xzcGFuIGJ5IGFkZGluZyBleHRyYSBlbXB0eSBjZWxsc1xuICBsZXQgY29sc3BhbiA9IDFcbiAgaWYgKG5vZGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUpIHtcbiAgICBjb2xzcGFuID0gcGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSB8fCAnMScsIDEwKVxuICAgIGlmIChpc05hTihjb2xzcGFuKSB8fCBjb2xzcGFuIDwgMSkgY29sc3BhbiA9IDFcbiAgfVxuICBcbiAgbGV0IHJlc3VsdCA9IHByZWZpeCArIGNlbGxDb250ZW50ICsgJyB8J1xuICBcbiAgLy8gQWRkIGVtcHR5IGNlbGxzIGZvciBjb2xzcGFuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgY29sc3BhbjsgaSsrKSB7XG4gICAgcmVzdWx0ICs9ICcgICB8J1xuICB9XG4gIFxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vIENoZWNrIGlmIHRoaXMgaXMgYSBoZWFkaW5nIHJvdyAoZW5oYW5jZWQgZm9yIGVkZ2UgY2FzZXMpXG5mdW5jdGlvbiBpc0hlYWRpbmdSb3codHIpIHtcbiAgaWYgKCF0ciB8fCAhdHIucGFyZW50Tm9kZSkgcmV0dXJuIGZhbHNlXG4gIFxuICB2YXIgcGFyZW50Tm9kZSA9IHRyLnBhcmVudE5vZGVcbiAgXG4gIC8vIENoZWNrIGlmIHBhcmVudCBpcyBUSEVBRFxuICBpZiAocGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ1RIRUFEJykgcmV0dXJuIHRydWVcbiAgXG4gIC8vIENoZWNrIGlmIGl0J3MgdGhlIGZpcnN0IHJvdyBhbmQgY29udGFpbnMgVEggZWxlbWVudHNcbiAgaWYgKHBhcmVudE5vZGUuZmlyc3RDaGlsZCA9PT0gdHIgJiYgXG4gICAgICAocGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ1RBQkxFJyB8fCBwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnVEJPRFknKSkge1xuICAgIFxuICAgIC8vIENoZWNrIGlmIGFsbCBjaGlsZCBub2RlcyBhcmUgVEggKGlnbm9yZSB0ZXh0IG5vZGVzKVxuICAgIHZhciBjZWxsTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwodHIuY2hpbGROb2RlcywgZnVuY3Rpb24obikge1xuICAgICAgcmV0dXJuIG4ubm9kZVR5cGUgPT09IDEgLy8gRWxlbWVudCBub2RlcyBvbmx5XG4gICAgfSlcbiAgICBcbiAgICBpZiAoY2VsbE5vZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlXG4gICAgXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5ldmVyeS5jYWxsKGNlbGxOb2RlcywgZnVuY3Rpb24gKG4pIHsgXG4gICAgICByZXR1cm4gbi5ub2RlTmFtZSA9PT0gJ1RIJyBcbiAgICB9KVxuICB9XG4gIFxuICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gR2V0IHRhYmxlIGNvbHVtbiBjb3VudCAoaGFuZGxlcyBlZGdlIGNhc2VzKVxuZnVuY3Rpb24gZ2V0VGFibGVDb2xDb3VudCh0YWJsZSkge1xuICBpZiAoIXRhYmxlIHx8ICF0YWJsZS5yb3dzKSByZXR1cm4gMFxuICBcbiAgbGV0IG1heENvbHMgPSAwXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IHRhYmxlLnJvd3NbaV1cbiAgICBpZiAoIXJvdyB8fCAhcm93LmNoaWxkTm9kZXMpIGNvbnRpbnVlXG4gICAgXG4gICAgbGV0IGNvbENvdW50ID0gMFxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcm93LmNoaWxkTm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSByb3cuY2hpbGROb2Rlc1tqXVxuICAgICAgaWYgKGNlbGwubm9kZVR5cGUgPT09IDEgJiYgKGNlbGwubm9kZU5hbWUgPT09ICdURCcgfHwgY2VsbC5ub2RlTmFtZSA9PT0gJ1RIJykpIHtcbiAgICAgICAgY29uc3QgY29sc3BhbiA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykgfHwgJzEnLCAxMClcbiAgICAgICAgY29sQ291bnQgKz0gaXNOYU4oY29sc3BhbikgPyAxIDogTWF0aC5tYXgoMSwgY29sc3BhbilcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKGNvbENvdW50ID4gbWF4Q29scykgbWF4Q29scyA9IGNvbENvdW50XG4gIH1cbiAgXG4gIHJldHVybiBtYXhDb2xzXG59XG5cbi8vIENoZWNrIGlmIHRhYmxlIHNob3VsZCBiZSBza2lwcGVkICh0b28gc2ltcGxlIG9yIG1hbGZvcm1lZClcbmZ1bmN0aW9uIHNob3VsZFNraXBUYWJsZSh0YWJsZSkge1xuICBpZiAoIXRhYmxlKSByZXR1cm4gdHJ1ZVxuICBcbiAgLy8gU2tpcCBjb21wbGV0ZWx5IGVtcHR5IHRhYmxlc1xuICBpZiAoIXRhYmxlLnJvd3MgfHwgdGFibGUucm93cy5sZW5ndGggPT09IDApIHJldHVybiB0cnVlXG4gIFxuICAvLyBDb3VudCBhY3R1YWwgY29udGVudCBjZWxsc1xuICBsZXQgY29udGVudENlbGxzID0gMFxuICBsZXQgdG90YWxDZWxscyA9IDBcbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUucm93cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IHRhYmxlLnJvd3NbaV1cbiAgICBpZiAoIXJvdyB8fCAhcm93LmNoaWxkTm9kZXMpIGNvbnRpbnVlXG4gICAgXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHJvdy5jaGlsZE5vZGVzW2pdXG4gICAgICBpZiAoY2VsbC5ub2RlVHlwZSA9PT0gMSAmJiAoY2VsbC5ub2RlTmFtZSA9PT0gJ1REJyB8fCBjZWxsLm5vZGVOYW1lID09PSAnVEgnKSkge1xuICAgICAgICB0b3RhbENlbGxzKytcbiAgICAgICAgaWYgKGNlbGwudGV4dENvbnRlbnQgJiYgY2VsbC50ZXh0Q29udGVudC50cmltKCkpIHtcbiAgICAgICAgICBjb250ZW50Q2VsbHMrK1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLyBTa2lwIGlmIG5vIGNlbGxzIG9yIG9ubHkgb25lIGNlbGwgd2l0aCBubyBtZWFuaW5nZnVsIGNvbnRlbnRcbiAgaWYgKHRvdGFsQ2VsbHMgPT09IDApIHJldHVybiB0cnVlXG4gIGlmICh0b3RhbENlbGxzID09PSAxICYmIGNvbnRlbnRDZWxscyA9PT0gMCkgcmV0dXJuIHRydWVcbiAgXG4gIHJldHVybiBmYWxzZVxufVxuXG5ydWxlcy50YWJsZUNlbGwgPSB7XG4gIGZpbHRlcjogWyd0aCcsICd0ZCddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICByZXR1cm4gY2VsbChjb250ZW50LCBub2RlLCBudWxsKVxuICB9XG59XG5cbnJ1bGVzLnRhYmxlUm93ID0ge1xuICBmaWx0ZXI6ICd0cicsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIC8vIFNraXAgZW1wdHkgcm93c1xuICAgIGlmICghY29udGVudCB8fCAhY29udGVudC50cmltKCkpIHJldHVybiAnJ1xuICAgIFxuICAgIHZhciBib3JkZXJDZWxscyA9ICcnXG4gICAgXG4gICAgLy8gQWRkIHNlcGFyYXRvciByb3cgZm9yIGhlYWRpbmdcbiAgICBpZiAoaXNIZWFkaW5nUm93KG5vZGUpKSB7XG4gICAgICBjb25zdCB0YWJsZSA9IG5vZGUuY2xvc2VzdCgndGFibGUnKVxuICAgICAgaWYgKHRhYmxlKSB7XG4gICAgICAgIGNvbnN0IGNvbENvdW50ID0gZ2V0VGFibGVDb2xDb3VudCh0YWJsZSlcbiAgICAgICAgXG4gICAgICAgIGlmIChjb2xDb3VudCA+IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGkgPT09IDAgPyAnfCAnIDogJyAnXG4gICAgICAgICAgICBib3JkZXJDZWxscyArPSBwcmVmaXggKyAnLS0tJyArICcgfCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuICdcXG4nICsgY29udGVudCArIChib3JkZXJDZWxscyA/ICdcXG4nICsgYm9yZGVyQ2VsbHMgOiAnJylcbiAgfVxufVxuXG5ydWxlcy50YWJsZSA9IHtcbiAgZmlsdGVyOiAndGFibGUnLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAvLyBDaGVjayBpZiB0YWJsZSBzaG91bGQgYmUgc2tpcHBlZFxuICAgIGlmIChzaG91bGRTa2lwVGFibGUobm9kZSkpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBcbiAgICAvLyBDbGVhbiB1cCBjb250ZW50IChyZW1vdmUgZXh0cmEgbmV3bGluZXMpXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXFxuKy9nLCAnXFxuJykudHJpbSgpXG4gICAgXG4gICAgLy8gSWYgbm8gY29udGVudCBhZnRlciBjbGVhbmluZywgcmV0dXJuIGVtcHR5XG4gICAgaWYgKCFjb250ZW50KSByZXR1cm4gJydcbiAgICBcbiAgICAvLyBTcGxpdCBpbnRvIGxpbmVzIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IGxpbmVzXG4gICAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KCdcXG4nKS5maWx0ZXIobGluZSA9PiBsaW5lLnRyaW0oKSlcbiAgICBcbiAgICBpZiAobGluZXMubGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgICBcbiAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIGFkZCBhIGhlYWRlciByb3dcbiAgICBjb25zdCBoYXNIZWFkZXJTZXBhcmF0b3IgPSBsaW5lcy5sZW5ndGggPj0gMiAmJiAvXFx8XFxzKi0rLy50ZXN0KGxpbmVzWzFdKVxuICAgIFxuICAgIGxldCByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKVxuICAgIFxuICAgIC8vIElmIG5vIGhlYWRlciBzZXBhcmF0b3IgZXhpc3RzLCBhZGQgYSBzaW1wbGUgb25lXG4gICAgaWYgKCFoYXNIZWFkZXJTZXBhcmF0b3IgJiYgbGluZXMubGVuZ3RoID49IDEpIHtcbiAgICAgIGNvbnN0IGZpcnN0TGluZSA9IGxpbmVzWzBdXG4gICAgICBjb25zdCBjb2xDb3VudCA9IChmaXJzdExpbmUubWF0Y2goL1xcfC9nKSB8fCBbXSkubGVuZ3RoIC0gMVxuICAgICAgXG4gICAgICBpZiAoY29sQ291bnQgPiAwKSB7XG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSAnfCdcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xDb3VudDsgaSsrKSB7XG4gICAgICAgICAgc2VwYXJhdG9yICs9ICcgLS0tIHwnXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEluc2VydCBzZXBhcmF0b3IgYWZ0ZXIgZmlyc3QgbGluZVxuICAgICAgICBjb25zdCByZXN1bHRMaW5lcyA9IFtsaW5lc1swXSwgc2VwYXJhdG9yLCAuLi5saW5lcy5zbGljZSgxKV1cbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0TGluZXMuam9pbignXFxuJylcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuICdcXG5cXG4nICsgcmVzdWx0ICsgJ1xcblxcbidcbiAgfVxufVxuXG4vLyBSZW1vdmUgdGFibGUgc2VjdGlvbnMgYnV0IGtlZXAgY29udGVudFxucnVsZXMudGFibGVTZWN0aW9uID0ge1xuICBmaWx0ZXI6IFsndGhlYWQnLCAndGJvZHknLCAndGZvb3QnXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuXG4vLyBSZW1vdmUgY2FwdGlvbnMgYW5kIGNvbGdyb3Vwc1xucnVsZXMudGFibGVDYXB0aW9uID0ge1xuICBmaWx0ZXI6IFsnY2FwdGlvbiddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24oKSB7IHJldHVybiAnJyB9XG59XG5cbnJ1bGVzLnRhYmxlQ29sZ3JvdXAgPSB7XG4gIGZpbHRlcjogWydjb2xncm91cCcsICdjb2wnXSxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gJycgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YWJsZXModHVybmRvd25TZXJ2aWNlKSB7XG4gIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKGtleSwgcnVsZXNba2V5XSlcbiAgfVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhc2tMaXN0SXRlbXMgKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgndGFza0xpc3RJdGVtcycsIHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS50eXBlID09PSAnY2hlY2tib3gnICYmIG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ0xJJ1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gKG5vZGUuY2hlY2tlZCA/ICdbeF0nIDogJ1sgXScpICsgJyAnXG4gICAgfVxuICB9KVxufVxuIiwgImltcG9ydCBoaWdobGlnaHRlZENvZGVCbG9jayBmcm9tICcuL2hpZ2hsaWdodGVkLWNvZGUtYmxvY2suanMnXG5pbXBvcnQgc3RyaWtldGhyb3VnaCBmcm9tICcuL3N0cmlrZXRocm91Z2guanMnXG5pbXBvcnQgdGFibGVzIGZyb20gJy4vdGFibGVzLmpzJ1xuaW1wb3J0IHRhc2tMaXN0SXRlbXMgZnJvbSAnLi90YXNrLWxpc3QtaXRlbXMuanMnXG5cbmZ1bmN0aW9uIGdmbSAodHVybmRvd25TZXJ2aWNlKSB7XG4gIHR1cm5kb3duU2VydmljZS51c2UoW1xuICAgIGhpZ2hsaWdodGVkQ29kZUJsb2NrLFxuICAgIHN0cmlrZXRocm91Z2gsXG4gICAgdGFibGVzLFxuICAgIHRhc2tMaXN0SXRlbXNcbiAgXSlcbn1cblxuZXhwb3J0IHsgZ2ZtLCBoaWdobGlnaHRlZENvZGVCbG9jaywgc3RyaWtldGhyb3VnaCwgdGFibGVzLCB0YXNrTGlzdEl0ZW1zIH1cbmV4cG9ydCBkZWZhdWx0IGdmbSAiLCAiLyoqXG4gKiBQbHVnaW46IENvbmZsdWVuY2UgUGFuZWwgTWFjcm9zXG4gKiBDb252ZXJ0cyBpbmZvL3dhcm5pbmcvbm90ZS90aXAgcGFuZWxzIHRvIGJsb2NrcXVvdGUgZm9ybWF0LlxuICogQGltcGxlbWVudHMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uZmx1ZW5jZVBhbmVsc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VQYW5lbCcsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdESVYnKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBjbCA9IG5vZGUuY2xhc3NMaXN0O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8nKSB8fFxuICAgICAgICBjbC5jb250YWlucygncGFuZWwnKSB8fFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNyby1pbmZvcm1hdGlvbicpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLXdhcm5pbmcnKSB8fFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNyby1ub3RlJykgfHxcbiAgICAgICAgY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8tdGlwJylcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChjb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCBtYWNyb05hbWUgPVxuICAgICAgICBub2RlLmRhdGFzZXQ/Lm1hY3JvTmFtZSB8fFxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tYWNyby1uYW1lJykgfHxcbiAgICAgICAgZGV0ZWN0UGFuZWxUeXBlKG5vZGUpO1xuICAgICAgY29uc3QgbGFiZWwgPSBtYWNyb05hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IGJvZHkgPSBjb250ZW50LnRyaW0oKS5yZXBsYWNlKC9cXG4vZywgJ1xcbj4gJyk7XG4gICAgICByZXR1cm4gYFxcbj4gKioke2xhYmVsfToqKiAke2JvZHl9XFxuXFxuYDtcbiAgICB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGV0ZWN0UGFuZWxUeXBlKG5vZGUpIHtcbiAgY29uc3QgY2wgPSBub2RlLmNsYXNzTGlzdDtcbiAgaWYgKGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLXdhcm5pbmcnKSkgcmV0dXJuICd3YXJuaW5nJztcbiAgaWYgKGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLW5vdGUnKSkgcmV0dXJuICdub3RlJztcbiAgaWYgKGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLXRpcCcpKSByZXR1cm4gJ3RpcCc7XG4gIHJldHVybiAnaW5mbyc7XG59XG4iLCAiLyoqXG4gKiBQbHVnaW46IENvbmZsdWVuY2UgQ29kZSBCbG9ja3NcbiAqIENvbnZlcnRzIENvbmZsdWVuY2UgY29kZSBwYW5lbHMvYmxvY2tzIHRvIGZlbmNlZCBjb2RlIGJsb2NrcyAoYGBgKS5cbiAqIFN1cHBvcnRzIGJvdGggU2VydmVyL0RDIGFuZCBDbG91ZCBIVE1MIHN0cnVjdHVyZXMuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlQ29kZVBsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgLy8gXHUyNTAwXHUyNTAwIFJ1bGUgMTogQ29uZmx1ZW5jZSBTZXJ2ZXIvREMgXHUyMDE0IGRpdi5jb2RlLnBhbmVsIFx1MjUwMFx1MjUwMFxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZUNvZGVQYW5lbCcsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0RJVicgJiZcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvZGUnKSAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygncGFuZWwnKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCBwYXJhbVN0ciA9XG4gICAgICAgIG5vZGUucXVlcnlTZWxlY3RvcignLmNvZGUnKT8uZGF0YXNldD8uc3ludGF4aGlnaGxpZ2h0ZXJQYXJhbXMgfHwgJyc7XG4gICAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmcocGFyYW1TdHIpO1xuICAgICAgY29uc3QgY29kZUVsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBjb2RlRWwgPyBjb2RlRWwudGV4dENvbnRlbnQgOiBfY29udGVudC50cmltKCk7XG4gICAgICByZXR1cm4gYFxcblxcYFxcYFxcYCR7bGFuZ31cXG4ke2NvZGV9XFxuXFxgXFxgXFxgXFxuYDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSAyOiBDb25mbHVlbmNlIENsb3VkIFx1MjAxNCBkaXZbZGF0YS1ub2RlLXR5cGU9XCJjb2RlQmxvY2tcIl0gXHUyNTAwXHUyNTAwXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlQ2xvdWRDb2RlQmxvY2snLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdESVYnICYmXG4gICAgICAgIChub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1ub2RlLXR5cGUnKSA9PT0gJ2NvZGVCbG9jaycgfHxcbiAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2RlLWJsb2NrJykpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IGxhbmcgPVxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1sYW5ndWFnZScpIHx8XG4gICAgICAgIG5vZGUuZGF0YXNldD8ubGFuZ3VhZ2UgfHxcbiAgICAgICAgJyc7XG4gICAgICBjb25zdCBjb2RlID0gZXh0cmFjdENvZGVUZXh0KG5vZGUpO1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJ1bGUgMzogQ29uZmx1ZW5jZSBtYWNybyB0YWJsZS1iYXNlZCBjb2RlIGJsb2NrcyBcdTI1MDBcdTI1MDBcbiAgLy8gPHRhYmxlIGRhdGEtbWFjcm8tbmFtZT1cImNvZGVcIj4gb3Igd2l0aCBjbGFzcyBcInd5c2l3eWctbWFjcm9cIlxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZUNvZGVNYWNyb1RhYmxlJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ1RBQkxFJykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFjcm8tbmFtZScpID09PSAnY29kZScgfHxcbiAgICAgICAgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd3eXNpd3lnLW1hY3JvJykgJiZcbiAgICAgICAgIG5vZGUucXVlcnlTZWxlY3RvcigncHJlJykpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IHBhcmFtU3RyID1cbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWFjcm8tcGFyYW1ldGVycycpIHx8XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcycpIHx8ICcnO1xuICAgICAgY29uc3QgbGFuZyA9IGV4dHJhY3RMYW5nKHBhcmFtU3RyKTtcbiAgICAgIGNvbnN0IHByZSA9IG5vZGUucXVlcnlTZWxlY3RvcigncHJlJyk7XG4gICAgICBjb25zdCBjb2RlID0gcHJlID8gcHJlLnRleHRDb250ZW50IDogX2NvbnRlbnQudHJpbSgpO1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJ1bGUgNDogcHJlIHdpdGggQ29uZmx1ZW5jZS1zcGVjaWZpYyBhdHRyaWJ1dGVzIFx1MjUwMFx1MjUwMFxuICAvLyBDYXRjaGVzIDxwcmU+IHdpdGggZGF0YS1zeW50YXhoaWdobGlnaHRlci1wYXJhbXMgb3IgY2xhc3M9XCJzeW50YXhoaWdobGlnaHRlci0qXCJcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VQcmVCbG9jaycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdQUkUnKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gISEoXG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcycpIHx8XG4gICAgICAgIG5vZGUuY2xhc3NOYW1lLm1hdGNoKC9zeW50YXhoaWdobGlnaHRlci8pIHx8XG4gICAgICAgIC8vIENvbmZsdWVuY2UgQ2xvdWQ6IDxwcmU+IGluc2lkZSBjb2RlQmxvY2sgd3JhcHBlciAoYWxyZWFkeSBoYW5kbGVkIGJ5IHJ1bGUgMixcbiAgICAgICAgLy8gYnV0IGNhdGNoIHN0YW5kYWxvbmUgb25lcylcbiAgICAgICAgbm9kZS5wYXJlbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ2RhdGEtbm9kZS10eXBlJykgPT09ICdjb2RlQmxvY2snXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIC8vIFNraXAgaWYgcGFyZW50IGlzIGFscmVhZHkgaGFuZGxlZCBieSBydWxlIDJcbiAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnZGF0YS1ub2RlLXR5cGUnKSA9PT0gJ2NvZGVCbG9jaycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBsZXQgcnVsZSAyIGhhbmRsZSBpdFxuICAgICAgfVxuICAgICAgY29uc3QgcGFyYW1TdHIgPSBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1zeW50YXhoaWdobGlnaHRlci1wYXJhbXMnKSB8fCAnJztcbiAgICAgIGNvbnN0IGxhbmcgPSBleHRyYWN0TGFuZyhwYXJhbVN0cik7XG4gICAgICBjb25zdCBjb2RlID0gbm9kZS50ZXh0Q29udGVudDtcbiAgICAgIHJldHVybiBgXFxuXFxgXFxgXFxgJHtsYW5nfVxcbiR7Y29kZX1cXG5cXGBcXGBcXGBcXG5gO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFx1MjUwMFx1MjUwMCBSdWxlIDU6IEdlbmVyaWMgPHByZT48Y29kZT4gXHUyMDE0IGltcHJvdmUgVHVybmRvd24ncyBkZWZhdWx0IFx1MjUwMFx1MjUwMFxuICAvLyBUdXJuZG93biBoYW5kbGVzIHRoaXMgbmF0aXZlbHksIGJ1dCBzb21ldGltZXMgbG9zZXMgbmV3bGluZXNcbiAgLy8gd2hlbiA8Y29kZT4gY29udGFpbnMgPHNwYW4+IHdyYXBwZXJzIChzeW50YXggaGlnaGxpZ2h0aW5nKS5cbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ3ByZUNvZGVXaXRoU3BhbnMnLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSAnUFJFJykgcmV0dXJuIGZhbHNlO1xuICAgICAgY29uc3QgY29kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignY29kZScpO1xuICAgICAgaWYgKCFjb2RlKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyBPbmx5IGludGVyY2VwdCBpZiBjb2RlIGNvbnRhaW5zIGNoaWxkIGVsZW1lbnRzIChzcGFucyBmb3Igc3ludGF4IGhpZ2hsaWdodClcbiAgICAgIHJldHVybiBjb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3QgY29kZUVsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG4gICAgICBjb25zdCBsYW5nID1cbiAgICAgICAgZXh0cmFjdExhbmdGcm9tQ2xhc3MoY29kZUVsLmNsYXNzTmFtZSkgfHxcbiAgICAgICAgZXh0cmFjdExhbmdGcm9tQ2xhc3Mobm9kZS5jbGFzc05hbWUpIHx8XG4gICAgICAgICcnO1xuICAgICAgY29uc3QgY29kZSA9IGV4dHJhY3RDb2RlVGV4dChub2RlKTtcbiAgICAgIHJldHVybiBgXFxuXFxgXFxgXFxgJHtsYW5nfVxcbiR7Y29kZX1cXG5cXGBcXGBcXGBcXG5gO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgbGFuZ3VhZ2UgZnJvbSBDb25mbHVlbmNlIHN5bnRheGhpZ2hsaWdodGVyIHBhcmFtcyBzdHJpbmcuXG4gKiBlLmcuIFwiYnJ1c2g6IGJhc2g7IGd1dHRlcjogdHJ1ZVwiIFx1MjE5MiBcImJhc2hcIlxuICovXG5mdW5jdGlvbiBleHRyYWN0TGFuZyhwYXJhbVN0cikge1xuICBjb25zdCBtYXRjaCA9IHBhcmFtU3RyLm1hdGNoKC9icnVzaDpcXHMqKFxcdyspLyk7XG4gIHJldHVybiBtYXRjaCA/IG5vcm1hbGl6ZUxhbmd1YWdlKG1hdGNoWzFdKSA6ICcnO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgbGFuZ3VhZ2UgZnJvbSBDU1MgY2xhc3MgbmFtZXMuXG4gKiBlLmcuIFwibGFuZ3VhZ2UtYmFzaFwiLCBcImxhbmctanNcIiwgXCJicnVzaC1weXRob25cIlxuICovXG5mdW5jdGlvbiBleHRyYWN0TGFuZ0Zyb21DbGFzcyhjbGFzc05hbWUpIHtcbiAgaWYgKCFjbGFzc05hbWUpIHJldHVybiAnJztcbiAgY29uc3QgbWF0Y2ggPSBjbGFzc05hbWUubWF0Y2goLyg/Omxhbmd1YWdlfGxhbmd8YnJ1c2gpLShcXHcrKS8pO1xuICByZXR1cm4gbWF0Y2ggPyBub3JtYWxpemVMYW5ndWFnZShtYXRjaFsxXSkgOiAnJztcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgY29tbW9uIGxhbmd1YWdlIGFsaWFzZXMgdG8gc3RhbmRhcmQgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxhbmd1YWdlKGxhbmcpIHtcbiAgY29uc3QgYWxpYXNlcyA9IHtcbiAgICBqczogJ2phdmFzY3JpcHQnLFxuICAgIHRzOiAndHlwZXNjcmlwdCcsXG4gICAgcHk6ICdweXRob24nLFxuICAgIHJiOiAncnVieScsXG4gICAgc2g6ICdiYXNoJyxcbiAgICBzaGVsbDogJ2Jhc2gnLFxuICAgIHltbDogJ3lhbWwnLFxuICB9O1xuICByZXR1cm4gYWxpYXNlc1tsYW5nLnRvTG93ZXJDYXNlKCldIHx8IGxhbmcudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHBsYWluIHRleHQgY29kZSBmcm9tIGEgbm9kZSwgcHJlc2VydmluZyBsaW5lIGJyZWFrcy5cbiAqIEhhbmRsZXMgPHNwYW4+LXdyYXBwZWQgbGluZXMsIDxicj4gdGFncywgYW5kIHBsYWluIHRleHQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDb2RlVGV4dChub2RlKSB7XG4gIGNvbnN0IGNvZGVFbCA9IG5vZGUucXVlcnlTZWxlY3RvcignY29kZScpIHx8IG5vZGUucXVlcnlTZWxlY3RvcigncHJlJykgfHwgbm9kZTtcblxuICAvLyBJZiBpdCBoYXMgY2hpbGQgZWxlbWVudHMgKHNwYW5zIGZvciBzeW50YXggaGlnaGxpZ2h0aW5nKSwgd2FsayB0aGUgRE9NXG4gIGlmIChjb2RlRWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjb2RlRWwuY2hpbGROb2Rlcykge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8vIFRleHQgbm9kZVxuICAgICAgICB0ZXh0ICs9IGNoaWxkLnRleHRDb250ZW50O1xuICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgICAgICB0ZXh0ICs9ICdcXG4nO1xuICAgICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ1NQQU4nIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnRElWJykge1xuICAgICAgICAvLyBTcGFuLXdyYXBwZWQgbGluZSBvciBkaXYgbGluZVxuICAgICAgICB0ZXh0ICs9IGNoaWxkLnRleHRDb250ZW50O1xuICAgICAgICAvLyBBZGQgbmV3bGluZSBhZnRlciBibG9jay1sZXZlbCBlbGVtZW50cyBvciBpZiBuZXh0IHNpYmxpbmcgaXNuJ3QgaW5saW5lXG4gICAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0RJVicpIHtcbiAgICAgICAgICB0ZXh0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ICs9IGNoaWxkLnRleHRDb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXG4kLywgJycpOyAvLyB0cmltIHRyYWlsaW5nIG5ld2xpbmVcbiAgfVxuXG4gIHJldHVybiBjb2RlRWwudGV4dENvbnRlbnQ7XG59XG4iLCAiLyoqXG4gKiBQbHVnaW46IENvbmZsdWVuY2UgVGFibGVzXG4gKiBIYW5kbGVzIENvbmZsdWVuY2UgQ2xvdWQgdGFibGVzIHdoZXJlOlxuICogLSBIZWFkZXIgcm93ICg8dGg+KSBpcyBpbnNpZGUgPHRib2R5PiAobm8gPHRoZWFkPilcbiAqIC0gQ2VsbHMgY29udGFpbiA8cD4sIDxkaXY+LCBvciBvdGhlciBibG9jay1sZXZlbCB3cmFwcGVyc1xuICogLSBUYWJsZSBtYXkgYmUgbmVzdGVkIGluc2lkZSBjb250YWluZXIgZGl2c1xuICpcbiAqIFRoaXMgcnVsZSB0YWtlcyBwcmlvcml0eSBvdmVyIHRoZSBHRk0gdGFibGUgcnVsZXMgYnkgcHJvY2Vzc2luZ1xuICogdGhlIDx0YWJsZT4gZWxlbWVudCBkaXJlY3RseSBhbmQgZXh0cmFjdGluZyBjbGVhbiBjb250ZW50LlxuICogQGltcGxlbWVudHMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uZmx1ZW5jZVRhYmxlc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VUYWJsZScsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdUQUJMRScpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghbm9kZS5yb3dzIHx8IG5vZGUucm93cy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIFNraXAgZHVwbGljYXRlIHN0aWNreSBoZWFkZXIgdGFibGVzIChDb25mbHVlbmNlIHJlbmRlcnMgMiBjb3BpZXMpXG4gICAgICBjb25zdCB3cmFwcGVyID0gbm9kZS5jbG9zZXN0KCcucG0tdGFibGUtc3RpY2t5LXdyYXBwZXInKTtcbiAgICAgIGlmICh3cmFwcGVyKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCByb3dzID0gZXh0cmFjdFJvd3Mobm9kZSk7XG4gICAgICBpZiAocm93cy5sZW5ndGggPT09IDApIHJldHVybiAnJztcblxuICAgICAgLy8gRGV0ZWN0IGhlYWRlciByb3c6IGZpcnN0IHJvdyB3aXRoIGFsbCA8dGg+IGNlbGxzLCBvciA8dGhlYWQ+IHJvd1xuICAgICAgbGV0IGhlYWRlclJvdyA9IG51bGw7XG4gICAgICBsZXQgYm9keVJvd3MgPSByb3dzO1xuXG4gICAgICBpZiAocm93cy5sZW5ndGggPiAwICYmIHJvd3NbMF0uaXNIZWFkZXIpIHtcbiAgICAgICAgaGVhZGVyUm93ID0gcm93c1swXTtcbiAgICAgICAgYm9keVJvd3MgPSByb3dzLnNsaWNlKDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBubyBoZWFkZXIgZGV0ZWN0ZWQgYnV0IHRhYmxlIGhhcyByb3dzLCB1c2UgZmlyc3Qgcm93IGFzIGhlYWRlclxuICAgICAgLy8gKE1hcmtkb3duIHJlcXVpcmVzIGEgaGVhZGVyIHJvdylcbiAgICAgIGlmICghaGVhZGVyUm93ICYmIGJvZHlSb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaGVhZGVyUm93ID0gYm9keVJvd3NbMF07XG4gICAgICAgIGJvZHlSb3dzID0gYm9keVJvd3Muc2xpY2UoMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaGVhZGVyUm93KSByZXR1cm4gJyc7XG5cbiAgICAgIC8vIERldGVybWluZSBjb2x1bW4gY291bnQgZnJvbSB0aGUgd2lkZXN0IHJvd1xuICAgICAgY29uc3QgY29sQ291bnQgPSBNYXRoLm1heChcbiAgICAgICAgaGVhZGVyUm93LmNlbGxzLmxlbmd0aCxcbiAgICAgICAgLi4uYm9keVJvd3MubWFwKChyKSA9PiByLmNlbGxzLmxlbmd0aClcbiAgICAgICk7XG5cbiAgICAgIGlmIChjb2xDb3VudCA9PT0gMCkgcmV0dXJuICcnO1xuXG4gICAgICAvLyBQYWQgcm93cyB0byBjb25zaXN0ZW50IGNvbHVtbiBjb3VudFxuICAgICAgY29uc3QgcGFkUm93ID0gKGNlbGxzKSA9PiB7XG4gICAgICAgIHdoaWxlIChjZWxscy5sZW5ndGggPCBjb2xDb3VudCkgY2VsbHMucHVzaCgnJyk7XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICAgIH07XG5cbiAgICAgIC8vIEJ1aWxkIG1hcmtkb3duIHRhYmxlXG4gICAgICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gICAgICAvLyBIZWFkZXJcbiAgICAgIGNvbnN0IGhDZWxscyA9IHBhZFJvdyhbLi4uaGVhZGVyUm93LmNlbGxzXSk7XG4gICAgICBsaW5lcy5wdXNoKCd8ICcgKyBoQ2VsbHMuam9pbignIHwgJykgKyAnIHwnKTtcblxuICAgICAgLy8gU2VwYXJhdG9yXG4gICAgICBsaW5lcy5wdXNoKCd8ICcgKyBoQ2VsbHMubWFwKCgpID0+ICctLS0nKS5qb2luKCcgfCAnKSArICcgfCcpO1xuXG4gICAgICAvLyBCb2R5IHJvd3NcbiAgICAgIGZvciAoY29uc3Qgcm93IG9mIGJvZHlSb3dzKSB7XG4gICAgICAgIGNvbnN0IGJDZWxscyA9IHBhZFJvdyhbLi4ucm93LmNlbGxzXSk7XG4gICAgICAgIGxpbmVzLnB1c2goJ3wgJyArIGJDZWxscy5qb2luKCcgfCAnKSArICcgfCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJ1xcblxcbicgKyBsaW5lcy5qb2luKCdcXG4nKSArICdcXG5cXG4nO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFByZXZlbnQgR0ZNIHRhYmxlIHJ1bGVzIGZyb20gYWxzbyBwcm9jZXNzaW5nIHRhYmxlIHBhcnRzXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlVGFibGVTZWN0aW9uJywge1xuICAgIGZpbHRlcjogWyd0aGVhZCcsICd0Ym9keScsICd0Zm9vdCddLFxuICAgIHJlcGxhY2VtZW50KGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFN0cmlwIGR1cGxpY2F0ZSBzdGlja3kgaGVhZGVyIHRhYmxlcyAoQ29uZmx1ZW5jZSByZW5kZXJzIGhlYWRlciB0d2ljZSlcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VTdGlja3lIZWFkZXInLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSAnRElWJykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygncG0tdGFibGUtc3RpY2t5LXdyYXBwZXInKSB8fFxuICAgICAgICAobm9kZS5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdwbS10YWJsZS1jb250YWluZXInKSAmJiBub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ2lzLXN0aWNreScpKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KCkge1xuICAgICAgcmV0dXJuICcnOyAvLyBkaXNjYXJkIGVudGlyZWx5IFx1MjAxNCB0aGUgcmVhbCB0YWJsZSBpcyBpbiBwbS10YWJsZS13cmFwcGVyXG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogRXh0cmFjdCByb3dzIGZyb20gYSB0YWJsZSBlbGVtZW50LCBwcmVzZXJ2aW5nIGhlYWRlci9ib2R5IGRpc3RpbmN0aW9uLlxuICovXG5mdW5jdGlvbiBleHRyYWN0Um93cyh0YWJsZSkge1xuICBjb25zdCByb3dzID0gW107XG5cbiAgZm9yIChjb25zdCB0ciBvZiB0YWJsZS5yb3dzKSB7XG4gICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICBsZXQgaXNIZWFkZXIgPSBmYWxzZTtcbiAgICBsZXQgdGhDb3VudCA9IDA7XG4gICAgbGV0IGNlbGxDb3VudCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRyLmNoaWxkTm9kZXMpIHtcbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSAhPT0gMSkgY29udGludWU7IC8vIHNraXAgdGV4dCBub2Rlc1xuICAgICAgaWYgKGNoaWxkLm5vZGVOYW1lICE9PSAnVEQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnVEgnKSBjb250aW51ZTtcblxuICAgICAgY2VsbENvdW50Kys7XG4gICAgICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdUSCcpIHRoQ291bnQrKztcblxuICAgICAgY29uc3QgdGV4dCA9IGNsZWFuQ2VsbENvbnRlbnQoY2hpbGQpO1xuICAgICAgY2VsbHMucHVzaCh0ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBBIGhlYWRlciByb3cgPSBhbGwgY2VsbHMgYXJlIDx0aD4sIG9yIHJvdyBpcyBpbnNpZGUgPHRoZWFkPlxuICAgIGlmIChjZWxsQ291bnQgPiAwICYmIHRoQ291bnQgPT09IGNlbGxDb3VudCkgaXNIZWFkZXIgPSB0cnVlO1xuICAgIGlmICh0ci5wYXJlbnROb2RlPy5ub2RlTmFtZSA9PT0gJ1RIRUFEJykgaXNIZWFkZXIgPSB0cnVlO1xuXG4gICAgaWYgKGNlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJvd3MucHVzaCh7IGNlbGxzLCBpc0hlYWRlciB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcm93cztcbn1cblxuLyoqXG4gKiBFeHRyYWN0IGNsZWFuIHRleHQgZnJvbSBhIHRhYmxlIGNlbGwuXG4gKiBIYW5kbGVzIDxwPiwgPGRpdj4sIDxzcGFuPiwgaW5saW5lIGNvZGUsIGxpbmtzLCBpbWFnZXMsIGFuZCBDb25mbHVlbmNlIG1lZGlhIHdyYXBwZXJzLlxuICovXG5mdW5jdGlvbiBjbGVhbkNlbGxDb250ZW50KGNlbGwpIHtcbiAgLy8gUHJpb3JpdHk6IGNoZWNrIGZvciBhbnkgPGltZz4gYW55d2hlcmUgaW4gdGhlIGNlbGwgZmlyc3QuXG4gIC8vIENvbmZsdWVuY2Ugd3JhcHMgaW1hZ2VzIGluIGRlZXAgc3RydWN0dXJlcyAobWVkaWFTaW5nbGUgPiBhID4gZGl2ID4gLi4uKSxcbiAgLy8gYW5kIHRoZSB2aXNpYmxlIHRleHQgaXMganVzdCBcIk9wZW4gaW1hZ2UteHh4LnBuZ1wiIHdoaWNoIGlzIHVzZWxlc3MuXG4gIGNvbnN0IGltZ3MgPSBjZWxsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpO1xuICBpZiAoaW1ncy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcGFydHMgPSBbXTtcbiAgICAvLyBDb2xsZWN0IGFsbCBpbWFnZXNcbiAgICBmb3IgKGNvbnN0IGltZyBvZiBpbWdzKSB7XG4gICAgICBjb25zdCBhbHQgPSBpbWcuZ2V0QXR0cmlidXRlKCdhbHQnKSB8fCAnJztcbiAgICAgIGNvbnN0IHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8IGltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHwgJyc7XG4gICAgICBpZiAoc3JjKSBwYXJ0cy5wdXNoKGAhWyR7YWx0fV0oJHtzcmN9KWApO1xuICAgIH1cbiAgICAvLyBBbHNvIGNvbGxlY3Qgbm9uLWltYWdlIHRleHQgZnJvbSB0aGUgY2VsbCAodGhlcmUgbWF5IGJlIG1peGVkIGNvbnRlbnQpXG4gICAgY29uc3QgdGV4dE9ubHkgPSBleHRyYWN0Tm9uSW1hZ2VUZXh0KGNlbGwpO1xuICAgIGlmICh0ZXh0T25seSkgcGFydHMudW5zaGlmdCh0ZXh0T25seSk7XG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnKVxuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAudHJpbSgpXG4gICAgICAucmVwbGFjZSgvXFx8L2csICdcXFxcfCcpO1xuICB9XG5cbiAgLy8gTm8gaW1hZ2VzIFx1MjAxNCBwcm9jZXNzIGNoaWxkcmVuIG5vcm1hbGx5XG4gIGxldCB0ZXh0ID0gJyc7XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBjZWxsLmNoaWxkTm9kZXMpIHtcbiAgICB0ZXh0ICs9IHByb2Nlc3NOb2RlKGNoaWxkKTtcbiAgfVxuXG4gIC8vIENsZWFuIHVwOiBjb2xsYXBzZSB3aGl0ZXNwYWNlLCB0cmltLCBlc2NhcGUgcGlwZXNcbiAgcmV0dXJuIHRleHRcbiAgICAucmVwbGFjZSgvXFxuL2csICcgJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9cXHwvZywgJ1xcXFx8Jyk7XG59XG5cbi8qKlxuICogRXh0cmFjdCB0ZXh0IGNvbnRlbnQgZnJvbSBhIGNlbGwsIGV4Y2x1ZGluZyBhbnkgPGltZz4gZWxlbWVudHMsXG4gKiBDb25mbHVlbmNlIG1lZGlhIHdyYXBwZXJzLCBzb3J0aW5nIGljb25zLCBhbmQgZmFsbGJhY2sgYnV0dG9ucy5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdE5vbkltYWdlVGV4dChjZWxsKSB7XG4gIGNvbnN0IGNsb25lID0gY2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIC8vIFJlbW92ZSBpbWFnZXMsIG1lZGlhIHdyYXBwZXJzLCBzb3J0aW5nIGljb25zLCBhbmQgZmFsbGJhY2sgYnV0dG9uc1xuICBjb25zdCByZW1vdmVTZWxlY3RvcnMgPSBbXG4gICAgJ2ltZycsXG4gICAgJ1tkYXRhLW5vZGUtdHlwZT1cIm1lZGlhU2luZ2xlXCJdJyxcbiAgICAnW2RhdGEtbm9kZS10eXBlPVwibWVkaWFcIl0nLFxuICAgICdmaWd1cmUnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvcnRpbmcgaWNvbnMgaW4gaGVhZGVyc1xuICAgICdidXR0b24nLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwiT3BlbiBpbWFnZS14eHhcIiBmYWxsYmFjayBidXR0b25zXG4gICAgJy5hay1yZW5kZXJlci10YWJsZUhlYWRlci1zb3J0aW5nLWljb24nLCAgICAgLy8gc29ydGluZyBpY29uIHdyYXBwZXJzXG4gICAgJ1tkYXRhLXRlc3RpZD1cIm1lZGlhLWJhZGdlc1wiXScsICAgICAgICAgICAgICAvLyBtZWRpYSBiYWRnZSBvdmVybGF5c1xuICBdLmpvaW4oJywgJyk7XG4gIGZvciAoY29uc3QgZWwgb2YgY2xvbmUucXVlcnlTZWxlY3RvckFsbChyZW1vdmVTZWxlY3RvcnMpKSB7XG4gICAgZWwucmVtb3ZlKCk7XG4gIH1cbiAgLy8gUmVtb3ZlIFwiT3BlbiBpbWFnZS0uLi5cIiBvciBcIk9wZW4gU2NyZWVuc2hvdC4uLlwiIHRleHQgbGVmdCBieSBDb25mbHVlbmNlXG4gIGNvbnN0IHRleHQgPSBjbG9uZS50ZXh0Q29udGVudFxuICAgIC5yZXBsYWNlKC9PcGVuIChpbWFnZXxTY3JlZW5zaG90KVteXFxuXSovZywgJycpXG4gICAgLnRyaW0oKTtcbiAgcmV0dXJuIHRleHQ7XG59XG5cbi8qKlxuICogUHJvY2VzcyBhIHNpbmdsZSBET00gbm9kZSBpbnRvIG1hcmtkb3duIHRleHQuXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NOb2RlKGNoaWxkKSB7XG4gIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMykge1xuICAgIHJldHVybiBjaGlsZC50ZXh0Q29udGVudDtcbiAgfVxuICAvLyBTa2lwIENvbmZsdWVuY2UgVUkgZWxlbWVudHMgKHNvcnRpbmcgaWNvbnMsIGZhbGxiYWNrIGJ1dHRvbnMsIG1lZGlhIGJhZGdlcylcbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRklHVVJFJykgcmV0dXJuICcnO1xuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdCVVRUT04nKSByZXR1cm4gJyc7XG4gIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGU/LignZGF0YS10ZXN0aWQnKSA9PT0gJ21lZGlhLWJhZGdlcycpIHJldHVybiAnJztcbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnUCcpIHtcbiAgICByZXR1cm4gJyAnICsgY2xlYW5JbmxpbmVDb250ZW50KGNoaWxkKTtcbiAgfVxuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdCUicpIHtcbiAgICByZXR1cm4gJyAnO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnKSB7XG4gICAgcmV0dXJuICdgJyArIGNoaWxkLnRleHRDb250ZW50ICsgJ2AnO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ1BSRScpIHtcbiAgICByZXR1cm4gJ2AnICsgY2hpbGQudGV4dENvbnRlbnQudHJpbSgpICsgJ2AnO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0EnKSB7XG4gICAgLy8gQ2hlY2sgaWYgbGluayB3cmFwcyBhbiBpbWFnZVxuICAgIGNvbnN0IGltZyA9IGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgIGlmIChpbWcpIHtcbiAgICAgIGNvbnN0IGFsdCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fCAnJztcbiAgICAgIHJldHVybiBzcmMgPyBgIVske2FsdH1dKCR7c3JjfSlgIDogJyc7XG4gICAgfVxuICAgIGNvbnN0IGhyZWYgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICBjb25zdCBsaW5rVGV4dCA9IGNoaWxkLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICByZXR1cm4gaHJlZiA/IGBbJHtsaW5rVGV4dH1dKCR7aHJlZn0pYCA6IGxpbmtUZXh0O1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ1NUUk9ORycgfHwgY2hpbGQubm9kZU5hbWUgPT09ICdCJykge1xuICAgIHJldHVybiAnKionICsgY2hpbGQudGV4dENvbnRlbnQgKyAnKionO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0VNJyB8fCBjaGlsZC5ub2RlTmFtZSA9PT0gJ0knKSB7XG4gICAgcmV0dXJuICcqJyArIGNoaWxkLnRleHRDb250ZW50ICsgJyonO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcbiAgICBjb25zdCBhbHQgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgIGNvbnN0IHNyYyA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIHx8ICcnO1xuICAgIHJldHVybiBgIVske2FsdH1dKCR7c3JjfSlgO1xuICB9XG4gIC8vIEdlbmVyaWM6IHJlY3Vyc2VcbiAgcmV0dXJuIGNsZWFuSW5saW5lQ29udGVudChjaGlsZCk7XG59XG5cbi8qKlxuICogRXh0cmFjdCBpbmxpbmUgY29udGVudCBmcm9tIGFuIGVsZW1lbnQsIGhhbmRsaW5nIGJhc2ljIGZvcm1hdHRpbmcuXG4gKi9cbmZ1bmN0aW9uIGNsZWFuSW5saW5lQ29udGVudChlbCkge1xuICBsZXQgdGV4dCA9ICcnO1xuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGVsLmNoaWxkTm9kZXMpIHtcbiAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnKSB7XG4gICAgICB0ZXh0ICs9ICdgJyArIGNoaWxkLnRleHRDb250ZW50ICsgJ2AnO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdBJykge1xuICAgICAgY29uc3QgaHJlZiA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgICAgY29uc3QgbGlua1RleHQgPSBjaGlsZC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICB0ZXh0ICs9IGhyZWYgPyBgWyR7bGlua1RleHR9XSgke2hyZWZ9KWAgOiBsaW5rVGV4dDtcbiAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnU1RST05HJyB8fCBjaGlsZC5ub2RlTmFtZSA9PT0gJ0InKSB7XG4gICAgICB0ZXh0ICs9ICcqKicgKyBjaGlsZC50ZXh0Q29udGVudCArICcqKic7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0VNJyB8fCBjaGlsZC5ub2RlTmFtZSA9PT0gJ0knKSB7XG4gICAgICB0ZXh0ICs9ICcqJyArIGNoaWxkLnRleHRDb250ZW50ICsgJyonO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdCUicpIHtcbiAgICAgIHRleHQgKz0gJyAnO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdJTUcnKSB7XG4gICAgICBjb25zdCBhbHQgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgY29uc3Qgc3JjID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJztcbiAgICAgIHRleHQgKz0gYCFbJHthbHR9XSgke3NyY30pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGV4dCArPSBjaGlsZC50ZXh0Q29udGVudDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRleHQ7XG59XG4iLCAiLyoqXG4gKiBQbHVnaW46IENvbmZsdWVuY2UgVXNlciBNZW50aW9ucyAmIFN0YXR1cyBNYWNyb3NcbiAqIENvbnZlcnRzIHVzZXIgbGlua3MgdG8gQG1lbnRpb25zIGFuZCBzdGF0dXMgYmFkZ2VzIHRvIGlubGluZSBjb2RlLlxuICogQGltcGxlbWVudHMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uZmx1ZW5jZU1lbnRpb25zUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICAvLyBVc2VyIG1lbnRpb25zXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlTWVudGlvbicsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0EnICYmXG4gICAgICAgIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29uZmx1ZW5jZS11c2VybGluaycpIHx8XG4gICAgICAgICAgbm9kZS5kYXRhc2V0Py51c2VybmFtZSAhPSBudWxsKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCBuYW1lID0gbm9kZS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICByZXR1cm4gYEAke25hbWV9YDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBTdGF0dXMgbWFjcm8gKGNvbG9yZWQgbGFiZWxzIGxpa2UgXCJJTiBQUk9HUkVTU1wiLCBcIkRPTkVcIilcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VTdGF0dXMnLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdTUEFOJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnc3RhdHVzLW1hY3JvJylcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgcmV0dXJuIGBcXGAke25vZGUudGV4dENvbnRlbnQudHJpbSgpfVxcYGA7XG4gICAgfSxcbiAgfSk7XG59XG4iLCAiLyoqXG4gKiBQbHVnaW46IEppcmEgSXNzdWUgTGlua3MgJiBFbW90aWNvbnNcbiAqIENvbnZlcnRzIGlzc3VlLWxpbmsgYW5jaG9ycyB0byBbS0VZXSh1cmwpIGFuZCBlbW90aWNvbiBpbWFnZXMgdG8gdGV4dC5cbiAqIEBpbXBsZW1lbnRzIHtUdXJuZG93blBsdWdpbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGppcmFJc3N1ZXNQbHVnaW4odHVybmRvd25TZXJ2aWNlKSB7XG4gIC8vIElzc3VlIGtleSBsaW5rcyAoZS5nLiBQUk9KLTEyMylcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2ppcmFJc3N1ZUxpbmsnLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdBJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnaXNzdWUtbGluaycpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IG5vZGUuZGF0YXNldD8uaXNzdWVLZXkgfHwgbm9kZS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICBjb25zdCBocmVmID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICAgIHJldHVybiBgWyR7a2V5fV0oJHtocmVmfSlgO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIEVtb3RpY29uIGltYWdlcyBcdTIxOTIgYWx0IHRleHRcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2ppcmFFbW90aWNvbicsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0lNRycgJiZcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Vtb3RpY29uJylcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKCdhbHQnKSB8fCAnJztcbiAgICB9LFxuICB9KTtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQmFzZTY0IEltYWdlIElubGluaW5nXG4gKiBSZXBsYWNlcyA8aW1nPiBzcmMgd2l0aCBkYXRhIFVSSXMgZnJvbSBhIHByZS1mZXRjaGVkIG1hcC5cbiAqIEZhY3RvcnkgZnVuY3Rpb246IGNyZWF0ZXMgYSBwbHVnaW4gYm91bmQgdG8gYSBzcGVjaWZpYyBVUkxcdTIxOTJkYXRhVVJJIG1hcC5cbiAqIEBwYXJhbSB7TWFwPHN0cmluZyxzdHJpbmc+fSBpbWFnZUJhc2U2NE1hcCAtIFVSTCBcdTIxOTIgZGF0YSBVUkkgbWFwcGluZ1xuICogQHJldHVybnMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFzZTY0SW1hZ2VzUGx1Z2luKGltYWdlQmFzZTY0TWFwKSB7XG4gIHJldHVybiBmdW5jdGlvbiBiYXNlNjRJbWFnZXNQbHVnaW4odHVybmRvd25TZXJ2aWNlKSB7XG4gICAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2Jhc2U2NEltYWdlcycsIHtcbiAgICAgIGZpbHRlcjogJ2ltZycsXG4gICAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgICBjb25zdCBzcmMgPSBub2RlLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJyc7XG4gICAgICAgIGNvbnN0IGFsdCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdhbHQnKSB8fCAnJztcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRTcmMgPSBpbWFnZUJhc2U2NE1hcC5nZXQoc3JjKSB8fCBzcmM7XG4gICAgICAgIHJldHVybiBgIVske2FsdH1dKCR7cmVzb2x2ZWRTcmN9KWA7XG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuIiwgIi8qKlxuICogTWFya2Rvd24gU3RyYXRlZ3lcbiAqIENvbnZlcnRzIEhUTUwgKGZyb20gSmlyYS9Db25mbHVlbmNlIERPTSkgdG8gTWFya2Rvd24uXG4gKiBVc2VzIFR1cm5kb3duIGFzIHRoZSBjb3JlIGVuZ2luZSB3aXRoIGEgcGx1Z2luIGFyY2hpdGVjdHVyZS5cbiAqXG4gKiBAaW1wbGVtZW50cyB7Q29udmVyc2lvblN0cmF0ZWd5fVxuICovXG5pbXBvcnQgVHVybmRvd25TZXJ2aWNlIGZyb20gJ3R1cm5kb3duJztcbmltcG9ydCB7IGdmbSB9IGZyb20gJ0B0cnV0by90dXJuZG93bi1wbHVnaW4tZ2ZtJztcbmltcG9ydCB7XG4gIGNvbmZsdWVuY2VQYW5lbHNQbHVnaW4sXG4gIGNvbmZsdWVuY2VDb2RlUGx1Z2luLFxuICBjb25mbHVlbmNlVGFibGVzUGx1Z2luLFxuICBjb25mbHVlbmNlTWVudGlvbnNQbHVnaW4sXG4gIGppcmFJc3N1ZXNQbHVnaW4sXG4gIGNyZWF0ZUJhc2U2NEltYWdlc1BsdWdpbixcbn0gZnJvbSAnLi4vcGx1Z2lucy9pbmRleC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNYXJrZG93blN0cmF0ZWd5IHtcbiAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnbWFya2Rvd24nO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgSFRNTCB0byBNYXJrZG93bi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge01hcDxzdHJpbmcsc3RyaW5nPn0gW29wdGlvbnMuaW1hZ2VCYXNlNjRNYXBdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5tZXRhZGF0YV1cbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGNvbnZlcnQoaHRtbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBpbWFnZUJhc2U2NE1hcCwgbWV0YWRhdGEgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuX2NyZWF0ZVNlcnZpY2UoaW1hZ2VCYXNlNjRNYXApO1xuICAgIGxldCBtZCA9IHNlcnZpY2UudHVybmRvd24oaHRtbCk7XG5cbiAgICBpZiAobWV0YWRhdGEgJiYgT2JqZWN0LmtleXMobWV0YWRhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgIG1kID0gdGhpcy5fYnVpbGRGcm9udE1hdHRlcihtZXRhZGF0YSkgKyBtZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuZCBjb25maWd1cmUgYSBUdXJuZG93biBpbnN0YW5jZSB3aXRoIGFsbCBwbHVnaW5zLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NyZWF0ZVNlcnZpY2UoaW1hZ2VCYXNlNjRNYXApIHtcbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IFR1cm5kb3duU2VydmljZSh7XG4gICAgICBoZWFkaW5nU3R5bGU6ICdhdHgnLFxuICAgICAgY29kZUJsb2NrU3R5bGU6ICdmZW5jZWQnLFxuICAgICAgYnVsbGV0TGlzdE1hcmtlcjogJy0nLFxuICAgICAgZW1EZWxpbWl0ZXI6ICcqJyxcbiAgICB9KTtcblxuICAgIC8vIENvcmUgR0ZNIHN1cHBvcnRcbiAgICBzZXJ2aWNlLnVzZShnZm0pO1xuXG4gICAgLy8gQ29uZmx1ZW5jZSBwbHVnaW5zXG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZVBhbmVsc1BsdWdpbik7XG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZUNvZGVQbHVnaW4pO1xuICAgIHNlcnZpY2UudXNlKGNvbmZsdWVuY2VUYWJsZXNQbHVnaW4pO1xuICAgIHNlcnZpY2UudXNlKGNvbmZsdWVuY2VNZW50aW9uc1BsdWdpbik7XG5cbiAgICAvLyBKaXJhIHBsdWdpbnNcbiAgICBzZXJ2aWNlLnVzZShqaXJhSXNzdWVzUGx1Z2luKTtcblxuICAgIC8vIEJhc2U2NCBpbWFnZSBpbmxpbmluZyAoY29uZGl0aW9uYWwpXG4gICAgaWYgKGltYWdlQmFzZTY0TWFwICYmIGltYWdlQmFzZTY0TWFwLnNpemUgPiAwKSB7XG4gICAgICBzZXJ2aWNlLnVzZShjcmVhdGVCYXNlNjRJbWFnZXNQbHVnaW4oaW1hZ2VCYXNlNjRNYXApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VydmljZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBZQU1MIGZyb250IG1hdHRlciBmcm9tIG1ldGFkYXRhIG9iamVjdC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9idWlsZEZyb250TWF0dGVyKG1ldGFkYXRhKSB7XG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG1ldGFkYXRhKVxuICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9OiAke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuICAgIHJldHVybiBgLS0tXFxuJHtlbnRyaWVzfVxcbi0tLVxcblxcbmA7XG4gIH1cbn1cbiIsICIvKipcbiAqIEppcmEgU3RyYXRlZ3lcbiAqIEJpZGlyZWN0aW9uYWwgY29udmVyc2lvbiBiZXR3ZWVuIEppcmEgd2lraSBtYXJrdXAgYW5kIE1hcmtkb3duLlxuICogVXNlcyBBU1QgcGlwZWxpbmUgZm9yIE1EXHUyMTkySmlyYSAob3JpZ2luYWwgaW1wbGVtZW50YXRpb24pLlxuICogVXNlcyBqaXJhMm1kIGZvciBKaXJhXHUyMTkyTUQgZGlyZWN0aW9uICh3aXRoIHBvc3QtcHJvY2Vzc2luZyBmaXhlcykuXG4gKlxuICogQGltcGxlbWVudHMge0NvbnZlcnNpb25TdHJhdGVneX1cbiAqL1xuaW1wb3J0IEoyTSBmcm9tICdqaXJhMm1kJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi4vcGlwZWxpbmUvcGFyc2VyLmpzJztcbmltcG9ydCB7IHdhbGtBbmRUcmFuc2Zvcm0sIGNvbGxhcHNlQmxhbmtMaW5lcywgbm9ybWFsaXplTGlzdERlcHRoIH0gZnJvbSAnLi4vcGlwZWxpbmUvdHJhbnNmb3JtZXIuanMnO1xuaW1wb3J0IHsgZW1pdCB9IGZyb20gJy4uL3BpcGVsaW5lL2VtaXR0ZXIuanMnO1xuXG5leHBvcnQgY2xhc3MgSmlyYVN0cmF0ZWd5IHtcbiAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnamlyYSc7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBNYXJrZG93biB0byBKaXJhIHdpa2kgbWFya3VwIHZpYSBBU1QgcGlwZWxpbmUuXG4gICAqIFBpcGVsaW5lOiBwYXJzZSBcdTIxOTIgdHJhbnNmb3JtIFx1MjE5MiBlbWl0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZG93blxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZnJvbU1hcmtkb3duKG1hcmtkb3duKSB7XG4gICAgLy8gUGhhc2UgMTogUGFyc2UgdG8gQVNUXG4gICAgbGV0IGFzdCA9IHBhcnNlKG1hcmtkb3duKTtcblxuICAgIC8vIFBoYXNlIDI6IEFwcGx5IHRyYW5zZm9ybWVyc1xuICAgIGFzdCA9IHdhbGtBbmRUcmFuc2Zvcm0oYXN0LCBjb2xsYXBzZUJsYW5rTGluZXMpO1xuICAgIGFzdCA9IG5vcm1hbGl6ZUxpc3REZXB0aChhc3QpO1xuXG4gICAgLy8gUGhhc2UgMzogRW1pdCBKaXJhIG1hcmt1cFxuICAgIGxldCByZXN1bHQgPSBlbWl0KGFzdCk7XG5cbiAgICAvLyBQaGFzZSA0OiBGaW5hbCBjbGVhbnVwXG4gICAgcmVzdWx0ID0gdGhpcy5fcG9zdFByb2Nlc3MocmVzdWx0KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBKaXJhIHdpa2kgbWFya3VwIHRvIE1hcmtkb3duLlxuICAgKiBVc2VzIGppcmEybWQgY29yZSB3aXRoIHBvc3QtcHJvY2Vzc2luZyBmaXhlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGppcmFNYXJrdXBcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvTWFya2Rvd24oamlyYU1hcmt1cCkge1xuICAgIGxldCBtZCA9IEoyTS50b19tYXJrZG93bihqaXJhTWFya3VwKTtcblxuICAgIC8vIEZpeDogaGVhZGluZyBzaG91bGQgaGF2ZSBzcGFjZSBhZnRlciAjXG4gICAgbWQgPSBtZC5yZXBsYWNlKC9eKCN7MSw2fSkoXFxTKS9nbSwgJyQxICQyJyk7XG5cbiAgICAvLyBGaXg6IHRhYmxlIGNlbGwgc3BhY2luZ1xuICAgIG1kID0gbWQucmVwbGFjZSgvXFx8KFtefFxcbl0rKS9nLCAoX21hdGNoLCBjZWxsKSA9PiB7XG4gICAgICByZXR1cm4gYHwgJHtjZWxsLnRyaW0oKX0gYDtcbiAgICB9KTtcblxuICAgIHJldHVybiBtZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2Nlc3MgdG8gSjJNIGZvciBIVE1MIGdlbmVyYXRpb24gKHVzZWQgYnkgRmlsbCBKaXJhIGZlYXR1cmUpLlxuICAgKi9cbiAgZ2V0IGoybSgpIHtcbiAgICByZXR1cm4gSjJNO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIF9wb3N0UHJvY2VzcyhqaXJhKSB7XG4gICAgLy8gRW5zdXJlIGhlYWRpbmdzIGhhdmUgc3BhY2UgYWZ0ZXIgZG90XG4gICAgamlyYSA9IGppcmEucmVwbGFjZSgvXihoWzEtNl1cXC4pXFxzKihcXFMpL2dtLCAnJDEgJDInKTtcblxuICAgIC8vIFJlbW92ZSB0cmlwbGUrIGJsYW5rIGxpbmVzXG4gICAgamlyYSA9IGppcmEucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJyk7XG5cbiAgICAvLyBUcmltIHRyYWlsaW5nIHdoaXRlc3BhY2UgcGVyIGxpbmVcbiAgICBqaXJhID0gamlyYS5yZXBsYWNlKC9bIFxcdF0rJC9nbSwgJycpO1xuXG4gICAgcmV0dXJuIGppcmEudHJpbSgpO1xuICB9XG59XG4iLCAiLyoqXG4gKiBNYXJrZG93biBBU1QgUGFyc2VyXG4gKiBDb252ZXJ0cyByYXcgTWFya2Rvd24gdGV4dCBpbnRvIGFuIGFic3RyYWN0IHN5bnRheCB0cmVlLlxuICogRWFjaCBub2RlIGhhczogeyB0eXBlLCBjaGlsZHJlbj8sIHZhbHVlPywgcHJvcHM/IH1cbiAqXG4gKiBUaGlzIGlzIGEgY3VzdG9tIHJlY3Vyc2l2ZS1kZXNjZW50IHBhcnNlciBcdTIwMTQgbm90IGJhc2VkIG9uIGFueSBleGlzdGluZyBsaWJyYXJ5LlxuICogSXQgaGFuZGxlczogaGVhZGluZ3MsIHBhcmFncmFwaHMsIGxpc3RzIChuZXN0ZWQvbWl4ZWQpLCBjb2RlIGJsb2NrcyxcbiAqIGlubGluZSBjb2RlLCB0YWJsZXMsIGJsb2NrcXVvdGVzLCBib2xkLCBpdGFsaWMsIGxpbmtzLCBpbWFnZXMsIGhyLlxuICovXG5cbi8qKiBAdHlwZWRlZiB7eyB0eXBlOiBzdHJpbmcsIGNoaWxkcmVuPzogQVNUTm9kZVtdLCB2YWx1ZT86IHN0cmluZywgcHJvcHM/OiBSZWNvcmQ8c3RyaW5nLGFueT4gfX0gQVNUTm9kZSAqL1xuXG4vKipcbiAqIFBhcnNlIE1hcmtkb3duIHNvdXJjZSBpbnRvIGFuIEFTVC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VcbiAqIEByZXR1cm5zIHtBU1ROb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc291cmNlKSB7XG4gIGNvbnN0IGxpbmVzID0gc291cmNlLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykuc3BsaXQoJ1xcbicpO1xuICBjb25zdCByb290ID0geyB0eXBlOiAnZG9jdW1lbnQnLCBjaGlsZHJlbjogW10gfTtcbiAgbGV0IGN1cnNvciA9IDA7XG5cbiAgd2hpbGUgKGN1cnNvciA8IGxpbmVzLmxlbmd0aCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlQmxvY2sobGluZXMsIGN1cnNvcik7XG4gICAgaWYgKHJlc3VsdC5ub2RlKSByb290LmNoaWxkcmVuLnB1c2gocmVzdWx0Lm5vZGUpO1xuICAgIGN1cnNvciA9IHJlc3VsdC5uZXh0O1xuICB9XG5cbiAgcmV0dXJuIHJvb3Q7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmxvY2sobGluZXMsIGN1cnNvcikge1xuICBjb25zdCBsaW5lID0gbGluZXNbY3Vyc29yXTtcblxuICAvLyBCbGFuayBsaW5lIFx1MjE5MiBza2lwXG4gIGlmIChsaW5lLnRyaW0oKSA9PT0gJycpIHtcbiAgICByZXR1cm4geyBub2RlOiBudWxsLCBuZXh0OiBjdXJzb3IgKyAxIH07XG4gIH1cblxuICAvLyBGZW5jZWQgY29kZSBibG9ja1xuICBpZiAoL15gYGAoXFx3KikvLnRlc3QobGluZSkpIHtcbiAgICByZXR1cm4gcGFyc2VGZW5jZWRDb2RlKGxpbmVzLCBjdXJzb3IpO1xuICB9XG5cbiAgLy8gSGVhZGluZyAoQVRYIHN0eWxlKVxuICBjb25zdCBoZWFkaW5nTWF0Y2ggPSBsaW5lLm1hdGNoKC9eKCN7MSw2fSlcXHMrKC4rKS8pO1xuICBpZiAoaGVhZGluZ01hdGNoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGU6IHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBwcm9wczogeyBsZXZlbDogaGVhZGluZ01hdGNoWzFdLmxlbmd0aCB9LFxuICAgICAgICBjaGlsZHJlbjogcGFyc2VJbmxpbmUoaGVhZGluZ01hdGNoWzJdKSxcbiAgICAgIH0sXG4gICAgICBuZXh0OiBjdXJzb3IgKyAxLFxuICAgIH07XG4gIH1cblxuICAvLyBIb3Jpem9udGFsIHJ1bGVcbiAgaWYgKC9eKC17Myx9fFxcKnszLH18X3szLH0pXFxzKiQvLnRlc3QobGluZSkpIHtcbiAgICByZXR1cm4geyBub2RlOiB7IHR5cGU6ICdocicgfSwgbmV4dDogY3Vyc29yICsgMSB9O1xuICB9XG5cbiAgLy8gQmxvY2txdW90ZVxuICBpZiAoL14+XFxzPy8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiBwYXJzZUJsb2NrcXVvdGUobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBUYWJsZSAocGlwZSBzeW50YXggd2l0aCBzZXBhcmF0b3IgbGluZSlcbiAgaWYgKFxuICAgIGN1cnNvciArIDEgPCBsaW5lcy5sZW5ndGggJiZcbiAgICAvXlxcfC4qXFx8JC8udGVzdChsaW5lLnRyaW0oKSkgJiZcbiAgICAvXlxcfFtcXHM6XSotezMsfS8udGVzdChsaW5lc1tjdXJzb3IgKyAxXS50cmltKCkpXG4gICkge1xuICAgIHJldHVybiBwYXJzZVRhYmxlKGxpbmVzLCBjdXJzb3IpO1xuICB9XG5cbiAgLy8gTGlzdCBpdGVtICh1bm9yZGVyZWQ6IC0sICosICsgb3Igb3JkZXJlZDogMS4pXG4gIGlmICgvXlxccyooPzpbLSorXXxcXGQrXFwuKVxccy8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiBwYXJzZUxpc3QobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBQYXJhZ3JhcGggKGRlZmF1bHQpXG4gIHJldHVybiBwYXJzZVBhcmFncmFwaChsaW5lcywgY3Vyc29yKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VGZW5jZWRDb2RlKGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3Qgb3Blbk1hdGNoID0gbGluZXNbY3Vyc29yXS5tYXRjaCgvXmBgYChcXHcqKS8pO1xuICBjb25zdCBsYW5nID0gb3Blbk1hdGNoID8gb3Blbk1hdGNoWzFdIDogJyc7XG4gIGNvbnN0IGNvZGVMaW5lcyA9IFtdO1xuICBsZXQgaSA9IGN1cnNvciArIDE7XG4gIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoICYmICFsaW5lc1tpXS5zdGFydHNXaXRoKCdgYGAnKSkge1xuICAgIGNvZGVMaW5lcy5wdXNoKGxpbmVzW2ldKTtcbiAgICBpKys7XG4gIH1cbiAgLy8gU2tpcCBjbG9zaW5nIGBgYFxuICBpZiAoaSA8IGxpbmVzLmxlbmd0aCkgaSsrO1xuICByZXR1cm4ge1xuICAgIG5vZGU6IHtcbiAgICAgIHR5cGU6ICdjb2RlQmxvY2snLFxuICAgICAgcHJvcHM6IHsgbGFuZyB9LFxuICAgICAgdmFsdWU6IGNvZGVMaW5lcy5qb2luKCdcXG4nKSxcbiAgICB9LFxuICAgIG5leHQ6IGksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmxvY2txdW90ZShsaW5lcywgY3Vyc29yKSB7XG4gIGNvbnN0IHF1b3RlTGluZXMgPSBbXTtcbiAgbGV0IGkgPSBjdXJzb3I7XG4gIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoICYmIC9ePlxccz8vLnRlc3QobGluZXNbaV0pKSB7XG4gICAgcXVvdGVMaW5lcy5wdXNoKGxpbmVzW2ldLnJlcGxhY2UoL14+XFxzPy8sICcnKSk7XG4gICAgaSsrO1xuICB9XG4gIGNvbnN0IGlubmVyU291cmNlID0gcXVvdGVMaW5lcy5qb2luKCdcXG4nKTtcbiAgY29uc3QgaW5uZXJBc3QgPSBwYXJzZShpbm5lclNvdXJjZSk7XG4gIHJldHVybiB7XG4gICAgbm9kZTogeyB0eXBlOiAnYmxvY2txdW90ZScsIGNoaWxkcmVuOiBpbm5lckFzdC5jaGlsZHJlbiB9LFxuICAgIG5leHQ6IGksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGFibGUobGluZXMsIGN1cnNvcikge1xuICAvLyBIZWFkZXIgcm93XG4gIGNvbnN0IGhlYWRlckNlbGxzID0gc3BsaXRUYWJsZVJvdyhsaW5lc1tjdXJzb3JdKTtcbiAgLy8gU2tpcCBzZXBhcmF0b3JcbiAgbGV0IGkgPSBjdXJzb3IgKyAyO1xuICAvLyBCb2R5IHJvd3NcbiAgY29uc3QgYm9keVJvd3MgPSBbXTtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgL15cXHwvLnRlc3QobGluZXNbaV0udHJpbSgpKSkge1xuICAgIGJvZHlSb3dzLnB1c2goc3BsaXRUYWJsZVJvdyhsaW5lc1tpXSkpO1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4ge1xuICAgIG5vZGU6IHtcbiAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICBwcm9wczogeyBoZWFkZXJzOiBoZWFkZXJDZWxscyB9LFxuICAgICAgY2hpbGRyZW46IGJvZHlSb3dzLm1hcCgoY2VsbHMpID0+ICh7IHR5cGU6ICd0YWJsZVJvdycsIHByb3BzOiB7IGNlbGxzIH0gfSkpLFxuICAgIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3BsaXRUYWJsZVJvdyhsaW5lKSB7XG4gIHJldHVybiBsaW5lXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9eXFx8fFxcfCQvZywgJycpXG4gICAgLnNwbGl0KCd8JylcbiAgICAubWFwKChjKSA9PiBjLnRyaW0oKSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTGlzdChsaW5lcywgY3Vyc29yKSB7XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBpID0gY3Vyc29yO1xuXG4gIHdoaWxlIChpIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgaXRlbU1hdGNoID0gbGluZXNbaV0ubWF0Y2goL14oXFxzKikoWy0qK118XFxkK1xcLilcXHMrKC4qKS8pO1xuICAgIGlmICghaXRlbU1hdGNoKSBicmVhaztcblxuICAgIGNvbnN0IGluZGVudCA9IGl0ZW1NYXRjaFsxXS5yZXBsYWNlKC9cXHQvZywgJyAgICAnKS5sZW5ndGg7XG4gICAgY29uc3QgbWFya2VyID0gaXRlbU1hdGNoWzJdO1xuICAgIGNvbnN0IG9yZGVyZWQgPSAvXlxcZCtcXC4kLy50ZXN0KG1hcmtlcik7XG4gICAgY29uc3QgY29udGVudCA9IGl0ZW1NYXRjaFszXTtcblxuICAgIC8vIENvbGxlY3QgY29udGludWF0aW9uIC8gc3ViLWl0ZW1zXG4gICAgY29uc3Qgc3ViTGluZXMgPSBbXTtcbiAgICBsZXQgaiA9IGkgKyAxO1xuICAgIHdoaWxlIChqIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXh0TWF0Y2ggPSBsaW5lc1tqXS5tYXRjaCgvXihcXHMqKShbLSorXXxcXGQrXFwuKVxccy8pO1xuICAgICAgaWYgKG5leHRNYXRjaCkge1xuICAgICAgICBjb25zdCBuZXh0SW5kZW50ID0gbmV4dE1hdGNoWzFdLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpLmxlbmd0aDtcbiAgICAgICAgaWYgKG5leHRJbmRlbnQgPiBpbmRlbnQpIHtcbiAgICAgICAgICBzdWJMaW5lcy5wdXNoKGxpbmVzW2pdKTtcbiAgICAgICAgICBqKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAvLyBDb250aW51YXRpb24gbGluZSAoaW5kZW50ZWQgdGV4dClcbiAgICAgIGlmIChsaW5lc1tqXS50cmltKCkgPT09ICcnIHx8IC9eXFxzezIsfS8udGVzdChsaW5lc1tqXSkpIHtcbiAgICAgICAgc3ViTGluZXMucHVzaChsaW5lc1tqXSk7XG4gICAgICAgIGorKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtID0ge1xuICAgICAgdHlwZTogJ2xpc3RJdGVtJyxcbiAgICAgIHByb3BzOiB7IG9yZGVyZWQsIGRlcHRoOiBNYXRoLmZsb29yKGluZGVudCAvIDIpIH0sXG4gICAgICBjaGlsZHJlbjogcGFyc2VJbmxpbmUoY29udGVudCksXG4gICAgfTtcblxuICAgIC8vIFBhcnNlIG5lc3RlZCBsaXN0IGZyb20gc3ViLWxpbmVzXG4gICAgaWYgKHN1YkxpbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlZGVudGVkID0gc3ViTGluZXMubWFwKChsKSA9PiBsLnJlcGxhY2UobmV3IFJlZ0V4cChgXlxcXFxzeyR7aW5kZW50ICsgMn19YCksICcnKSk7XG4gICAgICBjb25zdCBzdWJBc3QgPSBwYXJzZShkZWRlbnRlZC5qb2luKCdcXG4nKSk7XG4gICAgICBpZiAoc3ViQXN0LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaXRlbS5jaGlsZHJlbiA9IFsuLi5pdGVtLmNoaWxkcmVuLCAuLi5zdWJBc3QuY2hpbGRyZW5dO1xuICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW1zLnB1c2goaXRlbSk7XG4gICAgaSA9IGo7XG4gIH1cblxuICBjb25zdCBmaXJzdE9yZGVyZWQgPSBpdGVtc1swXT8ucHJvcHM/Lm9yZGVyZWQ7XG4gIHJldHVybiB7XG4gICAgbm9kZToge1xuICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgcHJvcHM6IHsgb3JkZXJlZDogZmlyc3RPcmRlcmVkIH0sXG4gICAgICBjaGlsZHJlbjogaXRlbXMsXG4gICAgfSxcbiAgICBuZXh0OiBpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVBhcmFncmFwaChsaW5lcywgY3Vyc29yKSB7XG4gIGNvbnN0IHBhcmFMaW5lcyA9IFtdO1xuICBsZXQgaSA9IGN1cnNvcjtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgbGluZXNbaV0udHJpbSgpICE9PSAnJyAmJiAhaXNCbG9ja1N0YXJ0KGxpbmVzLCBpKSkge1xuICAgIHBhcmFMaW5lcy5wdXNoKGxpbmVzW2ldKTtcbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBub2RlOiB7XG4gICAgICB0eXBlOiAncGFyYWdyYXBoJyxcbiAgICAgIGNoaWxkcmVuOiBwYXJzZUlubGluZShwYXJhTGluZXMuam9pbignXFxuJykpLFxuICAgIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNCbG9ja1N0YXJ0KGxpbmVzLCBpKSB7XG4gIGNvbnN0IGxpbmUgPSBsaW5lc1tpXTtcbiAgaWYgKC9eI3sxLDZ9XFxzLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9eYGBgLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9ePlxccy8udGVzdChsaW5lKSkgcmV0dXJuIHRydWU7XG4gIGlmICgvXigtezMsfXxcXCp7Myx9fF97Myx9KVxccyokLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9eXFxzKig/OlstKitdfFxcZCtcXC4pXFxzLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9eXFx8LipcXHwkLy50ZXN0KGxpbmUudHJpbSgpKSAmJiBpICsgMSA8IGxpbmVzLmxlbmd0aCAmJiAvXlxcfFtcXHM6XSotezMsfS8udGVzdChsaW5lc1tpICsgMV0pKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgSW5saW5lIFBhcnNlciBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuLyoqXG4gKiBQYXJzZSBpbmxpbmUgTWFya2Rvd24gZWxlbWVudHMuXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGlubGluZSBBU1Qgbm9kZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHJldHVybnMge0FTVE5vZGVbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW5saW5lKHRleHQpIHtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgbGV0IHJlbWFpbmluZyA9IHRleHQ7XG5cbiAgd2hpbGUgKHJlbWFpbmluZy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgIC8vIEJvbGQrSXRhbGljICoqKnRleHQqKipcbiAgICBjb25zdCBib2xkSXRhbGljID0gcmVtYWluaW5nLm1hdGNoKC9eXFwqezN9KC4rPylcXCp7M30vKTtcbiAgICBpZiAoYm9sZEl0YWxpYykge1xuICAgICAgbm9kZXMucHVzaCh7IHR5cGU6ICdib2xkSXRhbGljJywgY2hpbGRyZW46IHBhcnNlSW5saW5lKGJvbGRJdGFsaWNbMV0pIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGJvbGRJdGFsaWNbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gQm9sZCAqKnRleHQqKlxuICAgIGNvbnN0IGJvbGQgPSByZW1haW5pbmcubWF0Y2goL15cXCp7Mn0oLis/KVxcKnsyfS8pO1xuICAgIGlmIChib2xkKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2JvbGQnLCBjaGlsZHJlbjogcGFyc2VJbmxpbmUoYm9sZFsxXSkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoYm9sZFswXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBJdGFsaWMgKnRleHQqXG4gICAgY29uc3QgaXRhbGljID0gcmVtYWluaW5nLm1hdGNoKC9eXFwqKFteKl0rPylcXCovKTtcbiAgICBpZiAoaXRhbGljKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2l0YWxpYycsIGNoaWxkcmVuOiBwYXJzZUlubGluZShpdGFsaWNbMV0pIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGl0YWxpY1swXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBTdHJpa2V0aHJvdWdoIH5+dGV4dH5+XG4gICAgY29uc3Qgc3RyaWtlID0gcmVtYWluaW5nLm1hdGNoKC9efn4oLis/KX5+Lyk7XG4gICAgaWYgKHN0cmlrZSkge1xuICAgICAgbm9kZXMucHVzaCh7IHR5cGU6ICdzdHJpa2V0aHJvdWdoJywgdmFsdWU6IHN0cmlrZVsxXSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShzdHJpa2VbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gSW5saW5lIGNvZGUgYHRleHRgXG4gICAgY29uc3QgaW5saW5lQ29kZSA9IHJlbWFpbmluZy5tYXRjaCgvXmAoW15gXSspYC8pO1xuICAgIGlmIChpbmxpbmVDb2RlKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2lubGluZUNvZGUnLCB2YWx1ZTogaW5saW5lQ29kZVsxXSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShpbmxpbmVDb2RlWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEltYWdlICFbYWx0XShzcmMpXG4gICAgY29uc3QgaW1hZ2UgPSByZW1haW5pbmcubWF0Y2goL14hXFxbKFteXFxdXSopXFxdXFwoKFteKV0rKVxcKS8pO1xuICAgIGlmIChpbWFnZSkge1xuICAgICAgbm9kZXMucHVzaCh7IHR5cGU6ICdpbWFnZScsIHByb3BzOiB7IGFsdDogaW1hZ2VbMV0sIHNyYzogaW1hZ2VbMl0gfSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShpbWFnZVswXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBMaW5rIFt0ZXh0XSh1cmwpXG4gICAgY29uc3QgbGluayA9IHJlbWFpbmluZy5tYXRjaCgvXlxcWyhbXlxcXV0rKVxcXVxcKChbXildKylcXCkvKTtcbiAgICBpZiAobGluaykge1xuICAgICAgbm9kZXMucHVzaCh7IHR5cGU6ICdsaW5rJywgcHJvcHM6IHsgdXJsOiBsaW5rWzJdIH0sIGNoaWxkcmVuOiBwYXJzZUlubGluZShsaW5rWzFdKSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShsaW5rWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFBsYWluIHRleHQgKGNvbnN1bWUgb25lIGNoYXIgYXQgYSB0aW1lIHVudGlsIG5leHQgc3BlY2lhbCBjaGFyKVxuICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgY29uc3QgbmV4dFNwZWNpYWwgPSByZW1haW5pbmcuc2xpY2UoMSkuc2VhcmNoKC9bKn5gIVxcW10vKTtcbiAgICAgIGNvbnN0IGVuZCA9IG5leHRTcGVjaWFsID09PSAtMSA/IHJlbWFpbmluZy5sZW5ndGggOiBuZXh0U3BlY2lhbCArIDE7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZTogcmVtYWluaW5nLnNsaWNlKDAsIGVuZCkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoZW5kKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9kZXM7XG59XG4iLCAiLyoqXG4gKiBBU1QgVHJhbnNmb3JtZXJcbiAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb25zIHRvIHRoZSBwYXJzZWQgQVNUIGJlZm9yZSBlbWlzc2lvbi5cbiAqIEVhY2ggdHJhbnNmb3JtZXIgaXMgYSB2aXNpdG9yIGZ1bmN0aW9uIHRoYXQgY2FuIG1vZGlmeSBub2RlcyBpbi1wbGFjZS5cbiAqXG4gKiBGb2xsb3dzIHRoZSBWaXNpdG9yIFBhdHRlcm4gXHUyMDE0IG5ldyB0cmFuc2Zvcm1hdGlvbnMgY2FuIGJlIGFkZGVkXG4gKiB3aXRob3V0IG1vZGlmeWluZyBleGlzdGluZyBjb2RlIChPcGVuLUNsb3NlZCBQcmluY2lwbGUpLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYgeyhub2RlOiBBU1ROb2RlLCBwYXJlbnQ/OiBBU1ROb2RlKSA9PiBBU1ROb2RlfG51bGx9IFRyYW5zZm9ybVZpc2l0b3JcbiAqL1xuXG4vKipcbiAqIFdhbGsgYW4gQVNUIHRyZWUgYW5kIGFwcGx5IHZpc2l0b3IgdG8gZWFjaCBub2RlIChkZXB0aC1maXJzdCkuXG4gKiBJZiB2aXNpdG9yIHJldHVybnMgbnVsbCwgdGhlIG5vZGUgaXMgcmVtb3ZlZC5cbiAqIEBwYXJhbSB7QVNUTm9kZX0gYXN0XG4gKiBAcGFyYW0ge1RyYW5zZm9ybVZpc2l0b3J9IHZpc2l0b3JcbiAqIEByZXR1cm5zIHtBU1ROb2RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2Fsa0FuZFRyYW5zZm9ybShhc3QsIHZpc2l0b3IpIHtcbiAgY29uc3QgcmVzdWx0ID0gdmlzaXRvcihhc3QpO1xuICBpZiAoIXJlc3VsdCkgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHJlc3VsdC5jaGlsZHJlbiAmJiBBcnJheS5pc0FycmF5KHJlc3VsdC5jaGlsZHJlbikpIHtcbiAgICByZXN1bHQuY2hpbGRyZW4gPSByZXN1bHQuY2hpbGRyZW5cbiAgICAgIC5tYXAoKGNoaWxkKSA9PiB3YWxrQW5kVHJhbnNmb3JtKGNoaWxkLCB2aXNpdG9yKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbXBvc2UgbXVsdGlwbGUgdmlzaXRvcnMgaW50byBhIHNpbmdsZSB2aXNpdG9yLlxuICogVmlzaXRvcnMgYXJlIGFwcGxpZWQgaW4gb3JkZXIuXG4gKiBAcGFyYW0ge1RyYW5zZm9ybVZpc2l0b3JbXX0gdmlzaXRvcnNcbiAqIEByZXR1cm5zIHtUcmFuc2Zvcm1WaXNpdG9yfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZVZpc2l0b3JzKC4uLnZpc2l0b3JzKSB7XG4gIHJldHVybiAobm9kZSwgcGFyZW50KSA9PiB7XG4gICAgbGV0IGN1cnJlbnQgPSBub2RlO1xuICAgIGZvciAoY29uc3QgdmlzaXRvciBvZiB2aXNpdG9ycykge1xuICAgICAgY3VycmVudCA9IHZpc2l0b3IoY3VycmVudCwgcGFyZW50KTtcbiAgICAgIGlmICghY3VycmVudCkgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xuICB9O1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgQnVpbHQtaW4gVHJhbnNmb3JtZXJzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIENvbGxhcHNlIGNvbnNlY3V0aXZlIGJsYW5rIHBhcmFncmFwaHMgaW50byBhIHNpbmdsZSBicmVhay5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxhcHNlQmxhbmtMaW5lcyhub2RlKSB7XG4gIGlmIChub2RlLnR5cGUgPT09ICdkb2N1bWVudCcgJiYgbm9kZS5jaGlsZHJlbikge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IFtdO1xuICAgIGxldCBwcmV2QmxhbmsgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IGlzQmxhbmsgPSBjaGlsZC50eXBlID09PSAncGFyYWdyYXBoJyAmJlxuICAgICAgICBjaGlsZC5jaGlsZHJlbj8ubGVuZ3RoID09PSAxICYmXG4gICAgICAgIGNoaWxkLmNoaWxkcmVuWzBdLnR5cGUgPT09ICd0ZXh0JyAmJlxuICAgICAgICBjaGlsZC5jaGlsZHJlblswXS52YWx1ZT8udHJpbSgpID09PSAnJztcbiAgICAgIGlmIChpc0JsYW5rKSB7XG4gICAgICAgIGlmICghcHJldkJsYW5rKSBjb2xsYXBzZWQucHVzaChjaGlsZCk7XG4gICAgICAgIHByZXZCbGFuayA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xsYXBzZWQucHVzaChjaGlsZCk7XG4gICAgICAgIHByZXZCbGFuayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyAuLi5ub2RlLCBjaGlsZHJlbjogY29sbGFwc2VkIH07XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIGxpc3QgaXRlbSBkZXB0aCBiYXNlZCBvbiBhY3R1YWwgbmVzdGluZyBsZXZlbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUxpc3REZXB0aChub2RlLCBfcGFyZW50LCBkZXB0aCA9IDApIHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2xpc3RJdGVtJykge1xuICAgIHJldHVybiB7IC4uLm5vZGUsIHByb3BzOiB7IC4uLm5vZGUucHJvcHMsIHJlc29sdmVkRGVwdGg6IGRlcHRoIH0gfTtcbiAgfVxuICBpZiAobm9kZS50eXBlID09PSAnbGlzdCcgJiYgbm9kZS5jaGlsZHJlbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5ub2RlLFxuICAgICAgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gbm9ybWFsaXplTGlzdERlcHRoKGNoaWxkLCBub2RlLCBkZXB0aCArIDEpKSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBub2RlO1xufVxuIiwgIi8qKlxuICogSmlyYSBXaWtpIE1hcmt1cCBFbWl0dGVyXG4gKiBDb252ZXJ0cyBhbiBBU1QgaW50byBKaXJhIHdpa2kgbWFya3VwIHN0cmluZy5cbiAqXG4gKiBFYWNoIG5vZGUgdHlwZSBoYXMgaXRzIG93biBlbWl0IGZ1bmN0aW9uIFx1MjAxNCBmb2xsb3dzIHRoZSBTdHJhdGVneSBQYXR0ZXJuXG4gKiBwZXIgbm9kZSB0eXBlLiBOZXcgbm9kZSB0eXBlcyBjYW4gYmUgYWRkZWQgd2l0aG91dCBtb2RpZnlpbmcgZXhpc3RpbmcgZW1pdHRlcnMuXG4gKi9cblxuLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCAobm9kZTogQVNUTm9kZSwgY3R4OiBFbWl0Q29udGV4dCkgPT4gc3RyaW5nPn0gKi9cbmNvbnN0IGVtaXR0ZXJzID0ge307XG5cbi8qKlxuICogUmVnaXN0ZXIgYW4gZW1pdHRlciBmb3IgYSBub2RlIHR5cGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbm9kZVR5cGVcbiAqIEBwYXJhbSB7KG5vZGU6IEFTVE5vZGUsIGN0eDogRW1pdENvbnRleHQpID0+IHN0cmluZ30gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRW1pdHRlcihub2RlVHlwZSwgZm4pIHtcbiAgZW1pdHRlcnNbbm9kZVR5cGVdID0gZm47XG59XG5cbi8qKlxuICogRW1pdCBhbiBBU1Qgbm9kZSB0byBKaXJhIHdpa2kgbWFya3VwLlxuICogQHBhcmFtIHtBU1ROb2RlfSBub2RlXG4gKiBAcGFyYW0ge0VtaXRDb250ZXh0fSBbY3R4XVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVtaXQobm9kZSwgY3R4ID0geyBsaXN0U3RhY2s6IFtdIH0pIHtcbiAgY29uc3QgZm4gPSBlbWl0dGVyc1tub2RlLnR5cGVdO1xuICBpZiAoIWZuKSB7XG4gICAgLy8gRmFsbGJhY2s6IGVtaXQgY2hpbGRyZW4gb3IgdmFsdWVcbiAgICBpZiAobm9kZS5jaGlsZHJlbikgcmV0dXJuIGVtaXRDaGlsZHJlbihub2RlLCBjdHgpO1xuICAgIHJldHVybiBub2RlLnZhbHVlIHx8ICcnO1xuICB9XG4gIHJldHVybiBmbihub2RlLCBjdHgpO1xufVxuXG5mdW5jdGlvbiBlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KSB7XG4gIGlmICghbm9kZS5jaGlsZHJlbikgcmV0dXJuICcnO1xuICByZXR1cm4gbm9kZS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBlbWl0KGNoaWxkLCBjdHgpKS5qb2luKCcnKTtcbn1cblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIFJlZ2lzdGVyIEJ1aWx0LWluIEVtaXR0ZXJzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG5yZWdpc3RlckVtaXR0ZXIoJ2RvY3VtZW50JywgKG5vZGUsIGN0eCkgPT4ge1xuICByZXR1cm4gbm9kZS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBlbWl0KGNoaWxkLCBjdHgpKS5qb2luKCdcXG4nKTtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2hlYWRpbmcnLCAobm9kZSwgY3R4KSA9PiB7XG4gIGNvbnN0IGxldmVsID0gbm9kZS5wcm9wcz8ubGV2ZWwgfHwgMTtcbiAgY29uc3QgY29udGVudCA9IGVtaXRDaGlsZHJlbihub2RlLCBjdHgpO1xuICByZXR1cm4gYGgke2xldmVsfS4gJHtjb250ZW50fVxcbmA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdwYXJhZ3JhcGgnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KSArICdcXG4nO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignaHInLCAoKSA9PiAnLS0tLVxcbicpO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2NvZGVCbG9jaycsIChub2RlKSA9PiB7XG4gIGNvbnN0IGxhbmcgPSBub2RlLnByb3BzPy5sYW5nO1xuICBjb25zdCB0YWcgPSBsYW5nID8gYHtjb2RlOiR7bGFuZ319YCA6ICd7Y29kZX0nO1xuICByZXR1cm4gYCR7dGFnfVxcbiR7bm9kZS52YWx1ZX1cXG57Y29kZX1cXG5gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignYmxvY2txdW90ZScsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3QgaW5uZXIgPSBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJ1xcbicpLnRyaW0oKTtcbiAgY29uc3QgbGluZXMgPSBpbm5lci5zcGxpdCgnXFxuJyk7XG4gIGlmIChsaW5lcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gYGJxLiAke2lubmVyfVxcbmA7XG4gIH1cbiAgcmV0dXJuIGB7cXVvdGV9XFxuJHtpbm5lcn1cXG57cXVvdGV9XFxuYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ3RhYmxlJywgKG5vZGUsIGN0eCkgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gbm9kZS5wcm9wcz8uaGVhZGVycyB8fCBbXTtcbiAgY29uc3QgaGVhZGVyUm93ID0gYHx8JHtoZWFkZXJzLmpvaW4oJ3x8Jyl9fHxgO1xuICBjb25zdCBib2R5Um93cyA9IG5vZGUuY2hpbGRyZW5cbiAgICAubWFwKChyb3cpID0+IHtcbiAgICAgIGNvbnN0IGNlbGxzID0gcm93LnByb3BzPy5jZWxscyB8fCBbXTtcbiAgICAgIHJldHVybiBgfCR7Y2VsbHMuam9pbignfCcpfXxgO1xuICAgIH0pXG4gICAgLmpvaW4oJ1xcbicpO1xuICByZXR1cm4gYCR7aGVhZGVyUm93fVxcbiR7Ym9keVJvd3N9XFxuYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2xpc3QnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJycpO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignbGlzdEl0ZW0nLCAobm9kZSwgY3R4KSA9PiB7XG4gIGNvbnN0IG9yZGVyZWQgPSBub2RlLnByb3BzPy5vcmRlcmVkO1xuICBjb25zdCBkZXB0aCA9IChub2RlLnByb3BzPy5yZXNvbHZlZERlcHRoIHx8IG5vZGUucHJvcHM/LmRlcHRoIHx8IDApICsgMTtcbiAgY29uc3QgbWFya2VyID0gb3JkZXJlZCA/ICcjJyA6ICcqJztcbiAgY29uc3QgcHJlZml4ID0gbWFya2VyLnJlcGVhdChkZXB0aCk7XG5cbiAgLy8gU2VwYXJhdGUgaW5saW5lIGNoaWxkcmVuIGZyb20gbmVzdGVkIGJsb2NrIGNoaWxkcmVuXG4gIGNvbnN0IGlubGluZU5vZGVzID0gW107XG4gIGNvbnN0IGJsb2NrTm9kZXMgPSBbXTtcbiAgZm9yIChjb25zdCBjaGlsZCBvZiAobm9kZS5jaGlsZHJlbiB8fCBbXSkpIHtcbiAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2xpc3QnKSB7XG4gICAgICBibG9ja05vZGVzLnB1c2goY2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmxpbmVOb2Rlcy5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb250ZW50ID0gaW5saW5lTm9kZXMubWFwKChjKSA9PiBlbWl0KGMsIGN0eCkpLmpvaW4oJycpO1xuICBsZXQgcmVzdWx0ID0gYCR7cHJlZml4fSAke2NvbnRlbnR9XFxuYDtcblxuICAvLyBFbWl0IG5lc3RlZCBsaXN0c1xuICBmb3IgKGNvbnN0IGJsb2NrIG9mIGJsb2NrTm9kZXMpIHtcbiAgICByZXN1bHQgKz0gZW1pdChibG9jaywgY3R4KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxuLy8gXHUyNTAwXHUyNTAwXHUyNTAwIElubGluZSBFbWl0dGVycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxucmVnaXN0ZXJFbWl0dGVyKCd0ZXh0JywgKG5vZGUpID0+IG5vZGUudmFsdWUgfHwgJycpO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2JvbGQnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBgKiR7ZW1pdENoaWxkcmVuKG5vZGUsIGN0eCl9KmA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdpdGFsaWMnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBgXyR7ZW1pdENoaWxkcmVuKG5vZGUsIGN0eCl9X2A7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdib2xkSXRhbGljJywgKG5vZGUsIGN0eCkgPT4ge1xuICByZXR1cm4gYF8qJHtlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KX0qX2A7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdzdHJpa2V0aHJvdWdoJywgKG5vZGUpID0+IHtcbiAgcmV0dXJuIGAtJHtub2RlLnZhbHVlfS1gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignaW5saW5lQ29kZScsIChub2RlKSA9PiB7XG4gIHJldHVybiBge3ske25vZGUudmFsdWV9fX1gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignbGluaycsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3QgdGV4dCA9IGVtaXRDaGlsZHJlbihub2RlLCBjdHgpO1xuICBjb25zdCB1cmwgPSBub2RlLnByb3BzPy51cmwgfHwgJyc7XG4gIHJldHVybiBgWyR7dGV4dH18JHt1cmx9XWA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdpbWFnZScsIChub2RlKSA9PiB7XG4gIGNvbnN0IHNyYyA9IG5vZGUucHJvcHM/LnNyYyB8fCAnJztcbiAgcmV0dXJuIGAhJHtzcmN9IWA7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFhQSxlQUFTLGtCQUFrQixRQUFRLE9B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ZUFBZSxVQUFVO0FBQ3ZDLFdBQU8sYUFBYSxhQUFhLFFBQVE7QUFBQSxFQUMzQztBQUtPLE1BQU1FLE9BQU0sYUFBYTsiLAogICJuYW1lcyI6IFsiZ2V0RXNjYXBlUmVwbGFjZW1lbnQiLCAibm9vcFRlc3QiLCAibGV4ZXIiLCAiVG9rZW5pemVyIiwgIm9wdGlvbnMiLCAibGlzdCIsICJsaW5rIiwgIm1hbmdsZSIsICJzbWFydHlwYW50cyIsICJMZXhlciIsICJydWxlcyIsICJuZXh0IiwgImlubGluZSIsICJSZW5kZXJlciIsICJUZXh0UmVuZGVyZXIiLCAiU2x1Z2dlciIsICJzbHVnIiwgIlBhcnNlciIsICJwYXJzZSIsICJwYXJzZXIiLCAicGFyc2VJbmxpbmUiLCAiY2VsbCIsICJIb29rcyIsICJkb25lIiwgInNyYyIsICJ0b2tlbnMiLCAiaHRtbCIsICJhcmdzIiwgIl9sb29wIiwgInByb3AiLCAiX2xvb3AyIiwgIl9sb29wMyIsICJyZXQiLCAiX2xvb3A0IiwgIkoyTSIsICJKMk0iLCAicnVsZXMiLCAiaXNCbG9jayIsICJpc1ZvaWQiLCAibm9kZSIsICJuZXh0IiwgInJvb3QiLCAicnVsZXMiLCAiY2VsbCIsICJjbGVhbkNlbGxDb250ZW50IiwgImNlbGwiLCAicm9vdCIsICJpc0JsYW5rIiwgIkoyTSIsICJjZWxsIiwgIkoyTSJdCn0K
