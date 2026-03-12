const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Para manejar credenciales seguras

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión (Usando variables de entorno o texto directo)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Probar conexión
db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a la BD: ' + err.stack);
        return;
    }
    console.log('✅ Conectado a la Base de Datos con éxito.');
});

// --- RUTAS DE LA API ---

// 1. Obtener todos los registros (GET)
app.get('/api/datos', (req, res) => {
    const query = "SELECT * FROM usr"; // Cambia 'tabla_perros' por tu tabla
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});

