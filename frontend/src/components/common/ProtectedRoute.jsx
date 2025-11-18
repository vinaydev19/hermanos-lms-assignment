import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useGetMeQuery } from "@/store/api/userApiSlice";
import { useEffect } from "react";
import { getUser } from "@/store/slices/userSlice";

export default function ProtectedRoute() {
  const reduxUser = useSelector((state) => state.user.user);
  const { data, isLoading, isError } = useGetMeQuery();

  const apiUser = data?.data?.user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (apiUser) dispatch(getUser(apiUser));
  }, [apiUser]);

  if (isLoading)
    return <div className="h-screen flex justify-center items-center">Loading...</div>;

  if (isError || (!reduxUser && !apiUser)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
