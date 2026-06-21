import { useState } from "react";
import { useApp } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import DashboardPage from "./components/dashboard/DashboardPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import TransactionForm from "./components/transactions/TransactionForm";
import CategoriesPage from "./components/categories/CategoriesPage";
import Modal from "./components/common/Modal";
import { PAGES } from "./utils/constants";

/**
 * App — Root component: layout + navigation + modal quản lý
 */
function App() {
  const { currentPage, setCurrentPage } = useApp();

  // State modal thêm/sửa giao dịch
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Mở form thêm mới
  const handleAdd = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  // Mở form sửa
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  // Đóng form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  // Render trang hiện tại
  const renderPage = () => {
    switch (currentPage) {
      case PAGES.DASHBOARD:
        return <DashboardPage />;
      case PAGES.TRANSACTIONS:
        return <TransactionsPage onAdd={handleAdd} onEdit={handleEdit} />;
      case PAGES.CATEGORIES:
        return <CategoriesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout>
      {renderPage()}

      {/* Modal Thêm/Sửa Giao dịch */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingTransaction ? "Sửa Giao Dịch" : "Thêm Giao Dịch"}
      >
        <TransactionForm
          editingTransaction={editingTransaction}
          onClose={handleCloseForm}
        />
      </Modal>
    </Layout>
  );
}

export default App;
