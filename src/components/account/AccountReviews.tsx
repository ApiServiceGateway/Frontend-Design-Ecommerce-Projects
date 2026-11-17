'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  FileText,
  Trash2,
  ArrowLeft,
  AlertTriangle,
  Check,
  ShieldCheck,
  Camera,
  X,
  ImagePlus,
} from 'lucide-react';

interface ReviewItem {
  id: string;
  productName: string;
  variant: string;
  image: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpfulCount: number;
  hasLiked?: boolean;
  photos?: string[];
}

export const AccountReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      productName: 'Embroidered Flared Strappy Dress with Scalloped Hem',
      variant: 'Noir Black • Size S',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB99dwpq68H6bPiciXwJbg8dmsBb9ckLz9C6gof-cbpXjktk_ZioLvspE-f_DhDqo5jJLokmnuLqNM8FJet_N9X7ZhNRjKbsKQIqQ0GiKX52EgCEj28YmrHy09vwwKkMgZQbgO2KiriXB7eoPCWzSyiHsK7RuMcHc2e_6-_G7eHrjJ1t0ptI_5EL6TXR4_ViYzxwsxsSh1iKyKhH7DxZScFtJfPB_dE1oZCBJ7xHA',
      rating: 5,
      date: 'Reviewed Oct 31, 2026',
      title: 'Flawless stitching and ultra-comfortable silhouette',
      body: 'Delivered in discreet packaging. The fit is effortlessly relaxed and the fabric feels substantial yet breathable. Colors match the photography perfectly.',
      helpfulCount: 14,
      photos: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'rev-2',
      productName: 'Tailored Pleated Wool Trousers',
      variant: 'Charcoal Grey • Size 32',
      image:
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=240&auto=format&fit=crop&q=80',
      rating: 5,
      date: 'Reviewed Sep 28, 2024',
      title: 'Flawless tailoring and silhouette',
      body: 'The pleats fall cleanly and the wool has a subtle sheen that looks twice the price. Arrived in pristine packaging with rapid dispatch.',
      helpfulCount: 8,
      photos: [],
    },
    {
      id: 'rev-3',
      productName: 'Cashmere Ribbed Mockneck',
      variant: 'Oatmeal Melange • Size L',
      image:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=240&auto=format&fit=crop&q=80',
      rating: 4,
      date: 'Reviewed Aug 11, 2024',
      title: 'Incredibly soft knit with great recovery',
      body: 'Wore this through brisk evenings and it retained its shape without pilling. Snug collar that does not choke, highly recommended for winter layering.',
      helpfulCount: 6,
      photos: [],
    },
  ]);

  // Inline Edit Review state (No popup window!)
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editHoverRating, setEditHoverRating] = useState<number>(0);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editPhotos, setEditPhotos] = useState<string[]>([]);

  // Inline Delete confirmation state (No popup window!)
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  // Success Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const ratingLabels: { [key: number]: string } = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Start inline editing
  const handleStartEdit = (rev: ReviewItem) => {
    setEditingReview(rev);
    setEditRating(rev.rating);
    setEditHoverRating(0);
    setEditTitle(rev.title);
    setEditBody(rev.body);
    setEditPhotos(rev.photos || []);
    setDeletingReviewId(null);
  };

  // Handle image files selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - editPhotos.length;
    if (remainingSlots <= 0) {
      showToast('Maximum 5 photos allowed per review.');
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    selectedFiles.forEach((file) => {
      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast(`"${file.name}" exceeds 5MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPhotos((prev) => {
            if (prev.length >= 5) return prev;
            return [...prev, event.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Remove photo
  const handleRemovePhoto = (indexToRemove: number) => {
    setEditPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Save inline edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    if (!editTitle.trim() || !editBody.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === editingReview.id
          ? {
              ...r,
              rating: editRating,
              title: editTitle.trim(),
              body: editBody.trim(),
              photos: editPhotos,
              date: 'Edited Today',
            }
          : r
      )
    );

    setEditingReview(null);
    showToast('Your review has been updated successfully!');
  };

  // Confirm inline delete
  const handleConfirmDelete = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeletingReviewId(null);
    showToast('Review removed from your account.');
  };

  const handleToggleHelpful = (id: string) => {
    setReviews(
      reviews.map((r) => {
        if (r.id === id) {
          const hasLiked = !r.hasLiked;
          return {
            ...r,
            hasLiked,
            helpfulCount: hasLiked ? r.helpfulCount + 1 : r.helpfulCount - 1,
          };
        }
        return r;
      })
    );
  };

  const totalHelpful = reviews.reduce((acc, r) => acc + r.helpfulCount, 0);

  // VIEW 1: INLINE EDIT REVIEW SECTION
  if (editingReview) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setEditingReview(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#01AFB5] transition cursor-pointer group pb-2"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to My Reviews &amp; Ratings</span>
        </button>

        {/* Section Header */}
        <div className="pb-4 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 leading-tight">Edit Your Review</h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your rating, review headline, or detailed feedback for this purchase
          </p>
        </div>

        {/* Inline Edit Form */}
        <div className="border border-slate-200/90 rounded-2xl p-6 sm:p-7 bg-white shadow-xs space-y-6">
          {/* Product Overview Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <img
              src={editingReview.image}
              alt={editingReview.productName}
              className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {editingReview.productName}
              </h2>
              <p className="text-xs text-slate-500">{editingReview.variant}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                <ShieldCheck className="w-3 h-3" /> Verified Purchase
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveEdit} className="space-y-5">
            {/* Interactive Star Rating */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Your Rating <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setEditHoverRating(star)}
                      onMouseLeave={() => setEditHoverRating(0)}
                      onClick={() => setEditRating(star)}
                      className="p-1 hover:scale-110 transition cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition ${
                          star <= (editHoverRating || editRating)
                            ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {ratingLabels[editHoverRating || editRating]}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Headline / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Sum up your experience in one line"
                className="w-full h-10 px-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] outline-none transition"
              />
            </div>

            {/* Review Body */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                Detailed Feedback <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                placeholder="Describe the fabric quality, stitching, discreet packaging, and overall satisfaction..."
                className="w-full p-3 text-xs bg-slate-50 focus:bg-white rounded-lg border border-slate-200 focus:border-[#01AFB5] focus:ring-1 focus:ring-[#01AFB5] outline-none transition leading-relaxed"
              ></textarea>
            </div>

            {/* Professional Image Uploader */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Customer Photos <span className="text-slate-400 font-normal">(Optional • Up to 5 photos)</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {editPhotos.length} / 5 photos
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Uploaded Photos Grid */}
                {editPhotos.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs shrink-0"
                  >
                    <img
                      src={photoUrl}
                      alt={`Review photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition shadow-xs cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold bg-slate-900/75 text-white px-1 py-0.5 rounded text-center truncate">
                        Cover
                      </span>
                    )}
                  </div>
                ))}

                {/* Upload Trigger Button Tile (Shown if under 5 photos) */}
                {editPhotos.length < 5 && (
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#01AFB5] bg-slate-50 hover:bg-[#01AFB5]/5 flex flex-col items-center justify-center gap-1 cursor-pointer transition group select-none shrink-0">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 group-hover:border-[#01AFB5]/40 flex items-center justify-center text-slate-500 group-hover:text-[#01AFB5] transition shadow-2xs">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 group-hover:text-[#01AFB5] transition">
                      + Add Photo
                    </span>
                  </label>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Showcase product details, stitching, or packaging. PNG, JPG or WebP (max 5MB each).
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel &amp; Go Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#01AFB5] hover:bg-[#009da2] text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // VIEW 2: ALL REVIEWS LIST
  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">My Reviews &amp; Ratings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage and edit reviews you have shared on purchased items
          </p>
        </div>
      </div>

      {/* 3 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Reviews Written
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">{reviews.length}</span>
            <span className="text-[11px] text-[#01AFB5] font-medium">100% verified</span>
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Average Rating
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">4.8</span>
            <div className="flex items-center text-amber-400 text-xs gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Helpful Votes
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-800">{totalHelpful + 15}</span>
            <span className="text-[11px] text-slate-500 font-medium">from community</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 border border-slate-200/70 rounded-xl">
            You do not have any active reviews. Reviews can be posted directly from delivered items in My Orders.
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 transition bg-white shadow-xs"
            >
              {/* Product and Review Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <img
                    src={rev.image}
                    alt={rev.productName}
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug">
                      {rev.productName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{rev.variant}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center text-amber-400 text-xs gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>

              {/* Review Body */}
              <div className="pt-3.5 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800">{rev.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.body}</p>

                {/* Attached Customer Photos */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {rev.photos.map((pUrl, pIdx) => (
                      <img
                        key={pIdx}
                        src={pUrl}
                        alt={`Customer photo ${pIdx + 1}`}
                        className="w-14 h-14 rounded-lg object-cover border border-slate-200 hover:opacity-90 transition shadow-2xs"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Inline Delete Confirmation Alert (Zero Popup Window!) */}
              {deletingReviewId === rev.id ? (
                <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 text-rose-800 font-medium">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Permanently delete this review from your profile and store ratings?</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setDeletingReviewId(null)}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(rev.id)}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-2xs"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              ) : (
                /* Normal Review Footer with Helpful and Edit/Delete */
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`text-[11px] flex items-center gap-1.5 transition cursor-pointer ${
                      rev.hasLiked
                        ? 'text-[#01AFB5] font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${rev.hasLiked ? 'fill-[#01AFB5]' : ''}`} />
                    <span>{rev.helpfulCount} people found this helpful</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(rev)}
                      className="text-slate-700 hover:text-[#01AFB5] transition inline-flex items-center gap-1.5 uppercase tracking-wide text-xs cursor-pointer font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Edit Review</span>
                    </button>
                    <span className="h-3.5 w-px bg-slate-200"></span>
                    <button
                      type="button"
                      onClick={() => setDeletingReviewId(rev.id)}
                      className="text-slate-500 hover:text-rose-600 transition inline-flex items-center gap-1.5 uppercase tracking-wide text-xs cursor-pointer font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
