const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');


const collectionPermited = [
    'users',
    'categories',
    'products'
];

const searchUsers = async( filter = '', res = response ) => {
    const isMongoID = ObjectId.isValid( filter );
    if ( isMongoID ) {
        const user = await User.findById(filter);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( filter, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });

}

const searchCategory = async( filter = '', res = response ) => {
    const isMongoID = ObjectId.isValid( filter );
    if ( isMongoID ) {
        const category = await Category.findById(filter);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( filter, 'i' );
    const categories = await Category.find({ name: regex, status: true }).populate('user', 'name');

    res.json({
        results: categories
    });

}

const searchProducts = async( filter = '', res = response ) => {
    const isMongoID = ObjectId.isValid( filter );

    if ( isMongoID ) {
        const product = await Product.findById(filter)
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( filter, 'i' );
    const products = await Product.find({ name: regex, status: true }).populate('category','name').populate('user', 'name')

    res.json({
        results: products
    });

}


const search = ( req, res = response ) => {
    const { collection, filter  } = req.params;

    if ( !collectionPermited.includes( collection ) ) {
        return res.status(400).json({
            message: `Error only permitted collection:: ${ collectionPermited }`
        })
    }

    switch (collection) {
        case 'users':
          searchUsers(filter, res);
        break;
        case 'categories':
          searchCategory(filter, res);
        break;
        case 'products':
          searchProducts(filter, res);
        break;

        default:
            res.status(500).json({
                message: 'not filter present'
            })
    }

}



module.exports = {
    search
}