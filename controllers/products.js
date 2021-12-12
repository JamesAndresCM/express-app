const { response } = require('express');
const Product = require('../models/product');

const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;
  const name = req.body.name.toLowerCase()
  const product = await Product.find({"name": name, status: true})
  if ( product.length == 0 ){
    let data = {
      ...body,
      name,
      user: req.user._id,
    }
    const product = new Product(data);
    await product.save()

    res.status(201).json({
      product,
      message: 'Product created sucessfully'
    })
  } else {
    res.status(200).json({
      message: `Product ${name} already exists`
    })
  }
}

const allProducts = async (req, res = response) => {
  const { limit = 5, next = 0 } = req.query;
  const query = { status: true }
  const [ products, total_elements ] = await Promise.all([
    Product.find(query).populate('user', 'name').populate('category', 'name').skip(Number(next)).limit(Number(limit)),
    Product.countDocuments(query)
  ]);
  res.json({
    products,
    total_elements
  });
}

const showProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.find({"_id": id, status: true}).populate('user', 'name').populate('category', 'name')
  res.json({
    product
  });
}

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { user, status, ...data } = req.body;

  if ( data.name ){
    data.name = data.name.toLowerCase();
  }
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true});
  res.json({
    message: 'update product successfully',
    product
  });
}

const destroyProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: false}, {new: true})
  res.json({
    message: 'Product destroy successfully',
    product
  });
}

module.exports = {
  createProduct,
  updateProduct,
  destroyProduct,
  allProducts,
  showProduct
}
