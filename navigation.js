const startingPoint = document.getElementById( 'starting-point' );

setTimeout( ( ) => startingPoint.scrollIntoView( ), 10 );


const cityLinks = document.querySelectorAll( '.cityElements a[href]' );
const contentOutput = document.getElementById( 'page-content' );

contentOutput.addEventListener( 'click', ( ) => {
    contentOutput.classList.remove( 'intro-page' );
    contentOutput.innerHTML = '';

    document.documentElement.classList.remove( 'content-display' );
}, { once: true } );

const closeContent = event => {
    event.preventDefault( );

    contentOutput.innerHTML = '';

    document.documentElement.classList.remove( 'content-display' );
}

let history = [ ];

const loadContent = event => {
    event.preventDefault( );

    const url = event.currentTarget.href;
    console.log( url );


    // UPDATE HISTORY
    let pageIndex = url.split( '/' ).pop( );
    pageIndex = pageIndex.split( '-' )[ 0 ];
    pageIndex = parseInt( pageIndex );

    history.push( pageIndex );

    // SHOW LINES BASED ON HISTORY
    if ( history.length > 1 ) {
        for ( let i=0; i < history.length - 1; i++ ) {
            const currPoint = history[ i ];
            const nextPoint = history[ i + 1 ];

            if ( currPoint != nextPoint ) {
                let lineID = `line-${ currPoint }-${ nextPoint }`;
                if ( currPoint > nextPoint )
                    lineID = `line-${ nextPoint }-${ currPoint }`;

                const line = document.getElementById( lineID );
                console.log( line );
                if ( line ) line.style.display = 'block';
            }
        }

        console.log( '---' );
    }

    fetch( url )
        .then( response => response.text( ) )
        .then( response => {
            contentOutput.innerHTML = response;

            const homeBtn = document.querySelector( 'nav .item.home a' );
            if ( homeBtn ) {
                // homeBtn.removeEventListener( 'click', closeContent );
                homeBtn.addEventListener( 'click', closeContent );
            }

            const containerLinks = document.querySelectorAll( '.container a' );
            containerLinks.forEach( containerLink => {
                containerLink.addEventListener( 'click', loadContent );
            } );

            document.documentElement.classList.add( 'content-display' );
        } );
};
cityLinks.forEach( cityLink => {
    cityLink.addEventListener( 'click', loadContent );
} );