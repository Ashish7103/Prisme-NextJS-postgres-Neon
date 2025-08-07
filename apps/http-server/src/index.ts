import express from 'express';
import { PrismaClient } from '@repo/prisma/dist/index.js'; // Keep .js only if needed

const client = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hey prisma server is running');
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const user = await client.user.create({
    data: { username, password },
  });

  res.json({
    message: 'User created successfully',
    id: user.id,
  });
});

app.listen(3002, () => console.log('Server running on port 3002'));
