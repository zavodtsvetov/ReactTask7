export const deleteTask = (onClick, numOfTask) => {
  if (numOfTask)
    fetch(`http://localhost:3005/todos/${numOfTask}`, {
      method: "DELETE",
    })
      .then((rawResp) => rawResp.json())
      .then(alert(`Задача ${numOfTask} удалена`));
  onClick();
};
