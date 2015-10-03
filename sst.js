(function() {

	'use strict';

	var elementArray = [];

	function applyDirectStyles(element, styles) {
		var thiskey;
		for(var j = 0, jk = Object.keys(styles), jl = jk.length; j < jk.length; j++) {
			thiskey = jk[j];
			element.style[thiskey] = styles[thiskey];
		}		
		return element;
	}
	
	function listElements(qSA) {

		// don't show more than <sanity> elements in list
		var sanity = 1000;

		if(elementArray.length) {
			// reset any remaining outlines on elements before clearing the array
			elementArray.forEach(function(e) {
				e.style.outline = '';
			});
		}
		elementArray = [];

		m.style.backgroundColor = '#9f9';
		m.fontStyle = '';
		if(qSA.length <= sanity) {
			m.innerHTML = qSA.length + ' Matching Elements';
		} else {
			m.innerHTML = qSA.length + ' Matching Elements <span class="lighter-text">(' + sanity + ' shown)</span>';
		}
		var elementHtml = '';
		var elementId = 0;
		var thisElement;
		for(var k = 0, kl = (qSA.length <= sanity) ? qSA.length : sanity; k < kl; k++) {
			thisElement = qSA[k];
			elementArray[++elementId] = thisElement;
			elementHtml += '<div class="element" data-elementid="' + elementId + '">';
			elementHtml += '<a href="#" class="elementtag"><strong>' + thisElement.tagName + '</strong></a>';
			if(thisElement.id.length) {
				elementHtml += '<a href="#" class="elementid">#' + thisElement.id + '</a>';
			}
			var classListLength = thisElement.classList.length;
			if(classListLength) {
				elementHtml += '<span class="elementclasses">';
				for( var j = 0; j < classListLength; j++ ) {
					elementHtml += '<a href="#" class="elementclass">.' + thisElement.classList.item(j) + '</a>';
				}
				elementHtml += '</span>';
			}
			elementHtml += '</div>';
		}
		el.innerHTML = elementHtml;
	}

	function infoMessage(themessage) {
		m.style.backgroundColor = '#ff9';
		m.fontStyle = 'italic';
		m.innerHTML = themessage;
	}
	
	function errorMessage(themessage) {
		m.style.backgroundColor = '#f99';
		m.fontStyle = 'italic';
		m.innerHTML = themessage;
	}
	
	var c = document.createElement('DIV');
	c.id = 'classtester-container';
	applyDirectStyles(c, {
		position: "fixed",
		bottom: "20px",
		left: "30px",
		zIndex: "999"
	});
	
	document.body.appendChild(c);

	c.innerHTML = '<div id="classtester-elements"> </div><div id="classtester-messages"> </div><div id="classtester-input"> <input id="classtester" type="text" /> </div>';

	var m = document.getElementById('classtester-messages');
	applyDirectStyles(m, {
		boxShadow: "0 0 22px #aaaaaa",
		padding: "4px 8px"
	});
	
	var el = document.getElementById('classtester-elements');
	applyDirectStyles(el, {
		boxShadow: "0 0 22px #aaaaaa",
		padding: "0",
		maxHeight: "400px",
		overflow: "auto",
		backgroundColor: "#ffffff"
	});
	
	var cc = document.getElementById('classtester-input');
	applyDirectStyles(cc, { boxShadow: "0 0 22px #aaaaaa" });
	
	var i = document.getElementById('classtester');
	i.type = 'text';
	i.id = 'classtester';
	applyDirectStyles(i, {
		width: "100%",
		minWidth: "300px",
		height: "30px",
		fontSize: "20px",
		padding: "4px 8px",
		margin: "0",
		backgroundColor: "#ffffff",
		color: "#444444"
	});
	var oldselector = '';

	function updateElementList() {
		var thisValue = this.value;
		if(thisValue.length) {
			try {
				var qsA = document.querySelectorAll(this.value);
			} catch(ex) { 
				errorMessage('Invalid Selector');
				el.innerHTML = ' ';
				return true;
			}
			if( qsA.length ) {
				listElements(qsA);
				return true;
			} else {
				infoMessage('No Matching Elements');
			}
		} else {
			infoMessage('Type a CSS selector to begin');
		}
		el.innerHTML = ' ';
	}
	
	i.onkeyup = function(e) {
		updateElementList.apply(this);
	};
	
	function delegateEventByClass(eventname, container, classes, callback) {
		container['on' + eventname] = function(event) {
			event = event || window.event;
			event.preventDefault();
			var target = event.target || event.srcElement;
			if(typeof classes === "string") {
				classes = [classes];
			}
			var targetClasses;
			while(target && target != container) { 
				targetClasses = ' ' + target.className + ' ';
				for(var j = 0, jl = classes.length; j < jl; j++) {
					if(targetClasses.indexOf(' ' + classes[j] + ' ') > -1) {
						callback.apply(target);
						break;
					}
				}
				target = target.parentNode;
			}
		};
	}

	delegateEventByClass('click', el, ['elementclass', 'elementtag', 'elementid'], function(event) {
		i.value = this.textContent;
		updateElementList.apply(i);
		return false;
	});
	
	el.onmouseover = function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
	    while(target != el) { 
			if (target.dataset && target.dataset.elementid) { 
				var thisElement = elementArray[target.dataset.elementid];
				if(typeof thisElement === 'object' && thisElement.nodeName) {
					thisElement.style.outline = target.style.outline = '2px solid dodgerblue';
				}
				return true;
			}
			target = target.parentNode;
		}
	};

	el.onmouseout = function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
	    while(target != el) { 
			if (target.dataset && target.dataset.elementid) { 
				var thisElement = elementArray[target.dataset.elementid];
				if(typeof thisElement === 'object' && thisElement.nodeName) {
					thisElement.style.outline = target.style.outline = '';
				}
				return true;
			}
			target = target.parentNode;
		}
	};

	var ssindex = document.styleSheets.length;
	var styleSheet = document.styleSheets[ssindex - 1];
	styleSheet.insertRule('#classtester-container .element { padding: 4px 8px; margin: 2px; border: 1px solid #dddddd; background-color: #eeeeff; box-shadow: 0 0 22px #ffffff; }', 0);
	styleSheet.insertRule('#classtester-container .element .elementid { color: #008800; }', 0);
	styleSheet.insertRule('#classtester-container .element .elementclass { color: #664400; }', 0);
	styleSheet.insertRule('#classtester-container .element .elementtag { color: #444444; }', 0);
	styleSheet.insertRule('#classtester-container a:hover { text-decoration: underline; }', 0);
	styleSheet.insertRule('#classtester-container .lighter-text { color: #999999 !important; }', 0);
	
	infoMessage('Type a CSS selector to begin');
	
})();
