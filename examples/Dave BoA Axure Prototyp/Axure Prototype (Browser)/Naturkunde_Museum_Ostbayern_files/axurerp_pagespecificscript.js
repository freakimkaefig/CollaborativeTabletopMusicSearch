for(var i = 0; i < 209; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {

SetGlobalVariableValue('Filteroffen', '1');

}

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u29', 'pd1u29','none','',500,'fade','',2500);

	SetPanelState('u36', 'pd1u36','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u29'] = function() {
var e = windowEvent;

if ((GetPanelState('u29')) == ('pd0u29')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u29', 'pd1u29','none','',500,'fade','',2500);

	SetPanelState('u36', 'pd1u36','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u29')) == ('pd1u29')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u29', 'pd2u29','none','',500,'fade','',2500);

	SetPanelState('u36', 'pd2u36','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u29')) == ('pd2u29')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u29', 'pd0u29','none','',500,'fade','',2500);

	SetPanelState('u36', 'pd0u36','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}
gv_vAlignTable['u115'] = 'center';gv_vAlignTable['u122'] = 'top';gv_vAlignTable['u21'] = 'top';u207.tabIndex = 0;

u207.style.cursor = 'pointer';
$axure.eventManager.click('u207', function(e) {

if (true) {

	SetPanelState('u15', 'pd1u15','swing','up',500,'swing','up',500);

	BringToFront("u15");

	SetPanelState('u85', 'pd0u85','none','',500,'none','',500);

	SendToBack("u85");

	SetPanelState('u72', 'pd0u72','none','',500,'none','',500);

	SendToBack("u72");

	SetPanelState('u97', 'pd0u97','none','',500,'none','',500);

	SendToBack("u97");

}
});
gv_vAlignTable['u207'] = 'top';gv_vAlignTable['u130'] = 'top';gv_vAlignTable['u4'] = 'center';gv_vAlignTable['u153'] = 'center';gv_vAlignTable['u17'] = 'center';gv_vAlignTable['u135'] = 'top';gv_vAlignTable['u151'] = 'center';gv_vAlignTable['u42'] = 'center';u159.tabIndex = 0;

u159.style.cursor = 'pointer';
$axure.eventManager.click('u159', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u159'] = 'top';gv_vAlignTable['u55'] = 'center';gv_vAlignTable['u101'] = 'center';gv_vAlignTable['u186'] = 'center';gv_vAlignTable['u14'] = 'top';gv_vAlignTable['u48'] = 'top';gv_vAlignTable['u105'] = 'center';gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u7'] = 'top';gv_vAlignTable['u20'] = 'top';document.getElementById('u67_img').tabIndex = 0;

u67.style.cursor = 'pointer';
$axure.eventManager.click('u67', function(e) {

if (true) {

SetWidgetFormText('u66', '');

}
});

$axure.eventManager.mouseout('u67', function(e) {
if (!IsTrueMouseOut('u67',e)) return;
if (true) {

SetWidgetFormText('u66', 'Suchen...');

}
});
gv_vAlignTable['u65'] = 'center';
$axure.eventManager.mouseover('u152', function(e) {
if (!IsTrueMouseOver('u152',e)) return;
if (true) {

	SetPanelState('u15', 'pd0u15','none','',500,'none','',500);

	SendToBack("u15");

	SetPanelState('u72', 'pd0u72','none','',500,'none','',500);

	SendToBack("u72");

	SetPanelState('u85', 'pd0u85','none','',500,'none','',500);

	SendToBack("u85");

	SetPanelState('u97', 'pd0u97','none','',500,'none','',500);

	SendToBack("u97");

}
});
gv_vAlignTable['u110'] = 'top';gv_vAlignTable['u6'] = 'center';u205.tabIndex = 0;

u205.style.cursor = 'pointer';
$axure.eventManager.click('u205', function(e) {

if (true) {

	SetPanelState('u124', 'pd1u124','swing','up',500,'swing','up',500);

	BringToFront("u124");

	SetPanelState('u111', 'pd0u111','none','',500,'none','',500);

	SendToBack("u111");

	SetPanelState('u137', 'pd0u137','none','',500,'none','',500);

	SendToBack("u137");

	SetPanelState('u2', 'pd0u2','none','',500,'none','',500);

	SendToBack("u2");

}
});
gv_vAlignTable['u205'] = 'top';gv_vAlignTable['u108'] = 'top';gv_vAlignTable['u141'] = 'center';gv_vAlignTable['u200'] = 'center';gv_vAlignTable['u68'] = 'center';gv_vAlignTable['u89'] = 'center';gv_vAlignTable['u39'] = 'top';gv_vAlignTable['u47'] = 'top';
$axure.eventManager.mouseover('u185', function(e) {
if (!IsTrueMouseOver('u185',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u185', function(e) {
if (!IsTrueMouseOut('u185',e)) return;
if (true) {

	SetPanelVisibility('u155','hidden','none',500);

	SendToBack("u155");

}
});
gv_vAlignTable['u103'] = 'top';u164.tabIndex = 0;

u164.style.cursor = 'pointer';
$axure.eventManager.click('u164', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u164'] = 'top';gv_vAlignTable['u99'] = 'center';
u66.style.cursor = 'pointer';
$axure.eventManager.click('u66', function(e) {

if (true) {

SetWidgetFormText('u66', '');

}
});

$axure.eventManager.blur('u66', function(e) {

if (true) {

SetWidgetFormText('u66', 'Suchen...');

}
});
gv_vAlignTable['u44'] = 'top';gv_vAlignTable['u78'] = 'top';gv_vAlignTable['u179'] = 'top';gv_vAlignTable['u57'] = 'center';gv_vAlignTable['u119'] = 'center';u203.tabIndex = 0;

u203.style.cursor = 'pointer';
$axure.eventManager.click('u203', function(e) {

if (true) {

	SetPanelState('u97', 'pd1u97','swing','up',500,'swing','up',500);

	BringToFront("u97");

	SetPanelState('u72', 'pd0u72','none','',500,'none','',500);

	SendToBack("u72");

	SetPanelState('u15', 'pd0u15','none','',500,'none','',500);

	SendToBack("u15");

	SetPanelState('u85', 'pd0u85','none','',500,'none','',500);

	SendToBack("u85");

}
});
gv_vAlignTable['u203'] = 'top';gv_vAlignTable['u149'] = 'top';u208.tabIndex = 0;

u208.style.cursor = 'pointer';
$axure.eventManager.click('u208', function(e) {

if (true) {

	SetPanelState('u111', 'pd0u111','swing','up',500,'swing','up',500);

	SendToBack("u111");

	SetPanelState('u124', 'pd0u124','none','',500,'none','',500);

	SendToBack("u124");

	SetPanelState('u137', 'pd0u137','none','',500,'none','',500);

	SendToBack("u137");

	SetPanelState('u2', 'pd1u2','none','',500,'none','',500);

	BringToFront("u2");

}
});
gv_vAlignTable['u208'] = 'top';gv_vAlignTable['u38'] = 'center';gv_vAlignTable['u176'] = 'top';gv_vAlignTable['u26'] = 'top';u174.tabIndex = 0;

u174.style.cursor = 'pointer';
$axure.eventManager.click('u174', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u174'] = 'top';gv_vAlignTable['u128'] = 'center';gv_vAlignTable['u51'] = 'center';gv_vAlignTable['u10'] = 'center';gv_vAlignTable['u23'] = 'center';gv_vAlignTable['u31'] = 'center';u166.tabIndex = 0;

u166.style.cursor = 'pointer';
$axure.eventManager.click('u166', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u166'] = 'top';gv_vAlignTable['u82'] = 'center';gv_vAlignTable['u95'] = 'center';gv_vAlignTable['u61'] = 'center';gv_vAlignTable['u116'] = 'top';u158.tabIndex = 0;

u158.style.cursor = 'pointer';
$axure.eventManager.click('u158', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u158'] = 'top';gv_vAlignTable['u74'] = 'center';gv_vAlignTable['u123'] = 'top';gv_vAlignTable['u33'] = 'center';u160.tabIndex = 0;

u160.style.cursor = 'pointer';
$axure.eventManager.click('u160', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u160'] = 'top';gv_vAlignTable['u157'] = 'center';gv_vAlignTable['u46'] = 'center';u202.tabIndex = 0;

u202.style.cursor = 'pointer';
$axure.eventManager.click('u202', function(e) {

if (true) {

	SetPanelState('u85', 'pd1u85','swing','up',500,'swing','up',500);

	BringToFront("u85");

	SetPanelState('u72', 'pd0u72','none','',500,'none','',500);

	SendToBack("u72");

	SetPanelState('u15', 'pd0u15','none','',500,'none','',500);

	SendToBack("u15");

	SetPanelState('u97', 'pd0u97','none','',500,'none','',500);

	SendToBack("u97");

}
});
gv_vAlignTable['u202'] = 'top';gv_vAlignTable['u126'] = 'center';gv_vAlignTable['u71'] = 'top';gv_vAlignTable['u198'] = 'center';gv_vAlignTable['u43'] = 'top';
$axure.eventManager.mouseover('u150', function(e) {
if (!IsTrueMouseOver('u150',e)) return;
if (true) {

	SetPanelState('u111', 'pd0u111','none','',500,'none','',500);

	SetPanelState('u124', 'pd0u124','none','',500,'none','',500);

	SetPanelState('u137', 'pd0u137','none','',500,'none','',500);

	SendToBack("u111");

	SendToBack("u124");

	SendToBack("u137");

	SetPanelState('u2', 'pd0u2','none','',500,'none','',500);

	SendToBack("u2");

}
});

$axure.eventManager.mouseover('u187', function(e) {
if (!IsTrueMouseOver('u187',e)) return;
if (true) {

	SetPanelVisibility('u155','','none',500);

	BringToFront("u155");

}
});
gv_vAlignTable['u142'] = 'top';u168.tabIndex = 0;

u168.style.cursor = 'pointer';
$axure.eventManager.click('u168', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u168'] = 'top';gv_vAlignTable['u40'] = 'top';gv_vAlignTable['u139'] = 'center';gv_vAlignTable['u87'] = 'center';gv_vAlignTable['u53'] = 'center';gv_vAlignTable['u192'] = 'center';gv_vAlignTable['u121'] = 'center';gv_vAlignTable['u19'] = 'center';u206.tabIndex = 0;

u206.style.cursor = 'pointer';
$axure.eventManager.click('u206', function(e) {

if (true) {

	SetPanelState('u137', 'pd1u137','swing','up',500,'swing','up',500);

	BringToFront("u137");

	SetPanelState('u124', 'pd0u124','none','',500,'none','',500);

	SendToBack("u124");

	SetPanelState('u111', 'pd0u111','none','',500,'none','',500);

	SendToBack("u111");

	SetPanelState('u2', 'pd0u2','none','',500,'none','',500);

	SendToBack("u2");

}
});
gv_vAlignTable['u206'] = 'top';gv_vAlignTable['u109'] = 'top';gv_vAlignTable['u84'] = 'top';document.getElementById('u50_img').tabIndex = 0;

u50.style.cursor = 'pointer';
$axure.eventManager.click('u50', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u63'] = 'center';gv_vAlignTable['u76'] = 'center';gv_vAlignTable['u134'] = 'center';gv_vAlignTable['u177'] = 'top';gv_vAlignTable['u190'] = 'center';gv_vAlignTable['u102'] = 'top';gv_vAlignTable['u147'] = 'center';u163.tabIndex = 0;

u163.style.cursor = 'pointer';
$axure.eventManager.click('u163', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u163'] = 'top';gv_vAlignTable['u91'] = 'top';gv_vAlignTable['u70'] = 'center';gv_vAlignTable['u188'] = 'center';u162.tabIndex = 0;

u162.style.cursor = 'pointer';
$axure.eventManager.click('u162', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u162'] = 'top';u204.tabIndex = 0;

u204.style.cursor = 'pointer';
$axure.eventManager.click('u204', function(e) {

if (true) {

	SetPanelState('u111', 'pd1u111','swing','up',500,'swing','up',500);

	BringToFront("u111");

	SetPanelState('u124', 'pd0u124','none','',500,'none','',500);

	SendToBack("u124");

	SetPanelState('u137', 'pd0u137','none','',500,'none','',500);

	SendToBack("u137");

	SetPanelState('u2', 'pd0u2','none','',500,'none','',500);

	SendToBack("u2");

}
});
gv_vAlignTable['u204'] = 'top';gv_vAlignTable['u117'] = 'top';gv_vAlignTable['u13'] = 'top';gv_vAlignTable['u113'] = 'center';gv_vAlignTable['u132'] = 'center';u175.tabIndex = 0;

u175.style.cursor = 'pointer';
$axure.eventManager.click('u175', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Forderer___Partner.html');

}
});
gv_vAlignTable['u175'] = 'top';gv_vAlignTable['u129'] = 'top';gv_vAlignTable['u183'] = 'center';u173.tabIndex = 0;

u173.style.cursor = 'pointer';
$axure.eventManager.click('u173', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u173'] = 'top';gv_vAlignTable['u145'] = 'center';gv_vAlignTable['u83'] = 'top';gv_vAlignTable['u178'] = 'top';gv_vAlignTable['u8'] = 'top';gv_vAlignTable['u96'] = 'top';gv_vAlignTable['u196'] = 'center';gv_vAlignTable['u80'] = 'center';gv_vAlignTable['u1'] = 'center';gv_vAlignTable['u148'] = 'top';gv_vAlignTable['u93'] = 'center';u167.tabIndex = 0;

u167.style.cursor = 'pointer';
$axure.eventManager.click('u167', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u167'] = 'top';gv_vAlignTable['u12'] = 'center';u201.tabIndex = 0;

u201.style.cursor = 'pointer';
$axure.eventManager.click('u201', function(e) {

if (true) {

	SetPanelState('u72', 'pd1u72','swing','up',500,'swing','up',500);

	BringToFront("u72");

	SetPanelState('u85', 'pd0u85','none','',500,'none','',500);

	SetPanelState('u15', 'pd0u15','none','',500,'none','',500);

	SendToBack("u15");

	SendToBack("u85");

	SetPanelState('u97', 'pd0u97','none','',500,'none','',500);

	SendToBack("u97");

}
});
gv_vAlignTable['u201'] = 'top';u165.tabIndex = 0;

u165.style.cursor = 'pointer';
$axure.eventManager.click('u165', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u165'] = 'top';gv_vAlignTable['u25'] = 'center';gv_vAlignTable['u59'] = 'center';gv_vAlignTable['u90'] = 'top';u161.tabIndex = 0;

u161.style.cursor = 'pointer';
$axure.eventManager.click('u161', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u161'] = 'top';gv_vAlignTable['u77'] = 'top';gv_vAlignTable['u143'] = 'top';gv_vAlignTable['u107'] = 'center';gv_vAlignTable['u35'] = 'center';gv_vAlignTable['u136'] = 'top';gv_vAlignTable['u180'] = 'top';gv_vAlignTable['u194'] = 'center';