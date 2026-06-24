"use client";

import Link from "next/link";
import { Bell, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PremiumNotificationBellProps = {
  userId: string;
  role: string;
  membership: string;
};

type UserStatusResponse = {
  isAuthenticated: boolean;
  role: string | null;
  membership?: string;
  isPremium: boolean;
};

const POLLING_INTERVAL_MS = 10_000;
const noticeTitle = "การชำระเงินได้รับการอนุมัติแล้ว";
const noticeBody =
  "คุณเป็นสมาชิกพรีเมียมแล้ว สามารถเริ่มเรียนคอร์ส Python มือใหม่ได้ทันที";

export function PremiumNotificationBell({
  userId,
  role,
  membership
}: PremiumNotificationBellProps) {
  const isAdmin = role === "admin";
  const [isPremium, setIsPremium] = useState(membership === "paid");
  const [hasNotice, setHasNotice] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const storageKey = useMemo(
    () => `python-begins-premium-approved:${userId}`,
    [userId]
  );

  useEffect(() => {
    if (isAdmin || isPremium) {
      return;
    }

    let stopped = false;

    async function checkUserStatus() {
      try {
        const response = await fetch("/api/user-status", {
          cache: "no-store",
          credentials: "same-origin"
        });

        if (!response.ok || stopped) {
          return;
        }

        const status = (await response.json()) as UserStatusResponse;

        if (
          status.isAuthenticated &&
          status.role !== "admin" &&
          status.isPremium
        ) {
          setIsPremium(true);

          if (localStorage.getItem(storageKey) !== "read") {
            setHasNotice(true);
            setHasUnread(true);
            setShowToast(true);
          }
        }
      } catch {
        // Keep the current UI unchanged if the background check fails.
      }
    }

    const intervalId = window.setInterval(
      checkUserStatus,
      POLLING_INTERVAL_MS
    );

    return () => {
      stopped = true;
      window.clearInterval(intervalId);
    };
  }, [isAdmin, isPremium, storageKey]);

  if (isAdmin) {
    return null;
  }

  function markAsRead() {
    localStorage.setItem(storageKey, "read");
    setHasUnread(false);
    setShowToast(false);
  }

  function toggleDropdown() {
    setIsOpen((current) => !current);

    if (hasUnread) {
      markAsRead();
    }
  }

  return (
    <div className="relative">
      <button
        aria-label="แจ้งเตือน"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
        onClick={toggleDropdown}
        type="button"
      >
        <Bell className="h-5 w-5" />
        {hasUnread ? (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        ) : null}
      </button>

      {showToast ? (
        <div
          aria-live="polite"
          className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-brand-100 bg-white p-4 shadow-2xl shadow-blue-600/15 sm:right-6"
          role="status"
        >
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-black text-ink">{noticeTitle}</p>
              <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                {noticeBody}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  className="btn-primary px-4 py-2"
                  href="/courses/python-beginner"
                  onClick={markAsRead}
                >
                  เริ่มเรียน
                </Link>
                <button
                  className="btn-secondary px-4 py-2"
                  onClick={markAsRead}
                  type="button"
                >
                  รับทราบ
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 text-left shadow-2xl shadow-blue-600/10">
          {hasNotice ? (
            <div>
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-50 to-lavender-50 text-brand-700">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black text-ink">{noticeTitle}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                    {noticeBody}
                  </p>
                </div>
              </div>
              <Link
                className="btn-primary mt-4 w-full"
                href="/courses/python-beginner"
                onClick={markAsRead}
              >
                เริ่มเรียน
              </Link>
            </div>
          ) : (
            <div className="text-sm font-bold leading-6 text-slate-600">
              ยังไม่มีแจ้งเตือนใหม่
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
