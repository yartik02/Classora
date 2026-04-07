import React, { createContext, useState, useContext, useMemo } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: "urgent", title: "Due Tomorrow", message: "React Context API Project is due in 24 hours.", time: "2h ago", isRead: false },
    { id: 2, type: "grade", title: "Grade Posted", message: "You received a 9.5/10 on Binary Trees.", time: "5h ago", isRead: false },
    { id: 3, type: "update", title: "Deadline Extended", message: "Database Schema moved to Mar 15.", time: "1d ago", isRead: true },
    { id: 4, type: "new", title: "New Task Assigned", message: "Agile Case Study added to Software Eng.", time: "2d ago", isRead: true },
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const openNotifications = () => setShowNotifications(true);
  const closeNotifications = () => setShowNotifications(false);
  
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ 
      showNotifications, openNotifications, closeNotifications, 
      notifications, unreadCount, markAsRead, markAllAsRead, clearAll 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);