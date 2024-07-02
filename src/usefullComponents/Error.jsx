import React from "react";

function Error({ error, refetch }) {
  return (
    <div className="text-center mt-5">
      <p className="mb-2 text-base text-[var(--text)]">
        {error.message}
        <br />
        Network connection Fail.Try Again!
      </p>
      <button
        className="border text-sm hover:shadow-2xl hover:shadow-[var(--loading)] shadow-md p-3 rounded-xl bg-[var(--primary)] text-white"
        onClick={() => refetch()}
      >
        Refetch
      </button>
    </div>
  );
}

export default Error;
