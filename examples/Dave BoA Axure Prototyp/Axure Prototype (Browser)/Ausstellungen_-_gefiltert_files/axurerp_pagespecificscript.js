for(var i = 0; i < 156; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetWidgetSelected('u119');
SetGlobalVariableValue('Filteroffen', '1');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u63', 'pd1u63','none','',500,'fade','',2500);

	SetPanelState('u70', 'pd1u70','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u63'] = function() {
var e = windowEvent;

if ((GetPanelState('u63')) == ('pd0u63')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u63', 'pd1u63','none','',500,'fade','',2500);

	SetPanelState('u70', 'pd1u70','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u63')) == ('pd1u63')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u63', 'pd2u63','none','',500,'fade','',2500);

	SetPanelState('u70', 'pd2u70','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u63')) == ('pd2u63')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u63', 'pd0u63','none','',500,'fade','',2500);

	SetPanelState('u70', 'pd0u70','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
document.getElementById('u122_img').tabIndex = 0;

u122.style.cursor = 'pointer';
$axure.eventManager.click('u122', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u130'] = 'top';gv_vAlignTable['u99'] = 'center';document.getElementById('u150_img').tabIndex = 0;

u150.style.cursor = 'pointer';
$axure.eventManager.click('u150', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u153'] = 'center';gv_vAlignTable['u140'] = 'top';u17.tabIndex = 0;

u17.style.cursor = 'pointer';
$axure.eventManager.click('u17', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u17'] = 'top';gv_vAlignTable['u42'] = 'center';gv_vAlignTable['u55'] = 'top';document.getElementById('u101_img').tabIndex = 0;

u101.style.cursor = 'pointer';
$axure.eventManager.click('u101', function(e) {

if (true) {

SetWidgetFormText('u100', '');

}
});

$axure.eventManager.mouseout('u101', function(e) {
if (!IsTrueMouseOut('u101',e)) return;
if (true) {

SetWidgetFormText('u100', 'Suchen...');

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
gv_vAlignTable['u14'] = 'top';gv_vAlignTable['u48'] = 'center';gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u7'] = 'center';gv_vAlignTable['u52'] = 'center';gv_vAlignTable['u67'] = 'center';gv_vAlignTable['u65'] = 'center';gv_vAlignTable['u120'] = 'center';gv_vAlignTable['u110'] = 'center';gv_vAlignTable['u58'] = 'center';gv_vAlignTable['u108'] = 'center';
$axure.eventManager.mouseover('u37', function(e) {
if (!IsTrueMouseOver('u37',e)) return;
if (true) {

	SetPanelVisibility('u5','','none',500);

	BringToFront("u5");

}
});
gv_vAlignTable['u62'] = 'center';u11.tabIndex = 0;

u11.style.cursor = 'pointer';
$axure.eventManager.click('u11', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u11'] = 'top';gv_vAlignTable['u89'] = 'center';gv_vAlignTable['u72'] = 'center';gv_vAlignTable['u112'] = 'center';gv_vAlignTable['u44'] = 'top';gv_vAlignTable['u78'] = 'top';document.getElementById('u119_img').tabIndex = 0;

u119.style.cursor = 'pointer';
$axure.eventManager.click('u119', function(e) {

if (true) {

SetWidgetSelected('u119');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
u16.tabIndex = 0;

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u16'] = 'top';document.getElementById('u125_img').tabIndex = 0;

u125.style.cursor = 'pointer';
$axure.eventManager.click('u125', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
u149.tabIndex = 0;

u149.style.cursor = 'pointer';
$axure.eventManager.click('u149', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u149'] = 'top';gv_vAlignTable['u54'] = 'center';gv_vAlignTable['u38'] = 'center';gv_vAlignTable['u26'] = 'top';gv_vAlignTable['u128'] = 'center';gv_vAlignTable['u85'] = 'center';u10.tabIndex = 0;

u10.style.cursor = 'pointer';
$axure.eventManager.click('u10', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u10'] = 'top';
u100.style.cursor = 'pointer';
$axure.eventManager.click('u100', function(e) {

if (true) {

SetWidgetFormText('u100', '');

}
});

$axure.eventManager.blur('u100', function(e) {

if (true) {

SetWidgetFormText('u100', 'Suchen...');

}
});
u23.tabIndex = 0;

u23.style.cursor = 'pointer';
$axure.eventManager.click('u23', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u23'] = 'top';gv_vAlignTable['u144'] = 'top';gv_vAlignTable['u82'] = 'top';gv_vAlignTable['u36'] = 'center';gv_vAlignTable['u30'] = 'top';gv_vAlignTable['u95'] = 'center';gv_vAlignTable['u116'] = 'center';gv_vAlignTable['u74'] = 'top';gv_vAlignTable['u114'] = 'center';gv_vAlignTable['u33'] = 'center';gv_vAlignTable['u46'] = 'center';gv_vAlignTable['u126'] = 'center';gv_vAlignTable['u43'] = 'top';gv_vAlignTable['u56'] = 'top';gv_vAlignTable['u151'] = 'center';gv_vAlignTable['u106'] = 'center';document.getElementById('u154_img').tabIndex = 0;

u154.style.cursor = 'pointer';
$axure.eventManager.click('u154', function(e) {

if (true) {

SetWidgetSelected('u154');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u40'] = 'center';gv_vAlignTable['u87'] = 'center';gv_vAlignTable['u104'] = 'center';gv_vAlignTable['u155'] = 'center';document.getElementById('u84_img').tabIndex = 0;

u84.style.cursor = 'pointer';
$axure.eventManager.click('u84', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});
gv_vAlignTable['u50'] = 'top';gv_vAlignTable['u97'] = 'center';gv_vAlignTable['u123'] = 'center';gv_vAlignTable['u76'] = 'center';gv_vAlignTable['u134'] = 'top';gv_vAlignTable['u81'] = 'top';gv_vAlignTable['u60'] = 'center';gv_vAlignTable['u102'] = 'center';u9.tabIndex = 0;

u9.style.cursor = 'pointer';
$axure.eventManager.click('u9', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u9'] = 'top';gv_vAlignTable['u73'] = 'top';document.getElementById('u147_img').tabIndex = 0;

u147.style.cursor = 'pointer';
$axure.eventManager.click('u147', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u91'] = 'center';u24.tabIndex = 0;

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u24'] = 'top';u13.tabIndex = 0;

u13.style.cursor = 'pointer';
$axure.eventManager.click('u13', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u13'] = 'top';gv_vAlignTable['u29'] = 'top';gv_vAlignTable['u132'] = 'top';document.getElementById('u145_img').tabIndex = 0;

u145.style.cursor = 'pointer';
$axure.eventManager.click('u145', function(e) {

if (((GetCheckState('u131')) == (true)) && (((GetCheckState('u133')) == (false)) && ((GetCheckState('u129')) == (false)))) {

SetWidgetSelected('u119');
	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_gefiltert_2.html');

}
});
u8.tabIndex = 0;

u8.style.cursor = 'pointer';
$axure.eventManager.click('u8', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u8'] = 'top';gv_vAlignTable['u3'] = 'top';gv_vAlignTable['u146'] = 'center';u15.tabIndex = 0;

u15.style.cursor = 'pointer';
$axure.eventManager.click('u15', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u49'] = 'top';u124.tabIndex = 0;

u124.style.cursor = 'pointer';
$axure.eventManager.click('u124', function(e) {

if ((GetGlobalVariableValue('Filteroffen')) == ('1')) {

	SetPanelState('u121', 'pd1u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '0');

}
else
if ((GetGlobalVariableValue('Filteroffen')) == ('0')) {

	SetPanelState('u121', 'pd0u121','none','',500,'none','',500);

SetGlobalVariableValue('Filteroffen', '1');

}
});
gv_vAlignTable['u124'] = 'top';gv_vAlignTable['u80'] = 'center';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u138'] = 'center';gv_vAlignTable['u148'] = 'center';gv_vAlignTable['u142'] = 'top';gv_vAlignTable['u93'] = 'center';u12.tabIndex = 0;

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
gv_vAlignTable['u25'] = 'top';gv_vAlignTable['u118'] = 'center';u18.tabIndex = 0;

u18.style.cursor = 'pointer';
$axure.eventManager.click('u18', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u18'] = 'top';gv_vAlignTable['u136'] = 'top';gv_vAlignTable['u77'] = 'top';
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
gv_vAlignTable['u69'] = 'center';gv_vAlignTable['u28'] = 'top';