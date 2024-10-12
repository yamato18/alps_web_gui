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

  // ../../../node_modules/@foxglove/rosmsg/dist/index.js
  var require_dist = __commonJS({
    "../../../node_modules/@foxglove/rosmsg/dist/index.js"(exports, module) {
      (() => {
        var __webpack_modules__ = {
          /***/
          417: (
            /***/
            (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
              "use strict";
              __webpack_require__2.r(__webpack_exports__2);
              __webpack_require__2.d(__webpack_exports__2, {
                /* harmony export */
                "Md5": () => (
                  /* binding */
                  Md5
                )
                /* harmony export */
              });
              var Md5 = (
                /** @class */
                function() {
                  function Md52() {
                  }
                  Md52.AddUnsigned = function(lX, lY) {
                    var lX4, lY4, lX8, lY8, lResult;
                    lX8 = lX & 2147483648;
                    lY8 = lY & 2147483648;
                    lX4 = lX & 1073741824;
                    lY4 = lY & 1073741824;
                    lResult = (lX & 1073741823) + (lY & 1073741823);
                    if (!!(lX4 & lY4)) {
                      return lResult ^ 2147483648 ^ lX8 ^ lY8;
                    }
                    if (!!(lX4 | lY4)) {
                      if (!!(lResult & 1073741824)) {
                        return lResult ^ 3221225472 ^ lX8 ^ lY8;
                      } else {
                        return lResult ^ 1073741824 ^ lX8 ^ lY8;
                      }
                    } else {
                      return lResult ^ lX8 ^ lY8;
                    }
                  };
                  Md52.FF = function(a, b, c, d, x, s, ac) {
                    a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
                    return this.AddUnsigned(this.RotateLeft(a, s), b);
                  };
                  Md52.GG = function(a, b, c, d, x, s, ac) {
                    a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
                    return this.AddUnsigned(this.RotateLeft(a, s), b);
                  };
                  Md52.HH = function(a, b, c, d, x, s, ac) {
                    a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
                    return this.AddUnsigned(this.RotateLeft(a, s), b);
                  };
                  Md52.II = function(a, b, c, d, x, s, ac) {
                    a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
                    return this.AddUnsigned(this.RotateLeft(a, s), b);
                  };
                  Md52.ConvertToWordArray = function(string) {
                    var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
                    while (lByteCount < lMessageLength) {
                      lWordCount = (lByteCount - lByteCount % 4) / 4;
                      lBytePosition = lByteCount % 4 * 8;
                      lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
                      lByteCount++;
                    }
                    lWordCount = (lByteCount - lByteCount % 4) / 4;
                    lBytePosition = lByteCount % 4 * 8;
                    lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
                    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                    return lWordArray;
                  };
                  Md52.WordToHex = function(lValue) {
                    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
                    for (lCount = 0; lCount <= 3; lCount++) {
                      lByte = lValue >>> lCount * 8 & 255;
                      WordToHexValue_temp = "0" + lByte.toString(16);
                      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                    }
                    return WordToHexValue;
                  };
                  Md52.Utf8Encode = function(string) {
                    var utftext = "", c;
                    string = string.replace(/\r\n/g, "\n");
                    for (var n = 0; n < string.length; n++) {
                      c = string.charCodeAt(n);
                      if (c < 128) {
                        utftext += String.fromCharCode(c);
                      } else if (c > 127 && c < 2048) {
                        utftext += String.fromCharCode(c >> 6 | 192);
                        utftext += String.fromCharCode(c & 63 | 128);
                      } else {
                        utftext += String.fromCharCode(c >> 12 | 224);
                        utftext += String.fromCharCode(c >> 6 & 63 | 128);
                        utftext += String.fromCharCode(c & 63 | 128);
                      }
                    }
                    return utftext;
                  };
                  Md52.init = function(string) {
                    var temp;
                    if (typeof string !== "string")
                      string = JSON.stringify(string);
                    this._string = this.Utf8Encode(string);
                    this.x = this.ConvertToWordArray(this._string);
                    this.a = 1732584193;
                    this.b = 4023233417;
                    this.c = 2562383102;
                    this.d = 271733878;
                    for (this.k = 0; this.k < this.x.length; this.k += 16) {
                      this.AA = this.a;
                      this.BB = this.b;
                      this.CC = this.c;
                      this.DD = this.d;
                      this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 3614090360);
                      this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 3905402710);
                      this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 606105819);
                      this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 3250441966);
                      this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 4118548399);
                      this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 1200080426);
                      this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 2821735955);
                      this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 4249261313);
                      this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 1770035416);
                      this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 2336552879);
                      this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 4294925233);
                      this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 2304563134);
                      this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 1804603682);
                      this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 4254626195);
                      this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 2792965006);
                      this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 1236535329);
                      this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 4129170786);
                      this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 3225465664);
                      this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 643717713);
                      this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 3921069994);
                      this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 3593408605);
                      this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 38016083);
                      this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 3634488961);
                      this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 3889429448);
                      this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 568446438);
                      this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 3275163606);
                      this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 4107603335);
                      this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 1163531501);
                      this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 2850285829);
                      this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 4243563512);
                      this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 1735328473);
                      this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 2368359562);
                      this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 4294588738);
                      this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 2272392833);
                      this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 1839030562);
                      this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 4259657740);
                      this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 2763975236);
                      this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 1272893353);
                      this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 4139469664);
                      this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 3200236656);
                      this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 681279174);
                      this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 3936430074);
                      this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 3572445317);
                      this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 76029189);
                      this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 3654602809);
                      this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 3873151461);
                      this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 530742520);
                      this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 3299628645);
                      this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 4096336452);
                      this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 1126891415);
                      this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 2878612391);
                      this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 4237533241);
                      this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 1700485571);
                      this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 2399980690);
                      this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 4293915773);
                      this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 2240044497);
                      this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 1873313359);
                      this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 4264355552);
                      this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 2734768916);
                      this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 1309151649);
                      this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 4149444226);
                      this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 3174756917);
                      this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 718787259);
                      this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 3951481745);
                      this.a = this.AddUnsigned(this.a, this.AA);
                      this.b = this.AddUnsigned(this.b, this.BB);
                      this.c = this.AddUnsigned(this.c, this.CC);
                      this.d = this.AddUnsigned(this.d, this.DD);
                    }
                    temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
                    return temp.toLowerCase();
                  };
                  Md52.x = Array();
                  Md52.S11 = 7;
                  Md52.S12 = 12;
                  Md52.S13 = 17;
                  Md52.S14 = 22;
                  Md52.S21 = 5;
                  Md52.S22 = 9;
                  Md52.S23 = 14;
                  Md52.S24 = 20;
                  Md52.S31 = 4;
                  Md52.S32 = 11;
                  Md52.S33 = 16;
                  Md52.S34 = 23;
                  Md52.S41 = 6;
                  Md52.S42 = 10;
                  Md52.S43 = 15;
                  Md52.S44 = 21;
                  Md52.RotateLeft = function(lValue, iShiftBits) {
                    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
                  };
                  Md52.F = function(x, y, z) {
                    return x & y | ~x & z;
                  };
                  Md52.G = function(x, y, z) {
                    return x & z | y & ~z;
                  };
                  Md52.H = function(x, y, z) {
                    return x ^ y ^ z;
                  };
                  Md52.I = function(x, y, z) {
                    return y ^ (x | ~z);
                  };
                  return Md52;
                }()
              );
            }
          ),
          /***/
          271: (
            /***/
            function(module2, exports2) {
              var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
              (function(root, factory) {
                if (true) {
                  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                } else {
                }
              })(this, function() {
                "use strict";
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var toString = Object.prototype.toString;
                var hasSticky = typeof new RegExp().sticky === "boolean";
                function isRegExp(o) {
                  return o && toString.call(o) === "[object RegExp]";
                }
                function isObject(o) {
                  return o && typeof o === "object" && !isRegExp(o) && !Array.isArray(o);
                }
                function reEscape(s) {
                  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                }
                function reGroups(s) {
                  var re = new RegExp("|" + s);
                  return re.exec("").length - 1;
                }
                function reCapture(s) {
                  return "(" + s + ")";
                }
                function reUnion(regexps) {
                  if (!regexps.length) return "(?!)";
                  var source = regexps.map(function(s) {
                    return "(?:" + s + ")";
                  }).join("|");
                  return "(?:" + source + ")";
                }
                function regexpOrLiteral(obj) {
                  if (typeof obj === "string") {
                    return "(?:" + reEscape(obj) + ")";
                  } else if (isRegExp(obj)) {
                    if (obj.ignoreCase) throw new Error("RegExp /i flag not allowed");
                    if (obj.global) throw new Error("RegExp /g flag is implied");
                    if (obj.sticky) throw new Error("RegExp /y flag is implied");
                    if (obj.multiline) throw new Error("RegExp /m flag is implied");
                    return obj.source;
                  } else {
                    throw new Error("Not a pattern: " + obj);
                  }
                }
                function objectToRules(object) {
                  var keys = Object.getOwnPropertyNames(object);
                  var result = [];
                  for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var thing = object[key];
                    var rules = [].concat(thing);
                    if (key === "include") {
                      for (var j = 0; j < rules.length; j++) {
                        result.push({ include: rules[j] });
                      }
                      continue;
                    }
                    var match = [];
                    rules.forEach(function(rule) {
                      if (isObject(rule)) {
                        if (match.length) result.push(ruleOptions(key, match));
                        result.push(ruleOptions(key, rule));
                        match = [];
                      } else {
                        match.push(rule);
                      }
                    });
                    if (match.length) result.push(ruleOptions(key, match));
                  }
                  return result;
                }
                function arrayToRules(array) {
                  var result = [];
                  for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    if (obj.include) {
                      var include = [].concat(obj.include);
                      for (var j = 0; j < include.length; j++) {
                        result.push({ include: include[j] });
                      }
                      continue;
                    }
                    if (!obj.type) {
                      throw new Error("Rule has no type: " + JSON.stringify(obj));
                    }
                    result.push(ruleOptions(obj.type, obj));
                  }
                  return result;
                }
                function ruleOptions(type, obj) {
                  if (!isObject(obj)) {
                    obj = { match: obj };
                  }
                  if (obj.include) {
                    throw new Error("Matching rules cannot also include states");
                  }
                  var options = {
                    defaultType: type,
                    lineBreaks: !!obj.error || !!obj.fallback,
                    pop: false,
                    next: null,
                    push: null,
                    error: false,
                    fallback: false,
                    value: null,
                    type: null,
                    shouldThrow: false
                  };
                  for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                      options[key] = obj[key];
                    }
                  }
                  if (typeof options.type === "string" && type !== options.type) {
                    throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')");
                  }
                  var match = options.match;
                  options.match = Array.isArray(match) ? match : match ? [match] : [];
                  options.match.sort(function(a, b) {
                    return isRegExp(a) && isRegExp(b) ? 0 : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length;
                  });
                  return options;
                }
                function toRules(spec) {
                  return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec);
                }
                var defaultErrorRule = ruleOptions("error", { lineBreaks: true, shouldThrow: true });
                function compileRules(rules, hasStates) {
                  var errorRule = null;
                  var fast = /* @__PURE__ */ Object.create(null);
                  var fastAllowed = true;
                  var unicodeFlag = null;
                  var groups = [];
                  var parts = [];
                  for (var i = 0; i < rules.length; i++) {
                    if (rules[i].fallback) {
                      fastAllowed = false;
                    }
                  }
                  for (var i = 0; i < rules.length; i++) {
                    var options = rules[i];
                    if (options.include) {
                      throw new Error("Inheritance is not allowed in stateless lexers");
                    }
                    if (options.error || options.fallback) {
                      if (errorRule) {
                        if (!options.fallback === !errorRule.fallback) {
                          throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')");
                        } else {
                          throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')");
                        }
                      }
                      errorRule = options;
                    }
                    var match = options.match.slice();
                    if (fastAllowed) {
                      while (match.length && typeof match[0] === "string" && match[0].length === 1) {
                        var word = match.shift();
                        fast[word.charCodeAt(0)] = options;
                      }
                    }
                    if (options.pop || options.push || options.next) {
                      if (!hasStates) {
                        throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')");
                      }
                      if (options.fallback) {
                        throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')");
                      }
                    }
                    if (match.length === 0) {
                      continue;
                    }
                    fastAllowed = false;
                    groups.push(options);
                    for (var j = 0; j < match.length; j++) {
                      var obj = match[j];
                      if (!isRegExp(obj)) {
                        continue;
                      }
                      if (unicodeFlag === null) {
                        unicodeFlag = obj.unicode;
                      } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
                        throw new Error("If one rule is /u then all must be");
                      }
                    }
                    var pat = reUnion(match.map(regexpOrLiteral));
                    var regexp = new RegExp(pat);
                    if (regexp.test("")) {
                      throw new Error("RegExp matches empty string: " + regexp);
                    }
                    var groupCount = reGroups(pat);
                    if (groupCount > 0) {
                      throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: \u2026 ) instead");
                    }
                    if (!options.lineBreaks && regexp.test("\n")) {
                      throw new Error("Rule should declare lineBreaks: " + regexp);
                    }
                    parts.push(reCapture(pat));
                  }
                  var fallbackRule = errorRule && errorRule.fallback;
                  var flags = hasSticky && !fallbackRule ? "ym" : "gm";
                  var suffix = hasSticky || fallbackRule ? "" : "|";
                  if (unicodeFlag === true) flags += "u";
                  var combined = new RegExp(reUnion(parts) + suffix, flags);
                  return { regexp: combined, groups, fast, error: errorRule || defaultErrorRule };
                }
                function compile(rules) {
                  var result = compileRules(toRules(rules));
                  return new Lexer({ start: result }, "start");
                }
                function checkStateGroup(g, name, map) {
                  var state = g && (g.push || g.next);
                  if (state && !map[state]) {
                    throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')");
                  }
                  if (g && g.pop && +g.pop !== 1) {
                    throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')");
                  }
                }
                function compileStates(states, start) {
                  var all = states.$all ? toRules(states.$all) : [];
                  delete states.$all;
                  var keys = Object.getOwnPropertyNames(states);
                  if (!start) start = keys[0];
                  var ruleMap = /* @__PURE__ */ Object.create(null);
                  for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    ruleMap[key] = toRules(states[key]).concat(all);
                  }
                  for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var rules = ruleMap[key];
                    var included = /* @__PURE__ */ Object.create(null);
                    for (var j = 0; j < rules.length; j++) {
                      var rule = rules[j];
                      if (!rule.include) continue;
                      var splice = [j, 1];
                      if (rule.include !== key && !included[rule.include]) {
                        included[rule.include] = true;
                        var newRules = ruleMap[rule.include];
                        if (!newRules) {
                          throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')");
                        }
                        for (var k = 0; k < newRules.length; k++) {
                          var newRule = newRules[k];
                          if (rules.indexOf(newRule) !== -1) continue;
                          splice.push(newRule);
                        }
                      }
                      rules.splice.apply(rules, splice);
                      j--;
                    }
                  }
                  var map = /* @__PURE__ */ Object.create(null);
                  for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    map[key] = compileRules(ruleMap[key], true);
                  }
                  for (var i = 0; i < keys.length; i++) {
                    var name = keys[i];
                    var state = map[name];
                    var groups = state.groups;
                    for (var j = 0; j < groups.length; j++) {
                      checkStateGroup(groups[j], name, map);
                    }
                    var fastKeys = Object.getOwnPropertyNames(state.fast);
                    for (var j = 0; j < fastKeys.length; j++) {
                      checkStateGroup(state.fast[fastKeys[j]], name, map);
                    }
                  }
                  return new Lexer(map, start);
                }
                function keywordTransform(map) {
                  var reverseMap = /* @__PURE__ */ Object.create(null);
                  var byLength = /* @__PURE__ */ Object.create(null);
                  var types2 = Object.getOwnPropertyNames(map);
                  for (var i = 0; i < types2.length; i++) {
                    var tokenType = types2[i];
                    var item = map[tokenType];
                    var keywordList = Array.isArray(item) ? item : [item];
                    keywordList.forEach(function(keyword) {
                      (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
                      if (typeof keyword !== "string") {
                        throw new Error("keyword must be string (in keyword '" + tokenType + "')");
                      }
                      reverseMap[keyword] = tokenType;
                    });
                  }
                  function str(x) {
                    return JSON.stringify(x);
                  }
                  var source = "";
                  source += "switch (value.length) {\n";
                  for (var length in byLength) {
                    var keywords = byLength[length];
                    source += "case " + length + ":\n";
                    source += "switch (value) {\n";
                    keywords.forEach(function(keyword) {
                      var tokenType2 = reverseMap[keyword];
                      source += "case " + str(keyword) + ": return " + str(tokenType2) + "\n";
                    });
                    source += "}\n";
                  }
                  source += "}\n";
                  return Function("value", source);
                }
                var Lexer = function(states, state) {
                  this.startState = state;
                  this.states = states;
                  this.buffer = "";
                  this.stack = [];
                  this.reset();
                };
                Lexer.prototype.reset = function(data, info) {
                  this.buffer = data || "";
                  this.index = 0;
                  this.line = info ? info.line : 1;
                  this.col = info ? info.col : 1;
                  this.queuedToken = info ? info.queuedToken : null;
                  this.queuedThrow = info ? info.queuedThrow : null;
                  this.setState(info ? info.state : this.startState);
                  this.stack = info && info.stack ? info.stack.slice() : [];
                  return this;
                };
                Lexer.prototype.save = function() {
                  return {
                    line: this.line,
                    col: this.col,
                    state: this.state,
                    stack: this.stack.slice(),
                    queuedToken: this.queuedToken,
                    queuedThrow: this.queuedThrow
                  };
                };
                Lexer.prototype.setState = function(state) {
                  if (!state || this.state === state) return;
                  this.state = state;
                  var info = this.states[state];
                  this.groups = info.groups;
                  this.error = info.error;
                  this.re = info.regexp;
                  this.fast = info.fast;
                };
                Lexer.prototype.popState = function() {
                  this.setState(this.stack.pop());
                };
                Lexer.prototype.pushState = function(state) {
                  this.stack.push(this.state);
                  this.setState(state);
                };
                var eat = hasSticky ? function(re, buffer) {
                  return re.exec(buffer);
                } : function(re, buffer) {
                  var match = re.exec(buffer);
                  if (match[0].length === 0) {
                    return null;
                  }
                  return match;
                };
                Lexer.prototype._getGroup = function(match) {
                  var groupCount = this.groups.length;
                  for (var i = 0; i < groupCount; i++) {
                    if (match[i + 1] !== void 0) {
                      return this.groups[i];
                    }
                  }
                  throw new Error("Cannot find token type for matched text");
                };
                function tokenToString() {
                  return this.value;
                }
                Lexer.prototype.next = function() {
                  var index = this.index;
                  if (this.queuedGroup) {
                    var token = this._token(this.queuedGroup, this.queuedText, index);
                    this.queuedGroup = null;
                    this.queuedText = "";
                    return token;
                  }
                  var buffer = this.buffer;
                  if (index === buffer.length) {
                    return;
                  }
                  var group = this.fast[buffer.charCodeAt(index)];
                  if (group) {
                    return this._token(group, buffer.charAt(index), index);
                  }
                  var re = this.re;
                  re.lastIndex = index;
                  var match = eat(re, buffer);
                  var error = this.error;
                  if (match == null) {
                    return this._token(error, buffer.slice(index, buffer.length), index);
                  }
                  var group = this._getGroup(match);
                  var text = match[0];
                  if (error.fallback && match.index !== index) {
                    this.queuedGroup = group;
                    this.queuedText = text;
                    return this._token(error, buffer.slice(index, match.index), index);
                  }
                  return this._token(group, text, index);
                };
                Lexer.prototype._token = function(group, text, offset) {
                  var lineBreaks = 0;
                  if (group.lineBreaks) {
                    var matchNL = /\n/g;
                    var nl = 1;
                    if (text === "\n") {
                      lineBreaks = 1;
                    } else {
                      while (matchNL.exec(text)) {
                        lineBreaks++;
                        nl = matchNL.lastIndex;
                      }
                    }
                  }
                  var token = {
                    type: typeof group.type === "function" && group.type(text) || group.defaultType,
                    value: typeof group.value === "function" ? group.value(text) : text,
                    text,
                    toString: tokenToString,
                    offset,
                    lineBreaks,
                    line: this.line,
                    col: this.col
                  };
                  var size = text.length;
                  this.index += size;
                  this.line += lineBreaks;
                  if (lineBreaks !== 0) {
                    this.col = size - nl + 1;
                  } else {
                    this.col += size;
                  }
                  if (group.shouldThrow) {
                    throw new Error(this.formatError(token, "invalid syntax"));
                  }
                  if (group.pop) this.popState();
                  else if (group.push) this.pushState(group.push);
                  else if (group.next) this.setState(group.next);
                  return token;
                };
                if (typeof Symbol !== "undefined" && Symbol.iterator) {
                  var LexerIterator = function(lexer) {
                    this.lexer = lexer;
                  };
                  LexerIterator.prototype.next = function() {
                    var token = this.lexer.next();
                    return { value: token, done: !token };
                  };
                  LexerIterator.prototype[Symbol.iterator] = function() {
                    return this;
                  };
                  Lexer.prototype[Symbol.iterator] = function() {
                    return new LexerIterator(this);
                  };
                }
                Lexer.prototype.formatError = function(token, message) {
                  if (token == null) {
                    var text = this.buffer.slice(this.index);
                    var token = {
                      text,
                      offset: this.index,
                      lineBreaks: text.indexOf("\n") === -1 ? 0 : 1,
                      line: this.line,
                      col: this.col
                    };
                  }
                  var start = Math.max(0, token.offset - token.col + 1);
                  var eol = token.lineBreaks ? token.text.indexOf("\n") : token.text.length;
                  var firstLine = this.buffer.substring(start, token.offset + eol);
                  message += " at line " + token.line + " col " + token.col + ":\n\n";
                  message += "  " + firstLine + "\n";
                  message += "  " + Array(token.col).join(" ") + "^";
                  return message;
                };
                Lexer.prototype.clone = function() {
                  return new Lexer(this.states, this.state);
                };
                Lexer.prototype.has = function(tokenType) {
                  return true;
                };
                return {
                  compile,
                  states: compileStates,
                  error: Object.freeze({ error: true }),
                  fallback: Object.freeze({ fallback: true }),
                  keywords: keywordTransform
                };
              });
            }
          ),
          /***/
          558: (
            /***/
            (module2, __unused_webpack_exports, __webpack_require__2) => {
              (function() {
                function id(x) {
                  return x[0];
                }
                const moo = __webpack_require__2(271);
                const lexer = moo.compile({
                  space: { match: /\s+/, lineBreaks: true },
                  number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
                  comment: /#[^\n]*/,
                  "[": "[",
                  "]": "]",
                  assignment: /=[^\n]*/,
                  // Leading underscores are disallowed in field names, while constant names have no explicit restrictions.
                  // So we are more lenient in lexing here, and the validation steps below are more strict.
                  // See: https://github.com/ros/genmsg/blob/7d8b6ce6f43b6e39ea8261125d270f2d3062356f/src/genmsg/msg_loader.py#L188-L238
                  fieldOrType: /[a-zA-Z_][a-zA-Z0-9_]*(?:\/[a-zA-Z][a-zA-Z0-9_]*)?/
                });
                function extend(objs) {
                  return objs.reduce((r, p) => ({ ...r, ...p }), {});
                }
                var grammar = {
                  Lexer: lexer,
                  ParserRules: [
                    { "name": "main$ebnf$1", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "boolType", "arrayType", "__", "field", "_", "main$ebnf$1", "simple"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$2", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "bigintType", "arrayType", "__", "field", "_", "main$ebnf$2", "simple"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$3", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$3", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "numericType", "arrayType", "__", "field", "_", "main$ebnf$3", "simple"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$4", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$4", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "stringType", "arrayType", "__", "field", "_", "main$ebnf$4", "simple"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$5", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$5", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "timeType", "arrayType", "__", "field", "_", "main$ebnf$5", "simple"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$6", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$6", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "customType", "arrayType", "__", "field", "_", "main$ebnf$6", "complex"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$7", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$7", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "boolType", "__", "constantField", "_", "boolConstantValue", "_", "main$ebnf$7"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$8", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$8", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "bigintType", "__", "constantField", "_", "bigintConstantValue", "_", "main$ebnf$8"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$9", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$9", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "numericType", "__", "constantField", "_", "numericConstantValue", "_", "main$ebnf$9"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main$ebnf$10", "symbols": ["comment"], "postprocess": id },
                    { "name": "main$ebnf$10", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["_", "stringType", "__", "constantField", "_", "stringConstantValue", "_", "main$ebnf$10"], "postprocess": function(d) {
                      return extend(d);
                    } },
                    { "name": "main", "symbols": ["comment"], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main", "symbols": ["blankLine"], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "boolType", "symbols": [{ "literal": "bool" }], "postprocess": function(d) {
                      return { type: d[0].value };
                    } },
                    { "name": "bigintType$subexpression$1", "symbols": [{ "literal": "int64" }] },
                    { "name": "bigintType$subexpression$1", "symbols": [{ "literal": "uint64" }] },
                    { "name": "bigintType", "symbols": ["bigintType$subexpression$1"], "postprocess": function(d) {
                      return { type: d[0][0].value };
                    } },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "byte" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "char" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "float32" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "float64" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int8" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint8" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int16" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint16" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int32" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint32" }] },
                    { "name": "numericType", "symbols": ["numericType$subexpression$1"], "postprocess": function(d) {
                      return { type: d[0][0].value };
                    } },
                    { "name": "stringType", "symbols": [{ "literal": "string" }], "postprocess": function(d) {
                      return { type: d[0].value };
                    } },
                    { "name": "timeType$subexpression$1", "symbols": [{ "literal": "time" }] },
                    { "name": "timeType$subexpression$1", "symbols": [{ "literal": "duration" }] },
                    { "name": "timeType", "symbols": ["timeType$subexpression$1"], "postprocess": function(d) {
                      return { type: d[0][0].value };
                    } },
                    { "name": "customType", "symbols": [lexer.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], "postprocess": function(d, _, reject) {
                      const PRIMITIVE_TYPES = ["bool", "byte", "char", "float32", "float64", "int8", "uint8", "int16", "uint16", "int32", "uint32", "int64", "uint64", "string", "time", "duration"];
                      const type = d[0].value;
                      if (PRIMITIVE_TYPES.includes(type)) return reject;
                      return { type };
                    } },
                    { "name": "arrayType", "symbols": [{ "literal": "[" }, "_", { "literal": "]" }], "postprocess": function(d) {
                      return { isArray: true };
                    } },
                    { "name": "arrayType", "symbols": [{ "literal": "[" }, "_", "number", "_", { "literal": "]" }], "postprocess": function(d) {
                      return { isArray: true, arrayLength: d[2] };
                    } },
                    { "name": "arrayType", "symbols": ["_"], "postprocess": function(d) {
                      return { isArray: false };
                    } },
                    { "name": "field", "symbols": [lexer.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], "postprocess": function(d, _, reject) {
                      const name = d[0].value;
                      if (name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/) == void 0) return reject;
                      return { name };
                    } },
                    { "name": "constantField", "symbols": [lexer.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], "postprocess": function(d, _, reject) {
                      const name = d[0].value;
                      if (name.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) == void 0) return reject;
                      return { name, isConstant: true };
                    } },
                    { "name": "boolConstantValue", "symbols": ["assignment"], "postprocess": function(d, _, reject) {
                      const valueText = d[0].split("#")[0].trim();
                      if (valueText === "True" || valueText === "1") return { value: true, valueText };
                      if (valueText === "False" || valueText === "0") return { value: false, valueText };
                      return reject;
                    } },
                    { "name": "numericConstantValue", "symbols": ["assignment"], "postprocess": function(d, _, reject) {
                      const valueText = d[0].split("#")[0].trim();
                      const value = parseFloat(valueText);
                      return !isNaN(value) ? { value, valueText } : reject;
                    } },
                    { "name": "bigintConstantValue", "symbols": ["assignment"], "postprocess": function(d, _, reject) {
                      const valueText = d[0].split("#")[0].trim();
                      try {
                        const value = BigInt(valueText);
                        return { value, valueText };
                      } catch {
                        return reject;
                      }
                    } },
                    { "name": "stringConstantValue", "symbols": ["assignment"], "postprocess": function(d) {
                      return { value: d[0], valueText: d[0] };
                    } },
                    { "name": "bool$subexpression$1", "symbols": [{ "literal": "True" }] },
                    { "name": "bool$subexpression$1", "symbols": [{ "literal": "1" }] },
                    { "name": "bool", "symbols": ["bool$subexpression$1"], "postprocess": function(d) {
                      return true;
                    } },
                    { "name": "bool$subexpression$2", "symbols": [{ "literal": "False" }] },
                    { "name": "bool$subexpression$2", "symbols": [{ "literal": "0" }] },
                    { "name": "bool", "symbols": ["bool$subexpression$2"], "postprocess": function(d) {
                      return false;
                    } },
                    { "name": "number", "symbols": [lexer.has("number") ? { type: "number" } : number], "postprocess": function(d) {
                      return parseFloat(d[0].value);
                    } },
                    { "name": "assignment", "symbols": [lexer.has("assignment") ? { type: "assignment" } : assignment], "postprocess": function(d) {
                      return d[0].value.substr(1).trim();
                    } },
                    { "name": "comment", "symbols": [lexer.has("comment") ? { type: "comment" } : comment], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "blankLine", "symbols": ["_"], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "_$subexpression$1", "symbols": [] },
                    { "name": "_$subexpression$1", "symbols": [lexer.has("space") ? { type: "space" } : space] },
                    { "name": "_", "symbols": ["_$subexpression$1"], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "__", "symbols": [lexer.has("space") ? { type: "space" } : space], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "simple", "symbols": [], "postprocess": function() {
                      return { isComplex: false };
                    } },
                    { "name": "complex", "symbols": [], "postprocess": function() {
                      return { isComplex: true };
                    } }
                  ],
                  ParserStart: "main"
                };
                if (typeof module2.exports !== "undefined") {
                  module2.exports = grammar;
                } else {
                  window.grammar = grammar;
                }
              })();
            }
          ),
          /***/
          568: (
            /***/
            (module2, __unused_webpack_exports, __webpack_require__2) => {
              (function() {
                function id(x) {
                  return x[0];
                }
                const keywords = [
                  ,
                  "struct",
                  "module",
                  "const",
                  "include",
                  "typedef",
                  "boolean",
                  "wstring",
                  "string",
                  "sequence",
                  "TRUE",
                  "FALSE",
                  "byte",
                  "octet",
                  "wchar",
                  "char",
                  "double",
                  "float",
                  "int8",
                  "uint8",
                  "int16",
                  "uint16",
                  "int32",
                  "uint32",
                  "int64",
                  "uint64",
                  "unsigned",
                  "short",
                  "long"
                ];
                const kwObject = keywords.reduce((obj, w) => {
                  obj[w] = w;
                  return obj;
                }, {});
                const moo = __webpack_require__2(271);
                const lexer = moo.compile({
                  SPACE: { match: /\s+/, lineBreaks: true },
                  DECIMALEXP: /(?:(?:\d+\.\d*)|(?:\d*\.\d+)|(?:[0-9]+))[eE](?:[+|-])?[0-9]+/,
                  DECIMAL: /(?:(?:\d+\.\d*)|(?:\d*\.\d+))/,
                  INTEGER: /\d+/,
                  COMMENT: /(?:\/\/[^\n]*)|(?:\/\*(?:.|\n)+?\*\/)/,
                  HEX_LITERAL: /0x(?:[0-9a-fA-F])+?/,
                  STRING: { match: /"(?:\\["\\rnu]|[^"\\])*"/, value: (x) => x.slice(1, -1) },
                  // remove outside quotes
                  LCBR: "{",
                  RCBR: "}",
                  LBR: "[",
                  RBR: "]",
                  LT: "<",
                  GT: ">",
                  LPAR: "(",
                  RPAR: ")",
                  ";": ";",
                  ",": ",",
                  AT: "@",
                  PND: "#",
                  PT: ".",
                  "/": "/",
                  SIGN: /[+-]/,
                  HEADER: /={80}\nIDL: [a-zA-Z][\w]+(?:\/[a-zA-Z][\w]+)*/,
                  EQ: /=[^\n]*?/,
                  NAME: { match: /[a-zA-Z_][a-zA-Z0-9_]*(?:\:\:[a-zA-Z][a-zA-Z0-9_]*)*/, type: moo.keywords(kwObject) }
                });
                const tokensToIgnore = ["SPACE", "COMMENT"];
                lexer.next = /* @__PURE__ */ ((next) => () => {
                  let token;
                  while ((token = next.call(lexer)) && tokensToIgnore.includes(token.type)) {
                  }
                  return token;
                })(lexer.next);
                const numericTypeMap = {
                  "unsigned short": "uint16",
                  "unsigned long": "uint32",
                  "unsigned long long": "uint64",
                  "short": "int16",
                  "long": "int32",
                  "long long": "int64",
                  "double": "float64",
                  "float": "float32",
                  "octet": "byte",
                  "wchar": "char"
                };
                function join(d) {
                  return d.join("");
                }
                function extend(objs) {
                  return objs.reduce((r, p) => ({ ...r, ...p }), {});
                }
                function noop() {
                  return null;
                }
                function getIntOrConstantValue(d) {
                  const int = parseInt(d);
                  if (!isNaN(int)) {
                    return int;
                  }
                  return d?.value ? { usesConstant: true, name: d.value } : void 0;
                }
                function aggregateConstantUsage(dcl) {
                  const entries = Object.entries(dcl).filter(
                    ([key, value]) => value?.usesConstant === true
                  ).map(([key, { name }]) => [key, name]);
                  return {
                    ...dcl,
                    constantUsage: entries
                  };
                }
                var grammar = {
                  Lexer: lexer,
                  ParserRules: [
                    { "name": "main$ebnf$1$subexpression$1$ebnf$1", "symbols": ["header"], "postprocess": id },
                    { "name": "main$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main$ebnf$1$subexpression$1$ebnf$2", "symbols": [] },
                    { "name": "main$ebnf$1$subexpression$1$ebnf$2", "symbols": ["main$ebnf$1$subexpression$1$ebnf$2", "importDcl"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "main$ebnf$1$subexpression$1$ebnf$3", "symbols": ["definition"] },
                    { "name": "main$ebnf$1$subexpression$1$ebnf$3", "symbols": ["main$ebnf$1$subexpression$1$ebnf$3", "definition"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "main$ebnf$1$subexpression$1", "symbols": ["main$ebnf$1$subexpression$1$ebnf$1", "main$ebnf$1$subexpression$1$ebnf$2", "main$ebnf$1$subexpression$1$ebnf$3"] },
                    { "name": "main$ebnf$1", "symbols": ["main$ebnf$1$subexpression$1"] },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$1", "symbols": ["header"], "postprocess": id },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$2", "symbols": [] },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$2", "symbols": ["main$ebnf$1$subexpression$2$ebnf$2", "importDcl"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$3", "symbols": ["definition"] },
                    { "name": "main$ebnf$1$subexpression$2$ebnf$3", "symbols": ["main$ebnf$1$subexpression$2$ebnf$3", "definition"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "main$ebnf$1$subexpression$2", "symbols": ["main$ebnf$1$subexpression$2$ebnf$1", "main$ebnf$1$subexpression$2$ebnf$2", "main$ebnf$1$subexpression$2$ebnf$3"] },
                    { "name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    {
                      "name": "main",
                      "symbols": ["main$ebnf$1"],
                      "postprocess": (d) => {
                        return d[0].flatMap((inner) => inner[2].flat());
                      }
                    },
                    { "name": "header", "symbols": [lexer.has("HEADER") ? { type: "HEADER" } : HEADER], "postprocess": noop },
                    { "name": "importDcl$subexpression$1", "symbols": [lexer.has("STRING") ? { type: "STRING" } : STRING] },
                    { "name": "importDcl$subexpression$1$ebnf$1", "symbols": [] },
                    { "name": "importDcl$subexpression$1$ebnf$1$subexpression$1", "symbols": [{ "literal": "/" }, lexer.has("NAME") ? { type: "NAME" } : NAME] },
                    { "name": "importDcl$subexpression$1$ebnf$1", "symbols": ["importDcl$subexpression$1$ebnf$1", "importDcl$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "importDcl$subexpression$1", "symbols": [{ "literal": "<" }, lexer.has("NAME") ? { type: "NAME" } : NAME, "importDcl$subexpression$1$ebnf$1", { "literal": "." }, { "literal": "idl" }, { "literal": ">" }] },
                    { "name": "importDcl", "symbols": [{ "literal": "#" }, { "literal": "include" }, "importDcl$subexpression$1"], "postprocess": noop },
                    { "name": "moduleDcl$ebnf$1$subexpression$1", "symbols": ["definition"] },
                    { "name": "moduleDcl$ebnf$1", "symbols": ["moduleDcl$ebnf$1$subexpression$1"] },
                    { "name": "moduleDcl$ebnf$1$subexpression$2", "symbols": ["definition"] },
                    { "name": "moduleDcl$ebnf$1", "symbols": ["moduleDcl$ebnf$1", "moduleDcl$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    {
                      "name": "moduleDcl",
                      "symbols": ["multiAnnotations", { "literal": "module" }, "fieldName", { "literal": "{" }, "moduleDcl$ebnf$1", { "literal": "}" }],
                      "postprocess": function processModule(d) {
                        const moduleName = d[2].name;
                        const defs = d[4];
                        return {
                          definitionType: "module",
                          name: moduleName,
                          definitions: defs.flat(1)
                        };
                      }
                    },
                    { "name": "definition$subexpression$1", "symbols": ["typeDcl"] },
                    { "name": "definition$subexpression$1", "symbols": ["constantDcl"] },
                    { "name": "definition$subexpression$1", "symbols": ["moduleDcl"] },
                    { "name": "definition", "symbols": ["definition$subexpression$1", "semi"], "postprocess": (d) => d[0][0] },
                    { "name": "typeDcl$subexpression$1", "symbols": ["structWithAnnotations"] },
                    { "name": "typeDcl$subexpression$1", "symbols": ["typedefWithAnnotations"] },
                    { "name": "typeDcl", "symbols": ["typeDcl$subexpression$1"], "postprocess": (d) => d[0][0] },
                    {
                      "name": "structWithAnnotations",
                      "symbols": ["multiAnnotations", "struct"],
                      "postprocess": (
                        // default values don't apply to structs so we can just ignore all annotations on structs
                        (d) => d[1]
                      )
                    },
                    { "name": "struct$ebnf$1$subexpression$1", "symbols": ["member"] },
                    { "name": "struct$ebnf$1", "symbols": ["struct$ebnf$1$subexpression$1"] },
                    { "name": "struct$ebnf$1$subexpression$2", "symbols": ["member"] },
                    { "name": "struct$ebnf$1", "symbols": ["struct$ebnf$1", "struct$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "struct", "symbols": [{ "literal": "struct" }, "fieldName", { "literal": "{" }, "struct$ebnf$1", { "literal": "}" }], "postprocess": (d) => {
                      const name = d[1].name;
                      const definitions = d[3].flat(2).filter((def) => def !== null);
                      return {
                        definitionType: "struct",
                        name,
                        definitions
                      };
                    } },
                    { "name": "typedefWithAnnotations$subexpression$1", "symbols": ["typedef", "allTypes", "fieldName", "arrayLength"] },
                    { "name": "typedefWithAnnotations$subexpression$1", "symbols": ["typedef", "allTypes", "fieldName"] },
                    { "name": "typedefWithAnnotations$subexpression$1", "symbols": ["typedef", "sequenceType", "fieldName"] },
                    { "name": "typedefWithAnnotations", "symbols": ["multiAnnotations", "typedefWithAnnotations$subexpression$1"], "postprocess": (d) => {
                      const def = aggregateConstantUsage(extend(d.flat(1)));
                      return {
                        definitionType: "typedef",
                        ...def
                      };
                    } },
                    { "name": "typedef", "symbols": [{ "literal": "typedef" }], "postprocess": noop },
                    { "name": "constantDcl", "symbols": ["multiAnnotations", "constType"], "postprocess": (d) => d[1] },
                    { "name": "member", "symbols": ["fieldWithAnnotation", "semi"], "postprocess": (d) => d[0] },
                    { "name": "fieldWithAnnotation", "symbols": ["multiAnnotations", "fieldDcl"], "postprocess": (d) => {
                      let possibleAnnotations = [];
                      if (d[0]) {
                        possibleAnnotations = d[0];
                      }
                      const fields = d[1];
                      const finalDefs = fields.map(
                        (def) => aggregateConstantUsage(extend([...possibleAnnotations, def]))
                      );
                      return finalDefs;
                    } },
                    { "name": "fieldDcl$subexpression$1", "symbols": ["allTypes", "multiFieldNames", "arrayLength"] },
                    { "name": "fieldDcl$subexpression$1", "symbols": ["allTypes", "multiFieldNames"] },
                    { "name": "fieldDcl$subexpression$1", "symbols": ["sequenceType", "multiFieldNames"] },
                    { "name": "fieldDcl", "symbols": ["fieldDcl$subexpression$1"], "postprocess": (d) => {
                      const names = d[0].splice(1, 1)[0];
                      const defs = names.map((nameObj) => extend([...d[0], nameObj]));
                      return defs;
                    } },
                    { "name": "multiFieldNames$ebnf$1", "symbols": [] },
                    { "name": "multiFieldNames$ebnf$1$subexpression$1", "symbols": [{ "literal": "," }, "fieldName"] },
                    { "name": "multiFieldNames$ebnf$1", "symbols": ["multiFieldNames$ebnf$1", "multiFieldNames$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "multiFieldNames", "symbols": ["fieldName", "multiFieldNames$ebnf$1"], "postprocess": (d) => {
                      const fieldNames = d.flat(2).filter((d2) => d2 !== null && d2.name);
                      return fieldNames;
                    } },
                    { "name": "multiAnnotations$ebnf$1", "symbols": [] },
                    { "name": "multiAnnotations$ebnf$1", "symbols": ["multiAnnotations$ebnf$1", "annotation"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    {
                      "name": "multiAnnotations",
                      "symbols": ["multiAnnotations$ebnf$1"],
                      "postprocess": (d) => {
                        return d[0] ? d[0].filter((d2) => d2 !== null) : null;
                      }
                    },
                    { "name": "annotation$ebnf$1$subexpression$1", "symbols": [{ "literal": "(" }, "multiAnnotationParams", { "literal": ")" }] },
                    { "name": "annotation$ebnf$1", "symbols": ["annotation$ebnf$1$subexpression$1"], "postprocess": id },
                    { "name": "annotation$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "annotation", "symbols": ["at", lexer.has("NAME") ? { type: "NAME" } : NAME, "annotation$ebnf$1"], "postprocess": (d) => {
                      const paramsMap = d[2] ? d[2][1] : {};
                      if (d[1].value === "default") {
                        const defaultValue = paramsMap.value;
                        return { defaultValue };
                      }
                      return null;
                    } },
                    { "name": "multiAnnotationParams$ebnf$1", "symbols": [] },
                    { "name": "multiAnnotationParams$ebnf$1$subexpression$1", "symbols": [{ "literal": "," }, "annotationParam"] },
                    { "name": "multiAnnotationParams$ebnf$1", "symbols": ["multiAnnotationParams$ebnf$1", "multiAnnotationParams$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    {
                      "name": "multiAnnotationParams",
                      "symbols": ["annotationParam", "multiAnnotationParams$ebnf$1"],
                      "postprocess": (d) => extend([d[0], ...d[1].flatMap(([, param]) => param)])
                    },
                    { "name": "annotationParam$subexpression$1", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME, "assignment"] },
                    { "name": "annotationParam", "symbols": ["annotationParam$subexpression$1"], "postprocess": (d) => ({ [d[0][0].value]: d[0][1].value }) },
                    { "name": "annotationParam$subexpression$2", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME] },
                    { "name": "annotationParam", "symbols": ["annotationParam$subexpression$2"], "postprocess": noop },
                    { "name": "at", "symbols": [{ "literal": "@" }], "postprocess": noop },
                    { "name": "constType$subexpression$1", "symbols": ["constKeyword", "numericType", "fieldName", "floatAssignment", "simple"] },
                    { "name": "constType$subexpression$1", "symbols": ["constKeyword", "numericType", "fieldName", "intAssignment", "simple"] },
                    { "name": "constType$subexpression$1", "symbols": ["constKeyword", "stringType", "fieldName", "stringAssignment", "simple"] },
                    { "name": "constType$subexpression$1", "symbols": ["constKeyword", "booleanType", "fieldName", "booleanAssignment", "simple"] },
                    { "name": "constType", "symbols": ["constType$subexpression$1"], "postprocess": (d) => {
                      const def = extend(d[0]);
                      const name = def.name;
                      const value = def.value;
                      return def;
                    } },
                    { "name": "constKeyword", "symbols": [{ "literal": "const" }], "postprocess": (d) => ({ isConstant: true }) },
                    { "name": "fieldName", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME], "postprocess": (d) => ({ name: d[0].value }) },
                    { "name": "sequenceType$ebnf$1$subexpression$1$subexpression$1", "symbols": ["INT"] },
                    { "name": "sequenceType$ebnf$1$subexpression$1$subexpression$1", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME] },
                    { "name": "sequenceType$ebnf$1$subexpression$1", "symbols": [{ "literal": "," }, "sequenceType$ebnf$1$subexpression$1$subexpression$1"] },
                    { "name": "sequenceType$ebnf$1", "symbols": ["sequenceType$ebnf$1$subexpression$1"], "postprocess": id },
                    { "name": "sequenceType$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "sequenceType", "symbols": [{ "literal": "sequence" }, { "literal": "<" }, "allTypes", "sequenceType$ebnf$1", { "literal": ">" }], "postprocess": (d) => {
                      const arrayUpperBound = d[3] !== null ? getIntOrConstantValue(d[3][1][0]) : void 0;
                      const typeObj = d[2];
                      return {
                        ...typeObj,
                        isArray: true,
                        arrayUpperBound
                      };
                    } },
                    { "name": "arrayLength$subexpression$1", "symbols": ["INT"] },
                    { "name": "arrayLength$subexpression$1", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME] },
                    {
                      "name": "arrayLength",
                      "symbols": [{ "literal": "[" }, "arrayLength$subexpression$1", { "literal": "]" }],
                      "postprocess": ([, intOrName]) => ({ isArray: true, arrayLength: getIntOrConstantValue(intOrName ? intOrName[0] : void 0) })
                    },
                    { "name": "assignment$subexpression$1", "symbols": ["floatAssignment"] },
                    { "name": "assignment$subexpression$1", "symbols": ["intAssignment"] },
                    { "name": "assignment$subexpression$1", "symbols": ["stringAssignment"] },
                    { "name": "assignment$subexpression$1", "symbols": ["booleanAssignment"] },
                    { "name": "assignment$subexpression$1", "symbols": ["variableAssignment"] },
                    { "name": "assignment", "symbols": ["assignment$subexpression$1"], "postprocess": (d) => d[0][0] },
                    { "name": "floatAssignment$subexpression$1", "symbols": ["SIGNED_FLOAT"] },
                    { "name": "floatAssignment$subexpression$1", "symbols": ["FLOAT"] },
                    { "name": "floatAssignment", "symbols": [lexer.has("EQ") ? { type: "EQ" } : EQ, "floatAssignment$subexpression$1"], "postprocess": ([, num]) => ({ valueText: num[0], value: parseFloat(num[0]) }) },
                    { "name": "intAssignment$subexpression$1", "symbols": ["SIGNED_INT"] },
                    { "name": "intAssignment$subexpression$1", "symbols": ["INT"] },
                    { "name": "intAssignment", "symbols": [lexer.has("EQ") ? { type: "EQ" } : EQ, "intAssignment$subexpression$1"], "postprocess": ([, num]) => ({ valueText: num[0], value: parseInt(num[0]) }) },
                    { "name": "stringAssignment", "symbols": [lexer.has("EQ") ? { type: "EQ" } : EQ, "STR"], "postprocess": ([, str]) => ({ valueText: str, value: str }) },
                    { "name": "booleanAssignment", "symbols": [lexer.has("EQ") ? { type: "EQ" } : EQ, "BOOLEAN"], "postprocess": ([, bool]) => ({ valueText: bool, value: bool === "TRUE" }) },
                    { "name": "variableAssignment", "symbols": [lexer.has("EQ") ? { type: "EQ" } : EQ, lexer.has("NAME") ? { type: "NAME" } : NAME], "postprocess": ([, name]) => ({ valueText: name.value, value: { usesConstant: true, name: name.value } }) },
                    { "name": "allTypes$subexpression$1", "symbols": ["primitiveTypes"] },
                    { "name": "allTypes$subexpression$1", "symbols": ["customType"] },
                    { "name": "allTypes", "symbols": ["allTypes$subexpression$1"], "postprocess": (d) => d[0][0] },
                    { "name": "primitiveTypes$subexpression$1", "symbols": ["stringType"] },
                    { "name": "primitiveTypes$subexpression$1", "symbols": ["numericType"] },
                    { "name": "primitiveTypes$subexpression$1", "symbols": ["booleanType"] },
                    { "name": "primitiveTypes", "symbols": ["primitiveTypes$subexpression$1"], "postprocess": (d) => ({ ...d[0][0], isComplex: false }) },
                    { "name": "customType", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME], "postprocess": (d) => {
                      const typeName = d[0].value;
                      const isDefinitelyComplex = typeName.includes("::");
                      return { type: typeName, isComplex: isDefinitelyComplex };
                    } },
                    { "name": "stringType$subexpression$1", "symbols": [{ "literal": "string" }] },
                    { "name": "stringType$subexpression$1", "symbols": [{ "literal": "wstring" }] },
                    { "name": "stringType$ebnf$1$subexpression$1$subexpression$1", "symbols": ["INT"] },
                    { "name": "stringType$ebnf$1$subexpression$1$subexpression$1", "symbols": [lexer.has("NAME") ? { type: "NAME" } : NAME] },
                    { "name": "stringType$ebnf$1$subexpression$1", "symbols": [{ "literal": "<" }, "stringType$ebnf$1$subexpression$1$subexpression$1", { "literal": ">" }] },
                    { "name": "stringType$ebnf$1", "symbols": ["stringType$ebnf$1$subexpression$1"], "postprocess": id },
                    { "name": "stringType$ebnf$1", "symbols": [], "postprocess": function(d) {
                      return null;
                    } },
                    { "name": "stringType", "symbols": ["stringType$subexpression$1", "stringType$ebnf$1"], "postprocess": (d) => {
                      let strLength = void 0;
                      if (d[1] !== null) {
                        strLength = getIntOrConstantValue(d[1][1] ? d[1][1][0] : void 0);
                      }
                      return { type: "string", upperBound: strLength };
                    } },
                    { "name": "booleanType", "symbols": [{ "literal": "boolean" }], "postprocess": (d) => ({ type: "bool" }) },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "byte" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "octet" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "wchar" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "char" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "long" }, { "literal": "double" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "double" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "float" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int8" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint8" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int16" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint16" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int32" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint32" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "int64" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "uint64" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "unsigned" }, { "literal": "short" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "short" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "unsigned" }, { "literal": "long" }, { "literal": "long" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "long" }, { "literal": "long" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "unsigned" }, { "literal": "long" }] },
                    { "name": "numericType$subexpression$1", "symbols": [{ "literal": "long" }] },
                    {
                      "name": "numericType",
                      "symbols": ["numericType$subexpression$1"],
                      "postprocess": (d) => {
                        const typeString = d[0].map((t) => t?.value).filter((t) => !!t).join(" ");
                        let type = numericTypeMap[typeString];
                        return { type: type ? type : typeString };
                      }
                    },
                    { "name": "BOOLEAN$subexpression$1", "symbols": [{ "literal": "TRUE" }] },
                    { "name": "BOOLEAN$subexpression$1", "symbols": [{ "literal": "FALSE" }] },
                    { "name": "BOOLEAN", "symbols": ["BOOLEAN$subexpression$1"], "postprocess": join },
                    { "name": "STR$ebnf$1", "symbols": [lexer.has("STRING") ? { type: "STRING" } : STRING] },
                    { "name": "STR$ebnf$1", "symbols": ["STR$ebnf$1", lexer.has("STRING") ? { type: "STRING" } : STRING], "postprocess": function arrpush(d) {
                      return d[0].concat([d[1]]);
                    } },
                    { "name": "STR", "symbols": ["STR$ebnf$1"], "postprocess": (d) => {
                      return join(d.flat(1).filter((d2) => d2 !== null));
                    } },
                    { "name": "SIGNED_FLOAT$subexpression$1", "symbols": [{ "literal": "+" }] },
                    { "name": "SIGNED_FLOAT$subexpression$1", "symbols": [{ "literal": "-" }] },
                    { "name": "SIGNED_FLOAT", "symbols": ["SIGNED_FLOAT$subexpression$1", "FLOAT"], "postprocess": join },
                    { "name": "FLOAT$subexpression$1", "symbols": [lexer.has("DECIMAL") ? { type: "DECIMAL" } : DECIMAL] },
                    { "name": "FLOAT$subexpression$1", "symbols": [lexer.has("DECIMALEXP") ? { type: "DECIMALEXP" } : DECIMALEXP] },
                    { "name": "FLOAT", "symbols": ["FLOAT$subexpression$1"], "postprocess": join },
                    { "name": "FLOAT$subexpression$2", "symbols": [lexer.has("DECIMAL") ? { type: "DECIMAL" } : DECIMAL, { "literal": "d" }] },
                    { "name": "FLOAT", "symbols": ["FLOAT$subexpression$2"], "postprocess": (d) => d[0][0].value },
                    { "name": "FLOAT$subexpression$3", "symbols": ["INT", { "literal": "d" }] },
                    { "name": "FLOAT", "symbols": ["FLOAT$subexpression$3"], "postprocess": (d) => d[0][0] },
                    { "name": "SIGNED_INT$subexpression$1", "symbols": [{ "literal": "+" }] },
                    { "name": "SIGNED_INT$subexpression$1", "symbols": [{ "literal": "-" }] },
                    { "name": "SIGNED_INT", "symbols": ["SIGNED_INT$subexpression$1", "INT"], "postprocess": join },
                    { "name": "INT", "symbols": [lexer.has("INTEGER") ? { type: "INTEGER" } : INTEGER], "postprocess": join },
                    { "name": "semi", "symbols": [{ "literal": ";" }], "postprocess": noop },
                    { "name": "simple", "symbols": [], "postprocess": () => ({ isComplex: false }) }
                  ],
                  ParserStart: "main"
                };
                if (typeof module2.exports !== "undefined") {
                  module2.exports = grammar;
                } else {
                  window.grammar = grammar;
                }
              })();
            }
          ),
          /***/
          654: (
            /***/
            function(module2) {
              (function(root, factory) {
                if (module2.exports) {
                  module2.exports = factory();
                } else {
                  root.nearley = factory();
                }
              })(this, function() {
                function Rule(name, symbols, postprocess) {
                  this.id = ++Rule.highestId;
                  this.name = name;
                  this.symbols = symbols;
                  this.postprocess = postprocess;
                  return this;
                }
                Rule.highestId = 0;
                Rule.prototype.toString = function(withCursorAt) {
                  var symbolSequence = typeof withCursorAt === "undefined" ? this.symbols.map(getSymbolShortDisplay).join(" ") : this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(" ") + " \u25CF " + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(" ");
                  return this.name + " \u2192 " + symbolSequence;
                };
                function State(rule, dot, reference, wantedBy) {
                  this.rule = rule;
                  this.dot = dot;
                  this.reference = reference;
                  this.data = [];
                  this.wantedBy = wantedBy;
                  this.isComplete = this.dot === rule.symbols.length;
                }
                State.prototype.toString = function() {
                  return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
                };
                State.prototype.nextState = function(child) {
                  var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
                  state.left = this;
                  state.right = child;
                  if (state.isComplete) {
                    state.data = state.build();
                    state.right = void 0;
                  }
                  return state;
                };
                State.prototype.build = function() {
                  var children = [];
                  var node = this;
                  do {
                    children.push(node.right.data);
                    node = node.left;
                  } while (node.left);
                  children.reverse();
                  return children;
                };
                State.prototype.finish = function() {
                  if (this.rule.postprocess) {
                    this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
                  }
                };
                function Column(grammar, index) {
                  this.grammar = grammar;
                  this.index = index;
                  this.states = [];
                  this.wants = {};
                  this.scannable = [];
                  this.completed = {};
                }
                Column.prototype.process = function(nextColumn) {
                  var states = this.states;
                  var wants = this.wants;
                  var completed = this.completed;
                  for (var w = 0; w < states.length; w++) {
                    var state = states[w];
                    if (state.isComplete) {
                      state.finish();
                      if (state.data !== Parser.fail) {
                        var wantedBy = state.wantedBy;
                        for (var i = wantedBy.length; i--; ) {
                          var left = wantedBy[i];
                          this.complete(left, state);
                        }
                        if (state.reference === this.index) {
                          var exp = state.rule.name;
                          (this.completed[exp] = this.completed[exp] || []).push(state);
                        }
                      }
                    } else {
                      var exp = state.rule.symbols[state.dot];
                      if (typeof exp !== "string") {
                        this.scannable.push(state);
                        continue;
                      }
                      if (wants[exp]) {
                        wants[exp].push(state);
                        if (completed.hasOwnProperty(exp)) {
                          var nulls = completed[exp];
                          for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                          }
                        }
                      } else {
                        wants[exp] = [state];
                        this.predict(exp);
                      }
                    }
                  }
                };
                Column.prototype.predict = function(exp) {
                  var rules = this.grammar.byName[exp] || [];
                  for (var i = 0; i < rules.length; i++) {
                    var r = rules[i];
                    var wantedBy = this.wants[exp];
                    var s = new State(r, 0, this.index, wantedBy);
                    this.states.push(s);
                  }
                };
                Column.prototype.complete = function(left, right) {
                  var copy = left.nextState(right);
                  this.states.push(copy);
                };
                function Grammar(rules, start) {
                  this.rules = rules;
                  this.start = start || this.rules[0].name;
                  var byName = this.byName = {};
                  this.rules.forEach(function(rule) {
                    if (!byName.hasOwnProperty(rule.name)) {
                      byName[rule.name] = [];
                    }
                    byName[rule.name].push(rule);
                  });
                }
                Grammar.fromCompiled = function(rules, start) {
                  var lexer = rules.Lexer;
                  if (rules.ParserStart) {
                    start = rules.ParserStart;
                    rules = rules.ParserRules;
                  }
                  var rules = rules.map(function(r) {
                    return new Rule(r.name, r.symbols, r.postprocess);
                  });
                  var g = new Grammar(rules, start);
                  g.lexer = lexer;
                  return g;
                };
                function StreamLexer() {
                  this.reset("");
                }
                StreamLexer.prototype.reset = function(data, state) {
                  this.buffer = data;
                  this.index = 0;
                  this.line = state ? state.line : 1;
                  this.lastLineBreak = state ? -state.col : 0;
                };
                StreamLexer.prototype.next = function() {
                  if (this.index < this.buffer.length) {
                    var ch = this.buffer[this.index++];
                    if (ch === "\n") {
                      this.line += 1;
                      this.lastLineBreak = this.index;
                    }
                    return { value: ch };
                  }
                };
                StreamLexer.prototype.save = function() {
                  return {
                    line: this.line,
                    col: this.index - this.lastLineBreak
                  };
                };
                StreamLexer.prototype.formatError = function(token, message) {
                  var buffer = this.buffer;
                  if (typeof buffer === "string") {
                    var lines = buffer.split("\n").slice(
                      Math.max(0, this.line - 5),
                      this.line
                    );
                    var nextLineBreak = buffer.indexOf("\n", this.index);
                    if (nextLineBreak === -1) nextLineBreak = buffer.length;
                    var col = this.index - this.lastLineBreak;
                    var lastLineDigits = String(this.line).length;
                    message += " at line " + this.line + " col " + col + ":\n\n";
                    message += lines.map(function(line, i) {
                      return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                    }, this).join("\n");
                    message += "\n" + pad("", lastLineDigits + col) + "^\n";
                    return message;
                  } else {
                    return message + " at index " + (this.index - 1);
                  }
                  function pad(n, length) {
                    var s = String(n);
                    return Array(length - s.length + 1).join(" ") + s;
                  }
                };
                function Parser(rules, start, options) {
                  if (rules instanceof Grammar) {
                    var grammar = rules;
                    var options = start;
                  } else {
                    var grammar = Grammar.fromCompiled(rules, start);
                  }
                  this.grammar = grammar;
                  this.options = {
                    keepHistory: false,
                    lexer: grammar.lexer || new StreamLexer()
                  };
                  for (var key in options || {}) {
                    this.options[key] = options[key];
                  }
                  this.lexer = this.options.lexer;
                  this.lexerState = void 0;
                  var column = new Column(grammar, 0);
                  var table = this.table = [column];
                  column.wants[grammar.start] = [];
                  column.predict(grammar.start);
                  column.process();
                  this.current = 0;
                }
                Parser.fail = {};
                Parser.prototype.feed = function(chunk) {
                  var lexer = this.lexer;
                  lexer.reset(chunk, this.lexerState);
                  var token;
                  while (true) {
                    try {
                      token = lexer.next();
                      if (!token) {
                        break;
                      }
                    } catch (e) {
                      var nextColumn = new Column(this.grammar, this.current + 1);
                      this.table.push(nextColumn);
                      var err = new Error(this.reportLexerError(e));
                      err.offset = this.current;
                      err.token = e.token;
                      throw err;
                    }
                    var column = this.table[this.current];
                    if (!this.options.keepHistory) {
                      delete this.table[this.current - 1];
                    }
                    var n = this.current + 1;
                    var nextColumn = new Column(this.grammar, n);
                    this.table.push(nextColumn);
                    var literal = token.text !== void 0 ? token.text : token.value;
                    var value = lexer.constructor === StreamLexer ? token.value : token;
                    var scannable = column.scannable;
                    for (var w = scannable.length; w--; ) {
                      var state = scannable[w];
                      var expect = state.rule.symbols[state.dot];
                      if (expect.test ? expect.test(value) : expect.type ? expect.type === token.type : expect.literal === literal) {
                        var next = state.nextState({ data: value, token, isToken: true, reference: n - 1 });
                        nextColumn.states.push(next);
                      }
                    }
                    nextColumn.process();
                    if (nextColumn.states.length === 0) {
                      var err = new Error(this.reportError(token));
                      err.offset = this.current;
                      err.token = token;
                      throw err;
                    }
                    if (this.options.keepHistory) {
                      column.lexerState = lexer.save();
                    }
                    this.current++;
                  }
                  if (column) {
                    this.lexerState = lexer.save();
                  }
                  this.results = this.finish();
                  return this;
                };
                Parser.prototype.reportLexerError = function(lexerError) {
                  var tokenDisplay, lexerMessage;
                  var token = lexerError.token;
                  if (token) {
                    tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
                    lexerMessage = this.lexer.formatError(token, "Syntax error");
                  } else {
                    tokenDisplay = "input (lexer error)";
                    lexerMessage = lexerError.message;
                  }
                  return this.reportErrorCommon(lexerMessage, tokenDisplay);
                };
                Parser.prototype.reportError = function(token) {
                  var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== void 0 ? token.value : token);
                  var lexerMessage = this.lexer.formatError(token, "Syntax error");
                  return this.reportErrorCommon(lexerMessage, tokenDisplay);
                };
                Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
                  var lines = [];
                  lines.push(lexerMessage);
                  var lastColumnIndex = this.table.length - 2;
                  var lastColumn = this.table[lastColumnIndex];
                  var expectantStates = lastColumn.states.filter(function(state) {
                    var nextSymbol = state.rule.symbols[state.dot];
                    return nextSymbol && typeof nextSymbol !== "string";
                  });
                  if (expectantStates.length === 0) {
                    lines.push("Unexpected " + tokenDisplay + ". I did not expect any more input. Here is the state of my parse table:\n");
                    this.displayStateStack(lastColumn.states, lines);
                  } else {
                    lines.push("Unexpected " + tokenDisplay + ". Instead, I was expecting to see one of the following:\n");
                    var stateStacks = expectantStates.map(function(state) {
                      return this.buildFirstStateStack(state, []) || [state];
                    }, this);
                    stateStacks.forEach(function(stateStack) {
                      var state = stateStack[0];
                      var nextSymbol = state.rule.symbols[state.dot];
                      var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                      lines.push("A " + symbolDisplay + " based on:");
                      this.displayStateStack(stateStack, lines);
                    }, this);
                  }
                  lines.push("");
                  return lines.join("\n");
                };
                Parser.prototype.displayStateStack = function(stateStack, lines) {
                  var lastDisplay;
                  var sameDisplayCount = 0;
                  for (var j = 0; j < stateStack.length; j++) {
                    var state = stateStack[j];
                    var display = state.rule.toString(state.dot);
                    if (display === lastDisplay) {
                      sameDisplayCount++;
                    } else {
                      if (sameDisplayCount > 0) {
                        lines.push("    ^ " + sameDisplayCount + " more lines identical to this");
                      }
                      sameDisplayCount = 0;
                      lines.push("    " + display);
                    }
                    lastDisplay = display;
                  }
                };
                Parser.prototype.getSymbolDisplay = function(symbol) {
                  return getSymbolLongDisplay(symbol);
                };
                Parser.prototype.buildFirstStateStack = function(state, visited) {
                  if (visited.indexOf(state) !== -1) {
                    return null;
                  }
                  if (state.wantedBy.length === 0) {
                    return [state];
                  }
                  var prevState = state.wantedBy[0];
                  var childVisited = [state].concat(visited);
                  var childResult = this.buildFirstStateStack(prevState, childVisited);
                  if (childResult === null) {
                    return null;
                  }
                  return [state].concat(childResult);
                };
                Parser.prototype.save = function() {
                  var column = this.table[this.current];
                  column.lexerState = this.lexerState;
                  return column;
                };
                Parser.prototype.restore = function(column) {
                  var index = column.index;
                  this.current = index;
                  this.table[index] = column;
                  this.table.splice(index + 1);
                  this.lexerState = column.lexerState;
                  this.results = this.finish();
                };
                Parser.prototype.rewind = function(index) {
                  if (!this.options.keepHistory) {
                    throw new Error("set option `keepHistory` to enable rewinding");
                  }
                  this.restore(this.table[index]);
                };
                Parser.prototype.finish = function() {
                  var considerations = [];
                  var start = this.grammar.start;
                  var column = this.table[this.table.length - 1];
                  column.states.forEach(function(t) {
                    if (t.rule.name === start && t.dot === t.rule.symbols.length && t.reference === 0 && t.data !== Parser.fail) {
                      considerations.push(t);
                    }
                  });
                  return considerations.map(function(c) {
                    return c.data;
                  });
                };
                function getSymbolLongDisplay(symbol) {
                  var type = typeof symbol;
                  if (type === "string") {
                    return symbol;
                  } else if (type === "object") {
                    if (symbol.literal) {
                      return JSON.stringify(symbol.literal);
                    } else if (symbol instanceof RegExp) {
                      return "character matching " + symbol;
                    } else if (symbol.type) {
                      return symbol.type + " token";
                    } else if (symbol.test) {
                      return "token matching " + String(symbol.test);
                    } else {
                      throw new Error("Unknown symbol type: " + symbol);
                    }
                  }
                }
                function getSymbolShortDisplay(symbol) {
                  var type = typeof symbol;
                  if (type === "string") {
                    return symbol;
                  } else if (type === "object") {
                    if (symbol.literal) {
                      return JSON.stringify(symbol.literal);
                    } else if (symbol instanceof RegExp) {
                      return symbol.toString();
                    } else if (symbol.type) {
                      return "%" + symbol.type;
                    } else if (symbol.test) {
                      return "<" + String(symbol.test) + ">";
                    } else {
                      throw new Error("Unknown symbol type: " + symbol);
                    }
                  }
                }
                return {
                  Parser,
                  Grammar,
                  Rule
                };
              });
            }
          ),
          /***/
          515: (
            /***/
            (__unused_webpack_module, exports2) => {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.buildRos2Type = void 0;
              const TYPE = String.raw`(?<type>[a-zA-Z0-9_/]+)`;
              const STRING_BOUND = String.raw`(?:<=(?<stringBound>\d+))`;
              const ARRAY_BOUND = String.raw`(?:(?<unboundedArray>\[\])|\[(?<arrayLength>\d+)\]|\[<=(?<arrayBound>\d+)\])`;
              const NAME2 = String.raw`(?<name>[a-zA-Z0-9_]+)`;
              const QUOTED_STRING = String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`;
              const COMMENT_TERMINATED_LITERAL = String.raw`(?:${QUOTED_STRING}|(?:\\.|[^\s'"#\\])(?:\\.|[^#\\])*)`;
              const ARRAY_TERMINATED_LITERAL = String.raw`(?:${QUOTED_STRING}|(?:\\.|[^\s'"\],#\\])(?:\\.|[^\],#\\])*)`;
              const CONSTANT_ASSIGNMENT = String.raw`\s*=\s*(?<constantValue>${COMMENT_TERMINATED_LITERAL}?)`;
              const DEFAULT_VALUE_ARRAY = String.raw`\[(?:${ARRAY_TERMINATED_LITERAL},)*${ARRAY_TERMINATED_LITERAL}?\]`;
              const DEFAULT_VALUE = String.raw`(?<defaultValue>${DEFAULT_VALUE_ARRAY}|${COMMENT_TERMINATED_LITERAL})`;
              const COMMENT = String.raw`(?:#.*)`;
              const DEFINITION_LINE_REGEX = new RegExp(String.raw`^${TYPE}${STRING_BOUND}?${ARRAY_BOUND}?\s+${NAME2}(?:${CONSTANT_ASSIGNMENT}|\s+${DEFAULT_VALUE})?\s*${COMMENT}?$`);
              const STRING_ESCAPES = String.raw`\\(?<char>['"abfnrtv\\])|\\(?<oct>[0-7]{1,3})|\\x(?<hex2>[a-fA-F0-9]{2})|\\u(?<hex4>[a-fA-F0-9]{4})|\\U(?<hex8>[a-fA-F0-9]{8})`;
              const BUILTIN_TYPES = [
                "bool",
                "byte",
                "char",
                "float32",
                "float64",
                "int8",
                "uint8",
                "int16",
                "uint16",
                "int32",
                "uint32",
                "int64",
                "uint64",
                "string",
                "wstring",
                "time",
                "duration",
                "builtin_interfaces/Time",
                "builtin_interfaces/Duration",
                "builtin_interfaces/msg/Time",
                "builtin_interfaces/msg/Duration"
              ];
              function parseBigIntLiteral(str, min, max) {
                const value = BigInt(str);
                if (value < min || value > max) {
                  throw new Error(`Number ${str} out of range [${min}, ${max}]`);
                }
                return value;
              }
              function parseNumberLiteral(str, min, max) {
                const value = parseInt(str);
                if (Number.isNaN(value)) {
                  throw new Error(`Invalid numeric literal: ${str}`);
                }
                if (value < min || value > max) {
                  throw new Error(`Number ${str} out of range [${min}, ${max}]`);
                }
                return value;
              }
              const LITERAL_REGEX = new RegExp(ARRAY_TERMINATED_LITERAL, "y");
              const COMMA_OR_END_REGEX = /\s*(,)\s*|\s*$/y;
              function parseArrayLiteral(type, rawStr) {
                if (!rawStr.startsWith("[") || !rawStr.endsWith("]")) {
                  throw new Error("Array must start with [ and end with ]");
                }
                const str = rawStr.substring(1, rawStr.length - 1);
                if (type === "string" || type === "wstring") {
                  const results = [];
                  let offset = 0;
                  while (offset < str.length) {
                    if (str[offset] === ",") {
                      throw new Error("Expected array element before comma");
                    }
                    LITERAL_REGEX.lastIndex = offset;
                    let match = LITERAL_REGEX.exec(str);
                    if (match) {
                      results.push(parseStringLiteral(match[0]));
                      offset = LITERAL_REGEX.lastIndex;
                    }
                    COMMA_OR_END_REGEX.lastIndex = offset;
                    match = COMMA_OR_END_REGEX.exec(str);
                    if (!match) {
                      throw new Error("Expected comma or end of array");
                    }
                    if (!match[1]) {
                      break;
                    }
                    offset = COMMA_OR_END_REGEX.lastIndex;
                  }
                  return results;
                }
                return str.split(",").map((part) => parsePrimitiveLiteral(type, part.trim()));
              }
              function parseStringLiteral(maybeQuotedStr) {
                let quoteThatMustBeEscaped = "";
                let str = maybeQuotedStr;
                for (const quote of ["'", '"']) {
                  if (maybeQuotedStr.startsWith(quote)) {
                    if (!maybeQuotedStr.endsWith(quote)) {
                      throw new Error(`Expected terminating ${quote} in string literal: ${maybeQuotedStr}`);
                    }
                    quoteThatMustBeEscaped = quote;
                    str = maybeQuotedStr.substring(quote.length, maybeQuotedStr.length - quote.length);
                    break;
                  }
                }
                if (!new RegExp(String.raw`^(?:[^\\${quoteThatMustBeEscaped}]|${STRING_ESCAPES})*$`).test(str) == void 0) {
                  throw new Error(`Invalid string literal: ${str}`);
                }
                return str.replace(new RegExp(STRING_ESCAPES, "g"), (...args) => {
                  const { char, oct, hex2, hex4, hex8 } = args[args.length - 1];
                  const hex = hex2 ?? hex4 ?? hex8;
                  if (char != void 0) {
                    return {
                      "'": "'",
                      '"': '"',
                      a: "\x07",
                      b: "\b",
                      f: "\f",
                      n: "\n",
                      r: "\r",
                      t: "	",
                      v: "\v",
                      "\\": "\\"
                    }[char];
                  } else if (oct != void 0) {
                    return String.fromCodePoint(parseInt(oct, 8));
                  } else if (hex != void 0) {
                    return String.fromCodePoint(parseInt(hex, 16));
                  } else {
                    throw new Error("Expected exactly one matched group");
                  }
                });
              }
              function parsePrimitiveLiteral(type, str) {
                switch (type) {
                  case "bool":
                    if (["true", "True", "1"].includes(str)) {
                      return true;
                    } else if (["false", "False", "0"].includes(str)) {
                      return false;
                    }
                    break;
                  case "float32":
                  case "float64": {
                    const value = parseFloat(str);
                    if (!Number.isNaN(value)) {
                      return value;
                    }
                    break;
                  }
                  case "int8":
                    return parseNumberLiteral(str, ~127, 127);
                  case "uint8":
                    return parseNumberLiteral(str, 0, 255);
                  case "int16":
                    return parseNumberLiteral(str, ~32767, 32767);
                  case "uint16":
                    return parseNumberLiteral(str, 0, 65535);
                  case "int32":
                    return parseNumberLiteral(str, ~2147483647, 2147483647);
                  case "uint32":
                    return parseNumberLiteral(str, 0, 4294967295);
                  case "int64":
                    return parseBigIntLiteral(str, ~0x7fffffffffffffffn, 0x7fffffffffffffffn);
                  case "uint64":
                    return parseBigIntLiteral(str, 0n, 0xffffffffffffffffn);
                  case "string":
                  case "wstring":
                    return parseStringLiteral(str);
                }
                throw new Error(`Invalid literal of type ${type}: ${str}`);
              }
              function normalizeType(type) {
                switch (type) {
                  case "char":
                    return "uint8";
                  case "byte":
                    return "int8";
                  case "builtin_interfaces/Time":
                  case "builtin_interfaces/msg/Time":
                    return "time";
                  case "builtin_interfaces/Duration":
                  case "builtin_interfaces/msg/Duration":
                    return "duration";
                }
                return type;
              }
              function buildRos2Type(lines) {
                const definitions = [];
                let complexTypeName;
                for (const { line } of lines) {
                  let match;
                  if (line.startsWith("#")) {
                    continue;
                  } else if (match = /^MSG: ([^ ]+)\s*(?:#.+)?$/.exec(line)) {
                    complexTypeName = match[1];
                    continue;
                  } else if (match = DEFINITION_LINE_REGEX.exec(line)) {
                    const { type: rawType, stringBound, unboundedArray, arrayLength, arrayBound, name, constantValue, defaultValue } = match.groups;
                    const type = normalizeType(rawType);
                    if (stringBound != void 0 && type !== "string" && type !== "wstring") {
                      throw new Error(`Invalid string bound for type ${type}`);
                    }
                    if (constantValue != void 0) {
                      if (!/^[A-Z](?:_?[A-Z0-9]+)*$/.test(name)) {
                        throw new Error(`Invalid constant name: ${name}`);
                      }
                    } else {
                      if (!/^[a-z](?:_?[a-z0-9]+)*$/.test(name)) {
                        throw new Error(`Invalid field name: ${name}`);
                      }
                    }
                    const isComplex = !BUILTIN_TYPES.includes(type);
                    const isArray = unboundedArray != void 0 || arrayLength != void 0 || arrayBound != void 0;
                    definitions.push({
                      name,
                      type,
                      isComplex: constantValue != void 0 ? isComplex || void 0 : isComplex,
                      isConstant: constantValue != void 0 || void 0,
                      isArray: constantValue != void 0 ? isArray || void 0 : isArray,
                      arrayLength: arrayLength != void 0 ? parseInt(arrayLength) : void 0,
                      arrayUpperBound: arrayBound != void 0 ? parseInt(arrayBound) : void 0,
                      upperBound: stringBound != void 0 ? parseInt(stringBound) : void 0,
                      defaultValue: defaultValue != void 0 ? isArray ? parseArrayLiteral(type, defaultValue.trim()) : parsePrimitiveLiteral(type, defaultValue.trim()) : void 0,
                      value: constantValue != void 0 ? parsePrimitiveLiteral(type, constantValue.trim()) : void 0,
                      valueText: constantValue?.trim()
                    });
                  } else {
                    throw new Error(`Could not parse line: '${line}'`);
                  }
                }
                return { name: complexTypeName, definitions };
              }
              exports2.buildRos2Type = buildRos2Type;
            }
          ),
          /***/
          715: (
            /***/
            function(__unused_webpack_module, exports2, __webpack_require__2) {
              "use strict";
              var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
                if (k2 === void 0) k2 = k;
                var desc = Object.getOwnPropertyDescriptor(m, k);
                if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = { enumerable: true, get: function() {
                    return m[k];
                  } };
                }
                Object.defineProperty(o, k2, desc);
              } : function(o, m, k, k2) {
                if (k2 === void 0) k2 = k;
                o[k2] = m[k];
              });
              var __exportStar = this && this.__exportStar || function(m, exports3) {
                for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              __exportStar(__webpack_require__2(322), exports2);
              __exportStar(__webpack_require__2(867), exports2);
              __exportStar(__webpack_require__2(733), exports2);
              __exportStar(__webpack_require__2(210), exports2);
            }
          ),
          /***/
          322: (
            /***/
            (__unused_webpack_module, exports2, __webpack_require__2) => {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.md5 = void 0;
              const md5_typescript_1 = __webpack_require__2(417);
              const BUILTIN_TYPES = /* @__PURE__ */ new Set([
                "int8",
                "uint8",
                "int16",
                "uint16",
                "int32",
                "uint32",
                "int64",
                "uint64",
                "float32",
                "float64",
                "string",
                "bool",
                "char",
                "byte",
                "time",
                "duration"
              ]);
              function md5(msgDefs) {
                if (msgDefs.length === 0) {
                  throw new Error(`Cannot produce md5sum for empty msgDefs`);
                }
                const subMsgDefs = /* @__PURE__ */ new Map();
                for (const msgDef of msgDefs) {
                  if (msgDef.name != void 0) {
                    subMsgDefs.set(msgDef.name, msgDef);
                  }
                }
                const first = msgDefs[0];
                return computeMessageMd5(first, subMsgDefs);
              }
              exports2.md5 = md5;
              function computeMessageMd5(msgDef, subMsgDefs) {
                let output = "";
                const constants = msgDef.definitions.filter(({ isConstant }) => isConstant);
                const variables = msgDef.definitions.filter(({ isConstant }) => isConstant == void 0 || !isConstant);
                for (const def of constants) {
                  output += `${def.type} ${def.name}=${def.valueText ?? String(def.value)}
`;
                }
                for (const def of variables) {
                  if (isBuiltin(def.type)) {
                    const arrayLength = def.arrayLength != void 0 ? String(def.arrayLength) : "";
                    const array = def.isArray === true ? `[${arrayLength}]` : "";
                    output += `${def.type}${array} ${def.name}
`;
                  } else {
                    const subMsgDef = subMsgDefs.get(def.type);
                    if (subMsgDef == void 0) {
                      throw new Error(`Missing definition for submessage type "${def.type}"`);
                    }
                    const subMd5 = computeMessageMd5(subMsgDef, subMsgDefs);
                    output += `${subMd5} ${def.name}
`;
                  }
                }
                output = output.trimEnd();
                return md5_typescript_1.Md5.init(output);
              }
              function isBuiltin(typeName) {
                return BUILTIN_TYPES.has(typeName);
              }
            }
          ),
          /***/
          867: (
            /***/
            function(__unused_webpack_module, exports2, __webpack_require__2) {
              "use strict";
              var __importDefault = this && this.__importDefault || function(mod) {
                return mod && mod.__esModule ? mod : { "default": mod };
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.normalizeType = exports2.fixupTypes = exports2.parse = exports2.ROS2IDL_GRAMMAR = void 0;
              const nearley_1 = __webpack_require__2(654);
              const buildRos2Type_1 = __webpack_require__2(515);
              const ros1_ne_1 = __importDefault(__webpack_require__2(558));
              const ros2idl_ne_1 = __importDefault(__webpack_require__2(568));
              const ROS1_GRAMMAR = nearley_1.Grammar.fromCompiled(ros1_ne_1.default);
              exports2.ROS2IDL_GRAMMAR = nearley_1.Grammar.fromCompiled(ros2idl_ne_1.default);
              function parse2(messageDefinition, options = {}) {
                const allLines = messageDefinition.split("\n").map((line) => line.trim()).filter((line) => line);
                let definitionLines = [];
                const types2 = [];
                allLines.forEach((line) => {
                  if (line.startsWith("#")) {
                    return;
                  }
                  if (line.startsWith("==")) {
                    types2.push(options.ros2 === true ? (0, buildRos2Type_1.buildRos2Type)(definitionLines) : buildType(definitionLines, ROS1_GRAMMAR));
                    definitionLines = [];
                  } else {
                    definitionLines.push({ line });
                  }
                });
                types2.push(options.ros2 === true ? (0, buildRos2Type_1.buildRos2Type)(definitionLines) : buildType(definitionLines, ROS1_GRAMMAR));
                if (options.skipTypeFixup !== true) {
                  fixupTypes(types2);
                }
                return types2;
              }
              exports2.parse = parse2;
              function fixupTypes(types2) {
                types2.forEach(({ definitions }) => {
                  definitions.forEach((definition) => {
                    if (definition.isComplex === true) {
                      const foundName = findTypeByName3(types2, definition.type).name;
                      if (foundName == void 0) {
                        throw new Error(`Missing type definition for ${definition.type}`);
                      }
                      definition.type = foundName;
                    }
                  });
                });
              }
              exports2.fixupTypes = fixupTypes;
              function buildType(lines, grammar) {
                const definitions = [];
                let complexTypeName;
                lines.forEach(({ line }) => {
                  if (line.startsWith("MSG:")) {
                    const [_, name] = simpleTokenization(line);
                    complexTypeName = name?.trim();
                    return;
                  }
                  const parser = new nearley_1.Parser(grammar);
                  parser.feed(line);
                  const results = parser.finish();
                  if (results.length === 0) {
                    throw new Error(`Could not parse line: '${line}'`);
                  } else if (results.length > 1) {
                    throw new Error(`Ambiguous line: '${line}'`);
                  }
                  const result = results[0];
                  if (result != void 0) {
                    result.type = normalizeType(result.type);
                    definitions.push(result);
                  }
                });
                return { name: complexTypeName, definitions };
              }
              function simpleTokenization(line) {
                return line.replace(/#.*/gi, "").split(" ").filter((word) => word);
              }
              function findTypeByName3(types2, name) {
                const matches = types2.filter((type) => {
                  const typeName = type.name ?? "";
                  if (name.length === 0) {
                    return typeName.length === 0;
                  }
                  const nameEnd = name.includes("/") ? name : `/${name}`;
                  return typeName.endsWith(nameEnd);
                });
                if (matches[0] == void 0) {
                  throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
                }
                return matches[0];
              }
              function normalizeType(type) {
                if (type === "char") {
                  return "uint8";
                } else if (type === "byte") {
                  return "int8";
                }
                return type;
              }
              exports2.normalizeType = normalizeType;
            }
          ),
          /***/
          733: (
            /***/
            (__unused_webpack_module, exports2, __webpack_require__2) => {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.parseRos2idl = void 0;
              const nearley_1 = __webpack_require__2(654);
              const parse_1 = __webpack_require__2(867);
              function parseRos2idl2(messageDefinition) {
                return buildRos2idlType(messageDefinition, parse_1.ROS2IDL_GRAMMAR);
              }
              exports2.parseRos2idl = parseRos2idl2;
              function buildRos2idlType(messageDefinition, grammar) {
                const parser = new nearley_1.Parser(grammar);
                parser.feed(messageDefinition);
                const results = parser.finish();
                if (results.length === 0) {
                  throw new Error(`Could not parse message definition (unexpected end of input): '${messageDefinition}'`);
                }
                const result = results[0];
                const processedResult = postProcessIdlDefinitions(result);
                for (const { definitions } of processedResult) {
                  for (const definition of definitions) {
                    definition.type = (0, parse_1.normalizeType)(definition.type);
                  }
                }
                return processedResult;
              }
              function traverseIdl(path, processNode) {
                const currNode = path[path.length - 1];
                const children = currNode.definitions;
                if (children) {
                  children.forEach((n) => traverseIdl([...path, n], processNode));
                }
                processNode(path);
              }
              function postProcessIdlDefinitions(definitions) {
                const finalDefs = [];
                for (const definition of definitions) {
                  const typedefMap = /* @__PURE__ */ new Map();
                  const constantValueMap = /* @__PURE__ */ new Map();
                  traverseIdl([definition], (path) => {
                    const node = path[path.length - 1];
                    if (node.definitionType === "typedef") {
                      const { definitionType: _definitionType, name: _name, ...partialDef } = node;
                      typedefMap.set(node.name, partialDef);
                    } else if (node.isConstant === true) {
                      constantValueMap.set(node.name, node.value);
                    }
                  });
                  traverseIdl([definition], (path) => {
                    const node = path[path.length - 1];
                    if (node.definitions != void 0) {
                      return;
                    }
                    if (node.type && typedefMap.has(node.type)) {
                      Object.assign(node, { ...typedefMap.get(node.type), name: node.name });
                    }
                    for (const [key, constantName] of node.constantUsage ?? []) {
                      if (constantValueMap.has(constantName)) {
                        node[key] = constantValueMap.get(constantName);
                      } else {
                        throw new Error(`Could not find constant <${constantName}> for field <${node.name ?? "undefined"}> in <${definition.name}>`);
                      }
                    }
                    delete node.constantUsage;
                    if (node.type != void 0) {
                      node.type = node.type.replace(/::/g, "/");
                    }
                  });
                  const flattened = flattenIdlNamespaces(definition);
                  finalDefs.push(...flattened);
                }
                return finalDefs;
              }
              function flattenIdlNamespaces(definition) {
                const flattened = [];
                traverseIdl([definition], (path) => {
                  const node = path[path.length - 1];
                  if (node.definitionType === "module") {
                    const moduleDefs = node.definitions.filter((d) => d.definitionType !== "typedef");
                    if (moduleDefs.every((child) => child.isConstant)) {
                      flattened.push({
                        name: path.map((n) => n.name).join("/"),
                        definitions: moduleDefs
                      });
                    }
                  } else if (node.definitionType === "struct") {
                    flattened.push({
                      name: path.map((n) => n.name).join("/"),
                      definitions: node.definitions
                    });
                  }
                });
                return flattened;
              }
            }
          ),
          /***/
          210: (
            /***/
            (__unused_webpack_module, exports2) => {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.stringify = void 0;
              function stringify(msgDefs) {
                let output = "";
                for (let i = 0; i < msgDefs.length; i++) {
                  const msgDef = msgDefs[i];
                  const constants = msgDef.definitions.filter(({ isConstant }) => isConstant);
                  const variables = msgDef.definitions.filter(({ isConstant }) => isConstant == void 0 || !isConstant);
                  if (i > 0) {
                    output += "\n================================================================================\n";
                    output += `MSG: ${msgDef.name ?? ""}
`;
                  }
                  for (const def of constants) {
                    output += `${def.type} ${def.name} = ${def.valueText ?? String(def.value)}
`;
                  }
                  if (variables.length > 0) {
                    if (output.length > 0) {
                      output += "\n";
                    }
                    for (const def of variables) {
                      const upperBound = def.upperBound != void 0 ? `<=${def.upperBound}` : "";
                      const arrayLength = def.arrayLength != void 0 ? String(def.arrayLength) : def.arrayUpperBound != void 0 ? `<=${def.arrayUpperBound}` : "";
                      const array = def.isArray === true ? `[${arrayLength}]` : "";
                      const defaultValue = def.defaultValue != void 0 ? ` ${stringifyDefaultValue(def.defaultValue)}` : "";
                      output += `${def.type}${upperBound}${array} ${def.name}${defaultValue}
`;
                    }
                  }
                }
                return output.trimEnd();
              }
              exports2.stringify = stringify;
              function stringifyDefaultValue(value) {
                if (Array.isArray(value)) {
                  return `[${value.map((x) => typeof x === "bigint" ? x.toString() : JSON.stringify(x)).join(", ")}]`;
                }
                return typeof value === "bigint" ? value.toString() : JSON.stringify(value);
              }
            }
          )
          /******/
        };
        var __webpack_module_cache__ = {};
        function __webpack_require__(moduleId) {
          var cachedModule = __webpack_module_cache__[moduleId];
          if (cachedModule !== void 0) {
            return cachedModule.exports;
          }
          var module2 = __webpack_module_cache__[moduleId] = {
            /******/
            // no module.id needed
            /******/
            // no module.loaded needed
            /******/
            exports: {}
            /******/
          };
          __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
          return module2.exports;
        }
        (() => {
          __webpack_require__.d = (exports2, definition) => {
            for (var key in definition) {
              if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
              }
            }
          };
        })();
        (() => {
          __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
        })();
        (() => {
          __webpack_require__.r = (exports2) => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
        })();
        var __webpack_exports__ = __webpack_require__(715);
        module.exports = __webpack_exports__;
      })();
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/EncapsulationKind.js
  var require_EncapsulationKind = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/EncapsulationKind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EncapsulationKind = void 0;
      var EncapsulationKind;
      (function(EncapsulationKind2) {
        EncapsulationKind2[EncapsulationKind2["CDR_BE"] = 0] = "CDR_BE";
        EncapsulationKind2[EncapsulationKind2["CDR_LE"] = 1] = "CDR_LE";
        EncapsulationKind2[EncapsulationKind2["PL_CDR_BE"] = 2] = "PL_CDR_BE";
        EncapsulationKind2[EncapsulationKind2["PL_CDR_LE"] = 3] = "PL_CDR_LE";
        EncapsulationKind2[EncapsulationKind2["CDR2_BE"] = 16] = "CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["CDR2_LE"] = 17] = "CDR2_LE";
        EncapsulationKind2[EncapsulationKind2["PL_CDR2_BE"] = 18] = "PL_CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["PL_CDR2_LE"] = 19] = "PL_CDR2_LE";
        EncapsulationKind2[EncapsulationKind2["DELIMITED_CDR2_BE"] = 20] = "DELIMITED_CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["DELIMITED_CDR2_LE"] = 21] = "DELIMITED_CDR2_LE";
        EncapsulationKind2[EncapsulationKind2["RTPS_CDR2_BE"] = 6] = "RTPS_CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["RTPS_CDR2_LE"] = 7] = "RTPS_CDR2_LE";
        EncapsulationKind2[EncapsulationKind2["RTPS_DELIMITED_CDR2_BE"] = 8] = "RTPS_DELIMITED_CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["RTPS_DELIMITED_CDR2_LE"] = 9] = "RTPS_DELIMITED_CDR2_LE";
        EncapsulationKind2[EncapsulationKind2["RTPS_PL_CDR2_BE"] = 10] = "RTPS_PL_CDR2_BE";
        EncapsulationKind2[EncapsulationKind2["RTPS_PL_CDR2_LE"] = 11] = "RTPS_PL_CDR2_LE";
      })(EncapsulationKind = exports.EncapsulationKind || (exports.EncapsulationKind = {}));
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/getEncapsulationKindInfo.js
  var require_getEncapsulationKindInfo = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/getEncapsulationKindInfo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getEncapsulationKindInfo = void 0;
      var EncapsulationKind_1 = require_EncapsulationKind();
      var getEncapsulationKindInfo = (kind) => {
        const isCDR2 = kind > EncapsulationKind_1.EncapsulationKind.PL_CDR_LE;
        const littleEndian = kind === EncapsulationKind_1.EncapsulationKind.CDR_LE || kind === EncapsulationKind_1.EncapsulationKind.PL_CDR_LE || kind === EncapsulationKind_1.EncapsulationKind.CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.PL_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.DELIMITED_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_PL_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_DELIMITED_CDR2_LE;
        const isDelimitedCDR2 = kind === EncapsulationKind_1.EncapsulationKind.DELIMITED_CDR2_BE || kind === EncapsulationKind_1.EncapsulationKind.DELIMITED_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_DELIMITED_CDR2_BE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_DELIMITED_CDR2_LE;
        const isPLCDR2 = kind === EncapsulationKind_1.EncapsulationKind.PL_CDR2_BE || kind === EncapsulationKind_1.EncapsulationKind.PL_CDR2_LE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_PL_CDR2_BE || kind === EncapsulationKind_1.EncapsulationKind.RTPS_PL_CDR2_LE;
        const isPLCDR1 = kind === EncapsulationKind_1.EncapsulationKind.PL_CDR_BE || kind === EncapsulationKind_1.EncapsulationKind.PL_CDR_LE;
        const usesDelimiterHeader = isDelimitedCDR2 || isPLCDR2;
        const usesMemberHeader = isPLCDR2 || isPLCDR1;
        return {
          isCDR2,
          littleEndian,
          usesDelimiterHeader,
          usesMemberHeader
        };
      };
      exports.getEncapsulationKindInfo = getEncapsulationKindInfo;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/isBigEndian.js
  var require_isBigEndian = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/isBigEndian.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isBigEndian = void 0;
      var endianTestArray = new Uint8Array(4);
      var endianTestView = new Uint32Array(endianTestArray.buffer);
      endianTestView[0] = 1;
      function isBigEndian2() {
        return endianTestArray[3] === 1;
      }
      exports.isBigEndian = isBigEndian2;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/lengthCodes.js
  var require_lengthCodes = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/lengthCodes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.lengthCodeToObjectSizes = exports.getLengthCodeForObjectSize = void 0;
      function getLengthCodeForObjectSize(objectSize) {
        let defaultLengthCode;
        switch (objectSize) {
          case 1:
            defaultLengthCode = 0;
            break;
          case 2:
            defaultLengthCode = 1;
            break;
          case 4:
            defaultLengthCode = 2;
            break;
          case 8:
            defaultLengthCode = 3;
            break;
        }
        if (defaultLengthCode == void 0) {
          if (objectSize > 4294967295) {
            throw Error(`Object size ${objectSize} for EMHEADER too large without specifying length code. Max size is ${4294967295}`);
          }
          defaultLengthCode = 4;
        }
        return defaultLengthCode;
      }
      exports.getLengthCodeForObjectSize = getLengthCodeForObjectSize;
      exports.lengthCodeToObjectSizes = {
        0: 1,
        1: 2,
        2: 4,
        3: 8
      };
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/reservedPIDs.js
  var require_reservedPIDs = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/reservedPIDs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SENTINEL_PID = exports.EXTENDED_PID = void 0;
      exports.EXTENDED_PID = 16129;
      exports.SENTINEL_PID = 16130;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/CdrReader.js
  var require_CdrReader = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/CdrReader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CdrReader = void 0;
      var getEncapsulationKindInfo_1 = require_getEncapsulationKindInfo();
      var isBigEndian_1 = require_isBigEndian();
      var lengthCodes_1 = require_lengthCodes();
      var reservedPIDs_1 = require_reservedPIDs();
      var textDecoder2 = new TextDecoder("utf8");
      var CdrReader = class {
        constructor(data) {
          this.origin = 0;
          if (data.byteLength < 4) {
            throw new Error(`Invalid CDR data size ${data.byteLength}, must contain at least a 4-byte header`);
          }
          this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
          const kind = this.kind;
          const { isCDR2, littleEndian, usesDelimiterHeader, usesMemberHeader } = (0, getEncapsulationKindInfo_1.getEncapsulationKindInfo)(kind);
          this.usesDelimiterHeader = usesDelimiterHeader;
          this.usesMemberHeader = usesMemberHeader;
          this.littleEndian = littleEndian;
          this.hostLittleEndian = !(0, isBigEndian_1.isBigEndian)();
          this.isCDR2 = isCDR2;
          this.eightByteAlignment = isCDR2 ? 4 : 8;
          this.origin = 4;
          this.offset = 4;
        }
        get kind() {
          return this.view.getUint8(1);
        }
        get decodedBytes() {
          return this.offset;
        }
        get byteLength() {
          return this.view.byteLength;
        }
        int8() {
          const value = this.view.getInt8(this.offset);
          this.offset += 1;
          return value;
        }
        uint8() {
          const value = this.view.getUint8(this.offset);
          this.offset += 1;
          return value;
        }
        int16() {
          this.align(2);
          const value = this.view.getInt16(this.offset, this.littleEndian);
          this.offset += 2;
          return value;
        }
        uint16() {
          this.align(2);
          const value = this.view.getUint16(this.offset, this.littleEndian);
          this.offset += 2;
          return value;
        }
        int32() {
          this.align(4);
          const value = this.view.getInt32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        uint32() {
          this.align(4);
          const value = this.view.getUint32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        int64() {
          this.align(this.eightByteAlignment);
          const value = this.view.getBigInt64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        uint64() {
          this.align(this.eightByteAlignment);
          const value = this.view.getBigUint64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        uint16BE() {
          this.align(2);
          const value = this.view.getUint16(this.offset, false);
          this.offset += 2;
          return value;
        }
        uint32BE() {
          this.align(4);
          const value = this.view.getUint32(this.offset, false);
          this.offset += 4;
          return value;
        }
        uint64BE() {
          this.align(this.eightByteAlignment);
          const value = this.view.getBigUint64(this.offset, false);
          this.offset += 8;
          return value;
        }
        float32() {
          this.align(4);
          const value = this.view.getFloat32(this.offset, this.littleEndian);
          this.offset += 4;
          return value;
        }
        float64() {
          this.align(this.eightByteAlignment);
          const value = this.view.getFloat64(this.offset, this.littleEndian);
          this.offset += 8;
          return value;
        }
        string(prereadLength) {
          const length = prereadLength ?? this.uint32();
          if (length <= 1) {
            this.offset += length;
            return "";
          }
          const data = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length - 1);
          const value = textDecoder2.decode(data);
          this.offset += length;
          return value;
        }
        /** Reads the delimiter header which contains and returns the object size */
        dHeader() {
          const header = this.uint32();
          return header;
        }
        /**
         * Reads the member header (EMHEADER) and returns the member ID, mustUnderstand flag, and object size with optional length code
         * The length code is only present in CDR2 and should prompt objectSize to be used in place of sequence length if applicable.
         * See Extensible and Dynamic Topic Types (DDS-XTypes) v1.3 @ `7.4.3.4.2` for more info about CDR2 EMHEADER composition.
         * If a sentinelHeader was read (PL_CDR v1), the readSentinelHeader flag is set to true.
         */
        emHeader() {
          if (this.isCDR2) {
            return this.memberHeaderV2();
          } else {
            return this.memberHeaderV1();
          }
        }
        /** XCDR1 PL_CDR encapsulation parameter header*/
        memberHeaderV1() {
          this.align(4);
          const idHeader = this.uint16();
          const mustUnderstandFlag = (idHeader & 16384) >> 14 === 1;
          const implementationSpecificFlag = (idHeader & 32768) >> 15 === 1;
          const extendedPIDFlag = (idHeader & 16383) === reservedPIDs_1.EXTENDED_PID;
          const sentinelPIDFlag = (idHeader & 16383) === reservedPIDs_1.SENTINEL_PID;
          if (sentinelPIDFlag) {
            return { id: reservedPIDs_1.SENTINEL_PID, objectSize: 0, mustUnderstand: false, readSentinelHeader: true };
          }
          const usesReservedParameterId = (idHeader & 16383) > reservedPIDs_1.SENTINEL_PID;
          if (usesReservedParameterId || implementationSpecificFlag) {
            throw new Error(`Unsupported parameter ID header ${idHeader.toString(16)}`);
          }
          if (extendedPIDFlag) {
            this.uint16();
          }
          const id = extendedPIDFlag ? this.uint32() : idHeader & 16383;
          const objectSize = extendedPIDFlag ? this.uint32() : this.uint16();
          this.resetOrigin();
          return { id, objectSize, mustUnderstand: mustUnderstandFlag };
        }
        /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
        resetOrigin() {
          this.origin = this.offset;
        }
        /** Reads the PID_SENTINEL value if encapsulation kind supports it (PL_CDR version 1)*/
        sentinelHeader() {
          if (!this.isCDR2) {
            this.align(4);
            const header = this.uint16();
            const sentinelPIDFlag = (header & 16383) === reservedPIDs_1.SENTINEL_PID;
            if (!sentinelPIDFlag) {
              throw Error(`Expected SENTINEL_PID (${reservedPIDs_1.SENTINEL_PID.toString(16)}) flag, but got ${header.toString(16)}`);
            }
            this.uint16();
          }
        }
        memberHeaderV2() {
          const header = this.uint32();
          const mustUnderstand = Math.abs((header & 2147483648) >> 31) === 1;
          const lengthCode = (header & 1879048192) >> 28;
          const id = header & 268435455;
          const objectSize = this.emHeaderObjectSize(lengthCode);
          return { mustUnderstand, id, objectSize, lengthCode };
        }
        /** Uses the length code to derive the member object size in
         * the EMHEADER, sometimes reading NEXTINT (the next uint32
         * following the header) from the buffer */
        emHeaderObjectSize(lengthCode) {
          switch (lengthCode) {
            case 0:
            case 1:
            case 2:
            case 3:
              return lengthCodes_1.lengthCodeToObjectSizes[lengthCode];
            // LC > 3 -> NEXTINT exists after header
            case 4:
            case 5:
              return this.uint32();
            case 6:
              return 4 * this.uint32();
            case 7:
              return 8 * this.uint32();
            default:
              throw new Error(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `Invalid length code ${lengthCode} in EMHEADER at offset ${this.offset - 4}`
              );
          }
        }
        sequenceLength() {
          return this.uint32();
        }
        int8Array(count = this.sequenceLength()) {
          const array = new Int8Array(this.view.buffer, this.view.byteOffset + this.offset, count);
          this.offset += count;
          return array;
        }
        uint8Array(count = this.sequenceLength()) {
          const array = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, count);
          this.offset += count;
          return array;
        }
        int16Array(count = this.sequenceLength()) {
          return this.typedArray(Int16Array, "getInt16", count);
        }
        uint16Array(count = this.sequenceLength()) {
          return this.typedArray(Uint16Array, "getUint16", count);
        }
        int32Array(count = this.sequenceLength()) {
          return this.typedArray(Int32Array, "getInt32", count);
        }
        uint32Array(count = this.sequenceLength()) {
          return this.typedArray(Uint32Array, "getUint32", count);
        }
        int64Array(count = this.sequenceLength()) {
          return this.typedArray(BigInt64Array, "getBigInt64", count, this.eightByteAlignment);
        }
        uint64Array(count = this.sequenceLength()) {
          return this.typedArray(BigUint64Array, "getBigUint64", count, this.eightByteAlignment);
        }
        float32Array(count = this.sequenceLength()) {
          return this.typedArray(Float32Array, "getFloat32", count);
        }
        float64Array(count = this.sequenceLength()) {
          return this.typedArray(Float64Array, "getFloat64", count, this.eightByteAlignment);
        }
        stringArray(count = this.sequenceLength()) {
          const output = [];
          for (let i = 0; i < count; i++) {
            output.push(this.string());
          }
          return output;
        }
        /**
         * Seek the current read pointer a number of bytes relative to the current position. Note that
         * seeking before the four-byte header is invalid
         * @param relativeOffset A positive or negative number of bytes to seek
         */
        seek(relativeOffset) {
          const newOffset = this.offset + relativeOffset;
          if (newOffset < 4 || newOffset >= this.view.byteLength) {
            throw new Error(`seek(${relativeOffset}) failed, ${newOffset} is outside the data range`);
          }
          this.offset = newOffset;
        }
        /**
         * Seek to an absolute byte position in the data. Note that seeking before the four-byte header is
         * invalid
         * @param offset An absolute byte offset in the range of [4-byteLength)
         */
        seekTo(offset) {
          if (offset < 4 || offset >= this.view.byteLength) {
            throw new Error(`seekTo(${offset}) failed, value is outside the data range`);
          }
          this.offset = offset;
        }
        align(size) {
          const alignment = (this.offset - this.origin) % size;
          if (alignment > 0) {
            this.offset += size - alignment;
          }
        }
        // Reads a given count of numeric values into a typed array.
        typedArray(TypedArrayConstructor, getter, count, alignment = TypedArrayConstructor.BYTES_PER_ELEMENT) {
          if (count === 0) {
            return new TypedArrayConstructor();
          }
          this.align(alignment);
          const totalOffset = this.view.byteOffset + this.offset;
          if (this.littleEndian !== this.hostLittleEndian) {
            return this.typedArraySlow(TypedArrayConstructor, getter, count);
          } else if (totalOffset % TypedArrayConstructor.BYTES_PER_ELEMENT === 0) {
            const array = new TypedArrayConstructor(this.view.buffer, totalOffset, count);
            this.offset += TypedArrayConstructor.BYTES_PER_ELEMENT * count;
            return array;
          } else {
            return this.typedArrayUnaligned(TypedArrayConstructor, getter, count);
          }
        }
        typedArrayUnaligned(TypedArrayConstructor, getter, count) {
          if (count < 10) {
            return this.typedArraySlow(TypedArrayConstructor, getter, count);
          }
          const byteLength = TypedArrayConstructor.BYTES_PER_ELEMENT * count;
          const copy = new Uint8Array(byteLength);
          copy.set(new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, byteLength));
          this.offset += byteLength;
          return new TypedArrayConstructor(copy.buffer, copy.byteOffset, count);
        }
        typedArraySlow(TypedArrayConstructor, getter, count) {
          const array = new TypedArrayConstructor(count);
          let offset = this.offset;
          for (let i = 0; i < count; i++) {
            array[i] = this.view[getter](offset, this.littleEndian);
            offset += TypedArrayConstructor.BYTES_PER_ELEMENT;
          }
          this.offset = offset;
          return array;
        }
      };
      exports.CdrReader = CdrReader;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/CdrSizeCalculator.js
  var require_CdrSizeCalculator = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/CdrSizeCalculator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CdrSizeCalculator = void 0;
      var CdrSizeCalculator = class {
        constructor() {
          this.offset = 4;
        }
        get size() {
          return this.offset;
        }
        int8() {
          return this.incrementAndReturn(1);
        }
        uint8() {
          return this.incrementAndReturn(1);
        }
        int16() {
          return this.incrementAndReturn(2);
        }
        uint16() {
          return this.incrementAndReturn(2);
        }
        int32() {
          return this.incrementAndReturn(4);
        }
        uint32() {
          return this.incrementAndReturn(4);
        }
        int64() {
          return this.incrementAndReturn(8);
        }
        uint64() {
          return this.incrementAndReturn(8);
        }
        float32() {
          return this.incrementAndReturn(4);
        }
        float64() {
          return this.incrementAndReturn(8);
        }
        string(length) {
          this.uint32();
          this.offset += length + 1;
          return this.offset;
        }
        sequenceLength() {
          return this.uint32();
        }
        // Increments the offset by `byteCount` and any required padding bytes and
        // returns the new offset
        incrementAndReturn(byteCount) {
          const alignment = (this.offset - 4) % byteCount;
          if (alignment > 0) {
            this.offset += byteCount - alignment;
          }
          this.offset += byteCount;
          return this.offset;
        }
      };
      exports.CdrSizeCalculator = CdrSizeCalculator;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/CdrWriter.js
  var require_CdrWriter = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/CdrWriter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CdrWriter = void 0;
      var EncapsulationKind_1 = require_EncapsulationKind();
      var getEncapsulationKindInfo_1 = require_getEncapsulationKindInfo();
      var isBigEndian_1 = require_isBigEndian();
      var lengthCodes_1 = require_lengthCodes();
      var reservedPIDs_1 = require_reservedPIDs();
      var textEncoder3 = new TextEncoder();
      var CdrWriter = class _CdrWriter {
        constructor(options = {}) {
          if (options.buffer != void 0) {
            this.buffer = options.buffer;
          } else if (options.size != void 0) {
            this.buffer = new ArrayBuffer(options.size);
          } else {
            this.buffer = new ArrayBuffer(_CdrWriter.DEFAULT_CAPACITY);
          }
          const kind = options.kind ?? EncapsulationKind_1.EncapsulationKind.CDR_LE;
          const { isCDR2, littleEndian } = (0, getEncapsulationKindInfo_1.getEncapsulationKindInfo)(kind);
          this.isCDR2 = isCDR2;
          this.littleEndian = littleEndian;
          this.hostLittleEndian = !(0, isBigEndian_1.isBigEndian)();
          this.eightByteAlignment = isCDR2 ? 4 : 8;
          this.array = new Uint8Array(this.buffer);
          this.view = new DataView(this.buffer);
          this.resizeIfNeeded(4);
          this.view.setUint8(0, 0);
          this.view.setUint8(1, kind);
          this.view.setUint16(2, 0, false);
          this.offset = 4;
          this.origin = 4;
        }
        get data() {
          return new Uint8Array(this.buffer, 0, this.offset);
        }
        get size() {
          return this.offset;
        }
        get kind() {
          return this.view.getUint8(1);
        }
        int8(value) {
          this.resizeIfNeeded(1);
          this.view.setInt8(this.offset, value);
          this.offset += 1;
          return this;
        }
        uint8(value) {
          this.resizeIfNeeded(1);
          this.view.setUint8(this.offset, value);
          this.offset += 1;
          return this;
        }
        int16(value) {
          this.align(2);
          this.view.setInt16(this.offset, value, this.littleEndian);
          this.offset += 2;
          return this;
        }
        uint16(value) {
          this.align(2);
          this.view.setUint16(this.offset, value, this.littleEndian);
          this.offset += 2;
          return this;
        }
        int32(value) {
          this.align(4);
          this.view.setInt32(this.offset, value, this.littleEndian);
          this.offset += 4;
          return this;
        }
        uint32(value) {
          this.align(4);
          this.view.setUint32(this.offset, value, this.littleEndian);
          this.offset += 4;
          return this;
        }
        int64(value) {
          this.align(this.eightByteAlignment, 8);
          this.view.setBigInt64(this.offset, value, this.littleEndian);
          this.offset += 8;
          return this;
        }
        uint64(value) {
          this.align(this.eightByteAlignment, 8);
          this.view.setBigUint64(this.offset, value, this.littleEndian);
          this.offset += 8;
          return this;
        }
        uint16BE(value) {
          this.align(2);
          this.view.setUint16(this.offset, value, false);
          this.offset += 2;
          return this;
        }
        uint32BE(value) {
          this.align(4);
          this.view.setUint32(this.offset, value, false);
          this.offset += 4;
          return this;
        }
        uint64BE(value) {
          this.align(this.eightByteAlignment, 8);
          this.view.setBigUint64(this.offset, value, false);
          this.offset += 8;
          return this;
        }
        float32(value) {
          this.align(4);
          this.view.setFloat32(this.offset, value, this.littleEndian);
          this.offset += 4;
          return this;
        }
        float64(value) {
          this.align(this.eightByteAlignment, 8);
          this.view.setFloat64(this.offset, value, this.littleEndian);
          this.offset += 8;
          return this;
        }
        // writeLength optional because it could already be included in a header
        string(value, writeLength = true) {
          const strlen = value.length;
          if (writeLength) {
            this.uint32(strlen + 1);
          }
          this.resizeIfNeeded(strlen + 1);
          textEncoder3.encodeInto(value, new Uint8Array(this.buffer, this.offset, strlen));
          this.view.setUint8(this.offset + strlen, 0);
          this.offset += strlen + 1;
          return this;
        }
        /** Writes the delimiter header using object size
         * NOTE: changing endian-ness with a single CDR message is not supported
         */
        dHeader(objectSize) {
          const header = objectSize;
          this.uint32(header);
          return this;
        }
        /**
         * Writes the member header (EMHEADER)
         * Accomodates for PL_CDR and PL_CDR2 based on the CdrWriter constructor options
         *
         * @param mustUnderstand - Whether the member is required to be understood by the receiver
         * @param id - The member ID
         * @param objectSize - The size of the member in bytes
         * @param lengthCode - Optional length code for CDR2 emHeaders.
         * lengthCode values [5-7] allow the emHeader object size to take the place of the normally encoded member length.
         *
         * NOTE: Dynamically determines default value if not provided that does not affect serialization ie will use lengthCode values [0-4].
         *
         * From Extensible and Dynamic Topic Types in DDS-XTypes v1.3 @ `7.4.3.4.2`:
         * "EMHEADER1 with LC values 5 to 7 also affect the serialization/deserialization virtual machine in that they cause NEXTINT to be
         * reused also as part of the serialized member. This is useful because the serialization of certain members also starts with an
         * integer length, which would take exactly the same value as NEXTINT. Therefore the use of length codes 5 to 7 saves 4 bytes in
         * the serialization."
         * @returns - CdrWriter instance
         */
        emHeader(mustUnderstand, id, objectSize, lengthCode) {
          return this.isCDR2 ? this.memberHeaderV2(mustUnderstand, id, objectSize, lengthCode) : this.memberHeaderV1(mustUnderstand, id, objectSize);
        }
        memberHeaderV1(mustUnderstand, id, objectSize) {
          this.align(4);
          const mustUnderstandFlag = mustUnderstand ? 1 << 14 : 0;
          const shouldUseExtendedPID = id > 16128 || objectSize > 65535;
          if (!shouldUseExtendedPID) {
            const idHeader = mustUnderstandFlag | id;
            this.uint16(idHeader);
            const objectSizeHeader = objectSize & 65535;
            this.uint16(objectSizeHeader);
          } else {
            const extendedHeader = mustUnderstandFlag | reservedPIDs_1.EXTENDED_PID;
            this.uint16(extendedHeader);
            this.uint16(8);
            this.uint32(id);
            this.uint32(objectSize);
          }
          this.resetOrigin();
          return this;
        }
        /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
        resetOrigin() {
          this.origin = this.offset;
        }
        /** Writes the PID_SENTINEL value if encapsulation supports it*/
        sentinelHeader() {
          if (!this.isCDR2) {
            this.align(4);
            this.uint16(reservedPIDs_1.SENTINEL_PID);
            this.uint16(0);
          }
          return this;
        }
        memberHeaderV2(mustUnderstand, id, objectSize, lengthCode) {
          if (id > 268435455) {
            throw Error(`Member ID ${id} is too large. Max value is ${268435455}`);
          }
          const mustUnderstandFlag = mustUnderstand ? 1 << 31 : 0;
          const finalLengthCode = lengthCode ?? (0, lengthCodes_1.getLengthCodeForObjectSize)(objectSize);
          const header = mustUnderstandFlag | finalLengthCode << 28 | id;
          this.uint32(header);
          switch (finalLengthCode) {
            case 0:
            case 1:
            case 2:
            case 3: {
              const shouldBeSize = lengthCodes_1.lengthCodeToObjectSizes[finalLengthCode];
              if (objectSize !== shouldBeSize) {
                throw new Error(`Cannot write a length code ${finalLengthCode} header with an object size not equal to ${shouldBeSize}`);
              }
              break;
            }
            // When the length code is > 3 the header is 8 bytes because of the NEXTINT value storing the object size
            case 4:
            case 5:
              this.uint32(objectSize);
              break;
            case 6:
              if (objectSize % 4 !== 0) {
                throw new Error("Cannot write a length code 6 header with an object size that is not a multiple of 4");
              }
              this.uint32(objectSize >> 2);
              break;
            case 7:
              if (objectSize % 8 !== 0) {
                throw new Error("Cannot write a length code 7 header with an object size that is not a multiple of 8");
              }
              this.uint32(objectSize >> 3);
              break;
            default:
              throw new Error(`Unexpected length code ${finalLengthCode}`);
          }
          return this;
        }
        sequenceLength(value) {
          return this.uint32(value);
        }
        int8Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          this.resizeIfNeeded(value.length);
          this.array.set(value, this.offset);
          this.offset += value.length;
          return this;
        }
        uint8Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          this.resizeIfNeeded(value.length);
          this.array.set(value, this.offset);
          this.offset += value.length;
          return this;
        }
        int16Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Int16Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.int16(entry);
            }
          }
          return this;
        }
        uint16Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Uint16Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.uint16(entry);
            }
          }
          return this;
        }
        int32Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Int32Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.int32(entry);
            }
          }
          return this;
        }
        uint32Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Uint32Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.uint32(entry);
            }
          }
          return this;
        }
        int64Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof BigInt64Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.int64(BigInt(entry));
            }
          }
          return this;
        }
        uint64Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof BigUint64Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.uint64(BigInt(entry));
            }
          }
          return this;
        }
        float32Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Float32Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.float32(entry);
            }
          }
          return this;
        }
        float64Array(value, writeLength) {
          if (writeLength === true) {
            this.sequenceLength(value.length);
          }
          if (value instanceof Float64Array && this.littleEndian === this.hostLittleEndian && value.length >= _CdrWriter.BUFFER_COPY_THRESHOLD) {
            this.align(value.BYTES_PER_ELEMENT, value.byteLength);
            this.array.set(new Uint8Array(value.buffer, value.byteOffset, value.byteLength), this.offset);
            this.offset += value.byteLength;
          } else {
            for (const entry of value) {
              this.float64(entry);
            }
          }
          return this;
        }
        /**
         * Calculate the capacity needed to hold the given number of aligned bytes,
         * resize if needed, and write padding bytes for alignment
         * @param size Byte width to align to. If the current offset is 1 and `size`
         *   is 4, 3 bytes of padding will be written
         * @param bytesToWrite Optional, total amount of bytes that are intended to be
         *   written directly following the alignment. This can be used to avoid
         *   additional buffer resizes in the case of writing large blocks of aligned
         *   data such as arrays
         */
        align(size, bytesToWrite = size) {
          const alignment = (this.offset - this.origin) % size;
          const padding = alignment > 0 ? size - alignment : 0;
          this.resizeIfNeeded(padding + bytesToWrite);
          this.array.fill(0, this.offset, this.offset + padding);
          this.offset += padding;
        }
        resizeIfNeeded(additionalBytes) {
          const capacity = this.offset + additionalBytes;
          if (this.buffer.byteLength < capacity) {
            const doubled = this.buffer.byteLength * 2;
            const newCapacity = doubled > capacity ? doubled : capacity;
            this.resize(newCapacity);
          }
        }
        resize(capacity) {
          if (this.buffer.byteLength >= capacity) {
            return;
          }
          const buffer = new ArrayBuffer(capacity);
          const array = new Uint8Array(buffer);
          array.set(this.array);
          this.buffer = buffer;
          this.array = array;
          this.view = new DataView(buffer);
        }
      };
      exports.CdrWriter = CdrWriter;
      CdrWriter.DEFAULT_CAPACITY = 16;
      CdrWriter.BUFFER_COPY_THRESHOLD = 10;
    }
  });

  // ../../../node_modules/@foxglove/cdr/dist/index.js
  var require_dist2 = __commonJS({
    "../../../node_modules/@foxglove/cdr/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_CdrReader(), exports);
      __exportStar(require_CdrSizeCalculator(), exports);
      __exportStar(require_CdrWriter(), exports);
      __exportStar(require_EncapsulationKind(), exports);
    }
  });

  // ../../../node_modules/@foxglove/rosmsg2-serialization/dist/MessageReader.js
  var require_MessageReader = __commonJS({
    "../../../node_modules/@foxglove/rosmsg2-serialization/dist/MessageReader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MessageReader = void 0;
      var cdr_1 = require_dist2();
      var MessageReader2 = class {
        constructor(definitions) {
          const rootDefinition = definitions.find((def) => !isConstantModule(def));
          if (rootDefinition == void 0) {
            throw new Error("MessageReader initialized with no root MessageDefinition");
          }
          this.rootDefinition = rootDefinition.definitions;
          this.definitions = new Map(definitions.map((def) => [def.name ?? "", def.definitions]));
        }
        // We template on R here for call site type information if the class type information T is not
        // known or available
        readMessage(buffer) {
          const reader = new cdr_1.CdrReader(buffer);
          return this.readComplexType(this.rootDefinition, reader);
        }
        readComplexType(definition, reader) {
          const msg = {};
          if (definition.length === 0) {
            reader.uint8();
            return msg;
          }
          for (const field of definition) {
            if (field.isConstant === true) {
              continue;
            }
            if (field.isComplex === true) {
              const nestedDefinition = this.definitions.get(field.type);
              if (nestedDefinition == void 0) {
                throw new Error(`Unrecognized complex type ${field.type}`);
              }
              if (field.isArray === true) {
                const arrayLength = field.arrayLength ?? reader.sequenceLength();
                const array = [];
                for (let i = 0; i < arrayLength; i++) {
                  array.push(this.readComplexType(nestedDefinition, reader));
                }
                msg[field.name] = array;
              } else {
                msg[field.name] = this.readComplexType(nestedDefinition, reader);
              }
            } else {
              if (field.isArray === true) {
                const deser = typedArrayDeserializers.get(field.type);
                if (deser == void 0) {
                  throw new Error(`Unrecognized primitive array type ${field.type}[]`);
                }
                const arrayLength = field.arrayLength ?? reader.sequenceLength();
                msg[field.name] = deser(reader, arrayLength);
              } else {
                const deser = deserializers2.get(field.type);
                if (deser == void 0) {
                  throw new Error(`Unrecognized primitive type ${field.type}`);
                }
                msg[field.name] = deser(reader);
              }
            }
          }
          return msg;
        }
      };
      exports.MessageReader = MessageReader2;
      function isConstantModule(def) {
        return def.definitions.length > 0 && def.definitions.every((field) => field.isConstant);
      }
      var deserializers2 = /* @__PURE__ */ new Map([
        ["bool", (reader) => Boolean(reader.int8())],
        ["int8", (reader) => reader.int8()],
        ["uint8", (reader) => reader.uint8()],
        ["int16", (reader) => reader.int16()],
        ["uint16", (reader) => reader.uint16()],
        ["int32", (reader) => reader.int32()],
        ["uint32", (reader) => reader.uint32()],
        ["int64", (reader) => reader.int64()],
        ["uint64", (reader) => reader.uint64()],
        ["float32", (reader) => reader.float32()],
        ["float64", (reader) => reader.float64()],
        ["string", (reader) => reader.string()],
        ["time", (reader) => ({ sec: reader.int32(), nsec: reader.uint32() })],
        ["duration", (reader) => ({ sec: reader.int32(), nsec: reader.uint32() })],
        ["wstring", throwOnWstring]
      ]);
      var typedArrayDeserializers = /* @__PURE__ */ new Map([
        ["bool", readBoolArray],
        ["int8", (reader, count) => reader.int8Array(count)],
        ["uint8", (reader, count) => reader.uint8Array(count)],
        ["int16", (reader, count) => reader.int16Array(count)],
        ["uint16", (reader, count) => reader.uint16Array(count)],
        ["int32", (reader, count) => reader.int32Array(count)],
        ["uint32", (reader, count) => reader.uint32Array(count)],
        ["int64", (reader, count) => reader.int64Array(count)],
        ["uint64", (reader, count) => reader.uint64Array(count)],
        ["float32", (reader, count) => reader.float32Array(count)],
        ["float64", (reader, count) => reader.float64Array(count)],
        ["string", readStringArray],
        ["time", readTimeArray],
        ["duration", readTimeArray],
        ["wstring", throwOnWstring]
      ]);
      function readBoolArray(reader, count) {
        const array = new Array(count);
        for (let i = 0; i < count; i++) {
          array[i] = Boolean(reader.int8());
        }
        return array;
      }
      function readStringArray(reader, count) {
        const array = new Array(count);
        for (let i = 0; i < count; i++) {
          array[i] = reader.string();
        }
        return array;
      }
      function readTimeArray(reader, count) {
        const array = new Array(count);
        for (let i = 0; i < count; i++) {
          const sec = reader.int32();
          const nsec = reader.uint32();
          array[i] = { sec, nsec };
        }
        return array;
      }
      function throwOnWstring() {
        throw new Error("wstring is implementation-defined and therefore not supported");
      }
    }
  });

  // ../../../node_modules/@foxglove/rosmsg2-serialization/dist/MessageWriter.js
  var require_MessageWriter = __commonJS({
    "../../../node_modules/@foxglove/rosmsg2-serialization/dist/MessageWriter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MessageWriter = void 0;
      var cdr_1 = require_dist2();
      var PRIMITIVE_SIZES = /* @__PURE__ */ new Map([
        ["bool", 1],
        ["int8", 1],
        ["uint8", 1],
        ["int16", 2],
        ["uint16", 2],
        ["int32", 4],
        ["uint32", 4],
        ["int64", 8],
        ["uint64", 8],
        ["float32", 4],
        ["float64", 8],
        // ["string", ...], // handled separately
        ["time", 8],
        ["duration", 8]
      ]);
      var PRIMITIVE_WRITERS = /* @__PURE__ */ new Map([
        ["bool", bool],
        ["int8", int8],
        ["uint8", uint8],
        ["int16", int16],
        ["uint16", uint16],
        ["int32", int32],
        ["uint32", uint32],
        ["int64", int64],
        ["uint64", uint64],
        ["float32", float32],
        ["float64", float64],
        ["string", string],
        ["time", time],
        ["duration", time],
        ["wstring", throwOnWstring]
      ]);
      var PRIMITIVE_ARRAY_WRITERS = /* @__PURE__ */ new Map([
        ["bool", boolArray],
        ["int8", int8Array],
        ["uint8", uint8Array],
        ["int16", int16Array],
        ["uint16", uint16Array],
        ["int32", int32Array],
        ["uint32", uint32Array],
        ["int64", int64Array],
        ["uint64", uint64Array],
        ["float32", float32Array],
        ["float64", float64Array],
        ["string", stringArray],
        ["time", timeArray],
        ["duration", timeArray],
        ["wstring", throwOnWstring]
      ]);
      function throwOnWstring() {
        throw new Error("wstring is implementation-defined and therefore not supported");
      }
      var MessageWriter2 = class {
        constructor(definitions) {
          const rootDefinition = definitions.find((def) => !isConstantModule(def));
          if (rootDefinition == void 0) {
            throw new Error("MessageReader initialized with no root MessageDefinition");
          }
          this.rootDefinition = rootDefinition.definitions;
          this.definitions = new Map(definitions.map((def) => [def.name ?? "", def.definitions]));
        }
        /** Calculates the byte size needed to write this message in bytes. */
        calculateByteSize(message) {
          return this.byteSize(this.rootDefinition, message, 4);
        }
        /**
         * Serializes a JavaScript object to CDR-encoded binary according to this
         * writer's message definition. If output is provided, it's byte length must
         * be equal or greater to the result of `calculateByteSize(message)`. If not
         * provided, a new Uint8Array will be allocated.
         */
        writeMessage(message, output) {
          const writer = new cdr_1.CdrWriter({
            buffer: output,
            size: output ? void 0 : this.calculateByteSize(message)
          });
          this.write(this.rootDefinition, message, writer);
          return writer.data;
        }
        byteSize(definition, message, offset) {
          const messageObj = message;
          let newOffset = offset;
          if (definition.length === 0) {
            return offset + this.getPrimitiveSize("uint8");
          }
          for (const field of definition) {
            if (field.isConstant === true) {
              continue;
            }
            const nestedMessage = messageObj?.[field.name];
            if (field.isArray === true) {
              const arrayLength = field.arrayLength ?? fieldLength(nestedMessage);
              const dataIsArray = Array.isArray(nestedMessage) || ArrayBuffer.isView(nestedMessage);
              const dataArray = dataIsArray ? nestedMessage : [];
              if (field.arrayLength == void 0) {
                newOffset += padding(newOffset, 4);
                newOffset += 4;
              }
              if (field.isComplex === true) {
                const nestedDefinition = this.getDefinition(field.type);
                for (let i = 0; i < arrayLength; i++) {
                  const entry = dataArray[i] ?? {};
                  newOffset = this.byteSize(nestedDefinition, entry, newOffset);
                }
              } else if (field.type === "string") {
                for (let i = 0; i < arrayLength; i++) {
                  const entry = dataArray[i] ?? "";
                  newOffset += padding(newOffset, 4);
                  newOffset += 4 + entry.length + 1;
                }
              } else {
                const entrySize = this.getPrimitiveSize(field.type);
                const alignment = field.type === "time" || field.type === "duration" ? 4 : entrySize;
                newOffset += padding(newOffset, alignment);
                newOffset += entrySize * arrayLength;
              }
            } else {
              if (field.isComplex === true) {
                const nestedDefinition = this.getDefinition(field.type);
                const entry = nestedMessage ?? {};
                newOffset = this.byteSize(nestedDefinition, entry, newOffset);
              } else if (field.type === "string") {
                const entry = typeof nestedMessage === "string" ? nestedMessage : "";
                newOffset += padding(newOffset, 4);
                newOffset += 4 + entry.length + 1;
              } else {
                const entrySize = this.getPrimitiveSize(field.type);
                const alignment = field.type === "time" || field.type === "duration" ? 4 : entrySize;
                newOffset += padding(newOffset, alignment);
                newOffset += entrySize;
              }
            }
          }
          return newOffset;
        }
        write(definition, message, writer) {
          const messageObj = message;
          if (definition.length === 0) {
            uint8(0, 0, writer);
            return;
          }
          for (const field of definition) {
            if (field.isConstant === true) {
              continue;
            }
            const nestedMessage = messageObj?.[field.name];
            if (field.isArray === true) {
              const arrayLength = field.arrayLength ?? fieldLength(nestedMessage);
              const dataIsArray = Array.isArray(nestedMessage) || ArrayBuffer.isView(nestedMessage);
              const dataArray = dataIsArray ? nestedMessage : [];
              if (field.arrayLength == void 0) {
                writer.sequenceLength(arrayLength);
              }
              if (field.arrayLength != void 0 && nestedMessage != void 0) {
                const givenFieldLength = fieldLength(nestedMessage);
                if (givenFieldLength !== field.arrayLength) {
                  throw new Error(`Expected ${field.arrayLength} items for fixed-length array field ${field.name} but received ${givenFieldLength}`);
                }
              }
              if (field.isComplex === true) {
                const nestedDefinition = this.getDefinition(field.type);
                for (let i = 0; i < arrayLength; i++) {
                  const entry = dataArray[i] ?? {};
                  this.write(nestedDefinition, entry, writer);
                }
              } else {
                const arrayWriter = this.getPrimitiveArrayWriter(field.type);
                arrayWriter(nestedMessage, field.defaultValue, writer, field.arrayLength);
              }
            } else {
              if (field.isComplex === true) {
                const nestedDefinition = this.getDefinition(field.type);
                const entry = nestedMessage ?? {};
                this.write(nestedDefinition, entry, writer);
              } else {
                const primitiveWriter = this.getPrimitiveWriter(field.type);
                primitiveWriter(nestedMessage, field.defaultValue, writer);
              }
            }
          }
        }
        getDefinition(datatype) {
          const nestedDefinition = this.definitions.get(datatype);
          if (nestedDefinition == void 0) {
            throw new Error(`Unrecognized complex type ${datatype}`);
          }
          return nestedDefinition;
        }
        getPrimitiveSize(primitiveType) {
          const size = PRIMITIVE_SIZES.get(primitiveType);
          if (size == void 0) {
            if (primitiveType === "wstring") {
              throwOnWstring();
            }
            throw new Error(`Unrecognized primitive type ${primitiveType}`);
          }
          return size;
        }
        getPrimitiveWriter(primitiveType) {
          const writer = PRIMITIVE_WRITERS.get(primitiveType);
          if (writer == void 0) {
            throw new Error(`Unrecognized primitive type ${primitiveType}`);
          }
          return writer;
        }
        getPrimitiveArrayWriter(primitiveType) {
          const writer = PRIMITIVE_ARRAY_WRITERS.get(primitiveType);
          if (writer == void 0) {
            throw new Error(`Unrecognized primitive type ${primitiveType}[]`);
          }
          return writer;
        }
      };
      exports.MessageWriter = MessageWriter2;
      function isConstantModule(def) {
        return def.definitions.length > 0 && def.definitions.every((field) => field.isConstant);
      }
      function fieldLength(value) {
        const length = value?.length;
        return typeof length === "number" ? length : 0;
      }
      function bool(value, defaultValue, writer) {
        const boolValue = typeof value === "boolean" ? value : defaultValue ?? false;
        writer.int8(boolValue ? 1 : 0);
      }
      function int8(value, defaultValue, writer) {
        writer.int8(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function uint8(value, defaultValue, writer) {
        writer.uint8(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function int16(value, defaultValue, writer) {
        writer.int16(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function uint16(value, defaultValue, writer) {
        writer.uint16(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function int32(value, defaultValue, writer) {
        writer.int32(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function uint32(value, defaultValue, writer) {
        writer.uint32(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function int64(value, defaultValue, writer) {
        if (typeof value === "bigint") {
          writer.int64(value);
        } else if (typeof value === "number") {
          writer.int64(BigInt(value));
        } else {
          writer.int64(defaultValue ?? 0n);
        }
      }
      function uint64(value, defaultValue, writer) {
        if (typeof value === "bigint") {
          writer.uint64(value);
        } else if (typeof value === "number") {
          writer.uint64(BigInt(value));
        } else {
          writer.uint64(defaultValue ?? 0n);
        }
      }
      function float32(value, defaultValue, writer) {
        writer.float32(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function float64(value, defaultValue, writer) {
        writer.float64(typeof value === "number" ? value : defaultValue ?? 0);
      }
      function string(value, defaultValue, writer) {
        writer.string(typeof value === "string" ? value : defaultValue ?? "");
      }
      function time(value, _defaultValue, writer) {
        if (value == void 0) {
          writer.int32(0);
          writer.uint32(0);
          return;
        }
        const timeObj = value;
        writer.int32(timeObj.sec ?? 0);
        writer.uint32(timeObj.nsec ?? timeObj.nanosec ?? 0);
      }
      function boolArray(value, defaultValue, writer, arrayLength) {
        if (Array.isArray(value)) {
          const array = new Int8Array(value);
          writer.int8Array(array);
        } else {
          writer.int8Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function int8Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Int8Array) {
          writer.int8Array(value);
        } else if (Array.isArray(value)) {
          const array = new Int8Array(value);
          writer.int8Array(array);
        } else {
          writer.int8Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function uint8Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Uint8Array) {
          writer.uint8Array(value);
        } else if (value instanceof Uint8ClampedArray) {
          writer.uint8Array(new Uint8Array(value));
        } else if (Array.isArray(value)) {
          const array = new Uint8Array(value);
          writer.uint8Array(array);
        } else {
          writer.uint8Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function int16Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Int16Array) {
          writer.int16Array(value);
        } else if (Array.isArray(value)) {
          const array = new Int16Array(value);
          writer.int16Array(array);
        } else {
          writer.int16Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function uint16Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Uint16Array) {
          writer.uint16Array(value);
        } else if (Array.isArray(value)) {
          const array = new Uint16Array(value);
          writer.uint16Array(array);
        } else {
          writer.uint16Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function int32Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Int32Array) {
          writer.int32Array(value);
        } else if (Array.isArray(value)) {
          const array = new Int32Array(value);
          writer.int32Array(array);
        } else {
          writer.int32Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function uint32Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Uint32Array) {
          writer.uint32Array(value);
        } else if (Array.isArray(value)) {
          const array = new Uint32Array(value);
          writer.uint32Array(array);
        } else {
          writer.uint32Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function int64Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof BigInt64Array) {
          writer.int64Array(value);
        } else if (Array.isArray(value)) {
          const array = new BigInt64Array(value);
          writer.int64Array(array);
        } else {
          writer.int64Array(defaultValue ?? new Array(arrayLength).fill(0n));
        }
      }
      function uint64Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof BigUint64Array) {
          writer.uint64Array(value);
        } else if (Array.isArray(value)) {
          const array = new BigUint64Array(value);
          writer.uint64Array(array);
        } else {
          writer.uint64Array(defaultValue ?? new Array(arrayLength).fill(0n));
        }
      }
      function float32Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Float32Array) {
          writer.float32Array(value);
        } else if (Array.isArray(value)) {
          const array = new Float32Array(value);
          writer.float32Array(array);
        } else {
          writer.float32Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function float64Array(value, defaultValue, writer, arrayLength) {
        if (value instanceof Float64Array) {
          writer.float64Array(value);
        } else if (Array.isArray(value)) {
          const array = new Float64Array(value);
          writer.float64Array(array);
        } else {
          writer.float64Array(defaultValue ?? new Array(arrayLength).fill(0));
        }
      }
      function stringArray(value, defaultValue, writer, arrayLength) {
        if (Array.isArray(value)) {
          for (const item of value) {
            writer.string(typeof item === "string" ? item : "");
          }
        } else {
          const array = defaultValue ?? new Array(arrayLength).fill("");
          for (const item of array) {
            writer.string(item);
          }
        }
      }
      function timeArray(value, _defaultValue, writer, arrayLength) {
        if (Array.isArray(value)) {
          for (const item of value) {
            time(item, void 0, writer);
          }
        } else {
          const array = new Array(arrayLength).fill(void 0);
          for (const item of array) {
            time(item, void 0, writer);
          }
        }
      }
      function padding(offset, byteWidth) {
        const alignment = (offset - 4) % byteWidth;
        return alignment > 0 ? byteWidth - alignment : 0;
      }
    }
  });

  // ../../../node_modules/@foxglove/rosmsg2-serialization/dist/index.js
  var require_dist3 = __commonJS({
    "../../../node_modules/@foxglove/rosmsg2-serialization/dist/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_MessageReader(), exports);
      __exportStar(require_MessageWriter(), exports);
    }
  });

  // ../../../node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "../../../node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // ../../../node_modules/ms/index.js
  var require_ms = __commonJS({
    "../../../node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse2(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse2(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // ../../../node_modules/debug/src/common.js
  var require_common = __commonJS({
    "../../../node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug2.debug = createDebug2;
        createDebug2.default = createDebug2;
        createDebug2.coerce = coerce;
        createDebug2.disable = disable;
        createDebug2.enable = enable;
        createDebug2.enabled = enabled;
        createDebug2.humanize = require_ms();
        createDebug2.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug2[key] = env[key];
        });
        createDebug2.names = [];
        createDebug2.skips = [];
        createDebug2.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug2.colors[Math.abs(hash) % createDebug2.colors.length];
        }
        createDebug2.selectColor = selectColor;
        function createDebug2(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug2.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug2.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug2.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug2.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug2.useColors();
          debug.color = createDebug2.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug2.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug2.namespaces) {
                namespacesCache = createDebug2.namespaces;
                enabledCache = createDebug2.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug2.init === "function") {
            createDebug2.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug2(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug2.save(namespaces);
          createDebug2.namespaces = namespaces;
          createDebug2.names = [];
          createDebug2.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug2.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            } else {
              createDebug2.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug2.names.map(toNamespace),
            ...createDebug2.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug2.enable("");
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug2.skips.length; i < len; i++) {
            if (createDebug2.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug2.names.length; i < len; i++) {
            if (createDebug2.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug2.enable(createDebug2.load());
        return createDebug2;
      }
      module.exports = setup;
    }
  });

  // ../../../node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "../../../node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // Param.ts
  var Param = class {
    constructor(options) {
      this.options = options;
      this.#ros = options.ros;
      this.#name = options.name.replace(":", ".");
    }
    #ros;
    #name;
    get(callback) {
      this.#ros.rosImpl?.getParameter(this.#name).then(callback);
    }
    set(value, callback) {
      this.#ros.rosImpl?.setParameter(this.#name, value).then(callback);
    }
  };

  // Impl.ts
  var import_rosmsg = __toESM(require_dist());

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/decodeString.js
  var decoder = new TextDecoder();
  function decodeString(data) {
    if (data.length >= 50) {
      return decoder.decode(data);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i] & 128) {
        return decoder.decode(data);
      }
    }
    return String.fromCharCode.apply(null, data);
  }

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/BuiltinDeserialize.js
  function MakeTypedArrayDeserialze(TypedArrayConstructor, getter) {
    if (TypedArrayConstructor == void 0) {
      console.warn("bigint arrays are not supported in this environment");
    }
    return (view, offset, len) => {
      if (TypedArrayConstructor == void 0) {
        throw new Error("bigint arrays are not supported in this environment");
      }
      let currentOffset = offset;
      const totalOffset = view.byteOffset + currentOffset;
      const size = TypedArrayConstructor.BYTES_PER_ELEMENT * len;
      const maxSize = view.byteLength - offset;
      if (size < 0 || size > maxSize) {
        throw new RangeError(`Array(${getter}) deserialization error: size ${size}, maxSize ${maxSize}`);
      }
      if (totalOffset % TypedArrayConstructor.BYTES_PER_ELEMENT === 0) {
        return new TypedArrayConstructor(view.buffer, totalOffset, len);
      }
      if (len < 10) {
        const arr = new TypedArrayConstructor(len);
        for (let idx = 0; idx < len; ++idx) {
          arr[idx] = view[getter](currentOffset, true);
          currentOffset += TypedArrayConstructor.BYTES_PER_ELEMENT;
        }
        return arr;
      }
      const copy = new Uint8Array(size);
      copy.set(new Uint8Array(view.buffer, totalOffset, size));
      return new TypedArrayConstructor(copy.buffer, copy.byteOffset, len);
    };
  }
  var deserializers = {
    bool: (view, offset) => view.getUint8(offset) !== 0,
    int8: (view, offset) => view.getInt8(offset),
    uint8: (view, offset) => view.getUint8(offset),
    int16: (view, offset) => view.getInt16(offset, true),
    uint16: (view, offset) => view.getUint16(offset, true),
    int32: (view, offset) => view.getInt32(offset, true),
    uint32: (view, offset) => view.getUint32(offset, true),
    int64: (view, offset) => view.getBigInt64(offset, true),
    uint64: (view, offset) => view.getBigUint64(offset, true),
    float32: (view, offset) => view.getFloat32(offset, true),
    float64: (view, offset) => view.getFloat64(offset, true),
    time: (view, offset) => {
      const sec = view.getUint32(offset, true);
      const nsec = view.getUint32(offset + 4, true);
      return { sec, nsec };
    },
    duration: (view, offset) => {
      const sec = view.getInt32(offset, true);
      const nsec = view.getInt32(offset + 4, true);
      return { sec, nsec };
    },
    string: (view, offset) => {
      const len = view.getUint32(offset, true);
      const totalOffset = view.byteOffset + offset + 4;
      const maxLen = view.byteLength - offset;
      if (len < 0 || len > maxLen) {
        throw new RangeError(`String deserialization error: length ${len}, maxLength ${maxLen}`);
      }
      const data = new Uint8Array(view.buffer, totalOffset, len);
      return decodeString(data);
    },
    boolArray: (view, offset, len) => {
      let currentOffset = offset;
      const arr = new Array(len);
      for (let idx = 0; idx < len; ++idx) {
        arr[idx] = deserializers.bool(view, currentOffset);
        currentOffset += 1;
      }
      return arr;
    },
    int8Array: MakeTypedArrayDeserialze(Int8Array, "getInt8"),
    uint8Array: MakeTypedArrayDeserialze(Uint8Array, "getUint8"),
    int16Array: MakeTypedArrayDeserialze(Int16Array, "getInt16"),
    uint16Array: MakeTypedArrayDeserialze(Uint16Array, "getUint16"),
    int32Array: MakeTypedArrayDeserialze(Int32Array, "getInt32"),
    uint32Array: MakeTypedArrayDeserialze(Uint32Array, "getUint32"),
    int64Array: MakeTypedArrayDeserialze(typeof BigInt64Array === "function" ? BigInt64Array : void 0, "getBigInt64"),
    uint64Array: MakeTypedArrayDeserialze(typeof BigUint64Array === "function" ? BigUint64Array : void 0, "getBigUint64"),
    float32Array: MakeTypedArrayDeserialze(Float32Array, "getFloat32"),
    float64Array: MakeTypedArrayDeserialze(Float64Array, "getFloat64"),
    timeArray: (view, offset, len) => {
      let currentOffset = offset;
      const timeArr = new Array(len);
      const totalOffset = view.byteOffset + currentOffset;
      if (totalOffset % Int32Array.BYTES_PER_ELEMENT === 0) {
        const intArr = new Int32Array(view.buffer, totalOffset, len * 2);
        for (let i = 0, j = 0; i < len; ++i, j = j + 2) {
          timeArr[i] = {
            sec: intArr[j],
            nsec: intArr[j + 1]
          };
        }
      } else {
        for (let idx = 0; idx < len; ++idx) {
          timeArr[idx] = {
            sec: view.getInt32(currentOffset, true),
            nsec: view.getInt32(currentOffset + 4, true)
          };
          currentOffset += 8;
        }
      }
      return timeArr;
    },
    durationArray: (view, offset, len) => deserializers.timeArray(view, offset, len),
    fixedArray: (view, offset, len, elementDeser, elementSize) => {
      let currentOffset = offset;
      const arr = new Array(len);
      for (let idx = 0; idx < len; ++idx) {
        arr[idx] = elementDeser(view, currentOffset);
        currentOffset += elementSize(view, currentOffset);
      }
      return arr;
    },
    dynamicArray: (view, offset, elementDeser, elementSize) => {
      const len = view.getUint32(offset, true);
      return deserializers.fixedArray(view, offset + 4, len, elementDeser, elementSize);
    }
  };

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/LazyMessageReader.js
  function isBigEndian() {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    view[0] = 1;
    return array[3] === 1;
  }
  var isLittleEndian = !isBigEndian();
  if (!isLittleEndian) {
    throw new Error("Only Little Endian architectures are supported");
  }

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/MessageReader.js
  var StandardTypeReader = class {
    constructor(buffer) {
      this.buffer = buffer;
      this.offset = 0;
      this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    json() {
      const resultString = this.string();
      try {
        return JSON.parse(resultString);
      } catch {
        return `Could not parse ${resultString}`;
      }
    }
    string() {
      const len = this.uint32();
      const totalOffset = this.view.byteOffset + this.offset;
      const maxLen = this.view.byteLength - this.offset;
      if (len < 0 || len > maxLen) {
        throw new RangeError(`String deserialization error: length ${len}, maxLength ${maxLen}`);
      }
      const data = new Uint8Array(this.view.buffer, totalOffset, len);
      this.offset += len;
      return decodeString(data);
    }
    bool() {
      return this.uint8() !== 0;
    }
    int8() {
      return this.view.getInt8(this.offset++);
    }
    uint8() {
      return this.view.getUint8(this.offset++);
    }
    typedArray(len, TypedArrayConstructor) {
      const arrayLength = len == void 0 ? this.uint32() : len;
      const view = this.view;
      const totalOffset = this.offset + view.byteOffset;
      this.offset += arrayLength * TypedArrayConstructor.BYTES_PER_ELEMENT;
      if (totalOffset % TypedArrayConstructor.BYTES_PER_ELEMENT === 0) {
        return new TypedArrayConstructor(view.buffer, totalOffset, arrayLength);
      }
      const size = TypedArrayConstructor.BYTES_PER_ELEMENT * arrayLength;
      const copy = new Uint8Array(size);
      copy.set(new Uint8Array(view.buffer, totalOffset, size));
      return new TypedArrayConstructor(copy.buffer, copy.byteOffset, arrayLength);
    }
    int16() {
      const result = this.view.getInt16(this.offset, true);
      this.offset += 2;
      return result;
    }
    uint16() {
      const result = this.view.getUint16(this.offset, true);
      this.offset += 2;
      return result;
    }
    int32() {
      const result = this.view.getInt32(this.offset, true);
      this.offset += 4;
      return result;
    }
    uint32() {
      const result = this.view.getUint32(this.offset, true);
      this.offset += 4;
      return result;
    }
    float32() {
      const result = this.view.getFloat32(this.offset, true);
      this.offset += 4;
      return result;
    }
    float64() {
      const result = this.view.getFloat64(this.offset, true);
      this.offset += 8;
      return result;
    }
    int64() {
      const offset = this.offset;
      this.offset += 8;
      return this.view.getBigInt64(offset, true);
    }
    uint64() {
      const offset = this.offset;
      this.offset += 8;
      return this.view.getBigUint64(offset, true);
    }
    time() {
      const offset = this.offset;
      this.offset += 8;
      const sec = this.view.getUint32(offset, true);
      const nsec = this.view.getUint32(offset + 4, true);
      return { sec, nsec };
    }
    duration() {
      const offset = this.offset;
      this.offset += 8;
      const sec = this.view.getInt32(offset, true);
      const nsec = this.view.getInt32(offset + 4, true);
      return { sec, nsec };
    }
  };
  var findTypeByName = (types2, name = "") => {
    let foundName = "";
    const matches = types2.filter((type) => {
      const typeName = type.name ?? "";
      if (!name) {
        return !typeName;
      }
      const nameEnd = name.includes("/") ? name : `/${name}`;
      if (typeName.endsWith(nameEnd)) {
        foundName = typeName;
        return true;
      }
      return false;
    });
    if (matches.length !== 1) {
      throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
    }
    return { ...matches[0], name: foundName };
  };
  var friendlyName = (name) => name.replace(/\//g, "_");
  function toTypedArrayType(rosType) {
    switch (rosType) {
      case "int8":
        return "Int8Array";
      case "uint8":
        return "Uint8Array";
      case "int16":
        return "Int16Array";
      case "uint16":
        return "Uint16Array";
      case "int32":
        return "Int32Array";
      case "uint32":
        return "Uint32Array";
      case "int64":
        return "BigInt64Array";
      case "uint64":
        return "BigUint64Array";
      case "float32":
        return "Float32Array";
      case "float64":
        return "Float64Array";
      default:
        return void 0;
    }
  }
  var createParsers = ({ definitions, options = {}, topLevelReaderKey }) => {
    if (definitions.length === 0) {
      throw new Error(`no types given`);
    }
    const unnamedTypes2 = definitions.filter((type) => !type.name);
    if (unnamedTypes2.length > 1) {
      throw new Error("multiple unnamed types");
    }
    const unnamedType2 = unnamedTypes2.length > 0 ? unnamedTypes2[0] : definitions[0];
    const namedTypes2 = definitions.filter((type) => !!type.name);
    const constructorBody2 = (type) => {
      const readerLines = [];
      type.definitions.forEach((def) => {
        if (def.isConstant === true) {
          return;
        }
        if (def.isArray === true) {
          const typedArrayType = toTypedArrayType(def.type);
          if (typedArrayType != void 0) {
            readerLines.push(`this.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${typedArrayType});`);
            return;
          }
          const lenField = `length_${def.name}`;
          readerLines.push(`var ${lenField} = ${def.arrayLength != void 0 ? def.arrayLength : "reader.uint32();"}`);
          const arrayName = `this.${def.name}`;
          readerLines.push(`${arrayName} = new Array(${lenField})`);
          readerLines.push(`for (var i = 0; i < ${lenField}; i++) {`);
          if (def.isComplex === true) {
            const defType = findTypeByName(definitions, def.type);
            readerLines.push(`  ${arrayName}[i] = new Record.${friendlyName(defType.name)}(reader);`);
          } else {
            readerLines.push(`  ${arrayName}[i] = reader.${def.type}();`);
          }
          readerLines.push("}");
        } else if (def.isComplex === true) {
          const defType = findTypeByName(definitions, def.type);
          readerLines.push(`this.${def.name} = new Record.${friendlyName(defType.name)}(reader);`);
        } else {
          readerLines.push(`this.${def.name} = reader.${def.type}();`);
        }
      });
      if (options.freeze === true) {
        readerLines.push("Object.freeze(this);");
      }
      return readerLines.join("\n    ");
    };
    let js = `
  const builtReaders = new Map();
  var Record = function (reader) {
    ${constructorBody2(unnamedType2)}
  };
  builtReaders.set(topLevelReaderKey, Record);
  `;
    for (const type of namedTypes2) {
      js += `
  Record.${friendlyName(type.name)} = function(reader) {
    ${constructorBody2(type)}
  };
  builtReaders.set(${JSON.stringify(type.name)}, Record.${friendlyName(type.name)});
  `;
    }
    js += `return builtReaders;`;
    return new Function("topLevelReaderKey", js)(topLevelReaderKey);
  };
  var MessageReader = class {
    // takes an object message definition and returns
    // a message reader which can be used to read messages based
    // on the message definition
    constructor(definitions, options = {}) {
      this.reader = createParsers({ definitions, options, topLevelReaderKey: "<toplevel>" }).get("<toplevel>");
    }
    readMessage(buffer) {
      const standardReaders = new StandardTypeReader(buffer);
      return new this.reader(standardReaders);
    }
  };

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/stringLengthUtf8.js
  function stringLengthUtf8(str) {
    let byteLength = 0;
    const numCodeUnits = str.length;
    for (let i = 0; i < numCodeUnits; i++) {
      const codeUnit = str.charCodeAt(i);
      if (codeUnit <= 127) {
        byteLength += 1;
      } else if (codeUnit <= 2047) {
        byteLength += 2;
      } else if (55296 <= codeUnit && codeUnit <= 56319) {
        const nextCodeUnit = str.charCodeAt(i + 1);
        if (56320 <= nextCodeUnit && nextCodeUnit <= 57343) {
          byteLength += 4;
          i++;
        } else {
          byteLength += 3;
        }
      } else {
        byteLength += 3;
      }
    }
    return byteLength;
  }

  // ../../../node_modules/@foxglove/rosmsg-serialization/dist/esm/MessageWriter.js
  function writeTime(time, view, offset) {
    view.setUint32(offset, time.sec, true);
    view.setUint32(offset + 4, time.nsec, true);
  }
  var StandardTypeOffsetCalculator = class {
    constructor() {
      this.offset = 0;
    }
    // Returns the current offset and increments the next offset by `byteCount`.
    _incrementAndReturn(byteCount) {
      const offset = this.offset;
      this.offset += byteCount;
      return offset;
    }
    // These are not actually used in the StandardTypeWriter, so they must be kept in sync with those implementations.
    json(value) {
      return this.string(JSON.stringify(value));
    }
    // The following are used in the StandardTypeWriter.
    string(value) {
      if (typeof value !== "string") {
        throw new Error(`Expected string but got ${typeof value}`);
      }
      const length = 4 + stringLengthUtf8(value);
      return this._incrementAndReturn(length);
    }
    bool() {
      return this.uint8();
    }
    int8() {
      return this._incrementAndReturn(1);
    }
    uint8() {
      return this._incrementAndReturn(1);
    }
    int16() {
      return this._incrementAndReturn(2);
    }
    uint16() {
      return this._incrementAndReturn(2);
    }
    int32() {
      return this._incrementAndReturn(4);
    }
    uint32() {
      return this._incrementAndReturn(4);
    }
    float32() {
      return this._incrementAndReturn(4);
    }
    float64() {
      return this._incrementAndReturn(8);
    }
    int64() {
      return this._incrementAndReturn(8);
    }
    uint64() {
      return this._incrementAndReturn(8);
    }
    time() {
      return this._incrementAndReturn(8);
    }
    duration() {
      return this._incrementAndReturn(8);
    }
  };
  var StandardTypeWriter = class {
    constructor(data) {
      this.data = data;
      this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      this.offsetCalculator = new StandardTypeOffsetCalculator();
    }
    json(value) {
      this.string(JSON.stringify(value));
    }
    string(value) {
      if (this.textEncoder == void 0) {
        this.textEncoder = new TextEncoder();
      }
      const stringOffset = this.offsetCalculator.string(value);
      const stringLength = this.offsetCalculator.offset - stringOffset - 4;
      this.view.setUint32(stringOffset, stringLength, true);
      const { read, written } = this.textEncoder.encodeInto(value, this.data.subarray(stringOffset + 4));
      if (read !== value.length) {
        throw new Error(`Not enough space to encode string into subarray (wrote ${read} of ${value.length} code units into ${written} of ${this.data.subarray(stringOffset + 4).length} bytes)`);
      }
    }
    // eslint-disable-next-line @foxglove/no-boolean-parameters
    bool(value) {
      this.uint8(value ? 1 : 0);
    }
    int8(value) {
      this.view.setInt8(this.offsetCalculator.int8(), value);
    }
    uint8(value) {
      this.view.setUint8(this.offsetCalculator.uint8(), value);
    }
    int16(value) {
      this.view.setInt16(this.offsetCalculator.int16(), value, true);
    }
    uint16(value) {
      this.view.setUint16(this.offsetCalculator.uint16(), value, true);
    }
    int32(value) {
      this.view.setInt32(this.offsetCalculator.int32(), value, true);
    }
    uint32(value) {
      this.view.setUint32(this.offsetCalculator.uint32(), value, true);
    }
    float32(value) {
      this.view.setFloat32(this.offsetCalculator.float32(), value, true);
    }
    float64(value) {
      this.view.setFloat64(this.offsetCalculator.float64(), value, true);
    }
    int64(value) {
      this.view.setBigInt64(this.offsetCalculator.int64(), BigInt(value), true);
    }
    uint64(value) {
      this.view.setBigUint64(this.offsetCalculator.uint64(), BigInt(value), true);
    }
    time(time) {
      writeTime(time, this.view, this.offsetCalculator.time());
    }
    duration(time) {
      writeTime(time, this.view, this.offsetCalculator.time());
    }
  };
  var findTypeByName2 = (types2, name = "") => {
    let foundName = "";
    const matches = types2.filter((type) => {
      const typeName = type.name ?? "";
      if (name.length === 0) {
        return typeName.length === 0;
      }
      const nameEnd = name.includes("/") ? name : `/${name}`;
      if (typeName.endsWith(nameEnd)) {
        foundName = typeName;
        return true;
      }
      return false;
    });
    if (matches.length !== 1) {
      throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}.`);
    }
    return { ...matches[0], name: foundName };
  };
  var friendlyName2 = (name) => name.replace(/\//g, "_");
  function createWriterAndSizeCalculator(types) {
    if (types.length === 0) {
      throw new Error(`no types given`);
    }
    const unnamedTypes = types.filter((type) => type.name == void 0);
    if (unnamedTypes.length > 1) {
      throw new Error("multiple unnamed types");
    }
    const unnamedType = unnamedTypes.length > 0 ? unnamedTypes[0] : types[0];
    const namedTypes = types.filter((type) => type.name != void 0);
    const constructorBody = (type, argName) => {
      const lines = [];
      type.definitions.forEach((def) => {
        if (def.isConstant ?? false) {
          return;
        }
        const accessMessageField = `message["${def.name}"]`;
        if (def.isArray ?? false) {
          const lenField = `length_${def.name}`;
          if (def.arrayLength != void 0) {
            lines.push(`var ${lenField} = ${def.arrayLength};`);
          } else {
            lines.push(`var ${lenField} = ${accessMessageField}.length;`);
            lines.push(`${argName}.uint32(${lenField});`);
          }
          lines.push(`for (var i = 0; i < ${lenField}; i++) {`);
          if (def.isComplex ?? false) {
            const defType = findTypeByName2(types, def.type);
            lines.push(`  ${friendlyName2(defType.name)}(${argName}, ${accessMessageField}[i]);`);
          } else {
            lines.push(`  ${argName}.${def.type}(${accessMessageField}[i]);`);
          }
          lines.push("}");
        } else if (def.isComplex ?? false) {
          const defType = findTypeByName2(types, def.type);
          lines.push(`${friendlyName2(defType.name)}(${argName}, ${accessMessageField});`);
        } else {
          lines.push(`${argName}.${def.type}(${accessMessageField});`);
        }
      });
      return lines.join("\n    ");
    };
    let writerJs = "";
    let calculateSizeJs = "";
    namedTypes.forEach((t) => {
      writerJs += `
  function ${friendlyName2(t.name)}(writer, message) {
    ${constructorBody(t, "writer")}
  };
`;
      calculateSizeJs += `
  function ${friendlyName2(t.name)}(offsetCalculator, message) {
    ${constructorBody(t, "offsetCalculator")}
  };
`;
    });
    writerJs += `
  return function write(writer, message) {
    ${constructorBody(unnamedType, "writer")}
    return writer.data;
  };`;
    calculateSizeJs += `
  return function calculateSize(offsetCalculator, message) {
    ${constructorBody(unnamedType, "offsetCalculator")}
    return offsetCalculator.offset;
  };`;
    let write;
    let calculateSize;
    try {
      write = eval(`(function buildWriter() { ${writerJs} })()`);
    } catch (e) {
      console.error("error building writer:", writerJs);
      throw e;
    }
    try {
      calculateSize = eval(`(function buildSizeCalculator() { ${calculateSizeJs} })()`);
    } catch (e) {
      console.error("error building size calculator:", calculateSizeJs);
      throw e;
    }
    return {
      writer(message, data) {
        const writer = new StandardTypeWriter(data);
        return write(writer, message);
      },
      byteSizeCalculator(message) {
        const offsetCalculator = new StandardTypeOffsetCalculator();
        return calculateSize(offsetCalculator, message);
      }
    };
  }
  var MessageWriter = class {
    // takes an object string message definition and returns
    // a message writer which can be used to write messages based
    // on the message definition
    constructor(definitions) {
      const { writer, byteSizeCalculator } = createWriterAndSizeCalculator(definitions);
      this.writer = writer;
      this.byteSizeCalculator = byteSizeCalculator;
    }
    // Calculates the byte size needed to write this message in bytes.
    calculateByteSize(message) {
      return this.byteSizeCalculator(message);
    }
    // output is optional - if it is not provided, a Uint8Array will be generated.
    writeMessage(message, output) {
      return this.writer(message, output ?? new Uint8Array(this.calculateByteSize(message)));
    }
  };

  // Impl.ts
  var import_rosmsg2_serialization = __toESM(require_dist3());

  // ../../../node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);
  var eventemitter3_default = import_index.default;

  // ../../../node_modules/@foxglove/ws-protocol/dist/esm/src/types.js
  var BinaryOpcode;
  (function(BinaryOpcode2) {
    BinaryOpcode2[BinaryOpcode2["MESSAGE_DATA"] = 1] = "MESSAGE_DATA";
    BinaryOpcode2[BinaryOpcode2["TIME"] = 2] = "TIME";
    BinaryOpcode2[BinaryOpcode2["SERVICE_CALL_RESPONSE"] = 3] = "SERVICE_CALL_RESPONSE";
    BinaryOpcode2[BinaryOpcode2["FETCH_ASSET_RESPONSE"] = 4] = "FETCH_ASSET_RESPONSE";
  })(BinaryOpcode || (BinaryOpcode = {}));
  var ClientBinaryOpcode;
  (function(ClientBinaryOpcode2) {
    ClientBinaryOpcode2[ClientBinaryOpcode2["MESSAGE_DATA"] = 1] = "MESSAGE_DATA";
    ClientBinaryOpcode2[ClientBinaryOpcode2["SERVICE_CALL_REQUEST"] = 2] = "SERVICE_CALL_REQUEST";
  })(ClientBinaryOpcode || (ClientBinaryOpcode = {}));
  var StatusLevel;
  (function(StatusLevel2) {
    StatusLevel2[StatusLevel2["INFO"] = 0] = "INFO";
    StatusLevel2[StatusLevel2["WARNING"] = 1] = "WARNING";
    StatusLevel2[StatusLevel2["ERROR"] = 2] = "ERROR";
  })(StatusLevel || (StatusLevel = {}));
  var ServerCapability;
  (function(ServerCapability2) {
    ServerCapability2["clientPublish"] = "clientPublish";
    ServerCapability2["time"] = "time";
    ServerCapability2["parameters"] = "parameters";
    ServerCapability2["parametersSubscribe"] = "parametersSubscribe";
    ServerCapability2["services"] = "services";
    ServerCapability2["connectionGraph"] = "connectionGraph";
    ServerCapability2["assets"] = "assets";
  })(ServerCapability || (ServerCapability = {}));
  var FetchAssetStatus;
  (function(FetchAssetStatus2) {
    FetchAssetStatus2[FetchAssetStatus2["SUCCESS"] = 0] = "SUCCESS";
    FetchAssetStatus2[FetchAssetStatus2["ERROR"] = 1] = "ERROR";
  })(FetchAssetStatus || (FetchAssetStatus = {}));

  // ../../../node_modules/@foxglove/ws-protocol/dist/esm/src/parse.js
  var textDecoder = new TextDecoder();
  function parseServerMessage(buffer) {
    const view = new DataView(buffer);
    let offset = 0;
    const op = view.getUint8(offset);
    offset += 1;
    switch (op) {
      case BinaryOpcode.MESSAGE_DATA: {
        const subscriptionId = view.getUint32(offset, true);
        offset += 4;
        const timestamp = view.getBigUint64(offset, true);
        offset += 8;
        const data = new DataView(buffer, offset);
        return { op, subscriptionId, timestamp, data };
      }
      case BinaryOpcode.TIME: {
        const timestamp = view.getBigUint64(offset, true);
        return { op, timestamp };
      }
      case BinaryOpcode.SERVICE_CALL_RESPONSE: {
        const serviceId = view.getUint32(offset, true);
        offset += 4;
        const callId = view.getUint32(offset, true);
        offset += 4;
        const encodingLength = view.getUint32(offset, true);
        offset += 4;
        const encodingBytes = new DataView(buffer, offset, encodingLength);
        const encoding = textDecoder.decode(encodingBytes);
        offset += encodingLength;
        const data = new DataView(buffer, offset, buffer.byteLength - offset);
        return { op, serviceId, callId, encoding, data };
      }
      case BinaryOpcode.FETCH_ASSET_RESPONSE: {
        const requestId = view.getUint32(offset, true);
        offset += 4;
        const status = view.getUint8(offset);
        offset += 1;
        const errorMsgLength = view.getUint32(offset, true);
        offset += 4;
        const error = textDecoder.decode(new DataView(buffer, offset, errorMsgLength));
        offset += errorMsgLength;
        switch (status) {
          case FetchAssetStatus.SUCCESS: {
            const data = new DataView(buffer, offset, buffer.byteLength - offset);
            return { op, requestId, status, data };
          }
          case FetchAssetStatus.ERROR:
            return { op, requestId, status, error };
          default:
            throw new Error(`Unrecognized fetch asset status: ${status}`);
        }
      }
    }
    throw new Error(`Unrecognized server opcode in binary message: ${op.toString(16)}`);
  }

  // ../../../node_modules/@foxglove/ws-protocol/dist/esm/src/FoxgloveClient.js
  var _a;
  var textEncoder = new TextEncoder();
  var FoxgloveClient = class {
    static SUPPORTED_SUBPROTOCOL = "foxglove.websocket.v1";
    #emitter = new eventemitter3_default();
    #ws;
    #nextSubscriptionId = 0;
    #nextAdvertisementId = 0;
    constructor({ ws: ws2 }) {
      this.#ws = ws2;
      this.#reconnect();
    }
    on(name, listener) {
      this.#emitter.on(name, listener);
    }
    off(name, listener) {
      this.#emitter.off(name, listener);
    }
    #reconnect() {
      this.#ws.binaryType = "arraybuffer";
      this.#ws.onerror = (event) => {
        this.#emitter.emit("error", event.error ?? new Error("WebSocket error"));
      };
      this.#ws.onopen = (_event) => {
        if (this.#ws.protocol !== _a.SUPPORTED_SUBPROTOCOL) {
          throw new Error(`Expected subprotocol ${_a.SUPPORTED_SUBPROTOCOL}, got '${this.#ws.protocol}'`);
        }
        this.#emitter.emit("open");
      };
      this.#ws.onmessage = (event) => {
        let message;
        try {
          if (event.data instanceof ArrayBuffer) {
            message = parseServerMessage(event.data);
          } else {
            message = JSON.parse(event.data);
          }
        } catch (error) {
          this.#emitter.emit("error", error);
          return;
        }
        switch (message.op) {
          case "serverInfo":
            this.#emitter.emit("serverInfo", message);
            return;
          case "status":
            this.#emitter.emit("status", message);
            return;
          case "removeStatus":
            this.#emitter.emit("removeStatus", message);
            return;
          case "advertise":
            this.#emitter.emit("advertise", message.channels);
            return;
          case "unadvertise":
            this.#emitter.emit("unadvertise", message.channelIds);
            return;
          case "parameterValues":
            this.#emitter.emit("parameterValues", message);
            return;
          case "advertiseServices":
            this.#emitter.emit("advertiseServices", message.services);
            return;
          case "unadvertiseServices":
            this.#emitter.emit("unadvertiseServices", message.serviceIds);
            return;
          case "connectionGraphUpdate":
            this.#emitter.emit("connectionGraphUpdate", message);
            return;
          case "serviceCallFailure":
            this.#emitter.emit("serviceCallFailure", message);
            return;
          case BinaryOpcode.MESSAGE_DATA:
            this.#emitter.emit("message", message);
            return;
          case BinaryOpcode.TIME:
            this.#emitter.emit("time", message);
            return;
          case BinaryOpcode.SERVICE_CALL_RESPONSE:
            this.#emitter.emit("serviceCallResponse", message);
            return;
          case BinaryOpcode.FETCH_ASSET_RESPONSE:
            this.#emitter.emit("fetchAssetResponse", message);
            return;
        }
        this.#emitter.emit("error", new Error(`Unrecognized server opcode: ${message.op}`));
      };
      this.#ws.onclose = (event) => {
        this.#emitter.emit("close", event);
      };
    }
    close() {
      this.#ws.close();
    }
    subscribe(channelId) {
      const id = this.#nextSubscriptionId++;
      const subscriptions = [{ id, channelId }];
      this.#send({ op: "subscribe", subscriptions });
      return id;
    }
    unsubscribe(subscriptionId) {
      this.#send({ op: "unsubscribe", subscriptionIds: [subscriptionId] });
    }
    advertise(clientChannel) {
      const id = ++this.#nextAdvertisementId;
      const channels = [{ id, ...clientChannel }];
      this.#send({ op: "advertise", channels });
      return id;
    }
    unadvertise(channelId) {
      this.#send({ op: "unadvertise", channelIds: [channelId] });
    }
    getParameters(parameterNames, id) {
      this.#send({ op: "getParameters", parameterNames, id });
    }
    setParameters(parameters, id) {
      this.#send({ op: "setParameters", parameters, id });
    }
    subscribeParameterUpdates(parameterNames) {
      this.#send({ op: "subscribeParameterUpdates", parameterNames });
    }
    unsubscribeParameterUpdates(parameterNames) {
      this.#send({ op: "unsubscribeParameterUpdates", parameterNames });
    }
    sendMessage(channelId, data) {
      const payload = new Uint8Array(5 + data.byteLength);
      const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
      view.setUint8(0, ClientBinaryOpcode.MESSAGE_DATA);
      view.setUint32(1, channelId, true);
      payload.set(data, 5);
      this.#ws.send(payload);
    }
    sendServiceCallRequest(request) {
      const encoding = textEncoder.encode(request.encoding);
      const payload = new Uint8Array(1 + 4 + 4 + 4 + encoding.length + request.data.byteLength);
      const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
      let offset = 0;
      view.setUint8(offset, ClientBinaryOpcode.SERVICE_CALL_REQUEST);
      offset += 1;
      view.setUint32(offset, request.serviceId, true);
      offset += 4;
      view.setUint32(offset, request.callId, true);
      offset += 4;
      view.setUint32(offset, request.encoding.length, true);
      offset += 4;
      payload.set(encoding, offset);
      offset += encoding.length;
      const data = new Uint8Array(request.data.buffer, request.data.byteOffset, request.data.byteLength);
      payload.set(data, offset);
      this.#ws.send(payload);
    }
    subscribeConnectionGraph() {
      this.#send({ op: "subscribeConnectionGraph" });
    }
    unsubscribeConnectionGraph() {
      this.#send({ op: "unsubscribeConnectionGraph" });
    }
    fetchAsset(uri, requestId) {
      this.#send({ op: "fetchAsset", uri, requestId });
    }
    /**
     * @deprecated Use `sendServiceCallRequest` instead
     */
    sendCallServiceRequest(request) {
      this.sendServiceCallRequest(request);
    }
    #send(message) {
      this.#ws.send(JSON.stringify(message));
    }
  };
  _a = FoxgloveClient;
  var FoxgloveClient_default = FoxgloveClient;

  // ../../../node_modules/@foxglove/ws-protocol/dist/esm/src/FoxgloveServer.js
  var import_debug = __toESM(require_browser());
  var log = (0, import_debug.default)("foxglove:server");
  var textEncoder2 = new TextEncoder();
  var REQUIRED_CAPABILITY_BY_OPERATION = {
    subscribe: void 0,
    unsubscribe: void 0,
    advertise: ServerCapability.clientPublish,
    unadvertise: ServerCapability.clientPublish,
    [ClientBinaryOpcode.MESSAGE_DATA]: ServerCapability.clientPublish,
    getParameters: ServerCapability.parameters,
    setParameters: ServerCapability.parameters,
    subscribeParameterUpdates: ServerCapability.parametersSubscribe,
    unsubscribeParameterUpdates: ServerCapability.parametersSubscribe,
    [ClientBinaryOpcode.SERVICE_CALL_REQUEST]: ServerCapability.services,
    subscribeConnectionGraph: ServerCapability.connectionGraph,
    unsubscribeConnectionGraph: ServerCapability.connectionGraph,
    fetchAsset: ServerCapability.assets
  };

  // ../../../node_modules/isomorphic-ws/browser.js
  var ws = null;
  if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== "undefined") {
    ws = MozWebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== "undefined") {
    ws = self.WebSocket || self.MozWebSocket;
  }
  var browser_default = ws;

  // Impl.ts
  var Impl = class {
    emitter = new eventemitter3_default();
    #client;
    #connecting;
    #isRos1;
    // Message Readers / Writers
    #messageReaders = /* @__PURE__ */ new Map();
    #messageWriters = /* @__PURE__ */ new Map();
    // Channels
    #channelsById = /* @__PURE__ */ new Map();
    #channelsByName = /* @__PURE__ */ new Map();
    // Services
    #servicesById = /* @__PURE__ */ new Map();
    #servicesByName = /* @__PURE__ */ new Map();
    #publisherIdsWithCount = /* @__PURE__ */ new Map();
    #subscriptionIdsWithCount = /* @__PURE__ */ new Map();
    #callId = 0;
    #paramId = 0;
    constructor(url) {
      this.#client = new FoxgloveClient_default({
        ws: new browser_default(url, [FoxgloveClient_default.SUPPORTED_SUBPROTOCOL])
      });
      const open = new Promise((resolve) => {
        this.#client.on("open", resolve);
      });
      const serverInfo = new Promise((resolve) => {
        this.#client.on("serverInfo", (event) => {
          this.#isRos1 = event.supportedEncodings?.includes("ros1") ?? false;
          resolve();
        });
      });
      this.#client.on("close", (event) => {
        this.emitter.emit("close", event);
      });
      this.#client.on("error", (error) => {
        this.emitter.emit("error", error ?? new Error("WebSocket error"));
      });
      this.#client.on("advertise", (channels) => {
        for (const channel of channels) {
          this.#channelsById.set(channel.id, channel);
          this.#channelsByName.set(channel.topic, channel);
        }
      });
      this.#client.on("unadvertise", (channelIds) => {
        for (const channelId of channelIds) {
          const channel = this.#channelsById.get(channelId);
          if (channel) {
            this.#channelsById.delete(channel.id);
            this.#channelsByName.delete(channel.topic);
          }
        }
      });
      this.#client.on("advertiseServices", (services) => {
        for (const service of services) {
          this.#servicesById.set(service.id, service);
          this.#servicesByName.set(service.name, service);
        }
      });
      this.#client.on("unadvertiseServices", (serviceIds) => {
        for (const serviceId of serviceIds) {
          const service = this.#servicesById.get(serviceId);
          if (service) {
            this.#servicesById.delete(service.id);
            this.#servicesByName.delete(service.name);
          }
        }
      });
      this.#connecting = new Promise((resolve) => {
        Promise.all([open, serverInfo]).then(() => {
          this.emitter.emit("connection");
          resolve();
        });
      });
    }
    close() {
      this.#client.close();
    }
    getTopics() {
      return {
        topics: [...this.#channelsByName.keys()],
        types: [...this.#channelsByName.values()].map((x) => x.schemaName)
      };
    }
    async getServices() {
      await this.#connecting;
      return new Promise((resolve) => {
        const listener = (event) => {
          this.#client.off("connectionGraphUpdate", listener);
          this.#client.unsubscribeConnectionGraph();
          resolve(event.advertisedServices.map((service) => service.name));
        };
        this.#client.on("connectionGraphUpdate", listener);
        this.#client.subscribeConnectionGraph();
      });
    }
    getTopicType(topic) {
      return this.#channelsByName.get(topic)?.schemaName;
    }
    getServiceType(service) {
      return this.#servicesByName.get(service)?.type;
    }
    async createPublisher(name, messageType) {
      await this.#connecting;
      const channel = this.#getChannel(name);
      const publisherId = (() => {
        const idWithCount = this.#publisherIdsWithCount.get(name);
        if (idWithCount) {
          idWithCount.count++;
          return idWithCount.id;
        }
        const publisherId2 = this.#client.advertise({
          topic: name,
          encoding: this.#isRos1 ? "ros1" : "cdr",
          schemaName: messageType
        });
        this.#publisherIdsWithCount.set(name, { id: publisherId2, count: 1 });
        return publisherId2;
      })();
      const writer = this.#getMessageWriter(await channel);
      return {
        publish: (message) => {
          this.#client.sendMessage(publisherId, writer.writeMessage(message));
        },
        unadvertise: () => {
          const idWithCount = this.#publisherIdsWithCount.get(name);
          if (idWithCount) {
            idWithCount.count--;
            if (idWithCount.count === 0) {
              this.#publisherIdsWithCount.delete(name);
              this.#client.unadvertise(publisherId);
            }
          }
        }
      };
    }
    async createSubscription(name, callback) {
      await this.#connecting;
      const channel = await this.#getChannel(name);
      const subscriptionId = (() => {
        const idWithCount = this.#subscriptionIdsWithCount.get(name);
        if (idWithCount) {
          idWithCount.count++;
          return idWithCount.id;
        }
        const subscriptionId2 = this.#client.subscribe(channel.id);
        this.#subscriptionIdsWithCount.set(name, {
          id: subscriptionId2,
          count: 1
        });
        return subscriptionId2;
      })();
      const reader = this.#getMessageReader(channel);
      const listener = (event) => {
        if (event.subscriptionId === subscriptionId) {
          callback(reader.readMessage(event.data));
        }
      };
      this.#client.on("message", listener);
      return {
        unsubscribe: () => {
          this.#client.off("message", listener);
          const idWithCount = this.#subscriptionIdsWithCount.get(name);
          if (idWithCount) {
            idWithCount.count--;
            if (idWithCount.count === 0) {
              this.#subscriptionIdsWithCount.delete(name);
              this.#client.unsubscribe(subscriptionId);
            }
          }
        }
      };
    }
    async sendServiceRequest(name, request) {
      await this.#connecting;
      const service = await this.#getService(name);
      const writer = this.#getMessageWriter(service);
      const reader = this.#getMessageReader(service);
      const callId = this.#callId++;
      return new Promise((resolve) => {
        const listener = (event) => {
          if (event.serviceId === service.id && event.callId === callId) {
            this.#client.off("serviceCallResponse", listener);
            resolve(reader.readMessage(event.data));
          }
        };
        this.#client.on("serviceCallResponse", listener);
        this.#client.sendServiceCallRequest({
          serviceId: service.id,
          callId,
          encoding: this.#isRos1 ? "ros1" : "cdr",
          data: new DataView(writer.writeMessage(request).buffer)
        });
      });
    }
    async getParameter(name) {
      await this.#connecting;
      const paramId = (this.#paramId++).toString();
      return new Promise((resolve) => {
        const listener = (event) => {
          if (event.parameters[0]?.name === name && event.id === paramId) {
            this.#client.off("parameterValues", listener);
            resolve(event.parameters[0].value);
          }
        };
        this.#client.on("parameterValues", listener);
        this.#client.getParameters([name], paramId);
      });
    }
    async setParameter(name, value) {
      await this.#connecting;
      const paramId = (this.#paramId++).toString();
      return new Promise((resolve) => {
        const listener = (event) => {
          if (event.parameters[0]?.name === name && event.id === paramId) {
            this.#client.off("parameterValues", listener);
            resolve(event.parameters[0]);
          }
        };
        this.#client.on("parameterValues", listener);
        this.#client.setParameters([{ name, value }], paramId);
      });
    }
    async #getChannel(name) {
      await this.#connecting;
      return this.#channelsByName.get(name) ?? await new Promise((resolve) => {
        const listener = (channels) => {
          const channel = channels.find((channel2) => channel2.topic === name);
          if (channel) {
            this.#client.off("advertise", listener);
            resolve(channel);
          }
        };
        this.#client.on("advertise", listener);
      });
    }
    async #getService(name) {
      await this.#connecting;
      return this.#servicesByName.get(name) ?? await new Promise((resolve) => {
        const listener = (services) => {
          const service = services.find((channel) => channel.name === name);
          if (service) {
            this.#client.off("advertiseServices", listener);
            resolve(service);
          }
        };
        this.#client.on("advertiseServices", listener);
      });
    }
    #getMessageReader(channelOrService) {
      const name = "schemaName" in channelOrService ? channelOrService.schemaName : channelOrService.type;
      const schemaEncoding = "schemaEncoding" in channelOrService ? channelOrService.schemaEncoding : void 0;
      const schema = "schema" in channelOrService ? channelOrService.schema : channelOrService.responseSchema;
      return this.#messageReaders.get(name) ?? (() => {
        const reader = this.#isRos1 ? new MessageReader((0, import_rosmsg.parse)(schema, { ros2: false })) : new import_rosmsg2_serialization.MessageReader(
          schemaEncoding === "ros2idl" ? (0, import_rosmsg.parseRos2idl)(schema) : (0, import_rosmsg.parse)(schema, { ros2: true })
        );
        this.#messageReaders.set(name, reader);
        return reader;
      })();
    }
    #getMessageWriter(channelOrService) {
      const name = "schemaName" in channelOrService ? channelOrService.schemaName : channelOrService.type;
      const schemaEncoding = "schemaEncoding" in channelOrService ? channelOrService.schemaEncoding : void 0;
      const schema = "schema" in channelOrService ? channelOrService.schema : channelOrService.requestSchema;
      return this.#messageWriters.get(name) ?? (() => {
        const writer = this.#isRos1 ? new MessageWriter((0, import_rosmsg.parse)(schema, { ros2: false })) : new import_rosmsg2_serialization.MessageWriter(
          schemaEncoding === "ros2idl" ? (0, import_rosmsg.parseRos2idl)(schema) : (0, import_rosmsg.parse)(schema, { ros2: true })
        );
        this.#messageWriters.set(name, writer);
        return writer;
      })();
    }
  };

  // Ros.ts
  var Ros = class {
    constructor(options) {
      this.options = options;
      if (options.url) {
        this.connect(options.url);
      }
    }
    #rosImpl;
    /** @internal */
    get rosImpl() {
      return this.#rosImpl;
    }
    on(event, fn) {
      this.rosImpl?.emitter.on(event, fn);
      return this;
    }
    off(event, fn) {
      this.rosImpl?.emitter.off(event, fn);
      return this;
    }
    connect(url) {
      this.#rosImpl = new Impl(url);
    }
    close() {
      this.rosImpl?.close();
      this.#rosImpl = void 0;
    }
    getTopics(callback, failedCallback) {
      const topics = this.rosImpl?.getTopics();
      if (topics) {
        callback(topics);
      } else if (failedCallback) {
        failedCallback("Error: getTopics");
      }
    }
    getServices(callback, failedCallback) {
      this.rosImpl?.getServices().then(callback).catch(failedCallback);
    }
    getTopicType(topic, callback, failedCallback) {
      const topicType = this.rosImpl?.getTopicType(topic);
      if (topicType) {
        callback(topicType);
      } else if (failedCallback) {
        failedCallback("Error: getTopicType");
      }
    }
    getServiceType(service, callback, failedCallback) {
      const serviceType = this.rosImpl?.getServiceType(service);
      if (serviceType) {
        callback(serviceType);
      } else if (failedCallback) {
        failedCallback("Error: getServiceType");
      }
    }
  };

  // Service.ts
  var ServiceRequest = class {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(values) {
      this.values = values;
      Object.assign(this, values);
    }
  };
  var Service = class {
    constructor(options) {
      this.options = options;
      this.#ros = options.ros;
      this.#name = options.name;
      this.#serviceType = options.serviceType;
    }
    #ros;
    #name;
    #serviceType;
    get name() {
      return this.#name;
    }
    get serviceType() {
      return this.#serviceType;
    }
    callService(request, callback, failedCallback) {
      this.#ros.rosImpl?.sendServiceRequest(this.name, request).then(callback).catch(failedCallback);
    }
  };

  // Topic.ts
  var Message = class {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(values) {
      this.values = values;
      Object.assign(this, values);
    }
  };
  var Topic = class {
    constructor(options) {
      this.options = options;
      this.#ros = options.ros;
      this.#name = options.name;
      this.#messageType = options.messageType;
    }
    #ros;
    #name;
    #messageType;
    #publisher;
    #subscriptions = /* @__PURE__ */ new Map();
    get name() {
      return this.#name;
    }
    get messageType() {
      return this.#messageType;
    }
    publish(message) {
      if (!this.#publisher) {
        this.advertise();
      }
      this.#publisher?.then((publisher) => {
        publisher.publish(message);
      });
    }
    subscribe(callback) {
      this.#ros.rosImpl?.createSubscription(this.name, callback).then((subscription) => {
        this.#subscriptions.set(callback, subscription);
      });
    }
    unsubscribe(callback) {
      if (callback) {
        this.#subscriptions.get(callback)?.unsubscribe();
        this.#subscriptions.delete(callback);
      } else {
        for (const subscription of this.#subscriptions.values()) {
          subscription.unsubscribe();
        }
        this.#subscriptions.clear();
      }
    }
    advertise() {
      this.#publisher = this.#ros.rosImpl?.createPublisher(
        this.name,
        this.messageType
      );
    }
    unadvertise() {
      this.#publisher?.then((publisher) => {
        publisher.unadvertise();
        this.#publisher = void 0;
      });
    }
  };
})();
