class BlueBoxWidget implements IWidget{

    constructor(public Child: IWidget){}

    Render(ctx: RenderContext): VNode {
        return new VNode("div")
            .WithClass("t-blue")
            .WithChildren([this.Child.Render(ctx)]);
    }
    
}