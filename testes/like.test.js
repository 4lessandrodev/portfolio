const mongoose = require('mongoose');
const likeController = require('./../controllers/LikeController');

const initDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/nodeapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Database connected');
};

beforeEach(() => initDatabase());


test('Deve retornar like não permitido', async () => {
  let data = {
    param: { id: '' },
    body: {
      
    }
  };

  let result = await likeController.store(data);

  expect(result.error.msg).toBe('Projeto sem um id');
});

