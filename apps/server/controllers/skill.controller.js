const db = require("../models");
const Skill = db.skill;

// Create and Save a new skill
exports.addSkill = (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Skill
    const skill = new Skill({
      name: req.body.name,
    });
    // Save Skill in the database
    skill
      .save(skil)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the Skill."
        });
      });
  
  };

  // Retrieve all skills from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Skill.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skills."
        });
      });
  
  };