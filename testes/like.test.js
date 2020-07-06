const likeController = require('./../controllers/LikeController');

test('Deve retornar like não permitido', async () => {

  let data = {
    param: { id: '' },
    body: {
      
    }
  };
  
  let result = await likeController.store(data);
  
  expect(result.error.msg).toBe('Projeto sem um id');
});

