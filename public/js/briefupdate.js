const briefFormHandler = async(event) => {
    event.preventDefault();

    console.log("I am finding me!!")

    const title = document.querySelector('#title').value;
    const shortSummary = document.querySelector('#shortSummary').value;
    const summary = document.querySelector('#summary').value;
    const content = document.querySelector('#content').value;

    const briefId = document.querySelector('#id').value

    console.log(briefId)

    if(briefId){
        const response = await fetch(`/brief/${briefId}/edit`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, shortSummary, summary, content }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update brief');
        }
    } else {
        const response = await fetch(`/brief/edit`, {
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

    
}

document
  .querySelector('#brief-form')
  .addEventListener('submit', briefFormHandler);