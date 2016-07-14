module.exports = function(req,res,next){
  if(req.signedCookies.user){
    next()
  } else {
    res.render('auth/signin', {button_text: 'sign in'})
  }
}
