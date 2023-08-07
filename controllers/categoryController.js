const { Category } = require("../models/category");
const { SubCategory } = require("../models/subCategory");

class CategoryController {
  // Category Controllers
  async CategoryAdd(req, res) {
    try {
      let category = await Category.findOne({ id: req.body.id });

      if (!category) {
        category = new Category({
          id: req.body.id,
          name: req.body.name,
          subCategories: req.body.subCategories,
        });
        await category.save();
        res.json({ msg: `Categoría '${req.body.name}' agregada con el id '${req.body.id}'.` });
      } else {
        res.json({ msg: `Categoría con el id: ${req.body.id} ya registrada.` });
      }
    } catch (error) {
      res.json(error);
    }
  }

  async CategoryGet(req, res) {
    try {
      const categoryList = await Category.find({});
      res.json(categoryList);
    } catch (error) {
      res.json(error);
    }
  }

  async CategoryEdit(req, res) {
    try {
      await Category.findByIdAndUpdate(req.body._id, { ...req.body.category });
      const updatedCategory = await Category.findById(req.body._id);
      res.json({ msg: `${req.body._id} updated.`, updatedCategory });
    } catch (error) {
      res.json(error);
    }
  }

  async CategoryDel(req, res) {
    try {
      await Category.findByIdAndDelete(req.query.id);
      res.json({ msg: `Categoría con id ${req.body.id} eliminada.` });
    } catch (error) {
      res.json(error);
    }
  }

  // SubCategory Controllers
  async SubCategoryAdd(req, res) {
    // console.log(req.body);
    try {
      let subCategory = await SubCategory.findOne({ id: req.body.id });
      // console.log(req.body);

      if (!subCategory) {
        try {
          subCategory = new SubCategory({
            id: req.body.id,
            name: req.body.name,
          });
          await subCategory.save();
          res.json({ msg: `SubCategoría '${req.body.name}' agregada con el id '${req.body.id}'.` });
        } catch (error) {
          res.json(error);
        }
      } else {
        res.json({ msg: `SubCategoría con el id: ${req.body.id} ya registrada.` });
      }
    } catch (error) {
      res.json(error);
    }
  }

  async SubCategoryGet(req, res) {
    try {
      const subCategoryList = await SubCategory.find({});
      res.json(subCategoryList);
      console.log(subCategoryList);
    } catch (error) {
      res.json(error);
    }
  }

  async SubCategoryEdit(req, res) {
    try {
      await SubCategory.findByIdAndUpdate(req.body._id, { ...req.body.subCategory });
      const updatedSubCategory = await SubCategory.findById(req.body._id);
      res.json({ msg: `${req.body._id} updated.`, updatedSubCategory });
    } catch (error) {
      res.json(error);
    }
  }

  async SubCategoryDel(req, res) {
    try {
      await SubCategory.findByIdAndDelete(req.query.id);
      res.json({ msg: `SubCategoría con id ${req.query.id} eliminada.` });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = new CategoryController();
