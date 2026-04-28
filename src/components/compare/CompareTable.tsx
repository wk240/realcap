import { cn } from '@/lib/utils/cn';

interface CompareRow {
  feature: string;
  realcap: boolean | string;
  alternative: boolean | string;
}

interface CompareTableProps {
  rows: CompareRow[];
  alternativeName: string;
  className?: string;
}

export function CompareTable({ rows, alternativeName, className }: CompareTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
              Feature
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 bg-green-50">
              RealCap
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-200 bg-red-50">
              {alternativeName}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={cn(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}>
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                {row.feature}
              </td>
              <td className="px-4 py-3 text-center text-sm border-b border-gray-200 bg-green-50/50">
                {typeof row.realcap === 'boolean' ? (
                  row.realcap ? (
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  ) : (
                    <span className="text-red-600 font-bold text-lg">✗</span>
                  )
                ) : (
                  <span className="text-green-700">{row.realcap}</span>
                )}
              </td>
              <td className="px-4 py-3 text-center text-sm border-b border-gray-200 bg-red-50/50">
                {typeof row.alternative === 'boolean' ? (
                  row.alternative ? (
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  ) : (
                    <span className="text-red-600 font-bold text-lg">✗</span>
                  )
                ) : (
                  <span className="text-red-700">{row.alternative}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}