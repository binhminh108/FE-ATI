const TaskSelector = ({ taskType, setTaskType }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Chọn loại bài viết
    </h2>
    <div className="flex space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="task"
          value="task1"
          className="text-teal-600 focus:ring-teal-500"
          checked={taskType === "task1"}
          onChange={() => setTaskType("task1")}
        />
        <span className="ml-2 text-gray-700">Task 1 - Chart/Graph</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="task"
          value="task2"
          className="text-teal-600 focus:ring-teal-500"
          checked={taskType === "task2"}
          onChange={() => setTaskType("task2")}
        />
        <span className="ml-2 text-gray-700">Task 2 - Essay</span>
      </label>
    </div>
  </div>
);

export default TaskSelector;
