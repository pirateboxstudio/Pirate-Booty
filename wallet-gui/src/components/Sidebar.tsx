// 🏴‍☠️ Sidebar Navigation
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Send as SendIcon, 
  Download, 
  History as HistoryIcon, 
  Pickaxe, 
  Settings as SettingsIcon, 
  BookOpen,
  Anchor
} from 'lucide-react'
import { cn } from '../utils/cn'

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Send', icon: SendIcon, path: '/send' },
  { name: 'Receive', icon: Download, path: '/receive' },
  { name: 'History', icon: HistoryIcon, path: '/history' },
  { name: 'Mining', icon: Pickaxe, path: '/mining' },
  { name: 'Address Book', icon: BookOpen, path: '/addressbook' },
  { name: 'Settings', icon: SettingsIcon, path: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-ocean border-r border-ocean-light">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-ocean-light">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏴‍☠️</span>
          <div>
            <h1 className="text-lg font-bold text-gold">Pirate Booty</h1>
            <p className="text-xs text-gray-400">Black Pearl</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                'hover:bg-ocean-light',
                isActive
                  ? 'bg-gold text-navy-950 font-medium'
                  : 'text-gray-300'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-ocean-light">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Anchor className="w-4 h-4" />
          <span>v1.0.0 - Black Pearl</span>
        </div>
      </div>
    </aside>
  )
}
