import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const theme = extendTheme({
    components: {
        Steps,
    },
});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
