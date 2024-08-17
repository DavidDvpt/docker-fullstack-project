import encodeFunc from "../src/lib/auth/bcryptTools";
import client from "../src/lib/prisma/dbClient";
import { createEntity } from "../src/lib/prisma/genericCrud";

const users = [
  {
    email: "appmail@gmail.com",
    password: encodeFunc("david"),
    firstname: "admin",
    lastname: "site",
  },
];

async function createUser() {
  const userCount = await client.user.count();

  if (userCount === 0) {
    const pwd = await encodeFunc("david");
    const user = { ...users[0], password: pwd };
    await createEntity("user", user);
  }
}

createUser();
