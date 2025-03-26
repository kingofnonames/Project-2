import axios from "axios";

export const translateImage = async (file) => {
    try{
        const result = await axios.post('/process_image', file);
        return result;
    }catch(e){
        return {
            errorMessage: "Problem in translate image",
        };
    }
};