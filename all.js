var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', false);
xhr.send(null);
console.log(xhr.response)
console.log(JSON.parse(xhr.response))
const data = JSON.parse(xhr.response).result.records;



//下拉式選單行政區

// var noRepeatZone = data.map(function(item, index){
//     return item.Zone
// })

// console.log(allZone)
// var noRepeatZone = allZone.filter(function (item, index, arr) {
//     if (arr.indexOf(item) === index) {
//         return item;
//     }
// });

// console.log(noRepeatZone);
var noRepeatZone = []
for (let i = 0; i < data.length; i++) {
    noRepeatZone.push(data[i].Zone)
}
//[三民區,三民區,鳳山區]
var selectZone = []
for (let i = 0; i < noRepeatZone.length; i++) {
    if (noRepeatZone.indexOf(noRepeatZone[i]) === i) {
        selectZone.push(noRepeatZone[i])
    }
}
// console.log(selectZone)

//新增下拉式選單地區
for (var i = 0; i < selectZone.length; i++) {
    var el = document.createElement('option');
    el.textContent = selectZone[i];
    el.setAttribute = ('value', selectZone[i]);
    selArea.appendChild(el);
}

//click熱門地區

// var btns = document.querySelectorAll('.btn');
var btnHitArea = document.querySelector('.btnArea');


btnHitArea.addEventListener('click', function(e){
    if (e.target.nodeName === 'INPUT') {
        console.log(e.target.nodeName)
        getSelectZone(null, e.target.value);
    } else {
        return
    }
}, false);
// btns.forEach(function(btn){
//     btn.addEventListener('click',getSelectZone,false)
// })


//指定dom
var selectorArea = document.getElementById('selArea');

function getSelectZone(e, defualtZone) {
    var titleTop = document.querySelector('.titleTop')
    titleTop.textContent = e ? e.target.value : defualtZone;
    // if (e) {
    //     titleTop.textContent = e.target.value
    // } else {
    //     titleTop.textContent = defualtZone
    // }
    var str = '';
    for (var i = 0; i < data.length; i++) {
        if (data[i].Zone == titleTop.textContent) {
            // str += `li class="card"><div class="cardTop" style="background-image: url(' ${date[i].Picture1}')"><h1>`
            str += `
                <li class="card">
                    <div class="cardTop" style="background-image: url(${ data[i].Picture1})">
                        <h1>${data[i].Name}</h1>
                        <p>${data[i].Zone}</p>
                    </div>
                    <ul class="cardDown">
                        <li class="iconClock">${data[i].Opentime}</li>
                        <li class="iconAddress">${data[i].Add}</li>
                        <li class="iconPhone">${data[i].Tel}</li>
                        <li class="iconFree">${data[i].Ticketinfo}</li>
                    </ul>
                </li>`
            // str += '<li class="cardTop" style="background-image: url(' + data[i].Picture1 + ')"><h1>' + data[i].Name + '</h1><p>' + data[i].Zone + '</p></li><ul class="cardDown"><li class="iconClock">' + data[i].Opentime + '</li><li class="iconAddress">' + data[i].Add + '</li><li class="iconPhone">' + data[i].Tel + '</li><li class="iconFree">' + data[i].Ticketinfo + '</li></ul> </li >';

            document.querySelector('.cardList').innerHTML = str;
        }
    }
}

getSelectZone(null, '三民區');

//監聽事件
selectorArea.addEventListener('change', getSelectZone, false);

