const executable7ZipPath = '"C:\\Program Files\\7-Zip\\7z.exe"'
const publishName = "hx-data-transformer.zip"
// [file, isDir]
const includes = [
    ["./*.*", false],
    ["./src", true]
]
const excludes = [
    // 一级目录下不需要的东西
    [".idea", true],
    [".git", true],
    [".gitignore", false],
    ["cdnjs-pack.js", false],
    ["package-lock.json", false],
    ["tsconfig.json", false],
    ["hx-pack.js", false],
    ["rollup.config.*.js", false],
    ["TODO.md", false],
    ["node_modules", true],
    ["src/transformer", true],
    ["src/main.js", true],
    [publishName, false]
]

const createIncludeArgs = () => {
    return "i -r " + includes.map(([fp, isDir]) => {
        return fp
    }).join(" ")
}

const createExcludes = () => {
    return excludes.map(([fp, isDir]) => {
        return isDir ? `-xr!${fp}` : `-x!${fp}`
    }).join(" ")
}

const createCmd = () => {
    const cmd = [executable7ZipPath, `a -tzip ${publishName}`, createIncludeArgs(), createExcludes()].join(" ")
    console.log(cmd)
    return cmd
}

const runPack = () => {
    const fse = require("fs-extra")
    if(fse.pathExistsSync(publishName)) {
        fse.removeSync(publishName)
        console.log(`已自动移除存在的文件>>> ${publishName}`)
    }
    require("child_process").exec(createCmd(), (error, stdout, stderr) => {
        if (error) console.error(error)
        else console.log(`打包成功！打包文件大小${
            (require("fs").statSync(publishName).size / 1024).toFixed(2)
        }KB`)
    })
}

runPack()
