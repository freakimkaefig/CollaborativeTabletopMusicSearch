for(var i = 0; i < 105; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if ((GetGlobalVariableValue('jump2geschichte')) == ('1')) {

	ScrollToWidget('u104', false,true,'none',500);

SetGlobalVariableValue('jump2geschichte', '0');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u48', 'pd1u48','none','',500,'fade','',2500);

	SetPanelState('u55', 'pd1u55','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u48'] = function() {
var e = windowEvent;

if ((GetPanelState('u48')) == ('pd0u48')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u48', 'pd1u48','none','',500,'fade','',2500);

	SetPanelState('u55', 'pd1u55','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u48')) == ('pd1u48')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u48', 'pd2u48','none','',500,'fade','',2500);

	SetPanelState('u55', 'pd2u55','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u48')) == ('pd2u48')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u48', 'pd0u48','none','',500,'fade','',2500);

	SetPanelState('u55', 'pd0u55','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
u21.tabIndex = 0;

u21.style.cursor = 'pointer';
$axure.eventManager.click('u21', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u21'] = 'top';u7.tabIndex = 0;

u7.style.cursor = 'pointer';
$axure.eventManager.click('u7', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u7'] = 'top';gv_vAlignTable['u102'] = 'top';u25.tabIndex = 0;

u25.style.cursor = 'pointer';
$axure.eventManager.click('u25', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u25'] = 'top';u16.tabIndex = 0;

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u16'] = 'top';gv_vAlignTable['u76'] = 'center';u31.tabIndex = 0;

u31.style.cursor = 'pointer';
$axure.eventManager.click('u31', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u31'] = 'top';gv_vAlignTable['u93'] = 'center';u32.tabIndex = 0;

u32.style.cursor = 'pointer';
$axure.eventManager.click('u32', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u32'] = 'top';u23.tabIndex = 0;

u23.style.cursor = 'pointer';
$axure.eventManager.click('u23', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u23'] = 'top';gv_vAlignTable['u62'] = 'top';gv_vAlignTable['u87'] = 'center';u30.tabIndex = 0;

u30.style.cursor = 'pointer';
$axure.eventManager.click('u30', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u30'] = 'top';gv_vAlignTable['u89'] = 'center';gv_vAlignTable['u34'] = 'top';u17.tabIndex = 0;

u17.style.cursor = 'pointer';
$axure.eventManager.click('u17', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u17'] = 'top';u19.tabIndex = 0;

u19.style.cursor = 'pointer';
$axure.eventManager.click('u19', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u19'] = 'top';gv_vAlignTable['u58'] = 'top';gv_vAlignTable['u103'] = 'top';gv_vAlignTable['u1'] = 'top';gv_vAlignTable['u97'] = 'center';
u85.style.cursor = 'pointer';
$axure.eventManager.click('u85', function(e) {

if (true) {

SetWidgetFormText('u85', '');

}
});

$axure.eventManager.blur('u85', function(e) {

if (true) {

SetWidgetFormText('u85', 'Suchen...');

}
});
u15.tabIndex = 0;

u15.style.cursor = 'pointer';
$axure.eventManager.click('u15', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u45'] = 'center';gv_vAlignTable['u36'] = 'top';gv_vAlignTable['u66'] = 'top';gv_vAlignTable['u37'] = 'top';gv_vAlignTable['u2'] = 'top';gv_vAlignTable['u95'] = 'center';u22.tabIndex = 0;

u22.style.cursor = 'pointer';
$axure.eventManager.click('u22', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u22'] = 'top';gv_vAlignTable['u52'] = 'center';gv_vAlignTable['u43'] = 'center';gv_vAlignTable['u3'] = 'top';gv_vAlignTable['u47'] = 'center';document.getElementById('u86_img').tabIndex = 0;

u86.style.cursor = 'pointer';
$axure.eventManager.click('u86', function(e) {

if (true) {

SetWidgetFormText('u85', '');

}
});

$axure.eventManager.mouseout('u86', function(e) {
if (!IsTrueMouseOut('u86',e)) return;
if (true) {

SetWidgetFormText('u85', 'Suchen...');

}
});
gv_vAlignTable['u84'] = 'center';u20.tabIndex = 0;

u20.style.cursor = 'pointer';
$axure.eventManager.click('u20', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u20'] = 'top';gv_vAlignTable['u50'] = 'center';u24.tabIndex = 0;

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u24'] = 'top';gv_vAlignTable['u54'] = 'center';gv_vAlignTable['u99'] = 'center';document.getElementById('u69_img').tabIndex = 0;

u69.style.cursor = 'pointer';
$axure.eventManager.click('u69', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});
gv_vAlignTable['u78'] = 'center';gv_vAlignTable['u6'] = 'top';gv_vAlignTable['u61'] = 'center';gv_vAlignTable['u91'] = 'center';gv_vAlignTable['u35'] = 'top';gv_vAlignTable['u65'] = 'center';gv_vAlignTable['u82'] = 'center';gv_vAlignTable['u5'] = 'center';gv_vAlignTable['u9'] = 'center';
$axure.eventManager.mouseover('u42', function(e) {
if (!IsTrueMouseOver('u42',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u42', function(e) {
if (!IsTrueMouseOut('u42',e)) return;
if (true) {

	SetPanelVisibility('u12','hidden','none',500);

	SendToBack("u12");

}
});
gv_vAlignTable['u33'] = 'top';gv_vAlignTable['u72'] = 'center';gv_vAlignTable['u63'] = 'top';u18.tabIndex = 0;

u18.style.cursor = 'pointer';
$axure.eventManager.click('u18', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u18'] = 'top';gv_vAlignTable['u67'] = 'top';gv_vAlignTable['u57'] = 'center';gv_vAlignTable['u101'] = 'center';gv_vAlignTable['u10'] = 'top';gv_vAlignTable['u40'] = 'center';gv_vAlignTable['u70'] = 'center';gv_vAlignTable['u14'] = 'center';
$axure.eventManager.mouseover('u44', function(e) {
if (!IsTrueMouseOver('u44',e)) return;
if (true) {

	SetPanelVisibility('u12','','none',500);

	BringToFront("u12");

}
});
gv_vAlignTable['u74'] = 'center';gv_vAlignTable['u59'] = 'top';gv_vAlignTable['u80'] = 'center';