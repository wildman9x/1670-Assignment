import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, genreSelector } from "../../redux/slices/genre";

export const ViewGenre = () => {
  const dispatch = useDispatch();
  const genres = useSelector(genreSelector.selectAll);
  const genreState = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

 
};
