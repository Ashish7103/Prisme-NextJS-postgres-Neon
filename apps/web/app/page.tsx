import { PrismaClient } from '@repo/prisma/dist/index.js';

const client = new PrismaClient();

export default async function Home() {
  const user=await client.user.findFirst();
  return (
   <div>
{user?.username}
{user?.password}
   </div>
  );
}
