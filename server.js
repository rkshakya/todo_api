var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id : 1,
	description : 'Meet mom',
	completed : false
}, {
	id : 2,
	description :"Go to market",
	completed : false
}, {
	id : 3,
	description : "Do yoga",
	completed : true
}
];

app.get('/', function (req, res){
	res.send('Todo API root');
});

//GET /todos
app.get('/todos', function (req, res){
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);

	//res.send('Asking for id ' + todoId + ':' + todos.length + ':' + todos[0].id);

	for(var i = 0 ; i < todos.length; i++){
		if (todoId === todos[i].id){
			//console.log(todos[i].id);
			res.json(todos[i]);
			break;
		}
	}

	res.status(404).send();

})



app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});