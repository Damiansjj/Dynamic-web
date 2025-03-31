const dashboard = document.getElementById('dashboard');
const currentWidthElement = document.getElementById('current-width');
const columnCountElement = document.getElementById('column-count');

const adjustLayout = () => {
    const containerWidth = document.getElementById('container').offsetWidth;
    currentWidthElement.textContent = containerWidth;

    let columns = 3; 

    if (containerWidth < 600) {
        columns = 1; 
    } else if (containerWidth < 900) {
        columns = 2;
    }

    dashboard.setAttribute('data-columns', columns);
    columnCountElement.textContent = columns;
};

const resizeObserver = new ResizeObserver(adjustLayout);
resizeObserver.observe(document.getElementById('container'));

adjustLayout();
