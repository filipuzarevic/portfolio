import { EXPENSE_CATEGORIES } from '../../../expense-tracker-utils/constants';

export default function ExpenseFilters({ filters, onFilterChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
          >
            <option value="">All Categories</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date-from" className="block text-sm font-medium text-gray-700">
            From Date
          </label>
          <input
            type="date"
            id="date-from"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label htmlFor="date-to" className="block text-sm font-medium text-gray-700">
            To Date
          </label>
          <input
            type="date"
            id="date-to"
            value={filters.dateTo}
            onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
          />
        </div>
      </div>
    </div>
  );
}
