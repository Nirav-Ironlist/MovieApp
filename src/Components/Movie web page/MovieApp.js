import React, { useEffect, useState } from "react";
import "./movieApp.css";
import { useDispatch, useSelector } from "react-redux";
import { fatchMoviesList } from "../../Redux/ImbdApiSlice";

function MovieApp() {
  // ?.......................................................VARIABLE && STATE........................................................//
  const [UserInput, setUserInput] = useState("");
  const [optionValue, setoptionValue] = useState("All");
  const [localSD, setlocalSD] = useState(
    JSON.parse(localStorage.getItem("userSearchHistory")) || []
  );
  const [Historyoption, setHistoryoption] = useState(
    localSD[0] ? localSD[0].toString() : ""
  );
  const { data, status } = useSelector((state) => state.MoviesList);
  const dispatch = useDispatch();

  // ?...........................................................SEARCH_LOGIC........................................................//
  useEffect(() => {
    if (UserInput !== "") {
      const timer = setTimeout(() => {
        dispatch(fatchMoviesList(UserInput));
        setoptionValue("All");
        if (!localSD.includes(UserInput)) {
          setlocalSD([...localSD, UserInput]);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [UserInput, dispatch]);

  let filterdata = data.results ? data.results.filter((e) => e.image) : [];
  let Select = data.results
    ? filterdata.map((e) => Number(e.year)).sort((a, b) => a - b)
    : [];
  let RemoveDuplicateOption = [...new Set(Select)];

  function hendleOption(e) {
    setoptionValue(e.target.value.toString());
  }
  // ?...........................................HISTORY_LOGIC && LOCALSTORAGE........................................................//
  function handleHistory(e) {
    setHistoryoption(e.target.value.toString());
  }
  let MoviesList =
    optionValue === "All"
      ? filterdata
      : filterdata.filter((e) => e.year == optionValue);

  useEffect(() => {
    if (Historyoption !== "") {
      dispatch(fatchMoviesList(Historyoption));
      setoptionValue("All");
    }
  }, [Historyoption, dispatch]);
  useEffect(() => {
    if (localSD !== "") {
      localStorage.setItem("userSearchHistory", JSON.stringify(localSD));
    }
  }, [localSD]);

  return (
    <>
      <div className="contaner">
        <h1 className="heading">Popcorn and Chill</h1>
        <label id="Lable" htmlFor="Input_Search">
          Search your Movie
        </label>
        <div>
          <input
            type="search"
            name="Input_Search"
            id="Input_Search"
            value={UserInput}
            onChange={(e) => setUserInput(e.target.value.toLowerCase())}
          />
          <label htmlFor="Year_Filter" id="History_label">
            Year Filter
          </label>
          <select id="Year_Filter" onChange={hendleOption}>
            <option value="All">All</option>
            {RemoveDuplicateOption.map((option) => {
              return (
                <option key={option} value={option.toString()}>
                  {option}
                </option>
              );
            })}
          </select>
          <label htmlFor="History" id="History_label">
            History
          </label>
          <select name="History" id="History" onChange={handleHistory}>
            {localSD.map((elm) => {
              return (
                <option key={elm} value={elm.toString()}>
                  {elm}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="box">
        {status === "LODING" ? (
          <h1>Loding...</h1>
        ) : (
          MoviesList.map((List) => {
            return (
              <div className="seriesbox" key={List.id}>
                <div>
                  <img src={List.image.url} />
                </div>
                <div className="List_text">
                  <h1>{List.title}</h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
export default React.memo(MovieApp);
