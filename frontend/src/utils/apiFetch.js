// utils/apiFetch.js
export const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    credentials: 'include',
    ...options
  });

  if (res.status === 401) {
    throw { status: 401 }; // chưa đăng nhập
  }

  if (res.status === 403) {
    throw { status: 403 }; // ko có quyền
  }
  // if (res.status === 200) {
  //   throw { status: 200 }; // đã đăng nhập rồi
  // }
  return res.json(); 
};
