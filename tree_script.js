function tree_build(){
    const depth = 5;
    const rotdeg = 20;

    var deglst = [[0]];
    var root_left_pos = 0;
    var root_top_pos = 0;
    for (let i = 0; i < depth; i++){
        let new_lst = [];
        let closest_to_1_sin = Infinity;
        let closest_to_1_cos = Infinity;

        for (let j = 0; j < deglst[i].length; j++){
            left_branch_angle = deglst[i][j]-rotdeg;
            right_branch_angle = deglst[i][j]+rotdeg;
            new_lst.push(left_branch_angle, right_branch_angle);

            if (Math.abs(Math.abs(left_branch_angle)-90) < 
                Math.abs(Math.abs(closest_to_1_sin)-90)){
                closest_to_1_sin = left_branch_angle;
            } else if (Math.abs(Math.abs(right_branch_angle)-90) < 
                       Math.abs(Math.abs(closest_to_1_sin)-90)){
                closest_to_1_sin = right_branch_angle;
            } 
            if (Math.abs(left_branch_angle) < Math.abs(closest_to_1_cos)){
                closest_to_1_cos = left_branch_angle;
            } else if (Math.abs(right_branch_angle) < Math.abs(closest_to_1_cos)){
                closest_to_1_cos = right_branch_angle;
            } 
        }
        deglst.push(new_lst);
        root_top_pos += Math.abs(Math.round(Math.cos((
            closest_to_1_cos * Math.PI) / 180) * 50));
        root_left_pos += Math.abs(Math.round(Math.sin((
            closest_to_1_sin * Math.PI) / 180) * 50));
    }

    var leftlst = [[root_left_pos]];
    var toplst = [[root_top_pos]];
    for (let i = 0; i < deglst.length-1; i++){
        // left offset by sin(angle) * 50px
        // top offset by cos(angle) * 50px
        let new_leftlst = [];
        let new_toplst = [];
        for (let j = 0; j < deglst[i].length; j++){
            new_leftlst.push(Math.round(leftlst[i][j] + Math.sin((deglst[i+1][2*j] * Math.PI) / 180)*50));
            new_leftlst.push(Math.round(leftlst[i][j] + Math.sin((deglst[i+1][2*j+1] * Math.PI) / 180)*50));
            new_toplst.push(Math.round(toplst[i][j] - Math.cos((deglst[i+1][2*j] * Math.PI) / 180)*50));
            new_toplst.push(Math.round(toplst[i][j] - Math.cos((deglst[i+1][2*j+1] * Math.PI) / 180)*50));
        }
        leftlst.push(new_leftlst);
        toplst.push(new_toplst);
    }

    implement_tree(deglst, leftlst, toplst);
}

function implement_tree(deglst, leftlst, toplst){
    for (let i=0; i<deglst.length; i++){
        for (let j=0; j<deglst[i].length; j++){
            const newDiv = document.createElement('div');
            newDiv.id = "tree_branch";
            if (j % 2 == 0){
                newDiv.style.transformOrigin = 'top left';
            } else {
                newDiv.style.transformOrigin = 'top right';
            }
            newDiv.style.transform = 'rotate(' + deglst[i][j] + 'deg)';
            newDiv.style.left = leftlst[i][j] + 'px';
            newDiv.style.top = toplst[i][j] + 'px';
            document.getElementById("tree_container").appendChild(newDiv);
        }
    }
}