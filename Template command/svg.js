var ColorList = 
[
   ["crimson","white"],
   ["coral","white"],
   ["gold","black"],
   ["mediumseagreen","white"],
   ["deepskyblue","black"],
   ["royalblue","white"],
   ["darkorchid","white"],
   ["deeppink","white"],
   ["chocolate","white"],
   ["darkcyan","white"]
]


function IngredientRatio (...list)
{
    // 检查参数数量
    if (list.length == 0)
        return "ERROR: 参数长度不应为0"
    if (list.length % 2 != 0)
        return `ERROR: 参数长度为${list.length},理应为2的倍数`
    // 整理参数，顺便检查参数类型
    let nameList = []
    let ratioList = []
    let ratiosum = 0
    for (let i = 0 ; i < list.length ; i += 2)
    {
        if (typeof list[i] != "string")
            return `ERROR: ${i}号参数:${list[i]},理应为string类型`
        if (typeof list[i+1] != "number")
            return `ERROR: ${i+1}号参数:${list[i+1]},理应为number类型`
        if (typeof list[i+1] == 0)
            return `ERROR: ${i+1}号参数,原料比例不能为0`

        nameList.push(list[i])
        ratioList.push(list[i+1])
        ratiosum += list[i+1]
    }

    // 准备输出
    let out = `<svg width="100%" height="100">`
    let begin = 0
    for (let i = 0 ; i < nameList.length ; i += 1)
    {
        let elSize = (ratioList[i] / ratiosum) * (100 - nameList.length-1)
        
        let blockItem = `<rect x="${begin}%" y="0" rx="5" ry="5" width="${elSize}%" height="100" fill="${ColorList[i%ColorList.length][0]}"/>`
        let NameItem = `<text x="${begin+2}%" y="45" font-family="Hiragino Sans GB" font-size="14" fill="${ColorList[i%ColorList.length][1]}">${nameList[i]}</text>`
        let mlItem = `<text x="${begin+2}%" y="65" font-family="Hiragino Sans GB" font-size="14" fill="${ColorList[i%ColorList.length][1]}">${ratioList[i]}ml</text>`

        out += `\n\t${blockItem}\n\t${NameItem}\n\t${mlItem}`
        begin += elSize + 1
    }
    out += `\n</svg>`

    return out
}


module.exports = {
    IR : IngredientRatio

} 