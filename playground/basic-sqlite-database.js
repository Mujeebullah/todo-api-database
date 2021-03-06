var Sequelize = require( 'sequelize' );
var sequelize = new Sequelize( undefined, undefined, undefined ,{
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite' 
});

var Todo = sequelize.define( 'todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});
/*sequelize.sync( {force: true }).then( function(){
	Todo.create({
		description: 'job at office',
		completed: true
	}).then( function( todo ){		
		return Todo.create({
			description: 'job at home'
		});
	}).then( function( todo ){		
		return Todo.create({
			description: 'office job',
			completed: true
		});
	}).then( function(){
		//return Todo.findById( 1 );
		return Todo.findAll({
			where: {
				description: {
					$like: '%at%'
				}
			}
		});
	}).then( function( todos ){		
		if( todos ){
			todos.forEach( function( todo){
				console.log( todo.toJSON() );
			});
		}else{
			console.log( 'no todo item found' ); 
		}		
	}).catch( function( e ){
		console.log( e );
	});
});*/


sequelize.sync() .then( function(){
	console.log( 'sequelize started!' );
	Todo.findById(2).then( function( todo ) {
		if( todo ){
			console.log( todo.toJSON() );
		}else{
			console.log( 'could not find todo item! ');
		}
	},function( error ){
		console.log( error );
	});
}, function( e ){
	console.log( e );
});