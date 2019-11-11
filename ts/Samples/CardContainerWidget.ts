class CardContainerWidget implements IWidget{

    constructor(public Child: IWidget){}

    Render(ctx: RenderContext): VNode {
        return new VNode("div")
            .WithClasses(["t-container","t-card","t-section","t-margin","t-white"])
            .WithChildren([this.Child.Render(ctx)]);
    }

}