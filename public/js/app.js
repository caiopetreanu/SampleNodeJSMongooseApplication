$(document).ready(function () {

	/*
	 * Utils
	 */

	String.prototype.replaceAll = function(obj) {

		var retStr = element;

		for (var x in obj) {
			retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
		}

		return retStr;

	};

	Number.prototype.format = function (n, x, s, c) {
		var re  = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
		    num = this.toFixed(Math.max(0, ~~n));

		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};

	$('.button1').live('click', function () {
		var contextObject = getContextObject();
		var theContent = getTheContent(contextObject);
	});

	function getContextObject() {

		var contextObject = window.location.pathname;
		var regex = new RegExp("/", 'g');
		contextObject = contextObject.replace(regex, "");

		switch (contextObject) {
			case 'demandasCache':
				contextObject = 'homePage';
				break;
		}

		console.log("requested context help page --> " + contextObject);
		return contextObject;

	}

	function getTheContent(contextObject) {

		var clientDataStore = window.sessionStorage;
		var theContent = "";

		//check if the content exists in client cache
		theContent = clientDataStore.getItem('_myKey' + contextObject);

		//Make the server side call to get the data if cache is empty on client
		if (theContent == null || theContent.length <= 0) {

			console.log('return content from server side.............');

			$.ajax({

				async:    false,
				url:      '/getTheContent/' + contextObject,
				type:     "GET",
				cache:    false,
				timeout:  5000,
				complete: function () {
				},
				success:  function (callback) {
					theContent = callback;
					clientDataStore.setItem('_myKey' + contextObject, theContent); // <_myKeypage1 , contents of page 1>
					console.log("................." + theContent);
					$('#pageInfo').html('');
					$("#pageInfo").css("display", "block");
					$('#pageInfo').html(theContent);
				},
				error:    function (event) {
					console.log('Error:::' + event);
				}

			});

		}

		else {
			// return the content from client side cache
			console.log('return content from client side cache .............');
			return theContent;
		}

		return theContent;

	}

	/*
	 * Controle / Unidade Medida
	 */

	function switchUnidadeMedida() {
		console.log('switchUnidadeMedida pressionado!')
	}

	var filtroReais = $('#reais');
	var filtroUnidades = $('#unidades');
	var btnFiltroUnidadeMedida = $('#u762, #u762_img, #u763');

	function checkBtnFiltroUnidadeMedida() {

		if (( typeof filtroReais !== "undefined" && filtroReais.attr('clicked') != "true" ) &&
			( typeof filtroUnidades !== "undefined" && filtroUnidades.attr('clicked') != "true" )) {

			btnFiltroUnidadeMedida.attr('clicked', false);
			btnFiltroUnidadeMedida.find("img").attr("src", "img/index/btn_filtro_cd_u147.png");

		}

		else {
			btnFiltroUnidadeMedida.attr('clicked', true);
			btnFiltroUnidadeMedida.find("img").attr("src", "img/index/btn_filtro_cd_u147_selected.png");
		}
	}

	btnFiltroUnidadeMedida.click(function(e) {

		e.preventDefault();

		if(filtroReais.attr("clicked") == "true") {
			filtroReais.find("img").attr("src", "img/index/u45.pn g");
			filtroReais.attr("clicked", false);
		}

		if(filtroUnidades.attr("clicked") == "true") {
			filtroUnidades.find("img").attr("src", "img/index/u47.png");
			filtroUnidades.attr("clicked", false);
		}

	});

	filtroReais.click(function (e) {

		e.preventDefault();

		if (filtroReais.attr("clicked") == "true") {
			filtroReais.find("img").attr("src", "img/index/u45.png");
			filtroReais.attr("clicked", false);
		}

		else {

			filtroReais.find("img").attr("src", "img/index/u45red.png");
			filtroReais.attr("clicked", true);

			if (filtroUnidades.attr("clicked") == "true") {
				filtroUnidades.click();
			}

		}

		checkBtnFiltroUnidadeMedida();

	});

	filtroUnidades.click(function (e) {
		e.preventDefault();

		if (filtroUnidades.attr("clicked") == "true") {
			filtroUnidades.find("img").attr("src", "img/index/u47.png");
			filtroUnidades.attr("clicked", false);
		}

		else {

			if (filtroReais.attr("clicked") == "true") {
				filtroReais.click();
			}

			filtroUnidades.find("img").attr("src", "img/index/u47red.png");
			filtroUnidades.attr("clicked", true);

		}

		checkBtnFiltroUnidadeMedida();

	});

	/*
	 * Controle / CDs
	 */

	var btnFiltroCd1 = $('#a54');
	var btnFiltroCd2 = $('#a56');
	var btnFiltroCd3 = $('#a58');
	var btnFiltroCd4 = $('#a60');
	var btnFiltroCd5 = $('#a62');
	var btnFiltroCd6 = $('#a64');
	var btnFiltroCd7 = $('#a66');
	var btnFiltroCd8 = $('#a68');
	var btnFiltroCd9 = $('#a70');
	var btnFiltroCd10 = $('#a72');
	var btnFiltroCd11 = $('#a74');
	var btnFiltroCd12 = $('#a76');
	var btnFiltroCd13 = $('#a78');
	var btnFiltroCd14 = $('#a80');

	var btnToggleFiltroCd = $('#u147, #u147_img, #u148');

	function checkCds() {

		if (( typeof btnFiltroCd1 !== "undefined" && btnFiltroCd1.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd2 !== "undefined" && btnFiltroCd2.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd3 !== "undefined" && btnFiltroCd3.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd4 !== "undefined" && btnFiltroCd4.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd5 !== "undefined" && btnFiltroCd5.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd6 !== "undefined" && btnFiltroCd6.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd7 !== "undefined" && btnFiltroCd7.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd8 !== "undefined" && btnFiltroCd8.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd9 !== "undefined" && btnFiltroCd9.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd10 !== "undefined" && btnFiltroCd10.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd11 !== "undefined" && btnFiltroCd11.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd12 !== "undefined" && btnFiltroCd12.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd13 !== "undefined" && btnFiltroCd13.attr('clicked') != "true" ) &&
			( typeof btnFiltroCd14 !== "undefined" && btnFiltroCd14.attr('clicked') != "true" )) {

			btnToggleFiltroCd.attr('clicked', false);
			btnToggleFiltroCd.find("img").attr("src", "img/index/btn_filtro_cd_u147.png");

		}

		else {
			btnToggleFiltroCd.attr('clicked', true);
			btnToggleFiltroCd.find("img").attr("src", "img/index/btn_filtro_cd_u147_selected.png");
		}
	}

	btnToggleFiltroCd.click(function(e) {

		e.preventDefault();

		if (btnFiltroCd1.attr("clicked") == "true") {
			btnFiltroCd1.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd1.attr("clicked", false);
		}
		
		if (btnFiltroCd2.attr("clicked") == "true") {
			btnFiltroCd2.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd2.attr("clicked", false);
		}
		
		if (btnFiltroCd3.attr("clicked") == "true") {
			btnFiltroCd3.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd3.attr("clicked", false);
		}
		
		if (btnFiltroCd4.attr("clicked") == "true") {
			btnFiltroCd4.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd4.attr("clicked", false);
		}
		
		if (btnFiltroCd5.attr("clicked") == "true") {
			btnFiltroCd5.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd5.attr("clicked", false);
		}
		
		if (btnFiltroCd6.attr("clicked") == "true") {
			btnFiltroCd6.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd6.attr("clicked", false);
		}
		
		if (btnFiltroCd7.attr("clicked") == "true") {
			btnFiltroCd7.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd7.attr("clicked", false);
		}
		
		if (btnFiltroCd8.attr("clicked") == "true") {
			btnFiltroCd8.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd8.attr("clicked", false);
		}
		
		if (btnFiltroCd9.attr("clicked") == "true") {
			btnFiltroCd9.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd9.attr("clicked", false);
		}
		
		if (btnFiltroCd10.attr("clicked") == "true") {
			btnFiltroCd10.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd10.attr("clicked", false);
		}
		
		if (btnFiltroCd11.attr("clicked") == "true") {
			btnFiltroCd11.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd11.attr("clicked", false);
		}
		
		if (btnFiltroCd12.attr("clicked") == "true") {
			btnFiltroCd12.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd12.attr("clicked", false);
		}
		
		if (btnFiltroCd13.attr("clicked") == "true") {
			btnFiltroCd13.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd13.attr("clicked", false);
		}
		
		if (btnFiltroCd14.attr("clicked") == "true") {
			btnFiltroCd14.find("img").attr("src", "img/index/u54.png");
			btnFiltroCd14.attr("clicked", false);
		}

		if ( $(this).attr("clicked") == "true" ) {
			filtros.cd = [];
			atualizar({});
		}

	});

	function newImageCd(cd) {
		cd.find("img").attr("src", "img/index/u54red.png");
		cd.attr('clicked', true);
		checkCds();
	}

	function oldImageCd(cd) {
		cd.find("img").attr("src", "img/index/u54.png");
		cd.attr('clicked', false);
		checkCds();
	}

	function changeImageCd(cd) {
		if (cd.attr('clicked') == "true") {
			oldImageCd(cd);
		}
		else {
			newImageCd(cd);
		}
	}

	btnFiltroCd1.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd2.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd3.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd4.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd5.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd6.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd7.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd8.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd9.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd10.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd11.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd12.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd13.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnFiltroCd14.click(function (e) {
		e.preventDefault();
		changeImageCd($(this));
		filtrarCd($(this));
	});

	btnToggleFiltroCd.click(function (e) {
		e.preventDefault();
		checkCds();
	});

	/*
	 * Controle / Distribuidores
	 */

	var btnFiltroDistribuidor1 = $('#u26');
	var btnFiltroDistribuidor2 = $('#u28');
	var btnFiltroDistribuidor3 = $('#u30');
	var btnFiltroDistribuidor4 = $('#u32');
	var btnFiltroDistribuidor5 = $('#u34');
	var btnFiltroDistribuidor6 = $('#u36');
	var btnFiltroDistribuidor7 = $('#u38');
	var btnFiltroDistribuidor8 = $('#u40');

	var btnToggleFiltroDistribuidor = $('#u760, #u760_img, #u761');

	btnFiltroDistribuidor1.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor2.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor3.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor4.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor5.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor6.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor7.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	btnFiltroDistribuidor8.click(function (e) {
		e.preventDefault();
		changeImageDistribuidor($(this));
		filtrarDistribuidor($(this));
	});

	function changeImageDistribuidor(distribuidor) {
		if (distribuidor.attr('clicked') == "true") {
			oldImageDistribuidor(distribuidor);
		}
		else {
			newImageDistribuidor(distribuidor);
		}
	}

	function newImageDistribuidor(distribuidor) {
		distribuidor.find("img").attr("src", "img/index/u28red.png");
		distribuidor.attr('clicked', true);
		checkDistribuidores();
	}

	function oldImageDistribuidor(distribuidor) {
		distribuidor.find("img").attr("src", "img/index/u28.png");
		distribuidor.attr('clicked', false);
		checkDistribuidores();
	}

	function checkDistribuidores() {

		if (( typeof btnFiltroDistribuidor1 !== "undefined" && btnFiltroDistribuidor1.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor2 !== "undefined" && btnFiltroDistribuidor2.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor3 !== "undefined" && btnFiltroDistribuidor3.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor4 !== "undefined" && btnFiltroDistribuidor4.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor5 !== "undefined" && btnFiltroDistribuidor5.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor6 !== "undefined" && btnFiltroDistribuidor6.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor7 !== "undefined" && btnFiltroDistribuidor7.attr('clicked') != "true" ) &&
			( typeof btnFiltroDistribuidor8 !== "undefined" && btnFiltroDistribuidor8.attr('clicked') != "true" )) {

			btnToggleFiltroDistribuidor.attr('clicked', false);
			btnToggleFiltroDistribuidor.find("img").attr("src", "img/index/btn_filtro_cd_u147.png");

		}

		else {
			btnToggleFiltroDistribuidor.attr('clicked', true);
			btnToggleFiltroDistribuidor.find("img").attr("src", "img/index/btn_filtro_cd_u147_selected.png");
		}

	}

	btnToggleFiltroDistribuidor.click(function(e) {

		e.preventDefault();

		if (btnFiltroDistribuidor1.attr("clicked") == "true") {
			btnFiltroDistribuidor1.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor1.attr("clicked", false);
		}

		if (btnFiltroDistribuidor2.attr("clicked") == "true") {
			btnFiltroDistribuidor2.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor2.attr("clicked", false);
		}

		if (btnFiltroDistribuidor3.attr("clicked") == "true") {
			btnFiltroDistribuidor3.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor3.attr("clicked", false);
		}

		if (btnFiltroDistribuidor4.attr("clicked") == "true") {
			btnFiltroDistribuidor4.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor4.attr("clicked", false);
		}

		if (btnFiltroDistribuidor5.attr("clicked") == "true") {
			btnFiltroDistribuidor5.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor5.attr("clicked", false);
		}

		if (btnFiltroDistribuidor6.attr("clicked") == "true") {
			btnFiltroDistribuidor6.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor6.attr("clicked", false);
		}

		if (btnFiltroDistribuidor7.attr("clicked") == "true") {
			btnFiltroDistribuidor7.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor7.attr("clicked", false);
		}

		if (btnFiltroDistribuidor8.attr("clicked") == "true") {
			btnFiltroDistribuidor8.find("img").attr("src", "img/index/u28.png");
			btnFiltroDistribuidor8.attr("clicked", false);
		}

		if ( $(this).attr("clicked") == "true" ) {
			filtros.distribuidor = [];
			atualizar({});
		}

	});

	/*
	 * Controle / SKUs
	 */

	var btnFiltroSku1 = $('#u153');
	var btnFiltroSku2 = $('#u155');
	var btnFiltroSku3 = $('#u157');
	var btnFiltroSku4 = $('#u159');
	var btnFiltroSku5 = $('#u161');
	var btnFiltroSku6 = $('#u163');
	var btnFiltroSku7 = $('#u165');
	var btnFiltroSku8 = $('#u167');
	var btnFiltroSku9 = $('#u169');
	var btnFiltroSku10 = $('#u171');
	var btnFiltroSku11 = $('#u173');
	var btnFiltroSku12 = $('#u175');
	var btnFiltroSku13 = $('#u177');
	var btnFiltroSku14 = $('#u179');
	var btnFiltroSku15 = $('#u181');
	var btnFiltroSku16 = $('#u183');
	var btnFiltroSku17 = $('#u185');
	var btnFiltroSku18 = $('#u187');
	var btnFiltroSku19 = $('#u189');
	var btnFiltroSku20 = $('#u191');
	var btnFiltroSku21 = $('#u193');
	var btnFiltroSku22 = $('#u195');
	var btnFiltroSku23 = $('#u197');
	var btnFiltroSku24 = $('#u199');
	var btnFiltroSku25 = $('#u201');
	var btnFiltroSku26 = $('#u203');
	var btnFiltroSku27 = $('#u205');
	var btnFiltroSku28 = $('#u207');
	var btnFiltroSku29 = $('#u209');
	var btnFiltroSku30 = $('#u211');
	var btnFiltroSku31 = $('#u213');
	var btnFiltroSku32 = $('#u215');
	var btnFiltroSku33 = $('#u217');
	var btnFiltroSku34 = $('#u219');
	var btnFiltroSku35 = $('#u221');
	var btnFiltroSku36 = $('#u223');
	var btnFiltroSku37 = $('#u225');
	var btnFiltroSku38 = $('#u227');
	var btnFiltroSku39 = $('#u229');
	var btnFiltroSku40 = $('#u231');
	var btnFiltroSku41 = $('#u233');
	var btnFiltroSku42 = $('#u235');
	var btnFiltroSku43 = $('#u237');
	var btnFiltroSku44 = $('#u239');
	var btnFiltroSku45 = $('#u241');
	var btnFiltroSku46 = $('#u243');
	var btnFiltroSku47 = $('#u245');
	var btnFiltroSku48 = $('#u247');
	var btnFiltroSku49 = $('#u249');
	var btnFiltroSku50 = $('#u251');
	var btnFiltroSku51 = $('#u253');
	var btnFiltroSku52 = $('#u255');
	var btnFiltroSku53 = $('#u257');
	var btnFiltroSku54 = $('#u259');
	var btnFiltroSku55 = $('#u261');
	var btnFiltroSku56 = $('#u263');
	var btnFiltroSku57 = $('#u265');
	var btnFiltroSku58 = $('#u267');
	var btnFiltroSku59 = $('#u269');
	var btnFiltroSku60 = $('#u271');
	var btnFiltroSku61 = $('#u273');
	var btnFiltroSku62 = $('#u275');
	var btnFiltroSku63 = $('#u277');
	var btnFiltroSku64 = $('#u279');
	var btnFiltroSku65 = $('#u281');
	var btnFiltroSku66 = $('#u283');
	var btnFiltroSku67 = $('#u285');
	var btnFiltroSku68 = $('#u287');
	var btnFiltroSku69 = $('#u289');
	var btnFiltroSku70 = $('#u291');
	var btnFiltroSku71 = $('#u293');
	var btnFiltroSku72 = $('#u295');
	var btnFiltroSku73 = $('#u297');
	var btnFiltroSku74 = $('#u299');
	var btnFiltroSku75 = $('#u301');
	var btnFiltroSku76 = $('#u303');
	var btnFiltroSku77 = $('#u305');
	var btnFiltroSku78 = $('#u307');
	var btnFiltroSku79 = $('#u309');
	var btnFiltroSku80 = $('#u311');
	var btnFiltroSku81 = $('#u313');
	var btnFiltroSku82 = $('#u315');
	var btnFiltroSku83 = $('#u317');
	var btnFiltroSku84 = $('#u319');
	var btnFiltroSku85 = $('#u321');
	var btnFiltroSku86 = $('#u323');
	var btnFiltroSku87 = $('#u325');
	var btnFiltroSku88 = $('#u327');
	var btnFiltroSku89 = $('#u329');
	var btnFiltroSku90 = $('#u331');
	var btnFiltroSku91 = $('#u333');
	var btnFiltroSku92 = $('#u335');
	var btnFiltroSku93 = $('#u337');
	var btnFiltroSku94 = $('#u339');
	var btnFiltroSku95 = $('#u341');
	var btnFiltroSku96 = $('#u343');
	var btnFiltroSku97 = $('#u345');
	var btnFiltroSku98 = $('#u347');
	var btnFiltroSku99 = $('#u349');
	var btnFiltroSku100 = $('#u351');
	var btnFiltroSku101 = $('#u353');
	var btnFiltroSku102 = $('#u355');
	var btnFiltroSku103 = $('#u357');
	var btnFiltroSku104 = $('#u359');
	var btnFiltroSku105 = $('#u361');
	var btnFiltroSku106 = $('#u363');
	var btnFiltroSku107 = $('#u365');
	var btnFiltroSku108 = $('#u367');
	var btnFiltroSku109 = $('#u369');
	var btnFiltroSku110 = $('#u371');
	var btnFiltroSku111 = $('#u373');
	var btnFiltroSku112 = $('#u375');
	var btnFiltroSku113 = $('#u377');
	var btnFiltroSku114 = $('#u379');
	var btnFiltroSku115 = $('#u381');
	var btnFiltroSku116 = $('#u383');
	var btnFiltroSku117 = $('#u385');
	var btnFiltroSku118 = $('#u387');
	var btnFiltroSku119 = $('#u389');
	var btnFiltroSku120 = $('#u391');
	var btnFiltroSku121 = $('#u393');
	var btnFiltroSku122 = $('#u395');
	var btnFiltroSku123 = $('#u397');
	var btnFiltroSku124 = $('#u399');
	var btnFiltroSku125 = $('#u401');
	var btnFiltroSku126 = $('#u403');
	var btnFiltroSku127 = $('#u405');
	var btnFiltroSku128 = $('#u407');
	var btnFiltroSku129 = $('#u409');
	var btnFiltroSku130 = $('#u411');
	var btnFiltroSku131 = $('#u413');
	var btnFiltroSku132 = $('#u415');
	var btnFiltroSku133 = $('#u417');
	var btnFiltroSku134 = $('#u419');
	var btnFiltroSku135 = $('#u421');
	var btnFiltroSku136 = $('#u423');
	var btnFiltroSku137 = $('#u425');
	var btnFiltroSku138 = $('#u427');
	var btnFiltroSku139 = $('#u429');
	var btnFiltroSku140 = $('#u431');
	var btnFiltroSku141 = $('#u433');
	var btnFiltroSku142 = $('#u435');
	var btnFiltroSku146 = $('#u443');
	var btnFiltroSku147 = $('#u445');
	var btnFiltroSku148 = $('#u447');
	var btnFiltroSku149 = $('#u449');
	var btnFiltroSku150 = $('#u451');
	var btnFiltroSku151 = $('#u453');

	var btnToggleFiltroSku = $('#u440, #u440_img, #u441');

	btnFiltroSku1.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku2.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku3.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku4.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku5.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku6.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku7.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku8.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku9.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku10.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku11.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku12.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku13.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku14.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku15.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku16.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku17.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku18.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku19.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku20.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku21.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku22.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku23.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku24.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku25.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku26.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku27.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku28.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku29.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku30.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku31.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku32.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku33.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku34.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku35.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku36.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku37.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku38.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku39.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku40.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku41.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku42.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku43.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku44.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku45.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku46.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku47.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku48.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku49.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku50.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku51.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku52.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku53.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku54.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku55.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku56.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku57.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku58.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku59.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku60.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku61.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku62.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku63.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku64.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku65.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku66.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku67.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku68.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku69.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku70.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku71.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku72.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku73.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku74.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku75.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku76.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku77.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku78.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku79.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku80.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku81.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku82.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku83.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku84.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku85.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku86.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku87.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku88.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku89.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku90.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku91.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku92.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku93.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku94.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku95.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku96.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku97.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku98.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku99.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku100.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku101.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku102.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku103.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku104.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku105.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku106.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku107.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku108.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku109.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku110.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku111.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku112.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku113.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku114.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku115.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku116.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku117.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku118.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku119.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku120.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku121.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku122.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku123.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku124.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku125.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku126.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku127.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku128.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku129.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku130.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku131.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku132.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku133.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku134.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku135.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku136.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku137.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku138.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku139.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku140.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku141.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku142.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku146.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku147.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku148.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku149.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku150.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	btnFiltroSku151.click(function (e) {
		e.preventDefault();
		changeImageSku($(this));
		checkSkus();
		filtrarSku($(this));
	});

	function changeImageSku(sku) {
		if (sku.attr('clicked') == "true") {
			oldImageSku(sku);
		}
		else {
			newImageSku(sku);
		}
	}

	function newImageSku(sku) {
		sku.find("img").attr("src", "img/index/u153red.png");
		sku.attr('clicked', true);
	}

	function oldImageSku(sku) {
		sku.find("img").attr("src", "img/index/u153.png");
		sku.attr('clicked', false);
	}

	function checkSkus() {

		if (

			( typeof btnFiltroSku1 !== "undefined" && btnFiltroSku1.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku2 !== "undefined" && btnFiltroSku2.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku3 !== "undefined" && btnFiltroSku3.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku4 !== "undefined" && btnFiltroSku4.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku5 !== "undefined" && btnFiltroSku5.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku6 !== "undefined" && btnFiltroSku6.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku7 !== "undefined" && btnFiltroSku7.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku8 !== "undefined" && btnFiltroSku8.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku9 !== "undefined" && btnFiltroSku9.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku10 !== "undefined" && btnFiltroSku10.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku11 !== "undefined" && btnFiltroSku11.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku12 !== "undefined" && btnFiltroSku12.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku13 !== "undefined" && btnFiltroSku13.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku14 !== "undefined" && btnFiltroSku14.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku15 !== "undefined" && btnFiltroSku15.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku16 !== "undefined" && btnFiltroSku16.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku17 !== "undefined" && btnFiltroSku17.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku18 !== "undefined" && btnFiltroSku18.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku19 !== "undefined" && btnFiltroSku19.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku20 !== "undefined" && btnFiltroSku20.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku21 !== "undefined" && btnFiltroSku21.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku22 !== "undefined" && btnFiltroSku22.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku23 !== "undefined" && btnFiltroSku23.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku24 !== "undefined" && btnFiltroSku24.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku25 !== "undefined" && btnFiltroSku25.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku26 !== "undefined" && btnFiltroSku26.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku27 !== "undefined" && btnFiltroSku27.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku28 !== "undefined" && btnFiltroSku28.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku29 !== "undefined" && btnFiltroSku29.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku30 !== "undefined" && btnFiltroSku30.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku31 !== "undefined" && btnFiltroSku31.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku32 !== "undefined" && btnFiltroSku32.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku33 !== "undefined" && btnFiltroSku33.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku34 !== "undefined" && btnFiltroSku34.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku35 !== "undefined" && btnFiltroSku35.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku36 !== "undefined" && btnFiltroSku36.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku37 !== "undefined" && btnFiltroSku37.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku38 !== "undefined" && btnFiltroSku38.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku39 !== "undefined" && btnFiltroSku39.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku40 !== "undefined" && btnFiltroSku40.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku41 !== "undefined" && btnFiltroSku41.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku42 !== "undefined" && btnFiltroSku42.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku43 !== "undefined" && btnFiltroSku43.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku44 !== "undefined" && btnFiltroSku44.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku45 !== "undefined" && btnFiltroSku45.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku46 !== "undefined" && btnFiltroSku46.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku47 !== "undefined" && btnFiltroSku47.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku48 !== "undefined" && btnFiltroSku48.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku49 !== "undefined" && btnFiltroSku49.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku50 !== "undefined" && btnFiltroSku50.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku51 !== "undefined" && btnFiltroSku51.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku52 !== "undefined" && btnFiltroSku52.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku53 !== "undefined" && btnFiltroSku53.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku54 !== "undefined" && btnFiltroSku54.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku55 !== "undefined" && btnFiltroSku55.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku56 !== "undefined" && btnFiltroSku56.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku57 !== "undefined" && btnFiltroSku57.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku58 !== "undefined" && btnFiltroSku58.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku59 !== "undefined" && btnFiltroSku59.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku60 !== "undefined" && btnFiltroSku60.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku61 !== "undefined" && btnFiltroSku61.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku62 !== "undefined" && btnFiltroSku62.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku63 !== "undefined" && btnFiltroSku63.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku64 !== "undefined" && btnFiltroSku64.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku65 !== "undefined" && btnFiltroSku65.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku66 !== "undefined" && btnFiltroSku66.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku67 !== "undefined" && btnFiltroSku67.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku68 !== "undefined" && btnFiltroSku68.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku69 !== "undefined" && btnFiltroSku69.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku70 !== "undefined" && btnFiltroSku70.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku71 !== "undefined" && btnFiltroSku71.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku72 !== "undefined" && btnFiltroSku72.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku73 !== "undefined" && btnFiltroSku73.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku74 !== "undefined" && btnFiltroSku74.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku75 !== "undefined" && btnFiltroSku75.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku76 !== "undefined" && btnFiltroSku76.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku77 !== "undefined" && btnFiltroSku77.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku78 !== "undefined" && btnFiltroSku78.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku79 !== "undefined" && btnFiltroSku79.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku80 !== "undefined" && btnFiltroSku80.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku81 !== "undefined" && btnFiltroSku81.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku82 !== "undefined" && btnFiltroSku82.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku83 !== "undefined" && btnFiltroSku83.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku84 !== "undefined" && btnFiltroSku84.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku85 !== "undefined" && btnFiltroSku85.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku86 !== "undefined" && btnFiltroSku86.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku87 !== "undefined" && btnFiltroSku87.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku88 !== "undefined" && btnFiltroSku88.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku89 !== "undefined" && btnFiltroSku89.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku90 !== "undefined" && btnFiltroSku90.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku91 !== "undefined" && btnFiltroSku91.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku92 !== "undefined" && btnFiltroSku92.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku93 !== "undefined" && btnFiltroSku93.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku94 !== "undefined" && btnFiltroSku94.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku95 !== "undefined" && btnFiltroSku95.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku96 !== "undefined" && btnFiltroSku96.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku97 !== "undefined" && btnFiltroSku97.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku98 !== "undefined" && btnFiltroSku98.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku99 !== "undefined" && btnFiltroSku99.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku100 !== "undefined" && btnFiltroSku100.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku101 !== "undefined" && btnFiltroSku101.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku102 !== "undefined" && btnFiltroSku102.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku103 !== "undefined" && btnFiltroSku103.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku104 !== "undefined" && btnFiltroSku104.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku105 !== "undefined" && btnFiltroSku105.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku106 !== "undefined" && btnFiltroSku106.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku107 !== "undefined" && btnFiltroSku107.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku108 !== "undefined" && btnFiltroSku108.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku109 !== "undefined" && btnFiltroSku109.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku110 !== "undefined" && btnFiltroSku110.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku111 !== "undefined" && btnFiltroSku111.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku112 !== "undefined" && btnFiltroSku112.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku113 !== "undefined" && btnFiltroSku113.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku114 !== "undefined" && btnFiltroSku114.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku115 !== "undefined" && btnFiltroSku115.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku116 !== "undefined" && btnFiltroSku116.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku117 !== "undefined" && btnFiltroSku117.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku118 !== "undefined" && btnFiltroSku118.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku119 !== "undefined" && btnFiltroSku119.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku120 !== "undefined" && btnFiltroSku120.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku121 !== "undefined" && btnFiltroSku121.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku122 !== "undefined" && btnFiltroSku122.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku123 !== "undefined" && btnFiltroSku123.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku124 !== "undefined" && btnFiltroSku124.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku125 !== "undefined" && btnFiltroSku125.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku126 !== "undefined" && btnFiltroSku126.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku127 !== "undefined" && btnFiltroSku127.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku128 !== "undefined" && btnFiltroSku128.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku129 !== "undefined" && btnFiltroSku129.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku130 !== "undefined" && btnFiltroSku130.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku131 !== "undefined" && btnFiltroSku131.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku132 !== "undefined" && btnFiltroSku132.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku133 !== "undefined" && btnFiltroSku133.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku134 !== "undefined" && btnFiltroSku134.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku135 !== "undefined" && btnFiltroSku135.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku136 !== "undefined" && btnFiltroSku136.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku137 !== "undefined" && btnFiltroSku137.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku138 !== "undefined" && btnFiltroSku138.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku139 !== "undefined" && btnFiltroSku139.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku140 !== "undefined" && btnFiltroSku140.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku141 !== "undefined" && btnFiltroSku141.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku142 !== "undefined" && btnFiltroSku142.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku146 !== "undefined" && btnFiltroSku146.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku147 !== "undefined" && btnFiltroSku147.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku148 !== "undefined" && btnFiltroSku148.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku149 !== "undefined" && btnFiltroSku149.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku150 !== "undefined" && btnFiltroSku150.attr('clicked') != "true" ) &&
			( typeof btnFiltroSku151 !== "undefined" && btnFiltroSku151.attr('clicked') != "true" )

		) {

			btnToggleFiltroSku.attr('clicked', false);
			btnToggleFiltroSku.find("img").attr("src", "img/index/btn_filtro_cd_u147.png");

		}

		else {
			btnToggleFiltroSku.attr('clicked', true);
			btnToggleFiltroSku.find("img").attr("src", "img/index/btn_filtro_cd_u147_selected.png");
		}

	}

	btnToggleFiltroSku.click(function(e) {

		var skuButtons = $('#u153, #u155, #u157, #u159, #u161, #u163, #u165, #u167, #u169, #u171, #u173, #u175, #u177, #u179, #u181, #u183, #u185, #u187, #u189, #u191, #u193, #u195, #u197, #u199, #u201, #u203, #u205, #u207, #u209, #u211, #u213, #u215, #u217, #u219, #u221, #u223, #u225, #u227, #u229, #u231, #u233, #u235, #u237, #u239, #u241, #u243, #u245, #u247, #u249, #u251, #u253, #u255, #u257, #u259, #u261, #u263, #u265, #u267, #u269, #u271, #u273, #u275, #u277, #u279, #u281, #u283, #u285, #u287, #u289, #u291, #u293, #u295, #u297, #u299, #u301, #u303, #u305, #u307, #u309, #u311, #u313, #u315, #u317, #u319, #u321, #u323, #u325, #u327, #u329, #u331, #u333, #u335, #u337, #u339, #u341, #u343, #u345, #u347, #u349, #u351, #u353, #u355, #u357, #u359, #u361, #u363, #u365, #u367, #u369, #u371, #u373, #u375, #u377, #u379, #u381, #u383, #u385, #u387, #u389, #u391, #u393, #u395, #u397, #u399, #u401, #u403, #u405, #u407, #u409, #u411, #u413, #u415, #u417, #u419, #u421, #u423, #u425, #u427, #u429, #u431, #u433, #u435, #u443, #u445, #u447, #u449, #u451, #u453');


		$.each(skuButtons, function() {

			var element = $('#' + this.getAttribute("id"));

			if ("true" == element.attr("clicked")) {
				element.find("img").attr("src", "img/index/u28.png");
				element.attr("clicked", false);
			}

		});

		if ( $(this).attr("clicked") == 'true' ) {
			filtros.sku = [];
			atualizar({});
		}

	});

	/*
	 * Controle / Famílias
	 */

	var btnFiltroFamilia1 = $('#u84');
	var btnFiltroFamilia2 = $('#u86');
	var btnFiltroFamilia3 = $('#u88');
	var btnFiltroFamilia4 = $('#u90');
	var btnFiltroFamilia5 = $('#u92');
	var btnFiltroFamilia6 = $('#u94');
	var btnFiltroFamilia7 = $('#u96');
	var btnFiltroFamilia8 = $('#u98');
	var btnFiltroFamilia9 = $('#u100');
	var btnFiltroFamilia10 = $('#u102');
	var btnFiltroFamilia11 = $('#u104');
	var btnFiltroFamilia12 = $('#u106');
	var btnFiltroFamilia13 = $('#u108');
	var btnFiltroFamilia14 = $('#u110');
	var btnFiltroFamilia15 = $('#u112');
	var btnFiltroFamilia16 = $('#u114');
	var btnFiltroFamilia17 = $('#u116');
	var btnFiltroFamilia18 = $('#u118');
	var btnFiltroFamilia19 = $('#u120');
	var btnFiltroFamilia20 = $('#u122');
	var btnFiltroFamilia21 = $('#u124');
	var btnFiltroFamilia22 = $('#u126');
	var btnFiltroFamilia23 = $('#u128');
	var btnFiltroFamilia24 = $('#u130');
	var btnFiltroFamilia25 = $('#u132');
	var btnFiltroFamilia26 = $('#u134');
	var btnFiltroFamilia27 = $('#u136');
	var btnFiltroFamilia28 = $('#u138');
	var btnFiltroFamilia29 = $('#u140');
	var btnFiltroFamilia30 = $('#u142');

	var btnToggleFiltroFamilia = $('#u149, #u149_img, #u150');

	btnFiltroFamilia1.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia2.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia3.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia4.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia5.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia6.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia7.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia8.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia9.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia10.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia11.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia12.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia13.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia14.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia15.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia16.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia17.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia18.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia19.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia20.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia21.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia22.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia23.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia24.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia25.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia26.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia27.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia28.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia29.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnFiltroFamilia30.click(function (e) {
		e.preventDefault();
		changeImageFamilia($(this));
		checkFamilias();
		filtrarFamilia($(this));
	});

	btnToggleFiltroFamilia.click(function(e) {

		e.preventDefault();

		if (btnFiltroFamilia1.attr('clicked') == 'true') { btnFiltroFamilia1.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia1.attr('clicked', false); }
		if (btnFiltroFamilia2.attr('clicked') == 'true') { btnFiltroFamilia2.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia2.attr('clicked', false); }
		if (btnFiltroFamilia3.attr('clicked') == 'true') { btnFiltroFamilia3.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia3.attr('clicked', false); }
		if (btnFiltroFamilia4.attr('clicked') == 'true') { btnFiltroFamilia4.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia4.attr('clicked', false); }
		if (btnFiltroFamilia5.attr('clicked') == 'true') { btnFiltroFamilia5.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia5.attr('clicked', false); }
		if (btnFiltroFamilia6.attr('clicked') == 'true') { btnFiltroFamilia6.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia6.attr('clicked', false); }
		if (btnFiltroFamilia7.attr('clicked') == 'true') { btnFiltroFamilia7.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia7.attr('clicked', false); }
		if (btnFiltroFamilia8.attr('clicked') == 'true') { btnFiltroFamilia8.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia8.attr('clicked', false); }
		if (btnFiltroFamilia9.attr('clicked') == 'true') { btnFiltroFamilia9.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia9.attr('clicked', false); }
		if (btnFiltroFamilia10.attr('clicked') == 'true') { btnFiltroFamilia10.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia10.attr('clicked', false); }
		if (btnFiltroFamilia11.attr('clicked') == 'true') { btnFiltroFamilia11.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia11.attr('clicked', false); }
		if (btnFiltroFamilia12.attr('clicked') == 'true') { btnFiltroFamilia12.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia12.attr('clicked', false); }
		if (btnFiltroFamilia13.attr('clicked') == 'true') { btnFiltroFamilia13.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia13.attr('clicked', false); }
		if (btnFiltroFamilia14.attr('clicked') == 'true') { btnFiltroFamilia14.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia14.attr('clicked', false); }
		if (btnFiltroFamilia15.attr('clicked') == 'true') { btnFiltroFamilia15.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia15.attr('clicked', false); }
		if (btnFiltroFamilia16.attr('clicked') == 'true') { btnFiltroFamilia16.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia16.attr('clicked', false); }
		if (btnFiltroFamilia17.attr('clicked') == 'true') { btnFiltroFamilia17.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia17.attr('clicked', false); }
		if (btnFiltroFamilia18.attr('clicked') == 'true') { btnFiltroFamilia18.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia18.attr('clicked', false); }
		if (btnFiltroFamilia19.attr('clicked') == 'true') { btnFiltroFamilia19.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia19.attr('clicked', false); }
		if (btnFiltroFamilia20.attr('clicked') == 'true') { btnFiltroFamilia20.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia20.attr('clicked', false); }
		if (btnFiltroFamilia21.attr('clicked') == 'true') { btnFiltroFamilia21.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia21.attr('clicked', false); }
		if (btnFiltroFamilia22.attr('clicked') == 'true') { btnFiltroFamilia22.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia22.attr('clicked', false); }
		if (btnFiltroFamilia23.attr('clicked') == 'true') { btnFiltroFamilia23.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia23.attr('clicked', false); }
		if (btnFiltroFamilia24.attr('clicked') == 'true') { btnFiltroFamilia24.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia24.attr('clicked', false); }
		if (btnFiltroFamilia25.attr('clicked') == 'true') { btnFiltroFamilia25.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia25.attr('clicked', false); }
		if (btnFiltroFamilia26.attr('clicked') == 'true') { btnFiltroFamilia26.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia26.attr('clicked', false); }
		if (btnFiltroFamilia27.attr('clicked') == 'true') { btnFiltroFamilia27.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia27.attr('clicked', false); }
		if (btnFiltroFamilia28.attr('clicked') == 'true') { btnFiltroFamilia28.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia28.attr('clicked', false); }
		if (btnFiltroFamilia29.attr('clicked') == 'true') { btnFiltroFamilia29.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia29.attr('clicked', false); }
		if (btnFiltroFamilia30.attr('clicked') == 'true') { btnFiltroFamilia30.find('img').attr('src', 'img/index/u84.png'); btnFiltroFamilia30.attr('clicked', false); }

		if( $(this).attr('clicked') == 'true' ) {
			filtros.familia = [];
			atualizar({});
		}

	});

	function changeImageFamilia(familia) {
		if (familia.attr('clicked') == "true") {
			oldImageFamilia(familia);
		}
		else {
			newImageFamilia(familia);
		}
	}

	function newImageFamilia(familia) {
		familia.find("img").attr("src", "img/index/u84red.png");
		familia.attr('clicked', true);
	}

	function oldImageFamilia(familia) {
		familia.find("img").attr("src", "img/index/u84.png");
		familia.attr('clicked', false);
	}

	function checkFamilias() {

		if (( typeof btnFiltroFamilia1 !== "undefined" && btnFiltroFamilia1.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia2 !== "undefined" && btnFiltroFamilia2.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia3 !== "undefined" && btnFiltroFamilia3.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia4 !== "undefined" && btnFiltroFamilia4.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia5 !== "undefined" && btnFiltroFamilia5.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia6 !== "undefined" && btnFiltroFamilia6.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia7 !== "undefined" && btnFiltroFamilia7.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia8 !== "undefined" && btnFiltroFamilia8.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia9 !== "undefined" && btnFiltroFamilia9.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia10 !== "undefined" && btnFiltroFamilia10.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia11 !== "undefined" && btnFiltroFamilia11.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia12 !== "undefined" && btnFiltroFamilia12.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia13 !== "undefined" && btnFiltroFamilia13.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia14 !== "undefined" && btnFiltroFamilia14.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia15 !== "undefined" && btnFiltroFamilia15.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia16 !== "undefined" && btnFiltroFamilia16.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia17 !== "undefined" && btnFiltroFamilia17.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia18 !== "undefined" && btnFiltroFamilia18.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia19 !== "undefined" && btnFiltroFamilia19.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia20 !== "undefined" && btnFiltroFamilia20.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia21 !== "undefined" && btnFiltroFamilia21.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia22 !== "undefined" && btnFiltroFamilia22.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia23 !== "undefined" && btnFiltroFamilia23.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia24 !== "undefined" && btnFiltroFamilia24.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia25 !== "undefined" && btnFiltroFamilia25.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia26 !== "undefined" && btnFiltroFamilia26.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia27 !== "undefined" && btnFiltroFamilia27.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia28 !== "undefined" && btnFiltroFamilia28.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia29 !== "undefined" && btnFiltroFamilia29.attr('clicked') != "true" ) &&
			( typeof btnFiltroFamilia30 !== "undefined" && btnFiltroFamilia30.attr('clicked') != "true" )) {

			btnToggleFiltroFamilia.attr('clicked', false);
			btnToggleFiltroFamilia.find("img").attr("src", "img/index/btn_filtro_cd_u147.png");

		}

		else {

			btnToggleFiltroFamilia.attr('clicked', true);
			btnToggleFiltroFamilia.find("img").attr("src", "img/index/btn_filtro_cd_u147_selected.png");

		}

	}

	/*
	 * Gerar / Relatórios
	 */

	var vendaMediaTotalTableDistribuidor = 0;
	var estoqueTotalTableDistribuidor = 0;

	var vendaMediaTotalTableFamilia = 0;
	var estoqueTotalTableFamilia = 0;

	var listaTotalizadora = Array.prototype;

	var mapDistribuidores = new Map();
	var mapFamilias = new Map();

	var setCds = new Set();
	var setSkus = new Set();

	var filtros = {};
	filtros.cd = [];
	filtros.distribuidor = [];
	filtros.familia = [];
	filtros.sku = [];

	function atualizar(filtro) {
		atualizarFiltro(filtro);
		generateReportDistribuidor();
		generateReportFamilia();
		sumarios();
	}

	function atualizarFiltro(filtro) {

		if (filtro.cd !== undefined) {

			if (filtros.cd.indexOf(filtro.cd) == -1) {
				filtros.cd.push(filtro.cd);
			}

			else {
				filtros.cd.pop(filtro.cd);
			}

		}

		if (filtro.distribuidor !== undefined) {

			if (filtros.distribuidor.indexOf(filtro.distribuidor) == -1) {
				filtros.distribuidor.push(filtro.distribuidor);
			}

			else {
				filtros.distribuidor.pop(filtro.distribuidor);
			}

		}

		if (filtro.familia !== undefined) {

			if (filtros.familia.indexOf(filtro.familia) == -1) {
				filtros.familia.push(filtro.familia);
			}

			else {
				filtros.familia.pop(filtro.familia);
			}

		}

		if (filtro.sku !== undefined) {

			if (filtros.sku.indexOf(filtro.sku) == -1) {
				filtros.sku.push(filtro.sku);
			}

			else {
				filtros.sku.pop(filtro.sku);
			}

		}

	}

	function recalcular() {

		listaTotalizadora = new Array();
		vendaMediaTotalTableDistribuidor = estoqueTotalTableDistribuidor = vendaMediaTotalTableFamilia = estoqueTotalTableFamilia = 0;

		$.each($("demandaCache"), function() {

			var cd = 0;
			var mes4 = 0;
			var mes3 = 0;
			var mes2 = 0;
			var mes1 = 0;
			var mes0 = 0;
			var estoqueTotal = 0;
			var distribuidor = 0;
			var familia = 0;
			var sku = 0;

			for (var i = 0; i < this.childNodes.length; i++) {

				if (this.children[i].localName.toLowerCase() == "cd".toLowerCase()) {
					cd = this.children[i].textContent;
				}

				if (this.children[i].localName.toLowerCase() == "mes4".toLowerCase()) {
					mes4 = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "mes3".toLowerCase()) {
					mes3 = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "mes2".toLowerCase()) {
					mes2 = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "mes1".toLowerCase()) {
					mes1 = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "mes0".toLowerCase()) {
					mes0 = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "estoqueTotal".toLowerCase()) {
					estoqueTotal = parseInt(this.children[i].textContent, 10);
				}

				if (this.children[i].localName.toLowerCase() == "distribuidor".toLowerCase()) {
					distribuidor = this.children[i].textContent;
				}

				if (this.children[i].localName.toLowerCase() == "familia".toLowerCase()) {
					familia = this.children[i].textContent;
				}

				if (this.children[i].localName.toLowerCase() == "sku".toLowerCase()) {
					sku = this.children[i].textContent;
				}

			}

			var vendaMedia = (( mes4 + mes3 + mes2 + mes1 + mes0 ) / 5 );

			var apresentar = false;

			var filtroCd = false;
			var filtroDistribuidor = false;
			var filtroFamilia = false;
			var filtroSku = false;

			var apresentarCd = false;
			var apresentarDistribuidor = false;
			var apresentarFamilia = false;
			var apresentarSku = false;

			if (( !filtros.cd || filtros.cd.length == 0 ) && ( !filtros.distribuidor || filtros.distribuidor.length == 0 ) && ( !filtros.familia || filtros.familia.length == 0 ) && ( !filtros.sku || filtros.sku.length == 0 )) {
				apresentar = true;
			}

			else {

				if (filtros.cd && filtros.cd.length > 0) {
					filtroCd = true;
					$.each(filtros.cd, function (index, value) {
						apresentarCd = value == cd;
					});
				}

				if (filtros.distribuidor && filtros.distribuidor.length > 0) {
					filtroDistribuidor = true;
					$.each(filtros.distribuidor, function (key, value) {
						apresentarDistribuidor = value == distribuidor;
					});
				}

				if (filtros.familia && filtros.familia.length > 0) {
					filtroFamilia = true;
					$.each(filtros.familia, function (key, value) {
						apresentarFamilia = value == familia;
					});
				}

				if (filtros.sku && filtros.sku.length > 0) {
					filtroSku = true;
					$.each(filtros.sku, function (key, value) {
						apresentarSku = value == sku;
					});
				}

				if (filtroCd && filtroDistribuidor && filtroFamilia && filtroSku) {
					apresentar = apresentarCd && apresentarDistribuidor && apresentarFamilia && apresentarSku;
				}

				else if (filtroCd && filtroDistribuidor && filtroFamilia) {
					apresentar = apresentarCd && apresentarDistribuidor && apresentarFamilia;
				}

				else if (filtroCd && filtroDistribuidor && filtroSku) {
					apresentar = apresentarCd && apresentarDistribuidor && apresentarSku;
				}

				else if (filtroCd && filtroFamilia && filtroSku) {
					apresentar = apresentarCd && apresentarFamilia && apresentarSku;
				}

				else if (filtroDistribuidor && filtroFamilia && filtroSku) {
					apresentar = apresentarDistribuidor && apresentarFamilia && apresentarSku;
				}

				else if (filtroCd && filtroDistribuidor) {
					apresentar = apresentarCd && apresentarDistribuidor;
				}

				else if (filtroCd && filtroFamilia) {
					apresentar = apresentarCd && apresentarFamilia;
				}

				else if (filtroCd && filtroSku) {
					apresentar = apresentarCd && apresentarSku;
				}

				else if (filtroDistribuidor && filtroFamilia) {
					apresentar =  apresentarDistribuidor && apresentarFamilia;
				}

				else if (filtroDistribuidor && filtroSku) {
					apresentar = apresentarDistribuidor && apresentarSku;
				}

				else if (filtroFamilia && filtroSku) {
					apresentar = apresentarFamilia && apresentarSku;
				}

				else if (filtroCd) {
					apresentar = apresentarCd;
				}

				else if (filtroDistribuidor) {
					apresentar = apresentarDistribuidor;
				}

				else if (filtroFamilia) {
					apresentar = apresentarFamilia;
				}

				else if (filtroSku) {
					apresentar = apresentarSku;
				}

			}

			if ( apresentar ) {

				listaTotalizadora.push({ "distribuidor" : distribuidor, "familia" : familia, "vendaMedia" : vendaMedia, "estoqueTotal" : estoqueTotal });
				vendaMediaTotalTableDistribuidor += vendaMedia;
				estoqueTotalTableDistribuidor += estoqueTotal;
				vendaMediaTotalTableFamilia += vendaMedia;
				estoqueTotalTableFamilia += estoqueTotal;
				setCds.add(cd);
				setSkus.add(sku);

			}

		})

	}

	function mapear() {

		mapDistribuidores.clear();
		mapFamilias.clear();

		$.each(listaTotalizadora, function() {

			var distribuidor = this['distribuidor'];
			var familia = this['familia'];

			var tempDistribuidor = mapDistribuidores.get(distribuidor);
			var tempFamilia = mapFamilias.get(familia);

			var dVendaMediaTemp = 0;
			var dEstoqueTotalTemp = 0;
			var fVendaMediaTemp = 0;
			var fEstoqueTotalTemp = 0;

			if (typeof tempDistribuidor == "undefined" ) {
				dVendaMediaTemp = this['vendaMedia'];
				dEstoqueTotalTemp = this['estoqueTotal'];
			}

			else {
				dVendaMediaTemp = this['vendaMedia'] + (isNaN(tempDistribuidor[0]) ? 0 : tempDistribuidor[0]) ;
				dEstoqueTotalTemp = this['estoqueTotal'] + (isNaN(tempDistribuidor[1]) ? 0 : tempDistribuidor[1]) ;
			}

			var dDiasEstoqueTemp = dEstoqueTotalTemp / dVendaMediaTemp * 30;

			if (typeof tempFamilia == "undefined" ) {
				fVendaMediaTemp = this['vendaMedia'];
				fEstoqueTotalTemp = this['estoqueTotal'];
			}

			else {
				fVendaMediaTemp = this['vendaMedia'] + (isNaN(tempFamilia[0]) ? 0 : tempFamilia[0]) ;
				fEstoqueTotalTemp = this['estoqueTotal'] + (isNaN(tempFamilia[1]) ? 0 : tempFamilia[1]) ;
			}

			var fDiasEstoqueTemp = fEstoqueTotalTemp / fVendaMediaTemp * 30;

			mapDistribuidores.set( distribuidor, [ dVendaMediaTemp, dEstoqueTotalTemp, dDiasEstoqueTemp ] );
			mapFamilias.set( familia, [ fVendaMediaTemp, fEstoqueTotalTemp, fDiasEstoqueTemp ] );

		});

	}

	function renderTableDistribuidor() {

		recalcular();
		mapear();

		var html = '' +

			'<div id="u443" class="ax_table" data-label="table">' +
			'   <div id="u444" class="ax_table_cell">' +
			'		<img id="u444_img" class="img " src="img/index/u444.png"/>' +
			'		<div id="u445" class="text">' +
			'			<p><span>TOTAL</span></p>' +
			'		</div>' +
			'	</div>' +
			'   <div id="u446" class="ax_table_cell">' +
			'   	<img id="u446_img" class="img " src="img/index/u446.png"/>' +
			'   	<div id="u447" class="text">' +
			'   		<p><span>' + Math.round(vendaMediaTotalTableDistribuidor).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u448" class="ax_table_cell">' +
			'   	<img id="u448_img" class="img " src="img/index/u448.png"/>' +
			'   	<div id="u449" class="text">' +
			'   		<p><span>' + Math.round(estoqueTotalTableDistribuidor).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u450" class="ax_table_cell">' +
			'   	<img id="u450_img" class="img " src="img/index/u450.png"/>' +
			'   	<div id="u451" class="text">' +
			'   		<p><span>' + Math.round(((estoqueTotalTableDistribuidor / vendaMediaTotalTableDistribuidor) * 30)).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u452" class="ax_table_cell">' +
			'   	<img id="u452_img" class="img " src="img/index/u452.png"/>' +
			'   	<div id="u453" class="text">' +
			'   		<p><span>DISTRIBUIDOR</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u454" class="ax_table_cell">' +
			'   	<img id="u454_img" class="img " src="img/index/u454.png"/>' +
			'   	<div id="u455" class="text">' +
			'   		<p><span>VENDA MÉDIA</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u456" class="ax_table_cell">' +
			'   	<img id="u456_img" class="img " src="img/index/u454.png"/>' +
			'   	<div id="u457" class="text">' +
			'   		<p><span>ESTOQUE TOTAL</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u458" class="ax_table_cell">' +
			'   	<img id="u458_img" class="img " src="img/index/u458.png"/>' +
			'   	<div id="u459" class="text">' +
			'   		<p><span>DIAS DE ESTOQUE</span></p>' +
			'   	</div>' +
			'   </div>';

			var i = 460;
			var j = i + 1;
			mapDistribuidores.forEach(function(value, key) {

				html +=
					'   <div id="u' + i + '" class="ax_table_cell">' +
					'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
					'	    <div id="u' + j + '" class="text">' +
					'	    	<p><span>' + key + '</span></p>' +
					'	    </div>' +
					'   </div>';
				i += 2;
				j += 2;
				html +=
					'   <div id="u' + i + '" class="ax_table_cell">' +
					'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
					'	    <div id="u' + j + '" class="text">' +
					'	    	<p><span>' + Math.round(value[0]).format(0, 3, '.') + '</span></p>' +
					'	    </div>' +
					'   </div>';
				i += 2;
				j += 2;
				html +=
					'   <div id="u' + i + '" class="ax_table_cell">' +
					'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
					'	    <div id="u' + j + '" class="text">' +
					'	    	<p><span>' + Math.round(value[1]).format(0, 3, '.') + '</span></p>' +
					'	    </div>' +
					'   </div>';
				i += 2;
				j += 2;
				html +=
					'   <div id="u' + i + '" class="ax_table_cell">' +
					'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
					'	    <div id="u' + j + '" class="text">' +
					'	    	<p><span>' + Math.round(value[2]).format(0, 3, '.') + '</span></p>' +
					'	    </div>' +
					'   </div>';
				i += 2;
				j += 2;
			});

		html += '</div>';
		return html;

	}

	function renderTableFamilia() {

		recalcular();
		mapear();

		var html = '' +

			'<div id="u525" class="ax_table" data-label="table">' +
			'   <div id="u526" class="ax_table_cell">' +
			'		<img id="u526_img" class="img " src="img/index/u448.png"/>' +
			'		<div id="u527" class="text">' +
			'			<p><span>TOTAL</span></p>' +
			'		</div>' +
			'	</div>' +
			'   <div id="u528" class="ax_table_cell">' +
			'   	<img id="u528_img" class="img " src="img/index/u448.png"/>' +
			'   	<div id="u529" class="text">' +
			'   		<p><span>' + Math.round(vendaMediaTotalTableFamilia).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u530" class="ax_table_cell">' +
			'   	<img id="u530_img" class="img " src="img/index/u448.png"/>' +
			'   	<div id="u531" class="text">' +
			'   		<p><span>' + Math.round(estoqueTotalTableFamilia).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u532" class="ax_table_cell">' +
			'   	<img id="u532_img" class="img " src="img/index/u450.png"/>' +
			'   	<div id="u533" class="text">' +
			'   		<p><span>' + Math.round(((estoqueTotalTableFamilia / vendaMediaTotalTableFamilia) * 30)).format(0, 3, '.') + '</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u534" class="ax_table_cell">' +
			'   	<img id="u534_img" class="img " src="img/index/u534.png"/>' +
			'   	<div id="u535" class="text">' +
			'   		<p><span>FAMÍLIA</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u536" class="ax_table_cell">' +
			'   	<img id="u536_img" class="img " src="img/index/u454.png"/>' +
			'   	<div id="u537" class="text">' +
			'   		<p><span>VENDA MÉDIA</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u538" class="ax_table_cell">' +
			'   	<img id="u538_img" class="img " src="img/index/u454.png"/>' +
			'   	<div id="u457" class="text">' +
			'   		<p><span>ESTOQUE TOTAL</span></p>' +
			'   	</div>' +
			'   </div>' +
			'   <div id="u458" class="ax_table_cell">' +
			'   	<img id="u458_img" class="img " src="img/index/u458.png"/>' +
			'   	<div id="u539" class="text">' +
			'   		<p><span>DIAS DE ESTOQUE</span></p>' +
			'   	</div>' +
			'   </div>';

		var i = 542;
		var j = i + 1;
		mapFamilias.forEach(function(value, key) {

			html +=
				'   <div id="u' + i + '" class="ax_table_cell">' +
				'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
				'	    <div id="u' + j + '" class="text">' +
				'	    	<p><span>' + key + '</span></p>' +
				'	    </div>' +
				'   </div>';
			i += 2;
			j += 2;
			html +=
				'   <div id="u' + i + '" class="ax_table_cell">' +
				'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
				'	    <div id="u' + j + '" class="text">' +
				'	    	<p><span>' + Math.round(value[0]).format(0, 3, '.') + '</span></p>' +
				'	    </div>' +
				'   </div>';
			i += 2;
			j += 2;
			html +=
				'   <div id="u' + i + '" class="ax_table_cell">' +
				'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
				'	    <div id="u' + j + '" class="text">' +
				'	    	<p><span>' + Math.round(value[1]).format(0, 3, '.') + '</span></p>' +
				'	    </div>' +
				'   </div>';
			i += 2;
			j += 2;
			html +=
				'   <div id="u' + i + '" class="ax_table_cell">' +
				'	    <img id="u' + i + '_img" class="img " src="img/index/u448.png"/>' +
				'	    <div id="u' + j + '" class="text">' +
				'	    	<p><span>' + Math.round(value[2]).format(0, 3, '.') + '</span></p>' +
				'	    </div>' +
				'   </div>';
			i += 2;
			j += 2;
		});

		html += '</div>';
		return html;

	}

	function generateReportDistribuidor() {
		$('#u442').html(function() {
			return '' +
				'<div id="u442_state0" class="panel_state" data-label="State1">' +
				'   <div id="u442_state0_content" class="panel_state_content">' +
				'       ' + renderTableDistribuidor() +
				'   </div>' +
				'</div>';
		});
	}

	function generateReportFamilia() {
		$('#u524').html(function() {
			return '' +
				'<div id="u524_state0" class="panel_state" data-label="State1">' +
				'   <div id="u524_state0_content" class="panel_state_content">' +
				'       ' + renderTableFamilia() +
				'   </div>' +
				'</div>';
		});
	}

	generateReportDistribuidor({});
	generateReportFamilia({});
	sumarios();

	function filtrarCd(btnFiltroCd) {
		atualizar({ cd : btnFiltroCd.find('p').text() })
	}

	function filtrarDistribuidor(btnFiltroDistribuidor) {
		atualizar({ distribuidor : btnFiltroDistribuidor.find('p').text() })
	}

	function filtrarFamilia(btnFiltroFamilia) {
		atualizar({ familia : btnFiltroFamilia.find('p').text() })
	}

	function filtrarSku(btnFiltroSku) {
		atualizar({ sku : btnFiltroSku.find('p').text() })
	}

	function sumarios() {

		$('#u770').first().first().text(mapDistribuidores.size + " Distribuidores");
		$('#u786').first().first().text(mapFamilias.size + " Famílias");

		$('#u774').first().first().text(setCds.size + " Cds");
		$('#u782').first().first().text(setSkus.size + " Skus");

		var vendaMediaTotal =  ( vendaMediaTotalTableDistribuidor + vendaMediaTotalTableFamilia ) / 2;
		var estoqueTotal =  ( estoqueTotalTableDistribuidor + estoqueTotalTableFamilia ) / 2;
		var diasDeEstoqueTotal = ( estoqueTotal / vendaMediaTotal ) * 30;

		$('#u778').first().first().text(Math.round(isNaN(vendaMediaTotal) ? 0 : vendaMediaTotal).format(0, 3, '.') + " Venda Média");
		$('#u790').first().first().text(Math.round(isNaN(estoqueTotal) ? 0 : estoqueTotal).format(0, 3, '.') + " Estoque Total");
		$('#u792').first().first().text(Math.round(isNaN(diasDeEstoqueTotal) ? 0 : diasDeEstoqueTotal).format(0, 3, '.') + " Dias de Estoque");

	}

});
