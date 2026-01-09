const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FILE = './config.json';

/* ROTA PARA BUSCAR CONFIG */
app.get('/config', (req, res) => {
  const data = fs.readFileSync(FILE, 'utf8');
  res.json(JSON.parse(data));
});

/* ROTA PARA ATUALIZAR CONFIG (ADMIN) */
app.post('/config', (req, res) => {
  const { empresa, pix, boleto, senha } = req.body;

  if (senha !== '001533') {
    return res.status(401).json({ error: 'Senha inválida' });
  }

  const novo = { empresa, pix, boleto };
  fs.writeFileSync(FILE, JSON.stringify(novo, null, 2));
  res.json({ success: true });
});

/* PORTA PARA O RENDER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('API rodando na porta', PORT);
});
