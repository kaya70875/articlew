import React from 'react'

type ApiError = {
    errorMessage?: string;
    error: {
        message: string;
        status: number;
        response: {
            data: {
                detail: string;
            }
        }
    }
}

type ErrorKey = 'NOT_FOUND' | 'REQUEST_EXCEEDED' | 'UNAUTHORIZED' | 'DEFAULT';

type ErrorType = {
    status: number;
    className?: string;
    message?: string;
    messageClassName?: string;
}

export default function ApiError({ errorMessage, error }: ApiError) {

    const ERROR_TYPES: Record<ErrorKey, ErrorType> = {
        NOT_FOUND: {
            status: 404,
            className: 'border-primaryPurple',
            message: `${error.response.data.detail}`, //Show original error message from backend.
            messageClassName: 'font-medium'
        },
        UNAUTHORIZED: {
            status: 401,
            className: 'border-red-500',
            message: `${error.response.data.detail}`,
            messageClassName: 'text-red-500'
        },
        REQUEST_EXCEEDED: {
            status: 402,
            className: 'border-primaryPurple',
            message: 'Daily request limit exceeded. Consider upgrading your plan or try again tomorrow.',
            messageClassName: 'font-medium'
        },
        DEFAULT: {
            status: 0, //Any status code will show DEFAULT error type.
            className: 'border-red-500',
            message: errorMessage, //Show custom error message.
            messageClassName: 'text-red-500',
        },
    }

    if (!error) return;

    const getErrorType = () => {
        if (error.status === ERROR_TYPES.REQUEST_EXCEEDED.status) return ERROR_TYPES.REQUEST_EXCEEDED;
        if (error.status === ERROR_TYPES.NOT_FOUND.status) return ERROR_TYPES.NOT_FOUND;
        if (error.status === ERROR_TYPES.UNAUTHORIZED.status) return ERROR_TYPES.UNAUTHORIZED;
        return ERROR_TYPES.DEFAULT;
    }

    const errorType = getErrorType();

    // Return null on NOT_FOUND error.
    //if (errorType === ERROR_TYPES.NOT_FOUND) return;

    return (
        <div className={`flex flex-col gap-4 border ${errorType.className} p-4 rounded-xl`}>
            <p className={errorType.messageClassName}>{errorType.message}</p>
        </div>
    )
}
