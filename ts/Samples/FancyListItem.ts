class FancyListItem implements IWidget{

    constructor(private child: IWidget){}

    Render(ctx: RenderContext): VNode {
        return new VNode("p")
            .WithClasses([
                "t-container",
                "t-card",
                "t-red"
            ])
            .WithChildren([this.child.Render(ctx)]);
    }

}