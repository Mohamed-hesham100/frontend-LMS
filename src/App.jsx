import "./App.css";
import {  RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { appRouter } from "./routes/Routes" // مثال على مسار الراوتر


function App() {
  return (
    <ThemeProvider>

      <RouterProvider router={appRouter} />;
    </ThemeProvider>
  )
}

export default App;
