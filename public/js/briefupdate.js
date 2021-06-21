const briefFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const title = document.querySelector('#title').value;
    const shortSummary = document.querySelector('#shortSummary').value;
    const summary = document.querySelector('#summary').value;
    const content = document.querySelector('#content').value;
    const briefId = document.querySelector('#briefId').value;
    const briefType = document.querySelector('#briefType').value;

    console.log(briefId);
    console.log(briefType);

    if (briefType == 'edit') {
        try {
            const response = fetch(`/brief/${briefId}/edit`, {
                method: 'PUT',
                body: JSON.stringify({ briefId, title, shortSummary, summary, content }),
                headers: { 'Content-Type': 'application/json' },
            });
            document.location.replace('/dashboard');
        } catch (err) {
            console.log(err);
        }
    } else {
        const response = await fetch(`/brief/new`, {
            method: 'POST',
            body: JSON.stringify({ title, shortSummary, summary, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new brief');
        }
    }
};

document.querySelector('#brief-form').addEventListener('submit', briefFormHandler);
