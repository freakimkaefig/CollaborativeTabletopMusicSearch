for(var i = 0; i < 185; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetWidgetSelected('u183');
SetGlobalVariableValue('Filteroffen', '1');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u94', 'pd1u94','none','',500,'fade','',2500);

	SetPanelState('u101', 'pd1u101','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u94'] = function() {
var e = windowEvent;

if ((GetPanelState('u94')) == ('pd0u94')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u94', 'pd1u94','none','',500,'fade','',2500);

	SetPanelState('u101', 'pd1u101','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u94')) == ('pd1u94')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u94', 'pd2u94','none','',500,'fade','',2500);

	SetPanelState('u101', 'pd2u101','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u94')) == ('pd2u94')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u94', 'pd0u94','none','',500,'fade','',2500);

	SetPanelState('u101', 'pd0u101','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
document.getElementById('u115_img').tabIndex = 0;

u115.style.cursor = 'pointer';
$axure.eventManager.click('u115', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});
gv_vAlignTable['u122'] = 'center';gv_vAlignTable['u32'] = 'center';document.getElementById('u156_img').tabIndex = 0;

u156.style.cursor = 'pointer';
$axure.eventManager.click('u156', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u130'] = 'center';gv_vAlignTable['u79'] = 'top';gv_vAlignTable['u4'] = 'top';document.getElementById('u153_img').tabIndex = 0;

u153.style.cursor = 'pointer';
$axure.eventManager.click('u153', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u135'] = 'center';gv_vAlignTable['u151'] = 'center';gv_vAlignTable['u42'] = 'center';gv_vAlignTable['u159'] = 'center';gv_vAlignTable['u14'] = 'center';gv_vAlignTable['u48'] = 'top';gv_vAlignTable['u105'] = 'top';gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u52'] = 'top';gv_vAlignTable['u20'] = 'center';u67.tabIndex = 0;

u67.style.cursor = 'pointer';
$axure.eventManager.click('u67', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u67'] = 'top';u65.tabIndex = 0;

u65.style.cursor = 'pointer';
$axure.eventManager.click('u65', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u65'] = 'top';gv_vAlignTable['u120'] = 'center';gv_vAlignTable['u6'] = 'center';gv_vAlignTable['u108'] = 'top';u62.tabIndex = 0;

u62.style.cursor = 'pointer';
$axure.eventManager.click('u62', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u62'] = 'top';gv_vAlignTable['u141'] = 'center';gv_vAlignTable['u75'] = 'top';gv_vAlignTable['u133'] = 'center';gv_vAlignTable['u34'] = 'top';gv_vAlignTable['u89'] = 'center';gv_vAlignTable['u39'] = 'top';gv_vAlignTable['u47'] = 'top';gv_vAlignTable['u184'] = 'center';u72.tabIndex = 0;

u72.style.cursor = 'pointer';
$axure.eventManager.click('u72', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u72'] = 'top';gv_vAlignTable['u103'] = 'center';u66.tabIndex = 0;

u66.style.cursor = 'pointer';
$axure.eventManager.click('u66', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u66'] = 'top';gv_vAlignTable['u112'] = 'top';gv_vAlignTable['u44'] = 'center';gv_vAlignTable['u78'] = 'top';document.getElementById('u179_img').tabIndex = 0;

u179.style.cursor = 'pointer';
$axure.eventManager.click('u179', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
u57.tabIndex = 0;

u57.style.cursor = 'pointer';
$axure.eventManager.click('u57', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u57'] = 'top';gv_vAlignTable['u16'] = 'top';gv_vAlignTable['u149'] = 'center';gv_vAlignTable['u118'] = 'center';gv_vAlignTable['u38'] = 'center';document.getElementById('u176_img').tabIndex = 0;

u176.style.cursor = 'pointer';
$axure.eventManager.click('u176', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u26'] = 'center';document.getElementById('u174_img').tabIndex = 0;

u174.style.cursor = 'pointer';
$axure.eventManager.click('u174', function(e) {

if (true) {

}
});
gv_vAlignTable['u128'] = 'center';gv_vAlignTable['u85'] = 'center';gv_vAlignTable['u51'] = 'top';gv_vAlignTable['u182'] = 'center';gv_vAlignTable['u10'] = 'top';gv_vAlignTable['u100'] = 'center';gv_vAlignTable['u23'] = 'top';gv_vAlignTable['u82'] = 'center';gv_vAlignTable['u36'] = 'center';gv_vAlignTable['u30'] = 'center';u61.tabIndex = 0;

u61.style.cursor = 'pointer';
$axure.eventManager.click('u61', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u61'] = 'top';gv_vAlignTable['u116'] = 'center';u74.tabIndex = 0;

u74.style.cursor = 'pointer';
$axure.eventManager.click('u74', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u74'] = 'top';gv_vAlignTable['u33'] = 'top';gv_vAlignTable['u157'] = 'center';gv_vAlignTable['u46'] = 'center';gv_vAlignTable['u126'] = 'center';gv_vAlignTable['u98'] = 'center';gv_vAlignTable['u169'] = 'top';gv_vAlignTable['u56'] = 'center';document.getElementById('u150_img').tabIndex = 0;

u150.style.cursor = 'pointer';
$axure.eventManager.click('u150', function(e) {

if (true) {

SetWidgetSelected('u150');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u154'] = 'center';gv_vAlignTable['u40'] = 'top';gv_vAlignTable['u139'] = 'center';gv_vAlignTable['u87'] = 'center';gv_vAlignTable['u104'] = 'top';u155.tabIndex = 0;

u155.style.cursor = 'pointer';
$axure.eventManager.click('u155', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u155'] = 'top';gv_vAlignTable['u109'] = 'top';
$axure.eventManager.mouseover('u84', function(e) {
if (!IsTrueMouseOver('u84',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u84', function(e) {
if (!IsTrueMouseOut('u84',e)) return;
if (true) {

	SetPanelVisibility('u54','hidden','none',500);

	SendToBack("u54");

}
});
gv_vAlignTable['u50'] = 'center';u63.tabIndex = 0;

u63.style.cursor = 'pointer';
$axure.eventManager.click('u63', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u63'] = 'top';gv_vAlignTable['u76'] = 'top';gv_vAlignTable['u177'] = 'center';u60.tabIndex = 0;

u60.style.cursor = 'pointer';
$axure.eventManager.click('u60', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u60'] = 'top';gv_vAlignTable['u9'] = 'top';u73.tabIndex = 0;

u73.style.cursor = 'pointer';
$axure.eventManager.click('u73', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u73'] = 'top';gv_vAlignTable['u147'] = 'center';gv_vAlignTable['u163'] = 'top';gv_vAlignTable['u91'] = 'center';
u131.style.cursor = 'pointer';
$axure.eventManager.click('u131', function(e) {

if (true) {

SetWidgetFormText('u131', '');

}
});

$axure.eventManager.blur('u131', function(e) {

if (true) {

SetWidgetFormText('u131', 'Suchen...');

}
});
u64.tabIndex = 0;

u64.style.cursor = 'pointer';
$axure.eventManager.click('u64', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u64'] = 'top';gv_vAlignTable['u24'] = 'top';gv_vAlignTable['u113'] = 'top';document.getElementById('u132_img').tabIndex = 0;

u132.style.cursor = 'pointer';
$axure.eventManager.click('u132', function(e) {

if (true) {

SetWidgetFormText('u131', '');

}
});

$axure.eventManager.mouseout('u132', function(e) {
if (!IsTrueMouseOut('u132',e)) return;
if (true) {

SetWidgetFormText('u131', 'Suchen...');

}
});
gv_vAlignTable['u175'] = 'center';
$axure.eventManager.mouseover('u86', function(e) {
if (!IsTrueMouseOver('u86',e)) return;
if (true) {

	SetPanelVisibility('u54','','none',500);

	BringToFront("u54");

}
});
u58.tabIndex = 0;

u58.style.cursor = 'pointer';
$axure.eventManager.click('u58', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u58'] = 'top';document.getElementById('u183_img').tabIndex = 0;

u183.style.cursor = 'pointer';
$axure.eventManager.click('u183', function(e) {

if (true) {

SetWidgetSelected('u183');
    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u173'] = 'top';gv_vAlignTable['u111'] = 'center';gv_vAlignTable['u171'] = 'top';u178.tabIndex = 0;

u178.style.cursor = 'pointer';
$axure.eventManager.click('u178', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u152', 'pd1u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u152', 'pd0u152','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u178'] = 'top';gv_vAlignTable['u8'] = 'center';gv_vAlignTable['u3'] = 'top';gv_vAlignTable['u96'] = 'center';gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u124'] = 'center';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u93'] = 'center';gv_vAlignTable['u167'] = 'center';gv_vAlignTable['u145'] = 'center';gv_vAlignTable['u12'] = 'center';gv_vAlignTable['u165'] = 'top';u59.tabIndex = 0;

u59.style.cursor = 'pointer';
$axure.eventManager.click('u59', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u59'] = 'top';gv_vAlignTable['u137'] = 'center';gv_vAlignTable['u18'] = 'center';gv_vAlignTable['u161'] = 'top';gv_vAlignTable['u77'] = 'top';gv_vAlignTable['u22'] = 'center';gv_vAlignTable['u143'] = 'center';gv_vAlignTable['u107'] = 'center';gv_vAlignTable['u180'] = 'center';gv_vAlignTable['u28'] = 'top';