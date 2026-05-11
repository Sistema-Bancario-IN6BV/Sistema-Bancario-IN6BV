import { axiosAdmin } from "./api";

// CUENTAS
export const getAccounts = async () => {
    return axiosAdmin.get('/accounts/me');
};

export const getAccountById = async (accountId) => {
    if (!accountId) throw new Error("getAccountById: accountId required");
    return axiosAdmin.get(`/accounts/${accountId}`);
};

export const createAccount = async (accountData) => {
    return axiosAdmin.post('/accounts/create', accountData);
};

export const updateAccount = async (accountId, accountData) => {
    return axiosAdmin.put(`/accounts/update/${accountId}`, accountData);
};

export const deleteAccount = async (accountId) => {
    return axiosAdmin.delete(`/accounts/delete/${accountId}`);
};

// TRANSACCIONES
export const getTransactions = async (filters = {}) => {
    return axiosAdmin.get('/transactions/get', { params: filters });
};

export const getTransactionById = async (transactionId) => {
    return axiosAdmin.get(`/transactions/${transactionId}`);
};

// PRODUCTOS
export const getProducts = async () => {
    return axiosAdmin.get('/products');
};

// USUARIOS
export const getUsers = async () => {
    return axiosAdmin.get('/users');
};

export const getUserById = async (userId) => {
    return axiosAdmin.get(`/users/${userId}`);
};

export const deleteUser = async (userId) => {
    return axiosAdmin.delete(`/users/${userId}`);
};