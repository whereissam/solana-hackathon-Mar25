async function geocoding(address) : Promise<{lng?: number, lat?: number, address: string}> {
    try{
        const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_API_KEY}`
        const response = await fetch(requestUrl)
        const data = await response.json()
        return { ...data.results[0].geometry.location, address: data.results[0].formatted_address }
    }catch{
        return {lng: undefined, lat: undefined, address: ""}
    }
}

export default geocoding