import type { Expense } from '@/expense-tracker-utils/types';

interface SummaryProps {
  expenses: Expense[];
}

export default function Summary({ expenses }: SummaryProps) {
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount.toString()), 0);
  const avgExpense = expenses.length > 0 ? total / expenses.length : 0;

  const topCategory = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount.toString());
    return acc;
  }, {});

  const topCategoryName = Object.keys(topCategory).length > 0
    ? Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0][0]
    : 'N/A';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">${total.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Number of Expenses</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{expenses.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Average Expense</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">${avgExpense.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900 capitalize">{topCategoryName}</p>
      </div>
    </div>
  );
}
