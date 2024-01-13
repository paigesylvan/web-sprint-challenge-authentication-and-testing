/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("users").insert([
      { id: 1, username: "foo1", password: "bar1" },
      { id: 2, username: "foo2", password: "bar2" },
      { id: 3, username: "foo3", password: "bar3" },
    ]);
  };
  