'use client';

import React, { useState, useRef } from 'react';
import { Camera, Check, AlertCircle, Lock, Mail, ArrowRight, ShieldCheck, Phone, Calendar, User, MapPin, BellRing, Sparkles } from 'lucide-react';
import { AccountTab } from './AccountSidebar';

interface AccountEditProfileProps {
  initialName?: string;
  initialDob?: string;
  initialEmail?: string;
  onProfileUpdated?: (name: string, dob: string) => void;
  onNavigateTab?: (tab: AccountTab) => void;
}

export const AccountEditProfile: React.FC<AccountEditProfileProps> = ({
  initialName = 'Dipanshu',
  initialDob = '2001-04-23',
  initialEmail = 'dipanshu@example.com',
  onProfileUpdated,
  onNavigateTab,
}) => {
  const [firstName, setFirstName] = useState(initialName.split(' ')[0] || 'Dipanshu');
  const [lastName, setLastName] = useState(initialName.split(' ')[1] || 'Sharma');
  const [dob, setDob] = useState(initialDob);
  const [anniversary, setAnniversary] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('+91 94665 03764');
  const [altPhone, setAltPhone] = useState('+91 98123 45678');
  const [email] = useState(initialEmail);
  const [city, setCity] = useState('Gurugram');
  const [pincode, setPincode] = useState('122002');
  const [language, setLanguage] = useState('English');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [emailOffers, setEmailOffers] = useState(true);

  // Active Images State with File Upload
  const [avatarUrl, setAvatarUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAt7ZQDjLfHoX3s9WOGLLNV1EHbGzEO62d43kWEvjwmYcMO8fjV_LcFc0mjIuqtg_PBCaJ6QSpKXTEbVJ_8gaFsvrn6sU9kSDU-bBAzn5IGGrXlEWEcW8IVrfIaz2zJqx36fV1j1WO0bDw4Hp1oq_iUPuoEbdAMtKRDInuhfNi8kH4tp98jO0AWQ72oQboKbyMtKYm5NbvtooDICnGxRjiMr2oisnIiIB2dyQk9WQTx8XyYUGqom5o'
  );
  const [coverUrl, setCoverUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCwG4WbxArsV2nSOTxZxaTknfKbWYFNQvTR-b7YcqCpWtSzb5Egt4-Ff3djk2CsaEHEyFSSH6izt1zWCZh1muz55l_2LWw96CbshPeTq2eCL1-V-35iIHG-RK0RZkcYPKxzmKkfPyNfuLHNSuG3CWX243qwFYOcQ8dy3jMWRnYk7bHw7l_cQT2787phfWkOattFNg-VGtslbqwhLl7TLLruyPiW3bY78F1-2o_tw'
  );

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
          setUploadToast('Profile photo updated successfully!');
          setTimeout(() => setUploadToast(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('Cover image exceeds 15MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverUrl(event.target.result as string);
          setUploadToast('Cover banner updated successfully!');
          setTimeout(() => setUploadToast(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (onProfileUpdated) {
      onProfileUpdated(fullName, dob);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6" data-purpose="account-edit-profile">
      {/* Hidden file inputs for real image uploading */}
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarFile}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={coverInputRef}
        onChange={handleCoverFile}
        accept="image/*"
        className="hidden"
      />

      {/* Cover Banner with Live Upload */}
      <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-900 border border-slate-200/90 rounded-2xl group">
        <img
          alt="Profile cover banner"
          className="w-full h-full object-cover object-center filter saturate-110"
          src={coverUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-sm transition cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-slate-600" />
            <span>Change Cover</span>
          </button>
        </div>
      </div>

      {/* Avatar Bar with Overlap and Live File Upload */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white shadow-md overflow-hidden group">
            <img
              alt="User avatar"
              className="w-full h-full object-cover"
              src={avatarUrl}
            />
            {/* Click to change avatar overlay */}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 hover:bg-black/60 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer opacity-0 group-hover:opacity-100"
              title="Click to upload profile photo"
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
            </button>
          </div>

          <div className="space-y-0.5 pb-1">
            <h2 className="text-xl font-bold text-slate-900">{firstName} {lastName}</h2>
            <p className="text-xs text-slate-500 font-mono">Customer ID: #USR-9466503764</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => avatarInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Camera className="w-3.5 h-3.5 text-[#01AFB5]" />
          <span>Upload Profile Photo</span>
        </button>
      </div>

      {/* Upload Feedback Toast */}
      {uploadToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{uploadToast}</span>
        </div>
      )}

      {/* Saved Success Alert */}
      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Form: Standard Detailed Ecommerce Fields */}
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        {/* Section 1: Basic Identity Information */}
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#01AFB5]" />
              <span>Personal Information</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">* Required fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                First Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-10 px-3.5 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-10 px-3.5 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">Anniversary</label>
                <span className="text-[10px] text-slate-400">For special perks</span>
              </div>
              <input
                type="date"
                value={anniversary}
                onChange={(e) => setAnniversary(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#01AFB5]" />
              <span>Contact &amp; Delivery Reachability</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">Primary Mobile Number</label>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Verified
                </span>
              </div>
              <input
                type="text"
                readOnly
                value={phone}
                className="w-full h-10 px-3.5 text-xs bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-not-allowed font-mono"
              />
              <p className="text-[11px] text-slate-400">Used for OTP logins and delivery updates.</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">Alternate Phone Number</label>
                <span className="text-[10px] text-slate-400">Optional</span>
              </div>
              <input
                type="text"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
                placeholder="+91 Mobile number"
                className="w-full h-10 px-3.5 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition font-mono"
              />
              <p className="text-[11px] text-slate-400">Used by delivery partner if primary is unreachable.</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">Registered Email Address</label>
              <button
                type="button"
                onClick={() => onNavigateTab?.('email')}
                className="text-[11px] font-semibold text-[#01AFB5] hover:underline cursor-pointer"
              >
                Change Email →
              </button>
            </div>
            <input
              type="email"
              readOnly
              value={email}
              className="w-full h-10 px-3.5 text-xs bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-not-allowed font-mono"
            />
          </div>
        </div>

        {/* Section 3: Delivery Location & Preferences */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#01AFB5]" />
              <span>Location &amp; Communication Preferences</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab?.('address')}
              className="text-[11px] font-semibold text-[#01AFB5] hover:underline cursor-pointer"
            >
              Manage Addresses →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Default City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-10 px-3.5 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Default Pincode</label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full h-10 px-3.5 text-xs font-mono bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Preferred Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:ring-1 focus:ring-[#01AFB5] outline-none transition cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Hinglish">Hinglish</option>
              </select>
            </div>
          </div>

          {/* Communication Checkboxes */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappUpdates}
                onChange={(e) => setWhatsappUpdates(e.target.checked)}
                className="mt-0.5 rounded text-[#01AFB5] focus:ring-[#01AFB5]"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">WhatsApp Order Alerts</span>
                <span className="text-[11px] text-slate-500">
                  Receive live dispatch updates, courier agent numbers, and OTP notifications directly on WhatsApp.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailOffers}
                onChange={(e) => setEmailOffers(e.target.checked)}
                className="mt-0.5 rounded text-[#01AFB5] focus:ring-[#01AFB5]"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">VIP Drops &amp; Exclusive Perks</span>
                <span className="text-[11px] text-slate-500">
                  Early access invites to midnight luxury drops and personalized voucher passes.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
