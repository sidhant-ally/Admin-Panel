$(document).ready(loadData)

var data = []
var seletedId = -1;

function loadData() {
    $("#table-section > form").submit(function (e) {
        return false;
    });
    $("#search-box").on("input", search)
    $("tbody").empty()

    var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

    fetch(url)
        .then(res => res.json())
        .then(fetchedData => {
            data = fetchedData
            updateData(data)
        })
}

function search(e) {
    const query = e.target.value.toLowerCase()
    const filteredData = data.filter(ele => ele.firstName.toLowerCase().includes(query))
    updateData(filteredData)
}

function updateData(data) {
    var table = $("tbody")
    table.empty()
    data.forEach(ele => {
        var myDiv = document.createElement("tr");
        myDiv.className = ele.id == seletedId ? "data-row active" : "data-row";
        myDiv.id = ele.id;
        myDiv.onclick = () => changeDetails(ele)
        myDiv.innerHTML = `<td class="column1">${ele.id}</td>` +
            `<td class="column2">${ele.firstName}</td>` +
            `<td class="column3">${ele.lastName}</td>` +
            `<td class="column4">${ele.email}</td>` +
            `<td class="column5">${ele.phone}</td>`
        table.append(myDiv)
    });
}

function changeDetails(ele) {
    seletedId = ele.id
    $(`#${ele.id}`).addClass('active').siblings().removeClass('active')
    $("#info-content").show();
    $("#info-content > div:nth-child(1)").html(`<b>User selected:</b> ${ele.firstName} ${ele.lastName}`)
    $("#info-content > div:nth-child(2) > textarea").html(ele.description)
    $("#info-content > div:nth-child(3)").html(`<b>Address:</b> ${ele.address.streetAddress}`)
    $("#info-content > div:nth-child(4)").html(`<b>City:</b> ${ele.address.city}`)
    $("#info-content > div:nth-child(5)").html(`<b>State:</b> ${ele.address.state}`)
    $("#info-content > div:nth-child(6)").html(`<b>Zip:</b> ${ele.address.zip}`)
}