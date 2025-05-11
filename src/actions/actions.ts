

// "use server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// const { cookies } = await import("next/headers");

// import { MongoClient, ObjectId } from "mongodb";

// // ################################################## CONNECT TO DB ##################################################

// // Connection function to reuse across all functions
// async function connectToDatabase() {
//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined");
//   }

//   // Create a new promise for the connection
//   const client = new MongoClient(process.env.MONGODB_URI);

//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGODB_URI is not defined");
//     }
//     await client.connect();
//     console.log("Successfully connected to Atlas");
//     // return the client connection to Mongodb Atlas
//     return client;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw new Error("Failed to connect to database");
//   }
// }

// // ################################################## CREATE USER ##################################################
// export async function RegisterUser(formData: FormData): Promise<void> {
//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const User = client.db("todoappDB").collection("users");

//   try {
//     const username = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     // Create a new task document
//     const newUser = {
//       username,
//       email,
//       password,
//     };

//     // Insert the new task into MongoDB
//     await User.insertOne(newUser);

//     console.log("User entry saved successfully");
//     // revalidatePath("/");
//   } catch (error) {
//     console.error("Error saving User entry:", error);
//   } finally {
//     // Close the MongoDB connection, if you are not reusing connections if available (pooling)
//     client.close();
//   }
//   // Redirect to home page
//   redirect("/login");
// }

// // ################################################# LOGIN USER ##################################################

// export async function LoginUser(formData: FormData): Promise<void> {
//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const User = client.db("todoappDB").collection("users");

//   try {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     // Find user with matching email and password
//     const user = await User.findOne({ email, password });

//     // Check if user exists
//     if (user) {
//       const cookieStore = await cookies();

//       // Set cookie with user ID
//       cookieStore.set("userid", user._id.toString(), {
//         path: "/",
//         expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
//         httpOnly: false,
//         secure: true,
//         sameSite: "strict",
//       });

//       console.log("User logged in successfully");
//       // Close connection before redirect
//       await client.close();
//       // Redirect to /todo page
//       redirect("/todo");
//     } else {
//       console.log("Invalid email or password");
//       // Handle invalid login (you might want to return an error or set a status)
//     }
//   } catch (error) {
//     // Only log errors that aren't redirect errors
//     if (!(error instanceof Error && error.message.includes("NEXT_REDIRECT"))) {
//       console.error("Error logging User in:", error);
//     }
//     // Re-throw redirect errors so Next.js can handle them
//     throw error;
//   } finally {
//     // Close the MongoDB connection only if we haven't redirected
//     try {
//       await client.close();
//     } catch (err) {
//       console.error("Error closing MongoDB connection:", err);
//     }
//   }
// }
// // ################################################# LOG OUT USER ##################################################

// export async function LogoutUser(): Promise<void> {
//   const cookieStore = await cookies();

//   // Delete cookie of user ID
//   cookieStore.set("userid", "", {
//     path: "/",
//     expires: new Date(0), // Set to epoch time (past date)
//     httpOnly: false,
//     secure: true,
//     sameSite: "strict",
//   });

//   console.log("User logged out successfully");

//   // Redirect to home page
//   redirect("/");
// }

// // ################################################# READ Cookie USER ##################################################
// interface UserDataSafe {
//   _id: string;
//   username: string;
//   email: string;
// }

// export async function GetCookie(): Promise<UserDataSafe | null> {
//   const cookieStore = await cookies();
//   const userid = cookieStore.get("userid");

//   if (!userid || !userid.value) {
//     return null;
//   }

//   // read out collection users in mongodb and return object data for that specific userid
//   // Connect to the database to retrieve user data
//   const client = await connectToDatabase();
//   const User = client.db("todoappDB").collection("users");

//   try {
//     // Convert the string id to an ObjectId
//     const ID = new ObjectId(userid.value);

//     // Find the user with the matching ID
//     const userData = await User.findOne({ _id: ID });

//     if (!userData) {
//       console.error("User not found for ID:", userid.value);
//       return null;
//     }

//     // Convert MongoDB document to plain object and remove sensitive data
//     const userDataSafe: UserDataSafe = {
//       _id: userData._id.toString(),
//       username: userData.username,
//       email: userData.email,
//       // Intentionally not including password
//     };

//     // return userDataSafe;
//     // console.log(
//     //   "User data retrieved successfully:",
//     //   JSON.parse(JSON.stringify(userDataSafe))
//     // );
//     return JSON.parse(JSON.stringify(userDataSafe));
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return null;
//   } finally {
//     // Close the MongoDB connection
//     client.close();
//   }
// }

// // ################################################# GET ALL TASKS per USERID #################################################
// export async function GetTasks(): Promise<any[]> {
//   const userdata = await GetCookie();
//   // If no user data is found, return empty array
//   if (!userdata) {
//     console.log("No user data found, cannot fetch tasks");
//     return [];
//   }

//   const userData = userdata as UserDataSafe;

//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const Task = client.db("todoappDB").collection("todosusers");

//   try {
//     // Fetch all tasks from the todos collection
//     const tasks = await Task.find({ userId: userData._id }).toArray();

//     // Convert MongoDB documents to plain objects and stringify/parse to remove any non-serializable properties
//     return JSON.parse(JSON.stringify(tasks));
//   } catch (error) {
//     console.error("Error fetching task entries:", error);
//     return [];
//   } finally {
//     // Close the MongoDB connection, if you are not reusing connections if available (pooling)
//     client.close();
//   }
// }
// // ################################################# CREATE TASK per USERID #################################################
// export async function CreateTasks(formData: FormData) {
//   const userdata = await GetCookie();
//   // If no user data is found, return empty array
//   if (!userdata) {
//     console.log("No user data found, cannot fetch tasks");
//     return [];
//   }

//   const userData = userdata as UserDataSafe;

//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const Task = client.db("todoappDB").collection("todosusers");

//   try {
//     // id handled by mongodb
//     const taskname = formData.get("taskname");
//     const status = false;
//     const datecreated = new Date().toISOString();
//     const datelastedit = "";
//     const userId = userData._id; // Use the user ID from the cookie

//     // Create a new task document
//     const newTask = {
//       taskname,
//       status,
//       datecreated,
//       datelastedit,
//       userId,
//     };

//     // Insert the new task into MongoDB
//     await Task.insertOne(newTask);

//     console.log("Task entry saved successfully");
//     revalidatePath("/");
//   } catch (error) {
//     console.error("Error saving task entry:", error);
//   } finally {
//     // Close the MongoDB connection, if you are not reusing connections if available (pooling)
//     client.close();
//   }
// }

// // ################################################# DELETE TASK  #################################################
// export async function DeleteTasks(id: string): Promise<void> {
//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const Task = client.db("todoappDB").collection("todosusers");

//   try {
//     // Convert the string id to an ObjectId
//     const ID = new ObjectId(id);

//     // Find the task
//     const task = await Task.findOne({ _id: ID });

//     if (!task) {
//       console.error("Task not found");
//       return;
//     }

//     // Delete the task with the given id
//     await Task.deleteOne({ _id: ID });

//     console.log("Task entry deleted successfully");
//     revalidatePath("/");
//   } catch (error) {
//     console.error("Error deleting task from database:", error);
//   }
// }
// // ################################################# TOGGLE/UPDATE TASK #################################################

// export async function ToggleTasks(id: string): Promise<void> {
//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const Task = client.db("todoappDB").collection("todosusers");

//   try {
//     // Convert the string id to an ObjectId
//     const ID = new ObjectId(id);

//     // Find the task
//     const task = await Task.findOne({ _id: ID });

//     if (!task) {
//       console.error("Task not found");
//       return;
//     }

//     //   prepare the update task status
//     const updatedata = {
//       $set: {
//         status: !task.status,
//         datelastedit: new Date().toISOString(),
//       },
//     };

//     // update the task
//     await Task.updateOne({ _id: ID }, updatedata);

//     console.log("Task status toggled successfully");
//     revalidatePath("/");
//   } catch (error) {
//     console.error("Error toggling task status in database:", error);
//   }
// }

// // ################################################# EDIT TASK  #################################################
// interface UserData {
//   id: string;
//   taskname: FormDataEntryValue | null;
// }

// export async function EditTasks(data: UserData): Promise<void> {
//   const client = await connectToDatabase();
//   // Get the database and collection on which to run the operation
//   const Task = client.db("todoappDB").collection("todosusers");

//   try {
//     // Convert the string id to an ObjectId
//     const ID = new ObjectId(data.id);

//     // Find the task
//     const task = await Task.findOne({ _id: ID });

//     if (!task) {
//       console.error("Task not found");
//       return;
//     }

//     //   prepare the update task content
//     const updatedata = {
//       $set: {
//         taskname: data.taskname,
//         datelastedit: new Date().toISOString(),
//       },
//     };

//     // Find and update the task
//     await Task.updateOne({ _id: ID }, updatedata);

//     console.log("Task edited successfully");
//     revalidatePath("/");
//   } catch (error) {
//     console.error("Error editing task in database:", error);
//   }
// }
