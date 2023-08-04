const { Product } = require("../models/product");
const fs = require("fs");
const path = require("path");
const { appConfig } = require("../config");

class ProductsController {
  async productAdd(req, res) {
    console.log(req.body);
    // let product = await Product.findOne({ id: req.body.id });
    let product = await Product.findOne({ prod_id: { $eq: req.body.prod_id } });
    // console.log(product);
    // console.log(product);

    if (!product) {
      try {
        const product = new Product({
          prod_id: req.body.prod_id,
          name: req.body.name,
          price: req.body.price,
          tags: req.body.tags,
          category: req.body.category,
          subCategory: req.body.subCategory,
          desc: req.body.desc,
          // img: { type: req.body.img.type, data:  "asdasdasdasd" },
          img: { type: req.body.img.type, data: req.body.img.type == "URL" ? req.body.img.data : "" },
          // img: { type: req.body.img.type == "URL" ? "URL" : "File", data: req.body.img.type == "URL" ? req.body.img.data : "" },
          // img: req.body.img.type == "URL" ? { type: "URL", data: req.body.img.data } : { type: "File", data: "" },
          reputation: req.body.reputation,
          brand: req.body.brand,
          color: req.body.color,
        });
        if (req.files[0]) {
          console.log("Hay archivo!");
          // console.log(req.files);
          const { filename } = req.files[0];
          console.log(filename);
          product.setImgUrl(filename);
        } else {
          console.log("No hay archivo!");
        }

        console.log(product);
        await product.save();
        res.json({ msg: `Producto id: ${req.body.prod_id} agregado.` });
      } catch (error) {
        if (req.files[0]) {
          const { filename } = req.files[0];
          if (fs.existsSync("storage/img/products/" + filename)) {
            // console.log("Existe el archivo.");
            fs.unlinkSync("storage/img/products/" + filename, filename);
          }
        }
        console.log(error);
        res.json(error);
      }
    } else {
      if (req.files[0]) {
        const { filename } = req.files[0];
        if (fs.existsSync("storage/img/products/" + filename)) {
          // console.log("Existe el archivo.");
          fs.unlinkSync("storage/img/products/" + filename, filename);
        }
      }
      res.json({ msg: `Producto id: ${req.body.prod_id} ya registrado.`, product });
    }
  }

  async productGet(req, res) {
    try {
      const productList = await Product.find({});
      res.json(productList);
    } catch (error) {
      res.json(error);
    }
  }

  async productEdit(req, res) {
    try {
      const product = { ...req.body.product };
      // console.log(req.body?._id);
      const OldProduct = await Product.findById(req.body?._id);
      if (req.body?.product?.img.type == "URL") {
        product.img.data = req.body?.product?.img.data;
      } else {
        if (req.files[0]) {
          const { filename } = req.files[0];
          const { host, port } = appConfig;
          product.img.data = `${host}:${port}/public/products/${filename}`;
          // product.img = filename;
          // product.setImgUrl(filename);
        }
      }
      if (OldProduct?.img?.data !== product?.img?.data) {
        const filename = path.basename(OldProduct.img?.data);
        // console.log(filename);
        if (fs.existsSync("storage/img/products/" + filename)) {
          // console.log("Existe el archivo.");
          fs.unlinkSync("storage/img/products/" + filename, filename);
        }
      }

      await Product.findOneAndReplace({ _id: req.body?._id }, { ...product });
      const newItem = await Product.findById(req.body._id);

      // console.log(product);
      // console.log(req.body.product.id);
      // console.log(req.body.product.prod_id);
      // console.log(req.body._id);
      // console.log(req.body.product);
      res.json({ msg: `${req.body._id} updated`, newItem });
    } catch (error) {
      res.json(error);
    }
  }

  async productDel(req, res) {
    try {
      // console.log(req.params);
      const product = await Product.findById(req.params.id);
      await Product.findByIdAndDelete(req.params.id).then((res) => {
        // console.log(product.img);
        const filename = path.basename(product.img?.data);
        // console.log(filename);
        if (fs.existsSync("storage/img/products/" + filename)) {
          // console.log("Existe el archivo.");
          fs.unlinkSync("storage/img/products/" + filename, filename);
        }
        // else {
        //   console.log("No existe el archivo.");
        // }
        // res.json({ msg: `${req.params.id} deleted.` });
        res.json({ msg: `${product._id} deleted` });
      });
    } catch (error) {
      res.json(error);
    }
  }

  async productSearch(req, res) {
    try {
      const searchField = req.query.srch.toString();
      const searchCateg = req.query.ctg.toString();

      const productList = await Product.find({});

      // console.log(searchCateg);
      // console.log(searchField);
      const searchWords = searchField.split(" ");

      let filterArray = productList.filter((item) => {
        return searchWords.every((word) => item.name.toLowerCase().includes(word.toLowerCase()));
      });

      let filterTag = productList.filter((item) => {
        return searchWords.every((word) => item.tags?.toString().toLowerCase().includes(word.toLowerCase()));
      });
      // productList.filter((item) => {
      //   return item.tags?.toString().toLowerCase().includes(searchField.toLowerCase());
      // });
      if (filterTag.length > 0) {
        filterTag.forEach((item) => {
          const check = filterArray.includes(item);
          if (!check) {
            filterArray.push(item);
          }
        });
      }

      if (searchCateg != "all") {
        const filterArrayCat = filterArray.filter((item) => {
          return item.category === searchCateg;
        });
        // console.log(filterArrayCat);
        filterArray = filterArrayCat;
      }

      res.json(filterArray);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new ProductsController();
