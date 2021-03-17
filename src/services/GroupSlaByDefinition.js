import moment from "moment";

export default function (slas) {
    let results = {}
    slas.forEach((sla) => {
        let def = sla.sla_definition_id,
            dow = moment(sla.range_end).format('E')
        if (!results[def]) {
            results[def] = {}
        }

        results[def][dow] = sla
    })

    return results
}