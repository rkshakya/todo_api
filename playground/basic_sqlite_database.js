var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	"dialect" : "sqlite",
	"storage" : __dirname + "/basic_sqlite_database.sqlite"
});

var Todo = sequelize.define('todo', {
	description: {
		type : Sequelize.STRING,
		allowNull : false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type : Sequelize.BOOLEAN,
		allowNull : false,
		defaultValue : false

	}
})

sequelize.sync().then(function() {
	console.log('Everything s fine');

	return Todo.findById(2);

	// Todo.create({
	// 	description : 'Clear trash',
	// 	// completed : false 
	// }).then(function(todo){
	// 	return Todo.create({
	// 		description : 'Special cake'
	// 	});
	// }).then(function(){
	// 	// return Todo.findById(1);

	// }).then(function(todo){
	// 	if (todo){
	// 		console.log(todo.toJSON());
	// 	} else {
	// 		console.log('No todo found');
	// 	}
	// }).catch(function(e){
	// 	console.log(e);
	// });
}).then (function(todo){
	if(todo){
		console.log(todo.toJSON());
	}else{
		console.log("No todo found");
	}
});