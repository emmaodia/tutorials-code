"use client";

import { useState, useEffect } from "react";
import { Recipes } from "@/components/recipes";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://restcountries.com/v3.1/all`
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=c6fd0625b6894fffbf32e8a8054924af&query=pasta&maxFat=25&number=100`
      // `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=f8aaac55&app_key=8a0979caf8418cc6c253fe55985b51ec`
    );

    const data = await response.json();
    // console.log(data);
    setRecipes(data);
  };
  // const check = getRecipes();
  useEffect(() => {
    getRecipes();
  }, []);

  console.log(recipes);
  return (
    <>
      {/* {console.log(recipes)} */}
      <main className="flex w-screen p-6">
        <form className="w-full">
          <label
            // for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:placeholder-gray-700 dark:text-white"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </main>
      <div className={`grid gap-4 grid-cols-3 grid-rows-3 m-6`}>
        {recipes.map((result) => (
          <Recipes
            key={result.flag}
            label={result.name.common}
            flag={result.flags.png}
            capital={result.capital}
          />
        ))}
      </div>
    </>
  );
}
