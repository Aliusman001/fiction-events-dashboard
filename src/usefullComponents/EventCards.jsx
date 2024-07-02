export default function EventCard({ content }) {
  return (
    <div className="p-5 rounded-2xl border border-[var(--box)]  flex md:flex-row flex-col self-stretch  bg-[var(--box)] flex-grow md:justify-between justify-center md:items-center items-left gap-3">
      <span className="text-sm font-normal text-[var(--text)]">
        {content.head}
      </span>
      <span className="font-bold text-3xl  text-[var(--secondary)]">
        {content.body}
      </span>
    </div>
  );
}
