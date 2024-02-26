const hx = require("hbuilderx")
const transformer = require("./transformer/index.js")
const cc = require("change-case")

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
    changeCaseAnyway() {
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
                                editBuilder.replace(selection, transformer.changeCaseAnyway(result.label, text))
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
    },
    toQrCodeWithGUI(){
        hx.window.getActiveTextEditor().then(editor => {
            const text = editor.selections.map(selection => editor.document.getText(selection)).join("\n")
            transformer.toQrCode(text).then(url => {
                const wd = hx.window.createWebViewDialog({
                    modal: true,
                    title: "二维码预览",
					description: "二维码模糊时，可以拖动窗口右下角调整窗体大小",
                    // dialogButtons: ["复制URL", "关闭"],
                    dialogButtons: ["关闭"],
                    size: {width: 360, height: 420}
                }, {enableScripts: false})

                var background = '';

                let config = hx.workspace.getConfiguration();
                let colorScheme = config.get('editor.colorScheme');
                if (colorScheme == 'Monokai') {
                    background = 'rgb(39,40,34)'
                } else if (colorScheme == 'Atom One Dark') {
                    background = 'rgb(40,44,53)'
                } else {
                    background = 'rgb(255,250,232)'
                }
                ;

                const wv = wd.webView
                wv.html = `<html>
					<style>
						body {
							width: 100%;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 0;
							background-color:${background};border:1px solid ${background};
							box-sizing: border-box;
							padding: 16px;
							overflow: hidden;
						}
						body > img {
							width: 100%;
							height: 100%;
							object-fit: contain;
						}
					</style>
					<body>
						<img src="${url}">
						<script>
							function initReceive() {
						        hbuilderx.onDidReceiveMessage((msg)=>{
						            if(msg.type == 'DialogButtonEvent'){
						                let button = msg.button;
						                if(button == '复制URL'){
											hbuilderx.postMessage({
											    command: 'copy'
											})
						                }else if(button == '关闭'){
											hbuilderx.postMessage({
						                        command: 'close'
						                    })
						                }
						            }
						        });
						    }
						    window.addEventListener("hbuilderxReady", initReceive);
						</script>
					</body>
				<html>`
                wv.onDidReceiveMessage(msg => {
                    if (msg.command === "copy") {
                        require("copy-paste").copy(url)
                        hx.window.setStatusBarMessage("已复制二维码地址复制到剪切板", 3000)
                    } else if (msg.command === "close") {
                        wd.close()
                    }
                })
                wd.show().then(() => {
                    console.log("打开预览成功")
                }).catch((e) => {
                    console.log("打开预览失败：", e)
                })
            }).catch(e => {
                console.log("转换到URL失败：", e)
            })
        })
    },
	encodeAndDecode(){
		const configGroup = [
			{label: "encodeURI", fn(text){
				return encodeURI(text)
			}},
			{label: "encodeURIComponent", fn(text){
				return encodeURIComponent(text)
			}},
			{label: "decodeURI", fn(text){
				return decodeURI(text)
			}},
			{label: "decodeURIComponent", fn(text){
				return decodeURIComponent(text)
			}},
		]
		hx.window.showQuickPick(configGroup).then(result => {
			if(result) {
				const fn = configGroup.find(item => item.label === result.label)?.fn
				hx.window.getActiveTextEditor().then(editor => {
				    const selections = editor.selections
				    editor.edit(editBuilder => {
				        selections.forEach(selection => {
				            let text = editor.document.getText(selection)
				            editBuilder.replace(selection, fn(text))
				        })
				    })
				})
			}
		})
	}
}
