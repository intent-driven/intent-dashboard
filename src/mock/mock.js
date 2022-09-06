import * as Mock from 'mockjs';

Mock.setup({
  timeout: 500
});

export default Mock
  .mock(RegExp('/tmf-api/intent/v4/intent/+'), 'get', () => {
    return require('./data/intentv4detail.json')
  })
  .mock(RegExp('/tmf-api/intent/v4/intent'), 'get', () => {
    return require('./data/intentv4.json')
  });
