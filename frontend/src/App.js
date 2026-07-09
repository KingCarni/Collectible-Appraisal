import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import LandingPage from './pages/LandingPage';
import MarketplacePage from './pages/MarketplacePage';
import ItemDetailPage from './pages/ItemDetailPage';
import AppraisePage from './pages/AppraisePage';
import ValuationPage from './pages/ValuationPage';
import CategoryPage from './pages/CategoryPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import {
  MyCollectionPage,
  SavedItemsPage,
  AdminReviewPage,
} from './pages/EmptyStatePages';
import { SignInPage, SignUpPage } from './pages/AuthPages';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/appraise" element={<AppraisePage />} />
          <Route path="/valuation/:id" element={<ValuationPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/dashboard" element={<SellerDashboardPage />} />
          <Route path="/collection" element={<MyCollectionPage />} />
          <Route path="/saved" element={<SavedItemsPage />} />
          <Route path="/admin/review" element={<AdminReviewPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
