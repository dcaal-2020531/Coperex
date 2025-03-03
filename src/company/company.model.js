import { Schema,model } from "mongoose";

const companySchema = Schema(
    {
        impactLevel: {
            type: Number,
            require:true
        },
        trajectoryYears:{
            type: Number,       
            require:true
 
        },
        companyCategory:{
            type:String,
            require:true

        },
        name:{
         type:String,
        unique:true
        }
    }
)
export default model('Company', companySchema)