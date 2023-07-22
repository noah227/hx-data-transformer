const executable7ZipPath = '"D:\\Program Files\\7-Zip\\7z.exe"'
const publishName = `${require("./package.json").name}.zip`
// [file, isDir]
const includes = [
    ["./*.*", false],
    ["./src", true]
]
const excludesBase = [
    // IDE & Version Control
    [".idea", true],
    [".git", true],
    [".gitignore", false],
    [".editorconfig", false],
    // Log files
    ["package-lock.json", false],
    // Build files
    ["hx-pack.js", false],
    ["tsconfig.json", false],
    ["rollup.config.*.js", false],
    ["node_modules", true],
    // Doc files
    ["*.md", false],
]
const excludes = [
    ...excludesBase,
	["*.gif", false],
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
