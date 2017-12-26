import getVersion from '../common';

const test = () => {
  console.log(`You invoked b@${getVersion().b}`);
};

const testAlert = () => alert('b1');

export default test;

export {
  testAlert,
}
