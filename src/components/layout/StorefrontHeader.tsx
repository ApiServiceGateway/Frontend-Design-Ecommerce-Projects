'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, ShoppingCart, Heart, Bell, ShoppingBag } from 'lucide-react';
import { WishlistIcon, BagIcon } from '@/components/ui/StoreIcons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const StorefrontHeader: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/category?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/category');
    }
  };
  return (
    <header 
      id="home-storefront-sticky-header" 
      className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-xs w-full"
    >
        <div className="w-full px-4 sm:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Left: Logo & NavigationMenu */}
          <div className="flex items-center gap-6 lg:gap-10 h-full">
            <Link 
              id="home-header-logo-link"
              href="/"
              className="text-3xl font-extrabold text-[#00C9A7] tracking-tight hover:opacity-95 transition-opacity select-none"
            >
              Logo
            </Link>

            {/* Radix NavigationMenu with Wide Expansive Megamenu */}
            <NavigationMenu viewport={false} className="hidden md:flex !h-full relative [&>div]:!h-full [&>div]:!flex [&>div]:!items-center">
              <NavigationMenuList className="gap-1 lg:gap-3 !h-full items-center">
                
                                {/* 1. Men's wear */}
                <NavigationMenuItem className="!h-full flex items-center static">
                  <NavigationMenuTrigger className="!h-full flex items-center px-3.5 py-0 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[14px] font-medium text-slate-700 hover:text-black data-[state=open]:text-black data-[state=open]:font-bold relative group/trigger cursor-pointer select-none [&>svg]:hidden">
                    <span>Men's wear</span>
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[4px] bg-[#FFB800] rounded-t-sm scale-x-0 group-hover/trigger:scale-x-100 data-[state=open]:scale-x-100 transition-transform origin-center z-30"></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent 
                    className="w-[1080px] min-w-[1080px] max-w-[94vw] h-[460px] min-h-[460px] p-0 bg-white border border-slate-200/90 shadow-2xl rounded-t-none rounded-b-2xl z-50 left-0 top-full !mt-0 overflow-hidden"
                    style={{ width: '1080px', minWidth: '1080px', height: '460px', minHeight: '460px' }}
                  >
                    <div className="flex w-full h-[460px]">
                      {/* Left 4 Columns */}
                      <div className="flex-1 grid grid-cols-4 gap-6 p-7 bg-white">
                        {/* Col 1 */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              TOP WEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=shirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shirts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=tshirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">T-Shirts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sweatshirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sweatshirts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=jackets" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jackets</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=blazers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Blazers for Men</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sweaters" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sweaters</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=suits" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Suits</Link></NavigationMenuLink></li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              SPORTS AND ACTIVEWEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=track-pants" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Track Pants</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=active-tees" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">T-Shirts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sports-shorts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shorts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=windbreakers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jackets</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=track-suits" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Track Suits</Link></NavigationMenuLink></li>
                            </ul>
                          </div>
                        </div>

                        {/* Col 2 */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              BOTTOM WEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=trousers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Trousers</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=jeans" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jeans</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=shorts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shorts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=joggers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Track Pants</Link></NavigationMenuLink></li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              FOOTWEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=casual-shoes" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Casual Shoes</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sport-shoes" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sport Shoes</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=flip-flops" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Flip Flops</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=formal-shoes" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Formal Shoes</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sandals" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sandals</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=boots" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Boots</Link></NavigationMenuLink></li>
                            </ul>
                          </div>
                        </div>

                        {/* Col 3 */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              ETHNIC WEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=kurtas" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Kurtas</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=waistcoats" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Waistcoats</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=pyjamas" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Pyjamas</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=churidars" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Churidars</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=salwars" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Salwars</Link></NavigationMenuLink></li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              INNERWEAR AND SLEEPWEAR
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=vests" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Vests</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=briefs" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Briefs</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=boxers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Boxers</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=trunks" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Trunks</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=nightwear" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Nightwear Sets</Link></NavigationMenuLink></li>
                            </ul>
                          </div>
                        </div>

                        {/* Col 4 */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              ACCESSORIES
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=sunglasses" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sunglasses</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=belts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Belts</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=wallets" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Wallets</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=other-accessories" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Other Accessories</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=socks" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Socks</Link></NavigationMenuLink></li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                              FRAGRANCES
                            </h4>
                            <ul className="space-y-1.5 text-[13px] text-slate-600">
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=perfumes" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Perfumes</Link></NavigationMenuLink></li>
                              <li><NavigationMenuLink asChild><Link href="/catalog?cat=men&sub=deodorants" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Deodorants</Link></NavigationMenuLink></li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Col 5: Right Gray Panel */}
                      <div className="w-64 bg-[#F9FAFB] p-6 border-l border-slate-100 flex flex-col justify-start shrink-0">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-3">
                          Shop by Occasion
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {['Casual', 'Work Wear', 'Festive', 'Party'].map((tag) => (
                            <NavigationMenuLink asChild key={tag}>
                              <Link 
                                href={'/catalog?cat=men&occasion=' + encodeURIComponent(tag.toLowerCase())}
                                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors shadow-2xs whitespace-nowrap"
                              >
                                {tag}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 2. Women's wear */}
                <NavigationMenuItem className="!h-full flex items-center static">
                  <NavigationMenuTrigger className="!h-full flex items-center px-3.5 py-0 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[14px] font-medium text-slate-700 hover:text-black data-[state=open]:text-black data-[state=open]:font-bold relative group/trigger cursor-pointer select-none [&>svg]:hidden">
                    <span>Women's wear</span>
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[4px] bg-[#FFB800] rounded-t-sm scale-x-0 group-hover/trigger:scale-x-100 data-[state=open]:scale-x-100 transition-transform origin-center z-30"></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent 
                    className="w-[1080px] min-w-[1080px] max-w-[94vw] h-[460px] min-h-[460px] p-0 bg-white border border-slate-200/90 shadow-2xl rounded-t-none rounded-b-2xl z-50 left-0 top-full !mt-0 overflow-hidden"
                    style={{ width: '1080px', minWidth: '1080px', height: '460px', minHeight: '460px' }}
                  >
                    <div className="flex w-full h-[460px]">
                      {/* Left 4 Columns */}
                      <div className="flex-1 grid grid-cols-4 gap-6 p-7 bg-white">
                        {/* Col 1: WESTERNWEAR */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            WESTERNWEAR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=tops" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Tops</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=dresses" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Dresses</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=jeans" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jeans</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=tshirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">T-Shirts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=trousers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Trousers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=shirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shirts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=jackets" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jackets</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sweatshirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sweatshirts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sweaters" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sweaters</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=shrugs" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shrugs</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=shorts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shorts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=jumpsuits" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Jumpsuits</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=blazers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Blazers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=skirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Skirts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=coord-sets" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Co-ord Sets</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=coats" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Coats</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 2: ETHNICWEAR */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            ETHNICWEAR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=kurtas" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Kurtas</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=kurta-sets" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Kurta Sets</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=ethnic-bottoms" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ethnic Bottoms</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=ethnic-dresses" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ethnic Dresses</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=tunics" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Tunics</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=ethnic-tops" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ethnic Tops</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=dupattas" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Dupattas</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 3: SPORTS & ACTIVEWEAR */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            SPORTS &amp; ACTIVEWEAR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sports-tshirts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sports T-Shirts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=track-pants" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Track Pants</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=capris" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Capris</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sports-tops" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sports Tops</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sports-shorts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sports Shorts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=tights" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Tights</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sports-bras" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sports Bras</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=shapewear" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shapewear</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 4: SLEEPWEAR & LINGERIE */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            SLEEPWEAR &amp; LINGERIE
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=pyjamas" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Pyjamas</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=night-suits" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Night Suits</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sleepwear-tops" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sleepwear Tops</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=bras" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Bras</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=sleepwear-shorts" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sleepwear Shorts</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=briefs" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Briefs</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=women&sub=camisoles" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Camisoles</Link></NavigationMenuLink></li>
                          </ul>
                        </div>
                      </div>

                      {/* Col 5: Right Gray Panel */}
                      <div className="w-64 bg-[#F9FAFB] p-6 border-l border-slate-100 flex flex-col justify-start shrink-0">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-3">
                          Shop by Occasion
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {['Casual', 'Work Wear', 'Festive', 'Party'].map((tag) => (
                            <NavigationMenuLink asChild key={tag}>
                              <Link 
                                href={'/catalog?cat=women&occasion=' + encodeURIComponent(tag.toLowerCase())}
                                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors shadow-2xs whitespace-nowrap"
                              >
                                {tag}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 3. WATCHES */}
                <NavigationMenuItem className="!h-full flex items-center static">
                  <NavigationMenuTrigger className="!h-full flex items-center px-3.5 py-0 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[14px] font-medium text-slate-700 hover:text-black data-[state=open]:text-black data-[state=open]:font-bold relative group/trigger cursor-pointer select-none [&>svg]:hidden">
                    <span>WATCHES</span>
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[4px] bg-[#FFB800] rounded-t-sm scale-x-0 group-hover/trigger:scale-x-100 data-[state=open]:scale-x-100 transition-transform origin-center z-30"></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent 
                    className="w-[1080px] min-w-[1080px] max-w-[94vw] h-[460px] min-h-[460px] p-0 bg-white border border-slate-200/90 shadow-2xl rounded-t-none rounded-b-2xl z-50 left-0 top-full !mt-0 overflow-hidden"
                    style={{ width: '1080px', minWidth: '1080px', height: '460px', minHeight: '460px' }}
                  >
                    <div className="flex flex-col w-full h-[460px] justify-between bg-white">
                      {/* Horizontal Columns along the top */}
                      <div className="grid grid-cols-5 gap-6 p-8 bg-white">
                        {/* Col 1 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            MEN'S WATCHES
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-chronograph" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Chronograph Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-analog" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Analog Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-digital" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Digital Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-automatic" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Automatic &amp; Mechanical</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-leather" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Leather Strap Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=men-steel" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Stainless Steel</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 2 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            WOMEN'S WATCHES
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=women-rose-gold" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Rose Gold Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=women-minimalist" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Minimalist Watches</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=women-bracelet" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Bracelet &amp; Mesh</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=women-diamond" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Diamond Accent</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=women-ceramic" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ceramic Timepieces</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 3 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            SMARTWATCHES
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=smart-fitness" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Fitness Trackers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=smart-calling" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Bluetooth Calling</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=smart-amoled" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">AMOLED Displays</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=smart-sports" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Rugged Sports</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=smart-hybrid" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Hybrid Smartwatches</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 4 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            PREMIUM WATCHES
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=swiss-crafted" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Swiss Crafted</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=sapphire-edition" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sapphire Edition</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=luxury-automatic" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Luxury Automatic</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&sub=heritage" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Heritage Series</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 5 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            TOP WATCH BRANDS
                          </h4>
                          <ul className="space-y-2 text-[13px] text-slate-700">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=fossil" className="hover:text-black font-semibold transition-colors block py-0.5">Fossil</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=titan" className="hover:text-black font-semibold transition-colors block py-0.5">Titan</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=tommy" className="hover:text-black font-semibold transition-colors block py-0.5">Tommy Hilfiger</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=casio" className="hover:text-black font-semibold transition-colors block py-0.5">Casio</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=fastrack" className="hover:text-black font-semibold transition-colors block py-0.5">Fastrack</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=watches&brand=michael-kors" className="hover:text-black font-semibold transition-colors block py-0.5">Michael Kors</Link></NavigationMenuLink></li>
                          </ul>
                        </div>
                      </div>

                      {/* Empty Lower Area matching reference */}
                      <div className="flex-1 bg-white"></div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 4. SHOES */}
                <NavigationMenuItem className="!h-full flex items-center static">
                  <NavigationMenuTrigger className="!h-full flex items-center px-3.5 py-0 rounded-none bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[14px] font-medium text-slate-700 hover:text-black data-[state=open]:text-black data-[state=open]:font-bold relative group/trigger cursor-pointer select-none [&>svg]:hidden">
                    <span>SHOES</span>
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[4px] bg-[#FFB800] rounded-t-sm scale-x-0 group-hover/trigger:scale-x-100 data-[state=open]:scale-x-100 transition-transform origin-center z-30"></span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent 
                    className="w-[1080px] min-w-[1080px] max-w-[94vw] h-[460px] min-h-[460px] p-0 bg-white border border-slate-200/90 shadow-2xl rounded-t-none rounded-b-2xl z-50 left-0 top-full !mt-0 overflow-hidden"
                    style={{ width: '1080px', minWidth: '1080px', height: '460px', minHeight: '460px' }}
                  >
                    <div className="flex flex-col w-full h-[460px] justify-between bg-white">
                      {/* Horizontal Columns along the top */}
                      <div className="grid grid-cols-5 gap-6 p-8 bg-white">
                        {/* Col 1 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            MEN'S FOOTWEAR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-sneakers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Casual Sneakers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-sports" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sports &amp; Running</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-formal" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Formal Oxfords</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-loafers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Leather Loafers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-boots" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ankle Boots</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=men-sandals" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Sandals &amp; Slides</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 2 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            WOMEN'S FOOTWEAR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-heels" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Heels &amp; Pumps</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-flats" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Flats &amp; Ballerinas</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-sneakers" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Casual Sneakers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-wedges" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Wedges &amp; Platforms</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-sandals" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Strappy Sandals</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=women-boots" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Ankle Boots</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 3 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            PERFORMANCE &amp; OUTDOOR
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=gym-training" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Gym &amp; Training</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=walking" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Walking Shoes</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=trail-trekking" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Trail &amp; Trekking</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=court-tennis" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Court &amp; Tennis</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=shoe-care" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Shoe Care &amp; Cleaners</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 4 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            CASUAL &amp; SLIP-ONS
                          </h4>
                          <ul className="space-y-1.5 text-[13px] text-slate-600">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=slip-on" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Slip-on Loafers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=clogs" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Clogs &amp; Mules</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=espadrilles" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Canvas Espadrilles</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&sub=slides" className="hover:text-black hover:font-medium transition-colors block py-0.5 whitespace-nowrap">Comfort Walking Slides</Link></NavigationMenuLink></li>
                          </ul>
                        </div>

                        {/* Col 5 */}
                        <div>
                          <h4 className="text-[12px] font-extrabold uppercase tracking-wider text-slate-900 pb-2 mb-2.5 border-b border-slate-100 whitespace-nowrap">
                            TOP SHOE BRANDS
                          </h4>
                          <ul className="space-y-2 text-[13px] text-slate-700">
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=nike" className="hover:text-black font-semibold transition-colors block py-0.5">Nike</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=adidas" className="hover:text-black font-semibold transition-colors block py-0.5">Adidas</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=puma" className="hover:text-black font-semibold transition-colors block py-0.5">Puma</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=skechers" className="hover:text-black font-semibold transition-colors block py-0.5">Skechers</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=red-tape" className="hover:text-black font-semibold transition-colors block py-0.5">Red Tape</Link></NavigationMenuLink></li>
                            <li><NavigationMenuLink asChild><Link href="/catalog?cat=shoes&brand=woodland" className="hover:text-black font-semibold transition-colors block py-0.5">Woodland</Link></NavigationMenuLink></li>
                          </ul>
                        </div>
                      </div>

                      {/* Empty Lower Area matching reference */}
                      <div className="flex-1 bg-white"></div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Compact Search Bar + Divider + 4 Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            
            {/* Compact Search Bar with Live Navigation */}
            <form 
              onSubmit={handleSearchSubmit}
              className="relative w-44 sm:w-60 md:w-72 lg:w-[360px] bg-[#F0F5FA] rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 border border-transparent focus-within:border-slate-300 transition-all"
            >
              <button type="submit" className="text-slate-400 hover:text-black">
                <Search className="w-4 h-4 shrink-0" />
              </button>
              <input 
                id="home-header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What you are looking for..."
                className="w-full bg-transparent text-xs sm:text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </form>

            {/* Vertical Divider */}
            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

            {/* Action Items: Profile with Hover Dropdown, Wishlist, Bag (Exact layout from user screenshot) */}
            <div className="flex items-center gap-1 sm:gap-2 text-slate-700">
              {/* 1. Profile with Hover Dropdown */}
              <div className="relative group h-20 flex items-center">
                <Link
                  id="home-header-btn-profile"
                  href="/account"
                  className="flex flex-col items-center justify-center px-3 h-full hover:text-black transition-colors relative"
                >
                  <User className="w-5 h-5 text-slate-700 group-hover:text-[#FF3F6C] transition-colors" strokeWidth={1.75} />
                  <span className="text-[11px] font-bold tracking-tight text-slate-700 group-hover:text-black transition-colors mt-0.5">
                    Profile
                  </span>
                  {/* Pink Accent Line under Profile on Hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF3F6C] scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
                </Link>

                {/* Dropdown Menu (Matches User Screenshot Exactly) */}
                <div className="absolute right-0 top-full pt-0.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="w-72 bg-white rounded-b-md shadow-2xl border border-slate-200/90 p-4 text-left">
                    {/* Header */}
                    <div className="pb-2.5">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">Hello Dipanshu</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">9466503764</p>
                    </div>

                    <div className="h-px bg-slate-200/80 my-2"></div>

                    {/* Group 1 */}
                    <ul className="space-y-1.5 text-[13px] text-slate-700">
                      <li>
                        <Link href="/account?tab=orders" className="hover:font-bold hover:text-black transition-colors py-1 flex items-center justify-between">
                          <span>Orders</span>
                          <span className="min-w-[18px] h-4.5 px-1.5 inline-flex items-center justify-center rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
                            3
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/wishlist" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=gift-cards" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Gift Cards
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=overview" className="hover:font-bold hover:text-black transition-colors py-1 flex items-center justify-between">
                          <span>Logo Insider</span>
                          <span className="text-[10px] font-bold italic bg-[#FF3F6C] text-white px-1.5 py-0.5 rounded shadow-2xs">
                            New
                          </span>
                        </Link>
                      </li>
                    </ul>

                    <div className="h-px bg-slate-200/80 my-2"></div>

                    {/* Group 2 */}
                    <ul className="space-y-1.5 text-[13px] text-slate-700">
                      <li>
                        <Link href="/account?tab=gift-cards" className="hover:font-bold hover:text-black transition-colors py-1 flex items-center justify-between">
                          <span>Logo Credit</span>
                          <span className="h-4.5 px-2 inline-flex items-center justify-center rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/90 font-mono">
                            ₹1,250
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=coupons" className="hover:font-bold hover:text-black transition-colors py-1 flex items-center justify-between">
                          <span>Coupons</span>
                          <span className="min-w-[18px] h-4.5 px-1.5 inline-flex items-center justify-center rounded-full text-[10px] font-semibold bg-[#01AFB5]/10 text-[#01AFB5] border border-[#01AFB5]/30">
                            4
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=card" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Saved Cards
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=upi" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Saved UPI
                        </Link>
                      </li>
                      <li>
                        <Link href="/account?tab=address" className="hover:font-bold hover:text-black transition-colors py-1 flex items-center justify-between">
                          <span>Saved Addresses</span>
                          <span className="h-4.5 px-2 inline-flex items-center justify-center rounded-full text-[10px] font-medium bg-slate-100/80 text-slate-600 border border-slate-200/80">
                            2 saved
                          </span>
                        </Link>
                      </li>
                    </ul>

                    <div className="h-px bg-slate-200/80 my-2"></div>

                    {/* Group 3 */}
                    <ul className="space-y-1.5 text-[13px] text-slate-700">
                      <li>
                        <Link href="/account?tab=edit-profile" className="hover:font-bold hover:text-black transition-colors block py-1">
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Are you sure you want to log out?')) {
                              window.location.href = '/auth';
                            }
                          }}
                          className="w-full text-left py-1 hover:font-bold hover:text-black transition cursor-pointer"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Wishlist */}
              <Link
                id="home-header-btn-wishlist"
                href="/wishlist"
                className="flex flex-col items-center justify-center px-3 h-20 hover:text-black transition-colors relative"
                title="Wishlist"
              >
                <div className="relative">
                  <WishlistIcon className="w-5 h-5 text-slate-700 hover:text-black transition-colors" />
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#FF3F6C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-[11px] font-bold tracking-tight text-slate-700 hover:text-black transition-colors mt-0.5">
                  Wishlist
                </span>
              </Link>

              {/* 3. Bag */}
              <Link
                id="home-header-btn-cart"
                href="/cart"
                className="flex flex-col items-center justify-center px-3 h-20 hover:text-black transition-colors relative"
                title="Bag"
              >
                <div className="relative">
                  <BagIcon className="w-5 h-5 text-slate-700 hover:text-black transition-colors" />
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#FF3F6C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    2
                  </span>
                </div>
                <span className="text-[11px] font-bold tracking-tight text-slate-700 hover:text-black transition-colors mt-0.5">
                  Bag
                </span>
              </Link>
            </div>

          </div>

        </div>
      </header>
  );
};
