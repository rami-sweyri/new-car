export default function Thead({ children }) {
  return (
    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
      {children}
    </th>
  );
}
