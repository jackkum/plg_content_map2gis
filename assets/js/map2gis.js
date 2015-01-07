
;(function($){
	
	$(function(){
		$(document.head).append(
			$('<script/>',{
				'src': 'http://maps.api.2gis.ru/2.0/loader.js?pkg=full',
				'data-id': 'dgLoader'
			}).on('load', function(){
				
			})
		);
	});
	
	function map2gis(options)
	{
		this.options = $.extend({ 
			location: null,
			coords: [54.98, 82.89],
			zoom: 13,
			title: null
		}, options );
		
		this.elements = {};
		this.container = null;
	};
	
	map2gis.prototype.init = function(map)
	{
		var id = $(this).prop('id');
		
		if(typeof(DG) === 'undefined'){
			var self = this;
			window.setTimeout(function(){
				map.init.call(self,map);
			}, 300);
			return;
		}
		
		DG.then(function () {
			map.container = DG.map(
				id, 
				{
					"center": map.options.coords,
					"zoom": map.options.zoom
				}
			);
	
			if(map.options === ''){
				map.container.addLayer(
					DG.marker(
						map.options.coords,
						{
							title: map.options.title
						}
					)
				);
			} else {
				DG.popup({
					closeButton: false
				})
				.setLatLng(map.options.coords)
				.setContent(map.options.title + "&nbsp;&nbsp;&nbsp;")
				.openOn(map.container);
			}
			
			/*
			DG.ajax({
				url: 'http://catalog.api.2gis.ru/geo/search',
				data: {
					key: '12345',
					version: 1.3,
					q: map.options.location
				},
				type: 'GET',
				success: function(data) {
					point = DG.Wkt.toPoints(data.result[0].centroid);
					// извлекаем координаты для маркера
					lng = point[0];
					lat = point[1];
					// создаем и добавляем маркер на карту
					marker = DG.marker([lat, lng]);
					map.addLayer(marker);
					// центрируем карту в координаты маркера
					map.panTo([lat, lng]);
				},
				error: function(error) {
					console.log(error);
				}
			});
			*/
		});
	};
	
	$.fn.map2gis = function(options)
	{
		var map = new map2gis(options);
		return this.each(function(){
			map.init.call(this,map);
		});
	};
})(jQuery);
