import { useContext } from "react";
import { ToDoListsContext } from "../../../context";

export const DateButtons = () => {
  const { onChangeTodayToDoList, onChangeTomorrowToDoList } =
    useContext(ToDoListsContext);

  return (
    <>
      <button
        style={{ background: "green", marginRight: "20px" }}
        onClick={onChangeTomorrowToDoList}
      >
        Открыть задачи на завтра
      </button>
      <button
        style={{ background: "yellow", marginRight: "20px" }}
        onClick={onChangeTodayToDoList}
      >
        Открыть задачи на сегодня
      </button>
    </>
  );
};
