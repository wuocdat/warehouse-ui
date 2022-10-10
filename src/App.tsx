import config from "config";
import { AdminLayout, AuthLayout } from "layouts";
import Overview from "pages/Admin/Overview";
import Login from "pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { subRoutes } from "routes";
import { RoutesType } from "types";
import "./App.css";

function App() {
    const getRoutes = (routes: RoutesType[]) => {
        let elements: JSX.Element[] = [];
        let key = 0;
        for (const route of routes) {
            if (route.layout === "/admin") {
                if (route.path) {
                    const Com = route.component!;
                    elements.push(
                        <Route
                            key={key}
                            path={route.layout + route.path}
                            element={<Com />}
                        />
                    );
                    key++;
                }
                if (route.children) {
                    for (const child of route.children) {
                        const { layout, path, component: Component } = child;
                        elements.push(
                            <Route
                                key={key}
                                path={layout + path}
                                element={<Component />}
                            />
                        );
                        key++;
                    }
                }
            }
        }
        return elements;
    };

    const getAlternativePaths = (routes: RoutesType[]) => {
        let elements: JSX.Element[] = [];
        let key = 0;
        for (const route of routes) {
            if (route.layout === "/admin" && route.children) {
                const defaultRoute = route.children[0];
                elements.push(
                    <Route
                        path={route.layout + route.mainPath}
                        key={key}
                        element={
                            <Navigate
                                replace
                                to={defaultRoute.layout + defaultRoute.path}
                            />
                        }
                    />
                );
                key++;
            }
        }
        return elements;
    };

    return (
        <Routes>
            <Route path={config.routes.admin} element={<AdminLayout />}>
                <Route index element={<Overview />} />
                {getRoutes(subRoutes)}
            </Route>
            <Route path={config.routes.auth} element={<AuthLayout />}>
                <Route
                    index
                    element={<Navigate replace to="/auth/sign-in" />}
                />
                <Route path="sign-in" element={<Login />} />
            </Route>
            <Route
                path="/"
                element={<Navigate replace to={config.routes.admin} />}
            />
            {getAlternativePaths(subRoutes)}
        </Routes>
    );
}

export default App;
