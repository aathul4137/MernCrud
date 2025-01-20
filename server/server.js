const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const url = 'mongodb://localhost:27017/express_db_1';
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  price:Number,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

const StudentSchema = new mongoose.Schema({
  name: String,
  mark1:Number,
  mark2: Number,
  mark3:Number
});

const Student = mongoose.model('Student_new', StudentSchema);

// API Endpoints
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});
// app.post('/api/students/delete', async (req, res) => {
//   try {
//     const newStudent = new Student(req.body);
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create item' });
//   }
// });


// Start the Server
app.listen(4000, () => console.log('Server started on port 4000'));
