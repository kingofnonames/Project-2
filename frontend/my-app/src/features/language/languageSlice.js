import { createSlice } from "@reduxjs/toolkit";
import translations from "./translation";
const languages = {
    EN: translations.EN,
    VI: translations.VI,
    ZH: translations.ZH,
};

const initialState = {
    currentLanguage: "VI",
    translations: languages
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        }
    }
});

export const {setLanguage} = languageSlice.actions;

export const selectLanguage = (state) => state.language.currentLanguage;
export const selectTranslations = (state) => state.language.translations[state.language.currentLanguage];

export default languageSlice.reducer;
