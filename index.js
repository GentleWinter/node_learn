const customExpress = require('./config/customExpress.js');

const app = customExpress();

app.listen(3000, () => console.log('listen to port 3000'));