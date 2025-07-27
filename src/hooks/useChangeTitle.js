export const changeTitle = (onClick, title) => {
  fetch(`http://localhost:3005/todos/2`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      userId: 1,
      title: title,
      completed: false,
    }),
  })
    .then((rawResp) => rawResp.json())
    .then(() => onClick());
};
