import React from 'react'

export const successMessage = (message) => (
    <div className="alert alert-success " role="alert">
        {message}
    </div>
)

export const warningMessage = (message) => (
    <div className="alert alert-warning " role="alert">
        {message}
    </div>
)

export const infoMessage = (message) => (
    <div className="alert alert-info " role="alert">
        {message}
    </div>
)

export const dangerMessage = (message) => (
    <div className="alert alert-danger " role="alert">
        {message}
    </div>
)