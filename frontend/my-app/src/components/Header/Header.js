import React from 'react'
import classes from './header.module.css'
import {Link, NavLink} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../features/language/languageSlice';
export default function Header(){
    const translation = useSelector(selectTranslations);
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to = '/' className={classes.logo}>
                    <img src = {`${process.env.PUBLIC_URL}/assets/icons/pig.svg`} alt = "HUST"/>
                    <span className={classes.logo_text}>PIG.LOVE</span>
                </Link>
                <div className={classes.welcome}>{translation.greeting}</div>
                <nav className={classes.supporter}>
                    <LanguageSwitcher/>
                </nav>
            </div>

        </header>
    )
}