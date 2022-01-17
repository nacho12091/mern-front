import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import NotesList from './components/NotesList/NotesList';
import NoteCreation from './components/NoteCreation/NoteCreation';
import UserCreation from './components/UserCreation/UserCreation';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid p-4">
        <Routes>
          <Route path="/" exact element={<NotesList />} />
          <Route path="/edit/:id" element={<NoteCreation />} />
          <Route path="/create" element={<NoteCreation />} />
          <Route path="/user" element={<UserCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
