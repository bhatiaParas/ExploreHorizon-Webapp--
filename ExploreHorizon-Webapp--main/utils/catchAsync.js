module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

// basically, we return a function that accepts a function and
// then it executes the function, but it catches any errors and
// pass it to next if there is an error
