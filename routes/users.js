// app/routes.js
module.exports = function(app, passport) {

var User = require('../models/user.js');

// =====================================
// TO UPDATE AND DELETE USERS ==========
// =====================================
	app.get('/users', isLoggedIn, function(req, res){ 
	    User.find(function(err, users, next){
	        if(err){
	            return next(err);
	        } else {
	            res.json(users);    
	        }
	    });
	});

	//PUT - Actualizar usuario
	app.put('/users/:id', isLoggedIn, function(req, res){
		if(true){
			User.findById(req.params.id, function(err, user){
				user.name 	 		= req.body.name;
				user.last 	 		= req.body.last;
				user.info.ci 		= req.body.ci;
				user.info.address 	= req.body.address;
				user.info.phone		= req.body.phone;
				user.email			= req.body.email;

				user.save(function(err){
					if(err){res.send(err)}
					res.json(user);
				})
			})
		}else{
            return res.redirect('/');
        }
	})

	//DELETE - Eliminar usuario
	app.delete('/users/:id', isLoggedIn, function(req, res){
		if(req.user.type=="operario"){
			User.findByIdAndRemove(req.params.id, function(err){
				if(err){res.send(err)}
				res.json({message: 'That one is gone'});
			})
		}else{
            return res.redirect('/');
        }
	})
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}