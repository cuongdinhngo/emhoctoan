import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GradePage } from './pages/GradePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lop-3" element={<GradePage />} />
      <Route path="/lop-4" element={<GradePage />} />
      <Route path="/lop-5" element={<GradePage />} />
      {/* Fallback to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
