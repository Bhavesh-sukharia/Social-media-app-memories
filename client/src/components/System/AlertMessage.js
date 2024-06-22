import React from 'react'
import { Alert } from "@mui/material";

export const ErrorAlert = ({ error }) => {
    return (
        error && (
        <Alert variant="filled" severity="error">
            {error}
        </Alert>
        )
    );
};

