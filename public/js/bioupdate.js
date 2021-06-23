const bioFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('I am finding me!!');

    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const organisation = document.querySelector('#organisation').value;
    const text = document.querySelector('#bio').value;

    console.log(text);
    console.log(first_name);
    const response = await fetch(`/bio/edit`, {
        method: 'PUT',
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            organisation,
            text,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update bio');
    }
};

document.querySelector('#bio-form').addEventListener('submit', bioFormHandler);
