const http = require( 'http' ); 
const fs = require( 'fs' );
const url = require( 'url' );
const slugify = require( 'slugify' );
const { templateReplace } = require( './modules/templateReplace.js' );
////Filesystem
const hello = 'Hello World';
console.log( hello );

////////////////// ///////////////////////////
const  jsonData = fs.readFileSync( `${__dirname}/dev-data/data.json` )
const dataObjArray = JSON.parse( jsonData );
const  tempOverview = fs.readFileSync( `${__dirname}/templates/template-overview.html`,'utf-8' );
const  tempProduct = fs.readFileSync( `${__dirname}/templates/template-product.html`, 'utf-8' );
const  tempCard = fs.readFileSync( `${__dirname}/templates/template-card.html`, 'utf-8' );

console.log( slugify( 'Fresh Avocados', {
  lower: 'true'
} ) );
const slugsArray = dataObjArray.map( ( el ) => 
  slugify( el.productName, {
    lower: 'true'
  } )
 );
console.log( slugsArray );

//Server
const server = http.createServer( ( request, response ) => {
  // console.log( request.url );
  // console.log( url.parse( request.url, true ) );
  const { query, pathname } = url.parse(request.url ,true);
  
  //overview page
  if ( pathname === '/' || pathname === '/overview' ) {
    response.writeHead( 200, {
      'Content-type': 'text/html',
    } );
    let htmlCards = dataObjArray.map( el => templateReplace( tempCard, el ) ).join('');
     const out_Overview = tempOverview.replace('{p_card}', htmlCards);
    response.end( out_Overview );
    
  //product page
  } else if ( pathname === '/product' ) {
    response.writeHead( 200, {
      'Content-type': 'text/html',
    } );
    let product = dataObjArray[query.id];
    console.log( product );
    const out_product = templateReplace( tempProduct, product );
     response.end( out_product);
  //api page
  } else if ( pathname === '/api' ) {
    response.end( jsonData );
  }
  //Not found page
  else {
    response.writeHead( 404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    })
    response.end( '<h1>Page is not found</h1>' );
  }
} );
//Listening to requests from clients
server.listen( 8080, '127.0.0.1', () => {
  console.log( 'listening to requests from the clients' );
})