import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/expense-tracker/useAuth';
import ExpenseForm from '@/components/expense-tracker/expenses/ExpenseForm';
import ExpenseList from '@/components/expense-tracker/expenses/ExpenseList';
import ExpenseFilters from '@/components/expense-tracker/expenses/ExpenseFilters';
import Summary from '@/components/expense-tracker/dashboard/Summary';
import ExportButtons from '@/components/expense-tracker/dashboard/ExportButtons';
import { CategoryPieChart, MonthlyBarChart, SpendingTrendChart } from '@/components/expense-tracker/visualizations/ExpenseCharts';
import type { Expense, ExpenseFormData, ExpenseFilters as ExpenseFiltersType } from '@/expense-tracker-utils/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function LoginPrompt({ onSignIn, onSignUp }: { onSignIn: () => void; onSignUp: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome to Expense Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account to start tracking your expenses
          </p>
        </div>
        <div className="space-y-4">
          <Button onClick={onSignIn} className="w-full">
            Sign In
          </Button>
          <Button onClick={onSignUp} variant="outline" className="w-full">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}

function AuthModal({ mode, onClose, onSuccess }: { mode: 'signin' | 'signup'; onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
        onSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-md bg-red-50">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2 border"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2 border"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ExpenseTracker() {
  const { user, loading: authLoading } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Calculate default date range (5th of current month to 5th of next month)
  const getDefaultDateRange = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Start date: 5th of current month
    const dateFrom = new Date(currentYear, currentMonth, 5);

    // End date: 5th of next month
    const dateTo = new Date(currentYear, currentMonth + 1, 5);

    return {
      dateFrom: dateFrom.toISOString().split('T')[0],
      dateTo: dateTo.toISOString().split('T')[0],
    };
  };

  const defaultDates = getDefaultDateRange();

  const [filters, setFilters] = useState<ExpenseFiltersType>({
    category: '',
    dateFrom: defaultDates.dateFrom,
    dateTo: defaultDates.dateTo,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  useEffect(() => {
    applyFilters();
  }, [expenses, filters]);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user!.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
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

  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      if (editingExpense) {
        // Update existing expense
        const { error } = await supabase
          .from('expenses')
          .update({
            ...data,
            amount: parseFloat(data.amount.toString()),
          })
          .eq('id', editingExpense.id);

        if (error) throw error;
        setEditingExpense(null);
      } else {
        // Add new expense
        const { error } = await supabase.from('expenses').insert([
          {
            ...data,
            user_id: user!.id,
            amount: parseFloat(data.amount.toString()),
          },
        ]);

        if (error) throw error;
      }
      await fetchExpenses();
    } catch (error: any) {
      console.error('Error saving expense:', error);
      alert('Error saving expense: ' + error.message);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id);

      if (error) throw error;
      await fetchExpenses();
    } catch (error: any) {
      console.error('Error deleting expense:', error);
      alert('Error deleting expense: ' + error.message);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    // Scroll to top where the form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LoginPrompt
          onSignIn={() => setAuthModal('signin')}
          onSignUp={() => setAuthModal('signup')}
        />
        {authModal && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            onSuccess={() => {
              setAuthModal(null);
              setLoading(true);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          {editingExpense && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
              <span className="text-blue-800 font-medium">Editing expense</span>
              <button
                onClick={() => setEditingExpense(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Cancel
              </button>
            </div>
          )}
          <ExpenseForm
            onSubmit={handleAddExpense}
            initialData={editingExpense ? {
              amount: editingExpense.amount.toString(),
              description: editingExpense.description || '',
              category: editingExpense.category,
              date: editingExpense.date,
            } : null}
          />
        </div>

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

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      </main>
    </div>
  );
}
