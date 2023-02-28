import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/user";

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(logout());
      window.location.href = "/";
    })();
  }, [dispatch]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};
