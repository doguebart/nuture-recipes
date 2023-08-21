const router = require("express").Router();

const RecipeController = require("../controllers/RecipeController");

// Private routes
const verifyToken = require("../helpers/verify-token");

const { imageUpload } = require("../helpers/image-upload");

router.post(
  "/create",
  verifyToken,
  imageUpload.single("image"),
  RecipeController.create
);
router.get("/", RecipeController.getAllRecipes);
router.get("/myrecipes", verifyToken, RecipeController.myRecipes);
router.get("/:id", RecipeController.getRecipeById);
router.delete("/:id", verifyToken, RecipeController.deleteRecipe);
router.patch("/edit/:id", verifyToken, RecipeController.editRecipe);

module.exports = router;
