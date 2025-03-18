import { FC } from 'react';

const DonateesPage: FC = () => {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-3xl font-bold">Donatees</h1>
        {/* Add your donatees content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example donatee card */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Donatee Name</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Description goes here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DonateesPage;
