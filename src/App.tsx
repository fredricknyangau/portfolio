import { Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import CaseStudy from '@/pages/CaseStudy';
import { Analytics } from '@vercel/analytics/react';

export default function App(): JSX.Element {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="case-study/:id" element={<CaseStudy />} />
      </Route>
    </Routes>
    <Analytics />
    </div>
  );
}
