const formatUserCard = (user) => ({
    picture: user.picture.large,
    country: user.location.country,
    email: user.email,
    phone: user.phone,
    coordinates: `lat = ${user.location.coordinates.latitude} lon = ${user.location.coordinates.longitude}`
})
const fetchUsers = () => {
    return fetch(`https://randomuser.me/api?results=5`)
        .then((resp) => resp.json())
        .then(users => {
            return {
                meta: users.info,
                list: users.results.map(formatUserCard)
            }
        })
}
const renderUsers = (users) => {
    const resultNode = document.querySelector('.res')
    resultNode.innerHTML = ''
    users.forEach(user => {
        const card = document.createElement('div');
        card.classList = 'card';
        for (const [props, value] of Object.entries(user)) {
            let subItem = document.createElement('div');
            if (props === 'picture') {
                subItem.classList = `card__${props}`;
                const img = document.createElement('img');
                img.src = value;
                subItem.appendChild(img);
            } else {
                subItem.classList = `card__content`;
                subItem.innerText = value;
            }
            card.appendChild(subItem);
        }
        resultNode.appendChild(card);
    })
}
document
    .querySelector('.loadBtn button')
    .addEventListener('click', (e) => {
        e.target.disabled = true;
        fetchUsers().then(users => {
            e.target.disabled = false;
            renderUsers(users.list)
        })
    })