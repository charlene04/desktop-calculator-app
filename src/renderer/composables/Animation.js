
import Velocity from "velocity-animate";

export function Animation(target) {
    Velocity(target, {"font-size": "40px", opacity: 0.7},
        {duration: 100, 
        easing: "bounceIn",
        complete: function(){
        Velocity(target, {"font-size": "30px", opacity: 1},
            {duration: 100, easing: "bounceOut"});
        }}
    );
}
