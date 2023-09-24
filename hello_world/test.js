const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/hello_world";

mongoose.connect(dbUrl);

const db = mongoose.connection;

const join = (people) => {
  const names = people.map((val) => `${val.name} ${val.surname}`)
  return names.join(", ")
}

db.on("error", (err) => console.error(err));
db.once("open", async function () {
  console.log("Connected to data base");
  const PersonSchema = mongoose.Schema({
    name: String,
    surname: String,
  });
  var Person = mongoose.model("Person", PersonSchema, "peopleList");
  let people = await Person.find();
  console.log(
    "People on the list:",
    people.length > 0 ? join(people) : "no people"
  );
  var someone = new Person({ name: "John", surname: "Doe" });
  await someone
    .save()
    .then((person) =>
      console.log(`New person on the list: ${person.name} ${person.surname}`)
    )
    .catch((err) => console.error(err));
  people = await Person.find();
  console.log(
    "People on the list now:",
    people.length > 0 ? join(people) : "no people"
  );
  db.close();
});
