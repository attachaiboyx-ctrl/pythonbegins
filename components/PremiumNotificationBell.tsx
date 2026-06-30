"use client";

import Link from "next/link";
import { Bell, CheckCircle2, Radio, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type PremiumNotificationBellProps = {
  userId: string;
  role: string;
  membership: string;
  initialNotifications?: DatabaseNotification[];
};

type UserStatusResponse = {
  isAuthenticated: boolean;
  role: string | null;
  membership?: string;
  isPremium: boolean;
};

export type DatabaseNotification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  type: string;
  isRead: boolean;
  createdAt: string;
};

const POLLING_INTERVAL_MS = 10_000;
const NOTIFICATION_POLLING_INTERVAL_MS = 30_000;
const noticeTitle = "การชำระเงินได้รับการอนุมัติแล้ว";
const noticeBody =
  "คุณเป็นสมาชิกพรีเมียมแล้ว สามารถเริ่มเรียนคอร์ส Python มือใหม่ได้ทันที";
const courseAnnouncement = {
  id: "javascript-beginner-launch-001",
  type: "course-update",
  title: "เปิดคอร์สใหม่แล้ว!",
  message:
    "JavaScript มือใหม่ พร้อมเรียนแล้ว เริ่มจากพื้นฐาน เหมาะสำหรับผู้เริ่มต้น",
  href: "/courses/javascript-beginner",
  label: "ดูคอร์ส JavaScript"
};
const liveAnnouncement = {
  id: "live-classroom-premium-001",
  type: "premium-feature",
  title: "ห้องเรียนสดสำหรับสมาชิก Premium",
  message:
    "อัปเกรดเป็น Premium เพื่อเข้าห้องเรียนสด ทบทวนเนื้อหา และดูตัวอย่างการเขียนโค้ดแบบเป็นขั้นตอน"
};

export function PremiumNotificationBell({
  userId,
  role,
  membership,
  initialNotifications = []
}: PremiumNotificationBellProps) {
  const isAdmin = role === "admin";
  const [isPremium, setIsPremium] = useState(membership === "paid");
  const [hasNotice, setHasNotice] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [hasCourseAnnouncement, setHasCourseAnnouncement] = useState(false);
  const [hasUnreadCourseAnnouncement, setHasUnreadCourseAnnouncement] =
    useState(false);
  const [hasLiveAnnouncement, setHasLiveAnnouncement] = useState(false);
  const [hasUnreadLiveAnnouncement, setHasUnreadLiveAnnouncement] =
    useState(false);
  const [databaseNotifications, setDatabaseNotifications] = useState<
    DatabaseNotification[]
  >(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const storageKey = useMemo(
    () => `python-begins-premium-approved:${userId}`,
    [userId]
  );
  const courseAnnouncementStorageKey = useMemo(
    () => `python-begins-notification:${userId}:${courseAnnouncement.id}`,
    [userId]
  );
  const liveAnnouncementStorageKey = useMemo(
    () => `python-begins-notification:${userId}:${liveAnnouncement.id}`,
    [userId]
  );
  const unreadDatabaseCount = databaseNotifications.filter(
    (notification) => !notification.isRead
  ).length;
  const unreadCount =
    (hasUnread ? 1 : 0) +
    (hasUnreadCourseAnnouncement ? 1 : 0) +
    (hasUnreadLiveAnnouncement ? 1 : 0) +
    unreadDatabaseCount;
  const hasAnyNotification =
    hasNotice ||
    hasCourseAnnouncement ||
    hasLiveAnnouncement ||
    databaseNotifications.length > 0;
  const canAccessLive = isAdmin || isPremium;

  const loadDatabaseNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications", {
        cache: "no-store",
        credentials: "same-origin"
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as {
        notifications?: DatabaseNotification[];
      };

      setDatabaseNotifications(data.notifications || []);
    } catch {
      // Keep existing notifications unchanged if the request fails.
    }
  }, []);

  useEffect(() => {
    loadDatabaseNotifications();

    const intervalId = window.setInterval(
      loadDatabaseNotifications,
      NOTIFICATION_POLLING_INTERVAL_MS
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadDatabaseNotifications, userId]);

  useEffect(() => {
    if (localStorage.getItem(courseAnnouncementStorageKey) === "read") {
      setHasCourseAnnouncement(false);
      setHasUnreadCourseAnnouncement(false);
      return;
    }

    setHasCourseAnnouncement(true);
    setHasUnreadCourseAnnouncement(true);
  }, [courseAnnouncementStorageKey]);

  useEffect(() => {
    if (localStorage.getItem(liveAnnouncementStorageKey) === "read") {
      setHasLiveAnnouncement(false);
      setHasUnreadLiveAnnouncement(false);
      return;
    }

    setHasLiveAnnouncement(true);
    setHasUnreadLiveAnnouncement(true);
  }, [liveAnnouncementStorageKey]);

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

  function markPremiumAsRead() {
    localStorage.setItem(storageKey, "read");
    setHasUnread(false);
    setShowToast(false);
  }

  function markCourseAnnouncementAsRead({ hide = false } = {}) {
    localStorage.setItem(courseAnnouncementStorageKey, "read");
    setHasUnreadCourseAnnouncement(false);

    if (hide) {
      setHasCourseAnnouncement(false);
    }
  }

  function markLiveAnnouncementAsRead({ hide = false } = {}) {
    localStorage.setItem(liveAnnouncementStorageKey, "read");
    setHasUnreadLiveAnnouncement(false);

    if (hide) {
      setHasLiveAnnouncement(false);
    }
  }

  async function markDatabaseNotificationsAsRead({
    ids,
    markAllRead = false
  }: {
    ids?: string[];
    markAllRead?: boolean;
  }) {
    if (!markAllRead && (!ids || ids.length === 0)) {
      return;
    }

    setDatabaseNotifications((current) =>
      current.map((notification) =>
        markAllRead || ids?.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );

    try {
      await fetch("/api/notifications", {
        body: JSON.stringify(markAllRead ? { markAllRead: true } : { ids }),
        cache: "no-store",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH"
      });
    } catch {
      // The next polling tick will reconcile if marking as read fails.
    }
  }

  function markUnreadNotificationsAsRead() {
    if (hasUnread) {
      markPremiumAsRead();
    }

    if (hasUnreadCourseAnnouncement) {
      markCourseAnnouncementAsRead();
    }

    if (hasUnreadLiveAnnouncement) {
      markLiveAnnouncementAsRead();
    }

    if (unreadDatabaseCount > 0) {
      void markDatabaseNotificationsAsRead({ markAllRead: true });
    }
  }

  function toggleDropdown() {
    setIsOpen((current) => {
      const nextOpen = !current;

      if (nextOpen) {
        void loadDatabaseNotifications();
        markUnreadNotificationsAsRead();
      }

      return nextOpen;
    });
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
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black leading-none text-white ring-2 ring-white">
            {unreadCount}
          </span>
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
                  onClick={markPremiumAsRead}
                >
                  เริ่มเรียน
                </Link>
                <button
                  className="btn-secondary px-4 py-2"
                  onClick={markPremiumAsRead}
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
        <div className="absolute right-0 top-12 z-50 w-[min(23rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 text-left shadow-2xl shadow-blue-600/10">
          {hasAnyNotification ? (
            <div className="space-y-4">
              {databaseNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-4 ${
                    notification.isRead
                      ? "border-slate-200 bg-white"
                      : "border-brand-100 bg-gradient-to-br from-white to-brand-50"
                  }`}
                >
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Bell className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-ink">
                          {notification.title}
                        </p>
                        {!notification.isRead ? (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-red-700">
                            ใหม่
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs font-bold text-slate-400">
                        {new Intl.DateTimeFormat("th-TH", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        }).format(new Date(notification.createdAt))}
                      </p>
                    </div>
                  </div>
                  {notification.link ? (
                    <Link
                      className="btn-primary mt-4 w-full px-4 py-2"
                      href={notification.link}
                      onClick={() =>
                        void markDatabaseNotificationsAsRead({
                          ids: [notification.id]
                        })
                      }
                    >
                      เปิดรายละเอียด
                    </Link>
                  ) : null}
                </div>
              ))}

              {hasLiveAnnouncement ? (
                <div className="rounded-lg border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-4">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-100 to-lavender-100 text-violet-700">
                      <Radio className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-ink">
                          {liveAnnouncement.title}
                        </p>
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-violet-800">
                          Premium
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                        {liveAnnouncement.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      className="btn-primary flex-1 px-4 py-2"
                      href={canAccessLive ? "/live" : "/payment"}
                      onClick={() =>
                        markLiveAnnouncementAsRead({ hide: true })
                      }
                    >
                      {canAccessLive ? "เข้าห้องเรียนสด" : "อัปเกรด Premium"}
                    </Link>
                    <button
                      className="btn-secondary px-4 py-2"
                      onClick={() =>
                        markLiveAnnouncementAsRead({ hide: true })
                      }
                      type="button"
                    >
                      ปิด
                    </button>
                  </div>
                </div>
              ) : null}

              {hasCourseAnnouncement ? (
                <div className="rounded-lg border border-amber-100 bg-gradient-to-br from-white to-amber-50 p-4">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-100 to-lavender-100 text-amber-700">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-ink">
                          {courseAnnouncement.title}
                        </p>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-amber-800">
                          {courseAnnouncement.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                        {courseAnnouncement.message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Link
                      className="btn-primary flex-1 px-4 py-2"
                      href={courseAnnouncement.href}
                      onClick={() =>
                        markCourseAnnouncementAsRead({ hide: true })
                      }
                    >
                      {courseAnnouncement.label}
                    </Link>
                    <button
                      className="btn-secondary px-4 py-2"
                      onClick={() =>
                        markCourseAnnouncementAsRead({ hide: true })
                      }
                      type="button"
                    >
                      ปิด
                    </button>
                  </div>
                </div>
              ) : null}

              {hasNotice ? (
                <div className="rounded-lg border border-brand-100 bg-white p-4">
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
                    onClick={markPremiumAsRead}
                  >
                    เริ่มเรียน
                  </Link>
                </div>
              ) : null}
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
