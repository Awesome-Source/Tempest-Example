class ColorButtonExample implements IWidget
{
    private _buttons: ButtonWidget[];

    constructor()
    {
        var greenButton = new ButtonWidget("GreenButton", new TextWidget("Green"));
        var redButton = new ButtonWidget("RedButton", new TextWidget("Red"));
        var blueButton = new ButtonWidget("BlueButton", new TextWidget("Blue"));
        var yellowButton = new ButtonWidget("YellowButton", new TextWidget("Yellow"));
        var orangeButton = new ButtonWidget("OrangeButton", new TextWidget("Orange"));

        greenButton.ColorClass = "t-green";
        redButton.ColorClass = "t-red";
        blueButton.ColorClass = "t-blue";
        yellowButton.ColorClass = "t-yellow";
        orangeButton.ColorClass = "t-orange";

        this._buttons = [greenButton, redButton, blueButton, yellowButton, orangeButton];
    }

    private SetColors(newColorClass: string, ctx: RenderContext)
    {
        this._buttons.forEach(b => b.ColorClass = newColorClass);
        ctx.Render();
    }

    Render(ctx: RenderContext): VNode {
        
        this._buttons[0].OnClick = () => this.SetColors("t-green", ctx);
        this._buttons[1].OnClick = () => this.SetColors("t-red", ctx);
        this._buttons[2].OnClick = () => this.SetColors("t-blue", ctx);
        this._buttons[3].OnClick = () => this.SetColors("t-yellow", ctx);
        this._buttons[4].OnClick = () => this.SetColors("t-orange", ctx);

        return new VNode("div")
            .WithClass("t-padding-small")
            .WithChildren(this._buttons.map(b => b.Render(ctx)));
    }
    
}