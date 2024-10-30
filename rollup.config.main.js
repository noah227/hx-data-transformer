const {nodeResolve} = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const terser = require("@rollup/plugin-terser")
const json = require("@rollup/plugin-json")

const plugins = [
    nodeResolve(),
    commonjs(),
	json(),
    terser()
]

// 打包后就可以舍弃node_modules了
module.exports = [
    {
        input: "./src/main.js",
        output: {
            file: "./src/main.build.js",
            format: "cjs",
            exports: "auto",
            sourcemap: false
        },
		external: ["clipboard-sys"],
        plugins: [
            ...plugins
        ]
    }
]
