const Joi = require('joi');
function validateArticle(bean) {
  const schema = Joi.object({
    company_id: Joi.number().integer().required(),
    articleCode: Joi.string().min(5).max(150).required(),
    articleName: Joi.string().min(5).max(150).required(),
    brand_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
    gender_id: Joi.number().integer().required(),
    articleType_id: Joi.number().integer().required(),
    sizes:Joi.array().items(Joi.string()),
    colors:Joi.array().items(Joi.string()),
    mrps:Joi.array().items(Joi.number()),
    prices:Joi.array().items(Joi.number()),
    imageUrls:Joi.array().items(Joi.string()),
    stockKeepingUnits:Joi.array().items(Joi.string()),
    barcodes:Joi.array().items(Joi.number().integer()),
    barcodeViews:Joi.array().items(Joi.string()),
  });
  return schema.validate(bean);
}
function validateArticleForUpdate(bean) {
    const schema = Joi.object({
      company_id: Joi.number().integer().required(),
      articleCode: Joi.string().min(5).max(150).required(),
      articleName: Joi.string().min(5).max(150).required(),
      brand_id: Joi.number().integer().required(),
      category_id: Joi.number().integer().required(),
      gender_id: Joi.number().integer().required(),
      articleType_id: Joi.number().integer().required(),
      childids:Joi.array().items(Joi.number()),
      sizes:Joi.array().items(Joi.string()),
      colors:Joi.array().items(Joi.string()),
      mrps:Joi.array().items(Joi.number()),
      prices:Joi.array().items(Joi.number()),
      imageUrls:Joi.array().items(Joi.string()),
      stockKeepingUnits:Joi.array().items(Joi.string()),
      barcodes:Joi.array().items(Joi.number().integer()),
      barcodeViews:Joi.array().items(Joi.string()),
    });
    return schema.validate(bean);
  }
function validateArticleChild(bean) {
    const schema = Joi.object({
        article_id: Joi.number().integer().required(),
        size: Joi.string().min(5).max(150).required(),
        color: Joi.string().min(5).max(150).required(),
        mrp: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
        stockKeepingUnit: Joi.string().min(5).max(150).required(),
        barcode: Joi.string().min(5).max(150).required(),
        barcodeView: Joi.string().min(5).max(500).required(),
    });
    return schema.validate(bean);
}
exports.validate = validateArticle;
exports.validateArticleForUpdate = validateArticleForUpdate;
exports.validateChild = validateArticleChild;