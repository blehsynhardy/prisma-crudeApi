import Joi  from 'joi';

export const login_schema = async (req, res, next) => {
    console.log(req.body);

    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    try {
        await schema.validateAsync(req.body);
         next()
    }
    catch (err) { 
       return res.status(500).json({message : err.message})
    }

}


export const validate_product = async (req, res, next) => {
    console.log(req.body);

    const schema = Joi.object({
        name : Joi.string().required()
    })  
    try {
        await schema.validateAsync(req.body);
         next()
    }
    catch (err) { 
       return res.status(500).json({message : err.message})
    }
}   


export const validate_update = async (req, res, next) => {
    console.log(req.body);

    const schema = Joi.object({
        name : Joi.string().required()
    })  
    try {
        await schema.validateAsync(req.body);
         next()
    }
    catch (err) { 
       return res.status(500).json({message : err.message})
    }
}   