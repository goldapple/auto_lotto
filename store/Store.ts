import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';
import reducer from './Lotto';

const configStore = () => {
  return createStore(reducer);
};

const wrapper = createWrapper(configStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
