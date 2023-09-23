import { app } from './app';
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});