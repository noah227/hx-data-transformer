const fs = require("fs")
const path = require("path")
const { pkgPath, readPkgData, writePkgData } = require("./common.js")
const { commandList } = require("./core.js")

const createEventList = () => {
    const dataList = commandList.map(([command]) => `onCommand:extension.${command}`)
    return {
        dataList,
        apply() {
            const pkg = readPkgData()
            pkg.activationEvents = dataList
            writePkgData(pkg)
        }
    }
}
/**
 * 生成注册commands
 */
const createCommandList = () => {
    const dataList = commandList.map(([command, title]) => ({
        command: `extension.${command}`,
        title
    }))
    return {
        dataList,
        apply() {
            const pkg = readPkgData()
            pkg.contributes.commands = dataList
            writePkgData(pkg)
        }
    }
}

/**
 * 创建右键菜单命令列表
 */
const createContextList = () => {
    const dataBase = {
        id: "transformer",
        title: "一键变换",
        group: "assist"
    }
    const dataTail = {
        "group": "z_commands"
    }
    const dataList = commandList.map(([command, title, when], index) => ({
        command: `extension.${command}`,
        group: `transformer@${index + 1}`,
        when
    }))
    return {
        dataList,
        apply() {
            const pkg = readPkgData()
            pkg.contributes.menus["editor/context"] = [
                dataBase, ...dataList, dataTail
            ]
            writePkgData(pkg)
        }
    }
}

console.log(createEventList().apply())
// console.log(createCommandList().apply())
// console.log(createContextList().apply())
