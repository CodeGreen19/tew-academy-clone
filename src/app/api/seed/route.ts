import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function GET() {
  const dummyData = [];
  for (let index = 0; index < 50; index++) {
    const data = {
      name: faker.person.fullName(),
      institutionName: faker.company.name(),
      address: faker.location.city(),
    };
    dummyData.push(data);
  }
  //   await db.insert(applyBranches).values(dummyData);
  return NextResponse.json({ status: true });
}
