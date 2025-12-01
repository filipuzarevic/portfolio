import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import Summary from '../components/dashboard/Summary';
import ExportButtons from '../components/dashboard/ExportButtons';
import { CategoryPieChart, MonthlyBarChart, SpendingTrendChart } from '../components/visualizations/ExpenseCharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [expenses, filters]);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Error fetching expenses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];

    if (filters.category) {
      filtered = filtered.filter((expense) => expense.category === filters.category);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter((expense) => expense.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      filtered = filtered.filter((expense) => expense.date <= filters.dateTo);
    }

    setFilteredExpenses(filtered);
  };

  const handleAddExpense = async (data) => {
    try {
      const { error } = await supabase.from('expenses').insert([
        {
          ...data,
          user_id: user.id,
          amount: parseFloat(data.amount),
        },
      ]);

      if (error) throw error;
      await fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense: ' + error.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id);

      if (error) throw error;
      await fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <ExpenseForm onSubmit={handleAddExpense} />

        <Summary expenses={filteredExpenses} />

        <ExpenseFilters filters={filters} onFilterChange={setFilters} />

        {filteredExpenses.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryPieChart expenses={filteredExpenses} />
              <MonthlyBarChart expenses={filteredExpenses} />
            </div>

            <SpendingTrendChart expenses={filteredExpenses} />

            <ExportButtons expenses={filteredExpenses} />
          </>
        )}

        <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
      </main>
    </div>
  );
}
