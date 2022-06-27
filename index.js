const ul = document.querySelector('#companies');
const list = document.createDocumentFragment();
const url = 'https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json';
const companyData = [];

function fetchData(){
    fetch(url)
    .then((responce) => responce.json())
    .then(data => {
        data.forEach((el) => {
            companyData.push(...data)
        })
    })
    .catch(err => console.log(err))
}

window.onload = (e) => {
    fetchData();
}

function displayList(data){
    ul.addEventListener('click', (e) => {
        let ul = e.target;
        let findCompany = data.find((el) => el.name == e.target.innerText)
        if(findCompany){
            const numberOfBoxes = document.querySelector('#numberOfBoxes')
            const company = document.querySelector('#companyName');
            const contact = document.querySelector('#email');
            const name = document.createTextNode(findCompany.name);
            const boxes = document.createTextNode(findCompany.boxes);
            const email = document.createTextNode(findCompany.email);
            numberOfBoxes.innerHTML = '';
            company.innerHTML = '';
            contact.innerHTML = '';
            company.appendChild(name);
            numberOfBoxes.appendChild(boxes);
            contact.appendChild(email)
            
        }
        const getBoxes = findCompany.boxes
            .split(",")
            .map((el) => {return Number(el)})
            .reduce((acc, el) => acc + el);
            const countBoxes = (Math.ceil(getBoxes/10));
            document.getElementById('cargoBaysCount').innerHTML = countBoxes;            
    } 
    )
}

displayList(companyData);

