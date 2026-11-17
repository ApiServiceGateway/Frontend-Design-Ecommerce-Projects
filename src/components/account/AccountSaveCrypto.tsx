'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Copy,
  Check,
  Plus,
  ArrowLeft,
  Lock,
  Trash2,
  Edit3,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export type Stablecoin = 'USDT' | 'USDC';

export interface CryptoChain {
  id: string;
  name: string;
  networkType: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  addressFormat: string;
  validate: (addr: string) => boolean;
  formatDescription: string;
  recommended?: boolean;
}

// Available chains for USDT and USDC
export const USDT_CHAINS: CryptoChain[] = [
  {
    id: 'usdt-trc20',
    name: 'TRON (TRC-20)',
    networkType: 'TRC-20',
    dotColor: 'bg-red-500',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    badgeText: 'Lowest Fee & Fast',
    addressFormat: 'Starts with T (34 chars)',
    validate: (a) => /^T[1-9A-HJ-NP-za-km-z]{33}$/.test(a.trim()),
    formatDescription: 'TRON address starts with "T" followed by 33 Base58 characters',
    recommended: true,
  },
  {
    id: 'usdt-erc20',
    name: 'Ethereum (ERC-20)',
    networkType: 'ERC-20',
    dotColor: 'bg-indigo-500',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Ethereum Mainnet',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'EVM address starts with "0x" followed by 40 hexadecimal characters',
  },
  {
    id: 'usdt-bep20',
    name: 'BNB Smart Chain (BEP-20)',
    networkType: 'BEP-20',
    dotColor: 'bg-amber-500',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'Low Fee',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'BSC address starts with "0x" followed by 40 hexadecimal characters',
  },
  {
    id: 'usdt-polygon',
    name: 'Polygon (POL / PoS)',
    networkType: 'Polygon',
    dotColor: 'bg-purple-500',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'Instant & Low Cost',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Polygon EVM address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdt-solana',
    name: 'Solana (SPL)',
    networkType: 'SPL',
    dotColor: 'bg-teal-500',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'Sub-second Finality',
    addressFormat: 'Base58 (32–44 chars)',
    validate: (a) => /^[1-9A-HJ-NP-za-km-z]{32,44}$/.test(a.trim()),
    formatDescription: 'Solana SPL address is 32 to 44 alphanumeric characters',
  },
  {
    id: 'usdt-arbitrum',
    name: 'Arbitrum One (L2)',
    networkType: 'Arbitrum',
    dotColor: 'bg-sky-500',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'L2 Rollup',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Arbitrum EVM address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdt-ton',
    name: 'The Open Network (TON)',
    networkType: 'TON',
    dotColor: 'bg-cyan-500',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    badgeText: 'Telegram Ecosystem',
    addressFormat: 'Starts with EQ / UQ (48 chars)',
    validate: (a) => /^(EQ|UQ)[a-zA-Z0-9_-]{46}$/.test(a.trim()),
    formatDescription: 'TON address starts with EQ or UQ (48 characters)',
  },
  {
    id: 'usdt-optimism',
    name: 'Optimism (OP Mainnet)',
    networkType: 'OP',
    dotColor: 'bg-rose-500',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'OP Superchain',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Optimism EVM address starts with "0x" followed by 40 hex characters',
  },
];

export const USDC_CHAINS: CryptoChain[] = [
  {
    id: 'usdc-erc20',
    name: 'Ethereum (ERC-20)',
    networkType: 'ERC-20',
    dotColor: 'bg-indigo-500',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Native USDC',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'EVM address starts with "0x" followed by 40 hexadecimal characters',
    recommended: true,
  },
  {
    id: 'usdc-solana',
    name: 'Solana (SPL)',
    networkType: 'SPL',
    dotColor: 'bg-teal-500',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'Instant Transfer',
    addressFormat: 'Base58 (32–44 chars)',
    validate: (a) => /^[1-9A-HJ-NP-za-km-z]{32,44}$/.test(a.trim()),
    formatDescription: 'Solana SPL address is 32 to 44 alphanumeric characters',
    recommended: true,
  },
  {
    id: 'usdc-polygon',
    name: 'Polygon (POL / PoS)',
    networkType: 'Polygon',
    dotColor: 'bg-purple-500',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'Native USDC',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Polygon EVM address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdc-base',
    name: 'Base (Coinbase L2)',
    networkType: 'Base',
    dotColor: 'bg-blue-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'Low Gas L2',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Base EVM address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdc-arbitrum',
    name: 'Arbitrum One (L2)',
    networkType: 'Arbitrum',
    dotColor: 'bg-sky-500',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'Arbitrum Native',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Arbitrum EVM address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdc-bep20',
    name: 'BNB Smart Chain (BEP-20)',
    networkType: 'BEP-20',
    dotColor: 'bg-amber-500',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'Binance Pegged',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'BSC address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdc-avalanche',
    name: 'Avalanche (C-Chain)',
    networkType: 'AVAX C-Chain',
    dotColor: 'bg-red-600',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    badgeText: 'Subnet Speed',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Avalanche C-Chain address starts with "0x" followed by 40 hex characters',
  },
  {
    id: 'usdc-optimism',
    name: 'Optimism (OP Mainnet)',
    networkType: 'OP',
    dotColor: 'bg-rose-500',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'OP Native',
    addressFormat: 'Starts with 0x (42 chars)',
    validate: (a) => /^0x[a-fA-F0-9]{40}$/.test(a.trim()),
    formatDescription: 'Optimism EVM address starts with "0x" followed by 40 hex characters',
  },
];

export interface CryptoEntry {
  id: string;
  coin: Stablecoin;
  chainId: string;
  chainName: string;
  networkType: string;
  dotColor: string;
  label: string;
  address: string;
  fullAddress: string;
  addedAgo: string;
}

// ==========================================
// OFFICIAL VECTOR LOGOS FOR USDT & USDC
// ==========================================
export const USDTLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} rounded-full bg-[#26A17B] flex items-center justify-center shrink-0 shadow-2xs`} title="Tether (USDT)">
    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 32 32" fill="currentColor">
      <path d="M17.9 17.1c-.2 0-.8 0-1.9 0-1.1 0-1.7 0-1.9 0-4.8-.2-8.4-1.2-8.4-2.5 0-1.2 3.6-2.3 8.4-2.5v4c.2 0 .8 0 1.9 0 1.1 0 1.7 0 1.9 0v-4c4.8.2 8.4 1.2 8.4 2.5 0 1.2-3.6 2.3-8.4 2.5v2.5zm0-7.3V6.2h6.5V2.3H7.6v3.9h6.5v3.6c-5.5.3-9.7 1.6-9.7 3.2 0 1.6 4.2 2.9 9.7 3.2v9.3h3.8V16.3c5.5-.3 9.7-1.6 9.7-3.2 0-1.6-4.2-2.9-9.7-3.3z" />
    </svg>
  </div>
);

export const USDCLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <div className={`${className} rounded-full bg-[#2775CA] flex items-center justify-center shrink-0 shadow-2xs`} title="USD Coin (USDC)">
    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2.7C8.7 2.7 2.7 8.7 2.7 16s6 13.3 13.3 13.3 13.3-6 13.3-13.3S23.3 2.7 16 2.7zm0 24C10.1 26.7 5.3 21.9 5.3 16S10.1 5.3 16 5.3s10.7 4.8 10.7 10.7-4.8 10.7-10.7 10.7zm1.3-18.7h-2.7v2.2c-2.3.4-3.8 2-3.8 3.9 0 2.2 1.6 3.3 4.2 3.8 1.9.4 2.5 1 2.5 2 0 1.1-1 1.9-2.5 1.9-1.9 0-2.8-.8-3.1-2.1l-2.4 1c.5 2 2.1 3.2 4.1 3.6v2.1h2.7v-2.1c2.4-.4 4.1-2 4.1-4.2 0-2.4-1.8-3.5-4.4-4-1.8-.4-2.3-1-2.3-1.8s.8-1.7 2.2-1.7c1.4 0 2.2.6 2.6 1.7l2.4-1c-.5-1.7-1.8-2.9-3.6-3.3V8z" />
    </svg>
  </div>
);

export const AccountSaveCrypto: React.FC = () => {
  const [view, setView] = useState<'list' | 'add'>('list');
  const [allowlistingActive, setAllowlistingActive] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeTabFilter, setActiveTabFilter] = useState<'ALL' | 'USDT' | 'USDC'>('ALL');

  // Initial saved addresses exclusively for USDT and USDC
  const [savedAddresses, setSavedAddresses] = useState<CryptoEntry[]>([
    {
      id: 'usdt-1',
      coin: 'USDT',
      chainId: 'usdt-trc20',
      chainName: 'TRON (TRC-20)',
      networkType: 'TRC-20',
      dotColor: 'bg-red-500',
      label: 'Main Binance Deposit',
      address: 'TXvF4...9qLm1',
      fullAddress: 'TXvF4p81gX48Qj2Kmv7DivfNa9qLm1Tether',
      addedAgo: 'added 2d ago',
    },
    {
      id: 'usdt-2',
      coin: 'USDT',
      chainId: 'usdt-bep20',
      chainName: 'BNB Smart Chain (BEP-20)',
      networkType: 'BEP-20',
      dotColor: 'bg-amber-500',
      label: 'Trust Wallet USDT',
      address: '0x71C...7y6g0',
      fullAddress: '0x71CB42bE9698d24bB4086653E9eBbnb1g7y6g0',
      addedAgo: 'added 5d ago',
    },
    {
      id: 'usdc-1',
      coin: 'USDC',
      chainId: 'usdc-solana',
      chainName: 'Solana (SPL)',
      networkType: 'SPL',
      dotColor: 'bg-teal-500',
      label: 'Phantom USDC Vault',
      address: '7y9gA...vfNa',
      fullAddress: '7y9gA73s6wQ8K1zPmv7DivfNaPhantomSolanaUSDC',
      addedAgo: 'added 1w ago',
    },
    {
      id: 'usdc-2',
      coin: 'USDC',
      chainId: 'usdc-erc20',
      chainName: 'Ethereum (ERC-20)',
      networkType: 'ERC-20',
      dotColor: 'bg-indigo-500',
      label: 'Cold Storage Ledger',
      address: '0x1A1...vfNa',
      fullAddress: '0x1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNaUSDC',
      addedAgo: 'added 2w ago',
    },
  ]);

  // Add Form state: restricted to ONLY USDT or USDC
  const [selectedCoin, setSelectedCoin] = useState<Stablecoin>('USDT');
  const [selectedChainId, setSelectedChainId] = useState<string>('usdt-trc20');
  const [walletLabel, setWalletLabel] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Active chain definitions according to selected coin
  const activeChainList = selectedCoin === 'USDT' ? USDT_CHAINS : USDC_CHAINS;
  const currentChain = activeChainList.find((c) => c.id === selectedChainId) || activeChainList[0];

  // Address validation check
  const isAddressValid = currentChain.validate(walletAddress);
  const isLabelValid = walletLabel.trim().length >= 2;

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDelete = (id: string) => {
    setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirmId(null);
  };

  const handlePasteAddress = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          setWalletAddress(text.trim());
        }
      } catch {
        // clipboard permission fallback
      }
    }
  };

  const handleCoinChange = (coin: Stablecoin) => {
    setSelectedCoin(coin);
    const newChains = coin === 'USDT' ? USDT_CHAINS : USDC_CHAINS;
    setSelectedChainId(newChains[0].id);
    setWalletAddress('');
    setFormSubmitted(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isAddressValid || !isLabelValid) return;

    const truncated =
      walletAddress.length > 12
        ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`
        : walletAddress;

    const newEntry: CryptoEntry = {
      id: `addr-${Date.now()}`,
      coin: selectedCoin,
      chainId: currentChain.id,
      chainName: currentChain.name,
      networkType: currentChain.networkType,
      dotColor: currentChain.dotColor,
      label: walletLabel.trim(),
      address: truncated,
      fullAddress: walletAddress.trim(),
      addedAgo: 'added just now',
    };

    setSavedAddresses((prev) => [newEntry, ...prev]);
    setWalletLabel('');
    setWalletAddress('');
    setMemo('');
    setFormSubmitted(false);
    setView('list');
  };

  const filteredAddresses = savedAddresses.filter((a) => {
    if (activeTabFilter === 'ALL') return true;
    return a.coin === activeTabFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100/90 p-4 sm:p-6 space-y-5">
      {/* 1. LIST VIEW */}
      {view === 'list' && (
        <div id="crypto-list-view" className="space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Trusted Crypto Addresses
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved destination wallets for USDT and USDC across supported blockchain networks
              </p>
            </div>

            <button
              id="btn-add-crypto-trigger"
              type="button"
              onClick={() => {
                setView('add');
                setFormSubmitted(false);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#01AFB5] rounded-xl text-xs font-bold text-[#01AFB5] bg-white hover:bg-[#01AFB5] hover:text-white transition shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Add Crypto Address</span>
            </button>
          </div>

          {/* Info Callout */}
          <div className="bg-[#F5F8FE] border border-blue-100/80 rounded-xl p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100/70 border border-blue-200/50 flex items-center justify-center shrink-0 text-blue-600 mt-0.5 shadow-2xs">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-1 flex-1 text-xs">
              <h2 className="font-bold text-slate-900">Supported Stablecoins: USDT &amp; USDC Only</h2>
              <p className="text-slate-600 leading-relaxed">
                For maximum security and settlement stability, this store accepts and disburses only{' '}
                <strong>Tether (USDT)</strong> and <strong>USD Coin (USDC)</strong>. Always make sure
                the chosen chain (e.g. TRC-20, ERC-20, Solana, Base, Polygon) matches the destination wallet network.
              </p>
            </div>
          </div>

          {/* Filter Bar & Allowlisting Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setActiveTabFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTabFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({savedAddresses.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter('USDT')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTabFilter === 'USDT'
                    ? 'bg-white text-[#26A17B] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <USDTLogo className="w-4 h-4" />
                <span>USDT ({savedAddresses.filter((a) => a.coin === 'USDT').length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabFilter('USDC')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTabFilter === 'USDC'
                    ? 'bg-white text-[#2775CA] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <USDCLogo className="w-4 h-4" />
                <span>USDC ({savedAddresses.filter((a) => a.coin === 'USDC').length})</span>
              </button>
            </div>

            {/* Allowlisting Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-800">Allowlist Protection</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    allowlistingActive
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-slate-500 bg-slate-100 border-slate-200'
                  }`}
                >
                  {allowlistingActive ? 'Active' : 'Disabled'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allowlistingActive}
                  onChange={(e) => setAllowlistingActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#01AFB5]"></div>
              </label>
            </div>
          </div>

          {/* Addresses List Cards */}
          <div className="space-y-3">
            {filteredAddresses.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 border border-slate-200/80 rounded-xl">
                No {activeTabFilter === 'ALL' ? 'crypto' : activeTabFilter} addresses saved yet. Click &quot;+ Add Crypto Address&quot; above.
              </div>
            ) : (
              filteredAddresses.map((addr) => {
                const isDeleting = deleteConfirmId === addr.id;

                return (
                  <div
                    key={addr.id}
                    className="border border-slate-200/90 rounded-xl p-3.5 sm:p-4 hover:border-slate-300 transition bg-white shadow-2xs"
                  >
                    {isDeleting ? (
                      /* Inline Delete Confirmation */
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between gap-3 text-xs animate-in fade-in">
                        <div className="flex items-center gap-2 text-rose-800 font-medium">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Are you sure you want to remove this {addr.coin} address?</span>
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
                            onClick={() => handleDelete(addr.id)}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Confirm Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Left: Coin Logo & Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          {addr.coin === 'USDT' ? (
                            <USDTLogo className="w-9 h-9" />
                          ) : (
                            <USDCLogo className="w-9 h-9" />
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                {addr.coin}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                                <span className={`w-1.5 h-1.5 rounded-full ${addr.dotColor}`}></span>
                                {addr.chainName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ({addr.networkType})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                              {addr.label}
                            </div>
                          </div>
                        </div>

                        {/* Right: Address Box & Actions */}
                        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                          {/* Full address pill */}
                          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                            <span className="font-mono text-xs text-slate-700 font-medium">
                              {addr.address}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(addr.id, addr.fullAddress)}
                              className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                              title="Copy full address"
                            >
                              {copiedId === addr.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <span className="hidden md:inline text-[11px] text-slate-400">
                            {addr.addedAgo}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                const newLabel = prompt('Edit wallet label:', addr.label);
                                if (newLabel && newLabel.trim()) {
                                  setSavedAddresses((prev) =>
                                    prev.map((a) =>
                                      a.id === addr.id ? { ...a, label: newLabel.trim() } : a
                                    )
                                  );
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-700 transition rounded hover:bg-slate-100 cursor-pointer"
                              title="Edit Label"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(addr.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition rounded hover:bg-slate-100 cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 2. ADD NEW CRYPTO ADDRESS FORM VIEW (ONLY USDT & USDC ON VARIOUS CHAINS) */}
      {view === 'add' && (
        <div id="add-crypto-form-view" className="space-y-5">
          {/* Form Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              id="btn-back-to-crypto-list"
              type="button"
              onClick={() => {
                setView('list');
                setFormSubmitted(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Trusted Addresses</span>
            </button>
            <span className="text-[11px] font-semibold text-[#01AFB5] bg-[#01AFB5]/10 border border-[#01AFB5]/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
              <Lock className="w-3 h-3" /> 24h Safety Lock Active
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Add New Crypto Address
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Whitelist a destination wallet for <strong>USDT</strong> or <strong>USDC</strong> on your preferred network
            </p>
          </div>

          {/* STEP 1: SELECT TOKEN (ONLY USDT OR USDC) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Step 1: Select Stablecoin Token <span className="text-rose-500">*</span>
            </label>

            <div className="grid grid-cols-2 gap-3 max-w-md">
              {/* USDT Card */}
              <button
                type="button"
                onClick={() => handleCoinChange('USDT')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                  selectedCoin === 'USDT'
                    ? 'border-[#26A17B] bg-[#26A17B]/10 ring-1 ring-[#26A17B]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <USDTLogo className="w-8 h-8" />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>USDT</span>
                    <span className="text-[10px] font-normal text-slate-500">Tether USD</span>
                  </div>
                  <div className="text-[10px] text-[#26A17B] font-semibold">
                    8 Supported Chains
                  </div>
                </div>
              </button>

              {/* USDC Card */}
              <button
                type="button"
                onClick={() => handleCoinChange('USDC')}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-3 ${
                  selectedCoin === 'USDC'
                    ? 'border-[#2775CA] bg-[#2775CA]/10 ring-1 ring-[#2775CA]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <USDCLogo className="w-8 h-8" />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>USDC</span>
                    <span className="text-[10px] font-normal text-slate-500">USD Coin</span>
                  </div>
                  <div className="text-[10px] text-[#2775CA] font-semibold">
                    8 Supported Chains
                  </div>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleAddSubmit} noValidate className="space-y-4 max-w-2xl">
            {/* STEP 2: SELECT BLOCKCHAIN NETWORK / CHAIN */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Step 2: Select {selectedCoin} Network / Chain <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeChainList.map((chain) => {
                  const isSelected = chain.id === selectedChainId;

                  return (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={() => {
                        setSelectedChainId(chain.id);
                        setFormSubmitted(false);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? selectedCoin === 'USDT'
                            ? 'border-[#26A17B] bg-[#26A17B]/5 ring-1 ring-[#26A17B]'
                            : 'border-[#2775CA] bg-[#2775CA]/5 ring-1 ring-[#2775CA]'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${chain.dotColor} shrink-0`}></span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 truncate">
                            {chain.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">
                            {chain.addressFormat}
                          </div>
                        </div>
                      </div>

                      {chain.recommended && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          Recommended
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: WALLET LABEL / NICKNAME */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Wallet Label / Nickname <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. My Binance Account, Ledger Cold Storage, Trust Wallet"
                value={walletLabel}
                onChange={(e) => setWalletLabel(e.target.value)}
                className={`w-full h-10 px-3.5 text-xs rounded-lg border transition outline-none bg-slate-50/70 focus:bg-white ${
                  formSubmitted && !isLabelValid
                    ? 'border-rose-400 text-rose-900 bg-rose-50/20'
                    : 'border-slate-200 focus:border-[#01AFB5]'
                }`}
              />
              {formSubmitted && !isLabelValid && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Wallet label is required (at least 2 characters).</span>
                </p>
              )}
            </div>

            {/* STEP 4: DESTINATION WALLET ADDRESS */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Destination {selectedCoin} ({currentChain.networkType}) Address{' '}
                  <span className="text-rose-500">*</span>
                </label>

                {walletAddress && isAddressValid && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3 stroke-[3]" /> Valid {currentChain.networkType} Format
                  </span>
                )}
              </div>

              <div className="relative flex items-center">
                <input
                  id="dest-crypto-wallet-input"
                  type="text"
                  placeholder={`Paste ${selectedCoin} address on ${currentChain.name}`}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value.trim())}
                  className={`w-full h-10 pl-3.5 pr-20 font-mono text-xs rounded-lg border transition outline-none bg-slate-50/70 focus:bg-white ${
                    formSubmitted && !isAddressValid
                      ? 'border-rose-400 text-rose-900 bg-rose-50/20'
                      : walletAddress && isAddressValid
                      ? 'border-emerald-500 text-slate-900 focus:border-emerald-500'
                      : 'border-slate-200 focus:border-[#01AFB5]'
                  }`}
                />
                <button
                  type="button"
                  onClick={handlePasteAddress}
                  className="absolute right-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#01AFB5] hover:bg-[#01AFB5]/10 rounded border border-[#01AFB5]/30 transition cursor-pointer flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Paste
                </button>
              </div>

              {/* Format description / validation notice */}
              <div className="pt-0.5">
                {formSubmitted && !isAddressValid ? (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>Invalid format. {currentChain.formatDescription}.</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    Expected: {currentChain.formatDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Memo / Tag */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Memo / Tag</label>
                <span className="text-[10px] text-slate-400">Optional</span>
              </div>
              <input
                type="text"
                placeholder="Required only for specific exchange deposit accounts"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full h-10 px-3.5 text-xs rounded-lg border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-[#01AFB5] outline-none transition"
              />
            </div>

            {/* Safety Warning */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Ensure that you are sending only <strong>{selectedCoin}</strong> on the{' '}
                <strong>{currentChain.name}</strong> network. Sending funds via an unsupported network or sending different tokens will result in permanent loss.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setView('list');
                  setFormSubmitted(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#01AFB5] hover:bg-[#009da2] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save {selectedCoin} Address</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
