import { useEffect, useState } from "react";

const FormComponent = () => {
  const [inputval, setInputVal] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const Clicked = (val) => {
    console.log(val);
    fetch("/worker/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ value: val.value, id: val._id }),
    })
      .then((res) => res.json())
      .then((succ) => {})
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    console.log("Ademola");
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResults(data.message);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [loading]);
  const submit = (event) => {
    event.preventDefault();
    const valueRef = inputval.trim();
    setLoading(true);
    fetch("/api/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ value: valueRef }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("successfull");
        setInputVal("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.messag);
      });
  };
  return (
    <div className="w-full mt-3 flex  flex-col items-center justify-center">
      <div className="w-6/12 shadow-sm shadow-green-300">
        <form
          className="flex flex-col justify-evenly h-24 items-center"
          onSubmit={submit}
        >
          <label className="w-2/5">Enter Value</label>
          <input
            className="input"
            autoFocus
            onChange={(event) => setInputVal(event.target.value)}
            value={inputval}
          />
          <button className="w-1/5 rounded-md bg-blue-600 text-white hover:text-blue-900 hover:bg-white">
            Submit
          </button>
        </form>
      </div>
      <div className="w-5/12 shadow-sm shadow-orange-400 mt-5 mb-4">
        <section className="text-xl italic font-semibold h-9">
          All Names
        </section>
        {loading && results.length < 1 && (
          <section className="flex h-5/6 text-center justify-center items-center ">
            loading...
          </section>
        )}
        {!loading && results.length < 1 && (
          <section className="flex h-5/6 text-center justify-center items-center ">
            Nothing here yet
          </section>
        )}
        <ul className="flex flexwrapper justify-evenly">
          {results.map((el) => (
            <li
              onClick={() => Clicked(el)}
              className="w-1/4 shadow-sm shadow-gray-100 text-md my-2 cursor-pointer"
              key={el._id}
            >
              {el.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormComponent;
