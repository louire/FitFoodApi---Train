const express = require('express');
const app = express();

app.use(express.json());

//api to get all foods and its calories
const foods = [
    {id: 1, name: 'Pizza', calories: 266, protein: 11, fat: 10, carbs: 31},
    {id: 2, name: 'Burger', calories: 295, protein: 13, fat: 13, carbs: 29},
    {id: 3, name: 'Pasta', calories: 131, protein: 5, fat: 1, carbs: 25},
    {id: 4, name: 'Rice', calories: 130, protein: 2, fat: 0, carbs: 28},
    {id: 5, name: 'Bread', calories: 79, protein: 3, fat: 1, carbs: 14},
    {id: 6, name: 'Egg', calories: 78, protein: 6, fat: 5, carbs: 1},
    {id: 7, name: 'Milk', calories: 103, protein: 3, fat: 3, carbs: 12},
    {id: 8, name: 'Apple', calories: 95, protein: 1, fat: 0, carbs: 25},
    {id: 9, name: 'Banana', calories: 105, protein: 1, fat: 0, carbs: 27},
    {id: 10, name: 'Orange', calories: 62, protein: 1, fat: 0, carbs: 15},
];

app.get('/', (req, res) => {
    res.send('Fit Food api');
});

app.get('/api/foods', (req, res) => {
    res.send(foods);
});

app.get('/api/foods/:id', (req, res) => {
    const food = foods.find(c => c.id === parseInt(req.params.id));
    if (!food) return res.status(404).send('The food with the given ID was not found');
    else res.send(food);
});

app.post('/api/foods', (req, res) => {
    const food = {
        id: foods.length + 1,
        name: req.body.name,
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs
    };
    foods.push(food);
    res.send(food);
});

app.put('/api/foods/:id', (req, res) => {
    const food = foods.find(c => c.id === parseInt(req.params.id));
    if (!food) return res.status(404).send('The food with the given ID was not found');

    food.name = req.body.name;
    food.calories = req.body.calories;
    food.protein = req.body.protein;
    food.fat = req.body.fat;
    food.carbs = req.body.carbs;
    res.send(food);
});

app.delete('/api/foods/:id', (req, res) => {
    const food = foods.find(c => c.id === parseInt(req.params.id));
    if (!food) return res.status(404).send('The food with the given ID was not found');

    const index = foods.indexOf(food);
    foods.splice(index, 1);

    res.send(food);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...  go to http://localhost:${port}`));

