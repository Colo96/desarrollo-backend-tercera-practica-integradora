const BusinessesService = require("./businesses.service");
const OrdersService = require("./orders.service");
const ProductsService = require("./products.service");
const UsersService = require("./users.service");

const businessesService = new BusinessesService();
const ordersService = new OrdersService();
const productsService = new ProductsService();
const usersService = new UsersService();

const getSERVICES = () => {
  return {
    businessesService,
    ordersService,
    productsService,
    usersService,
  };
};

module.exports = getSERVICES;
