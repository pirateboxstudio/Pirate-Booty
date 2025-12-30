// 🏴‍☠️ Main Layout Component
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useUIStore } from '../store/walletStore'

export default function Layout() {
  const showSidebar = useUIStore((state) => state.showSidebar)

  return (
    <div className="flex h-screen bg-navy-950 text-gray-100">
      {showSidebar && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
