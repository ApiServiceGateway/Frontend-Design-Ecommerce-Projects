'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AccountSidebar, AccountTab } from '@/components/account/AccountSidebar';
import { AccountOverview } from '@/components/account/AccountOverview';
import { AccountOrders } from '@/components/account/AccountOrders';
import { AccountCoupons } from '@/components/account/AccountCoupons';
import { AccountEditProfile } from '@/components/account/AccountEditProfile';
import { AccountManageAddress } from '@/components/account/AccountManageAddress';
import { AccountGiftCards } from '@/components/account/AccountGiftCards';
import { AccountSaveUPI } from '@/components/account/AccountSaveUPI';
import { AccountSaveCard } from '@/components/account/AccountSaveCard';
import { AccountSaveCrypto } from '@/components/account/AccountSaveCrypto';
import { Account2FA } from '@/components/account/Account2FA';
import { AccountChangePassword } from '@/components/account/AccountChangePassword';
import { AccountChangeEmail } from '@/components/account/AccountChangeEmail';
import { AccountReviews } from '@/components/account/AccountReviews';
import { AccountNotifications } from '@/components/account/AccountNotifications';

function AccountContent() {
  const searchParams = useSearchParams();

  // Read initial tab from URL ?tab=... (default: 'overview')
  const tabParam = searchParams.get('tab') as AccountTab | null;
  const validTabs: AccountTab[] = [
    'overview',
    'orders',
    'coupons',
    'edit-profile',
    'address',
    'gift-cards',
    'upi',
    'card',
    'crypto',
    '2fa',
    'password',
    'email',
    'reviews',
    'notifications',
  ];

  const initialTab: AccountTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'overview';
  const [activeTab, setActiveTab] = useState<AccountTab>(initialTab);

  // Sync state with URL params when user navigates or uses browser back/forward buttons
  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Tab change handler that smoothly changes right-side section without page reload
  const handleSelectTab = (tab: AccountTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const url = tab === 'overview' ? '/account' : `/account?tab=${tab}`;
      window.history.pushState(null, '', url);
    }
  };

  // Shared user profile state
  const [profileName, setProfileName] = useState('Dipanshu');
  const [dob, setDob] = useState('23 April 2001');
  const [email, setEmail] = useState('dipanshu@example.com');

  const handleProfileUpdated = (name: string, updatedDob: string) => {
    setProfileName(name);
    setDob(updatedDob);
  };

  const handleEmailUpdated = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <div className="text-slate-800 antialiased min-h-screen bg-white">
      {/* Main Layout Container with 15% margins on desktop */}
      <div className="w-full py-8 px-4 sm:px-6 lg:px-[15%]">
        <div className="grid grid-cols-1 md:grid-cols-12 items-start">
          
          {/* PERSISTENT LEFT SIDEBAR (4 cols on desktop) with vertical line divider */}
          <div className="md:col-span-4 lg:col-span-4 md:pr-8 md:border-r md:border-slate-200 sticky top-24 pb-12">
            <AccountSidebar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              profileName={profileName}
              dob={dob}
            />
          </div>

          {/* DYNAMIC RIGHT SECTION PANEL (8 cols on desktop) */}
          <section className="md:col-span-8 lg:col-span-8 md:pl-10 transition-all duration-300" data-purpose="account-main-panel">
            {activeTab === 'overview' && (
              <AccountOverview
                onNavigateTab={handleSelectTab}
                profileName={profileName}
                username="@dipanshu"
                dob={dob}
                joinedDate="April 2024"
              />
            )}

            {activeTab === 'orders' && <AccountOrders />}

            {activeTab === 'coupons' && <AccountCoupons />}

            {activeTab === 'edit-profile' && (
              <AccountEditProfile
                initialName={profileName}
                initialDob="2001-04-23"
                initialEmail={email}
                onProfileUpdated={handleProfileUpdated}
                onNavigateTab={handleSelectTab}
              />
            )}

            {activeTab === 'address' && <AccountManageAddress />}

            {activeTab === 'gift-cards' && <AccountGiftCards />}

            {activeTab === 'upi' && <AccountSaveUPI />}

            {activeTab === 'card' && <AccountSaveCard />}

            {activeTab === 'crypto' && <AccountSaveCrypto />}

            {activeTab === '2fa' && <Account2FA />}

            {activeTab === 'password' && <AccountChangePassword />}

            {activeTab === 'email' && (
              <AccountChangeEmail
                currentEmail={email}
                onEmailUpdated={handleEmailUpdated}
              />
            )}

            {activeTab === 'reviews' && <AccountReviews />}

            {activeTab === 'notifications' && <AccountNotifications />}
          </section>

        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14cda8]"></div>
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
