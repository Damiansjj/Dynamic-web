const zoektermInput = document.getElementById('zoekterm');
const sorteerSelect = document.getElementById('sorteer');
const limietSelect = document.getElementById('limiet');
const toepassenButton = document.getElementById('toepassen');
const postsContainer = document.getElementById('posts-container');

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } catch (error) {
        console.error('Fout bij het ophalen van posts:', error);
        return [];
    }
}

function filterAndSortPosts(posts) {
    const zoekterm = zoektermInput.value.toLowerCase();
    const gefilterdePosts = posts.filter(post =>
        post.title.toLowerCase().includes(zoekterm)
    );

    const sorteermethode = sorteerSelect.value;
    const gesorteerdePosts = gefilterdePosts.sort((a, b) => {
        if (sorteermethode === 'titel-oplopend') {
            return a.title.localeCompare(b.title);
        } else if (sorteermethode === 'titel-aflopend') {
            return b.title.localeCompare(a.title);
        } else if (sorteermethode === 'id-oplopend') {
            return a.id - b.id;
        } else if (sorteermethode === 'id-aflopend') {
            return b.id - a.id;
        }
        return 0;
    });

    const limiet = parseInt(limietSelect.value, 10);
    return gesorteerdePosts.slice(0, limiet);
}

function displayPosts(posts) {
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="geen-resultaten">Geen posts gevonden.</div>';
    } else {
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const titel = document.createElement('div');
            titel.classList.add('post-titel');
            titel.textContent = post.title.toUpperCase();

            const body = document.createElement('div');
            body.classList.add('post-body');
            body.textContent = post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body;

            const postInfo = document.createElement('div');
            postInfo.classList.add('post-info');
            postInfo.innerHTML = `Post ID: ${post.id} | Gebruiker ID: ${post.userId}`;

            postElement.appendChild(titel);
            postElement.appendChild(body);
            postElement.appendChild(postInfo);

            postsContainer.appendChild(postElement);
        });
    }
}

async function handleFilterAndSort() {
    postsContainer.innerHTML = '<div class="laad-indicator">Posts laden...</div>';
    const posts = await fetchPosts();
    const filteredAndSortedPosts = filterAndSortPosts(posts);
    displayPosts(filteredAndSortedPosts);
}

toepassenButton.addEventListener('click', handleFilterAndSort);

handleFilterAndSort();
