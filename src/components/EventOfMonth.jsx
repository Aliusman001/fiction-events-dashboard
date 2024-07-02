export default function EventOfMonth() {
  return (
    <div className="h-[209px] bg-[var(--primary)] p-5 rounded-2xl shadow-2xl shadow-[var(--primary)]">
      <div className="flex justify-between">
        <h4 className="text-white text-3xl font-bold w-40">
          Event of the month
        </h4>
        <span>
          <img src="/zondicons_badge.svg" alt="zondicons_badge.svg" />
        </span>
      </div>
      <div className="bg-white h-[91px] flex p-3 justify-between rounded-md text-xs font-normal text-[var(--text)]">
        <div>
          <h4 className="text-[var(--primary)] text-base font-bold">
            Web Development
          </h4>
          <p>
            Category: <span className="font-semibold">AI</span>
          </p>
          <div className="flex items-center gap-1 mt-2">
            <img src="/location.svg" alt="" />
            <span>Bahria Intellectual Village</span>
          </div>
        </div>
        <div>
          <img src="/group.svg" />
        </div>
      </div>
    </div>
  );
}
