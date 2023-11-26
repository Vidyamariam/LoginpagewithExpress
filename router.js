var express = require('express');
var router = express.Router();

const credential ={

    email: "admin@gmail.com",
    password: "admin123"
}

//login user
router.post('/login',(req,res)=>{
   if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/Homepage');  
       //res.end("Login Successful...!");
   }
   else{
      res.redirect(`/?message=Incorrect%20Password`);
   }
});

//route for dashboard
router.get('/Homepage',(req,res)=>{

    if(req.session.user){
        res.render('Homepage',{user: req.session.user})
    }else{
        res.redirect("/");
    }
})

//route for logout
router.get('/logout',(req,res)=>{

    req.session.destroy()
     res.redirect("/");
 
})

module.exports = router;