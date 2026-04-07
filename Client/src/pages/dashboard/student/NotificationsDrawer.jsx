import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNotifications } from "../../../store/NotificationContext.jsx";
import {
  Flame,
  FileCheck,
  CalendarDays,
  FilePen,
  Bell,
  EllipsisVertical,
  BellOff,
} from "lucide-react";
import "./NotificationsDrawer.css";

const NotificationsDrawer = () => {
  const {
    showNotifications,
    closeNotifications,
    notifications,
    markAsRead,
    markAllAsRead,
    clearAll,
    unreadCount,
  } = useNotifications();

  const [menuOpen, setMenuOpen] = useState(false);

  const getNotificationStyle = (type) => {
    switch (type) {
      case "urgent":
        return { icon: <Flame size={25} />, class: "urgent", color: "danger" };
      case "grade":
        return {
          icon: <FileCheck size={25} />,
          class: "grade",
          color: "success",
        };
      case "update":
        return {
          icon: <CalendarDays size={25} />,
          class: "update",
          color: "warning",
        };
      case "new":
        return { icon: <FilePen size={25} />, class: "new", color: "primary" };
      default:
        return {
          icon: <Bell size={25} />,
          class: "default",
          color: "secondary",
        };
    }
  };

  const handleCloseDrawer = () => {
    if (unreadCount > 0) {
      markAllAsRead();
    }
    closeNotifications();
    setMenuOpen(false);
  };

  return createPortal(
    <>
      {showNotifications && (
        <div
          className="custom-backdrop fade show"
          onClick={handleCloseDrawer}
          style={{ zIndex: 1040 }}
        ></div>
      )}

      <div
        className={`offcanvas offcanvas-end classora-notifications border-0 ${showNotifications ? "show" : ""}`}
        tabIndex="-1"
        style={{
          visibility: showNotifications ? "visible" : "hidden",
          zIndex: 1050, // <-- This forces the drawer on top of the backdrop
        }}
      >
        <div className="offcanvas-header px-4 py-4">
          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold m-0 text-dark">Notifications</h5>
            {unreadCount > 0 && (
              <span className="unread-badge rounded-pill fw-semibold">
                {unreadCount} New
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn-close shadow-none"
            onClick={handleCloseDrawer}
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body p-3">
          <div className="d-flex justify-content-between align-items-center px-2 mb-3 position-relative">
            <span className="section-label">Latest</span>

            {notifications.length > 0 && (
              <div className="dropdown">
                <button
                  className="menu-dot-btn border-0"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <EllipsisVertical width={20} strokeWidth={1.5} />
                </button>
                {menuOpen && (
                  <div className="menu-dropdown shadow-sm border position-absolute end-0 mt-2 bg-white rounded-3 z-3">
                    <button
                      className="btn btn-link text-dark text-decoration-none d-block w-100 text-start"
                      onClick={() => {
                        markAllAsRead();
                        setMenuOpen(false);
                      }}
                    >
                      Mark all as read
                    </button>
                    <button
                      className="btn btn-link text-danger text-decoration-none d-block w-100 text-start"
                      onClick={() => {
                        clearAll();
                        setMenuOpen(false);
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="d-flex flex-column gap-3">
            {notifications.length === 0 ? (
              <div className="empty-state text-center py-5">
                <span className="text-secondary opacity-50 mb-3 d-inline-block">
                  <BellOff width={60} height={60} />
                </span>
                <p className="text-muted mt-2 fw-medium mx-auto">
                  You don't have notifications yet! <br />
                  All caught up.
                </p>
              </div>
            ) : (
              notifications.map((n) => {
                const style = getNotificationStyle(n.type);
                return (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`notif-card p-3 ${n.isRead ? "read" : "unread rounded-start-0"} ${style.class}`}
                  >
                    <div className="d-flex m-0 gap-3 align-items-start">
                      <div
                        className={`notif-icon-box flex-shrink-0 shadow-sm text-${style.color} bg-${style.color} bg-opacity-25`}
                      >
                        {style.icon}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <h6 className="notif-title fw-bold text-dark m-0">
                            {n.title}
                          </h6>
                          <small className="notif-time text-muted fw-medium ms-2 flex-shrink-0">
                            {n.time}
                          </small>
                        </div>
                        <p className="notif-msg m-0 mt-1">{n.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default NotificationsDrawer;