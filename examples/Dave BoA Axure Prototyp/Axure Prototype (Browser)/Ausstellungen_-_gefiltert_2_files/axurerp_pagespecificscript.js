for(var i = 0; i < 156; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetWidgetSelected('u101');
SetGlobalVariableValue('Filteroffen', '1');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u45', 'pd1u45','none','',500,'fade','',2500);

	SetPanelState('u52', 'pd1u52','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u45'] = function() {
var e = windowEvent;

if ((GetPanelState('u45')) == ('pd0u45')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u45', 'pd1u45','none','',500,'fade','',2500);

	SetPanelState('u52', 'pd1u52','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u45')) == ('pd1u45')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u45', 'pd2u45','none','',500,'fade','',2500);

	SetPanelState('u52', 'pd2u52','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u45')) == ('pd2u45')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u45', 'pd0u45','none','',500,'fade','',2500);

	SetPanelState('u52', 'pd0u52','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
gv_vAlignTable['u122'] = 'top';gv_vAlignTable['u130'] = 'center';gv_vAlignTable['u7'] = 'center';gv_vAlignTable['u153'] = 'center';u17.tabIndex = 0;

u17.style.cursor = 'pointer';
$axure.eventManager.click('u17', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u17'] = 'top';gv_vAlignTable['u135'] = 'center';gv_vAlignTable['u151'] = 'center';gv_vAlignTable['u42'] = 'center';gv_vAlignTable['u55'] = 'top';document.getElementById('u101_img').tabIndex = 0;

u101.style.cursor = 'pointer';
$axure.eventManager.click('u101', function(e) {

if (true) {

SetWidgetSelected('u101');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
u14.tabIndex = 0;

u14.style.cursor = 'pointer';
$axure.eventManager.click('u14', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u14'] = 'top';gv_vAlignTable['u105'] = 'center';gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u67'] = 'center';gv_vAlignTable['u120'] = 'center';gv_vAlignTable['u110'] = 'center';gv_vAlignTable['u58'] = 'center';gv_vAlignTable['u108'] = 'center';
$axure.eventManager.mouseover('u37', function(e) {
if (!IsTrueMouseOver('u37',e)) return;
if (true) {

	SetPanelVisibility('u5','','none',500);

	BringToFront("u5");

}
});
gv_vAlignTable['u62'] = 'center';gv_vAlignTable['u141'] = 'center';u11.tabIndex = 0;

u11.style.cursor = 'pointer';
$axure.eventManager.click('u11', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u11'] = 'top';gv_vAlignTable['u75'] = 'center';gv_vAlignTable['u133'] = 'center';gv_vAlignTable['u47'] = 'center';document.getElementById('u66_img').tabIndex = 0;

u66.style.cursor = 'pointer';
$axure.eventManager.click('u66', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});
gv_vAlignTable['u112'] = 'top';gv_vAlignTable['u44'] = 'center';u16.tabIndex = 0;

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u16'] = 'top';gv_vAlignTable['u149'] = 'top';gv_vAlignTable['u54'] = 'center';gv_vAlignTable['u118'] = 'top';gv_vAlignTable['u88'] = 'center';gv_vAlignTable['u38'] = 'center';gv_vAlignTable['u26'] = 'top';gv_vAlignTable['u128'] = 'center';gv_vAlignTable['u51'] = 'center';u10.tabIndex = 0;

u10.style.cursor = 'pointer';
$axure.eventManager.click('u10', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u10'] = 'top';gv_vAlignTable['u100'] = 'center';
u82.style.cursor = 'pointer';
$axure.eventManager.click('u82', function(e) {

if (true) {

SetWidgetFormText('u82', '');

}
});

$axure.eventManager.blur('u82', function(e) {

if (true) {

SetWidgetFormText('u82', 'Suchen...');

}
});
gv_vAlignTable['u36'] = 'center';gv_vAlignTable['u30'] = 'top';gv_vAlignTable['u116'] = 'top';gv_vAlignTable['u114'] = 'top';gv_vAlignTable['u33'] = 'center';gv_vAlignTable['u92'] = 'center';gv_vAlignTable['u126'] = 'top';gv_vAlignTable['u71'] = 'center';gv_vAlignTable['u98'] = 'center';gv_vAlignTable['u79'] = 'center';document.getElementById('u127_img').tabIndex = 0;

u127.style.cursor = 'pointer';
$axure.eventManager.click('u127', function(e) {

if (((GetCheckState('u117')) == (true)) && ((GetCheckState('u121')) == (true))) {

SetWidgetSelected('u101');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_gefiltert.html');

}
});
gv_vAlignTable['u56'] = 'top';gv_vAlignTable['u142'] = 'top';u106.tabIndex = 0;

u106.style.cursor = 'pointer';
$axure.eventManager.click('u106', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u106'] = 'top';gv_vAlignTable['u154'] = 'top';gv_vAlignTable['u40'] = 'center';gv_vAlignTable['u139'] = 'center';document.getElementById('u104_img').tabIndex = 0;

u104.style.cursor = 'pointer';
$axure.eventManager.click('u104', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u155'] = 'top';gv_vAlignTable['u84'] = 'center';gv_vAlignTable['u63'] = 'top';gv_vAlignTable['u81'] = 'center';gv_vAlignTable['u94'] = 'center';gv_vAlignTable['u60'] = 'top';gv_vAlignTable['u102'] = 'center';u9.tabIndex = 0;

u9.style.cursor = 'pointer';
$axure.eventManager.click('u9', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u9'] = 'top';gv_vAlignTable['u73'] = 'center';gv_vAlignTable['u69'] = 'center';gv_vAlignTable['u147'] = 'center';u131.tabIndex = 0;

u131.style.cursor = 'pointer';
$axure.eventManager.click('u131', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u131'] = 'top';gv_vAlignTable['u64'] = 'top';u24.tabIndex = 0;

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u24'] = 'top';u23.tabIndex = 0;

u23.style.cursor = 'pointer';
$axure.eventManager.click('u23', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u23'] = 'top';u13.tabIndex = 0;

u13.style.cursor = 'pointer';
$axure.eventManager.click('u13', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u13'] = 'top';gv_vAlignTable['u29'] = 'top';document.getElementById('u132_img').tabIndex = 0;

u132.style.cursor = 'pointer';
$axure.eventManager.click('u132', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
document.getElementById('u129_img').tabIndex = 0;

u129.style.cursor = 'pointer';
$axure.eventManager.click('u129', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u86'] = 'center';gv_vAlignTable['u145'] = 'center';document.getElementById('u83_img').tabIndex = 0;

u83.style.cursor = 'pointer';
$axure.eventManager.click('u83', function(e) {

if (true) {

SetWidgetFormText('u82', '');

}
});

$axure.eventManager.mouseout('u83', function(e) {
if (!IsTrueMouseOut('u83',e)) return;
if (true) {

SetWidgetFormText('u82', 'Suchen...');

}
});
u8.tabIndex = 0;

u8.style.cursor = 'pointer';
$axure.eventManager.click('u8', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u8'] = 'top';gv_vAlignTable['u3'] = 'top';gv_vAlignTable['u96'] = 'center';u15.tabIndex = 0;

u15.style.cursor = 'pointer';
$axure.eventManager.click('u15', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u49'] = 'center';gv_vAlignTable['u124'] = 'top';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u148'] = 'top';u12.tabIndex = 0;

u12.style.cursor = 'pointer';
$axure.eventManager.click('u12', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u12'] = 'top';u25.tabIndex = 0;

u25.style.cursor = 'pointer';
$axure.eventManager.click('u25', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u25'] = 'top';gv_vAlignTable['u59'] = 'top';gv_vAlignTable['u137'] = 'center';gv_vAlignTable['u90'] = 'center';u18.tabIndex = 0;

u18.style.cursor = 'pointer';
$axure.eventManager.click('u18', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u18'] = 'top';gv_vAlignTable['u77'] = 'center';gv_vAlignTable['u143'] = 'top';document.getElementById('u107_img').tabIndex = 0;

u107.style.cursor = 'pointer';
$axure.eventManager.click('u107', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u103', 'pd1u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u103', 'pd0u103','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});

$axure.eventManager.mouseover('u35', function(e) {
if (!IsTrueMouseOver('u35',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u35', function(e) {
if (!IsTrueMouseOut('u35',e)) return;
if (true) {

	SetPanelVisibility('u5','hidden','none',500);

	SendToBack("u5");

}
});
document.getElementById('u136_img').tabIndex = 0;

u136.style.cursor = 'pointer';
$axure.eventManager.click('u136', function(e) {

if (true) {

SetWidgetSelected('u136');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u28'] = 'top';