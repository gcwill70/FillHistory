import { useDispatch } from "react-redux";
import { paymentSlice } from "../../payment/payment_slice";

function App() {
  const dispatch = useDispatch();

  const handlePay = () => {
    dispatch(paymentSlice.actions.pay());
  };

  const handleRestore = () => {
    dispatch(paymentSlice.actions.restore());
  };

  return (
    <div className="bg-gray-100 font-sans">
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Get more with premium!
          </h1>
          <h2 className="text-2xl text-gray-800 mb-4">
            Save even more keystrokes and support the developer!
          </h2>
          <a
            href="#"
            className="bg-blue-500 text-white hover:bg-blue-700 text-lg font-semibold py-2 px-8 rounded-full inline-block mt-4 transition duration-300"
            onClick={handlePay}
          >
            Lifetime Purchase $4.99 <span className="external-link-icon"></span>
          </a>
          <p
            className="text-sm text-gray-600 mt-2"
            style={{ cursor: "pointer" }}
            onClick={handleRestore}
          >
            Restore Purchase
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Set favorites
              </h2>
              <p className="text-gray-600">
                Set favorite links and insert them with hotkeys!
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Intelligent search
              </h2>
              <p className="text-gray-600">
                See the most important results first and save scrolling time!
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Auto filtering
              </h2>
              <p className="text-gray-600">
                Populate results based on what's relevant!
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 flex justify-center items-center">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                ...and more to come!
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
