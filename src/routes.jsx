
import { Navigate, useRoutes } from "react-router-dom";
import AddExpenseNewVer from "./components/AddExpenseNewVer";
import ExpenseList from "./components/ExpenseList";
import Home from "./pages/Dashboard";
import NotFound from "./pages/Page404";
import ResponsiveAppBar from "./components/AppBar";


export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <ResponsiveAppBar />,
            children: [
                { path: '/addExpense', element: <AddExpenseNewVer/> },
                { path: '/expenses', element: <ExpenseList /> },
                { path: '/dashboard', element: <Home /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: "*", element: <Navigate to="/404" replace /> }
    ])

}