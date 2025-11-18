import ProtectedRoute from '@/components/common/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Courses from '@/pages/Courses';
import Dashboard from '@/pages/Dashboard';
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
                    <Route path='/' element={<DashboardLayout />}>
                        <Route path='' element={<Dashboard />} />
                        <Route path='courses' element={<Courses />} />
                        <Route path='instructors' element={<Instructors />} />
                        <Route path='lectures' element={<Lectures />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default Body;
