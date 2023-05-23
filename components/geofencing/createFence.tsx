const createFence = (region: { meters: number; latitude: number; longitude: number; }) => {
    let coef = region.meters / 111320.0;
    let negCoef = (-1.0 * region.meters) / 111320.0;

    let northLatitude = region.latitude + coef;
    let eastLongitude = region.longitude + (coef / Math.cos(region.latitude * (Math.PI / 180)));

    let southLatitude = region.latitude + negCoef;
    let westLongitude = region.longitude + (negCoef / Math.cos(region.latitude * (Math.PI / 180)));

    return [
        {
            latitude: northLatitude, 
            longitude: region.longitude
        },
        {
            latitude: region.latitude, 
            longitude: eastLongitude
        },
        {
            latitude: southLatitude, 
            longitude: region.longitude
        },
        {
            latitude: region.latitude, 
            longitude: westLongitude
        }
    ]
}

export default createFence;