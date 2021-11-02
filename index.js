const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/route');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/routes",routes);

// Port
const PORT =  8000;

app.get('/', (req,res) => {
    res.send('Felinos Technolgies Assignment');
})

app.listen(PORT, ()=> console.log(`Server Started and running on port ${PORT}`));