const express = require('express');
const http = require('http'); 

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connect } = require('./utils/DB-connect');

// Create HTTP server
const server = http.createServer(app);



// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174",'https://job-task-2-175ee.web.app'],
    credentials: true,
}));
app.use(cookieParser());





// JWT related API
app.post('/jwt', async (req, res) => {
  const userInfo = req.body.userInfo

  const token = jwt.sign({
    data: userInfo
  }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
  res.send({ token })

})



// Routes
const userRoutes = require('./Routes/users.routes');
const productRoutes = require('./Routes/product.routes');


app.use('/user', userRoutes);
app.use('/product', productRoutes);




app.get('/', (req, res) => {
    res.send('JobTask Server is Running');
});

// Start the server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



// check total code line . 
// find . -path ./node_modules -prune -o -path ./.git -prune -o -name '.env' -prune -o \( -name 'package-lock.json' -o -name 'package.json' \) -prune -o -type f -print | xargs wc -l  