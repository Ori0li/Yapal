"use client";

import { Colorize } from "@/common/Style/color";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { CgMenuRound } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useHeaderStore } from "@/common/store/headerStore";

// 상태 및 가져오기
const Header = () => {
  const {
    search,
    recentKeywords, // localStorage에서 등록하기 최근 검색 리스트리스트
    showDropdown, // 다운로드 표시 여부
    setSearch, //입력 내용 업데이트
    setShowDropdown, // 댓글 켜기/끄기
    handleSearch, // 검색어 저장 + 검색실행
    loadRecentKeywords, // 검색어를 등록
  } = useHeaderStore();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색 페이지로 이동
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(search, (query) =>
        router.push(`/search?query=${encodeURIComponent(query)}`)
      );
    }
  };
  // 인풋 클릭시 이전 검색어 드롭 다운
  const handleFocus = () => {
    loadRecentKeywords();
    setShowDropdown(true);
  };

  // 외부 클릭 시 드롭닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [setShowDropdown]);

  return (
    <>
      {/* Full Header (for larger screens) */}
      <section
        className="w-full hidden sm:flex px-8 py-5 text-white relative z-50"
        style={{ backgroundColor: Colorize.Secondary_01 }}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3 relative">
            <div className="flex gap-3 text-2xl">
              <button onClick={() => router.back()} className="p-2">
                <IoIosArrowBack />
              </button>
              <button onClick={() => router.forward()} className="p-2">
                <IoIosArrowForward />
              </button>
            </div>

            <div className="flex flex-col relative" ref={inputRef}>
              <div className="flex items-center px-4 py-2 text-gray-400 bg-white rounded-3xl w-64">
                <IoSearchOutline className="mr-2.5" />

                {/* 검색바 + 드롭다운 구성 */}
                <input
                  className="outline-0 text-black w-full"
                  type="text"
                  placeholder="Artist, songs, or products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFocus();
                  }}
                />
              </div>

              {showDropdown && recentKeywords.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded-xl shadow-lg overflow-hidden">
                  {recentKeywords.map((keyword, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-sm group"
                    >
                      {/* 검색어 텍스트 클릭 시 검색 실행 */}
                      <span
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSearch(keyword, (query) =>
                            router.push(
                              `/search?query=${encodeURIComponent(query)}`
                            )
                          );
                        }}
                      >
                        {keyword}
                      </span>

                      {/* 삭제 버튼 */}
                      <button
                        className="text-black hover:text-red-500 text-xs ml-2 group-hover:opacity-100 opacity-0 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          useHeaderStore
                            .getState()
                            .removeRecentKeyword(keyword);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* 로그인 */}
          <div className="flex items-center justify-center gap-4 text-center">
            <Link
              href="https://www.spotify.com/kr-ko/signup"
              className="flex items-center justify-center h-10 font-semibold w-30"
              style={{ color: Colorize.Neutral_01 }}
            >
              Sign up
            </Link>
            <Link
              href="https://accounts.spotify.com/ko/login"
              className="flex items-center justify-center h-10 font-semibold text-black bg-white w-30 border-1 rounded-3xl"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Hidden Header (for smaller screens) */}
      <div
        className="w-full flex sm:hidden px-8 py-5 text-white justify-between items-center"
        style={{ backgroundColor: Colorize.Secondary_01 }}
      >
        <Image width={110} height={35} src={"/Logo.png"} alt={"Spotify Logo"} />
        <div className="flex items-center justify-between px-4 py-2 text-gray-400 bg-white rounded-3xl">
          <IoSearchOutline className="mr-2.5" />
          <input
            className="outline-0 w-5xs rounded-2xl text-black"
            type="text"
            placeholder="Spotify"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
              e.stopPropagation();
              handleFocus();
            }}
          />
        </div>
        <CgMenuRound size={40} />
      </div>
    </>
  );
};

export default Header;
