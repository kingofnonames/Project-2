import React from "react"
import {Link} from 'react-router-dom'
import classes from './footer.module.css'
import { useSelector } from "react-redux"
import { selectTranslations } from "../../features/language/languageSlice"
export default function Footer(){
    const translation = useSelector(selectTranslations);
    return <footer className={classes.footer}>
        <div className={classes.container}>
            <Link to = '/' className = {classes.logo}>
                <img src = {`${process.env.PUBLIC_URL}/assets/icons/pig.svg`} alt="HUST"/>
                <span>PIG.LOVE</span>  
            </Link>
        </div>
        <div className={classes.infor_contact}>
            <div className={classes.infor_social_private}>
                <div className={classes.component}>
                    {translation.phone}
                </div>
                <div className={classes.component}>
                    Email:
                </div>
                <div className={classes.component}>
                    Facebook:
                </div>
                <div className={classes.component}>
                    Instagram:
                </div>
            </div>
        </div>
        <div className={classes.infor_}>
            <div className={classes.infor_detail}>
                <Link to = '/' className = {classes.component_}>
                    {translation.policy}
                </Link>
                <Link to = "/" className = {classes.component_}>
                    {translation.contact}
                </Link>
            </div>
        </div>
    </footer>
}