// errors globais usado com o asyncHandler
export const globalErrorHandler = (err, req, res, next)=>{

    const stack = err?.stack

    const statusCode = err?.statusCode ? err?.statusCode : 500

    const message = err?.message

    res.status(statusCode).json({
        stack: stack,
        message: message
    })
}

// error para 404 notFound
export const notFound = (req, res, next)=>{

    const err = new Error(`Route ${req.originalUrl} nor found`)

    next(err)

}