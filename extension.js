var hx = require("hbuilderx");
// const transformer = require("./src/main.js")
const transformer = require("./src/main.build.js")

// [commandId, handler]
const commandList = [
	// ["extension.transformer", () => {}],
	["extension.toObject", () => transformer.toObject()],
	["extension.toArray", () => transformer.toArray()],
	["extension.changeCase", () => transformer.changeCase()],
	["extension.changeCaseAnyway", () => transformer.changeCaseAnyway()],
	["extension.toQrCode", () => transformer.toQrCode()],
	["extension.toQrCodeWithGUI", () => transformer.toQrCodeWithGUI()],
	["extension.encodeAndDecode", () => transformer.encodeAndDecode()],
	["extension.configuration", () => {
		hx.window.showMessageBox({
			title: "提示",
			type: "info",
			text: "暂未开放，敬请期待！"
		})
	}],
]

//该方法将在插件激活的时候调用
function activate(context) {
	commandList.forEach(config => {
		context.subscriptions.push(hx.commands.registerCommand(...config))
	})
}

//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
