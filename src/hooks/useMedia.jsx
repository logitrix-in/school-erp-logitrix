import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useMedia = () => {
    const context = useContext(AppContext);
    return {
        mediaTypes: context.mediaTypes,
        mediaCategories: context.mediaCategory,
        mediaLanguages: context.mediaLanguage,
    };
};

export default useMedia;
