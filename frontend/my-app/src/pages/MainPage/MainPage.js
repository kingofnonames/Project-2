import Header from '../../components/Header/Header';
import classes from './mainPage.module.css'
import React, { useState } from 'react';
import UploadIcon from '../../components/UploadIcon/UploadIcon';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../features/language/languageSlice';
import { api } from '../../axiosConfig';
import { toast } from "react-toastify";

const MainPage = () => {    
    const translation = useSelector(selectTranslations);
    const [image, setImage] = useState(null);
    const [imageProcessed, setImageProcessed] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleUpload = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if(file){
            const imgLink = URL.createObjectURL(file);
            setImage(imgLink);
            setImageProcessed(null);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if(file){
            const imgLink = URL.createObjectURL(file);
            setImage(imgLink);
        }
    };
    const handleRemoveFile = (e) => {
        if(image){
            setImage(null);
            setImageProcessed(null);
            setLoading(false);
        }
    };
    
    const handleTranslate = async () => {
        if(!selectedFile){
            console.log("Please choose an image");
            return;
        }
        setLoading(true);
        setImageProcessed(null);
        const formData = new FormData();
        formData.append("file", selectedFile);
        try{
            const response = await api.post("/process_image", formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                responseType: "blob",
            });
            const imageUrl = URL.createObjectURL(response.data);
            const extension = response.headers["content-type"].split("/")[1];
            setImageProcessed({ url: imageUrl, ext: extension });
            toast.success(translation.success);
        }catch(e){
            setLoading(false);
            const errorResponse = e.response?.data;
            let errorCode = translation.error_code[7];
            if (errorResponse instanceof Blob) {
                const text = await errorResponse.text(); 
                const jsonData = JSON.parse(text);
                errorCode = jsonData.errorCode;
            } 
            toast.error(translation.error_code[errorCode]);
        }
        setLoading(false);
    };
    const handleDownloadFile = () => {
        if(!imageProcessed) return;
        const now = new Date();
        const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        const time = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;        
        const filename = `image_${date}_${time}.${image.ext || "png"}`;
        const link = document.createElement('a');
        link.href = imageProcessed.url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
         <Header/>
         <div className={classes.title}>
            <div className={classes.main_text}>
                {translation.title}
            </div>
            <div className={classes.sub_text}>
                {translation.sub_title}
            </div>
         </div>
         <div className={classes.container}>
            <label htmlFor="input-file" className={classes.drop_area} 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onChange={handleUpload}
            >
                <input type="file" accept="image/*" id="input-file" className={classes.input_file} hidden/>
                {image ? (
                    <div className={classes.img_view_uploaded} style={{ backgroundImage: `url(${image})`}}></div>
                ) : 
                <div className={classes.img_view}>
                    <UploadIcon width={100} color="red" className={classes.svG}/>
                    <p>{translation.drag_text}</p>
                    <span>{translation.format}</span>
                </div>}
            </label>
            {image ? 
                <div className={classes.option}>
                    <div className={classes.translate} onClick={handleTranslate}>{translation.translate}</div>
                    <div className={classes.remove} onClick={handleRemoveFile}>{translation.remove}</div> 
                </div>
             : (<>
                <div className={classes.option}></div>
             </>
             )
            }
            {loading ? 
                <>
                    <div className={classes.spinner}></div>
                </>
                :
                <>
                </>
            }
            {imageProcessed ?
                <>
                    <div className={classes.drop_area}>
                        <div className={classes.img_view_uploaded} style={{ backgroundImage: `url(${imageProcessed["url"]})`}}></div>
                    </div>
                    <div className={classes.option}>
                        <div className={classes.download} onClick={handleDownloadFile}>{translation.download}</div>     
                    </div>
                </>
                :
                <>
                </>
            }
         </div>
         
         <div className={classes.addition}>
            <div className={classes.addition_main_text}>
                {translation.tools}
            </div>
            <div className={classes.addition_sub_text}>
                <div className={classes.block}>
                    <ul>
                        <li>{translation.tool1}</li>
                        <li>{translation.tool2}</li>
                        <li>{translation.tool3}</li>
                    </ul>
                </div>
                <div className={classes.block}>
                    <ul>
                        <li>{translation.tool4}</li>
                        <li>{translation.tool5}</li>                    
                    </ul>
                </div>
            </div>
         </div>
         <Footer/>
        </>
    );
};

export default MainPage;