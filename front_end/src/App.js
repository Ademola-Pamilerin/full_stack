import "./App.css";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import RecentComponent from "./components/recent";
import FormComponent from "./components/form";
function App() {
  console.log("Ademla");
  return (
    <div className="w-full bg-slate-400 text-center  h-screen">
      <nav className="flex justify-center align-middle mb-3">
        <div className="w-11/12 flex flex-row justify-between h-max px-3 align-middle">
          <h2 className="h-auto w-1/3 flex justify-start font-bold font-serif cursor-pointer hover:underline text-3xl">
            <Link to="/">Testing</Link>
          </h2>
          <ul className="flex flex-row h-auto w-2/12 justify-around">
            <li className="cursor-pointer font-semibold font-serif text-xl hover:underline">
              <Link to={"/insert"}>Insert</Link>
            </li>
            <li className="cursor-pointer font-semibold font-serif text-xl hover:underline">
              <Link to={"/"}>View Recent</Link>
            </li>
          </ul>
        </div>
      </nav>
      <>
        <Routes>
          <Route path="/" index element={<RecentComponent />} />
          <Route path="/insert" element={<FormComponent />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
