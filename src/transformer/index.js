'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}

function pascalCaseTransform(input, index) {
    var firstChar = input.charAt(0);
    var lowerChars = input.substr(1).toLowerCase();
    if (index > 0 && firstChar >= "0" && firstChar <= "9") {
        return "_" + firstChar + lowerChars;
    }
    return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCaseTransformMerge(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function pascalCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "", transform: pascalCaseTransform }, options));
}

function camelCaseTransform(input, index) {
    if (index === 0)
        return input.toLowerCase();
    return pascalCaseTransform(input, index);
}
function camelCaseTransformMerge(input, index) {
    if (index === 0)
        return input.toLowerCase();
    return pascalCaseTransformMerge(input);
}
function camelCase(input, options) {
    if (options === void 0) { options = {}; }
    return pascalCase(input, __assign({ transform: camelCaseTransform }, options));
}

/**
 * Upper case the first character of an input string.
 */
function upperCaseFirst(input) {
    return input.charAt(0).toUpperCase() + input.substr(1);
}

function capitalCaseTransform(input) {
    return upperCaseFirst(input.toLowerCase());
}
function capitalCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: " ", transform: capitalCaseTransform }, options));
}

/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
/**
 * Upper case as a function.
 */
function upperCase(str) {
    return str.toUpperCase();
}

function constantCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "_", transform: upperCase }, options));
}

function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "." }, options));
}

function headerCase(input, options) {
    if (options === void 0) { options = {}; }
    return capitalCase(input, __assign({ delimiter: "-" }, options));
}

function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "-" }, options));
}

function pathCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "/" }, options));
}

function sentenceCaseTransform(input, index) {
    var result = input.toLowerCase();
    if (index === 0)
        return upperCaseFirst(result);
    return result;
}
function sentenceCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: " ", transform: sentenceCaseTransform }, options));
}

function snakeCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "_" }, options));
}

var cc = /*#__PURE__*/Object.freeze({
    __proto__: null,
    camelCase: camelCase,
    camelCaseTransform: camelCaseTransform,
    camelCaseTransformMerge: camelCaseTransformMerge,
    capitalCase: capitalCase,
    capitalCaseTransform: capitalCaseTransform,
    constantCase: constantCase,
    dotCase: dotCase,
    headerCase: headerCase,
    noCase: noCase,
    paramCase: paramCase,
    pascalCase: pascalCase,
    pascalCaseTransform: pascalCaseTransform,
    pascalCaseTransformMerge: pascalCaseTransformMerge,
    pathCase: pathCase,
    sentenceCase: sentenceCase,
    sentenceCaseTransform: sentenceCaseTransform,
    snakeCase: snakeCase
});

/**
 * 空格/换行分隔的选择字段为key生成对象进行替换
 */
const _toObject = (s) => {
    s = s.replaceAll(",", " ");
    const splitMatches = s.matchAll(/(\n|\s)+/g);
    for (let match of splitMatches) {
        s = s.replace(match[0], " ");
    }
    return JSON.stringify(s.split(" ").reduce((o, k) => {
        // todo 填充值可配置
        o[k] = "";
        return o;
    }, {}));
};
/**
 * 空格/换行/逗号分隔的字段为数组对象列表
 */
const _toArray = (s) => {
    const splitMatches = s.matchAll(/(\n|\s)+/g);
    for (let match of splitMatches) {
        s = s.replace(match[0], " ");
    }
    return JSON.stringify(s.split(" "));
};
/**
 * （请选中一个对象）大驼峰/小驼峰/...
 */
const _changeCase = (ccFnKey, text) => {
    const COMMENT_IGNORE_KEY = "@@@@@@";
    // 注释段临时处理
    const ignoreCommentList = [];
    text = _matchReplace(text, /\s*\/\/.*(\r?\n)?/g, (m) => {
        ignoreCommentList.push(m[0]);
        return [COMMENT_IGNORE_KEY, m[0].length];
    });
    const ccFn = cc[ccFnKey];
    // 变量型匹配
    text = _matchReplace(text, /(\w(\w|\d)*)\s*=/g, (m) => {
        return [ccFn(m[1]), m[1].length];
    });
    // 对象键匹配
    text = _matchReplace(text, /(\w(\w|\d)*)\s*:/g, (m) => {
        return [ccFn(m[1]), m[1].length];
    });
    // 注释恢复
    text = _matchReplace(text, new RegExp(`${COMMENT_IGNORE_KEY}`, "g"), (m, index) => {
        return [ignoreCommentList[index], m[0].length];
    });
    return text;
};
/**
 * （请选中一个对象）大驼峰/小驼峰/...
 * 只要匹配到符合变量命名法的都进行转换
 */
const _changeCaseAnyway = (ccFnKey, text) => {
    const ccFn = cc[ccFnKey];
    // 变量型匹配
    text = _matchReplace(text, /\w(\w|\d)*/g, (m) => {
        return [ccFn(m[0]), m[0].length];
    });
    return text;
};
const _matchReplace = (text, reg, replacement) => {
    const textParts = [];
    let startIndex = 0;
    let index = 0;
    const matches = text.matchAll(reg);
    for (let m of matches) {
        if (typeof m.index === "undefined")
            continue;
        const [s, offset] = replacement(m, index);
        textParts.push(text.slice(startIndex, m.index), s);
        startIndex = m.index + offset; // 偏移量为全匹配长度
        index += 1;
    }
    textParts.push(text.slice(startIndex));
    return textParts.join("");
};
/**
 * 变二维码并复制到剪切板
 */
const _toQrCode = (s) => new Promise((resolve, reject) => {
    const QrCode = require("qrcode");
    QrCode.toDataURL(s, (err, url) => {
        if (err)
            return reject(err);
        resolve(url);
    });
});
const _objectJsonfied = (s) => {
    return s.replaceAll(/(?<!["\w])(\w+)(\s*:)/g, `"$1"$2`);
};
const transformer = {
    toObject: _toObject,
    toArray: _toArray,
    changeCase: _changeCase,
    changeCaseAnyway: _changeCaseAnyway,
    toQrCode: _toQrCode,
    objectJsonfied: _objectJsonfied
};

module.exports = transformer;
//# sourceMappingURL=index.js.map
