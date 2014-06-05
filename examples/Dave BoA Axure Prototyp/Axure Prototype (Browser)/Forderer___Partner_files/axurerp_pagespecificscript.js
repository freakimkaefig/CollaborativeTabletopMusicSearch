for(var i = 0; i < 111; i++) { var scriptId = 'u' + i; window[scriptId] = document.getElementById(scriptId); }

$axure.eventManager.pageLoad(
function (e) {

if (true) {
function waitu0a04bdcd5026490d84e593e8e86423bd1() {

	SetPanelState('u57', 'pd1u57','none','',500,'fade','',2500);

	SetPanelState('u64', 'pd1u64','none','',500,'fade','',2500);
}
setTimeout(waitu0a04bdcd5026490d84e593e8e86423bd1, 10000);

}

});

widgetIdToPanelStateChangeFunction['u57'] = function() {
var e = windowEvent;

if ((GetPanelState('u57')) == ('pd0u57')) {
function waitu2f2c6f0f6f50455c9f6b5e7de233edd51() {

	SetPanelState('u57', 'pd1u57','none','',500,'fade','',2500);

	SetPanelState('u64', 'pd1u64','none','',500,'fade','',2500);
}
setTimeout(waitu2f2c6f0f6f50455c9f6b5e7de233edd51, 10000);

}
else
if ((GetPanelState('u57')) == ('pd1u57')) {
function waitu532766122f1949d29028eed4130f41ce1() {

	SetPanelState('u57', 'pd2u57','none','',500,'fade','',2500);

	SetPanelState('u64', 'pd2u64','none','',500,'fade','',2500);
}
setTimeout(waitu532766122f1949d29028eed4130f41ce1, 10000);

}
else
if ((GetPanelState('u57')) == ('pd2u57')) {
function waituaed3d061dbbd49a0b6f609d65e80a9741() {

	SetPanelState('u57', 'pd0u57','none','',500,'fade','',2500);

	SetPanelState('u64', 'pd0u64','none','',500,'fade','',2500);
}
setTimeout(waituaed3d061dbbd49a0b6f609d65e80a9741, 10000);

}

}

$axure.eventManager.mouseover('u51', function(e) {
if (!IsTrueMouseOver('u51',e)) return;
if (true) {

}
});

$axure.eventManager.mouseout('u51', function(e) {
if (!IsTrueMouseOut('u51',e)) return;
if (true) {

	SetPanelVisibility('u21','hidden','none',500);

	SendToBack("u21");

}
});
gv_vAlignTable['u102'] = 'center';u25.tabIndex = 0;

u25.style.cursor = 'pointer';
$axure.eventManager.click('u25', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u25'] = 'top';u16.tabIndex = 0;

u16.style.cursor = 'pointer';
$axure.eventManager.click('u16', function(e) {

if (true) {

	NewTab('http://www.naturkundemuseum-bw.de/stuttgart/', "");

}
});
gv_vAlignTable['u16'] = 'top';gv_vAlignTable['u46'] = 'top';gv_vAlignTable['u76'] = 'top';u31.tabIndex = 0;

u31.style.cursor = 'pointer';
$axure.eventManager.click('u31', function(e) {

if (true) {

SetGlobalVariableValue('jump2kindergarten', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u31'] = 'top';gv_vAlignTable['u93'] = 'center';u32.tabIndex = 0;

u32.style.cursor = 'pointer';
$axure.eventManager.click('u32', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u32'] = 'top';gv_vAlignTable['u23'] = 'center';
$axure.eventManager.mouseover('u53', function(e) {
if (!IsTrueMouseOver('u53',e)) return;
if (true) {

	SetPanelVisibility('u21','','none',500);

	BringToFront("u21");

}
});
gv_vAlignTable['u87'] = 'center';gv_vAlignTable['u1'] = 'top';gv_vAlignTable['u4'] = 'top';u7.tabIndex = 0;

u7.style.cursor = 'pointer';
$axure.eventManager.click('u7', function(e) {

if (true) {

	NewTab('http://www.regensburg.de/', "");

}
});
gv_vAlignTable['u7'] = 'top';gv_vAlignTable['u66'] = 'center';gv_vAlignTable['u68'] = 'top';gv_vAlignTable['u104'] = 'center';u30.tabIndex = 0;

u30.style.cursor = 'pointer';
$axure.eventManager.click('u30', function(e) {

if (true) {

SetGlobalVariableValue('jump2geschichte', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u30'] = 'top';gv_vAlignTable['u8'] = 'top';gv_vAlignTable['u89'] = 'center';u34.tabIndex = 0;

u34.style.cursor = 'pointer';
$axure.eventManager.click('u34', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u34'] = 'top';gv_vAlignTable['u17'] = 'top';gv_vAlignTable['u100'] = 'center';u19.tabIndex = 0;

u19.style.cursor = 'pointer';
$axure.eventManager.click('u19', function(e) {

if (true) {

	NewTab('http://www.sparkasse-regensburg.de/', "");

}
});
gv_vAlignTable['u19'] = 'top';gv_vAlignTable['u49'] = 'center';gv_vAlignTable['u79'] = 'center';gv_vAlignTable['u81'] = 'center';gv_vAlignTable['u85'] = 'center';u11.tabIndex = 0;

u11.style.cursor = 'pointer';
$axure.eventManager.click('u11', function(e) {

if (true) {

	NewTab('http://www.bezirk-oberpfalz.de/', "");

}
});
gv_vAlignTable['u11'] = 'top';u41.tabIndex = 0;

u41.style.cursor = 'pointer';
$axure.eventManager.click('u41', function(e) {

if (true) {

    self.location.href="resources/reload.html#" + encodeURI($axure.globalVariableProvider.getLinkUrl($axure.pageData.url));

}
});
gv_vAlignTable['u41'] = 'top';gv_vAlignTable['u108'] = 'center';gv_vAlignTable['u71'] = 'top';u15.tabIndex = 0;

u15.style.cursor = 'pointer';
$axure.eventManager.click('u15', function(e) {

if (true) {

	NewTab('http://www.kunstsammlungen-museen.augsburg.de/', "");

}
});
gv_vAlignTable['u15'] = 'top';gv_vAlignTable['u45'] = 'top';gv_vAlignTable['u75'] = 'top';gv_vAlignTable['u2'] = 'top';gv_vAlignTable['u83'] = 'center';document.getElementById('u95_img').tabIndex = 0;

u95.style.cursor = 'pointer';
$axure.eventManager.click('u95', function(e) {

if (true) {

SetWidgetFormText('u94', '');

}
});

$axure.eventManager.mouseout('u95', function(e) {
if (!IsTrueMouseOut('u95',e)) return;
if (true) {

SetWidgetFormText('u94', 'Suchen...');

}
});
u13.tabIndex = 0;

u13.style.cursor = 'pointer';
$axure.eventManager.click('u13', function(e) {

if (true) {

	NewTab('http://www.lrz-muenchen.de/~Mineralogische.Staatssammlung/', "");

}
});
gv_vAlignTable['u13'] = 'top';gv_vAlignTable['u52'] = 'center';gv_vAlignTable['u43'] = 'top';gv_vAlignTable['u3'] = 'top';u27.tabIndex = 0;

u27.style.cursor = 'pointer';
$axure.eventManager.click('u27', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Ausstellungen_-_ungefiltert.html');

}
});
gv_vAlignTable['u27'] = 'top';gv_vAlignTable['u106'] = 'center';u28.tabIndex = 0;

u28.style.cursor = 'pointer';
$axure.eventManager.click('u28', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Konzerte___Lesungen.html');

}
});
gv_vAlignTable['u28'] = 'top';u24.tabIndex = 0;

u24.style.cursor = 'pointer';
$axure.eventManager.click('u24', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u24'] = 'top';gv_vAlignTable['u54'] = 'center';u39.tabIndex = 0;

u39.style.cursor = 'pointer';
$axure.eventManager.click('u39', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Besucherinfo.html');

}
});
gv_vAlignTable['u39'] = 'top';document.getElementById('u78_img').tabIndex = 0;

u78.style.cursor = 'pointer';
$axure.eventManager.click('u78', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Naturkunde_Museum_Ostbayern.html');

}
});

u94.style.cursor = 'pointer';
$axure.eventManager.click('u94', function(e) {

if (true) {

SetWidgetFormText('u94', '');

}
});

$axure.eventManager.blur('u94', function(e) {

if (true) {

SetWidgetFormText('u94', 'Suchen...');

}
});
u6.tabIndex = 0;

u6.style.cursor = 'pointer';
$axure.eventManager.click('u6', function(e) {

if (true) {

	NewTab('http://www.naturwissenschaftlicher-verein-regensburg.de/', "");

}
});
gv_vAlignTable['u6'] = 'top';gv_vAlignTable['u96'] = 'center';gv_vAlignTable['u61'] = 'center';gv_vAlignTable['u91'] = 'center';u26.tabIndex = 0;

u26.style.cursor = 'pointer';
$axure.eventManager.click('u26', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Rundgang.html');

}
});
gv_vAlignTable['u26'] = 'top';gv_vAlignTable['u56'] = 'center';gv_vAlignTable['u5'] = 'top';u12.tabIndex = 0;

u12.style.cursor = 'pointer';
$axure.eventManager.click('u12', function(e) {

if (true) {

	NewTab('http://www.uni-regensburg.de/', "");

}
});
gv_vAlignTable['u12'] = 'top';u9.tabIndex = 0;

u9.style.cursor = 'pointer';
$axure.eventManager.click('u9', function(e) {

if (true) {

	NewTab('http://www.museeninbayern.de/landesstelle/index.htm', "");

}
});
gv_vAlignTable['u9'] = 'top';gv_vAlignTable['u42'] = 'top';u33.tabIndex = 0;

u33.style.cursor = 'pointer';
$axure.eventManager.click('u33', function(e) {

if (true) {

SetGlobalVariableValue('jump2schulen', '1');

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Museumspadagogik.html');

}
});
gv_vAlignTable['u33'] = 'top';gv_vAlignTable['u72'] = 'top';gv_vAlignTable['u63'] = 'center';u18.tabIndex = 0;

u18.style.cursor = 'pointer';
$axure.eventManager.click('u18', function(e) {

if (true) {

	NewTab('http://www.infineon.com/', "");

}
});
gv_vAlignTable['u18'] = 'top';gv_vAlignTable['u110'] = 'center';gv_vAlignTable['u67'] = 'top';gv_vAlignTable['u10'] = 'top';u40.tabIndex = 0;

u40.style.cursor = 'pointer';
$axure.eventManager.click('u40', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Downloads___Links.html');

}
});
gv_vAlignTable['u40'] = 'top';gv_vAlignTable['u70'] = 'center';u14.tabIndex = 0;

u14.style.cursor = 'pointer';
$axure.eventManager.click('u14', function(e) {

if (true) {

	NewTab('http://www.zsm.mwn.de/', "");

}
});
gv_vAlignTable['u14'] = 'top';gv_vAlignTable['u44'] = 'top';gv_vAlignTable['u74'] = 'center';u29.tabIndex = 0;

u29.style.cursor = 'pointer';
$axure.eventManager.click('u29', function(e) {

if (true) {

	self.location.href=$axure.globalVariableProvider.getLinkUrl('Kultur.html');

}
});
gv_vAlignTable['u29'] = 'top';gv_vAlignTable['u59'] = 'center';gv_vAlignTable['u98'] = 'center';