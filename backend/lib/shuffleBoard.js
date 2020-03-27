
const shuffle = (array, length = 3) => {
  const random = [...array].sort(() => Math.random() - 0.5);
  return random.slice(0, length);
};

module.exports = shuffle;
