const path = require("path")
const fs = require("fs")

const pkgPath = path.resolve(__dirname, "../package.json")
module.exports = {
    pkgPath,
    readPkgData: () => JSON.parse(fs.readFileSync(pkgPath, "utf-8")),
    writePkgData: (data) => {
        fs.writeFileSync(pkgPath, JSON.stringify(data, null, 4), "utf-8")
    }
}