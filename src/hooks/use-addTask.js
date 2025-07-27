export const addTask = (onClick, title) => {
  fetch("http://localhost:3005/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: title,
      completed: false,
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
