const db = require("../models");

const Employee = db.employees;

// Create and Save a new employee
exports.add = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a employee
  const employee = new Employee({
    name: req.body.name,
    employeeId: req.body.employeeId,
    remarks: req.body.remarks,
    skills: req.body.skills,
    training: req.body.training ? req.body.training : '',
    level: req.body.level ? req.body.level : 0,
    experience: req.body.experience ? req.body.experience : 0
  });
  // Save employee in the database
  employee
    .save(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });

};

// Retrieve all employees from the database using conditions.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const skills = req.query.skills;
  const level = req.query.level;

  let condition = {};
  condition = name ? { $or: [ {name: { $regex: new RegExp(name), $options: "i" }}, { employeeId: { $regex: new RegExp(name), $options: "i" }} ] } : condition;
  condition = skills ? {...condition, skills: { $regex: new RegExp(skills), $options: "i" }} : condition;
  condition = level ? {...condition, level: { $regex: new RegExp(level), $options: "i" }  } : condition;
 
  Employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });

};

// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Employee.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });

};

// Retrieve all employees from the database.
exports.findSkills = (req, res) => {
  const name = req.query.name;
  const training = req.query.training;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" }, training: { $regex: new RegExp(training), $options: "i" } } : {};
  Employee.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });

};

// Update a employee by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
  Employee.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Employees were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all employees."
    });
  });
};
