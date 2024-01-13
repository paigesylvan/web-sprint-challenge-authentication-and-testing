const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  const [id] = await db("users").insert(user, ["id"]);
  return findBy({ id }).first();
}

module.exports = {
  find,
  findBy,
  add,
};
