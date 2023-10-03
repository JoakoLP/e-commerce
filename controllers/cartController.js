const { User } = require("../models/user");
const { Product } = require("../models/product");
const { tokenVerify } = require("../utils/jwt");

const cartSave = async (user, newCart, req) => {
  try {
    user.cart = { ...newCart };
    await User.findByIdAndUpdate(user._id, { cart: user.cart });
    req.session.user = {
      ...user,
      cart: user.cart,
    };
  } catch (error) {
    console.log(error);
  }
};

class CartController {
  async getCart(req, res) {
    try {
      const decoded = tokenVerify(req.token);
      console.log(decoded);

      const user = await User.findById(decoded.body._id);
      res.json(user?.cart);
    } catch (error) {
      res.json(error);
    }
  }

  async addToCart(req, res) {
    try {
      const decoded = tokenVerify(req.token);
      // console.log(decoded);

      const user = await User.findById(decoded.body._id);
      if (user) {
        const product = await Product.findOne({ prod_id: req.params.id });
        // console.log({ newItem: { ...product } });

        const { img, name, price, prod_id } = product.toObject();
        const newItem = { img, name, price, prod_id };

        const cart = user.cart;
        let itemInCart = cart.products.find((item) => item.prod_id === newItem.prod_id);
        const newCart = itemInCart
          ? {
              ...cart,
              products: cart.products.map((item) => (item.prod_id === newItem.prod_id ? { ...item, quantity: item.quantity + 1 } : item)),
              total: parseFloat(cart.total) + parseFloat(newItem.price),
              count: parseFloat(cart.count) + 1,
            }
          : {
              ...cart,
              products: [...cart.products, { ...newItem, quantity: 1 }],
              total: parseFloat(cart.total) + parseFloat(newItem.price),
              count: parseFloat(cart.count) + 1,
            };
        await cartSave(user, newCart, req, res);
        res.status(201).json({
          msg: `Product: ${req.params.id} added to cart.`,
          cart: newCart,
        });
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      res.json(error);
    }
  }

  async deleteFromCart(req, res) {
    try {
      const decoded = tokenVerify(req.token);

      const user = await User.findById(decoded.body._id);
      if (user) {
        const id = parseFloat(req.params.id);
        const cart = user.cart;

        let itemToDelete = cart.products.find((item) => item.prod_id === id);

        const newCart =
          itemToDelete.quantity > 1
            ? {
                ...cart,
                products: cart.products.map((item) =>
                  item.prod_id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                      }
                    : item
                ),
                total: parseFloat(cart.total) - parseFloat(itemToDelete.price),
                count: parseFloat(cart.count) - 1,
              }
            : {
                ...cart,
                products: cart.products.filter((item) => item.prod_id != id),
                total: parseFloat(cart.total) - parseFloat(itemToDelete.price),
                count: parseFloat(cart.count) - 1,
              };

        await cartSave(user, newCart, req, res);

        res.status(201).json({
          msg: `Product: ${req.params.id} removed from cart.`,
          cart: newCart,
        });
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      res.json(error);
    }
  }

  async deleteAllItems(req, res) {
    try {
      const decoded = tokenVerify(req.token);

      const user = await User.findById(decoded.body._id);
      if (user) {
        const id = parseFloat(req.params.id);
        const cart = user.cart;

        let itemToDelete = cart.products.find((item) => item.prod_id === id);
        let itemToDeletePrice = itemToDelete.price * itemToDelete.quantity;

        const newCart = {
          ...cart,
          products: cart.products.filter((item) => item.prod_id !== id),
          total: parseFloat(cart.total) - itemToDeletePrice,
          count: parseFloat(cart.count) - parseFloat(itemToDelete.quantity),
        };
        await cartSave(user, newCart, req, res);

        res.status(201).json({
          msg: `Product: ${req.params.id} removed from cart.`,
          cart: newCart,
        });
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      res.json(error);
    }
  }

  async clearCart(req, res) {
    const clearCart = {
      products: [],
      total: 0,
      count: 0,
    };
    try {
      const decoded = tokenVerify(req.token);

      const user = await User.findById(decoded.body._id);
      if (user) {
        await cartSave(user, clearCart, req);
        res.json({
          msg: `User "${user._id}" cart cleared.`,
          cart: clearCart,
        });
      } else {
        res.send("User not found.");
      }
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new CartController();
