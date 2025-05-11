// import { GetTasks, GetCookie } from "@/actions/actions";
import BoxTask from "./BoxTask";
import LogoutButton from "./LogoutButton";

interface Task {
  _id: string;
  taskname: string;
  status: boolean;
  datecreated: string;
  datelastedit: string;
}

interface UserDataSafe {
  _id: string;
  username: string;
  email: string;
}

export default async function RenderTasks() {
  // const taskEntries: Task[] = await GetTasks();
  // const userdata = (await GetCookie()) as UserDataSafe;

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Tasks</h1>
          <h2 className="text-sm font-semibold">
            {/* of User: {userdata.username} ({taskEntries.length} tasks) */}
          </h2>
        </div>

        <LogoutButton />
      </div>

      {/* {taskEntries.map((task) => (
        <BoxTask key={task._id} {...task} />
      ))} */}
    </div>
  );
}
