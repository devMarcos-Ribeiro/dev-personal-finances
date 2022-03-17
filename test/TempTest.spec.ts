test('it should be ok', () => {
  const user = {
    name: 'Marcos',
  };

  user.name = 'Maquinhos';

  expect(user.name).toEqual('Maquinhos');
});
