/**
 * module  DOM/traverse
 */
 
;(function(K){

// TEMP!
function createSelectorObject(expression, combinator){
	if (!expression) return combinator;

	expression = SELECTOR.parse(expression);

	var expressions = expression.expressions;
	for (var i = expressions.length; i--;){
		expressions[i][0].combinator = combinator;
	}

	return expression;
};


var 

DOM = K.DOM,

SELECTOR = K.S,

TRAVERSING_CONFIG = {

	/**
	 * @type {string} op selector operator
	 * @type {boolean=} f whether only get the first
	 */
	prev: {
		op: '!~',
		f: true
	},
	
	prevAll: {
		op: '!~'
	},
	
	next: {
		op: '~',
		f: true
	},
	
	nextAll: {
		op: '~'
	},
	
	child: {
		op: '>',
		f: true
	},
	
	// different with .all, return the direct offsprings
	children: {
		op: '>'	
	},
	
	parent: {
		op: '!',
		f: true
	},
	
	parents: {
		op: '!'
	}
};

K.each(TRAVERSING_CONFIG, function(cfg, key){
	this[key] = function(selector){
		return new DOM(
			SELECTOR.find(
				createSelectorObject(selector, cfg.op), 
				
				// these accessors only traverse the first element of current matches
				this.context.slice(0, 1), 
				cfg.f
			) 
		);
	}
});


/**
 * the traversing methods below will create a completely new Object
 * suppose this situation:
 
 <code>
 var container = $.one('#container'),
 	 parent = container.parent();
 
 // container and parent must be different
 
 </code>
 
 */
DOM.extend(TRAVERSING_CONFIG).extend({

	// @return {Object} the new DOM instance with the first element of the current matches
	first: function(){
		return DOM( this[0] );
	},
	
	// @return {Object} the new DOM instance with the last element of the current matches
	last: function(){
		return DOM( this[this.length - 1] );
	},
	
	/**
	 * @param {Element|KM.DOM} node
	 */
	has: function(node){
		node = DOM(node)[0];
		
		return !!node && !this.context.every(function(el){
		
			// if the node is included in one of the contexts, stop traversing
			return !SELECTOR.contains(el, node);
		});
	}
	
});


})(KM);


/**
 change log:
 
 2011-10-11  Kael:
 - optimize for compression
 - fix a syntax error
 
 
 */