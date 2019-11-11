class NumberedBoxWidget implements IWidget{
    
    constructor(public Value: number){}
    
    Render(_ctx: RenderContext): VNode {
        return new VNode("div")
            .WithProp("style", "color: #000;background-color: #f1f1f1;margin: 10px;padding: 20px;font-size: 30px;")
            .WithValue("" + this.Value);
    }

}