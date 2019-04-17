$( document ).ready( function ( $ ) {

	// Object Polyfill for IE
	if (typeof Object.assign != 'function') {
		// Must be writable: true, enumerable: false, configurable: true
		Object.defineProperty(Object, "assign", {
			value: function assign(target, varArgs) { // .length of function is 2
				'use strict';
				if (target == null) { // TypeError if undefined or null
					throw new TypeError('Cannot convert undefined or null to object');
				}

				var to = Object(target);

				for (var index = 1; index < arguments.length; index++) {
					var nextSource = arguments[index];

					if (nextSource != null) { // Skip over if undefined or null
						for (var nextKey in nextSource) {
							// Avoid bugs when hasOwnProperty is shadowed
							if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
				}
				return to;
			},
			writable: true,
			configurable: true
		});
	}

	// Grocery List challenge script
	$.getJSON( 'assets/json/groceries.json', function ( grocery ) {

		// Loop through the groceries object
		for( var i = 0; i < grocery.length; i++ ) {

			// Create each item from the groceries object with category and item class for CSS targeting
			$('#groceries').append('<div class="grocery-category ' + grocery[i].category + ' item-' + ( i + 1 ) + '">');

			// Populate the div with data from the groceries object
			$('.item-' + ( i + 1 ) )
				.append('<div class="title"><i><svg><use xlink:href="#ico-' + grocery[i].category + '" /></svg></i><h3>'+ grocery[i].category + '</h3></div>')
				.append('<h4>' + grocery[i].item + '</h4>')
				.append('<h4>' + grocery[i].type + '</h4>')
				.append('<h4>' + grocery[i].brand + '</h4>')
				.append('<h4>' + grocery[i].qty + '</h4>')
				.append('</div>');
		}
	} );
} );
