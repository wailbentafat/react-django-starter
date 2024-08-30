// src/utils/utils.js

/**
 * Get a cookie value by name.
 * @param {string} name - The name of the cookie.
 * @returns {string} - The value of the cookie, or an empty string if not found.
 */
export const getcookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
};

/**
 * Delete a cookie by name.
 * @param {string} name - The name of the cookie to delete.
 */
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
