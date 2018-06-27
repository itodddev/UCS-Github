const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('UCS Config'));

app.listen(3000, () => console.log('UCS Config listening on port 3000'));
