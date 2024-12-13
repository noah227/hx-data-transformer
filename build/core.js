/**
 * @type [string, string, string][]
 */
const commandList = [
    ["toObject", "变对象", "editorHasSelection"],
    ["toArray", "变数组", "editorHasSelection"],
    ["changeCase", "变风格", "editorHasSelection"],
    ["changeCaseAnyway", "变风格（任意变换）", "editorHasSelection"],
    ["toQrCode", "变二维码", "editorHasSelection"],
    ["toQrCodeWithGUI", "变二维码（GUI）", "editorHasSelection"],
    ["encodeAndDecode", "编码/解码（URI）", "editorHasSelection"],
    ["objectJsonfied", "对象json修正", "editorHasSelection"],
    ["reverseLineComment", "注释反转", "editorHasSelection && langId =~ /javascript|typescript|coffeescript/"],
    ["configuration", "配置项", "editorTextFocus"],
]

module.exports = {
    commandList
}
