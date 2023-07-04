var hx = require("hbuilderx");
const transformer = require("./src/main.js")

// [commandId, handler]
const commandList = [
	["extension.transformer", () => {
		console.log(123)
	}],
	["extension.toObject", () => transformer.toObject()],
	["extension.toArray", () => transformer.toArray()],
	["extension.changeCase", () => transformer.changeCase()],
	["extension.toQrCode", () => transformer.toQrCode()],
	["extension.configuration", () => {
		hx.window.showMessageBox({
			title: "提示",
			type: "info",
			text: "敬请期待！"
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
