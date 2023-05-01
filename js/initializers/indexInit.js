import { IndexRender } from "../container/indexContainer.js";
import { getCurrencyInfo } from "../services/localizationService.js";
window.onload = () => {
    getCurrencyInfo(IndexRender);
}