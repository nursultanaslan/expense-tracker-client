import AppBar from "./components/AppBar";
import { Navigate, useRoutes } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Dasboard from "./pages/Dashboard";
import NotFound from "./pages/Page404";

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <AppBar />,
            children: [
                { path: '/addExpense', element: <AddExpense /> },
                { path: '/expenses', element: <ExpenseList /> },
                { path: '/dashboard', element: <Dasboard /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: "*", element: <Navigate to="/404" replace /> }
    ])

}