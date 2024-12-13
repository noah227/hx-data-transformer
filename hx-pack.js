const cozip = require("cozip")
const publishName = `${require("./package.json").name}.zip`

;(() => {
    cozip(publishName, [
        ["./src/main.js", false],
        ["./src/main.build.js", false],
        ["./node_modules/clipboard-sys", true],
        ["./node_modules/execa", true],
        ["./node_modules/fs-extra", true],
        ["./extension.js", false],
        ["./package.json", false],
    ], err => {
        if (err) console.error(err)
        else {
            console.log("打包完成, 文件大小", (require("fs").statSync(publishName).size / 1024).toFixed(2), "KB")
        }
    })
})()
