enum Mode { 
    MouseMoveLeft,
    MouseMoveRight,
    MouseMoveUp,
    MouseMoveDown,
    MouseLeftClick,
    MouseRightClick,
    MouseScrollUp,
    MouseScrollDown,
    ModeEnd
}

let mode = Mode.MouseMoveLeft
let past = control.millis();

const moveSensitivity = 5
const scrollSensitivity = 5

const actuateMouse = (sensitivityMultiplier:number)=>{
    past = control.millis()

    switch (mode) {
        case Mode.MouseMoveLeft:
            modules.hidMouse1.move(-moveSensitivity * sensitivityMultiplier, 0)
            break;
        case Mode.MouseMoveRight:
            modules.hidMouse1.move(moveSensitivity * sensitivityMultiplier, 0)
            break;
        case Mode.MouseMoveUp:
            modules.hidMouse1.move(0, moveSensitivity * sensitivityMultiplier)
            break;
        case Mode.MouseMoveDown:
            modules.hidMouse1.move(0, -moveSensitivity * sensitivityMultiplier)
            break;
        case Mode.MouseLeftClick:
            modules.hidMouse1.setButton(jacdac.HidMouseButton.Left, jacdac.HidMouseButtonEvent.Click)
            break;
        case Mode.MouseRightClick:
            modules.hidMouse1.setButton(jacdac.HidMouseButton.Right, jacdac.HidMouseButtonEvent.Click)
            break;
        case Mode.MouseScrollUp:
            modules.hidMouse1.wheel(scrollSensitivity * sensitivityMultiplier, 100);
            break
        case Mode.MouseScrollDown:
            modules.hidMouse1.wheel(-scrollSensitivity * sensitivityMultiplier, 100)
            break;
    }
}

modules.button1.onHold(() => {
    actuateMouse(5)
})

modules.button1.onDown(()=>{
    actuateMouse(1)
})

basic.forever(function () {
    modules.ledPixel1.setAll(0x0)
    while (control.millis() - past < 1500)
    {
        modules.ledPixel1.setPixel(mode, 0xff);
        pause(10);
    }
    
    past = control.millis()

    mode += 1;

    if (mode == Mode.ModeEnd)
        mode = Mode.MouseMoveLeft
})
