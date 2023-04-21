class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);            // super input the message in Error class
        this.statuscode =statuscode;

    }

}

export const errorMiddleware =(err,req,res,next)=>{
    const message =err.message;
    const statusCode =err.statusCode;
    return res.status(err.statusCode).json({
        success:false,
        message:message,
        
    })
}
export default ErrorHandler;