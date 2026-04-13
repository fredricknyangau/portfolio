import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TerminalOverlay from '@/components/TerminalOverlay';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
      <TerminalOverlay />
      <Footer />
    </>
  );
}
