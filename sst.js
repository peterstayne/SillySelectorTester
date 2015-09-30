(function() {

	function listElements(qsA) {
		m.style.backgroundColor = '#9f9';
		m.fontStyle = '';
		m.innerHTML = qsA.length + ' Matching Elements';
		var elementHtml = '';
		[].forEach.call(qsA, function(thisElement) {
			elementHtml += '<div class="element">';
			elementHtml += '<strong>' + thisElement.tagName + '</strong>';
			if(thisElement.id.length) {
				elementHtml += '<span class="elementid">#' + thisElement.id + '</span>';
			}
			var classListLength = thisElement.classList.length;
			if(classListLength) {
				elementHtml += '<span class="elementclasses">';
				for( var j = 0; j < classListLength; j++ ) {
					elementHtml += '<a href="javascript:void(0)" class="elementclass">.' + thisElement.classList.item(j) + '</a>';
				}
				elementHtml += '</span>';
			}
			elementHtml += '</div>';
		});
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
	c.style.position = "fixed";
	c.style.bottom = "20px";
	c.style.left = "30px";
	c.style.zIndex = "999";
	
	document.body.appendChild(c);

	c.innerHTML = '<div id="classtester-elements"> </div><div id="classtester-messages"> </div><div id="classtester-input"> <input id="classtester" type="text" /> </div>';

	var m = document.getElementById('classtester-messages');
	m.style.boxShadow = "0 0 22px #aaaaaa";
	m.style.padding = '4px 8px';
	
	var el = document.getElementById('classtester-elements');
	el.style.boxShadow = "0 0 22px #aaaaaa";
	el.style.padding = '0';
	el.style.maxHeight = '400px';
	el.style.overflow = 'auto';
	
	var cc = document.getElementById('classtester-input');
	cc.style.boxShadow = "0 0 22px #aaaaaa";
	
	var i = document.getElementById('classtester');
	i.type = 'text';
	i.id = 'classtester';
	i.style.width = "100%";
	i.style.minWidth = "300px";
	i.style.height = "30px";
	i.style.fontSize = "20px";
	i.style.padding = '4px 8px';
	i.style.backgroundColor = "#fff";
	i.style.color = "#444444";
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
	
	el.onclick = function(event) {
		event = event || window.event;
		var target = event.target || event.srcElement;
	    while(target != table) { 
			if (target.classList.contains('elementclass')) {
				i.value = target.innerText;
				updateElementList.apply(i);
				return true;
			}
			target = target.parentNode;
		}
	}
	
	var ssindex = document.styleSheets.length;
	var styleSheet = document.styleSheets[ssindex - 1];
	styleSheet.insertRule('#classtester-container .element { padding: 4px 8px; border: 1px solid #dddddd; background-color: #eeeeff; box-shadow: 0 0 22px #ffffff; }', 0);
	styleSheet.insertRule('#classtester-container .element .elementid { color: #008800; }', 0);
	styleSheet.insertRule('#classtester-container .element .elementclasses { color: #664400; }', 0);
	
	infoMessage('Type a CSS selector to begin');
	
})()
