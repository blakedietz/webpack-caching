import getVersion from '../common';

const test = () => {
  console.log(`You invoked a@${getVersion().a}`);
};

const testAlert = () => alert('a3');

export default test;

export {
  testAlert,
}
