import { app } from './app';
require('dotenv').config();
import connectDB  from "./util/db"

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
    connectDB();
});