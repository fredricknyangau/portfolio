import { Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="case-study/:id" element={<CaseStudy />} />
      </Route>
    </Routes>
  );
}
