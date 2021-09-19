export const NEWSLETTER_SERVICE_NAME = 'newsletter';

const services = {
    NEWSLETTER_SERVICE_NAME: 'REACT_APP_NEWSLETTER_BACKEND_URL'
};

export const getURL = (serviceName, path, query) => {
    let fullURL =  typeof process.env[services[serviceName]] !== 'undefined'
        ? process.env[services[serviceName]] + path
        : localStorage.getItem('REACT_APP_BACKEND_URL') +
        `/${serviceName}${path}`;

    // fullURL = 'http://localhost:3215'+ path;
    fullURL +=  query ? `?query=${encodeURIComponent(
        JSON.stringify(query)
    )}`: '';

    return fullURL;
};
