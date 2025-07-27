import s from "../../App.module.css";
export const Form = ({ onFormSubmit, onInputChange, refButton }) => {
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          className={s.inputTask}
          onChange={onInputChange}
          type="text"
          name="search"
          placeholder="Поиск задачи..."
        />{" "}
        <button ref={refButton} style={{ border: "none" }} type="submit">
          {" "}
          🔍
        </button>
      </form>
    </>
  );
};
