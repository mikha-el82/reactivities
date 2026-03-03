import {createBrowserRouter} from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/detail/ActivityDetailPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage />},
            { path: 'activities', element: <ActivityDashboard />},
            { path: 'activity/create', element: <ActivityForm key={'create'} />},
            { path: 'activity/edit/:id', element: <ActivityForm />},
            { path: 'activity/detail/:id', element: <ActivityDetailPage />},
        ]
    }
])