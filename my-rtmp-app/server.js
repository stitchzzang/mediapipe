import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
