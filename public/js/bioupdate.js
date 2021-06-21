const bioFormHandler = async (event) => {
    event.preventDefault();

    console.log('I am finding me!!');

    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const organisation = document.querySelector('#organisation').value;
    const text = document.querySelector('#bio').value;

    console.log(document.querySelector('#userId').value);

    const response = await fetch(`/bio/edit`, {
        method: 'PUT',
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            organisation: organisation,
            text: text,
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
