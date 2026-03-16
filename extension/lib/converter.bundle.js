var JiraMdConverter = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
        if (source.hasOwnProperty(key)) destination[key] = source[key];
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
  var blockElements = [
    "ADDRESS",
    "ARTICLE",
    "ASIDE",
    "AUDIO",
    "BLOCKQUOTE",
    "BODY",
    "CANVAS",
    "CENTER",
    "DD",
    "DIR",
    "DIV",
    "DL",
    "DT",
    "FIELDSET",
    "FIGCAPTION",
    "FIGURE",
    "FOOTER",
    "FORM",
    "FRAMESET",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "HGROUP",
    "HR",
    "HTML",
    "ISINDEX",
    "LI",
    "MAIN",
    "MENU",
    "NAV",
    "NOFRAMES",
    "NOSCRIPT",
    "OL",
    "OUTPUT",
    "P",
    "PRE",
    "SECTION",
    "TABLE",
    "TBODY",
    "TD",
    "TFOOT",
    "TH",
    "THEAD",
    "TR",
    "UL"
  ];
  function isBlock(node) {
    return is(node, blockElements);
  }
  var voidElements = [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ];
  function isVoid(node) {
    return is(node, voidElements);
  }
  function hasVoid(node) {
    return has(node, voidElements);
  }
  var meaningfulWhenBlankElements = [
    "A",
    "TABLE",
    "THEAD",
    "TBODY",
    "TFOOT",
    "TH",
    "TD",
    "IFRAME",
    "SCRIPT",
    "AUDIO",
    "VIDEO"
  ];
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
      var href = node.getAttribute("href");
      if (href) href = href.replace(/([()])/g, "\\$1");
      var title = cleanAttribute(node.getAttribute("title"));
      if (title) title = ' "' + title.replace(/"/g, '\\"') + '"';
      return "[" + content + "](" + href + title + ")";
    }
  };
  rules.referenceLink = {
    filter: function(node, options) {
      return options.linkStyle === "referenced" && node.nodeName === "A" && node.getAttribute("href");
    },
    replacement: function(content, node, options) {
      var href = node.getAttribute("href");
      var title = cleanAttribute(node.getAttribute("title"));
      if (title) title = ' "' + title + '"';
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
      var alt = cleanAttribute(node.getAttribute("alt"));
      var src = node.getAttribute("src") || "";
      var title = cleanAttribute(node.getAttribute("title"));
      var titlePart = title ? ' "' + title + '"' : "";
      return src ? "![" + alt + "](" + src + titlePart + ")" : "";
    }
  };
  function cleanAttribute(attribute) {
    return attribute ? attribute.replace(/(\n+\s*)+/g, "\n") : "";
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
      return { leading: "", trailing: "" };
    }
    var edges = edgeWhitespace(node.textContent);
    if (edges.leadingAscii && isFlankedByWhitespace("left", node, options)) {
      edges.leading = edges.leadingNonAscii;
    }
    if (edges.trailingAscii && isFlankedByWhitespace("right", node, options)) {
      edges.trailing = edges.trailingNonAscii;
    }
    return { leading: edges.leading, trailing: edges.trailing };
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
  var escapes = [
    [/\\/g, "\\\\"],
    [/\*/g, "\\*"],
    [/^-/g, "\\-"],
    [/^\+ /g, "\\+ "],
    [/^(=+)/g, "\\$1"],
    [/^(#{1,6}) /g, "\\$1 "],
    [/`/g, "\\`"],
    [/^~~~/g, "\\~~~"],
    [/\[/g, "\\["],
    [/\]/g, "\\]"],
    [/^>/g, "\\>"],
    [/_/g, "\\_"],
    [/^(\d+)\. /g, "$1\\. "]
  ];
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
        throw new TypeError(
          input + " is not a string, or an element/document/fragment node."
        );
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
      return escapes.reduce(function(accumulator, escape) {
        return accumulator.replace(escape[0], escape[1]);
      }, string);
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
  var turndown_browser_es_default = TurndownService;

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
      const service = new turndown_browser_es_default({
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmNqcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvamlyYTJtZC9pbmRleC5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy90dXJuZG93bi9saWIvdHVybmRvd24uYnJvd3Nlci5lcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHRydXRvL3R1cm5kb3duLXBsdWdpbi1nZm0vc3JjL2hpZ2hsaWdodGVkLWNvZGUtYmxvY2suanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0B0cnV0by90dXJuZG93bi1wbHVnaW4tZ2ZtL3NyYy9zdHJpa2V0aHJvdWdoLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFibGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvdGFzay1saXN0LWl0ZW1zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AdHJ1dG8vdHVybmRvd24tcGx1Z2luLWdmbS9zcmMvaW5kZXguanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtcGFuZWxzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLWNvZGUuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9wbHVnaW5zL2NvbmZsdWVuY2UtdGFibGVzLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9jb25mbHVlbmNlLW1lbnRpb25zLmpzIiwgIi4uLy4uL3NyYy9jb252ZXJ0ZXIvcGx1Z2lucy9qaXJhLWlzc3Vlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BsdWdpbnMvYmFzZTY0LWltYWdlcy5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3N0cmF0ZWdpZXMvbWFya2Rvd24uanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9zdHJhdGVnaWVzL2ppcmEuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS9wYXJzZXIuanMiLCAiLi4vLi4vc3JjL2NvbnZlcnRlci9waXBlbGluZS90cmFuc2Zvcm1lci5qcyIsICIuLi8uLi9zcmMvY29udmVydGVyL3BpcGVsaW5lL2VtaXR0ZXIuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogbWFya2VkIHY0LjMuMCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAyMywgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZWRqcy9tYXJrZWRcbiAqL1xuXG4vKipcbiAqIERPIE5PVCBFRElUIFRISVMgRklMRVxuICogVGhlIGNvZGUgaW4gdGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBmcm9tIGZpbGVzIGluIC4vc3JjL1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7XG4gIHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAoaXQpIHJldHVybiAoaXQgPSBpdC5jYWxsKG8pKS5uZXh0LmJpbmQoaXQpO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKGl0KSBvID0gaXQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICB9O1xuICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdHMoKSB7XG4gIHJldHVybiB7XG4gICAgYXN5bmM6IGZhbHNlLFxuICAgIGJhc2VVcmw6IG51bGwsXG4gICAgYnJlYWtzOiBmYWxzZSxcbiAgICBleHRlbnNpb25zOiBudWxsLFxuICAgIGdmbTogdHJ1ZSxcbiAgICBoZWFkZXJJZHM6IHRydWUsXG4gICAgaGVhZGVyUHJlZml4OiAnJyxcbiAgICBoaWdobGlnaHQ6IG51bGwsXG4gICAgaG9va3M6IG51bGwsXG4gICAgbGFuZ1ByZWZpeDogJ2xhbmd1YWdlLScsXG4gICAgbWFuZ2xlOiB0cnVlLFxuICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICByZW5kZXJlcjogbnVsbCxcbiAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgc2FuaXRpemVyOiBudWxsLFxuICAgIHNpbGVudDogZmFsc2UsXG4gICAgc21hcnR5cGFudHM6IGZhbHNlLFxuICAgIHRva2VuaXplcjogbnVsbCxcbiAgICB3YWxrVG9rZW5zOiBudWxsLFxuICAgIHhodG1sOiBmYWxzZVxuICB9O1xufVxuZXhwb3J0cy5kZWZhdWx0cyA9IGdldERlZmF1bHRzKCk7XG5mdW5jdGlvbiBjaGFuZ2VEZWZhdWx0cyhuZXdEZWZhdWx0cykge1xuICBleHBvcnRzLmRlZmF1bHRzID0gbmV3RGVmYXVsdHM7XG59XG5cbi8qKlxuICogSGVscGVyc1xuICovXG52YXIgZXNjYXBlVGVzdCA9IC9bJjw+XCInXS87XG52YXIgZXNjYXBlUmVwbGFjZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdC5zb3VyY2UsICdnJyk7XG52YXIgZXNjYXBlVGVzdE5vRW5jb2RlID0gL1s8PlwiJ118Jig/ISgjXFxkezEsN318I1tYeF1bYS1mQS1GMC05XXsxLDZ9fFxcdyspOykvO1xudmFyIGVzY2FwZVJlcGxhY2VOb0VuY29kZSA9IG5ldyBSZWdFeHAoZXNjYXBlVGVzdE5vRW5jb2RlLnNvdXJjZSwgJ2cnKTtcbnZhciBlc2NhcGVSZXBsYWNlbWVudHMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5Oydcbn07XG52YXIgZ2V0RXNjYXBlUmVwbGFjZW1lbnQgPSBmdW5jdGlvbiBnZXRFc2NhcGVSZXBsYWNlbWVudChjaCkge1xuICByZXR1cm4gZXNjYXBlUmVwbGFjZW1lbnRzW2NoXTtcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIGlmIChlbmNvZGUpIHtcbiAgICBpZiAoZXNjYXBlVGVzdC50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2UsIGdldEVzY2FwZVJlcGxhY2VtZW50KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGVzY2FwZVRlc3ROb0VuY29kZS50ZXN0KGh0bWwpKSB7XG4gICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKGVzY2FwZVJlcGxhY2VOb0VuY29kZSwgZ2V0RXNjYXBlUmVwbGFjZW1lbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaHRtbDtcbn1cbnZhciB1bmVzY2FwZVRlc3QgPSAvJigjKD86XFxkKyl8KD86I3hbMC05QS1GYS1mXSspfCg/OlxcdyspKTs/L2lnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgLy8gZXhwbGljaXRseSBtYXRjaCBkZWNpbWFsLCBoZXgsIGFuZCBuYW1lZCBIVE1MIGVudGl0aWVzXG4gIHJldHVybiBodG1sLnJlcGxhY2UodW5lc2NhcGVUZXN0LCBmdW5jdGlvbiAoXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKSA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cbnZhciBjYXJldCA9IC8oXnxbXlxcW10pXFxeL2c7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmcgfCBSZWdFeHB9IHJlZ2V4XG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0XG4gKi9cbmZ1bmN0aW9uIGVkaXQocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHR5cGVvZiByZWdleCA9PT0gJ3N0cmluZycgPyByZWdleCA6IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICB2YXIgb2JqID0ge1xuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UobmFtZSwgdmFsKSB7XG4gICAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKGNhcmV0LCAnJDEnKTtcbiAgICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIGdldFJlZ2V4OiBmdW5jdGlvbiBnZXRSZWdleCgpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIG9iajtcbn1cbnZhciBub25Xb3JkQW5kQ29sb25UZXN0ID0gL1teXFx3Ol0vZztcbnZhciBvcmlnaW5JbmRlcGVuZGVudFVybCA9IC9eJHxeW2Etel1bYS16MC05Ky4tXSo6fF5bPyNdL2k7XG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFufSBzYW5pdGl6ZVxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXJsKHNhbml0aXplLCBiYXNlLCBocmVmKSB7XG4gIGlmIChzYW5pdGl6ZSkge1xuICAgIHZhciBwcm90O1xuICAgIHRyeSB7XG4gICAgICBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKS5yZXBsYWNlKG5vbldvcmRBbmRDb2xvblRlc3QsICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCdkYXRhOicpID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgaWYgKGJhc2UgJiYgIW9yaWdpbkluZGVwZW5kZW50VXJsLnRlc3QoaHJlZikpIHtcbiAgICBocmVmID0gcmVzb2x2ZVVybChiYXNlLCBocmVmKTtcbiAgfVxuICB0cnkge1xuICAgIGhyZWYgPSBlbmNvZGVVUkkoaHJlZikucmVwbGFjZSgvJTI1L2csICclJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gaHJlZjtcbn1cbnZhciBiYXNlVXJscyA9IHt9O1xudmFyIGp1c3REb21haW4gPSAvXlteOl0rOlxcLypbXi9dKiQvO1xudmFyIHByb3RvY29sID0gL14oW146XSs6KVtcXHNcXFNdKiQvO1xudmFyIGRvbWFpbiA9IC9eKFteOl0rOlxcLypbXi9dKilbXFxzXFxTXSokLztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVVybChiYXNlLCBocmVmKSB7XG4gIGlmICghYmFzZVVybHNbJyAnICsgYmFzZV0pIHtcbiAgICAvLyB3ZSBjYW4gaWdub3JlIGV2ZXJ5dGhpbmcgaW4gYmFzZSBhZnRlciB0aGUgbGFzdCBzbGFzaCBvZiBpdHMgcGF0aCBjb21wb25lbnQsXG4gICAgLy8gYnV0IHdlIG1pZ2h0IG5lZWQgdG8gYWRkIF90aGF0X1xuICAgIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2I3NlY3Rpb24tM1xuICAgIGlmIChqdXN0RG9tYWluLnRlc3QoYmFzZSkpIHtcbiAgICAgIGJhc2VVcmxzWycgJyArIGJhc2VdID0gYmFzZSArICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZVVybHNbJyAnICsgYmFzZV0gPSBydHJpbShiYXNlLCAnLycsIHRydWUpO1xuICAgIH1cbiAgfVxuICBiYXNlID0gYmFzZVVybHNbJyAnICsgYmFzZV07XG4gIHZhciByZWxhdGl2ZUJhc2UgPSBiYXNlLmluZGV4T2YoJzonKSA9PT0gLTE7XG4gIGlmIChocmVmLnN1YnN0cmluZygwLCAyKSA9PT0gJy8vJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKHByb3RvY29sLCAnJDEnKSArIGhyZWY7XG4gIH0gZWxzZSBpZiAoaHJlZi5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIGlmIChyZWxhdGl2ZUJhc2UpIHtcbiAgICAgIHJldHVybiBocmVmO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZS5yZXBsYWNlKGRvbWFpbiwgJyQxJykgKyBocmVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlICsgaHJlZjtcbiAgfVxufVxudmFyIG5vb3BUZXN0ID0ge1xuICBleGVjOiBmdW5jdGlvbiBub29wVGVzdCgpIHt9XG59O1xuZnVuY3Rpb24gc3BsaXRDZWxscyh0YWJsZVJvdywgY291bnQpIHtcbiAgLy8gZW5zdXJlIHRoYXQgZXZlcnkgY2VsbC1kZWxpbWl0aW5nIHBpcGUgaGFzIGEgc3BhY2VcbiAgLy8gYmVmb3JlIGl0IHRvIGRpc3Rpbmd1aXNoIGl0IGZyb20gYW4gZXNjYXBlZCBwaXBlXG4gIHZhciByb3cgPSB0YWJsZVJvdy5yZXBsYWNlKC9cXHwvZywgZnVuY3Rpb24gKG1hdGNoLCBvZmZzZXQsIHN0cikge1xuICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSxcbiAgICAgICAgY3VyciA9IG9mZnNldDtcbiAgICAgIHdoaWxlICgtLWN1cnIgPj0gMCAmJiBzdHJbY3Vycl0gPT09ICdcXFxcJykge1xuICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgICAvLyBvZGQgbnVtYmVyIG9mIHNsYXNoZXMgbWVhbnMgfCBpcyBlc2NhcGVkXG4gICAgICAgIC8vIHNvIHdlIGxlYXZlIGl0IGFsb25lXG4gICAgICAgIHJldHVybiAnfCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgc3BhY2UgYmVmb3JlIHVuZXNjYXBlZCB8XG4gICAgICAgIHJldHVybiAnIHwnO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGNlbGxzID0gcm93LnNwbGl0KC8gXFx8Lyk7XG4gIHZhciBpID0gMDtcblxuICAvLyBGaXJzdC9sYXN0IGNlbGwgaW4gYSByb3cgY2Fubm90IGJlIGVtcHR5IGlmIGl0IGhhcyBubyBsZWFkaW5nL3RyYWlsaW5nIHBpcGVcbiAgaWYgKCFjZWxsc1swXS50cmltKCkpIHtcbiAgICBjZWxscy5zaGlmdCgpO1xuICB9XG4gIGlmIChjZWxscy5sZW5ndGggPiAwICYmICFjZWxsc1tjZWxscy5sZW5ndGggLSAxXS50cmltKCkpIHtcbiAgICBjZWxscy5wb3AoKTtcbiAgfVxuICBpZiAoY2VsbHMubGVuZ3RoID4gY291bnQpIHtcbiAgICBjZWxscy5zcGxpY2UoY291bnQpO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjZWxscy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgY2VsbHMucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGZvciAoOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBsZWFkaW5nIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgaXMgaWdub3JlZCBwZXIgdGhlIGdmbSBzcGVjXG4gICAgY2VsbHNbaV0gPSBjZWxsc1tpXS50cmltKCkucmVwbGFjZSgvXFxcXFxcfC9nLCAnfCcpO1xuICB9XG4gIHJldHVybiBjZWxscztcbn1cblxuLyoqXG4gKiBSZW1vdmUgdHJhaWxpbmcgJ2Mncy4gRXF1aXZhbGVudCB0byBzdHIucmVwbGFjZSgvYyokLywgJycpLlxuICogL2MqJC8gaXMgdnVsbmVyYWJsZSB0byBSRURPUy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge3N0cmluZ30gY1xuICogQHBhcmFtIHtib29sZWFufSBpbnZlcnQgUmVtb3ZlIHN1ZmZpeCBvZiBub24tYyBjaGFycyBpbnN0ZWFkLiBEZWZhdWx0IGZhbHNleS5cbiAqL1xuZnVuY3Rpb24gcnRyaW0oc3RyLCBjLCBpbnZlcnQpIHtcbiAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICBpZiAobCA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8vIExlbmd0aCBvZiBzdWZmaXggbWF0Y2hpbmcgdGhlIGludmVydCBjb25kaXRpb24uXG4gIHZhciBzdWZmTGVuID0gMDtcblxuICAvLyBTdGVwIGxlZnQgdW50aWwgd2UgZmFpbCB0byBtYXRjaCB0aGUgaW52ZXJ0IGNvbmRpdGlvbi5cbiAgd2hpbGUgKHN1ZmZMZW4gPCBsKSB7XG4gICAgdmFyIGN1cnJDaGFyID0gc3RyLmNoYXJBdChsIC0gc3VmZkxlbiAtIDEpO1xuICAgIGlmIChjdXJyQ2hhciA9PT0gYyAmJiAhaW52ZXJ0KSB7XG4gICAgICBzdWZmTGVuKys7XG4gICAgfSBlbHNlIGlmIChjdXJyQ2hhciAhPT0gYyAmJiBpbnZlcnQpIHtcbiAgICAgIHN1ZmZMZW4rKztcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgbCAtIHN1ZmZMZW4pO1xufVxuZnVuY3Rpb24gZmluZENsb3NpbmdCcmFja2V0KHN0ciwgYikge1xuICBpZiAoc3RyLmluZGV4T2YoYlsxXSkgPT09IC0xKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgdmFyIGxldmVsID0gMCxcbiAgICBpID0gMDtcbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxcXCcpIHtcbiAgICAgIGkrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlswXSkge1xuICAgICAgbGV2ZWwrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gYlsxXSkge1xuICAgICAgbGV2ZWwtLTtcbiAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2FuaXRpemVEZXByZWNhdGlvbihvcHQpIHtcbiAgaWYgKG9wdCAmJiBvcHQuc2FuaXRpemUgJiYgIW9wdC5zaWxlbnQpIHtcbiAgICBjb25zb2xlLndhcm4oJ21hcmtlZCgpOiBzYW5pdGl6ZSBhbmQgc2FuaXRpemVyIHBhcmFtZXRlcnMgYXJlIGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAwLjcuMCwgc2hvdWxkIG5vdCBiZSB1c2VkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZS4gUmVhZCBtb3JlIGhlcmU6IGh0dHBzOi8vbWFya2VkLmpzLm9yZy8jL1VTSU5HX0FEVkFOQ0VELm1kI29wdGlvbnMnKTtcbiAgfVxufVxuXG4vLyBjb3BpZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTQ1MDExMy84MDY3Nzdcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICovXG5mdW5jdGlvbiByZXBlYXRTdHJpbmcocGF0dGVybiwgY291bnQpIHtcbiAgaWYgKGNvdW50IDwgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHdoaWxlIChjb3VudCA+IDEpIHtcbiAgICBpZiAoY291bnQgJiAxKSB7XG4gICAgICByZXN1bHQgKz0gcGF0dGVybjtcbiAgICB9XG4gICAgY291bnQgPj49IDE7XG4gICAgcGF0dGVybiArPSBwYXR0ZXJuO1xuICB9XG4gIHJldHVybiByZXN1bHQgKyBwYXR0ZXJuO1xufVxuXG5mdW5jdGlvbiBvdXRwdXRMaW5rKGNhcCwgbGluaywgcmF3LCBsZXhlcikge1xuICB2YXIgaHJlZiA9IGxpbmsuaHJlZjtcbiAgdmFyIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG4gIHZhciB0ZXh0ID0gY2FwWzFdLnJlcGxhY2UoL1xcXFwoW1xcW1xcXV0pL2csICckMScpO1xuICBpZiAoY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnKSB7XG4gICAgbGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICB2YXIgdG9rZW4gPSB7XG4gICAgICB0eXBlOiAnbGluaycsXG4gICAgICByYXc6IHJhdyxcbiAgICAgIGhyZWY6IGhyZWYsXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgdG9rZW5zOiBsZXhlci5pbmxpbmVUb2tlbnModGV4dClcbiAgICB9O1xuICAgIGxleGVyLnN0YXRlLmluTGluayA9IGZhbHNlO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICByZXR1cm4ge1xuICAgIHR5cGU6ICdpbWFnZScsXG4gICAgcmF3OiByYXcsXG4gICAgaHJlZjogaHJlZixcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgdGV4dDogZXNjYXBlKHRleHQpXG4gIH07XG59XG5mdW5jdGlvbiBpbmRlbnRDb2RlQ29tcGVuc2F0aW9uKHJhdywgdGV4dCkge1xuICB2YXIgbWF0Y2hJbmRlbnRUb0NvZGUgPSByYXcubWF0Y2goL14oXFxzKykoPzpgYGApLyk7XG4gIGlmIChtYXRjaEluZGVudFRvQ29kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIHZhciBpbmRlbnRUb0NvZGUgPSBtYXRjaEluZGVudFRvQ29kZVsxXTtcbiAgcmV0dXJuIHRleHQuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBtYXRjaEluZGVudEluTm9kZSA9IG5vZGUubWF0Y2goL15cXHMrLyk7XG4gICAgaWYgKG1hdGNoSW5kZW50SW5Ob2RlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgdmFyIGluZGVudEluTm9kZSA9IG1hdGNoSW5kZW50SW5Ob2RlWzBdO1xuICAgIGlmIChpbmRlbnRJbk5vZGUubGVuZ3RoID49IGluZGVudFRvQ29kZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBub2RlLnNsaWNlKGluZGVudFRvQ29kZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSkuam9pbignXFxuJyk7XG59XG5cbi8qKlxuICogVG9rZW5pemVyXG4gKi9cbnZhciBUb2tlbml6ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUb2tlbml6ZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgZXhwb3J0cy5kZWZhdWx0cztcbiAgfVxuICB2YXIgX3Byb3RvID0gVG9rZW5pemVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNwYWNlID0gZnVuY3Rpb24gc3BhY2Uoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2submV3bGluZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCAmJiBjYXBbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ3NwYWNlJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uY29kZSA9IGZ1bmN0aW9uIGNvZGUoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suY29kZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQgPSBjYXBbMF0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgY29kZUJsb2NrU3R5bGU6ICdpbmRlbnRlZCcsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWMgPyBydHJpbSh0ZXh0LCAnXFxuJykgOiB0ZXh0XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmZlbmNlcyA9IGZ1bmN0aW9uIGZlbmNlcyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5mZW5jZXMuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciByYXcgPSBjYXBbMF07XG4gICAgICB2YXIgdGV4dCA9IGluZGVudENvZGVDb21wZW5zYXRpb24ocmF3LCBjYXBbM10gfHwgJycpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgbGFuZzogY2FwWzJdID8gY2FwWzJdLnRyaW0oKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5oZWFkaW5nID0gZnVuY3Rpb24gaGVhZGluZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5oZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGV4dCA9IGNhcFsyXS50cmltKCk7XG5cbiAgICAgIC8vIHJlbW92ZSB0cmFpbGluZyAjc1xuICAgICAgaWYgKC8jJC8udGVzdCh0ZXh0KSkge1xuICAgICAgICB2YXIgdHJpbW1lZCA9IHJ0cmltKHRleHQsICcjJyk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRyaW1tZWQgfHwgLyAkLy50ZXN0KHRyaW1tZWQpKSB7XG4gICAgICAgICAgLy8gQ29tbW9uTWFyayByZXF1aXJlcyBzcGFjZSBiZWZvcmUgdHJhaWxpbmcgI3NcbiAgICAgICAgICB0ZXh0ID0gdHJpbW1lZC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lKHRleHQpXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmhyID0gZnVuY3Rpb24gaHIoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suaHIuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdocicsXG4gICAgICAgIHJhdzogY2FwWzBdXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmJsb2NrcXVvdGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzBdLnJlcGxhY2UoL14gKj5bIFxcdF0/L2dtLCAnJyk7XG4gICAgICB2YXIgdG9wID0gdGhpcy5sZXhlci5zdGF0ZS50b3A7XG4gICAgICB0aGlzLmxleGVyLnN0YXRlLnRvcCA9IHRydWU7XG4gICAgICB2YXIgdG9rZW5zID0gdGhpcy5sZXhlci5ibG9ja1Rva2Vucyh0ZXh0KTtcbiAgICAgIHRoaXMubGV4ZXIuc3RhdGUudG9wID0gdG9wO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGUnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdG9rZW5zOiB0b2tlbnMsXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3Qoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2subGlzdC5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHJhdywgaXN0YXNrLCBpc2NoZWNrZWQsIGluZGVudCwgaSwgYmxhbmtMaW5lLCBlbmRzV2l0aEJsYW5rTGluZSwgbGluZSwgbmV4dExpbmUsIHJhd0xpbmUsIGl0ZW1Db250ZW50cywgZW5kRWFybHk7XG4gICAgICB2YXIgYnVsbCA9IGNhcFsxXS50cmltKCk7XG4gICAgICB2YXIgaXNvcmRlcmVkID0gYnVsbC5sZW5ndGggPiAxO1xuICAgICAgdmFyIGxpc3QgPSB7XG4gICAgICAgIHR5cGU6ICdsaXN0JyxcbiAgICAgICAgcmF3OiAnJyxcbiAgICAgICAgb3JkZXJlZDogaXNvcmRlcmVkLFxuICAgICAgICBzdGFydDogaXNvcmRlcmVkID8gK2J1bGwuc2xpY2UoMCwgLTEpIDogJycsXG4gICAgICAgIGxvb3NlOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgICB9O1xuICAgICAgYnVsbCA9IGlzb3JkZXJlZCA/IFwiXFxcXGR7MSw5fVxcXFxcIiArIGJ1bGwuc2xpY2UoLTEpIDogXCJcXFxcXCIgKyBidWxsO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICBidWxsID0gaXNvcmRlcmVkID8gYnVsbCA6ICdbKistXSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBuZXh0IGxpc3QgaXRlbVxuICAgICAgdmFyIGl0ZW1SZWdleCA9IG5ldyBSZWdFeHAoXCJeKCB7MCwzfVwiICsgYnVsbCArIFwiKSgoPzpbXFx0IF1bXlxcXFxuXSopPyg/OlxcXFxufCQpKVwiKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBidWxsZXQgcG9pbnQgY2FuIHN0YXJ0IGEgbmV3IExpc3QgSXRlbVxuICAgICAgd2hpbGUgKHNyYykge1xuICAgICAgICBlbmRFYXJseSA9IGZhbHNlO1xuICAgICAgICBpZiAoIShjYXAgPSBpdGVtUmVnZXguZXhlYyhzcmMpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJ1bGVzLmJsb2NrLmhyLnRlc3Qoc3JjKSkge1xuICAgICAgICAgIC8vIEVuZCBsaXN0IGlmIGJ1bGxldCB3YXMgYWN0dWFsbHkgSFIgKHBvc3NpYmx5IG1vdmUgaW50byBpdGVtUmVnZXg/KVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJhdyA9IGNhcFswXTtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXcubGVuZ3RoKTtcbiAgICAgICAgbGluZSA9IGNhcFsyXS5zcGxpdCgnXFxuJywgMSlbMF0ucmVwbGFjZSgvXlxcdCsvLCBmdW5jdGlvbiAodCkge1xuICAgICAgICAgIHJldHVybiAnICcucmVwZWF0KDMgKiB0Lmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXh0TGluZSA9IHNyYy5zcGxpdCgnXFxuJywgMSlbMF07XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgICAgICBpbmRlbnQgPSAyO1xuICAgICAgICAgIGl0ZW1Db250ZW50cyA9IGxpbmUudHJpbUxlZnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbmRlbnQgPSBjYXBbMl0uc2VhcmNoKC9bXiBdLyk7IC8vIEZpbmQgZmlyc3Qgbm9uLXNwYWNlIGNoYXJcbiAgICAgICAgICBpbmRlbnQgPSBpbmRlbnQgPiA0ID8gMSA6IGluZGVudDsgLy8gVHJlYXQgaW5kZW50ZWQgY29kZSBibG9ja3MgKD4gNCBzcGFjZXMpIGFzIGhhdmluZyBvbmx5IDEgaW5kZW50XG4gICAgICAgICAgaXRlbUNvbnRlbnRzID0gbGluZS5zbGljZShpbmRlbnQpO1xuICAgICAgICAgIGluZGVudCArPSBjYXBbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJsYW5rTGluZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWxpbmUgJiYgL14gKiQvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgLy8gSXRlbXMgYmVnaW4gd2l0aCBhdCBtb3N0IG9uZSBibGFuayBsaW5lXG4gICAgICAgICAgcmF3ICs9IG5leHRMaW5lICsgJ1xcbic7XG4gICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhuZXh0TGluZS5sZW5ndGggKyAxKTtcbiAgICAgICAgICBlbmRFYXJseSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbmRFYXJseSkge1xuICAgICAgICAgIHZhciBuZXh0QnVsbGV0UmVnZXggPSBuZXcgUmVnRXhwKFwiXiB7MCxcIiArIE1hdGgubWluKDMsIGluZGVudCAtIDEpICsgXCJ9KD86WyorLV18XFxcXGR7MSw5fVsuKV0pKCg/OlsgXFx0XVteXFxcXG5dKik/KD86XFxcXG58JCkpXCIpO1xuICAgICAgICAgIHZhciBoclJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSgoPzotICopezMsfXwoPzpfICopezMsfXwoPzpcXFxcKiAqKXszLH0pKD86XFxcXG4rfCQpXCIpO1xuICAgICAgICAgIHZhciBmZW5jZXNCZWdpblJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4gezAsXCIgKyBNYXRoLm1pbigzLCBpbmRlbnQgLSAxKSArIFwifSg/OmBgYHx+fn4pXCIpO1xuICAgICAgICAgIHZhciBoZWFkaW5nQmVnaW5SZWdleCA9IG5ldyBSZWdFeHAoXCJeIHswLFwiICsgTWF0aC5taW4oMywgaW5kZW50IC0gMSkgKyBcIn0jXCIpO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgZm9sbG93aW5nIGxpbmVzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBMaXN0IEl0ZW1cbiAgICAgICAgICB3aGlsZSAoc3JjKSB7XG4gICAgICAgICAgICByYXdMaW5lID0gc3JjLnNwbGl0KCdcXG4nLCAxKVswXTtcbiAgICAgICAgICAgIG5leHRMaW5lID0gcmF3TGluZTtcblxuICAgICAgICAgICAgLy8gUmUtYWxpZ24gdG8gZm9sbG93IGNvbW1vbm1hcmsgbmVzdGluZyBydWxlc1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAgICAgICBuZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL14gezEsNH0oPz0oIHs0fSkqW14gXSkvZywgJyAgJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgY29kZSBmZW5jZXNcbiAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbmQgbGlzdCBpdGVtIGlmIGZvdW5kIHN0YXJ0IG9mIG5ldyBoZWFkaW5nXG4gICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVuZCBsaXN0IGl0ZW0gaWYgZm91bmQgc3RhcnQgb2YgbmV3IGJ1bGxldFxuICAgICAgICAgICAgaWYgKG5leHRCdWxsZXRSZWdleC50ZXN0KG5leHRMaW5lKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSG9yaXpvbnRhbCBydWxlIGZvdW5kXG4gICAgICAgICAgICBpZiAoaHJSZWdleC50ZXN0KHNyYykpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV4dExpbmUuc2VhcmNoKC9bXiBdLykgPj0gaW5kZW50IHx8ICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gRGVkZW50IGlmIHBvc3NpYmxlXG4gICAgICAgICAgICAgIGl0ZW1Db250ZW50cyArPSAnXFxuJyArIG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBub3QgZW5vdWdoIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgIGlmIChibGFua0xpbmUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIHBhcmFncmFwaCBjb250aW51YXRpb24gdW5sZXNzIGxhc3QgbGluZSB3YXMgYSBkaWZmZXJlbnQgYmxvY2sgbGV2ZWwgZWxlbWVudFxuICAgICAgICAgICAgICBpZiAobGluZS5zZWFyY2goL1teIF0vKSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgLy8gaW5kZW50ZWQgY29kZSBibG9ja1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmZW5jZXNCZWdpblJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoaGVhZGluZ0JlZ2luUmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChoclJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpdGVtQ29udGVudHMgKz0gJ1xcbicgKyBuZXh0TGluZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmxhbmtMaW5lICYmICFuZXh0TGluZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCBsaW5lIGlzIGJsYW5rXG4gICAgICAgICAgICAgIGJsYW5rTGluZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXcgKz0gcmF3TGluZSArICdcXG4nO1xuICAgICAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhyYXdMaW5lLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgbGluZSA9IG5leHRMaW5lLnNsaWNlKGluZGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbGlzdC5sb29zZSkge1xuICAgICAgICAgIC8vIElmIHRoZSBwcmV2aW91cyBpdGVtIGVuZGVkIHdpdGggYSBibGFuayBsaW5lLCB0aGUgbGlzdCBpcyBsb29zZVxuICAgICAgICAgIGlmIChlbmRzV2l0aEJsYW5rTGluZSkge1xuICAgICAgICAgICAgbGlzdC5sb29zZSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXFxuICpcXG4gKiQvLnRlc3QocmF3KSkge1xuICAgICAgICAgICAgZW5kc1dpdGhCbGFua0xpbmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciB0YXNrIGxpc3QgaXRlbXNcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICAgICAgICBpc3Rhc2sgPSAvXlxcW1sgeFhdXFxdIC8uZXhlYyhpdGVtQ29udGVudHMpO1xuICAgICAgICAgIGlmIChpc3Rhc2spIHtcbiAgICAgICAgICAgIGlzY2hlY2tlZCA9IGlzdGFza1swXSAhPT0gJ1sgXSAnO1xuICAgICAgICAgICAgaXRlbUNvbnRlbnRzID0gaXRlbUNvbnRlbnRzLnJlcGxhY2UoL15cXFtbIHhYXVxcXSArLywgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW0nLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRhc2s6ICEhaXN0YXNrLFxuICAgICAgICAgIGNoZWNrZWQ6IGlzY2hlY2tlZCxcbiAgICAgICAgICBsb29zZTogZmFsc2UsXG4gICAgICAgICAgdGV4dDogaXRlbUNvbnRlbnRzXG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0LnJhdyArPSByYXc7XG4gICAgICB9XG5cbiAgICAgIC8vIERvIG5vdCBjb25zdW1lIG5ld2xpbmVzIGF0IGVuZCBvZiBmaW5hbCBpdGVtLiBBbHRlcm5hdGl2ZWx5LCBtYWtlIGl0ZW1SZWdleCAqc3RhcnQqIHdpdGggYW55IG5ld2xpbmVzIHRvIHNpbXBsaWZ5L3NwZWVkIHVwIGVuZHNXaXRoQmxhbmtMaW5lIGxvZ2ljXG4gICAgICBsaXN0Lml0ZW1zW2xpc3QuaXRlbXMubGVuZ3RoIC0gMV0ucmF3ID0gcmF3LnRyaW1SaWdodCgpO1xuICAgICAgbGlzdC5pdGVtc1tsaXN0Lml0ZW1zLmxlbmd0aCAtIDFdLnRleHQgPSBpdGVtQ29udGVudHMudHJpbVJpZ2h0KCk7XG4gICAgICBsaXN0LnJhdyA9IGxpc3QucmF3LnRyaW1SaWdodCgpO1xuICAgICAgdmFyIGwgPSBsaXN0Lml0ZW1zLmxlbmd0aDtcblxuICAgICAgLy8gSXRlbSBjaGlsZCB0b2tlbnMgaGFuZGxlZCBoZXJlIGF0IGVuZCBiZWNhdXNlIHdlIG5lZWRlZCB0byBoYXZlIHRoZSBmaW5hbCBpdGVtIHRvIHRyaW0gaXQgZmlyc3RcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS50b3AgPSBmYWxzZTtcbiAgICAgICAgbGlzdC5pdGVtc1tpXS50b2tlbnMgPSB0aGlzLmxleGVyLmJsb2NrVG9rZW5zKGxpc3QuaXRlbXNbaV0udGV4dCwgW10pO1xuICAgICAgICBpZiAoIWxpc3QubG9vc2UpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiBsaXN0IHNob3VsZCBiZSBsb29zZVxuICAgICAgICAgIHZhciBzcGFjZXJzID0gbGlzdC5pdGVtc1tpXS50b2tlbnMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC50eXBlID09PSAnc3BhY2UnO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBoYXNNdWx0aXBsZUxpbmVCcmVha3MgPSBzcGFjZXJzLmxlbmd0aCA+IDAgJiYgc3BhY2Vycy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gL1xcbi4qXFxuLy50ZXN0KHQucmF3KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsaXN0Lmxvb3NlID0gaGFzTXVsdGlwbGVMaW5lQnJlYWtzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBhbGwgaXRlbXMgdG8gbG9vc2UgaWYgbGlzdCBpcyBsb29zZVxuICAgICAgaWYgKGxpc3QubG9vc2UpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGxpc3QuaXRlbXNbaV0ubG9vc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5odG1sLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdG9rZW4gPSB7XG4gICAgICAgIHR5cGU6ICdodG1sJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHByZTogIXRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgJiYgKGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScpLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pO1xuICAgICAgICB0b2tlbi50eXBlID0gJ3BhcmFncmFwaCc7XG4gICAgICAgIHRva2VuLnRleHQgPSB0ZXh0O1xuICAgICAgICB0b2tlbi50b2tlbnMgPSB0aGlzLmxleGVyLmlubGluZSh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gIH07XG4gIF9wcm90by5kZWYgPSBmdW5jdGlvbiBkZWYoc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuYmxvY2suZGVmLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICB2YXIgdGFnID0gY2FwWzFdLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgdmFyIGhyZWYgPSBjYXBbMl0gPyBjYXBbMl0ucmVwbGFjZSgvXjwoLiopPiQvLCAnJDEnKS5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6ICcnO1xuICAgICAgdmFyIHRpdGxlID0gY2FwWzNdID8gY2FwWzNdLnN1YnN0cmluZygxLCBjYXBbM10ubGVuZ3RoIC0gMSkucmVwbGFjZSh0aGlzLnJ1bGVzLmlubGluZS5fZXNjYXBlcywgJyQxJykgOiBjYXBbM107XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZGVmJyxcbiAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8udGFibGUgPSBmdW5jdGlvbiB0YWJsZShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50YWJsZS5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogc3BsaXRDZWxscyhjYXBbMV0pLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0OiBjXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgcm93czogY2FwWzNdICYmIGNhcFszXS50cmltKCkgPyBjYXBbM10ucmVwbGFjZSgvXFxuWyBcXHRdKiQvLCAnJykuc3BsaXQoJ1xcbicpIDogW11cbiAgICAgIH07XG4gICAgICBpZiAoaXRlbS5oZWFkZXIubGVuZ3RoID09PSBpdGVtLmFsaWduLmxlbmd0aCkge1xuICAgICAgICBpdGVtLnJhdyA9IGNhcFswXTtcbiAgICAgICAgdmFyIGwgPSBpdGVtLmFsaWduLmxlbmd0aDtcbiAgICAgICAgdmFyIGksIGosIGssIHJvdztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbCA9IGl0ZW0ucm93cy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpdGVtLnJvd3NbaV0gPSBzcGxpdENlbGxzKGl0ZW0ucm93c1tpXSwgaXRlbS5oZWFkZXIubGVuZ3RoKS5tYXAoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRleHQ6IGNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwYXJzZSBjaGlsZCB0b2tlbnMgaW5zaWRlIGhlYWRlcnMgYW5kIGNlbGxzXG5cbiAgICAgICAgLy8gaGVhZGVyIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5oZWFkZXIubGVuZ3RoO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgaXRlbS5oZWFkZXJbal0udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUoaXRlbS5oZWFkZXJbal0udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjZWxsIGNoaWxkIHRva2Vuc1xuICAgICAgICBsID0gaXRlbS5yb3dzLmxlbmd0aDtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICAgIHJvdyA9IGl0ZW0ucm93c1tqXTtcbiAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgcm93Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICByb3dba10udG9rZW5zID0gdGhpcy5sZXhlci5pbmxpbmUocm93W2tdLnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5saGVhZGluZyA9IGZ1bmN0aW9uIGxoZWFkaW5nKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrLmxoZWFkaW5nLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBkZXB0aDogY2FwWzJdLmNoYXJBdCgwKSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXSxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay5wYXJhZ3JhcGguZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzFdLmNoYXJBdChjYXBbMV0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nID8gY2FwWzFdLnNsaWNlKDAsIC0xKSA6IGNhcFsxXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZSh0ZXh0KVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5ibG9jay50ZXh0LmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiBjYXBbMF0sXG4gICAgICAgIHRva2VuczogdGhpcy5sZXhlci5pbmxpbmUoY2FwWzBdKVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUkMShzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUuZXNjYXBlLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXNjYXBlJyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IGVzY2FwZShjYXBbMV0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRhZyA9IGZ1bmN0aW9uIHRhZyhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUudGFnLmV4ZWMoc3JjKTtcbiAgICBpZiAoY2FwKSB7XG4gICAgICBpZiAoIXRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePChwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrICYmIC9ePFxcLyhwcmV8Y29kZXxrYmR8c2NyaXB0KShcXHN8PikvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5sZXhlci5zdGF0ZS5pblJhd0Jsb2NrID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemUgPyAndGV4dCcgOiAnaHRtbCcsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICBpbkxpbms6IHRoaXMubGV4ZXIuc3RhdGUuaW5MaW5rLFxuICAgICAgICBpblJhd0Jsb2NrOiB0aGlzLmxleGVyLnN0YXRlLmluUmF3QmxvY2ssXG4gICAgICAgIHRleHQ6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZSA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIgPyB0aGlzLm9wdGlvbnMuc2FuaXRpemVyKGNhcFswXSkgOiBlc2NhcGUoY2FwWzBdKSA6IGNhcFswXVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5saW5rID0gZnVuY3Rpb24gbGluayhzcmMpIHtcbiAgICB2YXIgY2FwID0gdGhpcy5ydWxlcy5pbmxpbmUubGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRyaW1tZWRVcmwgPSBjYXBbMl0udHJpbSgpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgL148Ly50ZXN0KHRyaW1tZWRVcmwpKSB7XG4gICAgICAgIC8vIGNvbW1vbm1hcmsgcmVxdWlyZXMgbWF0Y2hpbmcgYW5nbGUgYnJhY2tldHNcbiAgICAgICAgaWYgKCEvPiQvLnRlc3QodHJpbW1lZFVybCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmRpbmcgYW5nbGUgYnJhY2tldCBjYW5ub3QgYmUgZXNjYXBlZFxuICAgICAgICB2YXIgcnRyaW1TbGFzaCA9IHJ0cmltKHRyaW1tZWRVcmwuc2xpY2UoMCwgLTEpLCAnXFxcXCcpO1xuICAgICAgICBpZiAoKHRyaW1tZWRVcmwubGVuZ3RoIC0gcnRyaW1TbGFzaC5sZW5ndGgpICUgMiA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmluZCBjbG9zaW5nIHBhcmVudGhlc2lzXG4gICAgICAgIHZhciBsYXN0UGFyZW5JbmRleCA9IGZpbmRDbG9zaW5nQnJhY2tldChjYXBbMl0sICcoKScpO1xuICAgICAgICBpZiAobGFzdFBhcmVuSW5kZXggPiAtMSkge1xuICAgICAgICAgIHZhciBzdGFydCA9IGNhcFswXS5pbmRleE9mKCchJykgPT09IDAgPyA1IDogNDtcbiAgICAgICAgICB2YXIgbGlua0xlbiA9IHN0YXJ0ICsgY2FwWzFdLmxlbmd0aCArIGxhc3RQYXJlbkluZGV4O1xuICAgICAgICAgIGNhcFsyXSA9IGNhcFsyXS5zdWJzdHJpbmcoMCwgbGFzdFBhcmVuSW5kZXgpO1xuICAgICAgICAgIGNhcFswXSA9IGNhcFswXS5zdWJzdHJpbmcoMCwgbGlua0xlbikudHJpbSgpO1xuICAgICAgICAgIGNhcFszXSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgaHJlZiA9IGNhcFsyXTtcbiAgICAgIHZhciB0aXRsZSA9ICcnO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgICAgICAvLyBzcGxpdCBwZWRhbnRpYyBocmVmIGFuZCB0aXRsZVxuICAgICAgICB2YXIgbGluayA9IC9eKFteJ1wiXSpbXlxcc10pXFxzKyhbJ1wiXSkoLiopXFwyLy5leGVjKGhyZWYpO1xuICAgICAgICBpZiAobGluaykge1xuICAgICAgICAgIGhyZWYgPSBsaW5rWzFdO1xuICAgICAgICAgIHRpdGxlID0gbGlua1szXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGl0bGUgPSBjYXBbM10gPyBjYXBbM10uc2xpY2UoMSwgLTEpIDogJyc7XG4gICAgICB9XG4gICAgICBocmVmID0gaHJlZi50cmltKCk7XG4gICAgICBpZiAoL148Ly50ZXN0KGhyZWYpKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMgJiYgIS8+JC8udGVzdCh0cmltbWVkVXJsKSkge1xuICAgICAgICAgIC8vIHBlZGFudGljIGFsbG93cyBzdGFydGluZyBhbmdsZSBicmFja2V0IHdpdGhvdXQgZW5kaW5nIGFuZ2xlIGJyYWNrZXRcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBocmVmID0gaHJlZi5zbGljZSgxLCAtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBocmVmID8gaHJlZi5yZXBsYWNlKHRoaXMucnVsZXMuaW5saW5lLl9lc2NhcGVzLCAnJDEnKSA6IGhyZWYsXG4gICAgICAgIHRpdGxlOiB0aXRsZSA/IHRpdGxlLnJlcGxhY2UodGhpcy5ydWxlcy5pbmxpbmUuX2VzY2FwZXMsICckMScpIDogdGl0bGVcbiAgICAgIH0sIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ucmVmbGluayA9IGZ1bmN0aW9uIHJlZmxpbmsoc3JjLCBsaW5rcykge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5yZWZsaW5rLmV4ZWMoc3JjKSkgfHwgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICB2YXIgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gbGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluaykge1xuICAgICAgICB2YXIgdGV4dCA9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0TGluayhjYXAsIGxpbmssIGNhcFswXSwgdGhpcy5sZXhlcik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZW1TdHJvbmcgPSBmdW5jdGlvbiBlbVN0cm9uZyhzcmMsIG1hc2tlZFNyYywgcHJldkNoYXIpIHtcbiAgICBpZiAocHJldkNoYXIgPT09IHZvaWQgMCkge1xuICAgICAgcHJldkNoYXIgPSAnJztcbiAgICB9XG4gICAgdmFyIG1hdGNoID0gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcubERlbGltLmV4ZWMoc3JjKTtcbiAgICBpZiAoIW1hdGNoKSByZXR1cm47XG5cbiAgICAvLyBfIGNhbid0IGJlIGJldHdlZW4gdHdvIGFscGhhbnVtZXJpY3MuIFxccHtMfVxccHtOfSBpbmNsdWRlcyBub24tZW5nbGlzaCBhbHBoYWJldC9udW1iZXJzIGFzIHdlbGxcbiAgICBpZiAobWF0Y2hbM10gJiYgcHJldkNoYXIubWF0Y2goLyg/OlswLTlBLVphLXpcXHhBQVxceEIyXFx4QjNcXHhCNVxceEI5XFx4QkFcXHhCQy1cXHhCRVxceEMwLVxceEQ2XFx4RDgtXFx4RjZcXHhGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzN0ZcXHUwMzg2XFx1MDM4OC1cXHUwMzhBXFx1MDM4Q1xcdTAzOEUtXFx1MDNBMVxcdTAzQTMtXFx1MDNGNVxcdTAzRjctXFx1MDQ4MVxcdTA0OEEtXFx1MDUyRlxcdTA1MzEtXFx1MDU1NlxcdTA1NTlcXHUwNTYwLVxcdTA1ODhcXHUwNUQwLVxcdTA1RUFcXHUwNUVGLVxcdTA1RjJcXHUwNjIwLVxcdTA2NEFcXHUwNjYwLVxcdTA2NjlcXHUwNjZFXFx1MDY2RlxcdTA2NzEtXFx1MDZEM1xcdTA2RDVcXHUwNkU1XFx1MDZFNlxcdTA2RUUtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3QzAtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4NjAtXFx1MDg2QVxcdTA4NzAtXFx1MDg4N1xcdTA4ODktXFx1MDg4RVxcdTA4QTAtXFx1MDhDOVxcdTA5MDQtXFx1MDkzOVxcdTA5M0RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk2Ni1cXHUwOTZGXFx1MDk3MS1cXHUwOTgwXFx1MDk4NS1cXHUwOThDXFx1MDk4RlxcdTA5OTBcXHUwOTkzLVxcdTA5QThcXHUwOUFBLVxcdTA5QjBcXHUwOUIyXFx1MDlCNi1cXHUwOUI5XFx1MDlCRFxcdTA5Q0VcXHUwOURDXFx1MDlERFxcdTA5REYtXFx1MDlFMVxcdTA5RTYtXFx1MDlGMVxcdTA5RjQtXFx1MDlGOVxcdTA5RkNcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTY2LVxcdTBBNkZcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQUU2LVxcdTBBRUZcXHUwQUY5XFx1MEIwNS1cXHUwQjBDXFx1MEIwRlxcdTBCMTBcXHUwQjEzLVxcdTBCMjhcXHUwQjJBLVxcdTBCMzBcXHUwQjMyXFx1MEIzM1xcdTBCMzUtXFx1MEIzOVxcdTBCM0RcXHUwQjVDXFx1MEI1RFxcdTBCNUYtXFx1MEI2MVxcdTBCNjYtXFx1MEI2RlxcdTBCNzEtXFx1MEI3N1xcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBCRTYtXFx1MEJGMlxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzOVxcdTBDM0RcXHUwQzU4LVxcdTBDNUFcXHUwQzVEXFx1MEM2MFxcdTBDNjFcXHUwQzY2LVxcdTBDNkZcXHUwQzc4LVxcdTBDN0VcXHUwQzgwXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDRERcXHUwQ0RFXFx1MENFMFxcdTBDRTFcXHUwQ0U2LVxcdTBDRUZcXHUwQ0YxXFx1MENGMlxcdTBEMDQtXFx1MEQwQ1xcdTBEMEUtXFx1MEQxMFxcdTBEMTItXFx1MEQzQVxcdTBEM0RcXHUwRDRFXFx1MEQ1NC1cXHUwRDU2XFx1MEQ1OC1cXHUwRDYxXFx1MEQ2Ni1cXHUwRDc4XFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBERTYtXFx1MERFRlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ2XFx1MEU1MC1cXHUwRTU5XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4Ni1cXHUwRThBXFx1MEU4Qy1cXHUwRUEzXFx1MEVBNVxcdTBFQTctXFx1MEVCMFxcdTBFQjJcXHUwRUIzXFx1MEVCRFxcdTBFQzAtXFx1MEVDNFxcdTBFQzZcXHUwRUQwLVxcdTBFRDlcXHUwRURDLVxcdTBFREZcXHUwRjAwXFx1MEYyMC1cXHUwRjMzXFx1MEY0MC1cXHUwRjQ3XFx1MEY0OS1cXHUwRjZDXFx1MEY4OC1cXHUwRjhDXFx1MTAwMC1cXHUxMDJBXFx1MTAzRi1cXHUxMDQ5XFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwOTAtXFx1MTA5OVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzY5LVxcdTEzN0NcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjVcXHUxM0Y4LVxcdTEzRkRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNkVFLVxcdTE2RjhcXHUxNzAwLVxcdTE3MTFcXHUxNzFGLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE3RTAtXFx1MTdFOVxcdTE3RjAtXFx1MTdGOVxcdTE4MTAtXFx1MTgxOVxcdTE4MjAtXFx1MTg3OFxcdTE4ODAtXFx1MTg4NFxcdTE4ODctXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUVcXHUxOTQ2LVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUIwLVxcdTE5QzlcXHUxOUQwLVxcdTE5REFcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQTgwLVxcdTFBODlcXHUxQTkwLVxcdTFBOTlcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRDXFx1MUI1MC1cXHUxQjU5XFx1MUI4My1cXHUxQkEwXFx1MUJBRS1cXHUxQkU1XFx1MUMwMC1cXHUxQzIzXFx1MUM0MC1cXHUxQzQ5XFx1MUM0RC1cXHUxQzdEXFx1MUM4MC1cXHUxQzg4XFx1MUM5MC1cXHUxQ0JBXFx1MUNCRC1cXHUxQ0JGXFx1MUNFOS1cXHUxQ0VDXFx1MUNFRS1cXHUxQ0YzXFx1MUNGNVxcdTFDRjZcXHUxQ0ZBXFx1MUQwMC1cXHUxREJGXFx1MUUwMC1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwNzBcXHUyMDcxXFx1MjA3NC1cXHUyMDc5XFx1MjA3Ri1cXHUyMDg5XFx1MjA5MC1cXHUyMDlDXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxNTAtXFx1MjE4OVxcdTI0NjAtXFx1MjQ5QlxcdTI0RUEtXFx1MjRGRlxcdTI3NzYtXFx1Mjc5M1xcdTJDMDAtXFx1MkNFNFxcdTJDRUItXFx1MkNFRVxcdTJDRjJcXHUyQ0YzXFx1MkNGRFxcdTJEMDAtXFx1MkQyNVxcdTJEMjdcXHUyRDJEXFx1MkQzMC1cXHUyRDY3XFx1MkQ2RlxcdTJEODAtXFx1MkQ5NlxcdTJEQTAtXFx1MkRBNlxcdTJEQTgtXFx1MkRBRVxcdTJEQjAtXFx1MkRCNlxcdTJEQjgtXFx1MkRCRVxcdTJEQzAtXFx1MkRDNlxcdTJEQzgtXFx1MkRDRVxcdTJERDAtXFx1MkRENlxcdTJERDgtXFx1MkRERVxcdTJFMkZcXHUzMDA1LVxcdTMwMDdcXHUzMDIxLVxcdTMwMjlcXHUzMDMxLVxcdTMwMzVcXHUzMDM4LVxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDlELVxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZDLVxcdTMwRkZcXHUzMTA1LVxcdTMxMkZcXHUzMTMxLVxcdTMxOEVcXHUzMTkyLVxcdTMxOTVcXHUzMUEwLVxcdTMxQkZcXHUzMUYwLVxcdTMxRkZcXHUzMjIwLVxcdTMyMjlcXHUzMjQ4LVxcdTMyNEZcXHUzMjUxLVxcdTMyNUZcXHUzMjgwLVxcdTMyODlcXHUzMkIxLVxcdTMyQkZcXHUzNDAwLVxcdTREQkZcXHU0RTAwLVxcdUE0OENcXHVBNEQwLVxcdUE0RkRcXHVBNTAwLVxcdUE2MENcXHVBNjEwLVxcdUE2MkJcXHVBNjQwLVxcdUE2NkVcXHVBNjdGLVxcdUE2OURcXHVBNkEwLVxcdUE2RUZcXHVBNzE3LVxcdUE3MUZcXHVBNzIyLVxcdUE3ODhcXHVBNzhCLVxcdUE3Q0FcXHVBN0QwXFx1QTdEMVxcdUE3RDNcXHVBN0Q1LVxcdUE3RDlcXHVBN0YyLVxcdUE4MDFcXHVBODAzLVxcdUE4MDVcXHVBODA3LVxcdUE4MEFcXHVBODBDLVxcdUE4MjJcXHVBODMwLVxcdUE4MzVcXHVBODQwLVxcdUE4NzNcXHVBODgyLVxcdUE4QjNcXHVBOEQwLVxcdUE4RDlcXHVBOEYyLVxcdUE4RjdcXHVBOEZCXFx1QThGRFxcdUE4RkVcXHVBOTAwLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGLVxcdUE5RDlcXHVBOUUwLVxcdUE5RTRcXHVBOUU2LVxcdUE5RkVcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTUwLVxcdUFBNTlcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE3RS1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQjMwLVxcdUFCNUFcXHVBQjVDLVxcdUFCNjlcXHVBQjcwLVxcdUFCRTJcXHVBQkYwLVxcdUFCRjlcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGQjM2XFx1RkIzOC1cXHVGQjNDXFx1RkIzRVxcdUZCNDBcXHVGQjQxXFx1RkI0M1xcdUZCNDRcXHVGQjQ2LVxcdUZCQjFcXHVGQkQzLVxcdUZEM0RcXHVGRDUwLVxcdUZEOEZcXHVGRDkyLVxcdUZEQzdcXHVGREYwLVxcdUZERkJcXHVGRTcwLVxcdUZFNzRcXHVGRTc2LVxcdUZFRkNcXHVGRjEwLVxcdUZGMTlcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcXHVGRjY2LVxcdUZGQkVcXHVGRkMyLVxcdUZGQzdcXHVGRkNBLVxcdUZGQ0ZcXHVGRkQyLVxcdUZGRDdcXHVGRkRBLVxcdUZGRENdfFxcdUQ4MDBbXFx1REMwMC1cXHVEQzBCXFx1REMwRC1cXHVEQzI2XFx1REMyOC1cXHVEQzNBXFx1REMzQ1xcdURDM0RcXHVEQzNGLVxcdURDNERcXHVEQzUwLVxcdURDNURcXHVEQzgwLVxcdURDRkFcXHVERDA3LVxcdUREMzNcXHVERDQwLVxcdURENzhcXHVERDhBXFx1REQ4QlxcdURFODAtXFx1REU5Q1xcdURFQTAtXFx1REVEMFxcdURFRTEtXFx1REVGQlxcdURGMDAtXFx1REYyM1xcdURGMkQtXFx1REY0QVxcdURGNTAtXFx1REY3NVxcdURGODAtXFx1REY5RFxcdURGQTAtXFx1REZDM1xcdURGQzgtXFx1REZDRlxcdURGRDEtXFx1REZENV18XFx1RDgwMVtcXHVEQzAwLVxcdURDOURcXHVEQ0EwLVxcdURDQTlcXHVEQ0IwLVxcdURDRDNcXHVEQ0Q4LVxcdURDRkJcXHVERDAwLVxcdUREMjdcXHVERDMwLVxcdURENjNcXHVERDcwLVxcdUREN0FcXHVERDdDLVxcdUREOEFcXHVERDhDLVxcdUREOTJcXHVERDk0XFx1REQ5NVxcdUREOTctXFx1RERBMVxcdUREQTMtXFx1RERCMVxcdUREQjMtXFx1RERCOVxcdUREQkJcXHVEREJDXFx1REUwMC1cXHVERjM2XFx1REY0MC1cXHVERjU1XFx1REY2MC1cXHVERjY3XFx1REY4MC1cXHVERjg1XFx1REY4Ny1cXHVERkIwXFx1REZCMi1cXHVERkJBXXxcXHVEODAyW1xcdURDMDAtXFx1REMwNVxcdURDMDhcXHVEQzBBLVxcdURDMzVcXHVEQzM3XFx1REMzOFxcdURDM0NcXHVEQzNGLVxcdURDNTVcXHVEQzU4LVxcdURDNzZcXHVEQzc5LVxcdURDOUVcXHVEQ0E3LVxcdURDQUZcXHVEQ0UwLVxcdURDRjJcXHVEQ0Y0XFx1RENGNVxcdURDRkItXFx1REQxQlxcdUREMjAtXFx1REQzOVxcdUREODAtXFx1RERCN1xcdUREQkMtXFx1RERDRlxcdURERDItXFx1REUwMFxcdURFMTAtXFx1REUxM1xcdURFMTUtXFx1REUxN1xcdURFMTktXFx1REUzNVxcdURFNDAtXFx1REU0OFxcdURFNjAtXFx1REU3RVxcdURFODAtXFx1REU5RlxcdURFQzAtXFx1REVDN1xcdURFQzktXFx1REVFNFxcdURFRUItXFx1REVFRlxcdURGMDAtXFx1REYzNVxcdURGNDAtXFx1REY1NVxcdURGNTgtXFx1REY3MlxcdURGNzgtXFx1REY5MVxcdURGQTktXFx1REZBRl18XFx1RDgwM1tcXHVEQzAwLVxcdURDNDhcXHVEQzgwLVxcdURDQjJcXHVEQ0MwLVxcdURDRjJcXHVEQ0ZBLVxcdUREMjNcXHVERDMwLVxcdUREMzlcXHVERTYwLVxcdURFN0VcXHVERTgwLVxcdURFQTlcXHVERUIwXFx1REVCMVxcdURGMDAtXFx1REYyN1xcdURGMzAtXFx1REY0NVxcdURGNTEtXFx1REY1NFxcdURGNzAtXFx1REY4MVxcdURGQjAtXFx1REZDQlxcdURGRTAtXFx1REZGNl18XFx1RDgwNFtcXHVEQzAzLVxcdURDMzdcXHVEQzUyLVxcdURDNkZcXHVEQzcxXFx1REM3MlxcdURDNzVcXHVEQzgzLVxcdURDQUZcXHVEQ0QwLVxcdURDRThcXHVEQ0YwLVxcdURDRjlcXHVERDAzLVxcdUREMjZcXHVERDM2LVxcdUREM0ZcXHVERDQ0XFx1REQ0N1xcdURENTAtXFx1REQ3MlxcdURENzZcXHVERDgzLVxcdUREQjJcXHVEREMxLVxcdUREQzRcXHVEREQwLVxcdUREREFcXHVERERDXFx1RERFMS1cXHVEREY0XFx1REUwMC1cXHVERTExXFx1REUxMy1cXHVERTJCXFx1REU4MC1cXHVERTg2XFx1REU4OFxcdURFOEEtXFx1REU4RFxcdURFOEYtXFx1REU5RFxcdURFOUYtXFx1REVBOFxcdURFQjAtXFx1REVERVxcdURFRjAtXFx1REVGOVxcdURGMDUtXFx1REYwQ1xcdURGMEZcXHVERjEwXFx1REYxMy1cXHVERjI4XFx1REYyQS1cXHVERjMwXFx1REYzMlxcdURGMzNcXHVERjM1LVxcdURGMzlcXHVERjNEXFx1REY1MFxcdURGNUQtXFx1REY2MV18XFx1RDgwNVtcXHVEQzAwLVxcdURDMzRcXHVEQzQ3LVxcdURDNEFcXHVEQzUwLVxcdURDNTlcXHVEQzVGLVxcdURDNjFcXHVEQzgwLVxcdURDQUZcXHVEQ0M0XFx1RENDNVxcdURDQzdcXHVEQ0QwLVxcdURDRDlcXHVERDgwLVxcdUREQUVcXHVEREQ4LVxcdUREREJcXHVERTAwLVxcdURFMkZcXHVERTQ0XFx1REU1MC1cXHVERTU5XFx1REU4MC1cXHVERUFBXFx1REVCOFxcdURFQzAtXFx1REVDOVxcdURGMDAtXFx1REYxQVxcdURGMzAtXFx1REYzQlxcdURGNDAtXFx1REY0Nl18XFx1RDgwNltcXHVEQzAwLVxcdURDMkJcXHVEQ0EwLVxcdURDRjJcXHVEQ0ZGLVxcdUREMDZcXHVERDA5XFx1REQwQy1cXHVERDEzXFx1REQxNVxcdUREMTZcXHVERDE4LVxcdUREMkZcXHVERDNGXFx1REQ0MVxcdURENTAtXFx1REQ1OVxcdUREQTAtXFx1RERBN1xcdUREQUEtXFx1REREMFxcdURERTFcXHVEREUzXFx1REUwMFxcdURFMEItXFx1REUzMlxcdURFM0FcXHVERTUwXFx1REU1Qy1cXHVERTg5XFx1REU5RFxcdURFQjAtXFx1REVGOF18XFx1RDgwN1tcXHVEQzAwLVxcdURDMDhcXHVEQzBBLVxcdURDMkVcXHVEQzQwXFx1REM1MC1cXHVEQzZDXFx1REM3Mi1cXHVEQzhGXFx1REQwMC1cXHVERDA2XFx1REQwOFxcdUREMDlcXHVERDBCLVxcdUREMzBcXHVERDQ2XFx1REQ1MC1cXHVERDU5XFx1REQ2MC1cXHVERDY1XFx1REQ2N1xcdURENjhcXHVERDZBLVxcdUREODlcXHVERDk4XFx1RERBMC1cXHVEREE5XFx1REVFMC1cXHVERUYyXFx1REZCMFxcdURGQzAtXFx1REZENF18XFx1RDgwOFtcXHVEQzAwLVxcdURGOTldfFxcdUQ4MDlbXFx1REMwMC1cXHVEQzZFXFx1REM4MC1cXHVERDQzXXxcXHVEODBCW1xcdURGOTAtXFx1REZGMF18W1xcdUQ4MENcXHVEODFDLVxcdUQ4MjBcXHVEODIyXFx1RDg0MC1cXHVEODY4XFx1RDg2QS1cXHVEODZDXFx1RDg2Ri1cXHVEODcyXFx1RDg3NC1cXHVEODc5XFx1RDg4MC1cXHVEODgzXVtcXHVEQzAwLVxcdURGRkZdfFxcdUQ4MERbXFx1REMwMC1cXHVEQzJFXXxcXHVEODExW1xcdURDMDAtXFx1REU0Nl18XFx1RDgxQVtcXHVEQzAwLVxcdURFMzhcXHVERTQwLVxcdURFNUVcXHVERTYwLVxcdURFNjlcXHVERTcwLVxcdURFQkVcXHVERUMwLVxcdURFQzlcXHVERUQwLVxcdURFRURcXHVERjAwLVxcdURGMkZcXHVERjQwLVxcdURGNDNcXHVERjUwLVxcdURGNTlcXHVERjVCLVxcdURGNjFcXHVERjYzLVxcdURGNzdcXHVERjdELVxcdURGOEZdfFxcdUQ4MUJbXFx1REU0MC1cXHVERTk2XFx1REYwMC1cXHVERjRBXFx1REY1MFxcdURGOTMtXFx1REY5RlxcdURGRTBcXHVERkUxXFx1REZFM118XFx1RDgyMVtcXHVEQzAwLVxcdURGRjddfFxcdUQ4MjNbXFx1REMwMC1cXHVEQ0Q1XFx1REQwMC1cXHVERDA4XXxcXHVEODJCW1xcdURGRjAtXFx1REZGM1xcdURGRjUtXFx1REZGQlxcdURGRkRcXHVERkZFXXxcXHVEODJDW1xcdURDMDAtXFx1REQyMlxcdURENTAtXFx1REQ1MlxcdURENjQtXFx1REQ2N1xcdURENzAtXFx1REVGQl18XFx1RDgyRltcXHVEQzAwLVxcdURDNkFcXHVEQzcwLVxcdURDN0NcXHVEQzgwLVxcdURDODhcXHVEQzkwLVxcdURDOTldfFxcdUQ4MzRbXFx1REVFMC1cXHVERUYzXFx1REY2MC1cXHVERjc4XXxcXHVEODM1W1xcdURDMDAtXFx1REM1NFxcdURDNTYtXFx1REM5Q1xcdURDOUVcXHVEQzlGXFx1RENBMlxcdURDQTVcXHVEQ0E2XFx1RENBOS1cXHVEQ0FDXFx1RENBRS1cXHVEQ0I5XFx1RENCQlxcdURDQkQtXFx1RENDM1xcdURDQzUtXFx1REQwNVxcdUREMDctXFx1REQwQVxcdUREMEQtXFx1REQxNFxcdUREMTYtXFx1REQxQ1xcdUREMUUtXFx1REQzOVxcdUREM0ItXFx1REQzRVxcdURENDAtXFx1REQ0NFxcdURENDZcXHVERDRBLVxcdURENTBcXHVERDUyLVxcdURFQTVcXHVERUE4LVxcdURFQzBcXHVERUMyLVxcdURFREFcXHVERURDLVxcdURFRkFcXHVERUZDLVxcdURGMTRcXHVERjE2LVxcdURGMzRcXHVERjM2LVxcdURGNEVcXHVERjUwLVxcdURGNkVcXHVERjcwLVxcdURGODhcXHVERjhBLVxcdURGQThcXHVERkFBLVxcdURGQzJcXHVERkM0LVxcdURGQ0JcXHVERkNFLVxcdURGRkZdfFxcdUQ4MzdbXFx1REYwMC1cXHVERjFFXXxcXHVEODM4W1xcdUREMDAtXFx1REQyQ1xcdUREMzctXFx1REQzRFxcdURENDAtXFx1REQ0OVxcdURENEVcXHVERTkwLVxcdURFQURcXHVERUMwLVxcdURFRUJcXHVERUYwLVxcdURFRjldfFxcdUQ4MzlbXFx1REZFMC1cXHVERkU2XFx1REZFOC1cXHVERkVCXFx1REZFRFxcdURGRUVcXHVERkYwLVxcdURGRkVdfFxcdUQ4M0FbXFx1REMwMC1cXHVEQ0M0XFx1RENDNy1cXHVEQ0NGXFx1REQwMC1cXHVERDQzXFx1REQ0QlxcdURENTAtXFx1REQ1OV18XFx1RDgzQltcXHVEQzcxLVxcdURDQUJcXHVEQ0FELVxcdURDQUZcXHVEQ0IxLVxcdURDQjRcXHVERDAxLVxcdUREMkRcXHVERDJGLVxcdUREM0RcXHVERTAwLVxcdURFMDNcXHVERTA1LVxcdURFMUZcXHVERTIxXFx1REUyMlxcdURFMjRcXHVERTI3XFx1REUyOS1cXHVERTMyXFx1REUzNC1cXHVERTM3XFx1REUzOVxcdURFM0JcXHVERTQyXFx1REU0N1xcdURFNDlcXHVERTRCXFx1REU0RC1cXHVERTRGXFx1REU1MVxcdURFNTJcXHVERTU0XFx1REU1N1xcdURFNTlcXHVERTVCXFx1REU1RFxcdURFNUZcXHVERTYxXFx1REU2MlxcdURFNjRcXHVERTY3LVxcdURFNkFcXHVERTZDLVxcdURFNzJcXHVERTc0LVxcdURFNzdcXHVERTc5LVxcdURFN0NcXHVERTdFXFx1REU4MC1cXHVERTg5XFx1REU4Qi1cXHVERTlCXFx1REVBMS1cXHVERUEzXFx1REVBNS1cXHVERUE5XFx1REVBQi1cXHVERUJCXXxcXHVEODNDW1xcdUREMDAtXFx1REQwQ118XFx1RDgzRVtcXHVERkYwLVxcdURGRjldfFxcdUQ4NjlbXFx1REMwMC1cXHVERURGXFx1REYwMC1cXHVERkZGXXxcXHVEODZEW1xcdURDMDAtXFx1REYzOFxcdURGNDAtXFx1REZGRl18XFx1RDg2RVtcXHVEQzAwLVxcdURDMURcXHVEQzIwLVxcdURGRkZdfFxcdUQ4NzNbXFx1REMwMC1cXHVERUExXFx1REVCMC1cXHVERkZGXXxcXHVEODdBW1xcdURDMDAtXFx1REZFMF18XFx1RDg3RVtcXHVEQzAwLVxcdURFMURdfFxcdUQ4ODRbXFx1REMwMC1cXHVERjRBXSkvKSkgcmV0dXJuO1xuICAgIHZhciBuZXh0Q2hhciA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8ICcnO1xuICAgIGlmICghbmV4dENoYXIgfHwgbmV4dENoYXIgJiYgKHByZXZDaGFyID09PSAnJyB8fCB0aGlzLnJ1bGVzLmlubGluZS5wdW5jdHVhdGlvbi5leGVjKHByZXZDaGFyKSkpIHtcbiAgICAgIHZhciBsTGVuZ3RoID0gbWF0Y2hbMF0ubGVuZ3RoIC0gMTtcbiAgICAgIHZhciByRGVsaW0sXG4gICAgICAgIHJMZW5ndGgsXG4gICAgICAgIGRlbGltVG90YWwgPSBsTGVuZ3RoLFxuICAgICAgICBtaWREZWxpbVRvdGFsID0gMDtcbiAgICAgIHZhciBlbmRSZWcgPSBtYXRjaFswXVswXSA9PT0gJyonID8gdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltQXN0IDogdGhpcy5ydWxlcy5pbmxpbmUuZW1TdHJvbmcuckRlbGltVW5kO1xuICAgICAgZW5kUmVnLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgIC8vIENsaXAgbWFza2VkU3JjIHRvIHNhbWUgc2VjdGlvbiBvZiBzdHJpbmcgYXMgc3JjIChtb3ZlIHRvIGxleGVyPylcbiAgICAgIG1hc2tlZFNyYyA9IG1hc2tlZFNyYy5zbGljZSgtMSAqIHNyYy5sZW5ndGggKyBsTGVuZ3RoKTtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSBlbmRSZWcuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgIHJEZWxpbSA9IG1hdGNoWzFdIHx8IG1hdGNoWzJdIHx8IG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IG1hdGNoWzZdO1xuICAgICAgICBpZiAoIXJEZWxpbSkgY29udGludWU7IC8vIHNraXAgc2luZ2xlICogaW4gX19hYmMqYWJjX19cblxuICAgICAgICByTGVuZ3RoID0gckRlbGltLmxlbmd0aDtcbiAgICAgICAgaWYgKG1hdGNoWzNdIHx8IG1hdGNoWzRdKSB7XG4gICAgICAgICAgLy8gZm91bmQgYW5vdGhlciBMZWZ0IERlbGltXG4gICAgICAgICAgZGVsaW1Ub3RhbCArPSByTGVuZ3RoO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzVdIHx8IG1hdGNoWzZdKSB7XG4gICAgICAgICAgLy8gZWl0aGVyIExlZnQgb3IgUmlnaHQgRGVsaW1cbiAgICAgICAgICBpZiAobExlbmd0aCAlIDMgJiYgISgobExlbmd0aCArIHJMZW5ndGgpICUgMykpIHtcbiAgICAgICAgICAgIG1pZERlbGltVG90YWwgKz0gckxlbmd0aDtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDb21tb25NYXJrIEVtcGhhc2lzIFJ1bGVzIDktMTBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkZWxpbVRvdGFsIC09IHJMZW5ndGg7XG4gICAgICAgIGlmIChkZWxpbVRvdGFsID4gMCkgY29udGludWU7IC8vIEhhdmVuJ3QgZm91bmQgZW5vdWdoIGNsb3NpbmcgZGVsaW1pdGVyc1xuXG4gICAgICAgIC8vIFJlbW92ZSBleHRyYSBjaGFyYWN0ZXJzLiAqYSoqKiAtPiAqYSpcbiAgICAgICAgckxlbmd0aCA9IE1hdGgubWluKHJMZW5ndGgsIHJMZW5ndGggKyBkZWxpbVRvdGFsICsgbWlkRGVsaW1Ub3RhbCk7XG4gICAgICAgIHZhciByYXcgPSBzcmMuc2xpY2UoMCwgbExlbmd0aCArIG1hdGNoLmluZGV4ICsgKG1hdGNoWzBdLmxlbmd0aCAtIHJEZWxpbS5sZW5ndGgpICsgckxlbmd0aCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGBlbWAgaWYgc21hbGxlc3QgZGVsaW1pdGVyIGhhcyBvZGQgY2hhciBjb3VudC4gKmEqKipcbiAgICAgICAgaWYgKE1hdGgubWluKGxMZW5ndGgsIHJMZW5ndGgpICUgMikge1xuICAgICAgICAgIHZhciBfdGV4dCA9IHJhdy5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdlbScsXG4gICAgICAgICAgICByYXc6IHJhdyxcbiAgICAgICAgICAgIHRleHQ6IF90ZXh0LFxuICAgICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2VucyhfdGV4dClcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlICdzdHJvbmcnIGlmIHNtYWxsZXN0IGRlbGltaXRlciBoYXMgZXZlbiBjaGFyIGNvdW50LiAqKmEqKipcbiAgICAgICAgdmFyIHRleHQgPSByYXcuc2xpY2UoMiwgLTIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6ICdzdHJvbmcnLFxuICAgICAgICAgIHJhdzogcmF3LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgdG9rZW5zOiB0aGlzLmxleGVyLmlubGluZVRva2Vucyh0ZXh0KVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmNvZGVzcGFuID0gZnVuY3Rpb24gY29kZXNwYW4oc3JjKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLmNvZGUuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0ID0gY2FwWzJdLnJlcGxhY2UoL1xcbi9nLCAnICcpO1xuICAgICAgdmFyIGhhc05vblNwYWNlQ2hhcnMgPSAvW14gXS8udGVzdCh0ZXh0KTtcbiAgICAgIHZhciBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcyA9IC9eIC8udGVzdCh0ZXh0KSAmJiAvICQvLnRlc3QodGV4dCk7XG4gICAgICBpZiAoaGFzTm9uU3BhY2VDaGFycyAmJiBoYXNTcGFjZUNoYXJzT25Cb3RoRW5kcykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMSwgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICAgIHRleHQgPSBlc2NhcGUodGV4dCwgdHJ1ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnY29kZXNwYW4nLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dFxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5iciA9IGZ1bmN0aW9uIGJyKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5ici5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2JyJyxcbiAgICAgICAgcmF3OiBjYXBbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHNyYykge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5kZWwuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdkZWwnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogY2FwWzJdLFxuICAgICAgICB0b2tlbnM6IHRoaXMubGV4ZXIuaW5saW5lVG9rZW5zKGNhcFsyXSlcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYXV0b2xpbmsgPSBmdW5jdGlvbiBhdXRvbGluayhzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXAgPSB0aGlzLnJ1bGVzLmlubGluZS5hdXRvbGluay5leGVjKHNyYyk7XG4gICAgaWYgKGNhcCkge1xuICAgICAgdmFyIHRleHQsIGhyZWY7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMubWFuZ2xlID8gbWFuZ2xlKGNhcFsxXSkgOiBjYXBbMV0pO1xuICAgICAgICBocmVmID0gJ21haWx0bzonICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnbGluaycsXG4gICAgICAgIHJhdzogY2FwWzBdLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICB0b2tlbnM6IFt7XG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIHJhdzogdGV4dCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgIH1dXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnVybCA9IGZ1bmN0aW9uIHVybChzcmMsIG1hbmdsZSkge1xuICAgIHZhciBjYXA7XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnVybC5leGVjKHNyYykpIHtcbiAgICAgIHZhciB0ZXh0LCBocmVmO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUodGhpcy5vcHRpb25zLm1hbmdsZSA/IG1hbmdsZShjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgICAgaHJlZiA9ICdtYWlsdG86JyArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkbyBleHRlbmRlZCBhdXRvbGluayBwYXRoIHZhbGlkYXRpb25cbiAgICAgICAgdmFyIHByZXZDYXBaZXJvO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgcHJldkNhcFplcm8gPSBjYXBbMF07XG4gICAgICAgICAgY2FwWzBdID0gdGhpcy5ydWxlcy5pbmxpbmUuX2JhY2twZWRhbC5leGVjKGNhcFswXSlbMF07XG4gICAgICAgIH0gd2hpbGUgKHByZXZDYXBaZXJvICE9PSBjYXBbMF0pO1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFswXSk7XG4gICAgICAgIGlmIChjYXBbMV0gPT09ICd3d3cuJykge1xuICAgICAgICAgIGhyZWYgPSAnaHR0cDovLycgKyBjYXBbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHJlZiA9IGNhcFswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ2xpbmsnLFxuICAgICAgICByYXc6IGNhcFswXSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgdG9rZW5zOiBbe1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICByYXc6IHRleHQsXG4gICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICB9XVxuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5pbmxpbmVUZXh0ID0gZnVuY3Rpb24gaW5saW5lVGV4dChzcmMsIHNtYXJ0eXBhbnRzKSB7XG4gICAgdmFyIGNhcCA9IHRoaXMucnVsZXMuaW5saW5lLnRleHQuZXhlYyhzcmMpO1xuICAgIGlmIChjYXApIHtcbiAgICAgIHZhciB0ZXh0O1xuICAgICAgaWYgKHRoaXMubGV4ZXIuc3RhdGUuaW5SYXdCbG9jaykge1xuICAgICAgICB0ZXh0ID0gdGhpcy5vcHRpb25zLnNhbml0aXplID8gdGhpcy5vcHRpb25zLnNhbml0aXplciA/IHRoaXMub3B0aW9ucy5zYW5pdGl6ZXIoY2FwWzBdKSA6IGVzY2FwZShjYXBbMF0pIDogY2FwWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZSh0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMgPyBzbWFydHlwYW50cyhjYXBbMF0pIDogY2FwWzBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgcmF3OiBjYXBbMF0sXG4gICAgICAgIHRleHQ6IHRleHRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICByZXR1cm4gVG9rZW5pemVyO1xufSgpO1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXig/OiAqKD86XFxufCQpKSsvLFxuICBjb2RlOiAvXiggezR9W15cXG5dKyg/Olxcbig/OiAqKD86XFxufCQpKSopPykrLyxcbiAgZmVuY2VzOiAvXiB7MCwzfShgezMsfSg/PVteYFxcbl0qKD86XFxufCQpKXx+ezMsfSkoW15cXG5dKikoPzpcXG58JCkoPzp8KFtcXHNcXFNdKj8pKD86XFxufCQpKSg/OiB7MCwzfVxcMVt+YF0qICooPz1cXG58JCl8JCkvLFxuICBocjogL14gezAsM30oKD86LVtcXHQgXSopezMsfXwoPzpfWyBcXHRdKil7Myx9fCg/OlxcKlsgXFx0XSopezMsfSkoPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gezAsM30oI3sxLDZ9KSg/PVxcc3wkKSguKikoPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oIHswLDN9PiA/KHBhcmFncmFwaHxbXlxcbl0qKSg/OlxcbnwkKSkrLyxcbiAgbGlzdDogL14oIHswLDN9YnVsbCkoWyBcXHRdW15cXG5dKz8pPyg/OlxcbnwkKS8sXG4gIGh0bWw6ICdeIHswLDN9KD86JyAvLyBvcHRpb25hbCBpbmRlbnRhdGlvblxuICArICc8KHNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW1xcXFxzPl1bXFxcXHNcXFxcU10qPyg/OjwvXFxcXDE+W15cXFxcbl0qXFxcXG4rfCQpJyAvLyAoMSlcbiAgKyAnfGNvbW1lbnRbXlxcXFxuXSooXFxcXG4rfCQpJyAvLyAoMilcbiAgKyAnfDxcXFxcP1tcXFxcc1xcXFxTXSo/KD86XFxcXD8+XFxcXG4qfCQpJyAvLyAoMylcbiAgKyAnfDwhW0EtWl1bXFxcXHNcXFxcU10qPyg/Oj5cXFxcbip8JCknIC8vICg0KVxuICArICd8PCFcXFxcW0NEQVRBXFxcXFtbXFxcXHNcXFxcU10qPyg/OlxcXFxdXFxcXF0+XFxcXG4qfCQpJyAvLyAoNSlcbiAgKyAnfDwvPyh0YWcpKD86ICt8XFxcXG58Lz8+KVtcXFxcc1xcXFxTXSo/KD86KD86XFxcXG4gKikrXFxcXG58JCknIC8vICg2KVxuICArICd8PCg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpKFthLXpdW1xcXFx3LV0qKSg/OmF0dHJpYnV0ZSkqPyAqLz8+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIG9wZW4gdGFnXG4gICsgJ3w8Lyg/IXNjcmlwdHxwcmV8c3R5bGV8dGV4dGFyZWEpW2Etel1bXFxcXHctXSpcXFxccyo+KD89WyBcXFxcdF0qKD86XFxcXG58JCkpW1xcXFxzXFxcXFNdKj8oPzooPzpcXFxcbiAqKStcXFxcbnwkKScgLy8gKDcpIGNsb3NpbmcgdGFnXG4gICsgJyknLFxuICBkZWY6IC9eIHswLDN9XFxbKGxhYmVsKVxcXTogKig/OlxcbiAqKT8oW148XFxzXVteXFxzXSp8PC4qPz4pKD86KD86ICsoPzpcXG4gKik/fCAqXFxuICopKHRpdGxlKSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3BUZXN0LFxuICBsaGVhZGluZzogL14oKD86LnxcXG4oPyFcXG4pKSs/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICAvLyByZWdleCB0ZW1wbGF0ZSwgcGxhY2Vob2xkZXJzIHdpbGwgYmUgcmVwbGFjZWQgYWNjb3JkaW5nIHRvIGRpZmZlcmVudCBwYXJhZ3JhcGhcbiAgLy8gaW50ZXJydXB0aW9uIHJ1bGVzIG9mIGNvbW1vbm1hcmsgYW5kIHRoZSBvcmlnaW5hbCBtYXJrZG93biBzcGVjOlxuICBfcGFyYWdyYXBoOiAvXihbXlxcbl0rKD86XFxuKD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfGZlbmNlc3xsaXN0fGh0bWx8dGFibGV8ICtcXG4pW15cXG5dKykqKS8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5ibG9jay5fbGFiZWwgPSAvKD8hXFxzKlxcXSkoPzpcXFxcLnxbXlxcW1xcXVxcXFxdKSsvO1xuYmxvY2suX3RpdGxlID0gLyg/OlwiKD86XFxcXFwiP3xbXlwiXFxcXF0pKlwifCdbXidcXG5dKig/OlxcblteJ1xcbl0rKSpcXG4/J3xcXChbXigpXSpcXCkpLztcbmJsb2NrLmRlZiA9IGVkaXQoYmxvY2suZGVmKS5yZXBsYWNlKCdsYWJlbCcsIGJsb2NrLl9sYWJlbCkucmVwbGFjZSgndGl0bGUnLCBibG9jay5fdGl0bGUpLmdldFJlZ2V4KCk7XG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkezEsOX1bLildKS87XG5ibG9jay5saXN0SXRlbVN0YXJ0ID0gZWRpdCgvXiggKikoYnVsbCkgKi8pLnJlcGxhY2UoJ2J1bGwnLCBibG9jay5idWxsZXQpLmdldFJlZ2V4KCk7XG5ibG9jay5saXN0ID0gZWRpdChibG9jay5saXN0KS5yZXBsYWNlKC9idWxsL2csIGJsb2NrLmJ1bGxldCkucmVwbGFjZSgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86KD86LSAqKXszLH18KD86XyAqKXszLH18KD86XFxcXCogKil7Myx9KSg/OlxcXFxuK3wkKSknKS5yZXBsYWNlKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpLmdldFJlZ2V4KCk7XG5ibG9jay5fdGFnID0gJ2FkZHJlc3N8YXJ0aWNsZXxhc2lkZXxiYXNlfGJhc2Vmb250fGJsb2NrcXVvdGV8Ym9keXxjYXB0aW9uJyArICd8Y2VudGVyfGNvbHxjb2xncm91cHxkZHxkZXRhaWxzfGRpYWxvZ3xkaXJ8ZGl2fGRsfGR0fGZpZWxkc2V0fGZpZ2NhcHRpb24nICsgJ3xmaWd1cmV8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aFsxLTZdfGhlYWR8aGVhZGVyfGhyfGh0bWx8aWZyYW1lJyArICd8bGVnZW5kfGxpfGxpbmt8bWFpbnxtZW51fG1lbnVpdGVtfG1ldGF8bmF2fG5vZnJhbWVzfG9sfG9wdGdyb3VwfG9wdGlvbicgKyAnfHB8cGFyYW18c2VjdGlvbnxzb3VyY2V8c3VtbWFyeXx0YWJsZXx0Ym9keXx0ZHx0Zm9vdHx0aHx0aGVhZHx0aXRsZXx0cicgKyAnfHRyYWNrfHVsJztcbmJsb2NrLl9jb21tZW50ID0gLzwhLS0oPyEtPz4pW1xcc1xcU10qPyg/Oi0tPnwkKS87XG5ibG9jay5odG1sID0gZWRpdChibG9jay5odG1sLCAnaScpLnJlcGxhY2UoJ2NvbW1lbnQnLCBibG9jay5fY29tbWVudCkucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykucmVwbGFjZSgnYXR0cmlidXRlJywgLyArW2EtekEtWjpfXVtcXHcuOi1dKig/OiAqPSAqXCJbXlwiXFxuXSpcInwgKj0gKidbXidcXG5dKid8ICo9ICpbXlxcc1wiJz08PmBdKyk/LykuZ2V0UmVnZXgoKTtcbmJsb2NrLnBhcmFncmFwaCA9IGVkaXQoYmxvY2suX3BhcmFncmFwaCkucmVwbGFjZSgnaHInLCBibG9jay5ocikucmVwbGFjZSgnaGVhZGluZycsICcgezAsM30jezEsNn0gJykucmVwbGFjZSgnfGxoZWFkaW5nJywgJycpIC8vIHNldGV4IGhlYWRpbmdzIGRvbid0IGludGVycnVwdCBjb21tb25tYXJrIHBhcmFncmFwaHNcbi5yZXBsYWNlKCd8dGFibGUnLCAnJykucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5ibG9ja3F1b3RlID0gZWRpdChibG9jay5ibG9ja3F1b3RlKS5yZXBsYWNlKCdwYXJhZ3JhcGgnLCBibG9jay5wYXJhZ3JhcGgpLmdldFJlZ2V4KCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBfZXh0ZW5kcyh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gX2V4dGVuZHMoe30sIGJsb2NrLm5vcm1hbCwge1xuICB0YWJsZTogJ14gKihbXlxcXFxuIF0uKlxcXFx8LiopXFxcXG4nIC8vIEhlYWRlclxuICArICcgezAsM30oPzpcXFxcfCAqKT8oOj8tKzo/ICooPzpcXFxcfCAqOj8tKzo/ICopKikoPzpcXFxcfCAqKT8nIC8vIEFsaWduXG4gICsgJyg/OlxcXFxuKCg/Oig/ISAqXFxcXG58aHJ8aGVhZGluZ3xibG9ja3F1b3RlfGNvZGV8ZmVuY2VzfGxpc3R8aHRtbCkuKig/OlxcXFxufCQpKSopXFxcXG4qfCQpJyAvLyBDZWxsc1xufSk7XG5cbmJsb2NrLmdmbS50YWJsZSA9IGVkaXQoYmxvY2suZ2ZtLnRhYmxlKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCdibG9ja3F1b3RlJywgJyB7MCwzfT4nKS5yZXBsYWNlKCdjb2RlJywgJyB7NH1bXlxcXFxuXScpLnJlcGxhY2UoJ2ZlbmNlcycsICcgezAsM30oPzpgezMsfSg/PVteYFxcXFxuXSpcXFxcbil8fnszLH0pW15cXFxcbl0qXFxcXG4nKS5yZXBsYWNlKCdsaXN0JywgJyB7MCwzfSg/OlsqKy1dfDFbLildKSAnKSAvLyBvbmx5IGxpc3RzIHN0YXJ0aW5nIGZyb20gMSBjYW4gaW50ZXJydXB0XG4ucmVwbGFjZSgnaHRtbCcsICc8Lz8oPzp0YWcpKD86ICt8XFxcXG58Lz8+KXw8KD86c2NyaXB0fHByZXxzdHlsZXx0ZXh0YXJlYXwhLS0pJykucmVwbGFjZSgndGFnJywgYmxvY2suX3RhZykgLy8gdGFibGVzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG5ibG9jay5nZm0ucGFyYWdyYXBoID0gZWRpdChibG9jay5fcGFyYWdyYXBoKS5yZXBsYWNlKCdocicsIGJsb2NrLmhyKS5yZXBsYWNlKCdoZWFkaW5nJywgJyB7MCwzfSN7MSw2fSAnKS5yZXBsYWNlKCd8bGhlYWRpbmcnLCAnJykgLy8gc2V0ZXggaGVhZGluZ3MgZG9uJ3QgaW50ZXJydXB0IGNvbW1vbm1hcmsgcGFyYWdyYXBoc1xuLnJlcGxhY2UoJ3RhYmxlJywgYmxvY2suZ2ZtLnRhYmxlKSAvLyBpbnRlcnJ1cHQgcGFyYWdyYXBocyB3aXRoIHRhYmxlXG4ucmVwbGFjZSgnYmxvY2txdW90ZScsICcgezAsM30+JykucmVwbGFjZSgnZmVuY2VzJywgJyB7MCwzfSg/OmB7Myx9KD89W15gXFxcXG5dKlxcXFxuKXx+ezMsfSlbXlxcXFxuXSpcXFxcbicpLnJlcGxhY2UoJ2xpc3QnLCAnIHswLDN9KD86WyorLV18MVsuKV0pICcpIC8vIG9ubHkgbGlzdHMgc3RhcnRpbmcgZnJvbSAxIGNhbiBpbnRlcnJ1cHRcbi5yZXBsYWNlKCdodG1sJywgJzwvPyg/OnRhZykoPzogK3xcXFxcbnwvPz4pfDwoPzpzY3JpcHR8cHJlfHN0eWxlfHRleHRhcmVhfCEtLSknKS5yZXBsYWNlKCd0YWcnLCBibG9jay5fdGFnKSAvLyBwYXJzIGNhbiBiZSBpbnRlcnJ1cHRlZCBieSB0eXBlICg2KSBodG1sIGJsb2Nrc1xuLmdldFJlZ2V4KCk7XG4vKipcbiAqIFBlZGFudGljIGdyYW1tYXIgKG9yaWdpbmFsIEpvaG4gR3J1YmVyJ3MgbG9vc2UgbWFya2Rvd24gc3BlY2lmaWNhdGlvbilcbiAqL1xuXG5ibG9jay5wZWRhbnRpYyA9IF9leHRlbmRzKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgaHRtbDogZWRpdCgnXiAqKD86Y29tbWVudCAqKD86XFxcXG58XFxcXHMqJCknICsgJ3w8KHRhZylbXFxcXHNcXFxcU10rPzwvXFxcXDE+ICooPzpcXFxcbnsyLH18XFxcXHMqJCknIC8vIGNsb3NlZCB0YWdcbiAgKyAnfDx0YWcoPzpcIlteXCJdKlwifFxcJ1teXFwnXSpcXCd8XFxcXHNbXlxcJ1wiLz5cXFxcc10qKSo/Lz8+ICooPzpcXFxcbnsyLH18XFxcXHMqJCkpJykucmVwbGFjZSgnY29tbWVudCcsIGJsb2NrLl9jb21tZW50KS5yZXBsYWNlKC90YWcvZywgJyg/ISg/OicgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGV8dmFyfHNhbXB8a2JkfHN1YicgKyAnfHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkb3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZyknICsgJ1xcXFxiKVxcXFx3Kyg/ITp8W15cXFxcd1xcXFxzQF0qQClcXFxcYicpLmdldFJlZ2V4KCksXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICsoW1wiKF1bXlxcbl0rW1wiKV0pKT8gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXigjezEsNn0pKC4qKSg/Olxcbit8JCkvLFxuICBmZW5jZXM6IG5vb3BUZXN0LFxuICAvLyBmZW5jZXMgbm90IHN1cHBvcnRlZFxuICBsaGVhZGluZzogL14oLis/KVxcbiB7MCwzfSg9K3wtKykgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IGVkaXQoYmxvY2subm9ybWFsLl9wYXJhZ3JhcGgpLnJlcGxhY2UoJ2hyJywgYmxvY2suaHIpLnJlcGxhY2UoJ2hlYWRpbmcnLCAnICojezEsNn0gKlteXFxuXScpLnJlcGxhY2UoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpLnJlcGxhY2UoJ2Jsb2NrcXVvdGUnLCAnIHswLDN9PicpLnJlcGxhY2UoJ3xmZW5jZXMnLCAnJykucmVwbGFjZSgnfGxpc3QnLCAnJykucmVwbGFjZSgnfGh0bWwnLCAnJykuZ2V0UmVnZXgoKVxufSk7XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pLyxcbiAgYXV0b2xpbms6IC9ePChzY2hlbWU6W15cXHNcXHgwMC1cXHgxZjw+XSp8ZW1haWwpPi8sXG4gIHVybDogbm9vcFRlc3QsXG4gIHRhZzogJ15jb21tZW50JyArICd8XjwvW2EtekEtWl1bXFxcXHc6LV0qXFxcXHMqPicgLy8gc2VsZi1jbG9zaW5nIHRhZ1xuICArICd8XjxbYS16QS1aXVtcXFxcdy1dKig/OmF0dHJpYnV0ZSkqP1xcXFxzKi8/PicgLy8gb3BlbiB0YWdcbiAgKyAnfF48XFxcXD9bXFxcXHNcXFxcU10qP1xcXFw/PicgLy8gcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiwgZS5nLiA8P3BocCA/PlxuICArICd8XjwhW2EtekEtWl0rXFxcXHNbXFxcXHNcXFxcU10qPz4nIC8vIGRlY2xhcmF0aW9uLCBlLmcuIDwhRE9DVFlQRSBodG1sPlxuICArICd8XjwhXFxcXFtDREFUQVxcXFxbW1xcXFxzXFxcXFNdKj9cXFxcXVxcXFxdPicsXG4gIC8vIENEQVRBIHNlY3Rpb25cbiAgbGluazogL14hP1xcWyhsYWJlbClcXF1cXChcXHMqKGhyZWYpKD86XFxzKyh0aXRsZSkpP1xccypcXCkvLFxuICByZWZsaW5rOiAvXiE/XFxbKGxhYmVsKVxcXVxcWyhyZWYpXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKHJlZilcXF0oPzpcXFtcXF0pPy8sXG4gIHJlZmxpbmtTZWFyY2g6ICdyZWZsaW5rfG5vbGluayg/IVxcXFwoKScsXG4gIGVtU3Ryb25nOiB7XG4gICAgbERlbGltOiAvXig/OlxcKisoPzooW3B1bmN0X10pfFteXFxzKl0pKXxeXysoPzooW3B1bmN0Kl0pfChbXlxcc19dKSkvLFxuICAgIC8vICAgICAgICAoMSkgYW5kICgyKSBjYW4gb25seSBiZSBhIFJpZ2h0IERlbGltaXRlci4gKDMpIGFuZCAoNCkgY2FuIG9ubHkgYmUgTGVmdC4gICg1KSBhbmQgKDYpIGNhbiBiZSBlaXRoZXIgTGVmdCBvciBSaWdodC5cbiAgICAvLyAgICAgICAgICAoKSBTa2lwIG9ycGhhbiBpbnNpZGUgc3Ryb25nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSBDb25zdW1lIHRvIGRlbGltICAgICAoMSkgIyoqKiAgICAgICAgICAgICAgICAoMikgYSoqKiMsIGEqKiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICgzKSAjKioqYSwgKioqYSAgICAgICAgICAgICAgICAgKDQpICoqKiMgICAgICAgICAgICAgICg1KSAjKioqIyAgICAgICAgICAgICAgICAgKDYpIGEqKiphXG4gICAgckRlbGltQXN0OiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcX1xcXyg/OlteXypcXFxcXXxcXFxcLikqP1xcKig/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcX1xcXyl8KD86W14qXFxcXF18XFxcXC4pKyg/PVteKl0pfFtwdW5jdF9dKFxcKispKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcKispKD89W3B1bmN0X1xcc118JCl8W3B1bmN0X1xcc10oXFwqKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXCorKSg/PVtwdW5jdF9dKXxbcHVuY3RfXShcXCorKSg/PVtwdW5jdF9dKXwoPzpbXnB1bmN0Kl9cXHNcXFxcXXxcXFxcLikoXFwqKykoPz1bXnB1bmN0Kl9cXHNdKS8sXG4gICAgckRlbGltVW5kOiAvXig/OlteXypcXFxcXXxcXFxcLikqP1xcKlxcKig/OlteXypcXFxcXXxcXFxcLikqP1xcXyg/OlteXypcXFxcXXxcXFxcLikqPyg/PVxcKlxcKil8KD86W15fXFxcXF18XFxcXC4pKyg/PVteX10pfFtwdW5jdCpdKFxcXyspKD89W1xcc118JCl8KD86W15wdW5jdCpfXFxzXFxcXF18XFxcXC4pKFxcXyspKD89W3B1bmN0Klxcc118JCl8W3B1bmN0Klxcc10oXFxfKykoPz1bXnB1bmN0Kl9cXHNdKXxbXFxzXShcXF8rKSg/PVtwdW5jdCpdKXxbcHVuY3QqXShcXF8rKSg/PVtwdW5jdCpdKS8gLy8gXi0gTm90IGFsbG93ZWQgZm9yIF9cbiAgfSxcblxuICBjb2RlOiAvXihgKykoW15gXXxbXmBdW1xcc1xcU10qP1teYF0pXFwxKD8hYCkvLFxuICBicjogL14oIHsyLH18XFxcXClcXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3BUZXN0LFxuICB0ZXh0OiAvXihgK3xbXmBdKSg/Oig/PSB7Mix9XFxuKXxbXFxzXFxTXSo/KD86KD89W1xcXFw8IVxcW2AqX118XFxiX3wkKXxbXiBdKD89IHsyLH1cXG4pKSkvLFxuICBwdW5jdHVhdGlvbjogL14oW1xcc3B1bmN0dWF0aW9uXSkvXG59O1xuXG4vLyBsaXN0IG9mIHB1bmN0dWF0aW9uIG1hcmtzIGZyb20gQ29tbW9uTWFyayBzcGVjXG4vLyB3aXRob3V0ICogYW5kIF8gdG8gaGFuZGxlIHRoZSBkaWZmZXJlbnQgZW1waGFzaXMgbWFya2VycyAqIGFuZCBfXG5pbmxpbmUuX3B1bmN0dWF0aW9uID0gJyFcIiMkJSZcXCcoKStcXFxcLS4sLzo7PD0+P0BcXFxcW1xcXFxdYF57fH1+JztcbmlubGluZS5wdW5jdHVhdGlvbiA9IGVkaXQoaW5saW5lLnB1bmN0dWF0aW9uKS5yZXBsYWNlKC9wdW5jdHVhdGlvbi9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuXG4vLyBzZXF1ZW5jZXMgZW0gc2hvdWxkIHNraXAgb3ZlciBbdGl0bGVdKGxpbmspLCBgY29kZWAsIDxodG1sPlxuaW5saW5lLmJsb2NrU2tpcCA9IC9cXFtbXlxcXV0qP1xcXVxcKFteXFwpXSo/XFwpfGBbXmBdKj9gfDxbXj5dKj8+L2c7XG4vLyBsb29rYmVoaW5kIGlzIG5vdCBhdmFpbGFibGUgb24gU2FmYXJpIGFzIG9mIHZlcnNpb24gMTZcbi8vIGlubGluZS5lc2NhcGVkRW1TdCA9IC8oPzw9KD86XnxbXlxcXFwpKD86XFxcXFteXSkqKVxcXFxbKl9dL2c7XG5pbmxpbmUuZXNjYXBlZEVtU3QgPSAvKD86XnxbXlxcXFxdKSg/OlxcXFxcXFxcKSpcXFxcWypfXS9nO1xuaW5saW5lLl9jb21tZW50ID0gZWRpdChibG9jay5fY29tbWVudCkucmVwbGFjZSgnKD86LS0+fCQpJywgJy0tPicpLmdldFJlZ2V4KCk7XG5pbmxpbmUuZW1TdHJvbmcubERlbGltID0gZWRpdChpbmxpbmUuZW1TdHJvbmcubERlbGltKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbUFzdCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCA9IGVkaXQoaW5saW5lLmVtU3Ryb25nLnJEZWxpbVVuZCwgJ2cnKS5yZXBsYWNlKC9wdW5jdC9nLCBpbmxpbmUuX3B1bmN0dWF0aW9uKS5nZXRSZWdleCgpO1xuaW5saW5lLl9lc2NhcGVzID0gL1xcXFwoWyFcIiMkJSYnKCkqKyxcXC0uLzo7PD0+P0BcXFtcXF1cXFxcXl9ge3x9fl0pL2c7XG5pbmxpbmUuX3NjaGVtZSA9IC9bYS16QS1aXVthLXpBLVowLTkrLi1dezEsMzF9LztcbmlubGluZS5fZW1haWwgPSAvW2EtekEtWjAtOS4hIyQlJicqKy89P15fYHt8fX4tXSsoQClbYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8oPzpcXC5bYS16QS1aMC05XSg/OlthLXpBLVowLTktXXswLDYxfVthLXpBLVowLTldKT8pKyg/IVstX10pLztcbmlubGluZS5hdXRvbGluayA9IGVkaXQoaW5saW5lLmF1dG9saW5rKS5yZXBsYWNlKCdzY2hlbWUnLCBpbmxpbmUuX3NjaGVtZSkucmVwbGFjZSgnZW1haWwnLCBpbmxpbmUuX2VtYWlsKS5nZXRSZWdleCgpO1xuaW5saW5lLl9hdHRyaWJ1dGUgPSAvXFxzK1thLXpBLVo6X11bXFx3LjotXSooPzpcXHMqPVxccypcIlteXCJdKlwifFxccyo9XFxzKidbXiddKid8XFxzKj1cXHMqW15cXHNcIic9PD5gXSspPy87XG5pbmxpbmUudGFnID0gZWRpdChpbmxpbmUudGFnKS5yZXBsYWNlKCdjb21tZW50JywgaW5saW5lLl9jb21tZW50KS5yZXBsYWNlKCdhdHRyaWJ1dGUnLCBpbmxpbmUuX2F0dHJpYnV0ZSkuZ2V0UmVnZXgoKTtcbmlubGluZS5fbGFiZWwgPSAvKD86XFxbKD86XFxcXC58W15cXFtcXF1cXFxcXSkqXFxdfFxcXFwufGBbXmBdKmB8W15cXFtcXF1cXFxcYF0pKj8vO1xuaW5saW5lLl9ocmVmID0gLzwoPzpcXFxcLnxbXlxcbjw+XFxcXF0pKz58W15cXHNcXHgwMC1cXHgxZl0qLztcbmlubGluZS5fdGl0bGUgPSAvXCIoPzpcXFxcXCI/fFteXCJcXFxcXSkqXCJ8Jyg/OlxcXFwnP3xbXidcXFxcXSkqJ3xcXCgoPzpcXFxcXFwpP3xbXilcXFxcXSkqXFwpLztcbmlubGluZS5saW5rID0gZWRpdChpbmxpbmUubGluaykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5yZXBsYWNlKCdocmVmJywgaW5saW5lLl9ocmVmKS5yZXBsYWNlKCd0aXRsZScsIGlubGluZS5fdGl0bGUpLmdldFJlZ2V4KCk7XG5pbmxpbmUucmVmbGluayA9IGVkaXQoaW5saW5lLnJlZmxpbmspLnJlcGxhY2UoJ2xhYmVsJywgaW5saW5lLl9sYWJlbCkucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLm5vbGluayA9IGVkaXQoaW5saW5lLm5vbGluaykucmVwbGFjZSgncmVmJywgYmxvY2suX2xhYmVsKS5nZXRSZWdleCgpO1xuaW5saW5lLnJlZmxpbmtTZWFyY2ggPSBlZGl0KGlubGluZS5yZWZsaW5rU2VhcmNoLCAnZycpLnJlcGxhY2UoJ3JlZmxpbmsnLCBpbmxpbmUucmVmbGluaykucmVwbGFjZSgnbm9saW5rJywgaW5saW5lLm5vbGluaykuZ2V0UmVnZXgoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gX2V4dGVuZHMoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IHtcbiAgICBzdGFydDogL15fX3xcXCpcXCovLFxuICAgIG1pZGRsZTogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gICAgZW5kQXN0OiAvXFwqXFwqKD8hXFwqKS9nLFxuICAgIGVuZFVuZDogL19fKD8hXykvZ1xuICB9LFxuICBlbToge1xuICAgIHN0YXJ0OiAvXl98XFwqLyxcbiAgICBtaWRkbGU6IC9eKClcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKXxeXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXykvLFxuICAgIGVuZEFzdDogL1xcKig/IVxcKikvZyxcbiAgICBlbmRVbmQ6IC9fKD8hXykvZ1xuICB9LFxuICBsaW5rOiBlZGl0KC9eIT9cXFsobGFiZWwpXFxdXFwoKC4qPylcXCkvKS5yZXBsYWNlKCdsYWJlbCcsIGlubGluZS5fbGFiZWwpLmdldFJlZ2V4KCksXG4gIHJlZmxpbms6IGVkaXQoL14hP1xcWyhsYWJlbClcXF1cXHMqXFxbKFteXFxdXSopXFxdLykucmVwbGFjZSgnbGFiZWwnLCBpbmxpbmUuX2xhYmVsKS5nZXRSZWdleCgpXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gX2V4dGVuZHMoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiBlZGl0KGlubGluZS5lc2NhcGUpLnJlcGxhY2UoJ10pJywgJ358XSknKS5nZXRSZWdleCgpLFxuICBfZXh0ZW5kZWRfZW1haWw6IC9bQS1aYS16MC05Ll8rLV0rKEApW2EtekEtWjAtOS1fXSsoPzpcXC5bYS16QS1aMC05LV9dKlthLXpBLVowLTldKSsoPyFbLV9dKS8sXG4gIHVybDogL14oKD86ZnRwfGh0dHBzPyk6XFwvXFwvfHd3d1xcLikoPzpbYS16QS1aMC05XFwtXStcXC4/KStbXlxcczxdKnxeZW1haWwvLFxuICBfYmFja3BlZGFsOiAvKD86W14/IS4sOjsqXydcIn4oKSZdK3xcXChbXildKlxcKXwmKD8hW2EtekEtWjAtOV0rOyQpfFs/IS4sOjsqXydcIn4pXSsoPyEkKSkrLyxcbiAgZGVsOiAvXih+fj8pKD89W15cXHN+XSkoW1xcc1xcU10qP1teXFxzfl0pXFwxKD89W15+XXwkKS8sXG4gIHRleHQ6IC9eKFtgfl0rfFteYH5dKSg/Oig/PSB7Mix9XFxuKXwoPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApfFtcXHNcXFNdKj8oPzooPz1bXFxcXDwhXFxbYCp+X118XFxiX3xodHRwcz86XFwvXFwvfGZ0cDpcXC9cXC98d3d3XFwufCQpfFteIF0oPz0gezIsfVxcbil8W15hLXpBLVowLTkuISMkJSYnKitcXC89P19ge1xcfH1+LV0oPz1bYS16QS1aMC05LiEjJCUmJyorXFwvPT9fYHtcXHx9fi1dK0ApKSkvXG59KTtcbmlubGluZS5nZm0udXJsID0gZWRpdChpbmxpbmUuZ2ZtLnVybCwgJ2knKS5yZXBsYWNlKCdlbWFpbCcsIGlubGluZS5nZm0uX2V4dGVuZGVkX2VtYWlsKS5nZXRSZWdleCgpO1xuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBfZXh0ZW5kcyh7fSwgaW5saW5lLmdmbSwge1xuICBicjogZWRpdChpbmxpbmUuYnIpLnJlcGxhY2UoJ3syLH0nLCAnKicpLmdldFJlZ2V4KCksXG4gIHRleHQ6IGVkaXQoaW5saW5lLmdmbS50ZXh0KS5yZXBsYWNlKCdcXFxcYl8nLCAnXFxcXGJffCB7Mix9XFxcXG4nKS5yZXBsYWNlKC9cXHsyLFxcfS9nLCAnKicpLmdldFJlZ2V4KClcbn0pO1xuXG4vKipcbiAqIHNtYXJ0eXBhbnRzIHRleHQgcmVwbGFjZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKi9cbmZ1bmN0aW9uIHNtYXJ0eXBhbnRzKHRleHQpIHtcbiAgcmV0dXJuIHRleHRcbiAgLy8gZW0tZGFzaGVzXG4gIC5yZXBsYWNlKC8tLS0vZywgXCJcXHUyMDE0XCIpXG4gIC8vIGVuLWRhc2hlc1xuICAucmVwbGFjZSgvLS0vZywgXCJcXHUyMDEzXCIpXG4gIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgXCIkMVxcdTIwMThcIilcbiAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgLnJlcGxhY2UoLycvZywgXCJcXHUyMDE5XCIpXG4gIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgXCIkMVxcdTIwMUNcIilcbiAgLy8gY2xvc2luZyBkb3VibGVzXG4gIC5yZXBsYWNlKC9cIi9nLCBcIlxcdTIwMURcIilcbiAgLy8gZWxsaXBzZXNcbiAgLnJlcGxhY2UoL1xcLnszfS9nLCBcIlxcdTIwMjZcIik7XG59XG5cbi8qKlxuICogbWFuZ2xlIGVtYWlsIGFkZHJlc3Nlc1xuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqL1xuZnVuY3Rpb24gbWFuZ2xlKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnLFxuICAgIGksXG4gICAgY2g7XG4gIHZhciBsID0gdGV4dC5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG52YXIgTGV4ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gICAgdGhpcy50b2tlbnMgPSBbXTtcbiAgICB0aGlzLnRva2Vucy5saW5rcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICAgIHRoaXMub3B0aW9ucy50b2tlbml6ZXIgPSB0aGlzLm9wdGlvbnMudG9rZW5pemVyIHx8IG5ldyBUb2tlbml6ZXIoKTtcbiAgICB0aGlzLnRva2VuaXplciA9IHRoaXMub3B0aW9ucy50b2tlbml6ZXI7XG4gICAgdGhpcy50b2tlbml6ZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLnRva2VuaXplci5sZXhlciA9IHRoaXM7XG4gICAgdGhpcy5pbmxpbmVRdWV1ZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbkxpbms6IGZhbHNlLFxuICAgICAgaW5SYXdCbG9jazogZmFsc2UsXG4gICAgICB0b3A6IHRydWVcbiAgICB9O1xuICAgIHZhciBydWxlcyA9IHtcbiAgICAgIGJsb2NrOiBibG9jay5ub3JtYWwsXG4gICAgICBpbmxpbmU6IGlubGluZS5ub3JtYWxcbiAgICB9O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICAgIHJ1bGVzLmJsb2NrID0gYmxvY2sucGVkYW50aWM7XG4gICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUucGVkYW50aWM7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgICBydWxlcy5ibG9jayA9IGJsb2NrLmdmbTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICAgIHJ1bGVzLmlubGluZSA9IGlubGluZS5icmVha3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydWxlcy5pbmxpbmUgPSBpbmxpbmUuZ2ZtO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VuaXplci5ydWxlcyA9IHJ1bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBSdWxlc1xuICAgKi9cbiAgLyoqXG4gICAqIFN0YXRpYyBMZXggTWV0aG9kXG4gICAqL1xuICBMZXhlci5sZXggPSBmdW5jdGlvbiBsZXgoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGF0aWMgTGV4IElubGluZSBNZXRob2RcbiAgICovO1xuICBMZXhlci5sZXhJbmxpbmUgPSBmdW5jdGlvbiBsZXhJbmxpbmUoc3JjLCBvcHRpb25zKSB7XG4gICAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICAgIHJldHVybiBsZXhlci5pbmxpbmVUb2tlbnMoc3JjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwcm9jZXNzaW5nXG4gICAqLztcbiAgdmFyIF9wcm90byA9IExleGVyLnByb3RvdHlwZTtcbiAgX3Byb3RvLmxleCA9IGZ1bmN0aW9uIGxleChzcmMpIHtcbiAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJyk7XG4gICAgdGhpcy5ibG9ja1Rva2VucyhzcmMsIHRoaXMudG9rZW5zKTtcbiAgICB2YXIgbmV4dDtcbiAgICB3aGlsZSAobmV4dCA9IHRoaXMuaW5saW5lUXVldWUuc2hpZnQoKSkge1xuICAgICAgdGhpcy5pbmxpbmVUb2tlbnMobmV4dC5zcmMsIG5leHQudG9rZW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIExleGluZ1xuICAgKi87XG4gIF9wcm90by5ibG9ja1Rva2VucyA9IGZ1bmN0aW9uIGJsb2NrVG9rZW5zKHNyYywgdG9rZW5zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXFx0L2csICcgICAgJykucmVwbGFjZSgvXiArJC9nbSwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcmMgPSBzcmMucmVwbGFjZSgvXiggKikoXFx0KykvZ20sIGZ1bmN0aW9uIChfLCBsZWFkaW5nLCB0YWJzKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nICsgJyAgICAnLnJlcGVhdCh0YWJzLmxlbmd0aCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW4sIGN1dFNyYywgbGFzdFBhcmFncmFwaENsaXBwZWQ7XG4gICAgd2hpbGUgKHNyYykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmJsb2NrLnNvbWUoZnVuY3Rpb24gKGV4dFRva2VuaXplcikge1xuICAgICAgICBpZiAodG9rZW4gPSBleHRUb2tlbml6ZXIuY2FsbCh7XG4gICAgICAgICAgbGV4ZXI6IF90aGlzXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBuZXdsaW5lXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5zcGFjZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGlmICh0b2tlbi5yYXcubGVuZ3RoID09PSAxICYmIHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUncyBhIHNpbmdsZSBcXG4gYXMgYSBzcGFjZXIsIGl0J3MgdGVybWluYXRpbmcgdGhlIGxhc3QgbGluZSxcbiAgICAgICAgICAvLyBzbyBtb3ZlIGl0IHRoZXJlIHNvIHRoYXQgd2UgZG9uJ3QgZ2V0IHVuZWNlc3NhcnkgcGFyYWdyYXBoIHRhZ3NcbiAgICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnJhdyArPSAnXFxuJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvZGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmNvZGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyBBbiBpbmRlbnRlZCBjb2RlIGJsb2NrIGNhbm5vdCBpbnRlcnJ1cHQgYSBwYXJhZ3JhcGguXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgKGxhc3RUb2tlbi50eXBlID09PSAncGFyYWdyYXBoJyB8fCBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSkge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGZlbmNlc1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZmVuY2VzKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaGVhZGluZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGhyXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5ocihzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGJsb2NrcXVvdGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmJsb2NrcXVvdGUoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaXN0XG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saXN0KHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gaHRtbFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaHRtbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlZlxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuZGVmKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiAobGFzdFRva2VuLnR5cGUgPT09ICdwYXJhZ3JhcGgnIHx8IGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSAnXFxuJyArIHRva2VuLnJhdztcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlW3RoaXMuaW5saW5lUXVldWUubGVuZ3RoIC0gMV0uc3JjID0gbGFzdFRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudG9rZW5zLmxpbmtzW3Rva2VuLnRhZ10pIHtcbiAgICAgICAgICB0aGlzLnRva2Vucy5saW5rc1t0b2tlbi50YWddID0ge1xuICAgICAgICAgICAgaHJlZjogdG9rZW4uaHJlZixcbiAgICAgICAgICAgIHRpdGxlOiB0b2tlbi50aXRsZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYmxlIChnZm0pXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci50YWJsZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGxoZWFkaW5nXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saGVhZGluZyhzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICAgIC8vIHByZXZlbnQgcGFyYWdyYXBoIGNvbnN1bWluZyBleHRlbnNpb25zIGJ5IGNsaXBwaW5nICdzcmMnIHRvIGV4dGVuc2lvbiBzdGFydFxuICAgICAgY3V0U3JjID0gc3JjO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2spIHtcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IEluZmluaXR5O1xuICAgICAgICAgIHZhciB0ZW1wU3JjID0gc3JjLnNsaWNlKDEpO1xuICAgICAgICAgIHZhciB0ZW1wU3RhcnQgPSB2b2lkIDA7XG4gICAgICAgICAgX3RoaXMub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0QmxvY2suZm9yRWFjaChmdW5jdGlvbiAoZ2V0U3RhcnRJbmRleCkge1xuICAgICAgICAgICAgdGVtcFN0YXJ0ID0gZ2V0U3RhcnRJbmRleC5jYWxsKHtcbiAgICAgICAgICAgICAgbGV4ZXI6IHRoaXNcbiAgICAgICAgICAgIH0sIHRlbXBTcmMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZW1wU3RhcnQgPT09ICdudW1iZXInICYmIHRlbXBTdGFydCA+PSAwKSB7XG4gICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBNYXRoLm1pbihzdGFydEluZGV4LCB0ZW1wU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzdGFydEluZGV4IDwgSW5maW5pdHkgJiYgc3RhcnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjdXRTcmMgPSBzcmMuc3Vic3RyaW5nKDAsIHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGF0ZS50b3AgJiYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIucGFyYWdyYXBoKGN1dFNyYykpKSB7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0UGFyYWdyYXBoQ2xpcHBlZCAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3BhcmFncmFwaCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9ICdcXG4nICsgdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9ICdcXG4nICsgdG9rZW4udGV4dDtcbiAgICAgICAgICB0aGlzLmlubGluZVF1ZXVlLnBvcCgpO1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWVbdGhpcy5pbmxpbmVRdWV1ZS5sZW5ndGggLSAxXS5zcmMgPSBsYXN0VG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFBhcmFncmFwaENsaXBwZWQgPSBjdXRTcmMubGVuZ3RoICE9PSBzcmMubGVuZ3RoO1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdGV4dFxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGV4dChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gJ1xcbicgKyB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gJ1xcbicgKyB0b2tlbi50ZXh0O1xuICAgICAgICAgIHRoaXMuaW5saW5lUXVldWUucG9wKCk7XG4gICAgICAgICAgdGhpcy5pbmxpbmVRdWV1ZVt0aGlzLmlubGluZVF1ZXVlLmxlbmd0aCAtIDFdLnNyYyA9IGxhc3RUb2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgdmFyIGVyck1zZyA9ICdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyck1zZyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGF0ZS50b3AgPSB0cnVlO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9wcm90by5pbmxpbmUgPSBmdW5jdGlvbiBpbmxpbmUoc3JjLCB0b2tlbnMpIHtcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmlubGluZVF1ZXVlLnB1c2goe1xuICAgICAgc3JjOiBzcmMsXG4gICAgICB0b2tlbnM6IHRva2Vuc1xuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogTGV4aW5nL0NvbXBpbGluZ1xuICAgKi87XG4gIF9wcm90by5pbmxpbmVUb2tlbnMgPSBmdW5jdGlvbiBpbmxpbmVUb2tlbnMoc3JjLCB0b2tlbnMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAodG9rZW5zID09PSB2b2lkIDApIHtcbiAgICAgIHRva2VucyA9IFtdO1xuICAgIH1cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbiwgY3V0U3JjO1xuXG4gICAgLy8gU3RyaW5nIHdpdGggbGlua3MgbWFza2VkIHRvIGF2b2lkIGludGVyZmVyZW5jZSB3aXRoIGVtIGFuZCBzdHJvbmdcbiAgICB2YXIgbWFza2VkU3JjID0gc3JjO1xuICAgIHZhciBtYXRjaDtcbiAgICB2YXIga2VlcFByZXZDaGFyLCBwcmV2Q2hhcjtcblxuICAgIC8vIE1hc2sgb3V0IHJlZmxpbmtzXG4gICAgaWYgKHRoaXMudG9rZW5zLmxpbmtzKSB7XG4gICAgICB2YXIgbGlua3MgPSBPYmplY3Qua2V5cyh0aGlzLnRva2Vucy5saW5rcyk7XG4gICAgICBpZiAobGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gdGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2guZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxpbmtzLmluY2x1ZGVzKG1hdGNoWzBdLnNsaWNlKG1hdGNoWzBdLmxhc3RJbmRleE9mKCdbJykgKyAxLCAtMSkpKSB7XG4gICAgICAgICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLnJlZmxpbmtTZWFyY2gubGFzdEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWFzayBvdXQgb3RoZXIgYmxvY2tzXG4gICAgd2hpbGUgKChtYXRjaCA9IHRoaXMudG9rZW5pemVyLnJ1bGVzLmlubGluZS5ibG9ja1NraXAuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXgpICsgJ1snICsgcmVwZWF0U3RyaW5nKCdhJywgbWF0Y2hbMF0ubGVuZ3RoIC0gMikgKyAnXScgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmJsb2NrU2tpcC5sYXN0SW5kZXgpO1xuICAgIH1cblxuICAgIC8vIE1hc2sgb3V0IGVzY2FwZWQgZW0gJiBzdHJvbmcgZGVsaW1pdGVyc1xuICAgIHdoaWxlICgobWF0Y2ggPSB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QuZXhlYyhtYXNrZWRTcmMpKSAhPSBudWxsKSB7XG4gICAgICBtYXNrZWRTcmMgPSBtYXNrZWRTcmMuc2xpY2UoMCwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSAyKSArICcrKycgKyBtYXNrZWRTcmMuc2xpY2UodGhpcy50b2tlbml6ZXIucnVsZXMuaW5saW5lLmVzY2FwZWRFbVN0Lmxhc3RJbmRleCk7XG4gICAgICB0aGlzLnRva2VuaXplci5ydWxlcy5pbmxpbmUuZXNjYXBlZEVtU3QubGFzdEluZGV4LS07XG4gICAgfVxuICAgIHdoaWxlIChzcmMpIHtcbiAgICAgIGlmICgha2VlcFByZXZDaGFyKSB7XG4gICAgICAgIHByZXZDaGFyID0gJyc7XG4gICAgICB9XG4gICAgICBrZWVwUHJldkNoYXIgPSBmYWxzZTtcblxuICAgICAgLy8gZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmlubGluZSAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5pbmxpbmUuc29tZShmdW5jdGlvbiAoZXh0VG9rZW5pemVyKSB7XG4gICAgICAgIGlmICh0b2tlbiA9IGV4dFRva2VuaXplci5jYWxsKHtcbiAgICAgICAgICBsZXhlcjogX3RoaXMyXG4gICAgICAgIH0sIHNyYywgdG9rZW5zKSkge1xuICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVzY2FwZShzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRhZ1xuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIudGFnKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiB0b2tlbi50eXBlID09PSAndGV4dCcgJiYgbGFzdFRva2VuLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlbi5yYXcgKz0gdG9rZW4ucmF3O1xuICAgICAgICAgIGxhc3RUb2tlbi50ZXh0ICs9IHRva2VuLnRleHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBsaW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5saW5rKHNyYykpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5yZWZsaW5rKHNyYywgdGhpcy50b2tlbnMubGlua3MpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbi50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW4ucmF3ICs9IHRva2VuLnJhdztcbiAgICAgICAgICBsYXN0VG9rZW4udGV4dCArPSB0b2tlbi50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gZW0gJiBzdHJvbmdcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmVtU3Ryb25nKHNyYywgbWFza2VkU3JjLCBwcmV2Q2hhcikpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29kZVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuY29kZXNwYW4oc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBiclxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuYnIoc3JjKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWwgKGdmbSlcbiAgICAgIGlmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLmRlbChzcmMpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG9saW5rXG4gICAgICBpZiAodG9rZW4gPSB0aGlzLnRva2VuaXplci5hdXRvbGluayhzcmMsIG1hbmdsZSkpIHtcbiAgICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyh0b2tlbi5yYXcubGVuZ3RoKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXJsIChnZm0pXG4gICAgICBpZiAoIXRoaXMuc3RhdGUuaW5MaW5rICYmICh0b2tlbiA9IHRoaXMudG9rZW5pemVyLnVybChzcmMsIG1hbmdsZSkpKSB7XG4gICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcodG9rZW4ucmF3Lmxlbmd0aCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRcbiAgICAgIC8vIHByZXZlbnQgaW5saW5lVGV4dCBjb25zdW1pbmcgZXh0ZW5zaW9ucyBieSBjbGlwcGluZyAnc3JjJyB0byBleHRlbnNpb24gc3RhcnRcbiAgICAgIGN1dFNyYyA9IHNyYztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBzdGFydEluZGV4ID0gSW5maW5pdHk7XG4gICAgICAgICAgdmFyIHRlbXBTcmMgPSBzcmMuc2xpY2UoMSk7XG4gICAgICAgICAgdmFyIHRlbXBTdGFydCA9IHZvaWQgMDtcbiAgICAgICAgICBfdGhpczIub3B0aW9ucy5leHRlbnNpb25zLnN0YXJ0SW5saW5lLmZvckVhY2goZnVuY3Rpb24gKGdldFN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgIHRlbXBTdGFydCA9IGdldFN0YXJ0SW5kZXguY2FsbCh7XG4gICAgICAgICAgICAgIGxleGVyOiB0aGlzXG4gICAgICAgICAgICB9LCB0ZW1wU3JjKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGVtcFN0YXJ0ID09PSAnbnVtYmVyJyAmJiB0ZW1wU3RhcnQgPj0gMCkge1xuICAgICAgICAgICAgICBzdGFydEluZGV4ID0gTWF0aC5taW4oc3RhcnRJbmRleCwgdGVtcFN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc3RhcnRJbmRleCA8IEluZmluaXR5ICYmIHN0YXJ0SW5kZXggPj0gMCkge1xuICAgICAgICAgICAgY3V0U3JjID0gc3JjLnN1YnN0cmluZygwLCBzdGFydEluZGV4ICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRva2VuID0gdGhpcy50b2tlbml6ZXIuaW5saW5lVGV4dChjdXRTcmMsIHNtYXJ0eXBhbnRzKSkge1xuICAgICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKHRva2VuLnJhdy5sZW5ndGgpO1xuICAgICAgICBpZiAodG9rZW4ucmF3LnNsaWNlKC0xKSAhPT0gJ18nKSB7XG4gICAgICAgICAgLy8gVHJhY2sgcHJldkNoYXIgYmVmb3JlIHN0cmluZyBvZiBfX19fIHN0YXJ0ZWRcbiAgICAgICAgICBwcmV2Q2hhciA9IHRva2VuLnJhdy5zbGljZSgtMSk7XG4gICAgICAgIH1cbiAgICAgICAga2VlcFByZXZDaGFyID0gdHJ1ZTtcbiAgICAgICAgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiBsYXN0VG9rZW4udHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnJhdyArPSB0b2tlbi5yYXc7XG4gICAgICAgICAgbGFzdFRva2VuLnRleHQgKz0gdG9rZW4udGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIHZhciBlcnJNc2cgPSAnSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJNc2cpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhMZXhlciwgbnVsbCwgW3tcbiAgICBrZXk6IFwicnVsZXNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJsb2NrOiBibG9jayxcbiAgICAgICAgaW5saW5lOiBpbmxpbmVcbiAgICAgIH07XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMZXhlcjtcbn0oKTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG52YXIgUmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBleHBvcnRzLmRlZmF1bHRzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBSZW5kZXJlci5wcm90b3R5cGU7XG4gIF9wcm90by5jb2RlID0gZnVuY3Rpb24gY29kZShfY29kZSwgaW5mb3N0cmluZywgZXNjYXBlZCkge1xuICAgIHZhciBsYW5nID0gKGluZm9zdHJpbmcgfHwgJycpLm1hdGNoKC9cXFMqLylbMF07XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KF9jb2RlLCBsYW5nKTtcbiAgICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IF9jb2RlKSB7XG4gICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICBfY29kZSA9IG91dDtcbiAgICAgIH1cbiAgICB9XG4gICAgX2NvZGUgPSBfY29kZS5yZXBsYWNlKC9cXG4kLywgJycpICsgJ1xcbic7XG4gICAgaWYgKCFsYW5nKSB7XG4gICAgICByZXR1cm4gJzxwcmU+PGNvZGU+JyArIChlc2NhcGVkID8gX2NvZGUgOiBlc2NhcGUoX2NvZGUsIHRydWUpKSArICc8L2NvZGU+PC9wcmU+XFxuJztcbiAgICB9XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJyArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4ICsgZXNjYXBlKGxhbmcpICsgJ1wiPicgKyAoZXNjYXBlZCA/IF9jb2RlIDogZXNjYXBlKF9jb2RlLCB0cnVlKSkgKyAnPC9jb2RlPjwvcHJlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHF1b3RlXG4gICAqLztcbiAgX3Byb3RvLmJsb2NrcXVvdGUgPSBmdW5jdGlvbiBibG9ja3F1b3RlKHF1b3RlKSB7XG4gICAgcmV0dXJuIFwiPGJsb2NrcXVvdGU+XFxuXCIgKyBxdW90ZSArIFwiPC9ibG9ja3F1b3RlPlxcblwiO1xuICB9O1xuICBfcHJvdG8uaHRtbCA9IGZ1bmN0aW9uIGh0bWwoX2h0bWwpIHtcbiAgICByZXR1cm4gX2h0bWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxldmVsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByYXdcbiAgICogQHBhcmFtIHthbnl9IHNsdWdnZXJcbiAgICovO1xuICBfcHJvdG8uaGVhZGluZyA9IGZ1bmN0aW9uIGhlYWRpbmcodGV4dCwgbGV2ZWwsIHJhdywgc2x1Z2dlcikge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVySWRzKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4ICsgc2x1Z2dlci5zbHVnKHJhdyk7XG4gICAgICByZXR1cm4gXCI8aFwiICsgbGV2ZWwgKyBcIiBpZD1cXFwiXCIgKyBpZCArIFwiXFxcIj5cIiArIHRleHQgKyBcIjwvaFwiICsgbGV2ZWwgKyBcIj5cXG5cIjtcbiAgICB9XG5cbiAgICAvLyBpZ25vcmUgSURzXG4gICAgcmV0dXJuIFwiPGhcIiArIGxldmVsICsgXCI+XCIgKyB0ZXh0ICsgXCI8L2hcIiArIGxldmVsICsgXCI+XFxuXCI7XG4gIH07XG4gIF9wcm90by5ociA9IGZ1bmN0aW9uIGhyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xuICB9O1xuICBfcHJvdG8ubGlzdCA9IGZ1bmN0aW9uIGxpc3QoYm9keSwgb3JkZXJlZCwgc3RhcnQpIHtcbiAgICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJyxcbiAgICAgIHN0YXJ0YXR0ID0gb3JkZXJlZCAmJiBzdGFydCAhPT0gMSA/ICcgc3RhcnQ9XCInICsgc3RhcnQgKyAnXCInIDogJyc7XG4gICAgcmV0dXJuICc8JyArIHR5cGUgKyBzdGFydGF0dCArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5saXN0aXRlbSA9IGZ1bmN0aW9uIGxpc3RpdGVtKHRleHQpIHtcbiAgICByZXR1cm4gXCI8bGk+XCIgKyB0ZXh0ICsgXCI8L2xpPlxcblwiO1xuICB9O1xuICBfcHJvdG8uY2hlY2tib3ggPSBmdW5jdGlvbiBjaGVja2JveChjaGVja2VkKSB7XG4gICAgcmV0dXJuICc8aW5wdXQgJyArIChjaGVja2VkID8gJ2NoZWNrZWQ9XCJcIiAnIDogJycpICsgJ2Rpc2FibGVkPVwiXCIgdHlwZT1cImNoZWNrYm94XCInICsgKHRoaXMub3B0aW9ucy54aHRtbCA/ICcgLycgOiAnJykgKyAnPiAnO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLnBhcmFncmFwaCA9IGZ1bmN0aW9uIHBhcmFncmFwaCh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPHA+XCIgKyB0ZXh0ICsgXCI8L3A+XFxuXCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYm9keVxuICAgKi87XG4gIF9wcm90by50YWJsZSA9IGZ1bmN0aW9uIHRhYmxlKGhlYWRlciwgYm9keSkge1xuICAgIGlmIChib2R5KSBib2R5ID0gXCI8dGJvZHk+XCIgKyBib2R5ICsgXCI8L3Rib2R5PlwiO1xuICAgIHJldHVybiAnPHRhYmxlPlxcbicgKyAnPHRoZWFkPlxcbicgKyBoZWFkZXIgKyAnPC90aGVhZD5cXG4nICsgYm9keSArICc8L3RhYmxlPlxcbic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcbiAgICovO1xuICBfcHJvdG8udGFibGVyb3cgPSBmdW5jdGlvbiB0YWJsZXJvdyhjb250ZW50KSB7XG4gICAgcmV0dXJuIFwiPHRyPlxcblwiICsgY29udGVudCArIFwiPC90cj5cXG5cIjtcbiAgfTtcbiAgX3Byb3RvLnRhYmxlY2VsbCA9IGZ1bmN0aW9uIHRhYmxlY2VsbChjb250ZW50LCBmbGFncykge1xuICAgIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gICAgdmFyIHRhZyA9IGZsYWdzLmFsaWduID8gXCI8XCIgKyB0eXBlICsgXCIgYWxpZ249XFxcIlwiICsgZmxhZ3MuYWxpZ24gKyBcIlxcXCI+XCIgOiBcIjxcIiArIHR5cGUgKyBcIj5cIjtcbiAgICByZXR1cm4gdGFnICsgY29udGVudCArIChcIjwvXCIgKyB0eXBlICsgXCI+XFxuXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNwYW4gbGV2ZWwgcmVuZGVyZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uc3Ryb25nID0gZnVuY3Rpb24gc3Ryb25nKHRleHQpIHtcbiAgICByZXR1cm4gXCI8c3Ryb25nPlwiICsgdGV4dCArIFwiPC9zdHJvbmc+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIFwiPGVtPlwiICsgdGV4dCArIFwiPC9lbT5cIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gXCI8Y29kZT5cIiArIHRleHQgKyBcIjwvY29kZT5cIjtcbiAgfTtcbiAgX3Byb3RvLmJyID0gZnVuY3Rpb24gYnIoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICovO1xuICBfcHJvdG8uZGVsID0gZnVuY3Rpb24gZGVsKHRleHQpIHtcbiAgICByZXR1cm4gXCI8ZGVsPlwiICsgdGV4dCArIFwiPC9kZWw+XCI7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhyZWZcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAqLztcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICAgIH1cbiAgICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBocmVmXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgKi87XG4gIF9wcm90by5pbWFnZSA9IGZ1bmN0aW9uIGltYWdlKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgaHJlZiA9IGNsZWFuVXJsKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSwgdGhpcy5vcHRpb25zLmJhc2VVcmwsIGhyZWYpO1xuICAgIGlmIChocmVmID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgdmFyIG91dCA9IFwiPGltZyBzcmM9XFxcIlwiICsgaHJlZiArIFwiXFxcIiBhbHQ9XFxcIlwiICsgdGV4dCArIFwiXFxcIlwiO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgb3V0ICs9IFwiIHRpdGxlPVxcXCJcIiArIHRpdGxlICsgXCJcXFwiXCI7XG4gICAgfVxuICAgIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgcmV0dXJuIFJlbmRlcmVyO1xufSgpO1xuXG4vKipcbiAqIFRleHRSZW5kZXJlclxuICogcmV0dXJucyBvbmx5IHRoZSB0ZXh0dWFsIHBhcnQgb2YgdGhlIHRva2VuXG4gKi9cbnZhciBUZXh0UmVuZGVyZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUZXh0UmVuZGVyZXIoKSB7fVxuICB2YXIgX3Byb3RvID0gVGV4dFJlbmRlcmVyLnByb3RvdHlwZTtcbiAgLy8gbm8gbmVlZCBmb3IgYmxvY2sgbGV2ZWwgcmVuZGVyZXJzXG4gIF9wcm90by5zdHJvbmcgPSBmdW5jdGlvbiBzdHJvbmcodGV4dCkge1xuICAgIHJldHVybiB0ZXh0O1xuICB9O1xuICBfcHJvdG8uZW0gPSBmdW5jdGlvbiBlbSh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5jb2Rlc3BhbiA9IGZ1bmN0aW9uIGNvZGVzcGFuKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmRlbCA9IGZ1bmN0aW9uIGRlbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by5odG1sID0gZnVuY3Rpb24gaHRtbCh0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHQ7XG4gIH07XG4gIF9wcm90by50ZXh0ID0gZnVuY3Rpb24gdGV4dChfdGV4dCkge1xuICAgIHJldHVybiBfdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmxpbmsgPSBmdW5jdGlvbiBsaW5rKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gICAgcmV0dXJuICcnICsgdGV4dDtcbiAgfTtcbiAgX3Byb3RvLmltYWdlID0gZnVuY3Rpb24gaW1hZ2UoaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgICByZXR1cm4gJycgKyB0ZXh0O1xuICB9O1xuICBfcHJvdG8uYnIgPSBmdW5jdGlvbiBicigpIHtcbiAgICByZXR1cm4gJyc7XG4gIH07XG4gIHJldHVybiBUZXh0UmVuZGVyZXI7XG59KCk7XG5cbi8qKlxuICogU2x1Z2dlciBnZW5lcmF0ZXMgaGVhZGVyIGlkXG4gKi9cbnZhciBTbHVnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2x1Z2dlcigpIHtcbiAgICB0aGlzLnNlZW4gPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICovXG4gIHZhciBfcHJvdG8gPSBTbHVnZ2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKVxuICAgIC8vIHJlbW92ZSBodG1sIHRhZ3NcbiAgICAucmVwbGFjZSgvPFshXFwvYS16XS4qPz4vaWcsICcnKVxuICAgIC8vIHJlbW92ZSB1bndhbnRlZCBjaGFyc1xuICAgIC5yZXBsYWNlKC9bXFx1MjAwMC1cXHUyMDZGXFx1MkUwMC1cXHUyRTdGXFxcXCchXCIjJCUmKCkqKywuLzo7PD0+P0BbXFxdXmB7fH1+XS9nLCAnJykucmVwbGFjZSgvXFxzL2csICctJyk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIG5leHQgc2FmZSAodW5pcXVlKSBzbHVnIHRvIHVzZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3JpZ2luYWxTbHVnXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEcnlSdW5cbiAgICovO1xuICBfcHJvdG8uZ2V0TmV4dFNhZmVTbHVnID0gZnVuY3Rpb24gZ2V0TmV4dFNhZmVTbHVnKG9yaWdpbmFsU2x1ZywgaXNEcnlSdW4pIHtcbiAgICB2YXIgc2x1ZyA9IG9yaWdpbmFsU2x1ZztcbiAgICB2YXIgb2NjdXJlbmNlQWNjdW11bGF0b3IgPSAwO1xuICAgIGlmICh0aGlzLnNlZW4uaGFzT3duUHJvcGVydHkoc2x1ZykpIHtcbiAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yID0gdGhpcy5zZWVuW29yaWdpbmFsU2x1Z107XG4gICAgICBkbyB7XG4gICAgICAgIG9jY3VyZW5jZUFjY3VtdWxhdG9yKys7XG4gICAgICAgIHNsdWcgPSBvcmlnaW5hbFNsdWcgKyAnLScgKyBvY2N1cmVuY2VBY2N1bXVsYXRvcjtcbiAgICAgIH0gd2hpbGUgKHRoaXMuc2Vlbi5oYXNPd25Qcm9wZXJ0eShzbHVnKSk7XG4gICAgfVxuICAgIGlmICghaXNEcnlSdW4pIHtcbiAgICAgIHRoaXMuc2VlbltvcmlnaW5hbFNsdWddID0gb2NjdXJlbmNlQWNjdW11bGF0b3I7XG4gICAgICB0aGlzLnNlZW5bc2x1Z10gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gc2x1ZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHN0cmluZyB0byB1bmlxdWUgaWRcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRyeXJ1bl0gR2VuZXJhdGVzIHRoZSBuZXh0IHVuaXF1ZSBzbHVnIHdpdGhvdXRcbiAgICogdXBkYXRpbmcgdGhlIGludGVybmFsIGFjY3VtdWxhdG9yLlxuICAgKi87XG4gIF9wcm90by5zbHVnID0gZnVuY3Rpb24gc2x1Zyh2YWx1ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdmFyIHNsdWcgPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFNhZmVTbHVnKHNsdWcsIG9wdGlvbnMuZHJ5cnVuKTtcbiAgfTtcbiAgcmV0dXJuIFNsdWdnZXI7XG59KCk7XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG52YXIgUGFyc2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcigpO1xuICAgIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gICAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHRoaXMudGV4dFJlbmRlcmVyID0gbmV3IFRleHRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2x1Z2dlciA9IG5ldyBTbHVnZ2VyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICAgKi9cbiAgUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXRpYyBQYXJzZSBJbmxpbmUgTWV0aG9kXG4gICAqLztcbiAgUGFyc2VyLnBhcnNlSW5saW5lID0gZnVuY3Rpb24gcGFyc2VJbmxpbmUodG9rZW5zLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZUlubGluZSh0b2tlbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIExvb3BcbiAgICovO1xuICB2YXIgX3Byb3RvID0gUGFyc2VyLnByb3RvdHlwZTtcbiAgX3Byb3RvLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodG9rZW5zLCB0b3ApIHtcbiAgICBpZiAodG9wID09PSB2b2lkIDApIHtcbiAgICAgIHRvcCA9IHRydWU7XG4gICAgfVxuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICBqLFxuICAgICAgayxcbiAgICAgIGwyLFxuICAgICAgbDMsXG4gICAgICByb3csXG4gICAgICBjZWxsLFxuICAgICAgaGVhZGVyLFxuICAgICAgYm9keSxcbiAgICAgIHRva2VuLFxuICAgICAgb3JkZXJlZCxcbiAgICAgIHN0YXJ0LFxuICAgICAgbG9vc2UsXG4gICAgICBpdGVtQm9keSxcbiAgICAgIGl0ZW0sXG4gICAgICBjaGVja2VkLFxuICAgICAgdGFzayxcbiAgICAgIGNoZWNrYm94LFxuICAgICAgcmV0O1xuICAgIHZhciBsID0gdG9rZW5zLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgLy8gUnVuIGFueSByZW5kZXJlciBleHRlbnNpb25zXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgJiYgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVyc1t0b2tlbi50eXBlXSkge1xuICAgICAgICByZXQgPSB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0uY2FsbCh7XG4gICAgICAgICAgcGFyc2VyOiB0aGlzXG4gICAgICAgIH0sIHRva2VuKTtcbiAgICAgICAgaWYgKHJldCAhPT0gZmFsc2UgfHwgIVsnc3BhY2UnLCAnaHInLCAnaGVhZGluZycsICdjb2RlJywgJ3RhYmxlJywgJ2Jsb2NrcXVvdGUnLCAnbGlzdCcsICdodG1sJywgJ3BhcmFncmFwaCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2hlYWRpbmcnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmhlYWRpbmcodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMpLCB0b2tlbi5kZXB0aCwgdW5lc2NhcGUodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHRoaXMudGV4dFJlbmRlcmVyKSksIHRoaXMuc2x1Z2dlcik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGUodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgdG9rZW4uZXNjYXBlZCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBoZWFkZXIgPSAnJztcblxuICAgICAgICAgICAgLy8gaGVhZGVyXG4gICAgICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLmhlYWRlci5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbDI7IGorKykge1xuICAgICAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKHRoaXMucGFyc2VJbmxpbmUodG9rZW4uaGVhZGVyW2pdLnRva2VucyksIHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2pdXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICAgICAgICBib2R5ID0gJyc7XG4gICAgICAgICAgICBsMiA9IHRva2VuLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGwyOyBqKyspIHtcbiAgICAgICAgICAgICAgcm93ID0gdG9rZW4ucm93c1tqXTtcbiAgICAgICAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICAgICAgICBsMyA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBsMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbCh0aGlzLnBhcnNlSW5saW5lKHJvd1trXS50b2tlbnMpLCB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgYWxpZ246IHRva2VuLmFsaWduW2tdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYmxvY2txdW90ZSc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgYm9keSA9IHRoaXMucGFyc2UodG9rZW4udG9rZW5zKTtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9yZGVyZWQgPSB0b2tlbi5vcmRlcmVkO1xuICAgICAgICAgICAgc3RhcnQgPSB0b2tlbi5zdGFydDtcbiAgICAgICAgICAgIGxvb3NlID0gdG9rZW4ubG9vc2U7XG4gICAgICAgICAgICBsMiA9IHRva2VuLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGJvZHkgPSAnJztcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsMjsgaisrKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSB0b2tlbi5pdGVtc1tqXTtcbiAgICAgICAgICAgICAgY2hlY2tlZCA9IGl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgdGFzayA9IGl0ZW0udGFzaztcbiAgICAgICAgICAgICAgaXRlbUJvZHkgPSAnJztcbiAgICAgICAgICAgICAgaWYgKGl0ZW0udGFzaykge1xuICAgICAgICAgICAgICAgIGNoZWNrYm94ID0gdGhpcy5yZW5kZXJlci5jaGVja2JveChjaGVja2VkKTtcbiAgICAgICAgICAgICAgICBpZiAobG9vc2UpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vucy5sZW5ndGggPiAwICYmIGl0ZW0udG9rZW5zWzBdLnR5cGUgPT09ICdwYXJhZ3JhcGgnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRleHQgPSBjaGVja2JveCArICcgJyArIGl0ZW0udG9rZW5zWzBdLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRva2Vuc1swXS50b2tlbnMgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zLmxlbmd0aCA+IDAgJiYgaXRlbS50b2tlbnNbMF0udG9rZW5zWzBdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udG9rZW5zWzBdLnRva2Vuc1swXS50ZXh0ID0gY2hlY2tib3ggKyAnICcgKyBpdGVtLnRva2Vuc1swXS50b2tlbnNbMF0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50b2tlbnMudW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNoZWNrYm94XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpdGVtQm9keSArPSBjaGVja2JveDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaXRlbUJvZHkgKz0gdGhpcy5wYXJzZShpdGVtLnRva2VucywgbG9vc2UpO1xuICAgICAgICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oaXRlbUJvZHksIHRhc2ssIGNoZWNrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkLCBzdGFydCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIFRPRE8gcGFyc2UgaW5saW5lIGNvbnRlbnQgaWYgcGFyYW1ldGVyIG1hcmtkb3duPTFcbiAgICAgICAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJvZHkgPSB0b2tlbi50b2tlbnMgPyB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucykgOiB0b2tlbi50ZXh0O1xuICAgICAgICAgICAgd2hpbGUgKGkgKyAxIDwgbCAmJiB0b2tlbnNbaSArIDFdLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgICBib2R5ICs9ICdcXG4nICsgKHRva2VuLnRva2VucyA/IHRoaXMucGFyc2VJbmxpbmUodG9rZW4udG9rZW5zKSA6IHRva2VuLnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IHRvcCA/IHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKGJvZHkpIDogYm9keTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZXJyTXNnID0gJ1Rva2VuIHdpdGggXCInICsgdG9rZW4udHlwZSArICdcIiB0eXBlIHdhcyBub3QgZm91bmQuJztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVyck1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIElubGluZSBUb2tlbnNcbiAgICovO1xuICBfcHJvdG8ucGFyc2VJbmxpbmUgPSBmdW5jdGlvbiBwYXJzZUlubGluZSh0b2tlbnMsIHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIgPSByZW5kZXJlciB8fCB0aGlzLnJlbmRlcmVyO1xuICAgIHZhciBvdXQgPSAnJyxcbiAgICAgIGksXG4gICAgICB0b2tlbixcbiAgICAgIHJldDtcbiAgICB2YXIgbCA9IHRva2Vucy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIC8vIFJ1biBhbnkgcmVuZGVyZXIgZXh0ZW5zaW9uc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5leHRlbnNpb25zICYmIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnJlbmRlcmVycyAmJiB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5yZW5kZXJlcnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgcmV0ID0gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMucmVuZGVyZXJzW3Rva2VuLnR5cGVdLmNhbGwoe1xuICAgICAgICAgIHBhcnNlcjogdGhpc1xuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIGlmIChyZXQgIT09IGZhbHNlIHx8ICFbJ2VzY2FwZScsICdodG1sJywgJ2xpbmsnLCAnaW1hZ2UnLCAnc3Ryb25nJywgJ2VtJywgJ2NvZGVzcGFuJywgJ2JyJywgJ2RlbCcsICd0ZXh0J10uaW5jbHVkZXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICBvdXQgKz0gcmV0IHx8ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZXNjYXBlJzpcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvdXQgKz0gcmVuZGVyZXIudGV4dCh0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLmh0bWwodG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2xpbmsnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5saW5rKHRva2VuLmhyZWYsIHRva2VuLnRpdGxlLCB0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5pbWFnZSh0b2tlbi5ocmVmLCB0b2tlbi50aXRsZSwgdG9rZW4udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N0cm9uZyc6XG4gICAgICAgICAge1xuICAgICAgICAgICAgb3V0ICs9IHJlbmRlcmVyLnN0cm9uZyh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnZW0nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5lbSh0aGlzLnBhcnNlSW5saW5lKHRva2VuLnRva2VucywgcmVuZGVyZXIpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29kZXNwYW4nOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5jb2Rlc3Bhbih0b2tlbi50ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnYnInOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5icigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdkZWwnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci5kZWwodGhpcy5wYXJzZUlubGluZSh0b2tlbi50b2tlbnMsIHJlbmRlcmVyKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG91dCArPSByZW5kZXJlci50ZXh0KHRva2VuLnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciBlcnJNc2cgPSAnVG9rZW4gd2l0aCBcIicgKyB0b2tlbi50eXBlICsgJ1wiIHR5cGUgd2FzIG5vdCBmb3VuZC4nO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyTXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIHJldHVybiBQYXJzZXI7XG59KCk7XG5cbnZhciBIb29rcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEhvb2tzKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdHM7XG4gIH1cbiAgdmFyIF9wcm90byA9IEhvb2tzLnByb3RvdHlwZTtcbiAgLyoqXG4gICAqIFByb2Nlc3MgbWFya2Rvd24gYmVmb3JlIG1hcmtlZFxuICAgKi9cbiAgX3Byb3RvLnByZXByb2Nlc3MgPSBmdW5jdGlvbiBwcmVwcm9jZXNzKG1hcmtkb3duKSB7XG4gICAgcmV0dXJuIG1hcmtkb3duO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgSFRNTCBhZnRlciBtYXJrZWQgaXMgZmluaXNoZWRcbiAgICovO1xuICBfcHJvdG8ucG9zdHByb2Nlc3MgPSBmdW5jdGlvbiBwb3N0cHJvY2VzcyhodG1sKSB7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG4gIHJldHVybiBIb29rcztcbn0oKTtcbkhvb2tzLnBhc3NUaHJvdWdoSG9va3MgPSBuZXcgU2V0KFsncHJlcHJvY2VzcycsICdwb3N0cHJvY2VzcyddKTtcblxuZnVuY3Rpb24gb25FcnJvcihzaWxlbnQsIGFzeW5jLCBjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWFya2VkanMvbWFya2VkLic7XG4gICAgaWYgKHNpbGVudCkge1xuICAgICAgdmFyIG1zZyA9ICc8cD5BbiBlcnJvciBvY2N1cnJlZDo8L3A+PHByZT4nICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKSArICc8L3ByZT4nO1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobXNnKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhudWxsLCBtc2cpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gbXNnO1xuICAgIH1cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlTWFya2Rvd24obGV4ZXIsIHBhcnNlcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuICAgIHZhciBvcmlnT3B0ID0gX2V4dGVuZHMoe30sIG9wdCk7XG4gICAgb3B0ID0gX2V4dGVuZHMoe30sIG1hcmtlZC5kZWZhdWx0cywgb3JpZ09wdCk7XG4gICAgdmFyIHRocm93RXJyb3IgPSBvbkVycm9yKG9wdC5zaWxlbnQsIG9wdC5hc3luYywgY2FsbGJhY2spO1xuXG4gICAgLy8gdGhyb3cgZXJyb3IgaW4gY2FzZSBvZiBub24gc3RyaW5nIGlucHV0XG4gICAgaWYgKHR5cGVvZiBzcmMgPT09ICd1bmRlZmluZWQnIHx8IHNyYyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdtYXJrZWQoKTogaW5wdXQgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZCBvciBudWxsJykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNyYyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignbWFya2VkKCk6IGlucHV0IHBhcmFtZXRlciBpcyBvZiB0eXBlICcgKyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3JjKSArICcsIHN0cmluZyBleHBlY3RlZCcpKTtcbiAgICB9XG4gICAgY2hlY2tTYW5pdGl6ZURlcHJlY2F0aW9uKG9wdCk7XG4gICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgb3B0Lmhvb2tzLm9wdGlvbnMgPSBvcHQ7XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHQ7XG4gICAgICB2YXIgdG9rZW5zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9wdC5ob29rcykge1xuICAgICAgICAgIHNyYyA9IG9wdC5ob29rcy5wcmVwcm9jZXNzKHNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgIH1cbiAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gZG9uZShlcnIpIHtcbiAgICAgICAgdmFyIG91dDtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKHRva2Vucywgb3B0LndhbGtUb2tlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ID0gcGFyc2VyKHRva2Vucywgb3B0KTtcbiAgICAgICAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgICAgICAgb3V0ID0gb3B0Lmhvb2tzLnBvc3Rwcm9jZXNzKG91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyID0gZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICAgICAgcmV0dXJuIGVyciA/IHRocm93RXJyb3IoZXJyKSA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgICB9O1xuICAgICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuICAgICAgaWYgKCF0b2tlbnMubGVuZ3RoKSByZXR1cm4gZG9uZSgpO1xuICAgICAgdmFyIHBlbmRpbmcgPSAwO1xuICAgICAgbWFya2VkLndhbGtUb2tlbnModG9rZW5zLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09ICdjb2RlJykge1xuICAgICAgICAgIHBlbmRpbmcrKztcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbiAoZXJyLCBjb2RlKSB7XG4gICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChjb2RlICE9IG51bGwgJiYgY29kZSAhPT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBlbmRpbmctLTtcbiAgICAgICAgICAgICAgaWYgKHBlbmRpbmcgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChwZW5kaW5nID09PSAwKSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdC5hc3luYykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShvcHQuaG9va3MgPyBvcHQuaG9va3MucHJlcHJvY2VzcyhzcmMpIDogc3JjKS50aGVuKGZ1bmN0aW9uIChzcmMpIHtcbiAgICAgICAgcmV0dXJuIGxleGVyKHNyYywgb3B0KTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICByZXR1cm4gb3B0LndhbGtUb2tlbnMgPyBQcm9taXNlLmFsbChtYXJrZWQud2Fsa1Rva2Vucyh0b2tlbnMsIG9wdC53YWxrVG9rZW5zKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfSkgOiB0b2tlbnM7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlcih0b2tlbnMsIG9wdCk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgIHJldHVybiBvcHQuaG9va3MgPyBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCkgOiBodG1sO1xuICAgICAgfSlbXCJjYXRjaFwiXSh0aHJvd0Vycm9yKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGlmIChvcHQuaG9va3MpIHtcbiAgICAgICAgc3JjID0gb3B0Lmhvb2tzLnByZXByb2Nlc3Moc3JjKTtcbiAgICAgIH1cbiAgICAgIHZhciBfdG9rZW5zID0gbGV4ZXIoc3JjLCBvcHQpO1xuICAgICAgaWYgKG9wdC53YWxrVG9rZW5zKSB7XG4gICAgICAgIG1hcmtlZC53YWxrVG9rZW5zKF90b2tlbnMsIG9wdC53YWxrVG9rZW5zKTtcbiAgICAgIH1cbiAgICAgIHZhciBodG1sID0gcGFyc2VyKF90b2tlbnMsIG9wdCk7XG4gICAgICBpZiAob3B0Lmhvb2tzKSB7XG4gICAgICAgIGh0bWwgPSBvcHQuaG9va3MucG9zdHByb2Nlc3MoaHRtbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogTWFya2VkXG4gKi9cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHBhcnNlTWFya2Rvd24oTGV4ZXIubGV4LCBQYXJzZXIucGFyc2UpKHNyYywgb3B0LCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID0gbWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0KSB7XG4gIG1hcmtlZC5kZWZhdWx0cyA9IF9leHRlbmRzKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIGNoYW5nZURlZmF1bHRzKG1hcmtlZC5kZWZhdWx0cyk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xubWFya2VkLmdldERlZmF1bHRzID0gZ2V0RGVmYXVsdHM7XG5tYXJrZWQuZGVmYXVsdHMgPSBleHBvcnRzLmRlZmF1bHRzO1xuXG4vKipcbiAqIFVzZSBFeHRlbnNpb25cbiAqL1xuXG5tYXJrZWQudXNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZXh0ZW5zaW9ucyA9IG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zIHx8IHtcbiAgICByZW5kZXJlcnM6IHt9LFxuICAgIGNoaWxkVG9rZW5zOiB7fVxuICB9O1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAocGFjaykge1xuICAgIC8vIGNvcHkgb3B0aW9ucyB0byBuZXcgb2JqZWN0XG4gICAgdmFyIG9wdHMgPSBfZXh0ZW5kcyh7fSwgcGFjayk7XG5cbiAgICAvLyBzZXQgYXN5bmMgdG8gdHJ1ZSBpZiBpdCB3YXMgc2V0IHRvIHRydWUgYmVmb3JlXG4gICAgb3B0cy5hc3luYyA9IG1hcmtlZC5kZWZhdWx0cy5hc3luYyB8fCBvcHRzLmFzeW5jIHx8IGZhbHNlO1xuXG4gICAgLy8gPT0tLSBQYXJzZSBcImFkZG9uXCIgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2suZXh0ZW5zaW9ucykge1xuICAgICAgcGFjay5leHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dCkge1xuICAgICAgICBpZiAoIWV4dC5uYW1lKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHRlbnNpb24gbmFtZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHQucmVuZGVyZXIpIHtcbiAgICAgICAgICAvLyBSZW5kZXJlciBleHRlbnNpb25zXG4gICAgICAgICAgdmFyIHByZXZSZW5kZXJlciA9IGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXTtcbiAgICAgICAgICBpZiAocHJldlJlbmRlcmVyKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIGV4dGVuc2lvbiB3aXRoIGZ1bmMgdG8gcnVuIG5ldyBleHRlbnNpb24gYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgICAgZXh0ZW5zaW9ucy5yZW5kZXJlcnNbZXh0Lm5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IGV4dC5yZW5kZXJlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2UmVuZGVyZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucmVuZGVyZXJzW2V4dC5uYW1lXSA9IGV4dC5yZW5kZXJlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dC50b2tlbml6ZXIpIHtcbiAgICAgICAgICAvLyBUb2tlbml6ZXIgRXh0ZW5zaW9uc1xuICAgICAgICAgIGlmICghZXh0LmxldmVsIHx8IGV4dC5sZXZlbCAhPT0gJ2Jsb2NrJyAmJiBleHQubGV2ZWwgIT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleHRlbnNpb24gbGV2ZWwgbXVzdCBiZSAnYmxvY2snIG9yICdpbmxpbmUnXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uc1tleHQubGV2ZWxdKSB7XG4gICAgICAgICAgICBleHRlbnNpb25zW2V4dC5sZXZlbF0udW5zaGlmdChleHQudG9rZW5pemVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5zaW9uc1tleHQubGV2ZWxdID0gW2V4dC50b2tlbml6ZXJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXh0LnN0YXJ0KSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbiB0byBjaGVjayBmb3Igc3RhcnQgb2YgdG9rZW5cbiAgICAgICAgICAgIGlmIChleHQubGV2ZWwgPT09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnMuc3RhcnRCbG9jaykge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRCbG9jay5wdXNoKGV4dC5zdGFydCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9ucy5zdGFydEJsb2NrID0gW2V4dC5zdGFydF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXh0LmxldmVsID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5zdGFydElubGluZSkge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUucHVzaChleHQuc3RhcnQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnMuc3RhcnRJbmxpbmUgPSBbZXh0LnN0YXJ0XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0LmNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgLy8gQ2hpbGQgdG9rZW5zIHRvIGJlIHZpc2l0ZWQgYnkgd2Fsa1Rva2Vuc1xuICAgICAgICAgIGV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbZXh0Lm5hbWVdID0gZXh0LmNoaWxkVG9rZW5zO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9wdHMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBcIm92ZXJ3cml0ZVwiIGV4dGVuc2lvbnMgLS09PSAvL1xuICAgIGlmIChwYWNrLnJlbmRlcmVyKSB7XG4gICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSBtYXJrZWQuZGVmYXVsdHMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyKCk7XG4gICAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlJlbmRlcmVyID0gcmVuZGVyZXJbcHJvcF07XG4gICAgICAgICAgLy8gUmVwbGFjZSByZW5kZXJlciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHJlbmRlcmVyW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLnJlbmRlcmVyW3Byb3BdLmFwcGx5KHJlbmRlcmVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZSZW5kZXJlci5hcHBseShyZW5kZXJlciwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFjay5yZW5kZXJlcikge1xuICAgICAgICAgIF9sb29wKHByb3ApO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGlmIChwYWNrLnRva2VuaXplcikge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRva2VuaXplciA9IG1hcmtlZC5kZWZhdWx0cy50b2tlbml6ZXIgfHwgbmV3IFRva2VuaXplcigpO1xuICAgICAgICB2YXIgX2xvb3AyID0gZnVuY3Rpb24gX2xvb3AyKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldlRva2VuaXplciA9IHRva2VuaXplcltwcm9wXTtcbiAgICAgICAgICAvLyBSZXBsYWNlIHRva2VuaXplciB3aXRoIGZ1bmMgdG8gcnVuIGV4dGVuc2lvbiwgYnV0IGZhbGwgYmFjayBpZiBmYWxzZVxuICAgICAgICAgIHRva2VuaXplcltwcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCksIF9rZXk0ID0gMDsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgICAgICAgICBhcmdzW19rZXk0XSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmV0ID0gcGFjay50b2tlbml6ZXJbcHJvcF0uYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldCA9IHByZXZUb2tlbml6ZXIuYXBwbHkodG9rZW5pemVyLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwYWNrLnRva2VuaXplcikge1xuICAgICAgICAgIF9sb29wMihwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRzLnRva2VuaXplciA9IHRva2VuaXplcjtcbiAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgLy8gPT0tLSBQYXJzZSBIb29rcyBleHRlbnNpb25zIC0tPT0gLy9cbiAgICBpZiAocGFjay5ob29rcykge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhvb2tzID0gbWFya2VkLmRlZmF1bHRzLmhvb2tzIHx8IG5ldyBIb29rcygpO1xuICAgICAgICB2YXIgX2xvb3AzID0gZnVuY3Rpb24gX2xvb3AzKHByb3ApIHtcbiAgICAgICAgICB2YXIgcHJldkhvb2sgPSBob29rc1twcm9wXTtcbiAgICAgICAgICBpZiAoSG9va3MucGFzc1Rocm91Z2hIb29rcy5oYXMocHJvcCkpIHtcbiAgICAgICAgICAgIGhvb2tzW3Byb3BdID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYWNrLmhvb2tzW3Byb3BdLmNhbGwoaG9va3MsIGFyZykpLnRoZW4oZnVuY3Rpb24gKHJldCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHJldCA9IHBhY2suaG9va3NbcHJvcF0uY2FsbChob29rcywgYXJnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXZIb29rLmNhbGwoaG9va3MsIHJldCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBob29rc1twcm9wXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfa2V5NV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciByZXQgPSBwYWNrLmhvb2tzW3Byb3BdLmFwcGx5KGhvb2tzLCBhcmdzKTtcbiAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXQgPSBwcmV2SG9vay5hcHBseShob29rcywgYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHBhY2suaG9va3MpIHtcbiAgICAgICAgICBfbG9vcDMocHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cy5ob29rcyA9IGhvb2tzO1xuICAgICAgfSkoKTtcbiAgICB9XG5cbiAgICAvLyA9PS0tIFBhcnNlIFdhbGtUb2tlbnMgZXh0ZW5zaW9ucyAtLT09IC8vXG4gICAgaWYgKHBhY2sud2Fsa1Rva2Vucykge1xuICAgICAgdmFyIF93YWxrVG9rZW5zID0gbWFya2VkLmRlZmF1bHRzLndhbGtUb2tlbnM7XG4gICAgICBvcHRzLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICB2YWx1ZXMucHVzaChwYWNrLndhbGtUb2tlbnMuY2FsbCh0aGlzLCB0b2tlbikpO1xuICAgICAgICBpZiAoX3dhbGtUb2tlbnMpIHtcbiAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KF93YWxrVG9rZW5zLmNhbGwodGhpcywgdG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgfTtcbiAgICB9XG4gICAgbWFya2VkLnNldE9wdGlvbnMob3B0cyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSdW4gY2FsbGJhY2sgZm9yIGV2ZXJ5IHRva2VuXG4gKi9cblxubWFya2VkLndhbGtUb2tlbnMgPSBmdW5jdGlvbiAodG9rZW5zLCBjYWxsYmFjaykge1xuICB2YXIgdmFsdWVzID0gW107XG4gIHZhciBfbG9vcDQgPSBmdW5jdGlvbiBfbG9vcDQoKSB7XG4gICAgdmFyIHRva2VuID0gX3N0ZXAudmFsdWU7XG4gICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChjYWxsYmFjay5jYWxsKG1hcmtlZCwgdG9rZW4pKTtcbiAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAge1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLmhlYWRlciksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnMoY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRva2VuLnJvd3MpLCBfc3RlcDM7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMygpKS5kb25lOykge1xuICAgICAgICAgICAgdmFyIHJvdyA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHJvdyksIF9zdGVwNDsgIShfc3RlcDQgPSBfaXRlcmF0b3I0KCkpLmRvbmU7KSB7XG4gICAgICAgICAgICAgIHZhciBfY2VsbCA9IF9zdGVwNC52YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChtYXJrZWQud2Fsa1Rva2VucyhfY2VsbC50b2tlbnMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdsaXN0JzpcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4uaXRlbXMsIGNhbGxiYWNrKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHtcbiAgICAgICAgICBpZiAobWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnMgJiYgbWFya2VkLmRlZmF1bHRzLmV4dGVuc2lvbnMuY2hpbGRUb2tlbnNbdG9rZW4udHlwZV0pIHtcbiAgICAgICAgICAgIC8vIFdhbGsgYW55IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIG1hcmtlZC5kZWZhdWx0cy5leHRlbnNpb25zLmNoaWxkVG9rZW5zW3Rva2VuLnR5cGVdLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkVG9rZW5zKSB7XG4gICAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW5bY2hpbGRUb2tlbnNdLCBjYWxsYmFjaykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50b2tlbnMpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQobWFya2VkLndhbGtUb2tlbnModG9rZW4udG9rZW5zLCBjYWxsYmFjaykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSh0b2tlbnMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgIF9sb29wNCgpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59O1xuXG4vKipcbiAqIFBhcnNlIElubGluZVxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICovXG5tYXJrZWQucGFyc2VJbmxpbmUgPSBwYXJzZU1hcmtkb3duKExleGVyLmxleElubGluZSwgUGFyc2VyLnBhcnNlSW5saW5lKTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcbm1hcmtlZC5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcbm1hcmtlZC5Ub2tlbml6ZXIgPSBUb2tlbml6ZXI7XG5tYXJrZWQuU2x1Z2dlciA9IFNsdWdnZXI7XG5tYXJrZWQuSG9va3MgPSBIb29rcztcbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcbnZhciBvcHRpb25zID0gbWFya2VkLm9wdGlvbnM7XG52YXIgc2V0T3B0aW9ucyA9IG1hcmtlZC5zZXRPcHRpb25zO1xudmFyIHVzZSA9IG1hcmtlZC51c2U7XG52YXIgd2Fsa1Rva2VucyA9IG1hcmtlZC53YWxrVG9rZW5zO1xudmFyIHBhcnNlSW5saW5lID0gbWFya2VkLnBhcnNlSW5saW5lO1xudmFyIHBhcnNlID0gbWFya2VkO1xudmFyIHBhcnNlciA9IFBhcnNlci5wYXJzZTtcbnZhciBsZXhlciA9IExleGVyLmxleDtcblxuZXhwb3J0cy5Ib29rcyA9IEhvb2tzO1xuZXhwb3J0cy5MZXhlciA9IExleGVyO1xuZXhwb3J0cy5QYXJzZXIgPSBQYXJzZXI7XG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5leHBvcnRzLlNsdWdnZXIgPSBTbHVnZ2VyO1xuZXhwb3J0cy5UZXh0UmVuZGVyZXIgPSBUZXh0UmVuZGVyZXI7XG5leHBvcnRzLlRva2VuaXplciA9IFRva2VuaXplcjtcbmV4cG9ydHMuZ2V0RGVmYXVsdHMgPSBnZXREZWZhdWx0cztcbmV4cG9ydHMubGV4ZXIgPSBsZXhlcjtcbmV4cG9ydHMubWFya2VkID0gbWFya2VkO1xuZXhwb3J0cy5vcHRpb25zID0gb3B0aW9ucztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMucGFyc2VJbmxpbmUgPSBwYXJzZUlubGluZTtcbmV4cG9ydHMucGFyc2VyID0gcGFyc2VyO1xuZXhwb3J0cy5zZXRPcHRpb25zID0gc2V0T3B0aW9ucztcbmV4cG9ydHMudXNlID0gdXNlO1xuZXhwb3J0cy53YWxrVG9rZW5zID0gd2Fsa1Rva2VucztcbiIsICJjb25zdCB7IG1hcmtlZCB9ID0gcmVxdWlyZSgnbWFya2VkJyk7XG5cbm1hcmtlZC5zZXRPcHRpb25zKHsgYnJlYWtzOiB0cnVlLCBzbWFydHlQYW50czogdHJ1ZSB9KTtcblxuY2xhc3MgSjJNIHtcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEhUTUwgKGp1c3QgYSB3cmFwcGVyIHRvIE1hcmtlZCdzIHBhcnNlIG1ldGhvZCkuXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFN0cmluZyB0byBjb252ZXJ0IGZyb20gTWFya2Rvd24gdG8gSFRNTFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBIVE1MIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyBtZF90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKHN0cik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBKaXJhIFdpa2kgc3RyaW5nIGludG8gSFRNTC5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gU3RyaW5nIHRvIGNvbnZlcnQgZnJvbSBKaXJhIFdpa2kgc3ludGF4IHRvIEhUTUxcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgamlyYV90b19odG1sKHN0cikge1xuICAgICAgICByZXR1cm4gbWFya2VkLnBhcnNlKEoyTS50b19tYXJrZG93bihzdHIpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEppcmEgV2lraSBzdHJpbmcgaW50byBNYXJrZG93bi5cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gSmlyYSBXaWtpIHN0cmluZyB0byBjb252ZXJ0IHRvIE1hcmtkb3duXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIE1hcmtkb3duIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyB0b19tYXJrZG93bihzdHIpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHN0clxuICAgICAgICAgICAgICAgIC8vIFVuLU9yZGVyZWQgTGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlsgXFx0XSooXFwqKylcXHMrL2dtLCAobWF0Y2gsIHN0YXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtBcnJheShzdGFycy5sZW5ndGgpLmpvaW4oJyAgJyl9KiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3JkZXJlZCBsaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigjKylcXHMrL2dtLCAobWF0Y2gsIG51bXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KG51bXMubGVuZ3RoKS5qb2luKCcgICAnKX0xLiBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gSGVhZGVycyAxLTZcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXmgoWzAtNl0pXFwuKC4qKSQvZ20sIChtYXRjaCwgbGV2ZWwsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHBhcnNlSW50KGxldmVsLCAxMCkgKyAxKS5qb2luKCcjJykgKyBjb250ZW50O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gQm9sZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCooXFxTLiopXFwqL2csICcqKiQxKionKVxuICAgICAgICAgICAgICAgIC8vIEl0YWxpY1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fKFxcUy4qKV8vZywgJyokMSonKVxuICAgICAgICAgICAgICAgIC8vIE1vbm9zcGFjZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtcXHsoW159XSspXFx9XFx9L2csICdgJDFgJylcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMgKGJ1Z2d5KVxuICAgICAgICAgICAgICAgIC8vIC5yZXBsYWNlKC9cXD9cXD8oKD86LlteP118W14/XS4pKylcXD9cXD8vZywgJzxjaXRlPiQxPC9jaXRlPicpXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCsoW14rXSopXFwrL2csICc8aW5zPiQxPC9pbnM+JylcbiAgICAgICAgICAgICAgICAvLyBTdXBlcnNjcmlwdFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXF4oW15eXSopXFxeL2csICc8c3VwPiQxPC9zdXA+JylcbiAgICAgICAgICAgICAgICAvLyBTdWJzY3JpcHRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvfihbXn5dKil+L2csICc8c3ViPiQxPC9zdWI+JylcbiAgICAgICAgICAgICAgICAvLyBTdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKS0oXFxTKy4qP1xcUyktKFxccyspL2csICckMX5+JDJ+fiQzJylcbiAgICAgICAgICAgICAgICAvLyBDb2RlIEJsb2NrXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIC9cXHtjb2RlKDooW2Etel0rKSk/KFs6fF0/KHRpdGxlfGJvcmRlclN0eWxlfGJvcmRlckNvbG9yfGJvcmRlcldpZHRofGJnQ29sb3J8dGl0bGVCR0NvbG9yKT0uKz8pKlxcfShbXl0qPylcXG4/XFx7Y29kZVxcfS9nbSxcbiAgICAgICAgICAgICAgICAgICAgJ2BgYCQyJDVcXG5gYGAnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC8vIFByZS1mb3JtYXR0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC97bm9mb3JtYXR9L2csICdgYGAnKVxuICAgICAgICAgICAgICAgIC8vIFVuLW5hbWVkIExpbmtzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcWyhbXnxdKz8pXFxdL2csICc8JDE+JylcbiAgICAgICAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvISguKykhL2csICchW10oJDEpJylcbiAgICAgICAgICAgICAgICAvLyBOYW1lZCBMaW5rc1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoLis/KVxcfCguKz8pXFxdL2csICdbJDFdKCQyKScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15icVxcLlxccysvZ20sICc+ICcpXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGNvbG9yOiB1bnN1cHBvcnRlZCBpbiBtZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtjb2xvcjpbXn1dK1xcfShbXl0qPylcXHtjb2xvclxcfS9nbSwgJyQxJylcbiAgICAgICAgICAgICAgICAvLyBwYW5lbCBpbnRvIHRhYmxlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xce3BhbmVsOnRpdGxlPShbXn1dKilcXH1cXG4/KFteXSo/KVxcbj9cXHtwYW5lbFxcfS9nbSwgJ1xcbnwgJDEgfFxcbnwgLS0tIHxcXG58ICQyIHwnKVxuICAgICAgICAgICAgICAgIC8vIHRhYmxlIGhlYWRlclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eWyBcXHRdKigoPzpcXHxcXHwuKj8pK1xcfFxcfClbIFxcdF0qJC9nbSwgKG1hdGNoLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpbmdsZUJhcnJlZCA9IGhlYWRlcnMucmVwbGFjZSgvXFx8XFx8L2csICd8Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgXFxuJHtzaW5nbGVCYXJyZWR9XFxuJHtzaW5nbGVCYXJyZWQucmVwbGFjZSgvXFx8W158XSsvZywgJ3wgLS0tICcpfWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbGVhZGluZy1zcGFjZSBvZiB0YWJsZSBoZWFkZXJzIGFuZCByb3dzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15bIFxcdF0qXFx8L2dtLCAnfCcpXG4gICAgICAgICk7XG4gICAgICAgIC8vIC8vIHJlbW92ZSB1bnRlcm1pbmF0ZWQgaW5zZXJ0cyBhY3Jvc3MgdGFibGUgY2VsbHNcbiAgICAgICAgLy8gLnJlcGxhY2UoL1xcfChbXjxdKik8aW5zPig/IVtefF0qPFxcL2lucz4pKFtefF0qKVxcfC9nLCAoXywgcHJlY2VkaW5nLCBmb2xsb3dpbmcpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiBgfCR7cHJlY2VkaW5nfSske2ZvbGxvd2luZ318YDtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLy8gcmVtb3ZlIHVub3BlbmVkIGluc2VydHMgYWNyb3NzIHRhYmxlIGNlbGxzXG4gICAgICAgIC8vIC5yZXBsYWNlKC9cXHwoPzwhW158XSo8aW5zPikoW148XSopPFxcL2lucz4oW158XSopXFx8L2csIChfLCBwcmVjZWRpbmcsIGZvbGxvd2luZykgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGB8JHtwcmVjZWRpbmd9KyR7Zm9sbG93aW5nfXxgO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIE1hcmtkb3duIHN0cmluZyBpbnRvIEppcmEgV2lraSBzeW50YXguXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIE1hcmtkb3duIHN0cmluZyB0byBjb252ZXJ0IHRvIEppcmEgV2lraSBzeW50YXhcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSmlyYSBXaWtpIHN5bnRheCByZXN1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9famlyYShzdHIpIHtcbiAgICAgICAgY29uc3QgbWFwID0ge1xuICAgICAgICAgICAgLy8gY2l0ZTogJz8/JyxcbiAgICAgICAgICAgIGRlbDogJy0nLFxuICAgICAgICAgICAgaW5zOiAnKycsXG4gICAgICAgICAgICBzdXA6ICdeJyxcbiAgICAgICAgICAgIHN1YjogJ34nLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICAgICAgICAvLyBUYWJsZXNcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgL15cXG4oKD86XFx8Lio/KStcXHwpWyBcXHRdKlxcbigoPzpcXHxcXHMqPy17Myx9XFxzKj8pK1xcfClbIFxcdF0qXFxuKCg/Oig/OlxcfC4qPykrXFx8WyBcXHRdKlxcbikqKSQvZ20sXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaCwgaGVhZGVyTGluZSwgc2VwYXJhdG9yTGluZSwgcm93c3RyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gaGVhZGVyTGluZS5tYXRjaCgvW158XSsoPz1cXHwpL2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VwYXJhdG9ycyA9IHNlcGFyYXRvckxpbmUubWF0Y2goL1tefF0rKD89XFx8KS9nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzLmxlbmd0aCAhPT0gc2VwYXJhdG9ycy5sZW5ndGgpIHJldHVybiBtYXRjaDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IHJvd3N0ci5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT09IDIgJiYgaGVhZGVycy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYHtwYW5lbDp0aXRsZT0ke2hlYWRlcnNbMF0udHJpbSgpfX1cXG4ke3Jvd3N0clxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcfCguKilbIFxcdF0qXFx8LywgJyQxJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKX1cXG57cGFuZWx9XFxuYDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGB8fCR7aGVhZGVycy5qb2luKCd8fCcpfXx8XFxuJHtyb3dzdHJ9YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvLyBCb2xkLCBJdGFsaWMsIGFuZCBDb21iaW5lZCAoYm9sZCtpdGFsaWMpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbKl9dKykoXFxTLio/KVxcMS9nLCAobWF0Y2gsIHdyYXBwZXIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXyR7Y29udGVudH1fYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCoke2NvbnRlbnR9KmA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBfKiR7Y29udGVudH0qX2A7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVyICsgY29udGVudCArIHdyYXBwZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEFsbCBIZWFkZXJzICgjIGZvcm1hdClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbI10rKSguKj8pJC9nbSwgKG1hdGNoLCBsZXZlbCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGgke2xldmVsLmxlbmd0aH0uJHtjb250ZW50fWA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBIZWFkZXJzIChIMSBhbmQgSDIgdW5kZXJsaW5lcylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXiguKj8pXFxuKFs9LV0rKSQvZ20sIChtYXRjaCwgY29udGVudCwgbGV2ZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBoJHtsZXZlbFswXSA9PT0gJz0nID8gMSA6IDJ9LiAke2NvbnRlbnR9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIE9yZGVyZWQgbGlzdHNcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbIFxcdF0qKVxcZCtcXC5cXHMrL2dtLCAobWF0Y2gsIHNwYWNlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7QXJyYXkoTWF0aC5mbG9vcihzcGFjZXMubGVuZ3RoIC8gMykgKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbGwoJyMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpfSBgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gVW4tT3JkZXJlZCBMaXN0c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsgXFx0XSopXFwqXFxzKy9nbSwgKG1hdGNoLCBzcGFjZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke0FycmF5KE1hdGguZmxvb3Ioc3BhY2VzLmxlbmd0aCAvIDIgKyAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWxsKCcqJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKX0gYDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIEhlYWRlcnMgKGgxIG9yIGgyKSAobGluZXMgXCJ1bmRlcmxpbmVkXCIgYnkgLS0tLSBvciA9PT09PSlcbiAgICAgICAgICAgICAgICAvLyBDaXRhdGlvbnMsIEluc2VydHMsIFN1YnNjcmlwdHMsIFN1cGVyc2NyaXB0cywgYW5kIFN0cmlrZXRocm91Z2hzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgPCgke09iamVjdC5rZXlzKG1hcCkuam9pbignfCcpfSk+KC4qPyk8L1xcXFwxPmAsICdnJyksIChtYXRjaCwgZnJvbSwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0byA9IG1hcFtmcm9tXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvICsgY29udGVudCArIHRvO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gT3RoZXIga2luZCBvZiBzdHJpa2V0aHJvdWdoXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhcXHMrKX5+KC4qPyl+fihcXHMrKS9nLCAnJDEtJDItJDMnKVxuICAgICAgICAgICAgICAgIC8vIE5hbWVkL1VuLU5hbWVkIENvZGUgQmxvY2tcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvYGBgKC4rXFxuKT8oKD86LnxcXG4pKj8pYGBgL2csIChtYXRjaCwgc3ludCwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29kZSA9ICd7Y29kZX0nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IGB7Y29kZToke3N5bnQucmVwbGFjZSgvXFxuL2csICcnKX19XFxuYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7Y29kZX0ke2NvbnRlbnR9e2NvZGV9YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIElubGluZS1QcmVmb3JtYXR0ZWQgVGV4dFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9gKFteYF0rKWAvZywgJ3t7JDF9fScpXG4gICAgICAgICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyFcXFtbXlxcXV0qXFxdXFwoKFteKV0rKVxcKS9nLCAnISQxIScpXG4gICAgICAgICAgICAgICAgLy8gTmFtZWQgTGlua1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFsoW15cXF1dKylcXF1cXCgoW14pXSspXFwpL2csICdbJDF8JDJdJylcbiAgICAgICAgICAgICAgICAvLyBVbi1OYW1lZCBMaW5rXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLzwoW14+XSspPi9nLCAnWyQxXScpXG4gICAgICAgICAgICAgICAgLy8gU2luZ2xlIFBhcmFncmFwaCBCbG9ja3F1b3RlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14+L2dtLCAnYnEuJylcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSjJNO1xuIiwgIi8qKlxuICogQ29udmVydGVyIEZhY2FkZVxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBjb252ZXJzaW9uIG9wZXJhdGlvbnMuXG4gKiBVc2VzIFN0cmF0ZWd5IFBhdHRlcm4gXHUyMDE0IGVhY2ggY29udmVyc2lvbiBkaXJlY3Rpb24gaXMgYSBzZXBhcmF0ZSBzdHJhdGVneS5cbiAqIE5ldyBmb3JtYXRzIGNhbiBiZSBhZGRlZCBieSByZWdpc3RlcmluZyBuZXcgc3RyYXRlZ2llcyAoT3Blbi1DbG9zZWQgUHJpbmNpcGxlKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgaHRtbFRvTWFya2Rvd24sIG1hcmtkb3duVG9KaXJhLCBqaXJhVG9NYXJrZG93biB9IGZyb20gJy4vY29udmVydGVyJztcbiAqL1xuaW1wb3J0IHsgTWFya2Rvd25TdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy9tYXJrZG93bi5qcyc7XG5pbXBvcnQgeyBKaXJhU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvamlyYS5qcyc7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBTdHJhdGVneSBpbnN0YW5jZXMgKFNpbmdsZXRvbiBwZXIgc3RyYXRlZ3kpIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuY29uc3QgbWFya2Rvd25TdHJhdGVneSA9IG5ldyBNYXJrZG93blN0cmF0ZWd5KCk7XG5jb25zdCBqaXJhU3RyYXRlZ3kgPSBuZXcgSmlyYVN0cmF0ZWd5KCk7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBQdWJsaWMgQVBJIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIENvbnZlcnQgcmVuZGVyZWQgSFRNTCB0byBNYXJrZG93bi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge01hcDxzdHJpbmcsc3RyaW5nPn0gW29wdGlvbnMuaW1hZ2VCYXNlNjRNYXBdXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMubWV0YWRhdGFdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHRtbFRvTWFya2Rvd24oaHRtbCwgb3B0aW9ucyA9IHt9KSB7XG4gIHJldHVybiBtYXJrZG93blN0cmF0ZWd5LmNvbnZlcnQoaHRtbCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ29udmVydCBKaXJhIHdpa2kgbWFya3VwIHRvIE1hcmtkb3duLlxuICogQHBhcmFtIHtzdHJpbmd9IGppcmFNYXJrdXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqaXJhVG9NYXJrZG93bihqaXJhTWFya3VwKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kudG9NYXJrZG93bihqaXJhTWFya3VwKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IE1hcmtkb3duIHRvIEppcmEgd2lraSBtYXJrdXAgdmlhIEFTVCBwaXBlbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZG93blxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtkb3duVG9KaXJhKG1hcmtkb3duKSB7XG4gIHJldHVybiBqaXJhU3RyYXRlZ3kuZnJvbU1hcmtkb3duKG1hcmtkb3duKTtcbn1cblxuLyoqXG4gKiBSZS1leHBvcnQgSjJNIGZvciBIVE1MIGdlbmVyYXRpb24gKHVzZWQgYnkgcG9wdXAncyBGaWxsIEppcmEgZmVhdHVyZSkuXG4gKi9cbmV4cG9ydCBjb25zdCBKMk0gPSBqaXJhU3RyYXRlZ3kuajJtO1xuIiwgImZ1bmN0aW9uIGV4dGVuZCAoZGVzdGluYXRpb24pIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkgZGVzdGluYXRpb25ba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gcmVwZWF0IChjaGFyYWN0ZXIsIGNvdW50KSB7XG4gIHJldHVybiBBcnJheShjb3VudCArIDEpLmpvaW4oY2hhcmFjdGVyKVxufVxuXG5mdW5jdGlvbiB0cmltTGVhZGluZ05ld2xpbmVzIChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxuKi8sICcnKVxufVxuXG5mdW5jdGlvbiB0cmltVHJhaWxpbmdOZXdsaW5lcyAoc3RyaW5nKSB7XG4gIC8vIGF2b2lkIG1hdGNoLWF0LWVuZCByZWdleHAgYm90dGxlbmVjaywgc2VlICMzNzBcbiAgdmFyIGluZGV4RW5kID0gc3RyaW5nLmxlbmd0aDtcbiAgd2hpbGUgKGluZGV4RW5kID4gMCAmJiBzdHJpbmdbaW5kZXhFbmQgLSAxXSA9PT0gJ1xcbicpIGluZGV4RW5kLS07XG4gIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4RW5kKVxufVxuXG5mdW5jdGlvbiB0cmltTmV3bGluZXMgKHN0cmluZykge1xuICByZXR1cm4gdHJpbVRyYWlsaW5nTmV3bGluZXModHJpbUxlYWRpbmdOZXdsaW5lcyhzdHJpbmcpKVxufVxuXG52YXIgYmxvY2tFbGVtZW50cyA9IFtcbiAgJ0FERFJFU1MnLCAnQVJUSUNMRScsICdBU0lERScsICdBVURJTycsICdCTE9DS1FVT1RFJywgJ0JPRFknLCAnQ0FOVkFTJyxcbiAgJ0NFTlRFUicsICdERCcsICdESVInLCAnRElWJywgJ0RMJywgJ0RUJywgJ0ZJRUxEU0VUJywgJ0ZJR0NBUFRJT04nLCAnRklHVVJFJyxcbiAgJ0ZPT1RFUicsICdGT1JNJywgJ0ZSQU1FU0VUJywgJ0gxJywgJ0gyJywgJ0gzJywgJ0g0JywgJ0g1JywgJ0g2JywgJ0hFQURFUicsXG4gICdIR1JPVVAnLCAnSFInLCAnSFRNTCcsICdJU0lOREVYJywgJ0xJJywgJ01BSU4nLCAnTUVOVScsICdOQVYnLCAnTk9GUkFNRVMnLFxuICAnTk9TQ1JJUFQnLCAnT0wnLCAnT1VUUFVUJywgJ1AnLCAnUFJFJywgJ1NFQ1RJT04nLCAnVEFCTEUnLCAnVEJPRFknLCAnVEQnLFxuICAnVEZPT1QnLCAnVEgnLCAnVEhFQUQnLCAnVFInLCAnVUwnXG5dO1xuXG5mdW5jdGlvbiBpc0Jsb2NrIChub2RlKSB7XG4gIHJldHVybiBpcyhub2RlLCBibG9ja0VsZW1lbnRzKVxufVxuXG52YXIgdm9pZEVsZW1lbnRzID0gW1xuICAnQVJFQScsICdCQVNFJywgJ0JSJywgJ0NPTCcsICdDT01NQU5EJywgJ0VNQkVEJywgJ0hSJywgJ0lNRycsICdJTlBVVCcsXG4gICdLRVlHRU4nLCAnTElOSycsICdNRVRBJywgJ1BBUkFNJywgJ1NPVVJDRScsICdUUkFDSycsICdXQlInXG5dO1xuXG5mdW5jdGlvbiBpc1ZvaWQgKG5vZGUpIHtcbiAgcmV0dXJuIGlzKG5vZGUsIHZvaWRFbGVtZW50cylcbn1cblxuZnVuY3Rpb24gaGFzVm9pZCAobm9kZSkge1xuICByZXR1cm4gaGFzKG5vZGUsIHZvaWRFbGVtZW50cylcbn1cblxudmFyIG1lYW5pbmdmdWxXaGVuQmxhbmtFbGVtZW50cyA9IFtcbiAgJ0EnLCAnVEFCTEUnLCAnVEhFQUQnLCAnVEJPRFknLCAnVEZPT1QnLCAnVEgnLCAnVEQnLCAnSUZSQU1FJywgJ1NDUklQVCcsXG4gICdBVURJTycsICdWSURFTydcbl07XG5cbmZ1bmN0aW9uIGlzTWVhbmluZ2Z1bFdoZW5CbGFuayAobm9kZSkge1xuICByZXR1cm4gaXMobm9kZSwgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzKVxufVxuXG5mdW5jdGlvbiBoYXNNZWFuaW5nZnVsV2hlbkJsYW5rIChub2RlKSB7XG4gIHJldHVybiBoYXMobm9kZSwgbWVhbmluZ2Z1bFdoZW5CbGFua0VsZW1lbnRzKVxufVxuXG5mdW5jdGlvbiBpcyAobm9kZSwgdGFnTmFtZXMpIHtcbiAgcmV0dXJuIHRhZ05hbWVzLmluZGV4T2Yobm9kZS5ub2RlTmFtZSkgPj0gMFxufVxuXG5mdW5jdGlvbiBoYXMgKG5vZGUsIHRhZ05hbWVzKSB7XG4gIHJldHVybiAoXG4gICAgbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSAmJlxuICAgIHRhZ05hbWVzLnNvbWUoZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpLmxlbmd0aFxuICAgIH0pXG4gIClcbn1cblxudmFyIHJ1bGVzID0ge307XG5cbnJ1bGVzLnBhcmFncmFwaCA9IHtcbiAgZmlsdGVyOiAncCcsXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgcmV0dXJuICdcXG5cXG4nICsgY29udGVudCArICdcXG5cXG4nXG4gIH1cbn07XG5cbnJ1bGVzLmxpbmVCcmVhayA9IHtcbiAgZmlsdGVyOiAnYnInLFxuXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmJyICsgJ1xcbidcbiAgfVxufTtcblxucnVsZXMuaGVhZGluZyA9IHtcbiAgZmlsdGVyOiBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2J10sXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlLCBvcHRpb25zKSB7XG4gICAgdmFyIGhMZXZlbCA9IE51bWJlcihub2RlLm5vZGVOYW1lLmNoYXJBdCgxKSk7XG5cbiAgICBpZiAob3B0aW9ucy5oZWFkaW5nU3R5bGUgPT09ICdzZXRleHQnICYmIGhMZXZlbCA8IDMpIHtcbiAgICAgIHZhciB1bmRlcmxpbmUgPSByZXBlYXQoKGhMZXZlbCA9PT0gMSA/ICc9JyA6ICctJyksIGNvbnRlbnQubGVuZ3RoKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgICdcXG5cXG4nICsgY29udGVudCArICdcXG4nICsgdW5kZXJsaW5lICsgJ1xcblxcbidcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdcXG5cXG4nICsgcmVwZWF0KCcjJywgaExldmVsKSArICcgJyArIGNvbnRlbnQgKyAnXFxuXFxuJ1xuICAgIH1cbiAgfVxufTtcblxucnVsZXMuYmxvY2txdW90ZSA9IHtcbiAgZmlsdGVyOiAnYmxvY2txdW90ZScsXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgY29udGVudCA9IHRyaW1OZXdsaW5lcyhjb250ZW50KS5yZXBsYWNlKC9eL2dtLCAnPiAnKTtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBjb250ZW50ICsgJ1xcblxcbidcbiAgfVxufTtcblxucnVsZXMubGlzdCA9IHtcbiAgZmlsdGVyOiBbJ3VsJywgJ29sJ10sXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Lm5vZGVOYW1lID09PSAnTEknICYmIHBhcmVudC5sYXN0RWxlbWVudENoaWxkID09PSBub2RlKSB7XG4gICAgICByZXR1cm4gJ1xcbicgKyBjb250ZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnXFxuXFxuJyArIGNvbnRlbnQgKyAnXFxuXFxuJ1xuICAgIH1cbiAgfVxufTtcblxucnVsZXMubGlzdEl0ZW0gPSB7XG4gIGZpbHRlcjogJ2xpJyxcblxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5idWxsZXRMaXN0TWFya2VyICsgJyAgICc7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAocGFyZW50Lm5vZGVOYW1lID09PSAnT0wnKSB7XG4gICAgICB2YXIgc3RhcnQgPSBwYXJlbnQuZ2V0QXR0cmlidXRlKCdzdGFydCcpO1xuICAgICAgdmFyIGluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChwYXJlbnQuY2hpbGRyZW4sIG5vZGUpO1xuICAgICAgcHJlZml4ID0gKHN0YXJ0ID8gTnVtYmVyKHN0YXJ0KSArIGluZGV4IDogaW5kZXggKyAxKSArICcuICAnO1xuICAgIH1cbiAgICB2YXIgaXNQYXJhZ3JhcGggPSAvXFxuJC8udGVzdChjb250ZW50KTtcbiAgICBjb250ZW50ID0gdHJpbU5ld2xpbmVzKGNvbnRlbnQpICsgKGlzUGFyYWdyYXBoID8gJ1xcbicgOiAnJyk7XG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXFxuL2dtLCAnXFxuJyArICcgJy5yZXBlYXQocHJlZml4Lmxlbmd0aCkpOyAvLyBpbmRlbnRcbiAgICByZXR1cm4gKFxuICAgICAgcHJlZml4ICsgY29udGVudCArIChub2RlLm5leHRTaWJsaW5nID8gJ1xcbicgOiAnJylcbiAgICApXG4gIH1cbn07XG5cbnJ1bGVzLmluZGVudGVkQ29kZUJsb2NrID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIG9wdGlvbnMuY29kZUJsb2NrU3R5bGUgPT09ICdpbmRlbnRlZCcgJiZcbiAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdQUkUnICYmXG4gICAgICBub2RlLmZpcnN0Q2hpbGQgJiZcbiAgICAgIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnXG4gICAgKVxuICB9LFxuXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiAoXG4gICAgICAnXFxuXFxuICAgICcgK1xuICAgICAgbm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50LnJlcGxhY2UoL1xcbi9nLCAnXFxuICAgICcpICtcbiAgICAgICdcXG5cXG4nXG4gICAgKVxuICB9XG59O1xuXG5ydWxlcy5mZW5jZWRDb2RlQmxvY2sgPSB7XG4gIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgb3B0aW9ucy5jb2RlQmxvY2tTdHlsZSA9PT0gJ2ZlbmNlZCcgJiZcbiAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdQUkUnICYmXG4gICAgICBub2RlLmZpcnN0Q2hpbGQgJiZcbiAgICAgIG5vZGUuZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ0NPREUnXG4gICAgKVxuICB9LFxuXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIHZhciBjbGFzc05hbWUgPSBub2RlLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICAgIHZhciBsYW5ndWFnZSA9IChjbGFzc05hbWUubWF0Y2goL2xhbmd1YWdlLShcXFMrKS8pIHx8IFtudWxsLCAnJ10pWzFdO1xuICAgIHZhciBjb2RlID0gbm9kZS5maXJzdENoaWxkLnRleHRDb250ZW50O1xuXG4gICAgdmFyIGZlbmNlQ2hhciA9IG9wdGlvbnMuZmVuY2UuY2hhckF0KDApO1xuICAgIHZhciBmZW5jZVNpemUgPSAzO1xuICAgIHZhciBmZW5jZUluQ29kZVJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBmZW5jZUNoYXIgKyAnezMsfScsICdnbScpO1xuXG4gICAgdmFyIG1hdGNoO1xuICAgIHdoaWxlICgobWF0Y2ggPSBmZW5jZUluQ29kZVJlZ2V4LmV4ZWMoY29kZSkpKSB7XG4gICAgICBpZiAobWF0Y2hbMF0ubGVuZ3RoID49IGZlbmNlU2l6ZSkge1xuICAgICAgICBmZW5jZVNpemUgPSBtYXRjaFswXS5sZW5ndGggKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBmZW5jZSA9IHJlcGVhdChmZW5jZUNoYXIsIGZlbmNlU2l6ZSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgJ1xcblxcbicgKyBmZW5jZSArIGxhbmd1YWdlICsgJ1xcbicgK1xuICAgICAgY29kZS5yZXBsYWNlKC9cXG4kLywgJycpICtcbiAgICAgICdcXG4nICsgZmVuY2UgKyAnXFxuXFxuJ1xuICAgIClcbiAgfVxufTtcblxucnVsZXMuaG9yaXpvbnRhbFJ1bGUgPSB7XG4gIGZpbHRlcjogJ2hyJyxcblxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gJ1xcblxcbicgKyBvcHRpb25zLmhyICsgJ1xcblxcbidcbiAgfVxufTtcblxucnVsZXMuaW5saW5lTGluayA9IHtcbiAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSwgb3B0aW9ucykge1xuICAgIHJldHVybiAoXG4gICAgICBvcHRpb25zLmxpbmtTdHlsZSA9PT0gJ2lubGluZWQnICYmXG4gICAgICBub2RlLm5vZGVOYW1lID09PSAnQScgJiZcbiAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICApXG4gIH0sXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmIChocmVmKSBocmVmID0gaHJlZi5yZXBsYWNlKC8oWygpXSkvZywgJ1xcXFwkMScpO1xuICAgIHZhciB0aXRsZSA9IGNsZWFuQXR0cmlidXRlKG5vZGUuZ2V0QXR0cmlidXRlKCd0aXRsZScpKTtcbiAgICBpZiAodGl0bGUpIHRpdGxlID0gJyBcIicgKyB0aXRsZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCInO1xuICAgIHJldHVybiAnWycgKyBjb250ZW50ICsgJ10oJyArIGhyZWYgKyB0aXRsZSArICcpJ1xuICB9XG59O1xuXG5ydWxlcy5yZWZlcmVuY2VMaW5rID0ge1xuICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIG9wdGlvbnMubGlua1N0eWxlID09PSAncmVmZXJlbmNlZCcgJiZcbiAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdBJyAmJlxuICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgIClcbiAgfSxcblxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgaHJlZiA9IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgdmFyIHRpdGxlID0gY2xlYW5BdHRyaWJ1dGUobm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykpO1xuICAgIGlmICh0aXRsZSkgdGl0bGUgPSAnIFwiJyArIHRpdGxlICsgJ1wiJztcbiAgICB2YXIgcmVwbGFjZW1lbnQ7XG4gICAgdmFyIHJlZmVyZW5jZTtcblxuICAgIHN3aXRjaCAob3B0aW9ucy5saW5rUmVmZXJlbmNlU3R5bGUpIHtcbiAgICAgIGNhc2UgJ2NvbGxhcHNlZCc6XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddW10nO1xuICAgICAgICByZWZlcmVuY2UgPSAnWycgKyBjb250ZW50ICsgJ106ICcgKyBocmVmICsgdGl0bGU7XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzaG9ydGN1dCc6XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddJztcbiAgICAgICAgcmVmZXJlbmNlID0gJ1snICsgY29udGVudCArICddOiAnICsgaHJlZiArIHRpdGxlO1xuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIGlkID0gdGhpcy5yZWZlcmVuY2VzLmxlbmd0aCArIDE7XG4gICAgICAgIHJlcGxhY2VtZW50ID0gJ1snICsgY29udGVudCArICddWycgKyBpZCArICddJztcbiAgICAgICAgcmVmZXJlbmNlID0gJ1snICsgaWQgKyAnXTogJyArIGhyZWYgKyB0aXRsZTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZmVyZW5jZXMucHVzaChyZWZlcmVuY2UpO1xuICAgIHJldHVybiByZXBsYWNlbWVudFxuICB9LFxuXG4gIHJlZmVyZW5jZXM6IFtdLFxuXG4gIGFwcGVuZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmZXJlbmNlcyA9ICcnO1xuICAgIGlmICh0aGlzLnJlZmVyZW5jZXMubGVuZ3RoKSB7XG4gICAgICByZWZlcmVuY2VzID0gJ1xcblxcbicgKyB0aGlzLnJlZmVyZW5jZXMuam9pbignXFxuJykgKyAnXFxuXFxuJztcbiAgICAgIHRoaXMucmVmZXJlbmNlcyA9IFtdOyAvLyBSZXNldCByZWZlcmVuY2VzXG4gICAgfVxuICAgIHJldHVybiByZWZlcmVuY2VzXG4gIH1cbn07XG5cbnJ1bGVzLmVtcGhhc2lzID0ge1xuICBmaWx0ZXI6IFsnZW0nLCAnaSddLFxuXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghY29udGVudC50cmltKCkpIHJldHVybiAnJ1xuICAgIHJldHVybiBvcHRpb25zLmVtRGVsaW1pdGVyICsgY29udGVudCArIG9wdGlvbnMuZW1EZWxpbWl0ZXJcbiAgfVxufTtcblxucnVsZXMuc3Ryb25nID0ge1xuICBmaWx0ZXI6IFsnc3Ryb25nJywgJ2InXSxcblxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWNvbnRlbnQudHJpbSgpKSByZXR1cm4gJydcbiAgICByZXR1cm4gb3B0aW9ucy5zdHJvbmdEZWxpbWl0ZXIgKyBjb250ZW50ICsgb3B0aW9ucy5zdHJvbmdEZWxpbWl0ZXJcbiAgfVxufTtcblxucnVsZXMuY29kZSA9IHtcbiAgZmlsdGVyOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBoYXNTaWJsaW5ncyA9IG5vZGUucHJldmlvdXNTaWJsaW5nIHx8IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgdmFyIGlzQ29kZUJsb2NrID0gbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnUFJFJyAmJiAhaGFzU2libGluZ3M7XG5cbiAgICByZXR1cm4gbm9kZS5ub2RlTmFtZSA9PT0gJ0NPREUnICYmICFpc0NvZGVCbG9ja1xuICB9LFxuXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgIGlmICghY29udGVudCkgcmV0dXJuICcnXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgJyAnKTtcblxuICAgIHZhciBleHRyYVNwYWNlID0gL15gfF4gLio/W14gXS4qICR8YCQvLnRlc3QoY29udGVudCkgPyAnICcgOiAnJztcbiAgICB2YXIgZGVsaW1pdGVyID0gJ2AnO1xuICAgIHZhciBtYXRjaGVzID0gY29udGVudC5tYXRjaCgvYCsvZ20pIHx8IFtdO1xuICAgIHdoaWxlIChtYXRjaGVzLmluZGV4T2YoZGVsaW1pdGVyKSAhPT0gLTEpIGRlbGltaXRlciA9IGRlbGltaXRlciArICdgJztcblxuICAgIHJldHVybiBkZWxpbWl0ZXIgKyBleHRyYVNwYWNlICsgY29udGVudCArIGV4dHJhU3BhY2UgKyBkZWxpbWl0ZXJcbiAgfVxufTtcblxucnVsZXMuaW1hZ2UgPSB7XG4gIGZpbHRlcjogJ2ltZycsXG5cbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgdmFyIGFsdCA9IGNsZWFuQXR0cmlidXRlKG5vZGUuZ2V0QXR0cmlidXRlKCdhbHQnKSk7XG4gICAgdmFyIHNyYyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJztcbiAgICB2YXIgdGl0bGUgPSBjbGVhbkF0dHJpYnV0ZShub2RlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSk7XG4gICAgdmFyIHRpdGxlUGFydCA9IHRpdGxlID8gJyBcIicgKyB0aXRsZSArICdcIicgOiAnJztcbiAgICByZXR1cm4gc3JjID8gJyFbJyArIGFsdCArICddJyArICcoJyArIHNyYyArIHRpdGxlUGFydCArICcpJyA6ICcnXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNsZWFuQXR0cmlidXRlIChhdHRyaWJ1dGUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZSA/IGF0dHJpYnV0ZS5yZXBsYWNlKC8oXFxuK1xccyopKy9nLCAnXFxuJykgOiAnJ1xufVxuXG4vKipcbiAqIE1hbmFnZXMgYSBjb2xsZWN0aW9uIG9mIHJ1bGVzIHVzZWQgdG8gY29udmVydCBIVE1MIHRvIE1hcmtkb3duXG4gKi9cblxuZnVuY3Rpb24gUnVsZXMgKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fa2VlcCA9IFtdO1xuICB0aGlzLl9yZW1vdmUgPSBbXTtcblxuICB0aGlzLmJsYW5rUnVsZSA9IHtcbiAgICByZXBsYWNlbWVudDogb3B0aW9ucy5ibGFua1JlcGxhY2VtZW50XG4gIH07XG5cbiAgdGhpcy5rZWVwUmVwbGFjZW1lbnQgPSBvcHRpb25zLmtlZXBSZXBsYWNlbWVudDtcblxuICB0aGlzLmRlZmF1bHRSdWxlID0ge1xuICAgIHJlcGxhY2VtZW50OiBvcHRpb25zLmRlZmF1bHRSZXBsYWNlbWVudFxuICB9O1xuXG4gIHRoaXMuYXJyYXkgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMucnVsZXMpIHRoaXMuYXJyYXkucHVzaChvcHRpb25zLnJ1bGVzW2tleV0pO1xufVxuXG5SdWxlcy5wcm90b3R5cGUgPSB7XG4gIGFkZDogZnVuY3Rpb24gKGtleSwgcnVsZSkge1xuICAgIHRoaXMuYXJyYXkudW5zaGlmdChydWxlKTtcbiAgfSxcblxuICBrZWVwOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5fa2VlcC51bnNoaWZ0KHtcbiAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgcmVwbGFjZW1lbnQ6IHRoaXMua2VlcFJlcGxhY2VtZW50XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlLnVuc2hpZnQoe1xuICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICByZXBsYWNlbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJydcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBmb3JOb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlLmlzQmxhbmspIHJldHVybiB0aGlzLmJsYW5rUnVsZVxuICAgIHZhciBydWxlO1xuXG4gICAgaWYgKChydWxlID0gZmluZFJ1bGUodGhpcy5hcnJheSwgbm9kZSwgdGhpcy5vcHRpb25zKSkpIHJldHVybiBydWxlXG4gICAgaWYgKChydWxlID0gZmluZFJ1bGUodGhpcy5fa2VlcCwgbm9kZSwgdGhpcy5vcHRpb25zKSkpIHJldHVybiBydWxlXG4gICAgaWYgKChydWxlID0gZmluZFJ1bGUodGhpcy5fcmVtb3ZlLCBub2RlLCB0aGlzLm9wdGlvbnMpKSkgcmV0dXJuIHJ1bGVcblxuICAgIHJldHVybiB0aGlzLmRlZmF1bHRSdWxlXG4gIH0sXG5cbiAgZm9yRWFjaDogZnVuY3Rpb24gKGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFycmF5Lmxlbmd0aDsgaSsrKSBmbih0aGlzLmFycmF5W2ldLCBpKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZmluZFJ1bGUgKHJ1bGVzLCBub2RlLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcnVsZSA9IHJ1bGVzW2ldO1xuICAgIGlmIChmaWx0ZXJWYWx1ZShydWxlLCBub2RlLCBvcHRpb25zKSkgcmV0dXJuIHJ1bGVcbiAgfVxuICByZXR1cm4gdm9pZCAwXG59XG5cbmZ1bmN0aW9uIGZpbHRlclZhbHVlIChydWxlLCBub2RlLCBvcHRpb25zKSB7XG4gIHZhciBmaWx0ZXIgPSBydWxlLmZpbHRlcjtcbiAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGZpbHRlciA9PT0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSByZXR1cm4gdHJ1ZVxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgIGlmIChmaWx0ZXIuaW5kZXhPZihub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHJldHVybiB0cnVlXG4gIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmaWx0ZXIuY2FsbChydWxlLCBub2RlLCBvcHRpb25zKSkgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgZmlsdGVyYCBuZWVkcyB0byBiZSBhIHN0cmluZywgYXJyYXksIG9yIGZ1bmN0aW9uJylcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBjb2xsYXBzZVdoaXRlc3BhY2UgZnVuY3Rpb24gaXMgYWRhcHRlZCBmcm9tIGNvbGxhcHNlLXdoaXRlc3BhY2VcbiAqIGJ5IEx1YyBUaGV2ZW5hcmQuXG4gKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEx1YyBUaGV2ZW5hcmQgPGx1Y3RoZXZlbmFyZEBnbWFpbC5jb20+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIGNvbGxhcHNlV2hpdGVzcGFjZShvcHRpb25zKSByZW1vdmVzIGV4dHJhbmVvdXMgd2hpdGVzcGFjZSBmcm9tIGFuIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGNvbGxhcHNlV2hpdGVzcGFjZSAob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcbiAgdmFyIGlzQmxvY2sgPSBvcHRpb25zLmlzQmxvY2s7XG4gIHZhciBpc1ZvaWQgPSBvcHRpb25zLmlzVm9pZDtcbiAgdmFyIGlzUHJlID0gb3B0aW9ucy5pc1ByZSB8fCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnUFJFJ1xuICB9O1xuXG4gIGlmICghZWxlbWVudC5maXJzdENoaWxkIHx8IGlzUHJlKGVsZW1lbnQpKSByZXR1cm5cblxuICB2YXIgcHJldlRleHQgPSBudWxsO1xuICB2YXIga2VlcExlYWRpbmdXcyA9IGZhbHNlO1xuXG4gIHZhciBwcmV2ID0gbnVsbDtcbiAgdmFyIG5vZGUgPSBuZXh0KHByZXYsIGVsZW1lbnQsIGlzUHJlKTtcblxuICB3aGlsZSAobm9kZSAhPT0gZWxlbWVudCkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQpIHsgLy8gTm9kZS5URVhUX05PREUgb3IgTm9kZS5DREFUQV9TRUNUSU9OX05PREVcbiAgICAgIHZhciB0ZXh0ID0gbm9kZS5kYXRhLnJlcGxhY2UoL1sgXFxyXFxuXFx0XSsvZywgJyAnKTtcblxuICAgICAgaWYgKCghcHJldlRleHQgfHwgLyAkLy50ZXN0KHByZXZUZXh0LmRhdGEpKSAmJlxuICAgICAgICAgICFrZWVwTGVhZGluZ1dzICYmIHRleHRbMF0gPT09ICcgJykge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHIoMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGB0ZXh0YCBtaWdodCBiZSBlbXB0eSBhdCB0aGlzIHBvaW50LlxuICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIG5vZGUgPSByZW1vdmUobm9kZSk7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIG5vZGUuZGF0YSA9IHRleHQ7XG5cbiAgICAgIHByZXZUZXh0ID0gbm9kZTtcbiAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHsgLy8gTm9kZS5FTEVNRU5UX05PREVcbiAgICAgIGlmIChpc0Jsb2NrKG5vZGUpIHx8IG5vZGUubm9kZU5hbWUgPT09ICdCUicpIHtcbiAgICAgICAgaWYgKHByZXZUZXh0KSB7XG4gICAgICAgICAgcHJldlRleHQuZGF0YSA9IHByZXZUZXh0LmRhdGEucmVwbGFjZSgvICQvLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWb2lkKG5vZGUpIHx8IGlzUHJlKG5vZGUpKSB7XG4gICAgICAgIC8vIEF2b2lkIHRyaW1taW5nIHNwYWNlIGFyb3VuZCBub24tYmxvY2ssIG5vbi1CUiB2b2lkIGVsZW1lbnRzIGFuZCBpbmxpbmUgUFJFLlxuICAgICAgICBwcmV2VGV4dCA9IG51bGw7XG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwcmV2VGV4dCkge1xuICAgICAgICAvLyBEcm9wIHByb3RlY3Rpb24gaWYgc2V0IHByZXZpb3VzbHkuXG4gICAgICAgIGtlZXBMZWFkaW5nV3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHJlbW92ZShub2RlKTtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIG5leHROb2RlID0gbmV4dChwcmV2LCBub2RlLCBpc1ByZSk7XG4gICAgcHJldiA9IG5vZGU7XG4gICAgbm9kZSA9IG5leHROb2RlO1xuICB9XG5cbiAgaWYgKHByZXZUZXh0KSB7XG4gICAgcHJldlRleHQuZGF0YSA9IHByZXZUZXh0LmRhdGEucmVwbGFjZSgvICQvLCAnJyk7XG4gICAgaWYgKCFwcmV2VGV4dC5kYXRhKSB7XG4gICAgICByZW1vdmUocHJldlRleHQpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIHJlbW92ZShub2RlKSByZW1vdmVzIHRoZSBnaXZlbiBub2RlIGZyb20gdGhlIERPTSBhbmQgcmV0dXJucyB0aGVcbiAqIG5leHQgbm9kZSBpbiB0aGUgc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtOb2RlfSBub2RlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSAobm9kZSkge1xuICB2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmcgfHwgbm9kZS5wYXJlbnROb2RlO1xuXG4gIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcblxuICByZXR1cm4gbmV4dFxufVxuXG4vKipcbiAqIG5leHQocHJldiwgY3VycmVudCwgaXNQcmUpIHJldHVybnMgdGhlIG5leHQgbm9kZSBpbiB0aGUgc2VxdWVuY2UsIGdpdmVuIHRoZVxuICogY3VycmVudCBhbmQgcHJldmlvdXMgbm9kZXMuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBwcmV2XG4gKiBAcGFyYW0ge05vZGV9IGN1cnJlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGlzUHJlXG4gKiBAcmV0dXJuIHtOb2RlfVxuICovXG5mdW5jdGlvbiBuZXh0IChwcmV2LCBjdXJyZW50LCBpc1ByZSkge1xuICBpZiAoKHByZXYgJiYgcHJldi5wYXJlbnROb2RlID09PSBjdXJyZW50KSB8fCBpc1ByZShjdXJyZW50KSkge1xuICAgIHJldHVybiBjdXJyZW50Lm5leHRTaWJsaW5nIHx8IGN1cnJlbnQucGFyZW50Tm9kZVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnQuZmlyc3RDaGlsZCB8fCBjdXJyZW50Lm5leHRTaWJsaW5nIHx8IGN1cnJlbnQucGFyZW50Tm9kZVxufVxuXG4vKlxuICogU2V0IHVwIHdpbmRvdyBmb3IgTm9kZS5qc1xuICovXG5cbnZhciByb290ID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge30pO1xuXG4vKlxuICogUGFyc2luZyBIVE1MIHN0cmluZ3NcbiAqL1xuXG5mdW5jdGlvbiBjYW5QYXJzZUhUTUxOYXRpdmVseSAoKSB7XG4gIHZhciBQYXJzZXIgPSByb290LkRPTVBhcnNlcjtcbiAgdmFyIGNhblBhcnNlID0gZmFsc2U7XG5cbiAgLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzExMjkwMzFcbiAgLy8gRmlyZWZveC9PcGVyYS9JRSB0aHJvdyBlcnJvcnMgb24gdW5zdXBwb3J0ZWQgdHlwZXNcbiAgdHJ5IHtcbiAgICAvLyBXZWJLaXQgcmV0dXJucyBudWxsIG9uIHVuc3VwcG9ydGVkIHR5cGVzXG4gICAgaWYgKG5ldyBQYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoJycsICd0ZXh0L2h0bWwnKSkge1xuICAgICAgY2FuUGFyc2UgPSB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICByZXR1cm4gY2FuUGFyc2Vcbn1cblxuZnVuY3Rpb24gY3JlYXRlSFRNTFBhcnNlciAoKSB7XG4gIHZhciBQYXJzZXIgPSBmdW5jdGlvbiAoKSB7fTtcblxuICB7XG4gICAgaWYgKHNob3VsZFVzZUFjdGl2ZVgoKSkge1xuICAgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUZyb21TdHJpbmcgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHZhciBkb2MgPSBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gICAgICAgIGRvYy5kZXNpZ25Nb2RlID0gJ29uJzsgLy8gZGlzYWJsZSBvbi1wYWdlIHNjcmlwdHNcbiAgICAgICAgZG9jLm9wZW4oKTtcbiAgICAgICAgZG9jLndyaXRlKHN0cmluZyk7XG4gICAgICAgIGRvYy5jbG9zZSgpO1xuICAgICAgICByZXR1cm4gZG9jXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlRnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGRvYy5vcGVuKCk7XG4gICAgICAgIGRvYy53cml0ZShzdHJpbmcpO1xuICAgICAgICBkb2MuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIGRvY1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFBhcnNlclxufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VBY3RpdmVYICgpIHtcbiAgdmFyIHVzZUFjdGl2ZVggPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJycpLm9wZW4oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChyb290LkFjdGl2ZVhPYmplY3QpIHVzZUFjdGl2ZVggPSB0cnVlO1xuICB9XG4gIHJldHVybiB1c2VBY3RpdmVYXG59XG5cbnZhciBIVE1MUGFyc2VyID0gY2FuUGFyc2VIVE1MTmF0aXZlbHkoKSA/IHJvb3QuRE9NUGFyc2VyIDogY3JlYXRlSFRNTFBhcnNlcigpO1xuXG5mdW5jdGlvbiBSb290Tm9kZSAoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIGRvYyA9IGh0bWxQYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoXG4gICAgICAvLyBET00gcGFyc2VycyBhcnJhbmdlIGVsZW1lbnRzIGluIHRoZSA8aGVhZD4gYW5kIDxib2R5Pi5cbiAgICAgIC8vIFdyYXBwaW5nIGluIGEgY3VzdG9tIGVsZW1lbnQgZW5zdXJlcyBlbGVtZW50cyBhcmUgcmVsaWFibHkgYXJyYW5nZWQgaW5cbiAgICAgIC8vIGEgc2luZ2xlIGVsZW1lbnQuXG4gICAgICAnPHgtdHVybmRvd24gaWQ9XCJ0dXJuZG93bi1yb290XCI+JyArIGlucHV0ICsgJzwveC10dXJuZG93bj4nLFxuICAgICAgJ3RleHQvaHRtbCdcbiAgICApO1xuICAgIHJvb3QgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3R1cm5kb3duLXJvb3QnKTtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gaW5wdXQuY2xvbmVOb2RlKHRydWUpO1xuICB9XG4gIGNvbGxhcHNlV2hpdGVzcGFjZSh7XG4gICAgZWxlbWVudDogcm9vdCxcbiAgICBpc0Jsb2NrOiBpc0Jsb2NrLFxuICAgIGlzVm9pZDogaXNWb2lkLFxuICAgIGlzUHJlOiBvcHRpb25zLnByZWZvcm1hdHRlZENvZGUgPyBpc1ByZU9yQ29kZSA6IG51bGxcbiAgfSk7XG5cbiAgcmV0dXJuIHJvb3Rcbn1cblxudmFyIF9odG1sUGFyc2VyO1xuZnVuY3Rpb24gaHRtbFBhcnNlciAoKSB7XG4gIF9odG1sUGFyc2VyID0gX2h0bWxQYXJzZXIgfHwgbmV3IEhUTUxQYXJzZXIoKTtcbiAgcmV0dXJuIF9odG1sUGFyc2VyXG59XG5cbmZ1bmN0aW9uIGlzUHJlT3JDb2RlIChub2RlKSB7XG4gIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnUFJFJyB8fCBub2RlLm5vZGVOYW1lID09PSAnQ09ERSdcbn1cblxuZnVuY3Rpb24gTm9kZSAobm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlzQmxvY2sgPSBpc0Jsb2NrKG5vZGUpO1xuICBub2RlLmlzQ29kZSA9IG5vZGUubm9kZU5hbWUgPT09ICdDT0RFJyB8fCBub2RlLnBhcmVudE5vZGUuaXNDb2RlO1xuICBub2RlLmlzQmxhbmsgPSBpc0JsYW5rKG5vZGUpO1xuICBub2RlLmZsYW5raW5nV2hpdGVzcGFjZSA9IGZsYW5raW5nV2hpdGVzcGFjZShub2RlLCBvcHRpb25zKTtcbiAgcmV0dXJuIG5vZGVcbn1cblxuZnVuY3Rpb24gaXNCbGFuayAobm9kZSkge1xuICByZXR1cm4gKFxuICAgICFpc1ZvaWQobm9kZSkgJiZcbiAgICAhaXNNZWFuaW5nZnVsV2hlbkJsYW5rKG5vZGUpICYmXG4gICAgL15cXHMqJC9pLnRlc3Qobm9kZS50ZXh0Q29udGVudCkgJiZcbiAgICAhaGFzVm9pZChub2RlKSAmJlxuICAgICFoYXNNZWFuaW5nZnVsV2hlbkJsYW5rKG5vZGUpXG4gIClcbn1cblxuZnVuY3Rpb24gZmxhbmtpbmdXaGl0ZXNwYWNlIChub2RlLCBvcHRpb25zKSB7XG4gIGlmIChub2RlLmlzQmxvY2sgfHwgKG9wdGlvbnMucHJlZm9ybWF0dGVkQ29kZSAmJiBub2RlLmlzQ29kZSkpIHtcbiAgICByZXR1cm4geyBsZWFkaW5nOiAnJywgdHJhaWxpbmc6ICcnIH1cbiAgfVxuXG4gIHZhciBlZGdlcyA9IGVkZ2VXaGl0ZXNwYWNlKG5vZGUudGV4dENvbnRlbnQpO1xuXG4gIC8vIGFiYW5kb24gbGVhZGluZyBBU0NJSSBXUyBpZiBsZWZ0LWZsYW5rZWQgYnkgQVNDSUkgV1NcbiAgaWYgKGVkZ2VzLmxlYWRpbmdBc2NpaSAmJiBpc0ZsYW5rZWRCeVdoaXRlc3BhY2UoJ2xlZnQnLCBub2RlLCBvcHRpb25zKSkge1xuICAgIGVkZ2VzLmxlYWRpbmcgPSBlZGdlcy5sZWFkaW5nTm9uQXNjaWk7XG4gIH1cblxuICAvLyBhYmFuZG9uIHRyYWlsaW5nIEFTQ0lJIFdTIGlmIHJpZ2h0LWZsYW5rZWQgYnkgQVNDSUkgV1NcbiAgaWYgKGVkZ2VzLnRyYWlsaW5nQXNjaWkgJiYgaXNGbGFua2VkQnlXaGl0ZXNwYWNlKCdyaWdodCcsIG5vZGUsIG9wdGlvbnMpKSB7XG4gICAgZWRnZXMudHJhaWxpbmcgPSBlZGdlcy50cmFpbGluZ05vbkFzY2lpO1xuICB9XG5cbiAgcmV0dXJuIHsgbGVhZGluZzogZWRnZXMubGVhZGluZywgdHJhaWxpbmc6IGVkZ2VzLnRyYWlsaW5nIH1cbn1cblxuZnVuY3Rpb24gZWRnZVdoaXRlc3BhY2UgKHN0cmluZykge1xuICB2YXIgbSA9IHN0cmluZy5tYXRjaCgvXigoWyBcXHRcXHJcXG5dKikoXFxzKikpKD86KD89XFxTKVtcXHNcXFNdKlxcUyk/KChcXHMqPykoWyBcXHRcXHJcXG5dKikpJC8pO1xuICByZXR1cm4ge1xuICAgIGxlYWRpbmc6IG1bMV0sIC8vIHdob2xlIHN0cmluZyBmb3Igd2hpdGVzcGFjZS1vbmx5IHN0cmluZ3NcbiAgICBsZWFkaW5nQXNjaWk6IG1bMl0sXG4gICAgbGVhZGluZ05vbkFzY2lpOiBtWzNdLFxuICAgIHRyYWlsaW5nOiBtWzRdLCAvLyBlbXB0eSBmb3Igd2hpdGVzcGFjZS1vbmx5IHN0cmluZ3NcbiAgICB0cmFpbGluZ05vbkFzY2lpOiBtWzVdLFxuICAgIHRyYWlsaW5nQXNjaWk6IG1bNl1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0ZsYW5rZWRCeVdoaXRlc3BhY2UgKHNpZGUsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdmFyIHNpYmxpbmc7XG4gIHZhciByZWdFeHA7XG4gIHZhciBpc0ZsYW5rZWQ7XG5cbiAgaWYgKHNpZGUgPT09ICdsZWZ0Jykge1xuICAgIHNpYmxpbmcgPSBub2RlLnByZXZpb3VzU2libGluZztcbiAgICByZWdFeHAgPSAvICQvO1xuICB9IGVsc2Uge1xuICAgIHNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgIHJlZ0V4cCA9IC9eIC87XG4gIH1cblxuICBpZiAoc2libGluZykge1xuICAgIGlmIChzaWJsaW5nLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICBpc0ZsYW5rZWQgPSByZWdFeHAudGVzdChzaWJsaW5nLm5vZGVWYWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnByZWZvcm1hdHRlZENvZGUgJiYgc2libGluZy5ub2RlTmFtZSA9PT0gJ0NPREUnKSB7XG4gICAgICBpc0ZsYW5rZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHNpYmxpbmcubm9kZVR5cGUgPT09IDEgJiYgIWlzQmxvY2soc2libGluZykpIHtcbiAgICAgIGlzRmxhbmtlZCA9IHJlZ0V4cC50ZXN0KHNpYmxpbmcudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNGbGFua2VkXG59XG5cbnZhciByZWR1Y2UgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlO1xudmFyIGVzY2FwZXMgPSBbXG4gIFsvXFxcXC9nLCAnXFxcXFxcXFwnXSxcbiAgWy9cXCovZywgJ1xcXFwqJ10sXG4gIFsvXi0vZywgJ1xcXFwtJ10sXG4gIFsvXlxcKyAvZywgJ1xcXFwrICddLFxuICBbL14oPSspL2csICdcXFxcJDEnXSxcbiAgWy9eKCN7MSw2fSkgL2csICdcXFxcJDEgJ10sXG4gIFsvYC9nLCAnXFxcXGAnXSxcbiAgWy9efn5+L2csICdcXFxcfn5+J10sXG4gIFsvXFxbL2csICdcXFxcWyddLFxuICBbL1xcXS9nLCAnXFxcXF0nXSxcbiAgWy9ePi9nLCAnXFxcXD4nXSxcbiAgWy9fL2csICdcXFxcXyddLFxuICBbL14oXFxkKylcXC4gL2csICckMVxcXFwuICddXG5dO1xuXG5mdW5jdGlvbiBUdXJuZG93blNlcnZpY2UgKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFR1cm5kb3duU2VydmljZSkpIHJldHVybiBuZXcgVHVybmRvd25TZXJ2aWNlKG9wdGlvbnMpXG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHJ1bGVzOiBydWxlcyxcbiAgICBoZWFkaW5nU3R5bGU6ICdzZXRleHQnLFxuICAgIGhyOiAnKiAqIConLFxuICAgIGJ1bGxldExpc3RNYXJrZXI6ICcqJyxcbiAgICBjb2RlQmxvY2tTdHlsZTogJ2luZGVudGVkJyxcbiAgICBmZW5jZTogJ2BgYCcsXG4gICAgZW1EZWxpbWl0ZXI6ICdfJyxcbiAgICBzdHJvbmdEZWxpbWl0ZXI6ICcqKicsXG4gICAgbGlua1N0eWxlOiAnaW5saW5lZCcsXG4gICAgbGlua1JlZmVyZW5jZVN0eWxlOiAnZnVsbCcsXG4gICAgYnI6ICcgICcsXG4gICAgcHJlZm9ybWF0dGVkQ29kZTogZmFsc2UsXG4gICAgYmxhbmtSZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmlzQmxvY2sgPyAnXFxuXFxuJyA6ICcnXG4gICAgfSxcbiAgICBrZWVwUmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Jsb2NrID8gJ1xcblxcbicgKyBub2RlLm91dGVySFRNTCArICdcXG5cXG4nIDogbm9kZS5vdXRlckhUTUxcbiAgICB9LFxuICAgIGRlZmF1bHRSZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmlzQmxvY2sgPyAnXFxuXFxuJyArIGNvbnRlbnQgKyAnXFxuXFxuJyA6IGNvbnRlbnRcbiAgICB9XG4gIH07XG4gIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICB0aGlzLnJ1bGVzID0gbmV3IFJ1bGVzKHRoaXMub3B0aW9ucyk7XG59XG5cblR1cm5kb3duU2VydmljZS5wcm90b3R5cGUgPSB7XG4gIC8qKlxuICAgKiBUaGUgZW50cnkgcG9pbnQgZm9yIGNvbnZlcnRpbmcgYSBzdHJpbmcgb3IgRE9NIG5vZGUgdG8gTWFya2Rvd25cbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gaW5wdXQgVGhlIHN0cmluZyBvciBET00gbm9kZSB0byBjb252ZXJ0XG4gICAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIGlucHV0XG4gICAqIEB0eXBlIFN0cmluZ1xuICAgKi9cblxuICB0dXJuZG93bjogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKCFjYW5Db252ZXJ0KGlucHV0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgaW5wdXQgKyAnIGlzIG5vdCBhIHN0cmluZywgb3IgYW4gZWxlbWVudC9kb2N1bWVudC9mcmFnbWVudCBub2RlLidcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoaW5wdXQgPT09ICcnKSByZXR1cm4gJydcblxuICAgIHZhciBvdXRwdXQgPSBwcm9jZXNzLmNhbGwodGhpcywgbmV3IFJvb3ROb2RlKGlucHV0LCB0aGlzLm9wdGlvbnMpKTtcbiAgICByZXR1cm4gcG9zdFByb2Nlc3MuY2FsbCh0aGlzLCBvdXRwdXQpXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZCBvbmUgb3IgbW9yZSBwbHVnaW5zXG4gICAqIEBwdWJsaWNcbiAgICogQHBhcmFtIHtGdW5jdGlvbnxBcnJheX0gcGx1Z2luIFRoZSBwbHVnaW4gb3IgYXJyYXkgb2YgcGx1Z2lucyB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIFR1cm5kb3duIGluc3RhbmNlIGZvciBjaGFpbmluZ1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG5cbiAgdXNlOiBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbHVnaW4ubGVuZ3RoOyBpKyspIHRoaXMudXNlKHBsdWdpbltpXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4odGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BsdWdpbiBtdXN0IGJlIGEgRnVuY3Rpb24gb3IgYW4gQXJyYXkgb2YgRnVuY3Rpb25zJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIHJ1bGVcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBydWxlIFRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIGFkZFJ1bGU6IGZ1bmN0aW9uIChrZXksIHJ1bGUpIHtcbiAgICB0aGlzLnJ1bGVzLmFkZChrZXksIHJ1bGUpO1xuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgLyoqXG4gICAqIEtlZXAgYSBub2RlIChhcyBIVE1MKSB0aGF0IG1hdGNoZXMgdGhlIGZpbHRlclxuICAgKiBAcHVibGljXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fEZ1bmN0aW9ufSBmaWx0ZXIgVGhlIHVuaXF1ZSBrZXkgb2YgdGhlIHJ1bGVcbiAgICogQHJldHVybnMgVGhlIFR1cm5kb3duIGluc3RhbmNlIGZvciBjaGFpbmluZ1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG5cbiAga2VlcDogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIHRoaXMucnVsZXMua2VlcChmaWx0ZXIpO1xuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIG5vZGUgdGhhdCBtYXRjaGVzIHRoZSBmaWx0ZXJcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheXxGdW5jdGlvbn0gZmlsdGVyIFRoZSB1bmlxdWUga2V5IG9mIHRoZSBydWxlXG4gICAqIEByZXR1cm5zIFRoZSBUdXJuZG93biBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuXG4gIHJlbW92ZTogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgIHRoaXMucnVsZXMucmVtb3ZlKGZpbHRlcik7XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICAvKipcbiAgICogRXNjYXBlcyBNYXJrZG93biBzeW50YXhcbiAgICogQHB1YmxpY1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZXNjYXBlXG4gICAqIEByZXR1cm5zIEEgc3RyaW5nIHdpdGggTWFya2Rvd24gc3ludGF4IGVzY2FwZWRcbiAgICogQHR5cGUgU3RyaW5nXG4gICAqL1xuXG4gIGVzY2FwZTogZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHJldHVybiBlc2NhcGVzLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGVzY2FwZSkge1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yLnJlcGxhY2UoZXNjYXBlWzBdLCBlc2NhcGVbMV0pXG4gICAgfSwgc3RyaW5nKVxuICB9XG59O1xuXG4vKipcbiAqIFJlZHVjZXMgYSBET00gbm9kZSBkb3duIHRvIGl0cyBNYXJrZG93biBzdHJpbmcgZXF1aXZhbGVudFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudE5vZGUgVGhlIG5vZGUgdG8gY29udmVydFxuICogQHJldHVybnMgQSBNYXJrZG93biByZXByZXNlbnRhdGlvbiBvZiB0aGUgbm9kZVxuICogQHR5cGUgU3RyaW5nXG4gKi9cblxuZnVuY3Rpb24gcHJvY2VzcyAocGFyZW50Tm9kZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJldHVybiByZWR1Y2UuY2FsbChwYXJlbnROb2RlLmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChvdXRwdXQsIG5vZGUpIHtcbiAgICBub2RlID0gbmV3IE5vZGUobm9kZSwgc2VsZi5vcHRpb25zKTtcblxuICAgIHZhciByZXBsYWNlbWVudCA9ICcnO1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICByZXBsYWNlbWVudCA9IG5vZGUuaXNDb2RlID8gbm9kZS5ub2RlVmFsdWUgOiBzZWxmLmVzY2FwZShub2RlLm5vZGVWYWx1ZSk7XG4gICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICByZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50Rm9yTm9kZS5jYWxsKHNlbGYsIG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBqb2luKG91dHB1dCwgcmVwbGFjZW1lbnQpXG4gIH0sICcnKVxufVxuXG4vKipcbiAqIEFwcGVuZHMgc3RyaW5ncyBhcyBlYWNoIHJ1bGUgcmVxdWlyZXMgYW5kIHRyaW1zIHRoZSBvdXRwdXRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3V0cHV0IFRoZSBjb252ZXJzaW9uIG91dHB1dFxuICogQHJldHVybnMgQSB0cmltbWVkIHZlcnNpb24gb2YgdGhlIG91cHV0XG4gKiBAdHlwZSBTdHJpbmdcbiAqL1xuXG5mdW5jdGlvbiBwb3N0UHJvY2VzcyAob3V0cHV0KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5ydWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgaWYgKHR5cGVvZiBydWxlLmFwcGVuZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3V0cHV0ID0gam9pbihvdXRwdXQsIHJ1bGUuYXBwZW5kKHNlbGYub3B0aW9ucykpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIG91dHB1dC5yZXBsYWNlKC9eW1xcdFxcclxcbl0rLywgJycpLnJlcGxhY2UoL1tcXHRcXHJcXG5cXHNdKyQvLCAnJylcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBlbGVtZW50IG5vZGUgdG8gaXRzIE1hcmtkb3duIGVxdWl2YWxlbnRcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlIFRoZSBub2RlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIEEgTWFya2Rvd24gcmVwcmVzZW50YXRpb24gb2YgdGhlIG5vZGVcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIHJlcGxhY2VtZW50Rm9yTm9kZSAobm9kZSkge1xuICB2YXIgcnVsZSA9IHRoaXMucnVsZXMuZm9yTm9kZShub2RlKTtcbiAgdmFyIGNvbnRlbnQgPSBwcm9jZXNzLmNhbGwodGhpcywgbm9kZSk7XG4gIHZhciB3aGl0ZXNwYWNlID0gbm9kZS5mbGFua2luZ1doaXRlc3BhY2U7XG4gIGlmICh3aGl0ZXNwYWNlLmxlYWRpbmcgfHwgd2hpdGVzcGFjZS50cmFpbGluZykgY29udGVudCA9IGNvbnRlbnQudHJpbSgpO1xuICByZXR1cm4gKFxuICAgIHdoaXRlc3BhY2UubGVhZGluZyArXG4gICAgcnVsZS5yZXBsYWNlbWVudChjb250ZW50LCBub2RlLCB0aGlzLm9wdGlvbnMpICtcbiAgICB3aGl0ZXNwYWNlLnRyYWlsaW5nXG4gIClcbn1cblxuLyoqXG4gKiBKb2lucyByZXBsYWNlbWVudCB0byB0aGUgY3VycmVudCBvdXRwdXQgd2l0aCBhcHByb3ByaWF0ZSBudW1iZXIgb2YgbmV3IGxpbmVzXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IG91dHB1dCBUaGUgY3VycmVudCBjb252ZXJzaW9uIG91dHB1dFxuICogQHBhcmFtIHtTdHJpbmd9IHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gYXBwZW5kIHRvIHRoZSBvdXRwdXRcbiAqIEByZXR1cm5zIEpvaW5lZCBvdXRwdXRcbiAqIEB0eXBlIFN0cmluZ1xuICovXG5cbmZ1bmN0aW9uIGpvaW4gKG91dHB1dCwgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHMxID0gdHJpbVRyYWlsaW5nTmV3bGluZXMob3V0cHV0KTtcbiAgdmFyIHMyID0gdHJpbUxlYWRpbmdOZXdsaW5lcyhyZXBsYWNlbWVudCk7XG4gIHZhciBubHMgPSBNYXRoLm1heChvdXRwdXQubGVuZ3RoIC0gczEubGVuZ3RoLCByZXBsYWNlbWVudC5sZW5ndGggLSBzMi5sZW5ndGgpO1xuICB2YXIgc2VwYXJhdG9yID0gJ1xcblxcbicuc3Vic3RyaW5nKDAsIG5scyk7XG5cbiAgcmV0dXJuIHMxICsgc2VwYXJhdG9yICsgczJcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gaW5wdXQgY2FuIGJlIGNvbnZlcnRlZFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBpbnB1dCBEZXNjcmliZSB0aGlzIHBhcmFtZXRlclxuICogQHJldHVybnMgRGVzY3JpYmUgd2hhdCBpdCByZXR1cm5zXG4gKiBAdHlwZSBTdHJpbmd8T2JqZWN0fEFycmF5fEJvb2xlYW58TnVtYmVyXG4gKi9cblxuZnVuY3Rpb24gY2FuQ29udmVydCAoaW5wdXQpIHtcbiAgcmV0dXJuIChcbiAgICBpbnB1dCAhPSBudWxsICYmIChcbiAgICAgIHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHxcbiAgICAgIChpbnB1dC5ub2RlVHlwZSAmJiAoXG4gICAgICAgIGlucHV0Lm5vZGVUeXBlID09PSAxIHx8IGlucHV0Lm5vZGVUeXBlID09PSA5IHx8IGlucHV0Lm5vZGVUeXBlID09PSAxMVxuICAgICAgKSlcbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVybmRvd25TZXJ2aWNlO1xuIiwgInZhciBoaWdobGlnaHRSZWdFeHAgPSAvaGlnaGxpZ2h0LSg/Oig/OnRleHR8c291cmNlKS0pPyhbYS16MC05XSspL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoaWdobGlnaHRlZENvZGVCbG9jayAodHVybmRvd25TZXJ2aWNlKSB7XG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdoaWdobGlnaHRlZENvZGVCbG9jaycsIHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgZmlyc3RDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0RJVicgJiZcbiAgICAgICAgaGlnaGxpZ2h0UmVnRXhwLnRlc3Qobm9kZS5jbGFzc05hbWUpICYmXG4gICAgICAgIGZpcnN0Q2hpbGQgJiZcbiAgICAgICAgZmlyc3RDaGlsZC5ub2RlTmFtZSA9PT0gJ1BSRSdcbiAgICAgIClcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSwgb3B0aW9ucykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IG5vZGUuY2xhc3NOYW1lIHx8ICcnXG4gICAgICB2YXIgbGFuZ3VhZ2UgPSAoY2xhc3NOYW1lLm1hdGNoKGhpZ2hsaWdodFJlZ0V4cCkgfHwgW251bGwsICcnXSlbMV1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgJ1xcblxcbicgKyBvcHRpb25zLmZlbmNlICsgbGFuZ3VhZ2UgKyAnXFxuJyArXG4gICAgICAgIG5vZGUuZmlyc3RDaGlsZC50ZXh0Q29udGVudCArXG4gICAgICAgICdcXG4nICsgb3B0aW9ucy5mZW5jZSArICdcXG5cXG4nXG4gICAgICApXG4gICAgfVxuICB9KVxufVxuIiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlrZXRocm91Z2ggKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnc3RyaWtldGhyb3VnaCcsIHtcbiAgICBmaWx0ZXI6IFsnZGVsJywgJ3MnLCAnc3RyaWtlJ10sXG4gICAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICByZXR1cm4gJ35+JyArIGNvbnRlbnQgKyAnfn4nXG4gICAgfVxuICB9KVxufVxuIiwgInZhciBydWxlcyA9IHt9XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBzYWZlbHkgZ2V0IHRleHQgY29udGVudCBhbmQgY2xlYW4gaXRcbmZ1bmN0aW9uIGNsZWFuQ2VsbENvbnRlbnQoY29udGVudCkge1xuICBpZiAoIWNvbnRlbnQpIHJldHVybiAnICAgJyAvLyBEZWZhdWx0IGVtcHR5IGNlbGwgY29udGVudFxuICBcbiAgLy8gQ2xlYW4gYW5kIG5vcm1hbGl6ZSBjb250ZW50XG4gIGxldCBjbGVhbmVkID0gY29udGVudFxuICAgIC50cmltKClcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpIC8vIE5vcm1hbGl6ZSB3aGl0ZXNwYWNlXG4gICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKSAvLyBFc2NhcGUgcGlwZXNcbiAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKSAvLyBFc2NhcGUgYmFja3NsYXNoZXNcbiAgICAucmVwbGFjZSgvXFxuKy9nLCAnICcpIC8vIENvbnZlcnQgbmV3bGluZXMgdG8gc3BhY2VzXG4gICAgLnJlcGxhY2UoL1xccisvZywgJyAnKSAvLyBDb252ZXJ0IGNhcnJpYWdlIHJldHVybnMgdG8gc3BhY2VzXG4gIFxuICAvLyBJZiBjb250ZW50IGlzIHN0aWxsIGVtcHR5IG9yIG9ubHkgd2hpdGVzcGFjZSwgcHJvdmlkZSBkZWZhdWx0XG4gIGlmICghY2xlYW5lZCB8fCBjbGVhbmVkLm1hdGNoKC9eXFxzKiQvKSkge1xuICAgIHJldHVybiAnICAgJ1xuICB9XG4gIFxuICAvLyBFbnN1cmUgbWluaW11bSB3aWR0aCBmb3IgdGFibGUgcmVhZGFiaWxpdHlcbiAgaWYgKGNsZWFuZWQubGVuZ3RoIDwgMykge1xuICAgIGNsZWFuZWQgKz0gJyAnLnJlcGVhdCgzIC0gY2xlYW5lZC5sZW5ndGgpXG4gIH1cbiAgXG4gIHJldHVybiBjbGVhbmVkXG59XG5cbi8vIEVuaGFuY2VkIGNlbGwgcmVwbGFjZW1lbnQgd2l0aCBjb2xzcGFuIHN1cHBvcnRcbmZ1bmN0aW9uIGNlbGwoY29udGVudCwgbm9kZSwgaW5kZXgpIHtcbiAgaWYgKGluZGV4ID09PSBudWxsICYmIG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKG5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBub2RlKVxuICB9XG4gIGlmIChpbmRleCA9PT0gbnVsbCkgaW5kZXggPSAwXG4gIFxuICB2YXIgcHJlZml4ID0gJyAnXG4gIGlmIChpbmRleCA9PT0gMCkgcHJlZml4ID0gJ3wgJ1xuICBcbiAgbGV0IGNlbGxDb250ZW50ID0gY2xlYW5DZWxsQ29udGVudChjb250ZW50KVxuICBcbiAgLy8gSGFuZGxlIGNvbHNwYW4gYnkgYWRkaW5nIGV4dHJhIGVtcHR5IGNlbGxzXG4gIGxldCBjb2xzcGFuID0gMVxuICBpZiAobm9kZSAmJiBub2RlLmdldEF0dHJpYnV0ZSkge1xuICAgIGNvbHNwYW4gPSBwYXJzZUludChub2RlLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpIHx8ICcxJywgMTApXG4gICAgaWYgKGlzTmFOKGNvbHNwYW4pIHx8IGNvbHNwYW4gPCAxKSBjb2xzcGFuID0gMVxuICB9XG4gIFxuICBsZXQgcmVzdWx0ID0gcHJlZml4ICsgY2VsbENvbnRlbnQgKyAnIHwnXG4gIFxuICAvLyBBZGQgZW1wdHkgY2VsbHMgZm9yIGNvbHNwYW5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb2xzcGFuOyBpKyspIHtcbiAgICByZXN1bHQgKz0gJyAgIHwnXG4gIH1cbiAgXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gQ2hlY2sgaWYgdGhpcyBpcyBhIGhlYWRpbmcgcm93IChlbmhhbmNlZCBmb3IgZWRnZSBjYXNlcylcbmZ1bmN0aW9uIGlzSGVhZGluZ1Jvdyh0cikge1xuICBpZiAoIXRyIHx8ICF0ci5wYXJlbnROb2RlKSByZXR1cm4gZmFsc2VcbiAgXG4gIHZhciBwYXJlbnROb2RlID0gdHIucGFyZW50Tm9kZVxuICBcbiAgLy8gQ2hlY2sgaWYgcGFyZW50IGlzIFRIRUFEXG4gIGlmIChwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnVEhFQUQnKSByZXR1cm4gdHJ1ZVxuICBcbiAgLy8gQ2hlY2sgaWYgaXQncyB0aGUgZmlyc3Qgcm93IGFuZCBjb250YWlucyBUSCBlbGVtZW50c1xuICBpZiAocGFyZW50Tm9kZS5maXJzdENoaWxkID09PSB0ciAmJiBcbiAgICAgIChwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnVEFCTEUnIHx8IHBhcmVudE5vZGUubm9kZU5hbWUgPT09ICdUQk9EWScpKSB7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgYWxsIGNoaWxkIG5vZGVzIGFyZSBUSCAoaWdub3JlIHRleHQgbm9kZXMpXG4gICAgdmFyIGNlbGxOb2RlcyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbCh0ci5jaGlsZE5vZGVzLCBmdW5jdGlvbihuKSB7XG4gICAgICByZXR1cm4gbi5ub2RlVHlwZSA9PT0gMSAvLyBFbGVtZW50IG5vZGVzIG9ubHlcbiAgICB9KVxuICAgIFxuICAgIGlmIChjZWxsTm9kZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2VcbiAgICBcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwoY2VsbE5vZGVzLCBmdW5jdGlvbiAobikgeyBcbiAgICAgIHJldHVybiBuLm5vZGVOYW1lID09PSAnVEgnIFxuICAgIH0pXG4gIH1cbiAgXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyBHZXQgdGFibGUgY29sdW1uIGNvdW50IChoYW5kbGVzIGVkZ2UgY2FzZXMpXG5mdW5jdGlvbiBnZXRUYWJsZUNvbENvdW50KHRhYmxlKSB7XG4gIGlmICghdGFibGUgfHwgIXRhYmxlLnJvd3MpIHJldHVybiAwXG4gIFxuICBsZXQgbWF4Q29scyA9IDBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gdGFibGUucm93c1tpXVxuICAgIGlmICghcm93IHx8ICFyb3cuY2hpbGROb2RlcykgY29udGludWVcbiAgICBcbiAgICBsZXQgY29sQ291bnQgPSAwXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3cuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHJvdy5jaGlsZE5vZGVzW2pdXG4gICAgICBpZiAoY2VsbC5ub2RlVHlwZSA9PT0gMSAmJiAoY2VsbC5ub2RlTmFtZSA9PT0gJ1REJyB8fCBjZWxsLm5vZGVOYW1lID09PSAnVEgnKSkge1xuICAgICAgICBjb25zdCBjb2xzcGFuID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSB8fCAnMScsIDEwKVxuICAgICAgICBjb2xDb3VudCArPSBpc05hTihjb2xzcGFuKSA/IDEgOiBNYXRoLm1heCgxLCBjb2xzcGFuKVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAoY29sQ291bnQgPiBtYXhDb2xzKSBtYXhDb2xzID0gY29sQ291bnRcbiAgfVxuICBcbiAgcmV0dXJuIG1heENvbHNcbn1cblxuLy8gQ2hlY2sgaWYgdGFibGUgc2hvdWxkIGJlIHNraXBwZWQgKHRvbyBzaW1wbGUgb3IgbWFsZm9ybWVkKVxuZnVuY3Rpb24gc2hvdWxkU2tpcFRhYmxlKHRhYmxlKSB7XG4gIGlmICghdGFibGUpIHJldHVybiB0cnVlXG4gIFxuICAvLyBTa2lwIGNvbXBsZXRlbHkgZW1wdHkgdGFibGVzXG4gIGlmICghdGFibGUucm93cyB8fCB0YWJsZS5yb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWVcbiAgXG4gIC8vIENvdW50IGFjdHVhbCBjb250ZW50IGNlbGxzXG4gIGxldCBjb250ZW50Q2VsbHMgPSAwXG4gIGxldCB0b3RhbENlbGxzID0gMFxuICBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJsZS5yb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gdGFibGUucm93c1tpXVxuICAgIGlmICghcm93IHx8ICFyb3cuY2hpbGROb2RlcykgY29udGludWVcbiAgICBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJvdy5jaGlsZE5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gcm93LmNoaWxkTm9kZXNbal1cbiAgICAgIGlmIChjZWxsLm5vZGVUeXBlID09PSAxICYmIChjZWxsLm5vZGVOYW1lID09PSAnVEQnIHx8IGNlbGwubm9kZU5hbWUgPT09ICdUSCcpKSB7XG4gICAgICAgIHRvdGFsQ2VsbHMrK1xuICAgICAgICBpZiAoY2VsbC50ZXh0Q29udGVudCAmJiBjZWxsLnRleHRDb250ZW50LnRyaW0oKSkge1xuICAgICAgICAgIGNvbnRlbnRDZWxscysrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNraXAgaWYgbm8gY2VsbHMgb3Igb25seSBvbmUgY2VsbCB3aXRoIG5vIG1lYW5pbmdmdWwgY29udGVudFxuICBpZiAodG90YWxDZWxscyA9PT0gMCkgcmV0dXJuIHRydWVcbiAgaWYgKHRvdGFsQ2VsbHMgPT09IDEgJiYgY29udGVudENlbGxzID09PSAwKSByZXR1cm4gdHJ1ZVxuICBcbiAgcmV0dXJuIGZhbHNlXG59XG5cbnJ1bGVzLnRhYmxlQ2VsbCA9IHtcbiAgZmlsdGVyOiBbJ3RoJywgJ3RkJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIHJldHVybiBjZWxsKGNvbnRlbnQsIG5vZGUsIG51bGwpXG4gIH1cbn1cblxucnVsZXMudGFibGVSb3cgPSB7XG4gIGZpbHRlcjogJ3RyJyxcbiAgcmVwbGFjZW1lbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBub2RlKSB7XG4gICAgLy8gU2tpcCBlbXB0eSByb3dzXG4gICAgaWYgKCFjb250ZW50IHx8ICFjb250ZW50LnRyaW0oKSkgcmV0dXJuICcnXG4gICAgXG4gICAgdmFyIGJvcmRlckNlbGxzID0gJydcbiAgICBcbiAgICAvLyBBZGQgc2VwYXJhdG9yIHJvdyBmb3IgaGVhZGluZ1xuICAgIGlmIChpc0hlYWRpbmdSb3cobm9kZSkpIHtcbiAgICAgIGNvbnN0IHRhYmxlID0gbm9kZS5jbG9zZXN0KCd0YWJsZScpXG4gICAgICBpZiAodGFibGUpIHtcbiAgICAgICAgY29uc3QgY29sQ291bnQgPSBnZXRUYWJsZUNvbENvdW50KHRhYmxlKVxuICAgICAgICBcbiAgICAgICAgaWYgKGNvbENvdW50ID4gMCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gaSA9PT0gMCA/ICd8ICcgOiAnICdcbiAgICAgICAgICAgIGJvcmRlckNlbGxzICs9IHByZWZpeCArICctLS0nICsgJyB8J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gJ1xcbicgKyBjb250ZW50ICsgKGJvcmRlckNlbGxzID8gJ1xcbicgKyBib3JkZXJDZWxscyA6ICcnKVxuICB9XG59XG5cbnJ1bGVzLnRhYmxlID0ge1xuICBmaWx0ZXI6ICd0YWJsZScsXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbiAoY29udGVudCwgbm9kZSkge1xuICAgIC8vIENoZWNrIGlmIHRhYmxlIHNob3VsZCBiZSBza2lwcGVkXG4gICAgaWYgKHNob3VsZFNraXBUYWJsZShub2RlKSkge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICAgIFxuICAgIC8vIENsZWFuIHVwIGNvbnRlbnQgKHJlbW92ZSBleHRyYSBuZXdsaW5lcylcbiAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4rL2csICdcXG4nKS50cmltKClcbiAgICBcbiAgICAvLyBJZiBubyBjb250ZW50IGFmdGVyIGNsZWFuaW5nLCByZXR1cm4gZW1wdHlcbiAgICBpZiAoIWNvbnRlbnQpIHJldHVybiAnJ1xuICAgIFxuICAgIC8vIFNwbGl0IGludG8gbGluZXMgYW5kIGZpbHRlciBvdXQgZW1wdHkgbGluZXNcbiAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpLmZpbHRlcihsaW5lID0+IGxpbmUudHJpbSgpKVxuICAgIFxuICAgIGlmIChsaW5lcy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIFxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gYWRkIGEgaGVhZGVyIHJvd1xuICAgIGNvbnN0IGhhc0hlYWRlclNlcGFyYXRvciA9IGxpbmVzLmxlbmd0aCA+PSAyICYmIC9cXHxcXHMqLSsvLnRlc3QobGluZXNbMV0pXG4gICAgXG4gICAgbGV0IHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpXG4gICAgXG4gICAgLy8gSWYgbm8gaGVhZGVyIHNlcGFyYXRvciBleGlzdHMsIGFkZCBhIHNpbXBsZSBvbmVcbiAgICBpZiAoIWhhc0hlYWRlclNlcGFyYXRvciAmJiBsaW5lcy5sZW5ndGggPj0gMSkge1xuICAgICAgY29uc3QgZmlyc3RMaW5lID0gbGluZXNbMF1cbiAgICAgIGNvbnN0IGNvbENvdW50ID0gKGZpcnN0TGluZS5tYXRjaCgvXFx8L2cpIHx8IFtdKS5sZW5ndGggLSAxXG4gICAgICBcbiAgICAgIGlmIChjb2xDb3VudCA+IDApIHtcbiAgICAgICAgbGV0IHNlcGFyYXRvciA9ICd8J1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbENvdW50OyBpKyspIHtcbiAgICAgICAgICBzZXBhcmF0b3IgKz0gJyAtLS0gfCdcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gSW5zZXJ0IHNlcGFyYXRvciBhZnRlciBmaXJzdCBsaW5lXG4gICAgICAgIGNvbnN0IHJlc3VsdExpbmVzID0gW2xpbmVzWzBdLCBzZXBhcmF0b3IsIC4uLmxpbmVzLnNsaWNlKDEpXVxuICAgICAgICByZXN1bHQgPSByZXN1bHRMaW5lcy5qb2luKCdcXG4nKVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gJ1xcblxcbicgKyByZXN1bHQgKyAnXFxuXFxuJ1xuICB9XG59XG5cbi8vIFJlbW92ZSB0YWJsZSBzZWN0aW9ucyBidXQga2VlcCBjb250ZW50XG5ydWxlcy50YWJsZVNlY3Rpb24gPSB7XG4gIGZpbHRlcjogWyd0aGVhZCcsICd0Ym9keScsICd0Zm9vdCddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudFxuICB9XG59XG5cbi8vIFJlbW92ZSBjYXB0aW9ucyBhbmQgY29sZ3JvdXBzXG5ydWxlcy50YWJsZUNhcHRpb24gPSB7XG4gIGZpbHRlcjogWydjYXB0aW9uJ10sXG4gIHJlcGxhY2VtZW50OiBmdW5jdGlvbigpIHsgcmV0dXJuICcnIH1cbn1cblxucnVsZXMudGFibGVDb2xncm91cCA9IHtcbiAgZmlsdGVyOiBbJ2NvbGdyb3VwJywgJ2NvbCddLFxuICByZXBsYWNlbWVudDogZnVuY3Rpb24oKSB7IHJldHVybiAnJyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRhYmxlcyh0dXJuZG93blNlcnZpY2UpIHtcbiAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoa2V5LCBydWxlc1trZXldKVxuICB9XG59XG4iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFza0xpc3RJdGVtcyAodHVybmRvd25TZXJ2aWNlKSB7XG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCd0YXNrTGlzdEl0ZW1zJywge1xuICAgIGZpbHRlcjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLnR5cGUgPT09ICdjaGVja2JveCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnTEknXG4gICAgfSxcbiAgICByZXBsYWNlbWVudDogZnVuY3Rpb24gKGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIHJldHVybiAobm9kZS5jaGVja2VkID8gJ1t4XScgOiAnWyBdJykgKyAnICdcbiAgICB9XG4gIH0pXG59XG4iLCAiaW1wb3J0IGhpZ2hsaWdodGVkQ29kZUJsb2NrIGZyb20gJy4vaGlnaGxpZ2h0ZWQtY29kZS1ibG9jay5qcydcbmltcG9ydCBzdHJpa2V0aHJvdWdoIGZyb20gJy4vc3RyaWtldGhyb3VnaC5qcydcbmltcG9ydCB0YWJsZXMgZnJvbSAnLi90YWJsZXMuanMnXG5pbXBvcnQgdGFza0xpc3RJdGVtcyBmcm9tICcuL3Rhc2stbGlzdC1pdGVtcy5qcydcblxuZnVuY3Rpb24gZ2ZtICh0dXJuZG93blNlcnZpY2UpIHtcbiAgdHVybmRvd25TZXJ2aWNlLnVzZShbXG4gICAgaGlnaGxpZ2h0ZWRDb2RlQmxvY2ssXG4gICAgc3RyaWtldGhyb3VnaCxcbiAgICB0YWJsZXMsXG4gICAgdGFza0xpc3RJdGVtc1xuICBdKVxufVxuXG5leHBvcnQgeyBnZm0sIGhpZ2hsaWdodGVkQ29kZUJsb2NrLCBzdHJpa2V0aHJvdWdoLCB0YWJsZXMsIHRhc2tMaXN0SXRlbXMgfVxuZXhwb3J0IGRlZmF1bHQgZ2ZtICIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBQYW5lbCBNYWNyb3NcbiAqIENvbnZlcnRzIGluZm8vd2FybmluZy9ub3RlL3RpcCBwYW5lbHMgdG8gYmxvY2txdW90ZSBmb3JtYXQuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlUGFuZWxzUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVBhbmVsJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ0RJVicpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IGNsID0gbm9kZS5jbGFzc0xpc3Q7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNybycpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdwYW5lbCcpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLWluZm9ybWF0aW9uJykgfHxcbiAgICAgICAgY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8td2FybmluZycpIHx8XG4gICAgICAgIGNsLmNvbnRhaW5zKCdjb25mbHVlbmNlLWluZm9ybWF0aW9uLW1hY3JvLW5vdGUnKSB8fFxuICAgICAgICBjbC5jb250YWlucygnY29uZmx1ZW5jZS1pbmZvcm1hdGlvbi1tYWNyby10aXAnKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KGNvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IG1hY3JvTmFtZSA9XG4gICAgICAgIG5vZGUuZGF0YXNldD8ubWFjcm9OYW1lIHx8XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1hY3JvLW5hbWUnKSB8fFxuICAgICAgICBkZXRlY3RQYW5lbFR5cGUobm9kZSk7XG4gICAgICBjb25zdCBsYWJlbCA9IG1hY3JvTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgY29uc3QgYm9keSA9IGNvbnRlbnQudHJpbSgpLnJlcGxhY2UoL1xcbi9nLCAnXFxuPiAnKTtcbiAgICAgIHJldHVybiBgXFxuPiAqKiR7bGFiZWx9OioqICR7Ym9keX1cXG5cXG5gO1xuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZXRlY3RQYW5lbFR5cGUobm9kZSkge1xuICBjb25zdCBjbCA9IG5vZGUuY2xhc3NMaXN0O1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8td2FybmluZycpKSByZXR1cm4gJ3dhcm5pbmcnO1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8tbm90ZScpKSByZXR1cm4gJ25vdGUnO1xuICBpZiAoY2wuY29udGFpbnMoJ2NvbmZsdWVuY2UtaW5mb3JtYXRpb24tbWFjcm8tdGlwJykpIHJldHVybiAndGlwJztcbiAgcmV0dXJuICdpbmZvJztcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBDb2RlIEJsb2Nrc1xuICogQ29udmVydHMgQ29uZmx1ZW5jZSBjb2RlIHBhbmVscy9ibG9ja3MgdG8gZmVuY2VkIGNvZGUgYmxvY2tzIChgYGApLlxuICogU3VwcG9ydHMgYm90aCBTZXJ2ZXIvREMgYW5kIENsb3VkIEhUTUwgc3RydWN0dXJlcy5cbiAqIEBpbXBsZW1lbnRzIHtUdXJuZG93blBsdWdpbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZsdWVuY2VDb2RlUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSAxOiBDb25mbHVlbmNlIFNlcnZlci9EQyBcdTIwMTQgZGl2LmNvZGUucGFuZWwgXHUyNTAwXHUyNTAwXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlQ29kZVBhbmVsJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnRElWJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29kZScpICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbCcpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IHBhcmFtU3RyID1cbiAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCcuY29kZScpPy5kYXRhc2V0Py5zeW50YXhoaWdobGlnaHRlclBhcmFtcyB8fCAnJztcbiAgICAgIGNvbnN0IGxhbmcgPSBleHRyYWN0TGFuZyhwYXJhbVN0cik7XG4gICAgICBjb25zdCBjb2RlRWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ3ByZScpO1xuICAgICAgY29uc3QgY29kZSA9IGNvZGVFbCA/IGNvZGVFbC50ZXh0Q29udGVudCA6IF9jb250ZW50LnRyaW0oKTtcbiAgICAgIHJldHVybiBgXFxuXFxgXFxgXFxgJHtsYW5nfVxcbiR7Y29kZX1cXG5cXGBcXGBcXGBcXG5gO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFx1MjUwMFx1MjUwMCBSdWxlIDI6IENvbmZsdWVuY2UgQ2xvdWQgXHUyMDE0IGRpdltkYXRhLW5vZGUtdHlwZT1cImNvZGVCbG9ja1wiXSBcdTI1MDBcdTI1MDBcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VDbG91ZENvZGVCbG9jaycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0RJVicgJiZcbiAgICAgICAgKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW5vZGUtdHlwZScpID09PSAnY29kZUJsb2NrJyB8fFxuICAgICAgICAgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvZGUtYmxvY2snKSlcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3QgbGFuZyA9XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWxhbmd1YWdlJykgfHxcbiAgICAgICAgbm9kZS5kYXRhc2V0Py5sYW5ndWFnZSB8fFxuICAgICAgICAnJztcbiAgICAgIGNvbnN0IGNvZGUgPSBleHRyYWN0Q29kZVRleHQobm9kZSk7XG4gICAgICByZXR1cm4gYFxcblxcYFxcYFxcYCR7bGFuZ31cXG4ke2NvZGV9XFxuXFxgXFxgXFxgXFxuYDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSAzOiBDb25mbHVlbmNlIG1hY3JvIHRhYmxlLWJhc2VkIGNvZGUgYmxvY2tzIFx1MjUwMFx1MjUwMFxuICAvLyA8dGFibGUgZGF0YS1tYWNyby1uYW1lPVwiY29kZVwiPiBvciB3aXRoIGNsYXNzIFwid3lzaXd5Zy1tYWNyb1wiXG4gIHR1cm5kb3duU2VydmljZS5hZGRSdWxlKCdjb25mbHVlbmNlQ29kZU1hY3JvVGFibGUnLCB7XG4gICAgZmlsdGVyKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSAnVEFCTEUnKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tYWNyby1uYW1lJykgPT09ICdjb2RlJyB8fFxuICAgICAgICAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3d5c2l3eWctbWFjcm8nKSAmJlxuICAgICAgICAgbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKSlcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3QgcGFyYW1TdHIgPVxuICAgICAgICBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tYWNyby1wYXJhbWV0ZXJzJykgfHxcbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ludGF4aGlnaGxpZ2h0ZXItcGFyYW1zJykgfHwgJyc7XG4gICAgICBjb25zdCBsYW5nID0gZXh0cmFjdExhbmcocGFyYW1TdHIpO1xuICAgICAgY29uc3QgcHJlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBwcmUgPyBwcmUudGV4dENvbnRlbnQgOiBfY29udGVudC50cmltKCk7XG4gICAgICByZXR1cm4gYFxcblxcYFxcYFxcYCR7bGFuZ31cXG4ke2NvZGV9XFxuXFxgXFxgXFxgXFxuYDtcbiAgICB9LFxuICB9KTtcblxuICAvLyBcdTI1MDBcdTI1MDAgUnVsZSA0OiBwcmUgd2l0aCBDb25mbHVlbmNlLXNwZWNpZmljIGF0dHJpYnV0ZXMgXHUyNTAwXHUyNTAwXG4gIC8vIENhdGNoZXMgPHByZT4gd2l0aCBkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcyBvciBjbGFzcz1cInN5bnRheGhpZ2hsaWdodGVyLSpcIlxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVByZUJsb2NrJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ1BSRScpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiAhIShcbiAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3ludGF4aGlnaGxpZ2h0ZXItcGFyYW1zJykgfHxcbiAgICAgICAgbm9kZS5jbGFzc05hbWUubWF0Y2goL3N5bnRheGhpZ2hsaWdodGVyLykgfHxcbiAgICAgICAgLy8gQ29uZmx1ZW5jZSBDbG91ZDogPHByZT4gaW5zaWRlIGNvZGVCbG9jayB3cmFwcGVyIChhbHJlYWR5IGhhbmRsZWQgYnkgcnVsZSAyLFxuICAgICAgICAvLyBidXQgY2F0Y2ggc3RhbmRhbG9uZSBvbmVzKVxuICAgICAgICBub2RlLnBhcmVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnZGF0YS1ub2RlLXR5cGUnKSA9PT0gJ2NvZGVCbG9jaydcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgLy8gU2tpcCBpZiBwYXJlbnQgaXMgYWxyZWFkeSBoYW5kbGVkIGJ5IHJ1bGUgMlxuICAgICAgaWYgKG5vZGUucGFyZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCdkYXRhLW5vZGUtdHlwZScpID09PSAnY29kZUJsb2NrJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGxldCBydWxlIDIgaGFuZGxlIGl0XG4gICAgICB9XG4gICAgICBjb25zdCBwYXJhbVN0ciA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN5bnRheGhpZ2hsaWdodGVyLXBhcmFtcycpIHx8ICcnO1xuICAgICAgY29uc3QgbGFuZyA9IGV4dHJhY3RMYW5nKHBhcmFtU3RyKTtcbiAgICAgIGNvbnN0IGNvZGUgPSBub2RlLnRleHRDb250ZW50O1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gXHUyNTAwXHUyNTAwIFJ1bGUgNTogR2VuZXJpYyA8cHJlPjxjb2RlPiBcdTIwMTQgaW1wcm92ZSBUdXJuZG93bidzIGRlZmF1bHQgXHUyNTAwXHUyNTAwXG4gIC8vIFR1cm5kb3duIGhhbmRsZXMgdGhpcyBuYXRpdmVseSwgYnV0IHNvbWV0aW1lcyBsb3NlcyBuZXdsaW5lc1xuICAvLyB3aGVuIDxjb2RlPiBjb250YWlucyA8c3Bhbj4gd3JhcHBlcnMgKHN5bnRheCBoaWdobGlnaHRpbmcpLlxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgncHJlQ29kZVdpdGhTcGFucycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdQUkUnKSByZXR1cm4gZmFsc2U7XG4gICAgICBjb25zdCBjb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdjb2RlJyk7XG4gICAgICBpZiAoIWNvZGUpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIE9ubHkgaW50ZXJjZXB0IGlmIGNvZGUgY29udGFpbnMgY2hpbGQgZWxlbWVudHMgKHNwYW5zIGZvciBzeW50YXggaGlnaGxpZ2h0KVxuICAgICAgcmV0dXJuIGNvZGUuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICBjb25zdCBjb2RlRWwgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJ2NvZGUnKTtcbiAgICAgIGNvbnN0IGxhbmcgPVxuICAgICAgICBleHRyYWN0TGFuZ0Zyb21DbGFzcyhjb2RlRWwuY2xhc3NOYW1lKSB8fFxuICAgICAgICBleHRyYWN0TGFuZ0Zyb21DbGFzcyhub2RlLmNsYXNzTmFtZSkgfHxcbiAgICAgICAgJyc7XG4gICAgICBjb25zdCBjb2RlID0gZXh0cmFjdENvZGVUZXh0KG5vZGUpO1xuICAgICAgcmV0dXJuIGBcXG5cXGBcXGBcXGAke2xhbmd9XFxuJHtjb2RlfVxcblxcYFxcYFxcYFxcbmA7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogRXh0cmFjdCBsYW5ndWFnZSBmcm9tIENvbmZsdWVuY2Ugc3ludGF4aGlnaGxpZ2h0ZXIgcGFyYW1zIHN0cmluZy5cbiAqIGUuZy4gXCJicnVzaDogYmFzaDsgZ3V0dGVyOiB0cnVlXCIgXHUyMTkyIFwiYmFzaFwiXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYW5nKHBhcmFtU3RyKSB7XG4gIGNvbnN0IG1hdGNoID0gcGFyYW1TdHIubWF0Y2goL2JydXNoOlxccyooXFx3KykvKTtcbiAgcmV0dXJuIG1hdGNoID8gbm9ybWFsaXplTGFuZ3VhZ2UobWF0Y2hbMV0pIDogJyc7XG59XG5cbi8qKlxuICogRXh0cmFjdCBsYW5ndWFnZSBmcm9tIENTUyBjbGFzcyBuYW1lcy5cbiAqIGUuZy4gXCJsYW5ndWFnZS1iYXNoXCIsIFwibGFuZy1qc1wiLCBcImJydXNoLXB5dGhvblwiXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RMYW5nRnJvbUNsYXNzKGNsYXNzTmFtZSkge1xuICBpZiAoIWNsYXNzTmFtZSkgcmV0dXJuICcnO1xuICBjb25zdCBtYXRjaCA9IGNsYXNzTmFtZS5tYXRjaCgvKD86bGFuZ3VhZ2V8bGFuZ3xicnVzaCktKFxcdyspLyk7XG4gIHJldHVybiBtYXRjaCA/IG5vcm1hbGl6ZUxhbmd1YWdlKG1hdGNoWzFdKSA6ICcnO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBjb21tb24gbGFuZ3VhZ2UgYWxpYXNlcyB0byBzdGFuZGFyZCBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplTGFuZ3VhZ2UobGFuZykge1xuICBjb25zdCBhbGlhc2VzID0ge1xuICAgIGpzOiAnamF2YXNjcmlwdCcsXG4gICAgdHM6ICd0eXBlc2NyaXB0JyxcbiAgICBweTogJ3B5dGhvbicsXG4gICAgcmI6ICdydWJ5JyxcbiAgICBzaDogJ2Jhc2gnLFxuICAgIHNoZWxsOiAnYmFzaCcsXG4gICAgeW1sOiAneWFtbCcsXG4gIH07XG4gIHJldHVybiBhbGlhc2VzW2xhbmcudG9Mb3dlckNhc2UoKV0gfHwgbGFuZy50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgcGxhaW4gdGV4dCBjb2RlIGZyb20gYSBub2RlLCBwcmVzZXJ2aW5nIGxpbmUgYnJlYWtzLlxuICogSGFuZGxlcyA8c3Bhbj4td3JhcHBlZCBsaW5lcywgPGJyPiB0YWdzLCBhbmQgcGxhaW4gdGV4dC5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENvZGVUZXh0KG5vZGUpIHtcbiAgY29uc3QgY29kZUVsID0gbm9kZS5xdWVyeVNlbGVjdG9yKCdjb2RlJykgfHwgbm9kZS5xdWVyeVNlbGVjdG9yKCdwcmUnKSB8fCBub2RlO1xuXG4gIC8vIElmIGl0IGhhcyBjaGlsZCBlbGVtZW50cyAoc3BhbnMgZm9yIHN5bnRheCBoaWdobGlnaHRpbmcpLCB3YWxrIHRoZSBET01cbiAgaWYgKGNvZGVFbC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNvZGVFbC5jaGlsZE5vZGVzKSB7XG4gICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLy8gVGV4dCBub2RlXG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQlInKSB7XG4gICAgICAgIHRleHQgKz0gJ1xcbic7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnU1BBTicgfHwgY2hpbGQubm9kZU5hbWUgPT09ICdESVYnKSB7XG4gICAgICAgIC8vIFNwYW4td3JhcHBlZCBsaW5lIG9yIGRpdiBsaW5lXG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIC8vIEFkZCBuZXdsaW5lIGFmdGVyIGJsb2NrLWxldmVsIGVsZW1lbnRzIG9yIGlmIG5leHQgc2libGluZyBpc24ndCBpbmxpbmVcbiAgICAgICAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRElWJykge1xuICAgICAgICAgIHRleHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcbiQvLCAnJyk7IC8vIHRyaW0gdHJhaWxpbmcgbmV3bGluZVxuICB9XG5cbiAgcmV0dXJuIGNvZGVFbC50ZXh0Q29udGVudDtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBUYWJsZXNcbiAqIEhhbmRsZXMgQ29uZmx1ZW5jZSBDbG91ZCB0YWJsZXMgd2hlcmU6XG4gKiAtIEhlYWRlciByb3cgKDx0aD4pIGlzIGluc2lkZSA8dGJvZHk+IChubyA8dGhlYWQ+KVxuICogLSBDZWxscyBjb250YWluIDxwPiwgPGRpdj4sIG9yIG90aGVyIGJsb2NrLWxldmVsIHdyYXBwZXJzXG4gKiAtIFRhYmxlIG1heSBiZSBuZXN0ZWQgaW5zaWRlIGNvbnRhaW5lciBkaXZzXG4gKlxuICogVGhpcyBydWxlIHRha2VzIHByaW9yaXR5IG92ZXIgdGhlIEdGTSB0YWJsZSBydWxlcyBieSBwcm9jZXNzaW5nXG4gKiB0aGUgPHRhYmxlPiBlbGVtZW50IGRpcmVjdGx5IGFuZCBleHRyYWN0aW5nIGNsZWFuIGNvbnRlbnQuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlVGFibGVzUGx1Z2luKHR1cm5kb3duU2VydmljZSkge1xuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVRhYmxlJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSAhPT0gJ1RBQkxFJykgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFub2RlLnJvd3MgfHwgbm9kZS5yb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gU2tpcCBkdXBsaWNhdGUgc3RpY2t5IGhlYWRlciB0YWJsZXMgKENvbmZsdWVuY2UgcmVuZGVycyAyIGNvcGllcylcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBub2RlLmNsb3Nlc3QoJy5wbS10YWJsZS1zdGlja3ktd3JhcHBlcicpO1xuICAgICAgaWYgKHdyYXBwZXIpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IHJvd3MgPSBleHRyYWN0Um93cyhub2RlKTtcbiAgICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuXG4gICAgICAvLyBEZXRlY3QgaGVhZGVyIHJvdzogZmlyc3Qgcm93IHdpdGggYWxsIDx0aD4gY2VsbHMsIG9yIDx0aGVhZD4gcm93XG4gICAgICBsZXQgaGVhZGVyUm93ID0gbnVsbDtcbiAgICAgIGxldCBib2R5Um93cyA9IHJvd3M7XG5cbiAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDAgJiYgcm93c1swXS5pc0hlYWRlcikge1xuICAgICAgICBoZWFkZXJSb3cgPSByb3dzWzBdO1xuICAgICAgICBib2R5Um93cyA9IHJvd3Muc2xpY2UoMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5vIGhlYWRlciBkZXRlY3RlZCBidXQgdGFibGUgaGFzIHJvd3MsIHVzZSBmaXJzdCByb3cgYXMgaGVhZGVyXG4gICAgICAvLyAoTWFya2Rvd24gcmVxdWlyZXMgYSBoZWFkZXIgcm93KVxuICAgICAgaWYgKCFoZWFkZXJSb3cgJiYgYm9keVJvd3MubGVuZ3RoID4gMCkge1xuICAgICAgICBoZWFkZXJSb3cgPSBib2R5Um93c1swXTtcbiAgICAgICAgYm9keVJvd3MgPSBib2R5Um93cy5zbGljZSgxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoZWFkZXJSb3cpIHJldHVybiAnJztcblxuICAgICAgLy8gRGV0ZXJtaW5lIGNvbHVtbiBjb3VudCBmcm9tIHRoZSB3aWRlc3Qgcm93XG4gICAgICBjb25zdCBjb2xDb3VudCA9IE1hdGgubWF4KFxuICAgICAgICBoZWFkZXJSb3cuY2VsbHMubGVuZ3RoLFxuICAgICAgICAuLi5ib2R5Um93cy5tYXAoKHIpID0+IHIuY2VsbHMubGVuZ3RoKVxuICAgICAgKTtcblxuICAgICAgaWYgKGNvbENvdW50ID09PSAwKSByZXR1cm4gJyc7XG5cbiAgICAgIC8vIFBhZCByb3dzIHRvIGNvbnNpc3RlbnQgY29sdW1uIGNvdW50XG4gICAgICBjb25zdCBwYWRSb3cgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgd2hpbGUgKGNlbGxzLmxlbmd0aCA8IGNvbENvdW50KSBjZWxscy5wdXNoKCcnKTtcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgICAgfTtcblxuICAgICAgLy8gQnVpbGQgbWFya2Rvd24gdGFibGVcbiAgICAgIGNvbnN0IGxpbmVzID0gW107XG5cbiAgICAgIC8vIEhlYWRlclxuICAgICAgY29uc3QgaENlbGxzID0gcGFkUm93KFsuLi5oZWFkZXJSb3cuY2VsbHNdKTtcbiAgICAgIGxpbmVzLnB1c2goJ3wgJyArIGhDZWxscy5qb2luKCcgfCAnKSArICcgfCcpO1xuXG4gICAgICAvLyBTZXBhcmF0b3JcbiAgICAgIGxpbmVzLnB1c2goJ3wgJyArIGhDZWxscy5tYXAoKCkgPT4gJy0tLScpLmpvaW4oJyB8ICcpICsgJyB8Jyk7XG5cbiAgICAgIC8vIEJvZHkgcm93c1xuICAgICAgZm9yIChjb25zdCByb3cgb2YgYm9keVJvd3MpIHtcbiAgICAgICAgY29uc3QgYkNlbGxzID0gcGFkUm93KFsuLi5yb3cuY2VsbHNdKTtcbiAgICAgICAgbGluZXMucHVzaCgnfCAnICsgYkNlbGxzLmpvaW4oJyB8ICcpICsgJyB8Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnXFxuXFxuJyArIGxpbmVzLmpvaW4oJ1xcbicpICsgJ1xcblxcbic7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gUHJldmVudCBHRk0gdGFibGUgcnVsZXMgZnJvbSBhbHNvIHByb2Nlc3NpbmcgdGFibGUgcGFydHNcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VUYWJsZVNlY3Rpb24nLCB7XG4gICAgZmlsdGVyOiBbJ3RoZWFkJywgJ3Rib2R5JywgJ3Rmb290J10sXG4gICAgcmVwbGFjZW1lbnQoY29udGVudCkge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gU3RyaXAgZHVwbGljYXRlIHN0aWNreSBoZWFkZXIgdGFibGVzIChDb25mbHVlbmNlIHJlbmRlcnMgaGVhZGVyIHR3aWNlKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVN0aWNreUhlYWRlcicsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgIT09ICdESVYnKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gbm9kZS5jbGFzc0xpc3Q/LmNvbnRhaW5zKCdwbS10YWJsZS1zdGlja3ktd3JhcHBlcicpIHx8XG4gICAgICAgIChub2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ3BtLXRhYmxlLWNvbnRhaW5lcicpICYmIG5vZGUuY2xhc3NMaXN0Py5jb250YWlucygnaXMtc3RpY2t5JykpO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoKSB7XG4gICAgICByZXR1cm4gJyc7IC8vIGRpc2NhcmQgZW50aXJlbHkgXHUyMDE0IHRoZSByZWFsIHRhYmxlIGlzIGluIHBtLXRhYmxlLXdyYXBwZXJcbiAgICB9LFxuICB9KTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHJvd3MgZnJvbSBhIHRhYmxlIGVsZW1lbnQsIHByZXNlcnZpbmcgaGVhZGVyL2JvZHkgZGlzdGluY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RSb3dzKHRhYmxlKSB7XG4gIGNvbnN0IHJvd3MgPSBbXTtcblxuICBmb3IgKGNvbnN0IHRyIG9mIHRhYmxlLnJvd3MpIHtcbiAgICBjb25zdCBjZWxscyA9IFtdO1xuICAgIGxldCBpc0hlYWRlciA9IGZhbHNlO1xuICAgIGxldCB0aENvdW50ID0gMDtcbiAgICBsZXQgY2VsbENvdW50ID0gMDtcblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdHIuY2hpbGROb2Rlcykge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlICE9PSAxKSBjb250aW51ZTsgLy8gc2tpcCB0ZXh0IG5vZGVzXG4gICAgICBpZiAoY2hpbGQubm9kZU5hbWUgIT09ICdURCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICdUSCcpIGNvbnRpbnVlO1xuXG4gICAgICBjZWxsQ291bnQrKztcbiAgICAgIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ1RIJykgdGhDb3VudCsrO1xuXG4gICAgICBjb25zdCB0ZXh0ID0gY2xlYW5DZWxsQ29udGVudChjaGlsZCk7XG4gICAgICBjZWxscy5wdXNoKHRleHQpO1xuICAgIH1cblxuICAgIC8vIEEgaGVhZGVyIHJvdyA9IGFsbCBjZWxscyBhcmUgPHRoPiwgb3Igcm93IGlzIGluc2lkZSA8dGhlYWQ+XG4gICAgaWYgKGNlbGxDb3VudCA+IDAgJiYgdGhDb3VudCA9PT0gY2VsbENvdW50KSBpc0hlYWRlciA9IHRydWU7XG4gICAgaWYgKHRyLnBhcmVudE5vZGU/Lm5vZGVOYW1lID09PSAnVEhFQUQnKSBpc0hlYWRlciA9IHRydWU7XG5cbiAgICBpZiAoY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgcm93cy5wdXNoKHsgY2VsbHMsIGlzSGVhZGVyIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByb3dzO1xufVxuXG4vKipcbiAqIEV4dHJhY3QgY2xlYW4gdGV4dCBmcm9tIGEgdGFibGUgY2VsbC5cbiAqIEhhbmRsZXMgPHA+LCA8ZGl2PiwgPHNwYW4+LCBpbmxpbmUgY29kZSwgbGlua3MsIGltYWdlcywgYW5kIENvbmZsdWVuY2UgbWVkaWEgd3JhcHBlcnMuXG4gKi9cbmZ1bmN0aW9uIGNsZWFuQ2VsbENvbnRlbnQoY2VsbCkge1xuICAvLyBQcmlvcml0eTogY2hlY2sgZm9yIGFueSA8aW1nPiBhbnl3aGVyZSBpbiB0aGUgY2VsbCBmaXJzdC5cbiAgLy8gQ29uZmx1ZW5jZSB3cmFwcyBpbWFnZXMgaW4gZGVlcCBzdHJ1Y3R1cmVzIChtZWRpYVNpbmdsZSA+IGEgPiBkaXYgPiAuLi4pLFxuICAvLyBhbmQgdGhlIHZpc2libGUgdGV4dCBpcyBqdXN0IFwiT3BlbiBpbWFnZS14eHgucG5nXCIgd2hpY2ggaXMgdXNlbGVzcy5cbiAgY29uc3QgaW1ncyA9IGNlbGwucXVlcnlTZWxlY3RvckFsbCgnaW1nJyk7XG4gIGlmIChpbWdzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBwYXJ0cyA9IFtdO1xuICAgIC8vIENvbGxlY3QgYWxsIGltYWdlc1xuICAgIGZvciAoY29uc3QgaW1nIG9mIGltZ3MpIHtcbiAgICAgIGNvbnN0IGFsdCA9IGltZy5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgY29uc3Qgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1zcmMnKSB8fCAnJztcbiAgICAgIGlmIChzcmMpIHBhcnRzLnB1c2goYCFbJHthbHR9XSgke3NyY30pYCk7XG4gICAgfVxuICAgIC8vIEFsc28gY29sbGVjdCBub24taW1hZ2UgdGV4dCBmcm9tIHRoZSBjZWxsICh0aGVyZSBtYXkgYmUgbWl4ZWQgY29udGVudClcbiAgICBjb25zdCB0ZXh0T25seSA9IGV4dHJhY3ROb25JbWFnZVRleHQoY2VsbCk7XG4gICAgaWYgKHRleHRPbmx5KSBwYXJ0cy51bnNoaWZ0KHRleHRPbmx5KTtcbiAgICByZXR1cm4gcGFydHMuam9pbignICcpXG4gICAgICAucmVwbGFjZSgvXFxuL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgIC50cmltKClcbiAgICAgIC5yZXBsYWNlKC9cXHwvZywgJ1xcXFx8Jyk7XG4gIH1cblxuICAvLyBObyBpbWFnZXMgXHUyMDE0IHByb2Nlc3MgY2hpbGRyZW4gbm9ybWFsbHlcbiAgbGV0IHRleHQgPSAnJztcblxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNlbGwuY2hpbGROb2Rlcykge1xuICAgIHRleHQgKz0gcHJvY2Vzc05vZGUoY2hpbGQpO1xuICB9XG5cbiAgLy8gQ2xlYW4gdXA6IGNvbGxhcHNlIHdoaXRlc3BhY2UsIHRyaW0sIGVzY2FwZSBwaXBlc1xuICByZXR1cm4gdGV4dFxuICAgIC5yZXBsYWNlKC9cXG4vZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL1xcfC9nLCAnXFxcXHwnKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRleHQgY29udGVudCBmcm9tIGEgY2VsbCwgZXhjbHVkaW5nIGFueSA8aW1nPiBlbGVtZW50cyxcbiAqIENvbmZsdWVuY2UgbWVkaWEgd3JhcHBlcnMsIHNvcnRpbmcgaWNvbnMsIGFuZCBmYWxsYmFjayBidXR0b25zLlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9uSW1hZ2VUZXh0KGNlbGwpIHtcbiAgY29uc3QgY2xvbmUgPSBjZWxsLmNsb25lTm9kZSh0cnVlKTtcbiAgLy8gUmVtb3ZlIGltYWdlcywgbWVkaWEgd3JhcHBlcnMsIHNvcnRpbmcgaWNvbnMsIGFuZCBmYWxsYmFjayBidXR0b25zXG4gIGNvbnN0IHJlbW92ZVNlbGVjdG9ycyA9IFtcbiAgICAnaW1nJyxcbiAgICAnW2RhdGEtbm9kZS10eXBlPVwibWVkaWFTaW5nbGVcIl0nLFxuICAgICdbZGF0YS1ub2RlLXR5cGU9XCJtZWRpYVwiXScsXG4gICAgJ2ZpZ3VyZScsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc29ydGluZyBpY29ucyBpbiBoZWFkZXJzXG4gICAgJ2J1dHRvbicsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJPcGVuIGltYWdlLXh4eFwiIGZhbGxiYWNrIGJ1dHRvbnNcbiAgICAnLmFrLXJlbmRlcmVyLXRhYmxlSGVhZGVyLXNvcnRpbmctaWNvbicsICAgICAvLyBzb3J0aW5nIGljb24gd3JhcHBlcnNcbiAgICAnW2RhdGEtdGVzdGlkPVwibWVkaWEtYmFkZ2VzXCJdJywgICAgICAgICAgICAgIC8vIG1lZGlhIGJhZGdlIG92ZXJsYXlzXG4gIF0uam9pbignLCAnKTtcbiAgZm9yIChjb25zdCBlbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKHJlbW92ZVNlbGVjdG9ycykpIHtcbiAgICBlbC5yZW1vdmUoKTtcbiAgfVxuICAvLyBSZW1vdmUgXCJPcGVuIGltYWdlLS4uLlwiIG9yIFwiT3BlbiBTY3JlZW5zaG90Li4uXCIgdGV4dCBsZWZ0IGJ5IENvbmZsdWVuY2VcbiAgY29uc3QgdGV4dCA9IGNsb25lLnRleHRDb250ZW50XG4gICAgLnJlcGxhY2UoL09wZW4gKGltYWdlfFNjcmVlbnNob3QpW15cXG5dKi9nLCAnJylcbiAgICAudHJpbSgpO1xuICByZXR1cm4gdGV4dDtcbn1cblxuLyoqXG4gKiBQcm9jZXNzIGEgc2luZ2xlIERPTSBub2RlIGludG8gbWFya2Rvd24gdGV4dC5cbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc05vZGUoY2hpbGQpIHtcbiAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAzKSB7XG4gICAgcmV0dXJuIGNoaWxkLnRleHRDb250ZW50O1xuICB9XG4gIC8vIFNraXAgQ29uZmx1ZW5jZSBVSSBlbGVtZW50cyAoc29ydGluZyBpY29ucywgZmFsbGJhY2sgYnV0dG9ucywgbWVkaWEgYmFkZ2VzKVxuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdGSUdVUkUnKSByZXR1cm4gJyc7XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicpIHJldHVybiAnJztcbiAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZT8uKCdkYXRhLXRlc3RpZCcpID09PSAnbWVkaWEtYmFkZ2VzJykgcmV0dXJuICcnO1xuICBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdQJykge1xuICAgIHJldHVybiAnICcgKyBjbGVhbklubGluZUNvbnRlbnQoY2hpbGQpO1xuICB9XG4gIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgIHJldHVybiAnICc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICByZXR1cm4gJ2AnICsgY2hpbGQudGV4dENvbnRlbnQgKyAnYCc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnUFJFJykge1xuICAgIHJldHVybiAnYCcgKyBjaGlsZC50ZXh0Q29udGVudC50cmltKCkgKyAnYCc7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQScpIHtcbiAgICAvLyBDaGVjayBpZiBsaW5rIHdyYXBzIGFuIGltYWdlXG4gICAgY29uc3QgaW1nID0gY2hpbGQucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYWx0ID0gaW1nLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgICBjb25zdCBzcmMgPSBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXNyYycpIHx8ICcnO1xuICAgICAgcmV0dXJuIHNyYyA/IGAhWyR7YWx0fV0oJHtzcmN9KWAgOiAnJztcbiAgICB9XG4gICAgY29uc3QgaHJlZiA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgIGNvbnN0IGxpbmtUZXh0ID0gY2hpbGQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIHJldHVybiBocmVmID8gYFske2xpbmtUZXh0fV0oJHtocmVmfSlgIDogbGlua1RleHQ7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnU1RST05HJyB8fCBjaGlsZC5ub2RlTmFtZSA9PT0gJ0InKSB7XG4gICAgcmV0dXJuICcqKicgKyBjaGlsZC50ZXh0Q29udGVudCArICcqKic7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRU0nIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnSScpIHtcbiAgICByZXR1cm4gJyonICsgY2hpbGQudGV4dENvbnRlbnQgKyAnKic7XG4gIH1cbiAgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnSU1HJykge1xuICAgIGNvbnN0IGFsdCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgY29uc3Qgc3JjID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJykgfHwgJyc7XG4gICAgcmV0dXJuIGAhWyR7YWx0fV0oJHtzcmN9KWA7XG4gIH1cbiAgLy8gR2VuZXJpYzogcmVjdXJzZVxuICByZXR1cm4gY2xlYW5JbmxpbmVDb250ZW50KGNoaWxkKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IGlubGluZSBjb250ZW50IGZyb20gYW4gZWxlbWVudCwgaGFuZGxpbmcgYmFzaWMgZm9ybWF0dGluZy5cbiAqL1xuZnVuY3Rpb24gY2xlYW5JbmxpbmVDb250ZW50KGVsKSB7XG4gIGxldCB0ZXh0ID0gJyc7XG4gIGZvciAoY29uc3QgY2hpbGQgb2YgZWwuY2hpbGROb2Rlcykge1xuICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgdGV4dCArPSBjaGlsZC50ZXh0Q29udGVudDtcbiAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnQ09ERScpIHtcbiAgICAgIHRleHQgKz0gJ2AnICsgY2hpbGQudGV4dENvbnRlbnQgKyAnYCc7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0EnKSB7XG4gICAgICBjb25zdCBocmVmID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICBjb25zdCBsaW5rVGV4dCA9IGNoaWxkLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHRleHQgKz0gaHJlZiA/IGBbJHtsaW5rVGV4dH1dKCR7aHJlZn0pYCA6IGxpbmtUZXh0O1xuICAgIH0gZWxzZSBpZiAoY2hpbGQubm9kZU5hbWUgPT09ICdTVFJPTkcnIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnQicpIHtcbiAgICAgIHRleHQgKz0gJyoqJyArIGNoaWxkLnRleHRDb250ZW50ICsgJyoqJztcbiAgICB9IGVsc2UgaWYgKGNoaWxkLm5vZGVOYW1lID09PSAnRU0nIHx8IGNoaWxkLm5vZGVOYW1lID09PSAnSScpIHtcbiAgICAgIHRleHQgKz0gJyonICsgY2hpbGQudGV4dENvbnRlbnQgKyAnKic7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0JSJykge1xuICAgICAgdGV4dCArPSAnICc7XG4gICAgfSBlbHNlIGlmIChjaGlsZC5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcbiAgICAgIGNvbnN0IGFsdCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnYWx0JykgfHwgJyc7XG4gICAgICBjb25zdCBzcmMgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ3NyYycpIHx8ICcnO1xuICAgICAgdGV4dCArPSBgIVske2FsdH1dKCR7c3JjfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0ICs9IGNoaWxkLnRleHRDb250ZW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dDtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogQ29uZmx1ZW5jZSBVc2VyIE1lbnRpb25zICYgU3RhdHVzIE1hY3Jvc1xuICogQ29udmVydHMgdXNlciBsaW5rcyB0byBAbWVudGlvbnMgYW5kIHN0YXR1cyBiYWRnZXMgdG8gaW5saW5lIGNvZGUuXG4gKiBAaW1wbGVtZW50cyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25mbHVlbmNlTWVudGlvbnNQbHVnaW4odHVybmRvd25TZXJ2aWNlKSB7XG4gIC8vIFVzZXIgbWVudGlvbnNcbiAgdHVybmRvd25TZXJ2aWNlLmFkZFJ1bGUoJ2NvbmZsdWVuY2VNZW50aW9uJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnQScgJiZcbiAgICAgICAgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb25mbHVlbmNlLXVzZXJsaW5rJykgfHxcbiAgICAgICAgICBub2RlLmRhdGFzZXQ/LnVzZXJuYW1lICE9IG51bGwpXG4gICAgICApO1xuICAgIH0sXG4gICAgcmVwbGFjZW1lbnQoX2NvbnRlbnQsIG5vZGUpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIHJldHVybiBgQCR7bmFtZX1gO1xuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFN0YXR1cyBtYWNybyAoY29sb3JlZCBsYWJlbHMgbGlrZSBcIklOIFBST0dSRVNTXCIsIFwiRE9ORVwiKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnY29uZmx1ZW5jZVN0YXR1cycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ1NQQU4nICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdGF0dXMtbWFjcm8nKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gYFxcYCR7bm9kZS50ZXh0Q29udGVudC50cmltKCl9XFxgYDtcbiAgICB9LFxuICB9KTtcbn1cbiIsICIvKipcbiAqIFBsdWdpbjogSmlyYSBJc3N1ZSBMaW5rcyAmIEVtb3RpY29uc1xuICogQ29udmVydHMgaXNzdWUtbGluayBhbmNob3JzIHRvIFtLRVldKHVybCkgYW5kIGVtb3RpY29uIGltYWdlcyB0byB0ZXh0LlxuICogQGltcGxlbWVudHMge1R1cm5kb3duUGx1Z2lufVxuICovXG5leHBvcnQgZnVuY3Rpb24gamlyYUlzc3Vlc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgLy8gSXNzdWUga2V5IGxpbmtzIChlLmcuIFBST0otMTIzKVxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnamlyYUlzc3VlTGluaycsIHtcbiAgICBmaWx0ZXIobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbm9kZS5ub2RlTmFtZSA9PT0gJ0EnICYmXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpc3N1ZS1saW5rJylcbiAgICAgICk7XG4gICAgfSxcbiAgICByZXBsYWNlbWVudChfY29udGVudCwgbm9kZSkge1xuICAgICAgY29uc3Qga2V5ID0gbm9kZS5kYXRhc2V0Py5pc3N1ZUtleSB8fCBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIGNvbnN0IGhyZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8ICcnO1xuICAgICAgcmV0dXJuIGBbJHtrZXl9XSgke2hyZWZ9KWA7XG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gRW1vdGljb24gaW1hZ2VzIFx1MjE5MiBhbHQgdGV4dFxuICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnamlyYUVtb3RpY29uJywge1xuICAgIGZpbHRlcihub2RlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLm5vZGVOYW1lID09PSAnSU1HJyAmJlxuICAgICAgICBub2RlLmNsYXNzTGlzdC5jb250YWlucygnZW1vdGljb24nKVxuICAgICAgKTtcbiAgICB9LFxuICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgIH0sXG4gIH0pO1xufVxuIiwgIi8qKlxuICogUGx1Z2luOiBCYXNlNjQgSW1hZ2UgSW5saW5pbmdcbiAqIFJlcGxhY2VzIDxpbWc+IHNyYyB3aXRoIGRhdGEgVVJJcyBmcm9tIGEgcHJlLWZldGNoZWQgbWFwLlxuICogRmFjdG9yeSBmdW5jdGlvbjogY3JlYXRlcyBhIHBsdWdpbiBib3VuZCB0byBhIHNwZWNpZmljIFVSTFx1MjE5MmRhdGFVUkkgbWFwLlxuICogQHBhcmFtIHtNYXA8c3RyaW5nLHN0cmluZz59IGltYWdlQmFzZTY0TWFwIC0gVVJMIFx1MjE5MiBkYXRhIFVSSSBtYXBwaW5nXG4gKiBAcmV0dXJucyB7VHVybmRvd25QbHVnaW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXNlNjRJbWFnZXNQbHVnaW4oaW1hZ2VCYXNlNjRNYXApIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJhc2U2NEltYWdlc1BsdWdpbih0dXJuZG93blNlcnZpY2UpIHtcbiAgICB0dXJuZG93blNlcnZpY2UuYWRkUnVsZSgnYmFzZTY0SW1hZ2VzJywge1xuICAgICAgZmlsdGVyOiAnaW1nJyxcbiAgICAgIHJlcGxhY2VtZW50KF9jb250ZW50LCBub2RlKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IG5vZGUuZ2V0QXR0cmlidXRlKCdzcmMnKSB8fCAnJztcbiAgICAgICAgY29uc3QgYWx0ID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpIHx8ICcnO1xuICAgICAgICBjb25zdCByZXNvbHZlZFNyYyA9IGltYWdlQmFzZTY0TWFwLmdldChzcmMpIHx8IHNyYztcbiAgICAgICAgcmV0dXJuIGAhWyR7YWx0fV0oJHtyZXNvbHZlZFNyY30pYDtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG4iLCAiLyoqXG4gKiBNYXJrZG93biBTdHJhdGVneVxuICogQ29udmVydHMgSFRNTCAoZnJvbSBKaXJhL0NvbmZsdWVuY2UgRE9NKSB0byBNYXJrZG93bi5cbiAqIFVzZXMgVHVybmRvd24gYXMgdGhlIGNvcmUgZW5naW5lIHdpdGggYSBwbHVnaW4gYXJjaGl0ZWN0dXJlLlxuICpcbiAqIEBpbXBsZW1lbnRzIHtDb252ZXJzaW9uU3RyYXRlZ3l9XG4gKi9cbmltcG9ydCBUdXJuZG93blNlcnZpY2UgZnJvbSAndHVybmRvd24nO1xuaW1wb3J0IHsgZ2ZtIH0gZnJvbSAnQHRydXRvL3R1cm5kb3duLXBsdWdpbi1nZm0nO1xuaW1wb3J0IHtcbiAgY29uZmx1ZW5jZVBhbmVsc1BsdWdpbixcbiAgY29uZmx1ZW5jZUNvZGVQbHVnaW4sXG4gIGNvbmZsdWVuY2VUYWJsZXNQbHVnaW4sXG4gIGNvbmZsdWVuY2VNZW50aW9uc1BsdWdpbixcbiAgamlyYUlzc3Vlc1BsdWdpbixcbiAgY3JlYXRlQmFzZTY0SW1hZ2VzUGx1Z2luLFxufSBmcm9tICcuLi9wbHVnaW5zL2luZGV4LmpzJztcblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duU3RyYXRlZ3kge1xuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdtYXJrZG93bic7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBIVE1MIHRvIE1hcmtkb3duLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7TWFwPHN0cmluZyxzdHJpbmc+fSBbb3B0aW9ucy5pbWFnZUJhc2U2NE1hcF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm1ldGFkYXRhXVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29udmVydChodG1sLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGltYWdlQmFzZTY0TWFwLCBtZXRhZGF0YSB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBzZXJ2aWNlID0gdGhpcy5fY3JlYXRlU2VydmljZShpbWFnZUJhc2U2NE1hcCk7XG4gICAgbGV0IG1kID0gc2VydmljZS50dXJuZG93bihodG1sKTtcblxuICAgIGlmIChtZXRhZGF0YSAmJiBPYmplY3Qua2V5cyhtZXRhZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgbWQgPSB0aGlzLl9idWlsZEZyb250TWF0dGVyKG1ldGFkYXRhKSArIG1kO1xuICAgIH1cblxuICAgIHJldHVybiBtZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW5kIGNvbmZpZ3VyZSBhIFR1cm5kb3duIGluc3RhbmNlIHdpdGggYWxsIHBsdWdpbnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY3JlYXRlU2VydmljZShpbWFnZUJhc2U2NE1hcCkge1xuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgVHVybmRvd25TZXJ2aWNlKHtcbiAgICAgIGhlYWRpbmdTdHlsZTogJ2F0eCcsXG4gICAgICBjb2RlQmxvY2tTdHlsZTogJ2ZlbmNlZCcsXG4gICAgICBidWxsZXRMaXN0TWFya2VyOiAnLScsXG4gICAgICBlbURlbGltaXRlcjogJyonLFxuICAgIH0pO1xuXG4gICAgLy8gQ29yZSBHRk0gc3VwcG9ydFxuICAgIHNlcnZpY2UudXNlKGdmbSk7XG5cbiAgICAvLyBDb25mbHVlbmNlIHBsdWdpbnNcbiAgICBzZXJ2aWNlLnVzZShjb25mbHVlbmNlUGFuZWxzUGx1Z2luKTtcbiAgICBzZXJ2aWNlLnVzZShjb25mbHVlbmNlQ29kZVBsdWdpbik7XG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZVRhYmxlc1BsdWdpbik7XG4gICAgc2VydmljZS51c2UoY29uZmx1ZW5jZU1lbnRpb25zUGx1Z2luKTtcblxuICAgIC8vIEppcmEgcGx1Z2luc1xuICAgIHNlcnZpY2UudXNlKGppcmFJc3N1ZXNQbHVnaW4pO1xuXG4gICAgLy8gQmFzZTY0IGltYWdlIGlubGluaW5nIChjb25kaXRpb25hbClcbiAgICBpZiAoaW1hZ2VCYXNlNjRNYXAgJiYgaW1hZ2VCYXNlNjRNYXAuc2l6ZSA+IDApIHtcbiAgICAgIHNlcnZpY2UudXNlKGNyZWF0ZUJhc2U2NEltYWdlc1BsdWdpbihpbWFnZUJhc2U2NE1hcCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzZXJ2aWNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIFlBTUwgZnJvbnQgbWF0dGVyIGZyb20gbWV0YWRhdGEgb2JqZWN0LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2J1aWxkRnJvbnRNYXR0ZXIobWV0YWRhdGEpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMobWV0YWRhdGEpXG4gICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IGAke2tleX06ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApXG4gICAgICAuam9pbignXFxuJyk7XG4gICAgcmV0dXJuIGAtLS1cXG4ke2VudHJpZXN9XFxuLS0tXFxuXFxuYDtcbiAgfVxufVxuIiwgIi8qKlxuICogSmlyYSBTdHJhdGVneVxuICogQmlkaXJlY3Rpb25hbCBjb252ZXJzaW9uIGJldHdlZW4gSmlyYSB3aWtpIG1hcmt1cCBhbmQgTWFya2Rvd24uXG4gKiBVc2VzIEFTVCBwaXBlbGluZSBmb3IgTURcdTIxOTJKaXJhIChvcmlnaW5hbCBpbXBsZW1lbnRhdGlvbikuXG4gKiBVc2VzIGppcmEybWQgZm9yIEppcmFcdTIxOTJNRCBkaXJlY3Rpb24gKHdpdGggcG9zdC1wcm9jZXNzaW5nIGZpeGVzKS5cbiAqXG4gKiBAaW1wbGVtZW50cyB7Q29udmVyc2lvblN0cmF0ZWd5fVxuICovXG5pbXBvcnQgSjJNIGZyb20gJ2ppcmEybWQnO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICcuLi9waXBlbGluZS9wYXJzZXIuanMnO1xuaW1wb3J0IHsgd2Fsa0FuZFRyYW5zZm9ybSwgY29sbGFwc2VCbGFua0xpbmVzLCBub3JtYWxpemVMaXN0RGVwdGggfSBmcm9tICcuLi9waXBlbGluZS90cmFuc2Zvcm1lci5qcyc7XG5pbXBvcnQgeyBlbWl0IH0gZnJvbSAnLi4vcGlwZWxpbmUvZW1pdHRlci5qcyc7XG5cbmV4cG9ydCBjbGFzcyBKaXJhU3RyYXRlZ3kge1xuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdqaXJhJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IE1hcmtkb3duIHRvIEppcmEgd2lraSBtYXJrdXAgdmlhIEFTVCBwaXBlbGluZS5cbiAgICogUGlwZWxpbmU6IHBhcnNlIFx1MjE5MiB0cmFuc2Zvcm0gXHUyMTkyIGVtaXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hcmtkb3duXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmcm9tTWFya2Rvd24obWFya2Rvd24pIHtcbiAgICAvLyBQaGFzZSAxOiBQYXJzZSB0byBBU1RcbiAgICBsZXQgYXN0ID0gcGFyc2UobWFya2Rvd24pO1xuXG4gICAgLy8gUGhhc2UgMjogQXBwbHkgdHJhbnNmb3JtZXJzXG4gICAgYXN0ID0gd2Fsa0FuZFRyYW5zZm9ybShhc3QsIGNvbGxhcHNlQmxhbmtMaW5lcyk7XG4gICAgYXN0ID0gbm9ybWFsaXplTGlzdERlcHRoKGFzdCk7XG5cbiAgICAvLyBQaGFzZSAzOiBFbWl0IEppcmEgbWFya3VwXG4gICAgbGV0IHJlc3VsdCA9IGVtaXQoYXN0KTtcblxuICAgIC8vIFBoYXNlIDQ6IEZpbmFsIGNsZWFudXBcbiAgICByZXN1bHQgPSB0aGlzLl9wb3N0UHJvY2VzcyhyZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IEppcmEgd2lraSBtYXJrdXAgdG8gTWFya2Rvd24uXG4gICAqIFVzZXMgamlyYTJtZCBjb3JlIHdpdGggcG9zdC1wcm9jZXNzaW5nIGZpeGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gamlyYU1hcmt1cFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdG9NYXJrZG93bihqaXJhTWFya3VwKSB7XG4gICAgbGV0IG1kID0gSjJNLnRvX21hcmtkb3duKGppcmFNYXJrdXApO1xuXG4gICAgLy8gRml4OiBoZWFkaW5nIHNob3VsZCBoYXZlIHNwYWNlIGFmdGVyICNcbiAgICBtZCA9IG1kLnJlcGxhY2UoL14oI3sxLDZ9KShcXFMpL2dtLCAnJDEgJDInKTtcblxuICAgIC8vIEZpeDogdGFibGUgY2VsbCBzcGFjaW5nXG4gICAgbWQgPSBtZC5yZXBsYWNlKC9cXHwoW158XFxuXSspL2csIChfbWF0Y2gsIGNlbGwpID0+IHtcbiAgICAgIHJldHVybiBgfCAke2NlbGwudHJpbSgpfSBgO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1kO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjY2VzcyB0byBKMk0gZm9yIEhUTUwgZ2VuZXJhdGlvbiAodXNlZCBieSBGaWxsIEppcmEgZmVhdHVyZSkuXG4gICAqL1xuICBnZXQgajJtKCkge1xuICAgIHJldHVybiBKMk07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgX3Bvc3RQcm9jZXNzKGppcmEpIHtcbiAgICAvLyBFbnN1cmUgaGVhZGluZ3MgaGF2ZSBzcGFjZSBhZnRlciBkb3RcbiAgICBqaXJhID0gamlyYS5yZXBsYWNlKC9eKGhbMS02XVxcLilcXHMqKFxcUykvZ20sICckMSAkMicpO1xuXG4gICAgLy8gUmVtb3ZlIHRyaXBsZSsgYmxhbmsgbGluZXNcbiAgICBqaXJhID0gamlyYS5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKTtcblxuICAgIC8vIFRyaW0gdHJhaWxpbmcgd2hpdGVzcGFjZSBwZXIgbGluZVxuICAgIGppcmEgPSBqaXJhLnJlcGxhY2UoL1sgXFx0XSskL2dtLCAnJyk7XG5cbiAgICByZXR1cm4gamlyYS50cmltKCk7XG4gIH1cbn1cbiIsICIvKipcbiAqIE1hcmtkb3duIEFTVCBQYXJzZXJcbiAqIENvbnZlcnRzIHJhdyBNYXJrZG93biB0ZXh0IGludG8gYW4gYWJzdHJhY3Qgc3ludGF4IHRyZWUuXG4gKiBFYWNoIG5vZGUgaGFzOiB7IHR5cGUsIGNoaWxkcmVuPywgdmFsdWU/LCBwcm9wcz8gfVxuICpcbiAqIFRoaXMgaXMgYSBjdXN0b20gcmVjdXJzaXZlLWRlc2NlbnQgcGFyc2VyIFx1MjAxNCBub3QgYmFzZWQgb24gYW55IGV4aXN0aW5nIGxpYnJhcnkuXG4gKiBJdCBoYW5kbGVzOiBoZWFkaW5ncywgcGFyYWdyYXBocywgbGlzdHMgKG5lc3RlZC9taXhlZCksIGNvZGUgYmxvY2tzLFxuICogaW5saW5lIGNvZGUsIHRhYmxlcywgYmxvY2txdW90ZXMsIGJvbGQsIGl0YWxpYywgbGlua3MsIGltYWdlcywgaHIuXG4gKi9cblxuLyoqIEB0eXBlZGVmIHt7IHR5cGU6IHN0cmluZywgY2hpbGRyZW4/OiBBU1ROb2RlW10sIHZhbHVlPzogc3RyaW5nLCBwcm9wcz86IFJlY29yZDxzdHJpbmcsYW55PiB9fSBBU1ROb2RlICovXG5cbi8qKlxuICogUGFyc2UgTWFya2Rvd24gc291cmNlIGludG8gYW4gQVNULlxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVxuICogQHJldHVybnMge0FTVE5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzb3VyY2UpIHtcbiAgY29uc3QgbGluZXMgPSBzb3VyY2UucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKS5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IHJvb3QgPSB7IHR5cGU6ICdkb2N1bWVudCcsIGNoaWxkcmVuOiBbXSB9O1xuICBsZXQgY3Vyc29yID0gMDtcblxuICB3aGlsZSAoY3Vyc29yIDwgbGluZXMubGVuZ3RoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VCbG9jayhsaW5lcywgY3Vyc29yKTtcbiAgICBpZiAocmVzdWx0Lm5vZGUpIHJvb3QuY2hpbGRyZW4ucHVzaChyZXN1bHQubm9kZSk7XG4gICAgY3Vyc29yID0gcmVzdWx0Lm5leHQ7XG4gIH1cblxuICByZXR1cm4gcm9vdDtcbn1cblxuZnVuY3Rpb24gcGFyc2VCbG9jayhsaW5lcywgY3Vyc29yKSB7XG4gIGNvbnN0IGxpbmUgPSBsaW5lc1tjdXJzb3JdO1xuXG4gIC8vIEJsYW5rIGxpbmUgXHUyMTkyIHNraXBcbiAgaWYgKGxpbmUudHJpbSgpID09PSAnJykge1xuICAgIHJldHVybiB7IG5vZGU6IG51bGwsIG5leHQ6IGN1cnNvciArIDEgfTtcbiAgfVxuXG4gIC8vIEZlbmNlZCBjb2RlIGJsb2NrXG4gIGlmICgvXmBgYChcXHcqKS8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiBwYXJzZUZlbmNlZENvZGUobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBIZWFkaW5nIChBVFggc3R5bGUpXG4gIGNvbnN0IGhlYWRpbmdNYXRjaCA9IGxpbmUubWF0Y2goL14oI3sxLDZ9KVxccysoLispLyk7XG4gIGlmIChoZWFkaW5nTWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9kZToge1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIHByb3BzOiB7IGxldmVsOiBoZWFkaW5nTWF0Y2hbMV0ubGVuZ3RoIH0sXG4gICAgICAgIGNoaWxkcmVuOiBwYXJzZUlubGluZShoZWFkaW5nTWF0Y2hbMl0pLFxuICAgICAgfSxcbiAgICAgIG5leHQ6IGN1cnNvciArIDEsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEhvcml6b250YWwgcnVsZVxuICBpZiAoL14oLXszLH18XFwqezMsfXxfezMsfSlcXHMqJC8udGVzdChsaW5lKSkge1xuICAgIHJldHVybiB7IG5vZGU6IHsgdHlwZTogJ2hyJyB9LCBuZXh0OiBjdXJzb3IgKyAxIH07XG4gIH1cblxuICAvLyBCbG9ja3F1b3RlXG4gIGlmICgvXj5cXHM/Ly50ZXN0KGxpbmUpKSB7XG4gICAgcmV0dXJuIHBhcnNlQmxvY2txdW90ZShsaW5lcywgY3Vyc29yKTtcbiAgfVxuXG4gIC8vIFRhYmxlIChwaXBlIHN5bnRheCB3aXRoIHNlcGFyYXRvciBsaW5lKVxuICBpZiAoXG4gICAgY3Vyc29yICsgMSA8IGxpbmVzLmxlbmd0aCAmJlxuICAgIC9eXFx8LipcXHwkLy50ZXN0KGxpbmUudHJpbSgpKSAmJlxuICAgIC9eXFx8W1xcczpdKi17Myx9Ly50ZXN0KGxpbmVzW2N1cnNvciArIDFdLnRyaW0oKSlcbiAgKSB7XG4gICAgcmV0dXJuIHBhcnNlVGFibGUobGluZXMsIGN1cnNvcik7XG4gIH1cblxuICAvLyBMaXN0IGl0ZW0gKHVub3JkZXJlZDogLSwgKiwgKyBvciBvcmRlcmVkOiAxLilcbiAgaWYgKC9eXFxzKig/OlstKitdfFxcZCtcXC4pXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgcmV0dXJuIHBhcnNlTGlzdChsaW5lcywgY3Vyc29yKTtcbiAgfVxuXG4gIC8vIFBhcmFncmFwaCAoZGVmYXVsdClcbiAgcmV0dXJuIHBhcnNlUGFyYWdyYXBoKGxpbmVzLCBjdXJzb3IpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUZlbmNlZENvZGUobGluZXMsIGN1cnNvcikge1xuICBjb25zdCBvcGVuTWF0Y2ggPSBsaW5lc1tjdXJzb3JdLm1hdGNoKC9eYGBgKFxcdyopLyk7XG4gIGNvbnN0IGxhbmcgPSBvcGVuTWF0Y2ggPyBvcGVuTWF0Y2hbMV0gOiAnJztcbiAgY29uc3QgY29kZUxpbmVzID0gW107XG4gIGxldCBpID0gY3Vyc29yICsgMTtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgIWxpbmVzW2ldLnN0YXJ0c1dpdGgoJ2BgYCcpKSB7XG4gICAgY29kZUxpbmVzLnB1c2gobGluZXNbaV0pO1xuICAgIGkrKztcbiAgfVxuICAvLyBTa2lwIGNsb3NpbmcgYGBgXG4gIGlmIChpIDwgbGluZXMubGVuZ3RoKSBpKys7XG4gIHJldHVybiB7XG4gICAgbm9kZToge1xuICAgICAgdHlwZTogJ2NvZGVCbG9jaycsXG4gICAgICBwcm9wczogeyBsYW5nIH0sXG4gICAgICB2YWx1ZTogY29kZUxpbmVzLmpvaW4oJ1xcbicpLFxuICAgIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VCbG9ja3F1b3RlKGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgcXVvdGVMaW5lcyA9IFtdO1xuICBsZXQgaSA9IGN1cnNvcjtcbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGggJiYgL14+XFxzPy8udGVzdChsaW5lc1tpXSkpIHtcbiAgICBxdW90ZUxpbmVzLnB1c2gobGluZXNbaV0ucmVwbGFjZSgvXj5cXHM/LywgJycpKTtcbiAgICBpKys7XG4gIH1cbiAgY29uc3QgaW5uZXJTb3VyY2UgPSBxdW90ZUxpbmVzLmpvaW4oJ1xcbicpO1xuICBjb25zdCBpbm5lckFzdCA9IHBhcnNlKGlubmVyU291cmNlKTtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiB7IHR5cGU6ICdibG9ja3F1b3RlJywgY2hpbGRyZW46IGlubmVyQXN0LmNoaWxkcmVuIH0sXG4gICAgbmV4dDogaSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUYWJsZShsaW5lcywgY3Vyc29yKSB7XG4gIC8vIEhlYWRlciByb3dcbiAgY29uc3QgaGVhZGVyQ2VsbHMgPSBzcGxpdFRhYmxlUm93KGxpbmVzW2N1cnNvcl0pO1xuICAvLyBTa2lwIHNlcGFyYXRvclxuICBsZXQgaSA9IGN1cnNvciArIDI7XG4gIC8vIEJvZHkgcm93c1xuICBjb25zdCBib2R5Um93cyA9IFtdO1xuICB3aGlsZSAoaSA8IGxpbmVzLmxlbmd0aCAmJiAvXlxcfC8udGVzdChsaW5lc1tpXS50cmltKCkpKSB7XG4gICAgYm9keVJvd3MucHVzaChzcGxpdFRhYmxlUm93KGxpbmVzW2ldKSk7XG4gICAgaSsrO1xuICB9XG4gIHJldHVybiB7XG4gICAgbm9kZToge1xuICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgIHByb3BzOiB7IGhlYWRlcnM6IGhlYWRlckNlbGxzIH0sXG4gICAgICBjaGlsZHJlbjogYm9keVJvd3MubWFwKChjZWxscykgPT4gKHsgdHlwZTogJ3RhYmxlUm93JywgcHJvcHM6IHsgY2VsbHMgfSB9KSksXG4gICAgfSxcbiAgICBuZXh0OiBpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzcGxpdFRhYmxlUm93KGxpbmUpIHtcbiAgcmV0dXJuIGxpbmVcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL15cXHx8XFx8JC9nLCAnJylcbiAgICAuc3BsaXQoJ3wnKVxuICAgIC5tYXAoKGMpID0+IGMudHJpbSgpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaXN0KGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgaXRlbXMgPSBbXTtcbiAgbGV0IGkgPSBjdXJzb3I7XG5cbiAgd2hpbGUgKGkgPCBsaW5lcy5sZW5ndGgpIHtcbiAgICBjb25zdCBpdGVtTWF0Y2ggPSBsaW5lc1tpXS5tYXRjaCgvXihcXHMqKShbLSorXXxcXGQrXFwuKVxccysoLiopLyk7XG4gICAgaWYgKCFpdGVtTWF0Y2gpIGJyZWFrO1xuXG4gICAgY29uc3QgaW5kZW50ID0gaXRlbU1hdGNoWzFdLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpLmxlbmd0aDtcbiAgICBjb25zdCBtYXJrZXIgPSBpdGVtTWF0Y2hbMl07XG4gICAgY29uc3Qgb3JkZXJlZCA9IC9eXFxkK1xcLiQvLnRlc3QobWFya2VyKTtcbiAgICBjb25zdCBjb250ZW50ID0gaXRlbU1hdGNoWzNdO1xuXG4gICAgLy8gQ29sbGVjdCBjb250aW51YXRpb24gLyBzdWItaXRlbXNcbiAgICBjb25zdCBzdWJMaW5lcyA9IFtdO1xuICAgIGxldCBqID0gaSArIDE7XG4gICAgd2hpbGUgKGogPCBsaW5lcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG5leHRNYXRjaCA9IGxpbmVzW2pdLm1hdGNoKC9eKFxccyopKFstKitdfFxcZCtcXC4pXFxzLyk7XG4gICAgICBpZiAobmV4dE1hdGNoKSB7XG4gICAgICAgIGNvbnN0IG5leHRJbmRlbnQgPSBuZXh0TWF0Y2hbMV0ucmVwbGFjZSgvXFx0L2csICcgICAgJykubGVuZ3RoO1xuICAgICAgICBpZiAobmV4dEluZGVudCA+IGluZGVudCkge1xuICAgICAgICAgIHN1YkxpbmVzLnB1c2gobGluZXNbal0pO1xuICAgICAgICAgIGorKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIENvbnRpbnVhdGlvbiBsaW5lIChpbmRlbnRlZCB0ZXh0KVxuICAgICAgaWYgKGxpbmVzW2pdLnRyaW0oKSA9PT0gJycgfHwgL15cXHN7Mix9Ly50ZXN0KGxpbmVzW2pdKSkge1xuICAgICAgICBzdWJMaW5lcy5wdXNoKGxpbmVzW2pdKTtcbiAgICAgICAgaisrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICB0eXBlOiAnbGlzdEl0ZW0nLFxuICAgICAgcHJvcHM6IHsgb3JkZXJlZCwgZGVwdGg6IE1hdGguZmxvb3IoaW5kZW50IC8gMikgfSxcbiAgICAgIGNoaWxkcmVuOiBwYXJzZUlubGluZShjb250ZW50KSxcbiAgICB9O1xuXG4gICAgLy8gUGFyc2UgbmVzdGVkIGxpc3QgZnJvbSBzdWItbGluZXNcbiAgICBpZiAoc3ViTGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZGVkZW50ZWQgPSBzdWJMaW5lcy5tYXAoKGwpID0+IGwucmVwbGFjZShuZXcgUmVnRXhwKGBeXFxcXHN7JHtpbmRlbnQgKyAyfX1gKSwgJycpKTtcbiAgICAgIGNvbnN0IHN1YkFzdCA9IHBhcnNlKGRlZGVudGVkLmpvaW4oJ1xcbicpKTtcbiAgICAgIGlmIChzdWJBc3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBpdGVtLmNoaWxkcmVuID0gWy4uLml0ZW0uY2hpbGRyZW4sIC4uLnN1YkFzdC5jaGlsZHJlbl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICBpID0gajtcbiAgfVxuXG4gIGNvbnN0IGZpcnN0T3JkZXJlZCA9IGl0ZW1zWzBdPy5wcm9wcz8ub3JkZXJlZDtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiB7XG4gICAgICB0eXBlOiAnbGlzdCcsXG4gICAgICBwcm9wczogeyBvcmRlcmVkOiBmaXJzdE9yZGVyZWQgfSxcbiAgICAgIGNoaWxkcmVuOiBpdGVtcyxcbiAgICB9LFxuICAgIG5leHQ6IGksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYWdyYXBoKGxpbmVzLCBjdXJzb3IpIHtcbiAgY29uc3QgcGFyYUxpbmVzID0gW107XG4gIGxldCBpID0gY3Vyc29yO1xuICB3aGlsZSAoaSA8IGxpbmVzLmxlbmd0aCAmJiBsaW5lc1tpXS50cmltKCkgIT09ICcnICYmICFpc0Jsb2NrU3RhcnQobGluZXMsIGkpKSB7XG4gICAgcGFyYUxpbmVzLnB1c2gobGluZXNbaV0pO1xuICAgIGkrKztcbiAgfVxuICByZXR1cm4ge1xuICAgIG5vZGU6IHtcbiAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgY2hpbGRyZW46IHBhcnNlSW5saW5lKHBhcmFMaW5lcy5qb2luKCdcXG4nKSksXG4gICAgfSxcbiAgICBuZXh0OiBpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0Jsb2NrU3RhcnQobGluZXMsIGkpIHtcbiAgY29uc3QgbGluZSA9IGxpbmVzW2ldO1xuICBpZiAoL14jezEsNn1cXHMvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15gYGAvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL14+XFxzLy50ZXN0KGxpbmUpKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKC9eKC17Myx9fFxcKnszLH18X3szLH0pXFxzKiQvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15cXHMqKD86Wy0qK118XFxkK1xcLilcXHMvLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xuICBpZiAoL15cXHwuKlxcfCQvLnRlc3QobGluZS50cmltKCkpICYmIGkgKyAxIDwgbGluZXMubGVuZ3RoICYmIC9eXFx8W1xcczpdKi17Myx9Ly50ZXN0KGxpbmVzW2kgKyAxXSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBJbmxpbmUgUGFyc2VyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG4vKipcbiAqIFBhcnNlIGlubGluZSBNYXJrZG93biBlbGVtZW50cy5cbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgaW5saW5lIEFTVCBub2Rlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7QVNUTm9kZVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbmxpbmUodGV4dCkge1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBsZXQgcmVtYWluaW5nID0gdGV4dDtcblxuICB3aGlsZSAocmVtYWluaW5nLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuXG4gICAgLy8gQm9sZCtJdGFsaWMgKioqdGV4dCoqKlxuICAgIGNvbnN0IGJvbGRJdGFsaWMgPSByZW1haW5pbmcubWF0Y2goL15cXCp7M30oLis/KVxcKnszfS8pO1xuICAgIGlmIChib2xkSXRhbGljKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2JvbGRJdGFsaWMnLCBjaGlsZHJlbjogcGFyc2VJbmxpbmUoYm9sZEl0YWxpY1sxXSkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoYm9sZEl0YWxpY1swXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBCb2xkICoqdGV4dCoqXG4gICAgY29uc3QgYm9sZCA9IHJlbWFpbmluZy5tYXRjaCgvXlxcKnsyfSguKz8pXFwqezJ9Lyk7XG4gICAgaWYgKGJvbGQpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnYm9sZCcsIGNoaWxkcmVuOiBwYXJzZUlubGluZShib2xkWzFdKSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShib2xkWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEl0YWxpYyAqdGV4dCpcbiAgICBjb25zdCBpdGFsaWMgPSByZW1haW5pbmcubWF0Y2goL15cXCooW14qXSs/KVxcKi8pO1xuICAgIGlmIChpdGFsaWMpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnaXRhbGljJywgY2hpbGRyZW46IHBhcnNlSW5saW5lKGl0YWxpY1sxXSkgfSk7XG4gICAgICByZW1haW5pbmcgPSByZW1haW5pbmcuc2xpY2UoaXRhbGljWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIFN0cmlrZXRocm91Z2ggfn50ZXh0fn5cbiAgICBjb25zdCBzdHJpa2UgPSByZW1haW5pbmcubWF0Y2goL15+figuKz8pfn4vKTtcbiAgICBpZiAoc3RyaWtlKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ3N0cmlrZXRocm91Z2gnLCB2YWx1ZTogc3RyaWtlWzFdIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKHN0cmlrZVswXS5sZW5ndGgpO1xuICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBJbmxpbmUgY29kZSBgdGV4dGBcbiAgICBjb25zdCBpbmxpbmVDb2RlID0gcmVtYWluaW5nLm1hdGNoKC9eYChbXmBdKylgLyk7XG4gICAgaWYgKGlubGluZUNvZGUpIHtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAnaW5saW5lQ29kZScsIHZhbHVlOiBpbmxpbmVDb2RlWzFdIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGlubGluZUNvZGVbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gSW1hZ2UgIVthbHRdKHNyYylcbiAgICBjb25zdCBpbWFnZSA9IHJlbWFpbmluZy5tYXRjaCgvXiFcXFsoW15cXF1dKilcXF1cXCgoW14pXSspXFwpLyk7XG4gICAgaWYgKGltYWdlKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2ltYWdlJywgcHJvcHM6IHsgYWx0OiBpbWFnZVsxXSwgc3JjOiBpbWFnZVsyXSB9IH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGltYWdlWzBdLmxlbmd0aCk7XG4gICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIExpbmsgW3RleHRdKHVybClcbiAgICBjb25zdCBsaW5rID0gcmVtYWluaW5nLm1hdGNoKC9eXFxbKFteXFxdXSspXFxdXFwoKFteKV0rKVxcKS8pO1xuICAgIGlmIChsaW5rKSB7XG4gICAgICBub2Rlcy5wdXNoKHsgdHlwZTogJ2xpbmsnLCBwcm9wczogeyB1cmw6IGxpbmtbMl0gfSwgY2hpbGRyZW46IHBhcnNlSW5saW5lKGxpbmtbMV0pIH0pO1xuICAgICAgcmVtYWluaW5nID0gcmVtYWluaW5nLnNsaWNlKGxpbmtbMF0ubGVuZ3RoKTtcbiAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gUGxhaW4gdGV4dCAoY29uc3VtZSBvbmUgY2hhciBhdCBhIHRpbWUgdW50aWwgbmV4dCBzcGVjaWFsIGNoYXIpXG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICBjb25zdCBuZXh0U3BlY2lhbCA9IHJlbWFpbmluZy5zbGljZSgxKS5zZWFyY2goL1sqfmAhXFxbXS8pO1xuICAgICAgY29uc3QgZW5kID0gbmV4dFNwZWNpYWwgPT09IC0xID8gcmVtYWluaW5nLmxlbmd0aCA6IG5leHRTcGVjaWFsICsgMTtcbiAgICAgIG5vZGVzLnB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlOiByZW1haW5pbmcuc2xpY2UoMCwgZW5kKSB9KTtcbiAgICAgIHJlbWFpbmluZyA9IHJlbWFpbmluZy5zbGljZShlbmQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub2Rlcztcbn1cbiIsICIvKipcbiAqIEFTVCBUcmFuc2Zvcm1lclxuICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbnMgdG8gdGhlIHBhcnNlZCBBU1QgYmVmb3JlIGVtaXNzaW9uLlxuICogRWFjaCB0cmFuc2Zvcm1lciBpcyBhIHZpc2l0b3IgZnVuY3Rpb24gdGhhdCBjYW4gbW9kaWZ5IG5vZGVzIGluLXBsYWNlLlxuICpcbiAqIEZvbGxvd3MgdGhlIFZpc2l0b3IgUGF0dGVybiBcdTIwMTQgbmV3IHRyYW5zZm9ybWF0aW9ucyBjYW4gYmUgYWRkZWRcbiAqIHdpdGhvdXQgbW9kaWZ5aW5nIGV4aXN0aW5nIGNvZGUgKE9wZW4tQ2xvc2VkIFByaW5jaXBsZSkuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7KG5vZGU6IEFTVE5vZGUsIHBhcmVudD86IEFTVE5vZGUpID0+IEFTVE5vZGV8bnVsbH0gVHJhbnNmb3JtVmlzaXRvclxuICovXG5cbi8qKlxuICogV2FsayBhbiBBU1QgdHJlZSBhbmQgYXBwbHkgdmlzaXRvciB0byBlYWNoIG5vZGUgKGRlcHRoLWZpcnN0KS5cbiAqIElmIHZpc2l0b3IgcmV0dXJucyBudWxsLCB0aGUgbm9kZSBpcyByZW1vdmVkLlxuICogQHBhcmFtIHtBU1ROb2RlfSBhc3RcbiAqIEBwYXJhbSB7VHJhbnNmb3JtVmlzaXRvcn0gdmlzaXRvclxuICogQHJldHVybnMge0FTVE5vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxrQW5kVHJhbnNmb3JtKGFzdCwgdmlzaXRvcikge1xuICBjb25zdCByZXN1bHQgPSB2aXNpdG9yKGFzdCk7XG4gIGlmICghcmVzdWx0KSByZXR1cm4gbnVsbDtcblxuICBpZiAocmVzdWx0LmNoaWxkcmVuICYmIEFycmF5LmlzQXJyYXkocmVzdWx0LmNoaWxkcmVuKSkge1xuICAgIHJlc3VsdC5jaGlsZHJlbiA9IHJlc3VsdC5jaGlsZHJlblxuICAgICAgLm1hcCgoY2hpbGQpID0+IHdhbGtBbmRUcmFuc2Zvcm0oY2hpbGQsIHZpc2l0b3IpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29tcG9zZSBtdWx0aXBsZSB2aXNpdG9ycyBpbnRvIGEgc2luZ2xlIHZpc2l0b3IuXG4gKiBWaXNpdG9ycyBhcmUgYXBwbGllZCBpbiBvcmRlci5cbiAqIEBwYXJhbSB7VHJhbnNmb3JtVmlzaXRvcltdfSB2aXNpdG9yc1xuICogQHJldHVybnMge1RyYW5zZm9ybVZpc2l0b3J9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlVmlzaXRvcnMoLi4udmlzaXRvcnMpIHtcbiAgcmV0dXJuIChub2RlLCBwYXJlbnQpID0+IHtcbiAgICBsZXQgY3VycmVudCA9IG5vZGU7XG4gICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHZpc2l0b3JzKSB7XG4gICAgICBjdXJyZW50ID0gdmlzaXRvcihjdXJyZW50LCBwYXJlbnQpO1xuICAgICAgaWYgKCFjdXJyZW50KSByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH07XG59XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMCBCdWlsdC1pbiBUcmFuc2Zvcm1lcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbi8qKlxuICogQ29sbGFwc2UgY29uc2VjdXRpdmUgYmxhbmsgcGFyYWdyYXBocyBpbnRvIGEgc2luZ2xlIGJyZWFrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29sbGFwc2VCbGFua0xpbmVzKG5vZGUpIHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ2RvY3VtZW50JyAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gW107XG4gICAgbGV0IHByZXZCbGFuayA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29uc3QgaXNCbGFuayA9IGNoaWxkLnR5cGUgPT09ICdwYXJhZ3JhcGgnICYmXG4gICAgICAgIGNoaWxkLmNoaWxkcmVuPy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgY2hpbGQuY2hpbGRyZW5bMF0udHlwZSA9PT0gJ3RleHQnICYmXG4gICAgICAgIGNoaWxkLmNoaWxkcmVuWzBdLnZhbHVlPy50cmltKCkgPT09ICcnO1xuICAgICAgaWYgKGlzQmxhbmspIHtcbiAgICAgICAgaWYgKCFwcmV2QmxhbmspIGNvbGxhcHNlZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgcHJldkJsYW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxhcHNlZC5wdXNoKGNoaWxkKTtcbiAgICAgICAgcHJldkJsYW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IC4uLm5vZGUsIGNoaWxkcmVuOiBjb2xsYXBzZWQgfTtcbiAgfVxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemUgbGlzdCBpdGVtIGRlcHRoIGJhc2VkIG9uIGFjdHVhbCBuZXN0aW5nIGxldmVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTGlzdERlcHRoKG5vZGUsIF9wYXJlbnQsIGRlcHRoID0gMCkge1xuICBpZiAobm9kZS50eXBlID09PSAnbGlzdEl0ZW0nKSB7XG4gICAgcmV0dXJuIHsgLi4ubm9kZSwgcHJvcHM6IHsgLi4ubm9kZS5wcm9wcywgcmVzb2x2ZWREZXB0aDogZGVwdGggfSB9O1xuICB9XG4gIGlmIChub2RlLnR5cGUgPT09ICdsaXN0JyAmJiBub2RlLmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm5vZGUsXG4gICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBub3JtYWxpemVMaXN0RGVwdGgoY2hpbGQsIG5vZGUsIGRlcHRoICsgMSkpLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIG5vZGU7XG59XG4iLCAiLyoqXG4gKiBKaXJhIFdpa2kgTWFya3VwIEVtaXR0ZXJcbiAqIENvbnZlcnRzIGFuIEFTVCBpbnRvIEppcmEgd2lraSBtYXJrdXAgc3RyaW5nLlxuICpcbiAqIEVhY2ggbm9kZSB0eXBlIGhhcyBpdHMgb3duIGVtaXQgZnVuY3Rpb24gXHUyMDE0IGZvbGxvd3MgdGhlIFN0cmF0ZWd5IFBhdHRlcm5cbiAqIHBlciBub2RlIHR5cGUuIE5ldyBub2RlIHR5cGVzIGNhbiBiZSBhZGRlZCB3aXRob3V0IG1vZGlmeWluZyBleGlzdGluZyBlbWl0dGVycy5cbiAqL1xuXG4vKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIChub2RlOiBBU1ROb2RlLCBjdHg6IEVtaXRDb250ZXh0KSA9PiBzdHJpbmc+fSAqL1xuY29uc3QgZW1pdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBSZWdpc3RlciBhbiBlbWl0dGVyIGZvciBhIG5vZGUgdHlwZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBub2RlVHlwZVxuICogQHBhcmFtIHsobm9kZTogQVNUTm9kZSwgY3R4OiBFbWl0Q29udGV4dCkgPT4gc3RyaW5nfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJFbWl0dGVyKG5vZGVUeXBlLCBmbikge1xuICBlbWl0dGVyc1tub2RlVHlwZV0gPSBmbjtcbn1cblxuLyoqXG4gKiBFbWl0IGFuIEFTVCBub2RlIHRvIEppcmEgd2lraSBtYXJrdXAuXG4gKiBAcGFyYW0ge0FTVE5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7RW1pdENvbnRleHR9IFtjdHhdXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW1pdChub2RlLCBjdHggPSB7IGxpc3RTdGFjazogW10gfSkge1xuICBjb25zdCBmbiA9IGVtaXR0ZXJzW25vZGUudHlwZV07XG4gIGlmICghZm4pIHtcbiAgICAvLyBGYWxsYmFjazogZW1pdCBjaGlsZHJlbiBvciB2YWx1ZVxuICAgIGlmIChub2RlLmNoaWxkcmVuKSByZXR1cm4gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gICAgcmV0dXJuIG5vZGUudmFsdWUgfHwgJyc7XG4gIH1cbiAgcmV0dXJuIGZuKG5vZGUsIGN0eCk7XG59XG5cbmZ1bmN0aW9uIGVtaXRDaGlsZHJlbihub2RlLCBjdHgpIHtcbiAgaWYgKCFub2RlLmNoaWxkcmVuKSByZXR1cm4gJyc7XG4gIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJycpO1xufVxuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgUmVnaXN0ZXIgQnVpbHQtaW4gRW1pdHRlcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG5cbnJlZ2lzdGVyRW1pdHRlcignZG9jdW1lbnQnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBub2RlLmNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGVtaXQoY2hpbGQsIGN0eCkpLmpvaW4oJ1xcbicpO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignaGVhZGluZycsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3QgbGV2ZWwgPSBub2RlLnByb3BzPy5sZXZlbCB8fCAxO1xuICBjb25zdCBjb250ZW50ID0gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gIHJldHVybiBgaCR7bGV2ZWx9LiAke2NvbnRlbnR9XFxuYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ3BhcmFncmFwaCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGVtaXRDaGlsZHJlbihub2RlLCBjdHgpICsgJ1xcbic7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdocicsICgpID0+ICctLS0tXFxuJyk7XG5cbnJlZ2lzdGVyRW1pdHRlcignY29kZUJsb2NrJywgKG5vZGUpID0+IHtcbiAgY29uc3QgbGFuZyA9IG5vZGUucHJvcHM/Lmxhbmc7XG4gIGNvbnN0IHRhZyA9IGxhbmcgPyBge2NvZGU6JHtsYW5nfX1gIDogJ3tjb2RlfSc7XG4gIHJldHVybiBgJHt0YWd9XFxuJHtub2RlLnZhbHVlfVxcbntjb2RlfVxcbmA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdibG9ja3F1b3RlJywgKG5vZGUsIGN0eCkgPT4ge1xuICBjb25zdCBpbm5lciA9IG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gZW1pdChjaGlsZCwgY3R4KSkuam9pbignXFxuJykudHJpbSgpO1xuICBjb25zdCBsaW5lcyA9IGlubmVyLnNwbGl0KCdcXG4nKTtcbiAgaWYgKGxpbmVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBgYnEuICR7aW5uZXJ9XFxuYDtcbiAgfVxuICByZXR1cm4gYHtxdW90ZX1cXG4ke2lubmVyfVxcbntxdW90ZX1cXG5gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcigndGFibGUnLCAobm9kZSwgY3R4KSA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBub2RlLnByb3BzPy5oZWFkZXJzIHx8IFtdO1xuICBjb25zdCBoZWFkZXJSb3cgPSBgfHwke2hlYWRlcnMuam9pbignfHwnKX18fGA7XG4gIGNvbnN0IGJvZHlSb3dzID0gbm9kZS5jaGlsZHJlblxuICAgIC5tYXAoKHJvdykgPT4ge1xuICAgICAgY29uc3QgY2VsbHMgPSByb3cucHJvcHM/LmNlbGxzIHx8IFtdO1xuICAgICAgcmV0dXJuIGB8JHtjZWxscy5qb2luKCd8Jyl9fGA7XG4gICAgfSlcbiAgICAuam9pbignXFxuJyk7XG4gIHJldHVybiBgJHtoZWFkZXJSb3d9XFxuJHtib2R5Um93c31cXG5gO1xufSk7XG5cbnJlZ2lzdGVyRW1pdHRlcignbGlzdCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gZW1pdChjaGlsZCwgY3R4KSkuam9pbignJyk7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdsaXN0SXRlbScsIChub2RlLCBjdHgpID0+IHtcbiAgY29uc3Qgb3JkZXJlZCA9IG5vZGUucHJvcHM/Lm9yZGVyZWQ7XG4gIGNvbnN0IGRlcHRoID0gKG5vZGUucHJvcHM/LnJlc29sdmVkRGVwdGggfHwgbm9kZS5wcm9wcz8uZGVwdGggfHwgMCkgKyAxO1xuICBjb25zdCBtYXJrZXIgPSBvcmRlcmVkID8gJyMnIDogJyonO1xuICBjb25zdCBwcmVmaXggPSBtYXJrZXIucmVwZWF0KGRlcHRoKTtcblxuICAvLyBTZXBhcmF0ZSBpbmxpbmUgY2hpbGRyZW4gZnJvbSBuZXN0ZWQgYmxvY2sgY2hpbGRyZW5cbiAgY29uc3QgaW5saW5lTm9kZXMgPSBbXTtcbiAgY29uc3QgYmxvY2tOb2RlcyA9IFtdO1xuICBmb3IgKGNvbnN0IGNoaWxkIG9mIChub2RlLmNoaWxkcmVuIHx8IFtdKSkge1xuICAgIGlmIChjaGlsZC50eXBlID09PSAnbGlzdCcpIHtcbiAgICAgIGJsb2NrTm9kZXMucHVzaChjaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlubGluZU5vZGVzLnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnQgPSBpbmxpbmVOb2Rlcy5tYXAoKGMpID0+IGVtaXQoYywgY3R4KSkuam9pbignJyk7XG4gIGxldCByZXN1bHQgPSBgJHtwcmVmaXh9ICR7Y29udGVudH1cXG5gO1xuXG4gIC8vIEVtaXQgbmVzdGVkIGxpc3RzXG4gIGZvciAoY29uc3QgYmxvY2sgb2YgYmxvY2tOb2Rlcykge1xuICAgIHJlc3VsdCArPSBlbWl0KGJsb2NrLCBjdHgpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDAgSW5saW5lIEVtaXR0ZXJzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuXG5yZWdpc3RlckVtaXR0ZXIoJ3RleHQnLCAobm9kZSkgPT4gbm9kZS52YWx1ZSB8fCAnJyk7XG5cbnJlZ2lzdGVyRW1pdHRlcignYm9sZCcsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGAqJHtlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KX0qYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2l0YWxpYycsIChub2RlLCBjdHgpID0+IHtcbiAgcmV0dXJuIGBfJHtlbWl0Q2hpbGRyZW4obm9kZSwgY3R4KX1fYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2JvbGRJdGFsaWMnLCAobm9kZSwgY3R4KSA9PiB7XG4gIHJldHVybiBgXyoke2VtaXRDaGlsZHJlbihub2RlLCBjdHgpfSpfYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ3N0cmlrZXRocm91Z2gnLCAobm9kZSkgPT4ge1xuICByZXR1cm4gYC0ke25vZGUudmFsdWV9LWA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdpbmxpbmVDb2RlJywgKG5vZGUpID0+IHtcbiAgcmV0dXJuIGB7eyR7bm9kZS52YWx1ZX19fWA7XG59KTtcblxucmVnaXN0ZXJFbWl0dGVyKCdsaW5rJywgKG5vZGUsIGN0eCkgPT4ge1xuICBjb25zdCB0ZXh0ID0gZW1pdENoaWxkcmVuKG5vZGUsIGN0eCk7XG4gIGNvbnN0IHVybCA9IG5vZGUucHJvcHM/LnVybCB8fCAnJztcbiAgcmV0dXJuIGBbJHt0ZXh0fXwke3VybH1dYDtcbn0pO1xuXG5yZWdpc3RlckVtaXR0ZXIoJ2ltYWdlJywgKG5vZGUpID0+IHtcbiAgY29uc3Qgc3JjID0gbm9kZS5wcm9wcz8uc3JjIHx8ICcnO1xuICByZXR1cm4gYCEke3NyY30hYDtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBYUEsZUFBUyxrQkFBa0IsUUFBUSxPQUFPO0FBQ3hDLGlCQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JD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LEVBQzNDO0FBT08sV0FBUyxlQUFlLFVBQVU7QUFDdkMsV0FBTyxhQUFhLGFBQWEsUUFBUTtBQUFBLEVBQzNDO0FBS08sTUFBTUUsT0FBTSxhQUFhOyIsCiAgIm5hbWVzIjogWyJnZXRFc2NhcGVSZXBsYWNlbWVudCIsICJub29wVGVzdCIsICJsZXhlciIsICJUb2tlbml6ZXIiLCAib3B0aW9ucyIsICJsaXN0IiwgImxpbmsiLCAibWFuZ2xlIiwgInNtYXJ0eXBhbnRzIiwgIkxleGVyIiwgInJ1bGVzIiwgIm5leHQiLCAiaW5saW5lIiwgIlJlbmRlcmVyIiwgIlRleHRSZW5kZXJlciIsICJTbHVnZ2VyIiwgInNsdWciLCAiUGFyc2VyIiwgInBhcnNlIiwgInBhcnNlciIsICJwYXJzZUlubGluZSIsICJjZWxsIiwgIkhvb2tzIiwgImRvbmUiLCAic3JjIiwgInRva2VucyIsICJodG1sIiwgImFyZ3MiLCAiX2xvb3AiLCAicHJvcCIsICJfbG9vcDIiLCAiX2xvb3AzIiwgInJldCIsICJfbG9vcDQiLCAiSjJNIiwgIkoyTSIsICJydWxlcyIsICJpc0Jsb2NrIiwgImlzVm9pZCIsICJub2RlIiwgIm5leHQiLCAicm9vdCIsICJydWxlcyIsICJjZWxsIiwgImNsZWFuQ2VsbENvbnRlbnQiLCAiY2VsbCIsICJyb290IiwgImlzQmxhbmsiLCAiSjJNIiwgImNlbGwiLCAiSjJNIl0KfQo=
