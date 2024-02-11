const setCartId = (req, res, next) => {
  const getCartIdFromSomeSource = () => {
    if (req.body.cartId) {
      return req.body.cartId;
    }
    if (req.user) {
      return req.user.cartId;
    }
    return null;
  };
  const cartId = getCartIdFromSomeSource();

  req.user = { cartId };
  next();
};

export default setCartId;
