/* French initialisation for the jQuery UI date picker plugin. */
define(['jquery','DMPSegment/config'],
	
	function($, conf) {
		
		$.datepicker.regional['fr'] = {
			closeText: 'Fermer',
			prevText: 'Pr&eacute;c&eacute;dent',
			nextText: 'Suivant',
			currentText: 'Aujourd\'hui',
			monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
			'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
			monthNamesShort: ['Janv.','Fevr.','Mars','Avril','Mai','Juin',
			'Juil.','Aout','Sept.','Oct.','Nov.','Dec.'],
			dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
			dayNamesMin: ['D','L','M','M','J','V','S'],
			weekHeader: 'Sem.',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};

		$.datepicker.setDefaults($.datepicker.regional['fr']);
		
		
	}
);
