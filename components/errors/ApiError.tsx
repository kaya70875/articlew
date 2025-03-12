import React from 'react'

type ApiError = {
    errorMessage?: string;
    error: string;
}

type ErrorKey = 'NOT_FOUND' | 'REQUEST_EXCEEDED' | 'DEFAULT';

type ErrorType = {
    code: string;
    className?: string;
    message?: string;
    messageClassName?: string;
}

export default function ApiError({ errorMessage, error }: ApiError) {

    const ERROR_TYPES: Record<ErrorKey, ErrorType> = {
        NOT_FOUND: {
            code: '404',
        },
        REQUEST_EXCEEDED: {
            code: '402',
            className: 'border-primaryPurple',
            message: 'Daily request limit exceeded. Consider upgrading your plan or try again tomorrow.',
            messageClassName: 'font-medium'
        },
        DEFAULT: {
            code: '', //Any status code will show DEFAULT error type.
            className: 'border-red-500',
            message: errorMessage,
            messageClassName: 'text-red-500',
        },
    }

    if (!error) return;

    const getErrorType = () => {
        if (error.includes(ERROR_TYPES.REQUEST_EXCEEDED.code)) return ERROR_TYPES.REQUEST_EXCEEDED;
        if (error.includes(ERROR_TYPES.NOT_FOUND.code)) return ERROR_TYPES.NOT_FOUND;
        return ERROR_TYPES.DEFAULT;
    }

    const errorType = getErrorType();

    // Return null on NOT_FOUND error.
    if (errorType === ERROR_TYPES.NOT_FOUND) return;

    return (
        <div className={`flex flex-col gap-4 border ${errorType.className} p-4 rounded-xl`}>
            <p className={errorType.messageClassName}>{errorType.message}</p>
        </div>
    )
}
