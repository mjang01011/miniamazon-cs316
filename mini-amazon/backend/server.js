import express from 'express';
const app = express();

app.get("/api/items", (req, res) => {
    res.send(data.items);
})

app.listen(8080, () => {console.log('Server started at http://localhost:8080')});


