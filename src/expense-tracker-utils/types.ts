export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  description: string | null;
  category: string;
  date: string;
  created_at: string;
}

export interface ExpenseFormData {
  amount: string | number;
  description?: string;
  category: string;
  date: string;
}

export interface ExpenseFilters {
  category: string;
  dateFrom: string;
  dateTo: string;
}
