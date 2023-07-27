import React, { useEffect, useState } from "react";

const RecentComponent = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteVal = (id) => {
    setLoading(true);
    fetch("/worker/", {
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((val) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Ademola");
    let data_res = [];
    fetch("/worker/")
      .then((res) => res.json())
      .then((data) => {
        for (let keys in data.message) {
          data_res.push({ value: data.message[keys], _id: keys });
        }
        setResults(data_res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [loading]);
  return (
    <div className="w-full flex justify-center align-middle h-2/4">
      <div className="w-3/6 shadow-sm shadow-white">
        <section className="text-xl italic font-semibold h-9">
          Recently clicked
        </section>
        {loading && results.length < 1 && (
          <section className="flex h-5/6 text-center justify-center items-center ">
            Nothing here yet
          </section>
        )}
        {!loading && results.length < 1 && (
          <section className="flex h-5/6 text-center justify-center items-center ">
            Nothing here yet
          </section>
        )}
        {results.length > 0 && (
          <ul className="flex flexwrapper justify-evenly">
            {results.map((el) => (
              <li
                className="w-1/4 shadow-sm shadow-gray-100 text-md my-2 cursor-pointer"
                key={el._id}
                onClick={() => deleteVal(el._id)}
              >
                {el.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      ;
    </div>
  );
};

export default RecentComponent;
