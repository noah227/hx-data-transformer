const transformer = require("./index")
const testList = [
    [
        () => {
            return transformer.toObject("hello you there \n hhh")
        },
        false
    ],
    [
        () => {
            return transformer.toArray("hello you there \n hhh")
        },
        false
    ],
    [
        () => {
            const s = `
                // 示例1（对象型）
const data_object = {
\tuser_nickname: "jack_the_boy",
\tage: 20
}

// 示例2（变量型）
const user_nickname = "jack_the_boy"
const user_gender = "male" // 性别
            `
            return transformer.changeCase("camelCase", s)
        },
        true
    ],
    [
        async () => {
            await transformer.toQrCode("hello")
        },
        false
    ],
]

const test = () => {
    const willTestList = testList.filter(([_, test]) => test)
    willTestList.forEach(([fn, _]) => console.log(fn()))
}

test()

const aa = {
    name_gogo: "jack_show_go"
}
var s = `
{
    name_gogo: "jack_show_go", // 注释一号
    age_show: "HelloYou"
// }
// `
//
// // const matches = s.matchAll(/([{},:;]|(\/\/.*))+/g)
// const matches = s.matchAll(/\w(\w|\d)*/g)
// for(let m of matches){
//     s = s.replace(m[0], require("change-case").camelCase(m[0]))
// }
// console.log(s)
// // console.log(require("change-case").camelCase(JSON.stringify(aa), {
// //     transform(part, index, parts){
// //         console.log(part, index, parts)
// //         return part
// //     }
// // }))
