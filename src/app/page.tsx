import Link from "next/link";

import { prisma } from "@/lib/client";

export default async function Home() {
  // read out number of users in db
  const count = await prisma.user.count();
  console.log("Count of User: ", count);

  // Only create a user if none exist
  // if (count === 0) {
  //   try {
  //     const user = await prisma.user.create({
  //       data: {
  //         username: "John Doe",
  //         email: "john.doe@app.com",
  //         password: "123456",
  //       },
  //     });
  //     console.log("Created user:", user);
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   }
  // }

  // Get updated count
  // const updatedCount = await prisma.user.count();
  // console.log("Updated count of User: ", updatedCount);

  // const userfind = await prisma.user.findUnique({
  //   where: {
  //     email: "user1@app.com",
  //   },
  // });
  // console.log("User data by unique email: ", userfind);

  // const usersall = await prisma.user.findMany({
  //   orderBy: {
  //     username: "desc",
  //   },
  //   select: {
  //     id: true,
  //     username: true,
  //     email: true
  //   }
  // });
  // console.log("Users in db, sorted by name: ", usersall);

  // ###########################
  const userWithTasks = await prisma.user.findMany({
    orderBy: { username: "desc" },
    include: { tasks: true },
  });

  console.log(
    "Users in db, with tasks: ",
    JSON.stringify(userWithTasks, null, 2)
  );

  // ########################### add new user with 2 default tasks
  // const userandtasks = await prisma.user.create({
  //   data: {
  //     username: "John Doe",
  //     email: "john.doe@app.com",
  //     password: "123456",
  //   },
  // });

  // await prisma.task.create({
  //   data: {
  //     taskname: "Task 1",
  //     status: false,
  //     userId: {
  //       connect: {
  //         email: user.email,
  //       },
  //     }
  //   },
  // });

  // await prisma.task.create({
  //   data: {
  //     taskname: "Task 2",
  //     status: false,
  //     userId: {
  //       connect: {
  //         email: user.email,
  //       },
  //     }
  //   },
  // });

  // console.log(
  //   "new User in db, with default tasks: ",
  //   JSON.stringify(userandtasks, null, 2)
  // );

  return (
    <>
      <div className="bg-pinky w-full h-[18vh] text-center">
        in Prisma (with Users)
      </div>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          {/* {usersall.map((user) => (
            <div key={user.id} className="mb-4">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Password:</strong> {user.password} 
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
            </div>
          ))} 
          */}

          <Link
            href="/login"
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Go To Login
          </Link>
        </div>
      </div>
    </>
  );
}
