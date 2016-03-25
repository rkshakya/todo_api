var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoId = 1;

app.use(bodyParser.json());

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

app.post('/todos', function(req, res){
	var body = req.body;
	// console.log(body.description);
	body.id = todoId;
	todos.push(body);
	todoId++;

	res.json(body);
})



app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});