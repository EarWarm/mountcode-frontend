import {Emitter} from "mitt";
import {Axios} from "axios";

declare global {
    interface Window {
        emitter: Emitter<any>,
        axios: Axios,
        config: any
    }
}