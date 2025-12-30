// 🏴‍☠️ Main App Component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useWalletStore } from './store/walletStore'
import { useDaemon } from './hooks/useDaemon'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import Receive from './pages/Receive'
import History from './pages/History'
import Mining from './pages/Mining'
import Settings from './pages/Settings'
import AddressBook from './pages/AddressBook'

function App() {
  const isWalletOpen = useWalletStore((state) => state.isOpen)
  
  // Initialize daemon connection monitoring
  useDaemon()

  return (
    <BrowserRouter>
      <Routes>
        {!isWalletOpen ? (
          <Route path="*" element={<Welcome />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="send" element={<Send />} />
            <Route path="receive" element={<Receive />} />
            <Route path="history" element={<History />} />
            <Route path="mining" element={<Mining />} />
            <Route path="settings" element={<Settings />} />
            <Route path="addressbook" element={<AddressBook />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
