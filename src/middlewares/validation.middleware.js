import { createError } from "../utils/error.js";

export const validation = (schema) => {
    return (req,res,next) => {
        const data = {...req.body , ...req.params , ...req.query }

        if(req.file || req.files){
            data.attachment = req.file || req.files
        }

        const result = schema.validate(data , {abortEarly: false})
        if(result.error){
            let messages = result.error.details.map( (obj) => obj.message )
            return next(createError(400, messages))
        }
        return next()
    }
}



