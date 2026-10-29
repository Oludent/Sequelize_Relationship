const express = require('express');

const PORT = 6600;

const sequelize = require('./database/database');
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')
const app = express();

app.use(express.json());

app.use(postRouter);
app.use(userRouter);


const dbConnection = async () => {
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error.message);
}
};

dbConnection();

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});