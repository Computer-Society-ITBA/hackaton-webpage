function error(code,message){
    return {error:{
        code:code,
        message:message
    }}
}
module.exports = {error}