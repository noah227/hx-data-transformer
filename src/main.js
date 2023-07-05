const hx = require("hbuilderx")
const transformer = require("./transformer/index.js")
const cc = require("change-case")
const {match} = require("assert")

module.exports = {
    toObject() {
        hx.window.getActiveTextEditor().then(editor => {
            const selection = editor.selection
            const text = editor.document.getText(selection)
            editor.edit(editBuilder => {
                editBuilder.replace(selection, transformer.toObject(text))
            })
        })
    },
    toArray() {
        hx.window.getActiveTextEditor().then(editor => {
            const selection = editor.selection
            const text = editor.document.getText(selection)
            editor.edit(editBuilder => {
                editBuilder.replace(selection, transformer.toArray(text))
            })
        })
    },
    changeCase() {
        hx.window.showQuickPick(
            Object.keys(cc).map(k => ({
                label: k
            })),
            {placeHolder: "选择要转换的风格"}
        ).then(result => {
            if (result) {
                const ccFn = cc[result.label]
                if (ccFn) {
                    hx.window.getActiveTextEditor().then(editor => {
                        const selections = editor.selections
                        editor.edit(editBuilder => {
                            selections.forEach(selection => {
                                let text = editor.document.getText(selection)
                                editBuilder.replace(selection, transformer.changeCase(result.label, text))
                            })
                        })
                    })
                }
            }
        })
    },
    toQrCode() {
        hx.window.getActiveTextEditor().then(editor => {
            const text = editor.selections.map(selection => editor.document.getText(selection)).join("\n")
            transformer.toQrCode(text).then(url => {
                require("copy-paste").copy(url)
                hx.window.setStatusBarMessage("已复制二维码地址复制到剪切板", 3000)
            }).catch(e => {
                hx.window.setStatusBarMessage("文本过长，转换二维码失败", 3000, "error")
            })
        })
    }
}
