import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useGetMeQuery } from "@/store/api/userApiSlice";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.user.user);
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  // if API says not logged in → redirect
  if (isError || (!user && !data?.user)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
