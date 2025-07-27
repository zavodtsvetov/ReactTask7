import { useContext } from "react";
import { AppContext } from "../../../context";
import s from "../../../App.module.css";

export const AddButton = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      onClick={() =>
        dispatch({
          type: "ADD_TASK",
          payload: "Пойти в кино",
        })
      }
      className={s.buttonShowAll}
    >
      Добавить дело через payload
    </button>
  );
};

export const RemindButton = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      onClick={() =>
        dispatch({
          type: "CHANGE_TASK",
          payload: "Создать договор аренды",
        })
      }
      className={s.buttonShowAll}
    >
      Изменить содержание второй задачи
    </button>
  );
};

export const DeleteButton = () => {
  const { isDeleted, dispatch } = useContext(AppContext);
  return (
    <button
      onClick={() =>
        dispatch({
          type: "DELETE_TASK",
          payload: 5,
        })
      }
      disabled={isDeleted}
      className={isDeleted ? s.sortedButton : s.buttonShowAll}
    >
      {isDeleted ? "Удалено" : "Удалить задачу по payload-номеру"}
    </button>
  );
};

export const SortButton = () => {
  const { onHandleSort, isSorted } = useContext(AppContext);
  return (
    <button
      disabled={isSorted ? true : false}
      onClick={onHandleSort}
      className={isSorted ? s.sortedButton : s.buttonShowAll}
    >
      {isSorted ? "Отсортировано" : "Сортировать по алфавиту"}
    </button>
  );
};
