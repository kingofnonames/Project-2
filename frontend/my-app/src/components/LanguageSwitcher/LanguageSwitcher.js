import { useDispatch, useSelector } from "react-redux";
import { setLanguage, selectLanguage, selectTranslations } from "../../features/language/languageSlice";

export default function LanguageSwitcher(){
    const dispatch = useDispatch();
    const currentLanguage = useSelector(selectLanguage);
    const translation = useSelector(selectTranslations);
    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle dropdown_menu"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#f4abba", backgroundColor: "#ea596e" }} 
                
            >
                <svg className="nav-shortcut-svg" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.54883 0.5C7.7688 0.5 6.02874 1.02784 4.5487 2.01677C3.06866 3.00571 1.9151 4.41131 1.23392 6.05585C0.552728 7.70038 0.374498 9.50998 0.721765 11.2558C1.06903 13.0016 1.9262 14.6053 3.18487 15.864C4.44354 17.1226 6.04719 17.9798 7.79302 18.3271C9.53885 18.6743 11.3484 18.4961 12.993 17.8149C14.6375 17.1337 16.0431 15.9802 17.0321 14.5001C18.021 13.0201 18.5488 11.28 18.5488 9.5C18.5463 7.11382 17.5973 4.8261 15.91 3.13882C14.2227 1.45154 11.935 0.50252 9.54883 0.5ZM7.26681 12.9615H11.8308C11.3661 14.5487 10.5873 15.9791 9.54883 17.1059C8.51037 15.9791 7.73152 14.5487 7.26681 12.9615ZM6.95268 11.5769C6.72306 10.2018 6.72306 8.79817 6.95268 7.42308H12.145C12.3746 8.79817 12.3746 10.2018 12.145 11.5769H6.95268ZM1.93345 9.5C1.93284 8.79768 2.02983 8.09869 2.22162 7.42308H5.54989C5.34335 8.79999 5.34335 10.2 5.54989 11.5769H2.22162C2.02983 10.9013 1.93284 10.2023 1.93345 9.5ZM11.8308 6.03846H7.26681C7.73152 4.45135 8.51037 3.02086 9.54883 1.89413C10.5873 3.02086 11.3661 4.45135 11.8308 6.03846ZM13.5478 7.42308H16.876C17.2603 8.78103 17.2603 10.219 16.876 11.5769H13.5478C13.7543 10.2 13.7543 8.79999 13.5478 7.42308ZM16.3308 6.03846H13.2648C12.9115 4.64823 12.3182 3.33036 11.5115 2.14423C12.5421 2.42117 13.5032 2.91072 14.3332 3.5814C15.1632 4.25208 15.8437 5.08904 16.3308 6.03846ZM7.58614 2.14423C6.77951 3.33036 6.18617 4.64823 5.83287 6.03846H2.76681C3.25396 5.08904 3.93441 4.25208 4.76442 3.5814C5.59442 2.91072 6.5556 2.42117 7.58614 2.14423ZM2.76681 12.9615H5.83287C6.18617 14.3518 6.77951 15.6696 7.58614 16.8558C6.5556 16.5788 5.59442 16.0893 4.76442 15.4186C3.93441 14.7479 3.25396 13.911 2.76681 12.9615ZM11.5115 16.8558C12.3182 15.6696 12.9115 14.3518 13.2648 12.9615H16.3308C15.8437 13.911 15.1632 14.7479 14.3332 15.4186C13.5032 16.0893 12.5421 16.5788 11.5115 16.8558Z" fill="currentColor"></path>
                </svg>
                <span> {currentLanguage}</span>
            </button>
            <ul className="dropdown-menu" style={{backgroundColor: "#F8D7DA", border: "1px solid #ea596e"}}>
                <li><button className="dropdown-item"
                    onClick={() => dispatch(setLanguage("VI"))} disabled={currentLanguage === "VI"}
                >{translation.VI}</button></li>
                <li><button className="dropdown-item"
                    onClick={() => dispatch(setLanguage("EN"))} disabled={currentLanguage === "EN"}
                >{translation.EN}</button></li>
                <li><button className="dropdown-item"
                    onClick={() => dispatch(setLanguage("ZH"))} disabled={currentLanguage === "ZH"}
                >{translation.ZH}</button></li>
            </ul>
        </div>
    );
}