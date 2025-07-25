import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import App from './App';
import Testimonials from './Testimonials';
import Providers from './Providers';
import TermsIndex from './TermsIndex';
import TermsViewer from './TermsViewer';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/terms" element={<TermsIndex />} />
           <Route path="/testimonials" element={<Testimonials />} />
           <Route path="/providers" element={<Providers />} />
           <Route path="/terms/:slug" element={<TermsViewer />} />

          {/* Add here more Footer Elements */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
