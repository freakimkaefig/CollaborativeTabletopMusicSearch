for(var i = 0; i < 206; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetWidgetSelected('u7');
SetGlobalVariableValue('Filteroffen', '1');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u121', 'pd1u121','none','',500,'fade','',2500);

	SetPanelState('u128', 'pd1u128','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u121'] = function() {
var e = windowEvent;

if ((GetPanelState('u121')) == ('pd0u121')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u121', 'pd1u121','none','',500,'fade','',2500);

	SetPanelState('u128', 'pd1u128','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u121')) == ('pd1u121')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u121', 'pd2u121','none','',500,'fade','',2500);

	SetPanelState('u128', 'pd2u128','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u121')) == ('pd2u121')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u121', 'pd0u121','none','',500,'fade','',2500);

	SetPanelState('u128', 'pd0u128','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
gv_vAlignTable['u21'] = 'center';gv_vAlignTable['u132'] = 'top';gv_vAlignTable['u32'] = 'top';gv_vAlignTable['u130'] = 'center';document.getElementById('u7_img').tabIndex = 0;

u7.style.cursor = 'pointer';
$axure.eventManager.click('u7', function(e) {

if (true) {

SetWidgetSelected('u7');
    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u79'] = 'top';gv_vAlignTable['u153'] = 'center';gv_vAlignTable['u140'] = 'top';gv_vAlignTable['u17'] = 'center';gv_vAlignTable['u135'] = 'top';gv_vAlignTable['u151'] = 'center';gv_vAlignTable['u42'] = 'top';document.getElementById('u159_img').tabIndex = 0;

u159.style.cursor = 'pointer';
$axure.eventManager.click('u159', function(e) {

if (true) {

SetWidgetFormText('u158', '');

}
});

$axure.eventManager.mouseout('u159', function(e) {
if (!IsTrueMouseOut('u159',e)) return;
if (true) {

SetWidgetFormText('u158', 'Suchen...');

}
});
gv_vAlignTable['u55'] = 'top';u101.tabIndex = 0;

u101.style.cursor = 'pointer';
$axure.eventManager.click('u101', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u101'] = 'top';gv_vAlignTable['u186'] = 'top';gv_vAlignTable['u48'] = 'top';gv_vAlignTable['u105'] = 'top';gv_vAlignTable['u27'] = 'center';gv_vAlignTable['u138'] = 'center';gv_vAlignTable['u67'] = 'top';gv_vAlignTable['u65'] = 'center';gv_vAlignTable['u120'] = 'center';gv_vAlignTable['u205'] = 'center';gv_vAlignTable['u37'] = 'top';gv_vAlignTable['u11'] = 'top';gv_vAlignTable['u75'] = 'top';gv_vAlignTable['u200'] = 'center';u89.tabIndex = 0;

u89.style.cursor = 'pointer';
$axure.eventManager.click('u89', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u89'] = 'top';gv_vAlignTable['u39'] = 'center';gv_vAlignTable['u47'] = 'center';gv_vAlignTable['u184'] = 'top';gv_vAlignTable['u103'] = 'top';gv_vAlignTable['u164'] = 'center';u99.tabIndex = 0;

u99.style.cursor = 'pointer';
$axure.eventManager.click('u99', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u99'] = 'top';gv_vAlignTable['u66'] = 'top';gv_vAlignTable['u112'] = 'center';gv_vAlignTable['u78'] = 'top';document.getElementById('u179_img').tabIndex = 0;

u179.style.cursor = 'pointer';
$axure.eventManager.click('u179', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u57'] = 'center';u203.tabIndex = 0;

u203.style.cursor = 'pointer';
$axure.eventManager.click('u203', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u203'] = 'top';gv_vAlignTable['u125'] = 'center';gv_vAlignTable['u41'] = 'center';gv_vAlignTable['u172'] = 'center';gv_vAlignTable['u149'] = 'center';gv_vAlignTable['u54'] = 'top';gv_vAlignTable['u118'] = 'center';u88.tabIndex = 0;

u88.style.cursor = 'pointer';
$axure.eventManager.click('u88', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u88'] = 'top';document.getElementById('u176_img').tabIndex = 0;

u176.style.cursor = 'pointer';
$axure.eventManager.click('u176', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u174'] = 'center';u85.tabIndex = 0;

u85.style.cursor = 'pointer';
$axure.eventManager.click('u85', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u85'] = 'top';gv_vAlignTable['u51'] = 'center';gv_vAlignTable['u182'] = 'center';gv_vAlignTable['u10'] = 'center';u100.tabIndex = 0;

u100.style.cursor = 'pointer';
$axure.eventManager.click('u100', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u100'] = 'top';gv_vAlignTable['u23'] = 'center';gv_vAlignTable['u202'] = 'center';gv_vAlignTable['u166'] = 'center';gv_vAlignTable['u36'] = 'top';gv_vAlignTable['u61'] = 'top';gv_vAlignTable['u116'] = 'center';
u158.style.cursor = 'pointer';
$axure.eventManager.click('u158', function(e) {

if (true) {

SetWidgetFormText('u158', '');

}
});

$axure.eventManager.blur('u158', function(e) {

if (true) {

SetWidgetFormText('u158', 'Suchen...');

}
});
gv_vAlignTable['u74'] = 'top';gv_vAlignTable['u123'] = 'center';gv_vAlignTable['u114'] = 'center';gv_vAlignTable['u33'] = 'top';gv_vAlignTable['u160'] = 'center';gv_vAlignTable['u157'] = 'center';u92.tabIndex = 0;

u92.style.cursor = 'pointer';
$axure.eventManager.click('u92', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u92'] = 'top';gv_vAlignTable['u71'] = 'center';gv_vAlignTable['u198'] = 'top';gv_vAlignTable['u5'] = 'center';gv_vAlignTable['u127'] = 'center';gv_vAlignTable['u43'] = 'top';document.getElementById('u142_img').tabIndex = 0;

u142.style.cursor = 'pointer';
$axure.eventManager.click('u142', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});
gv_vAlignTable['u106'] = 'top';gv_vAlignTable['u168'] = 'center';gv_vAlignTable['u139'] = 'top';u87.tabIndex = 0;

u87.style.cursor = 'pointer';
$axure.eventManager.click('u87', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u87'] = 'top';gv_vAlignTable['u53'] = 'center';gv_vAlignTable['u104'] = 'top';gv_vAlignTable['u192'] = 'center';gv_vAlignTable['u19'] = 'top';gv_vAlignTable['u155'] = 'center';gv_vAlignTable['u109'] = 'center';u84.tabIndex = 0;

u84.style.cursor = 'pointer';
$axure.eventManager.click('u84', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u84'] = 'top';gv_vAlignTable['u63'] = 'center';gv_vAlignTable['u170'] = 'center';gv_vAlignTable['u134'] = 'center';gv_vAlignTable['u177'] = 'center';u94.tabIndex = 0;

u94.style.cursor = 'pointer';
$axure.eventManager.click('u94', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u94'] = 'top';gv_vAlignTable['u60'] = 'top';gv_vAlignTable['u190'] = 'top';gv_vAlignTable['u102'] = 'top';document.getElementById('u9_img').tabIndex = 0;

u9.style.cursor = 'pointer';
$axure.eventManager.click('u9', function(e) {

if (true) {

SetWidgetSelected('u9');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u73'] = 'center';gv_vAlignTable['u69'] = 'center';gv_vAlignTable['u147'] = 'center';u91.tabIndex = 0;

u91.style.cursor = 'pointer';
$axure.eventManager.click('u91', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u91'] = 'top';gv_vAlignTable['u131'] = 'top';gv_vAlignTable['u24'] = 'top';gv_vAlignTable['u188'] = 'top';gv_vAlignTable['u162'] = 'center';document.getElementById('u204_img').tabIndex = 0;

u204.style.cursor = 'pointer';
$axure.eventManager.click('u204', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u13'] = 'top';
$axure.eventManager.mouseover('u113', function(e) {
if (!IsTrueMouseOver('u113',e)) return;
if (true) {

	SetPanelVisibility('u81','','none',500);

	BringToFront("u81");

}
});
gv_vAlignTable['u29'] = 'center';u86.tabIndex = 0;

u86.style.cursor = 'pointer';
$axure.eventManager.click('u86', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u86'] = 'top';
$axure.eventManager.mouseover('u111', function(e) {
if (!IsTrueMouseOver('u111',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u111', function(e) {
if (!IsTrueMouseOut('u111',e)) return;
if (true) {

	SetPanelVisibility('u81','hidden','none',500);

	SendToBack("u81");

}
});
gv_vAlignTable['u31'] = 'center';gv_vAlignTable['u83'] = 'center';u178.tabIndex = 0;

u178.style.cursor = 'pointer';
$axure.eventManager.click('u178', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u178'] = 'top';gv_vAlignTable['u8'] = 'center';gv_vAlignTable['u3'] = 'center';gv_vAlignTable['u196'] = 'top';gv_vAlignTable['u15'] = 'center';gv_vAlignTable['u49'] = 'top';gv_vAlignTable['u1'] = 'center';u93.tabIndex = 0;

u93.style.cursor = 'pointer';
$axure.eventManager.click('u93', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u93'] = 'top';gv_vAlignTable['u145'] = 'center';gv_vAlignTable['u12'] = 'top';document.getElementById('u201_img').tabIndex = 0;

u201.style.cursor = 'pointer';
$axure.eventManager.click('u201', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u175', 'pd1u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u175', 'pd0u175','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
document.getElementById('u199_img').tabIndex = 0;

u199.style.cursor = 'pointer';
$axure.eventManager.click('u199', function(e) {

if (((GetCheckState('u189')) == (true)) && ((GetCheckState('u193')) == (true))) {

SetWidgetSelected('u7');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_gefiltert.html');

}
else
if (((GetCheckState('u185')) == (true)) && (((GetCheckState('u183')) == (false)) && ((GetCheckState('u187')) == (false)))) {

SetWidgetSelected('u7');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_gefiltert_2.html');

}
});
gv_vAlignTable['u25'] = 'top';gv_vAlignTable['u59'] = 'center';u90.tabIndex = 0;

u90.style.cursor = 'pointer';
$axure.eventManager.click('u90', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u90'] = 'top';gv_vAlignTable['u18'] = 'top';gv_vAlignTable['u45'] = 'center';gv_vAlignTable['u77'] = 'center';gv_vAlignTable['u143'] = 'center';gv_vAlignTable['u35'] = 'center';gv_vAlignTable['u136'] = 'top';gv_vAlignTable['u180'] = 'center';gv_vAlignTable['u194'] = 'top';