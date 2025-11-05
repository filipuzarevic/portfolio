import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EXPENSE_CATEGORIES } from '@/expense-tracker-utils/constants';
import type { ExpenseFormData } from '@/expense-tracker-utils/types';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  initialData?: ExpenseFormData | null;
}

export default function ExpenseForm({ onSubmit, initialData = null }: ExpenseFormProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<ExpenseFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    defaultValues: initialData || {
      amount: '',
      description: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmitForm = async (data: ExpenseFormData) => {
    // Show confirmation dialog
    setPendingData(data);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!pendingData) return;

    setShowConfirm(false);
    await onSubmit(pendingData);
    if (!initialData) {
      reset();
    }
    setPendingData(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setPendingData(null);
  };

  const getCategoryLabel = (value: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === value)?.label || value;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              id="amount"
              {...register('amount', { required: 'Amount is required', min: 0.01 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              placeholder="0.00"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
              placeholder="Coffee, groceries, etc."
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              {...register('category', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              {...register('date', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      {/* Confirmation Dialog */}
      {showConfirm && pendingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Expense</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${parseFloat(pendingData.amount.toString()).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Description:</span>
                <span className="font-semibold">{pendingData.description || '-'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold">{getCategoryLabel(pendingData.category)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{pendingData.date}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Adding...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
