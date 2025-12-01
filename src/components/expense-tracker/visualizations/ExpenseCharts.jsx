import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../../../expense-tracker-utils/constants';

export function CategoryPieChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  const data = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      name: EXPENSE_CATEGORIES.find(cat => cat.value === category)?.label || category,
      amount: amount,
      percentage: ((amount / total) * 100).toFixed(1),
      category,
    }))
    .sort((a, b) => b.amount - a.amount); // Sort from highest to lowest

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip
            formatter={(value, name) => {
              const item = data.find(d => d.amount === value);
              return [`$${value.toFixed(2)} (${item?.percentage}%)`, 'Amount'];
            }}
          />
          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || '#6b7280'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyBarChart({ expenses }) {
  // Group expenses by fiscal month (5th to 5th)
  const monthlyData = expenses.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date);
    const day = expenseDate.getDate();

    // If date is before the 5th, it belongs to the previous month's fiscal period
    let fiscalMonth;
    if (day < 5) {
      const prevMonth = new Date(expenseDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      fiscalMonth = prevMonth.toISOString().slice(0, 7);
    } else {
      fiscalMonth = expenseDate.toISOString().slice(0, 7);
    }

    acc[fiscalMonth] = (acc[fiscalMonth] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month,
      amount,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Spending (Fiscal: 5th-5th)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

