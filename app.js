"use strict";  
//scope object contains the input elements flagged with data-* tag "data-tw-bind"
var log, changePropByCode;
(function() {

    var element_types = ["button","checkbox","color","date","datetime-local","email","file","image","month","number","password","radio","range","tel","text","time","url","week","textarea","select"];
    var elements = document.querySelectorAll('[data-tw-bind]'),
        scope = {};
    console.log(elements);
    elements.forEach(function(element) {
        //execute scope setter
        //if(element.type === 'text'|| element.type === 'textarea'){
        if(element_types.indexOf(element.type) >= 0){
            var propToBind = element.getAttribute('data-tw-bind');
            addScopeProp(propToBind);       //add html page data-* elements of input type to scope object
            element.onkeyup = function(){   //attach event handler to the element - State2Object 
                scope[propToBind] = element.value;
            }
        };

        //bind prop to elements
        function addScopeProp(prop){
            //add property if needed
            if(!scope.hasOwnProperty(prop)){
                //value to populate with newvalue
                var value;
                Object.defineProperty(scope, prop, {
                    set: function (newValue) {
                        value = newValue;
                        elements.forEach(function(element){
                            //change value to binded elements
                            if(element.getAttribute('data-tw-bind') === prop){ //only if element is prop
                                //State2Object - Add-update entered key/value to scope object if current element is input field
                                if(element.type && (element_types.indexOf(element.type) >= 0)){
                                    element.value = newValue;
                                }
                                //Object2State - display assigned value on page if current element is output field
                                else if(!element.type){
                                    element.innerHTML = newValue; 
                                    // console.log("executed");
                                }
                            }
                        });
                    },
                    get: function(){
                        return value;
                    },
                    enumerable: true
                });
            }
        }
    });

    //Object2ConsoleLog - Dump added/updated Object values to console log
    log = function() {
        Object.keys(scope).forEach(function(key){
            console.log(key + ': ' + scope[key]);
        });
    }

    //State2Object - assign value to specific Object key (Name)
    changePropByCode = function(propToBind,newValue) {
        scope[propToBind] = newValue;
    }

})();