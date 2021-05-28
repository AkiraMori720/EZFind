export const getShortUserName = (username) => {
    if (username && username.length > 0) {
        let short_name = ""
        var res = username.split(" ");
        if (res[0] && res[0].length > 0) {
            short_name = res[0].charAt(0)
        }
        if (res[1] && res[1].length > 0) {
            short_name = short_name + res[1].charAt(0)
        }
        return short_name.toUpperCase()
    }
    return null
}
export const separateAddress = components => {
    let zip = null,
        street = null,
        region = null,
        state = null;

    if (components && components.length) {
        components.map(item => {
            if (item.types.includes('postal_code')) {
                zip = item.long_name;
            }
            // if (item.types.includes('street_number')) {
            //     if (street) street = item.long_name + ' ' + street;
            //     else street = item.long_name;
            // }
            if (item.types.includes('route')) {
                if (street) street = street + ' ' + item.long_name;
                else street = item.long_name;
            }
            if (item.types.includes('locality')) {
                region = item.long_name;
            }
            if (item.types.includes('administrative_area_level_1')) {
                state = item.long_name;
            }
        });
    }
    return {
        street,
        zip,
        state,
        region,
    };
};
export function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 0.621371; //(mile)
}

// Converts numeric degrees to radians
export function toRad(Value) {
    return Value * Math.PI / 180;
}