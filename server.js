var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var __ = require( 'underscore' );
var db = require( './db.js' );
var app = express();
var PORT = 	process.env.PORT || 3000;
var jsonParser = bodyParser.json();

app.use( jsonParser );

app.get( '/', function( req, res) {
	res.status(200).send( 'Root Page Called' );
});

//GET /todos?completed=true&q=work
app.get( '/todos', function( req, res ){
	var query = req.query;
	var where = {};	
	if( query.hasOwnProperty( 'completed') && query.completed === 'true' ){
		where.completed = true;
	}else if( query.hasOwnProperty( 'completed') && query.completed === 'false' ){
		where.completed = false;
	}

	if( query.hasOwnProperty( 'q') && query.q.length > 0  ){		
		where.description = {
			$like: '%'+ query.q + '%'
		};
	}
	console.log( query.q );
	console.log( where );
	db.todo.findAll({ where: where }).then( function( todos ){
		res.status( 200 ).json( todos );
	}, function(e ){
		res.status(400).json(e );
	});	
});

//GET /todos/:id
app.get( '/todos/:id', function( req, res ){
	var todoId = parseInt( req.params.id );
	db.todo.findById( todoId ).then( function( todo ){
		if( todo ){
			res.status( 200 ).json( todo.toJSON() );
		}else{
			res.status( 404 ).json( "Not found matching request todo by id" );
		}		
	}, function(e ){
		res.status(500).json(e );
	});
});


//POST /todos
app.post( '/todos', function (req, res ){
	var body = __.pick( req.body, "completed", "description" );
	if( body.hasOwnProperty( 'description' ) && __.isString( body.description ) ){
		db.todo.create( body ).then( function( todo ){
			res.status( 200 ).json( todo.toJSON() );
		}, function( e ){
			res.status( 400 ).json( e );
		});	
	}else{
		res.json( 'description sould only be string' );
	}	
});

//PUT /todos/:id
app.put( '/todos:id', function(req, res){

});

db.sequelize.sync().then( function(){
	return app.listen( PORT, function(){
	console.log( 'Todo api with database working at port :' + PORT );
	});
}).catch( function(e ){
	console.log( e );
});