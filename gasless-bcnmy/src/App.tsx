import "./App.css";

function App() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">DEMO</span>
        </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Welcome
              </a>
            </div>
            <div>
              <button
                // onClick={login}
                className="inline-block bg-teal-500 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log in
              </button>
            </div>
          </div>
      </nav>
      <div className={`flex min-h-screen flex-col items-start p-24`}>
          <div>
            <div className="text-gray-900">
              Click the Button above to Connect your Wallet
            </div>
          </div>
      </div>
    </>
  );
}

export default App;
