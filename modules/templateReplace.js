const templateReplace = function ( old_Temp, newP ) {
  let output = old_Temp.replace( /{%p_name%}/g, newP.productName );
   output = output.replace( /{%p_image%}/g, newP.image );
   output = output.replace( /{%p_from%}/g, newP.from );
   output = output.replace( /{%p_nutrients%}/g, newP.nutrients );
   output = output.replace( /{%p_price%}/g, newP.price );
   output = output.replace( /{%p_quantity%}/g, newP.quantity );
   output = output.replace( /{%p_description%}/g, newP.description );
   output = output.replace( /{%p_id%}/g, newP.id );
  if ( !newP.organic ) {
    output = output.replace( /{%Not_organic%}/g, 'not-organic' );
  }
    return output;
}
module.exports = { templateReplace };