import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import for converting URL to path
import { dirname } from 'path'; // Import for resolving directory names
import fs from 'fs';

dotenv.config();

// Middleware setup
const app = express();
app.use(express.json());  // For parsing JSON bodies
app.use(cors());  // To allow CORS for API requests

// Get the __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure that the 'uploads/animals' directory exists
const uploadDir = path.join(__dirname, 'uploads', 'animals');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });  // Create the directory if it doesn't exist
}

// Static file serving for animal images
app.use('/uploads/animals', express.static(uploadDir));

// Multer setup for image uploads (specifically for animals)
const animalImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads/animals' folder is used
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use a unique filename with timestamp to avoid collisions
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadAnimalImage = multer({
  storage: animalImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single('image');

// MongoDB Connection (Make sure to use your own DB URI)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Category Model
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);
const Category = mongoose.model('Category', categorySchema);

// Animal Model (Removed 'description' field as per the requirement)
const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);
const Animal = mongoose.model('Animal', animalSchema);

// Controllers

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Add a category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

// Get all animals
const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('category');
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching animals', error });
  }
};

// Add an animal
const addAnimal = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const image = req.file ? `/uploads/animals/${req.file.filename}` : null;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const newAnimal = new Animal({
      name,
      image,
      category: category._id,
    });

    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ message: 'Error adding animal', error });
  }
};

// Delete an animal
const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    await Animal.findByIdAndDelete(id);
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting animal', error });
  }
};

// Routes

// Category Routes
app.get('/api/categories', getCategories);
app.post('/api/categories', addCategory);
app.delete('/api/categories/:id', deleteCategory);

// Animal Routes
app.get('/api/animals', getAnimals);
app.post('/api/animals', uploadAnimalImage, addAnimal); // Use uploadAnimalImage as middleware
app.delete('/api/animals/:id', deleteAnimal);

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
