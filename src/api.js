export const citiesUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const citiesApi = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ffd22aeabfmsh74ff644752c4b38p1c2379jsn971ad4dc6b6a',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

export const weatherAPI = 'https://api.openweathermap.org/data/2.5';

export const apiKey = '5358c88669bbe7bafdc395e504a57187';

// try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
// } catch (error) {
//     console.error(error);
// }