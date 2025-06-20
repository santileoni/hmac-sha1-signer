import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

app.post('/api/sign', (req, res) => {
  const { baseString, signingKey } = req.body;
  if (!baseString || !signingKey) {
    return res.status(400).json({ error: 'Missing baseString or signingKey' });
  }

  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  res.json({ signature });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Signer API running on port ${PORT}`));
