import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../../../expense-tracker-utils/constants';

export function CategoryPieChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: EXPENSE_CATEGORIES.find(cat => cat.value === category)?.label || category,
    value: amount,
    category,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
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

export function SpendingTrendChart({ expenses }) {
  const dailyData = expenses.reduce((acc, expense) => {
    const date = expense.date;
    acc[date] = (acc[date] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = Object.entries(dailyData)
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
