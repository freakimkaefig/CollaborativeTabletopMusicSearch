for(var i = 0; i < 116; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if ((GetGlobalVariableValue('jump2schulen')) == ('1')) {

	ScrollToWidget('u115', false,true,'none',500);

SetGlobalVariableValue('jump2schulen', '0');

}
else
if ((GetGlobalVariableValue('jump2kindergarten')) == ('1')) {

	ScrollToWidget('u114', false,true,'none',500);

SetGlobalVariableValue('jump2kindergarten', '0');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u56', 'pd1u56','none','',500,'fade','',2500);

	SetPanelState('u63', 'pd1u63','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u56'] = function() {
var e = windowEvent;

if ((GetPanelState('u56')) == ('pd0u56')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u56', 'pd1u56','none','',500,'fade','',2500);

	SetPanelState('u63', 'pd1u63','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u56')) == ('pd1u56')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u56', 'pd2u56','none','',500,'fade','',2500);

	SetPanelState('u63', 'pd2u63','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u56')) == ('pd2u56')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u56', 'pd0u56','none','',500,'fade','',2500);

	SetPanelState('u63', 'pd0u63','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
gv_vAlignTable['u86'] = 'center';gv_vAlignTable['u51'] = 'center';u25.tabIndex = 0;

u25.style.cursor = 'pointer';
$axure.eventManager.click('u25', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u25'] = 'top';u16.tabIndex = 0;

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

	NewTab('http://www.nmo-regensburg.de/museumspaedagogik/bilder/NMO_Angebote_Kindergaerten.pdf', "");

}
});
gv_vAlignTable['u16'] = 'top';gv_vAlignTable['u55'] = 'center';u31.tabIndex = 0;

u31.style.cursor = 'pointer';
$axure.eventManager.click('u31', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u31'] = 'top';document.getElementById('u77_img').tabIndex = 0;

u77.style.cursor = 'pointer';
$axure.eventManager.click('u77', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});

u93.style.cursor = 'pointer';
$axure.eventManager.click('u93', function(e) {

if (true) {

SetWidgetFormText('u93', '');

}
});

$axure.eventManager.blur('u93', function(e) {

if (true) {

SetWidgetFormText('u93', 'Suchen...');

}
});
gv_vAlignTable['u107'] = 'center';u38.tabIndex = 0;

u38.style.cursor = 'pointer';
$axure.eventManager.click('u38', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u38'] = 'top';u32.tabIndex = 0;

u32.style.cursor = 'pointer';
$axure.eventManager.click('u32', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u32'] = 'top';u23.tabIndex = 0;

u23.style.cursor = 'pointer';
$axure.eventManager.click('u23', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u23'] = 'top';gv_vAlignTable['u62'] = 'center';gv_vAlignTable['u53'] = 'center';gv_vAlignTable['u1'] = 'top';gv_vAlignTable['u4'] = 'top';gv_vAlignTable['u66'] = 'top';u30.tabIndex = 0;

u30.style.cursor = 'pointer';
$axure.eventManager.click('u30', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u30'] = 'top';gv_vAlignTable['u8'] = 'center';gv_vAlignTable['u60'] = 'center';gv_vAlignTable['u103'] = 'center';gv_vAlignTable['u97'] = 'center';u11.tabIndex = 0;

u11.style.cursor = 'pointer';
$axure.eventManager.click('u11', function(e) {

if (true) {

	NewTab('http://www.nmo-regensburg.de/museumspaedagogik/bilder/NMO_Angebote_Kindergaerten.pdf', "");

}
});
gv_vAlignTable['u11'] = 'top';gv_vAlignTable['u41'] = 'top';gv_vAlignTable['u71'] = 'top';gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u45'] = 'top';gv_vAlignTable['u75'] = 'top';gv_vAlignTable['u58'] = 'center';gv_vAlignTable['u92'] = 'center';gv_vAlignTable['u95'] = 'center';gv_vAlignTable['u22'] = 'center';gv_vAlignTable['u13'] = 'center';
$axure.eventManager.mouseover('u52', function(e) {
if (!IsTrueMouseOver('u52',e)) return;
if (true) {

	SetPanelVisibility('u20','','none',500);

	BringToFront("u20");

}
});
gv_vAlignTable['u43'] = 'top';gv_vAlignTable['u3'] = 'center';u27.tabIndex = 0;

u27.style.cursor = 'pointer';
$axure.eventManager.click('u27', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u90'] = 'center';gv_vAlignTable['u73'] = 'center';gv_vAlignTable['u84'] = 'center';
$axure.eventManager.mouseover('u50', function(e) {
if (!IsTrueMouseOver('u50',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u50', function(e) {
if (!IsTrueMouseOut('u50',e)) return;
if (true) {

	SetPanelVisibility('u20','hidden','none',500);

	SendToBack("u20");

}
});
u28.tabIndex = 0;

u28.style.cursor = 'pointer';
$axure.eventManager.click('u28', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u28'] = 'top';u24.tabIndex = 0;

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u24'] = 'top';gv_vAlignTable['u99'] = 'center';gv_vAlignTable['u113'] = 'center';u39.tabIndex = 0;

u39.style.cursor = 'pointer';
$axure.eventManager.click('u39', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u39'] = 'top';u111.tabIndex = 0;

u111.style.cursor = 'pointer';
$axure.eventManager.click('u111', function(e) {

if (true) {

	NewTab('http://www.nmo-regensburg.de/museumspaedagogik/bilder/NMO_Angebote_Kindergaerten.pdf', "");

}
});
gv_vAlignTable['u111'] = 'top';gv_vAlignTable['u69'] = 'center';gv_vAlignTable['u78'] = 'center';document.getElementById('u94_img').tabIndex = 0;

u94.style.cursor = 'pointer';
$axure.eventManager.click('u94', function(e) {

if (true) {

SetWidgetFormText('u93', '');

}
});

$axure.eventManager.mouseout('u94', function(e) {
if (!IsTrueMouseOut('u94',e)) return;
if (true) {

SetWidgetFormText('u93', 'Suchen...');

}
});
u6.tabIndex = 0;

u6.style.cursor = 'pointer';
$axure.eventManager.click('u6', function(e) {

if (true) {

	NewTab('http://www.nmo-regensburg.de/museumspaedagogik/bilder/NMO_Angebote_Kindergaerten.pdf', "");

}
});
gv_vAlignTable['u6'] = 'top';u26.tabIndex = 0;

u26.style.cursor = 'pointer';
$axure.eventManager.click('u26', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u26'] = 'top';gv_vAlignTable['u65'] = 'center';gv_vAlignTable['u105'] = 'center';gv_vAlignTable['u109'] = 'center';gv_vAlignTable['u82'] = 'center';gv_vAlignTable['u5'] = 'top';gv_vAlignTable['u9'] = 'top';gv_vAlignTable['u42'] = 'top';u33.tabIndex = 0;

u33.style.cursor = 'pointer';
$axure.eventManager.click('u33', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u33'] = 'top';gv_vAlignTable['u18'] = 'center';gv_vAlignTable['u48'] = 'center';gv_vAlignTable['u110'] = 'top';gv_vAlignTable['u67'] = 'top';gv_vAlignTable['u88'] = 'center';gv_vAlignTable['u101'] = 'center';gv_vAlignTable['u10'] = 'top';u40.tabIndex = 0;

u40.style.cursor = 'pointer';
$axure.eventManager.click('u40', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u40'] = 'top';gv_vAlignTable['u70'] = 'top';gv_vAlignTable['u14'] = 'top';gv_vAlignTable['u44'] = 'top';gv_vAlignTable['u74'] = 'top';u29.tabIndex = 0;

u29.style.cursor = 'pointer';
$axure.eventManager.click('u29', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u29'] = 'top';gv_vAlignTable['u80'] = 'center';