// File: js/bookmarkManager.js

let bookmarks = [];

if (localStorage.getItem('gatewayBookmarks')) {
  bookmarks = JSON.parse(localStorage.getItem('gatewayBookmarks'));
}

export function saveBookmark(state) {
  const entry = { ...state, timestamp: new Date().toISOString() };
  bookmarks.push(entry);
  localStorage.setItem('gatewayBookmarks', JSON.stringify(bookmarks));
  console.log(`🔖 Bookmark saved:`, entry);
}

export function getBookmarks() {
  return bookmarks;
}

export function loadBookmark(index) {
  return bookmarks[index] || null;
}

export function clearBookmarks() {
  bookmarks = [];
  localStorage.removeItem('gatewayBookmarks');
}
