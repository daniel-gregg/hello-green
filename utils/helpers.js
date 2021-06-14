module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        // format large numbers with commas
        return parseInt(amount).toLocaleString();
    },

    format_image_url: (imageURL) => {
        if (typeof imageURL === 'undefined') {
            return '/images/default.png';
        } else if (imageURL.slice(0, 4) === 'http') {
            // coded to an external website 
            //  WARNING potential vulnerability
            return imageURL;
        } else {
            // assumme it's a reference to <public>/images/imageString
            return `/images/${imageURL}`;
        }
    }

};
