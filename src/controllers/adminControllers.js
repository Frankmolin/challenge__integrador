const Producto = require('../models/product');

const adminControllers = {
  getAllProducts: async (req, res) => {
    try {
      const productos = await Producto.findAll();
      if (!productos || productos.length === 0) {
        console.log('No se encontraron productos');
      }
      res.render('admin/admin', { productos: productos, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo productos');
    }
  },


  showCreateProduct: async (req, res) => {
    const categorias = await Producto.findAll({
      attributes: ['categoria'],
      group: ['categoria'],
    });

    const categoriasUnicas = categorias.map((categoria) => categoria.categoria);
    res.render('admin/create', { user: req.session.user, categorias: categoriasUnicas });
  },

  createProduct: async (req, res) => {

    try {
      const { nombre, imagen, precio, categoria, } = req.body;
      const nuevoProducto = await Producto.create({
        nombre,
        imagen,
        precio,
        categoria,

      });
     
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creando el producto');
    }
  },
  showEdit: async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    res.render('admin/edit', { producto, user: req.session.user });
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id);
      const categorias = await Producto.findAll({
        attributes: ['categoria'],
        group: ['categoria'],
      });
  
      const categoriasUnicas = categorias.map((categoria) => categoria.categoria);
      res.render('admin/edit', { categorias:categorias,producto, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo el producto para editar');
    }
  },

  update: async (req, res) => {
    try {
      const { nombre, imagen, precio, categoria } = req.body;
      const updateValues = {};
      if (nombre) updateValues.nombre = nombre;
      if (imagen) updateValues.imagen = imagen;
      if (precio) updateValues.precio = precio;
      if (categoria) updateValues.categoria = categoria;

      const { id } = req.body;
      await Producto.update(updateValues, { where: { id } });
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error actualizando el producto');
    }
  },


  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      await Producto.destroy({ where: { id } });
      res.redirect('/admin');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error eliminando el producto: ${error.message}`);
    }
  }


};

module.exports = adminControllers;
