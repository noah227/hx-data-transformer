import * as cc from "change-case"

/**
 * 空格/换行分隔的选择字段为key生成对象进行替换
 */
const _toObject = (s: string) => {
    s = s.replaceAll(",", " ")
    const splitMatches = s.matchAll(/(\n|\s)+/g)
    for (let match of splitMatches) {
        s = s.replace(match[0], " ")
    }
    return JSON.stringify(s.split(" ").reduce((o, k) => {
        // todo 填充值可配置
        o[k] = ""
        return o
    }, {} as { [index: string]: any }))
}

/**
 * 空格/换行/逗号分隔的字段为数组对象列表
 */
const _toArray = (s: string) => {
    const splitMatches = s.matchAll(/(\n|\s)+/g)
    for (let match of splitMatches) {
        s = s.replace(match[0], " ")
    }
    return JSON.stringify(s.split(" "))
}

/**
 * （请选中一个对象）大驼峰/小驼峰/...
 */
const _changeCase = (ccFnKey: string, text: string) => {
    const COMMENT_IGNORE_KEY = "@@@@@@"
    // 注释段临时处理
    const ignoreCommentList: string[] = []
    text = _matchReplace(text, /\s*\/\/.*(\r?\n)/g, (m) => {
        ignoreCommentList.push(m[0])
        return [COMMENT_IGNORE_KEY, 0]
    })
    const ccFn = (cc as any)[ccFnKey]
    // 变量型匹配
    text = _matchReplace(text, /(\w(\w|\d)*)\s*=/g, (m: any) => {
        return [ccFn(m[1]), 1]
    })
    // 对象键匹配
    text = _matchReplace(text, /(\w(\w|\d)*)\s*:/g, (m: any) => {
        return [ccFn(m[1]), 1]
    })
    // 注释恢复
    text = _matchReplace(
        text, new RegExp(`${COMMENT_IGNORE_KEY}`, "g"),
        (m: any, index: number) => {
            return [ignoreCommentList[index], 0]
        }
    )
    return text
}

const _matchReplace = (text: string, reg: RegExp, replacement: (m: any, index: number) => [string, number]) => {
    const textParts: string[] = []
    let startIndex = 0
    let index = 0
    const matches = text.matchAll(reg)
    for (let m of matches) {
        if (typeof m.index === "undefined") continue
        const [s, offset] = replacement(m, index)
        textParts.push(text.slice(startIndex, m.index), s)
        startIndex = m.index + s.length + offset // 偏移量为全匹配长度
        index += 1
    }
    textParts.push(text.slice(startIndex))
    return textParts.join("")
}

/**
 * 变二维码并复制到剪切板
 */
const _toQrCode = (s: string) => new Promise((resolve, reject) => {
    const QrCode = require("qrcode")
    QrCode.toDataURL(s, (err: any, url: string) => {
        if (err) return reject(err)
        resolve(url)
    })
})

const transformer = {
    toObject: _toObject,
    toArray: _toArray,
    changeCase: _changeCase,
    toQrCode: _toQrCode
}

export default transformer
