export default function Trow({ children, thead }) {
  return (
    <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
      <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
        {thead}
      </span>
      {children}
    </td>
  );
}
