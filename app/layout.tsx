import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '../components/sidebar';
import { CartProvider } from '@/context/cartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sweetopiaa - Natural Wellness',
  description: 'Holistic approach to health and wellness',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blush-pink bg-opacity-5`}>
        <CartProvider>
          <div className="flex">
            {/* Fixed sidebar */}
            <div className="w-1/6 fixed h-screen bg-white shadow-md overflow-auto border-r border-blush-pink border-opacity-20">
              <Sidebar />
            </div>
            {/* Main content - scrollable */}
            <div className="w-5/6 ml-[16.67%] min-h-screen">
              {children}
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}