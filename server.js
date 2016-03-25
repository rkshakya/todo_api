var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	var matchedData = _.findWhere(todos, { id : todoId});

	if(matchedData){
		res.json(matchedData);
	} else {
		res.status(404).send();
	}


})

app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedData = _.findWhere(todos, { id : todoId});
	

	if(matchedData){
		todos = _.without(todos, matchedData);
		res.json(matchedData);
	} else {
		res.status(404).json({"error":"no matching data"});
	}

})

app.post('/todos', function(req, res){
	var body = req.body;
	body = _.pick(body, 'description', 'completed');
	
	if( !_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoId;
	todos.push(body);
	todoId++;

	res.json(body);
})



app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT);
});