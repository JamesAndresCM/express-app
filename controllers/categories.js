const { response } = require('express');
const Category = require('../models/category');

const createCategory = async (req, res = response) => {
  const name = req.body.name;
  const category = await Category.find({"name": name.toLowerCase(), status: true})
  if ( category.length == 0 ){
    let data = {
      name,
      user: req.user._id
    }
    const category = new Category(data);
    await category.save()

    res.status(201).json({
      category,
      message: 'Category created sucessfully'
    })
  } else {
    res.status(200).json({
      message: `Category ${name} already exists`
    })
  }
}

const allCategories = async (req, res = response) => {
  const { limit = 5, next = 0 } = req.query;
  const query = { status: true }
  const [ categories, total_elements ] = await Promise.all([
    Category.find(query).populate('user', 'name').skip(Number(next)).limit(Number(limit)),
    Category.countDocuments(query)
  ]);
  res.json({
    categories,
    total_elements
  });
}

const showCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.find({"_id": id, status: true}).populate('user', 'name')
  res.json({
    category
  });
}

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toLowerCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true});
  res.json({
    message: 'update category successfully',
    category
  });
}

const destroyCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, { status: false}, {new: true})
  res.json({
    message: 'Category destroy successfully',
    category
  });
}

module.exports = {
  createCategory,
  allCategories,
  showCategory,
  updateCategory,
  destroyCategory
}
