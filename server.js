// REQUIRED
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


// FOOD ARRAYS
var burgers = [
  'Hamburger',
  'Cheese Burger',
  'Vegetable Burger'
];

var tacos = [
  'Soft Taco',
  'Crunchy Taco',
  'Super Taco'
];



// ROUTES
app.get("/", function(request, response) {
  // send back the response: 'Hello World'
  response.json({"message": "Hello, World!"});
});

app.get('/api/tacos', function(request, response){
  response.json({"tacos": tacos});
});

app.post('/api/tacos', function(request, response){
  var tacoName = request.body.name;
  tacos.push(tacoName);
  response.json({"tacos": tacos});
});

app.get('/api/tacos/:id', function(request, response){
  var index = request.params.id;
  var selection = tacos[index] || 'Sorry, that\'s not a tacoption';
  response.json( {"taco": selection });
});

app.get('/api/burgers', function(request, response){
  response.json({"burgers": burgers});
});

app.get('/greetings/:name/:department/:id', function(request, response){
  console.log(`PARAMS: `,request.params);
  response.json({"greeting": `Hello, ${request.params.name}`})
})


app.get('/pick-a-color/:color', function(request, response){
  response.json({"color": request.params.color});
});

app.get("/thank", function (request, response) {
  console.log(request.query);
  var name = request.query.name;
  if(request.query.loud){
    name +="!!!";
  }
  response.send('Thank you, ' + name + '!');
});


app.get("/multiply", function(request, response){
  var x = parseInt(request.query.x);
  var y = parseInt(request.query.y);
  var product = x * y;
  response.json({"product": product});

})

// SERVER START
app.listen(3000, function () {
  console.log("Justin wrote this.");
});
