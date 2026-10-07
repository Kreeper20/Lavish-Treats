

export const Cancel = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Payment Cancelled</h1>
          <p className="text-gray-700 mb-6">Your payment was not successful. Please try again or contact support if the issue persists.</p>
          <a href="/" className="inline-block bg-purple-primary text-white px-6 py-2 rounded hover:bg-purple-dark transition duration-300">Return to Home</a>
        </div>
      </div>
    </>
  );
};
