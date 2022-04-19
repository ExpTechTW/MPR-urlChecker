const Info = {
    "version": "1.0.0",
    "pluginLoader": ["1.X.X"],
    "name": "urlChecker",
    "author": "whes1015"
}

const Commands = [

]

const Event = [
    "messageCreate", "ready"
]

const pluginLoader = require('../Core/pluginLoader')
const config = require('../config')
const axios = require('axios')

async function ready(client) {
    if (config.APIkey == "") {
        pluginLoader.log("Warn | urlChecker >> 沒有檢測到 APIkey，目前使用公共 APIkey，可能導致資源搶用")
    }
}

async function messageCreate(client, message) {
    let Data = {
        "APIkey": "a5ef9cb2cf9b0c14b6ba71d0fc39e329",
        "Function": "et",
        "Type": "urlChecker",
        "FormatVersion": 1,
        "Value": message.content
    }
    if (config.APIkey != "") {
        Data["APIkey"] = config.APIkey
    }
    try {
        let res = await axios.post("http://150.117.110.118:10150/", Data)
        if (res.data["state"] === "Success") {
            console.log(res.data)
            if (res.data["response"] != "All URL inspections passed" && res.data["response"] != "No URL found") {
                message.reply(await pluginLoader.embed("文本中含有危險網址"))
                message.delete()
            }
        } else {
            pluginLoader.log(`Error | urlChecker >> ${res.data["response"]}`)
        }
    } catch (error) {
        pluginLoader.log("Error | urlChecker >> " + err)
    }
}

module.exports = {
    Info,
    Commands,
    Event,
    messageCreate,
    ready
}
