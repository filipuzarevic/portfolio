import * as XLSX from 'xlsx';
import type { Expense } from '@/expense-tracker-utils/types';

interface ExportButtonsProps {
  expenses: Expense[];
}

export default function ExportButtons({ expenses }: ExportButtonsProps) {
  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const rows = expenses.map((expense) => [
      expense.date,
      expense.description || '',
      expense.category,
      expense.amount,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      expenses.map((expense) => ({
        Date: expense.date,
        Description: expense.description || '',
        Category: expense.category,
        Amount: parseFloat(expense.amount.toString()),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    XLSX.writeFile(workbook, `expenses-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Export Data</h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={exportToCSV}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Download CSV
        </button>
        <button
          onClick={exportToXLSX}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Download XLSX
        </button>
      </div>
    </div>
  );
}
