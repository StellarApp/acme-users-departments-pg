const uuid = require("uuid");
const pg = require("pg");
const faker = require("faker");

const client = pg.client("postgres://localhost/acme.db");

client.connect();

const dep_id1 = uuid.v4();
const dep_id2 = uuid.v4();
const dep_id3 = uuid.v4();
const dep_id3 = uuid.v4();

const generateUser = () => {
  const user = {};
  user.id = uuid.v4();
  user.name = faker.name.findName();
  user.bio = faker.lorem.sentence();
};

const user1 = generateUser();
const user2 = generateUser();
const user3 = generateUser();
const user4 = generateUser();

const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS department;

    CREATE TABLE department(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
    );

    CREATE TABLE users(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        department_id UUID REFERENCES department(id)
    );

    INSERT INTO department(id, name) VALUES('${dep_id1}', 'HR');
    INSERT INTO department(id, name) VALUES('${dep_id2}', 'SALES');
    INSERT INTO department(id, name) VALUES('${dep_id3}', 'MARKETING');
    INSERT INTO department(id, name) VALUES('${dep_id4}', 'IT');

    INSERT INTO users(id, name, department) VALUES('${user1.id}', '${user1.name}', '${user1.bio}', '${dep_id1}');
    INSERT INTO users(id, name, department) VALUES('${user2.id}', '${user2.name}', '${user2.bio}', '${dep_id2}');
    INSERT INTO users(id, name, department) VALUES('${user3.id}', '${user3.name}', '${user3.bio}', '${dep_id3}');
    INSERT INTO users(id, name, department) VALUES('${user4.id}', '${user4.name}', '${user4.bio}', '${dep_id4}');

`;

const sync = async () => {
  await client.query(SQL);
};

module.exports = {
  sync
};
