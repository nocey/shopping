import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SearchSet, selectSearch } from "@/redux/slices/search";
import { TextField } from "@mui/material";

function Search() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(SearchSet(e.target.value));
  };

  return (
    <div className="w-full flex justify-start">
      <div className="w-11/12">
        <TextField
          className="bg-white w-full"
          placeholder="Search"
          value={search ?? ""}
          inputProps={{
            "data-testid": "global-search",
          }}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Search;
