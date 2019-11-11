class SimpleStateExample implements IWidget{

    private textValue: string;

    constructor(){
        this.textValue = "Nothing clicked yet."
    }

    private SetText(text: string, ctx: RenderContext)
    {
        this.textValue = text;
        ctx.Render();
    }

    Render(ctx: RenderContext): VNode {
        var leftButton = new ButtonWidget("LeftButton", new TextWidget("Left"));
        var rightButton = new ButtonWidget("RightButton", new TextWidget("Right"));

        leftButton.OnClick = () => this.SetText("Clicked left", ctx);
        rightButton.OnClick = () => this.SetText("Clicked right", ctx);

        return new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren(
                [leftButton.Render(ctx),
                rightButton.Render(ctx),
                new TextWidget(this.textValue).Render(ctx)]
            );
    }

}