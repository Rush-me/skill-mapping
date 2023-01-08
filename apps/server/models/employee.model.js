module.exports = mongoose => {
  const schema =
    mongoose.Schema(
      {
        employeeId: String,
        name: String,
        skills: String,
        level: String,
        training: String,
        experience: Number,
        remarks: String
      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Employee = mongoose.model("employees", schema);
  return Employee;
};

// {
//   "name": "Rasmi",
//   "skills": "Angular",
//   "training": "Q1",
//    "level": 4,
//    "remarks": "",
//    "experience": 3
// }
