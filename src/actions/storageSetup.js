export const cleanLocalStorage = state => 
    ['token', 'account_id', state].forEach(item => localStorage.removeItem(item))


export const setLocalStorage = (account, state = null) => {
    cleanLocalStorage(state);
    localStorage.setItem('token', account.token);
    localStorage.setItem('account_id', account.account_id);
}