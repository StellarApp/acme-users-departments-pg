const uuid = require("uuid");
const pg = require("pg");
const faker = require("faker");
const { Client } = pg;

const client = new Client("postgres://localhost/acme_db");

client.connect();

const dep_id1 = uuid.v4();
const dep_id2 = uuid.v4();
const dep_id3 = uuid.v4();
const dep_id4 = uuid.v4();

const generateUser = () => {
  const user = {};
  user.id = uuid.v4();
  user.name = faker.name.findName();
  user.bio = faker.lorem.sentence();
  return user;
};

const user1 = generateUser();
const user2 = generateUser();
const user3 = generateUser();
const user4 = generateUser();
const user5 = generateUser();

const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS departments;

    CREATE TABLE departments(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      bio VARCHAR(255),
      department_id UUID REFERENCES departments(id)
    );

    INSERT INTO departments(id, name) VALUES('${dep_id1}', 'HR');
    INSERT INTO departments(id, name) VALUES('${dep_id2}', 'SALES');
    INSERT INTO departments(id, name) VALUES('${dep_id3}', 'MARKETING');
    INSERT INTO departments(id, name) VALUES('${dep_id4}', 'IT');

    INSERT INTO users(id, name, bio, department_id) VALUES('${user1.id}', '${user1.name}', '${user1.bio}', '${dep_id1}');
    INSERT INTO users(id, name, bio, department_id) VALUES('${user2.id}', '${user2.name}', '${user2.bio}', '${dep_id3}');
    INSERT INTO users(id, name, bio, department_id) VALUES('${user3.id}', '${user3.name}', '${user3.bio}', '${dep_id2}');
    INSERT INTO users(id, name, bio, department_id) VALUES('${user4.id}', '${user4.name}', '${user4.bio}', '${dep_id4}');
    INSERT INTO users(id, name, bio) VALUES('${user5.id}', '${user5.name}', '${user5.bio}');

    `;

const sync = async () => {
  await client.query(SQL);
  console.log("success");
};

const findAllUsers = async () => {
  return (await client.query(`SELECT * FROM users;`)).rows;
};

const findAllDepartments = async () => {
  return (await client.query(`SELECT * FROM departments;`)).rows;
};

module.exports = {
  sync,
  findAllDepartments,
  findAllUsers
};
