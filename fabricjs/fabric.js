var canvas=new fabric.Canvas('canvas');
document.getElementById('file').addEventListener("change",function(e){
    var file= e.target.files[0];
    var reader= new FileReader();
    reader.onload=function(f){
        var data =f.target.result;
        fabric.Image.fromURL(data,function(img){
            var oImg=img.set({left:0,angle:0,width:700,height:600}).scale(0.7);
            canvas.add(oImg).renderAll();
            var a= canvas.setActiveObject(oImg);
            var dataURL = canvas.toDataURL({format:'jpg',quality:0.8});
        });
    };
    reader.readAsDataURL(file);
});

canvas.on('mouse:wheel',function(opt){
    var delta=opt.e.deltaY;
    var zoom=canvas.getZoom();
    zoom *=0.999 ** delta;
    if(zoom> 20) zoom=20;
    if(zoom <0.01) zoom= 0.01;
   canvas.zoomToPoint({ x:opt.e.offsetX, y:opt.e.offsetY},zoom);
   opt.e.preventDefault();
   opt.e.stopPropagation();
   var vpt =this.viewportTransform;
   if(zoom<400/1000){
       vpt[4]=200-1000 * zoom / 2;
       vpt[5]=200-1000 * zoom / 2;
   }else{
       if(vpt[4]>=0){
           vpt[4]=0;

       }else if(vpt[4]<canvas.getWidth()-1000*zoom){
           vpt[4]=canvas.getWidth()-1000*zoom;
       }

       if(vpt[5]>=0){
        vpt[5]=0;

    }else if(vpt[5]<canvas.getHeight()-1000*zoom){
        vpt[5]=canvas.getHeight()-1000*zoom;
    }
}
   })






