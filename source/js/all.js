var xhr = new XMLHttpRequest();
var _data = [];
xhr.open('get', 'https://soweb.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery?startdate=&enddate=');
xhr.send(null);
xhr.onload = function () {
    _data = JSON.parse(xhr.responseText);
    selectDow()
}

let areaSelectId = document.getElementById('areaSelect');
let areabtnId = document.getElementById('areabtn');
let addId = document.getElementById('app');

areaSelectId.addEventListener('change', selectUpdataList);
areabtnId.addEventListener('click', btnUpdataList);

function selectUpdataList() {
    let selectValue = areaSelectId.value;
    upDataIndexList(selectValue);
}
function btnUpdataList(e) {
    let btnValue = e.target.value;
    upDataIndexList(btnValue);
}

function upDataIndexList(name) {
    let str = '';
    let GooglemapUrl = "https://www.google.com/maps/";
    let distance = '20z';
    _data.forEach(item => {
        if (item.ZipName_ == name) {
            switch (item.StatusName_) {
                case "待確認":
                    str += `<tr class="bg-warning"><td>${item.Save_Date_}</td><td>${item.ZipName_}</td><td>${item.UnitName_}</td><td>${item.address_}</td><td>${item.BeforeDesc_}</td><td><i class="fas fa-question-circle fa-2x"></i></td><td><a href="${GooglemapUrl + 'dir/' + item.Lat_ + ',' + item.Lng_ + '/@' + item.Lat_ + ',' + item.Lng_ + ',' + distance}" target="_blank"><i class="fas fa-map-marker-alt fa-2x"></i></a></td></li>`;
                    break;
                case "解除管制":
                    str += `<tr class="bg-gray"><td>${item.Save_Date_}</td><td>${item.ZipName_}</td><td>${item.UnitName_}</td><td>${item.address_}</td><td>${item.BeforeDesc_}</td><td>${item.StatusName_}</td><td><a href="${GooglemapUrl + 'dir/' + item.Lat_ + ',' + item.Lng_ + '/@' + item.Lat_ + ',' + item.Lng_ + ',' + distance}" target="_blank"><i class="fas fa-map-marker-alt fa-2x"></i></a></td></li>`;
                    break;
                case "處理完成":
                    str += `<tr class="bg-green"><td>${item.Save_Date_}</td><td>${item.ZipName_}</td><td>${item.UnitName_}</td><td>${item.address_}</td><td>${item.BeforeDesc_}</td><td><i class="fas fa-check-circle fa-2x"></i></td><td><a href="${GooglemapUrl + 'dir/' + item.Lat_ + ',' + item.Lng_ + '/@' + item.Lat_ + ',' + item.Lng_ + ',' + distance}" target="_blank"><i class="fas fa-map-marker-alt fa-2x"></i></a></td></li>`;
                    break;
            }
        }
    });
    addId.innerHTML = str;
}

function selectDow() {
    let areaList = [];
    _data.forEach(item => {
        areaList.push(item.ZipName_);
    });

    let areaNew = [];
    areaList.forEach(item => {
        if (areaNew.indexOf(item) == -1) {
            areaNew.push(item);
        }
    });

    let str = '';
    areaNew.forEach(item => {
        str += `<option value="${item}">${item}</option>`;
    });
    areaSelectId.innerHTML = str;

    let btnStr = '';
    areaNew.forEach((item, index) => {
        if (index < 4) {
            btnStr += `<input type="button" class="btn btn-${index}" value="${item}">`;
        }
    })
    areabtnId.innerHTML = btnStr;

}

