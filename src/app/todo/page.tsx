import CreateTask from "@/components/CreateTask";
import RenderTasks from "@/components/RenderTasks";

export default function Home() {
  return (
    <>
      <div className="bg-pinky w-full h-[18vh] text-center">
      </div>
      <div className="max-w-lg mx-auto">
        <CreateTask />
        <RenderTasks />
      </div>
    </>
  );
}
