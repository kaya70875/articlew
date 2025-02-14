'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ToastContextProps {
    showToast: (message: string, severity: 'success' | 'error' | 'info' | 'warning', anchor?: AnchorOrigin) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'center' | 'right';

interface AnchorOrigin {
    vertical: Vertical;
    horizontal: Horizontal;
}

const defaultAnchor: AnchorOrigin = { vertical: 'top', horizontal: 'center' };

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
    const [anchor, setAnchor] = useState<AnchorOrigin>(defaultAnchor);

    const showToast = (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
        anchor: AnchorOrigin = defaultAnchor
    ) => {
        setMessage(message);
        setSeverity(severity);
        setAnchor(anchor);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={anchor}  // No need for 'as' because anchor is properly typed.
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
