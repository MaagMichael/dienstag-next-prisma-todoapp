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
    // orderBy: { username: "desc" },
    include: { tasks: true }
  });

  // console.log("Users in db, with tasks: ", userWithTasks);

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

          {/* {userWithTasks?.[0]?.tasks?.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-sm ${
                    task.completed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))} */}

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
