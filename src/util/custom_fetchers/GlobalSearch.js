import config from "@/config";
import DateTime from "@/util/DateTime";
import axios from "axios";
import JSONBigInt from "json-bigint";

export default class GlobalSearch {

    static fetch(search_text, callback) {
        let url = config.api.basePath + config.api.prefix + '_autocomplete/' + search_text

        axios.get(url, {
            transformResponse: [data => data]
        }).then((response) => {
            callback(JSONBigInt.parse(response.data))
        }, (error) => {
            window.console.error(error)
        })
    }

}