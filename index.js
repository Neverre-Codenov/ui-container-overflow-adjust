function isOverflowed( box ) {
    return( (box.scrollHeight > box.clientHeight) || (box.scrollWidth > box.clientWidth) );
}

function adjustFontsize () {

    const BOX_LIST      = document.getElementsByClassName("test-class");
    const MIN_FONT_SIZE = 6;
    const STEP_SIZE     = 2;
    var   size, newSize;

    Array.prototype.forEach.call(
        BOX_LIST,
        function (box) {
            box.style.fontSize = "";
        }
    );

    newSize = size = parseInt( window.getComputedStyle(BOX_LIST[0],null).getPropertyValue("font-size") );

    Array.prototype.forEach.call(
        BOX_LIST,
        function( box ) {
            box.style.fontSize = size + "px";
            while ( size > MIN_FONT_SIZE ) {
                if( isOverflowed(box) ) {
                    size -= STEP_SIZE;
                    box.style.fontSize = size + "px";
                } else {
                    break;
                }
            }
            newSize = Math.min( newSize, size );
        }
    );

    Array.prototype.forEach.call(
        BOX_LIST,
        function (box) {
            box.style.fontSize = newSize + "px";
        }
    );

}


( function() {
    document.addEventListener( "DOMContentLoaded", function (event) { adjustFontsize(); } );
    var resizeTimeout = null;
    window.addEventListener( "resize", function (event) {
        if( resizeTimeout !== null ) {
            clearTimeout( resizeTimeout );
        }
        resizeTimeout = setTimeout( function () {
            adjustFontsize();
        }, 20);
    } );
} )();
