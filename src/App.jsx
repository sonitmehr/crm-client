import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Audiences from './components/Audiences';
import AudienceList from './components/AudienceList';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router> {/* Move Router here to wrap the entire app */}
      <Navbar /> {/* Navbar should be inside Router */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audience" element={<Audiences />} />
          <Route path="/audience/list" element={<AudienceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
