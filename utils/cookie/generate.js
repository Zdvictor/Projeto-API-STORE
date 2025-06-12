
module.exports = function (res,token) {

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" })   

}