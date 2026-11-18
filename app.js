let menuData = [];

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Unable to load menu data');
        }
        return response.json();
    })
    .then(data => {
        menuData = data;
        displayResults(menuData);
    })
    .catch(error => {
        document.getElementById('resultsContainer').innerHTML =
            '<p>Unable to load menu data.</p>';
        console.error(error);
    });

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = menuData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerWithCase().includes(query)
    );
    displayResults(filtered);
});

function displayResults(items) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    items.forEach(item => {
        container.insertAdjacentHTML('beforeend', `
            <article class="card">
                <h3>${item.name} (${item.category})</h3>
                <p>${item.description}</p>
            </article>
        `);
    });
}
