import moment from "moment";

export default function (slas) {
    let results = {}
    slas.forEach((sla) => {
        let def = sla.sla_definition_id,
            week = moment(sla.range_end).format('YYYY-WW'),
            dow = moment(sla.range_end).format('E')
        if (!results[def]) {
            results[def] = {}
        }

        if (!results[def][week]) {
            results[def][week] = {}
        }

        results[def][week][dow] = sla
    })

    return results
}