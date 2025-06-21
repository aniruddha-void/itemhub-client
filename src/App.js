import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
}
export default App;
