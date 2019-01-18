"use strict";

var xhr = new XMLHttpRequest();
var _data = [];
xhr.open('get', 'https://soweb.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery?startdate=&enddate=');
xhr.send(null);

xhr.onload = function () {
  _data = JSON.parse(xhr.responseText);
  selectDow();
};

var areaSelectId = document.getElementById('areaSelect');
var areabtnId = document.getElementById('areabtn');
var addId = document.getElementById('app');
areaSelectId.addEventListener('change', selectUpdataList);
areabtnId.addEventListener('click', btnUpdataList);

function selectUpdataList() {
  var selectValue = areaSelectId.value;
  upDataIndexList(selectValue);
}

function btnUpdataList(e) {
  var btnValue = e.target.value;
  upDataIndexList(btnValue);
}

function upDataIndexList(name) {
  var str = '';
  var GooglemapUrl = "https://www.google.com/maps/@";
  var distance = '20z';

  _data.forEach(function (item) {
    if (item.ZipName_ == name) {
      switch (item.StatusName_) {
        case "待確認":
          str += "<tr class=\"bg-warning\"><td>".concat(item.Save_Date_, "</td><td>").concat(item.ZipName_, "</td><td>").concat(item.UnitName_, "</td><td>").concat(item.address_, "</td><td>").concat(item.BeforeDesc_, "</td><td><i class=\"fas fa-question-circle fa-2x\"></i></td><td><a href=\"").concat(GooglemapUrl + item.Lat_ + ',' + item.Lng_ + ',' + distance, "\" target=\"_blank\"><i class=\"fas fa-map-marker-alt fa-2x\"></i></a></td></li>");
          break;

        case "解除管制":
          str += "<tr class=\"bg-gray\"><td>".concat(item.Save_Date_, "</td><td>").concat(item.ZipName_, "</td><td>").concat(item.UnitName_, "</td><td>").concat(item.address_, "</td><td>").concat(item.BeforeDesc_, "</td><td>").concat(item.StatusName_, "</td><td><a href=\"").concat(GooglemapUrl + item.Lat_ + ',' + item.Lng_ + ',' + distance, "\" target=\"_blank\"><i class=\"fas fa-map-marker-alt fa-2x\"></i></a></td></li>");
          break;

        case "處理完成":
          str += "<tr class=\"bg-green\"><td>".concat(item.Save_Date_, "</td><td>").concat(item.ZipName_, "</td><td>").concat(item.UnitName_, "</td><td>").concat(item.address_, "</td><td>").concat(item.BeforeDesc_, "</td><td><i class=\"fas fa-check-circle fa-2x\"></i></td><td><a href=\"").concat(GooglemapUrl + item.Lat_ + ',' + item.Lng_ + ',' + distance, "\" target=\"_blank\"><i class=\"fas fa-map-marker-alt fa-2x\"></i></a></td></li>");
          break;
      }
    }
  });

  addId.innerHTML = str;
}

function selectDow() {
  var areaList = [];

  _data.forEach(function (item) {
    areaList.push(item.ZipName_);
  });

  console.log(areaList);
  var areaNew = [];
  areaList.forEach(function (item) {
    if (areaNew.indexOf(item) == -1) {
      areaNew.push(item);
    }
  });
  console.log(areaNew);
  var str = '';
  areaNew.forEach(function (item) {
    str += "<option value=\"".concat(item, "\">").concat(item, "</option>");
  });
  areaSelectId.innerHTML = str;
  var btnStr = '';
  areaNew.forEach(function (item, index) {
    if (index < 4) {
      btnStr += "<input type=\"button\" class=\"btn btn-".concat(index, "\" value=\"").concat(item, "\">");
    }
  });
  areabtnId.innerHTML = btnStr;
}
//# sourceMappingURL=all.js.map
