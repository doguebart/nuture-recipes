const Recipe = require("../models/Recipe");

const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose");

module.exports = class RecipeController {
  static async create(req, res) {
    const {
      name,
      description,
      ingredients,
      preparationMode,
      level,
      preparationTime,
    } = req.body;

    const image = req.files;

    if (
      !name &&
      !description &&
      !ingredients &&
      !preparationMode &&
      !level &&
      !preparationTime &&
      !image
    ) {
      res.status(422).json({
        message: "Preencha todos os campos antes de continuar!",
      });
      return;
    }

    if (!name) {
      res.status(422).json({
        message: "Informe o nome da receita antes de continuar!",
      });
      return;
    }

    if (!description) {
      res.status(422).json({
        message: "Informe a descrição da receita antes de continuar!",
      });
      return;
    }

    for (const ingredient of ingredients) {
      if (!ingredient.name || !ingredient.qty || !ingredient.unit) {
        res.status(422).json({
          message:
            "Preencha todas as informações dos ingredientes antes de continuar!",
        });
        return;
      }
    }

    for (const step of preparationMode) {
      if (!step.stepNumber || !step.stepDescription) {
        res.status(422).json({
          message:
            "Preencha todas as informações do modo de preparo antes de continuar!",
        });
        return;
      }
    }

    if (!level) {
      res.status(422).json({
        message:
          "Informe o nível de dificuldade de criação da receita antes de continuar!",
      });
      return;
    }

    if (!preparationTime) {
      res.status(422).json({
        message: "Informe o tempo de preparo da receita antes de continuar!",
      });
      return;
    }

    if (!image) {
      res.status(422).json({
        message: "Adicione uma imagem à receita antes de continuar!",
      });
      return;
    }

    // Recipe owner
    const token = getToken(req);
    const owner = await getUserByToken(token);

    const recipe = new Recipe({
      name,
      description,
      ingredients,
      preparationMode,
      level,
      preparationTime,
      image,
      user: {
        _id: owner.id,
        name: owner.name,
        email: owner.email,
      },
    });

    try {
      const newRecipe = await recipe.save();

      res.status(201).json({
        message: "Receita criada com sucesso!",
        newRecipe,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getAllRecipes(req, res) {
    const recipes = await Recipe.find().sort("-createdAt");

    res.status(200).json({
      recipes,
    });
  }

  static async myRecipes(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const recipes = await Recipe.find({ "user._id": user.id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      recipes,
    });
  }

  static async getRecipeById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValidObjectId(id)) {
      res.status(422).json({
        message: "O ID é inválido!",
      });
      return;
    }

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      res.status(404).json({
        message: "Este receita não está disponível!",
      });
      return;
    }

    res.status(200).json({
      recipe,
    });
  }

  static async editRecipe(req, res) {
    const id = req.params.id;

    const {
      name,
      description,
      ingredients,
      preparationMode,
      level,
      preparationTime,
    } = req.body;

    const image = req.files;

    const updatedData = {};

    if (!ObjectId.isValidObjectId(id)) {
      res.status(422).json({
        message: "O ID é inválido!",
      });
      return;
    }

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      res.status(404).json({
        message: "Esta receita não está disponível!",
      });
      return;
    }

    // Check if logged in user registered the recipe
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (recipe.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Ocorreu um erro ao processar sua solicitação! Tente novamente mais tarde.",
      });
      return;
    }

    if (
      !name &&
      !description &&
      !ingredients &&
      !preparationMode &&
      !level &&
      !preparationTime &&
      !image
    ) {
      res.status(422).json({
        message: "Preencha todos os campos antes de continuar!",
      });
      return;
    }

    if (!name) {
      res.status(422).json({
        message: "Informe o nome da receita antes de continuar!",
      });
      return;
    }

    if (!description) {
      res.status(422).json({
        message: "Informe a descrição da receita antes de continuar!",
      });
      return;
    }

    for (const ingredient of ingredients) {
      if (!ingredient.name || !ingredient.qty || !ingredient.unit) {
        res.status(422).json({
          message:
            "Preencha todas as informações dos ingredientes antes de continuar!",
        });
        return;
      }
    }

    for (const step of preparationMode) {
      if (!step.stepNumber || !step.stepDescription) {
        res.status(422).json({
          message:
            "Preencha todas as informações do modo de preparo antes de continuar!",
        });
        return;
      }
    }

    if (!level) {
      res.status(422).json({
        message:
          "Informe o nível de dificuldade de criação da receita antes de continuar!",
      });
      return;
    }

    if (!preparationTime) {
      res.status(422).json({
        message: "Informe o tempo de preparo da receita antes de continuar!",
      });
      return;
    }

    if (image && image.length > 0) {
      updatedData.image = image;
    }

    updatedData.name = name;
    updatedData.description = description;
    updatedData.ingredients = ingredients;
    updatedData.preparationMode = preparationMode;
    updatedData.level = level;
    updatedData.preparationTime = preparationTime;

    try {
      await Recipe.updateOne({ _id: id }, updatedData);
      res.status(200).json({
        message: "Receita atualizada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar a receita. Tente novamente mais tarde.",
      });
    }
  }

  static async deleteRecipe(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValidObjectId(id)) {
      res.status(422).json({
        message: "O ID é inválido!",
      });
      return;
    }

    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      res.status(404).json({
        message: "Esta receita não está disponível!",
      });
      return;
    }

    // Check if logged in user registered the recipe
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (recipe.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Ocorreu um erro ao processar sua solicitação! Tente novamente mais tarde.",
      });
      return;
    }

    await recipe.deleteOne({ _id: id });

    res.status(200).json({
      message: "Receita removida com sucesso!",
    });
  }
};
