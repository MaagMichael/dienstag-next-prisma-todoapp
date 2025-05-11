"use client";

// import { DeleteTasks,ToggleTasks } from "@/actions/actions";

interface Task {
  _id: string;
  taskname: string;
  status: boolean;
  datecreated: string;
  datelastedit: string;
}

import { useState } from "react";
import EditButton from "@/components/EditButton";

export default function BoxTask(item:Task) {
  const [isChecked, setIsChecked] = useState(item.status);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    // await ToggleTasks(item._id);
  };

  return (
    <div className="flex justify-between mt-4 p-4 border border-gray-300  rounded-md">
      
      <div className="flex">
        <input
          onChange={handleCheckboxChange}
          type="checkbox"
          className="mr-4"
          checked={isChecked}
        />
        <h2 className={`${isChecked ? "line-through text-gray-500" : ""}`}>
          {item.taskname}
        </h2>
      </div>

      <div>
        <EditButton {...item} />
        <button className="" 
        // onClick={() => DeleteTasks(item._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
