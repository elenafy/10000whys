
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { QuestionDetail } from './pages/QuestionDetail';
import { Activities } from './pages/Activities';
import { ActivityDetail } from './pages/ActivityDetail';
import { CategoryDetail } from './pages/CategoryDetail';
import { Videos } from './pages/Videos';
import { Questions } from './pages/Questions';
import { About } from './pages/About';
import { Waitlist } from './pages/Waitlist';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/q/:id" element={<QuestionDetail />} />
          <Route path="/search" element={<QuestionDetail />} /> {/* Handle search as a detail view for now */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/about" element={<About />} />
          <Route path="/waitlist" element={<Waitlist />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
