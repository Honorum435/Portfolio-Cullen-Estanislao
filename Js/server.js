const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura tu email y contraseña (mejor usar variables de entorno)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cullenestanislao@gmail.com',
      pass: 'Estara0728'
    }
  });

  const mailOptions = {
    from: email,
    to: 'cullenestanislao@gmail.com',
    subject: `Nuevo mensaje de ${nombre}`,
    text: mensaje
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
});

app.listen(3001, () => {
  console.log('Servidor backend escuchando en puerto 3001');
});