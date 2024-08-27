const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port= 9001;
const mongourl= "mongodb+srv://akshitha99:aksh99@cluster0.mhhz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(mongourl,{});
mongoose.connection.on('connected' ,() => {
    console.log("connected to mongoDB sucessfully");
})

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

app.listen(port, () =>{
    console.log('server has started on the port' + port);
})
