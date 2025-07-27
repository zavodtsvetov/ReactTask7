import {
  AddButton,
  RemindButton,
  DeleteButton,
  SortButton,
} from "./components/Buttons";

export const AllButtons = ({ isTomorrow }) => {
  return (
    <>
      {!isTomorrow ? (
        <>
          {" "}
          <AddButton />
          <br />
          {<RemindButton />}
          <br />
          <DeleteButton />
          <br />
          <SortButton />
        </>
      ) : (
        <SortButton />
      )}
    </>
  );
};
