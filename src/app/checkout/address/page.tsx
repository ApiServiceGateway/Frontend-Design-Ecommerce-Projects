'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Plus,
  ShieldCheck,
  ArrowRight,
  Gift,
  Mail,
  Tag,
  Truck,
  Heart,
  ChevronDown,
} from 'lucide-react';

interface Address {
  id: string;
  name: string;
  type: 'Home' | 'Work';
  isDefault: boolean;
  line: string;
  pincode: string;
  mobile: string;
  eta: string;
}

const initialAddresses: Address[] = [
  {
    id: 'addr1',
    name: 'Dipanshu',
    type: 'Home',
    isDefault: true,
    line: '45, Green Valley Apartments, Delhi, New Delhi, India',
    pincode: '110001',
    mobile: '+91 98765 43210',
    eta: 'Estimated Delivery by Tomorrow, 5 PM',
  },
  {
    id: 'addr2',
    name: 'Julian Vance',
    type: 'Work',
    isDefault: false,
    line: '742 Evergreen Terrace, San Francisco, CA, USA',
    pincode: '94107',
    mobile: '+1 (555) 234-8901',
    eta: 'Standard international dispatch available',
  },
];

// Wishlist section at bottom
const wishlistItems = [
  {
    id: 'w1',
    title: "Premium Jean's for men",
    inrPrice: 500,
    inrOriginal: 899,
    usdPrice: 4.55,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAK4JLcqAN1iFWdqXVcfpGuCvOL7yfEi3fef9UOje41J1tcOBxyyfR1TvCFL5YvdBZfSRBAC4RUAzL9b7iwgXJFhNEGrtHQvrKm94h7T3yKYOFl3dRGeJZX3RjVO76VgxDSWMpwbgCRI0-4wF2_78qXm9EZjYcJMrT9m7XkQgNyYPYaVo-5yIFZEJdo2ippjlL-e01j_F-ykZxV98srd_QjiV3Mx8ajv4HZhTYbAQ',
  },
  {
    id: 'w2',
    title: "Premium Jean's for men",
    inrPrice: 500,
    inrOriginal: 899,
    usdPrice: 4.55,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARaWfdzkGpD5O9QnNxeDJTO0_YWAfosv5m6pEvmhS0Fk9SVhSjCLtUvF0YAekdEbxujUF1JZ-DySe4AiYLdgmEUR1fgoyNoY2FvRoyCeeZztsnjOo8uuywVKy-Bi9pH__SiKHTu9YZS-q4WvP0g6xlBCdfXTUtMyGmzxiRdAGBAUiaYSkmoYKycW7b5XLIt18zC9d5UgQjDYTAtFesbRyilKpJFTt7fxarWREPHg',
  },
  {
    id: 'w3',
    title: "Premium Jean's for men",
    inrPrice: 500,
    inrOriginal: 899,
    usdPrice: 4.55,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCO1qYCdpxM2Jl1lvgW9qdeJiy-meEGdqu1b9mRp9ZMto1rgUToCA0joOyvs0E60meuWX5TyOpqZKWeOgqaE90ZnBv20WDyQ7Wr71a1QlyUOaJTdZy1iTyzzZ2-Rz5ohmzbnzcIR7eKQtxfZwVlDWoJSDQuqlEvWJN-L3WWKLP1AloGYU2GynMZgwrEa2aucr5FTeQoQTcMsnFZBGngxQHh6DOsBda7aW--p1Q43w',
  },
  {
    id: 'w4',
    title: "Premium Jean's for men",
    inrPrice: 500,
    inrOriginal: 899,
    usdPrice: 4.55,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBW_gd-W2-r2BXMIv0_LGt99_28G5qFaSG3qhqRWCBrRPKTUKKW13bTQWFnN3_TPkri6CQMWArun959pg5bJQAHxA4Er9N1tEsLVlF2IxpeNUJBjDvwD29ABiOnJhD1KzzsFE8bgxFp8TPq2xdyg8WoQsIkLS9aCxV69S5WeX5dyAscz3dksYZv98zQ6I8ze-6bz5PrWlOD0Qbw6LcaWVqx0YkkSlZ6mM10jSaoOg',
  },
  {
    id: 'w5',
    title: "Premium Jean's for men",
    inrPrice: 500,
    inrOriginal: 899,
    usdPrice: 4.55,
    discount: '68% OFF',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCD6z8Kqjf7ii_WUQvGJidL9hrL3o5C-9iwWE6MmVp-mlotFPIF7VvYgFNgR80qheYR0CGOmn8ar5rzPRoOOHPc0vbocB7_kE3hDOzpHe90wvqQVqr2v__LpDHjJdQQmP4ZUJrqeGKbL96MIzP59-siIV23_o7e5aaHaF6qkXI5a6cHj3HJhEQxIqfA0H9lEXynjnunAKgCIc5yeGZVt_LtDAtUtYYHq4Wh5BfC7g',
  },
];

export default function CheckoutAddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr1');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Address Form State
  const [newFullName, setNewFullName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newLocality, setNewLocality] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newType, setNewType] = useState<'Home' | 'Work'>('Home');

  // Sidebar Options
  const [activeTab, setActiveTab] = useState<'payment' | 'donation' | 'instructions'>('payment');
  const [paymentChoice, setPaymentChoice] = useState<'crypto' | 'inr'>('crypto');
  const [donationAmount, setDonationAmount] = useState<number>(0.1);
  const [isCustomDonation, setIsCustomDonation] = useState(false);
  const [customDonation, setCustomDonation] = useState('');

  // Instructions
  const [instructions, setInstructions] = useState<{
    gift: boolean;
    card: boolean;
    notag: boolean;
  }>({
    gift: false,
    card: false,
    notag: false,
  });
  const [greetingMsg, setGreetingMsg] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newMobile || !newPincode || !newStreet) {
      showToast('Please fill all required fields');
      return;
    }

    const newId = `addr_${Date.now()}`;
    const newAddr: Address = {
      id: newId,
      name: newFullName,
      type: newType,
      isDefault: false,
      line: `${newStreet}, ${newLocality ? newLocality + ', ' : ''}${newCity}, ${newState}`,
      pincode: newPincode,
      mobile: newMobile,
      eta: 'Estimated Delivery in 2-3 business days',
    };

    setAddresses([newAddr, ...addresses]);
    setSelectedAddressId(newId);
    setShowAddForm(false);
    showToast('New address saved and selected!');

    // Reset Form
    setNewFullName('');
    setNewMobile('');
    setNewPincode('');
    setNewLocality('');
    setNewStreet('');
    setNewCity('');
    setNewState('');
  };

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addresses.length <= 1) {
      showToast('You must have at least one delivery address');
      return;
    }
    const filtered = addresses.filter((a) => a.id !== id);
    setAddresses(filtered);
    if (selectedAddressId === id) {
      setSelectedAddressId(filtered[0].id);
    }
    showToast('Address removed');
  };

  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-gray-800 font-sans antialiased pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* BEGIN: CheckoutStepper */}
      <section className="border-b border-gray-200 py-3.5 bg-white/70">
        <div className="max-w-xl mx-auto flex items-center justify-between text-xs tracking-wide px-4">
          {/* Step 1: Cart (Completed) */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-medium"
          >
            <span className="w-4 h-4 rounded-full bg-[#14CDA8] text-white flex items-center justify-center text-[10px] font-bold">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>Cart</span>
          </Link>
          <div className="flex-1 h-[2px] bg-[#14CDA8] mx-3" />

          {/* Step 2: Address (Active) */}
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-[#FF3F6C] bg-[#FF3F6C] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-red-100">
              2
            </span>
            <span className="font-bold text-[#FF3F6C] tracking-tight">Address</span>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300 mx-3" />

          {/* Step 3: Payment */}
          <Link
            href="/checkout/payment"
            className="flex items-center gap-2 text-gray-400 hover:text-black font-medium"
          >
            <span className="w-3.5 h-3.5 rounded-full border border-gray-400 bg-white" />
            <span>Payment</span>
          </Link>
        </div>
      </section>
      {/* END: CheckoutStepper */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* Left Column: Address Selection (7 Columns) with vertical line divider */}
          <div className="lg:col-span-7 lg:pr-8 lg:border-r lg:border-slate-200 space-y-6" data-purpose="address-selection-container">
            {/* Header Section with count & Add button */}
            <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span>Select Delivery Address</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {addresses.length} Saved
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose where you want your items delivered
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-1.5 border border-[#FF3F6C] text-[#FF3F6C] hover:bg-red-50 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>+ Add New Address</span>
              </button>
            </div>

            {/* Saved Addresses List */}
            <div className="space-y-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <article
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`bg-white rounded-xl p-5 shadow-xs relative transition cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#14CDA8]'
                        : 'border border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="delivery_address"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 h-4 w-4 text-[#14CDA8] focus:ring-[#14CDA8] border-gray-300 cursor-pointer"
                        />
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{addr.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                                addr.type === 'Home'
                                  ? 'text-[#14CDA8] bg-[#14CDA8]/10'
                                  : 'text-slate-700 bg-slate-100'
                              }`}
                            >
                              {addr.type} {addr.isDefault ? '• Default' : ''}
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {addr.line} -{' '}
                            <span className="font-semibold text-gray-900">{addr.pincode}</span>
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1.5 pt-0.5">
                            <span className="font-medium text-gray-500">Mobile:</span>
                            <span className="font-semibold text-gray-900">{addr.mobile}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast(`Editing address for ${addr.name}`);
                          }}
                          className="text-xs font-semibold text-gray-600 hover:text-black hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300 text-xs">|</span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteAddress(addr.id, e)}
                          className="text-xs font-semibold text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#14CDA8] flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        {addr.eta}
                      </span>

                      {isSelected ? (
                        <Link
                          href="/checkout/payment"
                          className="bg-[#FF3F6C] hover:opacity-90 text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs transition-opacity"
                        >
                          Deliver Here
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAddressId(addr.id);
                          }}
                          className="border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-bold px-4 py-1.5 rounded-lg bg-white transition-colors"
                        >
                          Deliver to this Address
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Add New Address Form Section */}
            {showAddForm && (
              <form
                onSubmit={handleSaveAddress}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs space-y-4 animate-in fade-in"
                id="add-address-form"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">Add New Delivery Address</h3>
                  <span className="text-[11px] text-gray-400">* All fields required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">10-digit Mobile Number</label>
                    <input
                      type="tel"
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">Pincode / Postal Code</label>
                    <input
                      type="text"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      placeholder="6 digits [0-9]"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">Locality / Town</label>
                    <input
                      type="text"
                      value={newLocality}
                      onChange={(e) => setNewLocality(e.target.value)}
                      placeholder="e.g. Sector 14, Near City Mall"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-gray-700 font-semibold">
                      Flat, House no., Building, Street
                    </label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="Detailed address line"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">City / District</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-700 font-semibold">State</label>
                    <input
                      type="text"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      placeholder="e.g. Delhi"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Address Type
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="radio"
                        checked={newType === 'Home'}
                        onChange={() => setNewType('Home')}
                        className="h-3.5 w-3.5 text-[#FF3F6C] focus:ring-0"
                      />
                      <span className="font-medium text-gray-800">Home (All day delivery)</span>
                    </label>

                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="radio"
                        checked={newType === 'Work'}
                        onChange={() => setNewType('Work')}
                        className="h-3.5 w-3.5 text-[#FF3F6C] focus:ring-0"
                      />
                      <span className="font-medium text-gray-800">
                        Work (Delivery 10 AM - 5 PM)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3 border-t border-gray-100">
                  <button
                    type="submit"
                    className="bg-[#FF3F6C] hover:opacity-90 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-xs transition-opacity cursor-pointer"
                  >
                    Save and Deliver Here
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs font-semibold text-gray-600 hover:text-black py-2.5 px-3 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Trust Assurance Banner */}
            <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 flex items-center justify-between text-xs text-gray-600 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#14CDA8]/10 text-[#14CDA8] flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium text-gray-800">
                  100% Secure Delivery &amp; Verified Courier Partners
                </span>
              </div>
              <span className="text-[11px] text-gray-400 font-normal">
                Contactless Delivery Available
              </span>
            </div>
          </div>

          {/* Right Column: Checkout Sidebar (5 Columns) */}
          <div className="lg:col-span-5 lg:pl-8 space-y-6" data-purpose="checkout-sidebar">
            {/* Delivery Destination Section */}
            <div className="pb-6 border-b border-slate-200 flex items-start justify-between">
              <div className="space-y-1 pr-3">
                <p className="text-xs text-gray-500 font-medium">Delivery to</p>
                <p className="text-xs font-bold text-gray-900">
                  {activeAddress.name} , {activeAddress.pincode}
                </p>
                <p className="text-[11px] text-gray-600 leading-snug">{activeAddress.line}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="bg-[#F8F9FA] hover:bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Segmented Options Section */}
            <div className="pb-6 border-b border-slate-200">
              {/* Segmented Tab Header */}
              <div
                className="border border-slate-300 rounded-lg p-0.5 flex text-xs font-medium text-slate-700 text-center mb-4 bg-gray-50/50"
                role="tablist"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('payment')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'payment'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Payment method
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('donation')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'donation'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Donation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('instructions')}
                  className={`flex-1 py-1.5 px-2 rounded font-semibold transition ${
                    activeTab === 'instructions'
                      ? 'bg-white text-slate-900 border border-slate-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Instructions
                </button>
              </div>

              {/* Tab 1: Payment Choice */}
              {activeTab === 'payment' && (
                <div className="space-y-3 pt-1">
                  <label
                    onClick={() => setPaymentChoice('crypto')}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      paymentChoice === 'crypto'
                        ? 'border-slate-900 bg-gray-50/80'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentChoice === 'crypto'}
                      onChange={() => setPaymentChoice('crypto')}
                      className="mt-1 h-4 w-4 text-black focus:ring-black border-slate-400 cursor-pointer"
                    />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">Crypto</span>
                        <span className="text-[10px] text-[#14CDA8] font-bold bg-[#14CDA8]/10 px-2 py-0.5 rounded">
                          Instant &amp; 5% Bonus
                        </span>
                      </div>
                      <p className="text-gray-500 mt-0.5 leading-relaxed text-[11px]">
                        Pay with Bitcoin, Ethereum, USDT, and more secure &amp; borderless.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentChoice('inr')}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      paymentChoice === 'inr'
                        ? 'border-slate-900 bg-gray-50/80'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentChoice === 'inr'}
                      onChange={() => setPaymentChoice('inr')}
                      className="mt-1 h-4 w-4 text-black focus:ring-black border-slate-400 cursor-pointer"
                    />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">INR / Fiat</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          Cards • UPI • Wallets
                        </span>
                      </div>
                      <p className="text-gray-500 mt-0.5 leading-relaxed text-[11px]">
                        Multiple payment options, including cards, UPI, and wallets, for your
                        convenience.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Tab 2: Donation */}
              {activeTab === 'donation' && (
                <div className="pt-1 space-y-4">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-800">
                      Donate to{' '}
                      <span className="border-b border-slate-400 font-bold text-gray-900">
                        EcoGreen Fund
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[0.1, 0.5, 1.0].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amt);
                          setIsCustomDonation(false);
                        }}
                        className={`px-3.5 py-1 text-xs border rounded-full font-medium transition cursor-pointer ${
                          !isCustomDonation && donationAmount === amt
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-slate-800 border-slate-300'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsCustomDonation(true)}
                      className={`px-3.5 py-1 text-xs border rounded-full font-medium transition cursor-pointer ${
                        isCustomDonation
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-slate-800 border-slate-300'
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                  {isCustomDonation && (
                    <input
                      type="number"
                      step="0.1"
                      value={customDonation}
                      onChange={(e) => setCustomDonation(e.target.value)}
                      placeholder="Enter custom amount in USD"
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 outline-none"
                    />
                  )}
                </div>
              )}

              {/* Tab 3: Instructions */}
              {activeTab === 'instructions' && (
                <div className="pt-1 space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, gift: !prev.gift }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.gift
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span className="text-[10px]">Gift Pack</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, card: !prev.card }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.card
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-[10px]">Greeting Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setInstructions((prev) => ({ ...prev, notag: !prev.notag }))
                      }
                      className={`border rounded-lg p-3 flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        instructions.notag
                          ? 'border-slate-900 bg-gray-50 text-black font-bold'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Tag className="w-4 h-4" />
                      <span className="text-[10px]">No Price Tag</span>
                    </button>
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold text-slate-800 mb-1.5"
                      htmlFor="greeting-note"
                    >
                      Message for Greeting Card
                    </label>
                    <textarea
                      id="greeting-note"
                      value={greetingMsg}
                      onChange={(e) => setGreetingMsg(e.target.value)}
                      placeholder="Write your greeting note here..."
                      className="w-full h-16 text-xs p-2.5 rounded-lg border border-slate-300 outline-none resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Price Details Breakdown */}
            <div className="pt-1">
              <h3 className="text-xs font-bold text-gray-800 pb-3 border-b border-slate-200 uppercase tracking-wide">
                Price Details (2 items)
              </h3>
              <div className="space-y-3 text-xs pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Price (2 items)</span>
                  <span className="font-bold text-gray-900">$16.7</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>1st item (2)</span>
                  <div className="space-x-1.5">
                    <span className="font-medium text-gray-900">$4.55</span>
                    <span className="line-through text-gray-400 text-[11px]">$7.4</span>
                    <span className="text-[#14CDA8] font-semibold text-[11px]">(68% OFF)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>2nd item (2)</span>
                  <div className="space-x-1.5">
                    <span className="font-medium text-gray-900">$4.55</span>
                    <span className="line-through text-gray-400 text-[11px]">$9.3</span>
                    <span className="text-[#14CDA8] font-semibold text-[11px]">(68% OFF)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Discount</span>
                  <div className="space-x-1">
                    <span className="text-red-500 font-bold">-$7.50</span>
                    <span className="text-[#14CDA8] font-semibold text-[11px]">(48% OFF)</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>Coupons</span>
                  <span className="text-gray-500">No coupon applied</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>Platform Fee</span>
                  <span className="text-gray-900 font-medium">$0.10</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>Delivery Charges</span>
                  <div className="space-x-1">
                    <span className="line-through text-gray-400 text-[11px]">$0.89</span>
                    <span className="text-[#FF3F6C] font-semibold">Free</span>
                  </div>
                </div>
                <div className="pt-3.5 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <div className="space-x-1.5 flex items-center">
                    <span className="text-base font-black text-gray-900">$9.10</span>
                    <span className="text-[#14CDA8] font-bold text-xs">(48% OFF)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-gray-900">$9.10</span>
                <Link
                  href="/checkout/payment"
                  className="bg-[#FF3F6C] hover:bg-[#e0355e] text-white px-8 py-3 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  Continue to Payment
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <span>Protected by black rocks</span>
            </div>
          </div>
        </div>
      </main>

      {/* Wishlist Recommendation Grid at Bottom */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full border-t border-gray-200/60 mt-4"
        data-purpose="wishlist-section"
      >
        <h2 className="text-xl font-serif text-gray-900 mb-6 font-normal">Wishlist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {wishlistItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col shadow-xs hover:shadow-md transition"
            >
              <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden">
                <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
              </div>
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] mt-1">
                    <span className="font-bold text-gray-900">₹ {item.inrPrice} /-</span>
                    <span className="line-through text-gray-400">Rs. {item.inrOriginal}</span>
                    <span className="text-[#14CDA8] font-medium">({item.discount})</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] mt-0.5">
                    <span className="font-bold text-gray-900">${item.usdPrice}</span>
                    <span className="line-through text-gray-400">${item.usdPrice}</span>
                    <span className="text-[#14CDA8] font-medium">({item.discount})</span>
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <button
                    type="button"
                    onClick={() => showToast(`Moved "${item.title}" to Cart!`)}
                    className="text-red-500 hover:text-red-600 text-xs font-semibold underline decoration-1 underline-offset-4 cursor-pointer"
                  >
                    Move To Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
