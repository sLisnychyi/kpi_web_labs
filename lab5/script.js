const toggleClass = (node, className) => {
    if (node.classList.contains(className)) {
        node.classList.remove(className);
        return;
    }

    node.classList.add(className);
};


document
    .getElementById("third")
    .addEventListener("click", (ev) => {
        toggleClass(ev.target, "color-green");
    });

document
    .querySelector("h2")
    .addEventListener("click", (ev) => {
        toggleClass(ev.target, 'color-yellow');
    });

// [END] ELEMENT CLICK


const listContainer = document.getElementById('image-list');
const zoomStep = 0.1;


const getZoomByStep = (zoomStep, transform) => {
    const params = transform
        .match("[\\d\\., ]+")[0]
        .split(", ");

    params[0] = parseFloat(params[0]) + zoomStep;
    params[3] = parseFloat(params[3]) + zoomStep;

    return `matrix(${params.join(", ")})`
};


document
    .getElementById("btn-add")
    .addEventListener("click", (e) => {
        const imgElem = document.createElement("img");
        imgElem.classList = "img-js-class";
        imgElem.src = "./amsterdam.jpeg";

        const imgContainer = document.createElement("div");
        imgContainer.classList = "image-container"

        imgContainer.appendChild(imgElem);
        listContainer.appendChild(imgContainer);

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });

document
    .getElementById("btn-delete")
    .addEventListener("click", () => {
        const lastImg = document.querySelector('.image-container:not(.js-no-delete):last-child')

        if (lastImg) {
            listContainer.removeChild(lastImg);
        }
    });

document
    .getElementById("btn-zoom-in")
    .addEventListener("click", () => {
        const allImg = listContainer.querySelectorAll('img');
        const lastImg = allImg[allImg.length - 1];
        const transform = lastImg.style.transform || "matrix(1, 0, 0, 1, 0, 0)";

        lastImg.style.transform = getZoomByStep(zoomStep, transform);
    });

document
    .getElementById("btn-zoom-out")
    .addEventListener("click", () => {
        const allImg = listContainer.querySelectorAll('img');
        const lastImg = allImg[allImg.length - 1];
        const transform = lastImg.style.transform || "matrix(1, 0, 0, 1, 0, 0)";

        lastImg.style.transform = getZoomByStep(-zoomStep, transform);
    });
