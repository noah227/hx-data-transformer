const {nodeResolve} = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const terser = require("@rollup/plugin-terser")

const plugins = [
    nodeResolve(),
    typescript(),
    commonjs()
]
module.exports = [
    {
        input: "./src/transformer/index.ts",
        output: {
            file: "./src/transformer/index.js",
            format: "cjs",
            exports: "auto",
            sourcemap: true
        },
        plugins: [
            ...plugins
        ]
    }
]
