import ProtectedRoute from '@/components/common/ProtectedRoute';
import RoleProtectedRoute from '@/components/common/RoleProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Courses from '@/pages/Courses';
import Instructors from '@/pages/Instructors';
import Lectures from '@/pages/Lectures';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

function Body() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>

                        {/* ADMIN ONLY ROUTES */}
                        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                            <Route path="courses" element={<Courses />} />
                            <Route path="instructors" element={<Instructors />} />
                        </Route>

                        {/* ADMIN + INSTRUCTOR ROUTES */}
                        <Route element={<RoleProtectedRoute allowedRoles={["admin", "instructor"]} />}>
                            <Route path="lectures" element={<Lectures />} />
                        </Route>

                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default Body;
