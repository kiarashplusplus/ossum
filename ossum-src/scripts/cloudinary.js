var cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'ossum', 
    api_key: '934956113716618', 
    api_secret: 'EBQnc-P2N6CPo1rOv0S8b3GuOH8' 
  });

var up_options = 
  {resource_type: "video", type: "upload",
   eager: [
    { streaming_profile: "hd", format: "m3u8" }, 
    {streaming_profile: "sd", format: "m3u8"}, 
   ] };

cloudinary.uploader.explicit("coverr-bali-beach-overhead-1563969579253_xooqgl", up_options, function(result) {console.log(result); } );

cloudinary.uploader.explicit("coverr-sunrise-1563948708950_oupdpu", up_options, function(result) {console.log(result); } );
