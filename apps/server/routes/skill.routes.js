module.exports = app => {
    const skill = require("../controllers/skill.controller.js");
    var router = require("express").Router();

    // Create a new Employee
    router.post("/", skill.addSkill);

    router.get("/", skill.findAll);

    app.use('/api/skills', router);
}