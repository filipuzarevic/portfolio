import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS, EXPENSE_CATEGORIES } from '../../../expense-tracker-utils/constants';
import type { Expense } from '@/expense-tracker-utils/types';

interface ChartProps {
  expenses: Expense[];
}

// Helper function to get fiscal month (starts on 5th)
function getFiscalMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // If day is before the 5th, use previous month
  if (day < 5) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    return `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}`;
  }

  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export function CategoryPieChart({ expenses }: ChartProps) {
  const categoryTotals = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount.toString());
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
            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] || '#6b7280'} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthlyBarChart({ expenses }: ChartProps) {
  // Group by fiscal month (starting on the 5th)
  const monthlyData = expenses.reduce((acc: Record<string, number>, expense) => {
    const fiscalMonth = getFiscalMonth(new Date(expense.date));
    acc[fiscalMonth] = (acc[fiscalMonth] || 0) + parseFloat(expense.amount.toString());
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
      <h3 className="text-lg font-semibold mb-4">Monthly Spending (Month starts on 5th)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Bar dataKey="amount" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingTrendChart({ expenses }: ChartProps) {
  // Group by fiscal month and category
  const monthlyByCategory = expenses.reduce((acc: Record<string, Record<string, number>>, expense) => {
    const fiscalMonth = getFiscalMonth(new Date(expense.date));

    if (!acc[fiscalMonth]) {
      acc[fiscalMonth] = {};
    }

    acc[fiscalMonth][expense.category] = (acc[fiscalMonth][expense.category] || 0) + parseFloat(expense.amount.toString());

    return acc;
  }, {});

  // Convert to array format for recharts
  const data = Object.entries(monthlyByCategory)
    .map(([month, categories]) => ({
      month,
      ...categories,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Get all unique categories from the data
  const allCategories = Array.from(
    new Set(expenses.map(e => e.category))
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending Trend by Category (Month starts on 5th)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          {allCategories.map((category) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              name={EXPENSE_CATEGORIES.find(cat => cat.value === category)?.label || category}
              stroke={CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#6b7280'}
              strokeWidth={2}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
