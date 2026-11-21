import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchModal from '../components/layout/SearchModal';
import ChatWidgetModal from '../components/layout/ChatWidgetModal';
import BackToTop from '../components/layout/BackToTop';
import ToastContainer from '../components/common/Toast';

export function PublicLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    const handleOpenChat = () => setChatOpen(true);

    window.addEventListener('licentra:opensearch', handleOpenSearch);
    window.addEventListener('licentra:openchat', handleOpenChat);

    // Also handle global chat trigger button clicks
    const handleGlobalClick = (e) => {
      const chatTrigger = e.target.closest('[data-licentra-chat]');
      if (chatTrigger) {
        e.preventDefault();
        setChatOpen(true);
      }
      const searchTrigger = e.target.closest('[data-licentra-search]');
      if (searchTrigger) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('licentra:opensearch', handleOpenSearch);
      window.removeEventListener('licentra:openchat', handleOpenChat);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="licentra-public-app d-flex flex-column min-vh-100">
      <TopBar />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ChatWidgetModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <BackToTop />
      <ToastContainer />
    </div>
  );
}

export default PublicLayout;

