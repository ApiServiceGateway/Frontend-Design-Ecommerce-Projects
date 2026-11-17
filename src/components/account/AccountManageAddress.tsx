'use client';

import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  User,
  Phone,
  Building2,
  MapPin,
  Compass,
  Hash,
} from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  type: 'HOME' | 'WORK';
  addressLine: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export const AccountManageAddress: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form error & touched state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'PARDEEP KUMAR',
      phone: '9876543210',
      type: 'HOME',
      addressLine: 'Flat 402, Sunset Boulevard, 14th Road',
      locality: 'Bandra West, Near Mehboob Studio',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'PARDEEP KUMAR',
      phone: '9876543210',
      type: 'WORK',
      addressLine: 'Level 8, Atelier Design Tower, Maker Chamber IV',
      locality: 'Nariman Point, Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400021',
      isDefault: false,
    },
  ]);

  // Form states (pure manual input, no auto-fill)
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    addressLine: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    type: 'HOME' | 'WORK';
  }>({
    name: '',
    phone: '',
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    type: 'HOME',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    showToast('Default delivery address updated.');
  };

  const handleConfirmDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setDeleteConfirmId(null);
    showToast('Address removed successfully.');
  };

  // Field validations
  const getFieldError = (field: string): string | null => {
    switch (field) {
      case 'name':
        if (!formData.name.trim()) return 'Full name is required.';
        if (!/^[a-zA-Z\s.]+$/.test(formData.name.trim())) return 'Only letters and spaces are allowed.';
        if (formData.name.trim().length < 2) return 'Name must be at least 2 characters.';
        return null;
      case 'phone': {
        const clean = formData.phone.replace(/\D/g, '');
        if (!clean) return 'Mobile number is required.';
        if (clean.length !== 10) return 'Must be exactly 10 digits.';
        if (!/^[6-9]\d{9}$/.test(clean)) return 'Must start with 6, 7, 8, or 9.';
        return null;
      }
      case 'addressLine':
        if (!formData.addressLine.trim()) return 'Flat, House no., Building is required.';
        if (formData.addressLine.trim().length < 3) return 'Please enter complete house/flat details.';
        return null;
      case 'locality':
        if (!formData.locality.trim()) return 'Area, Street, or Colony is required.';
        if (formData.locality.trim().length < 2) return 'Please enter complete area details.';
        return null;
      case 'city':
        if (!formData.city.trim()) return 'Town / City is required.';
        return null;
      case 'state':
        if (!formData.state.trim()) return 'State is required.';
        return null;
      case 'pincode': {
        const clean = formData.pincode.replace(/\D/g, '');
        if (!clean) return '6-digit Pincode is required.';
        if (clean.length !== 6) return 'Pincode must be exactly 6 digits.';
        return null;
      }
      default:
        return null;
    }
  };

  const isFormValid =
    !getFieldError('name') &&
    !getFieldError('phone') &&
    !getFieldError('addressLine') &&
    !getFieldError('locality') &&
    !getFieldError('city') &&
    !getFieldError('state') &&
    !getFieldError('pincode');

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTouched({
      name: true,
      phone: true,
      addressLine: true,
      locality: true,
      city: true,
      state: true,
      pincode: true,
    });

    if (!isFormValid) {
      showToast('Please correct the highlighted fields.');
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...formData } : a))
      );
      showToast('Address updated successfully!');
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [newAddr, ...prev]);
      showToast('New address added successfully!');
    }
    setShowAddForm(false);
    setEditingId(null);
    setFormSubmitted(false);
    setTouched({});
  };

  const handleEditClick = (addr: Address) => {
    setFormData({
      name: addr.name,
      phone: addr.phone,
      addressLine: addr.addressLine,
      locality: addr.locality,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      type: addr.type,
    });
    setEditingId(addr.id);
    setShowAddForm(true);
    setFormSubmitted(false);
    setTouched({});
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      phone: '',
      addressLine: '',
      locality: '',
      city: '',
      state: '',
      pincode: '',
      type: 'HOME',
    });
    setShowAddForm(true);
    setFormSubmitted(false);
    setTouched({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/90 p-6 sm:p-8 space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#01AFB5] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
            Saved Addresses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your delivery locations and dispatch preferences
          </p>
        </div>

        {!showAddForm && (
          <button
            type="button"
            onClick={handleOpenAddForm}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#01AFB5] text-[#01AFB5] hover:bg-[#01AFB5] hover:text-white rounded-lg text-xs font-semibold tracking-wide uppercase transition shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ ADD NEW ADDRESS</span>
          </button>
        )}
      </div>

      {/* Form View */}
      {showAddForm ? (
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormSubmitted(false);
                setTouched({});
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Addresses</span>
            </button>
          </div>

          {/* Form with noValidate to completely prevent default browser tooltips */}
          <form onSubmit={handleSaveAddress} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value.replace(/[^a-zA-Z\s.]/g, ''),
                      })
                    }
                    onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                    placeholder="e.g. PARDEEP KUMAR"
                    className={`w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.name || formSubmitted) && getFieldError('name')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.name || formSubmitted) && getFieldError('name') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('name')}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold text-slate-500 ml-0.5">+91</span>
                    <span className="text-slate-300">|</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                      })
                    }
                    onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                    placeholder="10-digit mobile number"
                    className={`w-full h-11 pl-20 pr-3.5 font-mono text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.phone || formSubmitted) && getFieldError('phone')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.phone || formSubmitted) && getFieldError('phone') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('phone')}</span>
                  </p>
                )}
              </div>

              {/* Flat / House No */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Flat, House no., Building, Apartment <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Flat 402, Sunset Boulevard"
                    value={formData.addressLine}
                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    onBlur={() => setTouched((p) => ({ ...p, addressLine: true }))}
                    className={`w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.addressLine || formSubmitted) && getFieldError('addressLine')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.addressLine || formSubmitted) && getFieldError('addressLine') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('addressLine')}</span>
                  </p>
                )}
              </div>

              {/* Area / Street / Locality */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Area, Street, Sector, Village, Landmark <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Bandra West, Near Mehboob Studio"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    onBlur={() => setTouched((p) => ({ ...p, locality: true }))}
                    className={`w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.locality || formSubmitted) && getFieldError('locality')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.locality || formSubmitted) && getFieldError('locality') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('locality')}</span>
                  </p>
                )}
              </div>

              {/* Town / City */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Town / City <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    onBlur={() => setTouched((p) => ({ ...p, city: true }))}
                    placeholder="e.g. Mumbai"
                    className={`w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.city || formSubmitted) && getFieldError('city')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.city || formSubmitted) && getFieldError('city') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('city')}</span>
                  </p>
                )}
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  State <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    onBlur={() => setTouched((p) => ({ ...p, state: true }))}
                    placeholder="e.g. Maharashtra"
                    className={`w-full h-11 pl-10 pr-3.5 text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.state || formSubmitted) && getFieldError('state')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.state || formSubmitted) && getFieldError('state') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('state')}</span>
                  </p>
                )}
              </div>

              {/* Pincode */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                      })
                    }
                    onBlur={() => setTouched((p) => ({ ...p, pincode: true }))}
                    placeholder="6-digit PIN code"
                    className={`w-full h-11 pl-10 pr-3.5 font-mono text-xs sm:text-sm rounded-xl border bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 transition outline-none ${
                      (touched.pincode || formSubmitted) && getFieldError('pincode')
                        ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                        : 'border-slate-200 hover:border-slate-300 focus:border-[#01AFB5] focus:ring-2 focus:ring-[#01AFB5]/15'
                    }`}
                  />
                </div>
                {(touched.pincode || formSubmitted) && getFieldError('pincode') && (
                  <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span>{getFieldError('pincode')}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Address Type Selection */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-700 block">Address Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'HOME' })}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    formData.type === 'HOME'
                      ? 'border-[#01AFB5] bg-[#01AFB5]/10 text-[#01AFB5] ring-1 ring-[#01AFB5]'
                      : 'border-slate-200 text-slate-600 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'WORK' })}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    formData.type === 'WORK'
                      ? 'border-[#01AFB5] bg-[#01AFB5]/10 text-[#01AFB5] ring-1 ring-[#01AFB5]'
                      : 'border-slate-200 text-slate-600 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Work</span>
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setFormSubmitted(false);
                  setTouched({});
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#01AFB5] hover:bg-[#009da2] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md cursor-pointer transition active:scale-[0.98]"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Address Cards List (Original Frontend Design) */
        <div className="space-y-4">
          {addresses.map((addr) => {
            const isDeleting = deleteConfirmId === addr.id;

            return (
              <div
                key={addr.id}
                className={`border rounded-xl p-5 transition bg-white shadow-xs ${
                  addr.isDefault
                    ? 'border-emerald-300 ring-1 ring-emerald-100'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {isDeleting ? (
                  /* Smooth Inline Delete Confirmation */
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-3 text-xs animate-in fade-in">
                    <div className="flex items-center gap-2 text-rose-800 font-medium">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Are you sure you want to remove this delivery address?</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmDelete(addr.id)}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            DEFAULT ADDRESS
                          </span>
                        )}
                        <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                          {addr.type === 'HOME' ? <Home className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          <span>{addr.type}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(addr)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded hover:bg-slate-100 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(addr.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded hover:bg-slate-100 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="font-bold text-slate-800 text-sm">{addr.name}</div>
                      <div>{addr.addressLine}</div>
                      <div>{addr.locality}</div>
                      <div>
                        {addr.city}, {addr.state} -{' '}
                        <span className="font-mono font-bold text-slate-700">{addr.pincode}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1">Phone: {addr.phone}</div>
                    </div>

                    {!addr.isDefault && (
                      <div className="pt-3 mt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleSetDefault(addr.id)}
                          className="text-xs font-semibold text-[#01AFB5] hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
