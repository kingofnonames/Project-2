import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";


export default function AppRoutes(){
    // const translations = useSelector(selectTranslations);
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
        </Routes>
    )
}