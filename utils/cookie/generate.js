// Arquivo: utils/cookie/generate.js
module.exports = function (res, token) {

    res.cookie("token", token, { 
        httpOnly: true, 
        secure: true,
        sameSite: "none"
    });

}