// 🏴‍☠️ Address Book Page
export default function AddressBook() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
          📖 Address Book (Crew Roster)
        </h1>
        <p className="text-gray-400 mt-1">Manage your contacts</p>
      </div>

      <div className="bg-ocean rounded-xl p-8 border border-ocean-light text-center">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-xl font-bold text-gray-200 mb-2">Address Book Coming Soon</h2>
        <p className="text-gray-400">
          This feature will be available in the next update
        </p>
      </div>
    </div>
  )
}
