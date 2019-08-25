let express = require('express');
router = express.Router();
//alertService = require("./src/app/alert-partners")
/**Api to create article */
router.post('alertpartners', (req, res) => {
    articleService.createArticle(req.body, (data) => {
        res.send(data);
    });
});