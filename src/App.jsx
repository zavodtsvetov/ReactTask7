import s from "./App.module.css";
import { useState, useEffect, useRef } from "react";
import { changeTitle, addTask, deleteTask } from "./hooks/index";
import { Clock } from "./Clocks";
import { AppContext, ToDoListsContext } from "./context";
import { AllButtons } from "./components/all-buttons/AllButtons";
import { DateButtons } from "./components/all-buttons/components/DateButtons";
import { Form } from "./components/Form/Form";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  //внизу просто функция обновления базы данных
  const onClick = () => {
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3005/todos")
        .then((res) => res.json())
        .then((loadedData) => {
          if (loadedData) {
            setIsLoaded(true);
            setToDoList(loadedData);
          }
          setIsLoading(false);
        });
    }, 1500);
  }, [isClicked]);

  const onHandleSort = () => {
    const sorted = [...toDoList];
    sorted.sort((a, b) => (a.title > b.title ? 1 : -1));
    setToDoList(sorted);
    setIsSorted(true);
  };
  // создал второй json сервер, чтобы сымитировать второй день для задач
  const onChangeTomorrowToDoList = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3006/todos")
        .then((res) => res.json())
        .then((loadedData) => {
          if (loadedData) {
            setIsLoaded(true);
            setToDoList(loadedData);
            setIsLoaded(true);
          } else {
            setIsLoaded(false);
          }
          setIsLoading(false);
        });
    }, 1500);
  };
  const onChangeTodayToDoList = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3005/todos")
        .then((res) => res.json())
        .then((loadedData) => {
          if (loadedData) {
            setIsLoaded(true);
            setToDoList(loadedData);
          }
          setIsLoading(false);
        });
    }, 1500);
  };

  const refButton = useRef(null);

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
    Array.prototype.forEach.call(toDoList, (task) => {
      if (target.value.trim() === task.title) {
        setCurrentTask(task.id);
        refButton.current.focus();
      }
    });
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (currentTask) {
      alert(`Номер вашего таска: ${currentTask}`);
    } else {
      alert("Перепроверьте ввод");
    }
  };

  const dispatch = (action) => {
    const { type, payload } = action;
    switch (type) {
      case "ADD_TASK":
        {
          addTask(onClick, payload);
        }
        break;
      case "CHANGE_TASK": {
        changeTitle(onClick, payload);
        break;
      }
      case "DELETE_TASK": {
        deleteTask(onClick, payload, toDoList);
        setIsDeleted(true);

        break;
      }
      default:
    }
  };
  // две переменных передаю в контекст
  const dateOfToDos = {
    onChangeTodayToDoList,
    onChangeTomorrowToDoList,
  };

  const contextFuncs = {
    isSorted,
    isDeleted,
    onHandleSort,
    dispatch,
  };

  return (
    <>
      {!isLoaded ? (
        <p>Данные не загрузились, проверьте url</p>
      ) : (
        <>
          <AppContext.Provider value={contextFuncs}>
            <div className={s.header}>
              {" "}
              {isTomorrow ? "ЗАВТРА" : "СЕГОДНЯ"}{" "}
            </div>
            <span style={{ fontSize: "10px" }}>
              <Clock isTomorrow={isTomorrow} />
            </span>
            {isLoading ? (
              <p>Загрузка..</p>
            ) : (
              <>
                <Form
                  onFormSubmit={onFormSubmit}
                  onInputChange={onInputChange}
                  refButton={refButton}
                />
                <br />
                {toDoList.map(({ id, title }) => (
                  <div key={id}>
                    {id}. {title}
                  </div>
                ))}
                <hr />
                <ToDoListsContext value={dateOfToDos}>
                  <DateButtons />
                </ToDoListsContext>
                <br />
                <hr />
                <AllButtons isTomorrow={isTomorrow} />
              </>
            )}
          </AppContext.Provider>
        </>
      )}
    </>
  );
}

export default App;
