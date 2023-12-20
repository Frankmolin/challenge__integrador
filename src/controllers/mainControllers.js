const Product = require('../models/product');

const mainControllers = {
  index: async (req, res) => {
    const items = await Product.findAll({ limit: 6});

    res.render('main/index', { title: 'Página de inicio', items, user: req.session.user });
  },
  contact: (req, res) => {
    res.render('main/contact', { title: 'Página de contacto', user: req.session.user });

  },
  about: (req, res) => {
    res.render('main/about', { title: 'Página de about', user: req.session.user });
  },
  faqs: (req, res) => {
    res.render('main/faqs', { title: 'Página de faqs', user: req.session.user });
  }
};

module.exports = mainControllers;



