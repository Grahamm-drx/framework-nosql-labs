const express = require('express');
const app = express();
const PORT = 3000;

const homeRoutes = require('./routes/homeRoutes');

app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});