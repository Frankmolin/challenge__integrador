
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const authControllers = {
  login: (req, res) => {
    res.render('auth/login', { title: 'Página de inicio de sesión',user: req.session.user });
  },

  processLogin: (req, res) => {
    const { email, contraseña } = req.body;

    User.findOne({ where: { email: email } })
      .then(async user => {
        if (!user) {
          return res.send('Usuario no registrado');
        }



        await bcrypt.compare(contraseña, user.contraseña, (error, match) => {
          if (error) {
            return res.send('Error al verificar la contraseña');
          }

          if (match) {
            
            req.session.user = user.id;
            return res.redirect('/');
          } else {
            return res.send('Contraseña incorrecta');
          }
        });
      })
      .catch(error => {
        res.send('Error al consultar la base de datos');
      });
  },
  register: (req, res) => {
    res.render('auth/register', { title: 'Página de registro',user: req.session.user });
  },

  processRegister: async (req, res) => {
    try {
      const { email, contraseña, repitaContraseña, nombre, apellido } = req.body;

      if (!email || !contraseña || !repitaContraseña || !nombre || !apellido) {
        return res.status(400).send('Todos los campos son requeridos');
      }

      if (contraseña !== repitaContraseña) {
        return res.status(400).send('Las contraseñas no coinciden');
      }

      const userExists = await User.findOne({ where: { email: email } });
      if (userExists) {
        return res.status(400).send('El email ya está registrado');
      }

      let user=await User.create({
        email,
        contraseña,
        nombre,
        apellido
      });
      req.session.user = user.id;

      res.redirect('/');
    } catch (error) {
      console.error('Error al procesar el registro:', error);
      res.status(500).send('Error al registrar al usuario');
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
          return console.log(err);
      }
      res.redirect('/');
  });
  }

};

module.exports = authControllers;