import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export function Profile({user}) {
  return (
    (<div className="w-full max-w-3xl mx-auto">
      <header
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-t-lg flex items-center gap-6">
        <Avatar className="w-16 h-16">
          <AvatarImage alt="User Avatar" src={user?.photoURL || "/Avatar.jpg"} />
          <AvatarFallback>{user?.isAnonymous ? 'A': user?.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{user?.isAnonymous ? 'User': user?.displayName}</h1>
        </div>
      </header>
      <div className="bg-white dark:bg-gray-950 p-6 rounded-b-lg space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-gray-500 dark:text-gray-400">Email</div>
              <div>{user?.email}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500 dark:text-gray-400">Phone</div>
              <div>{user?.phoneNumber}</div>
            </div>
          </div>
        </section>
      </div>
    </div>)
  );
}
