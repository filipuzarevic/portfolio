import { useForm } from 'react-hook-form';
import { EXPENSE_CATEGORIES } from '../../../expense-tracker-utils/constants';

export default function ExpenseForm({ onSubmit, initialData = null }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      amount: '',
      description: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmitForm = async (data) => {
    await onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
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
        style={{
          backgroundColor: '#2563eb',
          color: '#ffffff',
          padding: '10px 24px',
          fontSize: '15px',
          fontWeight: '600',
          border: 'none',
          borderRadius: '6px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.5 : 1,
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
        }}
      >
        {isSubmitting ? 'Saving...' : initialData ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}
