
const getCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export {
    getCookie
}