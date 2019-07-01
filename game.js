var lastClicked;
var grid = clickableGrid(19,19,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
   
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.addEventListener('click',(function(el,r,c,i){
                return function() {
                    //ne peux pas poser plusieurs pieces aux meme endroit
                    if (el.className == "clicked")
                    {
                        alert("you can not put a token");
                        return ;
                    }
                    callback(el,r,c,i);
                }
            })
            (cell,r,c,i),false);
        }
    }
    return grid;
}