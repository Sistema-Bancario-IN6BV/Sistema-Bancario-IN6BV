// Transactions.jsx — REDISEÑO VISUAL · Lógica intacta
import { useState, useEffect } from 'react';
import { getTransactions } from '../../../shared/api/admin';
import { showSuccess, showError } from '../../../shared/utils/toast';

const IconRefresh = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
    </svg>
);

const IconArrowDown  = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14m7-7-7 7-7-7"/></svg>
);
const IconArrowUp    = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5m7 7-7-7-7 7"/></svg>
);
const IconArrowRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);
const IconCard       = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></svg>
);

/* — Helpers originales intactos — */
const getTransactionType = (type) => {
    const types = {
        transfer:   'Transferencia',
        deposit:    'Depósito',
        withdrawal: 'Retiro',
        payment:    'Pago',
    };
    return types[type] || type;
};

const getTxIcon = (type) => {
    const map = {
        deposit:    { cls: 'deposit',    Icon: IconArrowDown  },
        withdrawal: { cls: 'withdrawal', Icon: IconArrowUp    },
        transfer:   { cls: 'transfer',   Icon: IconArrowRight },
        payment:    { cls: 'payment',    Icon: IconCard       },
    };
    const entry = map[type] || { cls: 'transfer', Icon: IconArrowRight };
    return (
        <span className={`tx-icon ${entry.cls}`}>
            <entry.Icon />
        </span>
    );
};

const statusBadge = (status) => {
    if (status === 'completed' || status === 'approved')
        return <span className="badge badge-success">{status}</span>;
    if (status === 'pending')
        return <span className="badge badge-warning">{status}</span>;
    if (status === 'rejected' || status === 'failed')
        return <span className="badge badge-danger">{status}</span>;
    return <span className="badge badge-neutral">{status}</span>;
};

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading]           = useState(true);

    /* — useEffect y loadTransactions originales intactos — */
    useEffect(() => { loadTransactions(); }, []);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const res = await getTransactions({ limit: 50 });
            const data = res.data?.transactions ?? res.data?.transaction ?? res.data ?? [];
            setTransactions(Array.isArray(data) ? data : []);
            showSuccess('Transacciones cargadas');
        } catch (error) {
            showError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div className="page-header-text">
                    <h1 className="page-title">Transacciones</h1>
                    <p className="page-subtitle">Historial de movimientos del sistema</p>
                </div>
                <button
                    className="btn-secondary"
                    onClick={loadTransactions}
                    disabled={loading}
                >
                    <IconRefresh /> Actualizar
                </button>
            </div>

            {/* Tabla */}
            <div className="panel">
                {loading ? (
                    <div className="loading-state">
                        <span className="spinner-blue" />
                        Cargando transacciones...
                    </div>
                ) : (
                    <>
                        <div className="data-table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Fecha</th>
                                        <th>Monto</th>
                                        <th>Referencia</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="data-table-empty">
                                                No hay transacciones registradas.
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.map((tx) => (
                                            <tr key={tx.id}>
                                                <td>
                                                    <span className="tx-type">
                                                        {getTxIcon(tx.type)}
                                                        {getTransactionType(tx.type)}
                                                    </span>
                                                </td>
                                                <td className="muted">
                                                    {new Date(tx.date).toLocaleDateString('es-GT', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </td>
                                                <td>
                                                    <span style={{ fontWeight: 600 }}>
                                                        Q {tx.amount.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="muted" style={{ fontSize: '0.8rem' }}>
                                                    {tx.reference || '—'}
                                                </td>
                                                <td>{statusBadge(tx.status)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Contador */}
                        {transactions.length > 0 && (
                            <div className="pagination">
                                <span>{transactions.length} transacciones en total</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Transactions;