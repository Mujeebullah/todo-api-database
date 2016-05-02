var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var __ = require( 'underscore' );
var app = express();
var PORT = 	process.env.PORT || 3000;
var jsonParser = bodyParser.json();
var todos = [];
var todosNextId = 1;

app.use( jsonParser );

app.get( '/', function( req, res) {
	res.status(200).send( 'Root Page Called' );
});

//GET /todos
app.get( '/todos', function( req, res ){
	res.json( todos );
});

//POST /todos
app.post( '/todos', function (req, res ){
	var body = __.pick( req.body, "completed", "description" );
	console.log( body );
	if ( __.isBoolean( body.completed ) && __.isString( body.description) && body.description.length > 0 ){
		todos.push( body );
		body.id = todosNextId++;
		body.description = body.description.trim();
		return res.status( 200 ).json( body );
	}
	res.status( 400 ).json({
		"error": "what happend with POST /todos request"
	});
});

//PUT /todos/:id

app.put( '/todos:id', function(req, res){

});

app.listen( PORT, function(){
	console.log( 'Todo api with database working at port :' + PORT );
});

